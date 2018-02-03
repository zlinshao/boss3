<template>
  <div id="index" @click="clickScreen">
    <div class="navBar">
      <div class="left">
        <div class="logo" :class="isCollapse? 'isCollapse_logo':'' ">
          <div class="boss" v-if="!isCollapse">BOSS</div>
          <div :class="isCollapse? 'isCollapse':'' " class="el-icons-fa-bars" @click="changeCollapse"></div>
        </div>
        <div class="slogan">
          <img src="../assets/images/slogan.png" alt="">
        </div>
      </div>
      <div class="right">
        <div class="countdown">
          <el-tooltip class="item" effect="dark" content="锁屏" placement="bottom">
            <i class="el-icon-time" @click="lockScreen"></i>
          </el-tooltip>

          {{Countdown}}s
        </div>
        <div class="message" style="position: relative">
          <el-badge is-dot class="item">
            <i class="el-icons-fa-comment-o"></i>
            消息
          </el-badge>
          <!--//喜报名片-->
          <div v-if="false">
            <div class="gladBulletin">
              <div class="gladTop"></div>
              <div class="gladContent">
                <div class="title">
                  <img src="../assets/images/daosui_left.png" alt="">
                  <span class="words">
                  <span style="color: #e8468e;margin-right: 5px">恭喜</span>南京一区一组王彪出租租房
                </span>
                  <img src="../assets/images/daosui_right.png" alt="">
                </div>

                <div class="glad_card">
                  <div class="glad_card_head">
                    <img src="../assets/images/head.jpg" alt="">
                  </div>
                  <div class="glad_card_info">
                    <div style="color:#6a8dfb;font-size: 16px;width: 100%">天华硅谷庄园 153-506</div>
                    <div style="width: 100%;margin: 15px 0">
                      <div style="border: 1px solid #fb4699;width:25px"></div>
                    </div>
                    <div style="width: 100%;height: 20px;font-size: 14px;">
                      <span style="color: #abadae">签约时长：</span>3年3个月（租）
                    </div>
                    <div style="width: 100%;height: 20px;font-size: 14px;">
                      <span style="color: #abadae">签约时长：</span>3年3个月（租）
                    </div>
                  </div>
                </div>
              </div>
              <div class="gladBottom"></div>
            </div>
            <div class="gladBackground"></div>
          </div>
        </div>

        <div class="guide">
          <i class="el-icon-warning"></i>
          使用指南
        </div>
        <div class="personInfo">
          <div class="head"><img src="../assets/images/head.jpg"></div>
          <el-dropdown>
              <span class="el-dropdown-link">
                解兆飞<i class="el-icon-arrow-down el-icon--right"></i>
              </span>
            <el-dropdown-menu slot="dropdown" class="personal">
              <el-dropdown-item class="personalList">
                <p><i class="el-icon-menu"></i></p>
                <div>
                  个人主页
                </div>
              </el-dropdown-item>
              <el-dropdown-item class="personalList">
                <p><i class="el-icons-fa-sitemap"></i></p>
                <div>
                  部门主页
                </div>
              </el-dropdown-item>
              <el-dropdown-item class="personalList">
                <p><i class="el-icon-bell"></i></p>
                <div>
                  消息中心
                </div>
              </el-dropdown-item>
              <el-dropdown-item class="personalList">
                <p><i class="el-icons-fa-edit"></i></p>
                <div>
                  考勤自助
                </div>
              </el-dropdown-item>
              <el-dropdown-item class="personalList">
                <p><i class="el-icon-location"></i></p>
                <div>
                  签到自助
                </div>
              </el-dropdown-item>
              <el-dropdown-item class="personalList">
                <p><i class="el-icons-fa-unlock-alt"></i></p>
                <div>
                  锁屏密码
                </div>
              </el-dropdown-item>
              <el-dropdown-item class="detrusion">
                <!--<p><i class="el-icons-fa-dot-circle-o"></i></p>-->
                <div>
                  安全退出
                </div>
              </el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </div>
      </div>
    </div>

    <div class="contentBox" :class="isCollapse? 'hideSidebar' : ''">
      <el-container>
        <div class="aside scroll_bar" id="isCollapse">
          <el-menu :default-active="$route.path" class="el-menu-vertical-demo" unique-opened
                   :defaultOpeneds=defaultArray
                   :collapse="isCollapse" router @open="handleOpen" @close="handleClose"
                   background-color="#6a8dfb" text-color="#fff" active-text-color="#ffd04b">
            <template v-for="(item,index) in $router.options.routes">
              <!--一级菜单-->
              <el-menu-item v-if="item.hidden" v-for="child in item.children" :index="child.path" :key="child.path">
                <i :class="child.icon"></i>
                <span slot="title"> {{child.name}}</span>
              </el-menu-item>

              <el-submenu :index="item.name+''" v-if="!item.hidden && !item.abnormal">
                <template slot="title">
                  <i :class="item.icon"></i>
                  <span>{{item.name}}</span>
                </template>
                <template v-for="(child,key) in item.children">
                  <!--三级菜单-->
                  <el-submenu :index="child.path" v-if="child.children" style="padding-left: 14px">
                    <template slot="title">
                      <i :class="child.icon"></i>
                      <span>{{child.name}}</span>
                    </template>
                    <el-menu-item v-for="last in child.children" :index="last.path" :key="last.path"
                                  style="padding-left: 74px">
                      {{last.name}}
                    </el-menu-item>
                  </el-submenu>
                  <!--二级菜单-->
                  <el-menu-item v-if="!child.children" :index="child.path" :key="child.path" style="padding-left: 54px">
                    <i :class="child.icon"></i>
                    <span>{{child.name}}</span>
                  </el-menu-item>
                </template>
              </el-submenu>
            </template>
          </el-menu>
        </div>

        <el-main>
          <TagsView></TagsView>
          <div style="padding: 10px;background: #fff">
            <router-view></router-view>
          </div>
        </el-main>
      </el-container>
    </div>
  </div>
