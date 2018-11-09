<template>
  <div id="app" @contextmenu="prevent($event)" @click="closeMenu">
    <keep-alive>
      <router-view v-if="!$route.meta.keepAlive"></router-view>
    </keep-alive>
    <router-view v-if="$route.meta.keepAlive"></router-view>
    <!--<LOADING v-if="isLoading"></LOADING>-->

    <el-tooltip placement="top" content="返回顶部">
      <back-to-top transitionName="fade" :customStyle="myBackToTopStyle" :visibilityHeight="300"
                   :backPosition="50"></back-to-top>
    </el-tooltip>
    <el-tooltip placement="left" content="乐伽大学 视频教程">
      <div v-if="$route.path === '/' || $route.path === '/main'" class="lookVideo" @click="playVideo">
        <img style="width: 100%;" src="./assets/images/乐伽大学弹框.png" alt="">
      </div>
    </el-tooltip>

    <!--视频dialog-->
    <el-dialog
      :visible.sync="showVideo"
      width="45%"
      title="视频教程"
      @open="openVideo"
      @close="closeVideo"
    >
      <div style="width: 100%;height: 400px;text-align: center;">
        <video :src="videoUri" width="100%" controls height="400px"></video>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  import LOADING from './components/common/loading.vue'
  import BackToTop from './components/common/backToTop.vue'

  export default {
    name: 'app',
    components: {LOADING, BackToTop},
    data() {
      return {
        loading: false,
        loginOut: false,
        myBackToTopStyle: {
          right: '50px',
          bottom: '50px',
          width: '40px',
          height: '40px',
          'border-radius': '4px',
          'line-height': '45px', // 请保持与高度一致以垂直居中
          background: '#ecf5ffe8'// 按钮的背景颜色
        },
        loginIndex: 0,
        showVideo: false,
        videoUri: ""
      }
    },
    created() {
      if (localStorage.myData !== undefined) {
        let head = JSON.parse(localStorage.myData);
        globalConfig.header.Authorization = head.token_type + ' ' + head.access_token;
      }

      if (localStorage.personal !== undefined) {
        globalConfig.personal = JSON.parse(localStorage.personal);
      }

      this.responses();
    },
    computed: {
      isLoading() {
        return this.$store.state.app.isLoading;
      }
    },
    methods: {
      openVideo() {
        this.videoUri = "http://s.lejias.cn/peixun.mp4";
      },
      closeVideo() {
        this.videoUri = "";
      },
      responses() {
        let that = this;
        this.$http.interceptors.response.use(function (response) {
          return response;
        }, function (error) {
          if (error && error.response) {
            if (error.response.data.status_code === 401) {
              // that.$alert('登陆超时请重新登陆', '温馨提示', {
              //   confirmButtonText: '确定',
              //   callback: action => {
              //     that.loginIndex++;
              //     localStorage.removeItem('personal');
              //     globalConfig.header.Authorization = '';
              //     that.$router.push({path: '/login'});
              //   }
              // });
            }
          }
          return Promise.reject(error);
        });
      },
      prevent(e) {
        e.preventDefault();
        this.$store.dispatch('closeMenu')
      },
      closeMenu() {
        this.$store.dispatch('closeMenu')
      },
      playVideo() {
        this.showVideo = true;
      }
    }
  }
</script>

<style lang="scss">

  html, body {
    overflow-x: hidden;
    overflow-y: scroll;
  }

  html, body {
    min-height: 100%;
  }

  html {
    box-sizing: border-box;
    overflow: -moz-scrollbars-vertical;
  }

  body {
    margin: 0;
    padding: 0;
    height: 100%;
    font-family: "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", "微软雅黑", Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: #787a7e;
    font-size: 14px;
    background-color: #f4f3f6;
    #app {
      height: 100%;
      .lookVideo{
        width: 100px;
        height: 100px;
        position: fixed;
        right: 100px;
        bottom: 20px;
        cursor: pointer;
      }
    }
    a {
      text-decoration: none;
      color: #787a7e;
    }
    ol, ul {
      list-style: none;
      padding: 0;
      margin: 0;
    }
    .el-pagination {
      span, li, .el-input {
        font-size: 12px !important;
      }
    }

    .el-table {
      th, td {
        padding: 6px 0;
        font-size: 12px;
      }
    }
    .el-tabs {
      .el-tabs__header {
        .el-tabs__item {
          font-size: 12px;
        }
      }
    }
    &::-webkit-scrollbar {
      width: 4px;
    }

    &::-webkit-scrollbar-button {
      height: 0;
      background-color: #eee;
    }

    &::-webkit-scrollbar-track {
      background: #eee;
    }

    &::-webkit-scrollbar-thumb {
      background: #6a8dfb;
    }
  }

  .scroll_bar {
    &::-webkit-scrollbar {
      width: 4px;
      height: 6px;
    }

    &::-webkit-scrollbar-button {
      height: 10px;
      background-color: #e4e7ed;
    }

    &::-webkit-scrollbar-track {
      background: #e4e7ed;
    }

    &::-webkit-scrollbar-thumb {
      background: #c5cce2;
    }
  }

  .el-table__body-wrapper.is-scroll-right, .el-table__body-wrapper.is-scroll-left, .el-table__body-wrapper.is-scroll-middle, .el-table__body-wrapper.is-scrolling-none, .el-table--scrollable-x .el-table__body-wrapper {
    &::-webkit-scrollbar {
      width: 4px;
      height: 5px;
    }

    &::-webkit-scrollbar-button {
      height: 0;
      background-color: #eee;
    }

    &::-webkit-scrollbar-track {
      background: #e4e7ed;
    }

    &::-webkit-scrollbar-thumb {
      background: #c5cce2;
    }
  }

</style>
