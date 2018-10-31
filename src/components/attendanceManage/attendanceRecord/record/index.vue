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
    <!-- <div class="selectTime">
      <span>时间：</span>
      <el-date-picker v-model="valueTime" type="datetimerange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" size="mini">
      </el-date-picker>
    </div> -->
    <!-- <div class="nameInput">
      <span>姓名：</span>
      <el-input v-model="inputName" placeholder="请输入内容" size="mini"></el-input>
    </div> -->
    <!-- <div class="selectTips">
      <el-input v-model="follow_name" readonly="" @focus="openOrganizeModal" size="mini">
        <el-button slot="append" type="primary" @click="emptyFollowPeople">清空</el-button>
      </el-input>
    </div> -->
    <!-- <div class="resignation">
      <el-checkbox v-model="checked">离职员工(3个月以内)</el-checkbox>
    </div> -->
    <!-- <div class="btn">
      <el-button type="primary" size="mini">确定</el-button>
      <el-button type="primary" size="mini">同步考勤记录</el-button>
      <el-button type="primary" size="mini">导出</el-button>
    </div> -->
    <div class="table">
      <el-table :data="tableData" border style="width: auto;overflow-x:auto;">
        <el-table-column :prop="showItem.prop" :label="showItem.name" v-for="(showItem, index) in this.seleckedList" :key="index" :cell-class-name="getColor">
          <!-- <template slot-scope="scope"  v-if="scope.name == '加班存在异常'">
            <span style="color: #ef4292" >异常</span>
          </template> -->
          <el-table-column v-if="showItem.name == '上午上班'" label="打卡时间"></el-table-column>
          <el-table-column v-if="showItem.name == '上午上班'" label="打卡结果"></el-table-column>
          <el-table-column v-if="showItem.name == '上午下班'" label="打卡时间"></el-table-column>
          <el-table-column v-if="showItem.name == '上午下班'" label="打卡结果"></el-table-column>
          <el-table-column v-if="showItem.name == '下午上班'" label="打卡时间"></el-table-column>
          <el-table-column v-if="showItem.name == '下午上班'" label="打卡结果"></el-table-column>
          <el-table-column v-if="showItem.name == '下午下班'" label="打卡时间"></el-table-column>
          <el-table-column v-if="showItem.name == '下午下班'" label="打卡结果"></el-table-column>
          <el-table-column v-if="showItem.name == '加班'" label="正常加班（小时）"></el-table-column>
          <el-table-column v-if="showItem.name == '加班'" label="法定加班（小时）"></el-table-column>
          <el-table-column v-if="showItem.name == '请假'"  v-for="(day, index) in secondaryMenu" :key="index" :label="day.label" :prop="day.prop">
          </el-table-column>
        </el-table-column>
      </el-table>
    </div>
    <div class="block pages">
      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage" :page-sizes="[20, 100, 200, 300, 400]" :page-size="20" layout="total, sizes, prev, pager, next, jumper" :total="total">
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
        // { name: "工号", prop: "jobNumber", state: false, disabled: true },
        { name: "姓名", prop: "name", state: false, disabled: true },
        { name: "职位", prop: "roles", state: false, disabled: true },
        { name: "部门", prop: "org", state: false, disabled: true },
        { name: "应出勤总天数", prop: "should_attendance_day", state: false },
        { name: "实出勤总天数", prop: "real_attendance_day", state: false },
        { name: "休息天数", prop: "rest_attendance_day", state: false },
        { name: "迟到次数", prop: "late_num", state: false },
        { name: "迟到时长", prop: "late_minutes", state: false },
        { name: "严重迟到次数", prop: "serious_late_num", state: false },
        { name: "早退次数", prop: "early_num", state: false },
        { name: "早退时长", prop: "early_minutes", state: false },
        { name: "下班缺卡次数", prop: "pm_not_sign", state: false },
        { name: "旷工天数", prop: "absenteeism", state: false },
        { name: "加班存在异常", prop: "work_overtime_exception", state: false },
        { name: "加班天数", prop: "work_overtime_day", state: false },
        { name: "出差", prop: "business", state: false },
        { name: "请假", prop: "vacate", state: false }

        // { name: "上班缺卡次数", prop: "am_not_sign ", state: false },
        // { name: "打卡异常次数", prop: "punchAbnormality", state: false },
        // { name: "班次", prop: "shift", state: false },
        // { name: "日期", prop: "date", state: false },
        // { name: "上午上班", prop: "morningWork", state: false },
        // { name: "上午下班", prop: "morningOffWork", state: false },
        // { name: "下午上班", prop: "afternoonWork", state: false },
        // { name: "下午下班", prop: "afternoonOffWork", state: false },
        // { name: "打卡地址", prop: "punchAddress", state: false },
        // { name: "打卡设备", prop: "PunchCardEquipment", state: false },
        // { name: "数据来源", prop: "dataSources", state: false },
      ],
      seleckedList: [
        // { name: "工号", prop: "jobNumber", state: true },
        { name: "姓名", prop: "name", state: true },
        { name: "部门", prop: "org", state: true },
        { name: "职位", prop: "roles", state: true },
        // { name: "请假", prop: "vacate", state: false }
      ],
      // 请假二级菜单
      secondaryMenu:[ 
        {label:"事假", prop: "thingLeave"},
        {label: "病假", prop: "sickLeave"}, 
        {label: "年假", prop: "annualLeave"},
        {label: "调休", prop: "changeLeave"},
        {label: "婚假", prop: "marriageLeave"},
        {label: "产假", prop: "maternityLeave"},
        {label: "陪产假", prop: "paternityLeave"},
        {label: "路途假", prop: "roadLeave"},
        {label: "丧假", prop: "funeralLeave"},
       ],
       red: "",
      activeRed: false,
      workOvertime: '',
      selectValue: "",
      currentPage: 1,
      total: 0, //数据总条数
      leaveDay: [], // 请假天数
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
      this.params.follow_id = this.params.follow_id.substring(
        0,
        this.params.follow_id.length - 1
      );
      this.follow_name = this.follow_name.substring(
        0,
        this.follow_name.length - 1
      );
    },
    // 关闭模态框
    closeModal() {
      this.organizationDialog = false;
    },
    emptyFollowPeople() {
      this.params.follow_id = "";
      this.follow_name = "";
    },
    refresh() {
      this.$http.get(globalConfig.server + "attendance/summary").then(res => {
        console.log(res, "get11111111");
        if (res.data.code == "20000") {
          this.tableData = res.data.data.data;
          this.total = Number(res.data.data.count);
          this.workOvertime = this.tableData.work_overtime_exception 
          // console.log(this.tableData, '22222222');
          // console.log(this.tableData.work_overtime_exception, '111111111');
          // for(let i = 0; i < this.tableData.length; i++) {
          //   this.workOvertime = this.tableData[i].work_overtime_exception;
          // }
          let props = [
            "thingLeave",
            "sickLeave",
            "annualLeave",
            "changeLeave",
            "marriageLeave",
            "maternityLeave",
            "paternityLeave",
            "roadLeave",
            "funeralLeave"
          ]
          this.tableData.forEach((item, idx) => {
            //  this.tableData[idx].leaves = [];
            // item.vacate.forEach((key, index) => {
            //   let obj = {};
            //   obj.label = arr[index];
            //   obj.prop = props[index];
            //   obj.num = key;
            //   this.tableData[idx].leaves.push(obj);
            // });
            item.vacate.forEach((key, index) => {
              this.tableData[idx][props[index]] = key
            })
          });
        }
      });
    },
  },
  computed: {
    getColor() {
      console.log(this.workOvertime);
      this.seleckedList.forEach(item => {
        if(item.name == '加班存在异常') {
          if(!this.workOvertime) {
            // return 'style="background-color: red;"'
          }
        }
      })
    }
  },
  created() {
    this.refresh();
  },
  watch: {}
};
</script>

<style lang="scss">
#attendanceRecord {
  .red {
    border:  1px solid red;
    background-color: red;
  }
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

