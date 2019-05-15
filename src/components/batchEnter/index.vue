<template>
  <div @click="show = false" @contextmenu="closeMenu">
    <div id="batchEnter">
      <div class="highRanking">
        <div class="tabsSearch">
          <el-form :inline="true" onsubmit="return false" size="mini">
            <div v-if="activeName === 'report'">
              <el-form-item>
                <el-input placeholder="请输入内容" clearable v-model="arc.search"
                          @keyup.enter.native="search" size="mini">
                  <el-button slot="append" icon="el-icon-search" @click="search"></el-button>
                </el-input>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" size="mini" @click="highGrade">高级</el-button>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" size="mini" @click="enterAccount">一键入账</el-button>
              </el-form-item>
            </div>
            <div v-else>
              <el-form-item>
                <el-input placeholder="请选择" @focus="openOrgan('operator_id', 'depart')" v-model="organData.operator_id"
                          size="mini">
                  <el-button slot="append" @click="emptyDepart('operator_id')">清空</el-button>
                </el-input>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" size="mini" @click="exportDialog = true">导 出</el-button>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" size="mini" @click="importDialog = true">导 入</el-button>
              </el-form-item>
              <el-form-item v-if="activeName ==='first'">
                <el-button type="primary" size="mini" @click="remindDialog = true">尾款提醒</el-button>
              </el-form-item>
            </div>
          </el-form>
        </div>
      </div>
      <div class="highRanking">
        <div class="filter high_grade" :class="isHigh? 'highHide':''">
          <el-form :inline="true" onsubmit="return false" :model="arc" size="mini" label-width="100px">
            <div class="filterTitle">
              <i class="el-icons-fa-bars"></i>&nbsp;&nbsp;高级搜索
            </div>
            <el-row class="el_row_border">
              <el-col :span="12">
                <el-row>
                  <el-col :span="8">
                    <div class="el_col_label">部门</div>
                  </el-col>
                  <el-col :span="16" class="el_col_option">
                    <el-form-item>
                      <el-input placeholder="请选择" @focus="openOrgan('org_id', 'depart')" v-model="organData.org_id"
                                size="mini">
                        <el-button slot="append" @click="emptyDepart('org_id')">清空</el-button>
                      </el-input>
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
            <!--<el-tab-pane label="报备入账" name="report">-->
              <!--<el-table-->
                <!--ref="multipleTable"-->
                <!--:data="tableData"-->
                <!--:empty-text='rentStatus'-->
                <!--v-loading="rentLoading"-->
                <!--element-loading-text="拼命加载中"-->
                <!--element-loading-spinner="el-icon-loading"-->
                <!--element-loading-background="rgba(255, 255, 255, 0)"-->
                <!--@select="handleSelection"-->
                <!--@select-all="handleSelectionAll"-->
                <!--@row-contextmenu='openContextMenu'-->
                <!--style="width: 100%">-->
                <!--<el-table-column-->
                  <!--type="selection">-->
                <!--</el-table-column>-->
                <!--<el-table-column-->
                  <!--prop="pay_date"-->
                  <!--label="收款时间">-->
                <!--</el-table-column>-->
                <!--<el-table-column-->
                  <!--prop="address"-->
                  <!--label="房屋地址">-->
                <!--</el-table-column>-->
                <!--<el-table-column-->
                  <!--prop="subject.title"-->
                  <!--label="科目">-->
                <!--</el-table-column>-->
                <!--<el-table-column-->
                  <!--prop="amount_receivable"-->
                  <!--label="应收金额">-->
                <!--</el-table-column>-->
                <!--<el-table-column-->
                  <!--prop="amount"-->
                  <!--label="实收金额">-->
                <!--</el-table-column>-->
                <!--<el-table-column-->
                  <!--label="汇款帐户"-->
                  <!--prop="account.name">-->
                <!--</el-table-column>-->
                <!--<el-table-column-->
                  <!--label="状态">-->
                  <!--<template slot-scope="scope">-->
                    <!--<div class="is_entered1" v-if="scope.row.is_entered">已入账</div>-->
                    <!--<div class="is_entered2" v-else>未入账</div>-->
                  <!--</template>-->
                <!--</el-table-column>-->
                <!--<el-table-column-->
                  <!--label="操作人">-->
                  <!--<template slot-scope="scope">-->
                    <!--<span v-if="scope.row.simple_staff && scope.row.simple_staff.real_name">-->
                      <!--{{scope.row.simple_staff.real_name}}-->
                    <!--</span>-->
                    <!--<span v-else>/</span>-->
                  <!--</template>-->
                <!--</el-table-column>-->
              <!--</el-table>-->
            <!--</el-tab-pane>-->
            <el-tab-pane label="应收入账" name="first">
              <el-table
                :data="tableData1"
                :empty-text='rentStatus'
                v-loading="rentLoading"
                element-loading-text="拼命加载中"
                element-loading-spinner="el-icon-loading"
                element-loading-background="rgba(255, 255, 255, 0)"
                style="width: 100%">
                <el-table-column
                  prop="create_time"
                  label="导入时间">
                </el-table-column>
                <el-table-column
                  width="500"
                  label="账户及余额">
                  <template slot-scope="scope">
                    <ul>
                      <li v-for="(val,key) in scope.row.account_snapshot" class="account_snapshot">
                        <span class="span1">{{key}} : </span>
                        <span class="span2">{{val}}元</span>
                      </li>
                    </ul>
                  </template>
                </el-table-column>
                <el-table-column
                  label="操作人">
                  <template slot-scope="scope">
                <span v-if="scope.row.simple_staff && scope.row.simple_staff.real_name">
                  {{scope.row.simple_staff.real_name}}
                </span>
                    <span v-else="">/</span>
                  </template>
                </el-table-column>
              </el-table>
            </el-tab-pane>
            <el-tab-pane label="应付入账" name="second">
              <el-table
                :data="tableData2"
                :empty-text='rentStatus'
                v-loading="rentLoading"
                element-loading-text="拼命加载中"
                element-loading-spinner="el-icon-loading"
                element-loading-background="rgba(255, 255, 255, 0)"
                style="width: 100%">
                <el-table-column
                  prop="create_time"
                  label="导入时间">
                </el-table-column>
                <!--<el-table-column-->
                <!--prop="name"-->
                <!--label="导入数量">-->
                <!--</el-table-column>-->
                <el-table-column
                  width="500"
                  label="账户及余额">
                  <template slot-scope="scope">
                    <ul>
                      <li v-for="(val,key) in scope.row.account_snapshot" class="account_snapshot">
                        <span class="span1">{{key}} : </span>
                        <span class="span2">{{val}}元</span>
                      </li>
                    </ul>
                  </template>
                </el-table-column>
                <el-table-column
                  label="操作人">
                  <template slot-scope="scope">
                <span v-if="scope.row.simple_staff && scope.row.simple_staff.real_name">
                  {{scope.row.simple_staff.real_name}}
                </span>
                    <span v-else="">/</span>
                  </template>
                </el-table-column>
              </el-table>
            </el-tab-pane>
          </el-tabs>
        </div>
        <div class="block pages">
          <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="params.page"
            :page-size="params.limit"
            layout="total, prev, pager, next, jumper"
            :total="tableNum">
          </el-pagination>
        </div>
      </div>
    </div>
    <ExportData :exportDialog="exportDialog" :activeName="activeName" @close="closeModal"></ExportData>
    <ImportData :importDialog="importDialog" :activeName="activeName" @close="closeModal"></ImportData>
    <Remind :remindDialog="remindDialog" @close="closeModal"></Remind>

    <Organization :organizationDialog="organModule" :type="organizeType" :length="lengths"
                  @close="closeOrgan" @selectMember="selectMember"></Organization>

    <!--右键-->
    <RightMenu :startX="rightMenuX+'px'" :startY="rightMenuY+'px'" :list="lists" :show="show"
               @clickOperate="clickEvent"></RightMenu>
  </div>
