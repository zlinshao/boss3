<template>
  <div>
    <div>
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="个人考勤" name="first">
          <PersonalCheck></PersonalCheck>
        </el-tab-pane>
        <el-tab-pane label="部门考勤" name="second">
          <DepartCheck></DepartCheck>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script>
  import PersonalCheck from './components/personalCheck.vue'
  import DepartCheck from './components/departCheck.vue'

  export default {
    name: "index",
    components: {PersonalCheck,DepartCheck},
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
