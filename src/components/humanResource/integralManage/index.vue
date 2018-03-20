<template>
  <div @click="show=false" @contextmenu="closeMenu">
    <div id="clientContainer">


      <el-tabs v-model="activeName" @tab-click="">
        <div class="highRanking">
          <!--<div>-->
          <!--<el-button size="mini">-->
          <!--<router-link to="/contractChange">TEST_1</router-link>-->
          <!--</el-button>-->
          <!--<el-button size="mini">-->
          <!--<router-link to="/deliver">TEST_2</router-link>-->
          <!--</el-button>-->
          <!--<el-button size="mini">-->
          <!--<router-link to="/throwALease">TEST_3</router-link>-->
          <!--</el-button>-->
          <!--</div>-->
          <div class="highSearch">
            <el-form :inline="true" oncommit="return false" size="mini">
              <el-form-item>
                <el-input placeholder="请输入内容" @clear="search" clearable v-model="form.item_name" @keyup.enter.native="search" size="mini">
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
            <el-form :inline="true" size="mini" label-width="100px">
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
              <div class="btnOperate">
                <el-button size="mini" type="primary">搜索</el-button>
                <el-button size="mini" type="primary" @click="resetting">重置</el-button>
                <el-button size="mini" type="primary" @click="highGrade">取消</el-button>
              </div>
            </el-form>
          </div>

        </div>
        <el-tab-pane label="明细" name="first">
          <div class="main">
            <div class="myHouse">
              <div class="myTable">
                <el-table
                  :data="tableData"
                  @row-click="clickTable"
                  @row-dblclick="dblClickTable('integralDetl')"
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
                    prop="remark"
                    label="备注">
                    <template slot-scope="scope">
                      <div v-for="(key,index) in scope.row.last_remark">
                        {{key.content}}
                      </div>
                    </template>
                  </el-table-column>
                </el-table>
              </div>
              <div class="tableBottom">

                <div class="left">
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
            </div>
          </div>
        </el-tab-pane>
        <el-tab-pane label="汇总" name="second">
          <div>
            <el-table
              :data="tableData2"
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
            <div class="block pages">
              <el-pagination
                @size-change="handleSizeChanges"
                @current-change="handleCurrentChanges"
                :current-page="currentPages"
                :page-size="gatherList.limit"
                layout="total, prev, pager, next, jumper"
                :total="paging">
              </el-pagination>
            </div>
          </div>
        </el-tab-pane>
      </el-tabs>
    </div>
    <RightMenu :startX="rightMenuX+'px'" :startY="rightMenuY+'px'" :list="lists" :show="show"
               @clickOperate="clickEvent"></RightMenu>

    <Organization :organizationDialog="organizationDialog" :length="length" :type="type" @close="closeOrganization"
                  @selectMember="selectMember"></Organization>

    <NewAdd :newAddDialog="newAddDialog" :newAdd="newAdd" :formDetail="formDetail" @close="closeAdd"></NewAdd>

    <IntegralDetail :module="integralDetail" @close="integralDetail = false"></IntegralDetail>
    <ReviseIntegral :module="reviseIntegral" @close="reviseIntegral = false"></ReviseIntegral>
  </div>
</template>

