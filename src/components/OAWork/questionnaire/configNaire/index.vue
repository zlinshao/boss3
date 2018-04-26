<template>
  <div>
    <div id="onlineExam">
      <div class="tool">
        <div class="tool_left">
          <span>问卷名称</span><br />
          <span style="color:#83a0fc;">2018年春季新员工入职考试</span>
        </div>
        <div class="tool_right">
          <el-button type="success" size="small" style="margin-right:10px; background-color:#58d788; border-color:#58d788;"  @click="openModalDialog()">
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
                  <el-input value="单择题" placeholder="搜索关键字" size="small">
                    <el-button slot="append" style="background-color:rgb(131, 160, 252); color:#fff;" size="small" class="search_button" >搜索试题</el-button>
                  </el-input>
                </el-form-item>                
                </el-col>
            </el-row>
          </el-form>
          <el-checkbox style="margin-left:2%; margin-bottom:10px;" :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange">全选</el-checkbox>
          <span style="font-size:14px; color:#fc83b6; margin-left:20px;">移除</span>
          <span style="font-size:14px; float:right; margin-right:20px; ">共&nbsp;<span style="color:#fc83b6;">8</span>&nbsp;项查询结果</span>
        </div>
        <div class="questionDiv" v-for="(total,x) in 2" >
          <el-checkbox v-model="formbox[x].check"></el-checkbox>&nbsp;&nbsp;&nbsp;{{x+1}}.<span style="color:#6a8dfb; margin-left:20px;">单选题</span>
          <span style="font-size:14px; color:#fc83b6; margin-left:20px;">(5分)</span>
          <span style="float:right; font-size:14px; color:#fc83b6; margin-right:20px;">移除</span>
          <span style="float:right; font-size:14px; color:rgb(88, 215, 136); margin-right:20px;">编辑</span>
          <span style="float:right; font-size:14px; color:rgb(88, 215, 136); margin-right:20px;">下一题</span>
          <span style="float:right; font-size:14px; color:rgb(88, 215, 136); margin-right:20px;">上一题</span>          
          <p style="margin-left:30px;line-height:30px;">对打包后的文件进行一次全局的 envify 转换。这使得压缩工具能清除调 Vue 源码中所有用环境变量条件包裹起来的警告语句。例如：对打包后的文件进行一次全局的 envify 转换。这使得压缩工具能清除调 Vue 源码中所有用环境变量条件包裹起来的警告语句。例如：</p>        
          <el-form :model="form1[x]" >
              <el-form-item v-model="form1[x].check" style="width:98%;margin-left:2%;">
                  <el-col :span="6" :key="index" v-for="(val,index) in answarData" style="line-height:24px;height: 24px;">
                     <span v-if="form1[x].check == val.id">{{val.id}}：{{val.name}}</span>
                     <span v-else>{{val.id}}：{{val.name}}</span>
                  </el-col>
              </el-form-item>
          </el-form>       
        </div>
         <div class="questionDiv" v-for="(total2,y) in 2" >
          <el-checkbox v-model="formbox[y].check"></el-checkbox>&nbsp;&nbsp;&nbsp;{{y+1+2}}.<span style="color:#6a8dfb; margin-left:20px;">多选题</span>
          <span style="font-size:14px; color:#fc83b6; margin-left:20px;">(5分)</span>
          <span style="float:right; font-size:14px; color:#fc83b6; margin-right:20px;">移除</span>
          <span style="float:right; font-size:14px; color:rgb(88, 215, 136); margin-right:20px;">编辑</span>
          <span style="float:right; font-size:14px; color:rgb(88, 215, 136); margin-right:20px;">下一题</span>
          <span style="float:right; font-size:14px; color:rgb(88, 215, 136); margin-right:20px;">上一题</span> 
          <p style="margin-left:30px;line-height:30px;">对打包后的文件进行一次全局的 envify 转换。这使得压缩工具能清除调 Vue 源码中所有用环境变量条件包裹起来的警告语句。例如：对打包后的文件进行一次全局的 envify 转换。这使得压缩工具能清除调 Vue 源码中所有用环境变量条件包裹起来的警告语句。例如：</p>        
          <el-form :model="form2[y]" >
              <el-form-item v-model="form2[y].check" style="width:98%;margin-left:2%;">
                  <el-col :span="6" :key="index1" v-for="(val,index1) in answarData" style="line-height:24px;height: 24px;">
                    <span v-if="form2[y].check[index1] == val.id">{{val.id}}：{{val.name}}</span>
                    <span v-else>{{val.id}}：{{val.name}}</span>
                  </el-col>
              </el-form-item>
          </el-form>      
        </div>
 
        <div class="questionDiv" v-for="(total4,k) in 2" >
          <el-checkbox v-model="formbox[k].check"></el-checkbox>&nbsp;&nbsp;&nbsp; {{k+1+6}}.<span style="color:#6a8dfb; margin-left:20px;">简单题</span>
          <span style="font-size:14px; color:#fc83b6; margin-left:20px;">(5分)</span>
          <span style="float:right; font-size:14px; color:#fc83b6; margin-right:20px;">移除</span>
          <span style="float:right; font-size:14px; color:rgb(88, 215, 136); margin-right:20px;">编辑</span>
          <span style="float:right; font-size:14px; color:rgb(88, 215, 136); margin-right:20px;">下一题</span>
          <span style="float:right; font-size:14px; color:rgb(88, 215, 136); margin-right:20px;">上一题</span> 
          <p style="margin-left:30px;line-height:20px;padding-right:10px;">对打包后的文件进行一次全局的 envify 转换。这使得压缩工具能清除调 Vue 源码中所有用环境变量条件包裹起来的警告语句。例如：对打包后的文件进行一次全局的 envify 转换。这使得压缩工具能清除调 Vue 源码中所有用环境变量条件包裹起来的警告语句。例如：</p>        
          <el-form :model="form3[k]" >
              <el-form-item >
                <el-input readonly style="width:97%;margin-left:2%;" v-model="form4[k].check" type="textarea"></el-input>
              </el-form-item>
          </el-form>       
        </div>   
      </div>
      </div>

    <div id="testPaperDialog">
      <el-dialog :close-on-click-modal="false" :visible.sync="testPaperDialog" title="新建问卷" width="38%" style="margin-top:18vh">
        <el-row :gutter="30" style="margin-bottom:26px;">
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
      isIndeterminate: true,
      checkAll: false,
      disfalg: false,
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
      },
      answarData: [
        { id: "A", name: "选项答案" },
        { id: "B", name: "选项答案" },
        { id: "C", name: "选项答案" },
        { id: "D", name: "选项答案" }
      ],
      answarData2: [
        { id: "对", name: "选项答案" },
        { id: "错", name: "选项答案" }
      ],
      form1: [{ check: "B" }, { check: "D" }],
      form2: [{ check: ["A", "B"] }, { check: ["A", "", "C", "D"] }],
      form3: [{ check: "对" }, { check: "错" }],
      form4: [{ check: " " }, { check: " " }],
      formbox: [
        { check: "" },
        { check: "" },
        { check: "" },
        { check: "" },
        { check: "" },
        { check: "" },
        { check: "" },
        { check: "" }
      ]
    };
  },
  mounted() {},
  watch: {},
  methods: {
    importQuestion() {
      this.testPaperDialog = false;
      this.$router.push({ path: "/batchQuestions" });
    },
    myselfQuestion() {
      this.testPaperDialog = false;
      this.$router.push({ path: "/myselfQuestions" });
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
