<template>
  <div>
    <el-table
      :data="tableData"
      :empty-text='emptyContent'
      v-loading="tableLoading"
      element-loading-text="拼命加载中"
      element-loading-spinner="el-icon-loading"
      element-loading-background="rgba(0, 0, 0, 0)"
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
      <el-table-column
        label="房屋状态">
        <template slot-scope="scope">
          <span style="color: #1ecb4e" v-if="scope.row.house_status==1">已出租</span>
          <span v-else-if="scope.row.house_status == 2">待收房</span>
          <span style="color: #ef4293" v-else="">未出租</span>
        </template>
      </el-table-column>
      <el-table-column
        label="空置期(天)">
        <template slot-scope="scope">
          <div v-if="scope.row.vacant_time">{{scope.row.vacant_time}}</div>
          <div v-else="">/</div>
        </template>
      </el-table-column>
      <el-table-column
        label="调整前预警状态">
        <template slot-scope="scope">
          <div v-if="scope.row.pre_warning_status == 1" class="label success">正常</div>
          <div v-else-if="scope.row.pre_warning_status == 2" class="label yellow">黄色预警</div>
          <div v-else-if="scope.row.pre_warning_status == 3" class="label orange">橙色预警</div>
          <div v-else-if="scope.row.pre_warning_status == 4" class="label red">红色预警</div>
          <div v-else="">/</div>
        </template>
      </el-table-column>
      <el-table-column
        label="调整后预警状态">
        <template slot-scope="scope">
          <div v-if="scope.row.after_warning_status == 1" class="label success">正常</div>
          <div v-else-if="scope.row.after_warning_status == 2" class="label yellow">黄色预警</div>
          <div v-else-if="scope.row.after_warning_status == 3" class="label orange">橙色预警</div>
          <div v-else-if="scope.row.after_warning_status == 4" class="label red">红色预警</div>
          <div v-else="">/</div>
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
        label="操作人">
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
        prop="reason"
        label="调整原因">
      </el-table-column>
    </el-table>

    <div class="pagination">
      <el-pagination
        @current-change="currentChange"
        :current-page="warningParams.page"
        :page-size="3"
        layout="total, prev, pager, next, jumper"
        :total="totalNumber">
      </el-pagination>

      <el-dialog title="文件查看" :visible.sync="dialogFileVisible" :close-on-click-modal="false">
        <div class="scroll_bar">
          <img v-for="(val,key) in fileObject" :src="val[0].uri" data-magnify="" :data-src="val[0].uri">
        </div>
      </el-dialog>
    </div>
  </div>
</template>

<script>
  export default {
    props:['houseId','activeName','all_dic','changeHouseStatus'],
    data () {
      return {
        tableData:[],
        warningParams:{
          page:1,
          limit:3,
          id:'',
        },
        totalNumber:0,
        emptyContent: ' ',
        tableLoading: false,

        fileObject :{},
        dialogFileVisible : false,
      }
    },
    watch:{
      activeName(val){
        if(val === 'third'){
          this.reGetData();
        }
      },
      houseId(val){
        this.warningParams.id = val;
        if(val){
          if(this.activeName === 'third'){
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
          if(this.activeName === 'third'){
            this.reGetData();
          }
        }
      },
    },
    methods:{
      currentChange(val){
        this.warningParams.page = val;
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
        this.warningParams.page = 1;
        this.getData();
      },

      getData(){
        this.emptyContent = ' ';
        this.tableLoading = true;
        this.tableData = [];
        this.totalNumber = 0;
        this.$http.get(globalConfig.server + 'core/warning', {params: this.warningParams}).then((res) => {
          this.tableLoading = false;
          if (res.data.code === '40000') {
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
