<template>
  <div class="incomeFlow">
    <div class="filter">
      <el-form :inline="true" :mdoel="form" size="mini" label-width="80px">
        <el-form-item>
          <el-select v-model="form.incomes" clearable>
            <el-option label="混合" value=""></el-option>
            <el-option v-for="(key,index) in incomeValue" :label="key" :value="index + 1" :key="index"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-select v-model="form.banks" clearable>
            <el-option label="请选择银行" value=""></el-option>
            <el-option v-for="(key,index) in bankValue" :label="key" :value="index + 1" :key="index"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <div class="block">
            <span class="demonstration">带快捷选项</span>
            <el-date-picker
              v-model="form.dates"
              type="daterange"
              align="right"
              unlink-panels
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              :picker-options="pickerOptions">
            </el-date-picker>
          </div>
        </el-form-item>
        <el-form-item>
          <el-input v-model="form.subjects" placeholder="请选择科目" readonly>
            <template slot="append">
              <div style="cursor: pointer;" @click="close_subject">清空</div>
            </template>
          </el-input>
        </el-form-item>
        <el-form-item>
          <el-input placeholder="房屋地址" v-model="form.keyWords">
            <el-button slot="append" icon="el-icon-search"></el-button>
          </el-input>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" size="mini">导出</el-button>
        </el-form-item>
      </el-form>
    </div>
    <!--<div class="income">-->
    <!--<div>-->
    <!--<h1>收入金额(元)</h1>-->
    <!--<h2>45294072.86</h2>-->
    <!--</div>-->
    <!--<div>-->
    <!--<h1>支出金额(元)</h1>-->
    <!--<h2>48859238.92</h2>-->
    <!--</div>-->
    <!--<div>-->
    <!--<h1>收入支出差(元)</h1>-->
    <!--<h2>48859238.92</h2>-->
    <!--</div>-->
    <!--</div>-->
    <el-table
      :data="tableData"
      width="100%">
      <el-table-column width="30px">
        <template slot-scope="scope">
          <div v-if="scope.row.status === 'show'" class="formStatus" style="background-color: #FF6666;"></div>
          <div v-if="scope.row.status === 'hide'" class="formStatus" style="background-color: #66CC33;"></div>
        </template>
      </el-table-column>
      <el-table-column
        label="ID"
        prop="id"
        width="66px">
      </el-table-column>
      <el-table-column
        label="交易时间"
        prop="date"
        min-width="88px">
      </el-table-column>
      <el-table-column
        label="客户姓名"
        prop="name">
      </el-table-column>
      <el-table-column
        label="科目名称"
        prop="subject">
      </el-table-column>
      <el-table-column
        label="类型"
        prop="types">
      </el-table-column>
      <el-table-column
        label="账户名称"
        prop="accountName"
        min-width="130px">
      </el-table-column>
      <el-table-column
        label="卡33号"
        prop="account"
        min-width="130px">
      </el-table-column>
      <el-table-column
        label="实收金额"
        prop="collectMoney">
      </el-table-column>
      <el-table-column
        label="实付金额"
        prop="payMoney">
      </el-table-column>
      <el-table-column
        label="账户余额"
        prop="balance">
      </el-table-column>
      <el-table-column
        label="详细信息"
        prop="details"
        min-width="160px">
      </el-table-column>
      <el-table-column
        label="收/付款人员"
        prop="personal"
        min-width="90px">
      </el-table-column>
    </el-table>

    <div class="block pages">
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
</template>

<script>
  export default {
    name: "index",
    data() {
      return {
        currentPage: 1,
        form: {
          incomes: '',
          banks: '',
          dates: '',
          subjects: '',
          keywords: '',
        },
        incomeValue: ['收入', '支出'],
        bankValue: ['中国银行', '中国银行', '中国银行', '中国银行', '中国银行',],
        pickerOptions: {
          shortcuts: [{
            text: '最近一周',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit('pick', [start, end]);
            }
          }, {
            text: '最近一个月',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              picker.$emit('pick', [start, end]);
            }
          }, {
            text: '最近三个月',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
              picker.$emit('pick', [start, end]);
            }
          }]
        },
        tableData: [
          {
            id: '321321',
            status: 'show',
            date: '1990-01-01',
            name: '王小虎',
            subject: '押金',
            types: '支出',
            accountName: '招商银行-（姜千）',
            account: '6214832505670948',
            collectMoney: '33333',
            payMoney: '111111',
            balance: '44555',
            details: '去瞧瞧/',
            personal: '王坤'
          },
          {
            id: '321321',
            status: 'hide',
            date: '1990-01-01',
            name: '王小虎',
            subject: '押金',
            types: '支出',
            accountName: '招商银行-（姜千）',
            account: '6214832505670948',
            collectMoney: '33333',
            payMoney: '111111',
            balance: '44555',
            details: '去瞧瞧/2016-09-11~2024-10-31/第1年月付1400,第2年月付1400,第3年月付1400,第4年月付1500,第5年月付1500,第6年月付1600,第7年月付1600,第8年月付1700/李唯一/',
            personal: '王坤'
          },
        ],
      }
    },

    watch: {},
    methods: {
      close_subject() {
        console.log(1);
      },
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
  @mixin flex {
    display: flex;
    display: -webkit-flex;
  }

  .income {
    /*background-color: #DDDDDD;*/
    @include flex;
    div {
      width: 33.3333%;
      height: 60px;
      @include flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      h1, h2 {
        font-size: 16px;
        font-weight: normal;
        margin: 3px 0;
      }
    }
    div:nth-of-type(1) {
      h2 {
        color: #6c3;
      }
    }
    div:nth-of-type(2) {
      border-right: 1px solid #DDDDDD;
      border-left: 1px solid #DDDDDD;
      h2 {
        color: #f66;
      }
    }
    div:nth-of-type(3) {
      h2 {
        color: #ff9a02;
      }
    }
  }

  .formStatus {
    width: 12px;
    height: 12px;
    border-radius: 50%;
  }
</style>
