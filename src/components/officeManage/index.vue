<template>
  <div @click="show=false" @contextmenu="closeMenu">
    <div class="highRanking">
      <div class="highSearch">
        <el-form :inline="true" size="mini">
          <el-form-item>
            <el-input placeholder="请输入姓名" v-model="params.where" size="mini" clearable @keyup.enter.native="search">
              <el-button slot="append" icon="el-icon-search" @click="search"></el-button>
            </el-input>
          </el-form-item>
          <!--<el-form-item>-->
            <!--<el-button type="primary" size="mini" @click="highGrade">高级</el-button>-->
          <!--</el-form-item>-->
          <el-form-item>
            <el-button type="primary" size="mini" @click="addDormDialog = true">
              <i class="el-icon-plus"></i>
              新增
            </el-button>
          </el-form-item>
        </el-form>
      </div>
      <div class="filter high_grade" :class="isHigh? 'highHide':''">
        <el-form :inline="true" :model="params" size="mini" label-width="100px">
          <div class="filterTitle">
            <i class="el-icons-fa-bars"></i>&nbsp;&nbsp;高级搜索
          </div>
          <el-row class="el_row_border">
            <el-col :span="12">
              <el-row>
                <el-col :span="8">
                  <div class="el_col_label">入职时间</div>
                </el-col>
                <el-col :span="16" class="el_col_option">
                  <el-form-item>

                  </el-form-item>
                </el-col>
              </el-row>
            </el-col>
          </el-row>
          <div class="btnOperate">
            <el-button size="mini" type="primary" @click="search">搜索</el-button>
            <el-button size="mini" type="primary" @click="resetting">重置</el-button>
            <el-button size="mini" type="primary" @click="highGrade">取消</el-button>
          </div>
        </el-form>
      </div>
    </div>
    <div class="main">
      <div class="blueTable">
        <el-table
            :data="tableData"
            :empty-text='tableStatus'
            v-loading="tableLoading"
            element-loading-text="拼命加载中"
            element-loading-spinner="el-icon-loading"
            element-loading-background="rgba(255, 255, 255, 0)"
            @row-dblclick="dblClick"
            @row-contextmenu='openContextMenu'
            style="width: 100%">
          <el-table-column
              label="房屋地址">
            <template slot-scope="scope">
              <span v-if="scope.row.house_name">{{scope.row.house_name}}</span>
              <span v-else>/</span>
            </template>
          </el-table-column>
          <el-table-column
              label="小区地址">
            <template slot-scope="scope">
              <span v-if="scope.row.village_name">{{scope.row.village_name}}</span>
              <span v-else>/</span>
            </template>
          </el-table-column>
          <el-table-column
              label="房型">
            <template slot-scope="scope">
              <span v-if="scope.row.house_feature">{{scope.row.house_feature}}</span>
              <span v-else>/</span>
            </template>
          </el-table-column>
          <el-table-column
              label="面积">
            <template slot-scope="scope">
              <span v-if="scope.row.area">{{scope.row.area}}m²</span>
              <span v-else>/</span>
            </template>
          </el-table-column>
          <el-table-column
              label="装修">
            <template slot-scope="scope">
              <span v-if="scope.row.decoration">{{scope.row.decoration}}</span>
              <span v-else>/</span>
            </template>
          </el-table-column>
          <el-table-column
              label="房屋类型">
            <template slot-scope="scope">
              <span v-if="scope.row.house_identity">{{scope.row.house_identity}}</span>
              <span v-else>/</span>
            </template>
          </el-table-column>
          <el-table-column
              label="收房价格">
            <template slot-scope="scope">
              <span v-if="scope.row.suggest_price">{{scope.row.suggest_price}}</span>
              <span v-else>/</span>
            </template>
          </el-table-column>
          <el-table-column
              label="部门人数">
            <template slot-scope="scope">
              <span v-if="scope.row.depart">{{scope.row.depart.users}}</span>
              <span v-else>/</span>
            </template>
          </el-table-column>
          <el-table-column
              prop="start_at"
              label="开始时间">
          </el-table-column>

          <el-table-column
              prop="end_at"
              label="结束时间">
          </el-table-column>
          <el-table-column
              label="照片">
            <template slot-scope="scope">
              <a href="javascript:;" @click.stop="searchPic(scope.row.house_id)">
                <i style="font-size: 16px" class="el-icon-picture"></i>
              </a>
            </template>
          </el-table-column>
          <el-table-column
              label="片区经理">
            <template slot-scope="scope">
              <span v-if="scope.row.leader">{{scope.row.leader[0].leader_name}}</span>
              <span v-else>/</span>
            </template>
          </el-table-column>
          <el-table-column
              label="部门">
            <template slot-scope="scope">
              <span v-if="scope.row.leader">{{scope.row.leader[0].leader_depart_name}}</span>
              <span v-else>/</span>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div class="block pages">
        <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="params.page"
            :page-size="params.limit"
            layout="total, prev, pager, next, jumper"
            :total="totalNum">
        </el-pagination>
      </div>
    </div>

    <RightMenu :startX="rightMenuX+'px'" :startY="rightMenuY+'px'" :list="lists" :show="show"
               @clickOperate="clickEvent"></RightMenu>
    <AddDorm :addDormDialog="addDormDialog" @close="closeModal"></AddDorm>
    <CancelDorm :cancelDormDialog="cancelDormDialog" :currentRow="currentRow" @close="closeModal"></CancelDorm>
    <UpdateDorm :updateDormDialog="updateDormDialog" :currentRow="currentRow" @close="closeModal"></UpdateDorm>
    <DormDetail :dormDetailDialog="dormDetailDialog" :house_id="house_id" @close="closeModal"></DormDetail>
    <HouseDetail :houseDetailDialog="houseDetailDialog" :isOnlyPic="isOnlyPic"
                 :houseId="house_id" @close="closeModal"></HouseDetail>
  </div>
