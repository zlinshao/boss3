<template>
  <div>
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="乐伽大学" name="first">

      </el-tab-pane>
      <el-tab-pane label="公司门户" name="second">

      </el-tab-pane>
      <el-tab-pane label="员工广场" name="third">
        <StaffSquare></StaffSquare>
      </el-tab-pane>
      <el-tab-pane label="制度管理" name="fourth">

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
