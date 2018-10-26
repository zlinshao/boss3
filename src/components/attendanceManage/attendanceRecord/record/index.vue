<template>
  <div id="attendanceRecord">
    <div class="topShow">
      <div class="title">
        <span>展示列：</span>
        <el-button type="primary" @click="collapseClick">{{collapse}}</el-button>
      </div>
      <el-checkbox-group v-model="checkList" v-show="this.collapse == '收起'">
        <el-checkbox :label="item.name" v-for="(item, index) in this.celeckList" :key="index" @change="selecked(item)" :disabled="item.disabled" :checked="item.disabled"></el-checkbox>
      </el-checkbox-group>
    </div>
    <div class="selectTime">
      <span>时间：</span>
      <el-date-picker v-model="valueTime" type="datetimerange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" size="small">
      </el-date-picker>
    </div>
    <div class="nameInput">
      <span>姓名：</span>
      <el-input v-model="inputName" placeholder="请输入内容" size="small"></el-input>
    </div>
    <div class="selectTips">
      <el-select v-model="selectValue" placeholder="请选择" size="small">
        <el-option v-for="item in selectOptions" :key="item.value" :label="item.label" :value="item.value">
        </el-option>
      </el-select>
    </div>
    <div class="resignation">
      <el-checkbox v-model="checked">离职员工(3个月以内)</el-checkbox>
    </div>
    <div class="btn">
      <el-button type="primary">确定</el-button>
      <el-button type="primary">同步考勤记录</el-button>
      <el-button type="primary">导出</el-button>
    </div>
    <div class="table">
      <el-table :data="tableData" border style="width: 100%">
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
  </div>
</template>

<script>
export default {
  // name: '考勤记录',
  data() {
    return {
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
        { name: "班次", prop: "shift", state: false, disabled: true },
        { name: "职位", prop: "position", state: false },
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
        { name: "下班缺卡次数", prop: "numberMissedCardsOffWork", state: false},
        { name: "旷工天数", prop: "daysCompletion", state: false },
        { name: "出差", prop: "travel", state: false },
        { name: "请假", prop: "leave", state: false }
      ],
      seleckedList: [
        { name: "工号", prop: "jobNumber", state: false },
        { name: "姓名", prop: "name", state: false },
        { name: "部门", prop: "department", state: false },
        { name: "班次", prop: "shift", state: false }
      ],
      selectOptions: [],
      selectValue: ''
    };
  },
  methods: {
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
      val.state = !val.state;
      return val.state
        ? this.seleckedList.push(val)
        : this.seleckedList.pop(val);
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
}
</style>

