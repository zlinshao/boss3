<template>
  <div id="addHouseResources">
    <el-dialog :close-on-click-modal="false" title="房屋质量报备" :visible.sync="houseReportVisible" width="70%">
      <div style="min-height: 550px" class="scroll_bar"
           v-loading="fullLoading"
           element-loading-text="拼命加载中"
           element-loading-spinner="el-icon-loading"
           element-loading-background="rgba(255, 255, 255, 0)">
        <el-form size="mini" :model="params" label-width="120px">
          <el-row>
            <el-col :span="6">
              <el-form-item label="报备类型" required="">
                <el-radio v-model="params.quality_up" disabled="" label="0">新增</el-radio>
                <el-radio v-model="params.quality_up" disabled="" label="1">跟进</el-radio>
              </el-form-item>
            </el-col>
            <el-col :span="6" v-if="params.quality_up == 1">
              <el-form-item label="房屋地址" required>
                <el-input placeholder="请选择房屋地址" @focus="selectHouse" disabled=""></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="城市" required="">
                <el-select clearable v-model="params.city_id" placeholder="请选择城市" value=""
                           :disabled="params.quality_up == 1">
                  <el-option v-for="item in city_dic" :label="item.dictionary_name"
                             :value="item.variable.city_id" :key="item.id"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="小区" required>
                <el-input placeholder="请选择小区" v-model="params.community.village_name" @focus="selectVillage"
                          :disabled="params.quality_up == 1" readonly=""></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span='6'>
              <el-form-item label="物业费" required>
                <el-col>
                  <el-input placeholder="物业费单价" v-model="property_fee"></el-input>
                </el-col>
              </el-form-item>
            </el-col>
            <el-col :span='6'>
              <el-form-item label="物业联系方式" required>
                <el-col>
                  <el-input placeholder="物业联系方式" v-model="property_phone"></el-input>
                </el-col>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="收房年限(月)" required="">
                <el-input placeholder="请输入收房年限" v-model="params.month"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="空置期" required="">
                <el-input placeholder="请输入空置期(天)" v-model="params.vacancy"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="门牌地址" required>
                <el-col :span="8" style="padding-right: 10px">
                  <el-input placeholder="座/栋" :disabled="params.quality_up == 1"
                            v-model="params.door_address[0]"></el-input>
                </el-col>
                <el-col :span="8" style="padding-right: 10px">
                  <el-input placeholder="单元" :disabled="params.quality_up == 1"
                            v-model="params.door_address[1]"></el-input>
                </el-col>
                <el-col :span="8">
                  <el-input placeholder="门牌号" :disabled="params.quality_up == 1"
                            v-model="params.door_address[2]"></el-input>
                </el-col>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="房型" required="">
                <el-col :span="8" style="padding-right: 10px">
                  <el-select clearable v-model="params.house_type[0]" placeholder="室" value=""
                             :disabled="params.quality_up == 1">
                    <el-option label="一室" value="1"></el-option>
                    <el-option label="二室" value="2"></el-option>
                    <el-option label="三室" value="3"></el-option>
                    <el-option label="四室" value="4"></el-option>
                    <el-option label="五室" value="5"></el-option>
                    <el-option label="六室" value="6"></el-option>
                    <el-option label="七室" value="7"></el-option>
                    <el-option label="八室" value="8"></el-option>
                  </el-select>
                </el-col>
                <el-col :span="8" style="padding-right: 10px">
                  <el-select clearable v-model="params.house_type[1]" placeholder="厅" value=""
                             :disabled="params.quality_up == 1">
                    <el-option label="无" value=""></el-option>
                    <el-option label="一厅" value="1"></el-option>
                    <el-option label="二厅" value="2"></el-option>
                    <el-option label="三厅" value="3"></el-option>
                    <el-option label="四厅" value="4"></el-option>
                    <el-option label="五厅" value="5"></el-option>
                  </el-select>
                </el-col>
                <el-col :span="8">
                  <el-select clearable v-model="params.house_type[2]" placeholder="卫" value=""
                             :disabled="params.quality_up == 1">
                    <el-option label="无" value=""></el-option>
                    <el-option label="一卫" value="1"></el-option>
                    <el-option label="二卫" value="2"></el-option>
                    <el-option label="三卫" value="3"></el-option>
                    <el-option label="四卫" value="4"></el-option>
                    <el-option label="五卫" value="5"></el-option>
                  </el-select>
                </el-col>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row>
            <el-col :span="6">
              <el-form-item label="建筑面积" required>
                <el-input placeholder="请输入内容" v-model="params.area" :disabled="params.quality_up == 1"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="装修" required="">
                <el-select clearable v-model="params.decorate.id" placeholder="请选择装修类型" value=""
                           :disabled="params.quality_up == 1">
                  <el-option v-for="item in decorate_dic" :label="item.dictionary_name" :value="item.id"
                             :key="item.id"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="房屋类型" required="">
                <el-select clearable v-model="params.property_type.id" placeholder="请选择房屋类型" value=""
                           :disabled="params.quality_up == 1">
                  <el-option v-for="item in property_type_dic" :label="item.dictionary_name" :value="item.id"
                             :key="item.id"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="朝向" required="">
                <el-select clearable v-model="params.direction.id" placeholder="请选择朝向" value=""
                           :disabled="params.quality_up == 1">
                  <el-option v-for="(item,index) in decorate" :label="item" :value="index+1"
                             :key="index"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row>

            <el-col :span="6">
              <el-form-item label="楼层" required>
                <el-col :span="10">
                  <el-input placeholder="楼层" v-model="params.floor" :disabled="params.quality_up == 1"></el-input>
                </el-col>
                <el-col :span="4" style="text-align: center">
                  /
                </el-col>
                <el-col :span="10">
                  <el-input placeholder="总楼层" v-model="params.floors" :disabled="params.quality_up == 1"></el-input>
                </el-col>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="价格" required>
                <el-input placeholder="请输入内容" v-model="params.price" :disabled="params.quality_up == 1"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="是否中介" required>
                <el-switch v-model="params.is_agency" active-value="1" inactive-value="0"></el-switch>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="门锁类型">
                <el-select clearable v-model="params.lock_type" placeholder="请选择门锁类型" value="">
                  <el-option v-for="(item,index) in lock_types" :label="item" :value="item"
                             :key="index"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row>
            <el-col :span="6">
              <el-form-item label="空调">
                <el-select clearable v-model="params.air_condition" placeholder="空调" value="">
                  <el-option v-for="(item,index) in unit_ge" :label="item" :value="index"
                             :key="index"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="冰箱">
                <el-select clearable v-model="params.fridge" placeholder="冰箱" value="">
                  <el-option v-for="(item,index) in unit_ge" :label="item" :value="index"
                             :key="index"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="电视">
                <el-select clearable v-model="params.television" placeholder="电视" value="">
                  <el-option v-for="(item,index) in unit_ge" :label="item" :value="index"
                             :key="index"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="燃气灶">
                <el-select clearable v-model="params.gas_stove" placeholder="燃气灶" value="">
                  <el-option v-for="(item,index) in unit_ge" :label="item" :value="index"
                             :key="index"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="6">
              <el-form-item label="油烟机">
                <el-select clearable v-model="params.hood" placeholder="油烟机" value="">
                  <el-option v-for="(item,index) in unit_ge" :label="item" :value="index"
                             :key="index"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="微波炉">
                <el-select clearable v-model="params.microwave" placeholder="微波炉" value="">
                  <el-option v-for="(item,index) in unit_ge" :label="item" :value="index"
                             :key="index"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="洗衣机">
                <el-select clearable v-model="params.wash_machine" placeholder="洗衣机" value="">
                  <el-option v-for="(item,index) in unit_ge" :label="item" :value="index"
                             :key="index"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="热水器">
                <el-select clearable v-model="params.water_heater" placeholder="热水器" value="">
                  <el-option v-for="(item,index) in unit_ge" :label="item" :value="index"
                             :key="index"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="6">
              <el-form-item label="沙发">
                <el-select clearable v-model="params.sofa" placeholder="沙发" value="">
                  <el-option v-for="(item,index) in unit_ge" :label="item" :value="index"
                             :key="index"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="晾衣架">
                <el-select clearable v-model="params.clothe_rack" placeholder="晾衣架" value="">
                  <el-option v-for="(item,index) in unit_ge" :label="item" :value="index"
                             :key="index"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="餐桌">
                <el-input placeholder="请输入内容" number v-model="params.dining_table"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="椅子">
                <el-input placeholder="请输入内容" number v-model="params.chair"></el-input>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row>
            <el-col :span="6">
              <el-form-item label="暖气">
                <el-switch v-model="params.heater" active-value="1" inactive-value="0"></el-switch>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="天然气">
                <el-switch v-model="params.gas" active-value="1" inactive-value="0"></el-switch>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="房屋交接是否干净">
                <el-switch v-model="params.is_clean" active-value="1" inactive-value="0"></el-switch>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="是否每个房间有床+床垫">
                <el-switch v-model="params.bed" active-value="1" inactive-value="0"></el-switch>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row>
            <el-col :span="6">
              <el-form-item label="是否每个房间有衣柜">
                <el-switch v-model="params.wardrobe" active-value="1" inactive-value="0"></el-switch>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="是否每个房间有窗帘">
                <el-switch v-model="params.curtain" active-value="1" inactive-value="0"></el-switch>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="家电是否齐全">
                <el-switch v-model="params.is_fill" active-value="1" inactive-value="0"></el-switch>
              </el-form-item>
            </el-col>
            <el-col :span="6" v-if="params.is_fill!=1">
              <el-form-item label="房东是否予以配齐">
                <el-switch v-model="params.is_lord_fill" active-value="1" inactive-value="0"></el-switch>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row>
            <el-col :span="12" v-if="params.bed!=1">
              <el-form-item label="床+床垫备注">
                <el-input placeholder="请输入床+床垫备注" type="textarea" v-model="params.bed_remark"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12" v-if="params.wardrobe!=1">
              <el-form-item label="衣柜备注">
                <el-input placeholder="请输入衣柜备注" type="textarea" v-model="params.wardrobe_remark"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12" v-if="params.curtain!=1">
              <el-form-item label="窗帘备注">
                <el-input placeholder="请输入窗帘备注" type="textarea" v-model="params.curtain_remark"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="其他家具家电">
                <el-input placeholder="请输入内容" type="textarea" v-model="params.other_furniture"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="其他问题">
                <el-input placeholder="请输入内容" type="textarea" v-model="params.other_remark"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-form-item label="房屋影像" required="">
            <UpLoad :ID="'collect_report_contract'" :isClear="isClear" :editImage="photo" @getImg="getImg"></UpLoad>
          </el-form-item>

          <el-row>
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
        <el-button size="small" @click="houseReportVisible = false">取 消</el-button>
        <el-button size="small" type="primary" @click="confirmSubmit">确 定</el-button>
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
  import HouseSearch from '../../common/houseSearch.vue'
  import VillageSearch from '../../common/villageSearch'

  export default {
    components: {UpLoad, Organization, HouseSearch, VillageSearch},
    props: ['houseReport', 'processableId', 'reportId'],
    data() {
      return {
        houseReportVisible: false,
        isClear: false,
        organizationDialog: false,
        houseDialog: false,
        villageDialog: false,
        length: '',
        type: '',
        selectType: '',
        modalType: '',
        fullLoading: false,

        params: {
          id: '',
          processable_id: '',
          house_id: '',
          quality_up: '0',
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
          vacancy: '',// 空置期
          month: '', //收房年限
          floor: '',                    //楼层
          floors: '',                   //总楼层
          price: '',                    //价格
          is_agency: '0',                 //是否中介
          lock_type: '',                //门锁类型
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

          account_id:'',
          real_pay_at:''
        },
        property_fee: '',                //物业费
        property_phone: '',              //物业联系方式
        house_name: '',

        screenshot_leader: {},
        photo: {},

        priceChangeAmount: 1,
        payWayChangeAmount: 1,

        isUpload: false,
        city_dic: [],
        property_type_dic: [],   //房屋类型
        decorate_dic: [],        //装修
        unit_ge: ['0个', '1个', '2个', '3个', '4个', '5个'],
        unit_tai: ['0台', '1台', '2台', '3台', '4台', '5台'],
        decorate: ['东', '南', '西', '北', '东南', '东北', '西南', '西北', '南北'],
        lock_types: ['密码锁', '指纹锁', '普通锁'],
      };
    },
    watch: {
      houseReport(val) {
        this.houseReportVisible = val
      },
      houseReportVisible(val) {
        if (!val) {
          this.$emit('close');
          this.clearData();
        } else {
          this.isClear = true;
          this.preloadData();
        }
      },
    },
    created() {
      this.getDictionary();
    },
    methods: {
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
      //安置方式
      vacancyWay() {
        this.params.vacancy_other = '';
      },
      //预填报备数据
      preloadData() {
        this.params.processable_id = this.reportId;
        this.$http.get(globalConfig.server + 'bulletin/quality/' + this.processableId).then((res) => {
          if (res.data.code === '51420') {
            let data = res.data.data;
            this.params.quality_up = String(data.quality_up);
            if (data.quality_up === '1') {
              this.house_name = data.address;
            } else {
              this.house_name = '';
            }
            this.params.id = data.id || res.data.id;                     //id
            this.params.city_id = data.city_id;                     //城市
            this.params.month = data.month || '';
            this.params.vacancy = data.vacancy || '';
            this.params.house_id = data.house_id;                     //城市
            this.params.city_name = data.city_name;                 //城市
            this.params.community = data.community;                 //小区id
            this.community_name = data.community.village_name;    //小区id
            this.params.door_address = data.door_address;
            this.property_fee = data.community.property_fee;
            this.property_phone = data.community.property_phone;

            if (data.house_type && Array.isArray(data.house_type)) {
              data.house_type.forEach((item, index) => {
                this.params.house_type[index] = String(item)
              })
            }

            this.params.decorate = data.decorate;
            this.params.area = data.area;                                     //面积
            this.params.direction = data.direction;                           //朝向
            this.params.property_type = data.property_type;                   //类型
            this.params.floor = data.floor;                                   //楼层
            this.params.floors = data.floors;                                 //总楼层
            this.params.price = data.price;                                   //价格
            if (data.is_agency) {
              if (data.is_agency.name) {
                this.params.is_agency = String(data.is_agency.id);
              } else {
                this.params.is_agency = String(data.is_agency);
              }
            } else {
              this.params.is_agency = '0';
            }
            this.params.lock_type = data.lock_type;                           //门锁
            this.params.air_condition = data.air_condition;                   //空调
            this.params.fridge = data.fridge;                                 //冰箱
            this.params.television = data.television;                         //电视
            this.params.gas_stove = data.gas_stove;                           //燃气灶
            this.params.hood = data.hood;                                     //油烟机
            this.params.microwave = data.microwave;                           //微波炉
            this.params.wash_machine = data.wash_machine;                     //洗衣机
            this.params.water_heater = data.water_heater;                     //热水器
            this.params.sofa = data.sofa;                                     //沙发
            this.params.clothe_rack = data.clothe_rack;                       //晾衣架
            this.params.heater = data.heater.toString();                                 //暖气
            this.params.gas = data.gas.toString();                                       //天然气
            this.params.bed = data.bed.toString();                                       //床
            this.params.bed_remark = data.bed_remark;                         //床备注
            this.params.wardrobe = data.wardrobe.toString();                             //衣柜
            this.params.wardrobe_remark = data.wardrobe_remark;               //衣柜备注
            this.params.curtain = data.curtain.toString();                               //窗帘
            this.params.curtain_remark = data.curtain_remark;                 //窗帘备注
            this.params.is_fill = data.is_fill.toString();                               //家电是否齐全
            this.params.is_lord_fill = data.is_lord_fill.toString();                     //房东是否补齐
            this.params.is_lord_fill_days = data.is_lord_fill_days;           //房东是否补齐天数
            this.params.dining_table = data.dining_table;                     //餐桌
            this.params.chair = data.chair;                                   //椅子
            this.params.is_clean = data.is_clean.toString();                             //是否干净
            this.params.other_remark = data.other_remark;                     //其他问题
            this.params.other_furniture = data.other_furniture;               //其他家具

            this.photo = this.getImgObject(data.photo);
            this.params.photo = this.getImgIdArray(data.photo);

            this.params.staff_id = data.staff_id;
            this.params.staff_name = data.staff_name;
            this.params.department_id = data.department_id;
            this.params.department_name = data.department_name;

            this.params.account_id = data.account_id;
            this.params.real_pay_at = data.real_pay_at;
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
            this.house_name = val.house_name;
            this.params.house_id = val.house_id;
          } else {
            this.params.community = val;
          }
        }
      },

      getImg(val) {
        this.isUpload = val[2];
        if (val[0] === 'collect_report_leader') {
          this.params.screenshot_leader = val[1];
        } else if (val[0] === 'collect_report_contract') {
          this.params.photo = val[1];
        }
      },
      //物业费物业联系方式
      prefillProperty(){
        this.params.community.property_fee = this.property_fee;
        this.params.community.property_phone = this.property_phone;
      },
      confirmSubmit() {
        if (!this.isUpload) {
          this.prefillProperty();
          this.$http.post(globalConfig.server + 'bulletin/quality', this.params).then((res) => {
            if (res.data.code === '51430') {
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
          house_id: '',
          quality_up: '0',
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
          lock_type: '',                 //门锁
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
        this.property_phone = '';
        this.property_fee = '';
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
