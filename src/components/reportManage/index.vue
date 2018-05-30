<template>
  <div>
    <ReportManage v-if="!isEditReportManage"></ReportManage>
    <EditReportManage v-if="isEditReportManage"></EditReportManage>

  </div>
</template>

<script>
  import ReportManage from './components/reportManage'
  import EditReportManage from './components/editReportManage'
  export default {
    components:{ReportManage,EditReportManage},
    computed:{
      isEditReportManage(){
        return this.$store.state.app.isEditReportManage;
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped="">

</style>

