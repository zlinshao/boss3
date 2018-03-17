<template>
  <div>
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="合同编号" name="first">
        <ContractClaim></ContractClaim>
      </el-tab-pane>
      <el-tab-pane label="收据编号" name="second">
        <Receipt></Receipt>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
  import ContractClaim from './contractClaim/index.vue'
  import Receipt from './receipt/index.vue'
  export default {
    name: "index",
    components: {ContractClaim,Receipt},
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
