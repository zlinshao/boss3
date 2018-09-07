<template>
  <div id="addHouseResources">
    <el-dialog :close-on-click-modal="false" title="续收报备" :visible.sync="continueCollectReportVisible" width="70%">
      <div style="min-height: 550px" class="scroll_bar"
           v-loading="fullLoading"
           element-loading-text="拼命加载中"
           element-loading-spinner="el-icon-loading"
           element-loading-background="rgba(255, 255, 255, 0)">
        <el-form size="mini" :model="params" label-width="120px">
          <el-row>
            <el-col :span="8">
              <el-form-item label="房屋地址" required>
                <el-input placeholder="请选择房屋地址" v-model="params.house.name" @focus="selectHouse" readonly=""></el-input>
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
                <el-date-picker value-format="yyyy-MM-dd" type="date" placeholder="选择空置期开始"
                                v-model="params.begin_date" @blur="computedEndDate"></el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="合同结束时间" required="">
                <el-date-picker value-format="yyyy-MM-dd" type="date" placeholder="选择日期"
                                v-model="params.end_date"></el-date-picker>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row>
            <el-col :span="8">
              <el-form-item label="第一次打房租" required="">
                <el-date-picker value-format="yyyy-MM-dd" type="date" placeholder="选择日期"
                                v-model="params.pay_first_date"></el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="第二次打房租" required="">
                <el-date-picker value-format="yyyy-MM-dd" type="date" placeholder="选择日期"
                                v-model="params.pay_second_date"></el-date-picker>
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
                  <el-form-item label="付款方式" required="">
                    <el-select clearable v-model="params.pay_way_arr[item-1]" placeholder="请选择付款方式" value="">
                      <el-option v-for="item in pay_way_dic" :label="item.dictionary_name" :value="item.id"
                                 :key="item.id"></el-option>
                    </el-select>
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

          <el-row>
            <el-col :span="6">
              <el-form-item label="是否公司单" required="">
                <el-switch v-model="params.is_corp" disabled active-value="1" inactive-value="0"></el-switch>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="合同编号" required="">
                <el-input placeholder="请输入合同编号" v-model="params.contract_number"></el-input>
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
              <el-form-item label="押金" required>
                <el-input placeholder="请输入内容" v-model="params.deposit"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="违约金" required="">
                <el-input placeholder="请输入内容" v-model="params.penalty"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="6" class="unitMessage">
              <el-form-item label="保修期" required="">
                <el-col :span="12" style="padding-right: 10px">
                  <el-input placeholder="月数" v-model="params.warranty">
                    <template slot="append">月</template>
                  </el-input>
                </el-col>
                <el-col :span="12">
                  <el-input placeholder="天数" v-model="params.warranty_day">
                    <template slot="append">天</template>
                  </el-input>
                </el-col>
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
            <el-col :span="6">
              <el-form-item label="账号" required="">
                <el-input placeholder="请输入内容" v-model="params.account"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="开户行">
                <el-input placeholder="请输入内容" v-model="params.bank"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="支行" required="">
                <el-input placeholder="请输入内容" v-model="params.subbranch"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="6">
              <el-form-item label="开户人" required="">
                <el-input placeholder="请输入内容" v-model="params.account_name"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="开户人与房东关系" required="">
                <el-input placeholder="请输入内容" v-model="params.relationship"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="房东姓名" required>
                <el-input placeholder="请输入内容" v-model="params.name"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="房东联系方式" required>
                <el-input placeholder="请输入内容" v-model="params.phone"></el-input>
              </el-form-item>
            </el-col>
          </el-row>

          <el-form-item label="领导同意截图">
            <UpLoad :ID="'collect_report_leader'" :isClear="isClear" :editImage="screenshot_leader"
                    @getImg="getImg"></UpLoad>
          </el-form-item>

          <el-form-item label="合同照片" required="">
            <UpLoad :ID="'collect_report_contract'" :isClear="isClear" :editImage="photo" @getImg="getImg"></UpLoad>
          </el-form-item>

          <el-form-item label="房产证照片" required="">
            <UpLoad :ID="'property_photo'" :isClear="isClear" :editImage="property_photos" @getImg="getImg"></UpLoad>
          </el-form-item>

          <el-form-item label="证件照片" required="">
            <UpLoad :ID="'identity_photo'" :isClear="isClear" :editImage="identity_photos" @getImg="getImg"></UpLoad>
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
        <el-button size="small" @click="continueCollectReportVisible = false">取 消</el-button>
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
    props: ['continueCollectReport', 'reportDetailData', 'processableId', 'reportId'],
    data() {
      return {
        continueCollectReportVisible: false,
        isClear: false,
        organizationDialog: false,
        collectDialog: false,
        length: '',
        type: '',
        selectType: '',
        fullLoading: false,

        params: {
          id: '',
          processable_id: '',
          type: 2,
          draft: 0,
          contract_id: '',    //合同
          house_type: '',
          house: {
            id: '',
            name: '',
          },
          month: '',                    //收房月数
          day: '',                      //收房天数
          begin_date: '',               //合同开始日期
          end_date: '',                 //合同结束日期
          period_price_arr: [''],       //月单价周期
          price_arr: [''],              //月单价

          period_pay_arr: [''],         //付款方式周期
          pay_way_arr: [''],            //付款方式

          warranty: '',                 //保修期(月)
          warranty_day: '',             //保修期(天)
          deposit: '',                  //押金
          property_payer: '',           //物业费付款人
          pay_first_date: '',           //第一次付款时间
          pay_second_date: '',          //第二次付款时间
          sign_date: '',                //签约日期
          is_agency: '0',
          purchase_way: 509,            //支付方式
          name: '',                     //房东姓名
          phone: '',                    //电话号码
          bank: '',                     //银行名称
          subbranch: '',                //支行名称
          account_name: '',             //帐户名称
          account: '',                  //帐号
          relationship: '',             //房东与收款人关系
          penalty: '',                  //违约金
          is_corp: '1',                 //是否公司单  0个人1公司
          contract_number: 'LJSF',      //合同编号
          screenshot_leader: '',        //领导截图 数组
          photo: '',                    //合同照片 数组
          property_photo: [],           //房产证照片
          identity_photo: [],           //证件照片
          remark: '',                   //备注
          staff_id: '',                 //开单人id
          department_id: '',            //部门id
          staff_name: '',               //开单人name
          department_name: '',          //部门name
        },
        screenshot_leader: {},
        photo: {},
        property_photos: {},            //房产证照片
        identity_photos: {},            //证件照片

        priceChangeAmount: 1,
        payWayChangeAmount: 1,

        purchase_way_dic: [],
        pay_way_dic: [],
        property_payer_dic: [],
        isUpload: false,
      };
    },
    watch: {
      continueCollectReport(val) {
        this.continueCollectReportVisible = val
      },
      continueCollectReportVisible(val) {
        if (!val) {
          this.$emit('close');
          this.clearData();
        } else {
          this.isClear = true;
          setTimeout(() => {
            this.preloadData();
          }, 100);
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

        this.dictionary(443, 1).then((res) => {
          this.pay_way_dic = res.data;
        });
        this.dictionary(449, 1).then((res) => {
          this.property_payer_dic = res.data;
        });
      },

      //预填报备数据
      preloadData() {
        let data = this.reportDetailData;
        console.log(data);
        this.params.purchase_way = 509;

        this.params.processable_id = this.reportId;
        this.params.id = data.id;
        this.params.contract_id = data.contract_id;
        this.params.house = data.house;

        this.params.month = data.month;
        this.params.day = data.day === '0' ? '' : data.day;
        this.params.contract_number = data.contract_number === '' ? 'LJSF' : data.contract_number;
        this.params.sign_date = data.sign_date;

        //
        this.params.begin_date = data.begin_date;
        this.params.end_date = data.end_date;


        this.params.pay_first_date = data.pay_first_date;
        this.params.pay_second_date = data.pay_second_date;

        this.params.deposit = data.deposit;
        this.params.warranty = data.warranty;
        this.params.warranty_day = data.warranty_day === '0' ? '' : data.warranty_day;
        this.params.name = data.name;
        this.params.phone = data.phone;
        this.params.bank = data.bank;
        this.params.subbranch = data.subbranch;
        this.params.account_name = data.account_name;
        this.params.account = data.account;
        this.params.relationship = data.relationship;
        this.params.penalty = data.penalty;
        this.params.remark = data.remark;

        if (data.property_payer && data.property_payer.constructor === Object) {
          this.params.property_payer = data.property_payer.id;
        }

        this.priceChangeAmount = data.price_arr.length;
        this.payWayChangeAmount = data.pay_way_arr.length;

        this.params.price_arr = data.price_arr;
        this.params.period_price_arr = data.period_price_arr;
        this.params.pay_way_arr = data.pay_way_arr;
        this.params.period_pay_arr = data.period_pay_arr;

        this.photo = this.getImgObject(data.photo);
        this.params.photo = this.getImgIdArray(data.photo);

        this.screenshot_leader = this.getImgObject(data.screenshot_leader);
        this.params.screenshot_leader = this.getImgIdArray(data.screenshot_leader);

        this.identity_photos = this.getImgObject(data.identity_photo);
        this.params.identity_photo = this.getImgIdArray(data.identity_photo);

        this.params.staff_id = data.staff_id;
        this.params.staff_name = data.staff_name;
        this.params.department_id = data.department_id;
        this.params.department_name = data.department_name;
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
          this.params.contract_id = val.contract_id;
          this.params.house.id = val.house_id;
          this.params.house.name = val.address;
          this.params.house_type = val.house_type;
        }
      },

      getImg(val) {
        this.isUpload = val[2];
        if (val[0] === 'collect_report_leader') {
          this.params.screenshot_leader = val[1];
        } else if (val[0] === 'collect_report_contract') {
          this.params.photo = val[1];
        } else if (val[0] === 'property_photo') {
          this.params.property_photo = val[1];
        } else if (val[0] === 'identity_photo') {
          this.params.identity_photo = val[1];
        }
      },

      confirmSubmit() {
        if (!this.isUpload) {
          this.$http.post(globalConfig.server + 'bulletin/collect', this.params).then((res) => {
            if (res.data.code === '50130') {
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
          id: '',
          processable_id: '',
          type: 2,
          draft: 0,
          contract_id: '',    //合同
          house_type: '',
          house: {
            id: '',
            name: '',
          },
          month: '',                    //收房月数
          day: '',                      //收房天数
          begin_date: '',               //合同开始日期
          end_date: '',                 //合同结束日期
          period_price_arr: [''],       //月单价周期
          price_arr: [''],              //月单价

          period_pay_arr: [''],         //付款方式周期
          pay_way_arr: [''],            //付款方式

          warranty: '',                 //保修期(月)
          warranty_day: '',             //保修期(天)
          deposit: '',                  //押金
          property_payer: '',           //物业费付款人
          pay_first_date: '',           //第一次付款时间
          pay_second_date: '',          //第二次付款时间
          sign_date: '',                //签约日期
          is_agency: '0',
          purchase_way: 509,            //支付方式
          name: '',                     //房东姓名
          phone: '',                    //电话号码
          bank: '',                     //银行名称
          subbranch: '',                //支行名称
          account_name: '',             //帐户名称
          account: '',                  //帐号
          relationship: '',             //房东与收款人关系
          penalty: '',                  //违约金
          is_corp: '1',                   //是否公司单  0个人1公司
          contract_number: 'LJSF',      //合同编号
          screenshot_leader: '',        //领导截图 数组
          photo: '',                    //合同照片 数组
          property_photo: [],           //房产证照片
          identity_photo: [],           //证件照片
          remark: '',                   //备注
          staff_id: '',                 //开单人id
          department_id: '',            //部门id
          staff_name: '',               //开单人name
          department_name: '',          //部门name
        };
        this.screenshot_leader = {};
        this.photo = {};
        this.property_photos = {};         //房产证照片
        this.identity_photos = {};         //证件照片

        this.priceChangeAmount = 1;
        this.payWayChangeAmount = 1;

        this.length = '';
        this.type = '';
        this.selectType = '';
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
