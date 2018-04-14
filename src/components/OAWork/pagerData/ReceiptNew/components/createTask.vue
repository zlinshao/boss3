<template>
  <div>
    <el-dialog :close-on-click-modal="false" title="创建任务" :visible.sync="createTaskDialogVisible">
      <div class="scroll_bar">
        <div class="title">基本信息</div>
        <div class="form_border">
          <el-form size="mini" :model="params" label-width="120px">
            <el-row>
              <el-col :span="8">
                <el-form-item label="任务类型">
                  <el-select clearable v-model="taskType" placeholder="请选择任务类型" value="">
                    <el-option label="领取" value="1"></el-option>
                    <el-option label="作废" value="2"></el-option>
                    <el-option label="上缴" value="3"></el-option>
                    <el-option label="丢失" value="4"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="城市">
                  <el-select clearable v-model="params.city_code" placeholder="请选择城市" @change="selectCity" value="">
                    <el-option v-for="item in dictionary" :label="item.dictionary_name" :value="item.variable.city_abbr"
                               :key="item.id"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>

            <el-row>
              <el-col :span="8"  v-if="taskType!=2 && taskType!=3">
                <el-form-item label="领用日期">
                  <el-date-picker
                    type="datetime"
                    placeholder="选择日期时间"
                    value-format="yyyy-MM-dd HH:mm:ss" v-model="params.report_time">
                  </el-date-picker>
                </el-form-item>
              </el-col>
              <el-col :span="8"  v-if="taskType==2">
                <el-form-item label="报备日期">
                  <el-date-picker
                    type="datetime"
                    placeholder="选择日期时间"
                    value-format="yyyy-MM-dd HH:mm:ss" v-model="params.report_time">
                  </el-date-picker>
                </el-form-item>
              </el-col>
              <el-col :span="8" v-if="taskType==3">
                <el-form-item label="上缴日期">
                  <el-date-picker
                    type="datetime"
                    placeholder="选择日期时间"
                    value-format="yyyy-MM-dd HH:mm:ss" v-model="params.report_time">
                  </el-date-picker>
                </el-form-item>
              </el-col>
              <el-col :span="8" v-if="taskType!=2 && taskType!=3 && taskType!=4 ">
                <el-form-item label="领用人">
                  <el-input readonly="" v-model="staff_name" @focus="openOrganizeModal"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8" v-if="taskType==2">
                <el-form-item label="报备人">
                  <el-input readonly="" v-model="staff_name" @focus="openOrganizeModal"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8" v-if="taskType==3">
                <el-form-item label="上缴人">
                  <el-input readonly="" v-model="staff_name" @focus="openOrganizeModal"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8" v-if="taskType==4">
                <el-form-item label="报备人">
                  <el-input readonly="" v-model="staff_name" @focus="openOrganizeModal"></el-input>
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
          <el-form v-if="taskType==1" size="mini" :model="params" label-width="120px">
            <el-row class="noMarginForm">
              <el-col :span="8">
                <el-form-item label="领取收据数">
                  <el-input v-model="params.amount" @blur="computeContractEnd('collect')"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="收据编号">
                  <el-input v-model="params.start" @blur="computeContractEnd('collect')"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="到">
                  <el-input disabled="" v-model="params.end"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <div class="addMore">
              <el-button type="text" @click="addCollect"><i class="el-icon-circle-plus"></i></el-button>
              <el-button type="text" @click="reduceCollect"><i class="el-icon-remove"></i></el-button>
            </div>

            <el-row>
              <el-col :span="8" v-for="item in contractCollectNum" :key="item">
                <el-form-item label="收据编号（自选）">
                  <el-input v-model="params.collect_extra[item-1]"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
          <el-form v-if="taskType!=1" size="mini" :model="params" label-width="120px">
            <div class="title" v-if="taskType==2">
              收房收据作废(请勾选)
            </div>
            <div class="title" v-if="taskType==3">
              收房收据上缴(请勾选)
            </div>
            <div class="title" v-if="taskType==4">
              收房收据丢失(请勾选)
            </div>
            <el-row>
              <el-checkbox-group v-model="params.candidate">
                <el-col :span="6" v-for="(val,key) in collectCancelCollect" :key="key">
                  <el-checkbox :label="val.id" name="type">{{val.full_text}}</el-checkbox>
                </el-col>
              </el-checkbox-group>
            </el-row>
          </el-form>
        </div>

        <div class="title">剩余收据</div>
        <div class="form_border">
          <el-form size="mini" :model="params" label-width="120px">
            <!--<el-row>-->
              <!--<el-col :span="8">-->
                <!--<el-form-item label="剩余收据数（收）">-->
                  <!--<el-input disabled="" v-model="collect"></el-input>-->
                <!--</el-form-item>-->
              <!--</el-col>-->
              <!--<el-col :span="8">-->
                <!--<el-form-item label="剩余收据数（租）">-->
                  <!--<el-input disabled="" v-model="rent"></el-input>-->
                <!--</el-form-item>-->
              <!--</el-col>-->
            <!--</el-row>-->

            <el-row>
              <el-col>
                <el-form-item label="截图">
                  <Upload :ID="'create_Jietu'" @getImg="getImg"></Upload>
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
        <el-button size="small" @click="createTaskDialogVisible = false">取 消</el-button>
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
    props:['createTaskDialog','selectFlag'],
    data() {
      return {
        createTaskDialogVisible:false,
        RefreshTask:0,
        params: {
          city_code:'',
//          category:'',
          report_time:'',
          contract_type:'',
          staff_id:'',
          department_id:'',
          amount:'',
          start:'',
          end:'',
          remark:'',
          screenshot:[],

          //zuofei
          candidate:[],
          medi_contracts:[],//s上缴中介收据
          personal_contracts:[],//s上缴个人收据
        },
        taskType:'1',
        dictionary:[],
        contractDictionary:[],    //收据类型字典
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

        //作废
        collectCancelCollect:[],

      };
    },
    mounted(){

    },
    watch:{
      createTaskDialog(val){
        this.getDictionary();
        this.createTaskDialogVisible = val
      },
      createTaskDialogVisible(val){
        if(!val){
          this.$emit('close')
        }
      },
      selectFlag(val){
        if(val ===2){
          this.taskType = '1';
        }else if(val === 3){
          this.taskType = '2';
        }else if(val === 4){
          this.taskType = '3';
        }else if(val === 5){
          this.taskType = '4';
        }
      }
    },
    methods:{
      getDictionary(){
        this.$http.get(globalConfig.server+'setting/dictionary/306').then((res) => {
          this.dictionary = res.data.data;
        });
        this.$http.get(globalConfig.server+'setting/dictionary/107').then((res) => {
          this.contractDictionary = res.data.data;
        })
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
      closeModal(){
        this.organizationDialog = false
      },
      //获取作废收据信息
      getCancel(id){
        this.$http.get(globalConfig.server+'receipt/available/'+id).then((res) => {
          console.log(res)
          if(res.data.code === '21000'){

            this.collectCancelCollect = res.data.data
          }else {
            this.collectCancelCollect = [];
          }
        })
      },

      getContractStatus(id){
//        this.$http.get(globalConfig.server+'contract/remain/'+id).then((res) => {
//          this.collect = res.data.data.collect;
//          this.rent = res.data.data.rent;
//        })
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
      //      //selectCity

      selectCity(){
        this.$http.get(globalConfig.server+'receipt/max/'+this.params.city_code).then((res) => {
          console.log(res)
          this.params.start = res.data.data;
        })
      },

      //选择收据类型
      selectContractType(val){
        console.log(val)
      },

      computeContractEnd(val){
          this.$http.post(globalConfig.server+'receipt/calculate',{
            start:this.params.start,
            amount:this.params.amount
          }).then((res) => {
            console.log(res)
            this.params.end = res.data.data;
          })

      },

      //确认提交
      confirmAdd(){
        if(this.upStatus === true){
          this.$notify.warning({
            title:'警告',
            message:'图片正在上传'
          })
        }else {
          //新增领取
          if(this.taskType === '1'){
            this.$http.post(globalConfig.server+'receipt/apply',this.params).then((res) => {
              if(res.data.code ==='21010'){
                this.$notify.success({
                  title:'成功',
                  message:res.data.msg
                });
                this.closeAddModal();
                this.RefreshTask=1;
                this.$emit('RefreshTask',this.RefreshTask)
                this.$emit('close');
              }else {
                this.$notify.warning({
                  title:'警告',
                  message:res.data.msg
                })
              }
            })
          }else if(this.taskType === '2') {
            //新增作废
            this.$http.post(globalConfig.server+'receipt/invalidate',this.params).then((res) => {
              if(res.data.code ==='21010'){
                this.$notify.success({
                  title:'成功',
                  message:res.data.msg
                });
                this.closeAddModal();
                this.RefreshTask=2;
                this.$emit('RefreshTask',this.RefreshTask)
                this.$emit('close');
              }else {
                this.$notify.warning({
                  title:'警告',
                  message:res.data.msg
                })
              }
            })
          }else if(this.taskType === '3'){

            this.$http.post(globalConfig.server+'receipt/handin',this.params).then((res) => {
              if(res.data.code ==='21010'){
                this.$notify.success({
                  title:'成功',
                  message:res.data.msg
                });
                this.$emit('close');
                this.RefreshTask=3;
                this.$emit('RefreshTask',this.RefreshTask)
                this.closeAddModal();
              }else {
                this.$notify.warning({
                  title:'警告',
                  message:res.data.msg
                })
              }
            })
          }else if(this.taskType === '4'){

            this.$http.post(globalConfig.server+'receipt/loss',this.params).then((res) => {
              if(res.data.code ==='21010'){
                this.$notify.success({
                  title:'成功',
                  message:res.data.msg
                });
                this.$emit('close');
                this.RefreshTask=4;
                this.$emit('RefreshTask',this.RefreshTask)
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
        this.createTaskDialogVisible = false;
        $('.imgItem').remove();
        this.params = {
          city_code:'',
//          category:'',
            report_time:'',
            contract_type:'',
            staff_id:'',
            department_id:'',
            amount:'',
            start:'',
            end:'',
            remark:'',
            screenshot:[],
            candidate:[],
            medi_contracts:[],//s上缴中介收据
            personal_contracts:[],//s上缴个人收据
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

        //作废
        this.collectCancelCollect = [];

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
