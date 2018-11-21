<template>
  <div id="addFinalPayment">
    <el-dialog :close-on-click-modal="false" title="尾款报备修改" :visible.sync="finalPaymentVisible" width="70%">
      <div style="min-height: 550px" class="scroll_bar"
           v-loading="fullLoading"
           element-loading-text="拼命加载中"
           element-loading-spinner="el-icon-loading"
           element-loading-background="rgba(255, 255, 255, 0)">
        <el-form size="mini" :model="params" label-width="120px" >
          <el-row>
            <el-col :span="6" >
              <el-form-item label="房屋地址" required>
                <el-input placeholder="请选择房屋地址" @focus="selectHouse"  v-model="params.address"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="6" >
              <el-form-item label="客户姓名" required>
                <el-input  v-model="params.customer_name" disabled></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="6" >
              <el-form-item label="租房月数" required>
                <el-input  v-model="params.month" disabled></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="6" >
              <el-form-item label="付款方式" v-for="(item, index) in params.payWay" :key="index" required>
                <el-input v-model="params.payWay[index]"   disabled></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="6" >
              <el-form-item label="月单价" v-for="(item, index) in params.price_arr" :key="index" required>
                <el-input v-model="params.price_arr[index]"   disabled></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="6" >
              <el-form-item label="房租期数" required>
                <el-input v-model="params.terms"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="6" >
              <el-form-item label="定金" required>
                <el-input v-model="params.front_money" @input="countMoney"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="6" >
              <el-form-item label="押金" required>
                <el-input v-model="params.deposit_payed" @input="countMoney"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="6" >
              <el-form-item label="租金" required>
                <el-input v-model="params.rent_money" @input="countMoney"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="6" >
              <el-form-item label="总金额" required>
                <el-input v-model="params.money_sum" disabled></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row v-for="(item, index) in amountMoney" :key="index">
            <el-col :span="6" >
              <el-form-item label="分金额" required>
                <el-input v-model="params.money_sep[index]"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="6" >
              <el-form-item label="实际收款时间" required>
                <el-date-picker
                    v-model="params.real_pay_at[index]"
                    value-format="yyyy-MM-dd"
                    type="date"
                    placeholder="选择日期">
                </el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :span="6" >
                <el-form-item label="汇款账户" required @click="selectShow(1, index)">
                    <el-select v-model="params.money_way[index]" placeholder="请选择" @click="selectShow(1, index)">
                        <el-option v-for="item in value8" :value="item" :key="item">
                        </el-option>
                    </el-select>
                </el-form-item>
            </el-col>
            <el-button v-if='amountMoney > 1'  @click='deleteAmount(index)' class="delete">删除</el-button>
          </el-row>
          <el-form-item class="addPayType">
              <el-button   @click="addAmount">+支付方式变化</el-button>
          </el-form-item>
          <el-row>
              <el-col :span="6" class="switch">
                <span>是否有其他金额</span>
                <el-switch v-model="other_fee_status" active-color="#409EFF" inactive-color="#dcdfe6"></el-switch>
              </el-col>
              <el-col :span="6" v-if="other_fee_status">
                <el-form-item label="费用名称" required>
                    <el-input v-model="params.other_fee_name"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="6" v-if="other_fee_status">
                <el-form-item label="费用金额" required>
                    <el-input v-model="params.other_fee"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="6" >
              <el-form-item label="尾款补齐日期" required>
                <el-date-picker
                    v-model="params.retainage_date"
                    value-format="yyyy-MM-dd"
                    type="date"
                    placeholder="选择日期">
                </el-date-picker>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
              <el-col :span="6" class="eleReceipt">
                <span>电子收据</span>
                <el-switch v-model="is_receipt" active-color="#409EFF" inactive-color="#dcdfe6"></el-switch>
              </el-col>
          </el-row>
          <el-form-item v-for="(item, index) in amountReceipt" :key="index+'i'"  v-if="!is_receipt" label="收据编号">
            <el-input v-model="params.receipt[index]" style="width:200px"></el-input>
            <el-button @click.prevent="deleteReceipt(index)" v-if="amountReceipt > 1">删除</el-button>
          </el-form-item>
          <el-form-item>
            <el-button @click="addReceipt" v-if="!is_receipt">+增加收据编号</el-button>
          </el-form-item>
          <el-form-item label="领导同意截图" required="">
            <UpLoad :ID="'leader'" :isClear="isClear" :editImage="leaders" @getImg="getImg"></UpLoad>
          </el-form-item>
          <el-form-item label="凭证截图" required="">
            <UpLoad :ID="'screenshot'" :isClear="isClear" :editImage="screenshots" @getImg="getImg"></UpLoad>
          </el-form-item>
          <el-form-item label="押金收条" required="">
            <UpLoad :ID="'receipt'" :isClear="isClear" :editImage="receipts" @getImg="getImg"></UpLoad>
          </el-form-item>
          <el-row>
            <el-col :span="6" >
              <el-form-item label="备注">
                <el-input v-model="params.remark"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="6">
              <el-form-item label="开单人" required="">
                <el-input placeholder="请输入内容" @focus="openOrganizeModal('staff')" readonly="" v-model="params.staff_name"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="部门" required="">
                <el-input placeholder="请输入内容" @focus="openOrganizeModal('depart')" readonly="" v-model="params.department_name"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button size="small" @click="finalPaymentVisible = false">取 消</el-button>
        <el-button size="small" type="primary" @click="confirmSubmit(0)">确 定</el-button>
      </span>
    </el-dialog>
    <Organization :organizationDialog="organizationDialog" :length="length" :type="type"
                  @close='closeModal' @selectMember="selectMember"></Organization>

    <HouseSearch :houseDialog="houseDialog" @close='closeModal'></HouseSearch>
    <VillageSearch :villageDialog="villageDialog" @close='closeModal'></VillageSearch>
  </div>
