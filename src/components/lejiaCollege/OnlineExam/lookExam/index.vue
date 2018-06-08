<template>
  <div>
    <div id="lookExam">
      <div class="tool">
        <el-row style="width:100%;margin-top:16px;">
          <el-col :span="5" style="margin-left:2%; margin-right:2%">
            <div class="import_questions" style="text-align:left;color:#464748; ">
              <div class="qdiv" style="margin-top:15px;">场次名称：<span style="color:#6a8dfb">{{examData.name}}</span></div>
              <div class="qdiv">试卷名称：<span style="color:#6a8dfb">{{examData.paper && examData.paper.name}}</span></div>
              <div class="qdiv">试卷类型：<span style="color:#6a8dfb">{{examData.paper && examData.paper.category}}</span></div>
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
          <el-col :span="5" style="margin-left:2%; margin-right:2%">
            <div class="import_questions" style="border: 1px solid #fb4699;box-shadow: 0 0 3px 1px #fb4699;">
              <div class="import_left"><span style="float:left; font-size:14px;">考试成绩</span><i
                style="float:right; color:#fb4699;font-size:20px;" class="iconfont icon-chengjiguanli"></i></div>
              <div><span style="font-size:70px; color:#fb4699">{{resultData.score}}</span>分</div>
              <span style="position: absolute;top: 85px;right: 55px;">(总分：{{examData.score}}分)</span>
            </div>
          </el-col>
        </el-row>
      </div>
      <div class="main" v-if="resultData">
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
              <el-form-item style="width: 96%;margin-left: 50px;">
                <div
                  v-if="answerData && resultData">
                  <div style="line-height: 30px;font-size: 15px;">
                    <span style="color:#fc83b6;margin-right: 10px;">正确答案： {{answerData[item.id]}}</span> |
                    <span style="color:#409EFF;margin-left: 10px;" >本题得分： <span v-if="resultData.objective_detail && resultData.objective_detail[item.id]">{{resultData.objective_detail[item.id]}}</span><span v-else>暂无</span></span>
                  </div>
                  <el-row :gutter="20" style="margin-top: 10px;">
                    <el-col :span="6" :key="index" v-for="(val,index) in item.choice" style="line-height:24px;">
                      <span v-if="index == (resultData.answer && resultData.answer[item.id])"><el-radio style="white-space: initial;">{{index}}：{{val}}</el-radio></span>
                      <span v-else>{{index}}：{{val}}</span>
                      <span style="color:rgb(88, 215, 136);margin-left:50px;"
                            v-if="(resultData.answer && resultData.answer[item.id]) == answerData[item.id] && (resultData.answer && resultData.answer[item.id])==index">正确</span>
                      <span style="color:#fc83b6;margin-left:50px;"
                            v-if="(resultData.answer && resultData.answer[item.id]) != answerData[item.id] && (resultData.answer && resultData.answer[item.id])==index">错误</span>
                    </el-col>
                  </el-row>
                </div>
              </el-form-item>
            </el-form>
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
            <el-form>
              <el-form-item style="width: 96%;margin-left: 50px;">
                <div
                  v-if="answerData && resultData">
                  <div style="line-height: 30px;font-size: 15px;">
                    <span style="color:#fc83b6;margin-right: 10px;">正确答案： {{answerData[item.id]}}</span> |
                    <span style="color:#409EFF;margin-left: 10px;" >本题得分： <span v-if="resultData.objective_detail && resultData.objective_detail[item.id]">{{resultData.objective_detail[item.id]}}</span><span v-else>暂无</span></span>
                  </div>
                  <el-row :gutter="20" style="margin-top: 10px;">
                    <el-col :span="6" :key="index" v-for="(val,index) in item.choice" style="line-height:24px;">
                      <span v-if="resultData.answer && resultData.answer[item.id] && resultData.answer[item.id].indexOf(index)>-1"><el-radio style="white-space: initial;">{{index}}：{{val}}</el-radio></span>
                      <span v-else>{{index}}：{{val}}</span>
                      <span style="color:rgb(88, 215, 136);margin-left:50px;" v-for="ans in (resultData.answer && resultData.answer[item.id])"
                            v-if="answerData[item.id] && answerData[item.id].indexOf(ans)>-1 && ans==index">正确</span>
                      <span style="color:#fc83b6;margin-left:50px;" v-for="ans in (resultData.answer && resultData.answer[item.id])"
                            v-if="answerData[item.id] && answerData[item.id].indexOf(ans)<0 && ans==index">错误</span>
                    </el-col>
                  </el-row>
                </div>
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
              <el-form-item style="width: 96%;margin-left: 50px;">
                <div
                  v-if="answerData && resultData">
                  <div style="line-height: 30px;font-size: 15px;">
                    <span style="color:#fc83b6;margin-right: 10px;">正确答案： {{answerData[item.id]}}</span> |
                    <span style="color:#409EFF;margin-left: 10px;" >本题得分： <span v-if="resultData.objective_detail && resultData.objective_detail[item.id]">{{resultData.objective_detail[item.id]}}</span><span v-else>暂无</span></span>
                  </div>
                  <el-row style="margin-top: 10px;">
                    <el-col :span="12" :key="index" v-for="(val,index) in item.choice"
                            style="line-height:24px;">
                      <span v-if="index == (resultData.answer && resultData.answer[item.id])"><el-radio style="white-space: initial;">{{index}}：{{val}}</el-radio></span>
                      <span v-else>{{index}}：{{val}}</span>
                      <span style="color:rgb(88, 215, 136);margin-left:50px;"
                            v-if="(resultData.answer && resultData.answer[item.id]) == answerData[item.id] && (resultData.answer && resultData.answer[item.id])==index">正确</span>
                      <span style="color:#fc83b6;margin-left:50px;"
                            v-if="(resultData.answer && resultData.answer[item.id]) != answerData[item.id] && (resultData.answer && resultData.answer[item.id])==index">错误</span>
                    </el-col>
                  </el-row>
                </div>
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
              <el-form-item style="width: 96%;margin-left: 50px;">
                <div
                  v-if="answerData && resultData">
                  <div style="line-height: 30px;font-size: 15px;">
                    <span style="color:#fc83b6;margin-right: 10px;">正确答案： {{answerData[item.id]}}</span> |
                    <span style="color:#409EFF;margin-left: 10px;" >本题得分： <span v-if="resultData.objective_detail && resultData.objective_detail[item.id]">{{resultData.objective_detail[item.id]}}</span><span v-else>暂无</span></span>
                  </div>
                  <el-row :gutter="20" style="margin-top: 10px;">
                    <el-col :span="12" v-for="(value,ak) in item.answer_count" :key="ak" style="line-height: 24px;">
                      <el-input readOnly style="width:97%;" size="small"
                                v-model="resultData.answer && resultData.answer[item.id][ak]" :placeholder="`第 ${ak+1} 处答案`"></el-input>
                      <span style="color:rgb(88, 215, 136);margin-left:16px;"
                            v-for="(vv, kk) in (resultData.answer && resultData.answer[item.id])"
                            v-if="answerData[item.id] && answerData[item.id].indexOf(vv)>-1 && kk==ak ">正确</span>
                      <span style="color:#fc83b6;margin-left:16px;" v-for="(vv, kk) in (resultData.answer && resultData.answer[item.id])"
                            v-if="answerData[item.id] && answerData[item.id].indexOf(vv)<0 && kk==ak">错误</span>
                    </el-col>
                  </el-row>
                </div>
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
            <div style="line-height: 30px;font-size: 15px;">
              <span style="color:#409EFF;margin-left: 50px;" >
                本题得分：
                <span v-if="resultData.subjective_detail && resultData.subjective_detail[item.id]">{{resultData.subjective_detail[item.id]}}</span>
                <span v-else>暂无</span></span>
            </div>
            <el-form>
              <el-form-item style="width: 96%;margin-left: 50px;margin-top: 10px;">
                <div>
                  <el-input readonly size="small" style="width: 98%;"
                            v-model="resultData && resultData.answer && resultData.answer[item.id]"
                            type="textarea" placeholder="请填写答案"></el-input>
                </div>
              </el-form-item>
            </el-form>
          </div>
        </div>
      </div>
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
        resultId: '',
        examId: '',
        examData: {},
        questionData: {},
        resultData: {},
        answerData: {},
      };
    },
    activated() {
      this.getQueryData();
      // this.getExamData();
      this.myData();
    },
    watch: {},
    methods: {
      getQueryData() {
        if (!this.$route.query.exam_id) {
          this.examId = this.$store.state.onlineExam.look_exam.exam_id;
          this.resultId = this.$store.state.onlineExam.look_exam.result_id;
          this.$router.push({
            path: '/lookExam',
            query: {
              result_id: this.$store.state.onlineExam.look_exam.result_id,
              exam_id: this.$store.state.onlineExam.look_exam.exam_id,
              from: this.$store.state.onlineExam.look_exam.from,
            }
          });
        } else {
          this.$store.dispatch('lookExam', this.$route.query);
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
            // this.objective_score = this.totalScore = res.data.data.score;
          } else {
            this.resultData = {};
          }
        });
      },
      // getExamData() {
      //   this.$http.get(globalConfig.server + 'exam/result/my/' + this.examId).then((res) => {
      //     if (res.data.code === '30000') {
      //       this.examData = res.data.data;
      //       this.questionData = res.data.data.question_set;
      //     } else {
      //       this.examData = [];
      //       this.questionData = [];
      //       this.$notify.warning({
      //         title: '警告',
      //         message: res.data.msg
      //       })
      //     }
      //   });
      // },
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

  .el-form-item .el-col span, .el-form-item .el-col span label {
    line-height: 24px;
  }

  #lookExam {
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
          span {
            font-size: 16px;
          }
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
        min-height: 100px;
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
  }
</style>
