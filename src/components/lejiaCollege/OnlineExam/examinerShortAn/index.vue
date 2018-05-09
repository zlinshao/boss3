<template>
  <div>
    <div id="shortAnExam">
      <div class="tool">
        <el-row style="width:100%;margin-top:16px;">
          <el-col :span="5" style="margin-left:2%; margin-right:2%">
            <div class="import_questions" style="text-align:left;color:#464748;">
              <div class="qdiv" style="margin-top:28px;">试卷名称：<span style="color:#6a8dfb">{{examData.name}}</span></div>
              <div class="qdiv">试卷类型：<span style="color:#6a8dfb">{{examData.paper && examData.paper.category}}</span>
              </div>
            </div>
          </el-col>
          <el-col :span="5" style="margin-left:2%; margin-right:2%">
            <div class="import_questions" style="border: 1px solid #58d788;box-shadow: 0 0 3px 1px #58d788;">
              <div class="import_left"><span style="float:left; font-size:14px;">总时长</span><i
                style="float:right; color:#58d788;font-size:20px;" class="iconfont icon-shijian1"></i></div>
              <div><span style="font-size:70px; color:#58d788">{{examData.duration}}</span>分钟</div>
            </div>
          </el-col>
          <el-col :span="5" style="margin-left:2%; margin-right:2%">
            <div class="import_questions" style="border: 1px solid #fdca41;box-shadow: 0 0 3px 1px #fdca41;">
              <div class="import_left"><span style="float:left; font-size:14px;">总题数</span><i
                style="float:right; color:#fdca41;font-size:20px;" class="iconfont icon-shujutu"></i></div>
              <div><span style="font-size:70px; color:#fdca41">{{examData.question_count}}</span>题</div>
            </div>
          </el-col>
        </el-row>
      </div>
      <div class="main">
        <div v-for="(v, k) in questionData" v-if="k==153 && questionData[k].length>0">
          <div class="questionDiv" v-for="(item, key) in questionData[k]">
            {{item.number}}.<span style="color:#6a8dfb; margin-left:20px;">单选题</span>
            <p style="margin-left:30px;line-height:30px;width:96%" class="ql-editor" v-html="item.stem"></p>
            <div style="width:98%;margin-left:2%;"
                 v-if="answerData && answerData[item.id] && resultData && resultData.answer && resultData.answer[item.id]">
              <el-row style="line-height: 30px;">正确答案： {{answerData[item.id]}}</el-row>
              <el-form>
                <el-form-item>
                  <el-row :gutter="20">
                    <el-col :span="6" :key="index" v-for="(val,index) in item.choice"
                            style="line-height:24px;">
                      <span v-if="index == answerData[item.id]"><el-radio>{{index}}：{{val}}</el-radio></span>
                      <span v-else>{{index}}：{{val}}</span>
                      <span style="color:rgb(88, 215, 136);margin-left:50px;"
                            v-if="resultData.answer[item.id] == answerData[item.id] && resultData.answer[item.id]==index">正确</span>
                      <span style="color:#fc83b6;margin-left:50px;"
                            v-if="resultData.answer[item.id] != answerData[item.id] && resultData.answer[item.id]==index">错误</span>
                    </el-col>
                  </el-row>
                </el-form-item>
              </el-form>
            </div>
          </div>
        </div>
        <div v-for="(v, k) in questionData" v-if="(k==154 || k==155) && questionData[k].length>0">
          <div class="questionDiv" v-for="(item, key) in questionData[k]">
            <span v-if="k==154">{{item.number}}.<span style="color:#6a8dfb; margin-left:20px;">多选题</span></span>
            <span v-if="k==155">{{item.number}}.<span style="color:#6a8dfb; margin-left:20px;">不定向选择题</span></span>
            <p style="margin-left:30px;line-height:30px;width:96%" class="ql-editor" v-html="item.stem"></p>
            <div style="width:98%;margin-left:2%;"
                 v-if="answerData && answerData[item.id] && resultData && resultData.answer && resultData.answer[item.id]">
              <el-row style="line-height: 30px;">正确答案： {{answerData[item.id]}}</el-row>
              <el-form>
                <el-form-item>
                  <el-row :gutter="20">
                    <el-col :span="6" :key="index" v-for="(val,index) in item.choice" style="line-height:24px;">
                      <span v-if="answerData[item.id].indexOf(index)>-1"><el-radio>{{index}}：{{val}}</el-radio></span>
                      <span v-else>{{index}}：{{val}}</span>
                      <span style="color:rgb(88, 215, 136);margin-left:50px;" v-for="ans in resultData.answer[item.id]"
                            v-if="answerData[item.id].indexOf(ans)>-1 && ans==index">正确</span>
                      <span style="color:#fc83b6;margin-left:50px;" v-for="ans in resultData.answer[item.id]"
                            v-if="answerData[item.id].indexOf(ans)<0 && ans==index">错误</span>
                    </el-col>
                  </el-row>
                </el-form-item>
              </el-form>
            </div>
          </div>
        </div>
        <div v-for="(v,k) in questionData" v-if="k==156 && questionData[k].length>0">
          <div class="questionDiv" v-for="(item, key) in questionData[k]">
            {{item.number}}.<span style="color:#6a8dfb; margin-left:20px;">判断题</span>
            <p style="margin-left:30px;line-height:20px;width:96%" class="ql-editor" v-html="item.stem"></p>
            <div style="width:98%;margin-left:2%;"
                 v-if="answerData && answerData[item.id] && resultData && resultData.answer && resultData.answer[item.id]">
              <el-row style="line-height: 30px;">正确答案： {{answerData[item.id]}}</el-row>
              <el-form>
                <el-form-item>
                  <el-row :gutter="20">
                    <el-col :span="12" :key="index" v-for="(val,index) in item.choice" style="line-height:24px;">
                      <span v-if="index == answerData[item.id]"><el-radio>{{index}}：{{val}}</el-radio></span>
                      <span v-else>{{index}}：{{val}}</span>
                      <span style="color:rgb(88, 215, 136);margin-left:50px;"
                            v-if="resultData.answer[item.id] == answerData[item.id] && resultData.answer[item.id]==index">正确</span>
                      <span style="color:#fc83b6;margin-left:50px;"
                            v-if="resultData.answer[item.id] != answerData[item.id] && resultData.answer[item.id]==index">错误</span>
                    </el-col>
                  </el-row>
                </el-form-item>
              </el-form>
            </div>
          </div>
        </div>
        <div v-for="(v,k) in questionData" v-if="k==157 && questionData[k].length>0">
          <div class="questionDiv" v-for="(item, key) in questionData[k]">
            {{item.number}}.<span style="color:#6a8dfb; margin-left:20px;">填空题</span>
            <p style="margin-left:30px;line-height:20px;width:96%" class="ql-editor" v-html="item.stem"></p>
            <div style="width:98%;margin-left:2%;"
                 v-if="answerData && answerData[item.id] && resultData && resultData.answer && resultData.answer[item.id]">
              <el-row style="line-height: 30px;">正确答案： {{answerData[item.id]}}</el-row>
              <el-form>
                <el-form-item>
                  <el-row :gutter="20">
                    <el-col :span="12" v-for="(value,ak) in item.answer_count" :key="ak" style="line-height: 24px;">
                      <el-input readOnly size="small"
                                v-model="resultData.answer[item.id][ak]" placeholder="请填写答案"></el-input>
                      <span style="color:rgb(88, 215, 136);margin-left:30px;"
                            v-for="(vv, kk) in resultData.answer[item.id]"
                            v-if="answerData[item.id].indexOf(vv)>-1 && kk==ak ">正确</span>
                      <span style="color:#fc83b6;margin-left:30px;" v-for="(vv, kk) in resultData.answer[item.id]"
                            v-if="answerData[item.id].indexOf(vv)<0 && kk==ak">错误</span>
                    </el-col>
                  </el-row>
                </el-form-item>
              </el-form>
            </div>
          </div>
        </div>
        <div v-for="(v,k) in questionData" v-if="k==158 && questionData[k].length>0">
          <div class="questionDiv" v-for="(item, key) in questionData[k]">
            {{item.number}}.<span style="color:#6a8dfb; margin-left:20px;">简答题</span><span
            style="font-size:14px; color:#fc83b6; margin-left:20px;">({{item.score}}分)</span>
            <p style="margin-left:30px;line-height:20px;width:96%" class="ql-editor" v-html="item.stem"></p>
            <div>
              <div class="eachAN scroll_bar">{{item.answer}}</div>
              <div class="eachSore">
                <el-form>
                  <el-form-item>
                    <el-row>
                      <el-col :span="1">
                      <span
                        style=" font-size:14px; color:rgb(251, 70, 153);display:block; line-height:40px;">本题得分</span>
                      </el-col>
                      <el-col :span="2">
                        <el-input v-model="correct[item.id]" placeholder="请填入分值">分</el-input>
                      </el-col>
                    </el-row>
                  </el-form-item>
                </el-form>
              </div>
            </div>
          </div>
        </div>
        <div style="height:90px; line-height:90px; text-indent:40px; border-bottom:1px #eee solid">
          本次得分<span style="color:#fb4699; font-size:40px; margin-left:20px;margin-right:10px;">{{totalScore}}</span>分
        </div>
      </div>
      <div class="bottom">
        <!--<el-button-->
        <!--style="width:360px;margin-top:34px; height:32px; line-height:0px; background-color:#58d788; border-color:#58d788"-->
        <!--type="primary">保存-->
        <!--</el-button>-->
        <el-button
          style="width:360px;margin-top:34px; height:32px; line-height:0px; background-color:rgb(106, 141, 251); border-color:rgb(106, 141, 251);"
          type="primary" @click="confirmAdd">提交
        </el-button>
      </div>
    </div>
  </div>

