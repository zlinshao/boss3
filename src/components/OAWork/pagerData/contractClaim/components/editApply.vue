<template>
  <div>
    <el-dialog title="领取合同修改" :visible.sync="editApplyDialogVisible">
      <div class="scroll_bar">
        <div class="title">基本信息</div>
        <div class="form_border">
          <el-form size="mini" :model="params" label-width="120px">
            <el-row>
              <el-col :span="8">
                <el-form-item label="任务类型">
                  <el-select clearable v-model="taskType" disabled="" placeholder="请选择任务类型">
                    <el-option label="领取" value="1"></el-option>
                    <el-option label="作废" value="2"></el-option>
                    <el-option label="上缴" value="3"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="城市">
                  <el-select clearable v-model="params.city_code" placeholder="请选择城市" @change="selectCity">
                    <el-option v-for="item in dictionary" :label="item.dictionary_name" :value="item.id" :key="item.id"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>

              <el-col :span="8">
                <el-form-item label="领用日期">
                  <el-date-picker
                    type="datetime"
                    placeholder="选择日期时间"
                    value-format="yyyy-MM-dd HH:mm:ss" v-model="params.report_time">
                  </el-date-picker>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="领用人">
                  <el-input readonly="" v-model="staff_name" @click.native="openOrganizeModal"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="所属部门">
                  <el-input disabled="" v-model="depart_name"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </div>

        <div class="title">操作信息</div>
        <div class="form_border">
          <el-form size="mini" :model="params" label-width="120px">
            <el-row class="noMarginForm">
              <el-col :span="8">
                <el-form-item label="领取合同数（收）">
                  <el-input v-model="params.collect_amount" @blur="computeContractEnd('collect')"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="合同编号">
                  <el-input v-model="params.collect_start" @blur="computeContractEnd('collect')"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="到">
                  <el-input disabled="" v-model="params.collect_end"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <div class="addMore">
              <el-button type="text" @click="addCollect"><i class="el-icon-circle-plus"></i></el-button>
              <el-button type="text" @click="reduceCollect"><i class="el-icon-remove"></i></el-button>
            </div>

            <el-row>
              <el-col :span="8" v-for="item in contractCollectNum" :key="item">
                <el-form-item label="合同编号（自选）">
                  <el-input v-model="params.collect_extra[item-1]"></el-input>
                </el-form-item>
              </el-col>
            </el-row>

            <el-row  class="noMarginForm">
              <el-col :span="8">
                <el-form-item label="领取合同数（租）">
                  <el-input v-model="params.rent_amount"  @blur="computeContractEnd('rent')"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="合同编号">
                  <el-input  v-model="params.rent_start"  @blur="computeContractEnd('rent')"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="到">
                  <el-input disabled=""  v-model="params.rent_end"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <div class="addMore">
              <el-button type="text" @click="addRent"><i class="el-icon-circle-plus"></i></el-button>
              <el-button type="text" @click="reduceRent"><i class="el-icon-remove"></i></el-button>
            </div>

            <el-row>
              <el-col :span="8" v-for="item in contractRentNum" :key="item">
                <el-form-item label="合同编号（自选）">
                  <el-input v-model="params.rent_extra[item-1]"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </div>

        <div class="title">剩余合同</div>
        <div class="form_border">
          <el-form size="mini" :model="params" label-width="120px">
            <el-row>
              <el-col :span="8">
                <el-form-item label="剩余合同数（收）">
                  <el-input disabled="" v-model="collect"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="剩余合同数（租）">
                  <el-input disabled="" v-model="rent"></el-input>
                </el-form-item>
              </el-col>
            </el-row>

            <el-row>
              <el-col>
                <el-form-item label="截图">
                  <Upload :ID="'jieTu'" @getImg="getImg"></Upload>
                </el-form-item>
              </el-col>
            </el-row>

            <el-row>
              <el-col :span="16">
                <el-form-item label="备注">
                  <el-input v-model="params.remark" type="textarea" ></el-input>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button size="small" @click="editApplyDialogVisible = false">取 消</el-button>
        <el-button size="small" type="primary" @click="confirmAdd">确 定</el-button>
      </span>
    </el-dialog>
    <Organization :organizationDialog="organizationDialog" :length="length" :type="type"
                  @close='closeModal' @selectMember="selectMember"></Organization>
  </div>
</template>

