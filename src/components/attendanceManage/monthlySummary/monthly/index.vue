<template>
  <div id="monthlySummary">
    <!-- {{params}} -->
    <div class="topShow">
      <div class="title">
        <span>展示列：</span>
        <el-button type="primary" @click="collapseClick" size="mini">{{collapse}}</el-button>
      </div>
      <el-checkbox-group v-model="checkList" v-show="this.collapse == '收起'">
        <el-checkbox :label="item.name" v-for="(item, index) in this.celeckList" :key="index" @change="selecked(item, index)" :disabled="item.disabled" :checked="item.disabled"></el-checkbox>
      </el-checkbox-group>
    </div>
    <div class="selectTime">
      <span>月份：</span>
      <el-select v-model="params.arrange_month" placeholder="请选择" size="mini">
        <el-option v-for="item in monthOptions" :key="item.value" :label="item.label" :value="item.value">
        </el-option>
      </el-select>
    </div>
    <div class="disclaimer">
      <!-- <el-checkbox v-model="is_dimissionNum" @change="retired">免除班次允许范围内的迟到次数</el-checkbox> -->
      <el-checkbox v-model="is_dimissionNum" @change="retired">包括离职员工</el-checkbox>
    </div>
    <!-- <div class="nameInput">
      <span>姓名：</span>
      <el-input v-model="params.org_id" placeholder="请输入内容" size="mini"></el-input>
    </div>  -->
    <div class="selectTips">
      <span>部门：</span>
      <el-input v-model="follow_name" readonly="" @focus="openOrganizeModal()" size="mini">
        <el-button slot="append" type="primary" @click="emptyFollowPeople">清空</el-button>
      </el-input>
    </div>
    <!-- <div class="resignation">
      <el-checkbox v-model="checked">离职员工(3个月以内)</el-checkbox>
    </div> -->
    <!-- 搜索 -->
    <div class="search">
      <span>搜索：</span>
      <el-input v-model="params.search" placeholder="请输入搜索内容" size="mini" @keydown.enter="refresh()"></el-input>
    </div>
    <div class="btn">
      <el-button type="primary" size="mini" @click="searchRecord">确定</el-button>
      <!-- <el-button type="primary" size="mini">导出</el-button>  -->
    </div>
    <!-- 查看列表  -->
    <div class="exportList">
      <el-button type="primary" size="mini" @click="lookList">查看列表</el-button>
    </div>
    <!-- 导出弹出框 -->
    <el-dialog title="导出列表框" :visible.sync="lookListDialog" width="50%">
      <el-table :data="exportListData" border style="width: 100%">
        <el-table-column prop="user.name" label="用户名">
        </el-table-column>
        <el-table-column prop="create_time" label="导出时间">
        </el-table-column>
        <el-table-column prop="update_time" label="导出完成时间" >
          <template slot-scope="scope">
            <div v-if="scope.row.ifStatus =='1'">{{scope.row.update_time}}</div>
          </template>
        </el-table-column>
        <el-table-column prop="status" label="导出结果">
        </el-table-column>
        <el-table-column prop="sort_user_count" label="人数">
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button type="primary" @click="download(scope.row)" size="mini" :disabled="scope.row.file_id ? false : true">下载</el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页 -->
     <div class="dialogPage block pages">
      <!--  :current-page="" :page-size="params.limit" -->
      <el-pagination @size-change="dialogHandleSizeChange" @current-change="dialogHandleCurrentChange" :current-page="params.page" :page-sizes="[12,24, 36,48]" :page-size="params.limit" layout="total, sizes, prev, pager, next, jumper" :total="dialogTotal">
      </el-pagination>
    </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="lookListDialog = false" size="mini">取 消</el-button>
        <el-button type="primary" @click="exportList" size="mini">导 出</el-button>
      </span>
    </el-dialog>
    <!-- 列表  -->
    <div class="table">
      <!-- <el-table :data="tableData" border  @cell-click="popUps" > -->
      <el-table :data="tableData" border ref="crayTable">
        <el-table-column :prop="showItem.prop" :label="showItem.name" v-for="(showItem, index) in this.seleckedList" :key="index">
          <el-table-column v-if="showItem.name == '出勤班次'" label="早班" height="auto"></el-table-column>
          <el-table-column v-if="showItem.name == '出勤班次'" label="中班" height="auto"></el-table-column>
          <el-table-column v-if="showItem.name == '出勤班次'" label="晚班" height="auto"></el-table-column>
          <el-table-column v-if="showItem.name == '加班'" label="正常加班（小时）"></el-table-column>
          <el-table-column v-if="showItem.name == '加班'" label="法定加班（小时）"></el-table-column>
          <el-table-column v-if="showItem.name == '请假'" v-for="(day, ind) in secondaryMenu" :key="ind" :label="day.label" :prop="day.prop"></el-table-column>

        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button type="primary" size="mini" @click="getAttendance(scope.row)">查看当月考勤</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="block pages">
      <!--  :current-page="" :page-size="params.limit" -->
      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="params.page" :page-sizes="[12,24, 36,48]" :page-size="params.limit" layout="total, sizes, prev, pager, next, jumper" :total="total">
      </el-pagination>
    </div>
    <!-- 组织架构 -->
    <organization :organizationDialog="organizationDialog" :length="length" :type="type" @close='closeModal' @selectMember="selectMember"></organization>
    <!-- 查看当月考勤 -->
    <el-dialog :title="attendanceName+ params.arrange_month +'的考勤记录'" :visible.sync="attendanceMonth" width="50%" :before-close="attendanceDialog">
      <el-table :data="newAttendanceData" height="80%" border style="width: auto">
        <el-table-column prop="date" label="日期">
        </el-table-column>
        <el-table-column prop="workShift" label="上班排班">
        </el-table-column>
        <el-table-column prop="workOffShift" label="下班排班">
        </el-table-column>
        <el-table-column prop="hugh" label="休息">
        </el-table-column>
        <el-table-column prop="goWork" label="上班打卡">
        </el-table-column>
        <el-table-column prop="resultWork" label="打卡结果">
        </el-table-column>
        <el-table-column prop="goOffWork" label="下班打卡">
        </el-table-column>
        <el-table-column prop="resultOffWork" label="打卡结果">
        </el-table-column>
      </el-table>
      <span slot="footer" class="dialog-footer">
        <!-- <el-button @click="attendanceMonth = false" size="mini">取 消</el-button> -->
        <el-button type="primary" @click="attendanceMonth = false" size="mini">确 定</el-button>
      </span>
    </el-dialog>
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
        <el-button @click="beLate = false" size="mini">取 消</el-button>
        <el-button type="primary" @click="beLate = false" size="mini">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import organization from "../../../common/organization"; //组织架构
