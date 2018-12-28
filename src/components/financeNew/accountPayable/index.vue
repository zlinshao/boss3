<template>
  <div id="accountPayable">
    <div style="text-align: right;margin-bottom: 10px">
      <el-input style="width: 15%" size="mini" placeholder="请输入需求搜索的内容" clearable>
        <el-button slot="append" icon="el-icon-search"></el-button>
      </el-input>

      <el-button size="mini" type="primary">高级</el-button>
      <el-button size="mini" type="primary" icon="el-icon-refresh" @click="getPayableList"></el-button>
    </div>
    <!--应付-->
    <div>
      <el-table
        :empty-text='payEmpty'
        v-loading="payLoading"
        element-loading-text="拼命加载中"
        element-loading-spinner="el-icon-loading"
        element-loading-background="rgba(255, 255, 255, 0)"
        :data="payableList"
      >
        <el-table-column label="付款时间" prop="pay_date"></el-table-column>
        <el-table-column label="客户姓名" prop="info.customer"></el-table-column>
        <el-table-column label="地址" prop="addr"></el-table-column>
        <el-table-column label="支出科目" prop="subject"></el-table-column>
        <el-table-column label="应付金额" prop="balance"></el-table-column>
        <el-table-column label="实付金额" prop="amount_paid"></el-table-column>
        <el-table-column label="剩余款项" prop="amount_payable"></el-table-column>
        <el-table-column label="补齐时间" prop="complete_date"></el-table-column>
        <el-table-column label="状态" prop="status">
          <template slot-scope="scope">
            <el-button v-if="scope.row.status === 1" type="danger" size="mini">待入账</el-button>
            <el-button v-if="scope.row.status === 2" type="warning" size="mini">待结清</el-button>
            <el-button v-if="scope.row.status === 3" type="success" size="mini">已结清</el-button>
            <el-button v-if="scope.row.status === 4" type="primary" size="mini">已超额</el-button>
          </template>
        </el-table-column>
        <el-table-column label="手机号" prop="customer_account_num"></el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button type="text" size="mini" @click="LookPayableDetail(scope.row)">详情</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>

  </div>
</template>
<script>
  import subjectTree from '../components/subjectTree.vue'

  export default {
    name: 'accountPayable',
    components: {subjectTree},
    data() {
      return {
        url: globalConfig.finance_server,
        params: {
          status: '', //款项状态
          subject_id: '', //科目
          department_id: '',  //部门id数组
          staff_id: '', //员工id数组
          date_min: '',//最小日期
          date_max: '', //最大日期
          search: '', //搜索条件
          page: 1,
          limit: 15,
        },
        payEmpty: '',
        payLoading: false,
        payableList: [], //列表数据
        payableCount: 0,
        balanceSum: 0, //应付
        payableSum: 0, //剩余
        paidSum: 0, //实付
      }
    },
    mounted() {
      this.getPayableList();
    },
    methods: {
      //查看详情
      LookPayableDetail(row) {
        console.log(row)
      },
      //列表数据
      getPayableList() {
        this.payLoading = true;
        this.$http.get(this.url + 'account/payable/index', {params: this.params}).then(res => {
          console.log(res);
          if (res.data.success) {
            this.payableList = res.data.data.data;
            this.payableCount = res.data.data.count;
            this.balanceSum = res.data.data.balanceSum;
            this.payableSum = res.data.data.payableSum;
            this.paidSum = res.data.data.paidSum;
          } else {
            this.payEmpty = '暂无数据';
          }
          this.payLoading = false;
        }).catch(err => {
          console.log(err);
        })
      },
    }
  }

</script>
<style scoped>

</style>
