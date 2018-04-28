<template>
  <div>
    <div id="onlineExam">
      <div class="qutitle">
        <div class="title1">题型</div>
        <el-tabs type="border-card" v-model="activeName">
          <el-tab-pane name="first" label="单选题" :disabled="tabDisabled[0]">
            <el-form :model="singleForm" onsubmit="return false;">
              <div class="qubody">
                <div class="topbody">
                  <div class="title"><span style="color: #ff0000d4;">*</span> 题干</div>
                  <vue-editor id="singleEditor" useCustomImageHandler :disabled="editorDisabled"
                              v-model="singleForm.stem"></vue-editor>
                </div>
                <div class="midbody">
                  <div class="title">选项</div>
                  <div class="title"><span style="cursor:pointer;" @click="naireFlagT">文字选项</span>&nbsp;&nbsp;&nbsp;<span style="cursor:pointer;" @click="naireFlagF">图片选项</span></div>
                  <el-form-item style="border:1px #eee solid; padding-bottom: 15px;border-radius: 5px; " v-model="optionsSelect" v-show="!naireFlag">
                      <el-col :span="12" :key="val" v-for="(val,index) in singlen"
                              style="line-height:50px;height:50px;padding-top:14px;">
                          <el-input size="small" style="width:60%; margin-left:5%;" v-model="options[index]" placeholder="请输入选项内容"></el-input>
                          <i class="el-icon-close" style="color: #c0c4cc;" @click="singleSub(index)"></i>
                      </el-col>
                  </el-form-item>
                  <el-form-item style=" padding-bottom: 15px;border-radius: 5px; " v-model="optionsSelect" v-show="naireFlag">
                    <Dropzone :ID="'naire'" @getImg="photo_success" :isClear="isClear"></Dropzone>
                  </el-form-item>
                  <div class="midadd">
                    <span @click="singleAdd">+&nbsp;&nbsp;添加选项</span>
                  </div>
                </div>

              </div>
            </el-form>
          </el-tab-pane>

          <el-tab-pane name="second" label="问答题" :disabled="tabDisabled[1]">
            <el-form :model="answerForm" onsubmit="return false;">
              <div class="qubody">
                <div class="topbody">
                  <div class="title"><span style="color: #ff0000d4;">*</span> 题干</div>
                  <vue-editor id="editor" v-model="answerForm.stem" useCustomImageHandler
                              :disabled="editorDisabled"></vue-editor>
                </div>

              </div>
            </el-form>
          </el-tab-pane>
        </el-tabs>
      </div>
      <div class="bottom">
        <el-button class="btn_submit" type="primary" @click="onSubmit" :disabled="submitDisabled">提交</el-button>
      </div>
    </div>
  </div>

</template>