import { setInterval } from 'timers';
import { log } from 'util';
export default {
  components: { organization },
  data() {
    return {
      ifStatus: "",
      dialogTotal: 0,
      uploadBtn: false,
      externalLink: [],
      exportListData: [],
      lookListDialog: false,
      beLate: false,
      is_dimissionNum: false,
      params: {
        // 传递参数
        limit: 12,
        page: 1,
        org_id: [],
        search: "",
        arrange_month: "",
        is_dimission: '0'    // 离职人员
      },
      follow_name: "", //跟进人
      follow_id: "", // 部门ID
      //模态框
      organizationDialog: false,
      length: 0,
      type: "",
      organizeVisible: false, // 组织架构
      collapse: "收起",
      disclaimerChecked: false, // 免责次数
      checkList: [],
      inputName: "",
      state1: "",
      checked: "",
      tableData: [], // 表格数据
      celeckList: [
        // { name: "工号", prop: "jobNumber", state: false, disabled: true },
        { name: "姓名", prop: "name", state: false, disabled: true },
        { name: "职位", prop: "roles", state: false, disabled: true },
        { name: "部门", prop: "org", state: false, disabled: true },
        { name: "请假", prop: "vacate", state: false },
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
        { name: "出差", prop: "business", state: false }
      ],
      seleckedList: [
        // 默认选中状态
        // { name: "工号", prop: "jobNumber", state: true },
        { name: "姓名", prop: "name", state: true },
        { name: "部门", prop: "org", state: true },
        { name: "职位", prop: "roles", state: true }
        // { name: "请假", prop: "vacate", state: true },
      ],
      // 请假二级菜单
      secondaryMenu: [
        { label: "事假", prop: "thingLeave" },
        { label: "病假", prop: "sickLeave" },
        { label: "年假", prop: "annualLeave" },
        { label: "调休", prop: "changeLeave" },
        { label: "婚假", prop: "marriageLeave" },
        { label: "产假", prop: "maternityLeave" },
        { label: "陪产假", prop: "paternityLeave" },
        { label: "路途假", prop: "roadLeave" },
        { label: "丧假", prop: "funeralLeave" }
      ],
      total: 0, //数据总条数
      selectValue: "",
      monthOptions: [], // 月份
      // monthValue: "",
      currentPage: 1,
      beLateData: [], // 迟到汇总
      attendanceTitle: "", //迟到标题
      attendanceTimeLength: true, // 迟到时长
      attendanceMonth: false, // 当月考勤
      newAttendanceData: [], // 考勤数据
      attendanceName: "",   // 考勤名字
    };
  },
  created() {
    this.monthOptions = this.getCurrentDate();
    this.params.arrange_month =
      new Date().getFullYear() + "-" + (new Date().getMonth() + 1);
    this.refresh();
    // 回车事件
    let _this = this;
    document.onkeydown = e => {
      let key = window.event.keyCode;
      if (key == 13) {
        _this.params.page = 1;
        _this.params.limit = 5;
        _this.refresh();
      }
    };
    // window.InitSetInterval = setInterval(_this.lookList(), 5000)
  },
  destroyed() {
    // clearInterval(window.InitSetInterval)
  },
  methods: {
    retired(val) {
      if(this.is_dimissionNum) {
        this.params.is_dimission = "1";
      } else {
        this.params.is_dimission = '0';
      }
    },
    //当月考勤
    getAttendance(val) {
      this.newAttendanceData = val.attendanceData;
      this.attendanceName = val.name;
      this.attendanceMonth = true

    },
    searchRecord() {
      this.params.page = 1;
      this.params.limit = 12;
      this.refresh();
    },
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
    selecked(val, index) {
      val.state = !val.state;
      if (val.state) {
        // if(val.name == "请假") {
        //   this.seleckedList.push(val);
        // } else {
        //   this.seleckedList.splice(3, 0, val)
        // }
        this.seleckedList.push(val);
      } else {
        this.seleckedList.forEach(item => {
          if (!item.state) {
            this.seleckedList[this.seleckedList.indexOf(item)] = null;
            this.seleckedList.splice(this.seleckedList.indexOf(null), 1);
          }
        });
      }
      this.$refs.crayTable.updateScrollY();
      // this.$refs.crayTable.doLayout();
      // this.$refs.crayTable.resizeListener();
    },
    handleSizeChange(val) {
      this.params.limit = val;
      this.refresh(this.params.limit);
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      this.params.page = val;
      this.refresh(this.params.page);
      console.log(`当前页: ${val}`);
    },
    // 弹出框分页
    dialogHandleSizeChange(val) {
       this.params.limit = val;
       this.lookList(this.params.limit)
       console.log(`每页 ${val} 条`);
    },
    dialogHandleCurrentChange(val) {
      this.params.page = val;
      this.lookList(this.params.page);
      console.log(`当前页: ${val}`);
    },
    //选人组件
    openOrganizeModal(id) {
      // this.params.org_id = id;
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
      let arr = [];
      let str = "";
      val.forEach((item, index) => {
       arr.push(item.id);
        str += item.name + ",";
      });
      this.follow_name = str;
      this.params.org_id = arr;
      // this.params.org_id = this.follow_id.substring(
      //   0,
      //   this.follow_id.length - 1
      // );
      // this.params.org_id = this.follow_id;
      this.follow_name = this.follow_name.substring(
        0,
        this.follow_name.length - 1
      );
    },
    // 关闭模态框
    closeModal() {
      this.organizationDialog = false;
      // this.params.org_id = this.follow_id
    },
    emptyFollowPeople() {
      this.follow_id = "";
      this.params.org_id = [];
      this.follow_name = "";
    },
    // 弹窗
    popUps(row, column, cell, event) {
      if (column.label == "迟到次数") {
        this.beLate = true;
        this.attendanceTitle = true;
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
    },
    refresh(page) {
      // console.log(this.params)
      this.$http
        .get(globalConfig.server + "attendance/summary", {
          params: this.params
        })
        .then(res => {
          if (res.data.code == "20000") {
            this.tableData = res.data.data.data;
            this.total = Number(res.data.data.count);
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
            ];
            // 请假
            this.tableData.forEach((item, idx) => {
              item.vacate.forEach((key, index) => {
                this.tableData[idx][props[index]] = key;
              });
            });
            // 部门
            let orgArr = [];
            let rolesArr = [];
            this.tableData.forEach((item, idx) => {
              if (item.org.length > 0) {
                item.org.forEach((key, index) => {
                  orgArr.push(key.name);
                });
                this.tableData[idx].org = orgArr.join(",");
                orgArr = [];
              } else {
                orgArr.push("/");
                this.tableData[idx].org = orgArr.join(",");
                orgArr = [];
              }
            });
            // 职位
            this.tableData.forEach((item, ind) => {
              if (item.roles.length > 0) {
                item.roles.forEach((key, index) => {
                  rolesArr.push(key.description);
                  this.tableData[ind].roles = rolesArr.join(",");
                  rolesArr = [];
                });
              } else {
                rolesArr.push("/");
                this.tableData[ind].roles = rolesArr.join(",");
                rolesArr = [];
              }
            });
            // [{date: "2018-11-8", attendance: "早班", goWork: "8:45", resultWork: "正常", goOffWork: "6:30", resultOffWork: "正常", supplementary: "补卡",field: "外勤", "workShift": 9:00, "workOffShift": 18:00}]
            let attendanceObj = null;
            let attendanceArr = null;
            this.tableData.forEach((item, index) => {
              attendanceArr = [];
              item.sort_dimension.forEach((key, ind) => {
                attendanceObj = {};
                let currentAttendance = false;  // 今天是否有排班
                let currentMon = false;   // 早上是否有 实际打卡
                let currentWan = false;// 下班是否有 实际打卡
                key.forEach((d, f) => {
                  if(d.event_attribute == 3) {
                    currentAttendance = true;  // 今日已排班
                  }
                  if(d.event_attribute == 1) {
                        currentMon = true;
                  }
                  if(d.event_attribute == 2) {
                        currentWan = true;
                  }
                })
                if(currentAttendance  && !currentMon ){
                    attendanceObj.resultWork = "缺卡"
                }
                if(currentAttendance  && !currentWan){
                    attendanceObj.resultOffWork = "缺卡"
                }

                key.forEach((a, b) => {
                  attendanceObj.date = a.sign_date;
                  if(a.event_attribute == 1) {
                    if(a.status == 0)  {
                      attendanceObj.resultWork = "正常"  // 上班打卡正常
                       key.forEach((c, d) => {
                        if(c.event_attribute == 5) {
                          attendanceObj.resultWork = "休息并打卡";
                        }
                      })
                    } else if(a.status == 1) {
                       attendanceObj.resultWork = "迟到"
                    } 
                    attendanceObj.goWork = a.dimensions.hour + ":" + a.dimensions.minute;       // 上班时间
                  } else if(a.event_attribute == 2) {
                    if(a.status == 0)  {
                      attendanceObj.resultOffWork = "正常"   // 下班打卡正常
                      key.forEach((c, d) => {
                        if(c.event_attribute == 5) {
                          attendanceObj.resultOffWork = "休息并打卡";
                        }
                      })
                    }else if(a.status == 2) {
                      attendanceObj.resultWork = "早退"
                    }
                    attendanceObj.goOffWork = a.dimensions.hour + ":" + a.dimensions.minute;  // 下班时间
                  } else if(a.event_attribute == 3) {
                    attendanceObj.workShift = a.dimensions.hour + ":" + a.dimensions.minute;  // 上班排班时间
                  } else if(a.event_attribute == 4) {
                    attendanceObj.workOffShift = a.dimensions.hour + ":" + a.dimensions.minute;  // 下班班排版时间
                  } else if(a.event_attribute == 5) {
                    attendanceObj.hugh = "休息";
                    if(key.length >1) {
                      attendanceObj.resultWork = "休息并打卡";
                    }
                  } 
                  if(a.status == 3) {
                    attendanceObj.resultOffWork = "补卡"
                  } else if(a.status == 4) {
                    if(a.event_attribute == 3) {
                      attendanceObj.resultWork = "外勤"
                    } else if(a.event_attribute == 4) {
                      attendanceObj.resultOffWork = "外勤"
                    }
                  }
                })
                  attendanceArr.push(attendanceObj)
                  this.tableData[index].attendanceData =  attendanceArr
              });
            });
          } else if (res.data.code == "20001") {
            this.$notify.warning({
              title: "警告",
              message: res.data.msg
            });
          }
        });
    },
    // 当月考勤
    attendanceDialog() {
      this.attendanceMonth = false;
    },
    // 查看列表
    lookList() {
      this.lookListDialog = true;
      this.$http.get(globalConfig.server + "attendance/summary/excel-list",{params: this.params}).then(res => {
        if(res.data.code == "20000") {
          this.exportListData = res.data.data;
          this.dialogTotal = res.data.num;
          this.exportListData.forEach((item, index) => {
            if(item.status == "1") {
              this.exportListData[index]["ifStatus"] = item.status;
              item.status = "导出完成";
              this.uploadBtn = false;
            } else {
              this.exportListData[index]["ifStatus"] = item.status;
              this.uploadBtn = true;
              item.status = "正在导出";
              // clearInterval(window.InitSetInterval)
            }
          })
        }
      })
    },
    // 导出Excel表
    exportList() {
      this.$http.post(globalConfig.server + "attendance/summary/excel",this.params).then(res => {
        if(res.data.code == "20000") {
          this.$notify.success({
            title: "成功",
            message: res.data.msg
          })
          this.lookList();
        } else {
          this.$notify.warning({
            title: "失败",
            message: res.data.msg
          })
        }
      })
    },
    // 下载
    download(val) {
      window.open(val.file_id);
    },

  }
};
</script>

<style lang="scss">
// @import '../../../../assets/css/common.scss';
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
  .disclaimer,
  .search {
    display: inline-block;
    vertical-align: top;
    margin-right: 10px;
  }
  .search {
    padding-top: 0;
  }
  .selectTips {
    span {
      display: inline-block;
      margin-top: 2px;
    }
    .el-input-group {
      width: 84%;
      float: right;
    }
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
  .search .el-input {
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
  .exportList {
    float: right;
  }
  .dialogPage {
    .el-pagination__sizes {
      width: 100px;
    }
    .el-pagination__jump {
      margin-left: 0px;
    }
    .is-in-pagination {
      width: 40px;
    }
  }
}
</style>
