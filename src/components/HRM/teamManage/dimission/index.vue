<template>
  <div @click="show = false" @contextmenu="closeMenu">
    <div class="highRanking">
      <div class="highSearch">
        <el-form :model="params" :inline="true" size="mini">
          <el-form-item>
            <el-input placeholder="请输入员工姓名" v-model="params.keywords" size="mini" @keyup.enter.native="search"
                      clearable>
              <el-button slot="append" icon="el-icon-search" @click="search"></el-button>
            </el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" size="mini" @click="highGrade">高级</el-button>
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
                  <div class="el_col_label">部门</div>
                </el-col>
                <el-col :span="16" class="el_col_option">
                  <el-form-item>
                    <el-input placeholder="请选择" @focus="openOrgan('orgNames', 'depart')" v-model="params.orgNames"
                              size="mini">
                      <el-button slot="append" @click="emptyDepart('orgNames')">清空</el-button>
                    </el-input>
                  </el-form-item>
                </el-col>
              </el-row>
            </el-col>
            <el-col :span="12">
              <el-row>
                <el-col :span="8">
                  <div class="el_col_label">职位</div>
                </el-col>
                <el-col :span="16" class="el_col_option">
                  <el-form-item>
                    <el-select v-model="params.positionNames" >
                      <el-option
                        v-for="(item,index) in positionList"
                        :key="index"
                        :label="item.name"
                        :value="item.name"
                        ></el-option>
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
    <div>
      <el-table
        :data="tableData"
        :empty-text='tableStatus'
        v-loading="tableLoading"
        element-loading-text="拼命加载中"
        element-loading-spinner="el-icon-loading"
        element-loading-background="rgba(255, 255, 255, 0)"
        style="width: 100%">
        <!--@row-contextmenu='openContextMenu'-->
        <el-table-column
          prop="real_name"
          label="姓名">
        </el-table-column>
        <el-table-column
          prop="organizationInfo"
          label="部门">
        </el-table-column>
        <el-table-column
          prop="dutyInfo"
          label="职位">
        </el-table-column>
        <el-table-column
          prop="forward_time"
          label="入职时间">
        </el-table-column>
        <el-table-column
          prop="dismiss_time"
          label="离职时间">
        </el-table-column>
        <el-table-column
          prop="id_num"
          label="身份证">
        </el-table-column>
        <el-table-column
          prop="phone"
          label="手机号码">
        </el-table-column>
        <el-table-column
          prop="email"
          label="个人邮箱">
        </el-table-column>
        <el-table-column
          prop="resignation_type"
          label="离职类型">
        </el-table-column>
        <el-table-column
          label="是否转正">
          <template slot-scope="scope">
            <el-button type="primary" size="mini" @click="dimission(scope.row)">离职</el-button>
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
    <!--右键-->
    <RightMenu :startX="rightMenuX+'px'" :startY="rightMenuY+'px'" :list="lists" :show="show"
               @clickOperate="clickEvent"></RightMenu>
    <!--组织架构-->
    <Organization :organizationDialog="organModule" :type="organizeType" :length="lengths"
                  @close="closeOrgan" @selectMember="selectMember"></Organization>
    <!--新增离职-->
    <AddDismission :module="dismissionModule" :detail="staffDetail" @close="closeModule"></AddDismission>
  </div>
</template>

<script>
  import RightMenu from '../../../common/rightMenu.vue';//右键
  import AddDismission from './components/addDimission.vue'//确认离职
  import Organization from '../../../common/organization.vue';//组织架构
  export default {
    name: "index",
    components: {RightMenu, Organization, AddDismission},
    data() {
      return {
        url: globalConfig.server,
        rightMenuX: 0,
        rightMenuY: 0,
        show: false,
        lists: [],

        isHigh: false,

        dismissionModule: false,
        staffDetail: {},

        organModule: false,
        organizeType: '',
        lengths: 0,
        organDivision: '',          //组织架构字段名

        tableStatus: ' ',
        tableLoading: false,
        totalNum: 0,
        tableData: [],
        params: {
          limit: 15,
          page: 1,
          orgNames: '',
          positionNames: '',
        },
        positionList: []
      }
    },
    mounted() {
      this.dimissionList();
    },
    activated() {
    },
    watch: {},
    computed: {},
    methods: {
      // 列表
      dimissionList(page) {
        this.tableStatus = ' ';
        this.tableLoading = true;
        this.params.page = page || 1;
        this.$http.get(this.url + 'hrm/User/dismissList', {
          params: this.params,
        }).then(res => {
          this.tableLoading = false;
          if (res.data.success) {
            if (res.data.data.data.length < 1) {
              this.emptyList();
            }
            this.tableData = res.data.data.data;
            this.totalNum = res.data.data.count;
          } else {
            this.emptyList();
          }
        })
      },
      // 列表无数据
      emptyList() {
        this.totalNum = 0;
        this.tableData = [];
        this.tableStatus = '暂无数据';
        return false;
      },
      // 离职
      dimission(row) {
        this.dismissionModule = true;
        this.$http.get(this.url + 'hrm/User/userInfo?user_id=' + row.user_id).then(res => {
          if (res.data.success) {
            this.staffDetail = res.data.data;
          } else {
            this.prompt('warning', res.data.msg);
          }
        });
      },
      // 关闭模态框
      closeModule(val) {
        this.dismissionModule = false;
        if (val === 'success') {
          this.dimissionList(this.params.page);
        }
      },
      // 搜索
      search() {
        this.isHigh = false;
        this.dimissionList();
      },
      // 高级
      highGrade() {
        this.isHigh = !this.isHigh;
      },
      // 重置
      resetting() {
        this.params = {
          limit: 15,
          page: 1,
          orgNames: '',
          positionNames: '',
        };
        this.positionList = [];
      },
      // 分页
      handleSizeChange(val) {
        this.params.limit = val;
        this.dimissionList();
        console.log(`每页 ${val} 条`);
      },
      handleCurrentChange(val) {
        this.dimissionList(val);
      },
      // 打开组织架构
      openOrgan(val, type) {
        this.organDivision = val;
        this.organModule = true;
        this.organizeType = type;
        this.lengths = '';
      },
      // openOrganOrg(val, type) {
      //   this.organDivision = val;
      //   this.organModule = true;
      //   this.organizeType = type;
      //   this.lengths = '';
      // },
      // openOrganName(val, type) {
      //   this.organDivision = val;
      //   this.organModule = true;
      //   this.organizeType = type;
      //   this.lengths = '';
      // },
      // 清空部门
      emptyDepart(val) {
        this.params[val] = '';
        this.positionList = [];
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
        let arr = [];
        this.params[organ] = [];
        for (let item of val) {
          arr.push(item.name);
          this.getPositionList(item.id);
        }
        this.departName(arr, organ);
        this.dimissionList(this.params.page);
      },
      getPositionList(id) {
        this.$http.get(this.url + 'manager/position?department_id=' + id).then(res => {
          if (res.data.code === '20000') {
            console.log(res);
            this.positionList = res.data.data.data;
          } else {
            this.prompt('warning', res.data.msg);
          }
        });
      },
      // 数组名称去重 拼接
      departName(arr, organ) {
        this.params[organ] = this.montage(arr);
      },
      // 右键
      openContextMenu(row) {
        this.lists = [
          {clickIndex: 'first', headIcon: 'el-icon-edit-outline', label: '编辑基本信息'},
        ];
        this.contextParams();
      },
      // 右键回调
      clickEvent(val) {
        switch (val) {
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
    },
  }
</script>

<style lang="scss" scoped>

</style>
