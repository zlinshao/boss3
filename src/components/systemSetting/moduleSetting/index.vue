<template>
  <div>
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="积分管理" name="first">
        <IntegralManagement></IntegralManagement>
      </el-tab-pane>
      <el-tab-pane label="合同编号管理" name="second">
        <ContractManagement></ContractManagement>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
  import IntegralManagement from './integralManagement/index.vue'
  import ContractManagement from './contractManagement/index.vue'
  export default {
 
    name: "index",
    components: {IntegralManagement,ContractManagement},
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
