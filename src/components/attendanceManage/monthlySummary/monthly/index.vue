<template>
  <div id="monthlySummary">
    <div class="topShow">
      <div class="title">
        <span>展示列：</span>
        <el-button type="primary" @click="collapseClick" size="small">{{collapse}}</el-button>
      </div>
      <el-checkbox-group v-model="checkList" v-show="this.collapse == '收起'">
        <el-checkbox :label="item.name" v-for="(item, index) in this.celeckList" :key="index" @change="selecked(item, index)" :disabled="item.disabled" :checked="item.disabled"></el-checkbox>
      </el-checkbox-group>
    </div>
    <div class="selectTime">
      <span>月份：</span>
      <el-select v-model="monthValue" placeholder="请选择" size="small">
        <el-option v-for="item in monthOptions" :key="item.value" :label="item.label" :value="item.value">
        </el-option>
      </el-select>
    </div>
    <div class="disclaimer">
      <el-checkbox v-model="disclaimerChecked">免除班次允许范围内的迟到次数</el-checkbox>
      <span>( <el-checkbox v-model="resignationChecked">包括离职员工</el-checkbox> )</span>
    </div>
    <div class="nameInput">
      <span>姓名：</span>
      <el-input v-model="inputName" placeholder="请输入内容" size="small"></el-input>
    </div>
    <div class="selectTips">
      <el-input v-model="follow_name" readonly="" @focus="openOrganizeModal" size="small">
        <el-button slot="append" type="primary" @click="emptyFollowPeople">清空</el-button>
      </el-input>
    </div>
    <div class="resignation">
      <el-checkbox v-model="checked">离职员工(3个月以内)</el-checkbox>
    </div>
    <div class="btn">
      <el-button type="primary" size="small">确定</el-button>
      <el-button type="primary" size="small">导出</el-button>
    </div>
    <div class="table">
      <el-table :data="tableData" border style="width: 100%" @cell-click="popUps" width ="auto">
        <el-table-column :prop="showItem.prop" :label="showItem.name" v-for="(showItem, index) in this.seleckedList" :key="index">
          <el-table-column v-if="showItem.name == '出勤班次'" label="早班" height="auto"></el-table-column>
          <el-table-column v-if="showItem.name == '出勤班次'" label="中班" height="auto"></el-table-column>
          <el-table-column v-if="showItem.name == '出勤班次'" label="晚班" height="auto"></el-table-column>
          <el-table-column v-if="showItem.name == '加班'" label="正常加班（小时）"></el-table-column>
          <el-table-column v-if="showItem.name == '加班'" label="法定加班（小时）"></el-table-column>
          <el-table-column v-if="showItem.name == '请假'" label="事假（小时）"></el-table-column>
          <el-table-column v-if="showItem.name == '请假'" label="病假（小时）"></el-table-column>
          <el-table-column v-if="showItem.name == '请假'" label="婚假（天）"></el-table-column>
          <el-table-column v-if="showItem.name == '请假'" label="丧假（天）"></el-table-column>
          <el-table-column v-if="showItem.name == '请假'" label="产假（天）"></el-table-column>
          <el-table-column v-if="showItem.name == '请假'" label="陪产假（天）"></el-table-column>
        </el-table-column>
      </el-table>
    </div>
    <div class="block pages">
      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage" :page-sizes="[20, 100, 200, 300, 400]" :page-size="20" layout="total, sizes, prev, pager, next, jumper" :total="400">
      </el-pagination>
    </div>
    <!-- 组织架构 -->
    <organization :organizationDialog="organizationDialog" :length="length" :type="type" @close='closeModal' @selectMember="selectMember"></organization>
    <!-- 迟到次数 -->
    <el-dialog :title="attendanceTitle" :visible.sync="beLate" width="30%" :before-close="handleClose">
      <el-table :data="beLateData" border style="width: 100%">
        <el-table-column prop="attendanceTime" label="考勤时间">
        </el-table-column>
        <el-table-column prop="nameTime" label="用户打卡时间">
        </el-table-column>
        <el-table-column prop="attendanceResult" label="考勤结果">
        </el-table-column>
        <el-table-column prop="beLateAttendanceShift" label="考勤班次">
        </el-table-column>
        <el-table-column label="操作" v-if="attendanceTimeLength">
          <el-button type="primary">修改为正常考勤</el-button>
        </el-table-column>
      </el-table>
      <span slot="footer" class="dialog-footer">
        <el-button @click="beLate = false">取 消</el-button>
        <el-button type="primary" @click="beLate = false">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import organization from "../../../common/organization"; //组织架构
