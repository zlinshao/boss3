<template>
  <div id="employemanagement">
    <el-container>
        <div class="highRanking">
          <el-header style="overflow: hidden;line-height: 60px;">
            <div class="addstaff">
              <el-button type="primary" size="mini" @click="addLookEmploy('1')">新增员工</el-button>
            </div>
            <div class="search">
              <el-input v-model="params.keywords" placeholder="姓名" size="mini" @keyup.enter.prevent.native="searchEmploy" clearable></el-input>
              <el-button type="primary" size="mini" @click="searchEmploy">搜 索</el-button>
              <el-button type="primary" size="mini" @click="highGrade">高 级</el-button>
              <el-button type="primary" size="mini" @click="lookImportanAtt">导出考勤</el-button>
            </div>
          </el-header>
          <el-main style="padding: 0">
            <div class="filter high_grade" :class="isHigh? 'highHide':''">
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
                          <el-input v-model="follow_name" readonly="" @focus="openOrganizeModal()" size="mini">
                            <el-button slot="append" type="primary" @click="emptyFollowPeople">清空</el-button>
                          </el-input>
                        </el-col>
                      </el-row>
                    </el-col>
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
                              value-format="yyyy-MM-dd"
                              range-separator="至"
                              start-placeholder="开始日期"
                              end-placeholder="结束日期">
                            </el-date-picker>
                          </el-form-item>
                        </el-col>
                      </el-row>
                    </el-col>
                    <!-- <el-col :span="12">
                     <el-row>
                       <el-col :span="8">
                          <div class="el_col_label">职位</div>
                       </el-col>
                       <el-col :span="16" class="el_col_option">
                          <el-select v-model="params.duty_id" clearable multiple size="mini" @change="positionSelect"  :disabled="duty.length < 1" style="width: 100%;">
                            <el-option v-for="(item,index) in duty" :value="item.id" :key="index" :label="item.name">
                          </el-option>
                          </el-select>
                       </el-col>
                     </el-row>
                    </el-col> -->
                    <!-- <el-col :span="12">
                      <el-row>
                        <el-col :span="8">
                          <div class="el_col_label">岗 位</div>
                        </el-col>
                        <el-col :span="16" class="el_col_option">
                            <el-select v-model="params.position_id" clearable multiple :disabled="position.length < 1" style="width: 100%;" size="mini">
                              <el-option v-for="(item,index) in position" :value="item.id" :key="index" :label="item.name">
                              </el-option>
                            </el-select>
                        </el-col>
                      </el-row>
                    </el-col> -->
                    <!-- <el-col :span="8">
                      <el-row>
                        <el-col :span="8">
                          <div class="el_col_label">离职时间</div>
                        </el-col>
                        <el-col :span="16" class="el_col_option">
                          <el-form-item>
                            <el-date-picker
                              v-model="params.leave_time"
                              type="daterange"
                              value-format="yyyy-MM-dd"
                              range-separator="至"
                              start-placeholder="开始日期"
                              end-placeholder="结束日期">
                            </el-date-picker>
                          </el-form-item>
                        </el-col>
                      </el-row>
                    </el-col> -->
                  </el-row>
                  <!-- <el-row class="el_row_border">
                    <el-col :span="12">
                      <el-row>
                        <el-col :span="8">
                          <div class="el_col_label">在职状态</div>
                        </el-col>
                        <el-col :span="16" class="el_col_option">
                          <el-select v-model="params.is_dimission" size="mini" clearable>
                            <el-option key="0" label="在职" value="0">在职</el-option>
                            <el-option key="1" label="离职" value="1">离职</el-option>
                            <el-option key="10" label="禁用" value="10">禁用</el-option>
                          </el-select>
                        </el-col>
                      </el-row>
                    </el-col>
                    <el-col :span="12">
                      <el-row>
                        <el-col :span="8">
                          <div class="el_col_label">是否转正</div>
                        </el-col>
                        <el-col :span="16" class="el_col_option">
                          <el-select v-model="params.forward" size="mini" clearable>
                            <el-option key="0" label="已转正" value="1">已转正</el-option>
                            <el-option key="1" label="未转正" value="2">未转正</el-option>
                          </el-select>
                        </el-col>
                      </el-row>
                    </el-col>
                  </el-row> -->
                  <div class="btnOperate">
                    <el-button size="mini" type="primary" @click="searchEmploy">搜索</el-button>
                    <el-button size="mini" type="primary" @click="resetting">重置</el-button>
                    <el-button size="mini" type="primary" @click="highGrade">取消</el-button>
                  </div>
                </el-form>
              </div>
            <el-table :data="staffDate"  border style="width: 100%"
                            v-loading="isLoading" 
                            :empty-text="emptyText"  
                            element-loading-text="拼命加载中"
                            element-loading-spinner="el-icon-loading"
                            element-loading-background="rgba(255, 255, 255, 0)">
              <el-table-column prop="name" label="姓名">
                <template slot-scope="scope">
                  <span @click="lookEmployeDetails(scope.row.id)" style="cursor: pointer">{{scope.row.name}}</span>
                  &nbsp;&nbsp;&nbsp;
                  <i class="el-icon-edit" @click="addLookEmploy('2',scope.row.id)" style="cursor: pointer;"></i>
                  &nbsp;&nbsp;&nbsp;
                  <!-- <i class="el-icon-close" @click="deletedEmploy(scope.row.id)" style="cursor: pointer;"></i> -->
                </template>
              </el-table-column>
              <el-table-column prop="orgStr" label="公司和部门" ></el-table-column>
              <el-table-column prop="roleStr" label="岗位名称" ></el-table-column>
              <el-table-column prop="enroll" label="入职时间" ></el-table-column>
              <el-table-column prop="created_at" label="在职状态">
                <template slot-scope="scope">
                  <div>
                    <!-- <span v-if="scope.row.is_on_job"><el-tag type="warning">离职</el-tag></span>
                    <span v-if="!scope.row.is_on_job"><el-tag type="success">在职</el-tag></span> -->
                    <span v-if="scope.row.status == '1'">在职</span>
                    <span v-if="scope.row.status == '2'">离职</span>
                    <span v-if="scope.row.status == '3'">禁用</span>
                    <span v-if="scope.row.status == '4'">停止留薪</span>
                  </div>
                </template>
              </el-table-column>
              <el-table-column prop="levels.dictionary_name" label="等级" >
                <!-- <template slot-scope="scope">
                  <div>
                    <span v-if="scope.row.is_on_job"><el-tag type="danger">禁用</el-tag></span>
                    <span v-if="!scope.row.is_on_job"><el-tag type="success">启用</el-tag></span>
                  </div>
                </template> -->
              </el-table-column>
              <!-- <el-table-column prop="levels.dictionary_name" label="正式" ></el-table-column> -->
              <!-- <el-table-column label="薪资记录" ></el-table-column> -->
              <el-table-column label="奖励记录" >
                <template slot-scope="scope">
                  <el-button type="text" @click="lookRewardRecord(scope.row.name, scope.row.orgStr, scope.row.roleStr, scope.row.enroll, scope.row.id)">查看</el-button>
                </template>
              </el-table-column>
              <el-table-column label="排班" >
                <template slot-scope="scope">
                  <el-button type="text" @click="lookTypesetting(scope.row.id)">查看</el-button>
                </template>
              </el-table-column>
              <!-- <el-table-column label="日报" >
                <template slot-scope="scope">
                  <el-button type="text" @click="lookDaily(scope.row.id)">查看</el-button>
                </template>
              </el-table-column> -->
              <el-table-column label="审批" >
                <template slot-scope="scope">
                  <el-button type="text" @click="lookApproval(scope.row.name, scope.row.orgStr, scope.row.roleStr, scope.row.id)">查看</el-button>
                </template>
              </el-table-column>
              <el-table-column  label="考勤" >
                <template slot-scope="scope">
                  <el-button type="text" @click="lookAttendance(scope.row.id)">查看</el-button>
                </template>
              </el-table-column>
              <!-- <el-table-column  label="编辑" >
                <template slot-scope="scope">
                  <el-button type="text" @click="editEmploy(scope.row.id)">编辑</el-button>
                </template>
              </el-table-column> -->
            </el-table>
          </el-main>
      </div>
    </el-container>
    <!-- 组织架构 -->
     <Organization  :organizationDialog="organizationDialog" :length="length" :type="type" @close='closeModal' @selectMember="selectMember"></Organization>
    <!-- 导出考勤 -->
    <ImportAttendance :lookImportAttendance="lookImportAttendance" @close="closeImportAttendce"></ImportAttendance>
    <!-- 新增与编辑员工 -->
    <addEmploy :editId="editId" :isEdit="isEdit" :addStaffDialog="addStaffDialog" @close="closeAddEmploy"></addEmploy>
    <!-- 查看员工详情 -->
    <EmployeeDetails :ids="class_empDetail_id" :lookEmployDetailLog="lookEmployDetailLog" @close="closeEmployDetail"></EmployeeDetails>
    <!-- 查看奖励记录 -->
    <Rewardreord :ids="class_reward_id" :names="class_reward_name" :orgs="class_reward_org" :roles="class_reward_role" :times ="class_reward_times"  :lookRewardLog="lookRewardLog" @close="closeReward"></Rewardreord>
    <!-- 查看日报 -->
    <Daily :ids="class_daily_id" :lookDailyLog="lookDailyLog" @close="closeDaily"></Daily>
    <!-- 查看考勤 -->
    <LookAttendanceChild :ids="class_atted_id" :lookAttendanceLog="lookAttendanceLog" @close="closeAttendance"></LookAttendanceChild>
    <!-- 排版 -->
    <employemanagement :ids="class_type_id" :lookTypesettingLog="lookTypesettingLog" @close="closeTypesetting"></employemanagement>
    <!-- 审批 -->
    <Approval :ids="class_approval_id" :names="class_approval_name" :orgs="class_approval_org" :roles="class_approval_role"  :lookApprovalLog="lookApprovalLog" @close="closeApproval"></Approval>
    <!-- 右键 -->
    <!-- <AddStaff :addStaffDialog="addStaffDialog" :isEdit="isEdit" :editId="editId" @close="closeAddStaff"></AddStaff> -->
    <!-- 分页 -->
    <div class="block pages">
      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="params.page" :page-sizes="[12,24, 36,48]" :page-size="params.limit" layout="total, sizes, prev, pager, next, jumper" :total="total">
      </el-pagination>
    </div>
  </div>
