<template>
  <div @click="show=false" @contextmenu="closeMenu">
    <div id="clientContainer">
      <div class="highRanking">
        <div class="tabsSearch">
          <el-form :inline="true" onsubmit="return false" :model="form" size="mini">
            <el-form-item>
              <el-input placeholder="请输入项目名称" @clear="search" clearable v-model="form.item_name"
                        @keyup.enter.native="search" size="mini">
                <el-button slot="append" icon="el-icon-search" @click="search"></el-button>
              </el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" size="mini" @click="highGrade">高级</el-button>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" size="mini" @click="newList">新增积分项</el-button>
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
                    <div class="el_col_label">员工</div>
                  </el-col>
                  <el-col :span="16" class="el_col_option">
                    <el-form-item>
                      <el-input v-model="staff_name" @focus="selectDep('staff')" placeholder="请选择部门/员工" readonly>
                      </el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
              </el-col>
              <el-col :span="12">
                <el-row>
                  <el-col :span="8">
                    <div class="el_col_label">部门</div>
                  </el-col>
                  <el-col :span="16" class="el_col_option">
                    <el-form-item>
                      <el-input v-model="department_name" @focus="selectDep('depart')" placeholder="请选择部门/员工"
                                readonly>
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
                    <div class="el_col_label">积分范围</div>
                  </el-col>
                  <el-col :span="16" class="el_col_option">
                    <el-form-item>

                      <el-col style="padding:0 " :span="11" class="el_col_option">
                      <el-input  v-model="form.credit_from" placeholder="请输入最小积分">
                      </el-input>
                      </el-col>
                      <el-col style="padding:0; margin-left:30px;"  :span="11" class="el_col_option">
                      <el-input  v-model="form.credit_to" placeholder="请输入最大积分">
                      </el-input>
                      </el-col>

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
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="明细" name="first">
          <el-table
            :data="tableData"
            :empty-text = 'rentStatus'
            v-loading="rentLoading"
            element-loading-text="拼命加载中"
            element-loading-spinner="el-icon-loading"
            element-loading-background="rgba(255, 255, 255, 0)"
            @row-dblclick="dblClickTable"
            @row-contextmenu='rightMenu'
            style="width: 100%">
            <el-table-column
              prop="date"
              label="时间">
            </el-table-column>
            <el-table-column
              prop="sname"
              label="姓名">
            </el-table-column>
            <el-table-column
              prop="dname"
              label="部门">
            </el-table-column>
            <el-table-column
              prop="name"
              label="项目名称">
            </el-table-column>
            <el-table-column
              prop="amount_str"
              label="对应分值">
            </el-table-column>
            <!--<el-table-column-->
              <!--prop="remark"-->
              <!--label="备注">-->
              <!--<template slot-scope="scope">-->
                <!--<div v-for="(key,index) in scope.row.last_remark">-->
                  <!--{{key.content}}-->
                <!--</div>-->
              <!--</template>-->
            <!--</el-table-column>-->
          </el-table>
        </el-tab-pane>

        <el-tab-pane label="汇总" name="second">
          <el-table
            :data="tableData2"
            :empty-text = 'rentStatus'
            v-loading="rentLoading"
            element-loading-text="拼命加载中"
            element-loading-spinner="el-icon-loading"
            element-loading-background="rgba(255, 255, 255, 0)"
            style="width: 100%">
            <el-table-column
              prop="date"
              label="时间">
            </el-table-column>
            <el-table-column
              prop="sname"
              label="姓名">
            </el-table-column>
            <el-table-column
              prop="dname"
              label="部门">
            </el-table-column>
            <el-table-column
              prop="amount"
              label="积分总额">
            </el-table-column>
            <!--<el-table-column-->
              <!--prop="address"-->
              <!--label="备注">-->
            <!--</el-table-column>-->
          </el-table>
        </el-tab-pane>
      </el-tabs>
      <div class="pages block">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="form.page"
          :page-size="form.limit"
          layout="total, prev, pager, next, jumper"
          :total="totalNumber">
        </el-pagination>
      </div>
    </div>

    <RightMenu :startX="rightMenuX+'px'" :startY="rightMenuY+'px'" :list="lists" :show="show"
               @clickOperate="clickEvent"></RightMenu>

    <Organization :organizationDialog="organizeDialog" :length="length" :type="type"
                  @selectMember="selectMember" @close="closeOrganization"></Organization>

    <!--积分详情-->
    <IntegralDetail :module="integralDetail" :rowid="rowid" @close="integralDetail = false"></IntegralDetail>
    <NewAdd :newAddDialog="newAddDialog" :newAdd="newAdd" :formDetail="formDetail" @newAddBack="newAddBack" @close="newAddDialog = false"></NewAdd>
  </div>
</template>

<script>
import RightMenu from "../../common/rightMenu.vue";
import Organization from "../../common/organization.vue";
import IntegralDetail from "./components/integralDetl.vue";
import NewAdd from "./components/newAdd.vue";

