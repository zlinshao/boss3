<template>
  <div>
    <div id="shortAnExam">
      <div class="tool">
        <el-row :gutter="80" style="width:90%;margin-top:16px;margin-left: 5%;">
          <el-col :span="7" style="margin-left:2%; margin-right:2%">
            <div class="import_questions" style="text-align:left;color:#464748;">
              <div class="qdiv" style="margin-top:15px;">场次名称：<span style="color:#6a8dfb">{{examData.name}}</span></div>
              <div class="qdiv">试卷名称：<span style="color:#6a8dfb">{{examData.paper && examData.paper.name}}</span></div>
              <div class="qdiv">试卷类型：<span style="color:#6a8dfb">{{examData.paper && examData.paper.category}}</span>
              </div>
            </div>
          </el-col>
          <el-col :span="7" style="margin-left:2%; margin-right:2%">
            <div class="import_questions" style="border: 1px solid #58d788;box-shadow: 0 0 3px 1px #58d788;">
              <div class="import_left"><span style="float:left; font-size:14px;">总时长</span><i
                style="float:right; color:#58d788;font-size:20px;" class="iconfont icon-shijian1"></i></div>
              <div><span style="font-size:70px; color:#58d788">{{examData.duration}}</span>分钟</div>
            </div>
          </el-col>
          <el-col :span="7" style="margin-left:2%; margin-right:2%">
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
            <span class="category_score">(单选题 {{item.score}} 分)</span>
            <el-row>
              <el-col :span="1" style="width: 50px;margin-top: -2px;">
                <p style="margin-left: 10px;width: 30px;display: inline-block;margin-top: 8px;">{{item.number}}.</p>
              </el-col>
              <el-col :span="15">
                <p style="line-height:30px;" class="ql-editor" v-html="item.stem"></p>
              </el-col>
            </el-row>
            <div style="width:96%;margin-left:50px;"
                 v-if="answerData && resultData">
              <div style="line-height: 30px;font-size: 15px;">
                <span style="color:#fc83b6;margin-right: 10px;">正确答案：
                  <span v-if="answerData[item.id]">{{answerData[item.id]}}</span>
                  <span v-else>暂无</span>
                </span> |
                <span style="color:#409EFF;margin-left: 10px;">本题得分：
                  <span v-if="resultData.objective_detail && resultData.objective_detail[item.id]"> {{resultData.objective_detail[item.id]}}</span>
                  <span v-else-if="resultData.subjective_detail && resultData.subjective_detail[item.id]"> {{resultData.subjective_detail[item.id]}}</span>
                  <span v-else> 暂无</span>
                </span>
              </div>
              <el-form>
                <el-form-item style="margin-top: 10px;">
                  <el-row :gutter="20">
                    <el-col :span="6" :key="index" v-for="(val,index) in item.choice"
                            style="line-height:24px;">
                      <span v-if="index == (resultData.answer && resultData.answer[item.id])"><el-radio>{{index}}：{{val}}</el-radio></span>
                      <span v-else>{{index}}：{{val}}</span>
                      <span style="color:rgb(88, 215, 136);margin-left:50px;"
                            v-if="(resultData.answer && resultData.answer[item.id]) == answerData[item.id] && (resultData.answer && resultData.answer[item.id])==index">正确</span>
                      <span style="color:#fc83b6;margin-left:50px;"
                            v-if="(resultData.answer && resultData.answer[item.id]) != answerData[item.id] && answerData[item.id] && (resultData.answer && resultData.answer[item.id])==index ">错误</span>
                    </el-col>
                  </el-row>
                </el-form-item>
              </el-form>
              <div class="eachSore" style="border: none;padding-left: 0px;"
                   v-if="resultData.waiting && resultData.waiting.indexOf(item.id)>-1">
                <el-form>
                  <el-form-item>
                    <el-row>
                      <el-col :span="1" style="min-width: 70px;">
                        <span
                          style=" font-size:14px; color:rgb(251, 70, 153);display:block; line-height:40px;">本题得分</span>
                      </el-col>
                      <el-col :span="2" style="min-width: 110px;">
                        <el-input v-model="correct[item.id]" placeholder="请填入分值">分</el-input>
                      </el-col>
                    </el-row>
                  </el-form-item>
                </el-form>
              </div>
            </div>
          </div>
        </div>
        <div v-for="(v, k) in questionData" v-if="(k==154 || k==155) && questionData[k].length>0">
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
            <div style="width:96%;margin-left:50px;"
                 v-if="answerData && resultData ">
              <div style="line-height: 30px;font-size: 15px;">
                <span style="color:#fc83b6;margin-right: 10px;">正确答案：
                  <span v-if="answerData[item.id]">{{answerData[item.id]}}</span>
                  <span v-else>暂无</span>
                </span> |
                <span style="color:#409EFF;margin-left: 10px;">本题得分：
                  <span v-if="resultData.objective_detail && resultData.objective_detail[item.id]"> {{resultData.objective_detail[item.id]}}</span>
                  <span v-else-if="resultData.subjective_detail && resultData.subjective_detail[item.id]"> {{resultData.subjective_detail[item.id]}}</span>
                  <span v-else> 暂无</span>
                </span>
              </div>
              <el-form>
                <el-form-item style="margin-top: 10px;">
                  <el-row :gutter="20">
                    <el-col :span="6" :key="index" v-for="(val,index) in item.choice" style="line-height:24px;">
                      <span
                        v-if="resultData.answer && resultData.answer[item.id] && resultData.answer[item.id].indexOf(index)>-1"><el-radio>{{index}}：{{val}}</el-radio></span>
                      <span v-else>{{index}}：{{val}}</span>
                      <span style="color:rgb(88, 215, 136);margin-left:50px;"
                            v-for="ans in (resultData && resultData.answer && resultData.answer[item.id])"
                            v-if="answerData && answerData[item.id] && answerData[item.id].indexOf(ans)>-1 && ans==index">正确</span>
                      <span style="color:#fc83b6;margin-left:50px;"
                            v-for="ans in (resultData && resultData.answer && resultData.answer[item.id])"
                            v-if="answerData && answerData[item.id] && answerData[item.id].indexOf(ans)<0 && ans==index">错误</span>
                    </el-col>
                  </el-row>
                </el-form-item>
              </el-form>
              <div class="eachSore" style="border: none;padding-left: 0px;"
                   v-if="resultData.waiting && resultData.waiting.indexOf(item.id)>-1">
                <el-form>
                  <el-form-item>
                    <el-row>
                      <el-col :span="1" style="min-width: 70px;">
                        <span
                          style=" font-size:14px; color:rgb(251, 70, 153);display:block; line-height:40px;">本题得分</span>
                      </el-col>
                      <el-col :span="2" style="min-width: 110px;">
                        <el-input v-model="correct[item.id]" placeholder="请填入分值">分</el-input>
                      </el-col>
                    </el-row>
                  </el-form-item>
                </el-form>
              </div>
            </div>
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
            <div style="width:96%;margin-left:50px;"
                 v-if="answerData && resultData">
              <div style="line-height: 30px;font-size: 15px;">
                <span style="color:#fc83b6;margin-right: 10px;">正确答案：
                  <span v-if="answerData[item.id]">{{answerData[item.id]}}</span>
                  <span v-else>暂无</span>
                </span> |
                <span style="color:#409EFF;margin-left: 10px;">本题得分：
                  <span v-if="resultData.objective_detail && resultData.objective_detail[item.id]"> {{resultData.objective_detail[item.id]}}</span>
                  <span v-else-if="resultData.subjective_detail && resultData.subjective_detail[item.id]"> {{resultData.subjective_detail[item.id]}}</span>
                  <span v-else> 暂无</span>
                </span>
              </div>
              <el-form>
                <el-form-item style="margin-top: 10px;">
                  <el-row :gutter="20">
                    <el-col :span="6" :key="index" v-for="(val,index) in item.choice" style="line-height:24px;">
                      <span v-if="index == (resultData.answer && resultData.answer[item.id])"><el-radio>{{index}}：{{val}}</el-radio></span>
                      <span v-else>{{index}}：{{val}}</span>
                      <span style="color:rgb(88, 215, 136);margin-left:50px;"
                            v-if="(resultData.answer && resultData.answer[item.id]) == answerData[item.id] && (resultData.answer && resultData.answer[item.id])==index">正确</span>
                      <span style="color:#fc83b6;margin-left:50px;"
                            v-if="(resultData.answer && resultData.answer[item.id]) != answerData[item.id] && answerData[item.id] && (resultData.answer && resultData.answer[item.id])==index">错误</span>
                    </el-col>
                  </el-row>
                </el-form-item>
              </el-form>
              <div class="eachSore" style="border: none;padding-left: 0px;"
                   v-if="resultData.waiting && resultData.waiting.indexOf(item.id)>-1">
                <el-form>
                  <el-form-item>
                    <el-row>
                      <el-col :span="1" style="min-width: 70px;">
                        <span
                          style=" font-size:14px; color:rgb(251, 70, 153);display:block; line-height:40px;">本题得分</span>
                      </el-col>
                      <el-col :span="2" style="min-width: 110px;">
                        <el-input v-model="correct[item.id]" placeholder="请填入分值">分</el-input>
                      </el-col>
                    </el-row>
                  </el-form-item>
                </el-form>
              </div>
            </div>
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
            <div style="width:96%;margin-left:50px;"
                 v-if="answerData && resultData">
              <div style="line-height: 30px;font-size: 15px;">
                <span style="color:#fc83b6;margin-right: 10px;">正确答案：
                  <span v-if="answerData[item.id]">{{answerData[item.id]}}</span>
                  <span v-else>暂无</span>
                </span> |
                <span style="color:#409EFF;margin-left: 10px;">本题得分：
                  <span v-if="resultData.objective_detail && resultData.objective_detail[item.id]"> {{resultData.objective_detail[item.id]}}</span>
                  <span v-else-if="resultData.subjective_detail && resultData.subjective_detail[item.id]"> {{resultData.subjective_detail[item.id]}}</span>
                  <span v-else> 暂无</span>
                </span>
              </div>
              <el-form>
                <el-form-item style="margin-top: 10px;">
                  <el-row :gutter="20">
                    <el-col :span="12" v-for="(value,ak) in item.answer_count" :key="ak" style="line-height: 24px;">
                      <el-input readOnly size="small" style="width:97%;"
                                v-model="resultData.answer && resultData.answer[item.id][ak]"
                                :placeholder="`第 ${ak+1} 处答案`"></el-input>
                      <span style="color:rgb(88, 215, 136);margin-left:17px;"
                            v-for="(vv, kk) in (resultData.answer && resultData.answer[item.id])"
                            v-if="answerData[item.id] && answerData[item.id].indexOf(vv)>-1 && kk==ak ">正确</span>
                      <span style="color:#fc83b6;margin-left:17px;"
                            v-for="(vv, kk) in (resultData.answer && resultData.answer[item.id])"
                            v-if="answerData[item.id] && answerData[item.id].indexOf(vv)<0 && kk==ak">错误</span>
                    </el-col>
                  </el-row>
                </el-form-item>
              </el-form>
              <div class="eachSore" style="border: none;padding-left: 0px;"
                   v-if="resultData.waiting && resultData.waiting.indexOf(item.id)>-1">
                <el-form>
                  <el-form-item>
                    <el-row>
                      <el-col :span="1" style="min-width: 70px;">
                        <span
                          style=" font-size:14px; color:rgb(251, 70, 153);display:block; line-height:40px;">本题得分</span>
                      </el-col>
                      <el-col :span="2" style="min-width: 110px;">
                        <el-input v-model="correct[item.id]" placeholder="请填入分值">分</el-input>
                      </el-col>
                    </el-row>
                  </el-form-item>
                </el-form>
              </div>
            </div>
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
            <div style="width:96%;margin-left:50px;min-height: 100px;">
              <div class="eachAN scroll_bar" v-if="resultData && resultData.answer && resultData.answer[item.id]">
                {{resultData.answer[item.id]}}
              </div>
              <div class="eachSore">
                <el-form>
                  <el-form-item>
                    <el-row>
                      <el-col :span="1" style="min-width: 70px;">
                        <span
                          style=" font-size:14px; color:rgb(251, 70, 153);display:block; line-height:40px;">本题得分</span>
                      </el-col>
                      <el-col :span="2" style="min-width: 110px;">
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
          type="primary" @click="confirmAdd">确认打分
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
            for (var i in res.data.data.objective_detail) {
              res.data.data.objective_detail[i] = res.data.data.objective_detail[i].toString();
            }
            for (var i in res.data.data.subjective_detail) {
              res.data.data.subjective_detail[i] = res.data.data.subjective_detail[i].toString();
            }
            this.objective_score = this.totalScore = res.data.data.objective_score;
            this.correct = res.data.data.subjective_detail;
            if (!this.correct) {
              this.correct = {};
              res.data.data.waiting.forEach((item) => {
                this.$set(this.correct, item, '');
              });
            }
          } else {
            this.correct = {};
            this.resultData = {};
            this.objective_score = this.totalScore = 0;
          }
        });
      },
      confirmAdd() {
        this.$confirm('确认打分吗?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
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
        }).catch(() => {
          this.$notify.info({
            title: "提示",
            message: "已取消打分"
          });
        });

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

  .el-form-item {
    margin-bottom: 15px !important;
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
          height: 30px;
          line-height: 30px;
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
      border-top: none;
      /*min-height: 500px;*/
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
        .eachAN {
          width: 94.5%;
          margin-right: 2%;
          border: 1px #eee solid;
          height: 160px;
          border-bottom: none;
          padding: 8px 8px;
        }
        .eachSore {
          width: 94.5%;
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
