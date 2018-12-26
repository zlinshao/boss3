<template>
  <div>
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="账户管理" name="first">
        <AccountManage></AccountManage>
      </el-tab-pane>
      <el-tab-pane label="科目管理" name="second">
        <SubjectManage></SubjectManage>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
  import AccountManage from '../accountManage/index.vue'
  import SubjectManage from './subjectManage/index.vue'

  export default {
    name: "index",
    components: {AccountManage,SubjectManage},
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
