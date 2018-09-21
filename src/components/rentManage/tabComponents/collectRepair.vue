<template>
  <div>
    <el-table
      :data="tableData"
      :empty-text='tableStatus'
      v-loading="tableLoading"
      element-loading-text="拼命加载中"
      element-loading-spinner="el-icon-loading"
      element-loading-background="rgba(255, 255, 255, 0)"
      @row-dblclick="dblClickTable"
      style="width: 100%">
      <el-table-column
        prop="contract_type"
        label="创建时间">
        <template slot-scope="scope">
          <span v-if="scope.row.create_time">{{scope.row.create_time}}</span>
          <span v-if="!scope.row.create_time">暂无</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="customer_name"
        label="客户姓名">
        <template slot-scope="scope">
          <span v-if="scope.row.customer_name">{{scope.row.customer_name}}</span>
          <span v-if="!scope.row.customer_name">暂无</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="customer_mobile"
        label="回复电话">
        <template slot-scope="scope">
          <span v-if="scope.row.customer_mobile">{{scope.row.customer_mobile}}</span>
          <span v-if="!scope.row.customer_mobile">暂无</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="content"
        label="维修内容">
        <template slot-scope="scope">
          <span v-if="scope.row.content">{{scope.row.content}}</span>
          <span v-if="!scope.row.content">暂无</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="repair_time"
        label="预计维修时间">
        <template slot-scope="scope">
          <span v-if="scope.row.repair_time">{{scope.row.repair_time}}</span>
          <span v-if="!scope.row.repair_time">暂无</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="repair_master"
        label="维修师傅">
        <template slot-scope="scope">
          <span v-if="scope.row.repair_master">{{scope.row.repair_master}}</span>
          <span v-if="!scope.row.repair_master">暂无</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="repair_result"
        label="下次跟进时间">
        <template slot-scope="scope">
          <span v-if="scope.row.estimated_time">{{scope.row.estimated_time}}</span>
          <span v-if="!scope.row.estimated_time">暂无</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="repair_money"
        label="跟进人">
        <template slot-scope="scope">
          <span v-if="scope.row.followor">{{scope.row.followor}}</span>
          <span v-if="!scope.row.followor">暂无</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="status"
        label="维修状态">
        <template slot-scope="scope">
          <span v-if="scope.row.status">{{scope.row.status}}</span>
          <span v-if="!scope.row.status">暂无</span>
        </template>
      </el-table-column>
    </el-table>
    <div class="block pages">
      <div>
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="params.page"
          :page-sizes="[3, 6, 9, 12]"
          :page-size="3"
          layout="total, sizes, prev, pager, next, jumper"
          :total="totalNum">
        </el-pagination>
      </div>
    </div>
    <RepairDetail :module="repairDetailDialog" :houseData="houseData" @close="closeRepair"></RepairDetail>
  </div>
</template>

<script>
  import RepairDetail from "../../rentManage/repairManage/repairDetail";

  export default {
    name: 'hello',
    components: {RepairDetail},
    props: ['activeName', 'collectContractId', 'tabStatusChange'],
    data() {
      return {
        tableStatus: ' ',
        tableLoading: false,
        repairDetailDialog: false,
        tableData: [],
        totalNum: 0,
        houseData: {},
        params: {
          page: 1,
          limit: 3,
          contract_id: '',
          is_lease: 1,
          module: 1,
        },

      }
    },
    mounted() {
      this.getTableData();
    },
    activated() {
      this.getTableData();
    },
    watch: {
      activeName(val) {
        if (val === 'CollectRepairTab') {
          this.getTableData();
        }
      },
      collectContractId(val) {
        if (val) {
          this.params.contract_id = val;
          if (this.activeName === 'CollectRepairTab') {
            this.getTableData();
          }
        } else {
          this.tableStatus = "暂无数据";
          this.tableData = [];
          this.totalNum = 0;
        }
      },
      tabStatusChange(val) {
        if (val === 'repair') {
          this.getTableData();
        }
      },
    },
    methods: {
      dblClickTable(row) {
        this.houseData = row;
        if (row.contract.house) {
          this.houseData.house_name = row.contract.house.name;
        } else {
          this.houseData.house_name = '';
        }
        this.houseData.activeName = 'first';
        this.repairDetailDialog = true;
      },
      closeRepair() {
        this.houseData = {};
        this.repairDetailDialog = false;
      },
      getTableData() {
        this.tableStatus = " ";
        this.tableLoading = true;
        this.$http.get(globalConfig.server + 'repaire/list', {params: this.params}).then((res) => {
          this.tableLoading = false;
          if (res.data.code === '600200') {
            this.tableData = res.data.data.data;
            this.totalNum = res.data.data.count;
            if (res.data.data.data.length < 1) {
              this.tableStatus = "暂无数据";
              this.tableData = [];
              this.totalNum = 0;
            }
          } else {
            this.tableStatus = "暂无数据";
            this.tableData = [];
            this.totalNum = 0;
          }
        });
      },
      handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
        this.params.limit = val;
        this.getTableData();
      },
      handleCurrentChange(val) {
        console.log(`当前页: ${val}`);
        this.params.page = val;
        this.getTableData();
      },
    },
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">

</style>
