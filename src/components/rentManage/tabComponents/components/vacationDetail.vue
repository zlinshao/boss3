<template>
  <div id="rentVacation">
    <el-dialog :close-on-click-modal="false" title="退房详情" :visible.sync="vacationDetailVisible" width="65%">
      <div class="scroll_bar">
        <div class="title">客户-信息</div>
        <div class="table_border" >
          <table class="tableDetail">
            <tr>
              <td>合同编号</td>
              <td>{{contractInfo.contract_number}}</td>
              <td>地址</td>
              <td>{{contractInfo.community_address}}</td>
              <td>电话</td>
              <td>
                <span v-if="contractInfo.customers&&contractInfo.customers.length>0">
                  {{contractInfo.customers[0].phone}}
                </span>
              </td>
            </tr>
            <tr>
              <td>中介费</td>
              <td>{{contractInfo.agency}}</td>
              <td>押金</td>
              <td>{{contractInfo.deposit}}</td>
              <td>签约人</td>
              <td>{{contractInfo.staff_name}}</td>
            </tr>
            <tr>
              <td>合同开始时间</td>
              <td>{{contractInfo.begin_date}}</td>
              <td>合同结束时间</td>
              <td>{{contractInfo.end_date}}</td>
              <td></td>
              <td></td>
            </tr>
          </table>
        </div>
        <div class="title">退房信息</div>
        <div class="form_border">
          <el-form size="mini" :model="params" label-width="100px">
            <el-row >
              <el-col :span="8">
                <el-form-item label="退房时间" required>
                  <el-date-picker disabled type="date" value-format="yyyy-MM-dd" v-model="params.check_time"
                                  placeholder="选择日期" style="width: 100%;"></el-date-picker>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="退房性质" required>
                  <el-select disabled v-model="params.check_type" clearable="" placeholder="请选择退房性质" value="">
                    <el-option v-for="item in dictionary" :label="item.dictionary_name" :key="item.id" :value="item.id"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="8" v-if="params.check_type == 331">
                <el-form-item label="违约盈利" required>
                  <el-input disabled placeholder="请输入内容" v-model="params.profit"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="姓名" required>
                  <el-input disabled placeholder="请输入内容" v-model="params.account_name"></el-input>
                </el-form-item>
              </el-col>
            </el-row>

            <el-row>
              <el-col :span="8">
                <el-form-item label="退款账号" required>
                  <el-input disabled placeholder="请输入内容" v-model="params.bank_num"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="开户行" required>
                  <el-input disabled placeholder="请输入内容" v-model="params.account_bank"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="支行" required>
                  <el-input disabled placeholder="请输入内容" v-model="params.branch_bank"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </div>
        <el-row :gutter="20">
          <el-col :span="12">
            <div class="title">退房原因</div>
            <el-input disabled type="textarea" resize="none" v-model="params.reason" placeholder="请输入内容"></el-input>
          </el-col>
          <el-col :span="12">
            <div class="title">维修赔偿详情</div>
            <el-input disabled type="textarea" resize="none" v-model="params.compensation" placeholder="请输入内容"></el-input>
          </el-col>
        </el-row>

        <div class="title">上传照片</div>
        <div class="describe_border">
          <div class="editImg" v-if="Object.keys(editImage).length>0">
            <img v-for="(val,key) in editImage" :src="val" alt="" data-magnify="" :data-src="val"
                  style="width: 120px;  height: 120px; border-radius:6px;margin: 0 15px 15px 0">
          </div>
        </div>

        <div class="title">应退还</div>
        <div class="form_border">
          <el-form size="mini" label-width="100px">
            <el-row >
              <el-col :span="6">
                <el-form-item label="退还押金">
                  <el-input disabled v-model="params.refund_deposit" type="number" placeholder="请输入内容"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="剩余房租">
                  <el-input disabled v-model="params.residual_rent" type="number" placeholder="请输入内容"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="收视费">
                  <el-input disabled v-model="params.viewing_fee" type="number" placeholder="请输入内容"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="预存物管费">
                  <el-input disabled v-model="params.property_management_fee" type="number" placeholder="请输入内容"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="预存水费">
                  <el-input disabled v-model="params.water_fee" type="number" placeholder="请输入内容"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="预存电费">
                  <el-input disabled v-model="params.electricity_fee"  type="number" placeholder="请输入内容"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="预存气费">
                  <el-input disabled v-model="params.gas_fee" type="number" placeholder="请输入内容"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="应退还">
                  <el-input disabled :disabled="true" v-model="reimbursementTotal" placeholder="请输入内容"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </div>

        <div class="title">应扣除源能费</div>
        <div class="form_border">
          <el-form size="mini" :model="params" label-width="80px">
            <el-row>
              <el-col :span="2" style="text-align: right">
                <el-form-item label="水费：" label-width="100px">
                </el-form-item>
              </el-col>
              <el-col :span="5">
                <el-form-item label="上次底数">
                  <el-input disabled v-model="params.water_last"  placeholder="请输入内容"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="5">
                <el-form-item label="本次底数">
                  <el-input disabled v-model="params.water_now" placeholder="请输入内容"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="4">
                <el-form-item label="单价">
                  <el-input disabled v-model="params.water_unit_price" placeholder="请输入内容"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="4">
                <el-form-item label="滞纳金">
                  <el-input disabled v-model="params.water_late_payment" placeholder="请输入内容"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="4">
                <el-form-item label="合计">
                  <el-input disabled v-model="waterTotal" disabled="" placeholder="请输入内容"></el-input>
                </el-form-item>
              </el-col>
              <!--<el-col :span="2" style="text-align: right">-->
              <!--<el-button size="mini" type="primary">计 算</el-button>-->
              <!--</el-col>-->
            </el-row>
            <el-row>
              <el-col :span="2" style="text-align: right">
                <el-form-item label="电费（峰）：" label-width="100px">
                </el-form-item>
              </el-col>
              <el-col :span="5">
                <el-form-item label="上次底数">
                  <el-input disabled v-model="params.electricity_peak_last" placeholder="请输入内容"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="5">
                <el-form-item label="本次底数">
                  <el-input disabled v-model="params.electricity_peak_now" placeholder="请输入内容"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="4">
                <el-form-item label="单价">
                  <el-input disabled v-model="params.electricity_peak_unit_price" placeholder="请输入内容"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="4">
                <el-form-item label="滞纳金">
                  <el-input disabled v-model="params.electricity_peak_late_payment" placeholder="请输入内容"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="4">
                <el-form-item label="合计">
                  <el-input disabled v-model="elePeakTotal" disabled="" placeholder="请输入内容"></el-input>
                </el-form-item>
              </el-col>
              <!--<el-col :span="2" style="text-align: right">-->
              <!--<el-button size="mini" type="primary">计 算</el-button>-->
              <!--</el-col>-->
            </el-row>

            <el-row>
              <el-col :span="2" style="text-align: right">
                <el-form-item label="电费（谷）：" label-width="100px">
                </el-form-item>
              </el-col>
              <el-col :span="5">
                <el-form-item label="上次底数">
                  <el-input disabled v-model="params.electricity_valley_last" placeholder="请输入内容"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="5">
                <el-form-item label="本次底数">
                  <el-input disabled v-model="params.electricity_valley_now" placeholder="请输入内容"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="4">
                <el-form-item label="单价">
                  <el-input disabled v-model="params.electricity_valley_unit_price" placeholder="请输入内容"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="4">
                <el-form-item label="滞纳金">
                  <el-input disabled v-model="params.electricity_valley_late_payment" placeholder="请输入内容"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="4">
                <el-form-item label="合计">
                  <el-input disabled v-model="eleValTotal" disabled="" placeholder="请输入内容"></el-input>
                </el-form-item>
              </el-col>
              <!--<el-col :span="2" style="text-align: right">-->
              <!--<el-button size="mini" type="primary">计 算</el-button>-->
              <!--</el-col>-->
            </el-row>
            <el-row>
              <el-col :span="2" style="text-align: right">
                <el-form-item label="燃气费：" label-width="100px">
                </el-form-item>
              </el-col>
              <el-col :span="5">
                <el-form-item label="上次底数">
                  <el-input disabled v-model="params.gas_last" placeholder="请输入内容"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="5">
                <el-form-item label="本次底数">
                  <el-input disabled v-model="params.gas_now" placeholder="请输入内容"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="4">
                <el-form-item label="单价">
                  <el-input disabled v-model="params.gas_unit_price" placeholder="请输入内容"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="4">
                <el-form-item label="滞纳金">
                  <el-input disabled v-model="params.gas_late_payment" placeholder="请输入内容"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="4">
                <el-form-item label="合计">
                  <el-input disabled v-model="gasTotal" disabled="" placeholder="请输入内容"></el-input>
                </el-form-item>
              </el-col>
              <!--<el-col :span="2" style="text-align: right">-->
              <!--<el-button size="mini" type="primary">计 算</el-button>-->
              <!--</el-col>-->
            </el-row>
            <el-row>
              <el-col :span="2" style="text-align: right">
                <el-form-item label="物管费：" label-width="100px">
                </el-form-item>
              </el-col>
              <el-col :span="10">
                <el-form-item label="上次交到">
                  <el-date-picker disabled type="date" v-model="params.property_management_last" placeholder="选择日期"></el-date-picker>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="本次交到">
                  <el-date-picker disabled type="date" v-model="params.property_management_now" placeholder="选择日期"></el-date-picker>
                </el-form-item>
              </el-col>

              <el-col :span="5" :offset="2">
                <el-form-item label="公摊水费">
                  <el-input disabled v-model="params.property_management_electricity" placeholder="请输入内容"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="5">
                <el-form-item label="公摊电费">
                  <el-input disabled v-model="params.property_management_water" placeholder="请输入内容"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="物业费">
                  <el-input disabled v-model="params.property_management_total_fees" placeholder="请输入内容"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="4">
                <el-form-item label="合计">
                  <el-input disabled v-model="managementTotal" disabled="" placeholder="请输入内容"></el-input>
                </el-form-item>
              </el-col>
              <!--<el-col :span="2" style="text-align: right">-->
              <!--<el-button size="mini" type="primary">计 算</el-button>-->
              <!--</el-col>-->
            </el-row>
          </el-form>
        </div>

        <div class="title">应扣其他费用</div>
        <div class="form_border">
          <el-form size="mini" :model="params" label-width="80px">
            <el-row >
              <el-col :span="6">
                <el-form-item label="违约金">
                  <el-input disabled v-model="params.liquidated_damages" placeholder="请输入内容"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="垃圾费">
                  <el-input disabled v-model="params.trash_fees" placeholder="请输入内容"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="清洁费">
                  <el-input disabled v-model="params.cleaning_fees" placeholder="请输入内容"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="维修赔偿">
                  <el-input disabled v-model="params.repair_compensation_fees" placeholder="请输入内容"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="其他费用">
                  <el-input disabled v-model="params.other_fees" placeholder="请输入内容"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="超期房时">
                  <el-input disabled v-model="params.overtime_rent" placeholder="请输入内容"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="超期房费">
                  <el-input disabled v-model="params.TV_fees" placeholder="请输入内容"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="超期网费">
                  <el-input disabled v-model="params.network_fees" placeholder="请输入内容"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </div>


        <div class="title">实际退还</div>
        <div class="describe_border">
          实际退还：{{realTotal}}
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <!--<el-button size="small" @click="vacationDetailVisible = false">取 消</el-button>-->
        <!--<el-button size="small" type="primary" @click="confirmAdd">确 定</el-button>-->
      </span>
    </el-dialog>
  </div>
