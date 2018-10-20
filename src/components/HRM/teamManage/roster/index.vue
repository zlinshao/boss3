<template>
  <div @click="show = false" @contextmenu="closeMenu">
    <div class="highRanking">
      <div class="highSearch">
        <el-form :model="params" :inline="true" size="mini">
          <el-form-item>
            <el-input placeholder="请输入员工姓名" v-model="params.user_name" size="mini" @keyup.enter.native="search"
                      clearable>
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
                  <div class="el_col_label">部门</div>
                </el-col>
                <el-col :span="16" class="el_col_option">
                  <el-form-item>
                    <el-input placeholder="请选择" @focus="openOrgan('org_names', 'depart')" v-model="params.org_names"
                              size="mini">
                      <el-button slot="append" @click="emptyDepart('org_names')">清空</el-button>
                    </el-input>
                  </el-form-item>
                </el-col>
              </el-row>
            </el-col>
            <el-col :span="12">
              <el-row>
                <el-col :span="8">
                  <div class="el_col_label">员工类型</div>
                </el-col>
                <el-col :span="16" class="el_col_option">
                  <el-form-item>
                    <el-select v-model="params.job_type" clearable>
                      <el-option v-for="item in job_type" :value="item.id" :key="item.id" :label="item.name">
                        {{item.name}}
                      </el-option>
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
                  <div class="el_col_label">员工状态</div>
                </el-col>
                <el-col :span="16" class="el_col_option">
                  <el-form-item>
                    <el-select v-model="params.job_status" clearable>
                      <el-option v-for="item in job_status" :value="item.id" :key="item.id" :label="item.name">
                        {{item.name}}
                      </el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
              </el-row>
            </el-col>
            <el-col :span="12">
              <el-row>
                <el-col :span="8">
                  <div class="el_col_label">当前在职状态</div>
                </el-col>
                <el-col :span="16" class="el_col_option">
                  <el-form-item>
                    <el-select v-model="params.position_status" clearable>
                      <el-option v-for="item in position_status" :value="item.id" :key="item.id" :label="item.name">
                        {{item.name}}
                      </el-option>
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
                  <div class="el_col_label">入职时间</div>
                </el-col>
                <el-col :span="16" class="el_col_option">
                  <el-form-item>
                    <el-date-picker
                      v-model="params.enroll_min"
                      type="date"
                      value-format="yyyy-MM-dd"
                      placeholder="请选择日期"
                      clearable>
                    </el-date-picker>
                  </el-form-item>
                  <span class="zhi">至</span>
                  <el-form-item>
                    <el-date-picker
                      v-model="params.enroll_max"
                      type="date"
                      value-format="yyyy-MM-dd"
                      placeholder="请选择日期"
                      clearable>
                    </el-date-picker>
                  </el-form-item>
                </el-col>
              </el-row>
            </el-col>
            <el-col :span="12">
              <el-row>
                <el-col :span="8">
                  <div class="el_col_label">当前在职状态</div>
                </el-col>
                <el-col :span="16" class="el_col_option">
                  <el-form-item>
                    <el-date-picker
                      v-model="params.dismiss_time_min"
                      type="date"
                      value-format="yyyy-MM-dd"
                      placeholder="请选择日期"
                      clearable>
                    </el-date-picker>
                  </el-form-item>
                  <span class="zhi">至</span>
                  <el-form-item>
                    <el-date-picker
                      v-model="params.dismiss_time_max"
                      type="date"
                      value-format="yyyy-MM-dd"
                      placeholder="请选择日期"
                      clearable>
                    </el-date-picker>
                  </el-form-item>
                </el-col>
              </el-row>
            </el-col>
          </el-row>
          <el-row class="el_row_border">
            <el-col :span="12">
              <el-row>
                <el-col :span="8">
                  <div class="el_col_label">职位</div>
                </el-col>
                <el-col :span="16" class="el_col_option">
                  <el-form-item>
                    <el-input placeholder="职位名称之间请用逗号隔开" v-model="params.position_names" clearable></el-input>
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
          prop="jobType"
          label="员工类型">
        </el-table-column>
        <el-table-column
          prop="jobStatus"
          label="员工状态">
        </el-table-column>
        <el-table-column
          prop="positionStatus"
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
            <el-switch v-model="scope.row.is_enable === 1" @change="showMessage(scope.row)"></el-switch>
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
    <AddStaff :module="staffVisible" :assist="assistShow" :detail="staffDetail" @close="closeStaff"></AddStaff>
    <!--修改奖惩记录-->
    <ReviseRecord :module="recordVisible" :data="recordID" @close="closeRecord"></ReviseRecord>
    <!--右键-->
    <RightMenu :startX="rightMenuX+'px'" :startY="rightMenuY+'px'" :list="lists" :show="show"
               @clickOperate="clickEvent"></RightMenu>
    <!--组织架构-->
    <Organization :organizationDialog="organModule" :type="organizeType" :length="lengths"
                  @close="closeOrgan" @selectMember="selectMember"></Organization>
    <!--新增调岗-->
    <AddTransfer :module="transferModule" :detail="staffDetail" @close="closeModule"></AddTransfer>
  </div>
