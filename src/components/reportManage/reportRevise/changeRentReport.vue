<template>
  <div id="addHouseResources">
    <el-dialog :close-on-click-modal="false" title="调房报备" :visible.sync="changeRentReportVisible" width="70%">
      <div style="min-height: 550px" class="scroll_bar"
           v-loading="fullLoading"
           element-loading-text="拼命加载中"
           element-loading-spinner="el-icon-loading"
           element-loading-background="rgba(255, 255, 255, 0)">
        <el-form size="mini" :model="params" label-width="120px">

          <el-row>
            <el-col :span="8">
              <el-form-item label="原房屋地址" required>
                <el-input placeholder="请选择原房屋地址" v-model="params.old_house_name" disabled></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="原开单人" required="">
                <el-input placeholder="原开单人" v-model="params.old_staff_name" disabled></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="原付款方式" required="">
                <div v-for="item in params.old_pay_way_arr" class="disabledClass">
                  {{item}}
                </div>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="8">
              <el-form-item label="原月单价" required="">
                <div v-for="item in params.old_price" class="disabledClass">
                  {{item}}
                </div>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="定金" required="">
                <el-input placeholder="定金" v-model="params.old_money_sum" disabled>
                  <template slot="append">元</template>
                </el-input>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row>
            <el-col :span="8">
              <el-form-item label="现房屋地址" required>
                <el-input placeholder="请选择现房屋地址" v-model="params.address" @focus="selectHouse" readonly=""></el-input>
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
              <el-form-item label="已收金额" required="">
                <el-input placeholder="已收金额" v-model="params.money_sum">
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
                  <el-form-item label="支付方式" required="">
                    <el-select clearable v-model="params.money_way[item-1]" placeholder="请选择支付方式" value="">
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
          </el-row>
          <el-row>

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
              <el-form-item label="尾款补齐日期" required="">
                <el-date-picker value-format="yyyy-MM-dd" type="date" placeholder="选择日期"
                                v-model="params.retainage_date"></el-date-picker>
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
              <el-col :span="12" v-for="item in receiptAmount" :key="item">
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
        <el-button size="small" @click="changeRentReportVisible = false">取 消</el-button>
        <el-button size="small" type="primary" @click="confirmSubmit">确 定</el-button>
      </span>
    </el-dialog>
    <Organization :organizationDialog="organizationDialog" :length="length" :type="type"
                  @close='closeModal' @selectMember="selectMember"></Organization>

    <CollectSearch :collectDialog="collectDialog" @close='closeModal'></CollectSearch>
  </div>
</template>

