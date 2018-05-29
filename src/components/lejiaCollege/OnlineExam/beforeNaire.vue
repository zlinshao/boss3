<template>
  <div>
    <div class="container">
      <div class="content">
        <div class="content_img"><img src="../../../assets/images/examination/waiting.png"></div>
        <div class="content_right">
          <div class="title">您目前没有问卷</div>
          <el-button class="view_history" @click="goHistory">查看历史问卷</el-button>
        </div>
      </div>
    </div>

  </div>

</template>

<script>
  export default {
    name: "before-naire",
    data() {
      return {
        showType: 'first',
      };
    },
    methods: {
      goHistory(val) {
        this.$router.push({path: '/MyNaire'});
      }
    }
  };
</script>

<style lang="scss" scoped>
  .container {
    width: 100%;
    min-height: 800px;
    position: relative;
    box-shadow: 0px 0px 3px 1px #dfe6fb;
    .content {
      display: inline-block;
      position: absolute;
      top: 28%;
      width: 70%;
      left: 30%;
      /*background-color: #dfe6fb;*/
      .content_img {
        float: left;
      }
      .content_right {
        padding-left: 300px;
        .title {
          font-size: 35px;
          margin: 0 auto;
          left: 0;
          width: 100%;
          filter: alpha(opacity=30);
          -ms-filter: "alpha(opacity=30)";
          color: #6a8dfbbf;
        }
        .view_history {
          cursor: pointer;
          position: absolute;
          background: #6a8dfb;
          color: #fff;
          bottom: 10px;
        }
      }
    }

  }

</style>
