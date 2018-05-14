<template>
  <div>
    <div id="configExam">
      <div class="tool">
        <div class="tool_left">
          <span style="font-size: 14px;line-height: 22px;">问卷名称：</span><span style="color:#83a0fc;">{{testPaperData.name}}</span><br/>
        </div>
        <div class="tool_right">
          <el-button type="success" size="mini"
                     style="margin-right:10px; background-color:#58d788; border-color:#58d788;"
                     @click="associatedExam">
            <i class="iconfont icon-jinrukaoshi" style="font-size: 14px;"></i>&nbsp;关联的问卷
          </el-button>
          <el-button type="success" size="mini"
                     style="margin-right:10px; background-color:#58d788; border-color:#58d788;"
                     @click="myselfQuestion">
            <i class="iconfont icon-tianjiagenjin" style="font-size: 14px;"></i>&nbsp;添加试题
          </el-button>
          <el-button type="success" size="mini"
                     style="margin-right:10px; background-color:#58d788; border-color:#58d788;"
                     @click="editPaper">
            <i class="el-icon-edit"></i>&nbsp;修改试卷
          </el-button>
        </div>
      </div>
      <div class="main">
        <div>
          <el-form :model="params">
            <el-row>
              <el-col :span="4" style="float:right;margin-top:20px;">
                <el-form-item style="margin-right: 10px;">
                  <el-input placeholder="搜索关键字" size="small" v-model="params.search"
                            @keyup.enter.native="getTestPaperDetail">
                    <el-button slot="append" style="background-color:rgb(131, 160, 252); color:#fff;" size="small"
                               class="search_button" @click="getTestPaperDetail">搜索试题
                    </el-button>
                  </el-input>
                </el-form-item>
              </el-col>
              <el-col :span="6 " style="margin-top:20px;float:right;">
                <el-form-item label="题目类型">
                  <el-select size="small" v-model="params.category" clearable>
                    <el-option v-for="item in questionTypeCategory" :key="item.id" :label="item.dictionary_name"
                               :value="item.id">{{item.dictionary_name}}
                    </el-option>
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
          <el-checkbox style="margin-left:2%; margin-bottom:10px;" :indeterminate="isIndeterminate" v-model="checkAll"
                       @change="handleCheckAllChange">全选
          </el-checkbox>
          <el-button style="font-size:14px; color:#fc83b6; margin-left:20px;cursor: pointer" @click="batchDelete"
                     size="mini">批量移除
          </el-button>
          <span style="font-size:14px; float:right; margin-right:20px; ">共&nbsp;
            <span style="color:#fc83b6;" v-if="testPaperData && testPaperData.questions">{{testPaperData.questions.length}}</span>&nbsp;项查询结果
          </span>
        </div>
        <div class="questionDiv" v-for="(item,key) in testPaperData.questions" v-if="item.category===153">
          <el-checkbox :label="item.id" v-model="formbox" @change="handleCheckedChange"></el-checkbox>
          <span style="margin-left: 10px;width: 30px;display: inline-block;">{{key+1}}.</span>
          <span style="color:#6a8dfb;">单选题</span>
          <span class="remove" @click="deleteQues(item.id)">移除</span>
          <span class="edit_question" @click="editQues(item)">编辑</span>
          <span class="move_down" @click="moveDown(item.id)" v-if="testPaperData.questions.length>1">下移</span>
          <span class="move_up" @click="moveUp(item.id)" v-if="testPaperData.questions.length>1">上移</span>
          <p style="width:96%;margin-left:3.5%;line-height:30px;padding-left:0;" class="ql-editor" v-html="item.stem"></p>
          <el-form>
            <el-form-item style="width:96%;margin-left:3.5%;">
              <el-row :gutter="20">
                <el-col :span="6" :key="index" v-for="(val,index) in item.choice" style="line-height:24px;">
                  <span>{{index}}：{{val}}</span>
                </el-col>
              </el-row>
            </el-form-item>
          </el-form>
        </div>
        <div class="questionDiv" v-for="(item,key) in testPaperData.questions"
             v-if="item.category===154 || item.category===155">
          <el-checkbox :label="item.id" v-model="formbox" @change="handleCheckedChange"></el-checkbox>
          <span style="margin-left: 10px;width: 30px;display: inline-block;">{{key+1}}.</span>
          <span style="color:#6a8dfb;"><span v-if="item.category===154">多选题</span><span
          v-if="item.category===155">不定向选择题</span></span>
          <span class="remove" @click="deleteQues(item.id)">移除</span>
          <span class="edit_question" @click="editQues(item)">编辑</span>
          <span class="move_down" @click="moveDown(item.id)" v-if="testPaperData.questions.length>1">下移</span>
          <span class="move_up" @click="moveUp(item.id)" v-if="testPaperData.questions.length>1">上移</span>
          <p style="width:96%;margin-left:3.5%;line-height:30px;padding-left:0;" class="ql-editor" v-html="item.stem"></p>
          <el-form>
            <el-form-item style="width:96%;margin-left:3.5%;">
              <el-row :gutter="20">
                <el-col :span="6" :key="index" v-for="(val,index) in item.choice" style="line-height:24px;">
                  <span >{{index}}：{{val}}</span>
                </el-col>
              </el-row>
            </el-form-item>
          </el-form>
        </div>
        <div class="questionDiv" v-for="(item,key) in testPaperData.questions" v-if="item.category===156">
          <el-checkbox :label="item.id" v-model="formbox" @change="handleCheckedChange"></el-checkbox>
          <span style="margin-left: 10px;width: 30px;display: inline-block;">{{key+1}}.</span>
          <span style="color:#6a8dfb;">判断题</span>
          <span class="remove" @click="deleteQues(item.id)">移除</span>
          <span class="edit_question" @click="editQues(item)">编辑</span>
          <span class="move_down" @click="moveDown(item.id)" v-if="testPaperData.questions.length>1">下移</span>
          <span class="move_up" @click="moveUp(item.id)" v-if="testPaperData.questions.length>1">上移</span>
          <p style="width:96%;margin-left:3.5%;line-height:30px;padding-left:0;" class="ql-editor" v-html="item.stem"></p>
          <el-form>
            <el-form-item style="width:96%;margin-left:3.5%;">
              <el-row :gutter="20">
                <el-col :span="6" :key="index" v-for="(val,index) in item.choice" style="line-height: 24px;">
                  <span>{{index}}：{{val}}</span>
                </el-col>
              </el-row>
            </el-form-item>
          </el-form>
        </div>
        <div class="questionDiv" v-for="(item,key) in testPaperData.questions"
             v-if="item.category===158">
          <el-checkbox :label="item.id" v-model="formbox" @change="handleCheckedChange"></el-checkbox><span style="margin-left: 10px;width: 30px;display: inline-block;">{{key+1}}.</span>
          <span style="color:#6a8dfb;">简答题</span>
          <span class="remove" @click="deleteQues(item.id)">移除</span>
          <span class="edit_question" @click="editQues(item)">编辑</span>
          <span class="move_down" @click="moveDown(item.id)" v-if="testPaperData.questions.length>1">下移</span>
          <span class="move_up" @click="moveUp(item.id)" v-if="testPaperData.questions.length>1">上移</span>
          <p style="width:96%;margin-left:3.5%;line-height:30px;padding-left:0;" class="ql-editor" v-html="item.stem"></p>
        </div>
      </div>
    </div>
    <div id="paperTypeDialog">
      <el-dialog :close-on-click-modal="false" :visible.sync="paperTypeDialog" title="编辑试卷" width="30%">
        <el-form :model="paperTypeForm" onsubmit="return false;" label-width="100px">
          <el-row>
            <el-form-item label="试卷名称" required>
              <el-input v-model="paperTypeForm.name" size="mini" placeholder="请输入名称" clearable></el-input>
            </el-form-item>
          </el-row>
        </el-form>
        <span slot="footer" class="dialog-footer">
            <el-button size="small" @click="paperTypeDialog = false">取消</el-button>
            <el-button size="small" type="primary" @click="editPaperConfirm">保存</el-button>
        </span>
      </el-dialog>
    </div>
    <div id="associatedExamDialog">
      <el-dialog :close-on-click-modal="false" :visible.sync="associatedExamDialog" title="关联的问卷" width="45%">
        <div style="margin-top: 20px;">
          <el-table
            :data="associatedExamData"
            :empty-text='tableStatus'
            v-loading="tableLoading"
            element-loading-text="拼命加载中"
            element-loading-spinner="el-icon-loading"
            element-loading-background="rgba(255, 255, 255, 0)"
            @row-click="rowClick"
            style="width: 100%">
            <el-table-column width="65">
              <template slot-scope="scope">
                <el-checkbox v-model="selectExamIds" :label="scope.row.id">
                  <span style="display: none">1</span>
                </el-checkbox>
              </template>
            </el-table-column>
            <el-table-column
              prop="name"
              label="考试名称">
            </el-table-column>
            <el-table-column
              prop="start_time"
              label="开考时间">
            </el-table-column>
          </el-table>
        </div>
        <div slot="footer" class="dialog-footer" style="text-align: center;">
          <el-button size="small" @click="associatedExamDialog=false">取消</el-button>
          <el-button size="small" type="primary" @click="synchroTestPaper">同步到考试</el-button>
        </div>
      </el-dialog>
    </div>
  </div>
