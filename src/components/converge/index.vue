<template>
  <div id="converge">
    <div class="convergeTop">
      <el-row>
        <el-col :span="16">
          <div class="topLeft module">
            <span v-for="(key,index) in hostData.data" v-if="index === 0 && hostData.data[0] !== ''">
              <span v-for="pic in key && key.album && key.album.cover_pic">
                <img v-for="p in pic" :src="p.uri">
              </span>
            </span>
            <div class="titleShow" @click="routerDetail(key.id)" v-for="(key,index) in hostData.data"
                 v-if="index === 0 && hostData.data[0] !== ''">
              <span>{{key.title}}</span>
            </div>
          </div>
        </el-col>
        <el-col :span="8">
          <div class="topRight">
            <div class="a">
              <h1 class="rightA module">
                <span v-for="(key,index) in lessData.data" v-if="index === 0 && lessData.data[0] !== ''">
                  <span v-for="pic in key && key.album && key.album.cover_pic">
                    <img v-for="p in pic" :src="p.uri">
                  </span>
                </span>
                <div class="titleShow" @click="routerDetail(key.id)" v-for="(key,index) in lessData.data"
                     v-if="index === 0 && lessData.data[0] !== ''">
                  <span>{{key.title}}</span>
                </div>
              </h1>
              <h2>
                <img src="../../assets/images/yuangong1.png" alt="">
              </h2>
            </div>
            <div>
              <h2 class="rightA">
                <img src="../../assets/images/yuangong2.png" alt="">
              </h2>
              <h1 class="rightA module">
                <span v-for="(key,index) in lowData.data" v-if="index === 0 && lowData.data[0] !== ''">
                   <span v-for="pic in key && key.album && key.album.cover_pic">
                    <img v-for="p in pic" :src="p.uri">
                  </span>
                </span>
                <div @click="routerDetail(key.id)" class="titleShow" v-for="(key,index) in lowData.data"
                     v-if="index === 0 && lowData.data[0] !== ''">
                  <span>{{key.title}}</span>
                </div>
              </h1>
            </div>
          </div>
        </el-col>
      </el-row>
    </div>
    <div class="convergeMain">
      <!--部门公告-->
      <el-row style="display: -webkit-flex;display: flex;">
        <el-col :span="24" class="lejiaNews">
          <div class="title color1 a1">
            公告
          </div>
          <el-row class="elPadding" style="padding: 0;height: initial;">
            <div style="background: #e8eefe;padding: 10px 20px;color: #a2a5ac;">
              <span>全部公告</span>
              <span style="float: right;cursor: pointer;" @click="announcementListDialog=true"
                    v-if="totalNum>8">查看全部>></span>
            </div>
            <div v-loading="loading"
                 element-loading-text="拼命加载中"
                 element-loading-spinner="el-icon-loading"
                 element-loading-background="rgba(255, 255, 255, 0.3)">
              <el-row>
                <el-col :span="12" v-for="(value,key) in announcementList" :key="value.id"
                        :class="{'borderBottom': (announcementList.length%2==0 && key!=announcementList.length-1 && key!=announcementList.length-2)||(announcementList.length%2!=0 && key!=announcementList.length-1),
                        'marginlr':key%2!=0}"
                        class="clearfix" style="padding: 5px 0;border-right: 1px solid #e5e5e5;margin-left: 15px;margin-right: -15px;">
                  <el-row>
                    <el-col :span="1.6">
                      <span v-if="value.type==1" class="type_btn btn_honor">表彰</span>
                      <span v-else-if="value.type==2" class="type_btn btn_criticize">批评</span>
                      <span v-else class="type_btn btn_notice">通知</span>
                    </el-col>
                    <el-col :span="12">
                      <span class="notice_title" @click="lookDetail(value.id)">{{value.title}}</span>
                    </el-col>
                    <el-col :span="5">
                      <span class="notice_depart" v-if="value.department_name">— —{{value.department_name}}</span>
                    </el-col>
                    <el-col :span="5" class="notice_time">
                      <span >{{value.create_time}}</span>
                    </el-col>
                  </el-row>
                </el-col>
              </el-row>
            </div>
            <div v-if="announcementList.length<1 && !loading">
              <img src="../../assets/images/sorry_no_data.png">
            </div>
          </el-row>
        </el-col>
      </el-row>
      <!--乐伽新闻-->
      <el-row style="display: -webkit-flex;display: flex;">
        <el-col :span="16" class="lejiaNews">
          <div class="title color1 a1">
            乐伽新闻
          </div>
          <el-row class="elPadding">
            <el-col :span="12">
              <div class="mainLeft" v-for="(key,index) in newsData.data" v-if="index === 0 && newsData.data[0] !== ''">
                <div class="headline" @click="routerDetail(key.id)">{{key.title}}</div>
                <div class="titleTime">
                  <span>{{key.create_time}}</span>
                  <span>
                    <i class="iconfont icon-pinglun"></i>{{key.comments_count}}
                    <i class="iconfont icon-zan"></i>{{key.favor_num}}
                    <i class="el-icon-view"></i>{{key.read_num}}
                  </span>
                </div>
                <div class="titleImg">
                  <span @click="routerDetail(key.id)" v-for="pic in key && key.album && key.album.cover_pic">
                    <img v-for="p in pic" :src="p.uri">
                  </span>
                </div>
                <div class="titleMain text" v-html="key.content">
                </div>
                <h6 class="a1"></h6>
                <div class="onBtn">
                  <el-button type="primary" size="mini" @click="routerDetail(key.id)">更多</el-button>
                </div>
              </div>
            </el-col>
            <el-col :span="12">
              <div class="mainRight">
                <div class="a" @click="routerDetail(key.id)" v-for="(key,index) in newsData.data"
                     v-if="index !== 0 && newsData.data[0] !== ''">
                  <div>
                     <span v-for="pic in key && key.album && key.album.cover_pic">
                        <img v-for="p in pic" :src="p.uri">
                     </span>
                  </div>
                  <div>
                    <p class="headline">{{key.title}}</p>
                    <span class="titleMain" v-html="key.content"></span>
                    <h6 class="a1"></h6>
                  </div>
                </div>
              </div>
            </el-col>
          </el-row>
        </el-col>

        <!--员工风采-->
        <el-col :span="8" class="appearance">
          <div class="title color3 a3">
            员工风采
          </div>
          <div class="elPadding">
            <div v-for="(key,index) in staffData.data" v-if="index === 0 && staffData.data[0] !== ''">
              <div class="titleImg box">
                 <span @click="routerDetail(key.id)" v-for="pic in key && key.album && key.album.cover_pic">
                    <img v-if="p.uri" v-for="p in pic" :src="p.uri">
                    <img src="../../assets/images/default.png" v-else>
                 </span>
              </div>
              <div class="headline box" @click="routerDetail(key.id)">{{key.title}}</div>
              <div class="titleTime box">
                <span>{{key.create_time}}</span>
                <span>
                    <i class="iconfont icon-pinglun"></i>{{key.comments_count}}
                    <i class="iconfont icon-zan"></i>{{key.favor_num}}
                    <i class="el-icon-view"></i>{{key.read_num}}
                  </span>
              </div>
              <div class="titleMain text box" v-html="key.content"></div>
              <h6 class="a3"></h6>
              <div class="onBtn box">
                <el-button type="primary" size="mini" @click="routerDetail(key.id)">更多</el-button>
              </div>
              <div class="bottom">
                <div class="mainRight">
                  <div @click="routerDetail(key.id)" class="a" v-for="(key,index) in staffData.data" v-if="index !== 0">
                    <div>
                       <span v-for="pic in key && key.album && key.album.cover_pic">
                          <img v-for="p in pic" :src="p.uri">
                       </span>
                    </div>
                    <div>
                      <p class="headline">{{key.title}}</p>
                      <span class="titleMain" v-html="key.content">
                    </span>
                      <h6 class="a3"></h6>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </el-col>
      </el-row>
      <!--客户纪实-->
      <el-row style="display: -webkit-flex;display: flex;">
        <el-col :span="16" style="margin-right: 10px;">
          <el-row style="display: -webkit-flex;display: flex;">
            <!--客户纪实-->
            <el-col :span="12" style="margin-right: 10px;" class="customer">
              <div class="title color2 a2">客户纪实</div>

              <div class="elPadding box">
                <div v-for="(key,index) in cusData.data" v-if="index === 0 && cusData.data[0] !== ''">
                  <div class="titleImg box">
                     <span @click="routerDetail(key.id)" v-for="pic in key && key.album && key.album.cover_pic">
                    <img v-if="p.uri" v-for="p in pic" :src="p.uri">
                    <img src="../../assets/images/default.png" v-else>
                  </span>
                  </div>
                  <div class="headline box" @click="routerDetail(key.id)">{{key.title}}</div>
                  <div class="titleTime box">
                    <span>{{key.create_time}}</span>
                    <span>
                      <i class="iconfont icon-pinglun"></i>{{key.comments_count}}
                      <i class="iconfont icon-zan"></i>{{key.favor_num}}
                      <i class="el-icon-view"></i>{{key.read_num}}
                  </span>
                  </div>
                  <div class="titleMain text box" v-html="key.content">
                  </div>
                  <h6 class="a2"></h6>
                  <div class="onBtn box">
                    <el-button type="primary" size="mini" @click="routerDetail(key.id)">更多</el-button>
                  </div>
                  <div class="bottom">
                    <div class="mainRight">
                      <div class="a" @click="routerDetail(key.id)" v-for="(key,index) in cusData.data"
                           v-if="index !== 0">
                        <div>
                           <span v-for="pic in key && key.album && key.album.cover_pic">
                            <img v-for="p in pic" :src="p.uri">
                          </span>
                        </div>
                        <div>
                          <p class="headline">{{key.title}}</p>
                          <span class="titleMain" v-html="key.content"></span>
                          <h6 class="a2"></h6>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </el-col>
            <!--公司生活-->
            <el-col :span="12">
              <div class="title color1 a1">公司生活</div>
              <div class="companyLife elPadding box">
                <div class="mainLeft" v-for="(key,index) in lifeData.data"
                     v-if="index === 0 && lifeData.data[0] !== ''">
                  <div class="headline" @click="routerDetail(key.id)">{{key.title}}</div>
                  <div class="titleTime">
                    <span>{{key.create_time}}</span>
                    <span>
                      <i class="iconfont icon-pinglun"></i>{{key.comments_count}}
                      <i class="iconfont icon-zan"></i>{{key.favor_num}}
                      <i class="el-icon-view"></i>{{key.read_num}}
                    </span>
                  </div>
                  <div class="titleImg">
                     <span @click="routerDetail(key.id)" v-for="pic in key && key.album && key.album.cover_pic">
                        <img v-for="p in pic" :src="p.uri">
                    </span>
                  </div>
                  <div class="titleMain text" v-html="key.content">
                  </div>
                  <h6 class="a1"></h6>
                  <div class="onBtn">
                    <el-button type="primary" size="mini" @click="routerDetail(key.id)">更多</el-button>
                  </div>
                </div>

                <div class="bottomPic ">
                  <div @click="routerDetail(key.id)" v-for="(key,index) in lifeData.data"
                       v-if="index !== 0 && lifeData.data[0] !== ''">
                    <span v-for="pic in key && key.album && key.album.cover_pic" class="module">
                        <img v-for="p in pic" :src="p.uri">
                        <div class="titleShow1">
                          <span>{{key.title}}</span>
                        </div>
                    </span>
                  </div>
                </div>
              </div>
            </el-col>
          </el-row>
        </el-col>
        <!--热门导读-->
        <el-col :span="8">
          <div class="title color4 a4">热门导读</div>
          <div class="hotReady" v-for="(key,index) in hotData.data" v-if="index === 0 && hotData.data[0] !== ''">
            <div class="elPadding">
              <div class="titleImg box">
                 <span @click="routerDetail(key.id)" v-for="pic in key && key.album && key.album.cover_pic">
                    <img v-for="p in pic" :src="p.uri">
                  </span>
              </div>
              <div class="headline box" @click="routerDetail(key.id)">{{key.title}}</div>
              <div class="titleTime box">
                <span>{{key.create_time}}</span>
                <span>
                  <i class="iconfont icon-pinglun"></i>{{key.comments_count}}
                  <i class="iconfont icon-zan"></i>{{key.favor_num}}
                  <i class="el-icon-view"></i>{{key.read_num}}
                </span>
              </div>
              <div class="titleMain text box" v-html="key.content">
              </div>
              <h6 class="a4"></h6>
              <div class="onBtn box">
                <el-button type="primary" size="mini" @click="routerDetail(key.id)">更多</el-button>
              </div>
              <div class="bottom">
                <div class="mainRight">
                  <div class="a" v-for="(key,index) in hotData.data" v-if="index !== 0" @click="routerDetail(key.id)">
                    <div>
                       <span v-for="pic in key && key.album && key.album.cover_pic">
                         <img v-for="p in pic" :src="p.uri">
                       </span>
                    </div>
                    <div>
                      <p class="headline">{{key.title}}</p>
                      <span class="titleMain" v-html="key.content">
                    </span>
                      <h6 class="a4"></h6>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </el-col>
      </el-row>
      <!--人物志-->
      <el-row :gutter="10" style="display: -webkit-flex;display: flex;">
        <el-col :span="16">
          <!--人物志-->
          <div class="title color1 a1">
            人物志
          </div>
          <el-row class="elPadding personage">
            <el-col :span="12">
              <div class="mainLeft" v-for="(key,index) in figureData.data"
                   v-if="index === 0 && figureData.data[0] !== ''">
                <div class="headline" @click="routerDetail(key.id)">{{key.title}}</div>
                <div class="titleTime">
                  <span>{{key.create_time}}</span>
                  <span>
                    <i class="iconfont icon-pinglun"></i>{{key.comments_count}}
                    <i class="iconfont icon-zan"></i>{{key.favor_num}}
                    <i class="el-icon-view"></i>{{key.read_num}}
                  </span>
                </div>
                <div class="bottomPic">
                  <div v-for="pic in key && key.album && key.album.cover_pic" @click="routerDetail(key.id)">
                    <img v-for="p in pic" :src="p.uri">{{index}}
                  </div>
                </div>
                <div class="titleMain text" v-html="key.content">
                </div>
                <h6 class="a1"></h6>
                <div class="onBtn">
                  <el-button type="primary" size="mini" @click="routerDetail(key.id)">更多</el-button>
                </div>
              </div>
            </el-col>
            <el-col :span="12">
              <el-row class="personageRight">
                <el-col :span="16" class="per1">
                  <div class="bigPer1 module" v-for="(key,index) in figureData.data"
                       v-if="index === 1 && figureData.data[0] !== ''" @click="routerDetail(key.id)">
                    <span v-for="pic in key && key.album && key.album.cover_pic">
                      <img v-for="p in pic" :src="p.uri">
                      <div class="titleShow">
                        <span style="font-size: 14px;">{{key.title}}</span>
                      </div>
                    </span>
                  </div>
                  <div class="bigPer2 ">
                    <span class="spanImg" @click="routerDetail(key.id)" v-for="(key,index) in figureData.data"
                          v-if="index === 2 || index === 3 && figureData.data[0] !== ''">
                      <a v-for="pic in key && key.album && key.album.cover_pic" class="module">
                        <img v-for="p in pic" :src="p.uri">
                        <div class="titleShow2">
                          <span>{{key.title}}</span>
                        </div>
                      </a>
                    </span>
                  </div>
                </el-col>
                <el-col :span="8" class="per2">
                  <div class="module" v-for="(key,index) in figureData.data"
                       v-if="index === 4 && figureData.data[0] !== ''">
                    <span @click="routerDetail(key.id)" v-for="pic in key && key.album && key.album.cover_pic">
                     <img v-for="p in pic" :src="p.uri">
                     <div class="titleShow">
                      <span style="font-size: 14px;">{{key.title}}</span>
                    </div>
                    </span>

                  </div>
                  <div class="module" v-for="(key,index) in figureData.data"
                       v-if="index === 5 && figureData.data[0] !== ''">
                   <span @click="routerDetail(key.id)" v-for="pic in key && key.album && key.album.cover_pic">
                     <img v-for="p in pic" :src="p.uri">
                     <div class="titleShow">
                        <span style="font-size: 14px;">{{key.title}}</span>
                     </div>
                    </span>

                  </div>
                  <div class="module" v-for="(key,index) in figureData.data"
                       v-if="index === 6 && figureData.data[0] !== ''">
                    <span @click="routerDetail(key.id)" v-for="pic in key && key.album && key.album.cover_pic">
                      <img v-for="p in pic" :src="p.uri">
                      <div class="titleShow">
                        <span style="font-size: 14px;">{{key.title}}</span>
                      </div>
                    </span>

                  </div>
                </el-col>
              </el-row>
            </el-col>
          </el-row>
        </el-col>
        <el-col :span="8">
          <!--问答中心-->
          <div class="title color3 a3">
            问答中心
          </div>
          <el-row class="answer_center">
            <img src="../../assets/images/answerCenter.png" @click="goAnswerCenter" style="height: 100%;">
          </el-row>
        </el-col>
      </el-row>
    </div>
    <el-dialog :close-on-click-modal="false" title="所有公告" :visible.sync="announcementListDialog" width="50%">
      <div>
        <div style=" margin: 10px;border: 1px solid #dee6fe;border-radius: 5px;padding-right: 0;padding-left: 20px;">
          <el-row v-loading="loading2"
                  element-loading-text="拼命加载中"
                  element-loading-spinner="el-icon-loading"
                  element-loading-background="rgba(255, 255, 255, 0.3)">
            <el-col :span="24" v-for="(value,key) in announcementList" :key="value.id"
                    class="clearfix" :class="{'borderBottom': key !=announcementList.length-1}"
                    style="padding-top: 10px;">
              <el-row>
                <el-col :span="1.6">
                  <span v-if="value.type==1" class="type_btn btn_honor">表彰</span>
                  <span v-else-if="value.type==2" class="type_btn btn_criticize">批评</span>
                  <span v-else class="type_btn btn_notice">通知</span>
                </el-col>
                <el-col :span="12">
                  <span class="notice_title" @click="lookDetail(value.id)">{{value.title}}</span>
                </el-col>
                <el-col :span="5">
                  <span class="notice_depart" v-if="value.department_name">——{{value.department_name}}</span>
                </el-col>
                <el-col :span="5">
                  <span class="notice_time" style="margin-right: 0;">{{value.create_time}}</span>
                </el-col>
              </el-row>
            </el-col>
          </el-row>
        </div>
        <div class="tableBottom" style="text-align: center;">
          <div>
            <el-pagination
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
              :current-page="announcement.page"
              :page-size="announcement.limit"
              layout="total, prev, pager, next, jumper"
              :total="totalNum">
            </el-pagination>
          </div>
        </div>
      </div>

    </el-dialog>
    <el-dialog :close-on-click-modal="false" title="公告详情" :visible.sync="announcementDetailDialog" width="650px">
      <div>
        <div class="scroll_bar"
             style="margin: 10px;border: 1px solid #dee6fe;border-radius: 5px;padding: 0 10px;overflow: auto;">
          <el-row style="margin: 10px;" v-loading="loading3"
                  element-loading-text="拼命加载中"
                  element-loading-spinner="el-icon-loading"
                  element-loading-background="rgba(255, 255, 255, 0.3)">
            <div style="color: #474849;line-height: 35px;font-size: 16px;">{{announcementDetail.title}}</div>
            <div style="line-height: 28px;margin-top: 10px;color: #78797a;font-size: 14px;"
                 v-html="announcementDetail.content"></div>
            <div style="text-align: right;font-size: 13px;color: #303133;">
              <span
                v-if="announcementDetail.creator_department_name">— —{{announcementDetail.creator_department_name}}</span>
              <span style="margin-left: 10px;color: #585859;">{{announcementDetail.create_time}}</span>
            </div>
          </el-row>
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  export default {
    name: "converge",
    data() {
      return {
        urls: globalConfig.server,
        dict: [],
        form: {
          status: 149,
          keywords: '',
          pages: 1,
        },
        newsData: {}, // 乐伽新闻
        staffData: {}, // 员工风采
        cusData: {}, // 客户纪实
        lifeData: {}, // 公司生活
        hotData: {},  // 热门导读
        figureData: {},  // 人物志
        hostData: {},   // 主轮播
        lessData: {}, // 次标题1
        lowData: {},  // 次标题2

        announcementList: [],
        announcement: {
          published: 1,
          page: 1,
          limit: 8,
        },
        totalNum: 0,
        announcementListDialog: false,   //所有公告
        announcementDetailDialog: false,  //公告详情
        announcementDetail: {},
        loading: false,
        loading2: false,
        loading3: false,
      }
    },
    activated() {
      this.addRegion();
      this.getAnnouncementList();
    },
    watch: {
      announcementDetailDialog(val) {
        if (!val) {
          this.announcementDetail = {};
        }
      }
    },
    created() {
      if (localStorage.getItem('convergeHostData')) {
        this.hostData = JSON.parse(localStorage.getItem('convergeHostData'));
      }
      if (localStorage.getItem('convergeLessData')) {
        this.lessData = JSON.parse(localStorage.getItem('convergeLessData'));
      }
      if (localStorage.getItem('convergeLowData')) {
        this.lowData = JSON.parse(localStorage.getItem('convergeLowData'));
      }
      if (localStorage.getItem('convergeNewsData')) {
        this.newsData = JSON.parse(localStorage.getItem('convergeNewsData'));
      }
      if (localStorage.getItem('convergeStaffData')) {
        this.staffData = JSON.parse(localStorage.getItem('convergeStaffData'));
      }
      if (localStorage.getItem('convergeCusData')) {
        this.cusData = JSON.parse(localStorage.getItem('convergeCusData'));
      }
      if (localStorage.getItem('convergeHotData')) {
        this.hotData = JSON.parse(localStorage.getItem('convergeHotData'));
      }
      if (localStorage.getItem('convergeLifeData')) {
        this.lifeData = JSON.parse(localStorage.getItem('convergeLifeData'));
      }
      if (localStorage.getItem('convergeFigureData')) {
        this.figureData = JSON.parse(localStorage.getItem('convergeFigureData'));
      }

    },
    methods: {
      lookDetail(id) {
        this.announcementDetailDialog = true;
        this.loading3 = true;
        this.$http.get(globalConfig.server + 'announcement/' + id).then((res) => {
          this.loading3 = false;
          if (res.data.code === '80010') {
            this.announcementDetail = res.data.data;
          } else {
            this.$notify.warning({
              title: "警告",
              message: res.data.msg
            });
          }
        });
      },
      getAnnouncementList() {
        this.loading2 = this.loading = true;
        this.$http.get(globalConfig.server + "announcement", {params: this.announcement}).then(res => {
          this.loading2 = this.loading = false;
          if (res.data.code === "80010") {
            this.announcementList = res.data.data;
            this.totalNum = res.data.num;
          } else {
            this.totalNum = 0;
            this.announcementList = [];
          }
        });
      },
      handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
      },
      handleCurrentChange(val) {
        this.announcement.page = val;
        this.getAnnouncementList();
      },
      // 详情
      routerDetail(id) {
        let data = {ids: id, detail: 'converge'};
        this.$router.push({path: '/Infodetails', query: data});
        this.$store.dispatch('articleDetail', data);
      },
      goAnswerCenter() {
        this.$router.push({path: '/answerCenter'});
      },
      addRegion() {
        // 主轮播
        this.$http.get(this.urls + 'oa/portal/?dict_id=144', {
          params: this.form
        }).then((res) => {
          let title, data = {};
          title = res.data && res.data.data && res.data.data.data && res.data.data.data[0] && res.data.data.data[0].title;
          data = res.data && res.data.data && res.data.data.data;
          this.hostData = Object.assign({}, this.hostData, {title: title, data: data});
          localStorage.setItem('convergeHostData', JSON.stringify(this.hostData));

          // 次标题1
          this.$http.get(this.urls + 'oa/portal/?dict_id=145', {
            params: this.form
          }).then((res) => {
            let title, data = {};
            title = res.data && res.data.data && res.data.data.data && res.data.data.data[0] && res.data.data.data[0].title;
            data = res.data && res.data.data && res.data.data.data;
            this.lessData = Object.assign({}, this.lessData, {title: title, data: data});
            localStorage.setItem('convergeLessData', JSON.stringify(this.lessData));

            // 次标题2
            this.$http.get(this.urls + 'oa/portal/?dict_id=146', {
              params: this.form
            }).then((res) => {
              let title, data = {};
              title = res.data && res.data.data && res.data.data.data && res.data.data.data[0] && res.data.data.data[0].title;
              data = res.data && res.data.data && res.data.data.data;
              this.lowData = Object.assign({}, this.lowData, {title: title, data: data});
              localStorage.setItem('convergeLowData', JSON.stringify(this.lowData));

              // 乐伽新闻
              this.$http.get(this.urls + 'oa/portal/?dict_id=138', {
                params: this.form
              }).then((res) => {
                let title, data = {};
                title = res.data && res.data.data && res.data.data.data && res.data.data.data[0] && res.data.data.data[0].title;
                data = res.data && res.data.data && res.data.data.data;
                this.newsData = Object.assign({}, this.newsData, {title: title, data: data});
                localStorage.setItem('convergeNewsData', JSON.stringify(this.newsData));

                // 员工风采
                this.$http.get(this.urls + 'oa/portal/?dict_id=139', {
                  params: this.form
                }).then((res) => {
                  let title, data = {};
                  title = res.data && res.data.data && res.data.data.data && res.data.data.data[0] && res.data.data.data[0].title;
                  data = res.data && res.data.data && res.data.data.data;
                  this.staffData = Object.assign({}, this.staffData, {title: title, data: data});
                  localStorage.setItem('convergeStaffData', JSON.stringify(this.staffData));

                  // 客户纪实
                  this.$http.get(this.urls + 'oa/portal/?dict_id=140', {
                    params: this.form
                  }).then((res) => {
                    let title, data = {};
                    title = res.data && res.data.data && res.data.data.data && res.data.data.data[0] && res.data.data.data[0].title;
                    data = res.data && res.data.data && res.data.data.data;
                    this.cusData = Object.assign({}, this.cusData, {title: title, data: data});
                    localStorage.setItem('convergeCusData', JSON.stringify(this.cusData));
                  });

                  // 热门导读
                  this.$http.get(this.urls + 'oa/portal/?dict_id=142', {
                    params: this.form
                  }).then((res) => {
                    let title, data = {};
                    title = res.data && res.data.data && res.data.data.data && res.data.data.data[0] && res.data.data.data[0].title;
                    data = res.data && res.data.data && res.data.data.data;
                    this.hotData = Object.assign({}, this.hotData, {title: title, data: data});
                    localStorage.setItem('convergeHotData', JSON.stringify(this.hotData));
                  });

                  // 公司生活
                  this.$http.get(this.urls + 'oa/portal/?dict_id=141', {
                    params: this.form
                  }).then((res) => {
                    let title, data = {};
                    title = res.data && res.data.data && res.data.data.data && res.data.data.data[0] && res.data.data.data[0].title;
                    data = res.data && res.data.data && res.data.data.data;
                    this.lifeData = Object.assign({}, this.lifeData, {title: title, data: data});
                    localStorage.setItem('convergeLifeData', JSON.stringify(this.lifeData));

                    // 人物志
                    this.$http.get(this.urls + 'oa/portal/?dict_id=143', {
                      params: this.form
                    }).then((res) => {
                      let title, data = {};
                      title = res.data && res.data.data && res.data.data.data && res.data.data.data[0] && res.data.data.data[0].title;
                      data = res.data && res.data.data && res.data.data.data;
                      this.figureData = Object.assign({}, this.figureData, {title: title, data: data});
                      localStorage.setItem('convergeFigureData', JSON.stringify(this.figureData));
                    })

                  });

                })

              })

            })

          })

        })

      }
    },
  }
