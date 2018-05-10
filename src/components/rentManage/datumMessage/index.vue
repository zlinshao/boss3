<!--<template>-->
  <!--<div id="datum">-->
    <!--<el-tabs v-model="activeName" @tab-click="handleClick">-->
      <!--<el-tab-pane label="客户管理" name="first">-->
        <!--<ClientManage></ClientManage>-->
      <!--</el-tab-pane>-->
      <!--<el-tab-pane label="合同管理" name="second">-->
        <!--<ContractManage></ContractManage>-->
      <!--</el-tab-pane>-->
      <!--<el-tab-pane label="工单管理" name="third">-->
        <!--<WorkOrderManage></WorkOrderManage>-->
      <!--</el-tab-pane>-->
    <!--</el-tabs>-->
  <!--</div>-->
<!--</template>-->

<!--<script>-->
  <!--import ClientManage from './clientManage/index1.vue'-->
  <!--import ContractManage from './contractManage/index1.vue'-->
  <!--import WorkOrderManage from './workOrderManage/index1.vue'-->

  <!--export default {-->
    <!--name: "datum",-->
    <!--components: { ClientManage, ContractManage,WorkOrderManage},-->
    <!--data() {-->
      <!--return {-->
        <!--activeName: 'first'-->
      <!--}-->
    <!--},-->
    <!--computed : {-->
      <!--active_name(){-->
        <!--return this.$store.state.datum.active_name;-->
      <!--}-->
    <!--},-->
    <!--mounted() {-->
      <!--this.activeName = this.active_name?this.active_name:'first'-->
    <!--},-->
    <!--watch: {-->
      <!--activeName(val){-->
        <!--this.$store.dispatch('activeName',val)-->
      <!--}-->
    <!--},-->
    <!--methods: {-->
      <!--handleClick(val) {-->

      <!--}-->
    <!--},-->
  <!--}-->
<!--</script>-->

<!--<style scoped>-->

<!--</style>-->
