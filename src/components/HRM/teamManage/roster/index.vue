<template>
  <div @click="show = false" @contextmenu="closeMenu">
    <div class="highRanking">
      <div class="highSearch">
        <el-form :model="params" :inline="true" size="mini">
          <el-form-item>
            <el-input placeholder="请输入员工姓名" v-model="params.user_name" size="mini" @keyup.enter.native="search" clearable>
              <el-button slot="append" icon="el-icon-search" @click="search"></el-button>
            </el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" size="mini" @click="highGrade">高级</el-button>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="newAddStaff"><i class="el-icon-plus"></i>&nbsp;新增员工
            </el-button>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="leadingOut">&nbsp;导出</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
    <div class="highRanking">
      <div class="filter high_grade" :class="isHigh? 'highHide':''" style=" margin-top: -40px;">
        <el-form :inline="true" onsubmit="return false" :model="params" size="mini" label-width="100px">
          <div class="filterTitle">
            <i class="el-icons-fa-bars"></i>&nbsp;&nbsp;高级搜索
          </div>
          <el-row class="el_row_border">
            <el-col :span="12">
              <el-row>
                <el-col :span="8">
                  <div class="el_col_label">支付方式</div>
                </el-col>
                <el-col :span="16" class="el_col_option">
                  <el-form-item label="部门">
                    <el-input placeholder="请选择" @focus="openOrgan('org_names', 'depart')" v-model="orgData.org_id"
                              size="mini">
                      <el-button slot="append" @click="emptyDepart('org_names')">清空</el-button>
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
    <div>
      <el-table
        :data="tableData"
        :empty-text='tableStatus'
        v-loading="tableLoading"
        element-loading-text="拼命加载中"
        element-loading-spinner="el-icon-loading"
        element-loading-background="rgba(255, 255, 255, 0)"
        @cell-dblclick='dblClickTable'
        @row-contextmenu='openContextMenu'
        style="width: 100%">
        <el-table-column
          prop="job_number"
          label="工号">
        </el-table-column>
        <el-table-column
          prop="real_name"
          label="姓名">
        </el-table-column>
        <el-table-column
          prop="archive_number"
          label="档案编号">
        </el-table-column>
        <el-table-column
          prop="organizationInfo"
          label="部门">
        </el-table-column>
        <el-table-column
          prop="positionInfo"
          label="职位">
        </el-table-column>
        <el-table-column
          prop="job_type"
          label="员工类型">
        </el-table-column>
        <el-table-column
          prop="job_status"
          label="员工状态">
        </el-table-column>
        <el-table-column
          prop="position_status"
          label="当前在职状态">
        </el-table-column>
        <el-table-column
          prop="phone"
          label="手机号码">
        </el-table-column>
        <el-table-column
          prop="enroll"
          label="入职时间">
        </el-table-column>
        <el-table-column
          prop="is_enable"
          label="账号管理">
          <template slot-scope="scope">
            <el-switch v-model="scope.row.is_enable === 1"
                       @change="showMessage(scope.row)"></el-switch>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="block pages">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="params.page"
        :page-sizes="[15, 20, 25, 30]"
        :page-size="params.limit"
        layout="total, sizes, prev, pager, next, jumper"
        :total="totalNum">
      </el-pagination>
    </div>
    <!--新增员工-->
    <AddStaff :module="staffVisible" :assist="assistShow" @close="closeStaff"></AddStaff>
    <!--右键-->
    <RightMenu :startX="rightMenuX+'px'" :startY="rightMenuY+'px'" :list="lists" :show="show"
               @clickOperate="clickEvent"></RightMenu>
  </div>
</template>

