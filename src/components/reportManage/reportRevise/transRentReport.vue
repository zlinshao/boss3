<template>
  <div id="addHouseResources">
    <el-dialog :close-on-click-modal="false" title="转租报备" :visible.sync="transRentReportVisible" width="70%">
      <div style="min-height: 550px" class="scroll_bar"
           v-loading="fullLoading"
           element-loading-text="拼命加载中"
           element-loading-spinner="el-icon-loading"
           element-loading-background="rgba(255, 255, 255, 0)">
        <el-form size="mini" :model="params" label-width="120px">
          <el-row>
            <el-col :span="8">
              <el-form-item label="转租类型" required="">
                <el-radio v-model="params.trans_type" label="0">公司</el-radio>
                <el-radio v-model="params.trans_type" label="1">个人</el-radio>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="8">
              <el-form-item label="房屋地址" required>
                <el-input placeholder="请选择房屋地址" v-model="params.address" @focus="selectHouse" readonly=""></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="签约日期" required>
                <el-date-picker value-format="yyyy-MM-dd" type="date" placeholder="选择签约日期"
                                v-model="params.sign_date"></el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :span="8" class="">
              <el-form-item label="签约时长" required>
                <el-col :span="12" style="padding-right: 10px">
                  <el-input placeholder="月数" @blur="changeMonth" v-model="params.month">
                    <template slot="append">月</template>
                  </el-input>
                </el-col>
                <el-col :span="12">
                  <el-input placeholder="天数" v-model="params.day" @blur="computedEndDate">
                    <template slot="append">天</template>
                  </el-input>
                </el-col>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="8">
              <el-form-item label="合同开始时间" required="">
                <el-date-picker value-format="yyyy-MM-dd" type="date" placeholder="选择日期"
                                v-model="params.begin_date" @blur="computedEndDate"></el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="合同结束时间" required="">
                <el-date-picker value-format="yyyy-MM-dd" type="date" placeholder="选择日期"
                                v-model="params.end_date"></el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="总金额" required="">
                <el-input placeholder="总金额" v-model="params.money_sum" disabled>
                  <template slot="append">元</template>
                </el-input>
              </el-form-item>
            </el-col> 
            <el-col :span="8">
              <el-form-item label="押金" required="">
                <el-input placeholder="押金" v-model="params.deposit_payed" @keyup.native="addMoneySum(params)">
                  <template slot="append">元</template>
                </el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="定金" required="">
                <el-input placeholder="定金" v-model="params.front_money" @keyup.native="addMoneySum(params)">
                  <template slot="append">元</template>
                </el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="租金" required="">
                <el-input placeholder="租金" v-model="params.rent_money" @keyup.native="addMoneySum(params)">
                  <template slot="append">元</template>
                </el-input>
              </el-form-item>
            </el-col>
          </el-row>

          <div class="title">月单价</div>
          <div class="form_border">
            <div v-for="item in priceChangeAmount">
              <el-row>
                <el-col :span="6">
                  <el-form-item label="月单价" required="">
                    <el-input placeholder="请输入内容" v-model="params.price_arr[item-1]"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="6">
                  <el-form-item label="变化周期(月)" required="">
                    <el-input placeholder="请输入内容" :disabled="priceChangeAmount<2"
                              v-model="params.period_price_arr[item-1]"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="6" v-if="item>1">
                  <div class="deleteNumber">
                    <span @click="deletePriceChange(item-1)">删除</span>
                  </div>
                </el-col>
              </el-row>
            </div>
            <div style="text-align: center">
              <el-button type="text" :disabled="!params.month" @click="addMorePriceChange">
                <i class="el-icon-circle-plus"></i>添加月单价变化
              </el-button>
            </div>
          </div>

          <div class="title">付款方式</div>
          <div class="form_border">
            <div v-for="item in payWayChangeAmount">
              <el-row>
                <el-col :span="6">
                  <el-form-item label="押" required="">
                    <el-select clearable v-model="params.pay_way_bet" :disabled="item>1" placeholder="请选择付款方式" value="">
                      <el-option v-for="item in 3" :value="item-1"
                                 :key="item-1"></el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :span="6">
                  <el-form-item label="付" required="">
                    <el-input placeholder="请输入内容"
                              v-model="params.pay_way_arr[item-1]"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="6">
                  <el-form-item label="变化周期(月)" required="">
                    <el-input placeholder="请输入内容" :disabled="payWayChangeAmount<2"
                              v-model="params.period_pay_arr[item-1]"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="6" v-if="item>1">
                  <div class="deleteNumber">
                    <span @click="deletePayWayChange(item-1)">删除</span>
                  </div>
                </el-col>
              </el-row>
            </div>
            <div style="text-align: center">
              <el-button type="text" :disabled="!params.month" @click="addMorePayWayChange">
                <i class="el-icon-circle-plus"></i>添加付款方式变化
              </el-button>
            </div>
          </div>

          <div class="title">金额+支付方式</div>
          <div class="form_border">
            <div v-for="item in moneyTableChangeAmount">
              <el-row>
                <el-col :span="6">
                  <el-form-item label="汇款银行" required="">
                    <el-select clearable v-model="params.money_way[item-1]" placeholder="请选择汇款银行" value="">
                      <el-option v-for="item in purchase_way_dic" :label="item.dictionary_name" :value="item.id"
                                 :key="item.id"></el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :span="6">
                  <el-form-item label="金额（元）" required="">
                    <el-input placeholder="请输入内容" v-model="params.money_sep[item-1]"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="6" v-if="item>1">
                  <div class="deleteNumber">
                    <span @click="deleteMoneyTableChange(item-1)">删除</span>
                  </div>
                </el-col>
              </el-row>
            </div>
            <div style="text-align: center">
              <el-button type="text" @click="addMoreMoneyTableChange">
                <i class="el-icon-circle-plus"></i>添加支付方式变化
              </el-button>
            </div>
          </div>

          <el-row>
            <el-col :span="6">
              <el-form-item label="是否有其他金额" required="">
                <el-switch v-model="params.is_other_fee" active-value="1" inactive-value="0"></el-switch>
              </el-form-item>
            </el-col>
            <el-col :span="6" v-if="params.is_other_fee == 1">
              <el-form-item label="费用名称" required="">
                <el-input placeholder="请输入费用名称" v-model="params.other_fee_name"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="6" v-if="params.is_other_fee == 1">
              <el-form-item label="费用金额" required="">
                <el-input placeholder="请输入费用金额" v-model="params.other_fee"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="物业费承担方" required="">
                <el-select clearable v-model="params.property_payer" placeholder="请选择承担方" value="">
                  <el-option v-for="item in property_payer_dic" :label="item.dictionary_name" :value="item.id"
                             :key="item.id"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <!-- <el-col :span="6">
              <el-form-item label="押金" required="">
                <el-input placeholder="请输入押金" v-model="params.deposit"></el-input>
              </el-form-item>
            </el-col> -->
            <el-col :span="6">
              <el-form-item label="让总价金额" required="">
                <el-input placeholder="请输入让总价金额" v-model="params.discount"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="是否公司单" required="">
                <el-switch v-model="params.is_corp" active-value="1" inactive-value="0"></el-switch>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="是否中介" required="">
                <el-switch v-model="params.is_agency" active-value="1" inactive-value="0"></el-switch>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row v-if="params.is_agency == 1">
            <el-col :span="6">
              <el-form-item label="中介名称" required="">
                <el-input placeholder="请输入中介名称" v-model="params.agency_name"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="中介费" required="">
                <el-input placeholder="请输入中介费" v-model="params.agency_price"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="中介人" required="">
                <el-input placeholder="请输入中介人" v-model="params.agency_user_name"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="中介人联系方式" required="">
                <el-input placeholder="请输入中介人联系方式" v-model="params.agency_phone"></el-input>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row>
            <el-col :span="6">
              <el-form-item label="尾款补齐日期" required="">
                <el-date-picker value-format="yyyy-MM-dd" type="date" placeholder="选择日期"
                                v-model="params.retainage_date"></el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="客户姓名" required="">
                <el-input placeholder="请输入客户姓名" v-model="params.name"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="联系方式" required="">
                <el-input placeholder="请输入联系方式" v-model="params.phone"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="合同编号" required="">
                <el-input placeholder="请输入合同编号" v-model="params.contract_number"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <div class="title">收据编号</div>
          <div class="form_border">
            <el-row>
              <el-col :span="12">
                <el-form-item label="是否电子收据" required="">
                  <el-switch v-model="is_receipt" disabled></el-switch>
                </el-form-item> 
              </el-col>
              <el-col :span="12" v-for="item in receiptAmount" :key="item">
                <div v-if="params.is_receipt=='0'">
                <el-col :span="12">
                  <el-form-item label="收据编号" required="">
                    <el-input placeholder="请输入内容" v-model="params.receipt[item-1]"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="12" v-if="item>1">
                  <div class="deleteNumber">
                    <span @click="deleteReceiptAmount(item-1)">删除</span>
                  </div>
                </el-col>
                </div>
              </el-col>
            </el-row>
            <div style="text-align: center">
              <el-button type="text" @click="addReceiptAmount">
                <i class="el-icon-circle-plus"></i>添加收据编号
              </el-button>
            </div>
          </div>
          <el-form-item label="领导同意截图">
            <UpLoad :ID="'rent_report_leader'" :isClear="isClear" :editImage="screenshot_leader"
                    @getImg="getImg"></UpLoad>
          </el-form-item>
          <el-form-item label="凭证截图" required="">
            <UpLoad :ID="'rent_report_certificate'" :isClear="isClear" :editImage="screenshot"
                    @getImg="getImg"></UpLoad>
          </el-form-item>
          <el-form-item label="合同照片">
            <UpLoad :ID="'rent_report_contract'" :isClear="isClear" :editImage="photo" @getImg="getImg"></UpLoad>
          </el-form-item>
          <el-form-item label="押金收条">
            <UpLoad :ID="'rent_report_deposit'" :isClear="isClear" :editImage="deposit_photo" @getImg="getImg"></UpLoad>
          </el-form-item>

          <el-row>
            <el-col :span="12">
              <el-form-item label="备注" required="">
                <el-input type="textarea" placeholder="请输入备注" v-model="params.remark"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="开单人" required="">
                <el-input placeholder="请输入内容" @focus="openOrganizeModal('staff')" readonly=""
                          v-model="params.staff_name"></el-input>
              </el-form-item>
            </el-col>

            <el-col :span="6">
              <el-form-item label="部门" required="">
                <el-input placeholder="请输入内容" @focus="openOrganizeModal('depart')" readonly=""
                          v-model="params.department_name"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button size="small" @click="transRentReportVisible = false">取 消</el-button>
        <el-button size="small" type="primary" @click="confirmSubmit">确 定</el-button>
      </span>
    </el-dialog>
    <Organization :organizationDialog="organizationDialog" :length="length" :type="type"
                  @close='closeModal' @selectMember="selectMember"></Organization>

    <RentSearch :rentDialog="rentDialog" @close='closeModal'></RentSearch>
  </div>
