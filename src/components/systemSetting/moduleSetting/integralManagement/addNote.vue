<template>
  <div>
    <el-dialog :close-on-click-modal="false" title="备注" :visible.sync="newAddDialogVisible" width="30%">
      <div>
        <el-form size="mini" :model="form" label-width="100px">
          <el-row>

            <el-col :span="24">
              <el-form-item label="备注">
                <el-input type="textarea" placeholder="请输入内容" v-model="form.remark"></el-input>
              </el-form-item>
            </el-col>

          </el-row>
        </el-form>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button size="small" @click="newAddDialogVisible = false">取 消</el-button>
        <el-button size="small" type="primary" @click="submitIntegral">保 存</el-button>
      </span>
    </el-dialog>

  </div>
</template>

<script>
export default {
  props: [ "addNoteDialog", "formDetail"],
  components: {},
  data() {
    return {
      newAddDialogVisible: false,
      newOrChange: "",
      length: 0,
      newAdd:true,
      type: "",
      formid:'',
      form: {
        id:"",
        remark:""
      },
      otherType: false,

    };
  },
  watch: {
    formDetail(val) {
        this.form.id=val.id;
    },


    addNoteDialog(val) {
      this.newAddDialogVisible = val;
    },
    newAddDialogVisible(val) {
      if (!val) {
        this.$emit("close");
        this.close();
      }
    }
  },
  mounted() {},
  methods: {

    submitIntegral() {
          this.$http
            .post(globalConfig.server + "credit/manage/remark/item/",this.form)
            .then(res => {
              if (res.data.code === "30210") {
                this.$notify.success({
                  title: "成功",
                  message: res.data.msg
                });
                this.newAddDialogVisible=false;
                this.close();
                this.$emit("addNoteBack", this.newAdd);
              } else {
                this.$notify.warning({
                  title: "警告",
                  message: res.data.msg
                });
              }
            });
    },

    close() {
        this.formid='';
      this.form={
        name:"",
        amount: "",
        minus: "",
        remark:""
      }
    }
  }
};
</script>
<style lang="scss" scoped="">
#addRentRepair {
}
</style>
