<template>
  <div id="addCollectRepair">
    <el-dialog :close-on-click-modal="false" title="新建回访记录" :visible.sync="addReturnvisitDialogVisible" width="50%">
      <div style="padding: 10px 20px;" class="scroll_bar">
        <el-form size="mini" :model="form" label-width="82px">
          <el-row>
            <el-col :span="12">
              <el-form-item label="创建时间">
                <el-input v-model="form.contract_create_time" disabled></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="回访人">
                <el-input v-model="form.huifang" disabled></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="房屋地址">
                <el-input v-model="form.address" disabled></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="合同类型">
                <el-input v-model="form.contract_type" disabled></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="是否接通" required>
                <el-select v-model="form.is_connect" placeholder="请选择">
                  <el-option v-for="item in connectCategory" :label="item.name" :key="item.id"
                             :value="item.id">{{item.name}}
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <div v-if="form.is_connect === 1">
            <el-row>
              <el-col :span="12">
                <el-form-item label="合同周期" required>
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
                <el-form-item label="来源" required>
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
                <el-form-item label="中介名称" required>
                  <el-input v-model="form.agency"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="中介价格" required>
                  <el-input v-model="form.agency_price"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row v-if="form.originate === 623">
              <el-col :span="12">
                <el-form-item label="中介人" required>
                  <el-input v-model="form.agency_person"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="中介电话" required>
                  <el-input v-model="form.agency_tel"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row v-for="index in priceLen" :key="index">
              <el-col :span="14">
                <el-form-item label="月单价" v-if="index==1" required>
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
                    :picker-options="pickerOptions2"
                    @change="priceChange(index-1)">
                  </el-date-picker>
                </el-form-item>
                <el-form-item v-if="index!=1" required>
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
                    :picker-options="pickerOptions2"
                    @change="priceChange(index-1)"
                  >
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
                <el-input size="mini" v-model="form.unit_price[1][index-1]" placeholder="请输入价格"></el-input>
              </el-col>
            </el-row>
            <el-row v-for="index in payForLen" :key="index+111">
              <el-col :span="14">
                <el-form-item label="付款方式" required v-if="index==1">
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
                    :picker-options="pickerOptions2"
                    @change="payTypeChange(index-1)">
                  </el-date-picker>
                </el-form-item>
                <el-form-item required v-if="index!=1">
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
                    :picker-options="pickerOptions2"
                    @change="payTypeChange(index-1)">
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
                <el-form-item label="已付金额" required>
                  <el-input v-model="form.has_pay"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row v-for="index in payTypeLen" v-if="activeName == 'second'" :key="index+222">
              <el-col :span="12">
                <el-form-item label="支付方式" required>
                  <el-select v-model="form.pay_method[0][index-1]" placeholder="请选择" clearable>
                    <el-option v-for="item in payTypeCategory" :label="item.dictionary_name" :key="item.id"
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
                  <el-input size="mini" v-model="form.pay_method[1][index-1]" placeholder="请输入价格"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <el-form-item label="是否收取其他费用" class="detailTitle" required>
                  <el-select v-model="form.has_extra" placeholder="请选择">
                    <el-option v-for="item in yesOrNo" :label="item.value" :key="item.id"
                               :value="item.id">{{item.value}}
                    </el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="保修期" required>
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
            <el-row v-if="form.has_extra == 1" v-for="index in payUseLen" :key="index+1111">
              <el-col :span="11">
                <el-form-item label="费用名称" required>
                  <el-input v-model="form.pay_use[0][index-1]"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="11">
                <el-form-item label="价格" required>
                  <el-input v-model="form.pay_use[1][index-1]"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="2" style="float: right;" v-if="index == 1">
                <i @click="addPayUseLen" class="el-icon-circle-plus-outline addicon"></i>
              </el-col>
              <el-col :span="2" style="float: right;" v-if="index != 1">
                <i @click="romovePayUseLen(index-1)" class="el-icon-remove-outline addicon"></i>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="24">
                <el-form-item label="备注条款" required>
                  <el-input v-model="form.remark_clause"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="24">
                <el-form-item label="业务员态度" required>
                  <el-rate v-model="form.star"></el-rate>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="24">
                <el-form-item label="业务员专业度" class="detailTitle2" required>
                  <el-input type="textarea" v-model="form.sale_remark"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
          </div>
          <el-row>
            <el-col :span="24">
              <el-form-item label="备注">
                <el-input v-model="form.remark"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <div v-if="form.is_connect === 1">
            <el-row>
              <el-col :span="12">
                <el-form-item label="中介费">
                  <el-input v-model="agency_price_origin " disabled></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <el-form-item label="现中介费">
                  <el-input v-model="agency_price_now" disabled></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="中介名">
                  <el-input v-model="agency_name" disabled></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <el-form-item label="中介人">
                  <el-input v-model="agency_user_name" disabled></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="中介电话">
                  <el-input v-model="agency_phone" disabled></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="24">
                <el-form-item label="合同照片" style="max-height:160px;" class="scroll_bar">
                  <img v-if="contractInfo.photo!=[]" style="width:120px; height:80px;border-radius:5px; margin: 0 8px;" data-magnify :key="val"
                       v-for="val in contractInfo.photo" :data-src="val" :src="val" alt="">
                </el-form-item>
              </el-col>
            </el-row>
            <el-row v-if="form.cmp_content">
              <el-col :span="24">
                <el-form-item label="对比详情">
                  <div class="content">
                    <div style="color: #e4393c;font-size: 14px">{{form.cmp_content.split('#')[0]}}</div>
                    <div v-for="item in form.cmp_content.split('#')[1].split(';')">
                      {{item}}
                    </div>
                  </div>
                </el-form-item>
              </el-col>
            </el-row>
          </div>

        </el-form>
      </div>

      <span slot="footer" class="dialog-footer">
        <el-button size="small" @click="addReturnvisitDialogVisible = false">取 消</el-button>
        <span v-if="form.is_connect === 1">
          <el-button v-if="!compareing" size="small" type="primary" @click="compareData">对 比</el-button>
          <el-button v-else size="small"  type="primary" :loading="true">对比中</el-button>
        </span>
        <el-button size="small" type="primary" @click="confirmAdd">保 存</el-button>
      </span>
    </el-dialog>
    <Organization :organizationDialog="organizationDialog" :type="organizeType" @close="closeOrganization"
                  @selectMember="selectMember"></Organization>
    <el-dialog :close-on-click-modal="false" title="客户信息" :visible.sync="customerInfoDialog" width="50%">
      <div v-for="(item, index) in customerInfo">
        <div class="title">旧客户({{index+1}})</div>
        <div class="form_border">
          <el-form onsubmit="return false" size="mini" label-width="70px">
            <el-row>
              <el-col :span="4">
                <el-form-item label="姓名">
                  <div class="content">
                    <span v-if="item.old && item.old.name">{{item.old && item.old.name}}</span>
                    <span v-else>暂无</span>
                  </div>
                </el-form-item>
              </el-col>
              <el-col :span="4">
                <el-form-item label="姓别">
                  <div class="content" v-if="item.old && item.old.sex==1">男</div>
                  <div class="content" v-else-if="item.old && item.old.sex==0">女</div>
                  <div class="content" v-else>暂无</div>
                </el-form-item>
              </el-col>
              <el-col :span="5">
                <el-form-item label="手机号">
                  <div class="content">
                    <span v-if="item.old && item.old.phone">{{item.old && item.old.phone}}</span>
                    <span v-else>暂无</span>
                  </div>
                </el-form-item>
              </el-col>
              <el-col :span="5">
                <el-form-item label="证件类型">
                  <div class="content" v-if="item.old && item.old.idtype && item.old.idtype.dictionary_name">{{item.old
                    && item.old.idtype && item.old.idtype.dictionary_name}}
                  </div>
                  <div class="content" v-else>暂无</div>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="证件号码">
                  <div class="content" v-if="item.old && item.old.idcard">{{item.old && item.old.idcard}}</div>
                  <div class="content" v-else>暂无</div>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </div>
        <div class="title">新客户({{index+1}})</div>
        <div class="form_border">
          <el-form onsubmit="return false" size="mini" label-width="70px">
            <el-row>
              <el-col :span="4">
                <el-form-item label="姓名">
                  <div class="content" v-if="item.new && item.new.name">{{item.new && item.new.name}}</div>
                  <div class="content" v-else>暂无</div>
                </el-form-item>
              </el-col>
              <el-col :span="4">
                <el-form-item label="姓别">
                  <div class="content" v-if="item.new && item.new.sex==1">男</div>
                  <div class="content" v-else-if="item.new && item.new.sex==0">女</div>
                  <div class="content" v-else>暂无</div>
                </el-form-item>
              </el-col>
              <el-col :span="5">
                <el-form-item label="手机号">
                  <div class="content" v-if="item.new && item.new.phone">{{item.new && item.new.phone}}</div>
                  <div class="content" v-else>暂无</div>
                </el-form-item>
              </el-col>
              <el-col :span="5">
                <el-form-item label="证件类型">
                  <div class="content" v-if="item.new && item.new.idtype && item.new.idtype.dictionary_name">{{item.new
                    && item.new.idtype && item.new.idtype.dictionary_name}}
                  </div>
                  <div class="content" v-else>暂无</div>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="证件号码">
                  <div class="content" v-if="item.new && item.new.idcard">{{item.new && item.new.idcard}}</div>
                  <div class="content" v-else>暂无</div>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </div>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button size="small" @click="customerInfoDialog=false">取 消</el-button>
        <el-button size="small" type="primary" @click="confirmAddConnect('update')">修 改</el-button>
        <el-button size="small" type="primary" @click="confirmAddConnect('continue')">使用旧客户</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  import Organization from '../../../common/organization';

  export default {
    props: ['addReturnvisitDialog', 'ToActiveName', 'addReturnInfo'],
    components: {Organization},
    data() {
      return {
        customerInfoDialog: false,
        customerInfo: [],
        addReturnvisitDialogVisible: false,
        organizationDialog: false,
        organizeType: '',
        addReturnVisitInfo: [],
        validateFlag: true,
        agency_price_origin: '暂无',            //中介费
        agency_price_now: '暂无',               //现中介费
        agency_name: '暂无',                    //中介名
        agency_user_name: '暂无',               //中介人
        agency_phone: '暂无',                   //手机号
        form: {
          contract_create_time: "",  //创建时间
          huifang: "",        //回访人
          address: "",        //房屋地址
          contract_type: "",  //合同类型
          contract_id: "",    //合同编号
          agency: "",         //中介名称
          agency_price: "",   //中介费用
          agency_person: "",  //中介人
          agency_tel: "",     //中介电话
          audit: "",          //审核状态
          originate: "",      //来源
          contract_month: "", //合同周期_月
          contract_day: "",   //合同周期_日
          guarantee_month: "",//保修期_月
          guarantee_day: "",  //保修期_日
          sale_remark: "",    //业务员专业度
          remark: "",         //备注
          audited_fields: "", //审核状态
          pay_use: "",        //支付名称
          array: "",          //费用
          has_extra: "",      //是否收取费用
          unit_price: [
            [],
            [],
          ],      //月单价
          pay_type: [
            [],
            [],
            [],
          ],       //付款方式
          module: "",         //收租(1:收[默认],2:租)
          amount: "",         //总额
          has_pay: "",        //已支付的费用
          pay_method: [
            [],
            [],
          ],      //支付方式
          star: null,           //星级
          remark_clause: "",  //备注条款
          is_connect: '',
          type: '',

          cmp_content : '',
        },
        compareing : false,
        contractInfo: [],
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
        activeName: '',
        payTypeInfo: [],
        payTypeCategory: [],
        follow_name: '',
        yesOrNo: [
          {id: "1", value: "是"},
          {id: "2", value: "否"}
        ],
        responsiblePersonCategory: [],
        cityCategory: [],
        priceLen: 1,
        payForLen: 1,
        payTypeLen: 1,
        payUseLen: 1,
        connectCategory: [{id: 1, name: '已接通'}, {id: 2, name: '未接通'}]
      };
    },
    mounted() {
      this.getDictionary();
      this.form.huifang = JSON.parse(localStorage.personal).name;
    },
    watch: {
      agency_price_origin(val) {
        if (val == '' || val == null) {
          this.agency_price_origin = '暂无';
        }
      },
      agency_price_now(val) {
        if (val == '' || val == null) {
          this.agency_price_now = '暂无';
        }
      },
      agency_name(val) {
        if (!val) {
          this.agency_name = '暂无';
        }
      },
      agency_user_name(val) {
        if (!val) {
          this.agency_user_name = '暂无';
        }
      },
      agency_phone(val) {
        if (!val) {
          this.agency_phone = '暂无';
        }
      },
      addReturnvisitDialog(val) {
        this.addReturnvisitDialogVisible = val
      },
      addReturnvisitDialogVisible(val) {
        if (!val) {
          this.$emit('close');
        } else {
          this.initial();
          if (this.activeName == 'first') {
            this.$http.get(globalConfig.server + 'lease/collect/' + this.form.contract_id).then((res) => {
              if (res.data.code === '61010') {
                this.contractInfo = res.data.data;
                this.agency_price_now = res.data.data.agency;
                if (res.data.data.agency_info) {
                  this.agency_price_origin = res.data.data.agency_info.agency_price;
                  this.agency_name = res.data.data.agency_info.agency_name;
                  this.agency_user_name = res.data.data.agency_info.agency_user_name;
                  this.agency_phone = res.data.data.agency_info.agency_phone;
                }
              }
            });
          } else {
            this.$http.get(globalConfig.server + 'lease/rent/' + this.form.contract_id).then((res) => {
              if (res.data.code === '61110') {
                this.contractInfo = res.data.data;
                this.agency_price_now = res.data.data.agency;
                if (res.data.data.agency_info) {
                  this.agency_price_origin = res.data.data.agency_info.agency_price;
                  this.agency_name = res.data.data.agency_info.agency_name;
                  this.agency_user_name = res.data.data.agency_info.agency_user_name;
                  this.agency_phone = res.data.data.agency_info.agency_phone;
                }
              }
            });
          }
        }
      },
      ToActiveName(val) {
        if (val) {
          this.activeName = val;
        }
      },
      addReturnInfo(val) {
        this.addReturnVisitInfo = val;
        this.form.contract_create_time = val.contract_create_time;  //合同创建时间
        this.form.address = val.address;
        this.form.contract_type = val.type;
        this.form.contract_id = val.contract_id;

      },
      priceLen(val) {
        let data = this.form.unit_price;
        if (data && data[0] && data[0][0] && data[0][0].length > 0) {
          let priceDate = data[0];
          for (var i = 0; i < val; i++) {
            if ((i + 1) < val) {
              priceDate[i + 1] = [];
              priceDate[i + 1][0] = priceDate[i + 1][1] = priceDate[i][1];
            }
          }
        }
      },
      payForLen(val) {
        let data = this.form.pay_type;
        if (data && data[0] && data[0][0] && data[0][0].length > 0) {
          let priceDate = data[0];
          for (var i = 0; i < val; i++) {
            if ((i + 1) < val) {
              priceDate[i + 1] = [];
              priceDate[i + 1][0] = priceDate[i + 1][1] = priceDate[i][1];
            }
          }
        }
      },
    },
    methods: {
      payTypeChange(n) {
        let data = this.form.pay_type;
        if (data && data[0] && data[0][0] && data[0][0].length > 0) {
          let priceDate = data[0];
          for (var i = n; i < this.payForLen; i++) {
            if ((i + 1) < this.payForLen) {
              priceDate[i + 1] = [];
              priceDate[i + 1][0] = priceDate[i + 1][1] = priceDate[i][1];
              this.$set(this.form.pay_type[0], priceDate);
            }
          }
        }
      },
      priceChange(n) {
        let data = this.form.unit_price;
        if (data && data[0] && data[0][0] && data[0][0].length > 0) {
          let priceDate = data[0];
          for (var i = n; i < this.priceLen; i++) {
            if ((i + 1) < this.priceLen) {
              priceDate[i + 1] = [];
              priceDate[i + 1][0] = priceDate[i + 1][1] = priceDate[i][1];
              this.$set(this.form.unit_price[0], priceDate);
            }
          }
        }
      },

      getDictionary() {
        this.dictionary(595).then((res) => {  //维修状态
          this.repairStatusCategory = res.data;
        });
        this.dictionary(622).then((res) => {  //回访来源
          this.responsiblePersonCategory = res.data;
        });
        this.dictionary(443).then((res) => {  //收房付款方式
          this.payTypeInfo = res.data;
        });
        this.dictionary(629).then((res) => {  //支付方式
          this.payTypeCategory = res.data;
        });
        this.dictionary(306, 1).then((res) => { //城市
          this.cityCategory = res.data;
        });
      },
      confirmAdd() {
        this.validateFlag = true;
        if (this.activeName === 'first') {
          this.form.module = 1;
        } else {
          this.form.module = 2;
        }

        if (this.form.is_connect === 1) {
          this.validate();
        }
        if (this.validateFlag == true) {
          if (this.form.is_connect === 1) {
            this.$confirm('您确认变更该合同回访状态吗?', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
            }).then(() => {
              this.$http.get(globalConfig.server + 'contract/feedback/check', {
                params: {
                  contract_id: this.form.contract_id,
                  module: this.form.module
                }
              }).then((res) => {
                this.$notify.success({
                  title: '成功',
                  message: res.data.msg
                });
                this.confirmAddConnect('');
              });
            }).catch(() => {
              this.$notify.info({
                title: '提示',
                message: '已取消提交'
              });
              this.confirmAddConnect('');
            });
          } else {
            this.confirmAddConnect('');
          }
        }
      },
      compareData(){
        if (this.activeName === 'first') {
          this.form.module = 1;
        } else {
          this.form.module = 2;
        }
        this.compareing = true;
        this.$http.put(globalConfig.server+'contract/feedback/compare',this.form).then((res)=>{
          this.compareing = false
          if(res.data.code === '1212200'){
            this.form.cmp_content = res.data.data.cmp_content;
          }else {
            this.$notify.warning({
              title: '警告',
              message: res.data.msg
            });
          }
        })
      },
      confirmAddConnect(val) {
        this.form.type = val;
        this.$http.post(globalConfig.server + 'contract/feedback', this.form).then((res) => {
          if (res.data.code === '1212200') {
            this.$notify.success({
              title: '成功',
              message: res.data.msg
            });
            this.initial();
            this.$emit('close', 'success');
            this.customerInfoDialog = false;
            this.addReturnvisitDialogVisible = false;
          } else if (res.data.code === '121290') {
            this.customerInfoDialog = true;
            this.customerInfo = res.data.data;
            this.$notify.warning({
              title: '警告',
              message: res.data.msg
            });
          } else {
            this.$notify.warning({
              title: '警告',
              message: res.data.msg
            });
          }
        });
      },
      validate() {
        if ((this.form.contract_month == "" && this.form.contract_day == "") && this.validateFlag == true) {
          this.validateFlag = false;
          this.$notify.warning({
            title: '警告',
            message: "合同周期不能为空"
          });
        } else if ((this.form.originate == "") && this.validateFlag == true) {
          this.validateFlag = false;
          this.$notify.warning({
            title: '警告',
            message: "来源不能为空"
          });
        } else if (this.form.agency == "" && this.form.originate === 623 && this.validateFlag == true) {
          this.validateFlag = false;
          this.$notify.warning({
            title: '警告',
            message: "中介名称不能为空"
          });
        } else if (this.form.agency_price == "" && this.form.originate === 623 && this.validateFlag == true) {
          this.validateFlag = false;
          this.$notify.warning({
            title: '警告',
            message: "中介费用不能为空"
          });
        } else if (this.form.agency_person == "" && this.form.originate === 623 && this.validateFlag == true) {
          this.validateFlag = false;
          this.$notify.warning({
            title: '警告',
            message: "中介人不能为空"
          });
        } else if (this.form.agency_tel == "" && this.form.originate === 623 && this.validateFlag == true) {
          this.validateFlag = false;
          this.$notify.warning({
            title: '警告',
            message: "中介电话不能为空"
          });
        } else if ((this.form.unit_price[0].length == 0 || this.form.unit_price[1].length == 0) && this.validateFlag == true) {
          this.validateFlag = false;
          this.$notify.warning({
            title: '警告',
            message: "月单价不能为空"
          });
        } else if ((this.form.pay_type[0].length == 0 || this.form.pay_type[1].length == 0 || this.form.pay_type[2].length == 0 && this.form.module == '2') && this.validateFlag == true) {
          this.validateFlag = false;
          this.$notify.warning({
            title: '警告',
            message: "付款方式不能为空"
          });
        } else if (this.form.has_extra == "" && this.validateFlag == true) {
          this.validateFlag = false;
          this.$notify.warning({
            title: '警告',
            message: "其他费用不能为空"
          });
        } else if ((this.form.pay_use[0].length == 0 || this.form.pay_use[1].length == 0) && this.form.has_extra == "1" && this.validateFlag == true) {
          this.validateFlag = false;
          this.$notify.warning({
            title: '警告',
            message: "其他费用明细不能为空"
          });
        } else if ((this.form.guarantee_month == "" && this.form.guarantee_day == "") && this.validateFlag == true) {
          this.validateFlag = false;
          this.$notify.warning({
            title: '警告',
            message: "保修期不能为空"
          });
        } else if (!this.form.star && this.validateFlag == true) {
          this.validateFlag = false;
          this.$notify.warning({
            title: '警告',
            message: "业务员态度不能为空"
          });
        } else if (this.form.has_pay == "" && this.form.module == '2' && this.validateFlag == true) {
          this.validateFlag = false;
          this.$notify.warning({
            title: '警告',
            message: "已付金额不能为空"
          });
        } else if ((this.form.pay_method[0].length == 0 || this.form.pay_method[1].length == 0) && this.form.module == '2' && this.validateFlag == true) {
          this.validateFlag = false;
          this.$notify.warning({
            title: '警告',
            message: "支付方式不能为空"
          });
        } else if (this.form.sale_remark == "") {
          this.validateFlag = false;
          this.$notify.warning({
            title: '警告',
            message: "业务员专业度不能为空"
          });
        }
      },
      initial() {
        this.agency_price_origin = "",            //中介费
          this.lagency_price_now = "",               //现中介费
          this.agency_name = "",                    //中介名
          this.agency_user_name = "",               //中介人
          this.agency_phone = "",                   //手机号
          this.form.agency = "";        //中介名称
        this.form.agency_price = "";   //中介费用
        this.form.agency_person = "";  //中介人
        this.form.agency_tel = "";     //中介电话
        this.form.audit = "";          //审核状态
        this.form.originate = "";      //来源
        this.form.contract_month = ""; //合同周期_月
        this.form.contract_day = "";   //合同周期_日
        this.form.guarantee_month = "";//保修期_月
        this.form.guarantee_day = "";  //保修期_日
        this.form.sale_remark = "";    //业务员专业度
        this.form.remark = "";         //备注
        this.form.audited_fields = ""; //审核状态
        this.form.pay_use = [
          [],
          []
        ],        //支付名称
          this.form.has_extra = "",      //是否收取费用
          this.form.unit_price = [
            [],
            [],
          ],      //月单价
          this.form.pay_type = [
            [],
            [],
            [],
          ],       //付款方式
          this.form.module = "",         //收租(1:收[默认],2:租)
          this.form.amount = "",         //总额
          this.form.has_pay = "",        //已支付的费用
          this.form.pay_method = [
            [],
            [],
          ],      //支付方式
          this.form.star = null,           //星级
          this.form.remark_clause = "",  //备注条款

          this.contractInfo = [],
          this.follow_name = '';
        this.form.is_connect = '';

        this.form.cmp_content = '';
        this.compareing = false;
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
      addPriceLen(index) {
        this.priceLen++;
      },
      romovePriceLen(index) {
        this.priceLen--;
        this.form.unit_price[0].splice(index, 1);
        this.form.unit_price[1].splice(index, 1);
      },
      addPayLen(index) {
        this.payForLen++;
      },
      romovePayLen(index) {
        this.payForLen--;
        if (this.activeName == 'first') {
          this.form.pay_type[0].splice(index, 1);
          this.form.pay_type[1].splice(index, 1);
        }
        else {
          this.form.pay_type[0].splice(index, 1);
          this.form.pay_type[1].splice(index, 1);
          this.form.pay_type[2].splice(index, 1);

        }

      },
      addPayTypeLen(index) {
        this.payTypeLen++;
      },
      romovePayTypeLen(index) {
        this.payTypeLen--;
        this.form.pay_method[0].splice(index, 1);
        this.form.pay_method[1].splice(index, 1);
      },
      addPayUseLen(index) {
        this.payUseLen++;
      },
      romovePayUseLen(index) {
        this.payUseLen--;
        this.form.pay_use[0].splice(index, 1);
        this.form.pay_use[1].splice(index, 1);
      },
    },
  };
</script>
<style lang="scss" scoped>
  #addCollectRepair {
    .content {
      padding: 0 10px;
      min-height: 32px;
      background: #eef3fc;
      border-radius: 4px;
      font-size: 12px;
      color: #727479;
    }
    @mixin flex {
      display: flex;
      display: -webkit-flex;
    }
    .addicon {
      font-size: 20px;
      line-height: 28px;
      margin-left: 28px;
      cursor: pointer;
    }
    .detailTitle {
      label {
        width: 70px !important;
        margin-left: 10px;
        line-height: 15px;
        height: 30px;
        @include flex;
        align-items: center;
        justify-content: flex-end;
      }
    }
    .detailTitle2 {
      label {
        width: 54px !important;
        margin-left: 26px;
        line-height: 15px;
        height: 48px;
        @include flex;
        align-items: center;
        justify-content: flex-end;
      }
    }
    .input {
      input {
        padding: 0 10px !important;
      }
    }
  }

</style>
