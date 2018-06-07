<template>
  <div>
    <div id="onlineExam">
      <div class="filter">
        <el-form :inline="true" onsubmit="return false" size="mini">
          <el-form-item>
            <el-input placeholder="请选择员工" v-model="staff_name" size="mini" readOnly @focus="openOrganizeModal">
              <template slot="append">
                <div style="cursor: pointer;" @click="emptySearch">清空</div>
              </template>
            </el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" size="mini" @click="exportDialog = true">导 出</el-button>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" size="mini" @click="importDialog = true">导 入</el-button>
          </el-form-item>
        </el-form>
      </div>
      <div class="main">
        <div>
          <el-table
            :data="tableData"
            :empty-text='rentStatus'
            v-loading="rentLoading"
            element-loading-text="拼命加载中"
            element-loading-spinner="el-icon-loading"
            element-loading-background="rgba(255, 255, 255, 0)"
            style="width: 100%">
            <el-table-column
              prop="create_time"
              label="导入时间">
            </el-table-column>
            <!--<el-table-column-->
              <!--prop="name"-->
              <!--label="导入数量">-->
            <!--</el-table-column>-->
            <el-table-column
              width="500"
              label="账户及余额">
              <template slot-scope="scope">
                <ul>
                  <li v-for="(val,key) in scope.row.account_snapshot">
                    <span style="display:inline-block;width: 200px;text-align: right;color: #6a8dfb">{{key}} : </span>
                    <span style="display:inline-block;width: 200px;text-align: left">{{val}}元</span>
                  </li>
                </ul>
              </template>
            </el-table-column>
            <el-table-column
              label="操作人">
              <template slot-scope="scope">
                <span v-if="scope.row.simple_staff && scope.row.simple_staff.real_name">
                  {{scope.row.simple_staff.real_name}}
                </span>
                <span v-else="">/</span>
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
          :total="tableNum">
          </el-pagination>
        </div>
      </div>
    </div>
    <ExportData :exportDialog="exportDialog" @close="closeModal"></ExportData>
    <ImportData :importDialog="importDialog" @close="closeModal"></ImportData>

    <Organization :organizationDialog="organizationDialog" :length="length" :type="type"
                  @close='closeModal' @selectMember="selectMember"></Organization>
  </div>
</template>

<script>
  import ExportData from './components/exportData'
  import ImportData from './components/importData'
  import Organization from '../common/organization.vue'                          //选人组件
  export default {
    name: "index",
    components:{ExportData,ImportData,Organization},
    data() {
      return {
        tableData: [],
        tableNum: 0,
        params:{
          limit:12,
          page:1,
          operator_id : '',
        },
        staff_name : '',
        length : '',
        type : '',
        rentStatus: " ",
        rentLoading : false,
        exportDialog : false,
        importDialog : false,
        organizationDialog : false,
      };
    },
    activated() {
      this.myData();
    },
    mounted() {
    },
    watch: {

    },
    methods: {
      myData() {
        this.rentStatus = " ";
        this.rentLoading = true;
        this.$http.get(globalConfig.server + "financial/payable/transfer/record",{params:this.params}).then((res) => {
          this.rentLoading = false;
          if(res.data.code == '80000'){
            this.tableData = res.data.data.data;
            this.tableNum = res.data.data.count;
          }else {
            this.rentStatus = "暂无数据";
            this.tableData = [];
            this.tableNum = 0;
          }
        });
      },
      closeModal(val){
        this.exportDialog = false;
        this.importDialog = false;
        this.organizationDialog = false;
        if(val = 'success'){
          this.myData();
        }
      },
      handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
      },
      handleCurrentChange(val) {
        this.params.page = val;
        this.myData();
      },
      openOrganizeModal() {
        this.organizationDialog = true;
        this.length = 1;
        this.type = 'staff';
      },
      selectMember(val) {
        this.params.operator_id = val[0].id;
        this.staff_name = val[0].name;
        this.search();
      },
      emptySearch(){
        this.params.operator_id = '';
        this.staff_name = '';
        this.search();
      },
      search(){
        this.params.page = 1;
        this.myData();
      },
    }
  };
</script>

<style lang="scss" scoped>
  .filter{
    float: right;
  }
</style>
