<template>
  <div>
    <div id="onlineExam">
      <div class="tool">
        <el-row style="width:100%;margin-top:16px;">
          <el-col :span="5" style="margin-left:2%; margin-right:2%">
            <div class="import_questions" style="text-align:left;" >
              <div class="qdiv">试卷名称：<span style="color:#6a8dfb">2018春季新员工入职考试</span></div>
              <div class="qdiv">试卷类型：<span style="color:#6a8dfb">新员工入职考试</span></div>
              <div class="qdiv">试卷考法：<span style="color:#6a8dfb">按总时长计时，按试卷顺序作答</span></div>
            </div>
          </el-col>
          <el-col :span="5" style="margin-left:2%; margin-right:2%">
            <div class="import_questions" style="border: 1px solid #58d788;box-shadow: 0 0 3px 1px #58d788;">
              <div class="import_left"><span style="float:left; font-size:14px;">总时长</span><i style="float:right; color:#58d788;font-size:20px;" class="iconfont icon-shijian1"></i></div>
              <div><span style="font-size:70px; color:#58d788">60</span>分钟</div>
            </div>
          </el-col>
          <el-col :span="5" style="margin-left:2%; margin-right:2%">
            <div class="import_questions" style="border: 1px solid #fdca41;box-shadow: 0 0 3px 1px #fdca41;">
              <div class="import_left"><span style="float:left; font-size:14px;">总题数</span><i style="float:right; color:#fdca41;font-size:20px;" class="iconfont icon-shujutu"></i></div>
              <div><span style="font-size:70px; color:#fdca41">20</span>题</div>
            </div>
          </el-col>
          <el-col :span="5" style="margin-left:2%; margin-right:2%">
            <div class="import_questions" style="border: 1px solid #fb4699;box-shadow: 0 0 3px 1px #fb4699;">
              <div class="import_left"><span style="float:left; font-size:14px;">总分值</span><i style="float:right; color:#fb4699;font-size:20px;" class="iconfont icon-chengjiguanli"></i></div>
              <div><span style="font-size:70px; color:#fb4699">90</span>分</div>
            </div>
          </el-col>                    
        </el-row>
      </div>
      <div class="main">
        <div class="questionDiv" v-for="(total,x) in 2" >
          {{x+1}}.<span style="color:#6a8dfb; margin-left:20px;">单选题</span>
          <p style="margin-left:30px;line-height:30px;">对打包后的文件进行一次全局的 envify 转换。这使得压缩工具能清除调 Vue 源码中所有用环境变量条件包裹起来的警告语句。例如：对打包后的文件进行一次全局的 envify 转换。这使得压缩工具能清除调 Vue 源码中所有用环境变量条件包裹起来的警告语句。例如：</p>        
          <el-form :model="form1[x]" >
              <el-form-item >
                <el-radio-group v-model="form1[x].check" style="width:98%;margin-left:2%;">
                  <el-col :span="6" :key="index" v-for="(val,index) in answarData" style="line-height:24px;height: 24px;">
                    <el-radio :label="val.id">{{val.id}}：{{val.name}}</el-radio>
                  </el-col>
                </el-radio-group>
              </el-form-item>
          </el-form>       
        </div>
         <div class="questionDiv" v-for="(total2,y) in 2" >
          {{y+1+2}}.<span style="color:#6a8dfb; margin-left:20px;">多选题</span>
          <p style="margin-left:30px;line-height:30px;">对打包后的文件进行一次全局的 envify 转换。这使得压缩工具能清除调 Vue 源码中所有用环境变量条件包裹起来的警告语句。例如：对打包后的文件进行一次全局的 envify 转换。这使得压缩工具能清除调 Vue 源码中所有用环境变量条件包裹起来的警告语句。例如：</p>        
          <el-form :model="form2[y]" >
              <el-form-item >
                <el-checkbox-group v-model="form2[y].check" style="width:98%;margin-left:2%;">
                  <el-col :span="6" :key="index1" v-for="(val,index1) in answarData" style="line-height:24px;height: 24px;">
                    <el-checkbox :label="val.id">{{val.id}}：{{val.name}}</el-checkbox>
                  </el-col>
                </el-checkbox-group>
              </el-form-item>
          </el-form>       
        </div>
        <div class="questionDiv" v-for="(total3,z) in 2" >
          {{z+1+4}}.<span style="color:#6a8dfb; margin-left:20px;">判断题</span>
          <p style="margin-left:30px;line-height:20px;">对打包后的文件进行一次全局的 envify 转换。这使得压缩工具能清除调 Vue 源码中所有用环境变量条件包裹起来的警告语句。例如：对打包后的文件进行一次全局的 envify 转换。这使得压缩工具能清除调 Vue 源码中所有用环境变量条件包裹起来的警告语句。例如：</p>        
          <el-form :model="form3[z]" >
              <el-form-item >
                <el-radio-group v-model="form3[z].check" style="width:98%;margin-left:2%;">
                  <el-col :span="12" :key="index2" v-for="(val,index2) in answarData2" style="line-height:24px;height: 24px;">
                    <el-radio :label="val.id">{{val.id}}：{{val.name}}</el-radio>
                  </el-col>
                </el-radio-group>
              </el-form-item>
          </el-form>       
        </div>   
        <div class="questionDiv" v-for="(total4,k) in 2" >
          {{k+1+6}}.<span style="color:#6a8dfb; margin-left:20px;">简单题</span>
          <p style="margin-left:30px;line-height:20px;">对打包后的文件进行一次全局的 envify 转换。这使得压缩工具能清除调 Vue 源码中所有用环境变量条件包裹起来的警告语句。例如：对打包后的文件进行一次全局的 envify 转换。这使得压缩工具能清除调 Vue 源码中所有用环境变量条件包裹起来的警告语句。例如：</p>        
          <el-form :model="form3[k]" >
              <el-form-item >
                <el-input style="width:96%;margin-left:2%;margin-right:2%" v-model="form4[k].check" type="textarea"></el-input>
              </el-form-item>
          </el-form>       
        </div>     
      </div> 
    </div>


  </div>
 
</template>

<script>
import Dropzone from "../../../common/UPLOAD.vue";
export default {
  name: "index",
  components: { Dropzone },
  data() {
    return {
      isClear: false,
      testPaperDialog: false,
      faleDialog: false,
      disfalg: false,
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
      form1: [{ check: " " }, { check: " " }],
      form2: [{ check: [] }, { check: [] }],
      form3: [{ check: " " }, { check: " " }],
      form4: [{ check: " " }, { check: " " }]
    };
  },

  watch: {},
  methods: {}
};
</script>

<style lang="scss" scoped>
#onlineExam {
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
        font-size: 16px;
        height: 40px;
        line-height: 40px;
        margin-left: 20px;
        overflow: hidden;
      }
      .import_left {
        width: 90%;
        height: 40px;
        line-height: 40px;
        margin: 0 auto;
      }
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
      min-height: 154px;
      padding-top: 16px;
      border-top: 1px #eee solid;
    }
  }
}
</style>
