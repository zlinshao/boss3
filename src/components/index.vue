<template xmlns:v-popover="http://www.w3.org/1999/xhtml">
  <div id="index">
    <div class="navBar" :class="isFull? 'navBarHide':'' ">
      <div class="left">
        <div class="logo" @click="changeCollapse" :class="isCollapse? 'isCollapse_logo':'' ">
          <div class="boss" :class="isCollapse? 'boss1':'' "></div>
          <div v-if="isCollapse" class="isCollapse"></div>
          <div v-if="!isCollapse" class="el-icons-fa-bars"></div>
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
              <el-dropdown-item v-for="(item,index) in isShortcutPath" :key="index"
                                @click.native="routers(item.path)" :class="{'border_top': index > 3}">
                <div>
                  <b style="font-weight: 100" :class="{'backColor1': -1 < index,'backColor2': index === 3 || index === 11 || index === 13,
                   'backColor3': index === 5 || index === 14,'backColor4':index === 4}">
                    <i :class="item.icon" style="font-size: 22px"></i>
                  </b>
                  <span>{{item.name}}</span>
                </div>
              </el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </div>
        <!--消息-->
        <div class="message" style="position: relative;margin-right: 15px">
          <el-dropdown>
            <el-badge v-if="messageTotal>0" :max="99" :value="messageTotal" class="item">
              <i class="el-icons-fa-comment-o"></i>
              消 息
            </el-badge>
            <el-badge v-else class="item">
              <i class="el-icons-fa-comment-o"></i>
              消 息
            </el-badge>
            <el-dropdown-menu slot="dropdown" class="menuLists">
              <!--消息图标-->
              <el-dropdown-item v-for="(item,index) in unReadMessageData" v-if="index<2 && unReadMessageData.length>0"
                                :key="index">
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
              <el-dropdown-item>
                <el-row v-if="unReadMessageData.length >0" @click.native="showOtherDetail('unread')">
                  <el-col :span="24">
                    <div style="display:block; margin:5px 0; text-align:center; color:#409EFF">查看全部<span
                      style="color:#f00">{{messageTotal}}条</span>未读
                    </div>
                  </el-col>
                </el-row>
              </el-dropdown-item>
              <el-dropdown-item class="not" v-if="unReadMessageData.length <=0">
                <el-row style="cursor:default; ">
                  <el-col :span="24">
                    <i style="font-size:50px;color:#eee; display:block; text-align:center;" class="el-icon-warning"></i>
                    <div
                      style=" width:180px;color:#aaa; height:40px; display:block; line-height:40px; text-align:center">
                      您当前还没有消息提醒
                    </div>
                  </el-col>
                </el-row>
              </el-dropdown-item>
              <el-dropdown-item v-if="unReadMessageData.length <=0">
                <el-row @click.native="showOtherDetail('read')">
                  <el-col :span="24">
                    <div style="display:block; margin-top:10px; text-align:center; color:#409EFF">查看全部已读消息
                    </div>
                  </el-col>
                </el-row>
              </el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>


          <!--//喜报名片-->
          <div v-if="gladFlag">
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
                    <div class="glad_card_right">
                      <span class="gladsp1"><span>￥</span>2600</span>
                      <span class="gladsp2">月单价</span>
                    </div>
                  </div>
                </div>
              </div>
              <div class="gladBottom">
                <div class="glad_close" @click="glad_close">
                  <span>关闭</span>
                </div>
              </div>
            </div>
            <div class="gladBackground"></div>
          </div>
        </div>
        <div @click="openModalDialog('instructionDialog')" class="guide" style="cursor: pointer">
          <i style="font-size:26px; margin-right:4px;" class="iconfont icon-gantanhaodefuben"></i>
          功能说明
        </div>
        <!--个人信息-->
        <div class="personInfo">
          <div class="head" style="cursor: pointer">
            <span v-if="personal.avatar !== '' && personal.avatar !== null">
              <img data-card="" :data-src="JSON.stringify(personal)" :src="personal.avatar">
            </span>
            <span v-else>
              <img data-card="" :data-src="JSON.stringify(personal)" src="../assets/images/head.jpg">
            </span>

          </div>
          <el-dropdown trigger="click" @visible-change="downChange">
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
                      <el-dropdown-item @click.native="lockScreen()" style="padding: 0">
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
                <el-row>
                  <el-col :span="10" class="checkUp">
                    <div class="navigationLeft">
                      <el-dropdown-item @click.native="goBefore('beforeExam')" style="padding: 0">
                        <div class="msgCenter" style="display: -webkit-box;">
                          <i class="el-icon-tickets"></i>
                          <div class="msgTitle">
                            <span>在线考试</span>
                            <span v-if="examData && examData.available" class="circle_red"></span>
                          </div>
                        </div>
                      </el-dropdown-item>
                    </div>
                  </el-col>
                  <el-col :span="10" class="checkUp" :offset="4">
                    <div class="navigationLeft">
                      <el-dropdown-item @click.native="goBefore('beforeNaire')" style="padding: 0">
                        <div class="msgCenter" style="display: -webkit-box;">
                          <i class="el-icon-document" style="color: #58D788;"></i>
                          <div class="msgTitle">
                            <span>问卷调查</span>
                            <span v-if="questionnaireData && questionnaireData.available" class="circle_red"></span>
                          </div>
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
          <el-menu :default-active="$route.path" class="el-menu-vertical-demo" unique-opened
                   :defaultOpeneds=defaultArray :collapse="isCollapse" router show-timeout="0"
                   background-color="#6a8dfb" text-color="#fff" active-text-color="#ffd04b">
            <template v-for="(item,index) in $router.options.routes">
              <!--一级菜单-->
              <el-menu-item v-if="item.hidden" v-for="child in item.children" :index="child.path" :key="child.path">
                <i :class="child.icon" style="font-size: 26px"></i>
                <span slot="title"> {{child.name}}</span>
              </el-menu-item>

              <el-submenu :index="item.name+''" :disabled="chinese.indexOf(item.name)>-1"
                          @click.native="openBadge(item.name)"
                          v-if="!item.hidden && !item.abnormal">
                <!--二级菜单标题-->
                <template slot="title">
                  <i :class="item.icon" style="font-size: 26px"></i>
                  <span>{{item.name}}</span>
                </template>
                <template v-for="(child,key) in item.children">
                  <!--二级菜单-->
                  <el-menu-item v-if="!child.children" :index="child.path" :key="child.path" style="padding-left: 54px">
                    <i :class="child.icon"></i>
                    <span>{{child.name}}</span>
                  </el-menu-item>

                  <!--三级菜单-->
                  <el-submenu :index="child.path" v-if="child.children" style="padding-left: 14px">
                    <!--三级菜单标题-->
                    <template slot="title">
                      <i :class="child.icon"></i>
                      <span>{{child.name}}</span>
                    </template>
                    <el-menu-item v-for="last in child.children" :index="last.path" :key="last.path"
                                  style="padding-left: 74px">
                      {{last.name}}
                    </el-menu-item>
                  </el-submenu>
                </template>
              </el-submenu>
            </template>
          </el-menu>
        </div>

        <div style="position: fixed;bottom: 10px;left: 70px;z-index: 99999;" v-if="!isCollapse">
          <div style="color: #a2b8fd;">BOSS 3.0</div>
        </div>

        <el-main :class="isFull? 'mainHide':''">
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
    <div id="quesNaireDialog">
      <el-dialog :close-on-click-modal="false" :visible.sync="quesNaireDialog" title="调查问卷" width="45%">
        <div style="margin-top: 20px;">
          <el-table
            :data="questionNaireData"
            :empty-text='tableStatus'
            v-loading="tableLoading"
            max-height="400"
            element-loading-text="拼命加载中"
            element-loading-spinner="el-icon-loading"
            element-loading-background="rgba(255, 255, 255, 0)"
            style="width: 100%">
            <el-table-column
              prop="name"
              label="标题">
              <template slot-scope="scope">
                <span v-if="scope.row.name">{{scope.row.name}}</span>
                <span v-else>暂无</span>
              </template>
            </el-table-column>
            <el-table-column
              prop="start_time"
              label="开始时间">
              <template slot-scope="scope">
                <span v-if="scope.row.start_time">{{scope.row.start_time}}</span>
                <span v-else>暂无</span>
              </template>
            </el-table-column>
            <el-table-column
              prop="end_time"
              label="结束时间">
              <template slot-scope="scope">
                <span v-if="scope.row.end_time">{{scope.row.end_time}}</span>
                <span v-else>暂无</span>
              </template>
            </el-table-column>
            <el-table-column
              label="操作">
              <template slot-scope="scope">
                <el-button type="primary" size="mini" @click="answerNaire(scope.row.id)">点击作答</el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </el-dialog>
    </div>

    <MessageDetail :messageDialog="messageDialog" :messageDetail="messageDetail" @close="closeModal"></MessageDetail>
    <SetLockPwd :setLockPwdDialog="setLockPwdDialog" @close="closeModal"></SetLockPwd>
    <UnlockSecondPW :unlockSecondPWDialog="unlockSecondPWDialog" @unlockFlag="unlockFlag" :unLockName="unLockName"
                    @close="closeModalSecond"></UnlockSecondPW>
    <Instruction :instructionDialog="instructionDialog" @close="closeModal"></Instruction>
    <BadgeView :badgeDialog="badgeDialog" @close="closeModalSecond"></BadgeView>
    <InstitutionView :institutionDialog="institutionDialog" :institutionMore="institutionMore"
                     @close="closeinsModal"></InstitutionView>
    <NoticeTitleView :noticeTitleDialog="noticeTitleDialog" @close="closeModal"></NoticeTitleView>
    <YanFirstView :yanFirstDialog="yanFirstDialog" :yanFirstInfo="yanFirstInfo" @close="closeyanModal"></YanFirstView>
    <YanSecondView :yanSecondDialog="yanSecondDialog" @close="closeModal"></YanSecondView>
    <ReadingView :ReadingDialog="ReadingDialog" :yanFirstInfo="yanFirstInfo" @close="readcloseModal"></ReadingView>
  </div>
