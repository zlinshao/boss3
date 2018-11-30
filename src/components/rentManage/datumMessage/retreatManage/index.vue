<template>
  <div @click="show=false" @contextmenu="closeMenu">
    <div id="clientContainer">
      <div class="highRanking">
        <div class="tabsSearch">
          <el-form :inline="true" onsubmit="return false" size="mini">
            <!--<el-form-item>-->
            <!--<el-input placeholder="请选择房屋地址" v-model="address" size="mini" readOnly @focus="openAddressDialog">-->
            <!--<template slot="append">-->
            <!--<div style="cursor: pointer;" @click="emptySearch">清空</div>-->
            <!--</template>-->
            <!--</el-input>-->
            <!--</el-form-item>-->
            <el-form-item v-if="activeName === 'first'">
              <el-input placeholder="地址/合同编号" clearable v-model="params.search"
                        @keyup.enter.native="search" size="mini">
                <el-button slot="append" icon="el-icon-search" @click="search"></el-button>
              </el-input>
            </el-form-item>
            <el-form-item v-else>
              <el-input placeholder="地址/合同编号" clearable v-model="params_second.search"
                        @keyup.enter.native="search" size="mini">
                <el-button slot="append" icon="el-icon-search" @click="search"></el-button>
              </el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" size="mini" @click="highGrade">高级</el-button>
            </el-form-item>
          </el-form>
        </div>
        <div class="filter high_grade" :class="isHigh? 'highHide':''">
          <el-form :inline="true" onsubmit="return false" size="mini" label-width="100px">
            <div class="filterTitle">
              <i class="el-icons-fa-bars"></i>&nbsp;&nbsp;高级搜索
            </div>
            <el-row class="el_row_border" v-if="activeName === 'first'">
              <el-col :span="12">
                <el-row>
                  <el-col :span="8">
                    <div class="el_col_label">报备时间</div>
                  </el-col>
                  <el-col :span="16" class="el_col_option">
                    <el-form-item>
                      <el-date-picker
                        v-model="params.check_time"
                        type="daterange"
                        value-format="yyyy-MM-dd"
                        range-separator="至"
                        start-placeholder="开始日期"
                        end-placeholder="结束日期">
                      </el-date-picker>
                    </el-form-item>
                  </el-col>
                </el-row>
              </el-col>
              <el-col :span="12">
                <el-row>
                  <el-col :span="8">
                    <div class="el_col_label">退房状态</div>
                  </el-col>
                  <el-col :span="16" class="el_col_option">
                    <el-form-item>
                      <el-select clearable v-model="params.status" placeholder="请选择退房状态" value="">
                        <el-option label="草稿" value="0"></el-option>
                        <el-option label="待结算" value="5"></el-option>
                        <el-option label="待审核" value="1"></el-option>
                        <el-option label="已驳回" value="2"></el-option>
                        <el-option label="待付款" value="3"></el-option>
                        <el-option label="已完成" value="4"></el-option>
                      </el-select>
                    </el-form-item>
                  </el-col>
                </el-row>
              </el-col>
            </el-row>
            <el-row class="el_row_border" v-else>
              <el-col :span="12">
                <el-row>
                  <el-col :span="8">
                    <div class="el_col_label">报备时间</div>
                  </el-col>
                  <el-col :span="16" class="el_col_option">
                    <el-form-item>
                      <el-date-picker
                        v-model="params_second.check_time"
                        type="daterange"
                        value-format="yyyy-MM-dd"
                        range-separator="至"
                        start-placeholder="开始日期"
                        end-placeholder="结束日期">
                      </el-date-picker>
                    </el-form-item>
                  </el-col>
                </el-row>
              </el-col>
              <el-col :span="12">
                <el-row>
                  <el-col :span="8">
                    <div class="el_col_label">退房状态</div>
                  </el-col>
                  <el-col :span="16" class="el_col_option">
                    <el-form-item>
                      <el-select clearable v-model="params_second.status" placeholder="请选择退房状态" value="">
                        <el-option label="草稿" value="0"></el-option>
                        <el-option label="待结算" value="5"></el-option>
                        <el-option label="待审核" value="1"></el-option>
                        <el-option label="已驳回" value="2"></el-option>
                        <el-option label="待付款" value="3"></el-option>
                        <el-option label="已完成" value="4"></el-option>
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
                    <div class="el_col_label">部门</div>
                  </el-col>
                  <el-col :span="16" class="el_col_option">
                    <el-form-item>
                      <el-input placeholder="请选择" @focus="openOrgan('org_names', 'depart')" style="width:250px;"
                                v-model="org_name"
                                size="mini">
                        <el-button slot="append" @click="emptyDepart()">清空</el-button>
                      </el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
              </el-col>
              <el-col :span="12" v-if="activeName === 'first'">
                <el-row>
                  <el-col :span="8">
                    <div class="el_col_label">退房时间</div>
                  </el-col>
                  <el-col :span="16" class="el_col_option">
                    <el-form-item>
                      <el-date-picker
                        v-model="params.check_house_time"
                        type="daterange"
                        value-format="yyyy-MM-dd"
                        range-separator="至"
                        start-placeholder="开始日期"
                        end-placeholder="结束日期">
                      </el-date-picker>
                    </el-form-item>
                  </el-col>
                </el-row>
              </el-col>
              <el-col :span="12" v-else>
                <el-row>
                  <el-col :span="8">
                    <div class="el_col_label">退房时间</div>
                  </el-col>
                  <el-col :span="16" class="el_col_option">
                    <el-form-item>
                      <el-date-picker
                        v-model="params_second.check_house_time"
                        type="daterange"
                        value-format="yyyy-MM-dd"
                        range-separator="至"
                        start-placeholder="开始日期"
                        end-placeholder="结束日期">
                      </el-date-picker>
                    </el-form-item>
                  </el-col>
                </el-row>
              </el-col>
            </el-row>
            <div class="btnOperate">
              <el-button size="mini" type="primary" @click="search">搜索</el-button>
              <el-button size="mini" type="primary" @click="resetting">重置</el-button>
              <el-button size="mini" type="primary" @click="highGrade">取消</el-button>
            </div>
          </el-form>
        </div>
      </div>
      <div class="main">
        <div>
          <el-tabs v-model="activeName" @tab-click="handleClick">
            <el-tab-pane label="房东退房" name="first">
              <el-table
                :data="tableData"
                :empty-text='emptyStatus'
                v-loading="isLoading"
                element-loading-text="拼命加载中"
                element-loading-spinner="el-icon-loading"
                element-loading-background="rgba(255, 255, 255, 0)"
                @row-dblclick="dblClickTable"
                @row-contextmenu='houseMenu'
                @sort-change="sortByTime"
                @header-click="removeSort"
                style="width: 100%">
                <el-table-column
                  label="合同编号">
                  <template slot-scope="scope">
                    <span v-if="scope.row.lord_contract_number">
                      {{scope.row.lord_contract_number}}
                    </span>
                    <span v-else="">/</span>
                  </template>
                </el-table-column>
                <el-table-column
                  label="房屋地址">
                  <template slot-scope="scope">
                    <span v-if="scope.row.lord_house_name">
                      {{scope.row.lord_house_name}}
                    </span>
                    <span v-else="">/</span>
                  </template>
                </el-table-column>
                <el-table-column
                  label="归属公司">
                  <template slot-scope="scope">
                    <span v-if="house_name && scope.row.house_id && house_name[scope.row.house_id]">{{house_name[scope.row.house_id].corp_name}}</span>
                    <!--<span style="color: #525252;" v-if="house_name && scope.row.house_id && house_name[scope.row.house_id]">{{ house_name[scope.row.house_id].corp_name }}</span>-->
                    <span style="color: #525252;" v-else>暂无</span>
                  </template>
                </el-table-column>
                <el-table-column
                  prop="client"
                  label="房东姓名">
                </el-table-column>
                <el-table-column
                  prop="check_time"
                  label="退房时间">
                </el-table-column>
                <el-table-column
                  prop="check_types"
                  label="退房性质">
                </el-table-column>
                <el-table-column
                  prop="checkout_time"
                  sortable="custom"
                  ref="check_time_lord"
                  label="退款时间">
                </el-table-column>
                <el-table-column
                  label="总费用">
                  <template slot-scope="scope">
                    <span v-if="scope.row.details && scope.row.details.total_fees">
                      {{scope.row.details.total_fees.toFixed(2)}}
                    </span>
                    <span v-else="">/</span>
                  </template>
                </el-table-column>
                <el-table-column
                  label="应退费用">
                  <template slot-scope="scope">
                    <span v-if="scope.row.details&&scope.row.details.should_be_returned_fees">
                      {{scope.row.details.should_be_returned_fees.toFixed(2)}}
                    </span>
                    <span v-else="">/</span>
                  </template>
                </el-table-column>
                <el-table-column
                  label="能源费用">
                  <template slot-scope="scope">
                    <span v-if="scope.row.details&&scope.row.details.deduct_energy_fees">
                      {{scope.row.details.deduct_energy_fees.toFixed(2)}}
                    </span>
                    <span v-else="">/</span>
                  </template>
                </el-table-column>
                <el-table-column
                  label="其他费用">
                  <template slot-scope="scope">
                    <span v-if="scope.row.details&&scope.row.details.others_fees">
                      {{scope.row.details.others_fees.toFixed(2)}}
                    </span>
                    <span v-else="">/</span>
                  </template>
                </el-table-column>

                <el-table-column
                  label="创建人">
                  <template slot-scope="scope">
                    <!--<span v-text="creators_show(scope)"></span>-->
                    <span v-if="scope.row.creators&&scope.row.creators.name">{{scope.row.creators.name}}</span>
                    <span v-else="">/</span>
                  </template>
                </el-table-column>
                <el-table-column
                  label="部门">
                  <template slot-scope="scope">
                    <span v-text="creators_show(scope.row)"></span>
                  </template>
                </el-table-column>
                <el-table-column
                  label="结算人">
                  <template slot-scope="scope">
                    <span v-if="scope.row.settlers&&scope.row.settlers.name">{{scope.row.settlers.name}}</span>
                    <span v-else="">/</span>
                  </template>
                </el-table-column>
                <el-table-column
                  label="审核人">
                  <template slot-scope="scope">
                    <span v-if="scope.row.auditors&&scope.row.auditors.name">{{scope.row.auditors.name}}</span>
                    <span v-else="">/</span>
                  </template>
                </el-table-column>
                <el-table-column
                  label="退租状态">
                  <template slot-scope="scope">
                     <span v-if="scope.row.status==0">
                      <span class="info_label">草稿</span>
                    </span>
                    <span v-if="scope.row.status==1">
                      <span class="red_label">待审核</span>
                    </span>
                    <span v-if="scope.row.status==2">
                      <span class="orange_label">已驳回</span>
                    </span>
                    <span v-if="scope.row.status==3">
                      <span class="yellow_label">待付款</span>
                    </span>
                    <span v-if="scope.row.status==4">
                      <span class="success_label">已完成</span>
                    </span>
                    <span v-if="scope.row.status==5">
                      <span class="success_label" style="background: #e8a136;">待结算</span>
                    </span>
                  </template>
                </el-table-column>
              </el-table>
              <div class="tableBottom" v-if="activeName === 'first'">
                <div class="left">
                  <el-pagination
                    @current-change="handleCurrentChange"
                    :current-page="params.page"
                    :page-sizes="[12, 20, 30, 40]"
                    :page-size="params.limit"
                    layout="total, prev, pager, next, jumper"
                    :total="totalNumber">
                  </el-pagination>
                </div>
              </div>
            </el-tab-pane>
            <el-tab-pane label="租客退房" name="second">
              <el-table
                :data="tableData_second"
                :empty-text='emptyStatus_second'
                v-loading="isLoading_second"
                element-loading-text="拼命加载中"
                element-loading-spinner="el-icon-loading"
                element-loading-background="rgba(255, 255, 255, 0)"
                @row-dblclick="dblClickTable"
                @row-contextmenu='houseMenu'
                @sort-change="sortByTime"
                @header-click="removeSort"
                style="width: 100%">
                <el-table-column
                  label="合同编号">
                  <template slot-scope="scope">
                    <span v-if="scope.row.renter_contract_number">
                      {{scope.row.renter_contract_number}}
                    </span>
                    <span v-else="">/</span>
                  </template>
                </el-table-column>
                <el-table-column
                  label="房屋地址">
                  <template slot-scope="scope">
                    <span v-if="scope.row.renter_house_name">
                      {{scope.row.renter_house_name}}
                    </span>
                    <span v-else="">/</span>
                  </template>
                </el-table-column>
                <el-table-column
                  label="归属公司">
                  <template slot-scope="scope">
                    <span style="color: #525252;"
                          v-if="house_name2 && scope.row.house_id && house_name2[scope.row.house_id]">{{ house_name2[scope.row.house_id].corp_name }}</span>
                    <span style="color: #525252;" v-else>暂无</span>
                  </template>
                </el-table-column>
                <el-table-column
                  prop="client"
                  label="租客姓名">
                </el-table-column>
                <el-table-column
                  prop="check_time"
                  label="退房时间">
                </el-table-column>
                <el-table-column
                  prop="check_types"
                  label="退房性质">
                </el-table-column>
                <el-table-column
                  prop="checkout_time"
                  sortable="custom"
                  ref="check_time_rent"
                  label="退款时间">
                </el-table-column>
                <el-table-column
                  label="总费用">
                  <template slot-scope="scope">
                    <span v-if="scope.row.details && scope.row.details.total_fees">
                      {{scope.row.details.total_fees}}
                    </span>
                    <span v-else="">/</span>
                  </template>
                </el-table-column>
                <el-table-column
                  label="应退费用">
                  <template slot-scope="scope">
                    <span v-if="scope.row.details&&scope.row.details.should_be_returned_fees">
                      {{scope.row.details.should_be_returned_fees}}
                    </span>
                    <span v-else="">/</span>
                  </template>
                </el-table-column>
                <el-table-column
                  label="能源费用">
                  <template slot-scope="scope">
                    <span v-if="scope.row.details&&scope.row.details.deduct_energy_fees">
                      {{scope.row.details.deduct_energy_fees}}
                    </span>
                    <span v-else="">/</span>
                  </template>
                </el-table-column>
                <el-table-column
                  label="其他费用">
                  <template slot-scope="scope">
                    <span v-if="scope.row.details&&scope.row.details.others_fees">
                      {{scope.row.details.others_fees}}
                    </span>
                    <span v-else="">/</span>
                  </template>
                </el-table-column>

                <el-table-column
                  label="创建人">
                  <template slot-scope="scope">
                    <span v-if="scope.row.creators&&scope.row.creators.name">{{scope.row.creators.name}}</span>
                  </template>
                </el-table-column>
                <el-table-column
                  label="部门">
                  <template slot-scope="scope">
                    {{creators_show(scope.row)}}
                  </template>
                </el-table-column>
                <el-table-column
                  label="结算人">
                  <template slot-scope="scope">
                    <span v-if="scope.row.settlers&&scope.row.settlers.name">{{scope.row.settlers.name}}</span>
                    <span v-else="">/</span>
                  </template>
                </el-table-column>
                <el-table-column
                  label="审核人">
                  <template slot-scope="scope">
                    <span v-if="scope.row.auditors&&scope.row.auditors.name">{{scope.row.auditors.name}}</span>
                    <span v-else="">/</span>
                  </template>
                </el-table-column>
                <el-table-column
                  label="退租状态">
                  <template slot-scope="scope">
                    <span v-if="scope.row.status==0">
                      <span class="info_label">草稿</span>
                    </span>
                    <span v-if="scope.row.status==1">
                      <span class="red_label">待审核</span>
                    </span>
                    <span v-if="scope.row.status==2">
                      <span class="orange_label">已驳回</span>
                    </span>
                    <span v-if="scope.row.status==3">
                      <span class="yellow_label">待付款</span>
                    </span>
                    <span v-if="scope.row.status==4">
                      <span class="success_label">已完成</span>
                    </span>
                    <span v-if="scope.row.status==5">
                      <span class="success_label" style="background: #e8a136;">待结算</span>
                    </span>
                  </template>
                </el-table-column>
              </el-table>
              <div class="tableBottom" v-if="activeName === 'second'">
                <div class="left">
                  <el-pagination
                    @current-change="handleCurrentChange"
                    :current-page="params_second.page"
                    :page-sizes="[12, 20, 30, 40]"
                    :page-size="params_second.limit"
                    layout="total, prev, pager, next, jumper"
                    :total="totalNumber_second">
                  </el-pagination>
                </div>
              </div>
            </el-tab-pane>
          </el-tabs>

        </div>
      </div>
    </div>
    <RightMenu :startX="rightMenuX+'px'" :startY="rightMenuY+'px'" :list="lists" :show="show"
               @clickOperateMore="clickEvent"></RightMenu>

    <EditCollectVacation :editCollectVacation="editCollectVacation" :vacationId="operateId" :status="status"
                         @close="closeModal"></EditCollectVacation>
    <VacationDetail :vacationDetail="vacationDetail" :vacationId="operateId" @close="closeModal"></VacationDetail>


    <UploadPic :upLoadDialog="upLoadDialog" :status="status" :vacationId="operateId" @close="closeModal"></UploadPic>
    <!--组织架构-->
    <Organization :organizationDialog="organModule" :type="organizeType" :length="lengths" @close="closeOrgan"
                  @selectMember="selectMember"></Organization>
  </div>
