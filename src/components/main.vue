<template>
  <div id="main">
    <div class="container">
      <!--上方轮播-->
      <el-row>
        <div class="banner">
          <el-carousel height="300px">
            <el-carousel-item v-for="item in banners" :key="item.id">
              <div class="banner_pic">
                <img :src="item.uri" @click="routerDetail(item.id)">
              </div>
            </el-carousel-item>
          </el-carousel>
        </div>
      </el-row>
      <!--业绩排名和公告信息-->
      <el-row :gutter="10">
        <el-col :span="16">
          <div class="mainContent">
            <div class="title" style="color: #6a8dfb;">
              <span style="border-left: 4px solid #6a8dfb;"></span>业绩排名
            </div>
            <div>
              <el-row style="font-size: 0;">
                <el-col :span="person_ranking">
                  <img src="./../assets/images/paiming11.png" @click="selectRanking('person')" width="100%" height="90">
                  <div class="rank_word" :class="{'select_person_word':person_ranking == 9}">个人排名</div>
                </el-col>
                <el-col :span="achieve_ranking">
                  <img src="./../assets/images/paiming22.png" @click="selectRanking('achieve')" width="100%"
                       height="90">
                  <div class="rank_word" :class="{'select_achieve_word':achieve_ranking == 9}">业绩排名</div>
                </el-col>
                <el-col :span="region_ranking">
                  <img src="./../assets/images/paiming33.png" @click="selectRanking('region')" width="100%" height="90">
                  <div class="rank_word" :class="{'select_region_word':region_ranking == 9}">区域排名</div>
                </el-col>
                <el-col :span="group_ranking">
                  <img src="./../assets/images/paiming44.png" @click="selectRanking('group')" width="100%" height="90">
                  <div class="rank_word" :class="{'select_group_word':group_ranking == 9}">小组排名</div>
                </el-col>
              </el-row>
            </div>
            <div class="paiming">
              <div>
                <el-row class="header" :style="bg_color">
                  <el-col :span="3"><span>排名</span></el-col>
                  <el-col :span="4"><span>{{table.first}}</span></el-col>
                  <el-col :span="4"><span>{{table.second}}</span></el-col>
                  <el-col :span="4"><span>{{table.third}}</span></el-col>
                  <el-col :span="3"><span>收房套数</span></el-col>
                  <el-col :span="3"><span>租房套数</span></el-col>
                  <el-col :span="3"><span>负责人</span></el-col>
                </el-row>
              </div>
              <!--<div class="item_list scroll_bar">-->
              <!--<div v-for="item in 10">-->
              <!--<el-col :span="3" class="longLuOrder t_center" >{{item}}</el-col>-->
              <!--<el-col :span="4" class="longHuPic t_center">-->
              <!--<img src="../assets/images/head.jpg" alt="">-->
              <!--</el-col>-->
              <!--<div class="longHuName">陆宣羽</div>-->
              <!--<el-col :span="4" class="t_right" style="padding-left: 0;padding-right: 23px;min-width: 145px;">南京一区 - 百万一组</el-col>-->
              <!--<el-col :span="4" class="achievement" style="padding-right:45px;min-width: 120px;padding-left: 0;">212.222.00元</el-col>-->
              <!--<el-col :span="3" class=" t_center" style="padding-right: 15px;">42套</el-col>-->
              <!--<el-col :span="3" class=" t_center" style="padding-right: 5px;">37套</el-col>-->
              <!--<el-col :span="3" class=" t_center" style="padding:0;">汪玉睿</el-col>-->
              <!--</div>-->
              <!--</div>-->
              <div class="item_list scroll_bar" style="height: 740px;">
                <div style="position: absolute;top: 50%;left: 20%;">
                  <img src="../assets/images/noData.png" style="float: left;"/>
                  <div>
                    <img src="../assets/images/sorry.png">
                    <div style="color: #6a8dfb;position: relative;margin-top: 20px;margin-left: 10px;">抱歉，暂无数据~~</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </el-col>
        <el-col :span="8">
          <div>
            <div class="title" style="color: #7ee8a6;">
              <span style="border-left: 4px solid #7ee8a6;"></span>公告信息
            </div>
            <div v-if="noticeInfofirst && noticeInfofirst.type == 1">
              <img @click="openMore(noticeInfofirst)" src="./../assets/images/biaoyang.png"
                   style="width: 100%;height: 195px;">
            </div>
            <div v-if="noticeInfofirst && noticeInfofirst.type == 2">
              <img @click="openMore(noticeInfofirst)" src="./../assets/images/chengfa.png"
                   style="width: 100%;height: 195px;"></div>
            <div v-if="noticeInfofirst && noticeInfofirst.type == 3">
              <img @click="openMore(noticeInfofirst)" src="./../assets/images/tongzhi.png"
                   style="width: 100%;height: 195px;"></div>
            <div v-if="!(noticeInfofirst && noticeInfofirst.type)">
              <img style="height: 195px;"></div>
            <div class="rightContent">
              <p class="info_title text_over_norwap" v-if="noticeInfofirst" @click="openMore(noticeInfofirst)">
                {{noticeInfofirst.title}}</p>
              <div class="clearfix">
                <span>{{noticeInfofirst && noticeInfofirst.create_time}}</span>
                <span style="float: right;">
                    <i class="el-icon-view"></i> {{noticeInfofirst && noticeInfofirst.read_count}} &nbsp;&nbsp;&nbsp;
                    <i class="iconfont icon-yanjingclose"> {{noticeInfofirst && noticeInfofirst.read_uncount}}</i>
                  </span>
              </div>
              <div style="margin-top: 10px;" class="second_line_camp">{{noticeInfofirst &&
                noticeInfofirst.content_without_table}}
              </div>
              <div><em class="ix"></em></div>
              <div style="border-bottom: 1px solid #eee;padding-bottom: 20px;">
                <el-button @click="openMore(noticeInfofirst)" size="small"
                           style="background: #6a8dfb;color: #fff;margin-top: 20px;">更多
                </el-button>
              </div>

              <div class="clearfix list_gonggao" v-for="(item, index) in noticeInfo" v-if='index>0 && index<5'
                   :key="index">

                <div v-if="item.type == 1" style="display: inline-block;float: left;">
                  <img @click="openMore(item)" src="./../assets/images/biaoyang.png" height="95" width="180"
                       style="border-radius:5px;">
                </div>
                <div v-if="item.type == 2" style="display: inline-block;float: left;">
                  <img @click="openMore(item)" src="./../assets/images/chengfa.png" height="95" width="180"
                       style="border-radius:5px;">
                </div>
                <div v-if="item.type == 3" style="display: inline-block;float: left;">
                  <img @click="openMore(item)" src="./../assets/images/tongzhi.png" height="95" width="180"
                       style="border-radius:5px;">
                </div>
                <div style="padding-left: 200px;">
                  <p @click="openMore(item)" class="info_title text_over_norwap">{{item.title}}</p>
                  <div class="second_line_camp">{{item.content_without_table}}</div>
                  <div><em class="ix"></em></div>
                </div>
              </div>

            </div>
          </div>
        </el-col>
      </el-row>
      <!--员工广场和外部消息-->
      <el-row :gutter="10" style="margin-bottom: 10px;">
        <el-col :span="16">
          <div>
            <div class="title" style="color: #6a8dfb;;">
              <span style="border-left: 4px solid #6a8dfb;"></span>员工广场
            </div>
            <div class="yuangong">
              <div style="display: inline-block;float: left;font-size: 0;">
                <img v-if="staffSquareTop[0]" :src="staffSquareTop[0].uri" @click="routerDetail(staffSquareTop[0].id)"
                     width="500" height="390">
              </div>
              <div class="clearfix" style="padding-left: 520px;">
                <div>
                  <div class="list_gonggao" v-for="(item, key) in staffSquares" :key="item.id" v-if="key < 3"
                       @click="routerDetail(item.id)" style="padding-top:15px;height:110px;">
                    <div style="display: inline-block;float: left;">
                      <img v-if="item.uri" :src="item.uri" height="105" width="180" style="border-radius: 5px;">
                    </div>
                    <div style="padding-left: 200px;">
                      <p class="info_title text_over_norwap">{{item.title}}</p>
                      <div class="second_line_camp">{{item.content}}</div>
                      <div><em class="ix" style="background:#fb4699;"></em></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </el-col>
        <el-col :span="8">
          <div>
            <div class="title" style="color: #fb4699;">
              <span style="border-left: 4px solid #fb4699;"></span>外部消息
            </div>
            <div class="news">
              <div class="list_gonggao" v-for="(item,key) in externalNews" :key="item.id" v-if="key<3"
                   @click="routerDetail(item.id)">
                <div style="display: inline-block;float: left;">
                  <img v-if="item.uri" :src="item.uri" height="100" width="100" style="border-radius: 5px;">
                </div>
                <div style="padding-left: 130px;">
                  <p class="info_title text_over_norwap">{{item.title}}</p>
                  <div class="second_line_camp">{{item.content}}</div>
                  <div class="clearfix" style="margin-top: 10px;">
                    <span>2017-01-17</span>
                    <span style="float: right;">
                    <i class="iconfont icon-xinxi" style="margin-right: -7px;vertical-align: middle;"></i> {{item.favor_num}} &nbsp;&nbsp;
                    <i class="iconfont icon-zan" style="margin-right: -7px;"></i> {{item.favor_num}} &nbsp;&nbsp;
                    <i class="el-icon-view"> {{item.read_num}}</i>
                  </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </el-col>
      </el-row>
      <!--乐伽大学和每周战报-->
      <el-row :gutter="10" style="margin-bottom: 10px;">
        <el-col :span="16">
          <div>
            <div class="title" style="color: #6a8dfb;;">
              <span style="border-left: 4px solid #6a8dfb;"></span>乐伽大学
            </div>
            <div class="lejia">
              <el-row>
                <el-col :span="8" style="padding:0;height: 195px">
                  <div class="hover_pic" style="border-top:none;border-left:none;">
                    <img v-if="lejiaCollegeTop[0]" :src="lejiaCollegeTop[0].uri" width="100%" height="195"
                         @click="routerDetail(lejiaCollegeTop[0].id)">
                  </div>
                </el-col>
                <el-col :span="8" style="padding:0;height: 195px">
                  <div class="list_frame" v-if="lejiaCollege[0]" @click="routerDetail(lejiaCollege[0].id)">
                    <div style="display: inline-block;float: left;margin-top: 30px;">
                      <img v-if="lejiaCollege[0]" :src="lejiaCollege[0].uri" width="100" height="100"
                           style="border-radius: 10px;"></div>
                    <div style="padding: 12px 12px 34px 120px;">
                      <p class="info_title text_over_norwap">{{lejiaCollege[0] && lejiaCollege[0].title}}</p>
                      <div class="second_line_camp">{{lejiaCollege[0] && lejiaCollege[0].content}}</div>
                      <div style="display: block;margin-top: 15px;width: 60%;min-width: 100px;" class="clearfix">
                        <i class="el-icon-view" style="float: left;">
                          <span class="view_word" v-if="lejiaCollege[0]"> {{lejiaCollege[0].read_num}}人</span>
                          <span class="view_word" v-if="!lejiaCollege[0]"> 0人</span>
                        </i>
                        <i class="el-icon-edit" style="float: right;">
                          <span class="edit_word" v-if="lejiaCollege[0]"> {{lejiaCollege[0].favor_num}}人</span>
                          <span class="edit_word" v-if="!lejiaCollege[0]"> 0人</span>
                        </i>
                      </div>
                    </div>
                  </div>
                </el-col>
                <el-col :span="8" style="padding:0;height: 195px">
                  <div class="hover_pic" style="border-top:none;border-right:none;">
                    <img v-if="lejiaCollegeTop[1]" :src="lejiaCollegeTop[1].uri" width="100%" height="195"
                         @click="routerDetail(lejiaCollegeTop[1].id)">
                  </div>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="8" style="padding:0;height: 195px">
                  <div class="list_frame" v-if="lejiaCollege[1]" @click="routerDetail(lejiaCollege[1].id)">
                    <div style="display: inline-block;float: left;margin-top: 30px;">
                      <img v-if="lejiaCollege[1]" :src="lejiaCollege[1].uri" height="100" width="100"
                           style="border-radius: 10px;">

                    </div>
                    <div style="padding: 12px 12px 34px 120px;">
                      <p class="info_title text_over_norwap">{{lejiaCollege[1] && lejiaCollege[1].title}}</p>
                      <div class="second_line_camp">{{lejiaCollege[1] && lejiaCollege[1].content}}</div>
                      <div style="display: block;margin-top: 15px;width: 60%;min-width: 100px;" class="clearfix">
                        <i class="el-icon-view" style="float: left;">
                          <span class="view_word" v-if="lejiaCollege[1]"> {{lejiaCollege[0].read_num}}人</span>
                          <span class="view_word" v-if="!lejiaCollege[1]"> 0人</span>
                        </i>
                        <i class="el-icon-edit" style="float: right;">
                          <span class="edit_word" v-if="lejiaCollege[1]"> {{lejiaCollege[0].favor_num}}人</span>
                          <span class="edit_word" v-if="!lejiaCollege[1]"> 0人</span>
                        </i>
                      </div>
                    </div>
                  </div>
                </el-col>
                <el-col :span="8" style="padding:0;height: 195px">
                  <div class="hover_pic" style="border-bottom: none;">
                    <img v-if="lejiaCollegeTop[2]" :src="lejiaCollegeTop[2].uri" width="100%" height="195"
                         @click="routerDetail( lejiaCollegeTop[2].id)">
                  </div>
                </el-col>
                <el-col :span="8" style="padding:0;height: 195px">
                  <div class="list_frame" v-if="lejiaCollege[2]" @click="routerDetail(lejiaCollege[2].id)">
                    <div style="display: inline-block;float: left;margin-top: 30px;"><img
                      :src="lejiaCollege[2] && lejiaCollege[2].uri" height="100" width="100"
                      style="border-radius: 10px;"></div>
                    <div style="padding: 12px 12px 0px 120px;">
                      <p class="info_title text_over_norwap">{{lejiaCollege[2] && lejiaCollege[2].title}}</p>
                      <div class="second_line_camp">{{lejiaCollege[2] && lejiaCollege[2].content}}</div>
                      <span style="display: block;margin-top: 15px;width: 60%;min-width: 100px;" class="clearfix">
                      <i class="el-icon-view" style="float: left;">
                        <span class="view_word" v-if="lejiaCollege[2]"> {{lejiaCollege[2].read_num}}人</span>
                        <span class="view_word" v-if="!lejiaCollege[2]"> 0人</span>
                      </i>
                      <i class="el-icon-edit" style="float: right;">
                        <span class="edit_word" v-if="lejiaCollege[2]"> {{lejiaCollege[2].favor_num}}人</span>
                        <span class="edit_word" v-if="!lejiaCollege[2]"> 0人</span>
                      </i>
                    </span>
                    </div>
                  </div>
                </el-col>
              </el-row>
            </div>
          </div>
        </el-col>
        <el-col :span="8">
          <div>
            <div class="title" style="color: #7ee8a6;">
              <span style="border-left: 4px solid #7ee8a6;"></span>每周战报
            </div>
            <div class="zhanbao" style="height: 394px;">
              <div>
                <img v-if="weeklyReportTop[0]" :src="weeklyReportTop[0].uri" style="width: 100%;height: 195px;"
                     @click="routerDetail(weeklyReportTop[0].id)">
              </div>
              <div style="padding:16px 20px 0px;">
                <p class="info_title text_over_norwap">{{weeklyReport[0] && weeklyReport[0].title}}</p>
                <div class="clearfix" @click="routerDetail(weeklyReport[0] && weeklyReport[0].id)">
                  <div style="display: inline-block;float: left;"><img :src="weeklyReport[0] && weeklyReport[0].uri"
                                                                       height="100" width="180"
                                                                       style="border-radius:5px;"></div>
                  <div class="list_gonggao" style="padding-left: 200px;">
                    <p class="info_title text_over_norwap">{{weeklyReport[0] && weeklyReport[0].title}}</p>
                    <div class="second_line_camp">{{weeklyReport[0] && weeklyReport[0].content}}</div>
                    <div><em class="ix"></em></div>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </el-col>

      </el-row>
    </div>
    <Warning :warningDialog="warningDialog" :lookat="look" @close="closeWarning"></Warning>
  </div>
