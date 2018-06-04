<template>
  <div>
    <div id="newsDetail">
      <div class="highRanking">
        <div class="highSearch">
          <el-form :model="form" :inline="true" size="small">
            <el-form-item>
              <el-input v-model="form.search" placeholder="搜索问题" @keyup.enter.native="searchx" clearable>
                <el-button @click="searchx" slot="append" icon="el-icon-search"></el-button>
              </el-input>
            </el-form-item>
            <el-form-item>
              <el-button @click="openFlag" style="background-color:#58d788; border-color:#58d788;" type="success"><i
                class="el-icon-question"></i>&nbsp;&nbsp;我要提问
              </el-button>
            </el-form-item>
          </el-form>
        </div>
      </div>
      <div class="comment_box" v-for="(item,index) in questions" :key="item.id">
        <div class="anstitle">{{item.title}}</div>
        <div class="publishComment">
          <div class="portraito">
            <img :src="item.asker.avatar" v-if="item && item.asker && item.asker.avatar && !item.is_anonymous">
            <img src="../../../assets/images/head.png" v-else>
          </div>
          <div class="comments">
            <div class="staff_name">
              <div>
                <span v-if="!item.is_anonymous" style="color:#83a0fc">{{item && item.asker && item.asker.name}}</span>&nbsp;&nbsp;
                <span v-if="item.is_anonymous">匿名</span>
                <span v-if="!item.is_anonymous">
                  <span v-if="item && item.asker && item.asker.org.length>0" v-for="v in item.asker.org">&nbsp;{{v.name}}&nbsp;</span>
                  —
                  <span v-if="item && item.asker && item.asker.role.length>0" v-for="v in item.asker.role">&nbsp;{{v.display_name}}&nbsp;</span>
                  <span>{{item.create_time}}</span>
                </span>
                <span v-if="item.is_anonymous">
                  <span>{{item.create_time}}</span>
                </span>
              </div>
            </div>
          </div>
        </div>
        <div class="question">{{item.description}}</div>
        <el-button type="primary" style="margin: 10px 0 20px 10px;" @click="write(item.id)" size="small">写回答
          <i class="el-icon-arrow-down" v-if="!answerId"></i>
          <i class="el-icon-arrow-up" v-if="answerId"></i>
        </el-button>
        <div class="publishComment" v-show="item.id == answerId">
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
        <el-form size="small" v-show="item.id == answerId">
          <el-form-item>
            <el-input type="textarea" :rows="3" v-model="content" placeholder="请输入回答内容"></el-input>
          </el-form-item>
          <el-form-item>
            <div class="submitButt">
              <el-button type="success" size="small" @click="addReply(item.id)">发表</el-button>
            </div>
          </el-form-item>
        </el-form>

        <div style="height:50px; color:#83a0fc; line-height:50px; margin:0 10px;">
          <span style="float:left;">{{item.answers_count}}条回答</span>
          <span @click="lookAll(item.id)" v-if="item.answers_count>1 && answerDetail.length<1"
                style="cursor: pointer;float:right; margin-right:6px;">全部显示</span>

          <div style="height:50px; color:#83a0fc; line-height:50px; margin:0px 10px;"
               v-if="answerIdShow==item.id && answerDetail.length>1">
            <span @click="answerDetail=[]"
                  style="cursor: pointer;float:right; margin-right:6px;">收起</span>
          </div>
        </div>
        <div style="background: #f4f6fc;border-radius: 8px;">
          <div class="commentOn" v-if="item && item.first_answer && item.first_answer.staff && item.first_answer">
            <div class="portrait">
              <img :src="item.first_answer.staff.avatar" v-if="item.first_answer.staff.avatar">
              <img src="../../../assets/images/head.png" v-else>
            </div>
            <div class="comments">
              <div class="staff_name">
                <div>
                  <span>{{item.first_answer.staff.name}}</span>&nbsp;&nbsp;
                  <span class="staffBefore" v-if="item.first_answer.staff.org.length>0"
                        v-for="v in item.first_answer.staff.org">&nbsp;{{v.name}}&nbsp;</span>—
                  <span v-if="item.first_answer.staff.role.length>0" v-for="v in item.first_answer.staff.role">&nbsp;{{v.display_name}}&nbsp;</span>
                  <span>{{item.first_answer.create_time}}</span>
                </div>
                <div @click="openComment(item.first_answer.id)" style="cursor: pointer;">
                  <i class="iconfont icon-xinxi"></i>
                  <span class="infopy">评论（{{item.first_answer && item.first_answer.comments_count}}）</span>
                </div>
              </div>
              <div class="commentContent">
                {{item.first_answer.content}}
              </div>
            </div>
          </div>
          <div v-show="commentList" v-if="item.first_answer.id===commentId">
            <el-form size="small" style="margin-left: 4%;width: 94%;">
              <el-form-item>
                <el-input type="textarea" :rows="3" v-model="commentContent" placeholder="请输入评论内容"></el-input>
              </el-form-item>
              <el-form-item>
                <div class="submitButt">
                  <el-button type="success" size="small" @click="addChatReply(item.first_answer.id)">评论</el-button>
                </div>
              </el-form-item>
            </el-form>
            <div v-for="comment in commentDetail" :key="comment.id" v-if="item.first_answer.id===commentId">
              <div class="commentOn" style="width:94%;margin-left:4%;">
                <div class="portrait">
                  <img :src="comment.staff.avatar" v-if="comment && comment.staff && comment.staff.avatar">
                  <img src="../../../assets/images/head.png" v-else>
                </div>
                <div class="comments">
                  <div class="staff_name">
                    <div>
                      <span>{{comment.staff.name}}</span>&nbsp;&nbsp;
                      <span class="staffBefore" v-if="comment.staff.org.length>0" v-for="v in comment.staff.org">&nbsp;{{v.name}}&nbsp;</span>—
                      <span v-if="comment.staff.role.length>0"
                            v-for="v in comment.staff.role">&nbsp;{{v.display_name}}&nbsp;</span>
                      <span>{{comment.create_time}}</span>
                    </div>
                  </div>
                  <div class="commentContent">
                    {{comment.content}}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div v-for="(value,index) in answerDetail"
               v-if="answerDetail.length> 0 && answerIdShow==item.id && index!=0">
            <div class="commentOn">
              <div class="portrait">
                <img :src="value.staff.avatar" v-if="value.staff.avatar">
                <img src="../../../assets/images/head.png" v-else>
              </div>
              <div class="comments">
                <div class="staff_name">
                  <div>
                    <span>{{value.staff.name}}</span>&nbsp;&nbsp;
                    <span class="staffBefore" v-if="value.staff.org.length>0" v-for="v in value.staff.org">&nbsp;{{v.name}}&nbsp;</span>—
                    <span v-if="value.staff.role.length>0"
                          v-for="v in value.staff.role">&nbsp;{{v.display_name}}&nbsp;</span>
                    <span>{{value.create_time}}</span>
                  </div>
                  <div @click="openComment2(value.id, index)" style="cursor: pointer;">
                    <i class="iconfont icon-xinxi"></i>
                    <span class="infopy">评论（{{value.comments_count}}）</span>
                  </div>
                </div>
                <div class="commentContent">
                  {{value.content}}
                </div>
              </div>
            </div>
            <div v-show="commentList2">
              <el-form size="small" style="margin-left: 4%;width: 94%;" v-if="value.id==commentId">
                <el-form-item>
                  <el-input type="textarea" :rows="3" v-model="commentContent" placeholder="请输入评论内容"></el-input>
                </el-form-item>
                <el-form-item>
                  <div class="submitButt">
                    <el-button type="success" size="small" @click="addChatReply(value.id)">评论</el-button>
                  </div>
                </el-form-item>
              </el-form>
              <div v-for="(comment,kk) in commentDetail" :key="comment.id" v-if="value.id==commentId">
                <div class="commentOn" style="width:94%;margin-left:4%;">
                  <div class="portrait">
                    <img :src="comment.staff.avatar" v-if="comment && comment.staff && comment.staff.avatar">
                    <img src="../../../assets/images/head.png" v-else>
                  </div>
                  <div class="comments">
                    <div class="staff_name">
                      <div>
                        <span>{{comment.staff.name}}</span>&nbsp;&nbsp;
                        <span class="staffBefore" v-if="comment.staff.org.length>0" v-for="v in comment.staff.org">&nbsp;{{v.name}}&nbsp;</span>—
                        <span v-if="comment.staff.role.length>0"
                              v-for="v in comment.staff.role">&nbsp;{{v.display_name}}&nbsp;</span>
                        <span>{{comment.create_time}}</span>
                      </div>
                    </div>
                    <div class="commentContent">
                      {{comment.content}}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <!--<div style="height:50px; color:#83a0fc; line-height:50px; margin:30px 10px;" v-if="answerIdShow">-->
          <!--<span @click="answerDetail=[];myData(1);"-->
          <!--style="cursor: pointer;float:right; margin-right:6px;">收起</span>-->
          <!--</div>-->
        </div>
      </div>
      <div style="height: 750px;" class="no_data" v-if="questions.length<1">
        <div style="position: absolute;top: 45%;left: 38%;">
          <img src="../../../assets/images/noData.png" style="float: left;"/>
          <div style="float: left;margin-left: 30px;margin-top: 50px;">
            <img src="../../../assets/images/sorry.png">
            <div style="color: #6a8dfb;position: relative;margin-top: 20px;margin-left: 10px;">抱歉，暂无数据~~</div>
          </div>
        </div>
      </div>
      <div class="block pages" v-if="paging > 4">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="form.page"
          :page-size="form.limit"
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
      <el-dialog :close-on-click-modal="false" :visible.sync="faleDialog" style="margin-top: 4vh;" title="我要提问"
                 width="38%">
        <span style="color:#409EFF;font-size:14px;"><span style="color: red;">* </span>写下你的问题</span>
        <div style="margin:5px 0;">描述精确的问题更易得到解答</div>
        <el-input v-model="form.title" placeholder="问题标题"></el-input>
        <span style="color:#409EFF;font-size:14px; margin: 10px 0 5px 0; display:block;"><span
          style="color: red;">* </span>问题类型</span>
        <el-select v-model="form.type" placeholder="请选择" clearable>
          <el-option v-for="item in messageCenterCategory" :key="item.id" :label="item.dictionary_name"
                     :value="item.id">{{item.dictionary_name}}
          </el-option>
        </el-select>
        <span style="color:#409EFF;font-size:14px; margin: 10px 0 5px 0; display:block;"><span
          style="color: red;">* </span>问题描述</span>
        <el-input v-model="form.description" type="textarea" placeholder="问题背景、条件等信息"></el-input>
        <div style="margin:10px 0;">
          <el-checkbox v-model="form.is_anonymous">匿名问题</el-checkbox>&nbsp;
        </div>
        <div style="border-top:1px #eee solid">
          <el-button @click="confirmAdd" type="primary"
                     style="margin-top:30px;margin-left:40%;width:126px; height:32px;background-color:#6a8dfb; border-color:#6a8dfb; line-height:0px;" :disabled="disabledBtn">
            提交问题
          </el-button>
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
        faleDialog: false,
        paging: 0,
        questions: [],
        form: {
          search: '',
          title: '',
          description: '',
          is_anonymous: false,
          type: '',
          limit: 4,
          page: 1
        },
        anonymous: 'false',
        loading: false, //点赞
        landholder: {}, //个人信息
        answerId: '', // 问题编号ID
        content: '', //回答内容
        commentId: '', //评论编号ID
        messageCenterCategory: [],
        answerDetail: [],
        commentDetail: [],
        commentContent: '',
        commentList: false,
        commentList2: false,
        answerIdShow: '',
        disabledBtn: false,
      };
    },
    mounted() {
      this.myData(1);
      this.getDictionary();
      this.landholder = JSON.parse(localStorage.personal);
    },
    watch: {
      'form.search': {
        handler(val, OldVal) {
          if (!val) {
            this.myData(1);
          }
        }
      },
      faleDialog(val) {
        if (!val) {
          this.form.title = '';
          this.form.description = '';
          this.form.type = '';
          this.form.is_anonymous = false;
        }
      },
    },
    methods: {
      getDictionary() {
        this.dictionary(678).then((res) => {
          this.messageCenterCategory = res.data;
        });
      },
      //我要提问
      openFlag() {
        this.faleDialog = true;
      },
      //写回答
      write(id) {
        if (id === this.answerId) {
          this.answerId = '';
          return;
        }
        this.answerId = id;
      },
      //显示所有回答
      lookAll(id) {
        this.answerIdShow = id;
        // for (var i = 0; i < this.questions.length; i++) {
        //   if (this.questions[i].id === id) {
        //     this.questions[i].first_answer = {};
        //   }
        // }
        this.$http.get(globalConfig.server + 'qa/front/answer?question_id=' + id).then((res) => {
          if (res.data.code === '70310') {
            this.answerDetail = res.data.data;
          } else {
            this.answerDetail = [];
            this.$notify({
              title: "警告",
              message: res.data.msg,
              type: "warning"
            });
          }
        });
      },

      //显示所有评论
      openComment(id) {
        if (this.commentList === false) {
          this.commentId = id;
          this.commentList = true;
          this.$http.get(globalConfig.server + 'qa/front/comment?answer_id=' + id).then((res) => {
            if (res.data.code === '70410') {
              this.commentDetail = res.data.data;
            } else {
              this.commentDetail = [];
              this.$notify({
                title: "警告",
                message: res.data.msg,
                type: "warning"
              });
            }
          });
        } else {
          this.commentList = false;
        }

      },//显示所有评论
      openComment2(id) {
        if (this.commentList2 === false) {
          this.commentId = id;
          this.commentList2 = true;
          this.$http.get(globalConfig.server + 'qa/front/comment?answer_id=' + id).then((res) => {
            if (res.data.code === '70410') {
              this.commentDetail = res.data.data;
            } else {
              this.commentDetail = [];
              this.$notify({
                title: "警告",
                message: res.data.msg,
                type: "warning"
              });
            }
          });
        } else {
          this.commentList2 = false;
        }

      },
      search(val) {
        this.myData(val);
      },
      searchx() {
        this.myData(1);
      },
      myData(val) {
        // this.answerIdShow = '';
        this.form.page = val;
        this.loading = true;
        this.$http.get(this.urls + "qa/front/question", {params: this.form}).then(res => {
          this.loading = false;
          if (res.data.code === "70210") {
            this.questions = res.data.data;
            this.paging = res.data.meta.num;
            if(this.answerIdShow){
              this.lookAll(this.answerIdShow);
            }
          } else {
            this.questions = [];
            this.paging = 0;
            this.$notify({
              title: "警告",
              message: res.data.msg,
              type: "warning"
            });
          }
        });
      },
      //提问
      confirmAdd() {
        this.disabledBtn = true;
        this.$http.post(this.urls + "qa/front/question", this.form).then(res => {
          if (res.data.code === "70210") {
            this.faleDialog = false;
            this.form.title = '';
            this.form.description = '';
            this.form.type = '';
            this.form.is_anonymous = false;
            this.$notify({
              title: "成功",
              message: res.data.msg,
              type: "success"
            });
            this.disabledBtn = false;
            this.myData(1);
          } else {
            this.disabledBtn = false;
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
        this.$http.post(this.urls + "qa/front/answer", {question_id: id, content: this.content}).then(res => {
          if (res.data.code === "70310") {
            this.myData(1);
            this.lookAll(id);
            this.$notify({
              title: "成功",
              message: res.data.msg,
              type: "success"
            });
            this.answerId = '';
            this.content = '';
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
      addChatReply(id) {
        this.$http.post(this.urls + "qa/front/comment", {
          answer_id: id,
          content: this.commentContent,
        }).then(res => {
          if (res.data.code === "70410") {
            this.myData(1);
            // this.openComment(id);
            this.$notify({
              title: "成功",
              message: res.data.msg,
              type: "success"
            });
            this.commentContent = '';
            this.$http.get(globalConfig.server + 'qa/front/comment?answer_id=' + id).then((res) => {
              if (res.data.code === '70410') {
                this.commentDetail = res.data.data;
              } else {
                this.commentDetail = [];
              }
            });
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
      },
      handleCurrentChange(val) {
        console.log(`当前页: ${val}`);
        this.form.page = val;
        this.myData(val);
      },
    }
  };
</script>

<style lang="scss">
  .no_data {
    background-image: url('../../../assets/images/404_images/bg_square.png');
  }
  .el-button--primary.is-disabled,
  .el-button--primary.is-disabled:active,
  .el-button--primary.is-disabled:focus,
  .el-button--primary.is-disabled:hover {
    color: #fff !important;
    background-color: #8faafc !important;
    border-color: #8faafc !important;
  }
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
      /*background: #f4f6fc;*/
      /*border: 1px #eee solid;*/
      border-radius: 5px;
      margin-bottom: 15px;
      margin: 15px;
      padding: 10px;
      box-shadow: 0px 0px 5px 0px #6a8dfbbd;
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
        width: 95%;
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