</template>

<script>
  import ReadingView from './common/reading.vue'  //导读

  import TagsView from "./common/tagsView.vue";
  import screenFull from "screenfull";
  import MessageDetail from "./common/messageDetail.vue";
  import Instruction from "./rentManage/wholeRentManage/components/instruction.vue"; //使用说明
  import SetLockPwd from "./common/setLockPwd.vue";
  import UnlockSecondPW from "./common/unlocksecondpw.vue";  //解锁二级密码
  import BadgeView from "./common/badge.vue";   //每日徽章
  import InstitutionView from "./common/institution.vue";   // 制度弹窗
  import NoticeTitleView from "./common/noticeTitle.vue";   // 公告弹窗
  import YanFirstView from "./common/yanFirst.vue";   // 研发弹窗
  import YanSecondView from "./common/yanSecond.vue";   // 研发2弹窗
  import cookie from 'js-cookie'

  export default {
    name: "Index",
    components: {
      TagsView,
      MessageDetail,
      Instruction,
      SetLockPwd,
      UnlockSecondPW,
      BadgeView,
      InstitutionView,
      NoticeTitleView,
      YanFirstView,
      YanSecondView,
      ReadingView
    },
    data() {
      return {
        personal: {},
        isCollapse: true,
        isFull: false,
        Countdown: 0, //倒计时
        defaultTime: 0, //倒计时
        screenStatus: false,
        defaultArray: [],
        messageDialog: false,
        unLockName: "",
        unReadMessageData: [],
        messageTotal: 0,
        messageDetail: [],
        interval: null,
        messageInterval: null,
        loginDay: 0,
        loginPercent: 0,
        creditTotal: 0, // 积分总数

        setLockPwdDialog: false,
        instructionDialog: false, //功能说明
        ReadingDialog: false,  //导读
        dictionary2: [], //二级密码所需模块
        chinese: [],
        unlockSecondPWDialog: false,
        sendId: "",
        badgeDialog: false, //徽章模态框
        unlockFlagpart: false,//二级密码标识
        gladFlag: false, //喜报标识
        institutionDialog: false,    //制度模态框
        noticeTitleDialog: false,    //公告模态框
        yanFirstDialog: false,       //研发1
        yanSecondDialog: false,      //研发2
        refresh: false,  //每天刷新一次
        yanFirstInfo: {},
        institutionMore: [],

        questionNaireData: [], //当前登陆人还有多少问卷未填写
        tableStatus: ' ',
        tableLoading: false,
        quesNaireDialog: false,
        examData: {},
        questionnaireData: {},
      };
    },
    computed: {
      visitedViews() {
        return this.$store;
      },
      isShortcutPath() {
        let isShortcutPath = [];
        this.$router.options.routes.forEach(item => {
          if (item.isShortcut) {
            isShortcutPath = item.children;
          }
        });
        return isShortcutPath;
      },
      second_Flag() {
        return this.$store.state.secondPassword.second_Flag
      },
      badge_Flag() {
        return this.$store.state.badge.badge_Flag
      }
    },
    watch: {
      isCollapse(val) {
        document.getElementById("isCollapse").style.overflow = val ? "visible" : "auto";
      },
      "$store.state.app.isBasicChange": {
        handler(val, oldVal) {
          this.countTime();
        }
      },
      second_Flag(val) {
        if (val) {
          this.$http.get(globalConfig.server + "setting/dictionary/220").then(res => {
            if (res.data.code === "30010") {
              this.dictionary2 = res.data.data;
              for (let i = 0; i < res.data.data.length; i++) {
                for (let key in JSON.parse(localStorage.personal).data.secondary_password) {
                  if (res.data.data[i].id == JSON.parse(localStorage.personal).data.secondary_password[key]
                  ) {
                    this.chinese.push(res.data.data[i].dictionary_name);
                  }
                }
              }
            }
          });
        }
      },
      badge_Flag(val) {
        //个人连续登录时长勋章
        let badge = false;
        this.$store.dispatch('badgeFlag', badge);
        if (val) {
          if (!JSON.parse(localStorage.personal).data.medal) {
            this.badgeDialog = true;
          }
          this.$http
            .get(globalConfig.server + "setting/update/read?a=1")
            .then(res => {
              if (res.data.code === "50040") {
                this.yanFirstInfo = res.data.data;
                if (res.data.data.type == 2) {
                  this.yanFirstDialog = true;
                }
                else if (res.data.data.type == 1 && res.data.data.album.image_pic.length > 0) {
                  this.ReadingDialog = true;
                }

              }
            });
          //制度弹窗
          this.$http
            .get(globalConfig.server + "oa/portal/last")
            .then(res => {
              if (res.data.code === "800110") {
                this.institutionMore = res.data.data;
                this.institutionDialog = true;

              }
            });
        }
      },
    },
    created() {
      //缓存二级密码解锁状态
      this.unlockFlagpart = cookie.get("unlockFlagpart");
      if (!eval(this.unlockFlagpart)) {
        this.getDictionary2();
      }
      //刷新
      this.refresh = cookie.get("reFresh");
      if (!eval(this.refresh)) {
        this.$http.get(globalConfig.server + "special/special/loginInfo").then((res) => {
          localStorage.setItem('personal', JSON.stringify(res.data.data));
          globalConfig.personal = res.data.data.data;
          this.loginDay = JSON.parse(localStorage.personal).data.loginday;
          //个人连续登录时长勋章
          if (!JSON.parse(localStorage.personal).data.medal) {
            this.badgeDialog = true;
          }

        });
        cookie.set("reFresh", true);
      }
      //版本更新
      this.$http
        .get(globalConfig.server + "setting/update/read?a=1")
        .then(res => {
          if (res.data.code === "50040") {
            this.yanFirstInfo = res.data.data;
            if (res.data.data.type == 2) {
              this.yanFirstDialog = true;
            }
            else if (res.data.data.type == 1 && res.data.data.album.image_pic.length > 0) {
              this.ReadingDialog = true;
            }
          }
        });

    },
    mounted() {
      //鼠标滑动监听
      let _this = this;

      this.$http.get(globalConfig.server + "oa/portal/last").then(res => {
        if (res.data.code === "800110") {
          this.institutionMore = res.data.data;
          this.institutionDialog = true;
        }
      });
      //定时器 轮巡获取最新消息
      this.getUnreadTermly();
      this.getUnReadMessage();
      //调查问卷
      this.getQuesNaireData();
      //个人门户下的考试和调查1分钟轮询一次
      this.getExamNaireRedCircle();
      setTimeout(() => {
        this.getExamNaireRedCircle();
      }, 60 * 1000);
    },
    activated() {
      this.confirmArrival = JSON.parse(localStorage.getItem('confirmArrival'));
      //初始化个人信息
      this.personal = JSON.parse(localStorage.personal);
      //鼠标滑动监听
      let _this = this;
      $(document).mousemove(function () {
        _this.clickScreen();
      });
      $(document).keydown(function () {
        _this.clickScreen();
      });
      //根据个人信息进行操作事项
      this.initData();
      //多页面锁屏
      this.multiPageLock();
      this.watchCount();
      this.countTime();
      //获取积分明细
      this.getCredit();
      //定时器 轮巡获取最新消息
      this.getUnreadTermly();
    },
    methods: {
      downChange() {
        this.getExamNaireRedCircle();
      },
      goBefore(val) {
        this.confirmArrival = JSON.parse(localStorage.getItem('confirmArrival'));
        if (val === 'beforeExam') {
          if (this.examData.available) {
            if (this.confirmArrival && this.confirmArrival.length > 0 && this.confirmArrival.indexOf(this.examData.id) > -1) {
              this.$router.push({path: '/answerExam', query: {id: this.examData.id}});
            } else {
              this.$http.post(globalConfig.server + 'exam/check_in/' + this.examData.id).then((res) => {
                if (res.data.code === '30000') {
                  let examIds;
                  if (this.confirmArrival === null) {
                    examIds = [];
                  }else {
                    examIds = this.confirmArrival;
                  }
                  examIds.push(this.examData.id);
                  localStorage.setItem('confirmArrival', JSON.stringify(examIds));  //保存已到场的考试id
                  this.$router.push({path: '/answerExam', query: { id: this.examData.id}});
                }
              });
            }
          } else {
            if(this.examData.id) {
              this.$router.push({path: '/beforeExam', query: {address: 'exam', id: this.examData.id}});
            }else{
              this.$router.push({path: '/beforeExam', query: {address: 'exam', id: 0, type: 'first'}});
            }

          }
        } else {
          if (this.questionnaireData.available) {
            this.$router.push({path: '/answerNaire', query: {id: this.questionnaireData.id}});
          } else {
            this.$router.push({path: '/beforeNaire', query: {id: this.examData.id}});
          }
        }
      },
      answerNaire(id) {
        this.quesNaireDialog = false;
        setTimeout(() => {
          this.$router.push({path: '/answerNaire', query: {id: id}});
        }, 0);
      },
      getQuesNaireData() {
        this.$http.get(globalConfig.server + 'questionnaire/daily_check').then((res) => {
          if (res.data.code === '30000') {
            this.questionNaireData = res.data.data;
            if (res.data.data.length > 0) {
              this.quesNaireDialog = true;
            } else {
              this.questionNaireData = [];
              this.quesNaireDialog = false;
            }
          } else {
            this.questionNaireData = [];
            this.quesNaireDialog = false;
          }
        });
      },
      getExamNaireRedCircle() {
        this.$http.get(globalConfig.server + 'exam/active').then((res) => {
          if (res.data.code === '30000') {
            this.examData = res.data.data;
          } else {
            this.examData = [];
          }
        });
        this.$http.get(globalConfig.server + 'questionnaire/active').then((res) => {
          if (res.data.code === '30000') {
            this.questionnaireData = res.data.data;
          } else {
            this.questionnaireData = [];
          }
        });
      },
      initData() {
        //this.noticeTitleDialog = true;
        //this.yanSecondDialog= true;
        //版本更新
        this.loginDay = this.personal.data.loginday;
        this.loginPercent = Number(this.loginDay / 180 * 100) + "%";
        $(".percent").css("width", this.loginPercent);

        //个人连续登录时长勋章
        if (!this.personal.data.medal) {
          this.badgeDialog = true;
        }

        //判断是否存在锁屏密码]

        if (this.personal.data.setting && Array.isArray(this.personal.data.setting)) {
          if (this.personal.data.setting.length < 1 || this.personal.detail.pwd_lock == 2) {
            this.setLockPwdDialog = true;
          }
        } else {
          this.setLockPwdDialog = true;
        }

      },

      //定时器 轮巡获取最新消息
      getUnreadTermly() {
        clearInterval(this.messageInterval);
        this.messageInterval = null;
        this.messageInterval = setInterval(() => {
          if (localStorage.personal) {
            this.getUnReadMessage();
          }
        }, 100000);
      },

      //验证二级密码弹框
      openBadge(key) {
        if (!eval(this.unlockFlagpart)) {
          for (let chi in this.chinese) {
            if (this.chinese[chi] == key) {
              this.unLockName = key;
              this.unlockSecondPWDialog = true;
            }
          }
        }
      },
      //拦截器 验证锁屏
      multiPageLock() {
        this.$http.interceptors.response.use(response => {
            //配置请求回来的信息
            if (this.$route.path !== '/lock') {
              if (response.data.code == "7777") {
                clearInterval(this.interval);
                this.interval = null;
                clearInterval(this.messageInterval);
                this.messageInterval = null;

                sessionStorage.setItem("beforePath", this.$route.path);
                sessionStorage.setItem("lockStatus", 1);
                this.$router.push({path: "/lock"});
              }
            }
            return response;
          },
          function (error) {
            return Promise.reject(error);
          }
        );
      },
      //多页面同开状态下验证，统一倒计时时间
      watchCount() {
        let _this = this;
        setInterval(function () {
          if (localStorage.getItem("initCount") == 1) {
            _this.screenStatus = true;
          }
          localStorage.setItem("initCount", 0);
        }, 1000);

      },

      openModalDialog(type) {
        switch (type) {
          case "instructionDialog": //说明书
            this.instructionDialog = true;
            break;
        }
      },

      routers(url) {
        this.$router.push(url);
      },
      //显示消息详情
      showMessageDetail(val) {
        this.messageDetail = val;
        this.messageDialog = true;
        this.$http
          .put(globalConfig.server_user + "messages/" + val.id)
          .then(res => {
            if (res.data.status === "success") {
              this.getUnReadMessage();
            }
          });
      },

      showOtherDetail(val) {
        if (val == 'unread') {
          this.$router.push({
            path: "/messageCenter",
            query: {
              unread: 1
            }
          });
        }
        else {
          this.$router.push({
            path: "/messageCenter",
            query: {
              unread: 0
            }
          });
        }
      },
      //模态框回调
      closeModal() {
        this.messageDialog = false;
        this.setLockPwdDialog = false;
        this.instructionDialog = false;
        this.noticeTitleDialog = false;
        this.yanFirstDialog = false;
        this.yanSecondDialog = false;
      },
      closeinsModal() {
        this.institutionDialog = false;
      },
      closeyanModal() {
        this.yanFirstDialog = false;
      },
      closeModalSecond() {
        this.unlockSecondPWDialog = false;
        this.badgeDialog = false;
      },
      readcloseModal() {
        this.ReadingDialog = false;
      },
      //二级密码回调
      unlockFlag(val) {
        this.unlockFlagpart = val;
        var millisecondx = new Date().getTime();
        var expiresTimex = new Date(millisecondx + 60 * 1000 * 60 * 18); //设置18小时缓存
        cookie.set("unlockFlagpart", val, {expires: expiresTimex});
        if (this.unlockFlagpart) {
          this.chinese = []
        }
      },

      //获取未读消息
      getUnReadMessage() {
        this.$http
          .get(globalConfig.server_user + "messages?unread=1")
          .then(res => {
            if (res.data.status === "success") {
              this.unReadMessageData = res.data.data;
              this.messageTotal = res.data.meta.total;
            }
          });
      },

      //二级密码
      getDictionary2() {
        this.$http.get(globalConfig.server + "setting/dictionary/220").then(res => {
          if (res.data.code === "30010") {
            this.dictionary2 = res.data.data;
            for (let i = 0; i < res.data.data.length; i++) {
              for (let key in this.personal.data.secondary_password) {
                if (res.data.data[i].id == this.personal.data.secondary_password[key]
                ) {
                  this.chinese.push(res.data.data[i].dictionary_name);
                }
              }
            }
          }
        });
      },
      // 全屏
      fullScreen(val) {
        screenFull.toggle();
      },

      clickScreen() {
        this.screenStatus = true;
        localStorage.setItem("initCount", 1);
      },

      countTime() {
        let countDown = [];
        this.$http
          .get(globalConfig.server + "setting/dictionary/203")
          .then(res => {
            if (res.data.code === "30010") {
              countDown = res.data.data;
              this.$http.get(globalConfig.server + 'setting/setting/read?type=1&staff_id=' + this.personal.id).then((res) => {
                if (res.data.code === '50010') {
                  let array = res.data.data;
                  for (let i = 0; i < array.length; i++) {
                    countDown.forEach((item) => {
                      if (array[i].dict_id == item.id) {
                        this.defaultTime = this.Countdown = Number(item.dictionary_name);
//                        this.defaultTime = this.Countdown = 5;
                        localStorage.setItem('countdownTime', item.id);
                        this.startCount();
                      }
                    })
                  }
                }
              })
            }
          });
      },

      startCount() {
        clearInterval(this.interval);
        new Promise((resolve, reject) => {
          this.interval = setInterval(() => {
            this.Countdown--;
            if (this.screenStatus) {
              reject("重新计数");
              clearInterval(this.interval);
              this.interval = null;
            } else if (this.Countdown < 1) {
              resolve("锁屏");
            }
          }, 1000);
        })
          .then(data => {
            this.lockScreen();
          })
          .catch(data => {
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
            sessionStorage.setItem('beforePath', this.$route.path);
            sessionStorage.setItem('lockStatus', 1);
            this.$router.push({path: '/lock'});
          } else {
            this.$notify({
              title: '警告',
              message: res.data.msg,
              type: 'warning'
            });
            //锁屏失败
            this.Countdown = this.defaultTime;
            this.startCount();
            this.screenStatus = false;
          }
        })
      },

      //获取积分总数
      getCredit() {
        this.$http.get(globalConfig.server + 'credit/manage/self').then((res) => {
          if (res.data.code === '30310') {
            this.creditTotal = res.data.data;
          }
        })
      },

      //喜报关闭
      glad_close() {
        this.gladFlag = false;
      }
    }
  }
