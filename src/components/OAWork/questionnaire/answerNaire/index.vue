<template>
  <div>
    <div id="answerExam">
      <div class="tool">
        <el-row style="width:100%;margin-top:16px;">
          <el-col :span="5" style="margin-left:2%; margin-right:2%">
            <div class="import_questions" style="text-align:left;color:#464748;">
              <div class="qdiv" style="margin-top: 25px;">试卷名称： <span style="color:#6a8dfb;font-size: 18px;">{{paperData.name}}</span>
              </div>
              <div class="qdiv" style="margin-top: 10px;">总题数： <span style="color:#6a8dfb;font-size: 18px;">{{paperData.question_count}}</span>
                题
              </div>
            </div>
          </el-col>
          <!--<el-col :span="5" style="margin-left:2%; margin-right:2%">-->
          <!--<div class="import_questions" style="border: 1px solid #fdca41;box-shadow: 0 0 3px 1px #fdca41;">-->
          <!--<div class="import_left"><span style="float:left; font-size:14px;">总题数</span><i-->
          <!--style="float:right; color:#fdca41;font-size:20px;" class="iconfont icon-shujutu"></i></div>-->
          <!--<div><span style="font-size:70px; color:#fdca41">{{paperData.question_count}}</span>题</div>-->
          <!--</div>-->
          <!--</el-col>-->
        </el-row>
      </div>
      <div class="main">
        <div v-for="(v, k) in questionData" v-if="k==153 && questionData[k].length>0">
          <div class="questionDiv" v-for="(item, key) in questionData[k]">
            <span style="margin-left: 10px;width: 30px;display: inline-block;">{{item.number}}.</span>
            <span style="color:#6a8dfb;">单选题</span>
            <p style="width:96%;margin-left:44px;line-height:30px;padding-left:0;" class="ql-editor"
               v-html="item.stem"></p>
            <el-form>
              <el-form-item>
                <el-radio-group v-model="answerData[item.id]" style="width:96%;margin-left:44px;">
                  <el-row :gutter="20">
                    <el-col :span="6" :key="index" v-for="(val,index) in item.choice">
                      <el-radio :label="index" style="white-space: initial;line-height:24px;">{{index}}：{{val}}
                      </el-radio>
                    </el-col>
                  </el-row>
                </el-radio-group>
              </el-form-item>
            </el-form>
          </div>
        </div>
        <div v-for="(v,k) in questionData" v-if="(k==154 || k==155) && questionData[k].length>0">
          <div class="questionDiv" v-for="(item, key) in questionData[k]">
            <span v-if="k==154">
              <span style="margin-left: 10px;width: 30px;display: inline-block;">{{item.number}}.</span>
              <span style="color:#6a8dfb;">多选题</span>
            </span>
            <span v-if="k==155">
              <span style="margin-left: 10px;width: 30px;display: inline-block;">{{item.number}}.</span>
              <span style="color:#6a8dfb;">不定向选择题</span>
            </span>
            <p style="width:96%;margin-left:44px;line-height:30px;padding-left:0;" class="ql-editor"
               v-html="item.stem"></p>
            <el-form>
              <el-form-item>
                <el-checkbox-group v-model="answerData[item.id]" style="width:97%;margin-left:2.5%;" v-if="k==154">
                  <el-col :span="6" :key="index" v-for="(val,index) in item.choice">
                    <el-checkbox :label="index" style="white-space: initial;line-height:24px;">
                      {{index}}:{{item.choice[index]}}
                    </el-checkbox>
                  </el-col>
                </el-checkbox-group>
                <el-checkbox-group v-model="answerData[item.id]" style="width:96%;margin-left:44px;" v-if="k==155">
                  <el-col :span="6" :key="index" v-for="(val,index) in item.choice">
                    <el-checkbox :label="index" style="white-space: initial;line-height:24px;">
                      {{index}}:{{item.choice[index]}}
                    </el-checkbox>
                  </el-col>
                </el-checkbox-group>
              </el-form-item>
            </el-form>
          </div>
        </div>
        <div v-for="(v,k) in questionData" v-if="k==156 && questionData[k].length>0">
          <div class="questionDiv" v-for="(item, key) in questionData[k]">
            <span style="margin-left: 10px;width: 30px;display: inline-block;">{{item.number}}.</span>
            <span style="color:#6a8dfb;">判断题</span>
            <p style="width:96%;margin-left:44px;line-height:30px;padding-left:0;" class="ql-editor"
               v-html="item.stem"></p>
            <el-form>
              <el-form-item>
                <el-radio-group v-model="answerData[item.id]" style="width:96%;margin-left:44px;">
                  <el-col :span="6" :key="index" v-for="(val,index) in item.choice">
                    <el-radio :label="index" style="line-height:24px;white-space: initial;">{{index}}:{{val}}</el-radio>
                  </el-col>
                </el-radio-group>
              </el-form-item>
            </el-form>
          </div>
        </div>
        <div v-for="(v,k) in questionData" v-if="k==158 && questionData[k].length>0">
          <div class="questionDiv" v-for="(item, key) in questionData[k]">
            {{item.number}}.<span style="color:#6a8dfb; margin-left:20px;">简单题</span>
            <p style="width:96%;margin-left:44px;line-height:30px;padding-left:0;" class="ql-editor"
               v-html="item.stem"></p>
            <el-form>
              <el-form-item>
                <el-input style="width:96%;margin-left:44px;" v-model="answerData[item.id]"
                          type="textarea" placeholder="请填写答案"></el-input>
              </el-form-item>
            </el-form>
          </div>
        </div>
      </div>
      <div class="bottom">
        <el-button @click="onSubmit"
                   style="width:360px;margin-top:34px; height:32px; line-height:0px; background-color:rgb(106, 141, 251); border-color:rgb(106, 141, 251);"
                   type="primary">提交
        </el-button>
      </div>
    </div>

    <div id="submitDialog">
      <el-dialog :close-on-click-modal="false" :show-close="false" :visible.sync="submitDialog" style="margin-top:20vh"
                 title="本次试题提交"
                 width="35%">
        <el-row :gutter="30" style="margin-bottom:15px;">
          <el-col :span="24">
            <div class="submit_points">
              <span>提交成功！</span>
            </div>
          </el-col>
        </el-row>
        <div style="text-align: center;">
          <el-button class="confirm_btn" type="primary" @click="closeAnswer">确定</el-button>
        </div>
      </el-dialog>
    </div>

  </div>

