<template>
  <div id="converge">
    <div class="convergeTop">
      <el-row>
        <el-col :span="16">
          <div class="topLeft module">
            <span v-for="(key,index) in hostData.data" v-if="index === 0 && hostData.data[0] !== ''">
              <span v-for="pic in key.album.cover_pic">
                <img v-for="p in pic" :src="p.uri">
              </span>
            </span>
            <div class="titleShow" @click="routerDetail(key.id)" v-for="(key,index) in hostData.data" v-if="index === 0 && hostData.data[0] !== ''">
              <span>{{key.title}}</span>
            </div>
          </div>
        </el-col>
        <el-col :span="8">
          <div class="topRight">
            <div class="a">
              <h1 class="rightA module">
                <span v-for="(key,index) in lessData.data" v-if="index === 0 && lessData.data[0] !== ''">
                  <span v-for="pic in key.album.cover_pic">
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
                   <span v-for="pic in key.album.cover_pic">
                    <img v-for="p in pic" :src="p.uri">
                  </span>
                </span>
                <div @click="routerDetail(key.id)" class="titleShow" v-for="(key,index) in lowData.data" v-if="index === 0 && lowData.data[0] !== ''">
                  <span>{{key.title}}</span>
                </div>
              </h1>
            </div>
          </div>
        </el-col>
      </el-row>
    </div>

    <div class="convergeMain">

      <!--乐伽新闻-->
      <el-row style="display: -webkit-flex;display: flex;">
        <el-col :span="16" class="lejiaNews">
          <div class="title color1 a1">
            {{newsData.title}}
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
                  <span @click="routerDetail(key.id)" v-for="pic in key.album.cover_pic">
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
                     <span v-for="pic in key.album.cover_pic">
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
            {{staffData.title}}
          </div>
          <div class="elPadding">
            <div v-for="(key,index) in staffData.data" v-if="index === 0 && staffData.data[0] !== ''">
              <div class="titleImg box">
                 <span @click="routerDetail(key.id)" v-for="pic in key.album.cover_pic">
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
              <div class="titleMain text box" v-html="key.content"></div>
              <h6 class="a3"></h6>
              <div class="onBtn box">
                <el-button type="primary" size="mini" @click="routerDetail(key.id)">更多</el-button>
              </div>
              <div class="bottom">
                <div class="mainRight">
                  <div @click="routerDetail(key.id)" class="a" v-for="(key,index) in staffData.data" v-if="index !== 0">
                    <div>
                       <span v-for="pic in key.album.cover_pic">
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

      <el-row style="display: -webkit-flex;display: flex;">
        <el-col :span="16" style="margin-right: 10px;">
          <el-row style="display: -webkit-flex;display: flex;">
            <!--客户纪实-->
            <el-col :span="12" style="margin-right: 10px;" class="customer">
              <div class="title color2 a2">{{cusData.title}}</div>

              <div class="elPadding box">
                <div v-for="(key,index) in cusData.data" v-if="index === 0 && cusData.data[0] !== ''">
                  <div class="titleImg box">
                     <span @click="routerDetail(key.id)" v-for="pic in key.album.cover_pic">
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
                  <h6 class="a2"></h6>
                  <div class="onBtn box">
                    <el-button type="primary" size="mini" @click="routerDetail(key.id)">更多</el-button>
                  </div>
                  <div class="bottom">
                    <div class="mainRight">
                      <div class="a" @click="routerDetail(key.id)" v-for="(key,index) in cusData.data"
                           v-if="index !== 0">
                        <div>
                           <span v-for="pic in key.album.cover_pic">
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
              <div class="title color1 a1">{{lifeData.title}}</div>
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
                     <span @click="routerDetail(key.id)" v-for="pic in key.album.cover_pic">
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

                <div class="bottomPic">
                  <div @click="routerDetail(key.id)" v-for="(key,index) in lifeData.data"
                       v-if="index !== 0 && lifeData.data[0] !== ''">
                    <span v-for="pic in key.album.cover_pic">
                        <img v-for="p in pic" :src="p.uri">
                    </span>
                  </div>
                </div>
              </div>
            </el-col>
          </el-row>

          <!--人物志-->
          <div class="title color1 a1">
            {{figureData.title}}
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
                  <div @click="routerDetail(key.id)">
                     <span v-for="pic in key.album.cover_pic">
                    <img v-for="p in pic" :src="p.uri">{{index}}
                  </span>
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
              <el-row class="personageRight" v-for="(key,index) in figureData.data"
                      v-if="index !== 0 && figureData.data[0] !== ''" :key="index">
                <el-col :span="16" class="per1">
                  <div class="bigPer1 module">
                    <span @click="routerDetail(key.id)" v-for="pic in key.album.cover_pic">
                        <img v-for="p in pic" :src="p.uri">
                    </span>
                    <div class="titleShow">
                      <span>{{key.title}}</span>
                    </div>
                  </div>
                  <div class="bigPer2">
                    <span @click="routerDetail(key.id)" v-for="pic in key.album.cover_pic">
                        <img v-for="p in pic" :src="p.uri">
                    </span>
                  </div>
                </el-col>
                <el-col :span="8" class="per2">
                  <div>
                   <span @click="routerDetail(key.id)" v-for="pic in key.album.cover_pic">
                        <img v-for="p in pic" :src="p.uri">
                    </span>
                  </div>
                  <div>
                   <span @click="routerDetail(key.id)" v-for="pic in key.album.cover_pic">
                        <img v-for="p in pic" :src="p.uri">
                    </span>
                  </div>
                  <div>
                   <span @click="routerDetail(key.id)" v-for="pic in key.album.cover_pic">
                        <img v-for="p in pic" :src="p.uri">
                    </span>
                  </div>
                </el-col>
              </el-row>
            </el-col>
          </el-row>
        </el-col>

        <!--热门导读-->
        <el-col :span="8">
          <div class="title color4 a4">{{hotData.title}}</div>
          <div class="hotReady" v-for="(key,index) in hotData.data" v-if="index === 0 && hotData.data[0] !== ''">
            <div class="elPadding">
              <div class="titleImg box">
                 <span @click="routerDetail(key.id)" v-for="pic in key.album.cover_pic">
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
                       <span v-for="pic in key.album.cover_pic">
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
    </div>
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
        newsData: {
          title: '',// 乐伽新闻
          data: [],
        },
        staffData: {
          title: '',// 员工风采
          data: [''],
        },
        cusData: {
          title: '',// 客户纪实
          data: [''],
        },
        lifeData: {
          title: '',// 公司生活
          data: [''],
        },
        hotData: {
          title: '',// 热门导读
          data: [''],
        },
        figureData: {
          title: '',// 人物志
          data: [''],
        },
        hostData: {
          title: '',// 主轮播
          data: [''],
        },
        lessData: {
          title: '',// 次标题1
          data: [''],
        },
        lowData: {
          title: '',// 次标题2
          data: [''],
        },
      }
    },
    mounted() {
      this.addRegion();
    },
    methods: {
      // 详情
      routerDetail(id) {
        this.$router.push({path: '/Infodetails', query: {ids: id, detail: 'converge'}})
      },
      addRegion() {
        this.$http.get(this.urls + 'setting/dictionary/137').then((res) => {
          this.dict = res.data.data;
          let d = res.data.data;
          for (let i = 0; i < d.length; i++) {
            this.$http.get(this.urls + 'oa/portal/?dict_id=' + d[i].id, {
              params: this.form
            }).then((res) => {
              if (d[i].dictionary_name === '乐伽新闻') {
                // 乐伽新闻
                this.newsData.title = d[i].dictionary_name;
                this.newsData.data = res.data.data.data;
              }
              if (d[i].dictionary_name === '员工风采') {
                // 员工风采
                this.staffData.title = d[i].dictionary_name;
                this.staffData.data = res.data.data.data;
              }
              if (d[i].dictionary_name === '客户纪实') {
                // 客户纪实
                this.cusData.title = d[i].dictionary_name;
                this.cusData.data = res.data.data.data;
              }
              if (d[i].dictionary_name === '公司生活') {
                // 公司生活
                this.lifeData.title = d[i].dictionary_name;
                this.lifeData.data = res.data.data.data;
              }
              if (d[i].dictionary_name === '热门导读') {
                // 热门导读
                this.hotData.title = d[i].dictionary_name;
                this.hotData.data = res.data.data.data;
              }
              if (d[i].dictionary_name === '人物志') {
                // 人物志
                this.figureData.title = d[i].dictionary_name;
                this.figureData.data = res.data.data.data;
              }
              if (d[i].dictionary_name === '主轮播') {
                // 主轮播
                this.hostData.title = d[i].dictionary_name;
                this.hostData.data = res.data.data.data;
              }
              if (d[i].dictionary_name === '次标题1') {
                // 次标题1
                this.lessData.title = d[i].dictionary_name;
                this.lessData.data = res.data.data.data;
              }
              if (d[i].dictionary_name === '次标题2') {
                // 次标题2
                this.lowData.title = d[i].dictionary_name;
                this.lowData.data = res.data.data.data;
              }
            })
          }
        })
      }
    },
  }
</script>

<style lang="scss">
  #converge {
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
        opacity: 0;
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
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
        }
      }
      &:hover {
        .titleShow {
          opacity: 1;
          cursor: pointer;
        }
      }
    }

    img {
      width: 100%;
      height: 100%;
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
      padding: 10px;
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
        height: 1006px;
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
          justify-content: space-between;
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
            div.bigPer2 {
              @include flex;
              justify-content: space-between;
              flex-wrap: wrap;
              span {
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