</template>

<script>
  import AddStaff from './components/addStaff.vue';//新增员工
  import AddTransfer from './components/addTransfer.vue';//新增调岗
  import ReviseRecord from './components/reviseRecord.vue';//修改奖惩记录
  import RightMenu from '../../../common/rightMenu.vue';//右键
  import Organization from '../../../common/organization.vue';//组织架构
  export default {
    name: "index",
    components: {RightMenu, AddStaff, ReviseRecord, Organization, AddTransfer},
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
        recordVisible: false,       //修改奖惩记录
        recordID: '',               //修改奖惩记录 ID
        currentPage: 1,             //当前页数
        isHigh: false,              //高级
        tableData: [],
        params: {},
        totalNum: 0,

        organModule: false,
        organizeType: '',
        lengths: 0,
        organDivision: '',          //字段名

        job_type: [],               //员工类型
        job_status: [],             //员工状态
        position_status: [],        //当前在职状态

        user_info: {},              //员工信息
        staffDetail: {},            //员工详情

        transferModule: false,      //调岗
      }
    },
    created() {
      this.resetting();
      this.job_type = job_type;
      this.job_status = job_status;
      this.position_status = position_status;
    },
    mounted() {
      this.staffList();
    },
    activated() {
    },
    watch: {},
    computed: {},
    methods: {
      // 花名册列表
      staffList(page) {
        this.tableLoading = true;
        this.tableStatus = ' ';
        this.params.page = page || 1;
        this.$http.get(this.url + 'hrm/User/lists', {
          params: this.params,
        }).then(res => {
          this.tableLoading = false;
          if (res.data.success) {
            let data = res.data.data.data;
            if (data.length < 1) {
              this.emptyList();
            }
            this.tableData = data;
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
      // 导出
      leadingOut() {
        this.$http.get(this.url + 'hrm/User/lists?export=1', {
          params: this.params,
        }, {responseType: 'arraybuffer'}).then(res => {
          let url = window.URL.createObjectURL(new Blob([res.data]));
          let link = document.createElement('a');
          let title = this.nowDateTime('time') + '花名册.xlsx';
          link.style.display = 'a';
          link.href = url;
          link.setAttribute('download', title);
          document.body.appendChild(link);
          link.click();
        })
      },
      // 当前时间
      nowDateTime(time) {
        let noTime, haveTime;
        let date = new Date();
        let year = date.getFullYear();
        let month = date.getMonth() + 1;
        let day = date.getDate();

        let mm = month.toString();
        let dd = day.toString();
        mm = mm[1] ? mm : '0' + mm;
        dd = dd[1] ? dd : '0' + dd;
        noTime = year + '-' + mm + '-' + dd;
        haveTime = year + '-' + mm + '-' + dd + " " + date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds();
        if (time === 'time') {
          return haveTime;
        }
        return noTime;
      },
      // 搜索
      search() {
        this.isHigh = false;
        this.staffList();
      },
      // 高级
      highGrade() {
        this.isHigh = !this.isHigh;
      },
      // 重置
      resetting() {
        this.params = JSON.parse(JSON.stringify(rosterParams));
      },
      // 关闭调岗/离职
      closeModule() {
        this.transferModule = false;
      },
      // 打开组织架构
      openOrgan(val, type) {
        this.organDivision = val;
        this.organModule = true;
        this.organizeType = type;
        this.lengths = '';
      },
      // 清空部门
      emptyDepart(val) {
        this.params[val] = '';
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
        let str = [];
        for (let item of val) {
          str.push(item.name);
        }
        str = Array.from(new Set(str));
        for (let key of str) {
          str = key + ',' + str;
        }
        this.params[organ] = (str.substring(str.length - 1) === ',') ? str.substring(0, str.length - 1) : str;
      },
      // 新增员工
      newAddStaff() {
        this.staffVisible = true;
        this.assistShow = 'new';
      },
      closeStaff(val) {
        this.staffVisible = false;
        this.assistShow = '';
        if (val === 'success') {
          this.staffList();
        }
      },
      // 关闭奖惩记录编辑
      closeRecord() {
        this.recordVisible = false;
        this.recordID = '';
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
        }).catch(() => {
        })
      },
      // 双击
      dblClickTable() {

      },
      // 右键
      openContextMenu(row, event) {
        if (row.position_status === 5) return;
        this.user_info = row;
        let list = [
          {clickIndex: 'first', headIcon: 'el-icon-edit-outline', label: '编辑基本信息'},
          {clickIndex: 'second', headIcon: 'el-icon-edit-outline', label: '编辑辅助信息'},
          {clickIndex: 'record', headIcon: 'iconfont icon-xibaoguanli', label: '新增奖惩记录'},
          {clickIndex: 'reviseRecord', headIcon: 'iconfont icon-xibaoguanli', label: '编辑奖惩记录'},
          {clickIndex: 'addTransfer', headIcon: 'iconfont icon-xibaoguanli', label: '新增调岗'},
        ];
        this.lists = JSON.parse(JSON.stringify(list));
        if (row.position_status) {
          let num = Number(row.position_status);
          switch (num) {
            case 3:
              this.lists.push({clickIndex: 'formal', headIcon: 'iconfont icon-chenggong', label: '转正'});
              break;
          }
        }
        this.contextMenuParam(event);
      },
      // 右键回调
      clickEvent(val) {
        let info = this.user_info;
        switch (val) {
          case 'first':// 编辑基本信息
          case 'second':// 编辑辅助信息
          case 'record':// 新增奖惩记录
          case 'addTransfer'://新增调岗
            if (val === 'addTransfer') {
              this.transferModule = true;
            } else {
              this.staffVisible = true;
            }
            this.assistShow = val;
            this.$http.get(this.url + 'hrm/User/userInfo?user_id=' + info.user_id).then(res => {
              if (res.data.success) {
                this.staffDetail = res.data.data;
              } else {
                this.prompt('warning', res.data.msg);
              }
            });
            break;
          case 'reviseRecord':// 编辑奖惩记录
            this.recordVisible = true;
            this.recordID = info.user_id;
            break;
          case 'formal':
            // 转正
            this.$confirm('是否转正员工 ' + info.real_name + ' 不可逆转操作，是否继续?', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
            }).then(() => {
              this.$http.put(this.url + 'hrm/User/affirm', {
                id: info.user_id,
              }).then(res => {
                if (res.data.success) {
                  this.prompt('success', res.data.msg);
                  this.staffList(this.params.page);
                } else {
                  this.prompt('warning', res.data.msg);
                }
              });
            }).catch(() => {
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
