<template>
  <div id="addFollowUp">
    <el-dialog :close-on-click-modal="false" title="回访详情" :visible.sync="repairDetailDialogVisible" width="50%">
      <div style="padding: 10px 20px;" class="scroll_bar">
        <el-form size="mini" :model="form" label-width="86px">
          <el-row>
            <el-col :span="10">
              <el-form-item label="创建时间">
                <div class="content">{{repairDetail.create_time}}</div>
              </el-form-item>
            </el-col>
            <el-col :span="10" style="margin-left:8.33333%">
              <el-form-item label="回访人">
                <div class="content">{{repairDetail.operator}}</div>
              </el-form-item>
            </el-col>
            <el-col :span="2">
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="10">
              <el-form-item label="房屋地址">
                <div class="content">{{repairDetail.address}}</div>
              </el-form-item>
            </el-col>
            <el-col :span="2" v-if="!wholeFlag">
              <el-checkbox v-model="audited_fields.address" :disabled="audited_fieldsxx.address"
                           style="margin-left: 20px;line-height: 28px;"></el-checkbox>
            </el-col>
            <el-col :span="10" :class="{'wholeStyle':wholeFlag}">
              <el-form-item label="合同类型">
                <div class="content">{{repairDetail.contract_type}}</div>
              </el-form-item>
            </el-col>
            <el-col :span="2">
            </el-col>
          </el-row>
          <div v-show="repairDetail.is_connect == 1">
            <el-row>
              <el-col :span="10">
                <el-form-item label="合同周期">
                  <div class="content" style="width:25%;float:left;">{{repairDetail.contract_month}}</div>
                  <span style="float:left;">月</span>
                  <div class="content" style="width:25%;float:left;">{{repairDetail.contract_day}}</div>
                  <span style="float:left;">天</span>
                </el-form-item>
              </el-col>
              <el-col :span="2" v-if="!wholeFlag">
                <el-checkbox v-model="audited_fields.contract_month" :disabled="audited_fieldsxx.contract_month"
                             style="margin-left: 20px;line-height: 28px;"></el-checkbox>
              </el-col>
              <el-col :span="10" :class="{'wholeStyle':wholeFlag}">
                <el-form-item label="来源">
                  <div class="content">{{repairDetail.originate_name}}</div>
                </el-form-item>
              </el-col>
              <el-col :span="2" v-if="!wholeFlag">
                <el-checkbox v-model="audited_fields.originate_name" :disabled="audited_fieldsxx.originate_name"
                             style="margin-left: 20px;line-height: 28px;"></el-checkbox>
              </el-col>
            </el-row>
            <el-row v-if="repairDetail.originate === 623">
              <el-col :span="10">
                <el-form-item label="中介名称">
                  <div class="content">{{repairDetail.agency_name}}</div>
                </el-form-item>
              </el-col>
              <el-col :span="2" v-if="!wholeFlag">
                <el-checkbox v-model="audited_fields.agency" :disabled="audited_fieldsxx.agency"
                             style="margin-left: 20px;line-height: 28px;"></el-checkbox>
              </el-col>
              <el-col :span="10" :class="{'wholeStyle':wholeFlag}">
                <el-form-item label="中介价格">
                  <div class="content">{{repairDetail.agency_price}}</div>
                </el-form-item>
              </el-col>
              <el-col :span="2" v-if="!wholeFlag">
                <el-checkbox v-model="audited_fields.agency_price" :disabled="audited_fieldsxx.agency_price"
                             style="margin-left: 20px;line-height: 28px;"></el-checkbox>
              </el-col>
            </el-row>
            <el-row v-if="repairDetail.originate === 623">
              <el-col :span="10">
                <el-form-item label="中介人">
                  <div class="content">{{repairDetail.agency_person}}</div>
                </el-form-item>
              </el-col>
              <el-col :span="2" v-if="!wholeFlag">
                <el-checkbox v-model="audited_fields.agency_person" :disabled="audited_fieldsxx.agency_person"
                             style="margin-left: 20px;line-height: 28px;"></el-checkbox>
              </el-col>
              <el-col :span="10" :class="{'wholeStyle':wholeFlag}">
                <el-form-item label="中介电话">
                  <div class="content">{{repairDetail.agency_tel}}</div>
                </el-form-item>
              </el-col>
              <el-col :span="2" v-if="!wholeFlag">
                <el-checkbox v-model="audited_fields.agency_tel" :disabled="audited_fieldsxx.agency_tel"
                             style="margin-left: 20px;line-height: 28px;"></el-checkbox>
              </el-col>
            </el-row>
            <el-row v-for="index in priceLen" :key="index" v-if="index>0">
              <el-col :span="12">
                <el-form-item label="月单价">
                  <div class="content" style="width:36%;float:left;">{{repairDetail.unit_price[0][index-1][0]}}</div>
                  <span style="float:left;">&nbsp;-&nbsp;</span>
                  <div class="content" style="width:36%;float:left;">{{repairDetail.unit_price[0][index-1][1]}}</div>
                </el-form-item>
              </el-col>
              <el-col :span="10">
                <el-form-item>
                  <div class="content">{{repairDetail.unit_price[1][index-1]}}</div>
                </el-form-item>
              </el-col>
              <el-col :span="2" v-if="!wholeFlag">
                <el-checkbox v-model="audited_fields.unit_price[index-1]"
                             :disabled="audited_fieldsxx.unit_price[index-1]"
                             style="margin-left: 20px;line-height: 28px;"></el-checkbox>
              </el-col>
            </el-row>
            <el-row v-for="index in payForLen" :key="index+55" v-if="index>0">
              <el-col :span="12">
                <el-form-item label="付款方式">
                  <div class="content" style="width:36%;float:left;">{{repairDetail.pay_type[0][index-1][0]}}</div>
                  <span style="float:left;">&nbsp;-&nbsp;</span>
                  <div class="content" style="width:36%;float:left;">{{repairDetail.pay_type[0][index-1][1]}}</div>
                </el-form-item>
              </el-col>

              <el-col :span="10" v-if="activeName !='second'">
                <el-form-item>
                  <div class="content" v-for="item in pay_way_dic" :key="item.id"
                       v-if="repairDetail.pay_type[1][index-1] == item.id">
                    {{item.dictionary_name}}
                  </div>
                </el-form-item>
              </el-col>
              <el-col :span="10" v-if="activeName =='second'">
                <el-form-item label="">
                  <span style="float:left">押</span>
                  <div class="content" style="width:40px;float:left">{{repairDetail.pay_type[1][index-1]}}</div>
                  <span style="float:left">付</span>
                  <div class="content" style="width:40px;float:left">{{repairDetail.pay_type[2][index-1]}}</div>
                </el-form-item>
              </el-col>
              <el-col :span="2" v-if="!wholeFlag">
                <el-checkbox v-model="audited_fields.pay_type[index-1]" :disabled="audited_fieldsxx.pay_type[index-1]"
                             style="margin-left: 20px;line-height: 28px;"></el-checkbox>
              </el-col>
            </el-row>
            <el-row v-if=" activeName == 'second'">
              <el-col :span="10">
                <el-form-item label="已付金额">
                  <div class="content">{{repairDetail.has_pay}}</div>
                </el-form-item>
              </el-col>
              <el-col :span="2" v-if="!wholeFlag">
                <el-checkbox v-model="audited_fields.has_pay" :disabled="audited_fieldsxx.has_pay"
                             style="margin-left: 20px;line-height: 28px;"></el-checkbox>
              </el-col>
            </el-row>

            <el-row v-for="index in payTypeLen" v-if="activeName == 'second' && index>0" :key="index+111">
              <el-col :span="10">
                <el-form-item label="支付方式">
                  <div class="content" v-for="item in payTypeInfo" :key="item.id"
                       v-if="repairDetail.pay_method[0][index-1] == item.id">
                    {{item.dictionary_name}}
                  </div>
                </el-form-item>
              </el-col>
              <el-col :span="2">
              </el-col>
              <el-col :span="10" style="margin-left:8.3333%">
                <el-form-item label="金额">
                  <div class="content">{{repairDetail.pay_method[1][index-1]}}</div>
                </el-form-item>
              </el-col>
              <el-col :span="2" v-if="!wholeFlag">
                <el-checkbox v-model="audited_fields.pay_method[index-1]"
                             :disabled="audited_fieldsxx.pay_method[index-1]"
                             style="margin-left: 20px;line-height: 28px;"></el-checkbox>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="10">
                <el-form-item label="是否收取其他费用" class="detailTitle">
                  <div class="content">{{repairDetail.has_extra}}</div>
                </el-form-item>
              </el-col>
              <el-col :span="2" v-if="!wholeFlag">
                <el-checkbox v-model="audited_fields.has_extra" :disabled="audited_fieldsxx.has_extra"
                             style="margin-left: 20px;line-height: 28px;"></el-checkbox>
              </el-col>
              <el-col :span="10" :class="{'wholeStyle':wholeFlag}">
                <el-form-item label="保修期">
                  <div class="content" style="width:25%;float:left;">{{repairDetail.guarantee_month}}</div>
                  <span style="float:left;"> 月 </span>
                  <div class="content" style="width:25%;float:left;">{{repairDetail.guarantee_day}}</div>
                  <span style="float:left;"> 天 </span>
                </el-form-item>
              </el-col>
              <el-col :span="2" v-if="!wholeFlag">
                <el-checkbox v-model="audited_fields.guarantee_month" :disabled="audited_fieldsxx.guarantee_month"
                             style="margin-left: 20px;line-height: 28px;"></el-checkbox>
              </el-col>
            </el-row>
            <el-row v-if="repairDetail.has_extra == '是' " v-for="index in payUseLen" :key="index+999">
              <el-col :span="11">
                <el-form-item label="费用名称">
                  <div class="content">{{repairDetail.pay_use[0][index-1]}}</div>
                </el-form-item>
              </el-col>

              <el-col :span="11">
                <el-form-item label="价格">
                  <div class="content">{{repairDetail.pay_use[1][index-1]}}</div>
                </el-form-item>
              </el-col>
              <el-col :span="2" v-if="!wholeFlag">
                <el-checkbox v-model="audited_fields.pay_use[index-1]" :disabled="audited_fieldsxx.pay_use[index-1]"
                             style="margin-left: 20px;line-height: 28px;"></el-checkbox>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="22">
                <el-form-item label="备注条款">
                  <div class="content">{{repairDetail.remark_clause}}</div>
                </el-form-item>
              </el-col>
              <el-col :span="2" v-if="!wholeFlag">
                <el-checkbox v-model="audited_fields.remark_clause" :disabled="audited_fieldsxx.remark_clause"
                             style="margin-left: 20px;line-height: 28px;"></el-checkbox>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="22">
                <el-form-item label="业务员态度">
                  <el-rate v-model="repairDetail.star" disabled></el-rate>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="22">
                <el-form-item label="业务员专业度" class="detailTitle2">
                  <div class="content">
                    <span v-if="repairDetail && repairDetail.sale_remark">{{repairDetail.sale_remark}}</span>
                    <span v-else>暂无</span>
                  </div>
                </el-form-item>
              </el-col>
              <el-col :span="2" v-if="!wholeFlag">
                <el-checkbox v-model="audited_fields.sale_remark" :disabled="audited_fieldsxx.sale_remark"
                             style="margin-left: 20px;line-height: 28px;"></el-checkbox>
              </el-col>
            </el-row>
          </div>
          <el-row>
            <el-col :span="22">
              <el-form-item label="备注">
                <div class="content">
                  <span v-if="repairDetail && repairDetail.remark">{{repairDetail.remark}}</span>
                  <span v-else>暂无</span>
                </div>
              </el-form-item>
            </el-col>
          </el-row>
          <div v-show="repairDetail.is_connect == 1">
            <el-row v-if="!wholeFlag">
              <el-col :span="10">
                <el-form-item label="中介费">
                  <div class="content">
                    <span v-if="agency_price!=''">{{agency_price}}</span>
                    <span v-else>暂无</span>
                  </div>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row v-if="!wholeFlag">
              <el-col :span="10">
                <el-form-item label="现中介费">
                  <div class="content">
                    <span v-if="agency_price_now!=''">{{agency_price_now}}</span>
                    <span v-else>暂无</span>
                  </div>
                </el-form-item>
              </el-col>
              <el-col :span="2">
              </el-col>
              <el-col :span="10" style="margin-left:8.33333%">
                <el-form-item label="中介名">
                  <div class="content">
                    <span v-if="agency_name">{{agency_name}}</span>
                    <span v-else>暂无</span>
                  </div>
                </el-form-item>
              </el-col>
              <el-col :span="2">
              </el-col>
            </el-row>
            <el-row v-if="!wholeFlag">
              <el-col :span="10">
                <el-form-item label="中介人">
                  <div class="content">
                    <span v-if="agency_user_name">{{agency_user_name}}</span>
                    <span v-else>暂无</span>
                  </div>
                </el-form-item>
              </el-col>
              <el-col :span="2">
              </el-col>
              <el-col :span="10" style="margin-left:8.33333%">
                <el-form-item label="手机号">
                  <div class="content">
                    <span v-if="agency_phone">{{agency_phone}}</span>
                    <span v-else>暂无</span>
                  </div>
                </el-form-item>
              </el-col>
              <el-col :span="2">
              </el-col>
            </el-row>
            <el-row v-if="!wholeFlag">
              <el-col :span="22">
                <el-form-item label="合同照片" style="max-height:160px;">
                  <img v-if="album!=[]" style="width:120px; height:80px;border-radius:5px; margin: 0 8px;" data-magnify
                       v-for="(val,index) in album" :data-src="val" :src="val" :key="index">
                </el-form-item>
              </el-col>
            </el-row>
            <el-row v-if="repairDetail && repairDetail.cmp_content">
              <el-col :span="24">
                <el-form-item label="对比详情">
                  <div class="content">
                    <div style="color: #e4393c;font-size: 14px">{{repairDetail.cmp_content.split('#')[0]}}</div>
                    <div v-for="item in repairDetail.cmp_content.split('#')[1].split(';')">
                      {{item}}
                    </div>
                    {{repairDetail.cmp_content.split(':')[1]}}
                  </div>
                </el-form-item>
              </el-col>
            </el-row>
          </div>
        </el-form>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button size="small" @click="repairDetailDialogVisible = false">取 消</el-button>
        <el-button size="small" type="primary" @click="confirmAdd">确 定</el-button>
      </span>
    </el-dialog>

  </div>
