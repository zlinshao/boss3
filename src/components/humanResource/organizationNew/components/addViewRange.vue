<template>
  <div>
    <el-dialog :close-on-click-modal="false" title="可见范围" :visible.sync="viewRangeDialogVisible" width="30%">
      <div>
        <el-form size="mini" onsubmit="return false;" :model="params" label-width="100px">
          <el-row>
            <el-col :span="24">
              <el-form-item label="可见范围" required="">
                <el-input placeholder="请选择部门" v-model="depart_name" readonly @focus="selectDepart">
                  <el-button slot="append" type="primary"  @click="clearData">清空</el-button>
                </el-input>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button size="small" @click="viewRangeDialogVisible=false">取 消</el-button>
        <el-button size="small" type="primary" @click="confirmAdd">确 定</el-button>
      </span>
    </el-dialog>

    <Organization :type="type" :organizationDialog="organizationDialog"
                  @close="closeOrganization" @selectMember="selectMember"></Organization>
  </div>
</template>


<script>
  import Organization from '../../../common/organization.vue'
  export default {
    props:['viewRangeDialog','editId'],
    components:{Organization},
    data() {
      return {
        viewRangeDialogVisible:false,
        params:{
          id:[],
          staff_id : '',
        },
        type : '',
        depart_name : '',
        organizationDialog:false,
      };
    },
    watch:{
      viewRangeDialog(val){
        this.viewRangeDialogVisible = val
      },
      viewRangeDialogVisible(val){
        if(!val){
          this.$emit('close');
          this.closeModal();
        }else {
          this.getData();
        }
      },
      editId(val){
        this.params.staff_id = val;
      }
    },
    methods:{
      getData(){
        this.$http.get(globalConfig.server + 'manager/staff/range/'+this.editId).then((res)=>{
          if(res.data.code === '10000'){
            res.data.data.forEach(item => {
              this.params.id.push(item.id);
              this.depart_name += item.name + ' ';
            })
          }else {
            this.depart_name = '';
            this.params.id = [];
          }
        })
      },
      confirmAdd(){
        this.$http.post(globalConfig.server + 'manager/staff/range',this.params).then((res)=>{
          if(res.data.code === '10000'){
            this.closeModal();
            this.$notify.success({
              title:'成功',
              message:res.data.msg
            })
          }else {
            this.$notify.warning({
              title:'警告',
              message:res.data.msg
            })
          }
        })
      },
      selectDepart(){
        this.type='depart';
        this.organizationDialog = true
      },
      //关闭选人框回调
      closeOrganization(){
        this.organizationDialog = false;
      },
      selectMember(val){
        this.params.id = [];
        this.depart_name = '';
        val.forEach(item => {
          this.params.id.push(item.id);
          this.depart_name += item.name + ' ';
        })
      },
      closeModal(){
        this.viewRangeDialogVisible = false;
        this.params = {
          id :[],
          staff_id:this.editId
        };
        this.depart_name = '';
      },
      clearData(){
        this.depart_name = '';
        this.params.id = [];
      },
    }
  };
</script>
<style lang="scss" scoped="">
  #addRentRepair{
  }

</style>