</template>

<script>
import Organization from '../../common/organization'  // 组织架构
import ImportAttendance from './components/importAttendance'  // 导出考勤
import addEmploy from './components/addEmploy'   // 新增员工
import EmployeeDetails from './components/employeeDetails'  // 员工详情
import LookAttendanceChild from './components/lookAttendance'  // 查看排班
import employemanagement from './components/lookTypesetting'  // 查看考勤
import Approval from './components/approval'    // 审批
import Rewardreord from './components/rewardreord'
import Daily from './components/daily'  // 日报
// import AddStaff from '../../organizationNew/addStaff.vue'  // 右键
export default {
  components: {EmployeeDetails, addEmploy, LookAttendanceChild, employemanagement, Approval, Rewardreord, Daily, ImportAttendance, Organization},
  data() {
    return {
      position: [],   // 岗位
      duty: [],   // 职位
      follow_name: "", //跟进人
      follow_id: "", // 部门ID
      organizationDialog: false,
      type: "",
      length: 0,
      isHigh: false,
      // addStaffDialog: false, // 右键
      isEdit: false,   // 编辑
      staffDate: [],   // 列表
      addEmployDialog: false,  // 新增员工
      lookAttendanceLog: false,  // 查看排班
      lookTypesettingLog: false,  // 查看考勤
      lookApprovalLog: false,  // 查看审批
      lookRewardLog: false,  // 查看奖励记录
      lookDailyLog: false,  // 查看日报
      addStaffDialog: false,  // 新增人员
      lookEmployDetailLog: false,  // 查看员工
      lookImportAttendance: false,  // 导出考勤
      total: 0,
      class_atted_id: "",  // 考勤id
      class_type_id: "",  // 排版id
      class_approval_id: "",  // 审批id
      class_approval_name: "",  // 审批人
      class_approval_org: "",  // 审批部门
      class_approval_role: "",  // 审批职位
      class_reward_id: "",   // 奖励记录id
      class_reward_name: "", 
      class_reward_org: "",
      class_reward_role: "",
      class_reward_times: "",
      class_daily_id: "",   // 查看日报
      editId: "",  // 新增员工id
      class_empDetail_id: "",  // 查看员工id
      params: {
        position_id: "",
        keywords: '',
        limit: 12,
        page: 1,
        org_id: 1,
        is_dimission: 0,
        infinite: 20,         //需要权限
        forward: '',
        is_recursion: 1,
        entry_time: [],
        leave_time: [],
      },
      isLoading: false,
      emptyText: " ",
    }
  },
  mounted() {
    this.getEmploy();
    // this.getPosition();
  },
  methods: {
    // 获取职位
    getPosition(id) {
      this.$http.get(globalConfig.server + "organization/duty?org_id=" + id).then(res => {
        if(res.data.code === '20000') {
          res.data.data.data.forEach((item, index) => {
            let obj = {}
            obj.id = item.id;
            obj.name = item.name;
            this.duty.push(obj);
          })
        }
      })
    },
    // 选择职位
    positionSelect(val) {
      if(val.length > 0) {
        for(let item of val) {
          this.getPositoin(item)
        }
      }
    },
    // 获取岗位
    getPositoin(id) {
      this.$http.get(globalConfig.server + 'organization/position?duty_id=' + id).then(res => {
        if (res.data.code === '20000') {
          for (let item of res.data.data.data) {
            this.position.push(item);
          }
        } else {
          this.prompt('warning', res.data.msg);
        }
      })
    },
    // 搜索
    searchEmploy() {
     this.params.page = 1;
     this.getEmploy();
    },
    // 高级搜索
    highGrade() {
      this.isHigh = !this.isHigh;
    },
    resetting() {
      // this.params.is_dimission = '';
      this.follow_name = "";
      this.params.forward = '';
      this.params.org_id = 1;
      this.params.entry_time = [];
      this.params.leave_time = [];
    },
    // 获取列表
    getEmploy() {
      this.isLoading = true;
      this.$http.get(globalConfig.server + 'organization/other/staff-list', {params: this.params}).then(res => {
        // console.log(res.data.data.data, "11111")
         this.isHigh = false;
        if(res.data.code == "70010") {
          this.emptyText = " ";
          this.total = res.data.data.count;
          this.staffDate = res.data.data.data;
          res.data.data.data.forEach((item, index) => {
            let orgStr = "";
            let roleStr = "";
            item.org.forEach((val, key) => {
             orgStr += val.name;
            if(val.corp) {
              // orgStr = `<span>${orgStr}</span><br /><span> ${val.corp.name}</span>`;
              orgStr = `${orgStr} ${val.corp.name}`;
            }
             this.staffDate[index].orgStr = orgStr;

            })
            item.roles.forEach((val, key) => {
              roleStr += val.display_name + " ";
              this.staffDate[index].roleStr = roleStr;
            })
          })
          this.isLoading = false;
        } else if(res.data.code == "70011") {
          this.$notify.warning({
            title: "警告",
            message: res.data.msg
          })
          this.staffDate = [];
          this.total = 0;
          this.emptyText = "暂无数据";
          this.isLoading = false;
        }
      })
    },
    // 删除人员
    deletedEmploy(id) {

    },
    // 新增人员
    addLookEmploy(val, id) {
      this.addStaffDialog = true;
      if(val == '1') {
        this.isEdit = false;
      } else if(val == '2') {
        this.editId = id;
        this.isEdit = true;
      }
    },
    closeAddEmploy() {
       this.addStaffDialog = false;
       this.isEdit = false;
       this.getEmploy();
    },
    // 导出考勤
    lookImportanAtt() {
      this.lookImportAttendance = true;
    },
    closeImportAttendce() {
      this.lookImportAttendance = false;
    },
    // 查看员工详情
    lookEmployeDetails(id) {
      this.lookEmployDetailLog = true;
      this.class_empDetail_id = id;
    },
    closeEmployDetail() {
      this.lookEmployDetailLog = false;
      this.getEmploy();
    },
    // 查看考勤
    lookAttendance(id) {
      this.lookAttendanceLog = true;
      this.class_atted_id = id;
      // this.$refs.attendanceChildren.getAttendance(val)
    },
    closeAttendance(val) {
      this.lookAttendanceLog = false;
    },
    // 查看排班
    lookTypesetting(id) {
      this.lookTypesettingLog = true;
      this.class_type_id = id;
    },
    closeTypesetting() {
      this.lookTypesettingLog = false;
    },
    // 查看审批
    lookApproval(name, org, role, id) {
      this.lookApprovalLog = true;
      this.class_approval_id = id;
      this.class_approval_name = name;
      this.class_approval_org = org;
      this.class_approval_role = role;
    },
    closeApproval() {
      this.lookApprovalLog = false;
    },
    // 查看奖励记录
    lookRewardRecord(name, org, role, time, id) {
      this.lookRewardLog = true;
      this.class_reward_id = id;
      this.class_reward_name = name;
      this.class_reward_org = org;
      this.class_reward_role = role;
      this.class_reward_times = time;
    },
    closeReward() {
      this.lookRewardLog = false;
      this.class_reward_id = "";
      this.class_reward_name = "";
      this.class_reward_org = "";
      this.class_reward_role = "";
      this.class_reward_times = "";
    },
    // 查看日报
    lookDaily(val) {
      this.lookDailyLog = true;
      this.class_daily_id = val;
    },
    closeDaily() {
       this.lookDailyLog = false;
    },
    // 分页
    handleSizeChange(val) {
      this.params.limit = val;
      this.getEmploy(this.params.limit);
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      this.params.page = val;
      this.getEmploy(this.params.page);
      console.log(`当前页: ${val}`);
    },
    // 组织架构
    openOrganizeModal(id) {
      this.params.org_id = id;
      // this.follow_name = '';
      this.organizationDialog = true;
      this.type = "depart";
      // this.length = 1;
    },
    selectMember(val) {
      this.type = "";
      this.length = "";
      this.follow_id = "";
      this.follow_name = "";
      val.forEach(item => {
        this.follow_id += item.id + ",";
        this.follow_name = item.name + ",";
      });
      this.params.org_id = this.follow_id.substring(
        0,
        this.follow_id.length - 1
      );
      // this.params.org_id = this.follow_id;
      this.follow_name = this.follow_name.substring(
        0,
        this.follow_name.length - 1
      );
      this.getPosition(this.params.org_id)
    },
    // 关闭模态框
    closeModal() {
      this.organizationDialog = false;
      // this.params.org_id = this.follow_id
    },
    emptyFollowPeople() {
      this.follow_id = "";
      this.params.org_id = "";
      this.follow_name = "";
    },
  }
};
</script>

<style lang="scss">
  #employemanagement {
    .highRanking {
      width: 100%;
    }
    .addstaff {
      float: left
    }
    .filter {
      padding: 10px 10px 0 10px;
    }
    .search {
      float: right;
      width: 30%;
      .el-input {
        width: 52%;
      }
    }
    .success {
      color: #67c23a;
    }
    .warning {
      color: #e6a23c;
    }
    .danger {
      color: #f56c6c;
    }
    .info {
      color: #909399
    }
  }
</style>
