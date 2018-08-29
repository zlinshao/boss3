<template>
  <div id="visitRecord">
    <el-dialog :close-on-click-modal="false" title="变更宿舍信息" :visible.sync="updateDormDialogVisible" width="30%">
      <div class="">
        <el-form size="mini" onsubmit="return false;" label-width="100px">
          <el-row>
            <el-form-item label="选择房屋">
              <el-input v-model="house_name" placeholder="请选择" readonly @focus="openModal('house')"></el-input>
            </el-form-item>
          </el-row>
          <el-row>
            <el-form-item label="总床位">
              <el-input v-model="params.bed_num" placeholder="请输入内容"></el-input>
            </el-form-item>
          </el-row>
          <el-row>
            <el-form-item label="片区经理">
              <el-input v-model="leader_name" placeholder="请选择" readonly @focus="openModal('staff')"></el-input>
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
          leader_id: '',
          bed_num: '',
          remarks: '',
          house_type: 2,
          operate_type: 5,
        },
        house_name:'',
        leader_name: '',
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
          this.house_name = this.currentRow.house_name;
          this.params.remarks = this.currentRow.remarks;
          this.params.house_id = this.currentRow.house_id;
          this.params.bed_num = this.currentRow.bed_num;
          this.params.leader_id = this.currentRow.leader[0].leader_id;
          this.leader_name = this.currentRow.leader[0].leader_name;
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
          this.type = 'staff';
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
        this.params.leader_id = val[0].id;
        this.leader_name = val[0].name;
      },
      confirmAdd() {
        this.$http.post(globalConfig.server+'api/v1/house-update',this.params).then( res => {
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
          leader_id: '',
          bed_num: '',
          remarks: '',
          house_type: 2,
          operate_type: 5,
        };
        this.house_name = '';
        this.leader_name = '';
      },
    },
  }
</script>

<style scoped>

</style>
