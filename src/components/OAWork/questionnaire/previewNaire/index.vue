<template>
  <div>
    <el-dialog :close-on-click-modal="false" :visible.sync="previewNaireDialogVisible" title="问卷调查" width="60%">
    <div id="onlineExam">
      <div class="tool">
        <span>{{testPaperData.name}}</span>
      </div>
      <div class="main">
        <div class="questionDiv" v-for="(item,key) in testPaperData.questions" v-if="item.category===153" :key="key">
          {{key+1}}.<span style="color:#6a8dfb; margin-left:20px;">单选题</span>
          <p style="margin-left:30px;line-height:30px;" v-html="item.stem"></p>
          <div style="width:98%;margin-left:2%;">
            <el-col :span="6" :key="index" v-for="(val,index) in item.choice" style="line-height:25px;height: 25px;">
              <span>{{index}}：{{val}}</span>
            </el-col>
          </div>   
        </div>

        <div class="questionDiv" v-for="(item,key) in testPaperData.questions" v-if="item.category===158" :key="key">
          {{key+1}}.<span style="color:#6a8dfb; margin-left:20px;">简单题</span>
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
    </el-dialog>
  </div>
 
</template>

<script>
import Dropzone from "../../../common/UPLOAD.vue";
export default {
  name: "index",
  components: { Dropzone },
  props: ["previewNaireDialog", "testPaperId"],
  data() {
    return {
      isClear: false,
      previewNaireDialogVisible: false,
      testPaperDialog: false,
      faleDialog: false,
      disfalg: false,
      questionTypeCategory: [], //题目类型
      testPaperIdx: "",
      testPaperData: {}
    };
  },
  mounted() {
    this.getDictionary();
  },

  watch: {
    previewNaireDialog(val) {
      this.previewNaireDialogVisible = val;
    },
    previewNaireDialogVisible(val) {
      if (!val) {
        this.$emit("close");
      }
    },
    testPaperId(val) {
      this.testPaperIdx = val;
      this.getTestPaperDetail();
    }
  },
  methods: {
    getDictionary() {
      //试卷类型
      this.dictionary(152).then(res => {
        this.questionTypeCategory = res.data;
      });
    },
    //获取试题
    getTestPaperDetail() {
      if (this.testPaperIdx) {
        this.$http
          .get(globalConfig.server + "exam/paper/" + this.testPaperIdx)
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
    }
  }
};
</script>

<style lang="scss" scoped>
#onlineExam {
  .tool {
    height: 142px;
    padding: 0;
    background: url("../../../../assets/images/preview.png") no-repeat center;
    span {
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
      min-height: 154px;
      padding-top: 16px;
      border-top: 1px #eee solid;
    }
  }
}
</style>
