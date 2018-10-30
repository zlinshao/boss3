<template>
  <div id="attendanceRecord">
    <div class="topShow">
      <div class="title">
        <span>展示列：</span>
        <el-button type="primary" @click="collapseClick" size="mini">{{collapse}}</el-button>
      </div>
      <el-checkbox-group v-model="checkList" v-show="this.collapse == '收起'">
        <el-checkbox :label="item.name" v-for="(item, index) in this.celeckList" :key="index" @change="selecked(item)" :disabled="item.disabled" :checked="item.disabled"></el-checkbox>
      </el-checkbox-group>
    </div>
    <div class="selectTime">
      <span>时间：</span>
      <el-date-picker v-model="valueTime" type="datetimerange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" size="mini">
      </el-date-picker>
    </div>
    <div class="nameInput">
      <span>姓名：</span>
      <el-input v-model="inputName" placeholder="请输入内容" size="mini"></el-input>
    </div>
    <div class="selectTips">
      <el-input v-model="follow_name" readonly="" @focus="openOrganizeModal" size="mini">
        <el-button slot="append" type="primary" @click="emptyFollowPeople">清空</el-button>
      </el-input>
    </div>
    <div class="resignation">
      <el-checkbox v-model="checked">离职员工(3个月以内)</el-checkbox>
    </div>
    <div class="btn">
      <el-button type="primary" size="mini">确定</el-button>
      <el-button type="primary" size="mini">同步考勤记录</el-button>
      <el-button type="primary" size="mini">导出</el-button>
    </div>
    <div class="table">
      <el-table :data="tableData" border style="width: auto;overflow-x:auto;">
        <el-table-column :prop="showItem.prop" :label="showItem.name" v-for="(showItem, index) in this.seleckedList" :key="index">
          <el-table-column v-if="showItem.name == '上午上班'" label="打卡时间"></el-table-column>
          <el-table-column v-if="showItem.name == '上午上班'" label="打卡结果"></el-table-column>
          <el-table-column v-if="showItem.name == '上午下班'" label="打卡结果"></el-table-column>
          <el-table-column v-if="showItem.name == '上午下班'" label="打卡结果"></el-table-column>
          <el-table-column v-if="showItem.name == '下午上班'" label="打卡结果"></el-table-column>
          <el-table-column v-if="showItem.name == '下午上班'" label="打卡结果"></el-table-column>
          <el-table-column v-if="showItem.name == '下午下班'" label="打卡结果"></el-table-column>
          <el-table-column v-if="showItem.name == '下午下班'" label="打卡结果"></el-table-column>
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
    <!-- 组织结构 -->
    <organization :organizationDialog="organizationDialog" :length="length" :type="type" @close='closeModal' @selectMember="selectMember"></organization>
  </div>
</template>

<script>
import organization from "../../../common/organization"; // 组织架构
export default {
  // name: '考勤记录',
  components: { organization },
  data() {
    return {
      params: {
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
      checkList: [],
      valueTime: [
        new Date(2000, 10, 10, 10, 10),
        new Date(2000, 10, 11, 10, 10)
      ],
      inputName: "",
      state1: "",
      checked: "",
      tableData: [],
      celeckList: [
        { name: "工号", prop: "jobNumber", state: false, disabled: true },
        { name: "姓名", prop: "name", state: false, disabled: true },
        { name: "部门", prop: "department", state: false, disabled: true },
        { name: "职位", prop: "position", state: false, disabled: true },
        { name: "班次", prop: "shift", state: false },
        { name: "日期", prop: "date", state: false },
        { name: "休息天数", prop: "restDay", state: false },
        { name: "上午上班", prop: "morningWork", state: false },
        { name: "上午下班", prop: "morningOffWork", state: false },
        { name: "下午上班", prop: "afternoonWork", state: false },
        { name: "下午下班", prop: "afternoonOffWork", state: false },
        { name: "打卡地址", prop: "punchAddress", state: false },
        { name: "打卡设备", prop: "PunchCardEquipment", state: false },
        { name: "数据来源", prop: "dataSources", state: false },
        { name: "打卡异常次数", prop: "punchAbnormality", state: false },
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
        { name: "旷工天数", prop: "daysCompletion", state: false },
        { name: "出差", prop: "travel", state: false },
        { name: "请假", prop: "leave", state: false }
      ],
      seleckedList: [
        { name: "工号", prop: "jobNumber", state: true },
        { name: "姓名", prop: "name", state: true },
        { name: "部门", prop: "department", state: true },
        { name: "职位", prop: "position", state: true }
      ],
      selectValue: "",
      currentPage: 1
    };
  },
  methods: {
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
    selecked(val) {
      // 选择和删除选项
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
    }
  }
};
</script>

<style lang="scss">
#attendanceRecord {
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
  .btn {
    display: inline-block;
    vertical-align: top;
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
  }
}
</style>