<script>
  import {VueEditor} from "vue2-editor";
  import Dropzone from "../../../common/UPLOAD.vue";
  export default {
    name: "index",
    components: {VueEditor,Dropzone},
    data() {
      return {
        activeName: "first",
        editorDisabled: false,
        naireFlag:false,
        //单选
        singlen: 4,
        singReal:0,
        singmax:0,
        singleForm: {
          stem: '',  //题干
          category: '',  //题目类型
          choice: {},  //选项
          answer: '',  //正确答案
          paper_id: '',  //试卷Id
          pic_choice:[],  //图片标识
        },
        options: [],  //试卷选项
        optionsSelect: '',  //试卷答案

        //问答题
        answerForm: {
          paper_id: '',
          stem: '',
          category: '',
          choice: {},
          answer: null,
        },
        submitDisabled: false,
        quesId: '',  //编辑时候的题目id
        editQuesCategory: '',  //编辑时候的题目类型
        tabDisabled: [false, false],
        isClear: false,
        cover_id: [],
        uploadStatus: false,
        
      };
    },
    activated() {
      this.getQueryData();
    },
    watch: {
      quesId(val) {
        if (val) {
          this.$http.get(globalConfig.server + 'exam/question/' + val).then((res) => {
            if (res.data.code === '30000') {
              switch (this.activeName) {
                case 'first':
                  for (var i = 0; i < this.tabDisabled.length; i++) {
                    if (i === 0) {
                      this.tabDisabled[i] = false;
                    } else {
                      this.tabDisabled[i] = true;
                    }
                  }
                  this.options = [];
                  this.singleForm.stem = res.data.data.stem;
                  for (var i in res.data.data.choice) {
                    this.options[i.charCodeAt() - 65] = res.data.data.choice[i];
                  }
                  this.singlen = this.options.length;
                  this.optionsSelect = res.data.data.answer.charCodeAt() - 65;
                  break;

                case 'second':
                  for (var i = 0; i < this.tabDisabled.length; i++) {
                    if (i === 5) {
                      this.tabDisabled[i] = false;
                    } else {
                      this.tabDisabled[i] = true;
                    }
                  }
                  this.answerForm.stem = res.data.data.stem;
                  break;
              }
            }
          });
        } else {
          this.tabDisabled = [false, false];
        }
      },
      editQuesCategory(val) {
        if (val) {
          switch (Number(val)) {
            case 153:
              this.activeName = 'first';
              break;
            case 158:
              this.activeName = 'second';
              break;
          }
        }
      },
      activeName(val) {
        this.submitDisabled = false;
      },
      spacelen(val) {
        this.spacelen = val;
      },
      options(val) {
        this.singReal = val.length;      

      },
      optionsSelect(val) {
        this.singleForm.answer = String.fromCharCode(65 + Number(val));
      },
      'singleForm': {
        deep: true,
        handler(val, old) {
          this.submitDisabled = false;
        }
      },
      'answerForm': {
        deep: true,
        handler(val, old) {
          this.submitDisabled = false;
        }
      },
    },
  
    methods: {
      getQueryData() {
        if (!this.$route.query.paper_id) {
          let data = {};
          data.paper_id = this.$store.state.onlineExam.myself_test_paper.paper_id;
          data.quesId = this.quesId = this.$store.state.onlineExam.myself_test_paper.quesId;
          data.category = this.editQuesCategory = this.$store.state.onlineExam.myself_test_paper.category;
          data.type = this.editQuesCategory = this.$store.state.onlineExam.myself_test_paper.type;
          this.singleForm.paper_id = data.paper_id;
          this.answerForm.paper_id = data.paper_id;

          if (data.type === 'add') {
            this.quesId = '';
            this.editQuesCategory = '';
            for (var i = 0; i < this.tabDisabled.length; i++) {
              this.tabDisabled[i] = false;
            }
          } else if (data.type === 'edit') {
            this.quesId = data.quesId;
            this.editQuesCategory = data.category;
          }
          this.$router.push({path: '/myselfNaire', query: data});
        } else {
          let query = this.$route.query;
          this.singleForm.paper_id = query.paper_id;
          this.answerForm.paper_id = query.paper_id;
          if (query.type === 'add') {
            this.quesId = '';
            this.editQuesCategory = '';

            this.singleForm.stem ="";
            
            this.answerForm.stem = "";
            for (var i = 0; i < this.tabDisabled.length; i++) {
              this.tabDisabled[i] = false;
            }
          } else if (query.type === 'edit') {
            this.quesId = query.quesId;
            this.editQuesCategory = query.category;
          }
          this.$store.dispatch('myselfTestPaper', query);
        }

      },
      getDictionary() {
        //题目类型
        this.dictionary(152).then((res) => {
          //153---158
        });
      },
      onSubmit() {
        switch (this.activeName) {
          case 'first':
            this.singleForm.category = 153;
            this.confirmAdd(this.singleForm);
            break;
          case 'second':
            this.answerForm.category = 158;
            this.confirmAdd(this.answerForm);
            break;
        }
      },
      singleAdd() {
        this.singlen++;
      },
      confirmAdd(val) {
        let header = '';
        if (this.singReal > 0) {
          for (var i = 0; i < this.singReal; i++) {
            this.singleForm.choice[String.fromCharCode(65 + i)] = this.options[i];;
          }
        }
          if(this.cover_id.length>0){
            this.singleForm.pic_choice =[];
            for (var k = 0; k < this.cover_id.length; k++) {
            this.singleForm.choice[String.fromCharCode(65 + this.singReal  + k)] = this.cover_id[k];
            this.singleForm.pic_choice.push(String.fromCharCode(65 + this.singReal  + k))
          }
          }
        if (this.quesId) {
          header = this.$http.put(globalConfig.server + 'exam/question/' + this.quesId, val);
        } else {
          header = this.$http.post(globalConfig.server + 'exam/question', val);
        }
        header.then((res) => {
          if (res.data.code === '30010') {
            this.$notify.success({
              title: '成功',
              message: res.data.msg
            });
            this.submitDisabled = true;
          } else {
            this.$notify.warning({
              title: '警告',
              message: res.data.msg
            });
          }
        });
      },
      singleSub(index) {
        this.options[index] = '';
        for (var i = index; i < this.singlen; i++) {
          this.options[i] = this.options[i + 1];
        }
        this.singlen--;
        this.singleForm.choice = {};
        this.singReal = this.cover_id.length;
        for (var i = 0; i < this.options.length; i++) {
          this.singleForm.choice[String.fromCharCode(65 +this.singReal + i)] = this.options[i];
        }

        this.singleForm.answer = '';
      },
      // 上传成功
      photo_success(val) {
        this.cover_id = val[1];          
        this.uploadStatus = val[2];
      },
      naireFlagT(){
        this.naireFlag = false;
      },
      naireFlagF(){
        this.naireFlag = true;
      }
    }
  };
</script>

<style lang="scss" scoped>
  #onlineExam {
    .qutitle {
      width: 80%;
      margin: 0 auto;
      .title {
        height: 30px;
        color: #83a0fc;
        line-height: 30px;
        text-indent: 18px;
      }
      .title1 {
        height: 40px;
        color: #83a0fc;
        line-height: 40px;
        text-indent: 8px;
        &:before {
          border-radius: 2px;
          margin-right: 5px;
          background: #409EFF;
          border-left: 1px solid #409EFF;
          content: '|';
        }
      }
      .qubody {
        .title {
          height: 40px;
          color: #83a0fc;
          line-height: 40px;
          text-indent: 0px;
        }
      }
      .midbody {
        margin-top: 20px;
        .title {
          height: 40px;
          color: #83a0fc;
          line-height: 40px;
          text-indent: 0px;
        }
        .midadd {
          height: 50px;
          /*padding-top: 20px;*/
          /*border: 1px #eee solid;*/
          /*border-top: none;*/
          text-align: center;
          span {
            width: 380px;
            height: 30px;
            border: 1px #58d788 dashed;
            text-align: center;
            line-height: 30px;
            display: block;
            color: #58d788;
            background: #f3fdf6;
            margin-left: 32%;
            cursor: pointer;
          }
        }
      }
    }
    .bottom {
      width: 100%;
      height: 100px;
      text-align: center;

      .btn_submit {
        width: 360px;
        margin-top: 34px;
        height: 32px;
        line-height: 0px;
        background-color: rgb(106, 141, 251);
        border-color: rgb(106, 141, 251);
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
