<template>
  <div id="">
    <el-dialog title="信息确认" :visible.sync="starffAddDialogVisible" width="30%">
      <div class="">
        <el-form size="mini"  label-width="100px">
          <el-row>
            <el-col :span="12">
              <el-form-item label="姓名:">
                <span>{{this.personal.name}}</span>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="片区:">
                <span></span>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="入职时间:">
                <span>{{createTime}}</span>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="上月溢出业绩:">
                <span></span>
              </el-form-item>
            </el-col>  
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="考试选择">
              </el-form-item>
            </el-col>            
          </el-row>
          <el-row>
              <el-form :model="form" size="mini" class="elformot">
                <el-form-item>
                  <el-radio-group v-model="form.check">
                    <el-col :span="24" :key="index" v-for="(val,index) in goods" style="line-height:24px;height: 24px;">
                      <el-radio :title="val.name" :label="index+1">{{val.name}}</el-radio>
                    </el-col>
                  </el-radio-group>
                </el-form-item>
              </el-form>
          </el-row>
        </el-form>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button size="small" type="primary" @click="save" >确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  props: ["starffAddFlag"],
  components: {},
  data() {
    return {
      starffAddDialogVisible: false,
      personal: {},
      createTime: "",
      form: {
        check: ""
      },
      goods: []
    };
  },
  computed: {},
  mounted() {
    //初始化个人信息
    this.personal = JSON.parse(localStorage.personal);
    this.createTime = this.personal.detail.create_time.split(" ")[0];
    console.log(this.personal);
    this.getExam();
  },
  created() {},
  watch: {
    starffAddFlag(val) {
      this.starffAddDialogVisible = val;
    },
    starffAddDialogVisible(val) {
      if (!val) {
        this.$emit("close");
      }
    }
  },
  methods: {
    save() {
      this.$http.post(globalConfig.server + "exam/enroll/" + this.form.check ).then(res => {
        if (res.data.code === "30010") {
          this.starffAddDialogVisible = false;
          this.$notify({
            title: "成功",
            message: res.data.msg,
            type: "success"
          });
        } else {
          this.$notify({
            title: "失败",
            message: res.data.msg,
            type: "warning"
          });
        }
      });
    },
    getExam() {
      this.$http.get(globalConfig.server + "exam").then(res => {
        if (res.data.code === "30000") {
          this.goods = res.data.data.data;
          this.form.check = ""
        }
      });
    }
  }
};
</script>

<style scoped>
.el-radio{
  line-height: 24px !important;
}
.elformot{
  margin: 0 40px;
  overflow: hidden;
}
</style>
