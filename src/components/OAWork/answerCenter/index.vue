<template>
  <div id="newsDetail">
    <div class="highRanking" >
      <div class="highSearch">
        <el-form :inline="true" size="small">
          <el-form-item>
            <el-input placeholder="搜索问题" clearable  >
              <el-button slot="append"  icon="el-icon-search" ></el-button>
            </el-input>
          </el-form-item>
          <el-form-item>
            <el-button style="background-color:#58d788; border-color:#58d788;" type="success" ><i class="el-icon-question"></i>&nbsp;&nbsp;我要提问</el-button>
          </el-form-item>
        </el-form>
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

          <el-form size="small">
            <el-form-item>
              <el-input type="textarea" :rows="3" v-model="addContent" placeholder="请输入评论内容"></el-input>
            </el-form-item>
            <!--<span  v-if="landholder.data" style="float: left">{{landholder.data.signature && landholder.data.signature.content}}</span>-->
            <el-form-item>
              <div class="submitButt">
                <el-button type="success" size="small" @click="addReply(formList.id)">发表</el-button>
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
      showUp: "",
      isShow: true,
      colNum: 16,
      formList: {},
      staffs: {},
      addContent: "",
      commentOn: [],
      cover_pic: {},
      currentPage: 1,
      paging: 0,
      page: 1,
      form: {
        status: 149,
        keywords: "",
        pages: 1
      },
      hotData: {},
      loading: false, //点赞
      query: {},
      ids: "",
      landholder: {} //个人信息
    };
  },
  created() {
    this.landholder = JSON.parse(localStorage.personal);

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
      if (val) {
        this.loading = true;
      }
    },
    formList(val) {
      if (val) {
        this.loading = false;
      }
    }
  },
  methods: {
    infoDetail() {
      this.addRegion();
    },

    // 热门导读
    addRegion() {
      this.$http
        .get(this.urls + "oa/portal/?dict_id=" + 142, {
          params: this.form
        })
        .then(res => {
          let title,
            data = {};
          title =
            res.data &&
            res.data.data &&
            res.data.data.data &&
            res.data.data.data[0].title;
          data = res.data && res.data.data && res.data.data.data;
          this.hotData = Object.assign({}, this.hotData, {
            title: title,
            data: data
          });

        });
    },

    search(val) {
      this.myData(this.formList.id, val);
    },
    myData(id, val) {
      this.page = val;
      this.$http
        .get(this.urls + "oa/portal/comment/" + this.formList.id, {
          params: {
            pages: this.page
          }
        })
        .then(res => {
          if (res.data.code === "80090") {
            this.commentOn = res.data.data.data;
            this.paging = res.data.data.count;
          } else {
            this.commentOn = [];
            this.paging = 0;
          }
        });
    },

    // 回复 /发表
    addReply(id) {
      this.$http
        .post(this.urls + "oa/portal/comment", {
          obj_id: this.formList.id,
          content: this.addContent,
          video_file: this.addContent,
          parent_id: id
        })
        .then(res => {
          this.addContent = "";
          if (res.data.code === "80060") {
            this.myData(1);
            this.prompt(res.data.msg, 1);
          } else {
            this.prompt(res.data.msg, 2);
          }
        });
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    prompt(val, stu) {
      if (stu === 1) {
        this.$notify({
          title: "成功",
          message: val,
          type: "success"
        });
      } else {
        this.$notify({
          title: "警告",
          message: val,
          type: "warning"
        });
      }
    }
  }
};
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
@keyframes pacman-balls {
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
.pacman > div:nth-child(3),
.pacman > div:nth-child(4),
.pacman > div:nth-child(5),
.pacman > div:nth-child(6) {
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
.loadingDiv {
  width: 100%;
  height: 100%;
  /*background: rgba(0, 0, 0, 0.3);*/
  background: rgba(255, 255, 255, 1);
  position: fixed;
  top: 0;
  left: 0;
}
.loadingDiv img {
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

  @keyframes color-me-in {
    0% {
      -moz-transform: scale(1, 1);
      -webkit-transform: scale(1, 1);
      -o-transform: scale(1, 1);
    }
    50% {
      -moz-transform: scale(2, 2);
      -webkit-transform: scale(2, 2);
      -o-transform: scale(2, 2);
    }
    100% {
      -moz-transform: scale(1, 1);
      -webkit-transform: scale(1, 1);
      -o-transform: scale(1, 1);
    }
  }

  @include border_radius(5px);
  border: 1px solid #dfe6fb;
  margin-top: 10px;

  overflow: hidden;

  .comment_box {
    background: #f4f6fc;
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
          content: " - ";
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

  .highRanking{
    margin-top:10px;
  }
}
</style>
