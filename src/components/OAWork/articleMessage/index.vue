<template>
  <div>
    <el-tabs v-model="activeName" @tab-click="handleClick(activeName)">
      <el-tab-pane label="乐伽大学" name="first">
        <LejiaCollege></LejiaCollege>
      </el-tab-pane>
      <el-tab-pane label="公司门户" name="second">
        <companyPortal></companyPortal>
      </el-tab-pane>
      <el-tab-pane label="员工广场" name="third">
        <StaffSquare></StaffSquare>
      </el-tab-pane>
      <el-tab-pane label="制度管理" name="fourth">
        <systemManageMent></systemManageMent>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
  import LejiaCollege from './lejiaCollege/index.vue';
  import companyPortal from './companyPortal/index.vue';
  import StaffSquare from './staffSquare/index.vue';
  import systemManageMent from './systemManageMent/index.vue';


  export default {
    name: "index",
    components: {
      StaffSquare,
      LejiaCollege,
      companyPortal,
      systemManageMent,
    },
    data() {
      return {
        activeName: 'first',
      }
    },
    mounted() {
      if (this.$route.query.tabs !== undefined) {
        this.activeName = this.$route.query.tabs;
      }
    },

    methods: {
      handleClick(val) {

      }
    },
  }
</script>

<style scoped>

</style>
