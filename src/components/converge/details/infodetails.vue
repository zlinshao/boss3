<template>
  <div id="newsDetail" v-loading="loading" ref="detail">
    <el-row>
      <el-col :span="colNum">
        <div style="padding: 20px 17px">
          <div class="newsMain">
            <div class="newsTitle">{{formList.title}}</div>
          </div>
          <div class="userInfo" style="margin-top: 18px">
            <div class="publishInfo">
              <div class="headPic">
                <img :src="staffs.avatar" v-if="staffs.avatar !== ''">
                <img src="../../../assets/images/head.png" v-else>
              </div>
              <div class="publishName">{{staffs.name}}</div>
              <div class="publishRank">
                <span v-for="key in staffs.org">
                    <span>{{key.name}}</span>
                </span>
              </div>
            </div>
            <div class="InfoRight">
              <div class="title"
                   v-if="formList.dict_ids !== '主轮播' && formList.dict_ids !== '次标题1' && formList.dict_ids !== '次标题2'">
                {{formList.dict_ids}}
              </div>
              <div class="title" v-else>乐伽新闻</div>
              <div class="newsDate">{{formList.create_time}}</div>
            </div>
          </div>
          <div class="frontCover">
            <!--<p>封面图</p>-->
            <h1 v-for="key in cover_pic">
              <img :src="pic.uri" v-for="pic in key">
            </h1>
          </div>
          <div id="htmlForEditor">

          </div>

          <div v-if="isShow">
            <div class="lines"></div>
            <div class="readerInfos">
              <div></div>
              <div class="readers">
                <div>
                  <i class="iconfont icon-pinglun"></i>&nbsp;&nbsp;{{formList.comments_count}}
                </div>
                <div class="zan_div">
                  <i class="iconfont icon-zan" :class="{'zan': assistId}" @click="assist()"></i>&nbsp;{{formList.favor_num}}
                </div>
                <div>
                  <i class="el-icon-view"></i>&nbsp;&nbsp;{{formList.read_num}}
                </div>
              </div>
            </div>
            <!--<div class="contents">-->
            <!--<div>-->
            <!--上一篇：轻轻的我走了，正如我轻轻的来；我轻轻的招手，作别西天的云彩-->
            <!--</div>-->
            <!--<div>-->
            <!--下一篇：轻轻的我走了，正如我轻轻的来；我轻轻的招手，作别西天的云彩-->
            <!--</div>-->
            <!--</div>-->
          </div>
        </div>

        <div class="comment_box" v-if="isShow">
          <div class="publishComment">
            <div class="portrait">
              <img :src="staffs.avatar" v-if="staffs.avatar !== ''">
              <img src="../../../assets/images/head.png" v-else>
            </div>
            <div class="comments">
              <div class="staff_name">
                <div>
                  <span>{{staffs.name}}</span>&nbsp;&nbsp;
                  <span v-for="key in staffs.org">
                    <span>{{key.name}}</span>
                  </span>
                </div>
              </div>
            </div>
          </div>

          <el-form size="mini">
            <el-form-item>
              <el-input type="textarea" :rows="3" v-model="addContent" placeholder="请输入评论内容"></el-input>
            </el-form-item>
            <el-form-item>
              <div class="submitButt">
                <el-button type="success" size="mini" @click="addReply(formList.id)">发表</el-button>
              </div>
            </el-form-item>
          </el-form>

          <div class="commentOn" v-for="key in commentOn">
            <div class="portrait">
              <img :src="key.staffs.avatar" v-if="key.staffs.avatar !== null">
              <img src="../../../assets/images/head.png" v-else>
            </div>
            <div class="comments">
              <div class="staff_name">
                <div>
                  <span>{{key.staffs.name}}</span>&nbsp;&nbsp;
                  <span v-for="item in key.staffs.org">
                    <span class="staffBefore">{{item.name}}</span>
                  </span>
                </div>
                <div>
                  {{key.create_time}}
                </div>
              </div>
              <div class="commentContent">
                {{key.content}}
              </div>
            </div>
          </div>

          <div class="block pages" v-if="paging > 11">
            <el-pagination
              @size-change="handleSizeChange"
              @current-change="search"
              :current-page="currentPage"
              :page-size="10"
              layout="total, prev, pager, next, jumper"
              :total="paging">
            </el-pagination>
          </div>
        </div>
      </el-col>

      <!--热门导读-->
      <el-col :span="8" v-if="isShow">
        <div class="ingreat">
          <div class="title">{{hotData.title}}</div>
          <div class="ingreatNews" v-for="(key,index) in hotData.data" v-if="index < 3">
            <div class="ingreat_title" @click="routerDetail(key.id)">{{key.title}}</div>
            <div class="subhead">
              <div class="ingreat_data">{{key.create_time}}</div>
              <div class="readers">
                <div>
                  <i class="iconfont icon-pinglun"></i>&nbsp;&nbsp;{{key.comments_count}}
                </div>
                <div>
                  <i class="iconfont icon-zan"></i>&nbsp;{{key.favor_num}}
                </div>
                <div>
                  <i class="el-icon-view"></i>&nbsp;&nbsp;{{key.read_num}}
                </div>
              </div>
            </div>
            <div class="ingreat_pic" @click="routerDetail(key.id)">
               <span v-for="pic in key.album.cover_pic">
                    <img v-for="p in pic" :src="p.uri">
                  </span>
            </div>
            <div class="ingreat_detail">
              <span v-html="key.content"></span>
            </div>
            <div class="ingreat_butt">
              <el-button type="primary" size="mini" @click="routerDetail(key.id)">更多</el-button>
            </div>
          </div>
        </div>
      </el-col>
    </el-row>
    <div class="return_top">
      <img src="../../../assets/images/置顶.svg" width="50">
    </div>
  </div>