</script>

<style lang="scss" scoped>

  #converge {
    .clearfix:before,
    .clearfix:after {
      display: table;
      content: "";
    }
    .clearfix:after {
      clear: both
    }
    .borderBottom {
      border-bottom: 1px solid #e5e5e5;
    }
    .marginlr {
      margin-left: 30px!important;
      margin-right: -30px!important;
    }
    .answer_center {
      height: 355px;
      border: 1px solid #ddd;
      border-radius: 6px;
    }

    .type_btn {
      background: #fefeff;
      font-size: 12px;
      padding: 3px 10px;
      line-height: 35px;
      border-radius: 5px;
    }
    .btn_notice {
      color: rgb(106, 141, 251);
      box-shadow: 0px 0px 3px 0px rgba(106, 141, 251, 0.74);
      border: 1px solid rgba(106, 141, 251, 0.7);
    }
    .btn_honor {
      color: #58d788;
      box-shadow: 0px 0px 3px 0px rgba(88, 215, 136, 0.74);
      border: 1px solid rgba(88, 215, 136, 0.7);
    }
    .btn_criticize {
      color: #fb4699;
      box-shadow: 0px 0px 3px 0px rgba(251, 70, 153, 0.74);
      border: 1px solid rgba(251, 70, 153, 0.7);
    }
    .notice_title {
      display: inline-block;
      white-space: nowrap;
      overflow: hidden;
      width: 100%;
      text-overflow: ellipsis;
      vertical-align: middle;
      margin-left: 10px;
      cursor: pointer;
      color: #303133;
      line-height: 35px;
      &:hover {
        color: #6a8dfb;
      }
    }
    .notice_depart {
      line-height: 35px;
      color: #999;
      display: inline-block;
      width: 100%;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    .notice_time {
      display: inline-block;
      line-height: 35px;
      color: #999;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    $color: #409EFF;
    $colorBor: #ddd;
    @mixin flex {
      display: flex;
      display: -webkit-flex;
    }

    @mixin border_radius($n) {
      -webkit-border-radius: $n;
      -moz-border-radius: $n;
      border-radius: $n;
    }

    @mixin border_1 {
      border: 1px solid $colorBor;
      @include border_radius(6px);
    }

    @mixin text_overflow($n) {
      display: -webkit-box;
      -webkit-box-orient: vertical;
      text-overflow: ellipsis;
      -webkit-line-clamp: $n;
      line-clamp: $n;
    }
    $color1: #fb4699;
    $color2: #58d788;
    $color3: #6a8dfb;
    $color4: #fdca41;
    .color1 {
      color: $color1;
    }
    .color2 {
      color: $color2;
    }
    .color3 {
      color: $color3;
    }
    .color4 {
      color: $color4;
    }
    .module {
      position: relative;
      .titleShow {
        width: 100%;
        opacity: 0;
        position: absolute;
        top: 0;
        bottom: 0;
        /*left: 0;*/
        /*right: 0;*/
        background: rgba(0, 0, 0, .4);
        @include flex;
        align-items: flex-end;
        span {
          font-weight: normal;
          color: rgba(255, 255, 255, .8);
          font-size: 20px;
          margin-bottom: 20px;
          margin-left: 20px;
          @include text_overflow(1);
          height: 23px;
        }
      }
      .titleShow1, .titleShow2 {
        width: 100% !important;
        opacity: 0;
        position: absolute;
        top: -83px;
        bottom: 0;
        background: rgba(0, 0, 0, 0.4);
        @include flex;
        display: -webkit-box;
        display: -ms-flexbox;
        -webkit-box-align: end;
        -ms-flex-align: end;
        align-items: flex-end;
        left: 0;
        right: 0;
        color: #fff;
      }
      .titleShow2 {
        top: -88px;
      }
      .titleShow1, .titleShow2 {
        span {
          position: absolute;
          right: 0;
          left: 16px;
          bottom: 12px;
          font-size: 14px;
          padding: 10px 5px;
          display: inline-block;
          white-space: nowrap;
          text-overflow: ellipsis;
          overflow: hidden;
        }
      }
      &:hover {
        .titleShow {
          opacity: 1;
          cursor: pointer;
        }
        .titleShow1 {
          opacity: 1;
          cursor: pointer;
        }
        .titleShow2 {
          opacity: 1;
          cursor: pointer;
        }
      }
    }

    img {
      width: 100%;
      /*height: 100%;*/
      cursor: pointer;
    }
    p {
      margin: 0 !important;
    }
    div, span, p {
      overflow: hidden;
    }
    h6 {
      margin: 0;
      width: 20px;
      border-top: 3px solid $color1;
    }
    h6.a1 {
      border-color: $color1;
    }
    h6.a2 {
      border-color: $color2;
    }
    h6.a3 {
      border-color: $color3;
    }
    h6.a4 {
      border-color: $color4;
    }
    .onBtn {
      margin: 30px 0;
    }
    .onBtn.box {
      margin: 24px 0;
    }
    .title {
      padding: 16px 0;
      opacity: .7;
      font-weight: bold;
      &:before {
        border-radius: 2px;
        margin-right: 8px;
        border-left: 4px solid #409EFF;
        content: '';
      }
    }
    .title.a1 {
      &:before {
        border-color: $color1;
      }
    }
    .title.a2 {
      &:before {
        border-color: $color2;
      }
    }
    .title.a3 {
      &:before {
        border-color: $color3;
      }
    }
    .title.a4 {
      &:before {
        border-color: $color4;
      }
    }
    .headline {
      font-size: 16px;
      color: #101010;
      cursor: pointer;
      &:hover {
        color: $color;
      }
    }
    .headline.box {
      margin: 12px 0;
    }
    .titleMain {
      @include text_overflow(2);
      color: #aaaaaa;
      height: 40px;
      line-height: 21px;
    }
    .titleMain.text {
      margin: 20px 0;
    }
    .titleMain.text.box {
      margin: 12px 0 18px;
    }
    .titleImg {
      height: 240px;
    }
    .titleImg.box {
      height: 130px;
    }
    .titleTime {
      @include flex;
      margin: 20px 0 15px;
      justify-content: space-between;
      span {
        @include flex;
        align-items: flex-start;
        i {
          padding: 0 2px 0 10px;
        }
      }
    }
    .titleTime.box {
      margin: 0;
    }
    .elPadding {
      box-sizing: border-box;
      @include border_1;
      padding: 15px 10px;
    }
    .convergeTop {
      .topLeft {
        position: relative;
        height: 270px;
        margin-right: 10px;
      }
      .topRight {
        div {
          @include flex;
          height: 130px;
          h1, h2 {
            margin: 0;
            min-width: 49%;
            height: 130px;
            overflow: hidden;
          }
          .rightA {
            margin-right: 2%;
          }
        }
        .a {
          margin-bottom: 10px;
        }
      }
    }

    .convergeMain {
      .lejiaNews {
        margin-right: 10px;
      }
      .lejiaNews, .appearance, .customer, .hotReady {
        .elPadding {
          height: 493px;
          .mainLeft {
            padding-right: 10px;
            margin-right: 10px;
            border-right: 1px solid $colorBor;
          }
          .mainRight {
            .a {
              margin-bottom: 20px;
              height: 100px;
              cursor: pointer;
              @include flex;
              div:first-child {
                min-width: 160px;
                max-width: 160px;
                margin-right: 12px;
              }
              div:last-child {
                width: 100%;
                @include flex;
                flex-direction: column;
                justify-content: space-between;
                p {
                  margin: 0;
                  @include text_overflow(1);
                }
              }
            }
          }
        }
      }
      .appearance, .customer, .hotReady {
        .bottom {
          padding-top: 18px;
          border-top: 1px solid $colorBor;
        }
      }
      .hotReady .elPadding {
        height: 615px;
        .mainRight {
          .a {
            margin-bottom: 29px;
          }
        }
      }
      .companyLife, .personage {
        .bottomPic {
          @include flex;
          flex-wrap: wrap;
          justify-content: space-around;
          height: 100px;
          div {
            width: 32%;
            height: 97px;
            margin-bottom: 12px;
          }
        }
      }
      .elPadding.box {
        height: 614px;
      }
      .personage {
        @include flex;
        height: 355px;
        .mainLeft {
          margin-right: 10px;
        }
        .personageRight {
          border-left: 1px solid $colorBor;
          @include flex;
          .per1 {
            margin: 0 12px 0 10px;
          }
          .per1, .per2 {
            .bigPer1 {
              width: 100%;
              height: 214px;
              margin-bottom: 12px;
            }
            .bigPer2 {
              @include flex;
              justify-content: space-between;
              flex-wrap: wrap;
              span.spanImg {
                margin: 0;
                width: 48%;
                height: 101px;
              }
            }
          }
          .per2 {
            div {
              height: 101px;
              margin-bottom: 12px;
            }
          }
        }
      }
    }
  }
</style>
