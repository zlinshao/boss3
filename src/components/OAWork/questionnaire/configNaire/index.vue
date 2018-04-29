<template>
  <div>
    <div id="onlineExam">
      <div class="tool">
        <div class="tool_left">
          <span>问卷名称</span><br />
          <span style="color:#83a0fc;">{{testPaperData.name}}</span>
        </div>
        <div class="tool_right">
          <el-button type="success" size="small" style="margin-right:10px; background-color:#58d788; border-color:#58d788;"  @click="openModalDialog()">
            <i class="iconfont icon-tianjiagenjin"></i>&nbsp;添加题目
          </el-button>
        </div>

      </div>
      <div class="main">
        <div>
          <el-form :model="formExam" >
            <el-row>
              <el-col :span="5" style="margin-left:20px; margin-top:20px;">
                <el-form-item label="题目类型">
                    <el-select size="small" :model="formExam" value="单择题">
                      <el-option value="单择题">单择题</el-option>
                      <el-option value="多选题">多选题</el-option>
                      <el-option value="判断题">判断题</el-option>
                    </el-select>  
                </el-form-item>
              </el-col>
              <el-col :span="5" style="margin-top:20px;"> 
                <el-form-item label="试题编号">
                  <el-input style="width:200px;" value="选择题" size="small"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="4" style="float:right;margin-top:20px;">
                <el-form-item style="margin-right: 10px;">
                  <el-input value="选择题" placeholder="搜索关键字" size="small">
                    <el-button slot="append" style="background-color:rgb(131, 160, 252); color:#fff;" size="small" class="search_button" >搜索题目</el-button>
                  </el-input>
                </el-form-item>                
                </el-col>
            </el-row>
          </el-form>
          <el-checkbox style="margin-left:2%; margin-bottom:10px;" :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange">全选</el-checkbox>
          <span style="font-size:14px; color:#fc83b6; margin-left:20px;">移除</span>
          <span style="font-size:14px; float:right; margin-right:20px; " v-if="testPaperData && testPaperData.questions">共&nbsp;<span style="color:#fc83b6;">{{testPaperData.questions.length}}</span>&nbsp;项查询结果</span>
        </div>
        <div class="questionDiv" v-for="(item,key) in testPaperData.questions" v-if="item.category===153">
          <el-checkbox v-model="formbox[key] && formbox[key].check"></el-checkbox>&nbsp;&nbsp;&nbsp;{{key+1}}.<span
          style="color:#6a8dfb; margin-left:20px;">选择题</span>
          <span class="remove" @click="deleteQues(item.id)">移除</span>
          <span class="edit_question" @click="editQues(item)">编辑</span>
          <span class="move_down" @click="moveDown(item.id)">下移</span>
          <span class="move_up" @click="moveUp(item.id)">上移</span>
          <p style="margin-left:30px;line-height:30px;" v-html="item.stem"></p>
          <div style="width:98%;margin-left:2%;">
            <el-col :span="6" :key="index" v-for="(val,index) in item.choice" style="line-height:25px;height: 25px; overflow: hidden;">
              <span :title="val">{{index}}：{{val}}</span>
            </el-col>
          </div>
        </div>

        <div class="questionDiv" v-for="(item,key) in testPaperData.questions"
             v-if="item.category===158">
          <el-checkbox v-model="formbox[key].check"></el-checkbox>&nbsp;&nbsp;&nbsp; {{key+1}}.<span
          style="color:#6a8dfb; margin-left:20px;">简答题</span>
          <span class="remove" @click="deleteQues(item.id)">移除</span>
          <span class="edit_question" @click="editQues(item)">编辑</span>
          <span class="move_down" @click="moveDown(item.id)">下移</span>
          <span class="move_up" @click="moveUp(item.id)">上移</span>
          <p style="margin-left:30px;line-height:20px;padding-right:10px;">{{item.stem}}</p>
          <div style="width:98%;margin-left:2%;">
            <el-col :span="12" :key="index" v-for="(val,index) in item.answer" v-if="item.answer.length>0"
                    style="line-height:25px;height: 25px;">
              <div></div>
            </el-col>
          </div>
        </div>
      </div>
      </div>

    <div id="testPaperDialog">
      <el-dialog :close-on-click-modal="false" :visible.sync="testPaperDialog" title="新建调查" width="38%" style="margin-top:18vh">
        <el-row :gutter="30" style="margin-bottom:26px;">
          <el-col :span="12">
            <div class="import_questions" @click="importQuestion">
              <div><img src="../../../../assets/images/examination/import_question.svg"><br/>批量导入调查</div>
            </div>
          </el-col>
          <el-col :span="12">
            <div class="import_questions" @click="myselfQuestion" style="border: 1px solid #fda2cc;box-shadow: 0 0 3px 1px #fda2cc;">
              <div><img src="../../../../assets/images/examination/self_entry.svg"><br/>自己录入</div>
            </div>
          </el-col>
        </el-row>
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
      testPaperDialog: false,
      formExam: {
        name: "",
        description: ""
      },
      formbox: [],   //选中的题目
      questionTypeCategory: [], //题目类型
      testPaperId: "",
      testPaperData: {}
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
      "testPaperData": {
        deep: true,
        handler(val, oldVal) {
          if (val.questions.length > 0) {
            this.formbox = [];
            for (var i = 0; i < val.questions.length; i++) {
              this.formbox.push({check: ''});
            }
          }
        }
      }
  },
  methods: {
    getQueryData() {
      if (!this.$route.query.id) {
        this.testPaperId = this.$store.state.onlineExam.edit_paper_id;
        this.$router.push({
          path: "/configNaire",
          query: { id: this.$store.state.onlineExam.edit_paper_id }
        });
      } else {
        this.$store.dispatch("editPaperId", this.$route.query.id);
        this.testPaperId = this.$route.query.id;
      }
    },
    getDictionary() {
      //试卷类型
      this.dictionary(152).then(res => {
        this.questionTypeCategory = res.data;
      });
    },
    //获取试题
    getTestPaperDetail() {
      if (this.testPaperId) {
        this.$http
          .get(globalConfig.server + "exam/paper/" + this.testPaperId)
          .then(res => {
            if (res.data.code === "36010") {
              this.testPaperData = res.data.data;
            } else {
              this.$notify.warning({
                title: "警告",
                message: res.data.msg
              });
            }
          });
      }
    },

      importQuestion() {
        this.testPaperDialog = false;
        this.$router.push({
          path: "/batchNaire",
          query: {name: this.testPaperData.name, type_id: this.testPaperData.category_id, type_name: this.testPaperData.category_name}
        });
      },
      myselfQuestion() {
        this.testPaperDialog = false;
        this.$router.push({path: "/myselfNaire", query: {paper_id: this.testPaperData.id,type: 'add'}});
      },
    openModalDialog() {
      this.testPaperDialog = true;
    },
    handleCheckAllChange(val) {
      this.checkedCities = val ? formbox : [];
      this.isIndeterminate = false;
    },
    handleCheckedCitiesChange(value) {
      let checkedCount = value.length;
      this.checkAll = checkedCount === this.formbox.length;
      this.isIndeterminate =
        checkedCount > 0 && checkedCount < this.formbox.length;
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
          query: {paper_id: this.testPaperId, quesId: val.id, category: val.category, type: 'edit'}
        });
      }
  }
};
</script>

<style lang="scss" scoped>
#onlineExam {
  .tool {
    height: 78px;
    border-radius: 5px;
    border: 1px #eee solid;
    border-bottom: none;
    padding: 0;
    .tool_left {
      margin-left: 20px;
      margin-top: 18px;
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
      min-height: 154px;
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
        }
        .edit_question, .move_down, .move_up {
          float: right;
          font-size: 14px;
          color: rgb(88, 215, 136);
          margin-right: 20px;
          cursor: pointer;
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
