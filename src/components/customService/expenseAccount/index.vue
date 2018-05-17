<template>
  <div @click="show=false" @contextmenu="closeMenu">
    <div id="clientContainer">
      <div class="highRanking">
        <div class="tabsSearch">
          <el-form :inline="true" size="mini">
            <el-form-item>
              <el-input placeholder="请选择房屋地址" v-model="address" size="mini" readOnly @focus="openAddressDialog">
                <!--<el-button slot="append" icon="el-icon-search" @click="search"></el-button>-->
                <template slot="append">
                  <div style="cursor: pointer;" @click="emptySearch">清空</div>
                </template>
              </el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" size="mini" @click="highGrade">高级</el-button>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" size="mini" @click="syncStatusDialog = true;">同步</el-button>
            </el-form-item>
            <!--<el-form-item>-->
            <!--<el-button type="primary" size="mini" @click="exportData">导出</el-button>-->
            <!--</el-form-item>-->
          </el-form>
        </div>
        <div class="filter high_grade" :class="isHigh? 'highHide':''">
          <el-form :inline="true" :model="form" size="mini" label-width="100px">
            <div class="filterTitle">
              <i class="el-icons-fa-bars"></i>&nbsp;&nbsp;高级搜索
            </div>
            <el-row class="el_row_border">
              <el-col :span="12">
                <el-row>
                  <el-col :span="8">
                    <div class="el_col_label">创建时间</div>
                  </el-col>
                  <el-col :span="16" class="el_col_option">
                    <el-form-item>
                      <el-date-picker
                        v-model="form.time"
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
                    <div class="el_col_label">创建人</div>
                  </el-col>
                  <el-col :span="16" class="el_col_option">
                    <el-form-item>
                      <el-input v-model="staff_name" @focus="chooseStaff" placeholder="请选择创建人"
                                readonly>
                        <template slot="append">
                          <div style="cursor: pointer;" @click="closeStaff">清空</div>
                        </template>
                      </el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
              </el-col>
            </el-row>
            <el-row class="el_row_border">
              <el-col :span="12">
                <el-row>
                  <el-col :span="8">
                    <div class="el_col_label">报销类型</div>
                  </el-col>
                  <el-col :span="16" class="el_col_option">
                    <el-form-item>
                      <el-select clearable v-model="form.type" placeholder="请选择类型" value="">
                        <el-option v-for="item in reimbursementTypeCategory" :label="item.dictionary_name"
                                   :value="item.id"
                                   :key="item.id"></el-option>
                      </el-select>
                    </el-form-item>
                  </el-col>
                </el-row>
              </el-col>
              <el-col :span="12">
                <el-row>
                  <el-col :span="8">
                    <div class="el_col_label">来源</div>
                  </el-col>
                  <el-col :span="16" class="el_col_option">
                    <el-form-item>
                      <el-select clearable v-model="form.source" placeholder="请选择来源" value="">
                        <el-option v-for="item in reimbursementSourceCategory" :label="item.dictionary_name"
                                   :value="item.id"
                                   :key="item.id"></el-option>
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
                    <div class="el_col_label">完成状态</div>
                  </el-col>
                  <el-col :span="16" class="el_col_option">
                    <el-form-item>
                      <el-select clearable v-model="form.status" placeholder="请选择状态" value="">
                        <el-option v-for="item in finishedStatusCategory" :label="item.dictionary_name" :value="item.id"
                                   :key="item.id"></el-option>
                      </el-select>
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
        <el-tabs v-model="activeName" @tab-click="handleClick">
          <el-tab-pane label="收房报销记录" name="first">
            <el-table
              :data="collectTableData"
              :empty-text='collectStatus'
              v-loading="collectLoading"
              element-loading-text="拼命加载中"
              element-loading-spinner="el-icon-loading"
              element-loading-background="rgba(255, 255, 255, 0)"
              @row-dblclick="dblClickTable"
              @row-contextmenu='houseMenu'
              style="width: 100%">
              <el-table-column
                prop="create_time"
                label="创建时间">
                <template slot-scope="scope">
                  <span v-if="scope.row.create_time">{{scope.row.create_time}}</span>
                  <span v-if="!scope.row.create_time">暂无</span>
                </template>
              </el-table-column>
              <el-table-column
                prop="staffs.real_name"
                label="创建人">
                <template slot-scope="scope">
                  <span v-if="scope.row.staffs && scope.row.staffs.real_name">{{scope.row.staffs.real_name}}</span>
                  <span v-if="!(scope.row.staffs && scope.row.staffs.real_name)">暂无</span>
                </template>
              </el-table-column>
              <el-table-column
                prop="reimbursement_number"
                label="报销单编号">
                <template slot-scope="scope">
                  <span v-if="scope.row.reimbursement_number">{{scope.row.reimbursement_number}}</span>
                  <span v-if="!scope.row.reimbursement_number">暂无</span>
                </template>
              </el-table-column>
              <el-table-column
                prop="contracts.house.name"
                label="房屋地址">
                <template slot-scope="scope">
                  <span v-if="scope.row.contracts && scope.row.contracts.house && scope.row.contracts.house.name">{{scope.row.contracts.house.name}}</span>
                  <span
                    v-if="!(scope.row.contracts && scope.row.contracts.house && scope.row.contracts.house.name)">暂无</span>
                </template>
              </el-table-column>
              <el-table-column
                prop="source.dictionary_name"
                label="来源">
                <template slot-scope="scope">
              <span
                v-if="scope.row.source && scope.row.source.dictionary_name">{{scope.row.source.dictionary_name}}</span>
                  <span v-if="!(scope.row.source && scope.row.source.dictionary_name)">暂无</span>
                </template>
              </el-table-column>
              <el-table-column
                prop="type.dictionary_name"
                label="报销类型">
                <template slot-scope="scope">
                  <span
                    v-if="scope.row.type && scope.row.type.dictionary_name">{{scope.row.type.dictionary_name}}</span>
                  <span v-if="!(scope.row.type && scope.row.type.dictionary_name)">暂无</span>
                </template>
              </el-table-column>
              <el-table-column
                prop="amount"
                label="报销金额">
                <template slot-scope="scope">
                  <span v-if="scope.row.amount">{{scope.row.amount}}</span>
                  <span v-if="!scope.row.amount">暂无</span>
                </template>
              </el-table-column>
              <el-table-column
                prop="account_bank"
                label="开户行">
                <template slot-scope="scope">
                  <span v-if="scope.row.account_bank">{{scope.row.account_bank}}</span>
                  <span v-if="!scope.row.account_bank">暂无</span>
                </template>
              </el-table-column>
              <el-table-column
                prop="branch_bank"
                label="支行">
                <template slot-scope="scope">
                  <span v-if="scope.row.branch_bank">{{scope.row.branch_bank}}</span>
                  <span v-if="!scope.row.branch_bank">暂无</span>
                </template>
              </el-table-column>
              <el-table-column
                prop="bank_num"
                label="银行卡号">
                <template slot-scope="scope">
                  <span v-if="scope.row.bank_num">{{scope.row.bank_num}}</span>
                  <span v-if="!scope.row.bank_num">暂无</span>
                </template>
              </el-table-column>
              <el-table-column
                prop="account_name"
                label="开户人">
                <template slot-scope="scope">
                  <span v-if="scope.row.account_name">{{scope.row.account_name}}</span>
                  <span v-if="!scope.row.account_name">暂无</span>
                </template>
              </el-table-column>
              <el-table-column
                prop="status.dictionary_name"
                label="报销状态">
                <template slot-scope="scope">
                  <el-button class="btnStatus" v-if="scope.row.status.id == 654" type="primary" size="mini">
                    {{scope.row.status.dictionary_name}}
                  </el-button>
                  <el-button class="btnStatus" v-if="scope.row.status.id !== 654 && scope.row.status.id "
                             type="info" size="mini">{{scope.row.status.dictionary_name}}
                  </el-button>
                  <span v-if="!scope.row.status.dictionary_name">暂无</span>
                </template>
              </el-table-column>
            </el-table>
          </el-tab-pane>
          <el-tab-pane label="租房报销记录" name="second">
            <el-table
              :data="rentTableData"
              :empty-text='rentStatus'
              v-loading="rentLoading"
              element-loading-text="拼命加载中"
              element-loading-spinner="el-icon-loading"
              element-loading-background="rgba(255, 255, 255, 0)"
              @row-dblclick="dblClickTable"
              @row-contextmenu='houseMenu'
              style="width: 100%">
              <el-table-column
                prop="create_time"
                label="创建时间">
                <template slot-scope="scope">
                  <span v-if="scope.row.create_time">{{scope.row.create_time}}</span>
                  <span v-if="!scope.row.create_time">暂无</span>
                </template>
              </el-table-column>
              <el-table-column
                prop="staffs.real_name"
                label="创建人">
                <template slot-scope="scope">
                  <span v-if="scope.row.staffs && scope.row.staffs.real_name">{{scope.row.staffs.real_name}}</span>
                  <span v-if="!(scope.row.staffs && scope.row.staffs.real_name)">暂无</span>
                </template>
              </el-table-column>
              <el-table-column
                prop="reimbursement_number"
                label="报销单编号">
                <template slot-scope="scope">
                  <span v-if="scope.row.reimbursement_number">{{scope.row.reimbursement_number}}</span>
                  <span v-if="!scope.row.reimbursement_number">暂无</span>
                </template>
              </el-table-column>
              <el-table-column
                prop="contracts.house.name"
                label="房屋地址">
                <template slot-scope="scope">
                  <span v-if="scope.row.contracts && scope.row.contracts.house && scope.row.contracts.house.name">{{scope.row.contracts.house.name}}</span>
                  <span
                    v-if="!(scope.row.contracts && scope.row.contracts.house && scope.row.contracts.house.name)">暂无</span>
                </template>
              </el-table-column>
              <el-table-column
                prop="source.dictionary_name"
                label="来源">
                <template slot-scope="scope">
              <span
                v-if="scope.row.source && scope.row.source.dictionary_name">{{scope.row.source.dictionary_name}}</span>
                  <span v-if="!(scope.row.source && scope.row.source.dictionary_name)">暂无</span>
                </template>
              </el-table-column>
              <el-table-column
                prop="type.dictionary_name"
                label="报销类型">
                <template slot-scope="scope">
                  <span
                    v-if="scope.row.type && scope.row.type.dictionary_name">{{scope.row.type.dictionary_name}}</span>
                  <span v-if="!(scope.row.type && scope.row.type.dictionary_name)">暂无</span>
                </template>
              </el-table-column>
              <el-table-column
                prop="amount"
                label="报销金额">
                <template slot-scope="scope">
                  <span v-if="scope.row.amount">{{scope.row.amount}}</span>
                  <span v-if="!scope.row.amount">暂无</span>
                </template>
              </el-table-column>
              <el-table-column
                prop="account_bank"
                label="开户行">
                <template slot-scope="scope">
                  <span v-if="scope.row.account_bank">{{scope.row.account_bank}}</span>
                  <span v-if="!scope.row.account_bank">暂无</span>
                </template>
              </el-table-column>
              <el-table-column
                prop="branch_bank"
                label="支行">
                <template slot-scope="scope">
                  <span v-if="scope.row.branch_bank">{{scope.row.branch_bank}}</span>
                  <span v-if="!scope.row.branch_bank">暂无</span>
                </template>
              </el-table-column>
              <el-table-column
                prop="bank_num"
                label="银行卡号">
                <template slot-scope="scope">
                  <span v-if="scope.row.bank_num">{{scope.row.bank_num}}</span>
                  <span v-if="!scope.row.bank_num">暂无</span>
                </template>
              </el-table-column>
              <el-table-column
                prop="account_name"
                label="开户人">
                <template slot-scope="scope">
                  <span v-if="scope.row.account_name">{{scope.row.account_name}}</span>
                  <span v-if="!scope.row.account_name">暂无</span>
                </template>
              </el-table-column>
              <el-table-column
                prop="status.dictionary_name"
                label="报销状态">
                <template slot-scope="scope">
                  <el-button class="btnStatus" v-if="scope.row.status.id == 654" type="primary" size="mini">
                    {{scope.row.status.dictionary_name}}
                  </el-button>
                  <el-button class="btnStatus" v-if="scope.row.status.id !== 654 && scope.row.status.id "
                             type="info" size="mini">{{scope.row.status.dictionary_name}}
                  </el-button>
                  <span v-if="!scope.row.status.dictionary_name">暂无</span>
                </template>
              </el-table-column>
            </el-table>
          </el-tab-pane>
        </el-tabs>
        <div class="block pages">
          <div class="left">
            <el-pagination
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
              :current-page="form.page"
              :page-size="12"
              layout="total, prev, pager, next, jumper"
              :total="totalNum">
            </el-pagination>
          </div>
        </div>
      </div>
    </div>
    <div>
      <el-dialog :close-on-click-modal="false" title="审核报销" :visible.sync="examineStatusDialog" width="30%">
        <el-form size="small" label-width="100px">
          <el-row>
            <el-col :span="20">
              <el-form-item label="报销状态" required>
                <el-select clearable v-model="examineStatus" placeholder="选择类型" value="">
                  <el-option v-for="item in examineStatusCategory" :label="item.dictionary_name" :value="item.id"
                             :key="item.id"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
        <span slot="footer" class="dialog-footer">
        <el-button size="small" @click="examineStatusDialog = false">取 消</el-button>
        <el-button size="small" type="primary" @click="examineConfirm">确 定</el-button>
      </span>
      </el-dialog>
    </div>
    <div>
      <el-dialog :close-on-click-modal="false" title="同步数据" :visible.sync="syncStatusDialog" width="30%">
        <el-form size="small" label-width="100px">
          <el-row>
            <el-col :span="20">
              <el-form-item label="同步误差" required>
                <el-input size="mini" placeholder="请输入" v-model="devn"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
        <span slot="footer" class="dialog-footer">
        <el-button size="small" @click="syncStatusDialog = false">取 消</el-button>
        <el-button size="small" type="primary" @click="syncConfirm">确 定</el-button>
      </span>
      </el-dialog>
    </div>
    <RightMenu :startX="rightMenuX+'px'" :startY="rightMenuY+'px'" :list="lists" :show="show"
               @clickOperateMore="clickEvent"></RightMenu>
    <organization :organizationDialog="organizeVisible" :type="organizeType" @close="closeOrganize"
                  @selectMember="selectMember"></organization>

    <EditReimbursement :editReimbursementDialog="editReimbursementDialog" :reimbursementId="reimbursementId"
                       :module="module"
                       @close="closeModal"></EditReimbursement>
    <ReimbursementDetail :reimbursementDetailDialog="reimbursementDetailDialog" :reimbursementId="reimbursementId"
                         @close="closeModal"></ReimbursementDetail>
    <ReimResult :reimResultDialog="reimResultDialog" :reimbursementId="reimbursementId" :type="resultType"
                @close="closeModal"></ReimResult>
    <AddressSearch :addressDialog="addressDialog" @close="closeAddressDialog" :isRent="isRent"></AddressSearch>
  </div>
