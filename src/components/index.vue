<template>
  <div id="index" @click="clickScreen">
    <div class="navBarLeft" :class="isFull? 'navBarRight':'' ">
      <!--<i class="el-icons-fa-compress"></i>-->
      <p @click="fullScreen(2)"></p>
    </div>
    <div style="position: fixed;top: 30px;right: 20px;z-index: 100;">
      <el-collapse-transition>
        <div v-show="isFull">
          <div class="transition-box">
            <div>
              <img src="../assets/images/情人节.png" alt="">
            </div>
            <div class="contents">
              <el-row>
                <el-col :span="24">
                  <div style="font-size: 16px">回复的咖</div>
                </el-col>
              </el-row>

              <el-row>
                <el-col :span="24">
                  <div style="font-size: 13px;margin-top: 3px;">80秒</div>
                </el-col>
              </el-row>
            </div>
          </div>
        </div>
      </el-collapse-transition>
    </div>
    <div class="navBar" :class="isFull? 'navBarHide':'' ">
      <div class="left">
        <div class="logo" :class="isCollapse? 'isCollapse_logo':'' ">
          <div class="boss" :class="isCollapse? 'boss1':'' ">BOSS</div>
          <div :class="isCollapse? 'isCollapse':'' " class="el-icons-fa-bars" @click="changeCollapse"></div>
        </div>
        <div class="slogan">
          <img src="../assets/images/slogan.png" alt="">
        </div>
      </div>
      <div class="right">
        <div class="countdown" style="border-right: 1px solid #DDDDDD">
          <span style="line-height: 20px;color: #409EFF;" @click="fullScreen(1)">精简模式</span>
        </div>
        <div class="countdown">
          <i class="el-icon-time"></i>
          {{Countdown}}
        </div>
        <div class="message" style="position: relative">
          <el-dropdown>
            <el-badge is-dot class="item">
              <i class="el-icons-fa-comment-o"></i>
              消息
            </el-badge>
            <el-dropdown-menu slot="dropdown" class="menuLists">
              <!--消息图标-->
              <div class="first">
                <div>
                  <el-row>
                    <el-col :span="4">
                      <div class="picSign">
                        <i class="el-icon-bell"></i>
                      </div>
                    </el-col>
                  </el-row>
                </div>

                <div>
                  <el-dropdown-item>
                        <el-row>
                          <el-col :span="24">
                            <div class="public">
                              <el-row>
                                <el-col :span="24">
                                  <div class="signOne">系统公告</div>
                                </el-col>
                              </el-row>

                              <el-row>
                                <el-col :span="24">
                                  <div class="limits">Lorem ipsum dolor23r23222222222222222 Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad aperiam architecto aspernatur dignissimos dolor dolorem doloremque ex facere facilis in minima mollitia, nihil nostrum quo ratione saepe tempore totam voluptatem?</div>
                                </el-col>
                              </el-row>
                            </div>
                          </el-col>
                        </el-row>

                  </el-dropdown-item>
                </div>
              </div>

              <div class="first">
                <div>
                  <el-row>
                    <el-col :span="4">
                      <div class="picSign" style="background: #58d788">
                        <i class="el-icon-edit-outline"></i>
                      </div>
                    </el-col>
                  </el-row>
                </div>

                <div>
                  <el-dropdown-item>
                    <el-row>
                      <el-col :span="24">
                        <div class="public">
                          <el-row>
                            <el-col :span="24">
                              <div class="signOne" style="color: #58d788">审批提醒</div>
                            </el-col>
                          </el-row>

                          <el-row>
                            <el-col :span="24">
                              <div class="limits">Lorem ipsum dolor23r23222222222222222 Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad aperiam architecto aspernatur dignissimos dolor dolorem doloremque ex facere facilis in minima mollitia, nihil nostrum quo ratione saepe tempore totam voluptatem?</div>
                            </el-col>
                          </el-row>
                        </div>
                      </el-col>
                    </el-row>

                  </el-dropdown-item>
                </div>
              </div>
            </el-dropdown-menu>
          </el-dropdown>

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
                解兆飞<i class="el-icon-arrow-down el-icon--right" style="margin-left: 25px"></i>
              </span>
            <el-dropdown-menu slot="dropdown" class="personal">
              <!--<el-dropdown-item class="personalList">-->
                <!--<p><i class="el-icon-menu"></i></p>-->
                <!--<div>-->
                  <!--个人主页-->
                <!--</div>-->
              <!--</el-dropdown-item>-->
              <!--<el-dropdown-item class="personalList">-->
                <!--<p><i class="el-icons-fa-sitemap"></i></p>-->
                <!--<div>-->
                  <!--部门主页-->
                <!--</div>-->
              <!--</el-dropdown-item>-->

              <el-row>
                <el-col :span="24">
                  <el-row>
                    <el-col :span="12">
                      <div class="signCount" style="margin-left: 4px">
                        <div class="personalSign">
                          <i class="el-icon-star-off"></i>
                        </div>
                        <div class="signNumber">9999</div>
                        <div class="signUnit">分</div>
                      </div>
                    </el-col>
                    <el-col :span="12">
                      <div class="signCount" style="margin-left: 15px">
                        <div class="personalSign" style="background: #409EFF">
                          <i class="el-icon-star-off"></i>
                        </div>
                        <div class="signNumber" style="color: #409eff">9999</div>
                        <div class="signUnit">币</div>
                      </div>
                    </el-col>
                  </el-row>
                </el-col>
              </el-row>

              <el-row>
                <el-col :span="24">
                  <div class="rank">等级</div>
                </el-col>
              </el-row>

              <el-row>
                <el-col :span="24">
                  <div class="progressBar">
                    <!--<el-progress :percentage="50" :show-text="false"></el-progress>-->
                    <div class="progress">
                      <span></span>
                    </div>
                    <div class="round roundLeft"></div>
                    <div class="round roundRight"></div>
                  </div>
                </el-col>
              </el-row>

              <el-row>
                <el-col :span="24">
                  <div class="level">
                    <div>A</div>
                    <div>B</div>
                  </div>
                </el-col>
              </el-row>

              <el-row>
                <el-col :span="24">
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
                          <el-dropdown-item @click.native="routers('messageCenter')" style="padding: 0">
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
                          <el-dropdown-item style="padding: 0">
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
                              <i class="el-icon-setting" style="color: #58D788;"></i>
                              <div class="msgTitle">个人门户</div>
                            </div>
                          </el-dropdown-item>
                        </div>
                      </el-col>
                    </el-row>
                  </div>
                </el-col>
              </el-row>