</script>

<style lang="scss" scoped="">
  .circle_red {
    width: 5px;
    height: 5px;
    background: red;
    display: inline-block;
    border-radius: 50%;
  }

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
      width: 30px;
      height: 25px;
      margin-right: 17px;
      background: url("../assets/images/虚拟租赁合同-24.svg");
      background-size: 100% 100%;
    }
    .noCollapse {

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
            width: 72px;
            height: 36px;
            background: url("../assets/images/虚拟租赁合同-23.svg");
            background-size: 100% 100%;
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
                position: relative;
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
                .glad_card_right {
                  position: absolute;
                  width: 77px;
                  height: 77px;
                  top: 40px;
                  right: 10px;
                  background: url("../assets/images/gladright.png") no-repeat;
                  .gladsp1 {
                    position: absolute;
                    top: 12px;
                    left: 22px;
                    color: #fb4699;
                    height: 40px;
                    line-height: 40px;
                    font-size: 20px;
                    font-weight: bold;
                    span {
                      font-size: 13px;
                      height: 20px;
                      line-height: 20px;
                      position: absolute;
                      top: 9px;
                      left: -14px;
                    }
                  }
                  .gladsp2 {
                    position: absolute;
                    bottom: 6px;
                    left: 22px;
                    color: #fff;
                    font-size: 12px;
                  }
                }
              }
            }
            .gladBottom {
              width: 100%;
              height: 83px;
              background: url("../assets/images/xibaobottom.png") no-repeat;
              background-size: 100%;
              .glad_close {
                display: block;
                height: 42px;
                width: 100%;
                line-height: 42px;
                text-align: center;
                z-index: 111;
                margin-top: 40px;
                color: #fff;
                cursor: pointer;
              }
              .glad_close:hover {
                font-size: 20px;
              }
            }
          }
          .gladBackground {
            cursor: default;
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

    width: 322px;
    box-sizing: border-box;
    .el-dropdown-menu__item {
      line-height: 20px;
      width: 80px;
      float: left;
      text-align: center;
      padding: 12px 0 6px;
      b {
        @include border_radius(6px);
        display: inline-flex;
        width: 40px;
        height: 40px;
        align-items: center;
        justify-content: center;
        color: #fff;
        line-height: 50px;
        font-size: 22px;
      }
      span {
        color: #575859;
        margin: 6px 0;
        display: block;
        font-size: 12px;
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

  .not:hover {
    background: none !important;
  }

  .not {
    border: none !important;
  }
</style>
