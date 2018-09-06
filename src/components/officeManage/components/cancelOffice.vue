<template>
  <div id="visitRecord">
    <el-dialog :close-on-click-modal="false" title="取消办公室" :visible.sync="cancelDormDialogVisible" width="30%">
      <div class="">
        <el-form size="mini" onsubmit="return false;" label-width="100px">
          <el-row>
            <el-form-item label="房屋地址">
              <el-input v-model="house_name" placeholder="请选择" disabled></el-input>
            </el-form-item>
          </el-row>
          <el-row>
            <el-form-item label="取消时间">
              <el-date-picker v-model="params.end_at" value-format="yyyy-MM-dd" type="date" placeholder="选择日期"></el-date-picker>
            </el-form-item>
          </el-row>
          <el-row>
            <el-form-item label="备注">
              <el-input v-model="params.remarks" placeholder="请输入内容" type="textarea"></el-input>
            </el-form-item>
          </el-row>
        </el-form>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button size="small" @click="cancelDormDialogVisible = false">取 消</el-button>
        <el-button size="small" type="primary" @click="confirmAdd">确 定</el-button>
      </span>
    </el-dialog>

  </div>
</template>

<script>
  export default {
    props: ['cancelDormDialog','currentRow'],
    data() {
      return {
        cancelDormDialogVisible: false,
        organizationDialog: false,
        type : '',
        length : '',
        params:{
          house_id: '',
          end_at: '',
          remarks: '',
          house_type : 1,
          operate_type: 4,
        },
        house_name:'',
      }
    },
    watch: {
      cancelDormDialog(val) {
        this.cancelDormDialogVisible = val;
      },
      cancelDormDialogVisible(val) {
        if (!val) {
          this.$emit('close');
        }else {
          this.house_name = this.currentRow.house_name;
          this.params.house_id = this.currentRow.house_id;
        }
      },
    },
    methods: {
      openModal(val){
        this.organizationDialog = true;
        this.type = 'staff';
      },
      closeModal(val){

      },
      selectMember(val){

      },
      confirmAdd() {
        this.$http.post(globalConfig.server+'api/v1/house-delete',this.params).then( res => {
          if(res.data.code === '60022'){
            this.$notify.success({
              title:'成功',
              message:res.data.msg,
            });
            this.$emit('close','success');
            this.cancelDormDialogVisible = false;
            this.initData();
          }else {
            this.$notify.warning({
              title:'警告',
              message:res.data.msg,
            })
          }
        })
      },
      initData(){
        this.params = {
          house_id: '',
          end_at: '',
          remarks: '',
          house_type : 1,
          operate_type: 4,
        };
        this.house_name = '';
      },
    },
  }
</script>

<style scoped>

</style>