</template>

<script>
  import RightMenu from '../../../common/rightMenu.vue'
  import EditCollectVacation from './components/editVacation.vue'
  import VacationDetail from './components/vacationDetail.vue'
  import UploadPic from './components/upScreenshot'
  import Organization from "../../../common/organization";

  export default {
    name: 'hello',
    components: {RightMenu, EditCollectVacation, VacationDetail, UploadPic, Organization},
    data() {
      return {
        rightMenuX: 0,
        rightMenuY: 0,
        show: false,
        lists: [],
        /***********/
        activeName: 'first',
        totalNumber: 0,
        tableData: [],
        totalNumber_second: 0,
        tableData_second: [],
        params: {
          page: 1,
          limit: 12,
          module: 1,
          contract_id: '',
          search: '',
          check_time: [],
          check_house_time: [],
          status: '',
          org_id: '',
          sort:'',
        },
        org_name: '',
        params_second: {
          page: 1,
          limit: 12,
          module: 2,
          contract_id: '',
          search: '',
          check_time: [],
          check_house_time: [],
          status: '',
          org_id: '',
          sort:''
        },


        operateId: '',
        isHigh: false,
        emptyStatus: ' ',
        emptyStatus_second: ' ',
        isLoading: false,
        isLoading_second: false,
        editCollectVacation: false,
        vacationDetail: false,
        addressDialog: false,
        upLoadDialog: false,
        isRent: 0,
        address: '',
        status: '',
        superAuthority: false,
        organDivision: '',
        organModule: false,
        organizeType: '',
        lengths: 0,
        house_name: {},
        house_name2: {}
      }
    },
    mounted() {
      this.getData_collect();
      this.getData_rent();
    },
    methods: {
      openOrgan(val, type) {
        // 打开组织架构
        this.organDivision = val;
        this.organModule = true;
        this.organizeType = type;
        this.lengths = 1;
      },
      emptyDepart() {
        this.org_name = "";
        this.params_second.org_id = '';
      },
      closeOrgan() {
        this.organDivision = "";
        this.organModule = false;
        this.organizeType = "";
        this.lengths = 0;
      },
      selectMember(val) {
        this.params.org_id = val[0].id;
        this.params_second.org_id = val[0].id;
        this.org_name = val[0].name;
      },
      creators_show(row) {
        let org = '';
        if (row.creators && row.creators.org && row.creators.org.length !== 0) {
          row.creators.org.forEach(item => {
            org += item.name;
          });
        }
        return org;
      },
      //获取退租列表
      getData_collect() {
        this.emptyStatus = ' ';
        this.isLoading = true;
        this.$http.get(globalConfig.server + 'customer/check_out', {params: this.params}).then((res) => {
          this.isLoading = false;
          let house_id = [];
          if (res.data.code === '20000') {
            res.data.data.data.forEach((item) => {
              if (item.house_id) {
                house_id.push(item.house_id);
              }
            });
            this.superAuthority = res.data.data.can;
            this.tableData = res.data.data.data;
            this.totalNumber = res.data.data.count;
          } else {
            this.superAuthority = false;
            this.tableData = [];
            this.totalNumber = 0;
            this.emptyStatus = '暂无数据';
          }
          this.getName(house_id, true);
        })
      },
      getName(houseIds = [], status) {
        this.$http.get(globalConfig.server + '/organization/other/house-corp', {
          params: {houseIds}
        }).then(res => {
          if (res.data.code === '700120') {
            if (status) {
              this.house_name = res.data.data;
            } else {
              this.house_name2 = res.data.data;
            }
          } else {
            this.house_name = {};
          }
        }).catch(err => {
          console.log(err);
        })
      },
      getData_rent() {
        this.emptyStatus_second = ' ';
        this.isLoading_second = true;
        this.$http.get(globalConfig.server + 'customer/check_out', {params: this.params_second}).then((res) => {
          this.isLoading_second = false;
          let house_id = [];
          if (res.data.code === '20000') {
            res.data.data.data.forEach((item) => {
              if (item.house_id) {
                house_id.push(item.house_id);
              }
            });
            this.superAuthority = res.data.data.can;
            this.tableData_second = res.data.data.data;
            this.totalNumber_second = res.data.data.count;
          } else {
            this.superAuthority = false;
            this.tableData_second = [];
            this.totalNumber_second = 0;
            this.emptyStatus_second = '暂无数据';
          }
          this.getName(house_id, false);
        })
      },
      //根据退款时间排序
      sortByTime(column, prop, order){
        let param = {};
        if(column.column && column.column.property === 'checkout_time'){
          if(this.activeName === 'first'){
            if(column.order === 'descending'){
              this.params.sort = '56'
            }else if(column.order === 'ascending'){
              this.params.sort = '65'
            }
            param = this.params;
          }else if(this.activeName === 'second'){
            if(column.order === 'descending'){
              this.params_second.sort = '56'
            }else if(column.order === 'ascending'){
              this.params_second.sort = '65'
            }
            param = this.params_second;
          }
          this.$http.get(globalConfig.server + 'customer/check_out', {params: param}).then(res => {
            if (res.data.code === '20000'){
              if(this.activeName === 'first'){
                this.tableData = res.data.data.data;
              }else if(this.activeName === 'second'){
                this.tableData_second = res.data.data.data;
              }
            }
          })
        }
      },
      //清除排序
      removeSort(column){
        console.log(this.$refs)
        if(column.property === "checkout_time"){
          if(this.activeName === "first"){
            this.params.sort = '';
            this.$refs.check_time_lord.owner.clearSort();
            this.getData_collect();
          }else if(this.activeName === 'second'){
            this.params_second.sort = '';
            this.$refs.check_time_rent.owner.clearSort();
            this.getData_rent();
          }
          
        }
      },
      //切换标签页
      handleClick() {
        this.isRent = this.activeName === 'first' ? 0 : 1;
        // this.resetting();
      },
      //分页
      handleCurrentChange(val) {
        if (this.activeName === 'first') {
          this.params.page = val;
          this.getData_collect();
        } else {
          this.params_second.page = val;
          this.getData_rent();
        }

      },

      deleteColumn() {
        this.$http.get(globalConfig.server + 'customer/check_out/delete/' + this.operateId).then((res) => {
          if (res.data.code === '20040') {
            if (this.activeName === 'first') {
              this.getData_collect();
            } else {
              this.getData_rent();
            }
            this.$notify.success({
              title: '成功',
              message: res.data.msg
            })
          } else {
            this.$notify.warning({
              title: '警告',
              message: res.data.msg
            })
          }
        })
      },

      closeModal(val) {
        this.editCollectVacation = false;
        this.upLoadDialog = false;
        this.vacationDetail = false;
        if (val === 'success') {
          this.isRent = this.activeName === 'first' ? 0 : 1;
          if (this.activeName === 'first') {
            this.getData_collect();
          } else {
            this.getData_rent();
          }
        }
      },

      dblClickTable(row, event) {
        this.operateId = row.id;
        this.vacationDetail = true;
      },
      highGrade() {
        this.isHigh = !this.isHigh;
      },
      search() {
        this.isHigh = false;
        if (this.activeName === 'first') {
          this.params.page = 1;
          this.getData_collect();
        } else {
          this.params_second.page = 1;
          this.getData_rent();
        }
      },
      resetting() {
        if (this.activeName === 'first') {
          this.params.check_time = [];
          this.params.check_house_time = [];
          this.params.status = '';
          this.org_name = '';
          this.params.org_id = '';
        } else {
          this.params_second.check_time = [];
          this.params_second.check_house_time = [];
          this.params_second.status = '';
          this.org_name = '';
          this.params_second.org_id = '';
        }

      },

      //-------------------房屋右键------------------------------------//
      houseMenu(row, event) {
        this.operateId = row.id;
        this.status = row.status;
        this.lists = [
          {
            clickIndex: 'edit',
            headIcon: 'el-icon-edit-outline',
            label: '修改',
            'disabled': (row.status == 3 || row.status == 4 || row.status == 1) && !this.superAuthority,
          },
          {
            clickIndex: 'upload',
            headIcon: 'el-icon-upload',
            label: '上传截图凭证',
            'disabled': row.status != 3 && row.status != 4
          },
          {clickIndex: 'delete', headIcon: 'el-icon-delete', label: '删除',},
        ];
        this.contextMenuParam(event);
      },
      //右键回调事件
      clickEvent(val) {
        switch (val.clickIndex) {
          case 'edit':
            this.editCollectVacation = true;
            break;
          case 'upload':
            this.upLoadDialog = true;
            break;
          case 'delete':
            this.$confirm('此操作将永久删除该条目, 是否继续?', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
            }).then(() => {
              this.deleteColumn();
            }).catch(() => {
              this.$notify.warning({
                title: '警告',
                message: '已取消删除',
              })
            });
            break;
        }
      },
      //关闭右键菜单
      closeMenu() {
        this.show = false;
      },
      //右键参数
      contextMenuParam(event) {
        let e = event || window.event;	//support firefox contextmenu
        this.show = false;
        this.rightMenuX = e.clientX + document.documentElement.scrollLeft - document.documentElement.clientLeft;
        this.rightMenuY = e.clientY + document.documentElement.scrollTop - document.documentElement.clientTop;
        event.preventDefault();
        event.stopPropagation();
        this.$nextTick(() => {
          this.show = true
        })
      },
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped="">
  #clientContainer {
    min-height: 800px;
    .selectButton {
      color: #fff;
      background: #66b1ff;
    }
    .main {
      font-size: 12px;
      .tableBottom {
        padding: 8px;
        display: flex;
        justify-content: flex-end;
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
    }
    .info_label, .orange_label, .red_label, .success_label, .yellow_label {
      min-width: 70px;
    }

  }
</style>
