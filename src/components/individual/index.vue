<template>
  <div id="individual" @click="editPersonalSign($event)">
    <div class="topBack">
      <div class="topBackLeft">
        <div class="leftPic">
          <img :src="landholder.avatar" v-if="landholder.avatar !== ''">
          <img src="../../assets/images/individual/touxiang.png" v-else>
        </div>
        <div class="rightPic">
          <div class="landName">
            <span>{{landholder.name}}</span>
            <span></span>
          </div>
          <div class="personalSign">
            <span v-if="!isEdit && landholder.data">{{landholder.data.signature.content}}</span>
            <el-input size="mini" v-if="isEdit" v-model="params.content"></el-input>
            <el-button size="medium" v-if="!isEdit" @click.stop="showInput" type="text">
              <i class="el-icon-edit"></i>
            </el-button>
          </div>
        </div>
      </div>
      <div class="topBackRight">
        <div @click="routerLink('/pictureManage')">
          <span class="iconfont icon-zhaopian"></span>
          <span>照片</span>
        </div>
        <!--<div>-->
        <!--<span class="iconfont icon-shiyongshouce"></span>-->
        <!--<span>收藏夹</span>-->
        <!--</div>-->
      </div>
    </div>
    <div class="main">
      <el-row>
        <el-col :span="18">
          <div class="mainLeft">
            <div class="title">个人主页</div>
            <div class="ingress">
              <div class="a" @click="routerLink('/examineAndApprove')">
                <div class="aLeft">
                  <i class="iconfont icon-daiban"></i>
                </div>
                <div class="aRight">
                  <p>BACKLOG</p>
                  <p>代办事项<span>24</span></p>
                </div>
              </div>
              <div class="a" @click="routerLink('/dailyRecord')">
                <div class="aLeft">
                  <i class="iconfont icon-richengguanli"></i>
                </div>
                <div class="aRight">
                  <p>JOURNAL</p>
                  <p>日志管理<span>24</span></p>
                </div>
              </div>
              <div class="a">
                <div class="aLeft">
                  <i class="iconfont icon-tongxunlu"></i>
                </div>
                <div class="aRight">
                  <p>MAIL&nbsp;LIST</p>
                  <p>通讯录<span>24</span></p>
                </div>
              </div>
              <div class="a" @click="routerLink('/management')">
                <div class="aLeft">
                  <i class="iconfont icon-qita1"></i>
                </div>
                <div class="aRight">
                  <p>WATING</p>
                  <p>敬请期待<span>...</span></p>
                </div>
              </div>
            </div>
            <div class="messageTab">
              <div class="achievementTab">
                <div class="titles" @click="routerLink('/checkWork')">
                  <div>PFREORMANCE MANAGEMENT</div>
                  <div>考勤管理</div>
                </div>
                <div class="months">
                  <div class="monthTime">2018年03月考勤</div>
                  <div class="month1">
                    <div>
                      <p class="monthP">
                        <span>迟到</span>
                        <i class="iconfont icon-shijian"></i>
                      </p>
                      <p><b>19</b>
                        <span>次</span></p>
                    </div>
                    <div>
                      <p class="monthP">
                        <span>早退</span>
                        <i class="iconfont icon-chidao"></i>
                      </p>
                      <p>
                        <b>19</b>
                        <span>次</span>
                      </p>
                    </div>
                    <div>
                      <p class="monthP">
                        <span>旷工</span>
                        <i class="iconfont icon-qingzhou-gantanhao"></i>
                      </p>
                      <p>
                        <b>19</b>
                        <span>次</span>
                      </p>
                    </div>
                    <div>
                      <p class="monthP" style="margin-top: 10px;">
                        <span>出勤天数</span>
                        <i class="iconfont icon-kaoqin1" style="font-size: 24px"></i>
                      </p>
                      <p>
                        <b>19</b>
                        <span>次</span>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div class="checkTab" @click="routerLink('/integraldetail')">
                <div class="titles">
                  <div>RNTEGAL GETAIL</div>
                  <div>积分明细</div>
                </div>
                <div class="checkNum">
                  <i class="iconfont icon-jifen1"></i> 1289
                </div>
              </div>
              <div class="integralTab">
                <div class="titles">
                  <div>RNTEGAL GETAIL</div>
                  <div>晋升通道</div>
                </div>
                <div class="integralBack">

                </div>
              </div>
            </div>
            <div class="message">
              <div class="achievement">
                <div class="titles">
                  <div>PFREORMANCE MANAGEMENT</div>
                  <div>业绩管理</div>
                </div>
              </div>
              <div class="check">
                <div class="titles" @click="routerLink('/checkWork')">
                  <div>RNTEGAL GETAIL</div>
                  <div>考勤管理</div>
                </div>
                <div class="checkWork">
                  <div>
                    2018-12考勤
                  </div>
                  <div class="beLate">
                    <i class="iconfont icon-shijian"></i>
                    <span>&nbsp;&nbsp;迟到<b>&nbsp;2&nbsp;次</b></span>
                  </div>
                  <div class="leave">
                    <i class="iconfont icon-chidao"></i>
                    <span>&nbsp;&nbsp;早退<b>&nbsp;6&nbsp;次</b></span>
                  </div>
                  <div class="workman">
                    <i class="iconfont icon-qingzhou-gantanhao"></i>
                    <span>&nbsp;&nbsp;矿工<b>&nbsp;0&nbsp;次</b></span>
                  </div>
                  <div class="dates">
                    <i class="iconfont icon-kaoqin1"></i>
                    <span>&nbsp;&nbsp;考勤天数<b>&nbsp;4&nbsp;天</b></span>
                  </div>
                </div>
              </div>
              <div class="integral">
                <div class="integralTop" @click="routerLink('/integraldetail')">
                  <div class="titles">
                    <div>RNTEGAL GETAIL</div>
                    <div>明细积分</div>
                  </div>
                </div>
                <div class="integralBottom">
                  <div class="titles">
                    <div>RNTEGAL GETAIL</div>
                    <div>晋升通道</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </el-col>
        <el-col :span="6">
          <div class="mainRight">
            <div class="title">
              公司公告
            </div>
            <div class="company1">
              <div class="com"></div>
              <div class="caption">
                <span>恭喜我公司企业logo注册成功顶顶顶顶顶顶顶顶顶顶顶顶顶</span>
                <span class="times">0000-00-00</span>
              </div>
              <div class="mainTitle">
                犯得上发厉害了可适当放宽道路浇洒发货看见了十大发和看见了十大发看后决定是否房贷还款时间发的时刻就疯狂的吉萨疯狂的吉萨付好款了撒
              </div>
              <div class="buttonNew">
                <div>
                  <el-button size="mini" type="primary">新闻</el-button>
                </div>
                <div>
                  <i class="el-icon-info"></i>123
                  <i class="el-icon-info"></i>124
                </div>
              </div>

            </div>
            <div class="title">
              公司活动
            </div>
            <div class="company2">
              <div class="com"></div>
              <div class="caption">
                <span>恭喜我公司企业logo注册成功顶顶顶顶顶顶顶顶顶顶顶顶</span>
                <span class="times">0000-00-00</span>
              </div>
              <div class="mainTitle">
                犯得上发厉害了可适当放宽道路浇洒发货看见了十大发和看见了十大发看后决定是否房贷还款时间发的时刻就疯狂的吉萨疯狂的吉萨付好款了撒
              </div>
              <div class="buttonNew">
                <div>
                  <el-button size="mini" type="primary">新闻</el-button>
                </div>
                <div>
                  <i class="el-icon-info"></i>123
                  <i class="el-icon-info"></i>124
                </div>
              </div>
            </div>
          </div>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
  export default {
    name: "index",
    data() {
      return {
        landholder: {},
        isEdit:false,
        params:{
          content:'',
        },
        isChanged:false,
      }
    },
    mounted() {
      this.landholder = JSON.parse(localStorage.personal);
    },
    watch:{
      'params.content':{
        handler(val,oldVal){
          if(val!==oldVal&&oldVal){
            this.isChanged = true;
          }
        }
      }
    },
    methods: {
      routerLink(val) {
        this.$router.push({path: val})
      },
      showInput(){
        this.isEdit = true;
        this.params.content = this.landholder.data.signature.content;
        setTimeout(()=>{
          this.isChanged = false;
        })
      },
      editPersonalSign(e){
        if(e.target.nodeName !== 'INPUT'){
          this.isEdit = false;
          if(this.isChanged){
            this.$http.post(globalConfig.server+'manager/staff_record',this.params).then((res) =>{
              let personal =  JSON.parse(localStorage.personal);
              if(res.data.code === '30010'){
                personal.data.signature = res.data.data;
                localStorage.setItem('personal', JSON.stringify(personal));
                this.landholder = JSON.parse(localStorage.personal);
              }else {
                this.$notify.warning({
                  title:'警告',
                  message:res.data.msg
                })
              }
            })
          }
        }
      }
    }
  }
