<template>
  <div>
    <div id="onlineExam">
      <div class="tool">
        <div class="tool_left">       
            <span style="height:130px;line-height:32px; width:120px; font-size:14px;">上传试题文件</span>
            <el-button type="success" @click="uploadExam" size="small" style=" width:120px; height:32px; line-height:0px; background-color:#58d788; border-color:#58d788;"  >
              <i class="iconfont icon-daoru"></i>&nbsp;试题导入
            </el-button>             
            <br />
            <el-button type="success" size="small" style="margin-top:12px;width:120px; height:32px; background-color:#fb4799; border-color:#fb4799;"  >
              <i class="el-icon-download"></i>&nbsp;下载试题模版
            </el-button> 
            <Dropzone :ID="'examOptionx'" @getImg="photo_success"  :isClear="isClear"></Dropzone>          
        </div>

      </div>
      <div class="main">
        <div style="margin-left:137px; margin-top:38px;">
          <p><span style="font-size:16px;">说明</span></p>
          <p><span>1.请不要随意变更模版文件中单元格的格式，例如合并单元格，随意增删列等；</span></p>
          <p>2.支持题型为：单选题、多选题、不定项选择题、填空题、问答题、判断题、文字拼写务必以此为准；</p>
          <p> 3.选择题的选项可以2－8项均可；每题的选项数量务必与选项内容数量一致，否则不能导入；</p>
          <p><span>4.选择题答案务必大写格式，多选项字母务必连着拼写，不要有空格或者符号间隔；</span></p>
          <p><span>5.填空题最多支持10个空，每个答案务必回车换行隔开，</span>考生做大内容跟录入内容完全一致时，系统会自动判分；</p>
          <p>6.问答题的选项数量、答案、两项内容，可以不填写；填空题的答案，可以不填；</p>
          <p><span>7.题分：只支持整数，不可输入小数点形式。</span></p>
        </div>
      </div> 
    </div>

    <div id="testPaperDialog">
      <el-dialog :close-on-click-modal="false" :visible.sync="testPaperDialog" title="导入试题反馈" width="50%">
        <el-row>
          <el-col :span="24">
            <span class="sp1">导入试题成功</span>
            <span class="sp2">总试题60题</span>
          </el-col>
        </el-row>
        <el-row :gutter="30">
          <el-col :span="12">
            <div class="import_questions" >
              <div class="import_left"><span style="float:left; font-size:14px;">导入成功</span><i style="float:right; color:#58d788;font-size:16px;" class="iconfont icon-chenggong"></i></div>
              <div><span style="font-size:70px; color:#58d788">8</span>题</div>
            </div>
          </el-col>
          <el-col :span="12">
            <div class="import_questions" style="border: 1px solid #fb4699;box-shadow: 0 0 3px 1px #fb4699;">
              <div class="import_left"><span style="float:left; font-size:14px;">导入失败</span><i style="float:right; color:#fb4699;font-size:16px;" class="iconfont icon-tupianjiazaishibai-"></i></div>
              <div><span style="font-size:70px; color:#fb4699">6</span>题</div>
              <el-button type="primary" @click="faleDtail" style="margin-top:10px;width:126px; height:32px;background-color:#fb4799; border-color:#fb4799; line-height:0px;">查看明细</el-button>
            </div>
          </el-col>
        </el-row>
      </el-dialog>
    </div>

    <div id="faleDialog">
      <el-dialog :close-on-click-modal="false" :visible.sync="faleDialog" title="导入失败明细" width="50%">
        <span class="faleTitle">请检查</span>
        <div style="height:160px; overflow; auto" class="scroll_bar">
          <div class="falediv">
            <p>第6行题目，有错啊</p>
            <p><span>第6行题目，有错啊</span></p>
          </div>
          <div class="falediv">
            <p>第6行题目，有错啊</p>
            <p><span>第6行题目，有错啊</span></p>
          </div>
        </div>
        <el-button @click="iKonw" type="primary" style="margin-top:30px;margin-left:40%;width:126px; height:32px;background-color:#6a8dfb; border-color:#6a8dfb; line-height:0px;">我知道了</el-button>
      </el-dialog>
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
      faleDialog: false
    };
  },
  mounted() {},
  watch: {},
  methods: {
    // 上传成功
    photo_success(val) {},
    //导入试题
    uploadExam() {
      this.testPaperDialog = true;
    },
    faleDtail() {
      this.faleDialog = true;
    },
    iKonw() {
      this.faleDialog = false;
    }
  }
};
</script>

<style lang="scss" scoped>
#onlineExam {
  .tool {
    height: 250px;
    border-radius: 5px;
    border: 1px #eee solid;
    border-bottom: none;
    padding: 0;
    .tool_left {
      margin-left: 17px;
      margin-top: 18px;
      span {
        float: left;
      }
    }
  }
  .main {
    border: 1px #eee solid;
    border-bottom: none;
    min-height: 500px;
    font-size: 14px;
    p {
      line-height: 16px;
      span {
        color: #fc84b6;
      }
    }
  }
}
#testPaperDialog {
  padding: 25px 15px;
  .sp1 {
    color: #98aefc;
    font-size: 20px;
    text-align: center;
    display: block;
    line-height: 32px;
  }
  .sp2 {
    font-size: 18px;
    text-align: center;
    display: block;
    line-height: 32px;
    margin-bottom: 20px;
  }
  .import_questions {
    border: 1px solid #58d788;
    -webkit-box-shadow: 0 0 3px 1px #58d788;
    box-shadow: 0 0 3px 1px #58d788;
    text-align: center;
    align-items: center;
    justify-content: center;
    height: 180px;
    border-radius: 5px;
    .import_left {
      width: 90%;
      height: 60px;
      line-height: 60px;
      margin: 0 auto;
    }
  }
}
#faleDialog {
  .faleTitle {
    color: #7696fb;
    font-size: 16px;
  }
  .falediv {
    width: 90%;
    float: right;
    border-bottom: 1px #eee solid;
    height: 76px;
    p {
      padding: 0 !important;
      line-height: 16px;
      color: #8e8f91;
      span {
        color: #fc68a8;
      }
    }
  }
}
</style>
