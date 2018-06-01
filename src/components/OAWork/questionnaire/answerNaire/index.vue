<template>
  <div>
    <div id="answerExam">
      <div class="tool">
        <img width="100%" height="142px" src="../../../../assets/images/preview.png"/>
        <div>
          <span>{{paperData.name}}</span>
          <span style="margin-left: 30px;">{{paperData.question_count}}<span
            style="font-size: 14px;"> 题</span></span>
        </div>
      </div>
      <div class="main">
        <div v-for="(v, k) in questionData" v-if="k==153 && questionData[k].length>0">
          <div class="questionDiv" v-for="(item, key) in questionData[k]">
            <span class="category_score">(单选题)</span>
            <el-row>
              <el-col :span="1" style="width: 50px;margin-top: -2px;">
                <p style="margin-left: 10px;width: 30px;display: inline-block;margin-top: 8px;">{{item.number}}.</p>
              </el-col>
              <el-col :span="15">
                <p style="line-height:30px;" class="ql-editor" v-html="item.stem"></p>
              </el-col>
            </el-row>
            <el-form>
              <el-form-item>
                <el-radio-group v-model="answerData[item.id]" style="width: 96%;margin-left: 50px;margin-top: 10px;">
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
            <span class="category_score">(<span v-if="k==154">多选题</span><span v-if="k==155">不定向选择题</span>)</span>
            <el-row>
              <el-col :span="1" style="width: 50px;margin-top: -2px;">
                <p style="margin-left: 10px;width: 30px;display: inline-block;margin-top: 8px;">{{item.number}}.</p>
              </el-col>
              <el-col :span="15">
                <p style="line-height:30px;" class="ql-editor" v-html="item.stem"></p>
              </el-col>
            </el-row>
            <el-form>
              <el-form-item>
                <el-checkbox-group v-model="answerData[item.id]" style="width: 96%;margin-left: 50px;margin-top: 10px;"
                                   v-if="k==154">
                  <el-col :span="6" :key="index" v-for="(val,index) in item.choice">
                    <el-checkbox :label="index" style="white-space: initial;line-height:24px;">
                      {{index}}:{{item.choice[index]}}
                    </el-checkbox>
                  </el-col>
                </el-checkbox-group>
                <el-checkbox-group v-model="answerData[item.id]" style="width: 96%;margin-left: 50px;margin-top: 10px;"
                                   v-if="k==155">
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
            <span class="category_score">(判断题)</span>
            <el-row>
              <el-col :span="1" style="width: 50px;margin-top: -2px;">
                <p style="margin-left: 10px;width: 30px;display: inline-block;margin-top: 8px;">{{item.number}}.</p>
              </el-col>
              <el-col :span="15">
                <p style="line-height:30px;" class="ql-editor" v-html="item.stem"></p>
              </el-col>
            </el-row>
            <el-form>
              <el-form-item>
                <el-radio-group v-model="answerData[item.id]" style="width:96%;margin-left:50px;margin-top: 10px;">
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
            <span class="category_score">(简答题)</span>
            <el-row>
              <el-col :span="1" style="width: 50px;margin-top: -2px;">
                <p style="margin-left: 10px;width: 30px;display: inline-block;margin-top: 8px;">{{item.number}}.</p>
              </el-col>
              <el-col :span="15">
                <p style="line-height:30px;" class="ql-editor" v-html="item.stem"></p>
              </el-col>
            </el-row>
            <el-form>
              <el-form-item style="width:96%;margin-left:50px;margin-top: 10px;">
                <textarea style="width: 97%;border: 1px solid #dcdfe6;border-radius: 5px;padding: 10px;font: 400 13.3333px Arial;color: #787a7e;" v-model="answerData[item.id]"
                          placeholder="请填写答案"></textarea>
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
                 title="本次问卷提交"
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
        this.$confirm('确认提交问卷吗?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$http.post(globalConfig.server + 'exam/result', {
            exam_id: this.examId,
            answer: this.answerData,
            is_questionnaire: true
          }).then((res) => {
            if (res.data.code === '36010') {
              // this.$notify.success({
              //   title: '成功',
              //   message: res.data.msg
              // });
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
        }).catch(() => {
          this.$notify.info({
            title: "提示",
            message: "已取消提交"
          });
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
    padding: 0px;
    margin: 0px;
  }
  input::-webkit-input-placeholder, textarea::-webkit-input-placeholder {
    /* WebKit browsers */
    color: #c0c4cc;
  }
  .el-form-item {
    margin-bottom: 15px !important;
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
      position: relative;
      div {
        position: absolute;
        left: 0px;
        top: 0px;
        height: 142px;
        line-height: 142px;
        font-size: 24px;
        text-indent: 2%;
        color: #fff;
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
        min-height: 85px;
        padding-top: 16px;
        border-top: 1px #eee solid;
        .category_score {
          color: #c0c4cc;
          font-size: 14px;
          float: right;
          margin-right: 10px;
          padding: 3px 8px;
        }
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
