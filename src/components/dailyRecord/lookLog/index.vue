<template>
  <div>
    <div class="lookLog" v-for="item in lookLogData">
      <div class="pic">
        <img src="../../../assets/images/head.jpg" alt="">
      </div>
      <div style="width: 100%">
        <div class="titles">
          <div class="a">到付快递费好看多啦</div>
          <div class="b">0000-00-00</div>
          <p>今日营业额：<span>1000</span></p>
          <p>今日客户数：<span>1000</span></p>
          <p>月累计营业额：<span>1000</span></p>
          <p>本月业绩目标：<span>1000</span></p>
        </div>
        <div class="lookPeople">
          <div><span>1223</span>人已读</div>
          <span v-for="key in 12">
                  <img src="../../../assets/images/head.jpg" alt="">
                </span>
          <p>●●●</p>
        </div>
        <div class="commentContent" v-if="false">
          <div v-for="key in 3">
            <span>习大大：</span>
            <span>发射点范德萨范德萨范德萨范德萨打发</span>
          </div>
          <p>
            全部22条评论
          </p>
        </div>
        <div class="comment" v-if="false">
          <el-input class="comInput" size="mini" placeholder="请输入内容" v-model="comments"></el-input>
          <el-button size="mini" type="primary">评&nbsp;论</el-button>
        </div>
      </div>
    </div>
  </div>

</template>

<script>
  export default {
    data () {
      return {
        lookLogData: [],
      }
    },
    methods: {
      getLookLog() {
        this.$http.get(globalConfig.server+ 'oa/day/?staff_id=&pages=1').then((res) => {
          if(res.data.code === '100000') {
            this.lookLogData = res.data.data.data;
            console.log(this.lookLogData);
          }
        });
      },

    },
    mounted() {
      this.getLookLog();
    },
    activated() {
      this.getLookLog();
    },
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">

  @mixin flex {
    display: flex;
    display: -webkit-flex;
  }

  @mixin border_radius($n) {
    -webkit-border-radius: $n;
    -moz-border-radius: $n;
    border-radius: $n;
  }

  @mixin minMax {
    min-width: 40px;
    max-width: 40px;
    min-height: 40px;
    max-height: 40px;
  }

  img {
    width: 100%;
    height: 100%;
    @include border_radius(50%);
  }
  .lookLog {
    padding: 18px;
    margin: 12px;
    @include flex;
    @include border_radius(6px);
    -webkit-box-shadow: 0 2px 15px 0 #aaaaaa;
    -moz-box-shadow: 0 2px 15px 0 #aaaaaa;
    box-shadow: 0 2px 15px 0 #aaaaaa;
    p {
      margin: 0;
      line-height: 26px;
      font-size: 16px;
    }
    .pic {
      @include minMax;
      margin-right: 12px;
    }
    .titles {
      .a {
        font-size: 15px;
      }
      .b {
        font-size: 12px;
        margin: 6px 0;
      }
    }
    .lookPeople {
      @include flex;
      padding: 12px 0;
      margin: 10px 0;
      border: 1px solid #DFE6FB;
      border-left: none;
      border-right: none;
      div {
        width: 100px;
        background: #DFE6FB;
        height: 36px;
        color: #ffffff;
        text-align: center;
        line-height: 36px;
      }
      p, span {
        width: 36px;
        height: 36px;
        line-height: 36px;
        margin-left: 10px;
        cursor: pointer;
      }
      p {
        @include border_radius(50%);
        text-align: center;
        background: #cccccc;
        font-size: 12px;
        color: #ffffff;
      }
    }
    .commentContent {
      div {
        font-size: 12px;
        line-height: 20px;
        span:first-of-type {
          color: #409EFF;
        }
      }
      p {
        cursor: pointer;
        font-size: 12px;
        color: #409EFF;
      }
    }
    .comment {
      margin-top: 6px;
      @include flex;
      .comInput {
        margin-right: 20px;
      }
    }
  }
</style>
