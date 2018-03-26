<template>
  <div @click="show=false" @contextmenu="closeMenu">
    <div id="wholeRentContainer">
      <div class="tool">
        <div class="tool_left">
          <el-button type="primary" size="mini" @click="openModalDialog('addHouseResourcesDialog')">
            <i class="el-icon-document"></i>&nbsp;登记房源
          </el-button>
          <el-button type="success" size="mini" @click="openModalDialog('instructionDialog')">
            <i class="el-icon-tickets"></i>&nbsp;功能说明
          </el-button>
          <el-button type="info" size="mini" @click="openModalDialog('backUpDialog')">
            <i class="el-icon-tickets"></i>&nbsp;查看备份
          </el-button>
        </div>

        <div class="tool_right"  @click="openModalDialog('settingDialog')">
          <div><i class="el-icon-setting"></i>&nbsp;设置</div>
        </div>
      </div>
      <div class="highRanking" style="margin-top: 10px">
        <div class="highSearch">
          <el-form :inline="true" size="mini">
            <el-form-item>
              <el-input placeholder="请输入内容" v-model="formInline.keyWords" size="mini" clearable>
                <el-button slot="append" icon="el-icon-search"></el-button>
              </el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" size="mini" @click="highGrade">高级</el-button>
            </el-form-item>
            <el-form-item>
              <el-button type="success">导出房源</el-button>
            </el-form-item>
          </el-form>
        </div>

        <div class="filter high_grade" :class="isHigh? 'highHide':''">
          <el-form :inline="true" :model="formInline" size="mini" label-width="100px">
            <div class="filterTitle">
              <i class="el-icons-fa-bars"></i>&nbsp;&nbsp;高级搜索
            </div>
            <el-row class="el_row_border">
              <el-col :span="12">
                <el-row>
                  <el-col :span="8">
                    <div class="el_col_label">店面</div>
                  </el-col>
                  <el-col :span="16" class="el_col_option">
                    <el-form-item>
                      <el-select v-model="formInline.house" clearable placeholder="请选择">
                        <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
                        </el-option>
                      </el-select>
                    </el-form-item>
                  </el-col>
                </el-row>
              </el-col>
              <el-col :span="12">
                <el-row>
                  <el-col :span="8">
                    <div class="el_col_label">户型</div>
                  </el-col>
                  <el-col :span="16" class="el_col_option">
                    <el-form-item>
                      <el-select v-model="formInline.a" clearable placeholder="请选择" value="">
                        <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
                        </el-option>
                      </el-select>
                    </el-form-item>
                  </el-col>
                </el-row>
              </el-col>
            </el-row>
            <el-row class="el_row_border">
              <el-col :span="12">
                <el-row>
                  <el-col :span="8">
                    <div class="el_col_label">状态</div>
                  </el-col>
                  <el-col :span="16" class="el_col_option">
                    <el-form-item>
                      <el-select v-model="formInline.house" clearable placeholder="请选择">
                        <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
                        </el-option>
                      </el-select>
                    </el-form-item>
                  </el-col>
                </el-row>
              </el-col>
            </el-row>
            <div class="btnOperate">
              <el-button size="mini" type="primary">搜索</el-button>
              <el-button size="mini" type="primary" @click="resetting">重置</el-button>
              <el-button size="mini" type="primary" @click="highGrade">取消</el-button>
            </div>
          </el-form>
        </div>

      </div>
      <div class="main">
        <div class="myHouse">
          <div class="blueTable" @contextmenu="houseHeadMenu($event)">
            <el-table
              :data="collectData"
              @row-dblclick="dblClickTable"
              @row-contextmenu='houseMenu'
              style="width: 100%">
              <el-table-column
                prop="contract_num"
                label="合同编号">
              </el-table-column>
              <el-table-column
                prop="address"
                label="房屋地址">
              </el-table-column>
              <el-table-column
                prop="house_type"
                label="房屋类型">
              </el-table-column>
              <el-table-column
                prop="deposit"
                label="收房押金">
              </el-table-column>
              <el-table-column
                prop="price"
                label="收房价格">
              </el-table-column>
              <el-table-column
                prop="pay_type"
                label="付款方式">
              </el-table-column>
              <el-table-column
                prop="vacancy"
                label="空置期">
              </el-table-column>
              <el-table-column
                prop="contract_year"
                label="签约时长">
              </el-table-column>
              <el-table-column
                prop="start_time"
                label="开始日期">
              </el-table-column>
              <el-table-column
                prop="end_time"
                label="结束日期">
              </el-table-column>
              <el-table-column
                prop="medium_price"
                label="中介费">
              </el-table-column>
              <el-table-column
                prop="department"
                label="所属部门">
              </el-table-column>
              <el-table-column
                prop="staff_name"
                label="签约人">
              </el-table-column>
              <el-table-column
                prop="charge_name"
                label="负责人">
              </el-table-column>
              <el-table-column
                prop="phone"
                label="电话">
              </el-table-column>
            </el-table>
          </div>
          <div class="tableBottom">
            <div class="right">
              <div>未租房源 <span>5&nbsp;套</span></div>
              <div>已定 <span>0&nbsp;套</span></div>
            </div>

            <div class="left">
              <el-pagination
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page="currentPage"
                :page-sizes="[10, 20, 30, 40]"
                :page-size="10"
                layout="total, sizes, prev, pager, next, jumper"
                :total="400">
              </el-pagination>
            </div>
          </div>
        </div>
        <div class="myClient">
          <div class="greenTable" @contextmenu="houseHeadMenu($event)">
            <el-table
              :data="rentingData"
              @row-click="clickTable"
              @row-contextmenu='clientMenu'
              style="width: 100%">
              <el-table-column
                prop="contract_num"
                label="合同编号">
              </el-table-column>
              <el-table-column
                prop="address"
                label="房屋地址">
              </el-table-column>
              <el-table-column
                prop="house_type"
                label="房屋类型">
              </el-table-column>
              <el-table-column
                prop="deposit"
                label="价格差">
              </el-table-column>
              <el-table-column
                prop="price"
                label="出租价格">
              </el-table-column>
              <el-table-column
                prop="pay_type"
                label="付款方式">
              </el-table-column>
              <el-table-column
                prop="vacancy"
                label="空置期">
              </el-table-column>
              <el-table-column
                prop="contract_year"
                label="签约时长">
              </el-table-column>
              <el-table-column
                prop="start_time"
                label="开始日期">
              </el-table-column>
              <el-table-column
                prop="end_time"
                label="结束日期">
              </el-table-column>
              <el-table-column
                prop="medium_price"
                label="中介费">
              </el-table-column>
              <el-table-column
                prop="department"
                label="所属部门">
              </el-table-column>
              <el-table-column
                prop="staff_name"
                label="签约人">
              </el-table-column>
              <el-table-column
                prop="charge_name"
                label="负责人">
              </el-table-column>
            </el-table>
          </div>
          <div class="tableBottom">
            <div class="right">
              <div>本套相差 <span>0&nbsp;元</span></div>
              <div>押金差 <span>0&nbsp;元</span></div>
            </div>

            <div class="left">
              <el-pagination
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page="currentPage"
                :page-sizes="[10, 20, 30, 40]"
                :page-size="10"
                layout="total, sizes, prev, pager, next, jumper"
                :total="0">
              </el-pagination>
            </div>
          </div>
        </div>
        <div class="myDetail" @contextmenu="detailMenu($event)">
          <el-tabs type="border-card">
            <el-tab-pane label="房东信息">
              <OwnerInfoTab></OwnerInfoTab>
            </el-tab-pane>
            <el-tab-pane label="租客信息">
              <RentInfoTab></RentInfoTab>
            </el-tab-pane>
            <el-tab-pane label="欠费信息">
              <InDebtInfoTab></InDebtInfoTab>
            </el-tab-pane>
            <el-tab-pane label="物品增减">
              <GoodsChangeTab></GoodsChangeTab>
            </el-tab-pane>
            <el-tab-pane label="退/换房记录">
              <ReturnRomeInfoTab></ReturnRomeInfoTab>
            </el-tab-pane>
            <el-tab-pane label="续约/延期">
              <RenewContractTab></RenewContractTab>
            </el-tab-pane>
            <el-tab-pane label="转租记录">
              <subletRecordTab></subletRecordTab>
            </el-tab-pane>
            <el-tab-pane label="应收款项">
              <ReceivableItemTab></ReceivableItemTab>
            </el-tab-pane>
            <el-tab-pane label="应付款项">
              <PayableItemTab></PayableItemTab>
            </el-tab-pane>
            <el-tab-pane label="资料备忘">
              <MemorandumTab></MemorandumTab>
            </el-tab-pane>
            <el-tab-pane label="回访记录">
              <returnVisitRecordTab></returnVisitRecordTab>
            </el-tab-pane>
            <el-tab-pane label="跟进记录">
              <followRecordTab></followRecordTab>
            </el-tab-pane>
            <el-tab-pane label="维修">
              <ServiceRecordTab></ServiceRecordTab>
            </el-tab-pane>
          </el-tabs>
        </div>
      </div>
    </div>
    <RightMenu :startX="rightMenuX+'px'" :startY="rightMenuY+'px'" :list="lists" :show="show"
               @clickOperate="clickEvent"></RightMenu>
    <Instruction :instructionDialog="instructionDialog" @close="closeModal"></Instruction>
    <BackUp :backUpDialog="backUpDialog" @close="closeModal"></BackUp>
    <Advanced :advancedDialog="advancedDialog" @close="closeModal"></Advanced>
    <OwnerDelay :ownerDelayDialog="ownerDelayDialog" @close="closeModal"></OwnerDelay>
    <RentVacation :rentVacationDialog="rentVacationDialog" @close="closeModal"></RentVacation>
    <IncreaseGoods :increaseGoodsDialog="increaseGoodsDialog" @close="closeModal"></IncreaseGoods>
    <DecreaseGoods :decreaseGoodsDialog="decreaseGoodsDialog" @close="closeModal"></DecreaseGoods>
    <OwnerArrears :ownerArrearsDialog="ownerArrearsDialog" @close="closeModal"></OwnerArrears>
    <OwnerRenew :ownerRenewDialog="ownerRenewDialog" @close="closeModal"></OwnerRenew>
    <AddFollowUp :addFollowUpDialog="addFollowUpDialog" @close="closeModal"></AddFollowUp>
    <CollectVacation :collectVacationDialog="collectVacationDialog" @close="closeModal"></CollectVacation>
    <AddCollectRepair :addCollectRepairDialog="addCollectRepairDialog" @close="closeModal"></AddCollectRepair>
    <AddRentRepair :addRentRepairDialog="addRentRepairDialog" @close="closeModal"></AddRentRepair>
    <RentChangeRoom :rentChangeRoomDialog="rentChangeRoomDialog" @close="closeModal"></RentChangeRoom>
    <Sublease :subleaseDialog="subleaseDialog" @close="closeModal"></Sublease>
    <RentRenew :rentRenewDialog="rentRenewDialog" @close="closeModal"></RentRenew>
    <AddRentInfo :addRentInfoDialog="addRentInfoDialog" @close="closeModal"></AddRentInfo>
    <SendMessage :sendMessageDialog="sendMessageDialog" @close="closeModal"></SendMessage>
    <AddHouseResources :addHouseResourcesDialog="addHouseResourcesDialog" @close="closeModal"></AddHouseResources>
    <Repayment :repaymentDialog="repaymentDialog" @close="closeModal"></Repayment>
    <ReturnVisit :returnVisitDialog="returnVisitDialog" @close="closeModal"></ReturnVisit>
    <TopForm :topFormSetDialog="topFormSetDialog" @close="closeModal"></TopForm>
    <Setting :settingDialog="settingDialog" @close="closeModal"></Setting>
    <visit-record :visitRecordDialog="visitRecordDialog" @close="closeModal"></visit-record>


  </div>
