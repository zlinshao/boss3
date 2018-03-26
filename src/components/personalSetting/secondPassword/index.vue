<template>
  <div>
    <el-dialog title="二级密码设置" :visible.sync="increaseGoodsDialogVisiblex" width="25%">
      <div>
        <el-form :model="form" label-width="80px" >
          <el-row>
        <el-col :span="20">
          <div class="validate">
            <div>
              <el-form-item label="验证码" required size="mini">
              <el-input v-model="form.sms_code" clearable placeholder="请输入验证码"></el-input>
              </el-form-item>
            </div>
            <div>
              <el-button size="mini"  @click="sendMessage" v-if="isSending>59" type="primary">获取验证码</el-button>
            </div>
            <div>
              <el-button size="mini" v-if="isSending<60" type="primary" >{{isSending}}s后重新获取</el-button>
            </div>
          </div>
          <div class="validate">
            <div class="validateSign">
              <el-form-item label="新密码" required size="mini">
              <el-input @change="checkNo(form.passwordnew)" :maxlength="16" type="password" v-model="form.passwordnew" :minlength="6" clearable placeholder="请输入新密码"></el-input>           
              </el-form-item><i class="el-icon-success" :maxlength="16" style="color: #46ff53" v-show="form.passwordnew.length>=6"></i>
            </div>
          </div>
          <div class="validate">
            <div class="validateSign">
              <el-form-item label="二次密码" required size="mini">
              <el-input @change="checkNo2(form.passwordok)" type="password" v-model="form.passwordok" :minlength="6" clearable placeholder="请确认新密码"></el-input>
              </el-form-item>
              <i class="el-icon-success" style="color: #46ff53" v-show="form.passwordok.length>=6 && form.passwordnew == form.passwordok"></i>
            </div>
          </div>
          <div class="remark">
            备注：密码长度6-16位，数字、字母和符号至少包含两种。
          </div>
        </el-col>
          </el-row>
        </el-form>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button size="small" @click="increaseGoodsDialogVisiblex = false">取 消</el-button>
        <el-button size="small" type="primary" @click="savesendinfo()">保存</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  props: ["secondPasswordDialog", "sendid"],
  name: "index",
  data() {
    return {
      basicSet: true,
      passmin: "6",
      secondPassword: false,
      increaseGoodsDialogVisiblex: false,
      lockScreen: false,
      form: {
        id: "",
        phone: "",
        sms_code: "",
        passwordnew: "",
        passwordok: ""
      },
      validateinput: false,
      //锁屏
      isSending: 60, //发送验证码
      sms_lock_num: "", //验证码
      set_pwd_lock: "", //锁屏密码
      identify_pwd_lock: "",
      dictionary: [], //字典
      //个人基本设置
      basicSetting: {
        id: [],
        type: 1
      }
    };
  },
  mounted() {},
  watch: {
    secondPasswordDialog(val) {
      this.increaseGoodsDialogVisiblex = val;
    },
    increaseGoodsDialogVisiblex(val) {
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
          if (res.data.code === "100030") {
            this.$notify({
              title: "成功",
              message: res.data.msg,
              type: "success"
            });
          }
        });
    },
    //密码验证
    checkNo(value) {
      let reg = /^(?![\d]+$)(?![a-zA-Z]+$)(?![!#$%^&*]+$)[\da-zA-Z!#$%^&*]/;
      if (value) {
        if (new RegExp(reg).test(value) == false) {
          this.$notify({
            title: "警告",
            message: "新密码格式有问题",
            type: "warning"
          });
        }
      }
    },
    //密码验证
    checkNo2(value) {
      let reg = /^(?![\d]+$)(?![a-zA-Z]+$)(?![!#$%^&*]+$)[\da-zA-Z!#$%^&*]/;
      if (value) {
        if (new RegExp(reg).test(value) == false) {
          this.$notify({
            title: "警告",
            message: "二次密码格式有问题",
            type: "warning"
          });
        }
      }
    },
    //二级密码保存
    savesendinfo() {
      this.validateinput = true;
      if (this.form.sms_code == "" && this.validateinput == true) {
        this.validateinput = false;
        this.$notify({
          title: "警告",
          message: "验证码不能为空",
          type: "warning"
        });
      }
      if (this.form.passwordnew == "" && this.validateinput == true) {
        this.validateinput = false;
        this.$notify({
          title: "警告",
          message: "输入的新密码不能为空",
          type: "warning"
        });
      }

      if (this.form.passwordok == "" && this.validateinput == true) {
        this.validateinput = false;
        this.$notify({
          title: "警告",
          message: "确定的新密码不能为空",
          type: "warning"
        });
      }
      if (
        (this.form.passwordok.length < 6 || this.form.passwordnew.length < 6) &&
        this.validateinput == true
      ) {
        this.validateinput = false;
        this.$notify({
          title: "警告",
          message: "密码长度不足6位",
          type: "warning"
        });
      }
      if (
        this.form.passwordnew != "" &&
        this.form.passwordok != "" &&
        this.form.passwordok != this.form.passwordnew &&
        this.validateinput == true
      ) {
        this.validateinput = false;
        this.$notify({
          title: "警告",
          message: "两次输入的密码不一样",
          type: "warning"
        });
      }
      if (this.validateinput) {
        this.$http
          .put(globalConfig.server + "setting/others/password", {
            dict_id: this.sendid,
            secondary_password: this.form.passwordnew,
            repeat_secondary_password: this.form.passwordok,
            sms_code_pwd: this.form.sms_code
          })
          .then(res => {
            console.log(res);
            if (res.data.code === "100030") {
              this.$notify({
                title: "成功",
                message: res.data.msg,
                type: "success"
              });
            } else {
              this.$notify({
                title: "警告",
                message: res.data.msg,
                type: "warning"
              });
            }
            this.increaseGoodsDialogVisiblex = false;
            this.form = {
              id: "",
              phone: "",
              sms_code: "",
              passwordnew: "",
              passwordok: ""
            };
          });
      }
    }
  }
};
</script>

<style scoped lang="scss">
@mixin flex {
  display: -webkit-flex;
  display: flex;
}

@mixin border_radius($n) {
  -webkit-border-radius: $n;
  -moz-border-radius: $n;
  border-radius: $n;
}
.main {
  padding: 40px 0;
}

.main > .el-row {
  margin-bottom: 40px;
  .el-col.el-col-20 {
    label {
      margin-bottom: 12px;
    }
  }
  .el-col.el-col-20.collect_rent {
    label {
      margin-bottom: 0;
    }
  }
}
.remark {
  color: #fdaece;
}

.nowrap {
  display: flex;
  display: -webkit-flex;
  align-items: center;
}

.validate {
  @include flex;
  margin-bottom: 12px;
  :nth-child(2) {
    margin: 0 10px;
  }
  .validateSign {
    @include flex;
    justify-content: center;
    i {
      line-height: 40px;
    }
  }
}
</style>
