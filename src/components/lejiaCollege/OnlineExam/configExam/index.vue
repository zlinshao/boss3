<template>
  <div>
    <div id="onlineExam">
      <div class="tool">
        <div class="tool_left">
          <span>试卷名称</span><br />
          <span style="color:#83a0fc;">2018年春季新员工入职考试</span>
        </div>
        <div class="tool_right">
          <el-button type="success" size="small" style="margin-right:18px; background-color:#58d788; border-color:#58d788;"  @click="openModalDialog()">
            <i class="iconfont icon-tianjiagenjin"></i>&nbsp;添加试题
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
                  <el-input style="width:200px;" value="单择题" size="small"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="4" style="float:right;margin-top:20px;">
                <el-form-item style="margin-right: 10px;">
                  <el-input value="单择题" placeholder="搜索关键字" size="small"  class="search_input">
                    <el-button slot="append" icon="el-icon-search" class="search_button" ></el-button>
                  </el-input>
                </el-form-item>                
                </el-col>
            </el-row>
          </el-form>
        </div>

      </div>
      </div>


    <div id="testPaperDialog">
      <el-dialog :close-on-click-modal="false" :visible.sync="testPaperDialog" title="新建试卷" width="50%">
        <el-row :gutter="30">
          <el-col :span="12">
            <div class="import_questions" @click="importQuestion">
              <div><img src="../../../../assets/images/examination/import_question.svg"><br/>批量导入试题</div>
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
      quizData: [
        {
          contract_num: 1,
          address: "abc"
        }
      ],
      examType: [
        { id: 1, name: "新员工入职" },
        { id: 2, name: "初级晋升考试" },
        { id: 3, name: "中级晋升考试" }
      ],
      testPaperDialog: false,
      formExam: {
        name: "",
        description: ""
      }
    };
  },
  mounted() {},
  watch: {},
  methods: {
    importQuestion() {
      this.testPaperDialog = false;
      this.$router.push({ path: "/batchQuestions" });
    },
    myselfQuestion(){
      this.testPaperDialog = false;
      this.$router.push({ path: "/myselfQuestions" });     
    },
    openModalDialog() {
      this.testPaperDialog = true;
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
        font-size: 18px;
      }
    }
  }
  .main {
    border: 1px #eee solid;
    border-bottom: none;
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
