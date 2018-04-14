<template>
  <div id="">
    <el-dialog :close-on-click-modal="false" :close-on-press-escape="false"  title="解锁二级密码" :visible.sync="unlockSecondPWDialogVisible" width="40%">
      <div class="">
        <el-form size="mini" onsubmit="return false;" label-width="100px">
          <el-row>
            <el-col :span="12">
              <el-form-item label="二级密码">
                <el-input size="small" type="password"
                          v-model="basicSetting.pwd"  @keyup.enter.native="saveVisitRecord" placeholder="请输入二级密码"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <span style="color:#fdaece;margin-left:100px;">备注:密码长度6-18位数字或字母。</span>
        </el-form>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button size="small" type="success" @click="clearPassword">清除二级密码</el-button>
        <el-button :disabled="!basicSetting.pwd"
                   size="small" type="primary" @click="saveVisitRecord">确 定</el-button>
      </span>
    </el-dialog>
    <ClearSecondPW :ClearSecondPWDialog="ClearSecondPWDialog" @clearFalg="clearFalg"  @close="closeModal"></ClearSecondPW>
  </div>
</template>

<script>
import ClearSecondPW from "./clearSecondpw.vue";
export default {
  props: ["unlockSecondPWDialog", "unLockName"],
  components: {ClearSecondPW},
  data() {
    return {
      unlockSecondPWDialogVisible: false,
      unlockFlag:false,
      ClearSecondPWDialog:false,
      dictionary2:[],
      basicSetting: {
        dict_id: "221",
        pwd: ""
      }
    };
  },
  computed: {
    personalInfo() {
      return JSON.parse(localStorage.personal);
    }
  },
  created() {},
  watch: {
    unlockSecondPWDialog(val) {
      this.unlockSecondPWDialogVisible = val;
    },
    unlockSecondPWDialogVisible(val) {
      if (!val) {
        this.$emit("close");
        this.$emit("unlockFlag",this.unlockFlag);
        this.basicSetting.pwd=""
      }
    },
    unLockName(val) {
    
        this.$http.get(globalConfig.server + "setting/dictionary/220").then(res => {
          if (res.data.code === "30010") {
            this.dictionary2 = res.data.data;
            for (let i = 0; i < this.dictionary2.length; i++) {
                if (this.dictionary2[i].dictionary_name == val) {
                  this.basicSetting.dict_id=this.dictionary2[i].id
                }
            }
          }
        });
    },
  },
  methods: {
    closeModal(){
      this.ClearSecondPWDialog =false;
    },
    clearPassword(){
      this.ClearSecondPWDialog = true;
    },
    clearFalg(val){
      if(val){
        this.unlockSecondPWDialogVisible =false;
        this.$emit("unlockFlag",val);
      }
    },
    saveVisitRecord() {
      this.$http
        .get(globalConfig.server + "setting/others/password", {
          params: this.basicSetting
        })
        .then(res => {
          if (res.data.code === "1000100") {
            this.unlockSecondPWDialogVisible = false;
            this.unlockFlag = true;
            this.basicSetting = {
              dict_id: "",
              pwd: ""
            };
          } else {
            this.unlockFlag = false;
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
