<template>
  <div>
    <div id="previewNaire">
      <div class="tool">
        <img width="100%" height="142px" src="../../../../assets/images/preview.png"/>
        <div>
          <span>{{testPaperData.name}}</span>
          <span style="margin-left: 30px;">{{testPaperData.count}}<span style="font-size: 14px;"> 题</span></span>
        </div>
      </div>
      <div class="main">
        <div class="questionDiv" v-for="(item,key) in testPaperData.questions" v-if="item.category===153">
          <span style="margin-left: 10px;width: 30px;display: inline-block;">{{key+1}}.</span>
          <span style="color:#6a8dfb;">单选题</span>
          <p style="width:96%;margin-left:44px;line-height:30px;padding-left:0;" class="ql-editor"
             v-html="item.stem"></p>
          <el-form>
            <el-form-item style="width:96%;margin-left:44px;">
              <el-col :span="6" :key="index" v-for="(val,index) in item.choice" style="line-height:24px;">
                {{index}}：{{val}}
              </el-col>
            </el-form-item>
          </el-form>
        </div>
        <div class="questionDiv" v-for="(item,key) in testPaperData.questions"
             v-if="item.category===154 || item.category===155">
          <span style="margin-left: 10px;width: 30px;display: inline-block;">{{key+1}}.</span>
          <span style="color:#6a8dfb;">
          <span v-if="item.category===154">多选题</span>
          <span v-if="item.category===155">不定向选择题</span></span>
          <p style="width:96%;margin-left:44px;line-height:30px;padding-left:0;" class="ql-editor"
             v-html="item.stem"></p>
          <el-form>
            <el-form-item style="width:96%;margin-left:44px;">
              <el-col :span="6" :key="index" v-for="(val,index) in item.choice" style="line-height:24px;">
                {{index}}：{{val}}
              </el-col>
            </el-form-item>
          </el-form>
        </div>
        <div class="questionDiv" v-for="(item,key) in testPaperData.questions" v-if="item.category===156">
          <span style="margin-left: 10px;width: 30px;display: inline-block;">{{key+1}}.</span>
          <span style="color:#6a8dfb;">判断题</span>
          <p style="width:96%;margin-left:44px;line-height:30px;padding-left:0;" class="ql-editor"
             v-html="item.stem"></p>
          <el-form>
            <el-form-item style="width:96%;margin-left:44px;">
              <el-col :span="6" :key="index" v-for="(val,index) in item.choice" style="line-height:24px;">
                {{index}}：{{val}}
              </el-col>
            </el-form-item>
          </el-form>
        </div>
        <div class="questionDiv" v-for="(item,key) in testPaperData.questions"
             v-if="item.category===158">
          <span style="margin-left: 10px;width: 30px;display: inline-block;">{{key+1}}.</span>
          <span style="color:#6a8dfb;"><span v-if="item.category===158">简答题</span></span>
          <p style="width:96%;margin-left:44px;line-height:30px;padding-left:0;" class="ql-editor"
             v-html="item.stem"></p>
          <el-form>
            <el-form-item v-if="item.category===158">
              <el-input style="width:96%;margin-left:44px;" readOnly type="textarea" placeholder="请填写答案"></el-input>
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
      };
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
  .ql-editor {
    min-height: initial !important;
  }
  .el-form-item {
    margin-bottom: 12px !important;
  }
  #previewNaire {
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
        min-height: 100px;
        padding-top: 16px;
        border-top: 1px #eee solid;
      }
    }
  }
</style>
