<template xmlns:v-popover="http://www.w3.org/1999/xhtml">
  <div id="index" @click="clickScreen">
    <div class="navBar" :class="isFull? 'navBarHide':'' ">
      <div class="left">
        <div class="logo" :class="isCollapse? 'isCollapse_logo':'' ">
          <div class="boss" :class="isCollapse? 'boss1':'' ">BOSS</div>
          <div v-if="isCollapse" class="isCollapse" @click="changeCollapse"></div>
          <div v-if="!isCollapse" class="el-icons-fa-bars" @click="changeCollapse"></div>
        </div>
        <div class="slogan">
          <img src="../assets/images/slogan.png" alt="">
        </div>
      </div>
      <div class="right">
        <div class="guide" style="border: none">
          <span style="line-height: 20px;color: #409EFF;" @click="fullScreen(1)"><i class="iconfont icon-quanping"></i>全屏</span>
        </div>

        <div class="guide" style="cursor: default">
          <i class="el-icon-time"></i>
          {{Countdown}}
        </div>

        <div class="guide">
          <el-dropdown trigger="click">
            <span class="el-dropdown-link topFlex">
              <i class="iconfont icon-qita1"></i><span>快捷入口</span>
            </span>
            <el-dropdown-menu slot="dropdown" class="shortcutList">
              <el-dropdown-item v-for="(item,index) in isShortcutPath" :key="index" :class="{'border_top': index > 3}">
                <router-link :to="item.path">
                  <b style="font-weight: 100" :class="{'backColor1': -1 < index,'backColor2': index === 3 || index === 11 || index === 13,
                   'backColor3': index === 5 || index === 14,'backColor4':index === 4}">
                    <i :class="item.icon" style="font-size: 22px"></i>
                  </b>
                  <span>{{item.name}}</span>
                </router-link>
              </el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </div>
        <!--消息-->
        <div class="message" style="position: relative;margin-right: 50px">
          <el-dropdown v-if="unReadMessageData.length">
            <el-badge :value="unReadMessageData.length" class="item">
              <i class="el-icons-fa-comment-o"></i>
              消 息
            </el-badge>
            <el-dropdown-menu slot="dropdown" class="menuLists">
              <!--消息图标-->
              <el-dropdown-item v-for="(item,index) in unReadMessageData" v-if="index<2" :key="index">
                <div class="first">
                  <el-row @click.native="showMessageDetail(item)">
                    <el-col :span="4">
                      <div class="picSign">
                        <i class="el-icon-bell"></i>
                      </div>
                    </el-col>
                    <el-col :span="20">
                      <div class="public">
                        <div class="signOne">系统公告</div>
                        <div class="limits">{{item.content.content}}</div>
                      </div>
                    </el-col>
                  </el-row>
                </div>
              </el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>

          <!--//没有消息展现方式-->
          <span v-else="" style="cursor: default">
            <i class="el-icons-fa-comment-o"></i>
            消 息
          </span>
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
        <!--个人信息-->
        <div class="personInfo">
          <div class="head" style="cursor: pointer">
            <span v-if="personal.avatar !== '' && personal.avatar !== null">
              <img data-card="" :data-src="JSON.stringify(personal)" :src="personal.avatar">
            </span>
            <span v-else>
              <img src="../assets/images/head.jpg">
            </span>

          </div>
          <el-dropdown trigger="click">
              <span class="el-dropdown-link" v-if="personal !== undefined">
                {{personal.name}}<i class="el-icon-arrow-down el-icon--right" style="margin-left: 25px"></i>
              </span>
            <el-dropdown-menu slot="dropdown" class="personal">
              <div><i style="color: #fb509f;margin-right: 5px" class="iconfont icon-jifen"></i>{{creditTotal}}分</div>
              <div class="rank">连续登录时长</div>
              <el-popover ref="popover1" placement="top-start" width="100" trigger="hover">
                <span> 已连续登录{{loginDay}}天 &nbsp;&nbsp;</span>
              </el-popover>
              <div class="progressBar" v-popover:popover1>
                <div class="percent"></div>
              </div>
              <div class="level">
                <div>0</div>
                <div>180</div>
              </div>
              <div class="navigation">
                <el-row>
                  <el-col :span="10" class="checkUp">
                    <div class="navigationLeft">
                      <el-dropdown-item @click.native="routers('messageCenter')" style="padding: 0">
                        <div class="msgCenter">
                          <i class="el-icon-bell"></i>
                          <div class="msgTitle">消息中心</div>
                        </div>
                      </el-dropdown-item>
                    </div>
                  </el-col>

                  <el-col :span="10" class="checkUp" :offset="4">
                    <div class="navigationLeft">
                      <el-dropdown-item @click.native="routers('checkWork')" style="padding: 0">
                        <div class="msgCenter">
                          <i class="el-icons-fa-edit" style="color: #58D788;"></i>
                          <div class="msgTitle">考勤自助</div>
                        </div>
                      </el-dropdown-item>
                    </div>
                  </el-col>
                </el-row>

                <el-row>
                  <el-col :span="10" class="checkUp">
                    <div class="navigationLeft">
                      <el-dropdown-item style="padding: 0" @click.native="routers('register')">
                        <div class="msgCenter">
                          <i class="el-icon-location" style="color: #fb4699"></i>
                          <div class="msgTitle">签到自助</div>
                        </div>
                      </el-dropdown-item>
                    </div>
                  </el-col>

                  <el-col :span="10" class="checkUp" :offset="4">
                    <div class="navigationLeft">
                      <el-dropdown-item @click.native="lockScreen" style="padding: 0">
                        <div class="msgCenter">
                          <i class="el-icons-fa-unlock-alt" style="color: #C0C4CC;"></i>
                          <div class="msgTitle">一键锁屏</div>
                        </div>
                      </el-dropdown-item>
                    </div>
                  </el-col>
                </el-row>

                <el-row>
                  <el-col :span="10" class="checkUp">
                    <div class="navigationLeft">
                      <el-dropdown-item @click.native="routers('personalSetting')" style="padding: 0">
                        <div class="msgCenter">
                          <i class="el-icon-setting"></i>
                          <div class="msgTitle">个人设置</div>
                        </div>
                      </el-dropdown-item>
                    </div>
                  </el-col>

                  <el-col :span="10" class="checkUp" :offset="4">
                    <div class="navigationLeft">
                      <el-dropdown-item @click.native="routers('individual')" style="padding: 0">
                        <div class="msgCenter">
                          <i class="el-icons-fa-user" style="color: #58D788;"></i>
                          <div class="msgTitle">个人门户</div>
                        </div>
                      </el-dropdown-item>
                    </div>
                  </el-col>
                </el-row>
              </div>
              <el-dropdown-item class="detrusion" @click.native="routers('/login')">
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
          <el-menu mode="vertical" :default-active="$route.path" class="el-menu-vertical-demo" unique-opened
                   :defaultOpeneds=defaultArray
                   :collapse="isCollapse" router @open="handleOpen" @close="handleClose"
                   background-color="#6a8dfb" text-color="#fff" active-text-color="#ffd04b">
            <template v-for="(item,index) in $router.options.routes">
              <!--一级菜单-->
              <el-menu-item v-if="item.hidden" v-for="child in item.children" :index="child.path" :key="child.path">
                <i :class="child.icon" style="font-size: 22px"></i>
                <span slot="title"> {{child.name}}</span>
              </el-menu-item>

              <el-submenu :index="item.name+''" v-if="!item.hidden && !item.abnormal">
                <template slot="title">
                  <i :class="item.icon" style="font-size: 22px"></i>
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

        <div style="position: fixed;bottom: 10px;left: 36px;z-index: 99999;" v-if="!isCollapse">
          <div style="color: #ffffff;">业务咨询&nbsp;&nbsp;陆经理</div>
          <div style="color: #ffffff;">版本信息&nbsp;&nbsp;BOSS&nbsp;3.0</div>
        </div>

        <el-main :class="isFull? 'mainHide':'' ">
          <div style="min-width: 1200px">
            <TagsView></TagsView>
          </div>
          <div style="padding: 10px;background: #fff;min-width: 1200px">
            <keep-alive>
              <router-view></router-view>
            </keep-alive>
          </div>
        </el-main>
      </el-container>
    </div>

    <MessageDetail :messageDialog="messageDialog" :messageDetail="messageDetail" @close="closeMessage"></MessageDetail>

  </div>
