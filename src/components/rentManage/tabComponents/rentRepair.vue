<template>
    <div>
      <el-table
        :data="tableData"
        :empty-text='tableStatus'
        v-loading="tableLoading"
        element-loading-text="拼命加载中"
        element-loading-spinner="el-icon-loading"
        element-loading-background="rgba(255, 255, 255, 0)"
        style="width: 100%">
        <el-table-column
          prop="contract_type"
          label="合同类型">
          <template slot-scope="scope">
            <span v-if="scope.row.contract_type">{{scope.row.contract_type}}</span>
            <span v-if="!scope.row.contract_type">暂无</span>
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
          prop="sex"
          label="性别">
          <template slot-scope="scope">
            <span v-if="scope.row.sex">{{scope.row.sex}}</span>
            <span v-if="!scope.row.sex">暂无</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="customer_mobile"
          label="客户电话">
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
          label="维修时间">
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
          label="维修结果">
          <template slot-scope="scope">
            <span v-if="scope.row.repair_result">{{scope.row.repair_result}}</span>
            <span v-if="!scope.row.repair_result">暂无</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="repair_money"
          label="维修金额">
          <template slot-scope="scope">
            <span v-if="scope.row.repair_money">{{scope.row.repair_money}}</span>
            <span v-if="!scope.row.repair_money">暂无</span>
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
        <el-table-column
          prop="person_liable"
          label="认责人">
          <template slot-scope="scope">
            <span v-if="scope.row.liable">{{scope.row.liable}}</span>
            <span v-if="!scope.row.liable">暂无</span>
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
    </div>
</template>

<script>
    export default {
        name: 'hello',
      props: ['activeName', 'rentContractId'],
      data () {
        return {
          tableStatus: ' ',
          tableLoading: false,
          tableData: [],
          totalNum: 0,
          params: {
            page: 1,
            limit: 3,
            contract_id: ''
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
        activeName(val){
          if(val=== 'RentRepairTab'){
            this.getTableData();
          }
        },
        rentContractId(val) {
          this.params.contract_id = val;
          if(this.activeName === 'RentRepairTab'){
            this.getTableData();
          }
        },
      },
      methods: {
        getTableData() {
          this.tableStatus = " ";
          this.tableLoading = true;
          this.$http.get(globalConfig.server + 'repaire/list?module=2&limit='+this.params.limit+'&page='+this.params.page+'&contract_id='+this.params.contract_id).then((res) => {
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