</template>

<script>

  import Warning from "./OAWork/management/notice/components/Warning.vue"; //预览页面
  export default {
    name: 'app',
    components: {Warning},
    data() {
      return {
        urls: globalConfig.server_user,
        person_ranking: 5,
        achieve_ranking: 9,
        region_ranking: 5,
        group_ranking: 5,
        bg_color: '',
        banners: [],
        noticeInfo: [],
        noticeInfofirst: {},
        look: {},
        staffSquares: [],
        staffSquareTop: [],
        externalNews: [],
        lejiaCollege: [],
        lejiaCollegeTop: [],
        weeklyReport: [],
        weeklyReportTop: [],
        table: {},
        personTable: {
          first: '姓名',
          second: '部门',
          third: '当前业绩',
        },
        achieveTable: {
          first: '城市',
          second: '当前业绩',
          third: '占公司总业绩百分比',
        },
        regionTable: {
          first: '区域',
          second: '当前业绩',
          third: '占公司总业绩百分比',
        },
        groupTable: {
          first: '小区',
          second: '当前业绩',
          third: '占公司总业绩百分比',
        },
        warningDialog: false,
      }
    },
    methods: {
      // 详情
      routerDetail(id) {
        let data = {ids: id, detail: 'converge'};
        this.$router.push({path: '/Infodetails', query: data});
        this.$store.dispatch('articleDetail', data);
      },
      handleDayChanged(data) {
        console.log(data)
      },
      handleMonthChanged(data) {
        console.log(data)
      },
      closeWarning() {
        this.warningDialog = false;
      },
      //切换新闻中心标题
      selectNewsType(e) {
        for (let i = 0; i < e.target.parentNode.children.length; i++) {
          e.target.parentNode.children[i].style.color = '#666';
        }
        e.target.style.color = '#6a8dfb';
      },
      selectRanking(val) {
        switch (val) {
          case "person":
            this.person_ranking = 9;
            this.achieve_ranking = this.region_ranking = this.group_ranking = 5;
            this.bg_color = 'background: #b4c6fd';
            this.table = this.personTable;
            break;
          case "achieve":
            this.achieve_ranking = 9;
            this.person_ranking = this.region_ranking = this.group_ranking = 5;
            this.bg_color = 'background: #8ae3ab';
            this.table = this.achieveTable;
            break;
          case "region":
            this.region_ranking = 9;
            this.achieve_ranking = this.person_ranking = this.group_ranking = 5;
            this.bg_color = 'background: #fee4a0';
            this.table = this.regionTable;
            break;
          case "group":
            this.group_ranking = 9;
            this.achieve_ranking = this.region_ranking = this.person_ranking = 5;
            this.bg_color = 'background: #fda2cc';
            this.table = this.groupTable;
            break;
        }
      },
      //获取banner
      getBanners() {
        this.$http.get(globalConfig.server + "oa/portal/?dict_id=378&pages=1").then((res) => {
          let bannerData = res && res.data && res.data.data && res.data.data.data;
          this.banners = [];
          if (typeof bannerData === "undefined") {
            return;
          }
          for (let i = 0; i < bannerData.length; i++) {
            let cover_pic = bannerData[i] && bannerData[i].album && bannerData[i].album.cover_pic;
            let first = true;
            for (let key in cover_pic) {
              if (bannerData[i].statuss == "已发布") {
                if (first) {
                  let pic = {};
                  pic.id = bannerData[i].id;
                  pic.uri = cover_pic && cover_pic[key] && cover_pic[key][0].uri;
                  this.banners.push(pic);
                }
                first = false;
              }
            }
          }
          //存本地缓存
          localStorage.setItem('mainBanners', JSON.stringify(this.banners));
        });
      },
      getStaffSquare() {
        this.$http.get(globalConfig.server + "oa/portal/?dict_id=137&pages=1").then((res) => {
          let staffData = res && res.data && res.data.data && res.data.data.data;
          this.staffSquares = [];
          this.staffSquareTop = [];
          if (typeof staffData === "undefined") {
            return;
          }
          for (let i = 0; i < staffData.length; i++) {
            let cover_pic = staffData[i] && staffData[i].album && staffData[i].album.cover_pic;
            let first = true;
            for (let key in cover_pic) {
              if (staffData[i].statuss == "已发布") {
                if (first) {
                  let pic = {};
                  let top = {};

                  pic.id = staffData[i].id;
                  pic.uri = cover_pic && cover_pic[key] && cover_pic[key][0].uri;
                  pic.title = staffData[i].title;
                  pic.content = staffData[i].content;
                  this.staffSquares.push(pic);
                  if (staffData[i].top !== null) {
                    top.id = staffData[i].id;
                    top.title = staffData[i].title;
                    top.uri = cover_pic && cover_pic[key] && cover_pic[key][0].uri;
                    this.staffSquareTop.push(top);
                  }
                }
                first = false;
              }
            }
          }
          localStorage.setItem('mainStaffSquares', JSON.stringify(this.staffSquares));
          localStorage.setItem('mainStaffSquareTop', JSON.stringify(this.staffSquareTop));
        });
      },
      getNews() {
        this.$http.get(globalConfig.server + "oa/portal/?dict_id=379&pages=1").then((res) => {
          let newsData = res && res.data && res.data.data && res.data.data.data;
          this.externalNews = [];
          if (typeof newsData === "undefined") {
            return;
          }
          for (let i = 0; i < newsData.length; i++) {
            let cover_pic = newsData[i] && newsData[i].album && newsData[i].album.cover_pic;
            let first = true;
            for (let key in cover_pic) {
              if (newsData[i].statuss == "已发布") {
                if (first) {
                  let pic = {};
                  pic.id = newsData[i].id;
                  pic.title = newsData[i].title;
                  pic.content = newsData[i].content;
                  pic.favor_num = newsData[i].favor_num;
                  pic.read_num = newsData[i].read_num;
                  pic.uri = cover_pic && cover_pic[key] && cover_pic[key][0].uri;
                  this.externalNews.push(pic);
                }
                first = false;
              }
            }
          }
          localStorage.setItem('mainExternalNews', JSON.stringify(this.externalNews));
        });
      },
      getLejiaCollege() {
        this.$http.get(globalConfig.server + "oa/portal/?dict_id=362&pages=1").then((res) => {
          let lejiaData = res && res.data && res.data.data && res.data.data.data;
          this.lejiaCollege = [];
          this.lejiaCollegeTop = [];
          if (typeof lejiaData === "undefined") {
            return;
          }
          for (let i = 0; i < lejiaData.length; i++) {
            let cover_pic = lejiaData[i] && lejiaData[i].album && lejiaData[i].album.cover_pic;
            let first = true;
            for (let key in cover_pic) {
              if (lejiaData[i].statuss == "已发布") {
                if (first) {
                  let pic = {};
                  let top = {};
                  let fine = {};
                  pic.id = lejiaData[i].id;
                  pic.uri = cover_pic && cover_pic[key] && cover_pic[key][0].uri;
                  pic.title = lejiaData[i].title;
                  pic.content = lejiaData[i].content;
                  pic.read_num = lejiaData[i].read_num;
                  pic.favor_num = lejiaData[i].favor_num;
                  this.lejiaCollege.push(pic);
                  if (lejiaData[i].top !== null) {
                    top.id = lejiaData[i].id;
                    top.title = lejiaData[i].title;
                    top.uri = cover_pic && cover_pic[key] && cover_pic[key][0].uri;
                    this.lejiaCollegeTop.push(top);
                  }
                }
                first = false;
              }
            }
          }
          localStorage.setItem('mainLejiaCollege', JSON.stringify(this.lejiaCollege));
          localStorage.setItem('mainLejiaCollegeTop', JSON.stringify(this.lejiaCollegeTop));

        });
      },
      getPerWeeklyReport() {
        this.$http.get(globalConfig.server + "oa/portal/?dict_id=383&pages=1").then((res) => {
          let reportData = res && res.data && res.data.data && res.data.data.data;
          this.weeklyReport = [];
          this.weeklyReportTop = [];
          if (typeof reportData === "undefined") {
            return;
          }
          for (let i = 0; i < reportData.length; i++) {
            let cover_pic = reportData[i] && reportData[i].album && reportData[i].album.cover_pic;
            let first = true;
            for (let key in cover_pic) {
              if (reportData[i].statuss == "已发布") {
                if (first) {
                  let pic = {};
                  let top = {};
                  pic.id = reportData[i].id;
                  pic.uri = cover_pic && cover_pic[key] && cover_pic[key][0].uri;
                  pic.title = reportData[i].title;
                  pic.content = reportData[i].content;
                  pic.read_num = reportData[i].read_num;
                  pic.favor_num = reportData[i].favor_num;
                  this.weeklyReport.push(pic);
                  if (reportData[i].top !== null) {
                    top.id = reportData[i].id;
                    top.title = reportData[i].title;
                    top.uri = cover_pic && cover_pic[key] && cover_pic[key][0].uri;
                    this.weeklyReportTop.push(top);
                  }
                }
                first = false;
              }
            }
          }
          localStorage.setItem('mainWeeklyReport', JSON.stringify(this.weeklyReport));
          localStorage.setItem('mainWeeklyReportTop', JSON.stringify(this.weeklyReportTop));
        });
      },
      getnotice() {
        this.$http.get(globalConfig.server + "announcement?stage=1&not_draft=1&all=1").then((res) => {
          this.noticeInfo = res.data.data;
          this.noticeInfofirst = res.data.data[0];
        });
      },
      openMore(noticeInfofirst) {
        this.look = noticeInfofirst;
        this.warningDialog = true;
      },
    },
    mounted() {
      this.getnotice();
      this.getBanners();
      this.getStaffSquare();
      this.getNews();
      this.getLejiaCollege();
      this.getPerWeeklyReport();
      this.table = this.achieveTable;
    },
    activated() {
      this.getnotice();
      this.getBanners();
      this.getStaffSquare();
      this.getNews();
      this.getLejiaCollege();
      this.getPerWeeklyReport();
      this.table = this.achieveTable;
    },
    created() {
      this.table = this.achieveTable;
      //取出本地缓存数据
      if (localStorage.getItem('mainBanners')) {
        this.banners = JSON.parse(localStorage.getItem('mainBanners'));
      }
      if (localStorage.getItem('mainStaffSquares')) {
        this.staffSquares = JSON.parse(localStorage.getItem('mainStaffSquares'));
      }
      if (localStorage.getItem('mainStaffSquareTop')) {
        this.staffSquareTop = JSON.parse(localStorage.getItem('mainStaffSquareTop'));
      }
      if (localStorage.getItem('mainExternalNews')) {
        this.externalNews = JSON.parse(localStorage.getItem('mainExternalNews'));
      }
      if (localStorage.getItem('mainLejiaCollege')) {
        this.lejiaCollege = JSON.parse(localStorage.getItem('mainLejiaCollege'));
      }
      if (localStorage.getItem('mainLejiaCollegeTop')) {
        this.lejiaCollegeTop = JSON.parse(localStorage.getItem('mainLejiaCollegeTop'));
      }
      if (localStorage.getItem('mainWeeklyReport')) {
        this.weeklyReport = JSON.parse(localStorage.getItem('mainWeeklyReport'));
      }
      if (localStorage.getItem('mainWeeklyReportTop')) {
        this.weeklyReportTop = JSON.parse(localStorage.getItem('mainWeeklyReportTop'));
      }

    },
  }