</template>

<script>
  import RightMenu from '../../common/rightMenu.vue'    //右键
  import Instruction from './components/instruction.vue'            //使用说明
  import BackUp from '../components/back-up.vue'                    //备份
  import Advanced from '../components/advancedSearch.vue'           //高级搜索
  import OwnerDelay from '../components/ownerDelay.vue'              //房东延期
  import OwnerRenew from '../components/ownerRenew.vue'              //房东续约
  import RentVacation from '../components/rentVacation.vue'          //租客续约
  import IncreaseGoods from '../components/increaseGoods.vue' //物品增加
  import DecreaseGoods from '../components/decreaseGoods.vue' //物品减少
  import OwnerArrears from '../components/OwnerArrears.vue'   //房东欠款
  import AddFollowUp from '../components/addFollowUp.vue'     //增加跟进记录
  import CollectVacation from '../components/collectVacation.vue' //房东退房
  import AddCollectRepair from '../components/addCollectRepair.vue' //添加房东维修
  import AddRentRepair from '../components/addRentRepair.vue'//添加租客维修
  import RentChangeRoom from '../components/rentChangeRoom.vue'   //租客换房
  import Sublease from '../components/sublease.vue'     //转租
  import RentRenew from '../components/rentRenew.vue'     //租客续约
  import AddRentInfo from '../components/addRentInfo.vue' //登记租客
  import SendMessage from '../../common/sendMessage.vue'  //发送短信
  import AddHouseResources from '../components/addHouseResources.vue' //登记房源
  import Repayment from '../components/rentRepayment.vue'
  import ReturnVisit from '../components/returnVisit.vue'   //查看回访
  import TopForm from '../components/topFormSet.vue'    //表头列表
  import Setting from './components/setting.vue'
  import VisitRecord from './../components/visitRecord.vue'    //回访记录
  //--------------------------tabs content-----------------------------------------------------------------//
  import GoodsChangeTab from '../tabComponents/goodsChange.vue'
  import OwnerInfoTab from '../tabComponents/ownerInfo.vue'
  import RentInfoTab from '../tabComponents/rentInfo.vue'
  import InDebtInfoTab from '../tabComponents/InDebtInfo.vue'
  import ReturnRomeInfoTab from '../tabComponents/returnRomeInfo.vue'
  import RenewContractTab from '../tabComponents/renewContract.vue'
  import subletRecordTab from '../tabComponents/subletRecord.vue'
  import ReceivableItemTab from '../tabComponents/receivableItem.vue'
  import PayableItemTab from '../tabComponents/payableItem.vue'
  import MemorandumTab from '../tabComponents/memorandum.vue'
  import returnVisitRecordTab from '../tabComponents/returnVistitRecord.vue'
  import followRecordTab from '../tabComponents/followRecord.vue'
  import ServiceRecordTab from '../tabComponents/serviceRecord.vue'
  export default {
    name: 'hello',
    components: {
      RightMenu,
      Instruction,
      BackUp,
      Advanced,
      OwnerRenew,
      OwnerDelay,
      RentVacation,
      IncreaseGoods,
      DecreaseGoods,
      OwnerArrears,
      AddFollowUp,
      CollectVacation,
      AddCollectRepair,
      AddRentRepair,
      RentChangeRoom,
      Sublease,
      RentRenew,
      AddRentInfo,
      SendMessage,
      AddHouseResources,
      Repayment,
      ReturnVisit,
      TopForm,
      Setting,
      VisitRecord,

      //-------tabs------//
      GoodsChangeTab,
      OwnerInfoTab,
      RentInfoTab,
      InDebtInfoTab,
      ReturnRomeInfoTab,
      RenewContractTab,
      subletRecordTab,
      ReceivableItemTab,
      PayableItemTab,
      MemorandumTab,
      returnVisitRecordTab,
      followRecordTab,
      ServiceRecordTab,
    },
    data () {
      return {
        rightMenuX: 0,
        rightMenuY: 0,
        show: false,
        lists: [],
        /***********/
        //模态框
        instructionDialog: false,//使用说明
        backUpDialog: false, //备份
        advancedDialog: false,//高级搜索
        ownerRenewDialog: false,//房东续约
        ownerDelayDialog: false,//房东延期
        rentVacationDialog: false, //租客退房
        decreaseGoodsDialog: false,  //物品搬出
        increaseGoodsDialog: false,  //物品增加
        ownerArrearsDialog: false,   //房东欠款
        addFollowUpDialog :false,     //添加跟进
        collectVacationDialog:false,     //房东退房
        addCollectRepairDialog:false,    //房东添加维修
        addRentRepairDialog:false,       //租客添加维修
        rentChangeRoomDialog:false,      //租客换房
        subleaseDialog:false,           //转租
        rentRenewDialog:false,          //租客续约
        addRentInfoDialog:false,      //登记租客信息
        sendMessageDialog:false,      //发送短信
        addHouseResourcesDialog:false,  //登记房源
        repaymentDialog:false,        //还款
        returnVisitDialog:false,      //查看回访
        topFormSetDialog:false,       //选择列
        settingDialog : false,        //设置
        visitRecordDialog: false,    //回访记录

        isHigh: false,

        formInline: {},
        collectData: [
          {
            id: '1',
            contract_num: 'LJSF0000001',
            address: '天华硅谷',
            house_type: '三室一厅',
            deposit: '8888',
            price: '3500',
            pay_type: '月付',
            vacancy: '30',
            contract_year: '3年',
            start_time: '2018-1-1',
            end_time: '2021-1-1',
            medium_price: '2000',
            department: '市场部',
            staff_name: '陆宣羽',
            charge_name: '陆宣羽',
            phone: '15800008888',
          },
          {
            id: '1',
            contract_num: 'LJSF0000001',
            address: '天华硅谷',
            house_type: '三室一厅',
            deposit: '8888',
            price: '3500',
            pay_type: '月付',
            vacancy: '30',
            contract_year: '3年',
            start_time: '2018-1-1',
            end_time: '2021-1-1',
            medium_price: '2000',
            department: '市场部',
            staff_name: '陆宣羽',
            charge_name: '陆宣羽',
            phone: '15800008888',
          },
          {
            id: '1',
            contract_num: 'LJSF0000001',
            address: '天华硅谷',
            house_type: '三室一厅',
            deposit: '8888',
            price: '3500',
            pay_type: '月付',
            vacancy: '30',
            contract_year: '3年',
            start_time: '2018-1-1',
            end_time: '2021-1-1',
            medium_price: '2000',
            department: '市场部',
            staff_name: '陆宣羽',
            charge_name: '陆宣羽',
            phone: '15800008888',
          },
          {
            id: '1',
            contract_num: 'LJSF0000001',
            address: '天华硅谷',
            house_type: '三室一厅',
            deposit: '8888',
            price: '3500',
            pay_type: '月付',
            vacancy: '30',
            contract_year: '3年',
            start_time: '2018-1-1',
            end_time: '2021-1-1',
            medium_price: '2000',
            department: '市场部',
            staff_name: '陆宣羽',
            charge_name: '陆宣羽',
            phone: '15800008888',
          },
          {
            id: '1',
            contract_num: 'LJSF0000001',
            address: '天华硅谷',
            house_type: '三室一厅',
            deposit: '8888',
            price: '3500',
            pay_type: '月付',
            vacancy: '30',
            contract_year: '3年',
            start_time: '2018-1-1',
            end_time: '2021-1-1',
            medium_price: '2000',
            department: '市场部',
            staff_name: '陆宣羽',
            charge_name: '陆宣羽',
            phone: '15800008888',
          },
        ],
        rentingData: [
          {
            id: '1',
            contract_num: 'LJSF0000001',
            address: '天华硅谷',
            house_type: '三室一厅',
            deposit: '8888',
            price: '3500',
            pay_type: '月付',
            vacancy: '30',
            contract_year: '3年',
            start_time: '2018-1-1',
            end_time: '2021-1-1',
            medium_price: '2000',
            department: '市场部',
            staff_name: '陆宣羽',
            charge_name: '陆宣羽',
            phone: '15800008888',
          },
          {
            id: '1',
            contract_num: 'LJSF0000001',
            address: '天华硅谷',
            house_type: '三室一厅',
            deposit: '8888',
            price: '3500',
            pay_type: '月付',
            vacancy: '30',
            contract_year: '3年',
            start_time: '2018-1-1',
            end_time: '2021-1-1',
            medium_price: '2000',
            department: '市场部',
            staff_name: '陆宣羽',
            charge_name: '陆宣羽',
            phone: '15800008888',
          },
          {
            id: '1',
            contract_num: 'LJSF0000001',
            address: '天华硅谷',
            house_type: '三室一厅',
            deposit: '8888',
            price: '3500',
            pay_type: '月付',
            vacancy: '30',
            contract_year: '3年',
            start_time: '2018-1-1',
            end_time: '2021-1-1',
            medium_price: '2000',
            department: '市场部',
            staff_name: '陆宣羽',
            charge_name: '陆宣羽',
            phone: '15800008888',
          }
        ],
        currentPage: 1,
        options: [],
      }
    },
    mounted(){
      $('tbody tr').click(function () {
        $(this).addClass('selected_tr').siblings().removeClass('selected_tr');
      });
    },
    methods: {
      handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
      },
      handleCurrentChange(val) {
        console.log(`当前页: ${val}`);
      },
      clickTable(row, event, column){
        console.log(row, event, column)
      },
      //房屋右键
      houseMenu(row, event){
        this.lists = [
          {clickIndex: 'addHouseResourcesDialog', headIcon: 'el-icons-fa-home', label: '修改房源',},
          {
            clickIndex: '', headIcon: 'el-icons-fa-pencil-square-o', tailIcon: 'el-icon-arrow-right', label: '房东续约/延期',
            children: [
              {clickIndex: 'ownerRenewDialog', label: '续约',},
              {clickIndex: 'ownerDelayDialog', label: '延期',}
            ]
          },
          {clickIndex: 'collectVacationDialog', headIcon: 'el-icons-fa-reply', label: '房东退房',},
          {
            clickIndex: '', headIcon: 'el-icons-fa-folder-o', tailIcon: 'el-icon-arrow-right', label: '其他',
            children: [
              {clickIndex: 'switchToJoint', label: '转到合租',},
              {clickIndex: 'addFollowUpDialog', label: '添加跟进',}
            ]
          },
          {clickIndex: 'ownerArrearsDialog', headIcon: 'el-icons-fa-cny', label: '房东欠款',},
          {
            clickIndex: '', headIcon: 'el-icons-fa-inbox', tailIcon: 'el-icon-arrow-right', label: '物品增减',
            children: [
              {clickIndex: 'decreaseGoodsDialog', label: '物品搬出',},
              {clickIndex: 'increaseGoodsDialog', label: '物品增进',}
            ]
          },
          {clickIndex: 'addCollectRepairDialog', headIcon: 'el-icons-fa-gear', label: '维修',},
          {clickIndex: 'sendMessageDialog', headIcon: 'el-icons-fa-envelope-o', label: '发送短信',},
          {clickIndex: 'visitRecordDialog', headIcon: 'el-icons-fa-pencil-square-o', label: '回访记录',},
        ];
        this.contextMenuParam(event);
      },
      //合同表头右键
      houseHeadMenu(e){
        this.lists = [
          {clickIndex: 'topFormSetDialog', headIcon: 'el-icons-fa-home', label: '选择列选项',},
        ];
        this.contextMenuParam(event);
      },

      //详情表头右键
      detailMenu(e){
        if (e.target.className.indexOf('el-tabs__item') > -1 || e.target.className.indexOf('el-tabs__nav-scroll') > -1) {
          this.lists = [
            {clickIndex: 1, headIcon: 'el-icons-fa-home', label: '选择列选项',},
          ];
          this.contextMenuParam(event);
        }
      },
      dblClickTable(row, event){   //双击
        const {href} = this.$router.resolve({path: '/rentingDetail',query:{id:'1'}});
        window.open(href,'_blank','width=1920,height=1080');
      },
      //右键回调时间
      clickEvent (index) {
        this.openModalDialog(index);
      },
      //关闭右键菜单
      closeMenu(){
        this.show = false;
      },
      //租客右键
      clientMenu(row, event){
        this.lists = [
          {
            clickIndex: '', headIcon: 'el-icons-fa-user', tailIcon: 'el-icon-arrow-right', label: '租客管理',
            children: [
              {clickIndex: 'addRentInfoDialog', label: '登记租客信息',},
              {clickIndex: 'addRentInfoDialog', label: '修改租客信息',},
            ]
          },
          {clickIndex: 'rentRenewDialog', headIcon: 'el-icons-fa-pencil-square-o', label: '租客续约',},
          {
            clickIndex: '', headIcon: 'el-icons-fa-home', tailIcon: 'el-icon-arrow-right', label: '退房/调房',
            children: [
              {clickIndex: 'rentVacationDialog', label: '租客退房',},
              {clickIndex: 'rentChangeRoomDialog', label: '租客调房',}
            ]
          },
          {clickIndex: 'subleaseDialog', headIcon: 'el-icons-fa-refresh', label: '转租',},
          {clickIndex: 'ownerArrearsDialog', headIcon: 'el-icons-fa-cny', label: '租客欠款',},
          {clickIndex: 'addRentRepairDialog', headIcon: 'el-icons-fa-gear', label: '报修',},
          {clickIndex: 'sendMessageDialog', headIcon: 'el-icons-fa-envelope-o', label: '发送短信',},
          {clickIndex: 'addFollowUpDialog', headIcon: 'el-icons-fa-plus', label: '添加跟进',},
          {clickIndex: 'visitRecordDialog', headIcon: 'el-icons-fa-pencil-square-o', label: '回访记录',},
        ];
        this.contextMenuParam(event);
      },

      //右键参数
      contextMenuParam(event){
        //param: user right param
        let e = event || window.event;	//support firefox contextmenu
        this.show = false;
        this.rightMenuX = e.clientX + document.documentElement.scrollLeft - document.documentElement.clientLeft;
        this.rightMenuY = e.clientY + document.documentElement.scrollTop - document.documentElement.clientTop;


//        console.log(this.rightMenuX,this.rightMenuY)
        event.preventDefault();
        event.stopPropagation();
        this.$nextTick(() => {
          this.show = true
        })
      },
      /*****************************模态框打开******************************/
      openModalDialog(type){
        switch (type) {
          case 'instructionDialog':   //说明书
            this.instructionDialog = true;
            break;
          case 'backUpDialog':        //备份
            this.backUpDialog = true;
            break;
          case 'advancedDialog':      //高级搜索
            this.advancedDialog = true;
            break;
          case 'ownerRenewDialog':    //房东续约
            this.ownerRenewDialog = true;
            break;
          case 'ownerDelayDialog':    //房东延期
            this.ownerDelayDialog = true;
            break;
          case 'rentVacationDialog':        //租客退房
            this.rentVacationDialog = true;
            break;
          case 'increaseGoodsDialog':     //物品增加
            this.increaseGoodsDialog = true;
            break;
          case 'decreaseGoodsDialog':     //物品增加
            this.decreaseGoodsDialog = true;
            break;
          case 'ownerArrearsDialog':     //物品增加
            this.ownerArrearsDialog = true;
            break;
          case 'addFollowUpDialog':     //增加跟进
            this.addFollowUpDialog = true;
            break;
          case 'collectVacationDialog':     //房东退房
            this.collectVacationDialog = true;
            break;
          case 'addCollectRepairDialog':     //房东报修
            this.addCollectRepairDialog = true;
            break;
          case 'addRentRepairDialog':     //租客保修
            this.addRentRepairDialog = true;
            break;
          case 'rentChangeRoomDialog':     //租客换房
            this.rentChangeRoomDialog = true;
            break;
          case 'subleaseDialog':     //转租
            this.subleaseDialog = true;
            break;
          case 'rentRenewDialog':     //租客续约
            this.rentRenewDialog = true;
            break;
          case 'addRentInfoDialog':     //登记租客信息
            this.addRentInfoDialog = true;
            break;
          case 'sendMessageDialog':     //登记租客信息
            this.sendMessageDialog = true;
            break;
          case 'addHouseResourcesDialog':     //登记房源
            this.addHouseResourcesDialog = true;
            break;
          case 'repaymentDialog':     //还款
            this.repaymentDialog = true;
            break;
          case 'returnVisitDialog':     //回访信息
            this.returnVisitDialog = true;
            break;
          case 'switchToJoint':     //转到合租
            this.switchToJoint();
            break;
          case 'topFormSetDialog':     //转到合租
            this.topFormSetDialog = true;
            break;
          case 'settingDialog':     //转到合租
            this.settingDialog = true;
            break;
          case 'visitRecordDialog':
            this.visitRecordDialog = true;
            break;
        }

      },
      switchToJoint(){
        this.$confirm('转移以后不可恢复, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$message({
            type: 'success',
            message: '转移成功!'
          });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消转移'
          });
        });
      },
      closeModal(){
        this.instructionDialog = false
        this.backUpDialog = false;
        this.advancedDialog = false;
        this.ownerDelayDialog = false;
        this.rentVacationDialog = false;
        this.increaseGoodsDialog = false;
        this.decreaseGoodsDialog = false;
        this.ownerArrearsDialog = false;
        this.ownerRenewDialog = false;
        this.addFollowUpDialog = false;
        this.collectVacationDialog = false;
        this.addCollectRepairDialog = false;
        this.addRentRepairDialog = false;
        this.rentChangeRoomDialog = false;
        this.subleaseDialog = false;
        this.rentRenewDialog = false;
        this.addRentInfoDialog = false;
        this.sendMessageDialog = false;
        this.addHouseResourcesDialog = false;
        this.repaymentDialog = false;
        this.returnVisitDialog = false;
        this.topFormSetDialog = false;
        this.settingDialog = false;
        this.visitRecordDialog = false;
      },

      highGrade(){
        this.isHigh = !this.isHigh;
      },
      resetting(){

      },
    },
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped="">

  #wholeRentContainer {
    .tool {
      border-bottom: 1px solid #eee;
      display: flex;
      padding-bottom: 10px;
      justify-content: space-between;
      .tool_right {
        display: flex;
        align-items: center;
        div {
          width: 100px;
          text-align: center;
          cursor: pointer;
          i {
            color: #409EFF;
          }
        }
      }
    }

    .filter {
      padding-top: 10px;
    }
    .main {
      font-size: 12px;
      .tableBottom {
        padding: 8px;
        display: flex;
        justify-content: space-between;
        .right {
          display: flex;
          align-items: center;
          div {
            width: 100px;
            text-align: center;
            span {
              color: #fb529f;
            }
            &:first-child {
              border-right: 1px solid #ccc;
            }
          }
        }
      }
      .myHouse,.myClient {
        border: 1px solid #dfe6fb;
        margin-bottom: 20px;
        box-shadow: 0 2px 4px 0 rgba(0, 0, 0, .12), 0 0 6px 0 rgba(0, 0, 0, .04);
      }
      .myDetail {
        margin-bottom: 15px;
        .el-tabs {
          border: 1px solid #d4f0de;
          .el-tabs__content {
            min-height: 100px;
            .el-tab-pane {

            }
          }
        }
      }
    }
  }
</style>
