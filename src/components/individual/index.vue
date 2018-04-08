<template>
  <div id="individual">
    <div class="topBack">
      <div class="topBackLeft">
        <div class="leftPic">
          <img :src="landholder.avatar" v-if="landholder.avatar !== '' && landholder.avatar !== null">
          <img src="../../assets/images/individual/touxiang.png" v-else>
        </div>
        <div class="rightPic">
          <div class="landName">
            <span>{{landholder.name}}</span>
            <span></span>
          </div>
          <div class="personalSign">
            <span v-if="!isEdit && landholder.data && landholder.data.signature" style="cursor: pointer"
                  @click.stop="showInput">{{landholder.data.signature.content}}</span>
            <span v-if="!isEdit && (!landholder.data || !landholder.data.signature)" style="cursor: pointer" @click.stop="showInput">添加工作状态...</span>
            <el-input id="editInput" size="mini" v-if="isEdit" @blur="editPersonalSign($event)"
                      @keyup.enter.native="editPersonalSign($event)" v-model="params.content"></el-input>
          </div>
        </div>
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
                  <p>待办事项<span>&nbsp;0</span></p>
                </div>
              </div>
              <div class="a" @click="routerLink('/dailyRecord')">
                <div class="aLeft">
                  <i class="iconfont icon-richengguanli"></i>
                </div>
                <div class="aRight">
                  <p>JOURNAL</p>
                  <p>日志管理<span>&nbsp;0</span></p>
                </div>
              </div>
              <div class="a" @click="routerLink('/pictureManage')">
                <div class="aLeft">
                  <i class="iconfont icon-zhaopian"></i>
                </div>
                <div class="aRight">
                  <p>ALBUM</p>
                  <p>相 册<span>&nbsp;{{albumNum}}</span></p>
                </div>
              </div>
              <div class="a">
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
              <div class="achievementTab" @click="routerLink('/checkWork')">
                <div class="titles">
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
                      <p><b>0</b>
                        <span>次</span></p>
                    </div>
                    <div>
                      <p class="monthP">
                        <span>早退</span>
                        <i class="iconfont icon-chidao"></i>
                      </p>
                      <p>
                        <b>0</b>
                        <span>次</span>
                      </p>
                    </div>
                    <div>
                      <p class="monthP">
                        <span>旷工</span>
                        <i class="iconfont icon-qingzhou-gantanhao"></i>
                      </p>
                      <p>
                        <b>0</b>
                        <span>次</span>
                      </p>
                    </div>
                    <div>
                      <p class="monthP" style="margin-top: 10px;">
                        <span>出勤天数</span>
                        <i class="iconfont icon-kaoqin1" style="font-size: 24px"></i>
                      </p>
                      <p>
                        <b>0</b>
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
                  <i class="iconfont icon-jifen1"></i> {{creditTotal}}
                </div>
              </div>
              <div class="integralTab" @click="routerDetail(systemData[0] && systemData[0].id)">
                <div class="titles">
                  <div>RNTEGAL GETAIL</div>
                  <div>晋升通道</div>
                </div>
                <div class="integralBack">

                </div>
              </div>
            </div>
            <!--业务员-->
            <div class="message" v-show="false">
              <div class="achievement">
                <div class="titles">
                  <div>PFREORMANCE MANAGEMENT</div>
                  <div>业绩管理</div>
                </div>
                <el-row>
                  <el-col :span="24" style="overflow: hidden">
                    <div id="chartLine" style="width:100%;height: 320px;padding: 0 15px;box-sizing: border-box;"></div>
                  </el-col>
                </el-row>
              </div>
              <div class="check" @click="routerLink('/checkWork')">
                <div class="titles">
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
                <div class="integralBottom" @click="routerDetail(systemData[0] && systemData[0].id)">
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
              表彰公告
            </div>
            <div class="company1" @click="showAnnouncement(praiseData)">
              <div class="com"></div>
              <div class="caption">
                <span>{{praiseData.title}}</span>
                <span class="times">{{praiseData.create_time}}</span>
              </div>
              <div class="mainTitle">
                {{praiseData.content_without_table}}
              </div>
              <div class="buttonNew">
                <div>
                  <el-button size="small" type="text">详情</el-button>
                </div>
                <div>
                  <i class="iconfont icon-yanjing"></i>{{praiseData.read_count}}
                  <i class="iconfont icon-yanjingclose"></i>{{praiseData.read_uncount}}
                </div>
              </div>
            </div>
            <div class="title">
              批评公告
            </div>
            <div class="company2" @click="showAnnouncement(punishmentData)">
              <div class="com"></div>
              <div class="caption">
                <span>{{punishmentData.title}}</span>
                <span class="times">{{punishmentData.create_time}}</span>
              </div>
              <div class="mainTitle">
                {{punishmentData.content_without_table}}
              </div>
              <div class="buttonNew">
                <div>
                  <el-button size="small" type="text">详情</el-button>
                </div>
                <div>
                  <i class="iconfont icon-yanjing"></i>{{punishmentData.read_count}}
                  <i class="iconfont icon-yanjingclose"></i>{{punishmentData.read_uncount}}
                </div>
              </div>
            </div>
          </div>
        </el-col>
      </el-row>
    </div>

    <Announcement :announcementDialog="announcementDialog" :announcementId="announcementId"  @close="closeWarning" ></Announcement>
  </div>