</template>

<script>
  import ExportData from './components/exportData'
  import ImportData from './components/importData'
  import Remind from './components/remind'
  import Organization from '../common/organization.vue';  //选人组件
  import RightMenu from '../common/rightMenu.vue';        //右键
  export default {
    name: "index",
    components: {RightMenu, ExportData, ImportData, Organization, Remind},
    data() {
      return {
        url: globalConfig.finance_server,
        rightMenuX: 0,
        rightMenuY: 0,
        show: false,
        lists: [],

        isHigh: false,
        tableData: [],
        tableData1: [],
        tableData2: [],
        tableNum: 0,
        params: {
          limit: 12,
          page: 1,
          operator_id: '',
        },
        arc: {
          limit: 12,
          page: 1,
          search: '',
          org_id: '',
        },
        tableStatus: false,
        patch_id: '',
        organData: {},
        ids: [],
        query: {},
        // 组织架构
        organModule: false,
        organizeType: '',
        lengths: 0,
        organDivision: '',//字段名

        rentStatus: " ",
        rentLoading: false,
        exportDialog: false,
        importDialog: false,
        remindDialog: false,
        organizationDialog: false,
        activeName: 'first',
      };
    },
    activated() {
    },
    mounted() {
      this.myData();
    },
    watch: {
      activeName(val) {
        if (val) {
          this.params.operator_id = '';
          this.arc.org_id = '';
          this.arc.search = '';
          this.organData = {};
          this.myData();
        }
      },
    },
    methods: {
      handleClick(tab, event) {

      },
      // 搜索
      search() {
        this.isHigh = false;
        this.params.page = 1;
        this.myData();
      },
      // 重置
      resetting() {

      },
      // 高级
      highGrade() {
        this.isHigh = !this.isHigh;
      },
      // 复选框
      handleSelection(val) {
        this.query = {};
        val.forEach(res => {
          this.ids.push(res);
        });
        this.ids = Array.from(new Set(this.ids));
      },
      // 全选
      handleSelectionAll() {
        if (!this.tableStatus) {
          setTimeout(() => {
            this.$refs.multipleTable.clearSelection();
          });
          this.prompt('warning', '请选择筛选条件！');
          return;
        }
        this.ids = [];
        this.query.search = this.arc.search;
        this.query.org_id = this.arc.org_id;
      },
      myData() {
        this.rentStatus = " ";
        this.rentLoading = true;
        let header, params;
        let val = this.activeName;
        if (val === 'report') {
          header = "financial/arc";
          params = {params: this.arc};
        } else if (val === 'first') {
          header = "financial/receivable/transfer/record";
          params = {params: this.params};
        } else {
          header = "financial/payable/transfer/record";
          params = {params: this.params};
        }
        this.$http.get(globalConfig.server + header, params).then((res) => {
          this.rentLoading = false;
          if (res.data.code === '80000' || res.data.code === '20000') {
            if (val === 'report') {
              this.tableStatus = (this.arc.search || this.arc.org_id) ? true : false;
              this.tableData = res.data.data.data;
            } else if (val === 'first') {
              this.tableData1 = res.data.data.data;
            } else {
              this.tableData2 = res.data.data.data;
            }
            this.tableNum = res.data.data.count;
          } else {
            this.tableData = [];
            this.tableData1 = [];
            this.tableData2 = [];
            this.rentStatus = "暂无数据";
            this.tableNum = 0;
          }
        });
      },
      // 复选框 自动选中
      toggleSelection(rows) {
        if (rows) {
          rows.forEach(row => {
            this.$refs.multipleTable.toggleRowSelection(row);
          });
        } else {
          this.$refs.multipleTable.clearSelection();
        }
      },
      // 一键入账
      enterAccount() {
        let id = [];
        for (let key of this.ids) {
          id.push(key.id);
        }
        this.$http.post(globalConfig.server + 'financial/arc/enter', {
          ids: id,
          query: this.query,
        }).then(res => {
          if (res.data.code === '20000') {
            this.ids = [];
            this.query = {};
            this.search();
            this.$refs.multipleTable.clearSelection();
            this.prompt('success', res.data.msg);
          } else {
            this.prompt('warning', res.data.msg);
          }
        })
      },
      closeModal(val) {
        this.exportDialog = false;
        this.importDialog = false;
        this.remindDialog = false;
        this.organizationDialog = false;
        if (val = 'success') {
          this.myData();
        }
      },
      handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
      },
      handleCurrentChange(val) {
        this.params.page = val;
        this.arc.page = val;
        this.myData();
      },

      // 打开组织架构
      openOrgan(val, type) {
        this.organDivision = val;
        this.organModule = true;
        this.organizeType = type;
        this.lengths = 1;
      },
      // 清空部门
      emptyDepart(val) {
        if (val === 'org_id') {
          this.arc[val] = '';
          this.organData[val] = '';
          this.organData = Object.assign({}, this.organData);
        } else {
          this.params[val] = '';
          this.organData[val] = '';
          this.search();
        }
      },
      // 关闭组织架构
      closeOrgan() {
        this.organDivision = '';
        this.organModule = false;
        this.organizeType = '';
        this.lengths = 0;
      },
      // 确认部门
      selectMember(val) {
        let organ = this.organDivision;
        if (organ === 'org_id') {
          this.arc[organ] = val[0].id;
          this.organData[organ] = val[0].name;
        } else {
          this.params[organ] = val[0].id;
          this.organData[organ] = val[0].name;
          this.search();
        }
      },
      showMessage() {
        this.$confirm('此操作将删除该账单不可逆转, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$http.get(globalConfig.server + 'financial/arc/delete/' + this.patch_id).then(res => {
            if (res.data.code === '20040') {
              this.myData();
              this.prompt('success', res.data.msg);
            } else {
              this.prompt('warning', res.data.msg);
            }
          });
        }).catch(() => {
        })
      },
      // 右键
      openContextMenu(row) {
        this.patch_id = row.id;
        this.lists = [
          {clickIndex: 'delete', headIcon: 'el-icon-edit-outline', label: '删除'},
        ];
        this.contextParams();
      },
      // 右键回调
      clickEvent(val) {
        switch (val) {
          case 'delete':
            this.showMessage();
            break;
        }
      },
      //关闭右键菜单
      closeMenu() {
        this.show = false;
      },
      //右键参数
      contextParams() {
        let e = event || window.event;let event = window.event;
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
  };
</script>

<style lang="scss" scoped>
  .filter {
    float: right;
  }

  .is_entered1, .is_entered2 {
    width: 80px;
    padding: 2px 0;
    margin: 0 auto;
    color: #fff;
    -webkit-border-radius: 4px;
    -moz-border-radius: 4px;
    border-radius: 4px;
  }

  .is_entered1 {
    background-color: #67C23A;
  }

  .is_entered2 {
    background-color: #EAB15B;
  }

  .account_snapshot {
    span {
      display: inline-block;
      width: 200px;
    }
    .span1 {
      text-align: right;
      color: #6a8dfb
    }
    .span2 {
      text-align: left
    }
  }
</style>
