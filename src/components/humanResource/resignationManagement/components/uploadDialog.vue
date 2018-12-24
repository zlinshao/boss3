<template>
    <div id="uploadDialog">
      <el-dialog :title="titleName" :visible.sync="upLoadDialogVisible" width="30%">
        <el-form ref="form" :model="form" label-width="80px">
          <el-form-item label="离职类型">
            <el-input v-model="dismiss_type" :disabled="true"></el-input>
          </el-form-item>
          <el-form-item label="离职原因">
            <el-input v-model="dismiss_mess" :disabled="true"></el-input>
          </el-form-item>
          <el-form-item label="上传离职图片">
            <UpLoad :ID="'files'" :isClear="isClear" :editImage="editImage"  @getImg="upLoadFiles"></UpLoad>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="upLoadDialogVisible = false" size="mini">取 消</el-button>
          <el-button type="primary" @click="addResigntionTable" size="mini">确 定</el-button>
        </span>
      </el-dialog>
    </div>
</template>

<script>
import UpLoad from '../../../common/UPLOAD'
export default {
  components: {UpLoad},
  props:["row"],
  data() {
    return {
      isClear: false,
      dismiss_mess: "",
      dismiss_type: "",
      titleName: "上传离职交接单",
      editImage: {},
      upLoadDialogVisible: false,
      form: {
        resignation_form: [],
        user_id: "",
        dismiss_time: "",
        dismiss_reason: "",
        dismiss_mess: "",
        // dismiss_type: "",
      },
    }
  },
  watch: {
    row(val) {

    },
    upLoadDialogVisible(val) {
      if(!val) {
        this.$emit("close")
      }
    }
  },
  methods: {
    upLoadFiles(val) {
      // console.log(val, "44444")
      this.form.resignation_form = val[1];
      // console.log(this.form.resignation_form, "55555")
    },
    addResigntionTable() {
      this.$http.post(globalConfig.server + 'organization/staff/dismisse/' + this.form.user_id, {
        dismiss_time: this.form.dismiss_time,
        dismiss_reason: this.form.dismiss_reason,
        resignation_form: this.form.resignation_form
      }).then(res => {
        if (res.data.code === '710418') {
          this.$notify.success({
            title: "成功",
            message: res.data.msg
          })
          this.getResignationEmploye();
          // this.isClear = true;
          this.upLoadDialogVisible = false;
        } else {
          this.$notify.warning({
            title: "警告",
            message: res.data.msg
          })
        }
      })
    },
  }
}
</script>

<style lang="scss">

</style>