<script>
  import RightMenu from '../../common/rightMenu.vue'
  import Organization from '../../common/organization.vue'
  import NewAdd from './components/newAdd.vue'
  import IntegralDetail from './components/integralDetl.vue'
  import ReviseIntegral from './components/reviseIntegral.vue'

  export default {
    name: 'hello',
    components: {RightMenu, Organization, NewAdd, IntegralDetail, ReviseIntegral},
    data() {
      return {
        activeName: 'first',
        rightMenuX: 0,
        rightMenuY: 0,
        show: false,
        lists: [],
        newAdd: '',
        /***********/
        selectFlag: 1,
        statisticDate: '',
        paging: 0,
        currentPages: 1,

        form: {
          page: 1,
          limit: 10,
          item_name: '',
          staff_id: '',
          credit_from: '',
          credit_to: '',
          department_id: '',
        },
        gatherList: {
          page: 1,
          limit:1,
          staff_id:'',
          credit_from: '',
          credit_to: '',
          department_id: '',
        },
        staff_name: '',
        department_name: '',
        length: '',
        type: '',

        activeId: '',
        formDetail: {},

        totalNumber: 0,
        tableData: [],            //明细列表
        remark: [],
        tableData2: [],           //汇总列表

        //模态框
        organizationDialog: false,
        tabs: ['系统公告', '审批提醒', 'boss小秘书', '个人发信箱', '部门发信箱', '短信提醒'],
        isActive: 0,
        isCheckbox: false,
        isHigh: false,
        newAddDialog: false,
        integralDetail: false,
        reviseIntegral: false,
      }
    },
    mounted() {
      this.getTableData();
      this.getGatherList();
    },
    methods: {
      getTableData() {
        this.$http.get(globalConfig.server + 'credit/manage', {params: this.form}).then((res) => {
          // console.log(res.data.data);
          if (res.data.code === '30310') {
            this.totalNumber = res.data.num;
            this.tableData = res.data.data;
            // this.remark = res.data.data.last_remark;
            // res.data.data.last_remark[0].content = this.remark;
          } else {
            this.$notify.warning({
              title: '警告',
              message: res.data.msg
            })
          }
        })
      },
      // 获取汇总列表
      getGatherList () {
        this.$http.get(globalConfig.server + 'credit/manage/summary',{params: this.gatherList}).then((res) => {
          // console.log(res);
          if (res.data.code === "30310") {
            this.paging = res.data.num;
            this.tableData2 = res.data.data;

          }else{
            this.tableData2 = [];
            this.paging = 0;
          }
        })
      },

      search() {
        this.form.page = 1;
        this.getTableData();
        this.$http.get(globalConfig.server + 'credit/manage',{params: this.form}).then((res) => {
          console.log(res);

          if(res.data.code === '30310') {
            this.tableData = res.data.data;
          }
          if(this.form.item_name === ''){
            this.getTableData();
          }
        })
      },
      onSubmit(val) {
        this.isActive = val;
      },
      handleSizeChange(val) {
        this.form.limit = val;
        this.getTableData();
      },
      handleCurrentChange(val) {
        this.form.page = val;
        this.getTableData();
      },
// 汇总列表分页
      handleSizeChanges(val) {
        console.log(val);
      },
      handleCurrentChanges(val) {
        this.getGatherList(val);
      },


      clickTable(row, event, column) {
        // console.log(row, event, column)
      },
      //右键
      rightMenu(row, event) {
        this.activeId = row.id;
        this.lists = [
//          {clickIndex: 'read', headIcon: 'el-icons-fa-envelope-o', label: '标记为已读',},
//          {clickIndex: 'all', headIcon: 'el-icons-fa-envelope', label: '批量标记',},
//          {clickIndex: 'cancel', headIcon: 'el-icons-fa-envelope', label: '取消批量标记',},
          {clickIndex: 'edit', headIcon: 'el-icon-edit', label: '修改',},
          {clickIndex: 'delete', headIcon: 'el-icon-delete', label: '删除',},
        ];
        this.contextMenuParam(event);
      },

      // 新增
      newList () {
        this.newAdd = '新增';
        this.newAddDialog = true;
      },
      // 修改
      revise() {
        this.newAddDialog = true;
        this.newAdd = '修改';
        this.$http.get(globalConfig.server + 'credit/manage/'+ this.activeId).then((res) => {
          this.formDetail = res.data.data;
        })
      },

      //右键回调时间
      clickEvent(index) {
        if (index === 'delete') {
          this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            this.deleteIntegral();
          }).catch(() => {
            this.$message({
              type: 'info',
              message: '已取消删除'
            });
          });
        } else if (index === 'edit') {
              this.revise();
        }
      },

      //deleteIntegral
      deleteIntegral() {
        this.$http.put(globalConfig.server + 'credit/manage/delete/' + this.activeId).then((res) => {
          if (res.data.code === '30310') {
            this.totalNumber = res.data.num;
            this.tableData = res.data.data;
          } else {
            this.$notify.warning({
              title: '警告',
              message: res.data.msg
            })
          }
        })
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
      selectDep(val) {
        this.organizationDialog = true;
        this.length = 1;
        this.type = val;
      },
      closeOrganization() {
        this.organizationDialog = false;
      },
      selectMember(val) {
        if (val[0].hasOwnProperty('avatar')) {
          this.staff_name = val[0].name;
          this.staff_id = val[0].id;
        } else {
          this.department_name = val[0].name;
          this.department_id = val[0].id;
        }
      },
      highGrade() {
        this.isHigh = !this.isHigh;
      },
      resetting() {

      },
      closeAdd() {
        this.getTableData();
        this.newAddDialog = false
      },
      dblClickTable(type) {
        switch (type) {
          case 'integralDetl':
            this.integralDetail = true;
            break;
        }
      },
    }
  }
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
