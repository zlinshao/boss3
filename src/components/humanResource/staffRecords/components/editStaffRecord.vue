<template>
  <div>
    <el-dialog :close-on-click-modal="false" title="修改记录" :visible.sync="editStaffRecordDialogVisible" width="30%">
      <div>
        <el-form size="mini" onsubmit="return false;" :model="params" label-width="100px">
          <el-row>
            <el-col :span="10">
              <el-form-item label="类型选择" required>
                <el-select v-model="params.type" placeholder="请选择" clearable>
                  <el-option v-for="val in typeCategory" :key="val.id" :value="val.id" :label="val.name">
                    {{val.name}}
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="16">
              <el-form-item label="描述" required>
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
        <el-button size="small" type="primary" @click.native="confirmEdit" :disabled="disabledBtn">确 定</el-button>
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
          type: '',
          detail_id: '',
          remark: '',
          images: []
        },
        editImage: {},
        isClear: false,
        typeCategory: [
          {id: 1, name: '表扬'},
          {id: 2, name: '批评'},
          {id: 3, name: '疑惑'},
          {id: 4, name: '其他'},
        ],
        disabledBtn: false,
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
          this.params = {
            type: '',
            detail_id: '',
            remark: '',
            images: []
          };
          this.editImage = {};
        } else {
          this.isClear = false;
          this.disabledBtn = false;
          // this.params.detail_id = this.record.detail_id;
          // this.params.remark = this.record.remark;
          // if (this.record.images && this.record.images.length > 0) {
          //   let data = {};
          //   this.record.images.forEach((item) => {
          //     this.params.images.push(item.id);
          //     data[item.id] = item.url;
          //   });
          //   this.editImage = data;
          // }
          this.params.detail_id = this.record.detail_id;
          // this.params.type = this.record.type;
          this.$http.post(globalConfig.server + 'credit/manage/getonerecorddetail', {detail_id: this.record.detail_id}).then((res) => {
            if (res.data.code === '10000') {
              this.params.type = res.data.data.type;
              this.params.remark = res.data.data.remark;
              if (res.data.data && res.data.data.images.length > 0) {
                let data = {};
                res.data.data.images.forEach((item) => {
                  this.params.images.push(item.id);
                  data[item.id] = item.url;
                });
                this.editImage = data;
              }
            } else {
              this.$notify.warning({
                title: '警告',
                message: res.data.msg,
              });
            }
          });
        }
      },
    },
    methods: {
      getImg(val) {
        this.params.images = val[1];
      },
      confirmEdit() {
        this.disabledBtn = true;
        this.$http.post(globalConfig.server + 'credit/manage/employeeedit', this.params).then((res) => {
          if (res.data.code === '100100') {
            this.$emit('close', 'success');
            this.editStaffRecordDialogVisible = false;
            this.$notify.success({
              title: '成功',
              message: res.data.msg,
            });
          } else {
            this.disabledBtn = false;
            this.$notify.warning({
              title: '警告',
              message: res.data.msg,
            });
          }
        });
      },
    }
  };
</script>
<style lang="scss" scoped="">
  #addRentRepair {

  }

</style>
