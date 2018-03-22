<template>
  <div>
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="乐伽大学" name="first">
        <StaffSquare moduleType="lejiaCollege"></StaffSquare>
      </el-tab-pane>
      <el-tab-pane label="公司门户" name="second">
        <StaffSquare moduleType="companyPortal"></StaffSquare>
      </el-tab-pane>
      <el-tab-pane label="员工广场" name="third">
        <StaffSquare moduleType="staffSquare"></StaffSquare>
      </el-tab-pane>
      <el-tab-pane label="制度管理" name="fourth">
        <StaffSquare moduleType="systemManageMent"></StaffSquare>
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
        activeName: 'first'
      }
    },
    mounted() {
      if (this.$route.query.tabs !== undefined) {
        this.activeName = this.$route.query.tabs;
      }
    },
    watch: {},
    methods: {
      handleClick(tab, event) {

      }
    },
  }
</script>

<style scoped>

</style>
