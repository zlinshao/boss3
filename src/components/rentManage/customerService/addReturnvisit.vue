<template>
  <div id="addCollectRepair">
    <el-dialog :close-on-click-modal="false" title="新建回访记录" :visible.sync="addReturnvisitDialogVisible" width="600px">
      <div>
        <el-form size="mini" :model="form" label-width="82px">
          <el-row>
            <el-col :span="12">
              <el-form-item label="创建时间" >
                <el-input v-model="form.contract_create_time" readonly ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="回访人" >
                <el-input v-model="form.huifang" readonly ></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="房屋地址" >
                <el-input v-model="form.address" readonly></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="合同类型" >
                <el-input v-model="form.contract_type" readonly></el-input>
              </el-form-item>
            </el-col>
            </el-row>
            <el-row>
            <el-col :span="12">
              <el-form-item label="合同周期">
                <el-input class="input" v-model="form.contract_month" style="width:50%;float:left;">
                  <template slot="append">
                    <div>月</div>
                  </template>
                </el-input>
                <el-input class="input" v-model="form.contract_day" style="width:50%;float:left;">
                  <template slot="append">
                    <span>天</span>
                  </template>
                </el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="来源">
                <el-select v-model="form.originate" placeholder="请选择来源" clearable>
                  <el-option v-for="item in responsiblePersonCategory" :label="item.dictionary_name" :key="item.id"
                             :value="item.id">{{item.dictionary_name}}
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row v-if="form.originate === 623">
            <el-col :span="12">
              <el-form-item label="中介名称">
                <el-input v-model="form.agency"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="中间价格">
                <el-input v-model="form.agency_price"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row v-for="index in priceLen" :key="index">
            <el-col :span="14">
              <el-form-item label="月单价">
                <el-date-picker
                  v-model="form.unit_price[0][index-1]"
                  type="daterange"
                  align="right"
                  unlink-panels
                  format="yyyy-MM-dd"
                  value-format="yyyy-MM-dd"
                  range-separator="至"
                  start-placeholder="开始日期"
                  end-placeholder="结束日期"
                  :picker-options="pickerOptions2">
                </el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :span="2" style="float: right;" v-if="index == 1">
              <i @click="addPriceLen" class="el-icon-circle-plus-outline addicon"></i>
            </el-col>  
            <el-col :span="2" style="float: right;" v-if="index != 1">
              <i @click="romovePriceLen(index-1)" class="el-icon-remove-outline addicon"></i>
            </el-col>               
            <el-col :span="6" style="float: right;">
                <el-input size="mini" v-model="form.unit_price[1][index-1]" placeholder="请输入价格" ></el-input>
            </el-col>
          </el-row>
          <el-row v-for="index in payForLen" :key="index+111">
            <el-col :span="14">
              <el-form-item label="付款方式">
                <el-date-picker
                  v-model="form.pay_type[0][index-1]"
                  type="daterange"
                  align="right"
                  format="yyyy-MM-dd"
                  value-format="yyyy-MM-dd"
                  unlink-panels
                  range-separator="至"
                  start-placeholder="开始日期"
                  end-placeholder="结束日期"
                  :picker-options="pickerOptions2">
                </el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :span="2" style="float: right;" v-if="index == 1">
              <i @click="addPayLen" class="el-icon-circle-plus-outline addicon"></i>
            </el-col>  
            <el-col :span="2" style="float: right;" v-if="index != 1">
              <i @click="romovePayLen(index-1)" class="el-icon-remove-outline addicon"></i>
            </el-col>               
            <el-col :span="6" style="float: right;" v-if=" activeName =='first'">
                <el-select size="mini" v-model="form.pay_type[1][index-1]" placeholder="收房付款方式" clearable>
                  <el-option v-for="item in payTypeInfo" :label="item.dictionary_name" :key="item.id"
                             :value="item.id">{{item.dictionary_name}}
                  </el-option>
                </el-select>
            </el-col>
            <el-col :span="6" style="float: right;" v-if=" activeName =='second'">
                <span>押</span>
                <el-select style="width:60px;" size="mini" v-model="form.pay_type[1][index-1]" clearable>
                  <el-option v-for="item in 48" :label="item" :key="item"
                             :value="item">
                  </el-option>
                </el-select>
                <span>付</span>
                <el-input size="mini" style="width:46px;" v-model="form.pay_type[2][index-1]"></el-input>
            </el-col>
          </el-row>
          <el-row v-if=" activeName == 'second'">
            <el-col :span="12">
              <el-form-item label="已付金额">
                <el-input v-model="form.has_pay"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row v-for="index in payTypeLen"  v-if="activeName == 'second'" :key="index+222">
            <el-col :span="12">
              <el-form-item label="支付方式">
                <el-select v-model="form.pay_method[0][index-1]" placeholder="请选择" clearable>
                  <el-option v-for="item in payTypeInfo" :label="item.dictionary_name" :key="item.id"
                             :value="item.id">{{item.dictionary_name}}
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="2" style="float: right;" v-if="index == 1">
              <i @click="addPayTypeLen" class="el-icon-circle-plus-outline addicon"></i>
            </el-col>  
            <el-col :span="2" style="float: right;" v-if="index != 1">
              <i @click="romovePayTypeLen(index-1)" class="el-icon-remove-outline addicon"></i>
            </el-col>               
            <el-col :span="10" style="float: right;">
              <el-form-item label="金额">
                <el-input size="mini" v-model="form.pay_method[1][index-1]" placeholder="请输入价格" ></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="是否收取其他费用" class="detailTitle">
                <el-select v-model="form.status" placeholder="请选择">
                  <el-option v-for="item in yesOrNo" :label="item.value" :key="item.id"
                             :value="item.id">{{item.value}}
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="12" >
              <el-form-item label="保修期">
                <el-input class="input" v-model="form.guarantee_month" style="width:50%;float:left;">
                  <template slot="append">
                    <div>月</div>
                  </template>
                </el-input>
                <el-input class="input" v-model="form.guarantee_day" style="width:50%;float:left;">
                  <template slot="append">
                    <span>天</span>
                  </template>
                </el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row v-if="form.status == 1">
            <el-col :span="12">
              <el-form-item label="费用名称">
                <el-input v-model="form.repair_money"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="价格">
                <el-input v-model="form.repair_money"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24">
              <el-form-item label="备注条款">
                <el-input v-model="form.remark_clause"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24">
              <el-form-item label="业务员态度" required="">
                <el-rate v-model="form.star"></el-rate>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24">
              <el-form-item label="业务员专业度" class="detailTitle2">
                <el-input type="textarea" v-model="form.sale_remark"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24">
              <el-form-item label="备注">
                <el-input v-model="form.remark "></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24">
              <el-form-item label="合同照片">
                <!-- <img v-if="workOrderDetail.album.image_pic!=[]" data-magnify :key="key"
                v-for="(val,key) in workOrderDetail.album.image_pic" :data-src="val[0].uri" :src="val[0].uri" alt=""> -->
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button size="small" @click="addReturnvisitDialogVisible = false">取 消</el-button>
        <el-button size="small" type="primary" @click="confirmAdd">保 存</el-button>
      </span>
    </el-dialog>
    <Organization :organizationDialog="organizationDialog" :type="organizeType" @close="closeOrganization"
                  @selectMember="selectMember"></Organization>
  </div>
