<template>
  <div @click="show=false" @contextmenu="closeMenu">
    <el-table
      :data="tableData"
      :empty-text='emptyContent'
      v-loading="tableLoading"
      element-loading-text="拼命加载中"
      element-loading-spinner="el-icon-loading"
      element-loading-background="rgba(0, 0, 0, 0)"
      @row-contextmenu="houseMenu"
      style="width: 100%">
      <el-table-column
        prop="create_time"
        label="调整时间">
      </el-table-column>
      <el-table-column
        width="150"
        label="房屋评分">
        <template slot-scope="scope">
          <span v-if="scope.row.house_rating">
            <el-rate disabled v-model="scope.row.house_rating" style="line-height: 37px"></el-rate>
          </span>
          <span v-else="">/</span>
        </template>
      </el-table-column>
      <!--<el-table-column-->
        <!--label="房屋状态">-->
        <!--<template slot-scope="scope">-->
          <!--<span v-if="scope.row.house_status==1">已租</span>-->
          <!--<span v-else="">未租</span>-->
        <!--</template>-->
      <!--</el-table-column>-->
      <el-table-column
        label="空置期(天)">
        <template slot-scope="scope">
          <div v-if="scope.row.vacant_time">{{scope.row.vacant_time}}</div>
          <div v-else="">/</div>
        </template>
      </el-table-column>

      <el-table-column
        label="装修前效果">
        <template slot-scope="scope">
          <span v-if="scope.row.pre_decoration_effect">{{matchDictionary(scope.row.pre_decoration_effect)}}</span>
          <span v-else="">/</span>
        </template>
      </el-table-column>
      <el-table-column
        label="装修状态">
        <template slot-scope="scope">
          <span v-if="scope.row.decoration_type">{{matchDictionary(scope.row.decoration_type)}}</span>
          <span v-else="">/</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="decoration_start_time"
        label="装修开始时间">
      </el-table-column>
      <el-table-column
        prop="decoration_end_time"
        label="装修结束时间">
      </el-table-column>
      <el-table-column
        label="装修后效果">
        <template slot-scope="scope">
          <span v-if="scope.row.after_decoration_effect">{{matchDictionary(scope.row.after_decoration_effect)}}</span>
          <span v-else="">/</span>
        </template>
      </el-table-column>
      <el-table-column
        label="负责人">
        <template slot-scope="scope">
          <span v-if="scope.row.leaders&&scope.row.leaders.real_name">{{scope.row.leaders.real_name}}</span>
          <span v-else="">/</span>
        </template>
      </el-table-column>
      <el-table-column
        label="所属部门">
        <template slot-scope="scope">
          <span v-if="scope.row.departments&&scope.row.departments.name">{{scope.row.departments.name}}</span>
          <span v-else="">/</span>
        </template>
      </el-table-column>
      <el-table-column
        label="创建人">
        <template slot-scope="scope">
          <span v-if="scope.row.creators&&scope.row.creators.real_name">{{scope.row.creators.real_name}}</span>
          <span v-else="">/</span>
        </template>
      </el-table-column>
      <el-table-column
        label="截图">
        <template slot-scope="scope">
          <a href="javascript:;" type="text" v-if="scope.row.album && scope.row.album.album_file"
             @click="openModal(scope.row.album.album_file)">
            <i style="font-size: 16px" class="el-icon-picture"></i>
          </a>
          <span v-else="">/</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="remark"
        label="备注">
      </el-table-column>
    </el-table>

    <div class="pagination">
      <el-pagination
        @current-change="currentChange"
        :current-page="decorateParams.page"
        :page-size="3"
        layout="total, prev, pager, next, jumper"
        :total="totalNumber">
      </el-pagination>
    </div>

    <el-dialog title="文件查看" :visible.sync="dialogFileVisible" :close-on-click-modal="false">
      <div class="scroll_bar">
        <img v-for="(val,key) in fileObject" :src="val[0].uri" data-magnify="" :data-src="val[0].uri">
      </div>
    </el-dialog>
    <RightMenu :startX="rightMenuX+'px'" :startY="rightMenuY+'px'" :list="lists" :show="show"
               @clickOperate="clickEvent"></RightMenu>

    <EditDecorate :EditDecorateDialog="EditDecorateDialog" :decorateId="decorateId" @close="closeModal"></EditDecorate>
  </div>