</template>
<script>
  export default {
    name: "index",
    components: {},
    data() {
      return {
        isIndeterminate: true,
        checkAll: false,
        params: {
          category: '',
          search: ''
        },
        formbox: [],   //选中的题目
        questionTypeCategory: [], //题目类型
        testPaperId: '',
        testPaperData: {},
        associatedExamDialog: false,
        tableStatus: ' ',
        tableLoading: false,
        associatedExamData: [],
        selectExamIds: [],
        paperTypeDialog: false,  //编辑试卷 选择类型模态框
        paperTypeForm: {
          name: '',
          is_questionnaire: 1,
        },
        examType: [],
      };
    },
    mounted() {
      this.getDictionary();
    },
    activated() {
      this.getQueryData();
      this.getTestPaperDetail();
    },
    watch: {
      "params.category": {
        deep: true,
        handler(val, oldVal) {
          this.getTestPaperDetail();
        }
      },
      associatedExamDialog(val) {
        if (val) {
          this.getAssociatedExam();
        }
      },
    },
    methods: {
      editPaper() {
        this.paperTypeDialog = true;
      },
      associatedExam() {
        this.associatedExamDialog = true;
      },
      editPaperConfirm() {
        this.$http.put(globalConfig.server + 'exam/paper/' + this.testPaperId, this.paperTypeForm).then((res) => {
          if (res.data.code === '36010') {
            this.$notify.success({
              title: '成功',
              message: res.data.msg
            });
            this.getTestPaperDetail();
            this.paperTypeDialog = false;
          } else {
            this.$notify.warning({
              title: '警告',
              message: res.data.msg
            });
          }
        });
      },
      getAssociatedExam() {
        this.tableStatus = ' ';
        this.tableLoading = true;
        this.$http.get(globalConfig.server + 'exam/paper/exams/' + this.testPaperId).then((res) => {
          this.tableLoading = false;
          if (res.data.code === '36000') {
            this.associatedExamData = res.data.data;
          } else {
            this.associatedExamData = [];
            this.tableStatus = '暂无数据';
          }
        });
      },
      synchroTestPaper() {
        //同步试卷最新数据到考试的接口
        this.$http.post(globalConfig.server + 'exam/paper/sync/' + this.testPaperId, {ids: this.selectExamIds}).then((res) => {
          if (res.data.code === '36000') {
            this.associatedExamDialog = false;
            this.$notify.success({
              title: '成功',
              message: res.data.msg
            });
          } else {
            this.$notify.warning({
              title: '警告',
              message: res.data.msg
            });
          }
        });
      },
      rowClick(row, event, column) {
        this.radio = row.id;
      },
      getQueryData() {
        if (!this.$route.query.id) {
          this.testPaperId = this.$store.state.quesNaire.edit_naire_paper_id;
          this.$router.push({path: '/configNaire', query: {id: this.$store.state.quesNaire.edit_naire_paper_id}});
        } else {
          this.$store.dispatch('editNairePaperId', this.$route.query.id);
          this.testPaperId = this.$route.query.id;
        }
      },
      getDictionary() {
        //题目类型
        this.dictionary(152).then((res) => {
          this.questionTypeCategory = res.data;
        });
        //试卷类型
        this.dictionary(613).then((res) => {
          this.examType = res.data;
        });
      },
      getTestPaperDetail() {
        if (this.testPaperId) {
          this.$http.get(globalConfig.server + 'exam/paper/' + this.testPaperId, {params: this.params}).then((res) => {
            if (res.data.code === '36010') {
              this.testPaperData = res.data.data;
              this.paperTypeForm.name = res.data.data.name;
            } else {
              this.$notify.warning({
                title: '警告',
                message: res.data.msg
              });
            }
          });
        }
      },
      myselfQuestion() {
        this.$router.push({path: "/myselfNaire", query: {paper_id: this.testPaperId, type: 'add'}});
      },
      handleCheckAllChange(val) {
        if (val) {
          if (this.testPaperData.questions && this.testPaperData.questions.length > 0) {
            this.formbox = [];
            for (var i = 0; i < this.testPaperData.questions.length; i++) {
              this.formbox.push(this.testPaperData.questions[i].id);
            }
          }
        } else {
          this.formbox = [];
        }
        this.isIndeterminate = false;
      },
      handleCheckedChange(value) {
        let checkedCount = this.formbox.length;
        this.checkAll = checkedCount === this.testPaperData.questions.length;
        this.isIndeterminate =
          checkedCount > 0 && checkedCount < this.testPaperData.questions.length;
      },
      //题目下移
      moveDown(id) {
        this.$http.post(globalConfig.server + 'exam/question/down/' + id).then((res) => {
          if (res.data.code === "30010") {
            this.$notify.success({
              title: '成功',
              message: res.data.msg
            });
            this.getTestPaperDetail();
          } else {
            this.$notify.warning({
              title: '警告',
              message: res.data.msg
            });
          }
        });
      },
      //题目上移
      moveUp(id) {
        this.$http.post(globalConfig.server + 'exam/question/up/' + id).then((res) => {
          if (res.data.code === "30010") {
            this.$notify.success({
              title: '成功',
              message: res.data.msg
            });
            this.getTestPaperDetail();
          } else {
            this.$notify.warning({
              title: '警告',
              message: res.data.msg
            });
          }
        });
      },
      //删除题目
      deleteQues(id) {
        this.$confirm("删除后不可恢复, 是否继续?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }).then(() => {
          this.$http.post(globalConfig.server + 'exam/question/delete/' + id).then((res) => {
            if (res.data.code === "30010") {
              this.$notify.success({
                title: '成功',
                message: res.data.msg
              });
              this.getTestPaperDetail();
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
            message: "已取消删除"
          });
        });
      },
      //编辑题目
      editQues(val) {
        this.$router.push({
          path: '/myselfNaire',
          query: {paper_id: this.testPaperId,category:val.category, quesId: val.id, type: 'edit'}
        });
      },
      batchDelete() {
        if (this.formbox.length > 0) {
          let batchQuesIds = this.formbox.join(',');
          this.$confirm("删除后不可恢复, 是否继续?", "提示", {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            type: "warning"
          }).then(() => {
            this.$http.post(globalConfig.server + 'exam/question/delete/' + batchQuesIds).then((res) => {
              if (res.data.code === "30010") {
                this.$notify.success({
                  title: '成功',
                  message: res.data.msg
                });
                this.getTestPaperDetail();
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
              message: "已取消删除"
            });
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

  #configExam {
    .tool {
      height: 78px;
      border-radius: 5px;
      border: 1px #eee solid;
      border-bottom: none;
      padding: 0;
      .tool_left {
        margin-left: 20px;
        margin-top: 30px;
        span {
          font-size: 16px;
        }
      }
    }
    .main {
      border: 1px #eee solid;
      border-bottom: none;
      font-size: 16px;
      .questionDiv {
        width: 98%;
        margin-left: 2%;
        min-height: 100px;
        padding-top: 16px;
        border-top: 1px #eee solid;
        .ques_score {
          font-size: 14px;
          color: #fc83b6;
          margin-left: 20px;
        }
        .remove {
          float: right;
          font-size: 14px;
          color: #fc83b6;
          margin-right: 20px;
          cursor: pointer;
          border: 1px solid #dcdfe6;
          padding: 3px 8px;
          border-radius: 5px;
          box-shadow: 0 0 3px 1px #eee;
        }
        .edit_question, .move_down, .move_up {
          float: right;
          font-size: 14px;
          color: rgb(88, 215, 136);
          margin-right: 20px;
          cursor: pointer;
          border: 1px solid #dcdfe6;
          padding: 3px 8px;
          border-radius: 5px;
          box-shadow: 0 0 3px 1px #eee;
        }
      }
    }
  }

  #testPaperDialog {
    padding: 25px 15px;
    .import_questions {
      border: 1px solid #b4c6fd;
      -webkit-box-shadow: 0 0 3px 1px #b4c6fd;
      box-shadow: 0 0 3px 1px #b4c6fd;
      text-align: center;
      display: flex;
      align-items: center;
      justify-content: center;
      height: 180px;
      border-radius: 5px;
    }
  }
</style>