</template>

<script>
  import RightMenu from '../../common/rightMenu.vue';
  import Organization from '../../common/organization.vue';
  import ReimbursementDetail from './components/reimbursementDetail';
  import EditReimbursement from './components/editReimbursement';
  import ReimResult from './components/reimResult';
  import AddressSearch from '../../common/addressSearch';

  export default {
    name: 'reim-manage',
    components: {RightMenu, Organization, ReimbursementDetail, EditReimbursement, ReimResult, AddressSearch},
    data() {
      return {
        rightMenuX: 0,
        rightMenuY: 0,
        show: false,
        lists: [],
        form: {
          module: 1,
          page: 1,
          limit: 12,
          // keyword: '',
          time: [],  //时间搜索
          status: '',  //完成状态
          source: '',  //来源
          type: '',  //报销类型
          staff_id: '',  //创建人
          contract_id: '',
        },
        address: '',
        collectTableData: [],
        rentTableData: [],
        totalNum: 0,
        isHigh: false,
        collectStatus: ' ',
        collectLoading: false,
        rentStatus: ' ',
        rentLoading: false,
        activeName: 'first',
        organizeVisible: false,
        organizeType: '',
        staff_name: '',
        reimbursementDetailDialog: false,
        reimbursementTypeCategory: [],  //报销类型
        reimbursementSourceCategory: [],  //报销来源
        finishedStatusCategory: [], //完成状态
        reimbursementId: '',  //报销单id
        editReimbursementDialog: false,  //编辑报销单
        reimResultDialog: false,  //报销结果
        resultType: '',   //报销结果类型 add/edit
        module: 1,
        addressDialog: false,
        isRent: 0,
        examineStatusDialog: false,
        examineStatus: '',
        examineStatusCategory: [],
        devn: '', // 同步误差值
        syncStatusDialog: false,
      }
    },
    mounted() {
      this.getCollectTableData();
      this.getDictionary();
    },
    watch: {
      address(val) {
        if (!val) {
          this.form.contract_id = '';
        }
        this.search();
      },
      examineStatusDialog(val) {
        if (!val) {
          this.examineStatus = '';
        }else{
          this.reimbursementId = '';
        }
      },
      syncStatusDialog(val) {
        if (!val) {
          this.devn = '';
        }
      },
    },
    methods: {
      syncConfirm() {
        this.$http.get(globalConfig.server + 'customer/reimbursement/sync', {params: {devn: this.devn}}).then((res) => {
          if (res.data.code === '30060') {
            this.syncStatusDialog = false;
            this.$notify.success({
              title: '成功',
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
      examineConfirm() {
        this.$http.put(globalConfig.server + 'customer/reimbursement_result/status/' + this.reimbursementId, {status: this.examineStatus}).then((res) => {
          if (res.data.code === '40010') {
            this.examineStatusDialog = false;
            this.$notify.success({
              title: '成功',
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
      emptySearch() {
        this.form.contract_id = '';
        this.address = '';
      },
      openAddressDialog() {
        this.addressDialog = true;
      },
      closeAddressDialog(val) {
        this.addressDialog = false;
        if (val) {
          this.address = val.address;
          this.form.contract_id = val.contract_id;
        }
      },
      getDictionary() {
        this.$http.get(globalConfig.server + 'setting/dictionary/640').then((res) => {
          if (res.data.code === "30010") {
            this.reimbursementTypeCategory = res.data.data;  //报销类型
          }
        });
        this.$http.get(globalConfig.server + 'setting/dictionary/641').then((res) => {
          if (res.data.code === "30010") {
            this.reimbursementSourceCategory = res.data.data;  //报销来源
          }
        });
        this.$http.get(globalConfig.server + 'setting/dictionary/642').then((res) => {
          if (res.data.code === "30010") {
            this.finishedStatusCategory = res.data.data;   //完成状态
            let finish_status = res.data.data;
            finish_status.forEach((item) => {
              if (item.id === 663 || item.id === 664) {
                this.examineStatusCategory.push(item);
              }
            });
          }
        });
      },
      getCollectTableData() {
        this.collectStatus = ' ';
        this.collectLoading = true;
        if (!this.form.time) {
          this.form.time = [];
        }
        this.form.module = 1;
        this.$http.get(globalConfig.server + 'customer/reimbursement', {params: this.form}).then((res) => {
          this.isHigh = false;
          this.collectLoading = false;
          if (res.data.code === '30000') {
            this.collectTableData = res.data.data.data;
            this.totalNum = res.data.data.count;
            if (res.data.data.data.length < 1) {
              this.collectStatus = "暂无数据";
              this.collectTableData = [];
              this.totalNum = 0;
            }
          } else {
            this.collectTableData = [];
            this.totalNum = 0;
            this.collectStatus = '暂无数据';
          }
        });
      },
      getRentTableData() {
        this.rentStatus = ' ';
        this.rentLoading = true;
        if (!this.form.time) {
          this.form.time = [];
        }
        this.form.module = 2;
        this.$http.get(globalConfig.server + 'customer/reimbursement', {params: this.form}).then((res) => {
          this.isHigh = false;
          this.rentLoading = false;
          if (res.data.code === '30000') {
            this.rentTableData = res.data.data.data;
            this.totalNum = res.data.data.count;
            if (res.data.data.data.length < 1) {
              this.rentStatus = "暂无数据";
              this.rentTableData = [];
              this.totalNum = 0;
            }
          } else {
            this.rentTableData = [];
            this.totalNum = 0;
            this.rentStatus = '暂无数据';
          }
        });
      },
      // 员工筛选
      chooseStaff() {
        this.organizeVisible = true;
        this.organizeType = 'staff';
      },
      // 清空员工
      closeStaff() {
        this.form.staff_id = '';
        this.staff_name = '';
      },
      selectMember(val) {
        if (this.organizeType === 'staff') {
          this.form.staff_id = val[0].id;
          this.staff_name = val[0].name;
        }
      },
      closeModal(val) {
        this.editReimbursementDialog = false;
        this.reimbursementDetailDialog = false;
        this.reimResultDialog = false;
        if (this.activeName == "first") {
          this.getCollectTableData();
        } else if (this.activeName == "second") {
          this.getRentTableData();
        }
      },
      closeOrganize() {
        this.organizeVisible = false;
      },
      // tabs标签页
      handleClick(tab, event) {
        if (this.activeName == "first") {
          this.module = 1;
          this.isRent = 0;
          this.getCollectTableData();
        } else if (this.activeName == "second") {
          this.module = 2;
          this.isRent = 1;
          this.getRentTableData();
        }
      },
      search() {
        this.form.page = 1;
        if (this.activeName === 'first') {
          this.getCollectTableData();
        } else {
          this.getRentTableData();
        }
      },
      // 高级
      highGrade() {
        this.isHigh = !this.isHigh;
      },
      // 重置
      resetting() {
        this.form.time = [];
        this.form.status = '';
        this.form.source = '';
        this.form.type = '';
        this.form.staff_id = '';
        this.staff_name = '';
      },
      handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
      },
      handleCurrentChange(val) {
        this.form.page = val;
        console.log(`当前页: ${val}`);
        if (this.activeName === 'first') {
          this.getCollectTableData();
        } else {
          this.getRentTableData();
        }
      },
      dblClickTable(row, event) {
        this.reimbursementId = row.id;
        this.reimbursementDetailDialog = true;
      },
      //右键
      houseMenu(row, event) {
        this.reimbursementId = row.id;
        if (row.results && row.results.id) {
          this.lists = [
            {clickIndex: 'edit_reimbursement', headIcon: 'el-icon-edit', label: '编辑报销单',},
            {clickIndex: 'edit_reimbursement_result', headIcon: 'el-icon-edit', label: '编辑报销结果',},
            {clickIndex: 'examine_reimbursement', headIcon: 'el-icon-edit', label: '审核报销',},
            // {clickIndex: 'delete_reimbursement', headIcon: 'el-icon-delete', label: '删除报销单',},
          ];
        } else {
          this.lists = [
            {clickIndex: 'edit_reimbursement', headIcon: 'el-icon-edit', label: '编辑报销单',},
            {clickIndex: 'add_reimbursement_result', headIcon: 'iconfont icon-zengjia1', label: '新增报销结果',},
            {clickIndex: 'examine_reimbursement', headIcon: 'el-icon-edit', label: '审核报销',},
            // {clickIndex: 'delete_reimbursement', headIcon: 'el-icon-delete', label: '删除报销单',},
          ];
        }
        this.contextMenuParam(event);
      },
      //右键回调
      clickEvent(val) {
        switch (val.clickIndex) {
          case 'edit_reimbursement':
            this.editReimbursementDialog = true;
            break;
          case 'delete_reimbursement':
            this.deleteRepair();
            break;
          case 'edit_reimbursement_result':
            this.reimResultDialog = true;
            this.resultType = 'edit';
            break;
          case 'add_reimbursement_result':
            this.reimResultDialog = true;
            this.resultType = 'add';
            break;
          case 'examine_reimbursement':
            this.examineStatusDialog = true;
            break;
        }
      },
      deleteRepair() {
      },
      //关闭右键菜单
      closeMenu() {
        this.show = false;
      },
      //右键参数
      contextMenuParam(event) {
        //param: user right param
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
      exportData() {
        let exportForm = {
          module: 1,
          time: this.form.time,
          status: this.form.status,
          source: this.form.source,
          type: this.form.type,
          staff_id: this.form.staff_id
        };
        this.$http.get(globalConfig.server + 'repaire/download', {params: exportForm}).then((res) => {
          if (res.data.code == '600201') {
            this.$notify.warning({
              title: '警告',
              message: res.data.msg
            });
            return;
          } else {
            this.$http.get(globalConfig.server + 'repaire/export', {
              responseType: 'arraybuffer',
              params: exportForm
            }).then((res) => { // 处理返回的文件流
              if (!res.data) {
                return;
              }
              let url = window.URL.createObjectURL(new Blob([res.data]));
              let link = document.createElement('a');
              link.style.display = 'a';
              link.href = url;
              link.setAttribute('download', 'excel.xls');
              document.body.appendChild(link);
              link.click();
            });
          }
        });

      },
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
  #clientContainer {

  }
</style>