</template>

<script>
  import Cookies from 'js-cookie'
  import TagsView from './common/tagsView.vue'

  export default {
    name: 'Index',
    components: {TagsView},
    data() {
      return {
        isCollapse: false,
        Countdown: 999999,  //倒计时
        screenStatus: false,
        defaultArray: [],
      }
    },
    mounted() {
      this.countTime();
    },
    computed: {
      visitedViews() {
        return this.$store
      }
    },
    watch: {
      isCollapse(val) {
        document.getElementById('isCollapse').style.overflow = val ? 'visible' : 'auto';
      }
    },
    methods: {
      handleOpen(key, keyPath) {
//         console.log(key, keyPath);
//         if(key === '财务账本'){
//           this.defaultArray = [];
//           this.$prompt('请输入密码', '提示', {
//             confirmButtonText: '确定',
//             cancelButtonText: '取消',
// //          inputPattern: /[\w!#$%&'*+/=?^_`{|}~-]+(?:\.[\w!#$%&'*+/=?^_`{|}~-]+)*@(?:[\w](?:[\w-]*[\w])?\.)+[\w](?:[\w-]*[\w])?/,
// //          inputErrorMessage: '邮箱格式不正确'
//           }).then(({ value }) => {
// //          this.$message({
// //            type: 'success',
// //            message: '你的密码是: ' + value
// //          });
//             if(Number(value) === 6666){
//               this.defaultArray = [key];
//             }
//           }).catch(() => {
// //          this.$message({
// //            type: 'info',
// //            message: '取消输入'
// //          });
//             this.defaultArray = [];
//           });
//         }
      },
      handleClose(key, keyPath) {
        console.log(key, keyPath);
      },
      clickScreen() {
        this.screenStatus = true;
      },
      countTime() {
        new Promise((resolve, reject) => {
          let interval = setInterval(() => {
            this.Countdown--;
            if (this.Countdown < 0) {
              resolve('锁屏');
              clearInterval(interval)
            }
            if (this.screenStatus) {
              reject('重新计数');
              clearInterval(interval)
            }
          }, 1000)
        }).then((data) => {
          Cookies.set('last_page_path', this.$route.path); // 本地存储锁屏之前打开的页面以便解锁后打开
          setTimeout(() => {
            this.$router.push({path: '/lock'});
          });
          Cookies.set('locking', '1');
        }).catch((data) => {
          this.Countdown = 999999;
          this.countTime();
          this.screenStatus = false;
        })
      },
      changeCollapse() {
        this.isCollapse = !this.isCollapse
      },
      lockScreen() {
        Cookies.set('last_page_path', this.$route.path); // 本地存储锁屏之前打开的页面以便解锁后打开
        setTimeout(() => {
          this.$router.push({path: '/lock'});
        });
        Cookies.set('locking', '1');
      }
    }
  }
