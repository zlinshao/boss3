<template>
  <div id="visitRecord">
    <el-dialog :close-on-click-modal="false" title="添加离宿人员" :visible.sync="addLeaveDialogVisible" width="30%">
      <div class="">
        <el-form size="mini" onsubmit="return false;" label-width="100px">
          <el-row>
            <el-form-item label="房屋地址">
              <el-input v-model="house_name" placeholder="请选择" disabled></el-input>
            </el-form-item>
          </el-row>
          <el-row>
            <el-form-item label="人员姓名">
              <el-input v-model="guest_names" placeholder="请选择" readonly @focus="openModal('staff')"></el-input>
            </el-form-item>
          </el-row>
          <el-row>
            <el-form-item label="离宿时间">
              <el-date-picker v-model="params.out_time" value-format="yyyy-MM-dd" type="date" placeholder="选择日期"></el-date-picker>
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
        <el-button size="small" @click="addLeaveDialogVisible = false">取 消</el-button>
        <el-button size="small" type="primary" @click="confirmAdd">确 定</el-button>
      </span>
    </el-dialog>
    <Organization :organizationDialog="organizationDialog" :type="type" :length="length"
                   @close="closeModal" @selectMember="selectMember"></Organization>
  </div>
</template>

<script>
  import Organization from '../../common/organization';
  export default {
    props: ['addLeaveDialog','currentRow'],
    components: {Organization},
    data() {
      return {
        addLeaveDialogVisible: false,
        organizationDialog: false,
        type : '',
        length : '',
        params:{
          house_id: '',
          guest_ids: [],
          out_time: '',
          remarks: '',
          operate_type: 3,
        },
        house_name:'',
        guest_names: '',
      }
    },
    watch: {
      addLeaveDialog(val) {
        this.addLeaveDialogVisible = val;
      },
      addLeaveDialogVisible(val) {
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
        this.organizationDialog = false;
        if(val){
          this.params.house_id = val.id;
          this.house_name = val.name;
        }
      },
      selectMember(val){
        this.params.guest_ids = [];
        this.guest_names = '';
        val.forEach(x=>{
          this.params.guest_ids.push(x.id);
          this.guest_names += x.name + ' ';
        });
      },
      confirmAdd() {
        this.$http.post(globalConfig.server+'api/v1/guest-delete',this.params).then( res => {
          if(res.data.code === '60020'){
            this.$notify.success({
              title:'成功',
              message:res.data.msg,
            });
            this.$emit('close','success');
            this.addLeaveDialogVisible = false;
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
          guest_ids: [],
          live_time: '',
          remarks: '',
          operate_type: 2,
        };
        this.house_name = '';
        this.guest_names = '';
      },
    },
  }
</script>

<style scoped>

</style>
