<template>
  <div>
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="日报表" name="first">
        <DailySheet></DailySheet>
      </el-tab-pane>
      <el-tab-pane label="月报表" name="second">
        <MonthSheet></MonthSheet>
      </el-tab-pane>
      <el-tab-pane label="预算" name="third">
        <BudgetManage></BudgetManage>
      </el-tab-pane>
      <el-tab-pane label="房租尾款" name="fourth">
        <EndPayment></EndPayment>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
  import DailySheet from './dailySheet/index.vue'
  import MonthSheet from './monthSheet/index.vue'
  import BudgetManage from './budgetManage/index.vue'
  import EndPayment from './endPayment/index.vue'

  export default {
    name: "index",
    components: {DailySheet, MonthSheet, BudgetManage, EndPayment},
    data() {
      return {
        activeName: 'first'
      }
    },
    mounted() {
    },
    watch: {},
    methods: {
      handleClick(val) {

      }
    },
  }
</script>

<style scoped>

</style>
