<template>
  <div id="previewNaire">
    <div>
      <div class="tool">
        <img width="100%" height="142px" src="../../../../assets/images/preview.png"/>
        <div>
          <span>{{testPaperData.name}}</span>
          <span style="margin-left: 30px;">{{testPaperData.count}}<span style="font-size: 14px;"> 题</span></span>
        </div>
      </div>
      <div class="main">
        <div class="questionDiv" v-for="(item,key) in testPaperData.questions" v-if="item.category===153">
          <span class="category_score">({{questionType[item.category]}})</span>
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
          <span class="category_score">({{questionType[item.category]}})</span>
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
          <span class="category_score">({{questionType[item.category]}})</span>
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
             v-if="item.category===158">
          <span class="category_score">({{questionType[item.category]}})</span>
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
              <el-input style="width:97%;" readOnly type="textarea" placeholder="请填写答案"></el-input>
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
          this.testPaperId = this.$store.state.quesNaire.preview_naire_paper_id;
          this.$router.push({path: '/previewNaire', query: {id: this.$store.state.quesNaire.preview_naire_paper_id}});
        } else {
          this.$store.dispatch('previewNairePaperId', this.$route.query.id);
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
  #previewNaire {
    .ql-editor {
      min-height: initial !important;
      padding: 0px;
      margin: 0px;
    }
    .el-form-item {
      margin-bottom: 15px !important;
    }
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
      min-height: 500px;
      font-size: 16px;
      .questionDiv {
        width: 98%;
        margin-left: 2%;
        min-height: 90px;
        padding-top: 20px;
        border-bottom: 1px #eee solid;
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
