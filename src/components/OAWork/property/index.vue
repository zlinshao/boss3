<template>
  <div>
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="办公用品申领" name="first">
        <SuppliesUse></SuppliesUse>
      </el-tab-pane>
      <el-tab-pane label="办公用品汇总" name="second">
        <SuppliesGather></SuppliesGather>
      </el-tab-pane>
      <el-tab-pane label="固定资产异动" name="third">
        <CapitalChange></CapitalChange>
      </el-tab-pane>
      <el-tab-pane label="固定资产总汇" name="fourth">
        <CapitalGather></CapitalGather>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
  import SuppliesUse from './items/officeSuppliesUse.vue'
  import SuppliesGather from './officeSuppliesGather/officeSuppliesGather.vue'
  import CapitalChange from './items/capitalAssetsChange.vue'
  import CapitalGather from './items/capitalAssetsGather.vue'
  export default {
    name: "index",
    components: {SuppliesUse,SuppliesGather,CapitalChange,CapitalGather},
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