export default {
  components: { organization },
  data() {
    return {
      beLate: false,
      params: {
        // 传递参数
        pages: 1,
        limit: 12,
        keywords: "",
        follow_status: "",
        follow_id: "",
        create_time: [],
        follow_time: "",
        update_time: "",
        finish_time: "",
        type: "",
        module: 1
      },
      follow_name: "", //跟进人
      //模态框
      organizationDialog: false,
      length: 0,
      type: "",
      organizeVisible: false, // 组织架构
      collapse: "收起",
      disclaimerChecked: false, // 免责次数
      resignationChecked: false, // 离职
      checkList: [],
      inputName: "",
      state1: "",
      checked: "",
      tableData: [
        {
          jobNumber: "11111",
          name: "小米1",
          department: "web",
          position: "web"
        },
        {
          jobNumber: "2222",
          name: "小米2",
          department: "java",
          position: "java"
        }
      ], // 表格数据
      celeckList: [
        { name: "工号", prop: "jobNumber", state: false, disabled: true },
        { name: "姓名", prop: "name", state: false, disabled: true },
        { name: "部门", prop: "department", state: false, disabled: true },
        { name: "职位", prop: "position", state: false, disabled: true },
        { name: "班次", prop: "shift", state: false },
        { name: "出勤天数", prop: "attendanceDays", state: false },
        { name: "出勤班次", prop: "attendanceShift", state: false },
        { name: "休息天数", prop: "restDay", state: false },
        { name: "迟到次数", prop: "lateArrivals", state: false },
        { name: "迟到时长", prop: "lateArrival", state: false },
        { name: "严重迟到次数", prop: "seriousLateArrivals", state: false },
        { name: "早退次数", prop: "earlyRetreat", state: false },
        { name: "早退时长", prop: "earlyDepartureTime", state: false },
        { name: "上班缺卡次数", prop: "numberMissedCardsWork", state: false },
        {
          name: "下班缺卡次数",
          prop: "numberMissedCardsOffWork",
          state: false
        },
        { name: "打卡异常次数", prop: "punchAbnormality", state: false },
        { name: "旷工天数", prop: "daysCompletion", state: false },
        { name: "出差", prop: "travel", state: false },
        { name: "请假", prop: "leave", state: false }
      ],
      seleckedList: [
        // 默认选中状态
        { name: "工号", prop: "jobNumber", state: true },
        { name: "姓名", prop: "name", state: true },
        { name: "部门", prop: "department", state: true },
        { name: "职位", prop: "position", state: true }
      ],
      selectValue: "",
      monthOptions: [], // 月份
      monthValue: "",
      currentPage: 1,
      beLateData: [], // 迟到汇总
      attendanceTitle: "", //迟到标题
      attendanceTimeLength: true // 迟到时长
    };
  },
  created() {
    this.monthOptions = this.getCurrentDate();
    this.monthValue =
      new Date().getFullYear() + "-" + (new Date().getMonth() + 1);
  },
  methods: {
    getCurrentDate() {
      let currentDate = new Date();
      let Y = currentDate.getFullYear();
      let M = currentDate.getMonth() + 1;
      let oldY = Y - 1;
      let oldM = M - 6;
      let a = 12;
      let month = [];
      for (let i = 0; i < 18; i++) {
        if (oldM == 12) {
          oldY = Y;
          oldM = 0;
        }
        oldM++;
        month.push({ value: oldY + "-" + oldM, label: oldY + "-" + oldM });
      }
      return month;
    },
    // 部门员工筛选
    openOrganize() {
      this.organizeVisible = true;
    },
    // 部门员工筛选
    closeOrganize() {
      this.organizeVisible = false;
    },
    collapseClick() {
      return (this.collapse = this.collapse == "收起" ? "展示" : "收起");
    },
    querySearch(queryString, cb) {
      var restaurants = this.restaurants;
      var results = queryString
        ? restaurants.filter(this.createFilter(queryString))
        : restaurants;
      // 调用 callback 返回建议列表的数据
      cb(results);
    },
    handleSelect(item) {
      console.log(item);
    },
    selecked(val, index) {
      val.state = !val.state;
      if (val.state) {
        this.seleckedList.push(val);
      } else {
        this.seleckedList.forEach(item => {
          if (!item.state) {
            this.seleckedList[this.seleckedList.indexOf(item)] = null;
            this.seleckedList.splice(this.seleckedList.indexOf(null), 1);
          }
        });
      }
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
    },
    //选人组件
    openOrganizeModal() {
      this.organizationDialog = true;
      this.type = "staff";
      this.length = 5;
    },
    selectMember(val) {
      this.type = "";
      this.length = "";
      val.forEach(item => {
        this.params.follow_id += item.id + ",";
        this.follow_name += item.name + ",";
      });
      this.params.follow_id = this.params.follow_id.substring(0, this.params.follow_id.length - 1);
      this.follow_name = this.follow_name.substring(0, this.follow_name.length - 1);
    },
    // 关闭模态框
    closeModal() {
      this.organizationDialog = false;
    },
    emptyFollowPeople() {
      this.params.follow_id = "";
      this.follow_name = "";
    },
    popUps(row, column, cell, event) {
      if (column.label == "迟到次数") {
        this.beLate = true;
        this.attendanceTitle = true
          row.name + "(" + row.jobNumber + ") 迟到次数汇总";
      } else if (column.label == "迟到时长") {
        this.beLate = true;
        this.attendanceTimeLength = false;
        this.attendanceTitle =
          row.name + "(" + row.jobNumber + ") 迟到时长汇总";
      } else if (column.label == "严重迟到次数") {
        this.beLate = true;
        this.attendanceTimeLength = false;
        this.attendanceTitle =
          row.name + "(" + row.jobNumber + ") 严重迟到汇总";
      } else if (column.label == "早退次数") {
        this.beLate = true;
        this.attendanceTimeLength = false;
        this.attendanceTitle = row.name + "(" + row.jobNumber + ") 早退汇总";
      } else if (column.label == "早退时长") {
        this.beLate = true;
        this.attendanceTimeLength = false;
        this.attendanceTitle =
          row.name + "(" + row.jobNumber + ") 早退时长汇总";
      } else if (column.label == "上班缺卡次数") {
        this.beLate = true;
        this.attendanceTimeLength = false;
        this.attendanceTitle =
          row.name + "(" + row.jobNumber + ") 上班缺卡次数汇总";
      } else if (column.label == "下班缺卡次数") {
        this.beLate = true;
        this.attendanceTimeLength = false;
        this.attendanceTitle =
          row.name + "(" + row.jobNumber + ") 下班缺卡次数汇总";
      } else if (column.label == "旷工天数") {
        this.beLate = true;
        this.attendanceTimeLength = false;
        this.attendanceTitle =
          row.name + "(" + row.jobNumber + ") 旷工天数汇总";
      }
    },
    // 关闭弹窗
    handleClose(done) {
      this.$confirm("确认关闭？")
        .then(_ => {
          done();
        })
        .catch(_ => {});
    }
  }
};
</script>

<style lang="scss">
#monthlySummary {
  .title {
    float: left;
  }
  .topShow {
    margin-bottom: 10px;
    min-height: 58px;
  }
  .el-checkbox-group {
    width: 90%;
    display: inline-block;
    margin-left: 10px;
  }
  .el-checkbox-group .el-checkbox {
    margin-bottom: 10px;
  }
  .selectTime,
  .nameInput,
  .selectTips,
  .resignation,
  .btn,
  .disclaimer {
    display: inline-block;
    vertical-align: top;
  }
  .disclaimer {
    margin-left: 10px;
  }
  .nameInput {
    margin: 0 40px;
  }
  .nameInput .el-input {
    width: auto;
  }
  .resignation {
    margin-left: 10px;
    margin-right: 10px;
  }
  .table {
    margin-top: 10px;
  }
  .has-gutter {
    max-height: 72px;
    padding: 0;
  }
}
</style>