<script>
  import Organization from '../../../../common/organization.vue'
  import Upload from '../../../../common/UPLOAD.vue'
  export default {
    components:{Organization,Upload},
    props:['editApplyDialog'],
    data() {
      return {
        editApplyDialogVisible:false,
        params: {
          city_code:'',
//          category:'',
          report_time:'',
          contract_type:'',
          staff_id:'',
          department_id:'',
          collect_amount:'',
          collect_start:'',
          collect_end:'',
          rent_amount:'',
          rent_start:'',
          rent_end:'',
          rent_extra:[],
          collect_extra:[],
          remark:'',
          screenshot:[],

          //zuofei
          candidate:[],
          medi_contracts:[],//s上缴中介合同
          personal_contracts:[],//s上缴个人合同
        },
        taskType:'1',
        dictionary:[],
        contractDictionary:[],    //合同类型字典
        length:0,
        type:'',
        organizationDialog:false,
        staff_name : '',
        depart_name : '',
        collect : '',
        rent : '',
        upStatus:false,
        contractCollectNum:0,
        contractRentNum:0,

      };
    },
    mounted(){
        this.getDictionary();
    },
    watch:{
      editApplyDialog(val){
        this.editApplyDialogVisible = val
      },
      editApplyDialogVisible(val){
        if(!val){
          this.$emit('close')
        }
      }
    },
    methods:{
      getDictionary(){
        this.$http.get(globalConfig.server+'setting/dictionary/306').then((res) => {
          this.dictionary = res.data.data;
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
        this.params.staff_id = val[0].id;
        this.params.department_id = val[0].org[0].id;
        this.staff_name = val[0].name;
        this.depart_name =  val[0].org[0].name;
        this.getContractStatus(this.params.staff_id);
        this.getCancel(this.params.staff_id);

      },

      getContractStatus(id){
        this.$http.get(globalConfig.server+'contract/remain/'+id).then((res) => {
          this.collect = res.data.data.collect;
          this.rent = res.data.data.rent;
        })
      },

      closeModal(){
        this.organizationDialog = false
      },

      getImg(val){
        this.upStatus = val[2];
        this.params.screenshot = val[1];
      },
      addCollect(){
          this.contractCollectNum ++;
      },
      reduceCollect(){
          if(this.contractCollectNum>0){
            this.contractCollectNum --;
          }
      },
      addRent(){
          this.contractRentNum ++;
      },
      reduceRent(){
        if(this.contractRentNum>0){
          this.contractRentNum --;
        }
      },
      ////selectCity

      selectCity(){
        this.$http.get(globalConfig.server+'contract/max/'+this.params.city_code).then((res) => {
          this.params.collect_start = res.data.data.collect;
          this.params.rent_start = res.data.data.rent;
        })
      },


      computeContractEnd(val){
        if(val === 'collect'){
          this.$http.get(globalConfig.server+'contract/end?start='+this.params.collect_start+'&count='+this.params.collect_amount).then((res) => {
            this.params.collect_end = res.data.data;
          })
        }else {
          this.$http.get(globalConfig.server+'contract/end?start='+this.params.rent_start+'&count='+this.params.rent_amount).then((res) => {
            this.params.rent_end = res.data.data;
          })
        }

      },


      //确认提交
      confirmAdd(){
        if(this.upStatus === true){
          this.$notify.warning({
            title:'警告',
            message:'图片正在上传'
          })
        }else {
          if(this.taskType === '1'){
            this.$http.post(globalConfig.server+'contract/apply',this.params).then((res) => {
              if(res.data.code ==='20010'){
                this.$notify.success({
                  title:'成功',
                  message:res.data.msg
                });
                this.closeAddModal();
              }else {
                this.$notify.warning({
                  title:'警告',
                  message:res.data.msg
                })
              }
            })
          }
        }
      },
      closeAddModal(){
        this.editApplyDialogVisible = false;
        this.params = {
          city_code:'',
//          category:'',
            report_time:'',
            contract_type:'',
            staff_id:'',
            department_id:'',
            collect_amount:'',
            collect_start:'',
            collect_end:'',
            rent_amount:'',
            rent_start:'',
            rent_end:'',
            rent_extra:[],
            collect_extra:[],
            remark:'',
            screenshot:[],
            candidate:[],
            medi_contracts:[],//s上缴中介合同
            personal_contracts:[],//s上缴个人合同
        };
        this.taskType = '1';
        this.dictionary = [];
        this.length = '';
        this.type = '';
        this.organizationDialog = false;
        this.staff_name  =  '';
        this.depart_name  =  '';
        this.collect  =  '';
        this.rent  =  '';
        this.upStatus = false;
        this.contractCollectNum = 0;
        this.contractRentNum = 0;


      }
    }
  };
</script>
<style lang="scss" scoped="">
.addMore{
  text-align: right;
  i{
    font-size: 18px;
  }
}
  .deleteNumber{
    text-align: center;
    cursor: pointer;
    margin-top: 2px;
    color: #409EFF;
    &:hover{
      color: #6a8dfb;

    }
  }
</style>
