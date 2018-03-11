<template>
  <div id="converge">
    <div class="container">
      <el-row :gutter="10">
        <el-col :span="16">
          <div class="banner" v-for="(key,index) in hostData.data" v-if="index === 0" @click="routerDetail(key.id)">
            <img v-for="pic in key.album.cover_pic" :src="pic.big">
            <h3>{{key.title}}</h3>
          </div>
        </el-col>
        <el-col :span="8">
          <div style="margin-bottom: 10px">
            <el-row :gutter="10">
              <el-col :span="12">
                <div class="hover_pic picOne" v-for="(key,index) in lessData.data" v-if="index === 0"
                     @click="routerDetail(key.id)">
                  <img v-for="pic in key.album.cover_pic" :src="pic.big">
                </div>
              </el-col>
              <el-col :span="12">
                <div class="hover_pic picOne">
                  <img src="../../assets/images/yuangong1.png" alt="">
                </div>
              </el-col>
            </el-row>
          </div>

          <el-row :gutter="10">
            <el-col :span="12">
              <div class="hover_pic picOne">
                <img src="../../assets/images/yuangong2.png" alt="">
              </div>
            </el-col>
            <el-col :span="12">
              <div class="hover_pic picOne" v-for="(key,index) in lowData.data" v-if="index === 0"
                   @click="routerDetail(key.id)">
                <img v-for="pic in key.album.cover_pic" :src="pic.big">
              </div>
            </el-col>
          </el-row>
        </el-col>
      </el-row>

      <el-row :gutter="10">

        <!--乐伽新闻-->
        <el-col :span="16">
          <div class="title" style="color: #fb4699;">
            {{newsData.title}}
          </div>
          <div class="lejiaNews">
            <el-row>
              <el-col :span="12">
                <div class="newsOne" v-for="(key,index) in newsData.data" v-if="index === 0">
                  <div class="newsTitle" @click="routerDetail(key.id)">
                    {{key.title}}
                  </div>
                  <div class="reader">
                    <div class="readerDate">{{key.create_time}}</div>
                    <div class="readerInfos">
                      <div>
                        <i class="iconfont icon-xiaoxi"></i>{{key.comments_count}}
                      </div>
                      <div>
                        <i class="iconfont icon-dianzan"></i>&nbsp;{{key.favor_num}}
                      </div>
                      <div>
                        <i class="iconfont icon-yanjing"></i>&nbsp;{{key.read_num}}
                      </div>
                    </div>
                  </div>
                  <div class="newsPic hover_pic" @click="routerDetail(key.id)">
                    <img v-for="pic in key.album.cover_pic" :src="pic.big">
                  </div>
                  <div class="newsDetail">
                    <span v-html="key.content"></span>
                  </div>
                  <div class="lints"></div>
                  <div class="newsButt">
                    <el-button type="primary" size="mini" @click="routerDetail(key.id)">更多</el-button>
                  </div>
                </div>
              </el-col>
              <el-col :span="12" style="padding-left: 12px;">
                <div class="newsList" v-for="(key,index) in newsData.data" v-if="index !== 0"
                     @click="routerDetail(key.id)">
                  <el-row :gutter="10">
                    <div class="lists">
                      <el-col :span="10">
                        <div class="listPic hover_pic" @click="routerDetail(key.id)">
                          <img v-for="pic in key.album.cover_pic" :src="pic.big">
                        </div>
                      </el-col>
                      <el-col :span="14">
                        <div class="listsTitle">
                          {{key.title}}
                        </div>
                        <div class="listsDetail" v-html="key.content">

                        </div>
                        <div class="lints"></div>
                      </el-col>
                    </div>
                  </el-row>
                </div>
              </el-col>
            </el-row>
          </div>
        </el-col>

        <!--员工风采-->
        <el-col :span="8">
          <div class="title" style="color: #6a8dfb;">
            {{staffData.title}}
          </div>
          <div class="staff">
            <div class="staffPic hover_pic" v-for="(key,index) in staffData.data"
                 v-if="index === 0" @click="routerDetail(key.id)">
              <img v-for="pic in key.album.cover_pic" :src="pic.big">
            </div>
            <div class="newsOne" style="border: none" v-for="(key,index) in staffData.data" v-if="index === 0">
              <div class="newsTitle top" @click="routerDetail(key.id)">
                {{key.title}}
              </div>
              <div class="reader">
                <div class="readerDate">{{key.create_time}}</div>
                <div class="readerInfos">
                  <div>
                    <i class="iconfont icon-xiaoxi"></i>{{key.comments_count}}
                  </div>
                  <div>
                    <i class="iconfont icon-dianzan"></i>&nbsp;{{key.favor_num}}
                  </div>
                  <div>
                    <i class="iconfont icon-yanjing"></i>&nbsp;{{key.read_num}}
                  </div>
                </div>
              </div>
              <div class="newsDetail" style="margin-top: 0">
                <span v-html="key.content"></span>
              </div>
              <div class="lints"></div>
              <div class="newsButt">
                <el-button type="primary" size="mini" @click="routerDetail(key.id)">更多</el-button>
              </div>
              <div class="newsList" v-for="(key,index) in staffData.data"
                   v-if="index !== 0">
                <el-row :gutter="10">
                  <div class="lists">
                    <el-col :span="10">
                      <div class="listPic hover_pic" @click="routerDetail(key.id)">
                        <img v-for="pic in key.album.cover_pic" :src="pic.big">
                      </div>
                    </el-col>
                    <el-col :span="14">
                      <div class="listsTitle">
                        {{key.title}}
                      </div>
                      <div class="listsDetail">
                        <span v-html="key.content"></span>
                      </div>
                      <div class="lints" style="border-bottom: 3px solid #6a8dfb"></div>
                    </el-col>
                  </div>
                </el-row>
              </div>
            </div>
          </div>
        </el-col>
      </el-row>

      <el-row :gutter="10">

        <!--客户纪实-->
        <el-col :span="16">
          <el-row :gutter="10" style="margin-left: 0;">
            <el-col :span="12">
              <div class="title" style="color: #58d788;">
                {{cusData.title}}
              </div>
              <div class="staff box">
                <div class="staffPic hover_pic" v-for="(key,index) in cusData.data" v-if="index === 0"
                     @click="routerDetail(key.id)">
                  <img v-for="pic in key.album.cover_pic" :src="pic.big">
                </div>
                <div class="newsOne" style="border: none" v-for="(key,index) in cusData.data" v-if="index === 0">
                  <div class="newsTitle top" @click="routerDetail(key.id)">
                    {{key.title}}
                  </div>
                  <div class="reader">
                    <div class="readerDate">{{key.create_time}}</div>
                    <div class="readerInfos">
                      <div>
                        <i class="iconfont icon-xiaoxi"></i>{{key.comments_count}}
                      </div>
                      <div>
                        <i class="iconfont icon-dianzan"></i>&nbsp;{{key.favor_num}}
                      </div>
                      <div>
                        <i class="iconfont icon-yanjing"></i>&nbsp;{{key.read_num}}
                      </div>
                    </div>
                  </div>
                  <div class="newsDetail" style="margin-top: 0">
                    <span v-html="key.content"></span>
                  </div>
                  <div class="lints" style="border-bottom: 3px solid #58d788"></div>
                  <div class="newsButt">
                    <el-button type="primary" size="mini" @click="routerDetail(key.id)">更多</el-button>
                  </div>
                  <div class="newsList" v-for="(key,index) in cusData.data"
                       v-if="index !== 0" @click="routerDetail(key.id)">
                    <el-row :gutter="10">
                      <div class="lists">
                        <el-col :span="10">
                          <div class="listPic hover_pic" @click="routerDetail(key.id)">
                            <img v-for="pic in key.album.cover_pic" :src="pic.big">
                          </div>
                        </el-col>
                        <el-col :span="14">
                          <div class="listsTitle">
                            {{key.title}}
                          </div>
                          <div class="listsDetail" v-html="key.content">

                          </div>
                          <div class="lints" style="border-bottom: 3px solid #6a8dfb"></div>
                        </el-col>
                      </div>
                    </el-row>
                  </div>
                </div>
              </div>
            </el-col>

            <!--公司生活-->
            <el-col :span="12">
              <div class="title" style="color: #fb4699;">
                {{lifeData.title}}
              </div>
              <div class="companyLife">
                <div class="newsOne" style="border: none;padding-right: 0" v-for="(key,index) in lifeData.data"
                     v-if="index === 0">
                  <div class="newsTitle" @click="routerDetail(key.id)">
                    {{key.title}}
                  </div>
                  <div class="reader">
                    <div class="readerDate">{{key.create_time}}</div>
                    <div class="readerInfos">
                      <div>
                        <i class="iconfont icon-xiaoxi"></i>{{key.comments_count}}
                      </div>
                      <div>
                        <i class="iconfont icon-dianzan"></i>&nbsp;{{key.favor_num}}
                      </div>
                      <div>
                        <i class="iconfont icon-yanjing"></i>&nbsp;{{key.read_num}}
                      </div>
                    </div>
                  </div>
                  <div class="newsPic hover_pic" @click="routerDetail(key.id)">
                    <img v-for="pic in key.album.cover_pic" :src="pic.big">
                  </div>
                  <div class="newsDetail">
                    <span v-html="key.content"></span>
                  </div>
                  <div class="lints"></div>
                  <div class="newsButt">
                    <el-button type="primary" size="mini" @click="routerDetail(key.id)">更多</el-button>
                  </div>
                  <div class="lifePic">
                    <el-row :gutter="10">
                      <el-col :span="8">
                        <div class="hover_pic picList" @click="routerDetail(key.id)">
                          <img v-for="pic in key.album.cover_pic" :src="pic.big">
                        </div>
                      </el-col>
                      <el-col :span="8">
                        <div class="hover_pic picList" @click="routerDetail(key.id)">
                          <img v-for="pic in key.album.cover_pic" :src="pic.big">
                        </div>
                      </el-col>
                      <el-col :span="8">
                        <div class="hover_pic picList" @click="routerDetail(key.id)">
                          <img v-for="pic in key.album.cover_pic" :src="pic.big">
                        </div>
                      </el-col>
                    </el-row>
                  </div>
                </div>
              </div>

            </el-col>
          </el-row>

          <!--人物志-->
          <el-row :gutter="10">
            <el-col>
              <div class="title" style="color: #fb4699;">
                {{figureData.title}}
              </div>
              <div class="lejiaNews box">
                <el-row :gutter="10">
                  <el-col :span="12">
                    <div class="newsOne" v-for="(key,index) in figureData.data" v-if="index === 0">
                      <div class="newsTitle" @click="routerDetail(key.id)">
                        {{key.title}}
                      </div>
                      <div class="reader">
                        <div class="readerDate">{{key.create_time}}</div>
                        <div class="readerInfos">
                          <div>
                            <i class="iconfont icon-xiaoxi"></i>{{key.comments_count}}
                          </div>
                          <div>
                            <i class="iconfont icon-dianzan"></i>&nbsp;{{key.favor_num}}
                          </div>
                          <div>
                            <i class="iconfont icon-yanjing"></i>&nbsp;{{key.read_num}}
                          </div>
                        </div>
                      </div>
                      <div class="personage">
                        <el-row :gutter="10">
                          <el-col :span="8">
                            <div class="personagePic hover_pic" @click="routerDetail(key.id)">
                              <img v-for="pic in key.album.cover_pic" :src="pic.big">
                            </div>
                          </el-col>
                          <el-col :span="8">
                            <div class="personagePic hover_pic" @click="routerDetail(key.id)">
                              <img v-for="pic in key.album.cover_pic" :src="pic.big">
                            </div>
                          </el-col>
                          <el-col :span="8">
                            <div class="personagePic hover_pic" @click="routerDetail(key.id)">
                              <img v-for="pic in key.album.cover_pic" :src="pic.big">
                            </div>
                          </el-col>
                        </el-row>
                      </div>
                      <div class="newsDetail">
                        <span v-html="key.content"></span>
                      </div>
                      <div class="lints"></div>
                      <div class="newsButt">
                        <el-button type="primary" size="mini" @click="routerDetail(key.id)">更多</el-button>
                      </div>
                    </div>
                  </el-col>
                  <el-col :span="12">
                    <div class="peoplePics" v-for="(key,index) in figureData.data" v-if="index !== 0">
                      <el-row :gutter="10">
                        <el-col :span="16">
                          <div class="pics_one hover_pic" @click="routerDetail(key.id)">
                            <img v-for="pic in key.album.cover_pic" :src="pic.big">
                            <!--<div class="shade">-->
                            <!--<div class="positionalInfo">-->
                            <!--<div class="info_name">张琳琳琳</div>-->
                            <!--<div class="info_title">研发部-研发部研发部</div>-->
                            <!--</div>-->
                            <!--</div>-->
                          </div>
                        </el-col>
                        <el-col :span="8">
                          <div class="pics_two hover_pic" @click="routerDetail(key.id)">
                            <img v-for="pic in key.album.cover_pic" :src="pic.big">
                          </div>
                          <div class="pics_two hover_pic" @click="routerDetail(key.id)">
                            <img v-for="pic in key.album.cover_pic" :src="pic.big">
                          </div>
                        </el-col>
                      </el-row>
                      <el-row :gutter="10">
                        <el-col :span="8">
                          <div class="hover_pic pics_two" @click="routerDetail(key.id)">
                            <img v-for="pic in key.album.cover_pic" :src="pic.big">
                          </div>
                        </el-col>
                        <el-col :span="8">
                          <div class="hover_pic pics_two" @click="routerDetail(key.id)">
                            <img v-for="pic in key.album.cover_pic" :src="pic.big">
                          </div>
                        </el-col>
                        <el-col :span="8">
                          <div class="hover_pic pics_two" @click="routerDetail(key.id)">
                            <img v-for="pic in key.album.cover_pic" :src="pic.big">
                          </div>
                        </el-col>
                      </el-row>
                    </div>
                  </el-col>
                </el-row>
              </div>
            </el-col>
            <el-col :span="12"></el-col>
          </el-row>
        </el-col>

        <!--热门导读-->
        <el-col :span="8">
          <div class="title" style="color: #fdca41;">
            {{hotData.title}}
          </div>
          <div class="staff box">
            <div class="staffPic hover_pic" v-for="(key,index) in hotData.data" v-if="index === 0"
                 @click="routerDetail(key.id)">
              <img v-for="pic in key.album.cover_pic" :src="pic.big">
            </div>
            <div class="newsOne" style="border: none" v-for="(key,index) in hotData.data" v-if="index === 0">
              <div class="newsTitle top" @click="routerDetail(key.id)">
                {{key.title}}
              </div>
              <div class="reader">
                <div class="readerDate">{{key.create_time}}</div>
                <div class="readerInfos">
                  <div>
                    <i class="iconfont icon-xiaoxi"></i>{{key.comments_count}}
                  </div>
                  <div>
                    <i class="iconfont icon-dianzan"></i>&nbsp;{{key.favor_num}}
                  </div>
                  <div>
                    <i class="iconfont icon-yanjing"></i>&nbsp;{{key.read_num}}
                  </div>
                </div>
              </div>
              <div class="newsDetail" style="margin-top: 0">
                <span v-html="key.content"></span>
              </div>
              <div class="lints" style="border-bottom: 3px solid #fdca41"></div>
              <div class="newsButt">
                <el-button type="primary" size="mini" @click="routerDetail(key.id)">更多</el-button>
              </div>
              <div class="newsList" v-for="(key,index) in hotData.data"
                   v-if="index !== 0">
                <el-row :gutter="10">
                  <div class="lists">
                    <el-col :span="10">
                      <div class="listPic hover_pic" @click="routerDetail(key.id)">
                        <img v-for="pic in key.album.cover_pic" :src="pic.big">
                      </div>
                    </el-col>
                    <el-col :span="14">
                      <div class="listsTitle" @click="routerDetail(key.id)">
                        {{key.title}}
                      </div>
                      <div class="listsDetail">
                        <span v-html="key.content"></span>
                      </div>
                      <div class="lints" style="border-bottom: 3px solid #fdca41"></div>
                    </el-col>
                  </div>
                </el-row>
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
    name: "purchase",
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
          data: [],
        },
        cusData: {
          title: '',// 客户纪实
          data: [],
        },
        lifeData: {
          title: '',// 公司生活
          data: [],
        },
        hotData: {
          title: '',// 热门导读
          data: [],
        },
        figureData: {
          title: '',// 人物志
          data: [],
        },
        hostData: {
          title: '',// 主轮播
          data: [],
        },
        lessData: {
          title: '',// 次标题1
          data: [],
        },
        lowData: {
          title: '',// 次标题2
          data: [],
        },
      }
    },
    mounted() {
      // dict_id
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

<style scoped lang="scss">
  #converge {
    width: 100%;
    overflow: hidden;

    @font-face {
      font-family: Impact;                        //字体名称
      src: url(../../assets/font/impact-2.ttf);     //字体路径
    }
    @mixin flex {
      display: -webkit-flex;
      display: flex;
    }

    @mixin border_radius($n) {
      -webkit-border-radius: $n;
      -moz-border-radius: $n;
      border-radius: $n;
    }

    @mixin box_sizing($n) {
      height: $n;
      overflow: hidden;
      -webkit-box-sizing: border-box;
      -moz-box-sizing: border-box;
      box-sizing: border-box;
    }

    .scroll_bar {
      &::-webkit-scrollbar-button {
        height: 20px;
        background-color: #ffffff;
      }
    }

    .title {
      font-weight: bold;
      margin-top: 20px;
      &:before {
        content: '|';
        font-size: 16px;
        margin-right: 6px;
      }
    }

    .container {
      .hover_pic {
        overflow: hidden;
        cursor: pointer;
        border: 1px solid #dfe6fb;
        border-radius: 5px;
        box-shadow: 0 2px 4px 0 rgba(64, 158, 255, .12), 0 0 6px 0 rgba(64, 158, 255, .04);
        img:hover {
          transition: all .5s;
          & {
            transform: scale(1.1);
          }
        }
      }
      .banner {
        cursor: pointer;
        border-radius: 5px;
        height: 300px;
        position: relative;
        overflow: hidden;
        img {
          @include border_radius(5px);
          width: 100%;
          height: 100%;
        }
        h3 {
          position: absolute;
          bottom: 12px;
          left: 30px;
          color: #FFFFFF;
          font-size: 20px;
          opacity: 0.75;
          line-height: 20px;
          word-break: break-all;
          width: 90%;
          font-weight: normal;
        }
      }
      .picOne {
        -webkit-box-sizing: border-box;
        -moz-box-sizing: border-box;
        box-sizing: border-box;
        @include flex;
        @include border_radius(5px);
        width: 100%;
        height: 145px;
        img {
          width: 100%;
          height: 100%;
        }
      }
      .lejiaNews {
        @include box_sizing(500px);
        border: 1px solid #dfe6fb;
        @include border_radius(5px);
        padding: 15px;
        margin-top: 10px;
      }
      .lejiaNews.box {
        @include box_sizing(340px);
      }
      .newsOne {
        border-right: 1px solid #e5e5e5;
        padding-right: 15px;
        .newsTitle {
          color: #303133;
          margin-bottom: 17px;
          text-overflow: ellipsis;
          overflow: hidden;
          display: -webkit-box;
          -webkit-line-clamp: 1;
          -webkit-box-orient: vertical;
        }
        .newsTitle.top {
          margin-top: 20px;
        }
        .reader {
          @include flex;
          justify-content: space-between;
          .readerInfos {
            @include flex;
            justify-content: space-between;
            margin-bottom: 14px;
            div {
              margin-left: 10px;
            }
            div:first-of-type {
              padding-top: 1px;
              i {
                vertical-align: middle;
              }
            }
          }
        }
        .newsPic {
          width: 100%;
          height: 254px;
          @include border_radius(5px);
          img {
            width: 100%;
            height: 100%;
          }
        }
        .newsDetail {
          color: #8f9193;
          width: 100%;
          height: 36px;
          line-height: 18px;
          margin-top: 20px;
          text-overflow: ellipsis;
          overflow: hidden;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
        }
        .lints {
          width: 20px;
          border-bottom: 3px solid #fb4699;
          margin-top: 21px;
        }
        .newsButt {
          margin: 24px 0;
        }
      }
      .newsList + .newsList {
        margin-top: 20px;
      }
      .newsList {
        .lists {
          .listPic {
            width: 100%;
            height: 100px;
            img {
              width: 100%;
              height: 100%;
            }
          }
          .listsTitle {
            color: #303133;
            margin-bottom: 20px;
            text-overflow: ellipsis;
            overflow: hidden;
            display: -webkit-box;
            -webkit-line-clamp: 1;
            -webkit-box-orient: vertical;
          }
          .listsDetail {
            width: 100%;
            height: 32px;
            line-height: 16px;
            color: #8f9193;
            text-overflow: ellipsis;
            overflow: hidden;
            display: -webkit-box;
            -webkit-line-clamp: 2;
            -webkit-box-orient: vertical;
          }
          .lints {
            width: 20px;
            border-bottom: 3px solid #fb4699;
            margin-top: 29px;
          }
        }
      }
      .staff.box {
        @include box_sizing(630px);
      }
      .staff {
        @include box_sizing(500px);
        border: 1px solid #dfe6fb;
        @include border_radius(5px);
        padding: 15px;
        margin-top: 10px;
        .staffPic {
          width: 100%;
          height: 144px;
          img {
            width: 100%;
            height: 100%;
          }
        }
      }
      .companyLife {
        @include box_sizing(630px);
        border: 1px solid #dfe6fb;
        @include border_radius(5px);
        padding: 15px;
        margin-top: 10px;
        .lifePic {
          @include flex;
          justify-content: space-between;
          margin-top: 20px;
          .picList {
            width: 100%;
            height: 100px;
            margin-top: 15px;
            img {
              width: 100%;
              height: 100%;
            }
          }
        }
      }
      .personage {
        .personagePic {
          width: 100%;
          height: 100px;
          -webkit-box-sizing: border-box;
          -moz-box-sizing: border-box;
          box-sizing: border-box;
        }
        img {
          width: 100%;
          height: 100%;
        }
      }
      .peoplePics {
        /*padding: 15px 0 15px 15px;*/
        .pics_one {
          width: 100%;
          height: 200px;
          position: relative;
          img {
            width: 100%;
            height: 100%;
          }
          .shade {
            width: 100%;
            height: 100%;
            position: absolute;
            bottom: 0;
            left: 0;
            background: rgba(0, 0, 0, 0.6);

          }
          .positionalInfo {
            position: absolute;
            top: 35%;
            left: 0;
            right: 0;
            bottom: 0;
            text-align: center;
            color: #FFFFFF;
          }
        }
        .pics_two {
          width: 100%;
          height: 90px;
          cursor: pointer;
          margin-bottom: 15px;
          img {
            width: 100%;
            height: 100%;
          }
        }
      }
    }
    @mixin listColor {
      cursor: pointer;
      color: #6ca5ff;
    }
    .container {
      .newsList {
        cursor: pointer;
        .lists {
          .listsTitle:hover {
            @include listColor;
          }
        }
      }
      .newsOne {
        .newsTitle:hover {
          @include listColor;
        }
      }
    }
  }
</style>
