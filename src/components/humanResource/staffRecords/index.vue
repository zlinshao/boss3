<template>
  <div @click="show=false" @contextmenu="closeMenu">
    <div class="highRanking">
      <div class="highSearch">
        <el-form :inline="true" size="mini">
          <el-form-item>
            <el-input placeholder="请输入姓名" v-model="params.search" size="mini" clearable @keyup.enter.native="search">
              <el-button slot="append" icon="el-icon-search" @click="search"></el-button>
            </el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" size="mini" @click="highGrade">高级</el-button>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" size="mini" @click="addStaffRecordDialog=true;">
              <i class="el-icon-plus"></i>
              新增记录
            </el-button>
          </el-form-item>
        </el-form>
      </div>
      <div class="filter high_grade" :class="isHigh? 'highHide':''">
        <el-form :inline="true" :model="params" size="mini" label-width="100px">
          <div class="filterTitle">
            <i class="el-icons-fa-bars"></i>&nbsp;&nbsp;高级搜索
          </div>
          <el-row class="el_row_border">
            <el-col :span="12">
              <el-row>
                <el-col :span="8">
                  <div class="el_col_label">入职时间</div>
                </el-col>
                <el-col :span="16" class="el_col_option">
                  <el-form-item>
                    <el-date-picker
                      v-model="params.entry_time"
                      type="daterange"
                      align="right"
                      unlink-panels
                      range-separator="至"
                      start-placeholder="开始日期"
                      end-placeholder="结束日期"
                      value-format="yyyy-MM-dd"
                      :picker-options="pickerOptions">
                    </el-date-picker>
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
                    <el-input readonly v-model="params.org_name" @focus="organizationDialog=true;organizeType='depart'"
                              placeholder="点击选择">
                      <template slot="append">
                        <div style="cursor: pointer;" @click="params.org_name='';
                        params.org_id=''">清空
                        </div>
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
      <div class="blueTable">
        <el-table
          :data="tableData"
          :empty-text='tableStatus'
          v-loading="tableLoading"
          element-loading-text="拼命加载中"
          element-loading-spinner="el-icon-loading"
          element-loading-background="rgba(255, 255, 255, 0)"
          @cell-dblclick='dblClick'
          @sort-change="sortChange"
          style="width: 100%"> <!--@row-contextmenu='openContextMenu'-->
          <el-table-column
            prop="name"
            label="姓名">
          </el-table-column>
          <el-table-column
            prop="station"
            label="岗位">
          </el-table-column>
          <el-table-column
            prop="department"
            label="部门">
          </el-table-column>
          <el-table-column
            prop="start_time"
            label="入职时间">
          </el-table-column>
          <el-table-column
            prop="praises"
            label="表扬数"
            sortable>
          </el-table-column>
          <el-table-column
            prop="criticisms"
            label="批评数"
            sortable>
          </el-table-column>
          <el-table-column
            prop="doubts"
            label="疑惑数"
            sortable>
          </el-table-column>
          <el-table-column
            prop="others"
            label="其他"
            sortable>
          </el-table-column>
        </el-table>
      </div>
      <div class="block pages">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="params.page"
          :page-size="params.limit"
          layout="total, prev, pager, next, jumper"
          :total="totalNum">
        </el-pagination>
      </div>
    </div>

    <RightMenu :startX="rightMenuX+'px'" :startY="rightMenuY+'px'" :list="lists" :show="show"
               @clickOperateMore="clickEvent"></RightMenu>
    <Organization :organizationDialog="organizationDialog" :type="organizeType" @selectMember="selectMember"
                  @close="closeOrganization"></Organization>
    <AddStaffRecord :addStaffDialog="addStaffRecordDialog" @close="closeModal"></AddStaffRecord>
    <StaffRecordsDetail :staffRecordsDetailDialog="staffRecordsDetailDialog" :detailId="detailId"
                        @close="closeModal"></StaffRecordsDetail>
  </div>
</template>

