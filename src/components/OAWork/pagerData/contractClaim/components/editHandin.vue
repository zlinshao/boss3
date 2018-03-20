<template>
  <div>
    <el-dialog title="上缴合同修改" :visible.sync="editHandInDialogVisible">
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
                <el-form-item label="城市">
                  <el-select clearable v-model="params.city_code" placeholder="请选择城市">
                    <el-option v-for="item in dictionary" :label="item.dictionary_name" :value="item.id" :key="item.id"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="合同类型">
                  <el-select v-model="params.contract_type" disabled="" placeholder="请选择合同类型">
                    <el-option v-for="item in contractDictionary" :label="item.dictionary_name" :value="item.id" :key="item.id"></el-option>
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
                  <el-input disabled="" v-model="staff_name" @focus="openOrganizeModal"></el-input>
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
            <!--公司合同类型-->
            <div v-if="params.contract_type == '108'">
              <div class="title">
                收房合同上缴(请勾选)
              </div>

              <div v-for="(item,index) in Object.keys(contractCancelCollect)" >
                <el-row >
                  <el-col :span="6">
                    <el-checkbox-group v-model="checkBoxHandin">
                      <el-checkbox :label="item" name="type">{{contractCancelCollect[item]}}</el-checkbox>
                    </el-checkbox-group>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item label="房屋地址">
                      <el-input v-model="rentHandinAddress[item]"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8" :offset="2">
                    <el-checkbox v-model="handover[item]" label="1" value="1" name="type">交接单</el-checkbox>
                    <el-checkbox v-model="receipt[item]" label="2" value="2" name="type">收据</el-checkbox>
                    <el-checkbox v-model="keyCode[item]" label="4" value="4" name="type">钥匙</el-checkbox>
                  </el-col>
                </el-row>

              </div>

              <div class="title">
                租房合同上缴(请勾选)
              </div>
              <div v-for="(item,index) in Object.keys(contractCancelRent)" >
                <el-row >
                  <el-col :span="6">
                    <el-checkbox-group v-model="checkBoxHandin">
                      <el-checkbox :label="item" name="type">{{contractCancelRent[item]}}</el-checkbox>
                    </el-checkbox-group>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item label="房屋地址">
                      <el-input v-model="rentHandinAddress[item]"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8" :offset="2">
                    <el-checkbox v-model="handover[item]" label="1" value="1" name="type">交接单</el-checkbox>
                    <el-checkbox v-model="receipt[item]" label="2" value="2" name="type">收据</el-checkbox>
                    <el-checkbox v-model="keyCode[item]" label="4" value="4" name="type">钥匙</el-checkbox>
                  </el-col>
                </el-row>

              </div>
            </div>

            <!--公司合同类型-->
            <div v-if="params.contract_type == '109'">

              <div class="title">
                收房合同上缴(中介)
              </div>

              <el-row v-for="item in mediumNumberCollect" :key="item">
                <el-col :span="7">
                  <el-form-item label="合同编号（收）">
                    <el-input v-model="medi_contracts_number[item-1]"></el-input>
                  </el-form-item>
                </el-col>
                <el-col  :span="7">
                  <el-form-item label="房屋地址">
                    <el-input v-model="medi_contracts_address[item-1]"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="7" :offset="1">
                  <el-checkbox v-model="medi_contracts_proof_1[item-1]" label="1" value="1" name="type">交接单</el-checkbox>
                  <el-checkbox v-model="medi_contracts_proof_2[item-1]" label="2" value="2" name="type">收据</el-checkbox>
                  <el-checkbox v-model="medi_contracts_proof_3[item-1]" label="4" value="4" name="type">钥匙</el-checkbox>
                </el-col>
                <el-col  :span="2">
                  <div v-if="mediumNumberCollect>1" class="deleteNumber" @click="deleteMediumNumberCollect(item-1)">删除</div>
                </el-col>
              </el-row>
              <div style="text-align: center">
                <el-button type="text" @click="addMediumNumberCollect">
                  <i class="el-icon-circle-plus"></i>增加中介合同编号(收)
                </el-button>
              </div>
              <div class="title">
                租房合同上缴(中介)
              </div>

              <el-row v-for="item in mediumNumberRent" :key="item*10">
                <el-col :span="7">
                  <el-form-item label="合同编号（租）">
                    <el-input v-model="medi_contracts_number_rent[item-1]"></el-input>
                  </el-form-item>
                </el-col>
                <el-col  :span="7">
                  <el-form-item label="房屋地址">
                    <el-input v-model="medi_contracts_address_rent[item-1]"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="7" :offset="1">
                  <el-checkbox v-model="medi_contracts_proof_1_rent[item-1]" label="1" value="1" name="type">交接单</el-checkbox>
                  <el-checkbox v-model="medi_contracts_proof_2_rent[item-1]" label="2" value="2" name="type">收据</el-checkbox>
                  <el-checkbox v-model="medi_contracts_proof_3_rent[item-1]" label="4" value="4" name="type">钥匙</el-checkbox>
                </el-col>
                <el-col  :span="2">
                  <div v-if="mediumNumberRent>1" class="deleteNumber" @click="deleteMediumNumberRent(item-1)">删除</div>
                </el-col>
              </el-row>
              <div style="text-align: center">
                <el-button type="text" @click="addMediumNumberRent">
                  <i class="el-icon-circle-plus"></i>增加中介合同编号(租)
                </el-button>
              </div>

            </div>

            <!--公司合同类型-->
            <div v-if="params.contract_type == '110'">

              <div class="title">
                收房合同上缴(个人)
              </div>

              <el-row v-for="item in personal_mediumNumberCollect" :key="item">
                <el-col :span="7">
                  <el-form-item label="合同编号（收）">
                    <el-input v-model="personal_contracts_number[item-1]"></el-input>
                  </el-form-item>
                </el-col>
                <el-col  :span="7">
                  <el-form-item label="房屋地址">
                    <el-input v-model="personal_contracts_address[item-1]"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="7" :offset="1">
                  <el-checkbox v-model="personal_contracts_proof_1[item-1]" label="1" value="1" name="type">交接单</el-checkbox>
                  <el-checkbox v-model="personal_contracts_proof_2[item-1]" label="2" value="2" name="type">收据</el-checkbox>
                  <el-checkbox v-model="personal_contracts_proof_3[item-1]" label="4" value="4" name="type">钥匙</el-checkbox>
                </el-col>
                <el-col  :span="2">
                  <div v-if="personal_mediumNumberCollect>1" class="deleteNumber" @click="personal_deleteMediumNumberCollect(item-1)">删除</div>
                </el-col>
              </el-row>
              <div style="text-align: center">
                <el-button type="text" @click="personal_addMediumNumberCollect">
                  <i class="el-icon-circle-plus"></i>增加个人合同编号(收)
                </el-button>
              </div>
              <div class="title">
                租房合同上缴(个人)
              </div>

              <el-row v-for="item in personal_mediumNumberRent" :key="item*10">
                <el-col :span="7">
                  <el-form-item label="合同编号（租）">
                    <el-input v-model="personal_contracts_number_rent[item-1]"></el-input>
                  </el-form-item>
                </el-col>
                <el-col  :span="7">
                  <el-form-item label="房屋地址">
                    <el-input v-model="personal_contracts_address_rent[item-1]"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="7" :offset="1">
                  <el-checkbox v-model="personal_contracts_proof_1_rent[item-1]" label="1" value="1" name="type">交接单</el-checkbox>
                  <el-checkbox v-model="personal_contracts_proof_2_rent[item-1]" label="2" value="2" name="type">收据</el-checkbox>
                  <el-checkbox v-model="personal_contracts_proof_3_rent[item-1]" label="4" value="4" name="type">钥匙</el-checkbox>
                </el-col>
                <el-col  :span="2">
                  <div v-if="personal_mediumNumberRent>1" class="deleteNumber" @click="personal_deleteMediumNumberRent(item-1)">删除</div>
                </el-col>
              </el-row>
              <div style="text-align: center">
                <el-button type="text" @click="personal_addMediumNumberRent">
                  <i class="el-icon-circle-plus"></i>增加个人合同编号(租)
                </el-button>
              </div>

            </div>
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
        <el-button size="small" @click="init">取 消</el-button>
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
          medi_contracts:[],//s上缴中介合同
          personal_contracts:[],//s上缴个人合同
        },
        taskType:'3',
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

        //作废
        contractCancelCollect:[],
        contractCancelRent:[],

        //公司合同备用字段
        rentHandinAddress:{},
        handover:{},
        receipt:{},
        keyCode:{},
        checkBoxHandin:[],

        //中介合同备用字段（shou）
        medi_contracts_number:[],
        medi_contracts_address:[],
        medi_contracts_proof_1:[false],
        medi_contracts_proof_2:[false],
        medi_contracts_proof_3:[false],
        mediumNumberCollect:1,

        //中介合同备用字段（zu）
        mediumNumberRent:1,
        medi_contracts_number_rent:[],
        medi_contracts_address_rent:[],
        medi_contracts_proof_1_rent:[false],
        medi_contracts_proof_2_rent:[false],
        medi_contracts_proof_3_rent:[false],


        //个人合同备用字段（shou）
        personal_contracts_number:[],
        personal_contracts_address:[],
        personal_contracts_proof_1:[false],
        personal_contracts_proof_2:[false],
        personal_contracts_proof_3:[false],
        personal_mediumNumberCollect:1,

        //个人合同备用字段（zu）
        personal_mediumNumberRent:1,
        personal_contracts_number_rent:[],
        personal_contracts_address_rent:[],
        personal_contracts_proof_1_rent:[false],
        personal_contracts_proof_2_rent:[false],
        personal_contracts_proof_3_rent:[false],
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
        this.$http.get(globalConfig.server+'contract/handin/'+this.handInEditId).then((res) => {
          if(res.data.code === '20010'){
            let arr = res.data.data;
            this.init();
            this.params.staff_id = arr.full.staff_id;
            this.params.report_time = arr.full.report_time;
            this.params.city_code = arr.full.city_code;
            this.params.screenshot = arr.full.screenshot;
            this.checkBoxHandin = [];
            this.params.contract_type = arr.contract_type;

            this.params.department_id = arr.department.id;
            this.depart_name = arr.department.name;
            if(arr.full.simple_staff){
              this.staff_name = arr.full.simple_staff.real_name;
            }

            if(Number(this.params.contract_type) === 108){    //如果是公司合同
              for(let key in arr.category){
                if(arr.category[key] === 1){
                  this.contractCancelCollect[key] = arr.contractNumber[key];
                }else {
                  this.contractCancelRent[key] = arr.contractNumber[key];
                }

              }
              this.$http.get(globalConfig.server+'contract/staff/'+this.params.staff_id).then((res) => {
                if(res.data.code === '20000'){
                  this.contractCancelCollect = Object.assign({},this.contractCancelCollect,res.data.data.collect);
                  this.contractCancelRent = Object.assign({},this.contractCancelRent,res.data.data.rent);
                }
              });

              this.rentHandinAddress = arr.address;
              this.handover = arr.handover;
              this.receipt = arr.receipt;
              this.keyCode = arr.key;
              for(let key in this.keyCode){
                this.checkBoxHandin.push(key)
              }
            }else if(Number(this.params.contract_type) === 109){

              if(arr.medi_contracts.length>0){
                //初始化字段
                arr.medi_contracts.forEach((item) => {
                  if(Number(item.category) === 1){
                    this.medi_contracts_proof_1 = [];
                    this.medi_contracts_proof_2 = [];
                    this.medi_contracts_proof_3 = [];
                  }else {
                    this.medi_contracts_proof_1_rent = [];
                    this.medi_contracts_proof_2_rent = [];
                    this.medi_contracts_proof_3_rent = [];
                  }
                });


                arr.medi_contracts.forEach((item) => {
                  if(Number(item.category) === 1){
                    this.medi_contracts_number.push(item.number);
                    this.medi_contracts_address.push(item.address);
                    this.medi_contracts_proof_1.push(item.handover);
                    this.medi_contracts_proof_2.push(item.receipt);
                    this.medi_contracts_proof_3.push(item.key);
                  }else {
                    this.medi_contracts_number_rent.push(item.number);
                    this.medi_contracts_address_rent.push(item.address);
                    this.medi_contracts_proof_1_rent.push(item.handover);
                    this.medi_contracts_proof_2_rent.push(item.receipt);
                    this.medi_contracts_proof_3_rent.push(item.key);
                  }
                });
                this.mediumNumberCollect = this.medi_contracts_number.length>0?this.medi_contracts_number.length:1;
                this.mediumNumberRent = this.medi_contracts_number_rent.length>0?this.medi_contracts_number_rent.length:1;
              }
            }else if(Number(this.params.contract_type) === 110){

              if(arr.personal_contracts.length>0){
                //初始化字段
                arr.personal_contracts.forEach((item) => {
                  if(Number(item.category) === 1){
                    this.personal_contracts_proof_1 = [];
                    this.personal_contracts_proof_2 = [];
                    this.personal_contracts_proof_3 = [];
                  }else {
                    this.personal_contracts_proof_1_rent = [];
                    this.personal_contracts_proof_2_rent = [];
                    this.personal_contracts_proof_3_rent = [];
                  }
                });


                arr.personal_contracts.forEach((item) => {
                  if(Number(item.category) === 1){
                    this.personal_contracts_number.push(item.number);
                    this.personal_contracts_address.push(item.address);
                    this.personal_contracts_proof_1.push(item.handover);
                    this.personal_contracts_proof_2.push(item.receipt);
                    this.personal_contracts_proof_3.push(item.key);
                  }else {
                    this.personal_contracts_number_rent.push(item.number);
                    this.personal_contracts_address_rent.push(item.address);
                    this.personal_contracts_proof_1_rent.push(item.handover);
                    this.personal_contracts_proof_2_rent.push(item.receipt);
                    this.personal_contracts_proof_3_rent.push(item.key);
                  }
                });
                this.personal_mediumNumberCollect = this.personal_contracts_number.length>0?this.personal_contracts_number.length:1;
                this.personal_mediumNumberRent = this.personal_contracts_number_rent.length>0?this.personal_contracts_number_rent.length:1;
              }
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

      //新增更多中介合同作废编号
      addMediumNumberCollect(){
        this.mediumNumberCollect ++;
        this.medi_contracts_proof_1.push(false);
        this.medi_contracts_proof_2.push(false);
        this.medi_contracts_proof_3.push(false);
      },
      //删除中介合同编号
      deleteMediumNumberCollect(item){
        this.medi_contracts_number.splice(item,1);
        this.medi_contracts_address.splice(item,1);
        this.medi_contracts_proof_1.splice(item,1);
        this.medi_contracts_proof_2.splice(item,1);
        this.medi_contracts_proof_3.splice(item,1);
        this.mediumNumberCollect --;
      },
      //新增更多中介合同作废编号（zu）
      addMediumNumberRent(){
        this.mediumNumberRent ++;
        this.medi_contracts_proof_1_rent.push(false);
        this.medi_contracts_proof_2_rent.push(false);
        this.medi_contracts_proof_3_rent.push(false);
      },
      //删除中介合同编号(zu)
      deleteMediumNumberRent(item){
        this.medi_contracts_number_rent.splice(item,1);
        this.medi_contracts_address_rent.splice(item,1);
        this.medi_contracts_proof_1_rent.splice(item,1);
        this.medi_contracts_proof_2_rent.splice(item,1);
        this.medi_contracts_proof_3_rent.splice(item,1);
        this.mediumNumberRent --;
      },


      //新增更多个人合同作废编号
      personal_addMediumNumberCollect(){
        this.personal_mediumNumberCollect ++;
        this.personal_contracts_proof_1.push(false);
        this.personal_contracts_proof_2.push(false);
        this.personal_contracts_proof_3.push(false);
      },
      //删除中个人号
      personal_deleteMediumNumberCollect(item){
        this.personal_contracts_number.splice(item,1);
        this.personal_contracts_address.splice(item,1);
        this.personal_contracts_proof_1.splice(item,1);
        this.personal_contracts_proof_2.splice(item,1);
        this.personal_contracts_proof_3.splice(item,1);
        this.personal_mediumNumberCollect --;
      },
      //新增更多个人合同作废编号（zu）
      personal_addMediumNumberRent(){
        this.personal_mediumNumberRent ++;
        this.personal_contracts_proof_1_rent.push(false);
        this.personal_contracts_proof_2_rent.push(false);
        this.personal_contracts_proof_3_rent.push(false);
      },
      //删除个人合同编号(zu)
      personal_deleteMediumNumberRent(item){
        this.personal_contracts_number_rent.splice(item,1);
        this.personal_contracts_address_rent.splice(item,1);
        this.personal_contracts_proof_1_rent.splice(item,1);
        this.personal_contracts_proof_2_rent.splice(item,1);
        this.personal_contracts_proof_3_rent.splice(item,1);
        this.personal_mediumNumberRent --;
      },


      //确认提交
      confirmAdd(){
        if(this.upStatus === true){
          this.$notify.warning({
            title:'警告',
            message:'图片正在上传'
          })
        }else {
          if(Number(this.params.contract_type) === 108){
            this.params.candidate = {};
            let candidateArray = {};
            let candidateItem = {
              address:'',
              proof:0,
            };
            this.checkBox.forEach((item) => {
              candidateItem.address = this.rentHandinAddress[item];
              candidateItem.proof = 0;
              if(this.handover[item]){
                candidateItem.proof+=1;
              }
              if(this.receipt[item]){
                candidateItem.proof+=2;
              }
              if(this.keyCode[item]){
                candidateItem.proof+=4;
              }
              candidateArray[item] = candidateItem;
            });
            //计算出最终结果
            this.params.candidate = Object.assign({},this.params.candidate,candidateArray);
          }else if(Number(this.params.contract_type) === 109){
            this.params.candidate = {};
            let contentItem = {};
            this.params.medi_contracts = [];
            for(let i=0;i<this.mediumNumberCollect;i++){
              contentItem = {};
              contentItem.category = 1;
              contentItem.address = this.medi_contracts_address[i]?this.medi_contracts_address[i]:'';
              contentItem.number = this.medi_contracts_number[i]?this.medi_contracts_number[i]:'';
              contentItem.proof = 0;
              if(this.medi_contracts_proof_1[i]){
                contentItem.proof+=1;
              }
              if(this.medi_contracts_proof_2[i]){
                contentItem.proof+=2;
              }
              if(this.medi_contracts_proof_3[i]){
                contentItem.proof+=4;
              }
              this.params.medi_contracts.push(contentItem);
            }
            for(let i=0;i<this.mediumNumberRent;i++){
              contentItem = {};
              contentItem.category = 2;
              contentItem.address = this.medi_contracts_address_rent[i]?this.medi_contracts_address_rent[i]:'';
              contentItem.number = this.medi_contracts_number_rent[i]?this.medi_contracts_number_rent[i]:'';
              contentItem.proof = 0;
              if(this.medi_contracts_proof_1_rent[i]){
                contentItem.proof+=1;
              }
              if(this.medi_contracts_proof_2_rent[i]){
                contentItem.proof+=2;
              }
              if(this.medi_contracts_proof_3_rent[i]){
                contentItem.proof+=4;
              }
              this.params.medi_contracts.push(contentItem);
            }
          }else if(Number(this.params.contract_type) === 110){
            this.params.candidate = {};
            //个人
            let contentItem = {};
            this.params.personal_contracts = [];
            for(let i=0;i<this.personal_mediumNumberCollect;i++){
              contentItem = {};
              contentItem.category = 1;
              contentItem.address = this.personal_contracts_address[i]?this.personal_contracts_address[i]:'';
              contentItem.number = this.personal_contracts_number[i]?this.personal_contracts_number[i]:'';
              contentItem.proof = 0;
              if(this.personal_contracts_proof_1[i]){
                contentItem.proof+=1;
              }
              if(this.personal_contracts_proof_2[i]){
                contentItem.proof+=2;
              }
              if(this.personal_contracts_proof_3[i]){
                contentItem.proof+=4;
              }
              this.params.personal_contracts.push(contentItem);
            }
            for(let i=0;i<this.personal_mediumNumberRent;i++){
              contentItem = {};
              contentItem.category = 2;
              contentItem.address = this.personal_contracts_address_rent[i]?this.personal_contracts_address_rent[i]:'';
              contentItem.number = this.personal_contracts_number_rent[i]?this.personal_contracts_number_rent[i]:'';
              contentItem.proof = 0;
              if(this.personal_contracts_proof_1_rent[i]){
                contentItem.proof+=1;
              }
              if(this.personal_contracts_proof_2_rent[i]){
                contentItem.proof+=2;
              }
              if(this.personal_contracts_proof_3_rent[i]){
                contentItem.proof+=4;
              }
              this.params.personal_contracts.push(contentItem);
            }
          }

          this.$http.put(globalConfig.server+'contract/handin/'+this.handInEditId,this.params).then((res) => {
            if(res.data.code ==='20010'){
              this.$notify.success({
                title:'成功',
                message:res.data.msg
              });
              this.$emit('close');
              this.editHandInDialogVisible = false;
              this.init();
            }else {
              this.$notify.warning({
                title:'警告',
                message:res.data.msg
              })
            }
          })
        }
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
          medi_contracts:[],//s上缴中介合同
          personal_contracts:[],//s上缴个人合同
        };
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


          //公司合同备用字段
        this.rentHandinAddress = {};
        this.handover = {};
        this.receipt = {};
        this.keyCode = {};
        this.checkBox = [];

        //中介合同备用字段（shou）
        this.medi_contracts_number = [];
        this.medi_contracts_address = [];
        this.medi_contracts_proof_1 = [false];
        this.medi_contracts_proof_2 = [false];
        this.medi_contracts_proof_3 = [false];
        this.mediumNumberCollect = 1;

        //中介合同备用字段（zu）
        this.mediumNumberRent = 1;
        this.medi_contracts_proof_1_rent = [false];
        this.medi_contracts_proof_2_rent = [false];
        this.medi_contracts_proof_3_rent = [false];
        this.medi_contracts_number_rent = [];
        this.medi_contracts_address_rent = [];


        //个人合同备用字段（shou）
        this.personal_contracts_number = [];
        this.personal_contracts_address = [];
        this.personal_contracts_proof_1 = [false];
        this.personal_contracts_proof_2 = [false];
        this.personal_contracts_proof_3 = [false];
        this.personal_mediumNumberCollect = 1;

        //个人合同备用字段（zu）
        this.personal_mediumNumberRent = 1;
        this.personal_contracts_proof_1_rent = [false];
        this.personal_contracts_proof_2_rent = [false];
        this.personal_contracts_proof_3_rent = [false];
        this.personal_contracts_number_rent = [];
        this.personal_contracts_address_rent = [];
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