</template>

<script>
  import RightMenu from '../../../common/rightMenu.vue'
  import EditDecorate from './editDecorateRecord.vue'
  export default {
    props:['houseId','activeName','all_dic','changeHouseStatus'],
    components:{RightMenu,EditDecorate},
    data () {
      return {
        rightMenuX: 0,
        rightMenuY: 0,
        show: false,
        lists: [],
        /***********/
        tableData:[],
        decorateParams:{
          page:1,
          limit:3,
          id:'',
        },
        totalNumber:0,
        emptyContent: ' ',
        tableLoading: false,
        EditDecorateDialog : false,
        decorateId : '',
        fileObject :{},
        dialogFileVisible : false,
      }
    },
    watch:{
      activeName(val){
        if(val === 'second'){
          this.reGetData();
        }
      },
      houseId(val){
        this.decorateParams.id = val;
        if(val){
          if(this.activeName === 'second'){
            this.reGetData();
          }
        }else {
          this.tableData = [];
          this.totalNumber = 0;
          this.emptyContent = '暂无数据';
        }
      },
      changeHouseStatus(val){
        if(val){
          if(this.activeName === 'second'){
            this.reGetData();
          }
        }
      },
    },
    methods:{
      currentChange(val){
        this.decorateParams.page = val;
        this.getData();
      },
      matchDictionary(id) {
        let dictionary_name = null;
        this.all_dic.map((item) => {
          if (item.id == id) {
            dictionary_name = item.dictionary_name;
          }
        });
        return dictionary_name;
      },
      //房屋变化，重新从第一页开始请求数据
      reGetData(){
        this.decorateParams.page = 1;
        this.getData();
      },
      getData(){
        this.emptyContent = ' ';
        this.tableLoading = true;
        this.tableData = [];
        this.totalNumber = 0;
        this.$http.get(globalConfig.server + 'core/decoration', {params: this.decorateParams}).then((res) => {
          this.tableLoading = false;
          if (res.data.code === '30000') {
            this.totalNumber = res.data.data.count;
            this.tableData = res.data.data.data;
          } else {
            this.tableData = [];
            this.totalNumber = 0;
            this.emptyContent = '暂无数据';
          }
        })
      },
      openModal(val){
        this.fileObject = val;
        this.dialogFileVisible = true;
      },
      //房屋右键
      houseMenu(row, event){
        this.decorateId = row.id;
        this.lists = [
          {clickIndex: 'edit', headIcon: 'el-icon-edit', label: '修改装修记录',},
        ];
        this.contextParams();
      },

      //右键回调时间
      clickEvent (index) {
        switch (index) {
          case 'edit' :
            this.EditDecorateDialog = true;
            break;
        }
      },
      closeModal(val){
        this.EditDecorateDialog = false;
        if (val === 'success') {
          this.getData();
        }
      },
      //关闭右键菜单
      closeMenu(){
        this.show = false;
      },

      //右键参数
      contextParams(){
        //param: user right param
        let e = event || window.event;let event = window.event;	//support firefox contextmenu
        this.show = false;
        this.rightMenuX = e.clientX + document.documentElement.scrollLeft - document.documentElement.clientLeft;
        this.rightMenuY = e.clientY + document.documentElement.scrollTop - document.documentElement.clientTop;
        event.preventDefault();
        event.stopPropagation();
        this.$nextTick(() => {
          this.show = true
        })
      },
    }

  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .label {
    display: inline-block;
    width: 70px;
    height: 30px;
    line-height: 30px;
    text-align: center;
    border-radius: 4px;
    color: #ffffff;
  }
  .success {
    background: #409EFF;
  }
  .yellow {
    background: #FFCC00
  }
  .orange {
    background: #FF9900
  }
  .red {
    background: #FF3900
  }
  img{
    width: 120px;
    height: 120px;
    border-radius: 8px;
    margin: 10px;
  }
</style>