<script>
  import RightMenu from '../../common/rightMenu.vue';    //右键
  import Organization from '../../common/organization.vue';  //组织架构
  import AddStaffRecord from './components/addStaffRecord.vue';  //添加记录
  import StaffRecordsDetail from './components/staffRecordsDetail.vue';  //员工档案详情
  export default {
    name: 'staff-records',
    components: {RightMenu, Organization, AddStaffRecord, StaffRecordsDetail},
    data() {
      return {
        urls: globalConfig.server,
        rightMenuX: 0,
        rightMenuY: 0,
        show: false,
        isHigh: false,
        lists: [],
        /***********/
        params: {
          page: 1,
          limit: 12,
          search: '',   //模糊搜索
          org_id: '',  //部门
          org_name: '',
          entry_time: [], //入职时间
          order: {"p": '', "c": '', "d": '', "o": ''},
        },
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

        totalNum: 0,
        tableData: [],
        tableStatus: ' ',
        tableLoading: false,
        staffDetailDialog: false,

        currentId: '',
        organizationDialog: false,
        organizeType: '',

        addStaffRecordDialog: false,   //新增记录弹框
        staffRecordsDetailDialog: false,
        detailId: '',
      }
    },
    mounted() {
      this.getStaffTableData();
    },
    watch: {},
    methods: {
      sortChange(val) {
        let prop = val.prop;
        let order = val.order;
        if (prop === 'praises') {
          if (order === 'ascending') {
            this.params.order.p = 1;
          } else if (order === 'descending') {
            this.params.order.p = 2;
          }
          this.params.order.c = '';
          this.params.order.d = '';
          this.params.order.o = '';
        } else if (prop === 'criticisms') {
          if (order === 'ascending') {
            this.params.order.c = 1;
          } else if (order === 'descending') {
            this.params.order.c = 2;
          }
          this.params.order.p = '';
          this.params.order.d = '';
          this.params.order.o = '';
        } else if (prop === 'doubts') {
          if (order === 'ascending') {
            this.params.order.d = 1;
          } else if (order === 'descending') {
            this.params.order.d = 2;
          }
          this.params.order.c = '';
          this.params.order.p = '';
          this.params.order.o = '';
        } else if (prop === 'others') {
          if (order === 'ascending') {
            this.params.order.o = 1;
          } else if (order === 'descending') {
            this.params.order.o = 2;
          }
          this.params.order.c = '';
          this.params.order.d = '';
          this.params.order.p = '';
        } else {
          this.params.order.p = '';
          this.params.order.c = '';
          this.params.order.d = '';
          this.params.order.o = '';
        }
        this.search();
      },
      dblClick(row) {
        this.detailId = row.id;
        this.staffRecordsDetailDialog = true;
      },
      closeModal() {
        this.addStaffRecordDialog = false;
        this.staffRecordsDetailDialog = false;
        this.detailId = '';
        this.search();
      },
      selectMember(val) {
        this.params.org_id = val[0].id;
        this.params.org_name = val[0].name;
        this.organizeType = '';
      },
      search() {
        this.params.page = 1;
        this.getStaffTableData();
      },
      getStaffTableData() {
        this.tableLoading = true;
        this.tableStatus = ' ';
        this.params.order.toString();
        this.$http.get(this.urls + 'credit/manage/employeelist', {params: this.params}).then((res) => {
          this.isHigh = false;
          this.tableLoading = false;
          if (res.data.code === '10000') {
            this.tableData = res.data.data.data;
            this.totalNum = res.data.data.count;
            if (res.data.data.data.length < 1) {
              this.tableStatus = '暂无数据';
              this.tableData = [];
              this.totalNum = 0;
            }
          } else {
            this.tableStatus = '暂无数据';
            this.tableData = [];
            this.totalNum = 0;
          }
        });
      },
      // 高级
      highGrade() {
        this.isHigh = !this.isHigh;
      },
      // 重置
      resetting() {
        this.params.search = '';
        this.params.org_id = '';
        this.params.org_name = '';
        this.params.entry_time = [];
        this.search();
      },
      handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
      },
      handleCurrentChange(val) {
        console.log(`当前页: ${val}`);
        this.params.page = val;
        this.getStaffTableData();
      },

      // 右键
      openContextMenu(row, event) {
        this.currentId = row.id;
        this.contextMenuParam(event);
      },
      // 右键回调
      clickEvent(val) {

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
      // 组织架构
      openOrganizationModal() {
        this.organizationDialog = true
      },
      closeOrganization() {
        this.organizationDialog = false;
      },
    },
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
  .el-table th {
    text-align: left !important;
  }

  .el-table__body td {
    text-align: left !important;
  }

  .btnStatus {
    cursor: inherit;
    min-width: 68px;
  }
</style>