</template>

<script>
  export default {
    name: "infodetails",
    data() {
      return {
        urls: globalConfig.server,
        showUp: '',
        isShow: true,
        colNum: 16,
        htmlForEditor: '',
        formList: {},
        staffs: {},
        addContent: '',
        commentOn: [],
        cover_pic: [],
        currentPage: 1,
        paging: 0,
        page: 1,
        form: {
          status: 149,
          keywords: '',
          pages: 1,
        },
        hotData: [],
        assistId: false,     //点赞
        loading: false,     //点赞
      }
    },
    computed: {
      query(val){
        return this.$store.state.article.article_detail;
      }
    },

    mounted() {
      this.addRegion();
      // let query = this.$route.query;
      if (JSON.stringify(this.query) !== '{}') {
        this.publicDetail(this.query.ids);
        if (this.query.detail === 'port') {
          this.isShow = false;
          this.colNum = 24;
        } else {
          this.isShow = true;
          this.colNum = 16;
        }
      }
    },
    methods: {
      // 详情
      routerDetail(id) {
        this.$router.push({path: '/Infodetails', query: {ids: id, detail: 'converge'}});
        this.$store.dispatch('articleDetailId',id);
        document.body.scrollTop = document.documentElement.scrollTop = 0;
        this.publicDetail(id);
        this.loading = true;
        setTimeout(() => {
          this.loading = false;
        }, 600)
      },
      // 热门导读
      addRegion() {
        this.$http.get(this.urls + 'oa/portal/?dict_id=' + 142, {
          params: this.form
        }).then((res) => {
          this.hotData.title = res.data.data.data[0].dict_ids;
          this.hotData.data = res.data.data.data;
        })
      },
      // 详情
      publicDetail(id) {
        this.$http.get(this.urls + 'oa/portal/' + id).then((res) => {
          if (res.data.code === '80020') {
            this.formList = res.data.data;
            this.cover_pic = res.data.data.album.cover_pic;
            let detail = res.data.data;
            document.getElementById('htmlForEditor').innerHTML = detail.content;
            this.staffs = detail.staffs[0];
            this.myData(id, 1);
          }
        })
      },
      search(val) {
        this.myData(this.formList.id, val);
      },
      myData(id, val) {
        this.page = val;
        this.$http.get(this.urls + 'oa/portal/comment/' + this.formList.id, {
          params: {
            pages: this.page,
          }
        }).then((res) => {
          if (res.data.code === '80090') {
            this.commentOn = res.data.data.data;
            this.paging = res.data.data.count;
          } else {
            this.commentOn = [];
            this.paging = 0;
          }
        })
      },
      // 赞
      assist() {
        this.$http.get(this.urls + 'oa/portal/favor/' + this.formList.id).then((res) => {
          if (res.data.code === '80070') {
            this.publicDetail(this.formList.id);
            this.assistId = true;
            if (this.assistId) {
              this.formList.favor_num++;
            }
          }
        })
      },
      // 回复 /发表
      addReply(id) {
        this.$http.post(this.urls + 'oa/portal/comment', {
          obj_id: this.formList.id,
          content: this.addContent,
          parent_id: id,
        }).then((res) => {
          this.addContent = '';
          if (res.data.code === '80060') {
            this.myData(1);
            this.prompt(res.data.msg, 1);
          } else {
            this.prompt(res.data.msg, 2);
          }
        })
      },
      handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
      },
      prompt(val, stu) {
        if (stu === 1) {
          this.$notify({
            title: '成功',
            message: val,
            type: 'success'
          });
        } else {
          this.$notify({
            title: '警告',
            message: val,
            type: 'warning'
          });
        }
      },
    },
  }
  window.onload = function(){
    $("body").on("click",".return_top",function(){
      document.body.scrollTop = 0;
    });
    $("body").scroll(function() {
      var scrollTop = document.body.scrollTop;
      if(scrollTop > 0){
        $(".return_top").css('display','block');
      }else{
        $(".return_top").css('display','none');
      }
    });
  }
