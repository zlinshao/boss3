<template>
  <div id="visitRecord">
    <el-dialog :close-on-click-modal="false" title="变更宿舍信息" :visible.sync="updateRecordDialogVisible" width="30%">
      <div class="">
        <el-form size="mini" onsubmit="return false;" label-width="100px">
          <!--<el-row>-->
            <!--<el-form-item label="选择房屋">-->
              <!--<el-input disabled v-model="house_name" placeholder="请选择" readonly @focus="openModal('house')"></el-input>-->
            <!--</el-form-item>-->
          <!--</el-row>-->
          <!--<el-row>-->
            <!--<el-form-item label="总床位">-->
              <!--<el-input v-model="params.bed_num" placeholder="请输入内容"></el-input>-->
            <!--</el-form-item>-->
          <!--</el-row>-->
          <!--<el-row>-->
            <!--<el-form-item label="片区经理">-->
              <!--<el-input disabled v-model="leader_name" placeholder="请选择" readonly @focus="openModal('staff')"></el-input>-->
            <!--</el-form-item>-->
          <!--</el-row>-->
          <div v-if="this.params.operate_type == 1">
            <el-row>
              <el-form-item label="开始时间">
                <el-date-picker v-model="params.start_time" value-format="yyyy-MM-dd" type="date" placeholder="选择日期"></el-date-picker>
              </el-form-item>
            </el-row>
          </div>
          <div v-if="this.params.operate_type == 2">
            <el-row>
              <el-form-item label="入住时间">
                <el-date-picker v-model="params.live_time" value-format="yyyy-MM-dd" type="date" placeholder="选择日期"></el-date-picker>
              </el-form-item>
            </el-row>
          </div>
          <div v-if="this.params.operate_type == 3">
            <el-row>
              <el-form-item label="离宿时间">
                <el-date-picker v-model="params.out_time" value-format="yyyy-MM-dd" type="date" placeholder="选择日期"></el-date-picker>
              </el-form-item>
            </el-row>
          </div>
          <div v-if="this.params.operate_type == 4">
            <el-row>
              <el-form-item label="取消时间">
                <el-date-picker v-model="params.end_at" value-format="yyyy-MM-dd" type="date" placeholder="选择日期"></el-date-picker>
              </el-form-item>
            </el-row>
          </div>
          <el-row>
            <el-form-item label="备注">
              <el-input v-model="params.remarks" placeholder="请输入内容" type="textarea"></el-input>
            </el-form-item>
          </el-row>
        </el-form>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button size="small" @click="updateRecordDialogVisible = false">取 消</el-button>
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
    props: ['updateRecordDialog','currentRow'],
    components: {Organization,HouseSelect},
    data() {
      return {
        updateRecordDialogVisible: false,
        organizationDialog: false,
        houseDialog: false,
        type : '',
        length : '',
        params:{
          id:'',
          remarks: '',
          house_type: 2,
          operate_type: 5,
          live_time : '',
          out_time : '',
          start_time:'',
          end_at: '',
        },
        house_name:'',
        leader_name: '',
      }
    },
    watch: {
      updateRecordDialog(val) {
        this.updateRecordDialogVisible = val;
      },
      updateRecordDialogVisible(val) {
        if (!val) {
          this.$emit('close');
        }else {
          console.log(this.currentRow);
          this.params.id = this.currentRow.id;
          this.params.remarks = this.currentRow.remarks;
          this.params.house_type = this.currentRow.house_type;
          this.params.operate_type = this.currentRow.operate_type;
          this.params.start_time = this.currentRow.start_time;
          this.params.end_at = this.currentRow.end_at;
          if(this.currentRow.operate_content.guests && this.currentRow.operate_content.guests.length>0){
            this.params.live_time = this.currentRow.operate_content.guests[0].live_time
            this.params.out_time = this.currentRow.operate_content.guests[0].out_time
          }
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
        this.$http.post(globalConfig.server+'api/v1/house-remarks',this.params).then( res => {
          if(res.data.code === '60026'){
            this.$notify.success({
              title:'成功',
              message:res.data.msg,
            });
            this.$emit('close','success');
            this.updateRecordDialogVisible = false;
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
          id:'',
          remarks: '',
          house_type: 2,
          operate_type: 5,
          live_time : '',
          out_time : '',
          start_time:'',
          end_at: '',
        };
        this.house_name = '';
        this.leader_name = '';
      },
    },
  }
</script>

<style scoped>

</style>
