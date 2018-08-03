<template>
  <div id="">
    <el-dialog :close-on-click-modal="false" :close-on-press-escape="false" :show-close="false"
               title="锁屏设置" :visible.sync="setLockPwdDialogVisible" width="40%">
      <div class="">
        <el-form size="mini" onsubmit="return false;" label-width="100px">
          <el-row>
            <el-col :span="12">
              <el-form-item label="倒计时">
                <el-select value="" v-model="basicSetting.id[0]">
                  <el-option v-for="item in count_time_dic" :key="item.id" :label="item.dictionary_name" :value="item.id"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <span style="color:#fdaece;margin-left:100px;">备注:首页倒计时时间设置,当合计时结束后,将自动进入锁屏模式</span>

          <el-row>
            <el-col :span="12">
              <el-form-item label="验证码">
                <el-input v-model="sms_lock_num"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="10" :offset="2">
              <el-button size="mini" @click="sendMessage" v-if="isSending>59" style="width: 140px;" type="primary">
                获取验证码
              </el-button>
              <el-button size="mini" v-if="isSending<60" disabled="" style="width: 140px;" type="primary">{{isSending}}s后重新发送</el-button>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="锁屏密码">
                <el-input size="small" type="password" @keyup.native="identify_pwd_lock = ''"
                          v-model="set_pwd_lock" placeholder="请输入新密码"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="确认密码">
                <el-input size="small" type="password" v-model="identify_pwd_lock"
                          @blur="testPassword" placeholder="请确认新密码"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <span style="color:#fdaece;margin-left:100px;">备注:密码长度4-6位，数字、字母和下划线</span>
        </el-form>

          <p style="color: #e4393c;margin-left: 100px;font-size: 16px">为了您账户资料的安全，请先设置锁屏密码，谢谢~</p>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button :disabled="!sms_lock_num || identify_pwd_lock !== set_pwd_lock
                              || !identify_pwd_lock || !set_pwd_lock || !basicSetting.id[0]"
                   size="small" type="primary" @click="saveVisitRecord">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
  export default {
    props: ['setLockPwdDialog'],
    data() {
      return {
        setLockPwdDialogVisible: false,
        count_time_dic: [],
        //个人基本设置
        basicSetting: {
          id: [],
          type: 1
        },
        //锁屏
        isSending: 60, //发送验证码
        sms_lock_num: "", //验证码
        set_pwd_lock: "", //锁屏密码
        identify_pwd_lock: "",
        defaultCountdown: '',
        setCount : false,
        setPassWord : false,
      }
    },
    computed: {
      isClose(){
        return this.setCount && this.setPassWord;
      },
      phone_number(){
        return JSON.parse(localStorage.personal).phone;
      }
    },
    mounted(){

    },
    watch: {
      setLockPwdDialog(val) {
        this.setLockPwdDialogVisible = val;
      },
      setLockPwdDialogVisible(val) {
        if (!val) {
          this.$emit('close');
        } else {
          this.getDictionary();
        }
      },
      isClose(val){
        if(val){
          this.setLockPwdDialogVisible = false;
          this.getPersonalInfo();
        }
      }
    },
    methods: {
      getDictionary(){
        this.dictionary(203).then((res) => {
          this.count_time_dic = res.data;
          let personal = JSON.parse(localStorage.personal);
          if (personal.data.setting && Array.isArray(personal.data.setting) && personal.data.setting.length > 0) {
            this.basicSetting.id[0] = Number(personal.data.setting[0].dict_id);
            this.defaultCountdown = Number(personal.data.setting[0].dict_id)
          }
        })
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
        this.$http.get(globalConfig.server + "setting/others/sms_code").then(res => {
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
        if (this.set_pwd_lock !== this.identify_pwd_lock) {
          this.$notify.warning({
            title: "警告",
            message: "两次输入密码不相同！"
          })
        }
      },
      saveVisitRecord(){
        this.$http.post(globalConfig.server + "setting/setting/save", this.basicSetting).then(res => {
          if (res.data.code === "50000") {
            this.$store.dispatch('changeBasicSetting');
            this.setCount = true;
          } else {
            this.$notify({
              title: "警告",
              message: res.data.msg,
              type: "warning"
            });
          }
        });

        this.$http.get(globalConfig.server + "setting/others/lock_screen_status?sms_lock_num=" +
          this.sms_lock_num + "&set_pwd_lock=" + this.set_pwd_lock).then(res => {
          if (res.data.code === "100000") {
            this.sms_lock_num = '';
            this.set_pwd_lock = '';
            this.identify_pwd_lock = '';
            this.isSending = 60;
            this.setPassWord = true;
          } else {
            this.$notify({
              title: "警告",
              message: res.data.msg,
              type: "warning"
            });
          }
        });

      },
    },
  }
</script>

<style scoped>

</style>