</template>

<script>
  import RightMenu from '../common/rightMenu.vue';    //右键
  import AddDorm from './components/addOffice'
  import CancelDorm from './components/cancelOffice'
  import UpdateDorm from './components/updateOffice'
  import DormDetail from './components/officeDetail'
  import HouseDetail from '../rentManage/housesManage/components/houseDetail'
  export default {
    name: 'staff-records',
    components: {RightMenu,AddDorm,CancelDorm,UpdateDorm,DormDetail,HouseDetail},
    data() {
      return {
        rightMenuX: 0,
        rightMenuY: 0,
        show: false,
        lists: [],
        /***********/
        params: {
          page: 1,
          limit: 10,
          house_type : 1,
          where : '',
        },
        isHigh: false,
        totalNum: 0,
        tableData: [],
        tableStatus: ' ',
        tableLoading: false,

        addDormDialog : false,
        cancelDormDialog : false,
        updateDormDialog : false,
        dormDetailDialog : false,
        houseDetailDialog : false,
        isOnlyPic : false,
        currentId :'',
        currentRow :{},
        house_id : '',
      }
    },
    mounted() {
      this.getData();
    },
    watch: {},
    methods: {
      //双击表格
      dblClick(row) {
        this.house_id = row.house_id;
        this.dormDetailDialog = true;
      },

      search() {
        this.params.page = 1;
        this.getData();
      },
      getData() {
        this.tableLoading = true;
        this.tableStatus = ' ';
        this.$http.get(globalConfig.server+'api/v1/house-list',{params:this.params}).then(res=>{
          this.tableLoading = false;
          if(res.data.code === '60012'){
            this.tableData = res.data.info.data;
            this.totalNum = res.data.info.total;
          }else {
            this.tableStatus = '暂无数据';
            this.tableData = [];
            this.totalNum = 0;
          }
        })
      },
      searchPic(id){
        this.isOnlyPic = true;
        this.house_id = id;
        this.houseDetailDialog = true;
      },
      // 高级
      highGrade() {
        this.isHigh = !this.isHigh;
      },
      // 重置
      resetting() {

      },
      handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
      },
      handleCurrentChange(val) {
        this.params.page = val;
      },

      /***************************************************************************/
      // 右键
      openContextMenu(row, event) {
        this.currentId = row.id;
        this.currentRow = row;
        this.contextMenuParam(event);
        this.lists = [
          {clickIndex: 'cancelDormDialog', headIcon: 'el-icon-delete', label: '取消办公室',},
          {clickIndex: 'updateDormDialog', headIcon: 'el-icon-refresh', label: '变更信息',},
        ];
        this.contextMenuParam(event)
      },
      // 右键回调
      clickEvent(val) {
        this.openModalDialog(val);
      },
      //关闭右键菜单
      closeMenu() {
        this.show = false;
      },
      //右键参数
      contextMenuParam(event) {
        let e = event || window.event;
        this.show = false;
        this.rightMenuX = e.clientX + document.documentElement.scrollLeft - document.documentElement.clientLeft;
        this.rightMenuY = e.clientY + document.documentElement.scrollTop - document.documentElement.clientTop;
        event.preventDefault();
        event.stopPropagation();
        this.$nextTick(() => {
          this.show = true
        })
      },
      /****************************************************************/
      openModalDialog(val){
        switch (val){
          case 'cancelDormDialog':
            this.cancelDormDialog = true;
            break;
          case 'updateDormDialog':
            this.updateDormDialog = true;
            break;
        }
      },
      closeModal(val) {
        this.addDormDialog = false;
        this.cancelDormDialog = false;
        this.updateDormDialog = false;
        this.dormDetailDialog = false;
        this.houseDetailDialog = false;
        if(val === 'success'){
          this.getData();
        }
      },

    },
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>

</style>
