<template>
  <div>
  <div id="newsDetail">
    <div class="highRanking" >
      <div class="highSearch">
        <el-form :model="form" :inline="true" size="small">
          <el-form-item>
            <el-input v-model="keywords" placeholder="搜索问题" clearable  >
              <el-button @click="searchx()" slot="append"  icon="el-icon-search" ></el-button>
            </el-input>
          </el-form-item>
          <el-form-item>
            <el-button @click="openFlag" style="background-color:#58d788; border-color:#58d788;" type="success" ><i class="el-icon-question"></i>&nbsp;&nbsp;我要提问</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
        <div class="comment_box" v-for="item in questions" :key="item.id">
          <div class="anstitle">{{item.title}}</div>
          <div class="publishComment">
            <div class="portraito">
              <img :src="item.avatar" v-if="item &&item.avatar && item.avatar !='无' && item.avatar !=''">
              <img src="../../../assets/images/head.png" v-else>
            </div>
            <div class="comments">
              <div class="staff_name">
                <div>
                  <span style="color:#83a0fc">{{item && item.name}}</span>&nbsp;&nbsp;
                  <span>
                    <span>{{item && item.role}}</span>
                    <span>{{item.create_time}}</span>
                  </span>

                </div>
              </div>
            </div>
          </div>
          <div class="question">{{item.description}}</div>
          <el-button type="primary" style="margin: 10px 0 20px 10px;" @click="write(item.id)" size="small">写回答</el-button>
          <div class="publishComment" v-show="item.id == answarid">
            <div class="portrait">
              <img :src="landholder.avatar" v-if="landholder && landholder.avatar">
              <img src="../../../assets/images/head.png" v-else>
            </div>
            <div class="comments">
              <div class="staff_name">
                <div>
                  <span>{{landholder && landholder.name}}</span>&nbsp;&nbsp;
                  <span v-for="key in landholder && landholder.role" :key="key.display_name">
                    <span>{{key && key.display_name}}</span>
                  </span>
                </div>
              </div>
            </div>
          </div>

          <el-form size="small" v-show="item.id == answarid">
            <el-form-item>
              <el-input type="textarea" :rows="3" v-model="content" placeholder="请输入答案内容"></el-input>
            </el-form-item>
            <el-form-item>
              <div class="submitButt">
                <el-button type="success" size="small" @click="addReply(item.id)">发表</el-button>
              </div>
            </el-form-item>
          </el-form>

          <div style="height:50px; color:#83a0fc; line-height:50px; margin:0 10px;">
            <span style="float:left;">{{item.answer.length}}条回答</span>
            <span v-if="item.id != yFlag && item.answer.length >2" @click="islookFlag(item.id)" style="cursor: pointer;float:right; margin-right:6px;">全部显示</span>
          </div>
          <div v-for="(key,index) in item.answer" v-if="item.id == yFlag || index<2 " :key="key.id">
          <div class="commentOn" >
              <div class="portrait">
                <img :src="key.avatar" v-if="key && key.avatar">
                <img src="../../../assets/images/head.png" v-else>
              </div>
              <div class="comments">
                <div class="staff_name">
                  <div>
                    <span>{{key.staff}}</span>&nbsp;&nbsp;
                      <span class="staffBefore">{{key && key.role}}</span>&nbsp;&nbsp;
                    <span>{{key.create_time}}</span>
                  </div>
                  <div @click="openpy(key.id)" style="cursor: pointer;">
                    <i class="iconfont icon-xinxi"></i>
                    <span class="infopy">评论（{{key.comments.length}}）</span>
                  </div>
                </div>
                <div class="commentContent">
                  {{key.content}}
                </div>
              </div>
          </div>
            <div v-for="keyx in key.comments" :key="keyx.id" v-show="pinglunId == key.id">
              <div class="commentOn" style="width:94%;margin-left:4%;" >
                <div class="portrait">
                  <img :src="keyx.avatar" v-if="keyx && keyx.avatar">
                  <img src="../../../assets/images/head.png" v-else>
                </div>
                <div class="comments">
                  <div class="staff_name">
                    <div>
                      <span>{{keyx.staff}}</span>&nbsp;&nbsp;
                        <span class="staffBefore">{{keyx.role}}</span>&nbsp;&nbsp;
                      <span>{{keyx.create_time}}</span>
                    </div>
                  </div>
                  <div class="commentContent">
                    {{keyx.content}}
                  </div>
                </div>
              </div>

            </div>
              <div class="publishComment" v-show="pinglunId == key.id" style="width:92%;margin-left:8%;">
                <div class="portrait">
                  <img :src="landholder.avatar" v-if="landholder && landholder.avatar">
                  <img src="../../../assets/images/head.png" v-else>
                </div>
                <div class="comments">
                  <div class="staff_name">
                    <div>
                      <span>{{landholder && landholder.name}}</span>&nbsp;&nbsp;
                      <span v-for="key in landholder && landholder.role" :key="key.display_name">
                        <span>{{key && key.display_name}}</span>
                      </span>
                    </div>
                  </div>
                </div>
              </div>
               <el-form size="small" style="width:92%;margin-left:8%;" v-show="pinglunId == key.id">
                  <el-form-item>
                    <el-input type="textarea" :rows="2" v-model="addContent" placeholder="请输入评论内容"></el-input>
                  </el-form-item>
                  <el-form-item>
                    <div class="submitButt">
                      <el-button type="success" size="small" @click="addChatReply(item.id,key.id)">发表</el-button>
                    </div>
                  </el-form-item>
              </el-form>
          </div>
        </div>
          <div class="block pages" v-if="paging > 14" >
            <el-pagination
              @size-change="handleSizeChange"
              @current-change="search"
              :current-page="currentPage"
              :page-size="15"
              layout="total, prev, pager, next, jumper"
              :total="paging">
            </el-pagination>
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
      <div id="faleDialog">
      <el-dialog :close-on-click-modal="false" :visible.sync="faleDialog" style="margin-top: 4vh;" title="我要提问" width="38%">
        <span style="color:#409EFF;font-size:14px;">写下你的问题</span>
        <div style="margin:5px 0;">描述精确的问题更易得到解答</div>
        <el-input v-model="form.title" placeholder="问题标题"></el-input>
        <span style="color:#409EFF;font-size:14px; margin: 10px 0 5px 0; display:block;">问题描述</span>
        <el-input v-model="form.description" type="textarea" placeholder="问题背景、条件等信息"></el-input>
        <div style="margin:10px 0;">
        <el-checkbox v-model="anonymous" >匿名问题</el-checkbox>&nbsp;
        </div>
        <div style="border-top:1px #eee solid">
          <el-button @click="submitque" type="primary" style="margin-top:30px;margin-left:40%;width:126px; height:32px;background-color:#6a8dfb; border-color:#6a8dfb; line-height:0px;">提交问题</el-button>
        </div>
      </el-dialog>
    </div>
    </div>
