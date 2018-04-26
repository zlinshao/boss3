<template>
  <div>
    <el-dialog :close-on-click-modal="false" :visible.sync="previewNaireDialogVisible" title="问卷调查" width="60%">
    <div id="onlineExam">
      <div class="tool">
        <span>问卷调查问卷调查问卷调查问卷调查问卷调查</span>
      </div>
      <div class="main">
        <div class="questionDiv" v-for="(total,x) in 2" >
          {{x+1}}.<span style="color:#6a8dfb; margin-left:20px;">单选题</span>
          <p style="margin-left:30px;line-height:30px;width:96%">对打包后的文件进行一次全局的 envify 转换。这使得压缩工具能清除调 Vue 源码中所有用环境变量条件包裹起来的警告语句。例如：对打包后的文件进行一次全局的 envify 转换。这使得压缩工具能清除调 Vue 源码中所有用环境变量条件包裹起来的警告语句。例如：</p>        
          <el-form :model="form1[x]" >
              <el-form-item v-model="form1[x].check" style="width:97%;margin-left:3%;">
                  <el-col :span="6" :key="index" v-for="(val,index) in answarData" style="line-height:24px;height: 24px;">
                    {{val.id}}：{{val.name}}
                  </el-col>
              </el-form-item>
          </el-form>       
        </div>
         <div class="questionDiv" v-for="(total2,y) in 2" >
          {{y+1+2}}.<span style="color:#6a8dfb; margin-left:20px;">多选题</span>
          <p style="margin-left:30px;line-height:30px;width:96%">对打包后的文件进行一次全局的 envify 转换。这使得压缩工具能清除调 Vue 源码中所有用环境变量条件包裹起来的警告语句。例如：对打包后的文件进行一次全局的 envify 转换。这使得压缩工具能清除调 Vue 源码中所有用环境变量条件包裹起来的警告语句。例如：</p>        
          <el-form :model="form2[y]" >
              <el-form-item v-model="form2[y].check" style="width:97%;margin-left:3%;">
                  <el-col :span="6" :key="index1" v-for="(val,index1) in answarData" style="line-height:24px;height: 24px;">
                    {{val.id}}：{{val.name}}
                  </el-col>
              </el-form-item>
          </el-form>       
        </div> 
        <div class="questionDiv" v-for="(total4,k) in 2" >
          {{k+1+6}}.<span style="color:#6a8dfb; margin-left:20px;">简单题</span>
          <p style="margin-left:30px;line-height:20px;width:96%">对打包后的文件进行一次全局的 envify 转换。这使得压缩工具能清除调 Vue 源码中所有用环境变量条件包裹起来的警告语句。例如：对打包后的文件进行一次全局的 envify 转换。这使得压缩工具能清除调 Vue 源码中所有用环境变量条件包裹起来的警告语句。例如：</p>        
          <el-form :model="form3[k]" >
              <el-form-item >
               <el-input readonly style="width:95.5%;margin-left:2%;" v-model="form4[k].check" type="textarea"></el-input>
              </el-form-item>
          </el-form>       
        </div>     
      </div> 
    </div>
    </el-dialog>
  </div>
 
</template>

<script>
import Dropzone from "../../../common/UPLOAD.vue";
export default {
  name: "index",
  components: { Dropzone },
  props:['previewNaireDialog'],
  data() {
    return {
      isClear: false,
      previewNaireDialogVisible:false,
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
      form2: [{ check: " " }, { check: " " }],
      form3: [{ check: " " }, { check: " " }],
      form4: [{ check: " " }, { check: " " }]
    };
  },

  watch: {
       previewNaireDialog(val){
        this.previewNaireDialogVisible = val
      },
      previewNaireDialogVisible(val){
        if(!val){
          this.$emit('close')
        }
      },   
  },
  methods: {}
};
</script>

<style lang="scss" scoped>
#onlineExam {
  .tool {
    height: 142px;
    padding: 0;
    background: url("../../../../assets/images/preview.png") no-repeat center;
    span{
      height: 142px;
      line-height: 142px;
      font-size:24px;
      text-indent: 2%;
      color: #fff;
    }
  }
  .main {
    border: 1px #eee solid;
    margin-bottom: 30px;
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
