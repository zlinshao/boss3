<template>
  <div id="">
    <el-dialog title="信息确认" :visible.sync="starffAddDialogVisible" width="35%">
      <div class="">
        <el-form size="mini" label-width="120px">
          <el-row>
            <el-col :span="12">
              <el-form-item label="姓名:">
                <div class="content">
                  <span>{{personal.name}}</span>
                </div>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="片区:">
                <div class="content">
                  <span>{{department}}</span>
                </div>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="入职时间:">
                <div class="content">
                  <span>{{personal.detail && personal.detail.enroll}}</span>
                </div>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="上月溢出业绩:">
                <div class="content">
                  <span></span>
                </div>
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
            <el-form :model="form" size="mini" class="elformot scroll_bar" style="padding-left: 23px;">
              <el-form-item>
                <el-radio-group v-model="form.check">
                  <el-row v-for="item in enroableExam" :key="item.id">
                    <el-col  style="line-height:28px;height: 28px;">
                      <el-radio :label="item.id" :key="item.id">
                        {{item.name}}
                      </el-radio>
                    </el-col>
                  </el-row>
                </el-radio-group>
              </el-form-item>
            </el-form>
          </el-row>
        </el-form>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button size="small" type="primary" @click="save">确 定</el-button>
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
        form: {
          check: ''
        },
        enroableExam: [],
        department: '',
      };
    },
    mounted() {
      //初始化个人信息
      this.personal = JSON.parse(localStorage.personal);
      let departNameArray = [];
      if (this.personal.org && this.personal.org.length > 0) {
        this.personal.org.forEach((item) => {
          departNameArray.push(item.name);
        });
      }
      this.department = departNameArray.join(',');
      this.getExam();
    },
    created() {
    },
    watch: {
      starffAddFlag(val) {
        this.starffAddDialogVisible = val;
      },
      starffAddDialogVisible(val) {
        if (!val) {
          this.$emit("close");
        }else{
          this.getExam();
        }
      }
    },
    methods: {
      save() {
        this.$http.post(globalConfig.server + "exam/enroll/" + this.form.check).then(res => {
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
        this.$http.get(globalConfig.server + "/exam/exam/my?enrolled=0").then(res => {
          if (res.data.code === "30000") {
            this.enroableExam = res.data.data.data;
          }
        });
      }
    }
  };
</script>

<style scoped>
  .content {
    padding: 0 10px;
    min-height: 32px;
    line-height: 32px;
    background: #eef3fc;
    border-radius: 4px;
    font-size: 12px;
    color: #727479;
  }

  .el-radio {
    line-height: 24px !important;
  }

  .elformot {
    margin: 0 40px;
    overflow-x: hidden;
    overflow-y: auto;
    height: 200px;
  }
</style>
