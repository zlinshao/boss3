<template>
  <div>
    <div class="container">
      <div class="title">您目前没有考试</div>
      <div class="content">
        <div class="content_title">最近一场考试</div>
        <p>场次名称：关于个人信息的问卷</p>
        <p style="margin-left: 25px;">考试时间：2018-05-03 14：50：00</p>

      </div>
      <p class="view_history">查看历史考试>></p>
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
  .container {
    color: #999;
    width: 100%;
    min-height: 500px;
    text-align: center;
    .title {
     padding-top: 150px;
      font-size: 60px;
    }
    .content {
      color: #393939;
      margin-top: 180px;
      background-color: #dfe6fb;
      border-radius: 8px;
      display: inline-block;
      padding: 20px 100px;
      .content_title {
        margin-top: 10px;
        margin-left: -110px;
      }
    }
    .view_history {
         margin-top: 200px;
         color: #39b1ff;
       }

  }

</style>