</template>

<script>
  import UpLoad from '../../common/UPLOAD.vue'
  import Organization from '../../common/organization.vue'
  import HouseSearch from '../../common/collectHouse.vue'
  import VillageSearch from '../../common/villageSearch'

  export default {
    components: {UpLoad, Organization, HouseSearch, VillageSearch},
    props: ['finalPayment', 'processableId', 'reportId'],
    data() {
      return {
        finalPaymentVisible: false,
        isClear: false,
        picStatus:'success',
        organizationDialog: false,
        houseDialog: false,
        villageDialog: false,
        length: '',
        type: '',
        selectType: '',
        modalType: '',
        fullLoading: false,
        amountMoney:1,
        amountReceipt:1,   //收据编号
        other_fee_status:false,
        is_receipt:false,
        urls: globalConfig.server,
        haveInHand: true,
        params: {
          address:'',           //房屋地址
          customer_name:"",     //客户姓名
          month:'',             //月数
          payWay:[],            //付款方式
          price_arr:[],         //月单价
          terms:"",             //房租期数
          front_money:'',       //定金
          deposit_payed:'',     //押金
          rent_money:'',        //租金
          money_sum:'',         //总金额
          money_sep:[''],         //分金额
          real_pay_at:[''],       //实际付款时间
          money_way:[''],         //付款方式
          other_fee:'',             //其他费用
          other_fee_name:'',        //其他费用名称
          retainage_date:'',       //尾款补齐日期
          receipt:[''],               //收据编号
          remark :'',               //备注
          is_receipt: 1,                //1是 2不是
          contract_id: '',              //房屋地址id
          id: '',
          processable_id: '',
          house_id: '',
          quality_up: '0',
          is_draft: 0,
          city_id: '',                  //城市
          city_name: '',                //城市
          screenshot_leader: [],        //领导截图 数组
          screenshot: [],               //凭证截图 数组
          screenshot_old: [],           //凭证截图 数组
          screenshot_new: [],           //凭证截图 数组
          deposit_photo: [],            //押金收条 数组
          deposit_photo_old: [],        //押金收条 数组
          deposit_photo_new: [],        //押金收条 数组
          account_id : [],
          
          photo: [],                    //房屋影像
          staff_id: '',
          department_id: '',
          staff_name: '',               //开单人name
          department_name: '',          //部门name
        },
        value8:[],                       //汇款账户
        dictValue8: [],                 //支付方式
        receiptDate: '',                //日期
        tabs: '',
        columns: [],              //select值
        selectHide: false,        //select选择
        payIndex: '',                 //分金额方式index
        leaders: {},
        screenshots: {},
        receipts: {},
        house_name: '',

        photo: {},

        priceChangeAmount: 1,
        payWayChangeAmount: 1,

        isUpload: false,
        city_dic: [],
       
      };
    },
    watch: {
      finalPayment(val) {
        this.finalPaymentVisible = val
      },
      finalPaymentVisible(val) {
        if (!val) {
          this.$emit('close');
        //   this.clearData();
        } else {
          this.isClear = true;
          this.preloadData();
        }
      },
      is_receipt(val) {
        if (this.params.is_receipt === 1) {
          this.amountReceipt = 1;
          this.params.receipt = [];
          this.params.receipt[0] = this.receiptDate;
        }
      }
    },
    created() {
      this.getDictionary();
      console.log(this.params)
    },
    mounted(){
        this.dicts("");
    },
    methods: {
      //添加支付方式
      addAmount(){
          this.amountMoney++;
          console.log(111)
          this.params.money_sep.push('');
          this.params.real_pay_at.push('');
          this.params.money_way.push('');

      },
      //删除支付方式
      deleteAmount(index){
          this.amountMoney--;
          this.params.money_sep.splice(index, 1);
          this.params.real_pay_at.splice(index, 1);
          this.params.money_way.splice(index, 1);
      },
      //添加收据编号
      addReceipt(){
          this.amountReceipt++;
          this.params.receipt.push(this.receiptDate);
      },
      //删除收据编号
      deleteReceipt(index){
          this.amountReceipt--;
          this.params.receipt.splice(index, 1);
      },
      //计算总金额
      countMoney(){
          this.params.money_sum = Number(this.params.front_money) + Number(this.params.rent_money) + Number(this.params.deposit_payed);
      },
      //汇款账户
      dicts(val) {
        this.receiptNum();
        console.log(sessionStorage.personal)
        // 收款帐户
        let per = JSON.parse(localStorage.personal);
        this.$http.get(this.urls + 'financial/account_alloc/map?org_id=' + per.org[0].id).then(res => {
          if (res.data.code === '20000') {
            this.value8 = [];
            this.dictValue8 = res.data.data;
            res.data.data.forEach(item => {
              this.value8.push(item.bank_info);
            });
            // this.finalDetail(val);
            console.log(this.value8)
          }
        });
        
      },
      // 收据编号默认城市
      receiptNum() {
        this.params.receipt = [];
        this.$http.get(this.urls + 'setting/others/ip_address').then((res) => {
          if (res.data.code === '1000120') {
            // 收据编号默认日期
            if (res.data.data.py) {
              this.receiptDate = res.data.data.py + res.data.data.year;
              let receipt = res.data.data.py + res.data.data.year;
              this.params.receipt.push(receipt);
            } else {
              this.receiptDate = 'NJ' + res.data.data.year;
              let receipt = 'NJ' + res.data.data.year;
              this.params.receipt.push(receipt);
            }
          }
          console.log(this.params.receipt)
        });
      },
      // select 显示
      selectShow(val, index) {
        this.tabs = val;
        this.payIndex = index;
        setTimeout(() => {
          this.selectHide = true;
        }, 200);
        switch (val) {
          case 1:
            this.columns = this.value8;
            break;
          case 2:
            this.columns = this.periods;
            break;
          case 3:
            this.columns = this.cities;
            break;
        }
      },
      // select选择
      onConfirm(value, index) {
        switch (this.tabs) {
          case 1:
            this.form.money_way[this.payIndex] = value;
            this.dictValue8.forEach(res => {
              if (res.bank_info === value) {
                this.form.account_id[this.payIndex] = res.id;
              }
            });
            break;
          case 2:
            this.form.terms = value;
            break;
          case 3:
            this.form.receipt[this.payIndex].city = value;
            break;
        }
        this.selectHide = false;
      },
      // 显示日期
      showTimeChoose(val, time, index) {
        setTimeout(() => {
          this.timeModule = true;
        }, 200);
        this.formatData.dateVal = time;
        this.formatData.dataKey = val;
        this.formatData.idx = index;
      },
      getDictionary() {
        this.dictionary(306, 1).then((res) => {
          this.city_dic = res.data;
        });
        this.dictionary(410, 1).then((res) => {
          this.property_type_dic = res.data;
          this.isDictionary = true
        });
        this.dictionary(404, 1).then((res) => {
          this.decorate_dic = res.data;
          this.isDictionary = true
        });
      },
      //获取收据
      getReceipt(draft) {
        if (typeof draft.receipt !== "string") {
          if (draft.receipt.length !== 0) {
            this.amountReceipt = draft.receipt.length;
            this.params.receipt = [];
            for (let i = 0; i < draft.receipt.length; i++) {
              this.params.receipt.push(draft.receipt[i]);
            }
          } else {
            this.amountReceipt = 1;
            this.params.receipt = [];
            this.params.receipt[0] = this.receiptDate;
          }
        } else {
          this.amountReceipt = 1;
          this.params.receipt = [];
          this.params.receipt[0] = draft.receipt;
        }
      },
      //安置方式
      vacancyWay() {
        this.params.vacancy_other = '';
      },
      //预填报备数据
      preloadData() {
        this.params.processable_id = this.reportId;
        this.$http.get(globalConfig.server + 'bulletin/retainage/' + this.processableId).then((res) => {
          if (res.data.code === '50920') {
            //   this.isClear = false;
            let data = res.data.data;
            console.log(data)
            this.params.address = data.address;
            this.params.customer_name = data.draft_content.customer_name;
            this.params.month = data.draft_content.month;
            this.params.payWay = data.draft_content.payWay;
            this.params.price_arr = data.draft_content.price_arr;
            this.params.terms = data.draft_content.terms;
            this.params.other_fee = data.draft_content.other_fee;
            this.params.other_fee_name = data.draft_content.other_fee_name;
            this.other_fee_status = data.draft_content.is_other_fee === 1 ? true : false;
            this.params.retainage_date = data.draft_content.retainage_date;
            this.params.front_money = data.draft_content.front_money;
            this.params.deposit_payed = data.draft_content.deposit_payed;
            this.params.rent_money = data.draft_content.rent_money;
            this.params.money_sum = data.draft_content.money_sum;
            this.params.money_sep = data.draft_content.money_sep;
            this.params.real_pay_at = data.draft_content.real_pay_at;
            this.params.money_way = data.draft_content.money_way;

            for (let i = 0; i < data.draft_content.money_way.length; i++) {
              if (data.draft_content.real_pay_at) {
                this.params.real_pay_at[i] = data.draft_content.real_pay_at[i];
              } else {
                this.params.real_pay_at.push('');
              }
              this.amountMoney = i + 1;
              for (let j = 0; j < this.dictValue8.length; j++) {
                if (this.dictValue8[j].bank_info === data.draft_content.money_way[i]) {
                  console.log(this.dictValue8);
                  console.log(this.params.account_id)
                  this.params.account_id[i] = this.dictValue8[j].id;
                }
              }
            }
            if (data.draft_content.is_receipt) {
              this.is_receipt = true;
              this.params.is_receipt = 1;
              if (!this.is_receipt) {
                this.getReceipt(data.draft_content);
              }
            } else {
              this.is_receipt = false;
              this.params.is_receipt = 0;
              this.getReceipt(data.draft_content);
            }
            this.params.remark = data.draft_content.remark;
            
            this.params.screenshot_leader = data.draft_content.screenshot_leader;
            this.leaders = data.screenshot_leader;

            this.params.screenshot = data.draft_content.screenshot;
            this.params.screenshot_new = data.draft_content.screenshot_new;
            this.params.screenshot_old = data.draft_content.screenshot_old;
            this.screenshots = data.screenshot_new;

            this.params.deposit_photo = data.draft_content.deposit_photo;
            this.params.deposit_photo_new = data.draft_content.deposit_photo_new;
            this.params.deposit_photo_old = data.draft_content.deposit_photo_old;
            this.receipts = data.deposit_photo_new;
            console.log(this.receipts);
            this.leaders = this.leaders !== null ?  this.leaders.reduce((p, c) => {p[c.id] = c.uri; return p}, {}) : {};
            this.screenshots = this.screenshots !== null ? this.screenshots.reduce((p, c) => {p[c.id] = c.uri; return p}, {}) : {};
            this.receipts = this.receipts !== null ? this.receipts.reduce((p, c) => {p[c.id] = c.uri; return p}, {}) : {};
            this.params.id = data.id || res.data.id;                     //id
            this.params.city_id = data.city_id;                     //城市
            this.params.house_id = data.draft_content.house_id;      //城市
            this.params.contract_id = data.contract_id;
            console.log(data)
            this.params.city_name = data.city_name;                 
            this.photo = this.getImgObject(data.photo);
            this.params.photo = this.getImgIdArray(data.photo);

            this.params.staff_id = data.staff_id;
            this.params.staff_name = data.staff_name;
            this.params.department_id = data.department_id;
            this.params.department_name = data.department_name;

            // this.params.account_id = data.account_id;
            // this.params.real_pay_at = data.real_pay_at;
          }
        });
      },
      //详情照片展示
      getImgObject(data) {
        let img = {};
        if (Array.isArray(data) && data.length > 0) {
          data.forEach((item) => {
            this.$set(img, item.id, item.uri)
          });
        }
        return img;
      },
      getImgIdArray(data) {
        let img = [];
        if (Array.isArray(data) && data.length > 0) {
          data.forEach((item) => {
            img.push(item.id);
          });
        }
        return img;
      },

      //打开房屋选择模态框
      selectHouse() {
        this.houseDialog = true;
        this.modalType = 'house';
      },
      selectVillage() {
        this.villageDialog = true;
        this.modalType = 'village';
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
        this.$http.get(globalConfig.server + 'lease/helper/collectdates?begin_date=' + this.params.begin_date + '&month='
          + this.params.month + '&day=' + this.params.day + '&vacancy=' + this.params.vacancy).then((res) => {
          if (res.data.code === '69910') {
            this.params.vacancy_end_date = res.data.data.vac_end_date;
            this.params.end_date = res.data.data.end_date;
          }
        })
      },

      //关闭模态框
      closeModal(val) {
        this.houseDialog = false;
        this.villageDialog = false;
        this.organizationDialog = false;
        if (val) {
          if (this.modalType === 'house') {
            console.log(val)
            console.log('success')
            this.params.customer_name = val.customers;
            this.params.address = val.house_name;
            this.params.month = val.month;
            this.params.contract_id = val.id;
            this.params.house_id = val.house_id;
            this.params.staff_name = val.staff_name;
            this.params.department_name = val.department_name;
            this.params.staff_id = val.staff_id;
            this.params.department_id = val.department_id;
            this.deposit_photos = [];
            this.params.deposit_photo_old = [];
            this.certificate_photo = [];
            this.params.screenshot_old = [];
            // this.getPic(val.album.deposit_photo, 1);
            // this.getPic(val.album.certificate_photo, 2);
            this.params.deposit_photo_old = val.album.deposit_photo;
            this.params.screenshot_old = val.album.certificate_photo;
            this.helperBulletin(val.id);
          } else {
            this.params.community = val;
          }
        }
      },
      //
      helperBulletin(id) {
        this.$http.get(this.urls + 'bulletin/helper/contract/' + id + '?collect_or_rent=1').then((res) => {
          if (res.data.code === '51110') {
            let pay = res.data.data;
            // this.form.month = pay.month;
            this.periods = [];
            for (let i = 0; i < pay.terms; i++) {
              this.periods.push(i + 1);
            }
            this.params.payWay = [];
            this.params.price_arr = [];
            for (let i = 0; i < pay.pay_way.length; i++) {
              this.params.payWay.push(pay.pay_way[i].begin_date + '~' + pay.pay_way[i].end_date + ':' + pay.pay_way[i].pay_way_str);
            }
            for (let i = 0; i < pay.price.length; i++) {
              this.params.price_arr.push(pay.price[i].begin_date + '~' + pay.price[i].end_date + ':' + pay.price[i].price_str);
            }

          }
        })
      },
      noRepeat(arr) {
        for (let i = 0; i < arr.length - 1; i++) {
          for (let j = i + 1; j < arr.length; j++) {
            if (arr[i] === arr[j]) {
              arr.splice(j, 1);
              j--;
            }
          }
        }
        return arr;
      },
      getImg(val) {
        // this.isUpload = val[2];
        // console.log(val)
        // if (val[0] === 'collect_report_leader') {
        //   this.params.screenshot_leader = val[1];
        // } else if (val[0] === 'collect_report_contract') {
        //   this.params.photo = val[1];
        // }
        console.log(val)
        this.picStatus = val[2];
        if (val[0] === 'leader') {
          this.params.screenshot_leader = val[1];
        } else if (val[0] === 'receipt') {
          this.params.deposit_photo_new = val[1];
        } else {
          this.params.screenshot_new = val[1];
        }
      },

      confirmSubmit(val) {
        if (this.picStatus === 'err') {
          Toast(this.alertMsg('errPic'));
          return;
        } else if (this.picStatus === 'lose') {
          Toast(this.alertMsg('pic'));
          return;
        }
        if (this.haveInHand) {
          this.haveInHand = false;
          let receipt = [];
          for (let i = 0; i < this.params.receipt.length; i++) {
            if (this.params.receipt[i] !== this.receiptDate) {
              receipt.push(this.params.receipt[i]);
            }
          }
          let certificatePics = [];
          let depositPics = [];
          certificatePics = this.params.screenshot_new.concat(this.params.screenshot_old);
          this.params.screenshot = this.noRepeat(certificatePics);
          depositPics = this.params.deposit_photo_new.concat(this.params.deposit_photo_old);
          this.params.deposit_photo = this.noRepeat(depositPics);
          this.params.is_receipt = this.is_receipt ? 1 : 0;
          this.amountReceipt = receipt.length === 0 ? 1 : receipt.length;
          this.params.receipt = receipt;
          this.params.draft = val;
          this.params.is_other_fee = this.other_fee_status ? 1 : 0;
          this.emptyPic(this.params.screenshot, 'screenshot');
          this.emptyPic(this.params.screenshot_leader, 'screenshot_leader');
          this.emptyPic(this.params.deposit_photo, 'deposit_photo');
          this.$http.post(this.urls + 'bulletin/retainage', this.params).then((res) => {
            this.haveInHand = true;
            this.retry = 0;
            if (res.data.code === '50910' || res.data.code === '50930') {
              this.$notify({
                title:'成功',
                message:res.data.msg,
                type:'success'
              });
              this.close_();
              this.$emit('close', 'success');
              $('.imgItem').remove();
              if (res.data.data.id) { this.routerDetail(res.data.data.id) } else { this.routerDetail(res.data.data.data.id) }
            } else if (res.data.code === '50920') {
              if (receipt.length === 0) {
                this.params.receipt = [];
                this.params.receipt.push(this.receiptDate);
              }
              this.params.id = res.data.data.id;
              Toast.success(res.data.msg);
            } else {
              this.$notify.error({
                title:'错误',
                message:res.data.msg,
              });
            }
          }).catch((error) => {
            this.haveInHand = true;
            if (error.response === undefined) {
            //   this.alertMsg('net');

            } else {
              if (error.response.status === 401) {
                this.personalGet().then((data) => {
                  if (data && this.retry === 0) {
                    this.retry++;

                    this.saveCollect(this.form.draft);
                  }
                });
              }
            }
          })
        } else {
        //   Toast(this.alertMsg('sub'));
        }
      },
      emptyPic(val, key) {
        console.log(val);
        console.log(key);
        let data = [];
        if (val.length !== 0) {
          val.forEach(item => {
            console.log(item);
            if (item && item !== 'null') {
              console.log(item);
              data.push(item);
            }
          });
          console.log(data);
          this.params[key] = data;
        }
      },
      clearData() {
        this.isClear = false;
        this.params = {
          id: '',
          processable_id: '',
          house_id: '',
          
          is_draft: 0,
          city_id: '',                  //城市
          city_name: '',                //城市
          community: {},                //小区id
          door_address: ['', '', ''],
          house_type: ['1', '1', '1'],
          area: '',                     //面积
          direction: {
            id: '',                     //朝向
            name: '',
          },
          decorate: {
            id: '',                    //装修
            name: '',
          },
          property_type: {
            id: '',                     //房屋类型
            name: '',
          },
          floor: '',                    //楼层
          floors: '',                   //总楼层
          price: '',                    //价格
          is_agency: '0',                 //是否中介
          air_condition: 1,             //空调
          fridge: 1,                    //冰箱
          television: 1,                //电视
          gas_stove: 1,                 //燃气灶
          hood: 1,                      //油烟机
          microwave: 1,                 //微波炉
          wash_machine: 1,              //洗衣机
          water_heater: 1,              //热水器
          sofa: 1,                      //沙发
          clothe_rack: 1,               //晾衣架

          heater: '1',                  //暖气
          gas: '1',                     //天然气
          bed: '1',                     //床
          bed_remark: '',               //床备注
          wardrobe: '1',                //衣柜
          wardrobe_remark: '',          //衣柜备注
          curtain: '1',                 //窗帘
          curtain_remark: '',           //窗帘备注
          is_fill: '1',                 //家电是否齐全
          is_lord_fill: '0',            //房东是否补齐
          is_lord_fill_days: '',        //房东是否补齐天数

          dining_table: '',             //餐桌
          chair: '',                    //椅子
          is_clean: '1',                //是否干净
          other_remark: '',             //其他问题
          other_furniture: '',          //其他家具
          photo: [],                    //房屋影像
          staff_id: '',
          department_id: '',
          staff_name: '',               //开单人name
          department_name: '',          //部门name
        };
        this.photo = {};

        this.priceChangeAmount = 1;
        this.payWayChangeAmount = 1;

        this.length = '';
        this.type = '';
        this.selectType = '';
        this.isUpload = false;
      },
      close_() {
        this.isClear = true;
        setTimeout(() => {
          this.isClear = false;
        });
        $('.imgItem').remove();
        this.finalPaymentVisible = false;
        this.picStatus = 'success';
        this.params.id = '';
        this.params.processable_id = '';
        this.params.address = '';
        this.params.month = '';
        this.certificate_photo = [];

        this.deposit_photos = [];

        this.params.price_arr = [''];
        this.params.payWay = [''];
        this.params.terms = '';
        this.periods = [];
        this.params.contract_id = '';
        this.params.house_id = '';
        this.params.front_money = '';
        this.params.deposit = '';
        this.params.deposit_payed = '';
        this.params.rent_money = '';
        this.params.money_sum = '';
        this.params.retainage_date = '';
        this.amountMoney = 1;
        this.params.account_id = [];
        this.params.money_sep = [''];
        this.params.real_pay_at = [''];
        this.params.money_way = [''];
        this.params.screenshot = [];
        this.params.screenshot_new = [];
        this.params.screenshot_old = [];
        this.screenshots = {};
        this.params.screenshot_leader = [];
        this.leaders = {};
        this.params.deposit_photo = [];
        this.params.deposit_photo_new = [];
        this.params.deposit_photo_old = [];
        this.receipts = {};
        this.amountReceipt = 1;
        this.is_receipt = false;
        this.params.receipt = [];
        this.params.receipt[0] = this.receiptDate;

        this.params.other_fee_name = '';
        this.params.other_fee = '';
        this.params.customer_name = '';
        this.params.is_other_fee = 0;
        this.other_fee_status = false;

        this.params.remark = '';
        this.params.staff_name = '';
        this.params.department_name = '';
        this.params.staff_id = '';
        this.params.department_id = '';
      }
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
  .addPayType,{
      display: flex;
      justify-content: center;
      align-items: center;
  }
  .eleReceipt{
      margin: 14px 0;
      display:flex;
      padding: 0 60px;
      justify-content: space-between;
  }
  .switch{
    padding: 0 60px;
    display:flex;
    justify-content: space-between;
  }
  .delete{
    height: 29px;
    padding-top: 0;
    padding-bottom: 0;
    margin-left: 5px;
  }
</style>
