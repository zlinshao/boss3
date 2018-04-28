<template>
  <div>
    <div id="onlineExam">
      <div class="qutitle">
        <div class="title1">题型</div>
        <el-tabs type="border-card" v-model="activeName">
          <el-tab-pane name="first" label="单选题">
            <div class="qubody">
              <div class="topbody">
                <div class="title">题干</div>
                  <vue-editor id="editor" useCustomImageHandler :disabled="editorDisabled"></vue-editor>              
              </div>
              <div class="midbody">
                <div class="title">选项</div>
                <el-form :model="form3" style="border:1px #eee solid">
                  <el-form-item v-model="form3.check" style="width:98%;margin-left:2%;">
                      <el-col :span="12" :key="val" v-for="val in singlen" style="line-height:50px;height:50px;padding-top:14px;">
                        <el-input style="width:200px;" size="small"  placeholder="请输入选项内容"></el-input>
                      </el-col>
                  </el-form-item>
                </el-form>
                <div class="midadd">
                  <span @click="midaddx">+&nbsp;&nbsp;添加选项</span>
                </div>                               
              </div>
            </div>
          </el-tab-pane>

          <el-tab-pane name="second" label="问答题">
            <div class="qubody">
              <div class="topbody">
                <div class="title">题干</div>
                  <vue-editor id="editor" useCustomImageHandler :disabled="editorDisabled"></vue-editor>              
              </div> 
            </div>
          </el-tab-pane>
        </el-tabs>
      </div>
      <div class="bottom">
        <el-button  style="width:360px;margin-top:34px; height:32px; line-height:0px; background-color:rgb(106, 141, 251); border-color:rgb(106, 141, 251);" type="primary">提交</el-button>
      </div>
    </div>
  </div>
 
</template>

<script>
import { VueEditor } from "vue2-editor";
export default {
  name: "index",
  components: { VueEditor },
  data() {
    return {
      activeName: "first",
      nowAction: "first",
      editorDisabled: false,
      singlen: 4,
      boxlen: 4,
      spacelen: 4,
      form3: {
        check: "",
        score: "",
        checkbox: [],
        panduan: ""
      }
    };
  },
  mounted() {},
  watch: {
    activeName(val) {
      this.nowAction = val;
    },
    spacelen(val) {
      console.log(val)
      this.spacelen = val;
    }
  },
  methods: {
    midaddx() {
      this.singlen++;
    },
    midaddbox() {
      this.boxlen++;
    },
  }
};
</script>

<style lang="scss" scoped>
#onlineExam {
  .qutitle {
    width: 80%;
    margin: 0 auto;
    .title {
      height: 30px;
      color: #83a0fc;
      line-height: 30px;
      text-indent: 18px;
    }
      .title1{
        height: 40px;
        color: #83a0fc;
        line-height: 40px;
        text-indent: 8px;
          &:before {
          border-radius: 2px;
          margin-right: 5px;
          background: #409EFF;
          border-left: 1px solid #409EFF;
          content: '|';
        }
      }
    .qubody {
      .title {
        height: 40px;
        color: #83a0fc;
        line-height: 40px;
        text-indent: 0px;
      }
    }
    .midbody {
      margin-top: 20px;
      .title {
        height: 40px;
        color: #83a0fc;
        line-height: 40px;
        text-indent: 0px;
      }
      .midadd {
        height: 50px;
        padding-top: 20px;
        border: 1px #eee solid;
        border-top: none;
        text-align: center;
        span {
          width: 380px;
          height: 30px;
          border: 1px #58d788 dashed;
          text-align: center;
          line-height: 30px;
          display: block;
          color: #58d788;
          background: #f3fdf6;
          margin-left: 32%;
          cursor: pointer;
        }
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