<script>
  import UpLoad from '../../common/UPLOAD.vue'
  import Organization from '../../common/organization.vue'
  import CollectSearch from '../../common/collectSearch.vue'

  export default {
    components: {UpLoad, Organization, CollectSearch},
    props: ['changeRentReport', 'reportDetailData', 'processableId', 'reportId'],
    data() {
      return {
        changeRentReportVisible: false,
        isClear: false,
        organizationDialog: false,
        collectDialog: false,
        fullLoading: false,
        length: '',
        type: '',
        selectType: '',
        receiptDate: '',

        params: {
          old_staff_name: '',
          old_pay_way_arr: [''],
          old_price: [''],
          old_money_sum: '',
          old_house_name: '',

          address: '',
          id: '',
          processable_id: '',
          draft: 0,
          contract_id_rent: '',         //原租房合同id
          contract_id: '',              //现房屋合同id
          house_id_rent: '',
          house_id: '',
          room_id: '',                  //合租房间ID
          rooms_mate: [],               //合租房间
          month: '',                    //签约时长
          day: '',                      //签约时长天
          begin_date: '',               //合同开始日期
          end_date: '',                 //合同结束日期
          price_arr: [''],              //月单价
          period_price_arr: [''],       //月单价周期

          pay_way_bet: '',              //付款方式 押

          pay_way_arr: [''],            //付款方式 付
          period_pay_arr: [''],         //付款方式周期

          money_sum: '',                //总金额
          money_sep: [''],              //分金额
          money_way: [''],              //分金额 方式

          discount: 0,                   //让价金额
          contract_number: 'LJZF',           //合同编号
          is_corp: 1,                   //是否公司单  0个人1公司
          receipt: [''],                    //收据编号
          retainage_date: '',           //尾款补齐时间

          is_other_fee: 0,
          other_fee: '',
          other_fee_name: '',

          screenshot_leader: [],        //领导截图 数组
          screenshot: [],               //领导截图 数组
          photo: [],                    //合同照片 数组
          deposit_photo: [],        //领导截图 数组
          remark: '',                   //备注
          staff_id: '',                 //开单人id
          department_id: '',            //部门id
          staff_name: '',               //开单人name
          department_name: '',          //部门name
        },
        screenshot_leader: {},
        screenshot: {},
        photo: {},
        deposit_photo : {},

        priceChangeAmount: 1,
        payWayChangeAmount: 1,
        moneyTableChangeAmount: 1,
        receiptAmount: 1,
        purchase_way_dic: [],
        isUpload : false,
      };
    },
    watch: {
      changeRentReport(val) {
        this.changeRentReportVisible = val
      },
      changeRentReportVisible(val) {
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

      },
      //预填报备数据
      preloadData() {
        let data = this.reportDetailData;
        console.log(data);
        this.params.processable_id = this.reportId;

        this.params.id = data.id;
        this.params.contract_id = data.contract_id;
        this.params.house_id = data.house_id;
        this.params.contract_id_rent = data.contract_id_rent;
        this.params.house_id_rent = data.house_id_rent;

        this.params.old_house_name = data.old_house_name;
        this.params.old_staff_name = data.old_staff_name;
        this.params.old_pay_way_arr = data.old_pay_way_arr;
        this.params.old_price = data.old_price;
        this.params.old_money_sum = data.old_money_sum;

        this.params.address = data.address;
        this.params.month = data.month;
        this.params.day = data.day === '0' ? '' : data.day;
        this.params.contract_number = data.contract_number === '' ? 'LJZF' : data.contract_number;
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
        this.params.money_sep = data.money_sep;
        this.params.money_way = data.money_way;

        this.params.discount = data.discount;

        this.params.other_fee_name = data.other_fee_name;
        this.params.other_fee = data.other_fee;


        this.params.is_corp = String(data.is_corp.id);
        this.params.property = data.property;

        this.params.is_other_fee = String(data.is_other_fee);


        this.params.retainage_date = data.retainage_date;

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
        this.collectDialog = true;
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
        this.collectDialog = false;
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
        if(!this.isUpload){
          this.params.contract_number = this.params.contract_number === 'LJZF' ? '' : this.params.contract_number;
          this.$http.post(globalConfig.server + 'bulletin/change', this.params).then((res) => {
            if (res.data.code === '50530') {
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
        }else {
          this.$notify.warning({
            title:'警告',
            message:'图片正在上传',
          })
        }
      },
      clearData() {
        this.isClear = false;
        this.params = {
          old_staff_name: '',
          old_pay_way_arr: [''],
          old_price: [''],
          old_money_sum: '',
          old_house_name: '',

          address: '',
          id: '',
          processable_id: '',
          draft: 0,
          contract_id_rent: '',         //原租房合同id
          contract_id: '',              //现房屋合同id
          house_id_rent: '',
          house_id: '',
          room_id: '',                  //合租房间ID
          rooms_mate: [],               //合租房间
          month: '',                    //签约时长
          day: '',                      //签约时长天
          begin_date: '',               //合同开始日期
          end_date: '',                 //合同结束日期
          price_arr: [''],              //月单价
          period_price_arr: [''],       //月单价周期

          pay_way_bet: '',              //付款方式 押

          pay_way_arr: [''],            //付款方式 付
          period_pay_arr: [''],         //付款方式周期

          money_sum: '',                //总金额
          money_sep: [''],              //分金额
          money_way: [''],              //分金额 方式

          discount: 0,                   //让价金额
          contract_number: 'LJZF',           //合同编号
          is_corp: 1,                   //是否公司单  0个人1公司
          receipt: [''],                    //收据编号
          retainage_date: '',           //尾款补齐时间

          is_other_fee: 0,
          other_fee: '',
          other_fee_name: '',

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

  .disabledClass {
    background: #f5f7fa;
    border-radius: 4px;
    min-height: 28px;
    padding: 0 15px;
    cursor: not-allowed
  }
</style>