</template>

<script>
  import UpLoad from '../../../common/UPLOAD.vue'
  export default {
    props:['vacationDetail','vacationId'],
    components:{UpLoad},
    data() {
      return {
        vacationDetailVisible:false,
        params: {
          contract_id : '',
          module : '',

          check_time : '',
          check_type : '',
          profit:'',
          bank_num : '',
          account_bank : '',
          branch_bank : '',
          account_name : '',
          reason : '',
          compensation : '',
          image_pic : [],

          refund_deposit : '',
          residual_rent : '',
          viewing_fee : '',
          property_management_fee : '',
          water_fee : '',
          electricity_fee : '',
          gas_fee : '',

          water_last : '',
          water_now : '',
          water_unit_price : '',
          water_late_payment : '',

          electricity_peak_last : '',
          electricity_peak_now : '',
          electricity_peak_unit_price : '',
          electricity_peak_late_payment : '',

          electricity_valley_last : '',
          electricity_valley_now : '',
          electricity_valley_unit_price : '',
          electricity_valley_late_payment : '',

          gas_last : '',
          gas_now : '',
          gas_unit_price : '',
          gas_late_payment : '',

          property_management_last : '',
          property_management_now : '',
          property_management_electricity : '',
          property_management_water : '',
          property_management_total_fees : '',

          liquidated_damages : '',
          trash_fees : '',
          cleaning_fees : '',
          repair_compensation_fees : '',
          other_fees : '',
          overtime_rent : '',
          TV_fees : '',
          network_fees : '',
        },
        isClear : false,
        isDictionary:false,
        dictionary:[],
        contractInfo :{},
        editImage : {},
      };
    },
    computed:{
      reimbursementTotal(){
        return Number(this.params.refund_deposit)+Number(this.params.residual_rent)+Number(this.params.viewing_fee)
          +Number(this.params.property_management_fee)+
          Number(this.params.water_fee)+Number(this.params.electricity_fee)+Number(this.params.gas_fee);
      },
      waterTotal(){
        return (Number(this.params.water_now)-Number(this.params.water_last))*Number(this.params.water_unit_price)
          +Number(this.params.water_late_payment);
      },
      elePeakTotal(){
        return (Number(this.params.electricity_peak_now)-Number(this.params.electricity_peak_last))*Number(this.params.electricity_peak_unit_price)
          +Number(this.params.electricity_peak_late_payment);
      },
      eleValTotal(){
        return (Number(this.params.electricity_valley_now)-Number(this.params.electricity_valley_last))*Number(this.params.electricity_valley_unit_price)
          +Number(this.params.electricity_valley_late_payment);
      },
      gasTotal(){
        return (Number(this.params.gas_now)-Number(this.params.gas_last))*Number(this.params.gas_unit_price)
          +Number(this.params.gas_late_payment);
      },
      managementTotal(){
        return Number(this.params.property_management_electricity)+Number(this.params.property_management_water)
          +Number(this.params.property_management_total_fees);
      },
      otherTotal(){
        return Number(this.params.liquidated_damages)+Number(this.params.trash_fees)+Number(this.params.cleaning_fees)
          +Number(this.params.repair_compensation_fees)+Number(this.params.other_fees)+
          Number(this.params.overtime_rent)+Number(this.params.TV_fees)+Number(this.params.network_fees);
      },
      realTotal(){
        return Number(this.reimbursementTotal)-Number(this.waterTotal)-Number(this.elePeakTotal)-
          Number(this.eleValTotal)-Number(this.gasTotal)-Number(this.managementTotal)-Number(this.otherTotal)
      },
    },
    watch:{
      vacationDetail(val){
        this.vacationDetailVisible = val
      },
      vacationDetailVisible(val){
        if(!val){
          this.$emit('close');
          this.initData();
        }else {
          this.isClear = true;
          this.getData();
          if(!this.isDictionary){
            this.getDictionary();
          }
        }
      },
    },
    mounted(){

    },
    methods:{
      getDictionary(){
        this.$http.get(globalConfig.server+'setting/dictionary/328').then((res) => {
          if(res.data.code === '30010'){
            this.dictionary=res.data.data;
            this.isDictionary = true;
          }
        })
      },
      //上传图片
      getImg(val){
        console.log(val)
        this.params.image_pic = val[1];
      },
      //获取退房详情
      getData(){
        this.$http.get(globalConfig.server+'customer/check_out/'+this.vacationId).then((res) => {
          if(res.data.code === '20020'){
            let data = res.data.data;
            this.params.contract_id = data.contract_id;
            this.params.module = data.module;
            this.getContractInfo(data.module,data.contract_id);

            this.params.check_time = data.check_time;
            this.params.check_type = data.check_type;
            this.params.profit = data.extend_field && data.extend_field.profit;
            this.params.bank_num = data.bank_num;
            this.params.account_bank = data.account_bank;
            this.params.branch_bank = data.branch_bank;
            this.params.account_name = data.account_name;
            this.params.reason = data.reason;
            this.params.compensation = data.compensation;

            this.params.refund_deposit = data.details.refund_deposit;
            this.params.residual_rent = data.details.residual_rent;
            this.params.viewing_fee = data.details.viewing_fee;
            this.params.property_management_fee = data.details.property_management_fee;
            this.params.water_fee = data.details.water_fee;
            this.params.electricity_fee = data.details.electricity_fee;
            this.params.gas_fee = data.details.gas_fee;

            this.params.water_last = data.details.water_last;
            this.params.water_now = data.details.water_now;
            this.params.water_unit_price = data.details.water_unit_price;
            this.params.water_late_payment = data.details.water_late_payment;

            this.params.electricity_peak_last = data.details.electricity_peak_last;
            this.params.electricity_peak_now = data.details.electricity_peak_now;
            this.params.electricity_peak_unit_price = data.details.electricity_peak_unit_price;
            this.params.electricity_peak_late_payment = data.details.electricity_peak_late_payment;

            this.params.electricity_valley_last = data.details.electricity_valley_last;
            this.params.electricity_valley_now = data.details.electricity_valley_now;
            this.params.electricity_valley_unit_price = data.details.electricity_valley_unit_price;
            this.params.electricity_valley_late_payment = data.details.electricity_valley_late_payment;

            this.params.gas_last = data.details.gas_last;
            this.params.gas_now = data.details.gas_now;
            this.params.gas_unit_price = data.details.gas_unit_price;
            this.params.gas_late_payment = data.details.gas_late_payment;

            this.params.property_management_last = data.details.property_management_last;
            this.params.property_management_now = data.details.property_management_now;
            this.params.property_management_electricity = data.details.property_management_electricity;
            this.params.property_management_water = data.details.property_management_water;
            this.params.property_management_total_fees = data.details.property_management_total_fees;

            this.params.liquidated_damages = data.details.liquidated_damages;
            this.params.trash_fees = data.details.trash_fees;
            this.params.cleaning_fees = data.details.cleaning_fees;
            this.params.repair_compensation_fees = data.details.repair_compensation_fees;
            this.params.other_fees = data.details.other_fees;
            this.params.overtime_rent = data.details.overtime_rent;
            this.params.TV_fees = data.details.TV_fees;
            this.params.network_fees = data.details.network_fees;

            let picObject = {};
            this.editImage = {};
            this.params.image_pic = [];
            if(data.album!==[]){
              for(let key in data.album.image_pic){
                picObject[key] = data.album.image_pic[key][0].uri;
                this.params.image_pic.push(key)
              }
            }
            this.editImage = picObject;
          }
        })
      },

      getContractInfo(module,id){
        if(module == 1){
          this.$http.get(globalConfig.server + 'lease/collect/' + id).then((res) => {
            if (res.data.code === '61010') {
              this.contractInfo = res.data.data;
            }
          })
        }else {
          this.$http.get(globalConfig.server + 'lease/rent/' +id).then((res) => {
            if (res.data.code === '61110') {
              this.contractInfo = res.data.data;
            }
          })
        }
      },

      initData(){
        this.params = {
          contract_id : '',
          module : '',

          check_time : '',
          check_type : '',
          profit:'',
          bank_num : '',
          account_bank : '',
          branch_bank : '',
          account_name : '',
          reason : '',
          compensation : '',
          image_pic : [],

          refund_deposit : '',
          residual_rent : '',
          viewing_fee : '',
          property_management_fee : '',
          water_fee : '',
          electricity_fee : '',
          gas_fee : '',

          water_last : '',
          water_now : '',
          water_unit_price : '',
          water_late_payment : '',

          electricity_peak_last : '',
          electricity_peak_now : '',
          electricity_peak_unit_price : '',
          electricity_peak_late_payment : '',

          electricity_valley_last : '',
          electricity_valley_now : '',
          electricity_valley_unit_price : '',
          electricity_valley_late_payment : '',

          gas_last : '',
          gas_now : '',
          gas_unit_price : '',
          gas_late_payment : '',

          property_management_last : '',
          property_management_now : '',
          property_management_electricity : '',
          property_management_water : '',
          property_management_total_fees : '',

          liquidated_damages : '',
          trash_fees : '',
          cleaning_fees : '',
          repair_compensation_fees : '',
          other_fees : '',
          overtime_rent : '',
          TV_fees : '',
          network_fees : '',
        };
        this.isClear = false;
      },
    }
  };
</script>
<style lang="scss" scoped="">
  #rentVacation{

    .el-input.is-disabled .el-input__inner {
      background-color: #f5f7fa;
      border-color: #e4e7ed;
      color: #666 !important;
      cursor: default !important;
    }


    .el-dialog__wrapper{
      .el-dialog{
        .el-dialog__body{
          padding: 15px;
          >div{
            padding-right: 10px;
            max-height: 580px;
            overflow-x: auto;
          }

          .table_border{
            .tableDetail {
              width: 100%;
              border-collapse: collapse;
              tr {
                td {
                  border: 1px solid #ebeef5;
                  padding: 2px 0;
                  color: #606266;
                  text-align: center;
                  &:nth-child(odd) {
                    width: 8%;
                  }
                  &:nth-child(even) {
                    width: 12%;
                  }
                }
              }
            }
          }

          .form_border{
            .total{
              border-top: 1px solid #dfe6fb;
              padding: 5px;
              text-align: right;
            }
          }
        }
      }
    }
  }

</style>
