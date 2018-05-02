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
                  <el-form-item style="border:1px #eee solid; padding-bottom: 15px;border-radius: 5px;">
                    <el-radio-group v-model="optionsSelect" style="width:98%;margin-left:2%;">
                      <el-col :span="12" :key="val" v-for="(val,index) in singlen"
                              style="line-height:50px;height:50px;padding-top:14px;">
                        <el-radio :label="index">
                          <el-input size="small" v-model="options[index]" placeholder="请输入选项内容"></el-input>
                          <i class="el-icon-close" style="color: #c0c4cc;" @click.stop.prevent="singleSub(index)"></i>
                        </el-radio>
                      </el-col>
                    </el-radio-group>
                  </el-form-item>
                  <div class="midadd">
                    <span @click="singleAdd">+&nbsp;&nbsp;添加选项</span>
                  </div>
                </div>
                <div class="eachSore">
                  <div class="title">默认分值</div>
                  <el-row style="border:1px #eee solid; text-indent:20px;border-radius: 5px;">
                    <el-form-item label="默认分值" style="margin-top:20px;">
                      <el-col :span="4">
                        <el-input v-model="singleForm.score" placeholder="请填入分值">分</el-input>
                      </el-col>
                    </el-form-item>
                  </el-row>
                </div>
              </div>
            </el-form>
          </el-tab-pane>

          <el-tab-pane name="second" label="多选题" :disabled="tabDisabled[1]">
            <el-form :model="multiForm" onsubmit="return false;">
              <div class="qubody">
                <div class="topbody">
                  <div class="title"><span style="color: #ff0000d4;">*</span> 题干</div>
                  <vue-editor id="multiEditor" v-model="multiForm.stem" useCustomImageHandler
                              :disabled="editorDisabled"></vue-editor>
                </div>
                <div class="midbody">
                  <div class="title">选项</div>
                  <el-form-item style="border:1px #eee solid;padding-bottom: 20px;border-radius: 5px;">
                    <el-checkbox-group v-model="multiOptionsSelect" style="width:98%;margin-left:2%;">
                      <el-col :span="12" :key="val" v-for="(val,index) in boxlen"
                              style="line-height:50px;height:50px;padding-top:14px;">
                        <el-checkbox :label="index">
                          <el-input size="small" placeholder="请输入选项内容" v-model="multiOptions[index]"></el-input>
                          <i class="el-icon-close" style="color: #c0c4cc;" @click.stop.prevent="multiSub(index)"></i>
                        </el-checkbox>
                      </el-col>
                    </el-checkbox-group>
                  </el-form-item>
                  <div class="midadd">
                    <span @click="multiAdd">+&nbsp;&nbsp;添加选项</span>
                  </div>
                </div>
                <div class="eachSore">
                  <div class="title">默认分值</div>
                  <el-row style="border:1px #eee solid; text-indent:20px;">
                    <el-form-item label="默认分值" style="margin-top:20px;">
                      <el-col :span="4">
                        <el-input v-model="multiForm.score" placeholder="请填入分值">分</el-input>
                      </el-col>
                    </el-form-item>
                  </el-row>
                </div>
              </div>
            </el-form>
          </el-tab-pane>

          <el-tab-pane name="third" label="不定向选择" :disabled="tabDisabled[2]">
            <el-form :model="multiForm" onsubmit="return false;">
              <div class="qubody">
                <div class="topbody">
                  <div class="title"><span style="color: #ff0000d4;">*</span> 题干</div>
                  <vue-editor id="nonDirectionalEditor" v-model="multiForm.stem" useCustomImageHandler
                              :disabled="editorDisabled"></vue-editor>
                </div>
                <div class="midbody">
                  <div class="title">选项</div>
                  <el-form-item style="border:1px #eee solid;padding-bottom: 20px;border-radius: 5px;">
                    <el-checkbox-group v-model="multiOptionsSelect" style="width:98%;margin-left:2%;">
                      <el-col :span="12" :key="val" v-for="(val,index) in boxlen"
                              style="line-height:50px;height:50px;padding-top:14px;">
                        <el-checkbox :label="index">
                          <el-input size="small" placeholder="请输入选项内容" v-model="multiOptions[index]"></el-input>
                          <i class="el-icon-close" style="color: #c0c4cc;" @click.stop.prevent="multiSub(index)"></i>
                        </el-checkbox>
                      </el-col>
                    </el-checkbox-group>
                  </el-form-item>
                  <div class="midadd">
                    <span @click="multiAdd">+&nbsp;&nbsp;添加选项</span>
                  </div>
                </div>
                <div class="eachSore">
                  <div class="title">默认分值</div>
                  <el-row style="border:1px #eee solid; text-indent:20px;">
                    <el-form-item label="默认分值" style="margin-top:20px;">
                      <el-col :span="4">
                        <el-input v-model="multiForm.score" placeholder="请填入分值">分</el-input>
                      </el-col>
                    </el-form-item>
                  </el-row>
                </div>
              </div>
            </el-form>
          </el-tab-pane>

          <el-tab-pane name="fourth" label="判断题" :disabled="tabDisabled[3]">
            <el-form :model="judgeForm" onsubmit="return false;">
              <div class="qubody">
                <div class="topbody">
                  <div class="title"><span style="color: #ff0000d4;">*</span> 题干</div>
                  <vue-editor id="judgeEditor" v-model="judgeForm.stem" useCustomImageHandler
                              :disabled="editorDisabled"></vue-editor>
                </div>
                <div class="midbody">
                  <div class="title">选项</div>
                  <el-form-item style="border:1px #eee solid;padding-bottom: 20px;border-radius: 5px;">
                    <el-radio-group v-model="judgeOptionsSelect" style="width:98%;margin-left:2%;">
                      <el-col :span="12" :key="val" v-for="(val,index) in 2"
                              style="line-height:50px;height:50px;padding-top:14px;">
                        <el-radio :label="index">
                          <el-input size="small" v-model="judgeOptions[index]" placeholder="请输入选项内容"></el-input>
                        </el-radio>
                      </el-col>
                    </el-radio-group>
                  </el-form-item>
                </div>
                <div class="eachSore">
                  <div class="title">默认分值</div>
                  <el-row style="border:1px #eee solid; text-indent:20px;border-radius: 5px;">
                    <el-form-item label="默认分值" style="margin-top:20px;">
                      <el-col :span="4">
                        <el-input v-model="judgeForm.score" placeholder="请填入分值">分</el-input>
                      </el-col>
                    </el-form-item>
                  </el-row>
                </div>
              </div>
            </el-form>
          </el-tab-pane>

          <el-tab-pane name="five" label="填空题" :disabled="tabDisabled[4]">
            <el-form :model="blankForm" onsubmit="return false;">
              <div class="qubody">
                <div class="topbody">
                  <div class="title"><span style="color: #ff0000d4;">*</span> 题干</div>
                  <vue-editor id="completionEditor" v-model="blankForm.stem" useCustomImageHandler
                              :disabled="editorDisabled"></vue-editor>
                </div>
                <div class="midbody">
                  <div class="title">填空信息</div>
                  <el-form-item style="border:1px #eee solid; padding: 15px;border-radius: 5px;">
                    <el-row :gutter="20">
                      <el-col :span="8" v-for="(val,index) in spacelen" :key="index">
                        <span>第{{index+1}}处答案</span>
                        <el-input style="width:70%" size="small" placeholder="请输入选项内容"
                                  v-model="blankForm.answer[index]"></el-input>
                        <i class="el-icon-close" style="color: #c0c4cc;" @click.stop.prevent="blankSub(index)"></i>
                      </el-col>
                    </el-row>

                  </el-form-item>
                  <span
                    style="margin-left: 20%; color:rgb(252, 131, 182); margin-top:20px; margin-bottom:20px;display:block;">
                      说明：考生填写答案须跟上方答案完全相同，才能得分。录入答案时，请不要加多余的空格等干扰字符
                    </span>
                  <div class="midadd">
                    <span @click="blankAdd">+&nbsp;&nbsp;添加选项</span>
                  </div>
                </div>
                <div class="eachSore">
                  <div class="title">默认分值</div>
                  <el-row style="border:1px #eee solid; text-indent:20px;border-radius: 5px;">
                    <el-form-item label="默认分值" style="margin-top:20px;">
                      <el-col :span="4">
                        <el-input v-model="blankForm.score" placeholder="请填入分值">分</el-input>
                      </el-col>
                    </el-form-item>
                  </el-row>
                </div>
              </div>
            </el-form>
          </el-tab-pane>

          <el-tab-pane name="six" label="问答题" :disabled="tabDisabled[5]">
            <el-form :model="answerForm" onsubmit="return false;">
              <div class="qubody">
                <div class="topbody">
                  <div class="title"><span style="color: #ff0000d4;">*</span> 题干</div>
                  <vue-editor id="editor" v-model="answerForm.stem" useCustomImageHandler
                              :disabled="editorDisabled"></vue-editor>
                </div>
                <div class="eachSore">
                  <div class="title">默认分值</div>
                  <el-row style="border:1px #eee solid; text-indent:20px;border-radius: 5px;">
                    <el-form-item label="默认分值" style="margin-top:20px;">
                      <el-col :span="4">
                        <el-input v-model="answerForm.score" placeholder="请填入分值">分</el-input>
                      </el-col>
                    </el-form-item>
                  </el-row>
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

  export default {
    name: "index",
    components: {VueEditor},
    data() {
      return {
        activeName: "first",
        editorDisabled: false,
        //单选
        singlen: 4,
        singleForm: {
          stem: '',  //题干
          category: '',  //题目类型
          choice: {},  //选项
          answer: '',  //正确答案
          score: '',   //默认分值
          paper_id: '',  //试卷Id
        },
        options: [],  //试卷选项
        optionsSelect: '',  //试卷答案
        //多选 不定项选择
        boxlen: 4,
        multiForm: {
          paper_id: '',
          stem: '',  //题干
          category: '',  //题目类型
          choice: {},  //选项
          answer: [],  //正确答案
          score: '',   //默认分值
        },
        multiOptions: [],
        multiOptionsSelect: [],

        //判断题
        judgeForm: {
          paper_id: '',
          stem: '',
          category: '',
          choice: {},
          answer: '',
          score: ''
        },
        judgeOptions: [],
        judgeOptionsSelect: '',

        //填空题
        spacelen: 3,
        blankForm: {
          paper_id: '',
          stem: '',
          category: '',
          choice: {},
          answer: [],
          score: '',
        },

        //问答题
        answerForm: {
          paper_id: '',
          stem: '',
          category: '',
          choice: {},
          answer: null,
          score: '',
        },
        submitDisabled: false,
        quesId: '',  //编辑时候的题目id
        editQuesCategory: '',  //编辑时候的题目类型
        tabDisabled: [false, false, false, false, false, false],

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
                  this.singleForm.score = res.data.data.score;
                  for (var i in res.data.data.choice) {
                    this.options[i.charCodeAt() - 65] = res.data.data.choice[i];
                  }
                  this.singlen = this.options.length;
                  this.optionsSelect = res.data.data.answer.charCodeAt() - 65;
                  break;
                case 'second':
                  for (var i = 0; i < this.tabDisabled.length; i++) {
                    if (i === 1) {
                      this.tabDisabled[i] = false;
                    } else {
                      this.tabDisabled[i] = true;
                    }
                  }
                  this.multiOptions = [];
                  this.multiOptionsSelect = [];
                  this.multiForm.stem = res.data.data.stem;
                  this.multiForm.score = res.data.data.score;
                  for (var i in res.data.data.choice) {
                    this.multiOptions[i.charCodeAt() - 65] = res.data.data.choice[i];
                  }
                  this.boxlen = this.multiOptions.length;
                  for (var i = 0; i < res.data.data.answer.length; i++) {
                    this.multiOptionsSelect.push(i);
                  }
                  break;
                case 'third':
                  for (var i = 0; i < this.tabDisabled.length; i++) {
                    if (i === 2) {
                      this.tabDisabled[i] = false;
                    } else {
                      this.tabDisabled[i] = true;
                    }
                  }
                  this.multiOptions = [];
                  this.multiOptionsSelect = [];
                  this.multiForm.stem = res.data.data.stem;
                  this.multiForm.score = res.data.data.score;
                  for (var i in res.data.data.choice) {
                    this.multiOptions[i.charCodeAt() - 65] = res.data.data.choice[i];
                  }
                  this.boxlen = this.multiOptions.length;
                  for (var i = 0; i < res.data.data.answer.length; i++) {
                    this.multiOptionsSelect.push(i);
                  }
                  break;
                case 'fourth':
                  for (var i = 0; i < this.tabDisabled.length; i++) {
                    if (i === 3) {
                      this.tabDisabled[i] = false;
                    } else {
                      this.tabDisabled[i] = true;
                    }
                  }
                  this.judgeOptions = [];
                  this.judgeForm.stem = res.data.data.stem;
                  this.judgeForm.score = res.data.data.score;
                  for (var i in res.data.data.choice) {
                    this.judgeOptions[i.charCodeAt() - 65] = res.data.data.choice[i];
                  }
                  this.judgeOptionsSelect = res.data.data.answer.charCodeAt() - 65;
                  break;
                case 'five':
                  for (var i = 0; i < this.tabDisabled.length; i++) {
                    if (i === 4) {
                      this.tabDisabled[i] = false;
                    } else {
                      this.tabDisabled[i] = true;
                    }
                  }
                  this.blankForm.stem = res.data.data.stem;
                  this.blankForm.score = res.data.data.score;
                  this.blankForm.answer = res.data.data.answer;
                  this.spacelen = res.data.data.answer.length;
                  break;
                case 'six':
                  for (var i = 0; i < this.tabDisabled.length; i++) {
                    if (i === 5) {
                      this.tabDisabled[i] = false;
                    } else {
                      this.tabDisabled[i] = true;
                    }
                  }
                  this.answerForm.stem = res.data.data.stem;
                  this.answerForm.score = res.data.data.score;
                  break;
              }
            }
          });
        } else {
          this.tabDisabled = [false, false, false, false, false, false];
          this.initial();
        }
      },
      editQuesCategory(val) {
        if (val) {
          switch (Number(val)) {
            case 153:
              this.activeName = 'first';
              break;
            case 154:
              this.activeName = 'second';
              break;
            case 155:
              this.activeName = 'third';
              break;
            case 156:
              this.activeName = 'fourth';
              break;
            case 157:
              this.activeName = 'five';
              break;
            case 158:
              this.activeName = 'six';
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
        if (val.length > 0) {
          for (var i = 0; i < val.length; i++) {
            this.singleForm.choice[String.fromCharCode(65 + i)] = val[i];
          }
        }
      },
      optionsSelect(val) {
        if (val !== '') {
          this.singleForm.answer = String.fromCharCode(65 + Number(val));
        }
      },
      'singleForm': {
        deep: true,
        handler(val, old) {
          this.submitDisabled = false;
        }
      },
      multiOptions(val) {
        if (val.length > 0) {
          for (var i = 0; i < val.length; i++) {
            this.multiForm.choice[String.fromCharCode(65 + i)] = val[i];
          }
        }
      },
      multiOptionsSelect(val) {
        this.multiForm.answer = [];
        if (val) {
          for (var i = 0; i < val.length; i++) {
            this.multiForm.answer.push(String.fromCharCode(65 + Number(val[i])));
          }
        }
      },
      'multiForm': {
        deep: true,
        handler(val, old) {
          this.submitDisabled = false;
        }
      },
      judgeOptions(val) {
        if (val.length > 0) {
          for (var i = 0; i < val.length; i++) {
            this.judgeForm.choice[String.fromCharCode(65 + i)] = val[i];
          }
        }
      },
      judgeOptionsSelect(val) {
        if (val !== '') {
          this.judgeForm.answer = String.fromCharCode(65 + Number(val));
        }
      },
      'judgeForm': {
        deep: true,
        handler(val, old) {
          this.submitDisabled = false;
        }
      },
      'blankForm': {
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
          this.multiForm.paper_id = data.paper_id;
          this.judgeForm.paper_id = data.paper_id;
          this.blankForm.paper_id = data.paper_id;
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
          this.$router.push({path: '/myselfQuestions', query: data});
        } else {
          let query = this.$route.query;
          this.singleForm.paper_id = query.paper_id;
          this.multiForm.paper_id = query.paper_id;
          this.judgeForm.paper_id = query.paper_id;
          this.blankForm.paper_id = query.paper_id;
          this.answerForm.paper_id = query.paper_id;
          if (query.type === 'add') {
            this.quesId = '';
            this.editQuesCategory = '';
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
            this.multiForm.category = 154;
            this.confirmAdd(this.multiForm);
            break;
          case 'third':
            this.multiForm.category = 155;
            this.confirmAdd(this.multiForm);
            break;
          case 'fourth':
            this.judgeForm.category = 156;
            this.confirmAdd(this.judgeForm);
            break;
          case 'five':
            this.blankForm.category = 157;
            this.confirmAdd(this.blankForm);
            break;
          case 'six':
            this.answerForm.category = 158;
            this.confirmAdd(this.answerForm);
            break;
        }
      },
      confirmAdd(val) {
        let header = '';
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
        for (var i = 0; i < this.options.length; i++) {
          this.singleForm.choice[String.fromCharCode(65 + i)] = this.options[i];
        }
        this.singleForm.answer = '';
        this.optionsSelect = '';
      },
      multiSub(index) {
        this.multiOptions[index] = '';
        for (var i = index; i < this.boxlen; i++) {
          this.multiOptions[i] = this.multiOptions[i + 1];
        }
        this.boxlen--;
        this.multiForm.choice = {};
        for (var i = 0; i < this.multiOptions.length; i++) {
          this.multiForm.choice[String.fromCharCode(65 + i)] = this.multiOptions[i];
        }
        this.multiForm.answer = [];
        this.multiOptionsSelect = [];
      },
      multiAdd() {
        this.boxlen++;
        this.submitDisabled = false;
      },
      blankAdd() {
        this.spacelen++;
        this.submitDisabled = false;
      },
      singleAdd() {
        this.singlen++;
        this.submitDisabled = false;
      },
      blankSub(index) {
        this.blankForm.answer[index] = '';

        for (var i = index; i < this.spacelen; i++) {
          this.blankForm.answer[i] = this.blankForm.answer[i + 1];
        }
        this.spacelen--;
        this.blankForm.answer.splice(this.spacelen, 1);
      },
      initial() {
        //单选
        this.singleForm.stem = '';
        this.singleForm.category = '';
        this.singleForm.choice = {};
        this.singleForm.answer = '';
        this.singleForm.score = '';
        this.options = [];
        this.optionsSelect = '';
        //多选 不定项选择
        this.multiForm.stem = '';
        this.multiForm.category = '';
        this.multiForm.choice = {};
        this.multiForm.score = '';
        this.multiOptions = [];
        this.multiOptionsSelect = [];
        //判断题
        this.judgeForm.stem = '';
        this.judgeForm.category = '';
        this.judgeForm.choice = {};
        this.judgeForm.answer = '';
        this.judgeForm.score = '';
        this.judgeOptions = [];
        this.judgeOptionsSelect = [];
        //填空题
        this.blankForm.stem = '';
        this.blankForm.category = '';
        this.blankForm.choice = {};
        this.blankForm.answer = [];
        this.blankForm.score = '';
        //问答题
        this.answerForm.stem = '';
        this.answerForm.category = '';
        this.answerForm.choice = {};
        this.answerForm.answer = null;
        this.answerForm.score = '';

      },
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
      .eachSore {
        height: 120px;

        .title {
          height: 40px;
          color: #83a0fc;
          line-height: 40px;
          text-indent: 0px;
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
