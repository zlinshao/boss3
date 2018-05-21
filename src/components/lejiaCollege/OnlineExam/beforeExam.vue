<template>
  <div>
    <div class="container">
      <div v-show="showType==='first'">
        <div class="title">您目前没有考试</div>
        <div class="content">
          <div class="content_title">最近一场考试</div>
          <p>场次名称：关于个人信息的问卷</p>
          <p style="margin-left: 25px;">考试时间：2018-05-03 14：50：00</p>

        </div>
        <p class="view_history">查看历史考试>></p>
      </div>
      <div v-show="showType==='second'">
        <div class="title">开考倒计时</div>
        <div class="count_down">09:59:59</div>
        <div class="content">
          <p>场次名称：关于个人信息的问卷</p>
          <p style="margin-left: 25px;">考试时间：2018-05-03 14：50：00</p>
          <p style="margin-left: -80px;">试卷时长：60分钟</p>
        </div>
        <p class="view_history">查看历史考试>></p>
      </div>
      <div v-show="showType==='third'">
        <div class="title">您已超过规定开考时间</div>
        <div class="count_down">无法参加考试</div>
        <div class="content">
          <p>如有疑问，请联系主考官</p>
        </div>
        <p class="view_history">查看历史考试>></p>
      </div>
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
        showType: 'third',
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
    .count_down{
      padding-top: 20px;
      font-size: 50px;
      margin-bottom: -100px;
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
