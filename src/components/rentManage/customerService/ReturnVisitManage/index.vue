<template>
  <div @click="show=false" @contextmenu="closeMenu">
    <div id="clientContainer">
      <div class="highRanking">
        <div class="tabsSearch">
          <el-form :inline="true" size="mini">
            <el-form-item>
              <el-button class="iconfont icon-zhengchangliebiao" @click="showList('list')" :disabled="form.tag==1" style="font-size: 12px;"
                         size="mini" type="primary" plain>列表</el-button>
              <el-button class="iconfont icon-liebiaozhankai" @click="showList('fold')" :disabled="form.tag==2" style="font-size: 12px;"
                         size="mini" type="primary" plain>聚合</el-button>
            </el-form-item>
            <el-form-item>
              <el-input placeholder="请输入房屋地址" v-model="form.keywords" size="mini" clearable
                        @keyup.enter.native="search">
                <el-button slot="append" icon="el-icon-search" @click="search"></el-button>
              </el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" size="mini" @click="highGrade">高级</el-button>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" size="mini" @click="exportData">导出</el-button>
            </el-form-item>
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
                        v-model="form.create_time"
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
                    <div class="el_col_label">审核状态</div>
                  </el-col>
                  <el-col :span="16" class="el_col_option">
                    <el-form-item>
                      <el-select clearable v-model="form.audit" placeholder="请选择审核状态" value="">
                        <el-option v-for="item in passStatus" :label="item.dictionary_name" :value="item.id"
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
                    <div class="el_col_label">信息来源</div>
                  </el-col>
                  <el-col :span="16" class="el_col_option">
                    <el-form-item>
                      <el-select clearable v-model="form.originate" placeholder="请选择信息来源" value="">
                        <el-option v-for="item in cityCategory" :label="item.dictionary_name" :value="item.id"
                                   :key="item.id"></el-option>
                      </el-select>
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
                      <el-input v-model="operator_name" @focus="chooseStaff" placeholder="请选择创建人"
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
              <el-button size="mini" type="primary" @click="search">搜索</el-button>
              <el-button size="mini" type="primary" @click="resetting">重置</el-button>
              <el-button size="mini" type="primary" @click="highGrade">取消</el-button>
            </div>
          </el-form>
        </div>
      </div>
      <div class="main">
        <el-tabs v-model="activeName" @tab-click="handleClick">
          <el-tab-pane label="收房回访记录" name="first">
            <el-table
              :data="collectTableData"
              :empty-text='collectStatus'
              v-loading="collectLoading"
              element-loading-text="拼命加载中"
              element-loading-spinner="el-icon-loading"
              element-loading-background="rgba(255, 255, 255, 0)"
              @row-dblclick="dblClickTable"
              @expand-change="expandChange"
              @row-contextmenu='houseMenu'
              style="width: 100%">
              <el-table-column type="expand" v-if="form.tag==2 ">
                <template slot-scope="props">
                  <el-table :data="props.row.son" :show-header="false" @row-dblclick="dblClickTable" style="width: 101%;max-width: 101%;">
                    <el-table-column width="30"></el-table-column>
                    <el-table-column>
                      <template slot-scope="scope">
                        <span v-if="scope.row.create_time">{{scope.row.create_time}}</span>
                        <span v-if="!scope.row.create_time">暂无</span>
                      </template>
                    </el-table-column>
                    <el-table-column
                      label="回访人">
                      <template slot-scope="scope">
                        <span v-if="scope.row.operator">{{scope.row.operator}}</span>
                        <span v-if="!scope.row.operator">暂无</span>
                      </template>
                    </el-table-column>
                    <el-table-column
                      label="合同编号">
                      <template slot-scope="scope">
                        <span v-if="scope.row.contract_number">{{scope.row.contract_number}}</span>
                        <span v-if="!scope.row.contract_number">暂无</span>
                      </template>
                    </el-table-column>
                    <el-table-column
                      label="房屋地址">
                      <template slot-scope="scope">
                        <span v-if="scope.row.address">{{scope.row.address}}</span>
                        <span v-if="!scope.row.address">暂无</span>
                      </template>
                    </el-table-column>
                    <el-table-column
                      label="合同类型">
                      <template slot-scope="scope">
                        <span v-if="scope.row.contract_type">{{scope.row.contract_type}}</span>
                        <span v-if="!scope.row.contract_type">暂无</span>
                      </template>
                    </el-table-column>
                    <el-table-column
                      label="合同周期">
                      <template slot-scope="scope">
                        <span v-if="scope.row.contract_cycle">{{scope.row.contract_cycle}}</span>
                        <span v-if="!scope.row.contract_cycle">暂无</span>
                      </template>
                    </el-table-column>
                    <el-table-column
                      label="信息来源">
                      <template slot-scope="scope">
                        <span v-if="scope.row.originate">{{scope.row.originate}}</span>
                        <span v-if="!scope.row.originate">暂无</span>
                      </template>
                    </el-table-column>
                    <el-table-column
                      label="保修期">
                      <template slot-scope="scope">
                        <span v-if="scope.row.guarantee">{{scope.row.guarantee}}</span>
                        <span v-if="!scope.row.guarantee">暂无</span>
                      </template>
                    </el-table-column>
                    <el-table-column
                      label="开单人">
                      <template slot-scope="scope">
                        <span v-if="scope.row.drawer">{{scope.row.drawer}}</span>
                        <span v-if="!scope.row.drawer">暂无</span>
                      </template>
                    </el-table-column>
                    <el-table-column
                      label="部门">
                      <template slot-scope="scope">
                        <span v-if="scope.row.department">{{scope.row.department}}</span>
                        <span v-if="!scope.row.department">暂无</span>
                      </template>
                    </el-table-column>
                  </el-table>
                </template>
              </el-table-column>
              <el-table-column
                label="创建时间">
                <template slot-scope="scope">
                  <span v-if="scope.row.create_time">{{scope.row.create_time}}</span>
                  <span v-if="!scope.row.create_time">暂无</span>
                </template>
              </el-table-column>
              <el-table-column
                label="回访人">
                <template slot-scope="scope">
                  <span v-if="scope.row.operator">{{scope.row.operator}}</span>
                  <span v-if="!scope.row.operator">暂无</span>
                </template>
              </el-table-column>
              <el-table-column
                label="合同编号">
                <template slot-scope="scope">
                  <span v-if="scope.row.contract_number">{{scope.row.contract_number}}</span>
                  <span v-if="!scope.row.contract_number">暂无</span>
                </template>
              </el-table-column>
              <el-table-column
                label="房屋地址">
                <template slot-scope="scope">
                  <span v-if="scope.row.address">{{scope.row.address}}</span>
                  <span v-if="!scope.row.address">暂无</span>
                </template>
              </el-table-column>
              <el-table-column
                label="合同类型">
                <template slot-scope="scope">
                  <span v-if="scope.row.contract_type">{{scope.row.contract_type}}</span>
                  <span v-if="!scope.row.contract_type">暂无</span>
                </template>
              </el-table-column>
              <el-table-column
                label="合同周期">
                <template slot-scope="scope">
                  <span v-if="scope.row.contract_cycle">{{scope.row.contract_cycle}}</span>
                  <span v-if="!scope.row.contract_cycle">暂无</span>
                </template>
              </el-table-column>
              <el-table-column
                label="信息来源">
                <template slot-scope="scope">
                  <span v-if="scope.row.originate">{{scope.row.originate}}</span>
                  <span v-if="!scope.row.originate">暂无</span>
                </template>
              </el-table-column>
              <el-table-column
                label="保修期">
                <template slot-scope="scope">
                  <span v-if="scope.row.guarantee">{{scope.row.guarantee}}</span>
                  <span v-if="!scope.row.guarantee">暂无</span>
                </template>
              </el-table-column>
              <el-table-column
                label="开单人">
                <template slot-scope="scope">
                  <span v-if="scope.row.drawer">{{scope.row.drawer}}</span>
                  <span v-if="!scope.row.drawer">暂无</span>
                </template>
              </el-table-column>
              <el-table-column
                label="部门">
                <template slot-scope="scope">
                  <span v-if="scope.row.department">{{scope.row.department}}</span>
                  <span v-if="!scope.row.department">暂无</span>
                </template>
              </el-table-column>
            </el-table>
          </el-tab-pane>
          <el-tab-pane label="租房回访记录" name="second">
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
              <el-table-column type="expand" v-if="form.tag==2">
                <template slot-scope="props" >
                  <el-table :data="props.row.son" :show-header="false" @row-dblclick="dblClickTable" style="width: 101%;max-width: 101%;">
                    <el-table-column width="30"></el-table-column>
                    <el-table-column>
                      <template slot-scope="scope">
                        <span v-if="scope.row.create_time">{{scope.row.create_time}}</span>
                        <span v-if="!scope.row.create_time">暂无</span>
                      </template>
                    </el-table-column>
                    <el-table-column
                      label="回访人">
                      <template slot-scope="scope">
                        <span v-if="scope.row.operator">{{scope.row.operator}}</span>
                        <span v-if="!scope.row.operator">暂无</span>
                      </template>
                    </el-table-column>
                    <el-table-column
                      label="合同编号">
                      <template slot-scope="scope">
                        <span v-if="scope.row.contract_number">{{scope.row.contract_number}}</span>
                        <span v-if="!scope.row.contract_number">暂无</span>
                      </template>
                    </el-table-column>
                    <el-table-column
                      label="房屋地址">
                      <template slot-scope="scope">
                        <span v-if="scope.row.address">{{scope.row.address}}</span>
                        <span v-if="!scope.row.address">暂无</span>
                      </template>
                    </el-table-column>
                    <el-table-column
                      label="合同类型">
                      <template slot-scope="scope">
                        <span v-if="scope.row.contract_type">{{scope.row.contract_type}}</span>
                        <span v-if="!scope.row.contract_type">暂无</span>
                      </template>
                    </el-table-column>
                    <el-table-column
                      label="合同周期">
                      <template slot-scope="scope">
                        <span v-if="scope.row.contract_cycle">{{scope.row.contract_cycle}}</span>
                        <span v-if="!scope.row.contract_cycle">暂无</span>
                      </template>
                    </el-table-column>
                    <el-table-column
                      label="信息来源">
                      <template slot-scope="scope">
                        <span v-if="scope.row.originate">{{scope.row.originate}}</span>
                        <span v-if="!scope.row.originate">暂无</span>
                      </template>
                    </el-table-column>
                    <el-table-column
                      label="保修期">
                      <template slot-scope="scope">
                        <span v-if="scope.row.guarantee">{{scope.row.guarantee}}</span>
                        <span v-if="!scope.row.guarantee">暂无</span>
                      </template>
                    </el-table-column>
                    <el-table-column
                      label="开单人">
                      <template slot-scope="scope">
                        <span v-if="scope.row.drawer">{{scope.row.drawer}}</span>
                        <span v-if="!scope.row.drawer">暂无</span>
                      </template>
                    </el-table-column>
                    <el-table-column
                      label="部门">
                      <template slot-scope="scope">
                        <span v-if="scope.row.department">{{scope.row.department}}</span>
                        <span v-if="!scope.row.department">暂无</span>
                      </template>
                    </el-table-column>
                  </el-table>
                </template>
              </el-table-column>
              <el-table-column
                label="创建时间">
                <template slot-scope="scope">
                  <span v-if="scope.row.create_time">{{scope.row.create_time}}</span>
                  <span v-if="!scope.row.create_time">暂无</span>
                </template>
              </el-table-column>
              <el-table-column
                label="回访人">
                <template slot-scope="scope">
                  <span v-if="scope.row.operator">{{scope.row.operator}}</span>
                  <span v-if="!scope.row.operator">暂无</span>
                </template>
              </el-table-column>
              <el-table-column
                label="合同编号">
                <template slot-scope="scope">
                  <span v-if="scope.row.contract_number">{{scope.row.contract_number}}</span>
                  <span v-if="!scope.row.contract_number">暂无</span>
                </template>
              </el-table-column>
              <el-table-column
                label="房屋地址">
                <template slot-scope="scope">
                  <span v-if="scope.row.address">{{scope.row.address}}</span>
                  <span v-if="!scope.row.address">暂无</span>
                </template>
              </el-table-column>
              <el-table-column
                label="合同类型">
                <template slot-scope="scope">
                  <span v-if="scope.row.contract_type">{{scope.row.contract_type}}</span>
                  <span v-if="!scope.row.contract_type">暂无</span>
                </template>
              </el-table-column>
              <el-table-column
                label="合同周期">
                <template slot-scope="scope">
                  <span v-if="scope.row.contract_cycle">{{scope.row.contract_cycle}}</span>
                  <span v-if="!scope.row.contract_cycle">暂无</span>
                </template>
              </el-table-column>
              <el-table-column
                label="信息来源">
                <template slot-scope="scope">
                  <span v-if="scope.row.originate">{{scope.row.originate}}</span>
                  <span v-if="!scope.row.originate">暂无</span>
                </template>
              </el-table-column>
              <el-table-column
                prop="repair_result"
                label="保修期">
                <template slot-scope="scope">
                  <span v-if="scope.row.guarantee">{{scope.row.guarantee}}</span>
                  <span v-if="!scope.row.guarantee">暂无</span>
                </template>
              </el-table-column>
              <el-table-column
                label="开单人">
                <template slot-scope="scope">
                  <span v-if="scope.row.drawer">{{scope.row.drawer}}</span>
                  <span v-if="!scope.row.drawer">暂无</span>
                </template>
              </el-table-column>
              <el-table-column
                label="部门">
                <template slot-scope="scope">
                  <span v-if="scope.row.department">{{scope.row.department}}</span>
                  <span v-if="!scope.row.department">暂无</span>
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
    <RightMenu :startX="rightMenuX+'px'" :startY="rightMenuY+'px'" :list="lists" :show="show"
               @clickOperateMore="clickEvent"></RightMenu>
    <ReturnVisitDetail :repairDetailDialog="repairDetailDialog" :ToActiveName="activeName" :repairId="repairId"
                       :photopic="photopic"
                       @close="closeModal"></ReturnVisitDetail>
    <organization :organizationDialog="organizeVisible" :type="organizeType" @close="closeModal"
                  @selectMember="selectMember"></organization>
  </div>