<script>
  import AddStaff from './components/addStaff.vue';//房东
  import RightMenu from '../../../common/rightMenu.vue';//右键
  export default {
    name: "index",
    components: {RightMenu, AddStaff},
    data() {
      return {
        is_enable: false,
        url: globalConfig.server,
        rightMenuX: 0,
        rightMenuY: 0,
        show: false,
        lists: [],
        tableStatus: ' ',
        tableLoading: false,
        assistShow: '',             //是否显示辅助信息
        staffVisible: false,        //增加新员工
        currentPage: 1,             //当前页数
        isHigh: false,              //高级
        tableData: [],
        params: {},
        orgData: {},                //组织架构 显示
        totalNum: 0,
      }
    },
    created() {
      this.resetting();
    },
    mounted() {
      this.staffList(1);
    },
    activated() {
    },
    watch: {},
    computed: {},
    methods: {
      staffList(page) {
        this.tableLoading = true;
        this.tableStatus = ' ';
        this.params.page = page;
        this.$http.get(this.url + 'hrm/User/lists', {
          params: this.params,
        }).then(res => {
          this.tableLoading = false;
          if (res.data.code === '90010') {
            this.tableData = res.data.data.data;
            this.totalNum = res.data.data.count;
          } else {
            this.tableStatus = '暂无数据';
          }
        })
      },
      // 导出
      leadingOut() {

      },
      // 搜索
      search() {
        this.staffList(1);
      },
      // 高级
      highGrade() {
        this.isHigh = !this.isHigh;
      },
      // 重置
      resetting() {
        this.params = JSON.parse(JSON.stringify(rosterParams));
      },
      // 双击
      dblClickTable() {

      },
      // 打开组织架构
      openOrgan(val, type) {
        this.organDivision = val;
        this.organModule = true;
        this.organizeType = type;
        if (val === 'org_id') {
          this.form[val] = [];
          this.lengths = '';
        } else {
          this.lengths = 1;
        }
      },
      // 清空部门
      emptyDepart(val) {
        this.params[val] = '';
        this.orgData[val] = '';
        this.orgData = Object.assign({}, this.orgData);
        if (val === 'org_id') {
          this.resetOrg();
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
          for (let item of val) {
            this.duties(item.id);
            this.form[organ].push(item.id);
            this.orgData[organ] = item.name + ',' + item.name;
          }
        } else {
          this.form[organ] = val[0].id;
          this.orgData[organ] = val[0].name;
        }
      },
      // 新增员工
      newAddStaff() {
        this.staffVisible = true;
        this.assistShow = '';
      },
      closeStaff(val) {
        this.staffVisible = false;
        this.assistShow = '';
        if (val === 'success') {
          this.staffList(1);
        }
      },
      // 分页
      handleSizeChange(val) {
        this.params.limit = val;
        this.staffList(val);
        console.log(`每页 ${val} 条`);
      },
      handleCurrentChange(val) {
        this.staffList(val);
      },
      // 更改状态
      changeEnable(id) {
        this.$http.get(this.url + 'hrm/User/changeAccountStatus?user_id=' + id).then(res => {
          if (res.data.code === '90010') {
            this.staffList(this.params.page);
            this.prompt('success', res.data.msg);
          } else {
            this.prompt('warning', res.data.msg);
          }
        })
      },
      // 禁用/启用
      showMessage(row) {
        let enable = row.is_enable === 1 ? '禁用' : '启用';
        this.$confirm('此操作将' + enable + '账号, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.changeEnable(row.user_id);
        })
      },
      // 右键
      openContextMenu(row, event) {
        this.lists = [
          {clickIndex: 'revise', headIcon: 'el-icon-edit-outline', label: '编辑'},
          {clickIndex: 'formal', headIcon: 'iconfont icon-chenggong', label: '转正'},
          {clickIndex: 'transfer', headIcon: 'iconfont icon-tiaogang', label: '调岗'},
          {clickIndex: 'dimission', headIcon: 'iconfont icon-lizhi', label: '离职'},
        ];
        this.contextMenuParam(event);
      },
      // 右键回调
      clickEvent(val) {
        switch (val) {
          case 'revise':
            this.staffVisible = true;
            this.assistShow = 'second';
            break;
          case 'formal':
            console.log(val);
            break;
          case 'transfer':
            console.log(val);
            break;
          case 'dimission':
            console.log(val);
            break;
        }
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
    },
  }
</script>

<style lang="scss">

</style>
