<template>
  <div>
      <el-row>
        <el-col class="leftTitle" :span="4" style=" text-align:right; padding-right:15px;">
          设置二级密码
        </el-col>
        <el-col :span="20">
          <div>
            <el-checkbox-group v-model="checkList" >
              <el-checkbox v-for="(val,key) in dictionary2" :key="key" :label="val.id">{{val.dictionary_name}}</el-checkbox>
            </el-checkbox-group>
          </div>
          <div class="remark">
            备注：勾选后，查看此模块前，需输入二级密码。
          </div>
        </el-col>
      </el-row>

      <el-row>
        <el-col class="leftTitle" :span="4" style="margin-top: 5px; text-align:right; padding-right:15px;">
          密码设置
        </el-col>
        <el-col :span="20">
          <div class="nowrap" style="margin-bottom: 12px;">
            <!--<div>手机号码</div>-->
            <div>
              <el-input size="mini" v-model="form.phone"  disabled="" placeholder="请输入手机号码"></el-input>
            </div>
          </div>
          <div class="validate">
            <div>
              <el-input size="mini" v-model="form.sms_code" clearable placeholder="请输入验证码"></el-input>
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
              <el-input size="mini" @change="checkNo(form.passwordnew)" :maxlength="16" type="password" v-model="form.passwordnew" :minlength="6" clearable placeholder="请输入新密码"></el-input>
              <i class="el-icon-success" :maxlength="16" style="color: #46ff53" v-if="form.passwordnew.length>=6 && truefalg"></i>

            </div>
          </div>
          <div class="validate">
            <div class="validateSign">
              <el-input size="mini" @change="checkNo2(form.passwordok)" type="password" v-model="form.passwordok" :minlength="6" clearable placeholder="请确认新密码"></el-input>
             <i class="el-icon-success" style="color: #46ff53" v-show="form.passwordok.length>=6 && form.passwordnew == form.passwordok &&truefalg"></i>
            </div>
          </div>

          <div class="remark">
            备注：密码长度6-16位，数字、字母和符号至少包含两种。
          </div>
        </el-col>
      </el-row>

      <el-row>
        <el-col :span="4">&nbsp;</el-col>
        <el-col :span="20">
          <el-button type="primary" @click="savesendinfo" :disabled="!checkList || !form.sms_code || !form.passwordnew || !form.passwordok" size="small" style="padding: 10px 140px;">保存</el-button>
        </el-col>
      </el-row>
  </div>
</template>

<script>
export default {
  props: [ "sendid"],
  name: "index",
  data() {
    return {
      basicSet: true,
      passmin: "6",
      secondPassword: false,

      lockScreen: false,
      checkList:[],
      form: {
        id: "",
        phone: "",
        sms_code: "",
        passwordnew: "",
        passwordok: ""
      },
      dictionary2:[],
      validateinput: false,
      //锁屏
      isSending: 60, //发送验证码
      sms_lock_num: "", //验证码
      set_pwd_lock: "", //锁屏密码
      identify_pwd_lock: "",
      dictionary: [], //字典
      truefalg:false,
      falsefalg:1,
      //个人基本设置
      basicSetting: {
        id: [],
        type: 1
      }
    };
  },
  mounted() {
    this.personal = JSON.parse(localStorage.personal);
    this.form.phone=this.personal.phone;
    this.getDictionary2()
  },
  watch: {

  },
  methods: {
    getDictionary2() {
      this.$http
        .get(globalConfig.server + "setting/dictionary/220")
        .then(res => {
          this.secondary_pass = [];
          if (res.data.code === "30010") {
            this.dictionary2 = res.data.data;
          } else {
            this.$notify.warning({
              title: "警告",
              message: res.data.msg
            });
          }
        });
    },
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
      this.falsefalg=2;
      this.truefalg=true;
      let reg = /^(?![\d]+$)(?![a-zA-Z]+$)(?![!#$%^&*]+$)[\da-zA-Z!#$%^&*]/;
      if (value) {
        if (new RegExp(reg).test(value) == false ) {
          this.validateinput = false;
          this.truefalg=false;
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
      this.truefalg=true;
      let reg = /^(?![\d]+$)(?![a-zA-Z]+$)(?![!#$%^&*]+$)[\da-zA-Z!#$%^&*]/;
      if (value) {
        if (new RegExp(reg).test(value) == false) {
          this.validateinput = false;
          this.truefalg=false;
          this.$notify({
            title: "警告",
            message: "二次密码格式有问题",
            type: "warning"
          });
        }else if(this.form.passwordok != this.form.passwordnew ){
          this.validateinput = false;
          this.truefalg=false;
          this.$notify({
            title: "警告",
            message: "二次密码不一致",
            type: "warning"
          });
      }
      }
    },
    //二级密码保存
    savesendinfo() {

      this.validateinput = true;

      if(this.checkList =="" && this.validateinput == true){
        this.validateinput = false;
        this.$notify({
          title: "警告",
          message: "未选中任何模块",
          type: "warning"
        });
      }
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
      if(this.validateinput == true){
        this.checkNo(this.form.passwordnew)
      }
      if(this.validateinput == true){
        this.checkNo2(this.form.passwordok)
      }
      if (this.validateinput) {
        this.$http.put(globalConfig.server + "setting/others/password", {
            dict_id: this.checkList,
            secondary_password: this.form.passwordnew,
            repeat_secondary_password: this.form.passwordok,
            sms_code_pwd: this.form.sms_code
          })
          .then(res => {

            if (res.data.code === "100030") {
              this.$notify({
                title: "成功",
                message: res.data.msg,
                type: "success"
              });
            this.form = {
              id: "",
              phone: "",
              sms_code: "",
              passwordnew: "",
              passwordok: ""
            };
            this.checkList=[]
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
  margin:20px 0 40px 0 ;
  float:left;
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
  :nth-child(3) {
    margin: 0 10px;
  }
  .validateSign {
    @include flex;
    justify-content: center;
    i {
      line-height: 28px;
    }
  }
}
</style>
