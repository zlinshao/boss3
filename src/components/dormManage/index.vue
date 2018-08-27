<template>
  <div @click="show=false" @contextmenu="closeMenu">
    <div class="highRanking">
      <div class="highSearch">
        <el-form :inline="true" size="mini">
          <el-form-item>
            <el-input placeholder="请输入姓名" v-model="params.search" size="mini" clearable @keyup.enter.native="search">
              <el-button slot="append" icon="el-icon-search" @click="search"></el-button>
            </el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" size="mini" @click="highGrade">高级</el-button>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" size="mini">
              <i class="el-icon-plus"></i>
              新增记录
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
            @cell-dblclick='dblClick'
            style="width: 100%">
          <el-table-column
              label="房屋地址">
            <template slot-scope="scope">
              <span v-if="scope.row.house&&scope.row.house.name">{{scope.row.house.name}}</span>
              <span v-else>/</span>
            </template>
          </el-table-column>
          <el-table-column
              label="小区地址">
            <template slot-scope="scope">
              <span v-if="scope.row.house&&scope.row.house.village_name">{{scope.row.house.village_name}}</span>
              <span v-else>/</span>
            </template>
          </el-table-column>
          <el-table-column
              label="房型">
            <template slot-scope="scope">
              <span v-if="scope.row.house&&scope.row.house.room">{{scope.row.house.room}}室</span>
              <span v-else>0室</span>
              <span>-</span>
              <span v-if="scope.row.house&&scope.row.house.hall">{{scope.row.house.hall}}厅</span>
              <span v-else>0厅</span>
              <span>-</span>
              <span v-if="scope.row.house&&scope.row.house.toilet">{{scope.row.house.toilet}}卫</span>
              <span v-else>0卫</span>
            </template>
          </el-table-column>
          <el-table-column
              label="面积">
             <template slot-scope="scope">
              <span v-if="scope.row.house&&scope.row.house.area">{{scope.row.house.area}}m²</span>
              <span v-else>/</span>
            </template>
          </el-table-column>
          <el-table-column
              label="装修">
             <template slot-scope="scope">
              <span v-if="scope.row.house&&scope.row.house.decoration">{{scope.row.house.decoration}}</span>
              <span v-else>/</span>
            </template>
          </el-table-column>
          <el-table-column
              label="房屋类型">
             <template slot-scope="scope">
              <span v-if="scope.row.house_type">{{scope.row.house_type}}</span>
              <span v-else>/</span>
            </template>
          </el-table-column>
          <el-table-column
              label="收房价格">
             <template slot-scope="scope">
              <span v-if="scope.row.house&&scope.row.house.suggest_price">{{scope.row.house.suggest_price}}</span>
              <span v-else>/</span>
            </template>
          </el-table-column>
          <el-table-column
              prop="average_price"
              label="人均价格">
          </el-table-column>
          <el-table-column
              prop="name"
              label="开始时间">
          </el-table-column>
          <el-table-column
              prop="name"
              label="当前入住人数">
          </el-table-column>
          <el-table-column
              prop="name"
              label="剩余床位">
          </el-table-column>
          <el-table-column
              prop="name"
              label="结束时间">
          </el-table-column>
          <el-table-column
              prop="name"
              label="照片">
          </el-table-column>
          <el-table-column
              prop="name"
              label="片区经理">
          </el-table-column>
          <el-table-column
              prop="name"
              label="部门">
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
               @clickOperateMore="clickEvent"></RightMenu>
  </div>
</template>

<script>
  import RightMenu from '../common/rightMenu.vue';    //右键

  export default {
    name: 'staff-records',
    components: {RightMenu},
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
          house_type : 2,
        },
        isHigh: false,
        totalNum: 0,
        tableData: [],
        tableStatus: ' ',
        tableLoading: false,


      }
    },
    mounted() {
      this.getData();
    },
    watch: {},
    methods: {

      dblClick(row) {
      },
      closeModal() {
        this.search();
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
          }else {
            this.tableStatus = '暂无数据';
            this.tableData = [];
          }
        })
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

      // 右键
      openContextMenu(row, event) {
        this.currentId = row.id;
        this.contextMenuParam(event);
      },
      // 右键回调
      clickEvent(val) {

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
    },
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>

</style>
