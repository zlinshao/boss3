<template>
  <div id="employemanagement">
    <el-container>
      <el-header style="overflow: hidden;line-height: 60px;">
        <div class="addstaff">
          <el-button type="primary" size="mini" @click="addLookEmploy('1')">新增员工</el-button>
        </div>
        <div class="search">
          <el-input v-model="params.keywords" placeholder="公司/部门/岗位/姓名/正式" size="mini"></el-input>
          <el-button type="primary" size="mini" @click="searchEmploy">搜索</el-button>
          <el-button type="primary" size="mini" @click="lookImportanAtt">导入考勤</el-button>
        </div>
      </el-header>
      <el-main style="padding: 0">
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
            </template>
          </el-table-column>
          <el-table-column prop="orgStr" label="公司和部门" ></el-table-column>
          <el-table-column prop="roleStr" label="岗位名称" ></el-table-column>
          <el-table-column prop="enroll" label="入职时间" ></el-table-column>
          <el-table-column prop="" label="岗位状态" >
            <template slot-scope="scope">
              <div>
                <span v-if="scope.row.is_on_job"><el-tag type="danger">禁用</el-tag></span>
                <span v-if="!scope.row.is_on_job"><el-tag type="success">启用</el-tag></span>
              </div>
            </template>
          </el-table-column>
          <el-table-column prop="levels.dictionary_name" label="正式" ></el-table-column>
          <!-- <el-table-column label="薪资记录" ></el-table-column> -->
          <el-table-column label="奖励记录" >
            <template slot-scope="scope">
              <el-button type="text" @click="lookRewardRecord(scope.row.name, scope.row.orgStr, scope.row.roleStr, scope.row.enroll, scope.row.id)">查看</el-button>
            </template>
          </el-table-column>
          <el-table-column label="排版" >
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
    </el-container>
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
    <!-- 分页 -->
    <div class="block pages">
      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="params.page" :page-sizes="[12,24, 36,48]" :page-size="params.limit" layout="total, sizes, prev, pager, next, jumper" :total="total">
      </el-pagination>
    </div>
  </div>
</template>

<script>
import ImportAttendance from './importAttendance'  // 导出考勤
import addEmploy from './addEmploy'   // 新增员工
import EmployeeDetails from './employeeDetails'  // 员工详情
import LookAttendanceChild from './lookAttendance'  // 查看排班
import employemanagement from './lookTypesetting'  // 查看考勤
import Approval from './approval'    // 审批
import Rewardreord from './rewardreord'
import Daily from './daily'  // 日报
export default {
  components: {EmployeeDetails, addEmploy, LookAttendanceChild, employemanagement, Approval, Rewardreord, Daily, ImportAttendance},
  data() {
    return {
      
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
        keywords: '',
        limit: 12,
        page: 1,
        org_id: 1,
        is_dimission: 1,
        infinite: 20,         //需要权限
        // forward: '',
        is_recursion: 1,
        // entry_time: [],
        // leave_time: [],
      },
      isLoading: false,
      emptyText: " ",
    }
  },
  mounted() {
    this.getEmploy();
  },
  methods: {
    // 搜索
    searchEmploy() {
     this.params.page = 1;
     this.getEmploy();
    },
    // 获取列表
    getEmploy() {
       this.isLoading = true;
      this.$http.get(globalConfig.server + 'organization/other/staff-list', {params: this.params}).then(res => {
        // console.log(res.data.data.data, "11111")
        if(res.data.code == "70010") {
          this.emptyText = " ";
          this.total = res.data.data.count;
          this.staffDate = res.data.data.data;
          res.data.data.data.forEach((item, index) => {
            let orgStr = "";
            let roleStr = "";
            item.org.forEach((val, key) => {
             orgStr += val.name + " ";
             this.staffDate[index].orgStr = orgStr;
            })
            item.roles.forEach((val, key) => {
              roleStr += val.display_name + " ";
              this.staffDate[index].roleStr = roleStr;
            })
          })
          this.isLoading = false;
        } else {
           this.emptyText = "暂无数据";
          this.isLoading = false;
        }
      })
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
  }
};
</script>

<style lang="scss">
  #employemanagement {
    .addstaff {
      float: left
    }
    .search {
      float: right;
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
