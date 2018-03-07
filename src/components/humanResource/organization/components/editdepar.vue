<template>
  <div>
    <el-dialog title="修改部门" :visible.sync="editDepartDialogVisible" width="30%">
      <div>
        <el-form size="mini" :model="params" label-width="100px">
          <el-row>
            <el-col :span="24">
              <el-form-item label="上级部门">
                <el-input placeholder="请输入内容" @focus="selectDepart" readonly="" v-model="department"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="24">
              <el-form-item label='部门名称'>
                <el-input placeholder="请输入内容" v-model="params.name"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="24">
              <el-form-item label='排序'>
                <el-input-number v-model="params.order"></el-input-number>
                <span style="color: #fb435e;margin-left: 15px">注意：数值越大，排序越靠前！</span>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button size="small" @click="editDepartDialogVisible=false">取 消</el-button>
        <el-button size="small" type="primary" @click.native="confirmEdit">确 定</el-button>
      </span>
    </el-dialog>
    <Organization :organizationDialog="organizationDialog" @close="closeOrganization" @selectMember="selectMember"></Organization>
  </div>
</template>

<script>
  import Organization from '../../../common/organization.vue'
  export default {
    props:['editDepartDialog','departId'],
    components:{Organization},
    data() {
      return {
        editDepartDialogVisible:false,
        params:{
          parent_id:'',
          name:'',
          order:''
        },
        organizationDialog:false,
        department:'',
      };
    },
    watch:{
      editDepartDialog(val){
        this.editDepartDialogVisible = val
      },
      editDepartDialogVisible(val){
        if(!val){
          this.$emit('close')
        }
      },
      departId(val){
          if(val){
              this.getStaffInfo();
          }
      }
    },
    methods:{
      //编辑时获取员工信息
      getStaffInfo(){
        this.$http.get(globalConfig.server_user+'api/v1/organizations/'+this.departId).then((res) => {
          if(res.data.status === 'success'){
            this.params.name = res.data.data.name;
            this.params.order = res.data.data.order;
            this.params.parent_id = res.data.data.parent_id;
          }else {
            this.$notify({
              title: '警告',
              message: res.data.message,
              type:'warning'
            });
          }
        });
      },
      confirmEdit(){
        this.$http.put(globalConfig.server_user+'api/v1/organizations/'+this.departId,this.params).then((res) => {
          if(res.data.status === 'success'){
            this.$emit('close','success');
            this.closeModal();
          }else {
            this.$notify({
              title: '警告',
              message: res.data.message,
              type:'warning'
            });
          }
        });
      },
      selectDepart(){
        this.organizationDialog = true
      },
      //关闭选人框回调
      closeOrganization(){
        this.organizationDialog = false;
      },
      selectMember(val){
        this.params.parent_id = val[0].id;
        this.department = val[0].name;
        this.organizationDialog = false;
      },
      closeModal(){
        this.editDepartDialogVisible = false;
        this.params = {
          parent_id:'',
          name:'',
          order:''
        }
      }
    }
  };
</script>
<style lang="scss" scoped="">
  #addRentRepair{
  }

</style>
