<template>
  <div id="visitRecord">
    <el-dialog :close-on-click-modal="false" title="变更办公室信息" :visible.sync="updateDormDialogVisible" width="30%">
      <div class="">
        <el-form size="mini" onsubmit="return false;" label-width="100px">
          <el-row>
            <el-form-item label="房屋地址">
              <el-input v-model="house_name" placeholder="请选择" readonly @focus="openModal('house')"></el-input>
            </el-form-item>
          </el-row>
          <el-row>
            <el-form-item label="部门">
              <el-input v-model="depart_name" placeholder="请选择" readonly @focus="openModal('staff')"></el-input>
            </el-form-item>
          </el-row>
          <el-row>
            <el-form-item label="部门人数">
              <el-input v-model="params.office_num" placeholder="请输入内容"></el-input>
            </el-form-item>
          </el-row>
          <el-row>
            <el-form-item label="开始时间">
              <el-date-picker v-model="params.start_time" value-format="yyyy-MM-dd" type="date" placeholder="选择日期"></el-date-picker>
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
        <el-button size="small" @click="updateDormDialogVisible = false">取 消</el-button>
        <el-button size="small" type="primary" @click="confirmAdd">确 定</el-button>
      </span>
    </el-dialog>
    <Organization :organizationDialog="organizationDialog" :type="type" :length="length"
                   @close="closeModal" @selectMember="selectMember"></Organization>
    <HouseSelect :houseDialog="houseDialog" @close="closeModal"></HouseSelect>
  </div>
</template>

<script>
  import Organization from '../../common/organization';
  import HouseSelect from '../../common/houseSearch'
  export default {
    props: ['updateDormDialog','currentRow'],
    components: {Organization,HouseSelect},
    data() {
      return {
        updateDormDialogVisible: false,
        organizationDialog: false,
        houseDialog: false,
        type : '',
        length : '',
        params:{
          house_id: '',
          depart_id: '',
          office_num: '',
          start_time: '',
          remarks: '',
          house_type: 1,
          operate_type: 5,
        },
        house_name:'',
        depart_name: '',
      }
    },
    watch: {
      updateDormDialog(val) {
        this.updateDormDialogVisible = val;
      },
      updateDormDialogVisible(val) {
        if (!val) {
          this.$emit('close');
        }else {
          console.log(this.currentRow);
          this.house_name = this.currentRow.house_name;
          this.params.house_id = this.currentRow.house_id;
          this.depart_name = this.currentRow.depart.name;
          this.params.depart_id = this.currentRow.depart.id;
          this.params.office_num = this.currentRow.depart.users;
          this.params.start_time = this.currentRow.start_at;
          this.params.remarks = this.currentRow.remarks[this.currentRow.remarks.length-1].remarks;
        }
      },
    },
    methods: {
      openModal(val){
        if(val === 'house'){
          this.houseDialog = true;
        }else {
          this.organizationDialog = true;
          this.type = 'depart';
          this.length = 1;
        }
      },
      closeModal(val){
        this.organizationDialog = false;
        this.houseDialog = false;
        if(val){
          this.params.house_id = val.id;
          this.house_name = val.name;
        }
      },
      selectMember(val){
        this.params.depart_id = val[0].id;
        this.depart_name = val[0].name;
        this.params.office_num = val[0].users.length;
      },
      confirmAdd() {
        this.$http.post(globalConfig.server+'api/v1/house-update',this.params).then( res => {
          console.log(res, "11111");
          
          if(res.data.code === '60024'){
            this.$notify.success({
              title:'成功',
              message:res.data.msg,
            });
            this.$emit('close','success');
            this.updateDormDialogVisible = false;
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
          depart_id: '',
          office_num: '',
          start_time: '',
          remarks: '',
          house_type: 1,
          operate_type: 5,
        };
        this.house_name = '';
        this.depart_name = '';
      },
    },
  }
</script>

<style scoped>

</style>
