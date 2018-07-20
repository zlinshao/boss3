<template>
  <div>
    <el-dialog :close-on-click-modal="false" title="修改记录" :visible.sync="editStaffRecordDialogVisible" width="30%">
      <div>
        <el-form size="mini" onsubmit="return false;" :model="params" label-width="100px">
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
        <el-button size="small" @click="editStaffRecordDialogVisible=false">取 消</el-button>
        <el-button size="small" type="primary" @click.native="confirmEdit">确 定</el-button>
      </span>
    </el-dialog>
    <Organization :organizationDialog="organizationDialog" @close="closeOrganization" @selectMember="selectMember"></Organization>
  </div>
</template>

<script>
  import Organization from '../../../common/organization.vue'
  export default {
    props:['editStaffRecordDialog','recordId'],
    components:{Organization},
    data() {
      return {
        editStaffRecordDialogVisible:false,
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
      editStaffRecordDialog(val){
        this.editStaffRecordDialogVisible = val
      },
      editStaffRecordDialogVisible(val){
        if(!val){
          this.$emit('close');
        }
      },
    },
    methods:{

      confirmEdit(){

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
        };
        this.department = '';
      }
    }
  };
</script>
<style lang="scss" scoped="">
  #addRentRepair{
  }

</style>
