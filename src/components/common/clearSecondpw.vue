<template>
  <div id="">
    <el-dialog :close-on-click-modal="false" :close-on-press-escape="false"  title="清除二级密码" :visible.sync="ClearSecondPWDialogVisible" width="30%">
      <div class="">
        <el-form size="mini" onsubmit="return false;" label-width="100px">
          <el-row>
            <el-col :span="12">
              <el-form-item label="验证码">
                <el-input v-model="sms_code_pwd"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="6" :offset="2">
              <el-button size="mini" @click="sendMessage" v-if="isSending>59"  type="primary">
                获取验证码
              </el-button>
              <el-button size="mini" v-if="isSending<60" disabled=""  type="primary">{{isSending}}s后重新发送</el-button>
            </el-col>
          </el-row>
        </el-form>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button :disabled="!sms_code_pwd"
                   size="small" type="primary" @click="saveVisitRecord">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  props: ["ClearSecondPWDialog"],
  components: {},
  data() {
    return {
      ClearSecondPWDialogVisible: false,
      isSending: 60, //发送验证码
      sms_code_pwd: "", //验证码
      clearFalg : false,
    };
  },
  computed: {},
  created() {},
  watch: {
    ClearSecondPWDialog(val) {
      this.ClearSecondPWDialogVisible = val;
    },
    ClearSecondPWDialogVisible(val) {
      if (!val) {
        this.$emit("close");
      }
    }
  },
  methods: {
    //发送验证码
    sendMessage() {
      new Promise((resolve, reject) => {
        let interval = setInterval(() => {
          this.isSending--;
          if (this.isSending < 0) {
            clearInterval(interval);
            resolve();
          }
        }, 1000);
      }).then(data => {
        this.isSending = 60;
      });
      this.$http
        .get(globalConfig.server + "setting/others/sms_code")
        .then(res => {
          if (res.data.code === "100090") {
            this.$notify({
              title: "成功",
              message: res.data.msg,
              type: "success"
            });
          }
        });
    },
    saveVisitRecord() {
      this.clearFalg= false;
      this.$http
        .put(globalConfig.server + "setting/others/password/delete", {
          sms_code_pwd: this.sms_code_pwd
        })
        .then(res => {
          if (res.data.code === "1000110") {
            this.ClearSecondPWDialogVisible = false;
            this.clearFalg = true;
            this.$emit("clearFalg",this.clearFalg);
            this.$http
              .get(globalConfig.server + "special/special/loginInfo")
              .then(res => {
                localStorage.setItem("personal", JSON.stringify(res.data.data));
                globalConfig.personal = res.data.data.data;
              });
          } else {
            this.$notify({
              title: "警告",
              message: res.data.msg,
              type: "warning"
            });
          }
        });
    }
  }
};
</script>

<style scoped>

</style>
