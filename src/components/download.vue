<template>
  <div>
    <div>
      <img :style="imgCss" src="../assets/download/background.png" alt="">
    </div>
    <div class="top">
      <h1><img src="../assets/download/lejia-logo.png" alt=""></h1>
      <h2>乐伽公寓</h2>
      <h3>便捷租房&nbsp;真实房源&nbsp;预约看房&nbsp;省心托管</h3>
      <div>
        <a @click="androidLoad">
          <img src="../assets/download/ad.png" alt="">
          <span>Android下载</span>
        </a>
        <a class="ios" :href="iphone">
          <img src="../assets/download/ios.png" alt="">
          <span>iphone下载</span>
        </a>
      </div>
    </div>
    <div class="choose" @click="androidStatus = false" v-show="androidStatus">
      <img src="../assets/download/live_weixin.png">
    </div>
  </div>
</template>

<script>
  export default {
    name: "download",
    data() {
      return {
        imgCss: {
          height: '100%',
          width: '100%',
        },
        androidStatus: false,
        android: '',
        iphone: 'https://itunes.apple.com/cn/app/id1425042588?mt=8',
      }
    },
    mounted() {
      if (this.IsPC) {
        this.imgCss = {
          height: '100%',
          width: '100%',
        };
      } else {
        this.imgCss.height = window.innerHeight + 'px';
        this.imgCss.maxWidth = '100%';
      }
      this.$http.post(globalConfig.server + "api/client/version/check").then(res => {
        this.android = res.data.data.download_url;
      });
    },
    activated() {
    },
    watch: {},
    computed: {},
    methods: {
      androidLoad() {
        if (this.is_wei()) {
          this.androidStatus = true;
        } else {
          location.href = this.android;
        }
      },
      is_wei() {
        let ua = navigator.userAgent.toLowerCase();
        return ua.includes("micromessenger");
      },
      IsPC() {
        let userAgentInfo = navigator.userAgent;
        let Agents = ["Android", "iPhone",
          "SymbianOS", "Windows Phone",
          "iPad", "iPod"];
        let flag = true;
        for (let v = 0; v < Agents.length; v++) {
          if (userAgentInfo.indexOf(Agents[v]) > 0) {
            flag = false;
            break;
          }
        }
        return flag;
      }
    },
  }
</script>

<style lang="scss" scoped>
  .top {
    position: absolute;
    top: .8rem;
    left: 0;
    right: 0;
    z-index: 3;
    text-align: center;
    h1, h2, h3 {
      font-weight: normal;
      margin: 0;
    }
    h1 {
      img {
        width: 1.18rem;
        height: 1.18rem;
      }
    }
    h2 {
      margin: .3rem .2rem;
      font-size: .52rem;
      color: #fff;
    }
    h3 {
      color: #ffd144;
      font-size: .15rem;
    }
    @mixin flexBtn {
      display: flex;
      display: -webkit-flex;
      align-items: center;
      justify-content: center;
    }
    div {
      @include flexBtn;
      a {
        @include flexBtn;
        width: 3rem;
        height: 1rem;
        margin: .5rem .3rem;
        background-color: #5D5C5C;
        color: #fff;
        -webkit-border-radius: .1rem;
        -moz-border-radius: .1rem;
        border-radius: .1rem;
        font-size: .3rem;
        img {
          width: .4rem;
          height: .4rem;
          margin-right: .2rem;
        }
      }
      .ios {
        background-color: #43C915;
      }
    }
  }

  .choose {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, .6);
    z-index: 6;
    img {
      max-width: 100%;
    }
  }
</style>
