<template>
  <div>
    <el-dialog :close-on-click-modal="false" title="修改记录" :visible.sync="editStaffRecordDialogVisible" width="30%">
      <div>
        <el-form size="mini" onsubmit="return false;" :model="params" label-width="100px">
          <el-row>
            <el-col :span="16">
              <el-form-item label="描述">
                <el-input v-model="params.remark" type="textarea" rows="2"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24">
              <el-form-item label="照片">
                <UPLOAD ID="single_records" :isClear="isClear" :editImage="editImage" @getImg="getImg"></UPLOAD>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button size="small" @click="editStaffRecordDialogVisible=false">取 消</el-button>
        <el-button size="small" type="primary" @click.native="confirmEdit">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
  import UPLOAD from '../../../common/UPLOAD.vue';

  export default {
    props: ['editStaffRecordDialog', 'record'],
    components: {UPLOAD},
    data() {
      return {
        editStaffRecordDialogVisible: false,
        params: {
          detail_id: '',
          remark: '',
          images: []
        },
        editImage: {},
        isClear: false,
      };
    },
    watch: {
      editStaffRecordDialog(val) {
        this.editStaffRecordDialogVisible = val;
      },
      editStaffRecordDialogVisible(val) {
        if (!val) {
          this.isClear = true;
          this.$emit('close');
        } else {
          this.isClear = false;
          this.params.detail_id = this.record.detail_id;
          this.params.remark = this.record.remark;
          // this.params.images = this.record.images;
        }
      },
    },
    methods: {
      getImg(val) {
        this.params.images = val[1];
      },
      confirmEdit() {
        this.$http.post(globalConfig.server + 'credit/manage/employeeedit', this.params).then((res) => {
          if (res.data.code === '100100') {
            this.$emit('close', 'success');
            this.editStaffRecordDialogVisible = false;
            this.$notify.success({
              title: '成功',
              message: res.data.msg,
            });
          } else {
            this.$notify.warning({
              title: '警告',
              message: res.data.msg,
            });
          }
        });
      },
      closeModal() {
        this.editDepartDialogVisible = false;
        this.params = {
          detail_id: '',
          remark: '',
          images: []
        };
        this.editImage = {};
      }
    }
  };
</script>
<style lang="scss" scoped="">
  #addRentRepair {

  }

</style>
