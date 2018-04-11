<template>
  <div>
    <el-dialog :close-on-click-modal="false" title="分配" :visible.sync="dispatchDialogVisible" width="40%">
      <div class="scroll_bar">

        <el-form label-width="80px" size="mini">
          <el-row>
            <el-col :span="12">
              <el-form-item label="姓名">
                <el-input disabled="" v-model="staff_name"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="分配人">
                <el-input readonly="" v-model="dispatchName" @focus="openOrganizeModal"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
        <div class="title">收房合同</div>
        <div class="form_border">
          <el-form size="mini" label-width="100px">
            <el-row>
              <el-col :span="6" v-for="(val,key) in contractCancelCollect" :key="key">
                <el-checkbox-group v-model="params.candidate">
                  <el-checkbox :label="key" name="type">{{val}}</el-checkbox>
                </el-checkbox-group>
              </el-col>
            </el-row>
          </el-form>
        </div>

        <div class="title">租房合同</div>
        <div class="form_border">
          <el-form size="mini" label-width="100px">
            <el-row>
              <el-col :span="6" v-for="(val,key) in contractCancelRent" :key="key">
                <el-checkbox-group v-model="params.candidate">
                  <el-checkbox :label="key" name="type">{{val}}</el-checkbox>
                </el-checkbox-group>
              </el-col>
            </el-row>
          </el-form>
        </div>
        <el-form label-width="80px" size="mini">

        </el-form>


      </div>
      <span slot="footer" class="dialog-footer">
        <el-button size="small" @click="dispatchDialogVisible = false">取 消</el-button>
        <el-button size="small" type="primary" @click="confirmAdd">确 定</el-button>
      </span>
    </el-dialog>

    <Organization :organizationDialog="organizationDialog" :length="length" :type="type"
                  @close='closeModal' @selectMember="selectMember"></Organization>
  </div>
</template>

<script>
  import Organization from '../../../../common/organization.vue'
  export default {
    components:{Organization},
    props:['dispatchDialog','dispatchObject','startOperate'],
    data() {
      return {
        dispatchDialogVisible:false,
        params: {candidate:[]},
        contractCancelCollect:[],
        contractCancelRent:[],
        staff_name : '',
        staff_id : '',
        dispatchId : '',
        dispatchName : '',
        length:0,
        type:'',
        organizationDialog:false,
      };
    },
    watch:{
      dispatchDialog(val){
        this.dispatchDialogVisible = val
      },
      dispatchDialogVisible(val){
        if(!val){
          this.$emit('close')
        }
      },
      startOperate(val){
        if(val){
          this.getStaffContract();
        }
      },
      'dispatchObject':{
        deep:true,
        handler(val,old){
          this.staff_name = val.simple_staff.real_name;
          this.staff_id = val.staff_id;
          this.getStaffContract()
        }
      }
    },
    methods:{
      getStaffContract(){
        this.contractCancelCollect = [];
        this.contractCancelRent = [];
        this.$http.get(globalConfig.server+'contract/staff/'+this.staff_id).then((res) => {
          if(res.data.code === '20000'){
            this.contractCancelCollect = Object.assign({},this.contractCancelCollect,res.data.data.collect);
            this.contractCancelRent = Object.assign({},this.contractCancelRent,res.data.data.rent);
          }else {
            this.$notify.warning({
              title:'警告',
              message:res.data.msg
            });
            this.contractCancelCollect = [];
            this.contractCancelRent = [];
          }
        });
      },

      //调出选人组件
      openOrganizeModal(){
        this.organizationDialog = true;
        this.type = 'staff';
        this.length = 1;
      },
      selectMember(val){
        this.organizationDialog = false;
        this.type = '';
        this.length = '';
        this.dispatchId = val[0].id;
        this.dispatchName = val[0].name;
      },
      closeModal(){
        this.organizationDialog = false
      },

      confirmAdd(){

        this.$http.post(globalConfig.server+'contract/allocate/'+this.dispatchId,this.params).then((res) => {
          if(res.data.code === '20010'){
            this.$emit('close','success');
            this.$notify.success({
              title:'成功',
              message:res.data.msg
            });
            this.initData();
          }else {
            this.$notify.warning({
              title:'警告',
              message:res.data.msg
            })
          }
        });
      },

      initData(){
        $('.imgItem').remove();

        this.dispatchDialogVisible = false;
        this.contractCancelCollect = [];
        this.contractCancelRent = [];
        this.params = {candidate:[]};
        this.staff_name = '';
        this.department_name = '';
        this.staff_id = '';
        this.dispatchId = '';
        this.dispatchName = '';
        this.type = '';
        this.length = 0;

      },
    }
  };
</script>
<style lang="scss" scoped="">
  .el-dialog__wrapper .el-dialog .el-dialog__body .form_border {
    padding: 18px 10px 18px 10px;
  }
</style>
