<template>
  <div>
    <div class="container">
      <div>
        <div class="title" style="top: 230px;">您目前没有问卷</div>
        <p class="view_history" @click="goHistory('naire')">查看历史问卷>></p>
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
      goHistory(val){
        if (val === 'naire'){
          this.$router.push({path: '/MyNaire'});
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
      bottom: 60px;
      width: 100%;
      margin: 0 auto;
    }

  }

</style>
