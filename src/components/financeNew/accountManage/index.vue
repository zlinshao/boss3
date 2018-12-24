<template>
    <div id="accountManage">
      <div style="text-align: right;">
        <el-input type="text" placeholder="账户名称/开户银行" clearable size="mini" style="width: 15%" v-model="params.search" @keyup.enter.native="getAccountList">
          <template slot="append">
            <i class="el-icon-search" @click="getAccountList" style="cursor: pointer;"></i>
          </template>
        </el-input>
        <el-button type="primary" size="mini" @click="isHigh = !isHigh">高级</el-button>
      </div>
      <div style="margin-top: 10px;">
        <el-table
          :data="accountList"
          :empty-text="accountEmpty"
          v-loading="accountLoading"
          element-loading-text="拼命加载中..."
          element-loading-spinner="el-icon-loading"
          element-loading-background="rgba(255, 255, 255, 0)"
        >
          <el-table-column label="账户名称" prop="name"></el-table-column>
          <el-table-column label="账户类型" prop="cate">
            <template slot-scope="scope">
              <span v-text="accountCate(scope)"></span>
            </template>
          </el-table-column>
          <el-table-column label="开户人" prop="account_owner"></el-table-column>
          <el-table-column label="账号" prop="account_num"></el-table-column>
          <el-table-column label="开户银行" prop="display_name"></el-table-column>
          <el-table-column label="支行" prop="sub_bank"></el-table-column>
          <el-table-column label="初始金额" prop="amount_base"></el-table-column>
          <el-table-column label="当前余额" prop="amount_remain"></el-table-column>
          <el-table-column label="备注" prop="remark"></el-table-column>
        </el-table>
        <el-pagination
          :total="accountTotal"
          :page-size="params.limit"
          :current-page="params.page"
          @current-change="handlePageChange"
          layout="total,prev,pager,next"
          style="text-align: right;"
        ></el-pagination>
      </div>
      <!--高级搜索内容-->
      <div class="highRanking" style="position:static !important;">
        <div class="filter high_grade" :class="isHigh? 'highHide':''">
          <el-form :inline="true" onsubmit="return false" :model="params" size="mini" label-width="100px">
            <div class="filterTitle">
              <i class="el-icons-fa-bars"></i>&nbsp;&nbsp;高级搜索
            </div>
            <el-row class="el_row_border">
              <el-col :span="12">
                <el-row>
                  <el-col :span="8">
                    <div class="el_col_label">账户类型</div>
                  </el-col>
                  <el-col :span="16" class="el_col_option">
                    <el-select v-model="params.cate" size="mini" style="width: 35%">
                      <el-option label="银行" :value="1"></el-option>
                      <el-option label="支付宝" :value="2"></el-option>
                      <el-option label="微信" :value="3"></el-option>
                      <el-option label="银行卡" :value="4"></el-option>
                    </el-select>
                  </el-col>
                </el-row>
              </el-col>
              <el-col :span="12">
                <el-row>
                  <el-col :span="8">
                    <div class="el_col_label">账户账号</div>
                  </el-col>
                  <el-col :span="16" class="el_col_option">
                    <el-input size="mini" placeholder="请输入账户账号" v-model="params.account_num" style="width: 35%"></el-input>
                  </el-col>
                </el-row>
              </el-col>
              <el-col :span="12">
                <el-row>
                  <el-col :span="8">
                    <div class="el_col_label">开户人</div>
                  </el-col>
                  <el-col :span="16" class="el_col_option">
                    <el-input size="mini" placeholder="请输入开户人" v-model="params.account_owner" style="width: 35%"></el-input>
                  </el-col>
                </el-row>
              </el-col>
            </el-row>
            <div class="btnOperate">
              <el-button size="mini" type="primary" @click="getAccountList">搜索</el-button>
              <el-button size="mini" type="primary" @click="resetting">重置</el-button>
              <el-button size="mini" type="primary" @click="isHigh = false">取消</el-button>
            </div>
          </el-form>
        </div>
      </div>
    </div>
</template>

<script>
    export default {
      name: "index",
      data() {
        return {
          url: globalConfig.finance_server,
          accountList: [],
          accountTotal: 0,
          accountEmpty: '',
          accountLoading: false,
          params: {
            page: 1,
            limit: 10,
            search: '',
            cate: '',
            account_owner: '',
            account_num: '',
          },
          isHigh: false
        }
      },
      mounted() {
        this.getAccountList();
      },
      computed: {

      },
      methods: {
        resetting() {
          this.params = {
              page: 1,
              limit: 10,
              search: '',
              cate: '',
              account_owner: '',
              account_num: '',
          }
        },
        handlePageChange(page) {
          this.params.page = page;
          this.getAccountList();
        },
        accountCate(scope) {
          if (!scope.row.cate) {
            return '/';
          }
          const type = scope.row.cate;
          return type === 1 ? '银行' : type === 2 ? '支付宝' : type === 3 ? '微信' : '银行卡';
        },
        getAccountList() {
          this.accountLoading = true;
          this.accountEmpty = ' ';
          const session = JSON.parse(localStorage.getItem('personal')).session_id;
          this.$http.get(this.url + '/account/manage/index',{headers: {Session: session},params:this.params}).then(res => {
            console.log(res);
            if(res.data.success) {
              this.accountLoading = false;
              this.isHigh = false;
              this.accountEmpty = '';
              this.accountList = res.data.data.data;
              this.accountTotal = res.data.data.count;
            }else {
              this.isHigh = false;
              this.accountLoading = false;
              this.accountEmpty = '暂无数据';
              this.accountList = [];
              this.accountTotal = 0;
            }
          }).catch(err => {
            console.log(err);
          })
        },
      }
    }
</script>

<style scoped>
  #accountManage{
    position: relative;
  }
</style>