</template>

<script>
  import Organization from '../../common/organization';

  export default {
    props: ['addReturnvisitDialog', 'ToActiveName','addReturnInfo'],
    components: {Organization},
    data() {
      return {
        addReturnvisitDialogVisible: false,
        organizationDialog: false,
        organizeType: '',
        addReturnVisitInfo:[],
        form: {
          contract_create_time:"",  //创建时间 
          huifang:"",        //回访人
          address:"",        //房屋地址
          contract_type:"",  //合同类型
          contract_id:"",    //合同编号
          agency:"",         //中介名称
          agency_price:"",   //中介费用
          audit:"",          //审核状态
          originate:"",      //来源
          contract_month:"", //合同周期_月
          contract_day:"",   //合同周期_日
          guarantee_month:"",//保修期_月
          guarantee_day:"",  //保修期_日
          sale_remark:"",    //业务员专业度
          remark:"",         //备注
          audited_fields:"", //审核状态
          pay_use:"",        //支付用途
          unit_price:[
            [],
            [],
          ],      //月单价
          pay_type:[
            [],
            [],
            [],
          ],       //付款方式
          module:"",         //收租(1:收[默认],2:租)
          amount:"",         //总额
          has_pay:"",        //已支付的费用
          pay_use:"",        //支付用途
          pay_method:[
            [],
            [],
          ],      //支付方式
          star:null,           //星级
          remark_clause:"",  //备注条款
        },
        pickerOptions2: {
          shortcuts: [{
            text: '最近一周',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit('pick', [start, end]);
            }
          }, {
            text: '最近一个月',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              picker.$emit('pick', [start, end]);
            }
          }, {
            text: '最近三个月',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
              picker.$emit('pick', [start, end]);
            }
          }]
        },
        activeName:'',
        payTypeInfo:[],
        follow_name: '',
        yesOrNo: [
          {id:"1",value:"是"},
          {id:"2",value:"否"}
        ],
        responsiblePersonCategory: [],
        cityCategory: [],
        priceLen:1,
        payForLen:1,
        payTypeLen:1,
      };
    },
    watch: {
      addReturnvisitDialog(val) {
        this.addReturnvisitDialogVisible = val
      },
      addReturnvisitDialogVisible(val) {
        if (!val) {
          this.initial();
          this.$emit('close');
        } else {
          this.getDictionary();
        }
      },
      ToActiveName(val) {
        if (val) {
          console.log(val)
          this.activeName = val;
        }
      },
      addReturnInfo(val){
        this.addReturnVisitInfo = val;
        this.form.contract_create_time = val.contract_create_time;  //合同创建时间
        this.form.huifang = val.staff_name;
        this.form.address = val.address;
        this.form.contract_type = val.type;
        this.form.contract_id = val.contract_id;
      },
    },
    methods: {
      getDictionary() {
        this.dictionary(595).then((res) => {  //维修状态
          this.repairStatusCategory = res.data;
        });
        this.dictionary(622).then((res) => {  //回访来源
          this.responsiblePersonCategory = res.data;
        });
        this.dictionary(629).then((res) => {  //支付方式
          this.payTypeInfo = res.data;
        });
        this.dictionary(306, 1).then((res) => { //城市
          this.cityCategory = res.data;
        });
      },

      confirmAdd() {
        if(this.activeName == 'first'){
          this.form.module = 1;
        }
        else{
          this.form.module = 2;
        }
        this.$http.post(globalConfig.server + 'contract/feedback', this.form).then((res) => {
          if (res.data.code === '1212200') {
            this.$notify.success({
              title: '成功',
              message: res.data.msg
            });
            this.initial();
            this.$emit('close', 'success');
            this.addReturnvisitDialogVisible = false;
          } else {
            this.$notify.warning({
              title: '警告',
              message: res.data.msg
            });
          }
        })
      },
      initial() {
        this.form = {
          contract_create_time:"",  //创建时间 
          huifang:"",        //回访人
          address:"",        //房屋地址
          contract_type:"",  //合同类型
          contract_id:"",    //合同编号
          agency:"",         //中介名称
          agency_price:"",   //中介费用
          audit:"",          //审核状态
          originate:"",      //来源
          contract_month:"", //合同周期_月
          contract_day:"",   //合同周期_日
          guarantee_month:"",//保修期_月
          guarantee_day:"",  //保修期_日
          sale_remark:"",    //业务员专业度
          remark:"",         //备注
          audited_fields:"", //审核状态
          pay_use:"",        //支付用途
          unit_price:[
            [],
            [],
          ],      //月单价
          pay_type:[
            [],
            [],
            [],
          ],       //付款方式
          module:"",         //收租(1:收[默认],2:租)
          amount:"",         //总额
          has_pay:"",        //已支付的费用
          pay_use:"",        //支付用途
          pay_method:[
            [],
            [],
          ],      //支付方式
          star:null,           //星级
          remark_clause:"",  //备注条款
        };
        this.follow_name = '';
      },
      closeOrganization() {
        this.organizeType = '';
        this.organizationDialog = false;
      },
      selectMember(val) {
        this.follow_name = val[0].name;
        this.form.follow_id = val[0].id;
      },
      chooseStaff() {
        this.organizeType = 'staff';
        this.organizationDialog = true;
      },
      emptyStaff() {
        this.follow_name = '';
        this.form.follow_id = '';
      },
      addPriceLen(index){
        this.priceLen++;
      },
      romovePriceLen(index){
        this.priceLen--;
        this.form.unit_price[0].splice(index, 1);
        this.form.unit_price[1].splice(index, 1);
      },
      addPayLen(index){
        this.payForLen++;
      },
      romovePayLen(index){
        this.payForLen--;
        if(this.activeName == 'first'){
        this.form.pay_type[0].splice(index, 1);
        this.form.pay_type[1].splice(index, 1);
        }
        else{
        this.form.pay_type[0].splice(index, 1);
        this.form.pay_type[1].splice(index, 1);          
        this.form.pay_type[2].splice(index, 1);          

        }

      },
      addPayTypeLen(index){
        this.payTypeLen++;
      },
      romovePayTypeLen(index){
        this.payTypeLen--;
        this.form.pay_method[0].splice(index, 1);
        this.form.pay_method[1].splice(index, 1);
      },
    },
  };
</script>
<style lang="scss">
  #addCollectRepair {
  @mixin flex {
      display: flex;
      display: -webkit-flex;
    }
    .addicon{
      font-size: 20px;
      line-height:28px;
      margin-left:28px;
      cursor: pointer;
    }
    .detailTitle {
      label {
        width:60px !important;
        margin-left:20px;
        line-height: 15px;
        height: 30px;
        @include flex;
        align-items: center;
        justify-content: flex-end;
      }
    }
    .detailTitle2{
       label {
        width:54px !important;
        margin-left:26px;
        line-height: 15px;
        height: 48px;
        @include flex;
        align-items: center;
        justify-content: flex-end;
      }     
    }
  .input{
    input{
      padding: 0 10px !important;
    }
  }
  }

</style>