</template>

<script>
  import Dropzone from "../../../common/UPLOAD.vue";

  export default {
    name: "index",
    components: {Dropzone},
    data() {
      return {
        isClear: false,
        pointScore: '',
        resultId: '',
        submitDialog: false,
        faleDialog: false,
        paperData: {}, //考试的内容
        examId: '',  //当前答题的考试id
        questionData: {},  //题目的内容
        answerData: {},  //答题的内容
        answers: {},
      };
    },
    activated() {
      this.getQueryData();
      this.getPaperData();
    },
    watch: {
      'answerData': {
        deep: true,
        handler(val, oldVal) {
          localStorage.setItem('answerNaires_' + this.examId, JSON.stringify(val));
        }
      }
    },
    methods: {
      combinaData() {
        if (localStorage.getItem('answerNaires_' + this.examId) && localStorage.getItem('answerNaires_' + this.examId) != 'null') {
          this.answerData = JSON.parse(localStorage.getItem('answerNaires_' + this.examId));
        } else {
          if (this.questionData[153] && this.questionData[153].length > 0) {
            this.questionData[153].forEach((item) => {
              this.$set(this.answerData, item.id, '');
            });
          }
          if (this.questionData[154] && this.questionData[154].length > 0) {
            this.questionData[154].forEach((item) => {
              if (this.answers && this.answers[item.id]) {
                this.$set(this.answerData, item.id, this.answers[item.id]);
              } else {
                this.$set(this.answerData, item.id, []);
              }
            });
          }
          if (this.questionData[155] && this.questionData[155].length > 0) {
            this.questionData[155].forEach((item) => {
              this.$set(this.answerData, item.id, []);
            });
          }
          if (this.questionData[156] && this.questionData[156].length > 0) {
            this.questionData[156].forEach((item) => {
              this.$set(this.answerData, item.id, '');
            });
          }
          if (this.questionData[157] && this.questionData[157].length > 0) {
            this.questionData[157].forEach((item) => {
              this.$set(this.answerData, item.id, []);
            });
          }
          if (this.questionData[158] && this.questionData[158].length > 0) {
            this.questionData[158].forEach((item) => {
              this.$set(this.answerData, item.id, '');
            });
          }
        }
      },
      getQueryData() {
        if (!this.$route.query.id) {
          this.examId = this.$store.state.quesNaire.naire_answer_exam_id;
          this.$router.push({path: '/answerNaire', query: {id: this.$store.state.quesNaire.naire_answer_exam_id}});
        } else {
          this.$store.dispatch('naireAnswerExamId', this.$route.query.id);
          this.examId = this.$route.query.id;
        }
      },
      getPaperData() {
        this.$http.get(globalConfig.server + 'questionNaire/' + this.examId).then((res) => {
          if (res.data.code === '30000') {
            this.paperData = res.data.data;
            this.questionData = res.data.data.question_set;
            this.combinaData();
          } else {
            this.paperData = [];
            this.questionData = [];
            this.answerData = [];
            this.$notify.warning({
              title: '警告',
              message: res.data.msg
            })
          }
        });
      },
      onSubmit() {
        this.$http.post(globalConfig.server + 'exam/result', {
          exam_id: this.examId,
          answer: this.answerData,
          is_questionnaire: true
        }).then((res) => {
          if (res.data.code === '36010') {
            this.$notify.success({
              title: '成功',
              message: res.data.msg
            });
            this.pointScore = res.data.data.score;
            this.resultId = res.data.data.id;
            this.submitDialog = true;
            localStorage.removeItem("answerNaires_" + this.examId);
          } else {
            this.$notify.warning({
              title: '警告',
              message: res.data.msg
            });
          }
        });
      },
      closeAnswer() {
        this.submitDialog = false;
        let view = {};
        view.name = ' 问卷作答 ';
        view.path = '/answerNaire';
        this.$store.dispatch('delVisitedViews', view);
        this.$router.push({path: '/main'});
      },
    }
  };