<!--2-->
              <!--<el-dropdown-item class="personalList" @click.native="routers('messageCenter')">-->
                <!--<p><i class="el-icon-bell"></i></p>-->
                <!--<div>-->
                  <!--消息中心-->
                <!--</div>-->
              <!--</el-dropdown-item>-->
              <!--<el-dropdown-item class="personalList">-->
                <!--<p><i class="el-icons-fa-edit"></i></p>-->
                <!--<div>-->
                  <!--考勤自助-->
                <!--</div>-->
              <!--</el-dropdown-item>-->
              <!--<el-dropdown-item class="personalList">-->
                <!--<p><i class="el-icon-location"></i></p>-->
                <!--<div>-->
                  <!--签到自助-->
                <!--</div>-->
              <!--</el-dropdown-item>-->
              <!--<el-dropdown-item class="personalList"  @click.native="lockScreen">-->
                <!--<p><i class="el-icons-fa-unlock-alt"></i></p>-->
                <!--<div>-->
                  <!--一键锁屏-->
                <!--</div>-->
              <!--</el-dropdown-item>-->
              <!--<el-dropdown-item class="personalList" @click.native="routers('personalSetting')">-->
                <!--<p><i class="el-icon-setting"></i></p>-->
                <!--<div>-->
                  <!--个人设置-->
                <!--</div>-->
              <!--</el-dropdown-item>-->
              <!--<el-dropdown-item class="personalList" @click.native="routers('individual')">-->
                <!--<p><i class="el-icon-setting"></i></p>-->
                <!--<div>-->
                  <!--个人门户-->
                <!--</div>-->
              <!--</el-dropdown-item>-->
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

        <el-main :class="isFull? 'mainHide':'' ">
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
        isFull: false,
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
      routers(url) {
        this.$router.push(url);
      },
      // 全屏
      fullScreen(val) {
        if (val === 1) {
          this.isFull = true;
          this.isCollapse = true;
        } else {
          this.isFull = false;
          this.isCollapse = false;
        }
      },
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
        this.isCollapse = !this.isCollapse;
      },
      lockScreen() {
        Cookies.set('last_page_path', this.$route.path); // 本地存储锁屏之前打开的页面以便解锁后打开
        setTimeout(() => {
          this.$router.push({path: '/lock'});
        });
        Cookies.set('locking', '1');
      },
    }
  }
