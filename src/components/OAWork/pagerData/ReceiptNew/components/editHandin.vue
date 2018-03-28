<template>
  <div>
    <el-dialog title="上缴收据修改" :visible.sync="editHandInDialogVisible">
      <div class="scroll_bar">
        <div class="title">基本信息</div>
        <div class="form_border">
          <el-form size="mini" :model="params" label-width="120px">
            <el-row>
              <el-col :span="8">
                <el-form-item label="任务类型">
                  <el-select disabled="" v-model="taskType" placeholder="请选择任务类型">
                    <el-option label="领取" value="1"></el-option>
                    <el-option label="作废" value="2"></el-option>
                    <el-option label="上缴" value="3"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>

              <el-col :span="8">
                <el-form-item label="作废日期">
                  <el-date-picker
                    type="datetime"
                    placeholder="选择日期时间"
                    value-format="yyyy-MM-dd HH:mm:ss" v-model="params.report_time">
                  </el-date-picker>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="作废人">
                  <el-input disabled="" v-model="staff_name"  @focus="openOrganizeModal"></el-input>
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
            <!--公司收据类型-->
            <div>
              <div class="title">
                收房收据上缴(请勾选)
              </div>
            <el-row>
              <el-checkbox-group v-model="params.candidate">
                <el-col :span="6" v-for="(val,key) in isSelectCollect" :key="key">
                  <el-checkbox :label="key" name="type">{{val}}</el-checkbox>
                </el-col>
              </el-checkbox-group>
            </el-row>
            </div>


          </el-form>
        </div>

        <div class="title">剩余收据</div>
        <div class="form_border">
          <el-form size="mini" :model="params" label-width="120px">

            <el-row>
              <el-col>
                <el-form-item label="截图">
                  <Upload :ID="'jieTu'" :editImage="editImage" @getImg="getImg"></Upload>
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
        <el-button size="small" @click="editHandInDialogVisible = false">取 消</el-button>
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
    props:['editHandInDialog','handInEditId','startOperate'],
    data() {
      return {
        editHandInDialogVisible:false,
        params: {
          city_code:'',
          report_time:'',
          contract_type:'',
          staff_id:'',
          department_id:'',
          remark:'',
          screenshot:[],

          //zuofei
          candidate:[],
          medi_contracts:[],//s上缴中介收据
          personal_contracts:[],//s上缴个人收据
        },
        taskType:'3',
        refresh:0,
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
        editImage:{},
        isSelectCollect: [],
        isSelectRent: [],       
        //作废
        contractCancelCollect:[],
        contractCancelRent:[],

      };
    },
    mounted(){

    },
    watch:{
      editHandInDialog(val){
        this.editHandInDialogVisible = val
      },
      editHandInDialogVisible(val){
        if(!val){
          this.$emit('close');
          this.init()
        }
      },
      startOperate(val){
        if(val){
          this.getDictionary();
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
        }).then((data) =>{
          this.getApplyDetail();
        })
      },


      //获取详情
      getApplyDetail(){
        this.$http.get(globalConfig.server+'receipt/handin/'+this.handInEditId).then((res) => {
          if(res.data.code === '21000'){
            let arr = res.data.data;
            this.init();
            this.params.staff_id = arr.staff_id;
            this.params.report_time = arr.report_time;
            // this.params.city_code = arr.city_code;
            this.params.screenshot = arr.screenshot;
             let picObject = {};
                arr.screenshot.forEach((item) =>{
                  picObject[item.id] = item.uri;
                  this.params.screenshot.push(item.id)
                });
                this.editImage = picObject;
                this.isSelectCollect = arr.receipt_numbers;
                this.params.candidate = [];

                for(let key in this.isSelectCollect){
                  this.params.candidate.push(key)
                }               
            // this.params.contract_type = arr.contract_type;

              this.params.department_id = arr.department_id;
              this.depart_name = arr.department.name;
            if(arr.simple_staff){
              this.staff_name = arr.simple_staff.real_name;
            }

 
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
        this.params.staff_id = val[0].id;
        this.params.department_id = val[0].org[0].id;
        this.staff_name = val[0].name;
        this.depart_name =  val[0].org[0].name;

      },
      closeModal(){
        this.organizationDialog = false
      },
      getImg(val){
        this.upStatus = val[2];
        this.params.screenshot = val[1];
      },

      //确认提交
      confirmAdd(){
        debugger;

          this.$http.put(globalConfig.server+'receipt/handin/'+this.handInEditId,this.params).then((res) => {
            debugger;
            if(res.data.code ==='21010'){
              this.$notify.success({
                title:'成功',
                message:res.data.msg
              });
              
              this.$emit('close');
              this.refresh=3;
              this.$emit('Refreshxx', this.refresh);
              this.editHandInDialogVisible = false;
              this.init();
            }else {
              this.$notify.warning({
                title:'警告',
                message:res.data.msg
              })
            }
          })
       
      },
      init(){
        $('.imgItem').remove();

        this.params = {
          city_code:'',
          report_time:'',
          contract_type:'',
          staff_id:'',
          department_id:'',
          remark:'',
          screenshot:[],
          candidate:[],
          medi_contracts:[],//s上缴中介收据
          personal_contracts:[],//s上缴个人收据         
        };
        this.editImage={},
        this.isSelectCollec=[],
        this.isSelectRent= [],   
        this.taskType = '3';
        this.dictionary = [];
        this.length = '';
        this.type = '';
        this.organizationDialog = false;
        this.staff_name  =  '';
        this.depart_name  =  '';
        this.collect  =  '';
        this.rent  =  '';
        this.upStatus = false;
        this.contractCancelCollect = [];
        this.contractCancelRent = [];

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
