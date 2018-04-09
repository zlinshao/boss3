<template>
  <div>
    <el-dialog title="修改岗位" :visible.sync="editPositionDialogVisible" width="30%">
      <div>
        <el-form size="mini" :model="params" label-width="100px">
          <el-row>
            <el-col :span="24">
              <el-form-item label="岗位名称" required="">
                <el-input placeholder="请输入内容" v-model="params.name"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button size="small" @click="editPositionDialogVisible=false">取 消</el-button>
        <el-button size="small" type="primary" @click="confirmAdd">确 定</el-button>
      </span>
    </el-dialog>

    <Organization :organizationDialog="organizationDialog" @close="closeOrganization" @selectMember="selectMember"></Organization>
  </div>
</template>


<script>
  import Organization from '../../../common/organization.vue'
  export default {
    props:['editPositionDialog','positionId','positionName'],
    components:{Organization},
    data() {
      return {
        editPositionDialogVisible:false,
        params:{
          name:'',
        },
        organizationDialog:false,
      };
    },
    watch:{
      editPositionDialog(val){
        this.editPositionDialogVisible = val
      },
      editPositionDialogVisible(val){
        if(!val){
          this.$emit('close')
        }
      },
      positionName(val){
          this.params.name = val;
      }
    },
    methods:{
      confirmAdd(){
        this.$http.put(globalConfig.server+'manager/position/'+this.positionId,this.params).then((res) => {
          if(res.data.code === '20010'){
            this.$emit('close','success');
            this.closeModal();
          }else {
            this.$notify.warning({
              title: '警告',
              message: res.data.msg,
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
        this.params.org_id = val[0].id;
        this.getPosition();
        this.department = val[0].name;
        this.organizationDialog = false;
      },
      closeModal(){
        this.editPositionDialogVisible = false;
        this.params = {
          name:'',
        };
      }
    }
  };
</script>
<style lang="scss" scoped="">
  #addRentRepair{
  }

</style>
