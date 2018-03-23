<template>
  <div>
    <el-tabs v-model="activeName" @tab-click="handleClick(activeName)">
      <el-tab-pane label="乐伽大学" name="first">
        <StaffSquare :type="moduleType"></StaffSquare>
      </el-tab-pane>
      <el-tab-pane label="公司门户" name="second">
        <StaffSquare :type="moduleType"></StaffSquare>
      </el-tab-pane>
      <el-tab-pane label="员工广场" name="third">
        <StaffSquare :type="moduleType"></StaffSquare>
      </el-tab-pane>
      <el-tab-pane label="制度管理" name="fourth">
        <StaffSquare :type="moduleType"></StaffSquare>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
  import StaffSquare from './staffSquare/index.vue'

  export default {
    name: "index",
    components: {StaffSquare},
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
      this.$store.dispatch('moduleType',this.moduleType);
    },
    watch: {
      moduleType(val){
        this.$store.dispatch('moduleType',this.moduleType);
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