export default {
  name: "hello",
  components: { RightMenu, Organization, NewAdd, IntegralDetail },
  data() {
    return {
      activeName: "first",
      rightMenuX: 0,
      rightMenuY: 0,
      show: false,
      lists: [],
      newAdd: "",
      /***********/
      selectFlag: 1,
      statisticDate: "",
      paging: 0,
      currentPages: 1,

      form: {
        page: 1,
        limit: 10,
        item_name: "",
        staff_id: "",
        credit_from: "",
        credit_to: "",
        department_id: ""
      },

      staff_name: "",
      department_name: "",
      length: "",
      type: "",

      activeId: "",
      formDetail: {},

      totalNumber: 0,
      tableData: [], //明细列表
      remark: [],
      tableData2: [], //汇总列表
      rowid: "",
      //模态框
      organizeDialog: false,

      isActive: 0,
      isHigh: false,
      integralDetail: false,
      newAddDialog: false,
      rentStatus: " ",
      rentLoading: false
    };
  },
  mounted() {
    this.getTableData();
  },
  watch: {},
  methods: {
    handleSizeChange(val) {
      this.form.page = val;
    },

    newAddBack(val) {
      if (val == "新增") {
        this.form.page = 1;
        this.getTableData();
      } else {
        this.getTableData();
      }
    },
    // tabs标签页
    handleClick(tab, event) {
      if (this.activeName == "first") {
        this.getTableData();
      } else if (this.activeName == "second") {
        this.getGatherList();
      }
    },
    getTableData() {
      this.rentStatus = " ";
      this.rentLoading = true;
      this.$http
        .get(globalConfig.server + "credit/manage", { params: this.form })
        .then(res => {
          this.rentLoading = false;
          if (res.data.code === "30310" && res.data.data.length>0) {
            this.totalNumber = res.data.num;
            this.tableData = res.data.data;
            // this.remark = res.data.data.last_remark;
            // res.data.data.last_remark[0].content = this.remark;
          } else {
              this.rentStatus = '暂无数据';
              this.totalNumber= 0;
          }
        });
    },
    // 获取汇总列表
    getGatherList() {
      this.rentStatus = " ";
      this.rentLoading = true;
      this.$http
        .get(globalConfig.server + "credit/manage/summary", {
          params: this.form
        })
        .then(res => {
          this.rentLoading = false;
          if (res.data.code === "30310" && res.data.data.length>0) {
            this.totalNumber = res.data.num;
            this.tableData2 = res.data.data;
          } else {
            this.tableData2 = [];
            this.totalNumber = 0;
            this.rentStatus = '暂无数据';
          }
        });
    },
    // 新增
    newList() {
      this.newAdd = "新增";
      this.newAddDialog = true;
    },
    // 修改
    revise() {
      this.newAddDialog = true;
      this.newAdd = "修改";
    },
    // 积分详情
    dblClickTable(row) {
      this.rowid = row.id;
      this.integralDetail = true;
    },
    handleCurrentChange(val) {
      this.form.page = val;
      this.search();
    },
    search() {
      if (this.activeName == "first") {
        this.getTableData();
      } else if (this.activeName == "second") {
        this.getGatherList();
      }
      this.isHigh = false;
    },

    //右键
    rightMenu(row, event) {
      this.activeId = row;
      this.formDetail = row;
      this.lists = [
        { clickIndex: "edit", headIcon: "el-icon-edit", label: "修改" },
        { clickIndex: "delete", headIcon: "el-icon-delete", label: "删除" }
      ];
      this.contextMenuParam(event);
    },

    //右键回调时间
    clickEvent(index) {
      if (index === "delete") {
        this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        })
          .then(() => {
            this.deleteIntegral();
          })
          .catch(() => {
            this.$message({
              type: "info",
              message: "已取消删除"
            });
          });
      } else if (index === "edit") {
        this.revise();
      }
    },

    //deleteIntegral
    deleteIntegral() {
      this.$http
        .put(globalConfig.server + "credit/manage/delete/" + this.activeId.id)
        .then(res => {
          if (res.data.code === "30320") {
            this.getTableData();
          } else {
            this.$notify.warning({
              title: "警告",
              message: res.data.msg
            });
          }
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
    // 人资搜索
    selectDep(val) {
      this.organizeDialog = true;
      this.length = 1;
      this.type = val;
    },
    closeOrganization() {
      this.organizeDialog = false;
    },
    // 确认部门
    selectMember(val) {
      this.organizeDialog = false;
      if (val[0].hasOwnProperty("avatar")) {
        this.staff_name = val[0].name;
        this.form.staff_id = val[0].id;
      } else {
        this.department_name = val[0].name;
        this.form.department_id = val[0].id;
      }
    },
    // 高级搜索
    highGrade() {
      this.isHigh = !this.isHigh;
    },
    resetting() {
      this.form = {
        page: 1,
        limit: 10,
        item_name: "",
        staff_id: "",
        credit_from: "",
        credit_to: "",
        department_id: ""
      };
      this.department_name = "";
      this.staff_name = "";
      this.isHigh = false;
      this.search(this.activeName);
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped="">
#clientContainer {
  .selectButton {
    color: #fff;
    background: #66b1ff;
  }
  .tool {
    border-bottom: 1px solid #eee;
  }
  .filter {
    padding-top: 10px;
  }
  .main {
    font-size: 12px;
    .myHouse {
      margin-bottom: 20px;
      .myTable {
        .el-table {
          th {
            background-color: #dfe6fb;
          }
        }
      }
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
  }
}
</style>
