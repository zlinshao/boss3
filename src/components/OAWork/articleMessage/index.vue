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
        moduleType: 'lejiaCollege',
      }
    },
    mounted() {
      if (this.$route.query.tabs !== undefined) {
        this.activeName = this.$route.query.tabs;
      }
      switch (this.activeType) {
        case 'lejiaCollege':
          this.activeName = 'first';
          break;
        case 'companyPortal':
          this.activeName = 'second';
          break;
        case 'staffSquare':
          this.activeName = 'third';
          break;
        case 'systemManageMent':
          this.activeName = 'fourth';
          break;
      }
      console.log("active====="+this.activeType);
    },
    watch: {
      moduleType(val){
        this.$store.dispatch('moduleType',this.moduleType);
      }
    },
    computed: {
      activeType() {
        return this.$store.state.article.module_type;
      }
    },
    methods: {
      handleClick(val) {
        switch (val) {
          case 'first':
            this.moduleType = 'lejiaCollege';
            break;
          case 'second':
            this.moduleType = 'companyPortal';
            break;
          case 'third':
            this.moduleType = 'staffSquare';
            break;
          case 'fourth':
            this.moduleType = 'systemManageMent';
            break;
        }
      }
    },
  }
</script>

<style scoped>

</style>
