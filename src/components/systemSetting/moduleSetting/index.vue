<template>
  <div>
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="积分管理" name="first">
        <IntegralManagement></IntegralManagement>
      </el-tab-pane>
      <el-tab-pane label="合同编号管理" name="second">
        <ContractManagement></ContractManagement>
      </el-tab-pane>
      <el-tab-pane label="功能说明" name="third">
        <FunctionDescription></FunctionDescription>
      </el-tab-pane>
      <el-tab-pane label="业绩包管理" name="fourth">
        <PackageManagement></PackageManagement>
      </el-tab-pane>
      <el-tab-pane label="问答回复管理" name="fifth">
        <ReplierManage></ReplierManage>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>

  import FunctionDescription from './functionDescription/index.vue'
  import IntegralManagement from './integralManagement/index.vue';
  import ContractManagement from './contractManagement/index.vue';
  import PackageManagement from './packageManagement/index.vue';
  import ReplierManage from './replierManage/index.vue';

  export default {
    name: "index",
    components: {IntegralManagement, ContractManagement, FunctionDescription, PackageManagement, ReplierManage},
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
