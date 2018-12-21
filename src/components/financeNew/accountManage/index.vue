<template>
    <div id="accountManage">
      <div style="text-align: right;">
        <el-input type="text" placeholder="账户名称/卡号" size="mini" style="width: 15%" v-model="search">
          <template slot="append">
            <i class="el-icon-search"></i>
          </template>
        </el-input>
        <el-button type="primary" size="mini" @click="handleGrade">高级</el-button>
      </div>
      <div style="margin-top: 30px;">
        <el-table
          :data="accountList"
        >
          <el-table-column label="账户名称"></el-table-column>
          <el-table-column label="账户类型"></el-table-column>
          <el-table-column label="账号"></el-table-column>
          <el-table-column label="开户银行"></el-table-column>
          <el-table-column label="支行"></el-table-column>
          <el-table-column label="初始金额"></el-table-column>
          <el-table-column label="当前余额"></el-table-column>
          <el-table-column label="备注"></el-table-column>
        </el-table>
        <el-pagination
          :total="100"
          :page-size="15"
          :current-page="2"
          layout="total,prev,pager,next"
          style="text-align: right;"
        ></el-pagination>
      </div>
    </div>
</template>

<script>
    export default {
      name: "index",
      data() {
        return {
          url: globalConfig.finance_server,
          search: '',
          accountList: []
        }
      },
      mounted() {
        this.getAccountList();
      },
      methods: {
        getAccountList() {
          const session = JSON.parse(localStorage.getItem('personal')).session_id;
          console.log(session);
          this.$http.get(this.url + 'account/index',{headers: {SESSION: session}}).then(res => {
            console.log(res);
          }).catch(err => {
            console.log(err);
          })
        },
        handleGrade() {
          this.$message('敬请期待');
        }
      }
    }
</script>

<style scoped>

</style>