</template>

<script>
  export default {
    name: "repair-detail",
    props: ["repairDetailDialog", "ToActiveName", "repairId", "photopic", "wholeForm", "wholeFormR"],
    components: {},
    data() {
      return {
        repairDetailDialogVisible: false,
        repairDetail: {},
        form: {
          id: ""
        },
        payTypeInfo: [],
        pay_way_dic: [],
        activeName: "",
        wholeFlag: false,
        abc: 3,
        repairIdTo: "",
        priceLen: 0,
        payForLen: 0,
        payTypeLen: 0,
        payUseLen: 0,
        album: [],
        agency_price: "暂无",            //中介费
        agency_price_now: "",               //现中介费
        agency_name: "",                    //中介名
        agency_user_name: "",               //中介人
        agency_phone: "",                   //手机号
        audited_fields: {
          address: "",
          contract_month: "",
          contract_day: "",
          originate_name: "",
          unit_price: [],
          pay_type: [],
          pay_method: [],
          has_extra: "",
          has_pay: "",
          pay_use: "",
          array: "",
          guarantee_month: "",
          guarantee_day: "",
          remark_clause: "",
          sale_remark: ""
        },
        audited_fieldsxx: {
          address: "",
          contract_month: "",
          contract_day: "",
          originate_name: "",
          unit_price: [],
          pay_type: [],
          pay_method: [],
          has_extra: "",
          has_pay: "",
          pay_use: "",
          array: "",
          guarantee_month: "",
          guarantee_day: "",
          remark_clause: "",
          sale_remark: ""
        }
      };
    },
    watch: {
      wholeForm(val) {
        this.wholeFlag = val;
      },
      wholeFormR(val) {
        this.wholeFlag = val;
      },
      repairDetailDialog(val) {
        this.repairDetailDialogVisible = val;
      },
      repairDetailDialogVisible(val) {
        if (!val) {
          this.$emit("close");
          this.wholeFlag = false;
        } else {
          (this.audited_fields = {
            address: "",
            contract_month: "",
            contract_day: "",
            originate_name: "",
            agency: "",
            agency_person: "",
            agency_price: "",
            agency_tel: "",
            unit_price: [],
            pay_type: [],
            pay_method: [],
            has_extra: "",
            pay_use: "",
            array: "",
            guarantee_month: "",
            guarantee_day: "",
            remark_clause: "",
            sale_remark: ""
          });
            (this.audited_fieldsxx = {
              address: "",
              contract_month: "",
              contract_day: "",
              originate_name: "",
              agency: "",
              agency_person: "",
              agency_price: "",
              agency_tel: "",
              unit_price: [],
              pay_type: [],
              pay_method: [],
              has_extra: "",
              pay_use: "",
              array: "",
              guarantee_month: "",
              guarantee_day: "",
              remark_clause: "",
              sale_remark: ""
            });
          this.getDetail();
        }
      },
      ToActiveName(val) {
        if (val) {
          this.activeName = val;
        }
      },
      repairId(val) {
        this.form.id = val;
      },
      photopic(val) {
        this.album = val;
      }
    },
    mounted() {
    },
    methods: {
      getDetail() {
        this.dictionary(629).then(res => {
          //支付方式
          this.payTypeInfo = res.data;
        });
        this.dictionary(443, 1).then((res) => {
          this.pay_way_dic = res.data;
        });
        this.$http.get(globalConfig.server + "contract/feedback/info", { params: this.form}).then(res => {
            if (res.data.code === "1212200") {
              this.agency_price = res.data.data.agency && res.data.data.agency.agency_price;
              this.agency_price_now = res.data.data.agency_price_now;
              this.agency_name = res.data.data.agency_name;
              this.agency_user_name = res.data.data.agency_user_name;
              this.agency_phone = res.data.data.agency_phone;
              this.repairDetail = res.data.data;
              this.album=res.data.data.album;
              this.audited_fields.address = res.data.data.audited_fields.address == "1" ? true : false;
              this.audited_fields.contract_month = res.data.data.audited_fields.contract_month == "1" ? true : false;
              this.audited_fields.contract_day = res.data.data.audited_fields.contract_day == "1" ? true : false;
              this.audited_fields.originate_name = res.data.data.audited_fields.originate_name == "1" ? true : false;
              this.audited_fields.has_pay = res.data.data.audited_fields.has_pay == "1" ? true : false;
              if (res.data.data.audited_fields.unit_price != [] && res.data.data.audited_fields != "") {
                for (let i = 0; i < res.data.data.audited_fields.unit_price.length; i++) {
                  this.audited_fields.unit_price[i] = res.data.data.audited_fields.unit_price[i] == "1" ? true : false;
                  this.audited_fieldsxx.unit_price[i] = res.data.data.audited_fields.unit_price[i] == "1" ? true : false;
                }
              }
              if (res.data.data.audited_fields.pay_type != [] && res.data.data.audited_fields != "") {
                for (let j = 0; j < res.data.data.audited_fields.pay_type.length; j++) {
                  this.audited_fields.pay_type[j] = res.data.data.audited_fields.pay_type[j] == "1" ? true : false;
                  this.audited_fieldsxx.pay_type[j] = res.data.data.audited_fields.pay_type[j] == "1" ? true : false;
                }
              }

              if (res.data.data.audited_fields.pay_method != [] && res.data.data.audited_fields != "") {
                for (let k = 0; k < res.data.data.audited_fields.pay_method.length; k++) {
                  this.audited_fields.pay_method[k] = res.data.data.audited_fields.pay_method[k] == "1" ? true : false;
                  this.audited_fieldsxx.pay_method[k] = res.data.data.audited_fields.pay_method[k] == "1" ? true : false;
                }
              }
              if (res.data.data.audited_fields.pay_use != [] && res.data.data.audited_fields != "") {
                for (let k = 0; k < res.data.data.audited_fields.pay_use.length; k++) {
                  this.audited_fields.pay_use[k] = res.data.data.audited_fields.pay_use[k] == "1" ? true : false;
                  this.audited_fieldsxx.pay_use[k] = res.data.data.audited_fields.pay_use[k] == "1" ? true : false;
                }
              }
              this.audited_fields.has_extra = res.data.data.audited_fields.has_extra == "1" ? true : false;
              this.audited_fields.guarantee_month = res.data.data.audited_fields.guarantee_month == "1" ? true : false;
              this.audited_fields.guarantee_day = res.data.data.audited_fields.guarantee_day == "1" ? true : false;
              this.audited_fields.remark_clause = res.data.data.audited_fields.remark_clause == "1" ? true : false;
              this.audited_fields.sale_remark = res.data.data.audited_fields.sale_remark == "1" ? true : false;

              this.audited_fields.agency = res.data.data.audited_fields.agency == "1" ? true : false;
              this.audited_fields.agency_person = res.data.data.audited_fields.agency_person == "1" ? true : false;
              this.audited_fields.agency_price = res.data.data.audited_fields.agency_price == "1" ? true : false;
              this.audited_fields.agency_tel = res.data.data.audited_fields.agency_tel == "1" ? true : false;

              this.audited_fieldsxx.address = res.data.data.audited_fields.address == "1" ? true : false;
              this.audited_fieldsxx.contract_month = res.data.data.audited_fields.contract_month == "1" ? true : false;
              this.audited_fieldsxx.contract_day = res.data.data.audited_fields.contract_day == "1" ? true : false;
              this.audited_fieldsxx.originate_name = res.data.data.audited_fields.originate_name == "1" ? true : false;
              this.audited_fieldsxx.has_extra = res.data.data.audited_fields.has_extra == "1" ? true : false;
              this.audited_fieldsxx.guarantee_month = res.data.data.audited_fields.guarantee_month == "1" ? true : false;
              this.audited_fieldsxx.guarantee_day = res.data.data.audited_fields.guarantee_day == "1" ? true : false;
              this.audited_fieldsxx.remark_clause = res.data.data.audited_fields.remark_clause == "1" ? true : false;
              this.audited_fieldsxx.sale_remark = res.data.data.audited_fields.sale_remark == "1" ? true : false;
              this.audited_fieldsxx.has_pay = res.data.data.audited_fields.has_pay == "1" ? true : false;

              this.audited_fieldsxx.agency = res.data.data.audited_fields.agency == "1" ? true : false;
              this.audited_fieldsxx.agency_person = res.data.data.audited_fields.agency_person == "1" ? true : false;
              this.audited_fieldsxx.agency_price = res.data.data.audited_fields.agency_price == "1" ? true : false;
              this.audited_fieldsxx.agency_tel = res.data.data.audited_fields.agency_tel == "1" ? true : false;

              if (res.data.data.unit_price != "") {
                this.priceLen = res.data.data.unit_price[0].length;
              }
              if (res.data.data.pay_type != "") {
                this.payForLen = res.data.data.pay_type[0].length;
              }
              if (res.data.data.pay_method != "") {
                this.payTypeLen = res.data.data.pay_method[0].length;
              }
              if (res.data.data.pay_use != "") {
                this.payUseLen = res.data.data.pay_use[0].length;
              }
              if (this.repairDetail.has_extra == 1) {
                this.repairDetail.has_extra = "是";
              } else {
                this.repairDetail.has_extra = "否";
              }
            } else {
              this.$notify.warning({
                title: "警告",
                message: res.data.msg
              });
            }
          });
      },
      confirmAdd() {
        this.audited_fields.contract_day = this.audited_fields.contract_month;
        this.audited_fields.guarantee_day = this.audited_fields.guarantee_month;
        this.$http
          .put(globalConfig.server + "contract/feedback", {
            id: this.form.id,
            audited_fields: this.audited_fields
          })
          .then(res => {
            if (res.data.code === "1212200") {
              this.repairDetailDialogVisible = false;
              this.$notify.success({
                title: "成功",
                message: res.data.msg
              });
            } else {
              this.$notify.warning({
                title: "警告",
                message: res.data.msg
              });
            }
          });
      }
    }
  };
</script>
<style lang="scss" scoped>
  #addFollowUp {
    @mixin flex {
      display: flex;
      display: -webkit-flex;
    }
    .wholeStyle {
      margin-left: 8.333333%;
    }
    .content {
      padding: 0 10px;
      min-height: 28px;
      background: #eef3fc;
      border-radius: 4px;
      font-size: 12px;
      color: #727479;
    }
    .addicon {
      font-size: 20px;
      line-height: 28px;
      margin-left: 28px;
      cursor: pointer;
    }
    .detailTitle {
      label {
        width: 60px !important;
        margin-left: 20px;
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
        height: 28px;
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
