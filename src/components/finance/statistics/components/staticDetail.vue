<template>
  <div id="staticDetail">
    <el-row>
      <el-span :span="24">
        <!--应收-->
        <div class="border_table" v-if="lookType === 'collect'">
          <el-table
            :data="collectData"
            width="100%">
            <el-table-column
              label="收款时间"
              prop="date"
              width="90px">
            </el-table-column>
            <el-table-column
              label="客户姓名"
              prop="name">
            </el-table-column>
            <el-table-column
              label="手机号"
              prop="mobile"
              width="100px">
            </el-table-column>
            <el-table-column
              label="收入科目"
              prop="subject">
            </el-table-column>
            <el-table-column
              label="应收金额"
              prop="collectMoney">
            </el-table-column>
            <el-table-column
              label="实收金额"
              prop="receivedMoney">
            </el-table-column>
            <el-table-column
              label="剩余款项"
              prop="remainder">
            </el-table-column>
            <el-table-column
              label="补齐时间"
              prop="polishing"
              width="90px">
            </el-table-column>
            <el-table-column
              label="租房月数"
              prop="months">
            </el-table-column>
            <el-table-column
              label="付款方式"
              prop="payWay">
            </el-table-column>
            <el-table-column
              label="月单价"
              prop="unitPrice">
            </el-table-column>
            <el-table-column
              label="合同时间周期"
              prop="contractPeriod"
              width="100px">
            </el-table-column>
            <el-table-column
              label="状态"
              prop="status">
              <template slot-scope="scope">
                <el-button v-if="scope.row.status == 1" class="btn btn1" size="mini">待入账</el-button>
                <el-button v-if="scope.row.status == 2" class="btn btn2" size="mini">待结清</el-button>
                <el-button v-if="scope.row.status == 3" class="btn btn3" size="mini">已结清</el-button>
                <el-button v-if="scope.row.status == 4" class="btn btn4" size="mini">已超额</el-button>
              </template>
            </el-table-column>
            <el-table-column
              label="备注"
              prop="remark">
            </el-table-column>
            <el-table-column
              label="开单人"
              prop="staff_name">
            </el-table-column>
            <el-table-column
              label="部门"
              prop="department_name">
            </el-table-column>
          </el-table>

          <div class="block pages">
            <!--<div>-->
            <!--<span>-->
            <!--应收金额(元)：<span style="color: #78cd51;">4630988.50</span>-->
            <!--</span>&nbsp;&nbsp;&nbsp;&nbsp;-->
            <!--<span>-->
            <!--实收金额(元)：<span style="color: #f66;">129773.64</span>-->
            <!--</span>&nbsp;&nbsp;&nbsp;&nbsp;-->
            <!--<span>-->
            <!--剩余款项(元)：<span style="color: #ff9a02;">4501414.86</span>-->
            <!--</span>&nbsp;&nbsp;&nbsp;&nbsp;-->
            <!--<span>-->
            <!--今日到期：1-->
            <!--</span>-->
            <!--</div>-->
            <el-pagination
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
              :current-page="currentPage"
              :page-sizes="[20, 100, 200, 300, 400]"
              :page-size="20"
              layout="total, sizes, prev, pager, next, jumper"
              :total="400">
            </el-pagination>
          </div>
        </div>

        <!--应付-->
        <div class="border_table" v-if="lookType === 'rent'">
          <el-table
            :data="payData"
            width="100%"
            @row-contextmenu="payMenu">
            <el-table-column
              label="付款时间"
              prop="date"
              width="90px">
            </el-table-column>
            <el-table-column
              label="客户姓名"
              prop="name">
            </el-table-column>
            <el-table-column
              label="手机号"
              prop="mobile"
              width="100px">
            </el-table-column>
            <el-table-column
              label="支出科目"
              prop="subject">
            </el-table-column>
            <el-table-column
              label="应付金额"
              prop="payMoney">
            </el-table-column>
            <el-table-column
              label="实付金额"
              prop="payableMoney">
            </el-table-column>
            <el-table-column
              label="剩余款项"
              prop="remainder">
            </el-table-column>
            <el-table-column
              label="补齐时间"
              prop="polishing"
              width="90px">
            </el-table-column>
            <el-table-column
              label="收房月数"
              prop="months">
            </el-table-column>
            <el-table-column
              label="付款方式"
              prop="payWay">
            </el-table-column>
            <el-table-column
              label="月单价"
              prop="unitPrice">
            </el-table-column>
            <el-table-column
              label="第一次付款时间"
              prop="firstDate">
            </el-table-column>
            <el-table-column
              label="第二次付款时间"
              prop="secondDate">
            </el-table-column>
            <el-table-column
              label="合同时间周期"
              prop="contractPeriod"
              width="90px">
            </el-table-column>
            <el-table-column
              label="状态"
              prop="status">
              <template slot-scope="scope">
                <el-button v-if="scope.row.status == 1" class="btn btn1" size="mini">待入账</el-button>
                <el-button v-if="scope.row.status == 2" class="btn btn2" size="mini">待结清</el-button>
                <el-button v-if="scope.row.status == 3" class="btn btn3" size="mini">已结清</el-button>
                <el-button v-if="scope.row.status == 4" class="btn btn4" size="mini">已超额</el-button>
              </template>
            </el-table-column>
            <el-table-column
              label="备注"
              prop="remark">
            </el-table-column>
            <el-table-column
              label="开单人"
              prop="staff_name">
            </el-table-column>
            <el-table-column
              label="部门"
              prop="department_name">
            </el-table-column>
          </el-table>

          <div class="block pages">
            <!--<div>-->
            <!--<span>-->
            <!--应付金额(元)：<span style="color: #78cd51;">16038533.20</span>-->
            <!--</span>&nbsp;&nbsp;&nbsp;&nbsp;-->
            <!--<span>-->
            <!--实付金额(元)：<span style="color: #f66;">14615.62</span>-->
            <!--</span>&nbsp;&nbsp;&nbsp;&nbsp;-->
            <!--<span>-->
            <!--剩余款项(元)：<span style="color: #ff9a02;">16034710.58</span>-->
            <!--</span>&nbsp;&nbsp;&nbsp;&nbsp;-->
            <!--<span>-->
            <!--今日到期：1-->
            <!--</span>-->
            <!--</div>-->
            <el-pagination
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
              :current-page="currentPage"
              :page-sizes="[pageNumber]"
              :page-size="pageNumber"
              layout="total, sizes, prev, pager, next, jumper"
              :total="400">
            </el-pagination>
          </div>
        </div>
      </el-span>
    </el-row>
  </div>
