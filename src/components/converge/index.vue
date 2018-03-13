<template>
  <div id="converge">
    <div class="convergeTop">
      <el-row>
        <el-col :span="16">
          <div class="topLeft">
            <img src="../../assets/images/yuangong2.png" alt="">
            <div></div>
          </div>
        </el-col>
        <el-col :span="8">
          <div class="topRight">
            <div class="a">
              <h1 class="rightA">
                <img src="../../assets/images/yuangong1.png" alt="">
              </h1>
              <h2>
                <img src="../../assets/images/yuangong1.png" alt="">
              </h2>
            </div>
            <div>
              <h2 class="rightA">
                <img src="../../assets/images/yuangong2.png" alt="">
              </h2>
              <h1>
                <img src="../../assets/images/yuangong2.png" alt="">
              </h1>
            </div>
          </div>
        </el-col>
      </el-row>
    </div>

    <div class="convergeMain">
      <el-row>
        <el-col :span="16" class="hotRead">
          <div class="title">
            <span></span>热门导读
          </div>
          <el-row class="elPadding">
            <el-col :span="12">
              <div class="mainLeft">
                <div class="headline">范德萨范德萨范德萨发犯得上发</div>
                <div class="titleTime">
                  <span>0000-00-00</span>
                  <span>
                    <i class="el-icon-view"></i>123
                    <i class="el-icon-view"></i>123
                    <i class="el-icon-view"></i>123
                  </span>
                </div>
                <div class="titleImg">
                  <img src="" alt="">
                </div>
                <div class="titleMain text">电话发卡号发大师傅立刻的撒可怜见发发的火山口发号施令的卡发和空间的身份空间的萨芬看就是大海口警方斯达克警方刷点卡积分和卡拉
                </div>
                <h6></h6>
                <div style="margin-top: 20px">
                  <el-button type="primary" size="mini">更多</el-button>
                </div>
              </div>
            </el-col>
            <el-col :span="12">
              <div class="mainRight">
                <div class="a" v-for="key in 4">
                  <div>
                    <img src="" alt="">
                  </div>
                  <div>
                    <p class="headline">发货的款式反动势力咖啡了范德萨范德萨范德萨范德萨斯大林</p>
                    <span class="titleMain">发货的款式反动势回fdsfdsafsdaf复可见萨芬开绿灯撒加快了发动机是咖啡力咖啡了斯大林
                    </span>
                    <h6></h6>
                  </div>
                </div>
              </div>
            </el-col>
          </el-row>
        </el-col>
        <el-col :span="8">
          <div class="title">
            员工广场
          </div>
          <div>
            
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

<style scoped lang="scss">
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
    border: 1px solid #F4F6FD;
    @include border_radius(6px);
  }

  @mixin text_overflow($n) {
    display: -webkit-box;
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;
    -webkit-line-clamp: $n;
    line-clamp: $n;
  }

  $color: #409EFF;
  img {
    width: 100%;
    height: 100%;
  }

  #converge {
    h6 {
      margin: 0;
      width: 20px;
      border: 2px solid red;
      @include border_radius(10px);
    }

    .title {
      color: #409EFF;
      padding: 10px;
      opacity: .7;
      font-weight: bold;
      &:before{
        border-radius: 2px;
        margin-right: 8px;
        background: #409EFF;
        border-left: 1px solid #409EFF;
        content: '|';
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
    .titleMain {
      @include text_overflow(2);
      color: #aaaaaa;
    }
    .titleMain.text {
      margin: 20px 0 20px;
    }
    .titleImg {
      cursor: pointer;
      height: 240px;
      background: $color;
    }
    .titleTime {
      @include flex;
      margin: 20px 0 15px;
      justify-content: space-between;
      span {
        i {
          padding: 0 2px 0 10px;
        }
      }
    }
    .elPadding {
      @include border_1;
      padding: 12px 10px;
    }
    .convergeTop {
      .topLeft {
        position: relative;
        height: 270px;
        margin-right: 10px;
        overflow: hidden;
      }
      .topRight {
        div {
          @include flex;
          height: 130px;
          h1, h2 {
            margin: 0;
            width: 49%;
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
      .hotRead {
        .elPadding {
          height: 470px;
          overflow: hidden;
          .mainLeft {
            padding-right: 10px;
            margin-right: 10px;
            border-right: 1px solid #F4F6FD;
          }
          .mainRight {
            .a {
              margin-bottom: 15px;
              height: 100px;
              cursor: pointer;
              @include flex;
              div:first-child {
                min-width: 160px;
                background: #000;
                margin-right: 12px;
              }
              div:last-child {
                width: 100%;
                @include flex;
                flex-direction: column;
                justify-content: space-between;
                p {
                  margin: 0;
                  color: #101010;
                  @include text_overflow(1);
                }
              }
            }
          }
        }
      }
    }
  }
</style>
