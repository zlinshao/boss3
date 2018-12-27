<template>
  <div @click="show=false" @contextmenu="closeMenu" id="receivable">
    <div class="highRanking">
      <div class="highSearch">
        <el-form :model="form" :inline="true" size="mini">
          <el-form-item>
            <el-input placeholder="请输入内容" v-model="form.search" size="mini" clearable
                      @keyup.enter.native.prevent="getTableData">
              <el-button slot="append" icon="el-icon-search" @click="getTableData"></el-button>
            </el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" size="mini" @click="highGrade">高级</el-button>
          </el-form-item>
          <el-form-item>
            <el-button type="primary"><i class="el-icon-refresh"></i></el-button>
          </el-form-item>
          <el-form-item>
            <el-button type="primary"><i class="el-icon-plus"></i>&nbsp;新增</el-button>
          </el-form-item>
          <el-form-item>
            <el-dropdown trigger="click" @command="leadingOut">
              <el-button type="primary" size="mini">
                导出<i class="el-icon-arrow-down el-icon--right"></i>
              </el-button>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item command="collect">导出</el-dropdown-item>
                <el-dropdown-item command="rent">催缴导出</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </el-form-item>
        </el-form>
      </div>

      <div class="filter high_grade" :class="isHigh? 'highHide':''">
        <el-form :inline="true" onsubmit="return false" :model="form" size="mini" label-width="100px">
          <div class="filterTitle">
            <i class="el-icons-fa-bars"></i>&nbsp;&nbsp;高级搜索
          </div>
          <el-row class="el_row_border">
            <el-col :span="12">
              <el-row>
                <el-col :span="8">
                  <div class="el_col_label">入账状态</div>
                </el-col>
                <el-col :span="16" class="el_col_option">
                  <el-form-item>
                    <el-select v-model="form.status" clearable size="mini">
                      <el-option v-for="(key,index) in values" :label="key" :value="index + 1" :key="index"></el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
              </el-row>
            </el-col>
            <el-col :span="12">
              <el-row>
                <el-col :span="8">
                  <div class="el_col_label">应收日期</div>
                </el-col>
                <el-col :span="16" class="el_col_option">
                  <el-form-item>
                    <div class="block">
                      <el-date-picker
                        v-model="rangeDate"
                        type="daterange"
                        align="right"
                        unlink-panels
                        range-separator="至"
                        start-placeholder="开始日期"
                        end-placeholder="结束日期"
                        :picker-options="pickerOptions">
                      </el-date-picker>
                    </div>
                  </el-form-item>
                </el-col>
              </el-row>
            </el-col>
          </el-row>
          <el-row class="el_row_border">
            <el-col :span="12">
              <el-row>
                <el-col :span="8">
                  <div class="el_col_label">催缴状态</div>
                </el-col>
                <el-col :span="16" class="el_col_option">
                  <el-form-item>
                    <el-select v-model="form.tag_status" clearable size="mini">
                      <el-option v-for="(key,index) in tag_status" :label="key" :value="index + 1"
                                 :key="index"></el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
              </el-row>
            </el-col>
            <el-col :span="12">
              <el-row>
                <el-col :span="8">
                  <div class="el_col_label">催缴日期</div>
                </el-col>
                <el-col :span="16" class="el_col_option">
                  <el-form-item>
                    <div class="block">
                      <el-date-picker
                        v-model="tagDate"
                        type="daterange"
                        align="right"
                        unlink-panels
                        range-separator="至"
                        start-placeholder="开始日期"
                        end-placeholder="结束日期"
                        :picker-options="pickerOptions">
                      </el-date-picker>
                    </div>
                  </el-form-item>
                </el-col>
              </el-row>
            </el-col>
          </el-row>
          <el-row class="el_row_border">
            <el-col :span="12">
              <el-row>
                <el-col :span="8">
                  <div class="el_col_label">科目</div>
                </el-col>
                <el-col :span="16" class="el_col_option">
                  <el-form-item>
                    <el-input v-model="subject_name" @focus="openSubjectTree" placeholder="请选择"
                              readonly>
                      <template slot="append">
                        <div style="cursor: pointer;" @click="clearSubjectTree">清空</div>
                      </template>
                    </el-input>
                  </el-form-item>
                </el-col>
              </el-row>
            </el-col>
            <el-col :span="12">
              <el-row>
                <el-col :span="8">
                  <div class="el_col_label">部门/员工</div>
                </el-col>
                <el-col :span="16" class="el_col_option">
                  <el-form-item>
                    <el-input v-model="staff_name" @focus="chooseStaff" placeholder="请选择员工"
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
          <div class="btnOperate">
            <el-button size="mini" type="primary" @click="getTableData">搜索</el-button>
            <el-button size="mini" type="primary" @click="resetting">重置</el-button>
            <el-button size="mini" type="primary" @click="highGrade">取消</el-button>
          </div>
        </el-form>
      </div>
    </div>
    <!--应收-->
    <div class="border_table" v-show="lookType === 'all' || lookType === 'collect'">
      <el-table
        :empty-text='collectStatus'
        v-loading="collectLoading"
        element-loading-text="拼命加载中"
        element-loading-spinner="el-icon-loading"
        element-loading-background="rgba(255, 255, 255, 0)"
        :data="collectData"
        width="100%"
        @cell-click="showDetail"
        @row-contextmenu="collectMenu"
        @header-click="selectPrice"
      >
        <el-table-column
          label="收款时间"
          prop="pay_date"
          width="90px">
        </el-table-column>
        <el-table-column
          label="客户姓名"
          prop="addr"
          width="90px">
        </el-table-column>
        <el-table-column
          label="收入科目"
          prop="subject">
        </el-table-column>
        <el-table-column
          label="应收金额"
          prop="amount_receivable"
          width="70px">
        </el-table-column>
        <el-table-column
          label="实收金额"
          prop="amount_received">
        </el-table-column>
        <el-table-column
          label="剩余款项"
          prop="balance">
        </el-table-column>
        <el-table-column
          label="补齐时间"
          prop="complete_date"
        >
        </el-table-column>
        <el-table-column
          label="状态"
          prop="status">
          <template slot-scope="scope">
            <el-button v-if="scope.row.status == 1" class="btn btn1" size="mini">待入账</el-button>
            <el-button v-if="scope.row.status == 2" class="btn btn2" size="mini">待结清</el-button>
            <el-button v-if="scope.row.status == 3" class="btn btn3" size="mini">已结清</el-button>
            <el-button v-if="scope.row.status == 4" class="btn btn4" size="mini">已超额</el-button>
          </template>
        </el-table-column>
        <el-table-column
          label="催缴备注"
          prop="remarks">
          <template slot-scope="scope">
            <span
              v-if="scope.row.remarks[0]">{{scope.row.remarks[0].create_time}}/{{scope.row.remarks[0].content}}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="明细详情"
          prop="description">
          <template slot-scope="scope">
                 <span>{{scope.row.description.customer}}/
                     {{scope.row.description.months}}/{{scope.row.description.description}}/
                     {{scope.row.description.staff}}
                 </span>
          </template>
        </el-table-column>
        <el-table-column
          label="备注"
          prop="tags">
          <template slot-scope="scope">
                 <span v-if="scope.row.tags[0]">{{scope.row.tags[0].create_time}}
                     {{scope.row.tags[0].content}}
                 </span>
          </template>
        </el-table-column>
        <el-table-column
          label="手机号"
          prop="customer.contact"
          width="100px">
        </el-table-column>
      </el-table>

      <div class="block pages">
        <div>
        <span>
          应收金额(元)：<span style="color: #78cd51;">{{sum.receivable_sum}}</span>
        </span>&nbsp;&nbsp;&nbsp;&nbsp;
          <span>
          实收金额(元)：<span style="color: #f66;">{{sum.received_sum}}</span>
        </span>&nbsp;&nbsp;&nbsp;&nbsp;
          <span>
          剩余款项(元)：<span style="color: #ff9a02;">{{sum.balance_sum}}</span>
        </span>&nbsp;&nbsp;&nbsp;&nbsp;
          <span>
          今日到期：1
        </span>
        </div>
        <el-pagination
          @current-change="handleCurrentChange"
          :current-page="currentPage"
          :page-sizes="[12,20,40]"
          :page-size="12"
          layout="total, prev, pager, next"
          :total="totalNum">
        </el-pagination>
      </div>
    </div>

    <el-dialog title="收货地址" :visible.sync="addrDetail">
      <el-table :data="addrDetails">
        <el-table-column property="addr" label="客户姓名" width="150"></el-table-column>
        <el-table-column property="customer.contract" label="手机号" width="200"></el-table-column>
        <el-table-column property="addr" label="租房月数"></el-table-column>
        <el-table-column property="addr" label="付款方式"></el-table-column>
        <el-table-column property="addr" label="月单价"></el-table-column>
        <el-table-column property="addr" label="合同时间周期"></el-table-column>
        <el-table-column property="addr" label="开单人"></el-table-column>
        <el-table-column property="addr" label="部门"></el-table-column>
      </el-table>
    </el-dialog>
    <!--右键-->
    <RightMenu :startX="rightMenuX+'px'" :startY="rightMenuY+'px'" :list="lists" :show="show"
               @clickOperate="clickEvent"></RightMenu>

    <!--组织架构-->
    <organization :organizationDialog="organizeVisible" @close="closeOrganize" :type="organizeType"
                  @selectMember="selectMember"></organization>

    <!--新增-->
    <ChargeModule :module="chargeVisible" @close="closeCharge" :title="titles"></ChargeModule>

    <!--编辑付款/收款时间-->
    <ReviseTime :module="payTimeVisible" :date="payTimes" @close="closePayTime" :title="titles"></ReviseTime>

    <!--编辑补齐时间-->
    <PolishTime :module="polishTimeVisible" :date="polishTime" @close="closePolishTime"></PolishTime>

    <Remarks :module="remarkVisible" @close="closeRemark"></Remarks>

    <!-- 科目搜索 -->
    <subjectTree :subjectDialog="subjectVisible" :types="subjectType" @close="closeSubjectTree"
                 @selectSubject="selectSubject"></subjectTree>
  </div>