</script>

<style lang="scss">
  .return_top{
    position: fixed;
    right: 35px;
    bottom: 100px;
  }
  .return_top img {
    width: 50px;
    height: 50px;
    background: #fff;
    border-radius: 50%;
    cursor: pointer;
  }
  #newsDetail {
    @mixin flex {
      display: -webkit-flex;
      display: flex;
    }

    @mixin border_radius($n) {
      -webkit-border-radius: $n;
      -moz-border-radius: $n;
      border-radius: $n;
    }
    img {
      width: 100%;
      height: 100%;
    }
    .zan{
      animation: color-me-in 1s;
      color: #fb4699;
    }
    @keyframes color-me-in {
      0% {
        -moz-transform:scale(1,1);
        -webkit-transform:scale(1,1);
        -o-transform:scale(1,1);
      }
      50% {
        -moz-transform:scale(2,2);
        -webkit-transform:scale(2,2);
        -o-transform:scale(2,2);
      }
      100% {
        -moz-transform:scale(1,1);
        -webkit-transform:scale(1,1);
        -o-transform:scale(1,1);
      }
    }
    .el-loading-mask {
      .el-loading-spinner {
        top: 30%;
      }
    }

    .readers {
      div {
        @include flex;
        justify-content: space-between;
        align-items: center;
      }
      div {
        i {
          font-size: 20px;
        }
      }
      div:first-of-type {
        i {
          padding-top: 2px;
        }
      }
    }
    .frontCover {
      h1 {
        width: 100%;
        height: 300px;
      }

    }
    #htmlForEditor {
      margin-top: 18px;
    }

    @include border_radius(5px);
    border: 1px solid #dfe6fb;
    margin-top: 10px;
    /*padding: 20px 17px;*/
    overflow: hidden;
    .newsMain {
      @include flex;
      justify-content: space-between;
      padding-bottom: 10px;
      border-bottom: 1px solid #dfe6fb;
      .newsTitle {
        color: #606266;
        font-size: 24px;
      }
      .newsDate {
        color: #8f9193;
        font-size: 13px;
      }
    }
    .userInfo {
      @include flex;
      justify-content: space-between;
      line-height: 40px;
      .publishInfo {
        @include flex;
        justify-content: space-between;
        font-size: 16px;
        color: #818183;
        .headPic {
          width: 40px;
          height: 40px;
          @include border_radius(50%);
          img {
            width: 100%;
            height: 100%;
            @include border_radius(50%);
          }
        }
        .publishName {
          margin-left: 14px;
        }
        .publishRank {
          margin-left: 16px;
          span {
            span + span:before {
              content: ' - ';
            }
          }
        }
      }
      .InfoRight {
        @include flex;
        justify-content: space-between;
        line-height: 39px;
        .title {
          /*font-size: 16px;*/
          color: #6a8dfb;
          margin-right: 20px;
        }
        .newsDate {
          font-size: 13px;
          color: #929395;
        }
      }
    }

    .lines {
      width: 25px;
      border-bottom: 3px solid #6a8dfb;
      margin-top: 20px;
    }
    .readerInfos {
      @include flex;
      justify-content: space-between;
      width: 100%;
      margin-top: 30px;
      .readers {
        @include flex;
        justify-content: space-between;
      }
      div {
        margin-left: 20px;
        cursor: pointer;
      }
    }
    .contents {
      margin-top: 30px;
      line-height: 25px;
      padding: 30px 0;
      border-top: 1px solid #e5e5e5;
      font-size: 15px;
      color: #464748;
      div {
        cursor: pointer;
      }
    }
    .comment_box {
      background: #F4F6FC;
      padding: 10px;
      .submitButt {
        text-align: right;
      }
      .portrait {
        margin-right: 20px;
        min-width: 40px;
        max-width: 40px;
        min-height: 40px;
        max-height: 40px;
        img {
          @include border_radius(50%);
        }
      }
      .comments {
        line-height: 24px;
        width: 100%;
        .staff_name {
          color: #2d64b3;
          @include flex;
          justify-content: space-between;
          .staffBefore + .staffBefore:before {
            content: ' - ';
          }
        }
        .commentContent {
          color: #000;
        }
      }
      .publishComment {
        @include flex;
        align-items: center;
        margin-bottom: 10px;
      }
      .commentOn {
        padding: 6px;
        border-top: 1px solid #eeeeee;
        @include flex;
        align-items: center;
      }
    }

    /*右边栏*/
    .ingreat {
      margin-top: 66px;
      padding: 20px 17px;
      .title {
        color: #fb4699;
        padding-left: 2px;
        font-weight: bold;
        &:before {
          border-radius: 2px;
          margin-right: 5px;
          border-left: 4px solid #fb4699;
          content: '';

        }
      }

      .ingreatNews {
        .ingreat_title {
          color: #303133;
          margin-top: 28px;
          &:hover {
            cursor: pointer;
            color: #6ca5ff;
          }
        }
        .subhead {
          @include flex;
          justify-content: space-between;
          align-items: center;
          margin-top: 19px;
          font-size: 12px;
          .readers {
            @include flex;
            justify-content: space-between;
          }
          .readers {
            div {
              margin-left: 10px;
            }
            span {
              color: #303133;
            }
          }
        }
        .ingreat_pic {
          width: 100%;
          height: 180px;
          cursor: pointer;
          margin-top: 11px;
          overflow: hidden;
        }
        .ingreat_detail {
          width: 100%;
          height: 35px;
          margin-top: 10px;
          text-overflow: ellipsis;
          overflow: hidden;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
        }
        .ingreat_butt {
          margin-top: 30px;
        }
      }

    }
  }
</style>
