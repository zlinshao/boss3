<template>
  <div>
    <div id="previewExam">
      <div class="tool">
        <el-row :gutter="80" style="width:90%;margin-top:16px;margin-left: 5%;">
          <el-col :span="7" style="margin-left:2%; margin-right:2%;">
            <div class="import_questions" style="text-align:left;color:#464748;">
              <div class="qdiv" style="margin-top:28px;">试卷名称：<span style="color:#6a8dfb">{{testPaperData.name}}</span>
              </div>
              <div class="qdiv">试卷类型：<span style="color:#6a8dfb">{{testPaperData.category}}</span></div>
            </div>
          </el-col>
          <el-col :span="7" style="margin-left:2%; margin-right:2%">
            <div class="import_questions" style="border: 1px solid #fdca41;box-shadow: 0 0 3px 1px #fdca41;">
              <div class="import_left"><span style="float:left; font-size:14px;">总题数</span><i
                style="float:right; color:#fdca41;font-size:20px;" class="iconfont icon-shujutu"></i></div>
              <div><span style="font-size:70px; color:#fdca41">{{testPaperData.count}}</span>题</div>
            </div>
          </el-col>
          <el-col :span="7" style="margin-left:2%; margin-right:2%">
            <div class="import_questions" style="border: 1px solid #fb4699;box-shadow: 0 0 3px 1px #fb4699;">
              <div class="import_left"><span style="float:left; font-size:14px;">总分值</span><i
                style="float:right; color:#fb4699;font-size:20px;" class="iconfont icon-chengjiguanli"></i></div>
              <div><span style="font-size:70px; color:#fb4699">{{testPaperData.score}}</span>分</div>
            </div>
          </el-col>
        </el-row>
      </div>
      <div class="main">
        <div class="questionDiv" v-for="(item,key) in testPaperData.questions" v-if="item.category===153">
          <span class="category_score">({{questionType[item.category]}} {{item.score}} 分)</span>
          <el-row>
            <el-col :span="1" style="width: 50px;margin-top: -2px;">
              <p style="margin-left: 10px;width: 30px;display: inline-block;margin-top: 8px;">{{key+1}}.</p>
            </el-col>
            <el-col :span="15">
              <p style="line-height:30px;" class="ql-editor" v-html="item.stem"></p>
            </el-col>
          </el-row>
          <el-form>
            <el-form-item style="width: 96%;margin-left: 50px;margin-top: 10px;">
              <el-row :gutter="20">
                <el-col :span="6" :key="index" v-for="(val,index) in item.choice" style="line-height:24px;">
                  {{index}}：{{val}}
                </el-col>
              </el-row>
            </el-form-item>
          </el-form>
        </div>
        <div class="questionDiv" v-for="(item,key) in testPaperData.questions"
             v-if="item.category===154 || item.category===155">
          <span class="category_score">({{questionType[item.category]}} {{item.score}} 分)</span>
          <el-row>
            <el-col :span="1" style="width: 50px;margin-top: -2px;">
              <p style="margin-left: 10px;width: 30px;display: inline-block;margin-top: 8px;">{{key+1}}.</p>
            </el-col>
            <el-col :span="15">
              <p style="line-height:30px;" class="ql-editor" v-html="item.stem"></p>
            </el-col>
          </el-row>
          <el-form>
            <el-form-item style="width: 96%;margin-left: 50px;margin-top: 10px;">
              <el-row :gutter="20">
                <el-col :span="6" :key="index" v-for="(val,index) in item.choice" style="line-height:24px;">
                  {{index}}：{{val}}
                </el-col>
              </el-row>
            </el-form-item>
          </el-form>
        </div>
        <div class="questionDiv" v-for="(item,key) in testPaperData.questions" v-if="item.category===156">
          <span class="category_score">({{questionType[item.category]}} {{item.score}} 分)</span>
          <el-row>
            <el-col :span="1" style="width: 50px;margin-top: -2px;">
              <p style="margin-left: 10px;width: 30px;display: inline-block;margin-top: 8px;">{{key+1}}.</p>
            </el-col>
            <el-col :span="15">
              <p style="line-height:30px;" class="ql-editor" v-html="item.stem"></p>
            </el-col>
          </el-row>
          <el-form>
            <el-form-item style="width: 96%;margin-left: 50px;margin-top: 10px;">
              <el-row :gutter="20">
                <el-col :span="6" :key="index" v-for="(val,index) in item.choice" style="line-height:24px;">
                  {{index}}：{{val}}
                </el-col>
              </el-row>
            </el-form-item>
          </el-form>
        </div>
        <div class="questionDiv" v-for="(item,key) in testPaperData.questions"
             v-if="item.category===157 || item.category===158">
          <span class="category_score">({{questionType[item.category]}} {{item.score}} 分)</span>
          <el-row>
            <el-col :span="1" style="width: 50px;margin-top: -2px;">
              <p style="margin-left: 10px;width: 30px;display: inline-block;margin-top: 8px;">{{key+1}}.</p>
            </el-col>
            <el-col :span="15">
              <p style="line-height:30px;" class="ql-editor" v-html="item.stem"></p>
            </el-col>
          </el-row>
          <el-form>
            <el-form-item style="width: 96%;margin-left: 50px;margin-top: 10px;" v-if="item.category===157">
              <el-col v-for="(value, kk) in item.answer" :key="value" :span="12">
                <el-input size="small" style="width:97%;" readOnly :placeholder="`请填写第 ${kk+1} 处答案`"></el-input>
              </el-col>
            </el-form-item>
            <el-form-item style="width: 95%;margin-left: 50px;margin-top: 10px;" v-if="item.category===158">
              <el-input readOnly type="textarea" placeholder="请填写答案"></el-input>
            </el-form-item>
          </el-form>
        </div>
      </div>
    </div>
  </div>

</template>

<script>
  export default {
    name: "index",
    data() {
      return {
        testPaperId: '',
        testPaperData: {},
        questionType: {},
      };
    },
    mounted() {
      this.dictionary(152, 1).then((res) => {
        let sub = {};
        for (let i = 0; i < res.data.length; i++) {
          sub[res.data[i].id] = res.data[i].dictionary_name;
        }
        this.questionType = sub;
      });
    },
    activated() {
      this.getQueryData();
      this.getTestPaperDetail();
    },
    watch: {},
    methods: {
      getQueryData() {
        if (!this.$route.query.id) {
          this.testPaperId = this.$store.state.onlineExam.preview_paper_id;
          this.$router.push({path: '/previewExam', query: {id: this.$store.state.onlineExam.preview_paper_id}});
        } else {
          this.$store.dispatch('previewPaperId', this.$route.query.id);
          this.testPaperId = this.$route.query.id;
        }
      },
      getTestPaperDetail() {
        if (this.testPaperId) {
          this.$http.get(globalConfig.server + 'exam/paper/' + this.testPaperId, {params: this.params}).then((res) => {
            if (res.data.code === '36010') {
              this.testPaperData = res.data.data;
            } else {
              this.$notify.warning({
                title: '警告',
                message: res.data.msg
              })
            }
          });
        }
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
    margin-bottom: 15px;
  }

  #previewExam {
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
  }
</style>
