<template>
  <div>
    <div>
      <el-tabs v-model="activeName">
        <el-tab-pane label="问卷管理" name="first">
          <PaperManage></PaperManage>
        </el-tab-pane>
        <el-tab-pane label="问卷调查" name="second">
          <ExamManage></ExamManage>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>
<script>
  import PaperManage from "./paperManage.vue";
  import ExamManage from "./examManage.vue";

  export default {
    name: "index",
    components: {PaperManage, ExamManage},
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
