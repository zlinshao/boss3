<template>
  <div id="examineAndApprove">
    <div class="highRanking" style=" position: absolute; top: 122px; right: 30px;z-index: 6;"
         v-if="activeName!='sixth'">
      <div class="highSearch">
        <el-form :inline="true" onsubmit="return false" size="mini">
          <el-form-item v-if="activeName === 'second'">
            <el-button type="primary" @click="getCityList">城市筛选</el-button>
          </el-form-item>
          <el-form-item>
            <el-input placeholder="小区名称/地址/位置" v-model="params.q" @keyup.enter.native="search(1)" size="mini"
                      clearable>
              <el-button slot="append" icon="el-icon-search" @click="search(1)"></el-button>
            </el-input>
          </el-form-item>
        </el-form>
      </div>
    </div>
    <el-tabs v-model="activeName" @tab-click="tabActive(activeName)">
      <el-tab-pane label="待办事项" name="second">
        <el-badge slot="label" :is-dot="false" class="item">待办事项</el-badge>
        <div class="myTable">
          <el-table
            :empty-text='emptyContent'
            v-loading="examineLoading"
            element-loading-text="拼命加载中"
            element-loading-spinner="el-icon-loading"
            element-loading-background="rgba(255, 255, 255, 0)"
            :data="tableData"
            @row-dblclick="dblClickTable"
            :row-class-name="rowBackground"
            :cell-class-name="colTag"
            style="width: 100%">
            <el-table-column
              label="#"
              width="40">
            </el-table-column>
            <el-table-column
              prop="created_at"
              label="发起时间">
            </el-table-column>
            <el-table-column
              prop="bulletin"
              label="报备类型">
            </el-table-column>
            <el-table-column
              prop="name"
              label="报备人">
            </el-table-column>
            <el-table-column
              prop="house_name"
              label="房屋地址">
            </el-table-column>
            <el-table-column
              label="归属公司"
            >
              <template slot-scope="scope">
                <span style="color: #525252;" v-if="house_name && scope.row.house_id && house_name[scope.row.house_id]">{{ house_name[scope.row.house_id].corp_name }}</span>
                <span style="color: #525252;" v-else>暂无</span>
              </template>
            </el-table-column>
            <el-table-column
              prop="places"
              label="状态">
              <template slot-scope="scope">
                <el-tag :type="statusStyle(scope.row)" size="mini">{{ scope.row.places }}</el-tag>
              </template>
            </el-table-column>
            <el-table-column
              prop="finish_at"
              label="完成时间">
            </el-table-column>
          </el-table>
        </div>
      </el-tab-pane>
      <el-tab-pane label="暂不处理" name="seventh">
        <div class="tableLeft">
          <el-table
            :empty-text='emptyContent'
            v-loading="examineLoading"
            element-loading-text="拼命加载中"
            element-loading-spinner="el-icon-loading"
            element-loading-background="rgba(255, 255, 255, 0)"
            :data="tableData"
            @row-dblclick="dblClickTable"
            :row-class-name="rowBackground"
            :cell-class-name="colTag"
            style="width: 100%">
            <el-table-column
              label="#"
              width="40">
            </el-table-column>
            <el-table-column
              prop="created_at"
              label="发起时间">
            </el-table-column>
            <el-table-column
              prop="bulletin"
              label="报备类型">
            </el-table-column>
            <el-table-column
              prop="name"
              label="报备人">
            </el-table-column>
            <el-table-column
              prop="house_name"
              label="房屋地址">
            </el-table-column>
            <el-table-column
              prop="places"
              label="状态">
              <template slot-scope="scope">
                <el-tag :type="statusStyle(scope.row)" size="mini">{{ scope.row.places }}</el-tag>
              </template>
            </el-table-column>
            <el-table-column
              prop="finish_at"
              label="完成时间">
            </el-table-column>
          </el-table>
        </div>
      </el-tab-pane>
      <el-tab-pane label="我审批的" name="third">
        <el-badge slot="label" :is-dot="false" class="item">我审批的</el-badge>
        <el-table
          :empty-text='emptyContent'
          v-loading="examineLoading"
          element-loading-text="拼命加载中"
          element-loading-spinner="el-icon-loading"
          element-loading-background="rgba(255, 255, 255, 0)"
          :data="tableData"
          @row-dblclick="dblClickTable"
          :row-class-name="rowBackground"
          :cell-class-name="colTag"
          style="width: 100%">
          <el-table-column
            label="#"
            width="40">
          </el-table-column>
          <el-table-column
            prop="created_at"
            label="发起时间">
          </el-table-column>
          <el-table-column
            prop="bulletin"
            label="报备类型">
          </el-table-column>
          <el-table-column
            prop="name"
            label="报备人">
          </el-table-column>
          <el-table-column
            prop="house_name"
            label="房屋地址">
          </el-table-column>
          <el-table-column
            label="归属公司"
          >
            <template slot-scope="scope">
              <span style="color: #525252;" v-if="house_name && scope.row.house_id && house_name[scope.row.house_id]">{{ house_name[scope.row.house_id].corp_name }}</span>
              <span style="color: #525252;" v-else>暂无</span>
            </template>
          </el-table-column>
          <el-table-column
            prop="places"
            label="状态">
            <template slot-scope="scope">
              <el-tag :type="statusStyle(scope.row)" size="mini">{{ scope.row.places }}</el-tag>
            </template>
          </el-table-column>
          <el-table-column
            prop="finish_at"
            label="完成时间">
          </el-table-column>
        </el-table>
      </el-tab-pane>
      <el-tab-pane label="我发起的" name="fourth">
        <el-badge slot="label" :is-dot="false" class="item">我发起的</el-badge>
        <div class="twoFlex">
          <div>
            <el-radio-group v-model="isCollapse" class="btnCollapse">
              <el-radio-button :label="!isCollapse" :class="{'sss1':isCollapse,'sss':!isCollapse}">
                <i class="el-icon-arrow-right"></i></el-radio-button>
            </el-radio-group>
            <el-menu default-active="1-4-1" class="el-menu-vertical-demo" @select="onSelect" @open="handleOpen"
                     @close="handleClose"
                     :collapse="isCollapse">
              <el-menu-item index="unfinished">
                <i class="iconfont icon-daiban"></i>
                <span slot="title">未完成</span>
              </el-menu-item>
              <el-menu-item index="finish">
                <i class="iconfont icon-wancheng"></i>
                <span slot="title">已完成</span>
              </el-menu-item>
            </el-menu>
          </div>
          <div class="tableLeft">
            <el-table
              :empty-text='emptyContent'
              v-loading="examineLoading"
              element-loading-text="拼命加载中"
              element-loading-spinner="el-icon-loading"
              element-loading-background="rgba(255, 255, 255, 0)"
              :data="tableData"
              @row-dblclick="dblClickTable"
              :row-class-name="rowBackground"
              :cell-class-name="colTag"
              style="width: 100%">
              <el-table-column
                label="#"
                width="40">
              </el-table-column>
              <el-table-column
                prop="created_at"
                label="发起时间">
              </el-table-column>
              <el-table-column
                prop="bulletin"
                label="报备类型">
              </el-table-column>
              <el-table-column
                prop="name"
                label="报备人">
              </el-table-column>
              <el-table-column
                prop="house_name"
                label="房屋地址">
              </el-table-column>
              <el-table-column
                prop="places"
                label="状态">
                <template slot-scope="scope">
                  <el-tag :type="statusStyle(scope.row)" size="mini">{{ scope.row.places }}</el-tag>
                </template>
              </el-table-column>
              <el-table-column
                prop="finish_at"
                label="完成时间">
              </el-table-column>
            </el-table>
          </div>
        </div>

        <!--<el-tabs v-model="finActive" @tab-click="childActive(activeName,finActive)">-->
        <!--<el-tab-pane label="未完成" name="unfinished">-->
        <!--<el-badge slot="label" :is-dot="false" class="item">未完成({{amount}})</el-badge>-->

        <!--</el-tab-pane>-->
        <!--<el-tab-pane label="已完成" name="finish">-->
        <!--<el-badge slot="label" :is-dot="false" class="item">已完成</el-badge>-->
        <!--<el-table-->
        <!--:data="tableData"-->
        <!--@row-dblclick="dblClickTable"-->
        <!--style="width: 100%">-->
        <!--<el-table-column-->
        <!--prop="created_at"-->
        <!--label="发起时间">-->
        <!--</el-table-column>-->
        <!--<el-table-column-->
        <!--prop="bulletin"-->
        <!--label="报备类型">-->
        <!--</el-table-column>-->
        <!--<el-table-column-->
        <!--prop="name"-->
        <!--label="报备人">-->
        <!--</el-table-column>-->
        <!--<el-table-column-->
        <!--prop="house_name"-->
        <!--label="房屋地址">-->
        <!--</el-table-column>-->
        <!--<el-table-column-->
        <!--prop="place"-->
        <!--label="状态">-->
        <!--</el-table-column>-->
        <!--<el-table-column-->
        <!--prop="finish_at"-->
        <!--label="完成时间">-->
        <!--</el-table-column>-->
        <!--</el-table>-->
        <!--</el-tab-pane>-->
        <!--</el-tabs>-->
      </el-tab-pane>
      <el-tab-pane label="抄送我的" name="fifth">
        <el-badge slot="label" :is-dot="false" class="item">抄送我的</el-badge>

        <div class="twoFlex">
          <div>
            <el-radio-group v-model="isCollapse" class="btnCollapse">
              <el-radio-button :label="!isCollapse" :class="{'sss1':isCollapse,'sss':!isCollapse}">
                <i class="el-icon-arrow-right"></i></el-radio-button>
            </el-radio-group>
            <el-menu default-active="1-4-1" class="el-menu-vertical-demo" @select="onSelect" @open="handleOpen"
                     @close="handleClose"
                     :collapse="isCollapse">
              <el-menu-item index="unread">
                <i class="iconfont icon-yanjingclose"></i>
                <span slot="title">未读</span>
              </el-menu-item>
              <el-menu-item index="read">
                <i class="iconfont icon-yanjing"></i>
                <span slot="title">已读</span>
              </el-menu-item>
              <!--<el-menu-item index="all">-->
              <!--<i class="iconfont icon-jingjianmoshi"></i>-->
              <!--<span slot="title">全部</span>-->
              <!--</el-menu-item>-->
            </el-menu>
          </div>
          <div class="tableLeft">
            <el-table
              :empty-text='emptyContent'
              v-loading="examineLoading"
              element-loading-text="拼命加载中"
              element-loading-spinner="el-icon-loading"
              element-loading-background="rgba(255, 255, 255, 0)"
              :data="tableData"
              @row-dblclick="dblClickTable"
              :row-class-name="rowBackground"
              :cell-class-name="colTag"
              style="width: 100%">
              <el-table-column
                label="#"
                width="40">
              </el-table-column>
              <el-table-column
                prop="created_at"
                label="发起时间">
              </el-table-column>
              <el-table-column
                prop="bulletin"
                label="报备类型">
              </el-table-column>
              <el-table-column
                prop="name"
                label="报备人">
              </el-table-column>
              <el-table-column
                prop="house_name"
                label="房屋地址">
              </el-table-column>
              <el-table-column
                prop="places"
                label="状态">
                <template slot-scope="scope">
                  <el-tag :type="statusStyle(scope.row)" size="mini">{{ scope.row.places }}</el-tag>
                </template>
              </el-table-column>
              <el-table-column
                prop="finish_at"
                label="完成时间">
              </el-table-column>
            </el-table>
          </div>
        </div>

        <!--<el-tabs v-model="readActive" @tab-click="childActive(activeName,readActive)">-->
        <!--<el-tab-pane label="未读" name="unread">-->
        <!--<el-badge slot="label" :is-dot="false" class="item">未读({{amount}})</el-badge>-->
        <!--<el-table-->
        <!--:data="tableData"-->
        <!--@row-dblclick="dblClickTable"-->
        <!--style="width: 100%">-->
        <!--<el-table-column-->
        <!--prop="created_at"-->
        <!--label="发起时间">-->
        <!--</el-table-column>-->
        <!--<el-table-column-->
        <!--prop="bulletin"-->
        <!--label="报备类型">-->
        <!--</el-table-column>-->
        <!--<el-table-column-->
        <!--prop="name"-->
        <!--label="报备人">-->
        <!--</el-table-column>-->
        <!--<el-table-column-->
        <!--prop="house_name"-->
        <!--label="房屋地址">-->
        <!--</el-table-column>-->
        <!--<el-table-column-->
        <!--prop="place"-->
        <!--label="状态">-->
        <!--</el-table-column>-->
        <!--<el-table-column-->
        <!--prop="finish_at"-->
        <!--label="完成时间">-->
        <!--</el-table-column>-->
        <!--</el-table>-->
        <!--</el-tab-pane>-->
        <!--<el-tab-pane label="已读" name="read">-->
        <!--<el-badge slot="label" :is-dot="false" class="item">已读</el-badge>-->
        <!--<el-table-->
        <!--:data="tableData"-->
        <!--@row-dblclick="dblClickTable"-->
        <!--style="width: 100%">-->
        <!--<el-table-column-->
        <!--prop="created_at"-->
        <!--label="发起时间">-->
        <!--</el-table-column>-->
        <!--<el-table-column-->
        <!--prop="bulletin"-->
        <!--label="报备类型">-->
        <!--</el-table-column>-->
        <!--<el-table-column-->
        <!--prop="name"-->
        <!--label="报备人">-->
        <!--</el-table-column>-->
        <!--<el-table-column-->
        <!--prop="house_name"-->
        <!--label="房屋地址">-->
        <!--</el-table-column>-->
        <!--<el-table-column-->
        <!--prop="finish_at"-->
        <!--label="完成时间">-->
        <!--</el-table-column>-->
        <!--<el-table-column-->
        <!--prop="place"-->
        <!--label="状态">-->
        <!--</el-table-column>-->
        <!--<el-table-column-->
        <!--prop="finish_at"-->
        <!--label="完成时间">-->
        <!--</el-table-column>-->
        <!--</el-table>-->
        <!--</el-tab-pane>-->
        <!--</el-tabs>-->
      </el-tab-pane>
      <el-tab-pane label="全部" name="sixth">
        <ReportAll :active="activeName"></ReportAll>
      </el-tab-pane>

    </el-tabs>

    <div class="block pages" v-if="activeName!='sixth'">
      <el-pagination
        @current-change="search"
        :current-page="params.page"
        :page-size="12"
        layout="total, prev, pager, next, jumper"
        :total="paging">
      </el-pagination>
    </div>

    <Frames :module="frameVisible" @close='closeFrame'></Frames>
    <Lisu :module="lisuVisible" @close='closeFrame'></Lisu>
    <Zhusu :module="zhusuVisible" @close='closeFrame'></Zhusu>
    <Baoxiao :module="baoxiaoVisible" @close='closeFrame'></Baoxiao>
    <Career :module="shiyebuVisible" @close='closeFrame'></Career>
    <Gaoceng :module="gaocengVisible" @close='closeFrame'></Gaoceng>
    <Chuchai :module="chuchaiVisible" @close='closeFrame'></Chuchai>
    <Reserve :module="reserveVisible" @close='closeFrame'></Reserve>
    <Purchase :module="purchaseVisible" @close='closeFrame'></Purchase>
    <Leave :module="leaveVisible" @close='closeFrame'></Leave>
    <Takework :module="takeworkVisible" @close='closeFrame'></Takework>
    <Replenishment :module="replenishmentVisible" @close='closeFrame'></Replenishment>
    <Receipt :module="receiptVisible" @close='closeFrame'></Receipt>

    <Reimbursement :module="reimbursedetail" @close='closeFrame'></Reimbursement>
    <Reimbursedone :module="reimbursedone" @close='closeFrame'></Reimbursedone>
    <Reservedetail :module="reservedetail" @close='closeFrame'></Reservedetail>
    <Leavedetail :module="leavedetail" @close='closeFrame'></Leavedetail>
    <Takeworkdetail :module="takeworkdetail" @close='closeFrame'></Takeworkdetail>
    <Replenishmentdetail :module="replenishmentdetail" @close='closeFrame'></Replenishmentdetail>
    <Purchasedetail :module="purchasedetail" @close='closeFrame'></Purchasedetail>
    <Receiptdetail :module="receiptdetail" @close='closeFrame'></Receiptdetail>
    <ProblemReport :module="problemReportVisible" @close='closeFrame'></ProblemReport>
    <Repair :module="repairVisible" @close='closeFrame'></Repair>
    <MiscellaneousExpenses :module="miscellaneousExpensesVisible" @close='closeFrame'></MiscellaneousExpenses>
    <MiscellaneousExpensesOfficial :module="miscellaneousExpensesOfficialVisible"
                                   @close='closeFrame'></MiscellaneousExpensesOfficial>

    <!--报备详情-->
    <ReportDetail :module="reportModule" :reportId="reportID" @close="closeFrame"></ReportDetail>

    <!--城市-->
    <el-dialog
      :visible="city_visible"
      title="城市筛选"
      width="40%"
      @close="city_visible = false"
    >
      <el-checkbox-group v-model="city_id" @change="handleChangeCity">
        <el-checkbox v-for="(city,key) in city_list" :label="key" :key="city">{{city}}</el-checkbox>
      </el-checkbox-group>

      <div style="width: 100%;text-align: center;margin-top: 30px">
        <el-button size="mini" type="primary" @click="handleOkCity">确定</el-button>
        <el-button size="mini" @click="city_visible = false;">取消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>

  import ReportAll from './components/reportAll'; //全部
  import ReportDetail from '../../reportManage/components/editReportDetail'          //报备详情

  import Frames from './comments/frames.vue'
  import Lisu from './comments/lisu.vue'
  import Zhusu from './comments/zhusu.vue'
  import Baoxiao from './comments/baoxiao.vue'
  import Career from './comments/shiyebu.vue'
  import Gaoceng from './comments/gaoceng.vue'
  import Chuchai from './comments/chuchai.vue'
  import Reserve from './comments/reservemoney.vue'
  import Purchase from './comments/purchaseapply.vue'
  import Leave from './comments/leave.vue'
  import Takework from './comments/takework.vue'
  import Replenishment from './comments/replenishment.vue'
  import Receipt from './comments/receipt.vue'
  import ProblemReport from './comments/problemReport.vue'
  import Repair from './comments/repair.vue'
  import MiscellaneousExpenses from './comments/miscellaneousExpenses.vue'
  import MiscellaneousExpensesOfficial from './comments/miscellaneousExpensesOfficial.vue'

  // 详情
  import Reimbursement from './comments/details/reimbursementdetail.vue'
  import Reimbursedone from './comments/details/reimbursementdone.vue'
  import Reservedetail from './comments/details/reservedetail.vue'
  import Leavedetail from './comments/details/leavedetail.vue'
  import Takeworkdetail from './comments/details/takeworkdetail.vue'
  import Replenishmentdetail from './comments/details/replenishmentdetail.vue'
  import Purchasedetail from './comments/details/purchasedetail.vue'
  import Receiptdetail from './comments/details/receiptdetail.vue'

  export default {
    components: {
      ReportAll,
      ReportDetail,
      Frames,
      Lisu,
      Zhusu,
      Baoxiao,
      Career,
      Gaoceng,
      Chuchai,
      Reserve,
      Purchase,
      Leave,
      Takework,
      Replenishment,
      Receipt,
      ProblemReport,
      Repair,
      MiscellaneousExpenses,
      MiscellaneousExpensesOfficial,

      Reimbursement,
      Reimbursedone,
      Reservedetail,
      Leavedetail,
      Takeworkdetail,
      Replenishmentdetail,
      Purchasedetail,
      Receiptdetail
    },
    data() {
      return {
        city_visible: false,
        city_list: [],
        city_id: [],
        address: globalConfig.server,
        amount: 0,
        paging: 0,
        params: {},
        activeName: 'second',
        finActive: 'unfinished',
        readActive: 'unread',
        tableData: [],

        reportModule: false,
        reportID: '',
        reportAllID: [],

        is_receiptAll:[],

        isCollapse: true,
        emptyContent: ' ',
        examineLoading: false,

        showUp: false,    //暂时隐藏
        isOpen_1: true,
        isOpen_2: true,
        isOpen_3: true,
        isOpen_4: true,
        isOpen_5: true,
        isOpen_6: true,
        isOpen_7: true,
        isOpen_8: true,
        isOpen_9: true,

        // 模态框
        frameVisible: false,                              //积分申请
        lisuVisible: false,                               //离宿申请
        zhusuVisible: false,                              //住宿申请
        baoxiaoVisible: false,                            //报销申请
        shiyebuVisible: false,                            //事业部报销申请
        gaocengVisible: false,                            //高层报销申请
        chuchaiVisible: false,                            //出差报销申请
        reserveVisible: false,                            //备用金申请
        purchaseVisible: false,                           //采购申请
        leaveVisible: false,                              //请假审批
        takeworkVisible: false,                           //调休审批
        replenishmentVisible: false,                      //补卡申请
        receiptVisible: false,                            //收据领用
        reimbursedetail: false,                           //报销详情待审批
        reimbursedone: false,                             //报销详情审批完成
        reservedetail: false,                             //备用金申领待审批
        leavedetail: false,                               //请假待审批
        takeworkdetail: false,                            //调休待审批
        replenishmentdetail: false,                       //补卡待审批
        purchasedetail: false,                            //采购待审批
        receiptdetail: false,                             //收据领用待审批
        problemReportVisible: false,                      //客服部问题申报
        repairVisible: false,                             //客服部问题申报
        miscellaneousExpensesVisible: false,              //客服部问题申报
        miscellaneousExpensesOfficialVisible: false,      //客服部问题申报
        house_name: {},
      };
    },
    mounted() {
      this.tabActive('second');
    },
    methods: {
      handleChangeCity(val) {
        // console.log(val);
      },
      handleOkCity() {
        this.myData({city_id: this.city_id,type: 2},1);
        this.city_visible = false;
      },
      getCityList() {
        this.$http.get(globalConfig.server + 'workflow/process/city').then(res => {
          if (res.data.code === '20020') {
            this.city_list = res.data.data;
            this.city_visible = true;
          } else {
            this.city_list = [];
            this.$notify.warning({
              title: '警告',
              message: '获取城市列表失败'
            })
          }
        }).catch(err => {
          console.log(err);
        })
      },
      rowBackground({row, rowIndex}) {
        if (this.reportAllID.includes(row.id)) return 'rowBackground';
      },
      colTag({row, column, rowIndex, columnIndex}){
        // console.log(column)
        if(row.is_receipt&&row.is_receipt.id==1&&columnIndex==0){
          return 'colTag'
        }
        if(row.status=="published"&&columnIndex==5){
          return "greenCol"
        }
      },
      statusStyle(val){
        if(val.status=="review"){
          if(val.places=="片区经理审批中"){
            return ""
          }
          return "warning"
        }
        if(val.status=="rejected"){
          return "danger"
        }
        if(val.status=="published"){
          return "success"
        }
        if(val.status=="cancelled"){
          return "info"
        }
      },
      onSelect(key) {
        this.childActive(this.activeName, key);
      },
      handleOpen(key, keyPath) {
        // console.log(key, keyPath);
      },
      handleClose(key, keyPath) {
        // console.log(key, keyPath);
      },
      close_() {
        this.tableData = [];
        this.paging = 0;
        this.params = {};
      },
      tabActive(val) {
        this.city_list = [];
        this.city_id = [];
        this.close_();
        this.finActive = 'unfinished';
        this.readActive = 'unread';
        switch (val) {
          case 'third':
            this.params.type = 1;
            this.myData(this.params, 1);
            break;
          case 'second':
            this.params.type = 2;
            this.myData(this.params, 1);
            break;
          case 'fourth':
            // 我发起的
            this.params.type = 3;
            this.params.published = 0;
            this.myData(this.params, 1);
            break;
          // 抄送我的
          case 'fifth':
            this.params.type = 4;
            this.params.read_at = 0;
            this.myData(this.params, 1);
            break;
          case 'seventh':
            this.params.type = 5;
            this.myData(this.params, 1);
            break;
        }
      },
      childActive(val, read) {
        this.close_();
        switch (val) {
          case 'fourth':
            // 我发起的
            this.params.type = 3;
            this.params.published = read === 'unfinished' ? 0 : 1;
            this.myData(this.params, 1);
            break;
          // 抄送我的
          case 'fifth':
            this.params.type = 4;
            if (read === 'unread') {
              this.params.read_at = 0;
            } else if (read === 'read') {
              this.params.read_at = 1;
            } else {
              this.params.read_at = '';
            }
            this.myData(this.params, 1);
            break;
        }
      },
      search(val) {
        if (this.activeName === 'second') {
          this.params.type = 2;
          this.params.city_id = this.city_id;
        }
        this.myData(this.params, val);
      },
      // 待办事项
      myData(val, page) {
        this.emptyContent = ' ';
        this.examineLoading = true;
        this.params.page = page;
        this.params.limit = 12;
        this.$http.get(this.address + 'workflow/process', {
          params: val,
        }).then((res) => {
          this.examineLoading = false;
          if (res.data.code === '20000' && res.data.data.data.length !== 0) {
            let data = res.data.data.data;
            this.paging = res.data.data.count;
            let dataList = [];
            let house_id = [];
            for (let i = 0; i < data.length; i++) {
              let user = {};
              if (val.type === 3 || val.type === 5) {
                house_id.push(data[i].house_id);
                user.house_id = data[i].house_id;
                user.is_receipt = data[i].content.is_receipt
                user.created_at = data[i].created_at;
                user.finish_at = data[i].finish_at !== null ? data[i].finish_at : '/';
                if (data[i].content.house) {
                  user.house_name = data[i].content.house.name;
                } else if (data[i].content.address) {
                  user.house_name = data[i].content.address;
                } else {
                  user.house_name = '/';
                }
                if (data[i].user) {
                  user.avatar = data[i].user.avatar;
                  user.name = data[i].user.name;
                  user.depart = data[i].user.org[0].name;
                } else {
                  user.avatar = '/';
                  user.name = '/';
                  user.staff = '/';
                }
                user.id = data[i].id;
                user.places = data[i].places.display_name;
                user.status = data[i].places.status;
                user.bulletin = '我的' + data[i].content.bulletin_name;
              }
              if (val.type === 1 || val.type === 2 || val.type === 4) {
                user.bulletin = data[i].title;
                if (data[i]) {
                  house_id.push(data[i].house_id);
                  user.house_id = data[i].house_id;
                  user.is_receipt = data[i].content.is_receipt;
                  user.created_at = data[i].created_at;
                  user.finish_at = data[i].finish_at !== null ? data[i].finish_at : '/';
                  if (user.house_name = data[i].content.house) {
                    user.house_name = data[i].content.house.name;
                  } else if (data[i].content.address) {
                    user.house_name = data[i].content.address;
                  } else {
                    user.house_name = '/';
                  }
                  if (data[i].user) {
                    user.avatar = data[i].user.avatar;
                    user.name = data[i].user.name;
                    user.depart = data[i].user.org[0].name;
                  } else {
                    user.avatar = '';
                    user.name = '';
                    user.staff = '';
                  }
                  user.id = data[i].id;
                  user.places = data[i].places.display_name;
                  user.status = data[i].places.status;
                } else {
                  user.places = '/';
                  user.status = '/';
                  user.bulletin = '/';
                }
              }
              dataList.push(user);
            }
            this.tableData = dataList;
            this.getName(house_id);
          } else {
            this.tableData = [];
            this.paging = 0;
            this.emptyContent = '暂无数据';
          }
        })
      },
      getName(houseIds = []) {
        this.$http.get(globalConfig.server + '/organization/other/house-corp',{
          params:{
            houseIds
          }
        }).then(res=>{
          if(res.data.code == '700120'){
            this.house_name = res.data.data;
          }else {
            this.house_name = {};
          }
        }).catch(err=>{
          console.log(err);
        })
      },
      retract(flag) {
        if (flag === 1) {
          this.isOpen_1 = !this.isOpen_1;
        } else if (flag === 2) {
          this.isOpen_2 = !this.isOpen_2;
        } else if (flag === 3) {
          this.isOpen_3 = !this.isOpen_3;
        } else if (flag === 4) {
          this.isOpen_4 = !this.isOpen_4;
        } else if (flag === 5) {
          this.isOpen_5 = !this.isOpen_5;
        } else if (flag === 6) {
          this.isOpen_6 = !this.isOpen_6;
        } else if (flag === 7) {
          this.isOpen_7 = !this.isOpen_7;
        } else if (flag === 8) {
          this.isOpen_8 = !this.isOpen_8;
        } else if (flag === 9) {
          this.isOpen_9 = !this.isOpen_9;
        }
      },
      dblClickTable(row) {
        // console.log(row)
        this.reportID = row.id;
        this.reportAllID.push(row.id);
        this.reportAllID = Array.from(new Set(this.reportAllID));
        this.reportModule = true;
        switch (row) {
          case 'reimbursedetail':          //报销详情待审批
            this.reimbursedetail = true;
            break;
          case 'reimbursedone':          //报销详情审批完成
            this.reimbursedone = true;
            break;
          case 'reservedetail':          //备用金待审批
            this.reservedetail = true;
            break;
          case 'leavedetail':          //请假待审批
            this.leavedetail = true;
            break;
          case 'takeworkdetail':          //调休待审批
            this.takeworkdetail = true;
            break;
          case 'replenishmentdetail':          //补卡待审批
            this.replenishmentdetail = true;
            break;
          case 'purchasedetail':          //采购待审批
            this.purchasedetail = true;
            break;
          case 'receiptdetail':          //收据领用待审批
            this.receiptdetail = true;
            break;

        }
      },

      openFrames(type) {
        switch (type) {
          case 'frameVisible':          //积分申请
            this.frameVisible = true;
            break;
          case 'lisuVisible':           //离宿
            this.lisuVisible = true;
            break;
          case 'zhusuVisible':          //住宿
            this.zhusuVisible = true;
            break;
          case 'baoxiaoVisible':          //报销
            this.baoxiaoVisible = true;
            break;
          case 'shiyebuVisible':          //事业部报销
            this.shiyebuVisible = true;
            break;
          case 'gaocengVisible':          //高层报销
            this.gaocengVisible = true;
            break;
          case 'chuchaiVisible':          //出差报销
            this.chuchaiVisible = true;
            break;
          case 'reserveVisible':          //备用金申领
            this.reserveVisible = true;
            break;
          case 'purchaseVisible':          //采购申请
            this.purchaseVisible = true;
            break;
          case 'leaveVisible':            //请假审批
            this.leaveVisible = true;
            break;
          case 'takeworkVisible':            //调休申请
            this.takeworkVisible = true;
            break;
          case 'replenishmentVisible':           //补卡申请
            this.replenishmentVisible = true;
            break;
          case 'receiptVisible':                //收据领用
            this.receiptVisible = true;
            break;
          case 'problemReport':             //problemReport
            this.problemReportVisible = true;
            break;
          case 'repair':             //repair
            this.repairVisible = true;
            break;
          case 'miscellaneousExpenses':             //repair
            this.miscellaneousExpensesVisible = true;
            break;
          case 'miscellaneousExpensesOfficial':             //repair
            this.miscellaneousExpensesOfficialVisible = true;
            break;
        }
      },
      closeFrame(val) {
        this.reportModule = false;

        this.frameVisible = false;
        this.lisuVisible = false;
        this.zhusuVisible = false;
        this.baoxiaoVisible = false;
        this.shiyebuVisible = false;
        this.gaocengVisible = false;
        this.chuchaiVisible = false;
        this.reserveVisible = false;
        this.purchaseVisible = false;
        this.leaveVisible = false;
        this.takeworkVisible = false;
        this.replenishmentVisible = false;
        this.receiptVisible = false;
        this.reimbursedetail = false;
        this.reimbursedone = false;
        this.reservedetail = false;
        this.leavedetail = false;
        this.takeworkdetail = false;
        this.replenishmentdetail = false;
        this.purchasedetail = false;
        this.receiptdetail = false;
        this.problemReportVisible = false;
        this.repairVisible = false;
        this.miscellaneousExpensesVisible = false;
        this.miscellaneousExpensesOfficialVisible = false;
        if (val === 'success') {
          this.myData(this.params, this.params.page);
        }

      }
    }
  };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
  #examineAndApprove {
    @mixin flex {
      display: -webkit-flex;
      display: flex;
    }

    @mixin border_radius($n) {
      -webkit-border-radius: $n;
      -moz-border-radius: $n;
      border-radius: $n;
    }

    @mixin radio-button($n) {
      -webkit-transition: all $n;
      -moz-transition: all $n;
      -ms-transition: all $n;
      -o-transition: all $n;
      transition: all $n;
    }
    .rowBackground {
      background-color: #cde0ff;
    }
    .colTag{
      padding: 6px;
      background:url("../../../assets/images/info.jpg") no-repeat 20px 10px;
      background-size: 20px 20px;
    }
    .greenCol{
      color: green
    }
    .myApplication {
      padding: 0 20px;
      > div {
        border-bottom: 1px solid #e3e3e3;
        .head {
          display: flex;
          justify-content: space-between;
          margin: 10px 0;
          .title {
            color: #409EFF;
            font-size: 16px;
          }
          .open_close {
            cursor: pointer;
            &:hover {
              color: #6a8dfb;
            }
          }
        }
        .content {
          margin-bottom: 10px;
          display: flex;
          flex-wrap: wrap;
          .content_item {
            width: 190px;
            height: 100px;
            margin: 5px;
            border: 1px solid #6a8dfb;
            border-radius: 5px;
            cursor: pointer;
            display: flex;
            align-items: center;
            justify-content: center;
            &:hover {
              border: 1px solid #fb4699;
              .item_icon {
                background: #fb4699;
              }
            }
            .item_icon {
              width: 40px;
              height: 40px;
              line-height: 40px;
              border-radius: 50%;
              margin: 5px auto;
              background: #6a8dfb;
              text-align: center;
              i {
                color: #FFFFFF;
                font-size: 20px;
              }
            }
            .item_name {
              text-align: center;
            }
          }
        }
      }
    }
  }
</style>