</template>

<script>
  import TagsView from './common/tagsView.vue'
  import screenFull from 'screenfull'
  import MessageDetail from './common/messageDetail.vue'

  export default {
    name: 'Index',
    components: {TagsView, MessageDetail},
    data() {
      return {
        personal: {},
        isCollapse: true,
        isFull: false,
        Countdown: 0,  //倒计时
        defaultTime: 0,  //倒计时
        screenStatus: false,
        defaultArray: [],
        messageDialog: false,

        unReadMessageData: [],
        messageDetail: [],
        interval: null,
        messageInterval: null,
        loginDay: 0,
        loginPercent: 0,
        creditTotal: 0, // 积分总数
      }
    },

    mounted() {
      this.initData();
    },
    computed: {
      visitedViews() {
        return this.$store
      },
      isShortcutPath(){
        let isShortcutPath = [];
        this.$router.options.routes.forEach((item) => {
          if (item.isShortcut) {
            isShortcutPath = item.children;
          }
        });
        return isShortcutPath;
      }
    },
    watch: {
      isCollapse(val) {
        document.getElementById('isCollapse').style.overflow = val ? 'visible' : 'auto';
      },
      '$store.state.app.isBasicChange': {
        handler(val, oldVal){
          this.countTime();
        }
      }
    },
    methods: {
      initData(){
        this.personal = JSON.parse(localStorage.personal);
        this.loginDay = this.personal.data.loginday;
        this.loginPercent = Number(this.loginDay / 180*100) + '%';
        $('.percent').css('width', this.loginPercent);
        this.countTime();

        clearInterval(this.messageInterval);
        this.messageInterval = null;

        this.messageInterval = setInterval(() => {
          if(localStorage.personal){
            this.getUnReadMessage()
          }
        }, 100000);
        //获取积分明细
        this.getCredit();
        //获取登陆时长
        this.getLoginDay();
      },
      routers(url) {
        this.$router.push(url);
      },
      //显示消息详情
      showMessageDetail(val){
        this.messageDetail = val;
        this.messageDialog = true;
        this.$http.put(globalConfig.server_user + 'messages/' + val.id).then((res) => {
          if (res.data.status === 'success') {
            this.getUnReadMessage();
          }
        })
      },
      closeMessage(){
        this.messageDialog = false;
      },
      //获取未读消息
      getUnReadMessage(){
        this.$http.get(globalConfig.server_user + 'messages?unread=1').then((res) => {
          if (res.data.status === 'success') {
            this.unReadMessageData = res.data.data;
          }
        })
      },

      // 全屏
      fullScreen(val) {
        screenFull.toggle();
      },
      handleOpen(key, keyPath) {

      },
      handleClose(key, keyPath) {
      },
      clickScreen() {
        this.screenStatus = true;
      },
      countTime() {
        let countDown = [];
        this.$http.get(globalConfig.server + 'setting/dictionary/203').then((res) => {
          if (res.data.code === '30010') {
            countDown = res.data.data;
            this.$http.get(globalConfig.server + 'setting/setting/read?type=1&staff_id=' + this.personal.id).then((res) => {
              if (res.data.code === '50010') {
                let array = res.data.data;
                for (let i = 0; i < array.length; i++) {
                  countDown.forEach((item) => {
                    if (array[i].dict_id == item.id) {
                      this.defaultTime = this.Countdown = Number(item.dictionary_name);
                      this.startCount();
                    }
                  })
                }
              }
            })
          }
        });
      },

      startCount(){
        clearInterval(this.interval);
        new Promise((resolve, reject) => {
          this.interval = setInterval(() => {
            this.Countdown--;
            if (this.Countdown < 1) {
              resolve('锁屏');
            }
            if (this.screenStatus) {
              reject('重新计数');
              clearInterval(this.interval);
              this.interval = null;
            }
          }, 1000)
        }).then((data) => {
          this.lockScreen();
        }).catch((data) => {
          this.Countdown = this.defaultTime;
          this.startCount();
          this.screenStatus = false;
        })
      },
      changeCollapse() {
        this.isCollapse = !this.isCollapse;
      },
      lockScreen() {
        clearInterval(this.interval);
        this.interval = null;
        clearInterval(this.messageInterval);
        this.messageInterval = null;
        this.$http.get(globalConfig.server + 'setting/others/lock_screen_status?lock_status=1').then((res) => {
          if (res.data.code === '100003') {
            localStorage.setItem('beforePath', this.$route.path);
            localStorage.setItem('lockStatus', 1);
            this.$router.push({path: '/lock'});
          } else {
            this.$notify({
              title: '警告',
              message: res.data.msg,
              type: 'warning'
            });
          }
        })
      },
      //获取积分总数
      getCredit(){
        this.$http.get(globalConfig.server + 'credit/manage/self').then((res) => {
          if (res.data.code === '30310') {
            this.creditTotal = res.data.data;
          }
        })
      },
      //获取登陆时长
      getLoginDay(){
//        this.$http.get(globalConfig.server + 'special/special/time').then((res) => {
//          if (res.data.code === '30310') {
//            this.creditTotal = res.data.data;
//          }
//        })
      }
    }
  }
