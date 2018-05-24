<template>
  <div>
    <div id="answerExam">
      <div class="tool">
        <el-row style="width:100%;margin-top:16px;">
          <el-col :span="5" style="margin-left:2%; margin-right:2%">
            <div class="import_questions" style="text-align:left;color:#464748;">
              <div class="qdiv" style="margin-top:15px;">场次名称：<span style="color:#6a8dfb">{{paperData.name}}</span></div>
              <div class="qdiv">试卷名称：<span style="color:#6a8dfb">{{paperData.paper && paperData.paper.name}}</span></div>
              <div class="qdiv">试卷类型：<span style="color:#6a8dfb">{{paperData.paper && paperData.paper.category}}</span></div>
            </div>
          </el-col>
          <el-col :span="5" style="margin-left:2%; margin-right:2%">
            <div class="import_questions" style="border: 1px solid #58d788;box-shadow: 0 0 3px 1px #58d788;">
              <div class="import_left"><span style="float:left; font-size:14px;">总时长</span><i
                style="float:right; color:#58d788;font-size:20px;" class="iconfont icon-shijian1"></i></div>
              <div><span style="font-size:70px; color:#58d788;" :class="{'timeStringClass':timeString !=''}">{{ paperData.duration }}</span>分钟
                <!--<span style="float: right;margin-right: 15px;margin-top: 33px;" v-if="timeString !='' ">倒计时-->
                  <!--<br/><span style="color:#58d788;">{{timeString}}</span></span>-->
              </div>
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
              <div class="import_left"><span style="float:left; font-size:14px;">倒计时</span><i
                style="float:right; color:#fb4699;font-size:20px;" class="iconfont icon-chengjiguanli"></i></div>
              <div><span style="font-size:50px; color:#fb4699">{{timeString}}</span></div>
              <div style="position: absolute;top: 95px;right: 55px;">(总分：{{paperData.score}}分)</div>
            </div>
          </el-col>
        </el-row>
      </div>
      <div class="main">
        <div v-for="(v, k) in questionData" v-if="k==153 && questionData[k].length>0">
          <div class="questionDiv" v-for="(item, key) in questionData[k]">
            <span class="category_score">(单选题 {{item.score}} 分)</span>
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
            <span class="category_score">(<span v-if="k==154">多选题</span><span v-if="k==155">不定向选择题</span> {{item.score}} 分)</span>
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
                <el-checkbox-group v-model="answerData[item.id]" style="width:96%;margin-left:50px;margin-top: 10px;"
                                   v-if="k==154">
                  <el-col :span="6" :key="index" v-for="(val,index) in item.choice">
                    <el-checkbox :label="index" style="white-space: initial;line-height:24px;">
                      {{index}}:{{item.choice[index]}}
                    </el-checkbox>
                  </el-col>
                </el-checkbox-group>
                <el-checkbox-group v-model="answerData[item.id]" style="width:96%;margin-left:50px;margin-top: 10px;"
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
            <span class="category_score">(判断题 {{item.score}} 分)</span>
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
                  <el-col :span="12" :key="index" v-for="(val,index) in item.choice">
                    <el-radio :label="index" style="line-height:24px;">{{index}}:{{val}}</el-radio>
                  </el-col>
                </el-radio-group>
              </el-form-item>
            </el-form>
          </div>
        </div>
        <div v-for="(v,k) in questionData" v-if="k==157 && questionData[k].length>0">
          <div class="questionDiv" v-for="(item, key) in questionData[k]">
            <span class="category_score">(填空题 {{item.score}} 分)</span>
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
                <el-col :span="12" v-for="(value,ak) in item.answer_count" :key="ak">
                  <input type="text" style="width: 95%;border: 1px solid #dcdfe6;border-radius: 5px;padding: 10px;font: 400 13.3333px Arial;color: #787a7e;"
                         size="small" v-model="answerData[item.id][ak]" :placeholder="`请填写第 ${ak+1} 处答案`">
                </el-col>
              </el-form-item>
            </el-form>
          </div>
        </div>
        <div v-for="(v,k) in questionData" v-if="k==158 && questionData[k].length>0">
          <div class="questionDiv" v-for="(item, key) in questionData[k]">
            <span class="category_score">(简答题 {{item.score}} 分)</span>
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
            <div style="text-align: center;">
          <span v-show="showForceWords"
                style="display: inline-block;color: #999;margin-top: 10px;">考试时间已到，系统已为您自动提交！</span>
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
        <el-row :gutter="30" style="margin-bottom:15px;">
          <el-col :span="24">
            <div class="submit_points">
              <span>提交成功！</span><br/>主考官将尽快批阅，您的成绩可在“乐伽大学－我的考试”中查看，我们也会以消息的方式通知您！
            </div>
          </el-col>
        </el-row>
        <div style="text-align: center;">
          <span v-show="showForceWords"
                style="display: inline-block;color: #999;">考试时间已到，系统已为您自动提交！</span>
        </div>
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
        resultId: '',
        submitDialog: false,
        faleDialog: false,
        paperData: {}, //考试的内容
        examId: '',  //当前答题的考试id
        questionData: {},  //题目的内容
        answerData: {},  //答题的内容
        confirmArrival: [],
        answers: {},
        countDown: '',
        timeString: '00:00:00',
        timeClear: '',
        timeOut: '',
        showForceWords: false,  //强制提交文字
      };
    },
    activated() {
      clearTimeout(this.timeOut);
      clearTimeout(this.timeClear);
      this.getQueryData();
      this.getPaperData();
      this.confirmArrival = localStorage.getItem('confirmArrival');  //check_in签到状态考试id数组
      this.clockSubmit();
      this.timeOut = setTimeout(() => {
        clearTimeout(this.timeClear);
        this.clockSubmit();
      }, 1000 * 60);
    },
    watch: {
      'answerData': {
        deep: true,
        handler(val, oldVal) {
          localStorage.setItem('answers_' + this.examId, JSON.stringify(val));
        }
      },
      countDown(num) {
        clearTimeout(this.timeClear);
        if (num >= 0) {
          this.clock(num);
        }
      }
    },
    methods: {
      clock(n) {
        let val = Number(n);
        let h = Number(Math.floor(val / 3600));
        let m = 0, s = 0;
        if ((val - h * 3600) >= 0) {
          m = Number(Math.floor((val - h * 3600) / 60));
          if ((val - h * 3600 - m * 60) >= 0) {
            s = Number(Math.floor(val - h * 3600 - m * 60));
          }
        }
        if (h < 10) {
          h = '0' + h;
        }
        if (m < 10) {
          m = '0' + m;
        }
        if (s < 10) {
          s = '0' + s;
        }
        this.timeString = h + ':' + m + ':' + s;
        val--;
        this.timeClear = setTimeout(() => {
          this.clock(val);
        }, 1000);
      },
      combinaData() {
        if (localStorage.getItem('answers_' + this.examId) && localStorage.getItem('answers_' + this.examId) != 'null') {
          this.answerData = JSON.parse(localStorage.getItem('answers_' + this.examId));
        } else {
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
        }
      },
      getQueryData() {
        if (!this.$route.query.id) {
          this.examId = this.$store.state.onlineExam.answer_exam_id;
          this.$router.push({path: '/answerExam', query: {id: this.$store.state.onlineExam.answer_exam_id}});
        } else {
          this.$store.dispatch('answerExamId', this.$route.query.id);
          this.examId = this.$route.query.id;
        }
      },
      getPaperData() {
        this.$http.get(globalConfig.server + 'exam/' + this.examId).then((res) => {
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
        this.$confirm('确认提交答案吗?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.onForceSubmit();
        }).catch(() => {
          this.$notify.info({
            title: '提示',
            message: '已取消提交'
          });
        });
      },
      onForceSubmit(val) {
        if (val === 'force') {
          this.showForceWords = true;
        }
        this.$http.post(globalConfig.server + 'exam/result', {
          exam_id: this.examId,
          answer: this.answerData
        }).then((res) => {
          if (res.data.code === '36010') {
            this.pointScore = res.data.data.score;
            this.resultId = res.data.data.id;
            if (this.questionData[158] && this.questionData[158].length > 0) {
              this.submitDialog = true;
            } else {
              this.pointDialog = true;
            }
            localStorage.removeItem("answers_" + this.examId);
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
        this.$router.push({path: '/lookExam', query: {result_id: this.resultId, exam_id: this.examId}});
      },
      //计时器轮询check_in提交
      clockSubmit() {
        if (this.examId) {
          this.$http.get(globalConfig.server + 'exam/poll/' + this.examId).then((res) => {
            if (res.data.code === '30000') {
              this.onForceSubmit('force');
            } else {
              let time = res.data.msg.split(',');
              this.countDown = time[1] - time[0];
            }
          });
        }
      },
    }
  };
</script>

<style lang="scss" scoped>
  .timeStringClass {
    margin-left: 30px;
  }
  input::-webkit-input-placeholder, textarea::-webkit-input-placeholder {
    /* WebKit browsers */
    color: #c0c4cc;
  }
  .ql-editor {
    min-height: initial !important;
    padding: 0px;
    margin: 0px;
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
      border-top: none;
      min-height: 500px;
      font-size: 16px;
      .questionDiv {
        width: 98%;
        margin-left: 2%;
        min-height: 90px;
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
