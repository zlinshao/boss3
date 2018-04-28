<template>
  <div>
    <div id="onlineExam">
      <div class="tool">
        <img width="100%" height="142px" src="../../../../assets/images/preview.png" />
        <span>问卷调查问卷调查问卷调查问卷调查问卷调查</span>
      </div>
      <div class="main">
        <div class="questionDiv" v-for="(total,x) in 2" >
          {{x+1}}.<span style="color:#6a8dfb; margin-left:20px;">选择题</span>
          <p style="margin-left:30px;line-height:30px;width:96%">对打包后的文件进行一次全局的 envify 转换。这使得压缩工具能清除调 Vue 源码中所有用环境变量条件包裹起来的警告语句。例如：对打包后的文件进行一次全局的 envify 转换。这使得压缩工具能清除调 Vue 源码中所有用环境变量条件包裹起来的警告语句。例如：</p>        
            <el-row :key="index" v-for="(val,index) in answarData" style="width:97%;margin-left:3%;">
              <span>{{val.id}}：{{val.name}}</span><br />
              <el-progress style="width:30%;display: inline-block;" :text-inside="true" :stroke-width="18" :percentage="60/(index+1)"></el-progress>
              {{index}}
            </el-row> 
        </div>

          <div class="questionDiv" v-for="(total3,y) in 2" >
          {{y+1+2}}.<span style="color:#6a8dfb; margin-left:20px;">简答题</span>
          <p style="margin-left:30px;line-height:30px;width:96%">对打包后的文件进行一次全局的 envify 转换。这使得压缩工具能清除调 Vue 源码中所有用环境变量条件包裹起来的警告语句。例如：对打包后的文件进行一次全局的 envify 转换。这使得压缩工具能清除调 Vue 源码中所有用环境变量条件包裹起来的警告语句。例如：
            <span @click="openAll"  style="color:rgb(106, 141, 251);cursor: pointer;">查看全部回答</span>
          </p>        
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
  props: ["previewNaireDialog"],
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
      form2: [{ check: " " }, { check: " " }],
      form3: [{ check: " " }, { check: " " }],
      form4: [{ check: " " }, { check: " " }]
    };
  },

  watch: {},
  methods: {
    openAll() {
      this.$router.push({
        path: "/answerAll",
      });
    }
  }
};
</script>

<style lang="scss" scoped>
#onlineExam {
  .tool {
    position: relative;
    span {
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
    margin-bottom: 30px;
    border-top: none;
    min-height: 500px;
    font-size: 16px;
    .questionDiv {
      width: 98%;
      margin-left: 2%;
      margin-bottom: 20px;
      min-height: 154px;
      padding-top: 16px;
      border-top: 1px #eee solid;
      .allAnswer {
        width: 97%;
        margin-left: 2%;
      }
    }
  }
}
</style>