</template>

<script>
  import ECharts from 'echarts'
  import EChartTheme from 'echarts/theme/macarons'
  import Announcement from "./components/announcement.vue"; //announcement detail page
  export default {
    name: "index",
    components:{Announcement},
    data() {
      return {
        announcementDialog:false,
        landholder: {},
        isEdit: false,
        params: {
          content: '',
        },
        isChanged: false,
        albumNum:0, //相册数量
        chartLine: null,
        praiseData:{},
        punishmentData:{},
        announcementId:'',
        creditTotal:'',     //总积分
        systemData: [],
      }
    },
    activated() {
      this.landholder = JSON.parse(localStorage.personal);
      this.getAlbumNum();
      this.drawLineChart();
      this.getPraise();
      this.getPunishment();
      //获取积分明细
      this.getCredit();
      //获取晋升通道的数据
      this.getSystemTableData();
    },
    mounted() {
      this.landholder = JSON.parse(localStorage.personal);
      this.getAlbumNum();
      this.drawLineChart();
      this.getPraise();
      this.getPunishment();
      //获取积分明细
      this.getCredit();
      this.getSystemTableData();
    },
    watch: {
      'params.content': {
        handler(val, oldVal){
          if (val !== oldVal && oldVal) {
            this.isChanged = true;
          }
        }
      }
    },
    methods: {
      routerLink(val,type) {
        this.$router.push({path: val,query:{type:type}})
      },
      // 详情
      routerDetail(id) {
        let data = {ids: id, detail: 'converge'};
        this.$router.push({path: '/Infodetails', query: data});
        this.$store.dispatch('articleDetail', data);
      },
      getSystemTableData() {
        this.$http.get(globalConfig.server + 'oa/portal/', { params: {dict_id: 552, pages: 1}}).then((res) => {
          if (res.data.code === '80000') {
            this.systemData = res.data.data.data;
          }
        })
      },
      getAlbumNum(){
        this.$http.get(globalConfig.server + "album?page="+ this.currentPage+"&limit=16").then((res) =>{
          if (res.data.code === "20110") {
            this.albumNum = res.data.num;
          }
        });
      },

      //显示个人签名的input
      showInput(){
        this.isEdit = true;
        this.params.content = this.landholder.data.signature.content;
        setTimeout(() => {
          $('#editInput').focus();
          this.isChanged = false;
        })
      },
      //编辑个人签名
      editPersonalSign(){
        this.isEdit = false;
        if (this.isChanged) {
          this.$http.post(globalConfig.server + 'manager/staff_record', this.params).then((res) => {
            let personal = JSON.parse(localStorage.personal);
            if (res.data.code === '30010') {
              personal.data.signature = res.data.data;
              localStorage.setItem('personal', JSON.stringify(personal));
              this.landholder = JSON.parse(localStorage.personal);
            } else {
              this.$notify.warning({
                title: '警告',
                message: res.data.msg
              })
            }
          })
        }
      },

      //getAnnouncement
      getPraise(){
        this.$http.get(globalConfig.server +'announcement/Praise', this.params).then((res) => {
          if(res.data.code === '80010'){
            this.praiseData = res.data.data;
          }
        })
      },
      getPunishment(){
        this.$http.get(globalConfig.server +'announcement/Punishment', this.params).then((res) => {
          if(res.data.code === '80010'){
            this.punishmentData = res.data.data;
          }
        })
      },
      //查看公告详情
      showAnnouncement(val){
        this.announcementDialog = true;
        this.announcementId = val.id;
      },
      closeWarning(){
        this.announcementDialog = false;
      },

      //获取积分总数
      getCredit(){
        this.$http.get(globalConfig.server + 'credit/manage/self').then((res) => {
          if (res.data.code === '30310') {
            this.creditTotal = res.data.data;
          }
        })
      },
      //折线图
      drawLineChart() {
        this.chartLine = ECharts.init(document.getElementById('chartLine'),'macarons');
        this.chartLine.setOption({
          title: {
            text: '个人业绩'
          },
          tooltip: {
            trigger: 'axis'
          },
//          legend: {
//            data:['最高气温','最低气温']
//          },
          grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
          },
          xAxis: {
            type: 'category',
            boundaryGap: false,
            data: ['一月', '二月', '三月','四月', '五月', '六月', '七月']
          },
          yAxis: {
            type: 'value'
          },
          series: [
            {
              name:'业绩',
              type:'line',
              data:[100000, 110000, 150000, 300000, 200000, 430000, 300000],
              markPoint: {
                data: [
                  {type: 'max', name: '最大值'},
                  {type: 'min', name: '最小值'}
                ]
              },
              markLine: {
                data: [
                  {type: 'average', name: '平均值'}
                ]
              }
            },
//            {
//              name:'最低气温',
//              type:'line',
//              data:[1, -2, 2, 5, 3, 2, 0],
//              markPoint: {
//                data: [
//                  {name: '周最低', value: -2, xAxis: 1, yAxis: -1.5}
//                ]
//              },
//              markLine: {
//                data: [
//                  {type: 'average', name: '平均值'},
//                  [{
//                    symbol: 'none',
//                    x: '90%',
//                    yAxis: 'max'
//                  }, {
//                    symbol: 'circle',
//                    label: {
//                      normal: {
//                        position: 'start',
//                        formatter: '最大值'
//                      }
//                    },
//                    type: 'max',
//                    name: '最高点'
//                  }]
//                ]
//              }
//            }
          ]
        });
      },
    }
  }
</script>

<style lang="scss" scoped="">
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

    .topBack, .topBackLeft {
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
          .personalSign {
            font-size: 16px;
            color: $colorBor;
            i {
              color: white;
              margin-left: 5px;
              &:hover {
                color: #0db6ff;
              }
            }
          }
        }
      }
    }

    .main {
      .title {
        color: #409EFF;
        opacity: .7;
        margin: 12px 0;
        &:before {
          border-radius: 2px;
          margin-right: 5px;
          background: #409EFF;
          border-left: 1px solid #409EFF;
          content: '|';
        }
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
            border: 1px solid #DDDDDD;
            border-radius: 6px;
            .achieveContent{
              width: 100%;
              /*padding: 0 10px*/
            }
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
