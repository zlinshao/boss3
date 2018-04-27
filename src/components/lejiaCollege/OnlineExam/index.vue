<template>
  <div>
    <div>
      <el-tabs v-model="activeName">
        <el-tab-pane label="试卷管理" name="first">
          <TestPaperManage></TestPaperManage>
        </el-tab-pane>
        <el-tab-pane label="考试管理" name="second">
          <ExamManage></ExamManage>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>


</template>

<script>
  import TestPaperManage from "./testPaperManage.vue";
  import ExamManage from "./examManage.vue";

  export default {
    name: "index",
    components: {TestPaperManage, ExamManage},
    data() {
      return {
        activeName: 'first',
      };
    },
    methods: {}
  };
</script>

<style lang="scss" scoped>

</style>
