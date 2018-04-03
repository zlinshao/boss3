<template>
  <div id="personal">

    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="个人工资" name="first">
       <pay-roll></pay-roll>
      </el-tab-pane>
      <el-tab-pane label="历史未结" name="second">
        <history-unclear></history-unclear>
      </el-tab-pane>
      <el-tab-pane label="本月工资明细" name="third">
        <salary-details></salary-details>
      </el-tab-pane>
    </el-tabs>


  </div>
</template>

<script>


  import PayRoll from './payroll';   //工资条
  import HistoryUnclear from './historyUnclear'; //历史未结
  import SalaryDetails from './salaryDetails';  //工资明细

  export default {
    name: "index",
    components: {PayRoll,HistoryUnclear,SalaryDetails},
    data() {
      return {
        activeName: 'first',
      }
    },
    mounted() {
    },
    watch: {},
    methods: {

      // tabs标签页
      handleClick(tab, event) {
        console.log(tab, event);
      },


      // 删除
      openDelete() {
        this.$confirm('您确定要冻结' + this.form.months + '的工资吗', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.freezeVisible = false;
          this.$message({
            type: 'success',
            message: '冻结成功!'
          });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消冻结',
          });
        });
      }
    },
  }
</script>

<style lang="scss">
  #personal {
    .bgColor {
      background: #DDDDDD;
    }
    .el-select .el-input {
      width: 88px;
    }
  }
</style>
