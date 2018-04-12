<template>
  <div id="">
    <el-dialog :close-on-click-modal="false" :close-on-press-escape="false"  title="解锁二级密码" :visible.sync="unlockSecondPWDialogVisible" width="40%">
      <div class="">
        <el-form size="mini" onsubmit="return false;" label-width="100px">
          <el-row>
            <el-col :span="12">
              <el-form-item label="二级密码">
                <el-input size="small" type="password"
                          v-model="basicSetting.pwd" placeholder="请输入二级密码"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <span style="color:#fdaece;margin-left:100px;">备注:密码长度4-6位，数字、字母和下划线</span>
        </el-form>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button :disabled="!basicSetting.pwd"
                   size="small" type="primary" @click="saveVisitRecord">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  props: ["unlockSecondPWDialog", "sendId"],
  components: {},
  data() {
    return {
      unlockSecondPWDialogVisible: false,
      unlockFlag:false,
      basicSetting: {
        dict_id: "",
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
    sendId(val) {
      console.log(val)
      this.basicSetting.dict_id = val;
    }
  },
  methods: {

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
