<template>
  <div id="mySend">
    <div class="meSend" v-for="key in 12">
      <div class="meSendTop">
        <div>
          <span>
            <img src="../../../assets/images/head.jpg" alt="">
          </span>
          <span>米见过</span>
        </div>
        <span>日报</span>
      </div>
      <div class="mainTitle">
        <div>
          <span>今日完成工作：</span>
          <span>DSFDSFDSAFFDSFDSFSAFSAFSDFSDA</span>
        </div>
        <div>
          <span>未完成工作：</span>
          <span>DSFDSFDSAFFDSFDSFSAFSAFSDFSDA</span>
        </div>
        <div>
          <span>需协调工作：</span>
          <span>DSFDSFDSAFFDSFDSFSAFSAFSDFSDA</span>
        </div>
      </div>
      <div class="footer">
        <span class="times">0000-00-00 00:00:00</span>
        <span>删除</span>
        <span>修改</span>
        <span>查看详情</span>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'hello',
    data () {
      return {
        msg: 'Welcome to Your Vue.js App'
      }
    }
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

  #mySend {
    @include flex;
    flex-wrap: wrap;
    .meSend {
      position: relative;
      box-sizing: border-box;
      width: 340px;
      height: 200px;
      padding: 10px 12px;
      margin: 0 16px 16px 0;
      border: 1px solid #DFE6FB;
      @include border_radius(6px);
      .meSendTop {
        padding-bottom: 10px;
        border-bottom: 1px solid #DFE6FB;
        @include flex;
        align-items: center;
        justify-content: space-between;
        div {
          @include flex;
          align-items: center;
          span:first-of-type {
            @include minMax;
            margin-right: 12px;
          }
        }
      }
      .mainTitle {
        margin-top: 8px;
        div {
          line-height: 26px;
          @include flex;
          align-items: center;
          span:first-of-type {
            min-width: 100px;
            color: #cccccc;
          }
          span:last-of-type {
            overflow: hidden;
            text-overflow: ellipsis;
          }
        }
      }
      .footer {
        position: absolute;
        left: 0;
        right: 0;
        bottom: 0;
        border-bottom-left-radius: 4px;
        border-bottom-right-radius: 4px;
        background: #eeeeee;
        height: 40px;
        @include flex;
        justify-content: space-around;
        align-items: center;
        .times {
          padding-top: 2px;
          font-size: 12px;
        }
        span + span {
          color: #409EFF;
          cursor: pointer;
        }
      }
    }
  }

</style>
