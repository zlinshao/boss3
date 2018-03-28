<template>
  <div>
    <div class="tool">
      <div class="tool_left">
        <el-button type="primary" style="background:#6a8dfb;border:0 none; width:130px; height:32px;" size="small" @click="showBasicset()">
          基本设置
        </el-button>
        <el-button type="success" style="background:#58d788;border:0 none; width:130px; height:32px;"  size="small" @click="showSecond()">
          二级密码设置
        </el-button>
        <el-button type="warning" style="background:#fdca41;border:0 none; width:130px; height:32px;"  size="small" @click="showLockscreen()">
          锁屏密码设置
        </el-button>
      </div>

      <!--<div class="tool_right">-->
        <!--<div>-->
          <!--<i class="el-icon-tickets"></i>-->
          <!--&nbsp;使用说明-->
        <!--</div>-->
      <!--</div>-->
    </div>

    <div class="main" v-if="basicSet">
      <el-form size="small" label-width="200px">
        <el-form-item v-for="(item,index) in dictionary" :key="item.id" :label="item.dictionary_name" v-if="index<1">
          <el-select v-model="basicSetting.id[0]" size="medium" clearable="" placeholder="请选择" value="">
            <el-option
              v-for="item in item.children"
              :key="item.id"
              :label="item.dictionary_name"
              :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <span style="color:#f00;margin-left:126px;">备注:首页倒计时时间设置,当合计时结束后,将自动进入锁屏模式</span>
      <div style="text-align: center;margin-top: 120px">
        <el-button @click="addBasicSetting" type="primary" size="small" style="padding: 10px 140px;">保存</el-button>
      </div>

    </div>
    <div class="main" v-if="secondPassword">

      <el-row>
        <el-col class="leftTitle" :span="4" style="margin-top: 5px; color:#6a8dfb;">
          二级密码设置
        </el-col>
      </el-row>
       <el-row style="margin-left:136px;">
        <el-col class="leftTitle"   v-for="(item2) in dictionary2" :key="item2.id"  :span="3" style="margin-top: 4px">
          <div style="margin-right:36px; color:#787a7e;"> {{item2.dictionary_name}}</div><br />
          <el-button style="background:#6a8dfb;width:130px;height:32px;"  size="mini" v-if="secondary_pass.indexOf(item2.id)>-1"
                     @click="openSecondPassword('secondPasswordDialog',item2.id)" type="primary">修改二级密码</el-button>
          <el-button style="background:#6a8dfb;width:130px; height:32px;" size="mini" v-else @click="openSecondPassword('secondPasswordDialog',item2.id)" type="primary">设置二级密码</el-button>
        </el-col>
      </el-row>
    </div>
    <div class="main" v-if="lockScreen">

      <el-row :gutter="20">
        <el-col class="leftTitle" :span="4" style="margin-top: 5px">
          锁屏密码设置/修改：
        </el-col>
        <el-col :span="20">
          <div class="validate">
            <div>
              <el-input size="small" placeholder="请输入验证码" v-model="sms_lock_num"></el-input>
            </div>
            <div>
              <el-button size="small" @click="sendMessage" v-if="isSending>59" style="width: 140px;" type="primary">获取验证码</el-button>
              <el-button size="small" v-if="isSending<60" disabled="" style="width: 140px;" type="primary">{{isSending}}s后重新发送</el-button>
            </div>
          </div>
          <div class="validate">
            <div class="validateSign">
              <el-input size="small" type="password" @keyup.native="identify_pwd_lock = ''"  v-model="set_pwd_lock" placeholder="请输入新密码"></el-input>
              <i class="el-icon-success" style="color: #46ff53" v-show="set_pwd_lock.length>5"></i>
            </div>
          </div>
          <div class="validate">
            <div class="validateSign">
              <el-input size="small" type="password" v-model="identify_pwd_lock" @blur="testPassword" placeholder="请确认新密码"></el-input>
              <i class="el-icon-success" style="color: #46ff53" v-show="false"></i>
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
          <el-button type="primary" :disabled="!sms_lock_num || identify_pwd_lock !== set_pwd_lock || !identify_pwd_lock || !set_pwd_lock"
                     size="small" @click="setLockPassword" style="padding: 10px 140px;">保存</el-button>
        </el-col>
      </el-row>
    </div>
