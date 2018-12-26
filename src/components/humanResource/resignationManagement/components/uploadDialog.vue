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
  props:["row", "editUpload"],
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
    editUpload(val) {
      this.upLoadDialogVisible = val;
    },
    row(row) {
      this.form.user_id = row.id;
      let dismiss_reason = row.staffs.dismiss_reason;
      this.form.dismiss_reason = row.staffs.dismiss_reason;
      this.form.dismiss_time = row.staffs.dismiss_time;
       if(row.resignation_form) {
      let obj  = {};
        row.resignation_form.forEach((item, index) => {
          this.form.resignation_form.push(item.id)
          obj[item.id] = item.uri;
        })
        this.editImage = obj;
      }
       console.log(this.editImage, "7777")
     
      for (let key in dismiss_reason) {
        if(key == "dismiss_mess") {
          this.dismiss_mess = row.dismiss_mess;
          this.form.dismiss_mess = row.dismiss_mess;
        } else if(key == "dismiss_type") {
          if(dismiss_reason[key] == "1") {
            this.dismiss_type = "主动离职";
          } else if(dismiss_reason[key] == "2") {
            this.dismiss_type = "旷工离职";
          } else if(dismiss_reason[key] == "3") {
            this.dismiss_type = "劝退";
          } else if(dismiss_reason[key] == "4") {
            this.dismiss_type = "开除";
          }
          // this.form.dismiss_type = dismiss_reason[key];
        }
      }
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
