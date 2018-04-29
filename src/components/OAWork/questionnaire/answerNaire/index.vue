<template>
  <div>
    <el-dialog :close-on-click-modal="false" :visible.sync="answerNaireDialogVisible" title="问卷调查" width="60%">
    <div id="onlineExam">
        <div class="tool">
          <span>{{testPaperData.name}}</span>
        </div>  
      <div class="main">
        <div class="questionDiv" v-for="(item,key) in testPaperData.questions" v-if="item.category===153" :key="key">
          {{key+1}}.<span style="color:#6a8dfb; margin-left:20px;">单选题</span>
          <p style="margin-left:30px;line-height:30px;" v-html="item.stem"></p>
          <el-form :model="form1[key]" >
              <el-form-item >
                <el-radio-group v-model="form1[key].check" style="width:97%;margin-left:3%;">
                  <el-col :span="6" :key="index" v-for="(val,index) in item.choice" style="line-height:24px;height: 24px;padding-right:20px; overflow: hidden;">
                    <el-radio :label="index">{{index}}：{{val}}</el-radio>
                  </el-col>
                </el-radio-group>
              </el-form-item>
          </el-form>       
        </div>

        <div class="questionDiv" v-for="(item,key) in testPaperData.questions" v-if="item.category===158" :key="key">
          {{key+1+2}}.<span style="color:#6a8dfb; margin-left:20px;">简答题</span>
        <p style="margin-left:30px;line-height:20px;padding-right:10px;">{{item.stem}}</p> 
          <el-form :model="form4[key]" >
              <el-form-item >
                <el-input  style="width:95.5%;margin-left:2%;" v-model="form4[key]" type="textarea"></el-input>
              </el-form-item>
          </el-form>        
        </div>     
      </div> 
      <div class="bottom">
        <el-button @click="getPoints" style="width:360px;margin-top:28px; height:32px; line-height:0px; background-color:rgb(106, 141, 251); border-color:rgb(106, 141, 251);" type="primary">提交</el-button>
      </div>
    </div>
  </el-dialog>

    <div id="submitDialog">
      <el-dialog :close-on-click-modal="false" :visible.sync="submitDialog" style="margin-top:20vh" title="本次试题提交" width="35%">
        <el-row :gutter="30" style="margin-bottom:38px;">
          <el-col :span="24">
            <div class="submit_points" >
              <span>提交成功！</span>
            </div>
          </el-col>
        </el-row>      
      </el-dialog>
    </div>

  </div>
 
</template>

<script>
import Dropzone from "../../../common/UPLOAD.vue";
export default {
  name: "index",
  components: { Dropzone },
  props: ["answerNaireDialog", "testPaperId"],
  data() {
    return {
      isClear: false,
      submitDialog: false,
      faleDialog: false,
      answerNaireDialogVisible: false,
      testPaperIdx: "",
      testPaperData: {},

      form1: [{ check: " " }, { check: " " }],
      form2: [{ check: [] }, { check: [] }],
      form3: [{ check: " " }, { check: " " }],
      form4: [{ check: " " }, { check: " " }]
    };
  },
  mounted() {
    this.getDictionary();
  },

  watch: {
    answerNaireDialog(val) {
      this.answerNaireDialogVisible = val;
    },
    answerNaireDialogVisible(val) {
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
    getPoints() {
      this.submitDialog = true;
    },
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

  .bottom {
    width: 100%;
    height: 80px;
    text-align: center;
  }
}

#submitDialog {
  .submit_points {
    border: 1px solid #fb4699;
    -webkit-box-shadow: 0 0 3px 1px #fb4699;
    box-shadow: 0 0 3px 1px #fb4699;
    text-align: center;
    align-items: center;
    justify-content: center;
    height: 190px;
    border-radius: 5px;
    span {
      color: #fb4699;
      font-size: 40px;
      margin-top: 78px;
      display: block;
    }
  }
}
</style>