</template>

<script>
  import RightMenu from "../../../common/rightMenu.vue";
  import ReturnVisitDetail from "./ReturnVisitDetail.vue";
  import Organization from "../../../common/organization.vue";

  export default {
    name: "return-visit",
    components: {RightMenu, ReturnVisitDetail, Organization},
    data() {
      return {
        rightMenuX: 0,
        rightMenuY: 0,
        show: false,
        lists: [],
        form: {
          page: 1,
          limit: 12,
          module: 1,
          audit: "",
          originate: "",
          operator_id: "",
          create_time: "",
          keywords: "",
          tag: 1,
        },
        collectTableData: [],
        rentTableData: [],
        totalNum: 0,
        isHigh: false,
        collectStatus: " ",
        collectLoading: false,
        rentStatus: " ",
        rentLoading: false,
        activeName: "first",
        ToActiveName: "",
        collectRepairId: "",
        rentRepairId: "",
        repairDetailDialog: false,
        repairId: "",
        deleteId: "",
        cityCategory: [],
        organizeVisible: false,
        organizeType: "",
        operator_name: "",
        passStatus: [],
        photopic: [],
        tableData: [{id: '111', name: 'fdsffdgdf'}]
      };
    },
    mounted() {
      this.getCollectTableData();
      this.getDictionary();
    },

    methods: {
      showList(val) {
        if (val === 'list') {
          this.form.tag = 1;
          this.search();
        } else {
          this.form.tag = 2;
          this.search();
        }
      },
      getDictionary() {
        this.dictionary(636).then(res => {
          //审核状态
          this.passStatus = res.data;
        });
        this.dictionary(622).then(res => {
          //回访来源
          this.cityCategory = res.data;
        });
      },
      getCollectTableData() {
        this.collectStatus = " ";
        this.collectLoading = true;
        if (!this.form.time) {
          this.form.time = [];
        }
        this.$http
          .get(globalConfig.server + "contract/feedback", {params: this.form})
          .then(res => {
            this.isHigh = false;
            this.collectLoading = false;
            if (res.data.code === "1212200") {
              this.collectTableData = res.data.data.data;
              this.totalNum = res.data.data.count;
            } else if (res.data.code === "1212202") {
              this.collectTableData = [];
              this.totalNum = 0;
              this.collectStatus = "暂无数据";
              this.$notify.warning({
                title: '警告',
                message: res.data.msg
              });
            } else {
              this.collectTableData = [];
              this.totalNum = 0;
              this.collectStatus = "暂无数据";
            }
          });
      },
      getRentTableData() {
        this.rentStatus = " ";
        this.rentLoading = true;
        if (!this.form.time) {
          this.form.time = [];
        }
        this.$http
          .get(globalConfig.server + "contract/feedback", {params: this.form})
          .then(res => {
            console.log(res);
            this.isHigh = false;
            this.rentLoading = false;
            if (res.data.code === "1212200") {
              this.rentTableData = res.data.data.data;
              this.totalNum = res.data.data.count;
            } else if (res.data.code === "1212202") {
              this.rentTableData = [];
              this.totalNum = 0;
              this.rentStatus = "暂无数据";
              this.$notify.warning({
                title: '警告',
                message: res.data.msg
              });
            } else {
              this.rentTableData = [];
              this.totalNum = 0;
              this.rentStatus = "暂无数据";
            }
          });
      },
      // 员工筛选
      chooseStaff() {
        this.organizeVisible = true;
        this.organizeType = "staff";
      },
      // 清空员工
      closeStaff() {
        this.form.operator_id = [];
        this.operator_name = "";
      },
      selectMember(val) {
        if (this.organizeType === "staff") {
          this.form.operator_id = val[0].id;
          this.operator_name = val[0].name;
        }
      },
      closeModal(val) {
        this.repairId = "";
        this.repairDetailDialog = false;
        this.collectRepairId = "";
        this.rentRepairId = "";
        this.organizeVisible = false;
        if (this.activeName == "first") {
          this.form.module = 1;
        } else if (this.activeName == "second") {
          this.form.module = 2;
        }

      },
      // tabs标签页
      handleClick(tab, event) {
        if (this.activeName == "first") {
          this.form.module = 1;
          this.getCollectTableData();
        } else if (this.activeName == "second") {
          this.form.module = 2;
          this.getRentTableData();
        }
      },
      search() {
        this.form.page = 1;
        if (this.activeName === "first") {
          this.form.module = 1;
          this.getCollectTableData();
        } else {
          this.form.module = 2;
          this.getRentTableData();
        }

      },
      // 高级
      highGrade() {
        this.isHigh = !this.isHigh;
      },
      // 重置
      resetting() {
        this.form = {
          page: 1,
          limit: 12,
          module: 1,
          audit: "",
          originate: "",
          operator_id: "",
          create_time: "",
          keywords: ""
        };
        this.closeStaff();
      },
      handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
      },
      handleCurrentChange(val) {
        this.form.page = val;
        console.log(`当前页: ${val}`);
        if (this.activeName === "first") {
          this.form.module = 1;
          this.getCollectTableData();
        } else {
          this.form.module = 2;
          this.getRentTableData();
        }
      },
      expandChange(row) {

      },
      dblClickTable(row, event) {
        this.repairId = row.id;
        this.photopic = row.album;
        this.repairDetailDialog = true;
      },
      //右键
      houseMenu(row, event) {
        this.deleteId = row.id;
        this.lists = [
          // {
          //   clickIndex: "delete_repair",
          //   headIcon: "el-icon-delete",
          //   label: "删除"
          // }
        ];
        //this.contextMenuParam(event);
      },
      //右键回调
      clickEvent(val) {
        switch (val.clickIndex) {
          case "delete_repair":
            this.deleteRepair();
            break;
        }
      },
      deleteRepair() {
        this.$confirm("此操作将删除维修单，您确定删除吗？", "删除维修单", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }).then(() => {
          this.$http
            .get(globalConfig.server + "repaire/del/" + this.deleteId)
            .then(res => {
              if (res.data.code === "600200") {
                if (this.activeName == "first") {
                  this.form.module = 1;
                } else if (this.activeName == "second") {
                  this.form.module = 2;
                }
                this.getCollectTableData();
                this.$notify.success({
                  title: "成功",
                  message: res.data.msg
                });
              } else {
                this.$notify.warning({
                  title: "警告",
                  message: res.data.msg
                });
              }
            });
        });
      },
      //关闭右键菜单
      closeMenu() {
        this.show = false;
      },
      //右键参数
      contextMenuParam(event) {
        //param: user right param
        let e = event || window.event; //support firefox contextmenu
        this.show = false;
        this.rightMenuX =
          e.clientX +
          document.documentElement.scrollLeft -
          document.documentElement.clientLeft;
        this.rightMenuY =
          e.clientY +
          document.documentElement.scrollTop -
          document.documentElement.clientTop;
        event.preventDefault();
        event.stopPropagation();
        this.$nextTick(() => {
          this.show = true;
        });
      },
      exportData() {
        if (this.activeName === "first") {
          this.form.module = 1;
        } else {
          this.form.module = 2;
        }
        let exportForm = {
          keywords: this.form.keywords,
          create_time: this.form.create_time,
          operator_id: this.form.operator_id,
          originate: this.form.originate,
          audit: this.form.audit,
          module: this.form.module
        };
        this.$http
          .get(globalConfig.server + "contract/feedback/can_export", {params: exportForm})
          .then(res => {
            if (res.data.code == "600201") {
              this.$notify.warning({
                title: "警告",
                message: res.data.msg
              });
              return;
            } else {
              this.$http
                .get(globalConfig.server + "contract/feedback/export", {
                  responseType: "arraybuffer",
                  params: exportForm
                })
                .then(res => {
                  // 处理返回的文件流
                  if (!res.data) {
                    return;
                  }
                  let url = window.URL.createObjectURL(new Blob([res.data]));
                  let link = document.createElement("a");
                  link.style.display = "a";
                  link.href = url;
                  link.setAttribute("download", "excel.xls");
                  document.body.appendChild(link);
                  link.click();
                });
            }
          });
      },

    }
  };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
  #clientContainer {
  }
</style>