</script>

<style lang="scss">
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

  @mixin transition {
    transition: all .4s;
  }

  @mixin flex {
    display: -webkit-flex;
    display: flex;
  }

  .personal {
    width: 200px;
    padding: 18px 16px;
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

/*修改*/
    .signCount{
      @include flex;
      .personalSign {
        width: 25px;
        height: 25px;
        font-size: 22px;
        text-align: center;
        color: #FFFFFF;
        background: #fb4699;
        @include border_radius(50%);
      }
      .signNumber {
        color: #fb4699;
        margin: 5px 0 0 8px;
        font-size: 13px;
      }
      .signUnit {
        margin: 3px;
        font-size: 13px;
      }
    }
    .rank {
      font-size: 13px;
      margin-top: 20px;
    }
    .progressBar {
      margin-top: 10px;
      position: relative;
      .progress{
        width: 100%;
        height: 5px;
        border-radius: 5px;
        position: relative;
        overflow: hidden;
        background: #E8E9E9;
      }
      .progress>span {
        position: absolute;
        display: inline-block;
        width: 50%;
        height: 100%;
        background: -webkit-linear-gradient(left,  #409eff, #fa4699);
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
      }
      /*@keyframes load{*/
        /*0%{*/
          /*width: 0%;*/
        /*}*/
        /*100%{*/
          /*width:70%;*/
        /*}*/
      /*}*/


    }
    .level {
      @include flex;
      justify-content: space-between;
      margin-top: 10px;
    }
    .navigation{
      margin-top: 10px;
      .navigationLeft {
        margin-right: 10px;
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
      /*background-color: #6a8dfb;*/
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
        /*display: flex;*/
        /*display: -webkit-flex;*/
        /*align-items: center;*/
        /*flex-wrap: wrap;*/
        /*padding-left: 10px;*/
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
      padding: 0 20px;
    }
    .isCollapse_logo {
      width: 64px !important;
      @include transition;
    }

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
      @include transition;
      p {
        width: 27px;
        height: 20px;
        background: url('../assets/images/boss.svg') no-repeat;
      }
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

    .navBarHide {
      top: -66px;
      @include transition;
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
          @include transition;
        }
      }
    }
    .hideSidebar {
      .el-main {
        margin-left: 64px !important;
      }
    }
  }


  /*----------------------  消息列表*-------------------*/
  .menuLists {
    .first {
      @include flex;
      margin-top: 10px;
      li{
        padding: 0;
      }
      .picSign {
        width: 35px;
        height: 35px;
        font-size: 27px;
        text-align: center;
        /*border: 1px solid red;*/
        @include border_radius(50%);
        color: #ffffff;
        background: #409EFF;
        margin: 5px 0 0 20px;
      }
      .public {
        line-height: 20px;
        margin-left: 10px;
        .signOne {
          font-size: 16px;
          color: #409EFF;
        }
        .limits {
          font-size: 14px;
          width: 280px;
          text-overflow : ellipsis;
          white-space : nowrap;
          overflow : hidden;
          padding-bottom: 15px;
          border-bottom: 1px solid #eeeeee;
        }
      }
    }
  }
</style>
