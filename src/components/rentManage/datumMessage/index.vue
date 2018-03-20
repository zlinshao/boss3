<template>
  <div id="datum">
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="房屋管理" name="first">
        <HousesManage></HousesManage>
      </el-tab-pane>
      <el-tab-pane label="客户管理" name="second">
        <ClientManage></ClientManage>
      </el-tab-pane>
      <el-tab-pane label="合同管理" name="third">
        <ContractManage></ContractManage>
      </el-tab-pane>
      <el-tab-pane label="工单管理" name="fourth">
        <WorkOrderManage></WorkOrderManage>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
  import HousesManage from './housesManage/index.vue'
  import ClientManage from './clientManage/index.vue'
  import ContractManage from './contractManage/index.vue'
  import WorkOrderManage from './workOrderManage/index.vue'

  export default {
    name: "datum",
    components: {HousesManage, ClientManage, ContractManage,WorkOrderManage},
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
