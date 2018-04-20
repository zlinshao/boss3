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
        <div class="questionDiv" v-for="(val,k) in 2" :key="val">
          {{k+1}}.<span style="color:#6a8dfb; margin-left:20px;">简单题</span>
          <p style="margin-left:30px;line-height:20px;">对打包后的文件进行一次全局的 envify 转换。这使得压缩工具能清除调 Vue 源码中所有用环境变量条件包裹起来的警告语句。例如：对打包后的文件进行一次全局的 envify 转换。这使得压缩工具能清除调 Vue 源码中所有用环境变量条件包裹起来的警告语句。例如：</p>        
          <div>
            <div class="eachAN scroll_bar">
                对打包后的文件进行一次全局的 envify 转换。这使得压缩工具能清除调 对打包后的文件进行一次全局的 envify 转换。这使得压缩工具能清除调 对打包后的文件进行一次全局的 envify 转换。这使得压缩工具能清除调 
                对打包后的文件进行一次全局的 envify 转换。这使得压缩工具能清除调 对打包后的文件进行一次全局的 envify 转换。这使得压缩工具能清除调 
            </div>
            <div class="eachSore">   
              <el-form :model="form[k]">
                <el-row>
                  <el-form-item label="本题得分">
                    <el-col :span="2">
                      <el-input v-model="form[k].score" placeholder="请填入分值" >分</el-input>
                    </el-col>
                  </el-form-item>    
                </el-row>
              </el-form>
            </div>   
          </div>
        </div>  
        <div style="height:90px; line-height:90px; text-indent:40px; border-bottom:1px #eee solid">
          本次得分<span style="color:#fb4699; font-size:40px; margin-left:20px;margin-right:10px;">60</span>分
        </div>   
      </div> 
      <div class="bottom">
        <el-button @click="getPoints" style="width:360px;margin-top:34px; height:32px; line-height:0px; background-color:rgb(106, 141, 251); border-color:rgb(106, 141, 251);" type="primary">提交</el-button>
        <el-button @click="getPoints" style="width:360px;margin-top:34px; height:32px; line-height:0px; background-color:#58d788; border-color:#58d788" type="primary">保存</el-button>
      </div>
    </div>


  </div>
 
</template>

<script>
export default {
  name: "index",
  components: {},
  data() {
    return {
      isClear: false,
      testPaperDialog: false,
      faleDialog: false,
      disfalg: false,
      form: [{ score: "" }, { score: "" }]
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
      .eachAN {
        width: 96%;
        margin-left: 2%;
        margin-right: 2%;
        border: 1px #eee solid;
        height: 160px;
        color: #6a8dfb;
        border-bottom: none;
        padding: 8px 8px;
      }
      .eachSore {
        width: 96%;
        margin-left: 2%;
        margin-right: 2%;
        border: 1px #eee solid;
        height: 42px;
        padding: 8px 8px;
        margin-bottom: 20px;

      }
    }
  }
  .bottom {
    width: 100%;
    height: 100px;
    text-align: center;
  }
}
</style>
