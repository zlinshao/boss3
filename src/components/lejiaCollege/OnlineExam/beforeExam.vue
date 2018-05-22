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
        <p class="view_history" @click="goHistory('exam')">查看历史考试>></p>
      </div>
      <div v-show="showType==='second'">
        <div class="title">开考倒计时</div>
        <div class="count_down">09:59:59</div>
        <div class="content">
          <p>场次名称：关于个人信息的问卷</p>
          <p style="margin-left: 25px;">考试时间：2018-05-03 14：50：00</p>
          <p style="margin-left: -80px;">试卷时长：60分钟</p>
        </div>
        <p class="view_history" @click="goHistory('exam')">查看历史考试>></p>
      </div>
      <div v-show="showType==='third'">
        <div class="title" style="font-size: 50px;">您已超过规定开考时间</div>
        <div class="count_down">无法参加考试</div>
        <div class="content">
          <p>如有疑问，请联系主考官</p>
        </div>
        <p class="view_history" @click="goHistory('exam')">查看历史考试>></p>
      </div>

    </div>
    <el-button @click="showType='first'">first</el-button>
    <el-button @click="showType='second'">second</el-button>
    <el-button @click="showType='third'">third</el-button>
  </div>

</template>

<script>
  export default {
    name: "before-exam",
    data() {
      return {
        showType: 'third',
      };
    },
    methods: {
      goHistory(val){
        if(val==='exam'){
          this.$router.push({path: '/LineCollege'});
        }else{
          this.$router.push({path: '/LineCollege'});
        }
      }
    }
  };
</script>

<style lang="scss" scoped>
  .container {
    color: #999;
    width: 100%;
    min-height: 800px;
    text-align: center;
    position: relative;
    .title {
      font-size: 60px;
      position: absolute;
      margin: 0 auto;
      top: 130px;
      left: 0;
      width: 100%;
      filter: alpha(opacity=30);
      -ms-filter: "alpha(opacity=30)";
    }
    .count_down {
      font-size: 50px;
      position: absolute;
      margin: 0 auto;
      top: 210px;
      left: 0;
      width: 100%;
    }
    .content {
      color: #393939;
      margin-top: 330px;
      background-color: #dfe6fb;
      border-radius: 8px;
      display: inline-block;
      padding: 20px 100px;
      position: relative;
      .content_title {
        margin-top: 10px;
        margin-left: -110px;
      }
    }
    .view_history {
      cursor: pointer;
      margin-top: 200px;
      color: #39b1ff;
      position: absolute;
      bottom: 20px;
      width: 100%;
      margin: 0 auto;
    }

  }

</style>
