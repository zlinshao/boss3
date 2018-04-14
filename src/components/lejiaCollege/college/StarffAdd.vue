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
              <el-form :model="form" size="mini"  label-width="40px">
                <el-form-item>
                  <el-checkbox-group v-model="form.check">
                    <el-col :span="24" :key="index" v-for="(val,index) in goods">
                      <el-checkbox :title="val.name" :label="val.id" name="USER">{{val.name}}</el-checkbox>
                    </el-col>
                  </el-checkbox-group>
                </el-form-item>
              </el-form>
          </el-row>
        </el-form>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button size="small" type="primary" @click="save" >确 定</el-button>
      </span>
    </el-dialog>
<StarffSure :starffSureFlag="starffSureFlag" @close="closeModal"></StarffSure>
  </div>
</template>

<script>
import StarffSure from "./StarffSure.vue";
export default {
  props: ["starffAddFlag"],
  components: { StarffSure },
  data() {
    return {
      starffAddDialogVisible: false,
      starffSureFlag: false,
      personal: {},
      createTime: "",
      form: {
        check: []
      },
      goods: [
        {
          id: 1,
          name: 1
        },
        {
          id: 2,
          name: 2
        },
        {
          id: 3,
          name: 3
        },
        {
          id: 4,
          name: 4
        }
      ]
    };
  },
  computed: {},
  mounted() {
    //初始化个人信息
    this.personal = JSON.parse(localStorage.personal);
    this.createTime = this.personal.detail.create_time.split(" ")[0];
    console.log(this.personal);
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
    //模态框回调
    closeModal() {
      this.starffSureFlag = false;
    },
    save() {
      this.starffSureFlag = true;
    }
    // save() {
    //   this.$http
    //     .get(globalConfig.server + "setting/others/password", {
    //       params: this.basicSetting
    //     })
    //     .then(res => {
    //       if (res.data.code === "1000100") {
    //         this.starffAddDialogVisible = false;
    //       } else {
    //         this.unlockFlag = false;
    //         this.$notify({
    //           title: "警告",
    //           message: res.data.msg,
    //           type: "warning"
    //         });
    //       }
    //     });
    // }
  }
};
</script>

<style scoped>

</style>