</template>

<script>
  import organization from '../../common/organization.vue'
  import RightMenu from '../../common/rightMenu.vue'    //右键
  import subjectTree from '../components/subjectTree.vue'
  import ChargeModule from '../components/chargeModule.vue'
  import ReviseTime from '../components/reviseTime.vue'
  import PolishTime from '../components/polishTime.vue'
  import Remarks from '../../common/remarks.vue'

  export default {
    name: "index",
    components: {organization, RightMenu, Remarks, subjectTree, ChargeModule, PolishTime, ReviseTime},
    data() {
      return {
        subjectType: '',
        subjectVisible: false,
        url: globalConfig.finance_server,
        rightMenuX: 0,
        rightMenuY: 0,
        show: false,
        lists: [],

        isHigh: false,
        lookType: 'all',
        pageNumber: 5,

        payTimes: [],
        polishTime: '',
        titles: '',
        currentPage: 1,
        remarkVisible: false,
        payTimeVisible: false,
        polishTimeVisible: false,
        chargeVisible: false,
        filterModule: false,
        organizeVisible: false,
        values: ['待入账', '待结清', '已结清', '已超额',],
        tag_status: ['违约', '延期', '贴条', '换锁', '维修', '资金', '炸弹', '调房', '特殊情况'],
        form: {
          staff_ids: [],
          department_ids: [],
          status: '',
          startRange: '',//应收开始时间
          endRange: '',//应收结束时间
          tag_status: '',//催缴状态
          startTag: '',//催缴开始时间
          endTag: '',//催缴结束时间
          subject_id: '',//科目id
          search: '',//搜索框
          minPrice: '',//剩余款项最小区间
          maxPrice: '',//剩余款项最大区间
          page: 1,
          limit: 12
        },
        sum: {
          balance_sum: '',//剩余款项
          receivable_sum: '',//应收金额
          received_sum: ''//实收金额
        },
        addrDetail: false,
        addrDetails: [],
        totalNum: 0,
        rangeDate: '',
        tagDate: '',
        subject_name: '',
        department_name: '',
        collectLoading: false,
        collectStatus: '',
        organizeType: '',
        staff_name: '',
        pickerOptions: {
          shortcuts: [{
            text: '最近一周',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit('pick', [start, end]);
            }
          }, {
            text: '最近一个月',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              picker.$emit('pick', [start, end]);
            }
          }, {
            text: '最近三个月',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
              picker.$emit('pick', [start, end]);
            }
          }]
        },
        collectData: [],
        restaurants: [],
        state: ''
      }
    },
    mounted() {
      this.getTableData();
    },
    methods: {
      getTableData() {
        this.collectLoading = true;
        this.collectStatus = ' ';
        let params = this.form;
        console.log(this.form);
        return false;
        this.$http.get(this.url + 'account/receivable/index', {params: params}).then((res) => {
          console.log(res);
          if (res.data.success) {
            this.collectData = res.data.data.data;
            this.totalNum = res.data.data.count;
            this.sum = res.data.data.sum;
          } else {
            this.collectStatus = '暂无数据';
            this.collectData = [];
            this.totalNum = 0;
          }
          this.collectLoading = false;
        });
      },
      closeSubjectTree() {
        this.subjectVisible = false;
      },
      clearSubjectTree() {
        this.form.subject_id = '';
        this.subject_name = '';
      },
      openSubjectTree() {
        this.subjectType = 'next';
        this.subjectVisible = true;
      },
      selectSubject(val) {
        this.form.subject_id = val.id;
        this.subject_name = val.name;
      },
      closeOrganize() {
        this.organizeVisible = false;
      },
      // 员工筛选
      chooseStaff() {
        this.organizeVisible = true;
        this.organizeType = 'staff';
      },
      // 清空员工
      closeStaff() {
        this.form.staff_ids = [];
        this.staff_name = '';
      },
      selectMember(val) {
        if (this.organizeType === 'depart') {
          for (var i = 0; i < val.length; i++) {
            this.department_name = this.department_name === "" ? val[i].name : this.department_name + "," + val[i].name;
            this.form.depart_ids.push(val[i].id);
          }
        } else if (this.organizeType === 'staff') {
          for (var i = 0; i < val.length; i++) {
            this.staff_name = this.staff_name === "" ? val[i].name : this.staff_name + "," + val[i].name;
            this.form.staff_ids.push(val[i].id);
          }
        }
      },
      selectPrice(column, event) {
        if (column.property === "balance") {
          alert(1);
        }

      },
      // 重置
      resetting() {
        this.form.keywords = '';
      },
      // 高级筛选
      highGrade() {
        this.isHigh = !this.isHigh;
      },
      // 导出
      leadingOut(val) {
        console.log(val);
      },

      closeCharge() {
        this.chargeVisible = false;
      },
      handleSelect(item) {
        console.log(item);
      },
      close_() {
        console.log(1);
      },
      //
      showDetail(row, column) {
        if (column.property === "addr") {//显示详情
          console.log(row);
          this.addrDetails.push(row);
          this.addrDetail = true;
        }
      },
      // 右键 收
      collectMenu(row, event) {
        this.lists = [
          {clickIndex: 'collectWay', headIcon: 'el-icon-edit-outline', label: '应收入账',},
          {clickIndex: 'collectRemark', headIcon: 'el-icon-edit', label: '备注',},
          {
            clickIndex: '', headIcon: 'el-icon-date', tailIcon: 'el-icon-arrow-right', label: '收款时间',
            children: [
              {clickIndex: 'reviseCollect', label: '编辑',},
              {clickIndex: 'lookCollect', label: '查看',}
            ]
          },
          {clickIndex: 'collectPolish', headIcon: 'el-icon-date', label: '修改补齐时间',},
          {clickIndex: 'delete', headIcon: 'el-icon-circle-close-outline', label: '删除',},
        ];
        this.contextMenuParam(event);
      },

      // 右键回调
      clickEvent(val) {
        this.titles = val;
        if (val === 'delete') {
          console.log(val);
          this.openDelete();
        }
        if (val === 'collectWay') {
          this.chargeVisible = true;
        }
        if (val === 'rentWay') {
          this.chargeVisible = true;
        }
        if (val === 'revisePay' || val === 'reviseCollect') {
          this.payTimeVisible = true;
          this.payTimes = ['1990-01-01', '1990-02-01', '1990-03-01', '1990-04-01', '1990-06-01', '1990-06-01'];
        }
        if (val === 'lookPay' || val === 'lookCollect') {
          this.payTimeVisible = true;
          this.payTimes = ['1992-01-01', '1992-02-01', '1992-03-01', '1992-04-01', '1992-06-01', '1992-06-01'];
        }
        if (val === 'collectPolish' || val === 'payPolish') {
          this.polishTimeVisible = true;
          this.polishTime = '1992-01-01';
        }
        if (val === 'collectRemark' || val === 'payRemark') {
          this.remarkVisible = true;
        }
      },
      // 关闭付款/收款时间
      closePayTime() {
        this.payTimeVisible = false;
      },
      // 关闭补齐时间
      closePolishTime() {
        this.polishTimeVisible = false;
      },
      closeRemark() {
        this.remarkVisible = false;
      },
      //关闭右键菜单
      closeMenu() {
        this.show = false;
      },
      //右键参数
      contextMenuParam(event) {
        let e = event || window.event;
        this.show = false;
        this.rightMenuX = e.clientX + document.documentElement.scrollLeft - document.documentElement.clientLeft;
        this.rightMenuY = e.clientY + document.documentElement.scrollTop - document.documentElement.clientTop;
        event.preventDefault();
        event.stopPropagation();
        this.$nextTick(() => {
          this.show = true
        })
      },
      // 删除
      openDelete() {
        this.$confirm('此操作将删除该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$message({
            type: 'success',
            message: '删除成功!'
          });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });
      },
      handleCurrentChange(val) {
        console.log(`当前页: ${val}`);
      },
    },
  }
</script>

<style lang="scss">
  #receivable {
    .btn {
      float: left;
      border: 0;
      color: #FFFFFF;
      cursor: default;
    }

    .btn1 {
      background-color: #fc0;
    }

    .btn2 {
      background-color: #f99;
    }

    .btn3 {
      background-color: #78cd51;
    }

    .btn4 {
      background-color: #F04D3D;
    }

    .block.pages {
      display: -webkit-flex;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    .border_table {
      box-shadow: 0 0 10px 0 #bbb;
      padding: 8px;
      border-radius: 3px;
      margin-bottom: 24px;
    }
  }
</style>
