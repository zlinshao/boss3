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
                  <img v-if="key.album.cover_pic.length==0" src="../../assets/images/default.png">
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
              <div class="mainRight" v-if="newsData.data.length>0">
                <div  class="a" @click="routerDetail(key.id)" v-for="(key,index) in newsData.data"
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
                    <img v-if="p.uri" v-for="p in pic" :src="p.uri">
                    <img v-else src="../../assets/images/default.png">
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
                    <img v-if="p.uri" v-for="p in pic" :src="p.uri">
                    <img v-else src="../../assets/images/default.png">
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

                <div class="bottomPic ">
                  <div @click="routerDetail(key.id)" v-for="(key,index) in lifeData.data"
                       v-if="index !== 0 && lifeData.data[0] !== ''">
                    <span v-for="pic in key.album.cover_pic" class="module">
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
                  <div v-for="pic in key.album.cover_pic" @click="routerDetail(key.id)">
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
                    <span v-for="pic in key.album.cover_pic">
                      <img v-for="p in pic" :src="p.uri">
                      <div class="titleShow">
                        <span style="font-size: 14px;">{{key.title}}</span>
                      </div>
                    </span>

                  </div>
                  <div class="bigPer2 ">
                    <span @click="routerDetail(key.id)" v-for="(key,index) in figureData.data"
                          v-if="index === 2 || index === 3 && figureData.data[0] !== ''">

                      <a v-for="pic in key.album.cover_pic" class="module">
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
                    <span @click="routerDetail(key.id)" v-for="pic in key.album.cover_pic">
                     <img v-for="p in pic" :src="p.uri">
                     <div class="titleShow">
                      <span style="font-size: 14px;">{{key.title}}</span>
                    </div>
                    </span>

                  </div>
                  <div class="module" v-for="(key,index) in figureData.data"
                       v-if="index === 5 && figureData.data[0] !== ''">
                   <span @click="routerDetail(key.id)" v-for="pic in key.album.cover_pic">
                     <img v-for="p in pic" :src="p.uri">
                     <div class="titleShow">
                        <span style="font-size: 14px;">{{key.title}}</span>
                     </div>
                    </span>

                  </div>
                  <div class="module" v-for="(key,index) in figureData.data"
                       v-if="index === 6 && figureData.data[0] !== ''">
                    <span @click="routerDetail(key.id)" v-for="pic in key.album.cover_pic">
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
        let data = {ids: id, detail: 'converge'};
        this.$router.push({path: '/Infodetails', query: data});
        this.$store.dispatch('articleDetail', data);
      },
      addRegion() {
        // 主轮播
        this.$http.get(this.urls + 'oa/portal/?dict_id=144', {
          params: this.form
        }).then((res) => {
          this.hostData.title = res.data && res.data.data && res.data.data.data && res.data.data.data[0] && res.data.data.data[0].dict_ids;
          this.hostData.data = res.data && res.data.data && res.data.data.data;
          // 次标题1

          this.$http.get(this.urls + 'oa/portal/?dict_id=145', {
            params: this.form
          }).then((res) => {
            this.lessData.title = res.data && res.data.data && res.data.data.data && res.data.data.data[0] && res.data.data.data[0].dict_ids;
            this.lessData.data = res.data && res.data.data && res.data.data.data;
            // 次标题2

            this.$http.get(this.urls + 'oa/portal/?dict_id=146', {
              params: this.form
            }).then((res) => {
              this.lowData.title = res.data && res.data.data && res.data.data.data && res.data.data.data[0] && res.data.data.data[0].dict_ids;
              this.lowData.data = res.data && res.data.data && res.data.data.data;
              // 乐伽新闻

              this.$http.get(this.urls + 'oa/portal/?dict_id=138', {
                params: this.form
              }).then((res) => {
                this.newsData.title = res.data && res.data.data && res.data.data.data && res.data.data.data[0] && res.data.data.data[0].dict_ids;
                this.newsData.data = res.data && res.data.data && res.data.data.data;

                // 员工风采
                this.$http.get(this.urls + 'oa/portal/?dict_id=139', {
                  params: this.form
                }).then((res) => {
                  this.staffData.title = res.data && res.data.data && res.data.data.data && res.data.data.data[0] && res.data.data.data[0].dict_ids;
                  this.staffData.data = res.data && res.data.data && res.data.data.data;

                  // 客户纪实
                  this.$http.get(this.urls + 'oa/portal/?dict_id=140', {
                    params: this.form
                  }).then((res) => {
                    this.cusData.title = res.data && res.data.data && res.data.data.data && res.data.data.data[0] && res.data.data.data[0].dict_ids;
                    this.cusData.data = res.data && res.data.data && res.data.data.data;
                  });

                  // 热门导读
                  this.$http.get(this.urls + 'oa/portal/?dict_id=142', {
                    params: this.form
                  }).then((res) => {
                    this.hotData.title = res.data && res.data.data && res.data.data.data && res.data.data.data[0] && res.data.data.data[0].dict_ids;
                    this.hotData.data = res.data && res.data.data && res.data.data.data;
                  });

                  // 公司生活
                  this.$http.get(this.urls + 'oa/portal/?dict_id=141', {
                    params: this.form
                  }).then((res) => {
                    this.lifeData.title = res.data && res.data.data && res.data.data.data && res.data.data.data[0] && res.data.data.data[0].dict_ids;
                    this.lifeData.data = res.data && res.data.data && res.data.data.data;

                    // 人物志
                    this.$http.get(this.urls + 'oa/portal/?dict_id=143', {
                      params: this.form
                    }).then((res) => {
                      this.figureData.title = res.data && res.data.data && res.data.data.data && res.data.data.data[0] && res.data.data.data[0].dict_ids;
                      this.figureData.data = res.data && res.data.data && res.data.data.data;
                    })

                  });

                })

              })

            })

          })

        })

        // this.$http.get(this.urls + 'setting/dictionary/137').then((res) => {
        //   this.dict = res.data.data;
        // let d = res.data.data;
        // for (let i = 0; i < d.length; i++) {
        //   console.log(d[i].id,d[i].dictionary_name);
        //   let name = d[i].dictionary_name;
        //   this.$http.get(this.urls + 'oa/portal/?dict_id=' + d[i].id, {
        //     params: this.form
        //   }).then((res) => {
        //     if (name === '主轮播') {
        //       // 主轮播
        //       this.hostData.title = name;
        //       this.hostData.data = res.data.data.data;
        //     }
        //     if (name === '次标题1') {
        //       // 次标题1
        //       this.lessData.title = name;
        //       this.lessData.data = res.data.data.data;
        //     }
        //     if (name === '次标题2') {
        //       // 次标题2
        //       this.lowData.title = name;
        //       this.lowData.data = res.data.data.data;
        //     }
        //     if (name === '乐伽新闻') {
        //       // 乐伽新闻
        //       this.newsData.title = name;
        //       this.newsData.data = res.data.data.data;
        //     }
        //     if (name === '员工风采') {
        //       // 员工风采
        //       this.staffData.title = name;
        //       this.staffData.data = res.data.data.data;
        //     }
        //     if (name === '客户纪实') {
        //       // 客户纪实
        //       this.cusData.title = name;
        //       this.cusData.data = res.data.data.data;
        //     }
        //     if (name === '公司生活') {
        //       // 公司生活
        //       this.lifeData.title = name;
        //       this.lifeData.data = res.data.data.data;
        //     }
        //     if (name === '热门导读') {
        //       // 热门导读
        //       this.hotData.title = name;
        //       this.hotData.data = res.data.data.data;
        //     }
        //     if (name === '人物志') {
        //       // 人物志
        //       this.figureData.title = name;
        //       this.figureData.data = res.data.data.data;
        //     }
        //   })
        // }
        // })
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
          /*margin-left: 20px;*/
          @include text_overflow(1);
        }
      }
      .titleShow1,.titleShow2 {
        width: 100% !important;
        opacity: 0;
        position: absolute;
        top: -83px;
        bottom: 0;
        background: rgba(0, 0, 0, 0.4);
        display: -webkit-box;
        display: -ms-flexbox;
        display: flex;
        display: -webkit-flex;
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
      .titleShow1 span{
        font-size: 14px;
        padding: 10px 5px;
        display: inline-block;
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;
      }
      .titleShow2 span{
        width: 100% !important;
        font-size: 14px;
        padding: 10px 5px;
        display: inline-block;
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;
        display: -webkit-flex;
        -webkit-box-align: end;
        -ms-flex-align: end;
        align-items: flex-end;
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