</script>

<style lang="scss">
  @mixin border_radius($n) {
    -webkit-border-radius: $n;
    -moz-border-radius: $n;
    border-radius: $n;
  }

  @mixin border_radius($n) {
    -webkit-border-radius: $n;
    -moz-border-radius: $n;
    border-radius: $n;
  }

  @mixin box_shadow($n) {
    -webkit-box-shadow: 0 0 16px 0 $n;
    -moz-box-shadow: 0 0 16px 0 $n;
    box-shadow: 0 0 16px 0 $n;
  }

  @mixin box_sizing {
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
  }

  .personal {
    width: 200px;
    padding: 10px;
    .personalList {
      float: left;
      @include box_sizing;
      @include border_radius(6px);
      padding: 0;
      width: 80px;
      height: 80px;
      margin: 10px 10px 0;
      color: #7394FB;
      @include box_shadow(#dddddd);
      .el-dropdown-menu__item {
        line-height: 0;
      }
      div {
        font-size: 12px;
        height: 27px;
        line-height: 27px;
      }
      p {
        @include box_sizing;
        margin: 0 auto;
        height: 50px;
        text-align: center;
        padding-top: 10px;
        i {
          font-size: 30px;
        }
      }
      div {
        text-align: center;
      }
    }
    .personalList:nth-of-type(1) {
      border-top: 3px solid #6A8DFB;
      p {
        color: #6A8DFB;
      }
    }
    .personalList:nth-of-type(2) {
      border-top: 3px solid #58D788;
      p {
        color: #58D788;
      }
    }
    .personalList:nth-of-type(3) {
      border-top: 3px solid #FB4699;
      p {
        color: #FB4699;
      }
    }
    .personalList:nth-of-type(4) {
      border-top: 3px solid #C0C4CC;
      p {
        color: #C0C4CC;
      }
    }
    .personalList:nth-of-type(5) {
      border-top: 3px solid #58D788;
      p {
        color: #58D788;
      }
    }
    .personalList:nth-of-type(6) {
      border-top: 3px solid #6A8DFB;
      p {
        color: #6A8DFB;
      }
    }
    .personalList:hover {
      border-top-color: #409EFF;
      background: #409EFF;
      color: #ffffff;
      @include box_shadow(#6A8DFB);
      div {
        font-size: 12px;
        height: 30px;
        line-height: 30px;
      }
      p {
        color: #ffffff;
      }
    }
    .detrusion {
      float: left;
      width: 180px;
      margin: 20px 10px 10px;
      background: #409EFF;
      padding: 0;
      text-align: center;
      color: #ffffff;
      @include box_shadow(#6A8DFB);
      @include border_radius(6px);
    }
  }
  #index {
    .isCollapse {
      padding: 0 20px;
    }
    .isCollapse_logo {
      width: 64px !important;
    }

    .navBar {
      width: 100%;
      height: 66px;
      background: #fff;
      position: fixed;
      top: 0;
      left: 0;
      z-index: 66;
      display: flex;
      .left {
        width: 50%;
        height: 100%;
        display: flex;
        align-items: center;
        .logo {
          width: 210px;
          height: 100%;
          border-right: 1px solid #e6e6e6;
          display: flex;
          align-items: center;
          justify-content: space-between;
          .boss {
            font-size: 26px;
            color: #6a8dfb;
            margin-left: 50px;
          }
          .el-icons-fa-bars {
            font-size: 24px;
            color: #4f5aa2;
            margin-right: 25px;
            cursor: pointer;
          }

        }
        .slogan {
          margin-left: 30px;
        }
      }
      .right {
        width: 50%;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: flex-end;
        div {
          display: flex;
          align-items: center;
          font-size: 16px;
        }
        .countdown, .message, .guide {
          width: 120px;
          cursor: pointer;
          justify-content: center;
          border-left: 1px solid #e6e6e6;
          i {
            margin-right: 10px;
            font-size: 20px;
            color: #409EFF;
          }
        }
        .message {
          .gladBulletin {
            width: 490px;
            height: 320px;
            position: absolute;
            top: 80px;
            left: -170px;
            background: #f9f8fb;
            border-radius: 10px;
            display: flex;
            flex-wrap: wrap;
            align-content: space-between;
            background-size: 100% 100%;
            .gladTop {
              width: 100%;
              height: 82px;
              background: url("../assets/images/xibaotop.png") no-repeat;
              background-size: 100%;
            }
            .gladContent {
              width: 100%;
              height: 150px;
              display: block;
              overflow: visible;
              padding: 0 20px;
              .title {
                height: 50px;
                width: 100%;
                display: flex;
                align-items: center;
                justify-content: center;
                .words {
                  margin: 0 2px;
                  font-size: 20px;
                  font-weight: bold;
                  color: #d046f1;
                }
              }
              .glad_card {
                height: 140px;
                border-top: 2px solid #6a8dfb;
                border-radius: 5px;
                background: #fff;
                position: relative;
                z-index: 10;
                display: flex;
                .glad_card_head {
                  height: 100%;
                  padding: 0 10px;
                  img {
                    width: 100px;
                    height: 100px;
                    border-radius: 5px
                  }
                }
                .glad_card_info {
                  height: 100px;
                  flex-grow: 1;
                  display: flex;
                  flex-wrap: wrap;
                  align-items: flex-start;
                }
              }
            }
            .gladBottom {
              width: 100%;
              height: 83px;
              background: url("../assets/images/xibaobottom.png") no-repeat;
              background-size: 100%;
            }
          }
          .gladBackground {
            position: absolute;
            width: 628px;
            height: 403px;
            top: 35px;
            left: -225px;
            background: url("../assets/images/xiabobeijing.png") no-repeat;
            background-size: 100% 100%;
            z-index: 100;
          }
        }
        .countdown {
          border: none;
        }
        .guide {
          width: 150px;
        }
        .personInfo {
          height: 100%;
          width: 200px;
          .head {
            width: 40px;
            height: 40px;
            padding: 0 0 0 25px;
            img {
              width: 40px;
              height: 40px;
              border-radius: 50%;
            }
          }
          .el-dropdown {
            margin-left: 20px;
            font-size: 15px;
            cursor: pointer;

          }
        }
      }
    }

    .contentBox {
      .el-container {
        .aside {
          position: fixed;
          top: 66px;
          height: 100%;
          z-index: 56;
          overflow: auto;
          [class^="el-icons-fa"], [class*=" el-icons-fa"] {
            vertical-align: middle;
            margin-right: 5px;
            width: 24px;
            text-align: center;
            font-size: 18px;
          }
          .developBack {
            background: #405597 !important;
          }
          .el-menu {
            i {
              color: #fff !important;
            }
          }
          .el-menu--collapse {
            width: 64px;
            height: 100%;
          }
          .el-menu-vertical-demo:not(.el-menu--collapse) {
            width: 210px;
            min-height: 100%;
          }
        }
        .el-main {
          margin-top: 66px;
          padding: 10px 20px;
          margin-left: 210px;
          overflow-x: hidden;
          /*transition: margin-left .4s;*/
        }
      }
    }
    .hideSidebar {
      .el-main {
        margin-left: 64px !important;
      }
    }
  }

</style>