</script>

<style lang="scss" scoped="">
  @mixin border_radius($n) {
    -webkit-border-radius: $n;
    -moz-border-radius: $n;
    border-radius: $n;
  }

  @mixin box_shadow($n) {
    -webkit-box-shadow: 0 0 12px 0 $n;
    -moz-box-shadow: 0 0 12px 0 $n;
    box-shadow: 0 0 12px 0 $n;
  }

  @mixin box_sizing {
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
  }

  @mixin transition {
    transition: all .4s;
  }

  @mixin flex {
    display: -webkit-flex;
    display: flex;
  }

  $color1: #409EFF;
  $color2: #58D788;
  $color3: #FB4699;
  $color4: #FDCA41;
  .personal {
    width: 200px;
    background: #f9fbff;
    padding: 18px 16px;
    /*修改*/
    .rank {
      font-size: 13px;
      margin-top: 10px;
    }
    .progressBar {
      margin-top: 10px;
      position: relative;
      height: 4px;
      width: 100%;
      background: #e8e9e9;
      border-radius: 2px;
      .percent {
        height: 4px;
        border-radius: 2px;
        background: linear-gradient(to right, #7796f9, #f856a1); /* 标准的语法（必须放在最后） */
      }
      /*.progress {
        width: 100%;
        height: 5px;
        border-radius: 5px;
        position: relative;
        overflow: hidden;
        background: #E8E9E9;
      }
      .progress > span {
        position: absolute;
        display: inline-block;
        width: 50%;
        height: 100%;
        background: -webkit-linear-gradient(left, #409eff, #fa4699);
        text-align: center;
      }

      .round {
        width: 5px;
        height: 5px;
        @include border_radius(50px);
        position: absolute;
        background: #FFFFFF;
      }
      .roundLeft {
        border: 5px solid #FDCA41;
        top: -5px;
        left: -2px;
      }
      .roundRight {
        border: 5px solid #D6D7DB;
        top: -5px;
        right: -3px;
      }*/
    }
    .level {
      @include flex;
      justify-content: space-between;
      margin-top: 10px;
    }
    .navigation {
      margin-top: 10px;
      .navigationLeft {
        margin-right: 10px;
        .el-dropdown-menu__item:hover {
          &:hover {
            background: transparent;
          }
        }
        .msgCenter {
          @include flex;
          font-size: 13px;
          padding: 0;
          i {
            color: #409EFF;
            margin-top: 11px;
          }
          .msgTitle {
            margin-left: 8px;
          }
        }
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
      @include box_shadow(#409EFF);
      @include border_radius(6px);
    }
    .detrusion:hover {
      background: #6A8DFB;
      color: #ffffff;
      @include box_shadow(#6A8DFB);
    }
  }

  #index {
    .transition-box {
      width: 200px;
      height: 80px;
      box-sizing: border-box;
      display: flex;
      display: -webkit-flex;
      position: relative;
      @include transition;
      background: url("../assets/images/peosonal.png") no-repeat;
      -moz-background-size: 100% 100%;
      background-size: 100% 100%;
      div {
        /*width: 80px;*/
        color: #ffffff;
        img {
          position: absolute;
          top: -25px;
          width: 80px;
          height: 80px;
          left: -15px;;
        }
      }
      div.contents {

        @include box_sizing;
        margin: 10px 0 0 85px;
      }
    }
    .department_name {
      color: #fff;
      padding: 10px;
      text-align: center;
      background-color: #6a8dfb;
      align-items: center;
    }
    .isCollapse {
      width: 27px;
      height: 20px;
      margin-right: 20px;
      background: url("../assets/images/boss.svg") no-repeat;
    }
    .isCollapse_logo {
      width: 64px !important;
      @include transition;
      cursor: pointer;
    }
    /*
    .navBarLeft {
      position: fixed;
      top: 0;
      left: -64px;
      width: 64px;
      height: 66px;
      background: #ffffff;
      display: -webkit-flex;
      display: flex;
      justify-content: center;
      align-items: center;
      @include transition;
      i {
        cursor: pointer;
        font-size: 30px;
        color: #409EFF;
      }
    }
    .navBarRight {
      left: 0;
      //      @include transition;
      p {
        width: 27px;
        height: 20px;
        background: url('../assets/images/boss.svg') no-repeat;
      }
    }*/

    .navBar {
      width: 100%;
      min-width: 1200px;
      height: 66px;
      background: #fff;
      position: fixed;
      top: 0;
      left: 0;
      z-index: 66;
      border-bottom: 1px solid #f4f3f6;
      display: flex;
      @include transition;
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
          transition: all .4s;
          .boss {
            font-size: 26px;
            color: #6a8dfb;
            margin-left: 50px;
            @include transition;
          }
          .boss1 {
            font-size: 26px;
            color: #6a8dfb;
            margin-left: -72.25px;
            @include transition;
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

    .navBarHide {
      top: -66px;
      //      @include transition;
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
          .el-menu--collapse {
            width: 64px;
            height: 100%;
          }
          .el-menu-vertical-demo:not(.el-menu--collapse) {
            width: 210px;
            min-height: 100%;
            padding-bottom: 70px;
          }
        }
        .el-main {
          margin-top: 66px;
          min-height: 500px;
          padding: 10px 20px;
          margin-left: 210px;
          overflow-x: hidden;
          @include transition;
        }
        .mainHide {
          margin-top: 0 !important;
          //          @include transition;
        }
      }
    }
    .hideSidebar {
      .el-main {
        margin-left: 64px !important;
      }
    }
  }

  /*----------------------  快捷入口*-------------------*/
  .shortcutList {
    padding: 0 !important;
    .backColor1 {
      background: $color1;
    }
    .backColor2 {
      background: $color2;
    }
    .backColor3 {
      background: $color3;
    }
    .backColor4 {
      background: $color4;
    }

    width: 362px;
    box-sizing: border-box;
    .el-dropdown-menu__item {
      line-height: 20px;
      width: 90px;
      float: left;
      text-align: center;
      padding: 12px 0 6px;
      b {
        @include border_radius(6px);
        display: inline-block;
        width: 50px;
        height: 50px;
        text-align: center;
        color: #fff;
        line-height: 50px;
        font-size: 22px;
      }
      span {
        color: #575859;
        margin: 6px 0;
        display: block;
      }
    }
    .border_top {
      border-top: 1px solid #e5e5e5;
    }
  }

  .topFlex {
    @include flex;
    align-items: center;
  }

  /*----------------------  消息列表*-------------------*/
  .menuLists {
    li + li {
      border-top: 1px solid #dfe6fb;
    }
    li {
      line-height: 20px;
    }
    .first {
      width: 300px;
      padding: 10px;
      cursor: pointer;
      li {
        padding: 0;
      }
      .picSign {
        font-size: 27px;
        width: 35px;
        height: 35px;
        line-height: 35px;
        text-align: center;
        @include border_radius(50%);
        color: #ffffff;
        background: #409EFF;
        margin-right: 12px;
        margin-top: 2px;
      }
      .public {
        .signOne {
          font-size: 16px;
          color: #409EFF;
        }
        .limits {
          font-size: 14px;
          text-overflow: ellipsis;
          white-space: nowrap;
          overflow: hidden;
        }
      }
    }
  }
</style>