</template>

<script>
export default {
  name: "infodetails",
  data() {
    return {
      urls: globalConfig.server,
      isShow: false,
      islook: false,
      pinglun: false,
      yFlag: 0,
      showlen: 1,
      addContent: "",
      commentOn: [],
      showlen: 1,
      currentPage: 1,
      faleDialog: false,
      paging: 0,
      questions: [],
      page: 1,
      keywords: "",
      form: {
        title: "",
        description: "",
        is_anonymous: 0,
        limit: 4,
        pages: 1
      },
      anonymous: "false",
      loading: false, //点赞
      landholder: {}, //个人信息
      answarid: "", // 问题编号ID
      content: "", //回答内容
      pinglunId: "" //评论编号ID
    };
  },
  created() {

  },

  mounted() {
    this.myData(1);
    this.landholder = JSON.parse(localStorage.personal);
  },
  watch: {
    keywords(val){
      console.log(val)
      if(val == ""){
        this.myData(1);
      }
    }
  },
  methods: {
    //我要提问
    openFlag() {
      this.faleDialog = true;
    },
    //写回答
    write(id) {
      this.isShow = !this.isShow;
      this.answarid = id;
    },
    //显示所有回答
    islookFlag(y) {
      this.pinglun = !this.pinglun;
      this.yFlag = y;
    },

    //显示所有评论
    openpy(id) {
      this.islook = !this.islook;
      this.pinglunId = id;
    },
    search(val) {
      this.myData(val);
    },
    searchx() {
      this.myData(1);
    },
    myData(val) {
      this.page = val;
      this.loading = true;
      this.$http
        .get(this.urls + "ans/list", {
          params: {
            page: this.page,
            limit: 15,
            keywords: this.keywords
          }
        })
        .then(res => {
          this.loading = false;
          if (res.data.code === "199200") {
            this.questions = res.data.data.data;
            this.paging = res.data.data.count;
          } else {
            this.questions = [];
            this.paging = 0;
          }
        });
    },
    //提问
    submitque() {
      if (this.anonymous == true) {
        this.form.is_anonymous = 1;
      } else {
        this.form.is_anonymous = 0;
      }
      this.$http
        .post(this.urls + "ans/insert", {
          title: this.form.title,
          description: this.form.description,
          is_anonymous: this.form.is_anonymous
        })
        .then(res => {
          if (res.data.code === "199200") {
            this.faleDialog = false;
            this.form.title = "";
            this.form.description = "";
            this.anonymous = false;
            this.$notify({
              title: "成功",
              message: res.data.msg,
              type: "success"
            });
            this.myData(1);
          } else {
            this.$notify({
              title: "警告",
              message: res.data.msg,
              type: "warning"
            });
          }
        });
    },
    // 回答
    addReply(id) {
      this.$http
        .post(this.urls + "ans/comment", {
          obj_id: id,
          content: this.content
        })
        .then(res => {
          if (res.data.code === "199200") {
            this.myData(1);
            this.$notify({
              title: "成功",
              message: res.data.msg,
              type: "success"
            });
            this.answarid = "";
            this.content = "";
          } else {
            this.$notify({
              title: "警告",
              message: res.data.msg,
              type: "warning"
            });
          }
        });
    },

    //评论
    addChatReply(itemId, keyId) {
      this.$http
        .post(this.urls + "ans/comment", {
          obj_id: itemId,
          content: this.addContent,
          parent_id: keyId
        })
        .then(res => {
          if (res.data.code === "199200") {
            this.myData(1);
            this.$notify({
              title: "成功",
              message: res.data.msg,
              type: "success"
            });
            this.addContent = "";
          } else {
            this.$notify({
              title: "警告",
              message: res.data.msg,
              type: "warning"
            });
          }
        });
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
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
    border: 1px #eee solid;
    border-radius: 5px;
    margin-bottom: 15px;
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
    .portraito {
      margin-right: 20px;
      min-width: 50px;
      max-width: 50px;
      min-height: 50px;
      max-height: 50px;
      img {
        width: 50px;
        height: 50px;
        @include border_radius(50%);
      }
    }
    .comments {
      line-height: 24px;
      width: 100%;
      .staff_name {
        @include flex;
        justify-content: space-between;
        .staffBefore + .staffBefore:before {
          content: " - ";
        }
        span {
          margin-right: 10px;
        }
        .infopy {
          margin: -2px 4px 0 0;
          float: right;
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
      text-indent: 10px;
    }
    .commentOn {
      padding: 15px;
      width: 97%;
      margin-left: 2%;
      border-top: 1px solid #eeeeee;
      @include flex;
      align-items: center;
    }
    .anstitle {
      font-size: 20px;
      line-height: 60px;
      font-weight: 500;
      color: #606266;
      text-indent: 10px;
    }
    .question {
      font-size: 16px;
      margin: 10px 10px;
    }
  }
  .highRanking {
    margin-top: 10px;
  }
}
</style>