</script>

<style lang="scss">
  #individual {

    $colorBor: rgba(255, 255, 255, .8);

    @mixin flex {
      display: -webkit-flex;
      display: flex;
    }

    @mixin border_radius($n) {
      -webkit-border-radius: $n;
      -moz-border-radius: $n;
      border-radius: $n;
    }

    @mixin back($n) {
      background: url($n) no-repeat;
      background-size: 100% 100%;
    }
    @mixin backLiner($a,$b) {
      background: -webkit-linear-gradient(left, $a, $b);
      background: -o-linear-gradient(left, $a, $b);
      background: -moz-linear-gradientleft, ($a, $b);
      background: linear-gradient(left, $a, $b);
    }
    img {
      width: 100%;
      height: 100%;
      @include border_radius(50%);
    }

    @font-face {
      font-family: Impact;                        //字体名称
      src: url(../../assets/font/impact-2.ttf);   //字体路径
    }

    .topBack, .topBackLeft, .topBackRight {
      @include flex;
    }

    .topBack {
      width: 100%;
      height: 200px;
      @include back("../../assets/images/individual/beijing.png");
      justify-content: space-between;
      align-items: center;
      .topBackLeft {
        .leftPic {
          margin-left: 100px;
          margin-right: 20px;
          width: 120px;
          height: 120px;
          @include border_radius(50%);
        }
        .rightPic {
          @include flex;
          align-content: center;
          flex-wrap: wrap;
          .landName {
            width: 100%;
            margin: 5px 0;
            @include flex;
            align-items: center;
            font-size: 21px;
            color: $colorBor;
            span:last-of-type {
              width: 24px;
              height: 24px;
              margin-left: 10px;
              @include back("../../assets/images/individual/1.png");
            }
          }
          .personalSign{
            font-size: 16px;
            color: $colorBor;
            i{
              color: white;
              margin-left: 5px;
              &:hover{
                color: #0db6ff;
              }
            }
          }
        }
      }
      .topBackRight {
        margin-right: 220px;
        div + div {
          margin-left: 20px;
        }
        div {
          cursor: pointer;
          font-size: 18px;
          color: $colorBor;
          @include flex;
          align-items: center;
          span:first-of-type {
            font-size: 24px;
            margin-right: 16px;
            padding-top: 2px;
          }
        }
        div:nth-of-type(1) {
          span:first-of-type {
            color: #6abdfd;
          }
        }
        div:nth-of-type(2) {
          span:first-of-type {
            color: #fb4699;
          }
        }
        div:nth-of-type(3) {
          span:first-of-type {
            color: #f0c044;
          }
        }
      }
    }

    .main {
      .title {
        color: #409EFF;
        font-size: 14px;
        margin: 12px 0;
      }
      .mainLeft {
        .ingress {
          @include flex;
          justify-content: center;
          div {
            @include border_radius(5px);
            width: 25%;
            height: 130px;
          }
        }
        .ingress {
          div.a + div.a {
            margin-left: 12px;
          }
          div.a {
            @include flex;
            justify-content: space-between;
            align-items: center;
            cursor: pointer;
            div {
              height: 52px;
            }
            .aLeft {
              text-align: center;
              line-height: 52px;
              color: #ffffff;
              min-width: 52px;
              max-width: 52px;
              margin: 0 20px;
              @include border_radius(50%);
              border: 1px solid $colorBor;
              i {
                font-size: 24px;
              }
            }
            .aRight {
              width: 100%;
              p {
                margin: 0;
                height: 27px;
                line-height: 27px;
              }
              p:first-of-type {
                font-size: 20px;
                color: #436bac;
              }
              p:last-of-type {
                color: $colorBor;
                span {
                  font-weight: bold;
                  color: #ffffff;
                  padding-left: 6px;
                }
              }
            }
          }
          div.a:nth-of-type(1) {
            @include backLiner(#6F86F7, #60BDF8);
          }
          div.a:nth-of-type(2) {
            @include backLiner(#EE7A88, #EE9A89);
            .aLeft {

            }
            .aRight {
              p:first-of-type {
                color: #c25b60;
              }
            }
          }
          div.a:nth-of-type(3) {
            @include backLiner(#51B4D4, #6EE6AC);
            .aLeft {

            }
            .aRight {
              p:first-of-type {
                color: #3895ad;
              }
            }
          }
          div.a:nth-of-type(4) {
            @include backLiner(#d4d9df, #b0b3b9);
            .aLeft {

            }
            .aRight {
              p:first-of-type {
                color: #625ac2;
              }
            }
          }
        }

        .message, .messageTab {
          @include flex;
          height: 446px;
          margin-top: 12px;
          .titles {
            cursor: pointer;
            margin: 43px 41px;
            div:first-of-type {
              font-size: 16px;
              color: #4b385c;
            }
            div:last-of-type {
              color: #6abdfd;
            }
          }
          .achievementTab, .achievement {
            width: 51%;
          }
          .achievementTab, .check, .integral, .checkTab, .integralTab {
            @include border_radius(6px);
            border: 1px solid #DDDDDD;
          }
          .achievementTab {
            .months {
              padding: 22px 0 0 40px;
              .monthTime {
                color: #FC6AAD;
                border-bottom: 1px solid #DDDDDD;;
                padding: 10px;
                padding-left: 0;
              }
              .month1 {
                color: #409EFF;
                @include flex;
                flex-wrap: wrap;
                div {
                  @include border_radius(6px);
                  border: 1px solid #409EFF;
                  width: 45%;
                  margin: 2.4% 3% 0 0;
                  height: 108px;
                  box-sizing: border-box;
                  padding: 0 20px;
                  span {
                    color: #4E4F50;
                  }
                  .monthP {
                    @include flex;
                    align-items: center;
                    justify-content: space-between;
                    text-align: center;
                    i {
                      font-size: 20px;
                    }
                  }
                  p {
                    text-align: center;
                    b {
                      font-weight: normal;
                      font-size: 30px;
                      padding-right: 6px;
                    }
                  }
                }
              }
              .month1 {
                div:nth-of-type(3) {
                  color: #FC6AAD;
                  border: 1px solid #FC6AAD;
                }
              }
            }
          }
          .check, .integral, .checkTab, .integralTab {
            width: 25%;
          }
          .check, .checkTab {
            margin: 0 12px;
          }
          .checkTab {
            @include back("../../assets/images/individual/jifeng.png");
            background-size: 101% 101%;
            background-position: -1px -1px;
            cursor: pointer;
            .checkNum {
              text-align: right;
              color: #E69FBF;
              margin-right: 35px;
              font-size: 24px;
              i {
                font-size: 20px;
                border: 1px solid #E69FBF;
                border-radius: 50%;
                padding: 3px;
              }
            }
          }
          .integralTab {
            .titles {
              div:last-of-type {
                color: #E69FBF;
              }
            }
            .integralBack {
              width: 100%;
              height: 240px;
              @include back("../../assets/images/individual/jingshen.png");
              background-size: 101% 101%;
              background-position: -1px -1px;
            }
          }
        }
        .message {
          .achievement {
            @include back("../../assets/images/individual/yeji.png");
            background-size: 100% 100%;
          }
          .check {
            .checkWork {
              div:first-child {
                padding-left: 40px;
                color: #74dc91;
                height: 40px;
                line-height: 43px;
                border-bottom: 1px solid #DDDDDD;
              }
              div {
                @include flex;
                align-items: center;
                i {
                  font-size: 20px;
                }
              }
              margin-top: 81px;
              div + div {
                height: 60px;
                line-height: 60px;
                margin-left: 40px;
                border-top: 1px solid #DDDDDD;
              }
              .beLate {
                border-top: 0;
                i, b {
                  color: #F6CF78;
                }
                i {
                  font-size: 25px;
                }
              }
              .leave {
                i, b {
                  color: #788DE5;
                }
                i {
                  padding-right: 4px;
                }
              }
              .workman {
                i, b {
                  color: #E375A3;
                }
                i {
                  padding-right: 4px;
                }
              }
              .dates {
                i, b {
                  color: #788DE5;
                }
                i {
                  font-size: 25px;
                }
              }
            }
          }
          .integral {
            border: 0;
            .integralTop, .integralBottom {
              height: 215px;
              cursor: pointer;
              border: 1px solid #DDDDDD;
              @include border_radius(6px);
              @include back("../../assets/images/individual/jifeng.png");
              background-size: 101% 101%;
              background-position: -1px -1px;
            }
            .integralBottom {
              margin-top: 12px;
              @include back("../../assets/images/individual/jingshen.png");
              background-size: 101% 101%;
              background-position: -1px -1px;
            }
          }
        }
        .messageTab {

        }
      }

      .mainRight {
        margin-left: 10px;
        .company1, .company2 {
          @include border_radius(6px);
          border: 1px solid #DDDDDD;
          height: 270px;
          .caption {
            @include flex;
            justify-content: space-between;
            padding: 10px;
            span:first-child {
              width: 100%;
              overflow: hidden;
              text-overflow: ellipsis;
              white-space: nowrap;
            }
            .times {
              min-width: 88px;
              text-align: right;
            }
          }
          .mainTitle {
            margin: 10px;
            display: -webkit-box;
            -webkit-box-orient: vertical;
            overflow: hidden;
            text-overflow: ellipsis;
            -webkit-line-clamp: 2;
            line-clamp: 2;
            color: #aaaaaa;
          }
          .buttonNew {
            margin: 0 10px;
            @include flex;
            justify-content: space-between;
            align-items: center;
            i {
              margin-left: 15px;
              padding-right: 6px;
              color: #aaaaaa;
            }
          }
          .com {
            height: 130px;
            @include back("../../assets/images/individual/gonggao.png");
          }
        }
        .company2 {
          .com {
            @include back("../../assets/images/individual/huodong.png");
          }
        }
      }
    }
  }
</style>
