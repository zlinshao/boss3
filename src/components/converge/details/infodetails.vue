<template>
  <div id="newsDetail">
    <el-row>
      <el-col :span="colNum">
        <div style="padding: 20px 17px">
          <div class="newsMain">
            <div class="newsTitle">
              {{formList.title}}
              <el-tag type="success" v-if="formList.top !== null" style="vertical-align: middle;">置顶</el-tag>
              <el-tag type="warning" v-if="formList.fine !==null" style="vertical-align: middle;">精华</el-tag>
            </div>

          </div>
          <div class="userInfo" style="margin-top: 18px">
            <div class="publishInfo">
              <div class="headPic">
                <img :src="staffs.avatar" v-if="staffs && staffs.avatar">
                <img src="../../../assets/images/head.png" v-else>
              </div>
              <div class="publishName">{{staffs && staffs.name}}</div>
              <div class="publishRank">
                <span v-for="key in staffs && staffs.org">
                    <span>{{key && key.name}}</span>
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
          <div  class="post_text ql-editor" id="htmlForEditor">

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
              <img :src="landholder.avatar" v-if="landholder && landholder.avatar">
              <img src="../../../assets/images/head.png" v-else>
            </div>
            <div class="comments">
              <div class="staff_name">
                <div>
                  <span>{{landholder && landholder.name}}</span>&nbsp;&nbsp;
                  <span v-for="key in landholder && landholder.org">
                    <span>{{key && key.name}}</span>
                  </span>
                </div>
              </div>
            </div>
          </div>

          <el-form size="mini">
            <el-form-item>
              <el-input type="textarea" :rows="3" v-model="addContent" placeholder="请输入评论内容"></el-input>
            </el-form-item>
            <!--<span  v-if="landholder.data" style="float: left">{{landholder.data.signature && landholder.data.signature.content}}</span>-->
            <el-form-item>
              <div class="submitButt">
                <el-button type="success" size="mini" @click="addReply(formList.id)">发表</el-button>
              </div>
            </el-form-item>
          </el-form>

          <div class="commentOn" v-for="key in commentOn">
            <div class="portrait">
              <img :src="key.staffs.avatar" v-if="key && key.staffs && key.staffs.avatar">
              <img src="../../../assets/images/head.png" v-else>
            </div>
            <div class="comments">
              <div class="staff_name">
                <div>
                  <span>{{key.staffs && key.staffs.name}}</span>&nbsp;&nbsp;
                  <span v-for="item in key && key.staffs && key.staffs.org">
                    <span class="staffBefore">{{item && item.name}}</span>
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
          <div class="title">热门导读</div>
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
               <span v-for="pic in key && key.album && key.album.cover_pic">
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

      <!--<div v-show="loading" class="loadingDiv">-->
        <!--<img src="../../../assets/images/loading1.gif"  style=" width: initial;height: initial;">-->
      <!--</div>-->
    <div class="loadingDiv" v-show="loading">
      <div class="loader">
        <div class="loader-inner pacman">
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
      </div>
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
        cover_pic: {},
        currentPage: 1,
        paging: 0,
        page: 1,
        form: {
          status: 149,
          keywords: '',
          pages: 1,
        },
        hotData: {},
        assistId: false,     //点赞
        loading: false,     //点赞
        query:{},
        ids: '',
        landholder:{}     //个人信息
      }
    },
    created() {
      this.landholder = JSON.parse(localStorage.personal);
      // if(localStorage.getItem('detailHotData')){
      //   this.hotData = JSON.parse(localStorage.getItem('detailHotData'));
      // }
      // if(localStorage.getItem('detailFormList')){
      //   this.formList = JSON.parse(localStorage.getItem('detailFormList'));
      // }
      // if(localStorage.getItem('detailCoverPic')){
      //   this.cover_pic = JSON.parse(localStorage.getItem('detailCoverPic'));
      // }
      // if(localStorage.getItem('detailStaffs')){
      //   this.staffs = JSON.parse(localStorage.getItem('detailStaffs'));
      // }
      this.infoDetail();
    },
    activated() {
      this.infoDetail();
    },
    mounted() {
      // this.infoDetail();
    },
    watch: {
      ids(val) {
        if(val){
          this.loading=true;
        }
      },
      formList(val) {
        if(val){
          this.loading = false;
        }
      }
    },
    methods: {
      infoDetail(){
        //刷新保存
        if(!this.$route.query.ids) {
          this.$router.push({path:"/Infodetails",query:{ids:this.$store.state.article.article_detail.ids,detail:this.$store.state.article.article_detail.detail}});
        }
        this.addRegion();
        let query = this.$route.query;
        this.$store.dispatch('articleDetail',query);
        if (JSON.stringify(query) !== '{}') {
          this.ids = query.ids;
          this.publicDetail(query.ids);
          // if (query.detail === 'port') {
          //   this.isShow = false;
          //   this.colNum = 24;
          // } else {
          this.isShow = true;
          this.colNum = 16;
          // }
        };
      },
      // 详情
      routerDetail(id) {
        this.ids = id;
        this.$router.push({path: '/Infodetails', query: {ids: id, detail: 'converge'}});

        this.$store.dispatch('articleDetail',{ids: id, detail: 'converge'});
        document.body.scrollTop = document.documentElement.scrollTop = 0;
        this.publicDetail(id);
        this.loading = true;
        // setTimeout(() => {
        //   this.loading = false;
        // }, 1000)
      },
      // 热门导读
      addRegion() {
        this.$http.get(this.urls + 'oa/portal/?dict_id=' + 142, {
          params: this.form
        }).then((res) => {
          let title,data = {};
          title = res.data && res.data.data && res.data.data.data && res.data.data.data[0].title;
          data = res.data && res.data.data && res.data.data.data;
          this.hotData = Object.assign({},this.hotData,{title:title,data:data});
          // localStorage.setItem('detailHotData',JSON.stringify(this.hotData));
        });
      },
      // 详情
      publicDetail(id) {
        this.$http.get(this.urls + 'oa/portal/' + id).then((res) => {
          if (res.data.code === '80020') {
            this.formList = res.data.data;
            this.formList = Object.assign({},this.formList,res.data.data);
            // localStorage.setItem('detailFormList',JSON.stringify(this.formList));
            $('#htmlForEditor').html(this.formList.content)
            this.cover_pic = res.data.data && res.data.data.album && res.data.data.album.cover_pic;
            this.cover_pic = Object.assign({},this.cover_pic, res.data.data && res.data.data.album && res.data.data.album.cover_pic);
            // localStorage.setItem('detailCoverPic',JSON.stringify(this.cover_pic));

            this.staffs = res.data.data && res.data.data.staffs && res.data.data.staffs[0];
            this.staffs = Object.assign({},this.staffs, res.data.data && res.data.data.staffs && res.data.data.staffs[0]);
            // localStorage.setItem('detailStaffs',JSON.stringify(this.staffs));
            this.myData(id, 1);
          }
          this.loading = false;
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
          video_file: this.addContent,
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
</script>

<style lang="scss">
  .loader {
    box-sizing: border-box;
    display: flex;
    flex: 0 1 auto;
    flex-direction: column;
    flex-grow: 1;
    flex-shrink: 0;
    flex-basis: 25%;
    max-width: 25%;
    height: 200px;
    align-items: center;
    justify-content: center;
    position: absolute;
    top: 43%;
    left: 50%;
    z-index: 999;
  }
  .pacman {
    position: relative;
  }
  .pacman > div:first-of-type {
    width: 0px;
    height: 0px;
    border-right: 25px solid transparent;
    border-top: 25px solid #6a8dfb;
    border-left: 25px solid #6a8dfb;
    border-bottom: 25px solid #6a8dfb;
    border-radius: 25px;
    -webkit-animation: rotate_pacman_half_up 0.5s 0s infinite;
    animation: rotate_pacman_half_up 0.5s 0s infinite;
    position: relative;
    left: -30px;
  }
  @keyframes rotate_pacman_half_up {
    0% {
      -webkit-transform: rotate(270deg);
      transform: rotate(270deg);
    }
    50% {
      -webkit-transform: rotate(360deg);
      transform: rotate(360deg);
    }
    100% {
      -webkit-transform: rotate(270deg);
      transform: rotate(270deg);
    }
  }
  @keyframes rotate_pacman_half_down {
    0% {
      -webkit-transform: rotate(90deg);
      transform: rotate(90deg);
    }
    50% {
      -webkit-transform: rotate(0deg);
      transform: rotate(0deg);
    }
    100% {
      -webkit-transform: rotate(90deg);
      transform: rotate(90deg);
    }
  }
  @keyframes pacman-balls{
    75% {
      opacity: 0.7;
    }
    100% {
      -webkit-transform: translate(-100px, -6.25px);
      transform: translate(-100px, -6.25px);
    }
  }
  .pacman > div:nth-child(2) {
    width: 0px;
    height: 0px;
    border-right: 25px solid transparent;
    border-top: 25px solid #6a8dfb;
    border-left: 25px solid #6a8dfb;
    border-bottom: 25px solid #6a8dfb;
    border-radius: 25px;
    -webkit-animation: rotate_pacman_half_down 0.5s 0s infinite;
    animation: rotate_pacman_half_down 0.5s 0s infinite;
    margin-top: -50px;
    position: relative;
    left: -30px;
  }
  .pacman > div:nth-child(3), .pacman > div:nth-child(4), .pacman > div:nth-child(5), .pacman > div:nth-child(6) {
    background-color: #6a8dfb;
    width: 15px;
    height: 15px;
    border-radius: 100%;
    margin: 2px;
    width: 10px;
    height: 10px;
    position: absolute;
    -webkit-transform: translate(0, -6.25px);
    -ms-transform: translate(0, -6.25px);
    transform: translate(0, -6.25px);
    top: 25px;
    left: 70px;
  }
  /*<!--.pacman > div:nth-child(2) {-->*/
    /*<!-- -webkit-animation: pacman-balls 1s -0.99s infinite linear;-->*/
    /*<!--animation: pacman-balls 1s -0.99s infinite linear;-->*/
  /*<!--}-->*/
  .pacman > div:nth-child(3) {
    -webkit-animation: pacman-balls 1s -0.66s infinite linear;
    animation: pacman-balls 1s -0.66s infinite linear;
  }
  .pacman > div:nth-child(4) {
    -webkit-animation: pacman-balls 1s -0.33s infinite linear;
    animation: pacman-balls 1s -0.33s infinite linear;
  }
  .pacman > div:nth-child(5) {
    -webkit-animation: pacman-balls 1s 0s infinite linear;
    animation: pacman-balls 1s 0s infinite linear;
  }
  .loadingDiv{
    width: 100%;
    height: 100%;
    /*background: rgba(0, 0, 0, 0.3);*/
    background: rgba(255, 255, 255, 1);
    position: fixed;
    top: 0;
    left: 0;
  }
  .loadingDiv img{
    position: absolute;
    top: 50%;
    left: 50%;
    z-index: 999;
    display: block;
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
      max-width: 100%;
    }
    .zan{
      color: #fb4699;
      animation: color-me-in 1s;
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
    /*.el-loading-mask {*/
      /*.el-loading-spinner {*/
        /*top: 30%;*/
      /*}*/
    /*}*/

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
        /*width: 100%;*/
        /*height: 300px;*/
        overflow: hidden;
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
          width: 40px;
          height: 40px;
          @include border_radius(50%);
        }
      }
      .comments {
        line-height: 24px;
        width: 100%;
        .staff_name {
          color: #579cff;
          @include flex;
          justify-content: space-between;
          .staffBefore + .staffBefore:before {
            content: ' - ';
          }
        }
        .commentContent {
          color: #676767;
        }
      }
      .publishComment {
        @include flex;
        align-items: center;
        margin-bottom: 10px;
      }
      .commentOn {
        padding: 15px;
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