</template>

<script>
  import UpLoad from '../../common/UPLOAD.vue'
  import Organization from '../../common/organization.vue'
  import RentSearch from '../../common/rentSearch.vue'

  export default {
    components: {UpLoad, Organization, RentSearch},
    props: ['transRentReport', 'reportDetailData', 'processableId', 'reportId'],
    data() {
      return {
        transRentReportVisible: false,
        isClear: false,
        organizationDialog: false,
        rentDialog: false,
        fullLoading: false,
        length: '',
        type: '',
        selectType: '',
        receiptDate: '',

        params: {
          address: '',
          id: '',
          processable_id: '',
          type: 2,
          trans_type: '0',
          draft: 0,
          contract_id: '',              //合同id
          house_id: '',                 //房屋地址id
          discount: '',                  //让价总金额

          month: '',                    //租房月数
          day: '',                      //租房天数
          sign_date: '',                //签约开始日期
          end_date: '',                 //签约结束日期
          begin_date: '',               //合同开始日期

          price_arr: [''],              //月单价
          period_price_arr: [''],       //月单价周期

          pay_way_bet: '',              //付款方式 押

          pay_way_arr: [''],            //付款方式 付
          period_pay_arr: [''],         //付款方式周期

          money_sum: '',                //总金额
          front_money:'',               //定金
          rent_money:'',                //租金
          deposit_payed: '',                  //押金
          money_sep: [''],              //分金额
          money_way: [''],              //分金额 方式

          is_receipt: "1",              //是否电子收据

          is_other_fee: '0',
          other_fee: '',
          other_fee_name: '',

          
          is_agency: '1',                //客户来源    0个人1中介
          agency_name: '',              //中介名
          agency_price: '',             //中介费
          agency_user_name: '',         //中介人
          agency_phone: '',             //中介手机号

          is_corp: '1',                   //是否公司单  0个人1公司
          contract_number: 'LJZF',      //合同编号

          receipt: [],                //收据编号
          property_payer: '',           //物业费付款人
          retainage_date: '',           //尾款补齐时间
          name: '',                     //客户姓名
          phone: '',                    //电话号码
          screenshot_leader: [],        //领导截图 数组
          screenshot: [],               //领导截图 数组
          photo: [],                    //合同照片 数组
          deposit_photo: [],        //领导截图 数组
          remark: '',                   //备注
          staff_id: '',                 //开单人id
          department_id: '',            //部门id
          staff_name: '',               //开单人name
          department_name: '',          //部门name

          account_id:'',            
          real_pay_at:''
        },
        is_receipt: false,
        screenshot_leader: {},
        screenshot: {},
        photo: {},
        deposit_photo: {},
        priceChangeAmount: 1,
        payWayChangeAmount: 1,
        moneyTableChangeAmount: 1,
        receiptAmount: 1,
        purchase_way_dic: [],
        property_payer_dic: [],
        isUpload: false,
      };
    },
    watch: {
      is_receipt(val) {
        this.params.is_receipt = val ? "1" : "0";
      },
      transRentReport(val) {
        this.transRentReportVisible = val
      },
      transRentReportVisible(val) {
        if (!val) {
          this.$emit('close');
          this.clearData();
        } else {
          this.isClear = true;
          setTimeout(() => {
            this.preloadData();
          }, 50);

        }
      },
    },
    created() {
      this.getDictionary();
    },
    methods: {
      getDictionary() {
        this.dictionary(508, 1).then((res) => {
          this.purchase_way_dic = res.data;
        });
        this.dictionary(449, 1).then((res) => {
          this.property_payer_dic = res.data;
        });
      },
      //预填报备数据
      preloadData() {
        let data = this.reportDetailData;
        console.log(data);
        this.params.processable_id = this.reportId;
        this.params.id = data.id;
        if (data.trans_type.id) {
          this.params.trans_type = String(data.trans_type.id);
        } else {
          this.params.trans_type = String(data.trans_type);
        }
        this.params.contract_id = data.contract_id;
        this.params.house_id = data.house_id;

        this.params.address = data.address;
        this.params.month = data.month;
        this.params.day = data.day === '0' ? '' : data.day;
        this.params.contract_number = data.contract_number === '' ? 'LJZF' : data.contract_number;
        this.params.sign_date = data.sign_date;
        this.params.begin_date = data.begin_date;
        this.params.end_date = data.end_date;

        this.priceChangeAmount = data.price_arr.length;
        this.payWayChangeAmount = data.pay_way_arr.length;
        this.moneyTableChangeAmount = data.money_sep.length;

        this.params.price_arr = data.price_arr;
        this.params.period_price_arr = data.period_price_arr;

        this.params.pay_way_bet = data.pay_way_bet;
        this.params.pay_way_arr = data.pay_way_arr;
        this.params.period_pay_arr = data.period_pay_arr;

        this.params.money_sum = data.money_sum;
        this.params.front_money = data.front_money;
        this.params.rent_money = data.rent_money;

        this.params.money_sep = data.money_sep;
        this.params.money_way = data.money_way;

        this.params.deposit_payed = data.deposit_payed;
        this.params.discount = data.discount;

        this.params.other_fee_name = data.other_fee_name;
        this.params.other_fee = data.other_fee;

        this.params.account_id = data.account_id;
        this.params.real_pay_at = data.real_pay_at;

        if (data.is_agency) {
          if (data.is_agency.name) {
            this.params.is_agency = String(data.is_agency.id);
          } else {
            this.params.is_agency = String(data.is_agency);
          }
        } else {
          this.params.is_agency = '0';
        }
        this.params.agency_name = data.agency_name;
        this.params.agency_price = data.agency_price;
        this.params.agency_user_name = data.agency_user_name;
        this.params.agency_phone = data.agency_phone;

        if (data.is_receipt) {
        if (data.is_receipt.name) {
            this.params.is_receipt = String(data.is_receipt.id);
            this.is_receipt = String(data.is_receipt.id) === "1" ? true : false;
          } else {
            this.params.is_receipt = String(data.is_receipt);
            this.is_receipt = String(data.is_receipt) === "1" ? true : false;
          }
        } else {
          this.params.is_receipt = "0";
          this.is_receipt = false;
        }

        if (data.is_corp) {
          if (data.is_corp.name) {
            this.params.is_corp = String(data.is_corp.id);
          } else {
            this.params.is_corp = String(data.is_corp);
          }
        } else {
          this.params.is_corp = '0';
        }
        this.params.property = data.property;

        this.params.is_other_fee = String(data.is_other_fee);
        this.params.property_payer = data.property_payer.id;


        this.params.retainage_date = data.retainage_date;
        this.params.name = data.name;
        this.params.phone = data.phone;

        this.screenshot = this.getImgObject(data.screenshot);
        this.params.screenshot = this.getImgIdArray(data.screenshot);

        this.photo = this.getImgObject(data.photo);
        this.params.photo = this.getImgIdArray(data.photo);

        this.screenshot_leader = this.getImgObject(data.screenshot_leader);
        this.params.screenshot_leader = this.getImgIdArray(data.screenshot_leader);

        this.deposit_photo = this.getImgObject(data.deposit_photo);
        this.params.deposit_photo = this.getImgIdArray(data.deposit_photo);

        this.params.remark = data.remark;

        this.params.staff_id = data.staff_id;
        this.params.staff_name = data.staff_name;
        this.params.department_id = data.department_id;
        this.params.department_name = data.department_name;

        if (data.receipt && typeof(data.receipt) === 'string') {
          this.params.receipt.push(data.receipt)
        } else if (Array.isArray(data.receipt) && data.receipt.length > 0) {
          this.receiptAmount = data.receipt.length;
          data.receipt.forEach((item) => {
            if (typeof item === 'string') {
              this.params.receipt.push(item);
            } else if (item.number) {
              this.params.receipt.push(item.number);
            }
          })
        } else {
          this.receiptNum();
        }
      },
      //详情照片展示
      getImgObject(data) {
        let img = {};
        if (data && data.constructor === Object) {
          let imgArray = data.pic_addresses;
          if (imgArray.length > 0) {
            imgArray.forEach((item) => {
              this.$set(img, item.id, item.uri)
            });
          }
        }
        return img;
      },
      getImgIdArray(data) {
        let img = [];
        if (data && data.constructor === Object) {
          let imgArray = data.pic_addresses;
          if (imgArray.length > 0) {
            imgArray.forEach((item) => {
              img.push(item.id);
            });
          }
        }
        return img;
      },

      //打开房屋选择模态框
      selectHouse() {
        this.rentDialog = true;
      },
      //调出选人组件
      openOrganizeModal(val) {
        this.selectType = val;
        this.type = val === 'depart' ? 'depart' : 'staff';
        this.organizationDialog = true;
        this.length = 1;
      },
      //选人组件回调
      selectMember(val) {
        if (this.selectType === 'staff') {
          this.params.staff_id = val[0].id;
          this.params.staff_name = val[0].name;
          if (val[0].org.length > 0) {
            this.params.department_id = val[0].org[0].id;
            this.params.department_name = val[0].org[0].name;
          }
        } else if (this.selectType === 'depart') {
          this.params.department_id = val[0].id;
          this.params.department_name = val[0].name;
        }
      },

      //月单价变化
      addMorePriceChange() {
        this.priceChangeAmount++;
      },
      deletePriceChange(item) {
        this.params.price_arr.splice(item, 1);
        this.params.period_price_arr.splice(item, 1);
        this.priceChangeAmount--;
      },
      //付款方式变化
      addMorePayWayChange() {
        this.payWayChangeAmount++;
      },
      deletePayWayChange(item) {
        this.params.pay_way_arr.splice(item, 1);
        this.params.period_pay_arr.splice(item, 1);
        this.payWayChangeAmount--;
      },
      //jine bianhua
      addMoreMoneyTableChange() {
        this.moneyTableChangeAmount++;
      },
      deleteMoneyTableChange(item) {
        this.params.money_way.splice(item, 1);
        this.params.money_sep.splice(item, 1);
        this.moneyTableChangeAmount--;
      },

      addReceiptAmount() {
        this.receiptAmount++;
        this.params.receipt.push(this.receiptDate);

      },
      deleteReceiptAmount(item) {
        this.params.receipt.splice(item, 1);
        this.receiptAmount--;
      },

      //改变收房月数
      changeMonth() {
        this.computedEndDate();
        this.params.period_price_arr[0] = this.params.month;
        this.params.period_pay_arr[0] = this.params.month;

        this.params.price_arr.splice(1, this.params.price_arr.length);
        this.params.pay_way_arr.splice(1, this.params.pay_way_arr.length);
        this.priceChangeAmount = 1;
        this.payWayChangeAmount = 1;
      },
      //计算空置期结束时间
      computedEndDate() {
        this.params.day = this.params.day ? this.params.day : 0;
        let params = {};
        params.begin_date = this.params.begin_date;
        params.month = this.params.month;
        params.day = this.params.day;
        params.type = 2;
        this.$http.get(globalConfig.server + 'bulletin/helper/calcdate', {
          params: params
        }).then((res) => {
          if (res.data.code === '51110') {
            this.params.end_date = res.data.data;
          }
        })
      },

      //关闭模态框
      closeModal(val) {
        this.rentDialog = false;
        this.organizationDialog = false;
        if (val) {
          this.params.address = val.address;
          this.params.contract_id = val.contract_id;
          this.params.house_id = val.house_id;
        }
      },

      getImg(val) {
        this.isUpload = val[2];
        if (val[0] === 'rent_report_leader') {
          this.params.screenshot_leader = val[1];
        } else if (val[0] === 'rent_report_certificate') {
          this.params.screenshot = val[1];
        } else if (val[0] === 'rent_report_contract') {
          this.params.photo = val[1];
        } else if (val[0] === 'rent_report_deposit') {
          this.params.deposit_photo = val[1];
        }
      },
      // 收据编号默认城市
      receiptNum() {
        this.params.receipt = [];
        this.$http.get(globalConfig.server + 'setting/others/ip_address').then((res) => {
          if (res.data.code === '1000120') {
            this.receiptDate = res.data.data.py + res.data.data.year;
            this.params.receipt.push(this.receiptDate);
          }
        });
      },
      confirmSubmit() {
        if (!this.isUpload) {
          this.params.contract_number = this.params.contract_number === 'LJZF' ? '' : this.params.contract_number;
          this.$http.post(globalConfig.server + 'bulletin/rent', this.params).then((res) => {
            if (res.data.code === '50230') {
              this.$notify.success({
                title: '成功',
                message: res.data.msg
              });
              this.$emit('close', 'success')
            } else {
              this.$notify.warning({
                title: '警告',
                message: res.data.msg
              })
            }
          })
        } else {
          this.$notify.warning({
            title: '警告',
            message: '图片正在上传',
          })
        }
      },
      clearData() {
        this.isClear = false;
        this.params = {
          address: '',
          id: '',
          processable_id: '',
          trans_type: '0',
          type: 2,
          draft: 0,
          contract_id: '',              //合同id
          house_id: '',                 //房屋地址id
          discount: '',                  //让价总金额

          month: '',                    //租房月数
          day: '',                      //租房天数
          sign_date: '',                //签约开始日期
          end_date: '',                 //签约结束日期
          begin_date: '',               //合同开始日期

          price_arr: [''],              //月单价
          period_price_arr: [''],       //月单价周期

          pay_way_bet: '',              //付款方式 押

          pay_way_arr: [''],            //付款方式 付
          period_pay_arr: [''],         //付款方式周期

          money_sum: '',                //总金额
          money_sep: [''],              //分金额
          money_way: [''],              //分金额 方式

          is_other_fee: '0',
          other_fee: '',
          other_fee_name: '',

          deposit: '',                  //押金
          is_agency: '1',                //客户来源    0个人1中介
          agency_name: '',              //中介名
          agency_price: '',             //中介费
          agency_user_name: '',         //中介人
          agency_phone: '',             //中介手机号

          is_corp: '1',                   //是否公司单  0个人1公司
          contract_number: 'LJZF',      //合同编号

          receipt: [],                //收据编号
          property_payer: '',           //物业费付款人
          retainage_date: '',           //尾款补齐时间
          name: '',                     //客户姓名
          phone: '',                    //电话号码
          screenshot_leader: [],        //领导截图 数组
          screenshot: [],               //领导截图 数组
          photo: [],                    //合同照片 数组
          deposit_photo: [],        //领导截图 数组
          remark: '',                   //备注
          staff_id: '',                 //开单人id
          department_id: '',            //部门id
          staff_name: '',               //开单人name
          department_name: '',          //部门name
        };
        this.screenshot_leader = {};
        this.screenshot = {};
        this.photo = {};
        this.deposit_photo = {};

        this.priceChangeAmount = 1;
        this.payWayChangeAmount = 1;
        this.moneyTableChangeAmount = 1;
        this.receiptAmount = 1;

        this.length = '';
        this.type = '';
        this.selectType = '';
        this.receiptDate = '';
        this.isUpload = false;
      },
    },
  };
</script>
<style lang="scss" scoped="">
  .deleteNumber {
    text-align: center;
    cursor: pointer;
    margin-top: 2px;
    color: #409EFF;
    &:hover {
      color: #6a8dfb;
    }
  }
</style>