<secondPasswordRes :secondPasswordDialog="secondPasswordDialog" :sendid="sendid" @close="closesecondPassword" ></secondPasswordRes>
  </div>
</template>

<script>
import secondPasswordRes from "./secondPassword/index.vue";
export default {
  name: "index",
  components: {
    secondPasswordRes
  },
  data() {
    return {
      basicSet: true,
      secondPassword: false,
      lockScreen: false,
      secondPasswordDialog: false,
      form: {},
      sendid: "",
      checkList: [],

      secondary_pass: [],
      pickerOptions: {
        shortcuts: [
          {
            text: "最近一周",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit("pick", [start, end]);
            }
          },
          {
            text: "最近一个月",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              picker.$emit("pick", [start, end]);
            }
          },
          {
            text: "最近三个月",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
              picker.$emit("pick", [start, end]);
            }
          }
        ]
      },
      //锁屏
      isSending: 60, //发送验证码
      sms_lock_num: "", //验证码
      set_pwd_lock: "", //锁屏密码
      identify_pwd_lock: "",
      dictionary: [], //字典
      dictionary2: [], //字典
      //个人基本设置
      basicSetting: {
        id: [],
        type: 1
      }
    };
  },
  mounted() {
    this.getDictionary();
    this.getDictionary2();
  },
  watch: {},
  methods: {
    openSecondPassword(val, id) {
      this.sendid = id;
      this.secondPasswordDialog = true;
    },
    closesecondPassword() {
      this.secondPasswordDialog = false;
    },
    getDictionary() {

      this.$http.get(globalConfig.server + "setting/dictionary/202")
        .then(res => {
          if (res.data.code === "30010") {

            this.dictionary = res.data.data;
          } else {
            this.$notify.warning({
              title: "警告",
              message: res.data.msg
            });
          }
        });
    },
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
    showBasicset() {
      this.basicSet = true;
      this.secondPassword = false;
      this.lockScreen = false;
    },
    showSecond() {
      this.basicSet = false;
      this.secondPassword = true;
      this.lockScreen = false;
    },
    showLockscreen() {
      this.basicSet = false;
      this.secondPassword = false;
      this.lockScreen = true;
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
          if (res.data.code === "100090") {
            this.$notify({
              title: "成功",
              message: res.data.msg,
              type: "success"
            });
          }
        });
    },
    testPassword(){
        if(this.set_pwd_lock !== this.identify_pwd_lock){
          this.$notify.warning({
            title:"警告",
            message:"两次输入密码不相同！"
          })
        }
    },
    setLockPassword() {
      this.$http
        .get(globalConfig.server +
            "setting/others/lock_screen_status?sms_lock_num=" +
            this.sms_lock_num +
            "&set_pwd_lock=" +
            this.set_pwd_lock
        ).then(res => {
          if (res.data.code === "100000") {
            this.$notify({
              title: "成功",
              message: res.data.msg,
              type: "success"
            });
            this.sms_lock_num = '';
            this.set_pwd_lock = '';
            this.identify_pwd_lock = '';
            this.isSending = 60;
          } else {
            this.$notify({
              title: "警告",
              message: res.data.msg,
              type: "warning"
            });
          }
        });
    },
    addBasicSetting() {
      this.$http
        .post(globalConfig.server + "setting/setting/save", this.basicSetting).then(res => {
          if (res.data.code === "50000") {
            this.$notify({
              title: "成功",
              message: res.data.msg,
              type: "success"
            });
            this.$store.dispatch('changeBasicSetting')
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

.tool {
  border-bottom: 1px solid #eee;
  display: flex;
  padding-bottom: 10px;
  justify-content: space-between;
  .tool_right {
    display: flex;
    align-items: center;
    div {
      width: 100px;
      text-align: center;
      cursor: pointer;
      i {
        color: #409eff;
      }
    }
    div + div {
      border-left: 1px solid #dddddd;
    }
  }
}

.leftTitle {
  text-align: right;

  color: #409eff;
}

.remark {
  color: #fdaece;
}

.nowrap {
  display: flex;
  display: -webkit-flex;
  align-items: center;
}
.el-dialog {
  width: 200px !important;
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