</template>

<script>
  export default {
    name: "index",
    components: {},
    data() {
      return {
        resultId: '',
        examId: '',
        examData: {},
        questionData: {},
        resultData: {},
        correct: {},
        objective_score: '',
        totalScore: '',
        answerData: {},
      };
    },
    activated() {
      this.getQueryData();
      this.myData();
    },
    watch: {
      'correct': {
        deep: true,
        handler(val, oldVal) {
          this.totalScore = this.objective_score;
          for (var i in val) {
            this.totalScore += Number(val[i]);
          }
        }
      }
    },
    methods: {
      getQueryData() {
        if (!this.$route.query.exam_id) {
          this.examId = this.$store.state.onlineExam.examiner_each.exam_id;
          this.resultId = this.$store.state.onlineExam.examiner_each.result_id;
          this.$router.push({
            path: '/examinerShortAn',
            query: {
              result_id: this.$store.state.onlineExam.examiner_each.result_id,
              exam_id: this.$store.state.onlineExam.examiner_each.exam_id
            }
          });
        } else {
          this.$store.dispatch('examinerEach', this.$route.query);
          this.resultId = this.$route.query.result_id;
          this.examId = this.$route.query.exam_id;
        }
      },
      myData() {
        this.$http.get(globalConfig.server + "exam/" + this.examId + '?see=answer').then((res) => {
          if (res.data.code == "30000") {
            this.examData = res.data.data;
            this.questionData = res.data.data.question_set;
            this.answerData = res.data.data.reference_set;
          } else {
            this.examData = {};
            this.questionData = {};
          }
        });

        this.$http.get(globalConfig.server + 'exam/result/' + this.resultId).then((res) => {
          if (res.data.code === '36000') {
            this.resultData = res.data.data;
            this.objective_score = this.totalScore = res.data.data.score;
          } else {
            this.resultData = {};
          }
        });
      },
      confirmAdd() {
        this.$http.post(globalConfig.server + 'exam/result/mark/' + this.resultId, {correct: this.correct}).then((res) => {
          if (res.data.code === '36010') {
            this.$notify.success({
              title: '成功',
              message: res.data.msg
            });
            let view = {};
            view.name = ' 简答批阅 ';
            view.path = '/examinerShortAn';
            this.$store.dispatch('delVisitedViews', view);
            this.$router.push({path: '/examinerReadEach', query: {id: this.examId}});
          } else {
            this.$notify.warning({
              title: '警告',
              message: res.data.msg
            });
          }
        });
      },
    }
  };
</script>

<style lang="scss" scoped>
  .ql-editor {
    min-height: initial !important;
  }

  #shortAnExam {
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
          margin-left: 30px;
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
        .eachAN {
          width: 94.5%;
          margin-left: 2%;
          margin-right: 2%;
          border: 1px #eee solid;
          height: 160px;
          color: #6a8dfb;
          border-bottom: none;
          padding: 8px 8px;
        }
        .eachSore {
          width: 94.5%;
          margin-left: 2%;
          margin-right: 2%;
          border: 1px #eee solid;
          height: 42px;
          padding: 8px 8px;
          margin-bottom: 20px;
        }
      }
    }
    .bottom {
      width: 100%;
      height: 100px;
      text-align: center;
    }
  }
</style>