</script>

<style lang="scss" scoped>
  .ql-editor {
    min-height: initial !important;
  }
  .el-form-item {
    margin-bottom: 12px !important;
  }
  .confirm_btn {
    width: 100px;
    height: 35px;
    line-height: 0px;
    text-align: center;
    margin-top: 10px;
    background-color: #fb4699;
    border-color: #fb4699;
  }

  #answerExam {
    position: relative;
    .tool {
      height: 160px;
      border-radius: 5px;
      border: 1px #eee solid;
      border-bottom: none;
      padding: 0;
      .import_questions {
        border: 1px solid #6a8dfb;
        -webkit-box-shadow: 0 0 3px 1px #6a8dfb;
        box-shadow: 0 0 3px 1px #6a8dfb;
        text-align: center;
        align-items: center;
        justify-content: center;
        height: 124px;
        border-radius: 5px;
        .qdiv {
          font-size: 14px;
          height: 30px;
          line-height: 30px;
          margin-left: 20px;
          overflow: hidden;
        }
        .import_left {
          width: 90%;
          height: 36px;
          line-height: 36px;
          margin: 0 auto;
        }
      }
    }
    .main {
      border: 1px #eee solid;
      border-bottom: none;
      border-top: none;
      min-height: 500px;
      font-size: 16px;
      .questionDiv {
        width: 98%;
        margin-left: 2%;
        min-height: 100px;
        padding-top: 16px;
        border-top: 1px #eee solid;
      }
    }
    .bottom {
      width: 100%;
      height: 100px;
      text-align: center;
    }
  }

  #submitDialog {
    .submit_points {
      border: 1px solid #fb4699;
      -webkit-box-shadow: 0 0 3px 1px #fb4699;
      box-shadow: 0 0 3px 1px #fb4699;
      text-align: center;
      align-items: center;
      justify-content: center;
      height: 160px;
      border-radius: 5px;
      span {
        color: #fb4699;
        font-size: 40px;
        margin-top: 54px;
        display: block;
      }
    }
  }

  .el-button--primary.is-disabled,
  .el-button--primary.is-disabled:active,
  .el-button--primary.is-disabled:focus,
  .el-button--primary.is-disabled:hover {
    color: #fff !important;
    background-color: #8faafc !important;
    border-color: #8faafc !important;
  }
</style>
