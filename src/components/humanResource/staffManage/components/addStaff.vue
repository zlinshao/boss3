<template>
  <div id="addRentRepair">
    <el-dialog :title="title" :visible.sync="addStaffDialogVisible" width="40%" :before-close="beforeCloseModal">
      <div>
        <el-form size="mini" :model="params" label-width="100px">
          <el-row>
            <el-col :span="12">
              <el-form-item label="姓名">
                <el-input placeholder="请输入内容" v-model="params.name"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label='手机号'>
                <el-input placeholder="请输入内容" v-model="params.phone"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="所属部门">
                <el-input placeholder="请输入内容" v-model="params.org_id"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button size="small" @click="beforeCloseModal">取 消</el-button>
        <el-button size="small" type="primary" @click.native="confirmAdd">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
  export default {
    props:['addStaffDialog','isEdit','editId'],
    data() {
      return {
        addStaffDialogVisible:false,
        params:{
          org_id:'',
          name:'',
          phone:''
        },
        title : '新建用户',
      };
    },
    watch:{
      addStaffDialog(val){
        this.addStaffDialogVisible = val
      },
      addStaffDialogVisible(val){
        if(!val){
          this.$emit('close')
        }
      },
      isEdit(val){
          if(!val){
            this.title = '新建用户'
          }else {
            this.title = '修改用户'
            this.getStaffInfo();
          }
      }
    },
    methods:{
      //编辑时获取员工信息
      getStaffInfo(){
        this.$ajax.get('api/v1/users/'+this.editId).then((res) => {
          if(res.data.status === 'success'){
            this.params.name = res.data.data.name;
            this.params.phone = res.data.data.phone;
            this.params.org_id = res.data.data.org_id;
          }else {
            this.$message({
              message: res.data.message,
              type: 'warning'
            });
          }
        });
      },
      confirmAdd(){
        if(!this.isEdit){
          this.$ajax.post('api/v1/users',this.params).then((res) => {
            if(res.data.status === 'success'){
              this.$emit('close','success');
              this.closeModal();
            }else {
              this.$message({
                message: res.data.message,
                type: 'warning'
              });
            }
          });
        }else {
          this.$ajax.put('api/v1/users/'+this.editId,this.params).then((res) => {
            if(res.data.status === 'success'){
              this.$emit('close','success');
              this.closeModal();
            }else {
              this.$message({
                message: res.data.message,
                type: 'warning'
              });
            }
          });
        }

      },
      beforeCloseModal(){
        if(this.isEdit){
          this.params = {
            org_id:'',
            name:'',
            phone:''
          };
        }
        this.addStaffDialogVisible = false;
      },
      closeModal(){
        this.addStaffDialogVisible = false;
        this.params = {
          org_id:'',
          name:'',
          phone:''
        }
      }
    }
  };
</script>
<style lang="scss" scoped="">
  #addRentRepair{
  }

</style>
