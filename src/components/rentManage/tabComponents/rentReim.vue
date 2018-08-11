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
        prop="create_time"
        label="创建时间">
        <template slot-scope="scope">
          <span v-if="scope.row.create_time">{{scope.row.create_time}}</span>
          <span v-if="!scope.row.create_time">暂无</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="staffs.real_name"
        label="创建人">
        <template slot-scope="scope">
          <span v-if="scope.row.staffs && scope.row.staffs.real_name">{{scope.row.staffs.real_name}}</span>
          <span v-if="!(scope.row.staffs && scope.row.staffs.real_name)">暂无</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="reimbursement_number"
        label="报销单编号">
        <template slot-scope="scope">
          <span v-if="scope.row.reimbursement_number">{{scope.row.reimbursement_number}}</span>
          <span v-if="!scope.row.reimbursement_number">暂无</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="contracts.house.name"
        label="房屋地址">
        <template slot-scope="scope">
          <span v-if="scope.row.contracts && scope.row.contracts.house && scope.row.contracts.house.name">{{scope.row.contracts.house.name}}</span>
          <span
            v-if="!(scope.row.contracts && scope.row.contracts.house && scope.row.contracts.house.name)">暂无</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="source.dictionary_name"
        label="来源">
        <template slot-scope="scope">
              <span
                v-if="scope.row.source && scope.row.source.dictionary_name">{{scope.row.source.dictionary_name}}</span>
          <span v-if="!(scope.row.source && scope.row.source.dictionary_name)">暂无</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="type.dictionary_name"
        label="报销类型">
        <template slot-scope="scope">
                  <span
                    v-if="scope.row.type && scope.row.type.dictionary_name">{{scope.row.type.dictionary_name}}</span>
          <span v-if="!(scope.row.type && scope.row.type.dictionary_name)">暂无</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="amount"
        label="报销金额">
        <template slot-scope="scope">
          <span v-if="scope.row.amount">{{scope.row.amount}}</span>
          <span v-if="!scope.row.amount">暂无</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="account_bank"
        label="开户行">
        <template slot-scope="scope">
          <span v-if="scope.row.account_bank">{{scope.row.account_bank}}</span>
          <span v-if="!scope.row.account_bank">暂无</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="branch_bank"
        label="支行">
        <template slot-scope="scope">
          <span v-if="scope.row.branch_bank">{{scope.row.branch_bank}}</span>
          <span v-if="!scope.row.branch_bank">暂无</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="bank_num"
        label="银行卡号">
        <template slot-scope="scope">
          <span v-if="scope.row.bank_num">{{scope.row.bank_num}}</span>
          <span v-if="!scope.row.bank_num">暂无</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="account_name"
        label="开户人">
        <template slot-scope="scope">
          <span v-if="scope.row.account_name">{{scope.row.account_name}}</span>
          <span v-if="!scope.row.account_name">暂无</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="status.dictionary_name"
        label="报销状态">
        <template slot-scope="scope">
          <el-button class="btnStatus" v-if="scope.row.status.id == 654" type="primary" size="mini">
            {{scope.row.status.dictionary_name}}
          </el-button>
          <el-button class="btnStatus" v-if="scope.row.status.id !== 654 && scope.row.status.id "
                     type="info" size="mini">{{scope.row.status.dictionary_name}}
          </el-button>
          <span v-if="!scope.row.status.dictionary_name">暂无</span>
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
    <ReimbursementDetail :reimbursementDetailDialog="reimbursementDetailDialog" :reimbursementId="reimbursementId"
                         @close="closeModal"></ReimbursementDetail>
  </div>
</template>

<script>
  import ReimbursementDetail from '../../customService/expenseAccount/components/reimbursementDetail';
  export default {
    name: 'hello',
    props: ['activeName', 'rentContractId', 'tabStatusChange'],
    components:{ReimbursementDetail},
    data() {
      return {
        tableStatus: ' ',
        tableLoading: false,
        reimbursementDetailDialog: false,
        reimbursementId : '',
        tableData: [],
        totalNum: 0,
        params: {
          page: 1,
          limit: 3,
          contract_id: '',
          module: 2,
        },
      }
    },

    watch: {
      activeName(val) {
        if (val === 'RentReimTab') {
          this.params.page = 1;
          this.getTableData();
        }
      },
      rentContractId(val) {
        if (val) {
          this.params.contract_id = val;
          if (this.activeName === 'RentReimTab') {
            this.params.page = 1;
            this.getTableData();
          }
        } else {
          this.tableStatus = "暂无数据";
          this.tableData = [];
          this.totalNum = 0;
        }
      },
      tabStatusChange(val) {
        if (val === 'reimbursement' && this.rentContractId) {
          this.getTableData();
        }
      }
    },
    methods: {
      dblClickTable(row, event) {
        this.reimbursementId = row.id;
        this.reimbursementDetailDialog = true;
      },
      getTableData() {
        this.tableStatus = " ";
        this.tableLoading = true;
        this.$http.get(globalConfig.server + 'customer/reimbursement', {params: this.params}).then((res) => {
          this.tableLoading = false;
          if (res.data.code === '30000') {
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
      closeModal(){
        this.reimbursementDetailDialog = false;
      },
    },
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">

</style>
