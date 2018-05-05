<template>
  <div>
    <div id="answerExam">
      <div class="tool">
        <el-row style="width:100%;margin-top:16px;">
          <el-col :span="5" style="margin-left:2%; margin-right:2%">
            <div class="import_questions" style="text-align:left;color:#464748;">
              <div class="qdiv" style="margin-top:28px;">试卷名称：<span style="color:#6a8dfb">{{paperData.name}}</span>
              </div>
              <div class="qdiv">试卷类型：<span style="color:#6a8dfb">{{paperData.paper && paperData.paper.category}}</span>
              </div>
            </div>
          </el-col>
          <el-col :span="5" style="margin-left:2%; margin-right:2%">
            <div class="import_questions" style="border: 1px solid #58d788;box-shadow: 0 0 3px 1px #58d788;">
              <div class="import_left"><span style="float:left; font-size:14px;">总时长</span><i
                style="float:right; color:#58d788;font-size:20px;" class="iconfont icon-shijian1"></i></div>
              <div><span style="font-size:70px; color:#58d788">{{ paperData.duration }}</span>分钟</div>
            </div>
          </el-col>
          <el-col :span="5" style="margin-left:2%; margin-right:2%">
            <div class="import_questions" style="border: 1px solid #fdca41;box-shadow: 0 0 3px 1px #fdca41;">
              <div class="import_left"><span style="float:left; font-size:14px;">总题数</span><i
                style="float:right; color:#fdca41;font-size:20px;" class="iconfont icon-shujutu"></i></div>
              <div><span style="font-size:70px; color:#fdca41">{{paperData.question_count}}</span>题</div>
            </div>
          </el-col>
          <el-col :span="5" style="margin-left:2%; margin-right:2%">
            <div class="import_questions" style="border: 1px solid #fb4699;box-shadow: 0 0 3px 1px #fb4699;">
              <div class="import_left"><span style="float:left; font-size:14px;">总分值</span><i
                style="float:right; color:#fb4699;font-size:20px;" class="iconfont icon-chengjiguanli"></i></div>
              <div><span style="font-size:70px; color:#fb4699">{{paperData.score}}</span>分</div>
            </div>
          </el-col>
        </el-row>
      </div>
      <div class="main">
        <div class="questionDiv" v-for="(v, k) in questionData" v-if="k==153 && questionData[k].length>0">
          <div v-for="(item, key) in questionData[k]">
            {{item.number}}.<span style="color:#6a8dfb; margin-left:20px;">单选题</span>
            <p style="margin-left:30px;line-height:30px;width:96%" v-html="item.stem"></p>
            <el-form>
              <el-form-item>
                <el-radio-group v-model="answerData[item.id]" style="width:98%;margin-left:2%;">
                  <el-col :span="6" :key="index" v-for="(val,index) in item.choice"
                          style="line-height:24px;height: 24px;">
                    <el-radio :label="index" style="white-space: initial;">{{index}}：{{val}}</el-radio>
                  </el-col>
                </el-radio-group>
              </el-form-item>
            </el-form>
          </div>
        </div>
        <div class="questionDiv" v-for="(v,k) in questionData" v-if="(k==154 || k==155) && questionData[k].length>0">
          <div v-for="(item, key) in questionData[k]">
            <span v-if="k==154">{{item.number}}.<span style="color:#6a8dfb; margin-left:20px;">多选题</span></span>
            <span v-if="k==155">{{item.number}}.<span style="color:#6a8dfb; margin-left:20px;">不定向选择题</span></span>
            <p style="margin-left:30px;line-height:30px;width:96%" v-html="item.stem"></p>
            <el-form>
              <el-form-item>
                <el-checkbox-group v-model="answerData[item.id]" style="width:98%;margin-left:2%;" v-if="k==154">
                  <el-col :span="6" :key="index" v-for="(val,index) in item.choice"
                          style="line-height:24px;height: 24px;">
                    <el-checkbox :label="index" style="white-space: initial;">{{item.choice[index]}}</el-checkbox>
                  </el-col>
                </el-checkbox-group>
                <el-checkbox-group v-model="answerData[item.id]" style="width:98%;margin-left:2%;" v-if="k==155">
                  <el-col :span="6" :key="index" v-for="(val,index) in item.choice"
                          style="line-height:24px;height: 24px;">
                    <el-checkbox :label="index" style="white-space: initial;">{{item.choice[index]}}</el-checkbox>
                  </el-col>
                </el-checkbox-group>
              </el-form-item>
            </el-form>
          </div>
        </div>
        <div class="questionDiv" v-for="(v,k) in questionData" v-if="k==156 && questionData[k].length>0">
          <div v-for="(item, key) in questionData[k]">
            {{item.number}}.<span style="color:#6a8dfb; margin-left:20px;">判断题</span>
            <p style="margin-left:30px;line-height:20px;width:96%" v-html="item.stem"></p>
            <el-form>
              <el-form-item>
                <el-radio-group v-model="answerData[item.id]" style="width:98%;margin-left:2%;">
                  <el-col :span="12" :key="index" v-for="(val,index) in item.choice"
                          style="line-height:24px;height: 24px;">
                    <el-radio :label="index">{{val}}</el-radio>
                  </el-col>
                </el-radio-group>
              </el-form-item>
            </el-form>
          </div>
        </div>
        <div class="questionDiv" v-for="(v,k) in questionData" v-if="k==157 && questionData[k].length>0">
          <div v-for="(item, key) in questionData[k]">
            {{item.number}}.<span style="color:#6a8dfb; margin-left:20px;">填空题</span>
            <p style="margin-left:30px;line-height:20px;width:96%" v-html="item.stem"></p>
            <el-form>
              <el-form-item>
                <el-col :span="12" v-for="(value,ak) in item.answer_count" :key="ak">
                  <el-input style="width:95.5%;margin-left:2%;" size="small" v-model="answerData[item.id][ak]"
                            placeholder="请填写答案"></el-input>
                </el-col>
              </el-form-item>
            </el-form>
          </div>
        </div>
        <div class="questionDiv" v-for="(v,k) in questionData" v-if="k==158 && questionData[k].length>0">
          <div v-for="(item, key) in questionData[k]">
            {{item.number}}.<span style="color:#6a8dfb; margin-left:20px;">简单题</span>
            <p style="margin-left:30px;line-height:20px;width:96%" v-html="item.stem"></p>
            <el-form>
              <el-form-item>
                <el-input style="width:95.5%;margin-left:2%;" v-model="answerData[item.id]"
                          type="textarea" placeholder="请填写答案"></el-input>
              </el-form-item>
            </el-form>
          </div>
        </div>
      </div>
      <div class="bottom">
        <el-button @click="onSubmit"
                   style="width:360px;margin-top:34px; height:32px; line-height:0px; background-color:rgb(106, 141, 251); border-color:rgb(106, 141, 251);"
                   type="primary" :disabled="submitDisabled">提交
        </el-button>
      </div>
    </div>
    <div id="pointDialog">
      <el-dialog :close-on-click-modal="false" :show-close="false" :visible.sync="pointDialog" title="本次试题得分"
                 style="margin-top:16vh"
                 width="50%">
        <el-row :gutter="30">
          <el-col :span="24">
            <div class="import_points">
              <div class="importbody">
                <img style="float:left;" src="../../../../assets/images/examination/import_score.png">
                <span class="importright">
              恭喜您！<br/>
              您的本次成绩是<br/><br/>
              <span>{{pointScore}}</span>分
              </span>
              </div>
            </div>
          </el-col>
        </el-row>
        <div class="importbo">
          <el-button
            style="width:130px; height:32px; line-height:0px;margin-top:10px;background-color:rgb(106, 141, 251); border-color:rgb(106, 141, 251)"
            type="primary" @click="seeTestPaper">查看试卷
          </el-button>
        </div>
      </el-dialog>
    </div>
    <div id="submitDialog">
      <el-dialog :close-on-click-modal="false" :show-close="false" :visible.sync="submitDialog" style="margin-top:20vh"
                 title="本次试题提交"
                 width="35%">
        <el-row :gutter="30" style="margin-bottom:38px;">
          <el-col :span="24">
            <div class="submit_points">
              <span>提交成功！</span><br/>主考官将尽快批示，您的成绩可在“乐伽大学－我的考试”中查看，我们也会以信息的方式通知您！
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
        pointDialog: false,
        pointScore: '',
        submitDialog: false,
        faleDialog: false,
        paperData: {}, //考试的内容
        paperId: '',  //当前答题的考试id
        questionData: {},  //题目的内容
        answerData: {},  //答题的内容
        submitDisabled: false,
      };
    },
    activated() {
      this.getQueryData();
      this.getPaperData();
    },
    watch: {},
    methods: {
      combinaData() {
        if (this.questionData[153] && this.questionData[153].length > 0) {
          this.questionData[153].forEach((item) => {
            this.$set(this.answerData, item.id, '');
          });
        }
        if (this.questionData[154] && this.questionData[154].length > 0) {
          this.questionData[154].forEach((item) => {
            this.$set(this.answerData, item.id, []);
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
      },
      getQueryData() {
        if (!this.$route.query.id) {
          this.paperId = this.$store.state.onlineExam.answer_exam_id;
          this.$router.push({path: '/answerExam', query: {id: this.$store.state.onlineExam.answer_exam_id}});
        } else {
          this.$store.dispatch('answerExamId', this.$route.query.id);
          this.paperId = this.$route.query.id;
        }
      },
      getPaperData() {
        this.$http.get(globalConfig.server + 'exam/' + this.paperId).then((res) => {
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
          exam_id: this.paperId,
          answer: this.answerData
        }).then((res) => {
          if (res.data.code === '36010') {
            this.$notify.success({
              title: '成功',
              message: res.data.msg
            });
            if (this.questionData[158] && this.questionData[158].length > 0) {
              this.submitDialog = true;
            } else {
              this.pointDialog = true;
            }
            this.submitDisabled = true;
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
        view.name = ' 考生答题 ';
        view.path = '/answerExam';
        this.$store.dispatch('delVisitedViews', view);
        this.$router.push({path: '/LineCollege'});
      },
      //查看试卷
      seeTestPaper() {
        this.pointDialog = false;
        let view = {};
        view.name = ' 考生答题 ';
        view.path = '/answerExam';
        this.$store.dispatch('delVisitedViews', view);
        // this.$router.push({path: '/lookExam', query: {result_id: val.result_id, exam_id: this.paperId}});
      },

    }
  };
</script>

<style lang="scss" scoped>
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
          height: 35px;
          line-height: 35px;
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
        min-height: 154px;
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

  #pointDialog {
    .import_points {
      border: 1px solid #fb4699;
      -webkit-box-shadow: 0 0 3px 1px #fb4699;
      box-shadow: 0 0 3px 1px #fb4699;
      text-align: center;
      align-items: center;
      justify-content: center;
      height: 200px;
      border-radius: 5px;
      .importbody {
        margin-left: 30%;
        margin-top: 30px;
        img {
          width: 105px;
          height: 130px;
        }
        .importright {
          width: 180px;
          height: 130px;
          margin-top: 10px;
          float: left;
          margin-left: 60px;
          font-size: 16px;
          text-align: left;
          color: #6a8dfb;
          span {
            font-size: 50px;
            color: #fb4699;
            font-family: "PingFangSC-Light PingFangSC-Ultralight";
          }
        }
      }
    }
    .importbo {
      width: 100%;
      height: 40px;
      text-align: center;
      border-top: 1px #eee solid;
      margin-top: 16px;
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
      height: 190px;
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