</script>

<style scoped lang="scss">
  .scroll_bar {
    background-image: url('../assets/images/404_images/bg_square.png');
  }

  .clearfix:before,
  .clearfix:after {
    display: table;
    content: "";
  }

  .clearfix:after {
    clear: both
  }

  [class*=el-col-] {
    transition: 0.3s;
  }

  i::before {
    width: 10px;
  }

  .text_over_norwap {
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }

  img {
    cursor: pointer;
  }

  .news .list_gonggao {
    height: 110px;
  }

  .second_line_camp {
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    font-size: 14px;
    line-height: 20px;
    -webkit-box-orient: vertical;
    box-orient: vertical;
    word-break: break-all;
    height: 38px;
  }

  .t_center {
    text-align: center;
  }

  .t_right {
    text-align: right;
  }

  .rank_word {
    position: relative;
    font-size: 14px;
    width: 30px;
    min-width: 30px;
    padding: 7px;
    color: #464748;
    margin: -70px 0 18px 15px;
  }

  .select_person_word {
    color: #fff;
    background: linear-gradient(-45deg, transparent 10px, #6a8dfb 0);
  }

  .select_achieve_word {
    color: #fff;
    background: linear-gradient(-45deg, transparent 10px, #58d788 0);
  }

  .select_region_word {
    color: #fff;
    background: linear-gradient(-45deg, transparent 10px, #fdca41 0);
  }

  .select_group_word {
    color: #fff;
    background: linear-gradient(-45deg, transparent 10px, #fb4699 0);
  }

  .yuangong {
    border: 1px solid #dfe6fb;
    border-radius: 5px;
    height: 390px;
  }

  .news {
    border: 1px solid #dfe6fb;
    padding: 0px 20px;
    border-radius: 5px;
    height: 390px;
  }

  .lejia {
    border-radius: 5px;
    border: 1px solid #dfe6fb;
    font-size: 0;
  }

  .zhanbao {
    border-radius: 5px;
    border: 1px solid #dfe6fb;
  }

  .rightContent {
    padding: 0 10px;
    margin-top: -5px;
    border-radius: 5px;
    border: 1px solid #dfe6fb;
    height: 675px;
    // box-shadow: 0 2px 4px 0 rgba(64, 158, 255, .12), 0 0 6px 0 rgba(64, 158, 255, .04);
  }

  .clearfix:after {
    margin: 8px 0 3px;
    content: "";
    display: block;
    clear: both;
  }

  .info_title {
    font-size: 16px;
    font-weight: bold;
    cursor: pointer;
  }

  .ix {
    display: inline-block;
    height: 3px;
    width: 20px;
    background: #58d788;
    margin-top: 15px;
  }

  .el-icon-view {
    font-size: 14px;
  }

  #main {
    width: 100%;
    min-width: 900px;
    /*overflow: hidden;*/

    @font-face {
      font-family: Impact;//////字体名称
      src: url(../assets/font/impact-2.ttf);  ////字体路径
    }
    .scroll_bar {
      &::-webkit-scrollbar-button {
        height: 20px;
        background-color: #ffffff;
      }
    }

    .container {
      .hover_pic {
        overflow: hidden;
        border: 1px solid #dfe6fb;
        border-radius: 5px;
        height: 195px;
        img {
          transition: all .5s;
          &:hover {
            transform: scale(1.1);
          }
        }
      }
      .list_gonggao {

        &:hover {
          .info_title {
            color: #6a8dfb;
          }
        }
      }
      .list_frame {
        padding: 16px;
        border: none;
        border-radius: 5px;
        height: 180px;
        padding-bottom: 0;
        font-size: 14px;
        &:hover {
          .info_title {
            color: #6a8dfb;
          }
          .view_word {
            color: #fb4699;
          }
          .edit_word {
            color: #58d788;
          }
        }
      }

      .banner {
        margin-bottom: 30px;
        .banner_pic {
          border-radius: 5px;
          width: 100%;
          height: 100%;
          overflow: hidden;
          cursor: pointer;

          img {
            width: 100%;
            height: 100%;
          }
        }
      }
      .title {
        display: flex;
        align-items: center;
        font-size: 16px;
        margin-bottom: 10px;
        span {
          display: inline-block;
          height: 16px;
          border-radius: 2px;
          margin-right: 10px
        }
      }
      .mainContent {
        width: 100%;
        .paiming {
          margin-bottom: 10px;
          border: 1px solid #dfe6fb;
          border-top: none;
          border-radius: 5px;
          box-sizing: border-box;
          // box-shadow: 0 2px 4px 0 rgba(64, 158, 255, .12), 0 0 6px 0 rgba(64, 158, 255, .04);
          .header {
            background: #7ee8a6;
            color: #fff;
            text-align: center;
            padding: 10px;
          }
          .item_list {
            padding: 0 10px;
            height: 100%;
            > div {
              font-family: 'Impact', sans-serif;
              height: 73px;
              border-bottom: 1px solid #e4e4e4;
              display: flex;
              align-items: center;
              &:last-child {
                border-bottom: none;
              }
              .longLuOrder {
                color: #6a8dfb;
                margin-right: 20px;
              }
              .achievement {
                flex-grow: 1;
                text-align: right;
                margin-right: 10px;
                color: #6a8dfb
              }
              .longHuPic {
                width: 48px;
                height: 62px;
                text-align: center;
                display: flex;
                align-items: center;
                justify-content: center;
                > img {
                  width: 40px;
                  height: 40px;
                  border-radius: 50%;
                  transition: all .5s;
                  &:hover {
                    transform: scale(1.1);
                  }
                }

              }
              .longHuName {
                font-weight: bold;
                color: #747576;
                margin: 0 35px 0 10px;
                min-width: 65px;
              }
              &:nth-child(1) {
                .longLuOrder, .achievement {
                  color: #ffc95f;
                }
                .longHuPic {
                  background: url("../assets/images/longhu_1.png") no-repeat;
                  background-size: 100%;
                  position: relative;
                  > img {
                    position: absolute;
                    top: 15px;
                    left: 4px;
                  }
                }
              }
              &:nth-child(2) {
                .longLuOrder, .achievement {
                  color: #fb4699;
                }
                .longHuPic {
                  background: url("../assets/images/longhu_2.png") no-repeat;
                  background-size: 100%;
                  position: relative;
                  > img {
                    position: absolute;
                    top: 15px;
                    left: 4px;
                  }
                }
              }
              &:nth-child(3) {
                .longLuOrder, .achievement {
                  color: #58d788;
                }
                .longHuPic {
                  background: url("../assets/images/longhu_3.png") no-repeat;
                  background-size: 100%;
                  position: relative;
                  > img {
                    position: absolute;
                    top: 15px;
                    left: 4px;
                  }
                }
              }
            }
          }

        }
      }
      .leJiaHistory {
        width: 100%;
        height: 145px;
        margin-bottom: 10px;
        cursor: pointer;
        img {
          width: 100%;
          height: 100%;
        }
      }
      .system {
        width: 100%;
        height: 145px;
        display: flex;
        cursor: pointer;
        margin-bottom: 30px;
        .talent {
          margin-right: 10px;
          flex-grow: 1
        }
        .manage {
          flex-grow: 1
        }
        img {
          width: 100%;
          height: 100%;
        }
      }

      .newEntrants, .newsCenter {
        width: 100%;
        height: 190px;
        overflow: auto;
        box-sizing: border-box;
        border-radius: 5px;
        padding: 0 10px;
        border: 1px solid #dfe6fb;
        box-shadow: 0 2px 4px 0 rgba(64, 158, 255, .12), 0 0 6px 0 rgba(64, 158, 255, .04);
      }

      .newEntrants {
        > div {
          display: -webkit-box;
          min-height: 100px;
          border-bottom: 1px solid #e4e4e4;
          padding: 20px 10px 10px 10px;
          box-sizing: border-box;
          .newHeader {
            width: 50px;
            height: 50px;
            box-sizing: border-box;
            border-radius: 10px;
            overflow: hidden;
            img {
              width: 50px;
              height: 50px;
              border-radius: 10px;
              transition: all .5s;
              &:hover {
                transform: scale(1.1);
              }
            }
          }
          .newEntrants_content {
            flex-grow: 1;
            padding: 0 0 0 30px;
          }
          .newEntrants_info {
            display: flex;
            align-items: center;
            margin-bottom: 5px;
          }
          .newEntrants_intro {
            font-size: 12px;
          }
        }
      }

      .newsCenter {
        .newTitle {
          color: #666;
          padding: 20px 10px 10px 20px;
          a {
            margin-right: 10px;
            &:hover {
              color: #6a8dfb;
            }
          }
        }
        .newsContent {
          padding: 5px 10px 0 20px;
          display: flex;
          div {
            img {
              width: 160px;
              height: 110px;
              border-radius: 5px;
            }
          }
          .news_words {
            flex-grow: 1;
            margin-left: 10px;
            font-size: 12px;
          }
        }
      }
    }

  }
</style>