</template>

<script>
  export default {
    name: "static-detail",
    data() {
      return {
        lookType: '',
        currentPage: 1,
        collectData: [
          {
            date: '1990-01-01',
            name: '废话肯定是1-1-1-11-1',
            mobile: '15251830468',
            subject: '押金',
            collectMoney: '11111',
            receivedMoney: '22222',
            remainder: '44555',
            polishing: '2018-01-01',
            months: '12',
            payWay: '第1期押1付12 1200',
            unitPrice: '22222',
            contractPeriod: '2017-03-15~2022-03-15',
            staff_name: '范德萨发',
            department_name: '乐伽商业管理有限公司',
            status: 1,
            details: '刘梦/2017-03-15~2022-03-15/第1年月付3100,第2年月付3100,第3年月付3300,第4年月付3400,第5年月付3500/顾庆伟',
            remark: '放大开始JFK撒粉卡',
          },
        ],
        payData: [
          {
            date: '1990-01-01',
            name: '废话肯定是1-1-1-11-1',
            mobile: '15251830468',
            subject: '押金',
            payMoney: '11111',
            payableMoney: '22222',
            remainder: '44555',
            polishing: '2018-01-01',
            months: '12',
            payWay: '月付',
            unitPrice: '22222',
            firstDate: '1990-01-01',
            secondDate: '1990-01-01',
            contractPeriod: '2017-03-15~2022-03-15',
            staff_name: '范德萨发',
            department_name: '乐伽商业管理有限公司',
            status: 2,
            details: '刘梦/2017-03-15~2022-03-15/第1年月付3100,第2年月付3100,第3年月付3300,第4年月付3400,第5年月付3500/顾庆伟',
            remark: '放大开始JFK撒粉卡',
          },
        ],
      }
    },
    mounted() {
      this.lookType = this.$route.query.detail;
    },
    watch: {},
    methods: {
      handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
      },
      handleCurrentChange(val) {
        console.log(`当前页: ${val}`);
      },
    },
  }
</script>

<style scoped lang="scss">
  #staticDetail {
    height: 100%;
    background: #ffffff;
    padding: 20px;
    .border_table {
      box-shadow: 0 0 10px 0 #bbb;
      padding: 8px;
      border-radius: 3px;
    }
    .btn {
      float: left;
      border: 0;
      color: #FFFFFF;
      cursor: default;
    }
    .btn1 {
      background-color: #fc0;
    }

    .btn2 {
      background-color: #f99;
    }

    .btn3 {
      background-color: #78cd51;
    }

    .btn4 {
      background-color: #F04D3D;
    }
  }
</style>
