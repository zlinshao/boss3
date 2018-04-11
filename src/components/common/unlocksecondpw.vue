<template>
  <div id="">
    <el-dialog :close-on-click-modal="false" title="解锁二级密码" :visible.sync="unlockSecondPWDialogVisible" width="40%">
      <div class="">
        <el-form size="mini" onsubmit="return false;" label-width="100px">

          <el-row>
            <el-col :span="12">
              <el-form-item label="手机号">
                <el-input disabled="" v-model="personalInfo.phone"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
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
              <el-form-item label="二级密码">
                <el-input size="small" type="password"
                          v-model="basicSetting.pwd" placeholder="请输入新密码"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <span style="color:#fdaece;margin-left:100px;">备注:密码长度4-6位，数字、字母和下划线</span>
        </el-form>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button :disabled="!sms_lock_num ||  !basicSetting.pwd"
                   size="small" type="primary" @click="saveVisitRecord">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
  export default {
    props: ['unlockSecondPWDialog',"sendId"],
    components: {},
    data() {
      return {
        unlockSecondPWDialogVisible: false,
        isSending: 60, //发送验证码
        sms_lock_num: "", //验证码
        set_pwd_lock: "", //密码
        setCount : false,
        basicSetting: {
          dict_id: "",
          pwd: ""
        },
      }
    },
    computed: {
      personalInfo(){
        return JSON.parse(localStorage.personal);
      },

    },
    created(){

    },
    watch: {
      unlockSecondPWDialog(val) {
        this.unlockSecondPWDialogVisible = val;
      },
      unlockSecondPWDialogVisible(val) {
        if (!val) {
          this.$emit('close');
        } 
      },
      sendId(val){
        this.basicSetting.dict_id=val;
      },
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

      saveVisitRecord(){
        this.$http.get(globalConfig.server + "setting/others/password", { params:this.basicSetting}).then(res => {
          if (res.data.code === "1000100") {
            this.unlockSecondPWDialogVisible = false;
            this.setCount = true;
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
