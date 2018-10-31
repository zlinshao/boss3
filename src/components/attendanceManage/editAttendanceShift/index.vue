<template>
  <div @click="show = false" @contextmenu="closeMenu">
    <div id="editAttendanceShift">
      <!-- 添加班次 -->
      <div class="addAttendanceShift">
        <el-button type="primary" size="mini" @click="addAttendanceShift()">添加班次</el-button>
      </div>
      <!-- 列表 -->
      <el-table :data="tableData" border style="width: 100%" @row-contextmenu="deleteAttendance">
        <el-table-column prop="alias" label="班次代号" width="140%">
        </el-table-column>
        <el-table-column prop="name" label="班次名称" width="140%">
        </el-table-column>
        <el-table-column prop="province" label="考勤时间">
        </el-table-column>
        <el-table-column label="操作" width="200%">
          <template slot-scope="scope">
            <el-button type="primary" @click="editAttendanceShift(scope.row.alias, scope.row.name, scope.row.id)" size="mini">编辑</el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页 -->
      <div class="block pages">
        <!--  :current-page="" :page-size="params.limit" -->
        <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="params.page" :page-sizes="[20, 100, 200, 300, 400]" :page-size="params.limit" layout="total, sizes, prev, pager, next, jumper" :total="dataTotal">
        </el-pagination>
      </div>
      <!-- 编辑考勤班次 -->
      <el-dialog :title="checkTitle? '编辑考勤班次' : '添加考勤班次'" :visible.sync="editAttendance" width="34%">
        <!-- 表达内容 -->
        <el-form ref="form" :model="form" label-width="80px" :rules="rules" onsubmit="return false">
          <el-form-item label="班次名称" class="shiftName" prop="name">
            <el-input v-model="form.name" size="small"></el-input>
            <!-- <el-select v-model="form.name" placeholder="请选择班次名称" size="mini">
              <el-option v-for="item in nameOptions" :key="item.value" :label="item.label" :value="item.value">
              </el-option>
            </el-select> -->
          </el-form-item>
          <el-form-item label="班次代号" class="shiftCode" prop="alias">
            <el-input v-model="form.alias" size="small"></el-input>
            <!-- <el-select v-model="form.alias" placeholder="请选择班次代号" size="mini">
              <el-option v-for="item in  aliasOptions" :key="item.value" :label="item.label" :value="item.value">
              </el-option>
            </el-select> -->
          </el-form-item>
          <!-- <el-form-item label="打卡方式" class="punchMode" prop="punchMode">
          <div class="punchBorad">
            <el-radio-group v-model="punchMode">
              <el-radio :label="1">一天二次打卡</el-radio>
              <el-radio :label="2">一天四次打卡</el-radio>
            </el-radio-group>
          </div>
        </el-form-item> -->
          <el-form-item label="上班时间" class="workingHours" prop="morning_work_time" size="mini">
            <el-time-select v-model="form.morning_work_time" :picker-options="{
              start: '01:00',
              step: '1:00',
              end: '24:00'
            }" placeholder="选择时间" class="workingHours">
            </el-time-select>
            <!-- <span>可提前</span>
          <el-input v-model="form.workingTimeBefore" size="mini"></el-input>
          <span>分钟打卡</span> -->
          </el-form-item>
          <el-form-item label="下班时间" class="workingHours" prop="pm_rest_time" size="mini">
            <el-time-select v-model="form.pm_rest_time" :picker-options="{
              start: '01:00',
              step: '1:00',
              end: '24:00'
            }" placeholder="选择时间" class="workingHours">
            </el-time-select>
            <!-- <span>可延迟</span>
          <el-input v-model="form.workingOffTimeAfter" size="mini"></el-input>
          <span>分钟打卡</span> -->
          </el-form-item>
          <!-- <el-form-item label="休息时间" class="workingRest">
          <span>从</span>
          <el-time-select v-model="form.workingRest1" :picker-options="{
              start: '12:00',
              end: '18:00'
            }" placeholder="选择时间" size="mini">
          </el-time-select>
          <span>到</span>
          <el-time-select v-model="form.workingRest2" :picker-options="{
              start: '12:00',
              end: '18:00'
            }" placeholder="选择时间" size="mini">
          </el-time-select>
        </el-form-item> -->
          <!-- <el-form-item class="totalTime">
          <span>工作时长总计</span>
          <el-input v-model="form.totalTime" size="small"></el-input>
          <span style="margin-left: 10px">时</span>
          <el-input v-model="form.totalMin" size="small"></el-input>
          <span style="margin-left: 10px">分钟</span>
          <span>（考勤统计工作时长及请假调休加班统计，以此时间为准）</span>
        </el-form-item> -->
          <!-- <el-form-item class="workingPunch">
          <el-checkbox v-model="form.workingPunch">上班不用打卡<span style="margin-left: 20px">(开启后，上班不打卡也不会记作考勤异常)</span></el-checkbox>
          <el-checkbox v-model="form.workingOffPunch">下班不用打卡<span style="margin-left: 20px">(开启后，下班不打卡也不会记作考勤异常)</span></el-checkbox>
        </el-form-item> -->
          <!-- <el-form-item class="beLateMin">
          <p class="bigWidth">一个月内每次允许迟到分钟数</p>
          <el-input v-model="form.beLateMin" size="small" class="samllWidth"></el-input>
        </el-form-item>
        <el-form-item class="beLateTotal">
          <p class="bigWidth">一个月内每次允许迟到次数</p>
          <el-input v-model="form.beLateTotal" size="small" class="samllWidth"></el-input>
        </el-form-item> -->
          <el-form-item class="beLateSeriousMin error" prop="warring_late_minute">
            <p class="bigWidth">严重迟到分钟数</p>
            <el-input v-model="form.warring_late_minute" size="mini" class="samllWidth"></el-input>
          </el-form-item>
          <el-form-item class="beLateSeriousMin error" prop="relief_late_minute">
            <p class="bigWidth">免责迟到分钟数</p>
            <el-input v-model="form.relief_late_minute" size="mini" class="samllWidth"></el-input>
          </el-form-item>
          <el-form-item class="completionBan error" prop="cheat_half_minute">
            <p class="bigWidth">旷工半天迟到分钟数</p>
            <el-input v-model="form.cheat_half_minute" size="mini" class="samllWidth"></el-input>
          </el-form-item>
          <el-form-item class="completionDay error" prop="cheat_day_minute">
            <p class="bigWidth">旷工一天迟到分钟数</p>
            <el-input v-model="form.cheat_day_minute" size="mini" class="samllWidth"></el-input>
          </el-form-item>
          <el-form-item class="btn">
            <el-button @click="cancelAttendance()" size="mini">取 消</el-button>
            <!-- 编辑 -->
            <el-button type="primary" @click="editAttendanceSubmit()" size="mini" v-if="editShow">确 定</el-button>
            <!-- 新增 -->
            <el-button type="primary" @click="addAttendanceSubmit()" size="mini" v-if="determineShow">确 定</el-button>
          </el-form-item>
        </el-form>
      </el-dialog>
      <!-- 右键删除 -->
      <RightMenu :startX="rightMenuX+'px'" :startY="rightMenuY+'px'" :list="lists" :show="show" @clickOperate="clickEvent"></RightMenu>
    </div>
  </div>
</template>

<script>
import RightMenu from "../../common/rightMenu.vue";
export default {
  // name: '编辑班次',
  components: { RightMenu },
  data() {
    let checkShiftName = (rule, value, callback) => {
      if (value == this.judgeName && !value) {
        callback(new Error("请填写名称或该名称已经存在"));
      } else {
        callback();
      }
    };
    let checkShiftCode = (rule, value, callback) => {
      if (value == this.judgeAlias && !value) {
        callback(new Error("该班次已经存在"));
      } else {
        callback();
      }
    };
    let checkPmTime = (rule, value, callback) => {
      if (!value) {
        callback(new Error("请选择时间"));
      } else {
        callback();
      }
    };
    let checkAmTime = (rule, value, callback) => {
      if (!value) {
        callback(new Error("请选择时间"));
      } else {
        callback();
      }
    };
    let checkRelief = (rule, value, callback) => {
      let checkNum = /^[\d|\.]*$/;
      if (!value || !checkNum.test(value)) {
        callback(new Error("请输入数字或者有效数字"));
      } else {
        callback();
      }
    };
    return {
      nameOptions: [
        { value: "早班", label: "早班" },
        { value: "正常班", label: "正常班" },
        { value: "晚班", label: "晚班" },
        { value: "休息", label: "休息" }
      ],
      aliasOptions: [
        { value: "A", label: "A" },
        { value: "B", label: "B" },
        { value: "C", label: "C" },
        { value: "休", label: "休" }
      ],
      tableData: [],
      rules: {
        name: [
          { required: true, message: "请输入班次名称", trigger: "change" },
          { required: true, validator: checkShiftName, trigger: "change" }
        ],
        alias: [
          { required: true, message: "请输入班次代号", trigger: "change" },
          { required: true, validator: checkShiftCode, trigger: "change" }
        ],
        pm_rest_time: [
          { required: true, message: "请选择时间", trigger: "change" },
          { required: true, validator: checkPmTime, trigger: "change" }
        ],
        morning_work_time: [
          { required: true, message: "请选择时间", trigger: "change" },
          { required: true, validator: checkAmTime, trigger: "change" }
        ],
        relief_late_minute: [
          {
            required: true,
            message: "请输入数字或者有效数字",
            trigger: "blur"
          },
          { required: true, validator: checkRelief, trigger: "blur" }
        ],
        cheat_half_minute: [
          {
            required: true,
            message: "请输入数字或者有效数字",
            trigger: "blur"
          },
          { required: true, validator: checkRelief, trigger: "blur" }
        ],
        warring_late_minute: [
          {
            required: true,
            message: "请输入数字或者有效数字",
            trigger: "blur"
          },
          { required: true, validator: checkRelief, trigger: "blur" }
        ],
        cheat_day_minute: [
          {
            required: true,
            message: "请输入数字或者有效数字",
            trigger: "blur"
          },
          { required: true, validator: checkRelief, trigger: "blur" }
        ]
      },
      rightMenuX: 0, // 右键Y
      rightMenuY: 0, // 右键X
      lists: [], //右键删除
      show: false,
      deleteId: "", // 删除ID
      id: "",
      judgeName: "", //检查班次名称
      judgeAlias: "", //检查班次代号
      editAttendance: false, // 考勤班次
      punchMode: 1, // 打卡方式
      determineShow: "", // 新增
      editShow: "", // 编辑按钮
      dataTotal: 0, // 总数据
      checkTitle: true, // 编辑头部
      params: {
        limit: 15,
        page: 1
      },
      form: {
        name: "", //班次名称
        alias: "", //检查班次代号
        morning_work_time: "", // 上班时间
        pm_rest_time: "", // 下班可提前打卡
        warring_late_minute: "", //严重迟到分钟数
        cheat_half_minute: "", //旷工半天
        cheat_day_minute: "", //旷工一天
        relief_late_minute: "" // 免责迟到分钟数

        // workingOffTimeAfter: "", //下班延迟时间
        // workingTimeBefore: "",  // 上班可延迟
        // workingRest1: "",  // 休息时间
        // workingRest2: "",  // 休息时间
        // totalTime: "",   //工作总时长
        // totalMin: "", //工作总分钟
        // workingPunch: "", // 上班不用打卡
        // workingOffPunch: "", //下班不用打卡
        // beLateMin: "", //迟到分钟
        // beLateTotal: "", //迟到次数
      }
    };
  },
  methods: {
    addAttendanceShift() {
      this.checkTitle = false;
      this.editAttendance = true;
      this.determineShow = true;
      this.editShow = false;
    },
    editAttendanceShift(alias, name,id) {
      this.checkTitle = true;
      this.editAttendance = true;
      this.determineShow = false;
      this.editShow = true;
      this.id = id;
      this.$http
        .get(globalConfig.server + "attendance/classes/" + id)
        .then(res => {
          let data = res.data;
          if (data.code == "20020") {
            this.form = {
              name: data.data.name,
              alias: data.data.alias,
              morning_work_time: data.data.morning_work_time,
              pm_rest_time: data.data.pm_rest_time,
              warring_late_minute: data.data.warring_late_minute,
              cheat_half_minute: data.data.cheat_half_minute,
              cheat_day_minute: data.data.cheat_day_minute,
              relief_late_minute: data.data.relief_late_minute
            };
          }
        });
    },
    cancelAttendance() {
      this.editAttendance = false;
      this.$refs.form.resetFields();
    },
    addAttendanceSubmit(alias, name, id) {
      this.editAttendance = false;
      //  this.judgeName = name;
      // this.judgeAlias = alias;
      this.$http
        .post(globalConfig.server + "/attendance/classes", this.form)
        .then(res => {
          if (res.data.code == "20010") {
            this.$notify.success({
              title: "成功",
              message: res.data.msg
            });
            this.tableData = [];
            this.refresh();
            this.$refs.form.resetFields();
          } else {
            this.$notify.warning({
              title: "警告",
              message: res.data.msg
            });
            this.$refs.form.resetFields();
          }
        });
    },
    editAttendanceSubmit() {
      this.$http
        .put(globalConfig.server + "/attendance/classes/" + this.id, this.form)
        .then(res => {
          if (res.data.code == "20030") {
            this.$notify.success({
              title: "成功",
              message: res.data.msg
            });
            this.tableData = [];
            this.refresh();
            this.editAttendance = false;
          } else {
            this.$notify.warning({
              title: "警告",
              message: res.data.msg
            });
          }
        });
    },
    deleteAttendance(row, event) {
      this.lists = [
        { clickIndex: "first", headIcon: "el-icon-edit-outline", label: "删除" }
      ];
      this.contextMenuParam(event);
      this.deleteId = row.id;
    },
    clickEvent(val) {
      this.$http
        .get(
          globalConfig.server + "/attendance/classes/delete/" + this.deleteId
        )
        .then(res => {
          if (res.data.code == "20040") {
            this.$notify.success({
              title: "成功",
              message: res.data.msg
            });
            this.tableData = [];
            this.refresh();
          } else {
            this.$notify.warning({
              title: "警告",
              message: res.data.msg
            });
          }
        });
    },
    //关闭右键菜单
    closeMenu() {
      this.show = false;
    },
    //右键参数
    contextMenuParam(event) {
      let e = event || window.event;
      this.show = false;
      this.rightMenuX =
        e.clientX +
        document.documentElement.scrollLeft -
        document.documentElement.clientLeft;
      this.rightMenuY =
        e.clientY +
        document.documentElement.scrollTop -
        document.documentElement.clientTop;
      event.preventDefault();
      event.stopPropagation();
      this.$nextTick(() => {
        this.show = true;
      });
    },
    refresh(page) {
      this.params.page = page || 1;
      this.$http.get(globalConfig.server + "attendance/classes",{params: this.params}).then(res => {
        if (res.data.code == "20000") {
          this.dataTotal = Number(res.data.data.count);
          let data = res.data.data.data;
          let time1 = "";
          let time2 = "";
          let time = "";
          let dataObj = null;
          for (let i = 0; i < data.length; i++) {
            dataObj = {};
            time1 = data[i].morning_work_time;
            time2 = data[i].pm_rest_time;
            time = time1 + "-" + time2;
            dataObj.province = time;
            dataObj.alias = data[i].alias;
            dataObj.name = data[i].name;
            dataObj.id = data[i].id;
            this.tableData.unshift(dataObj);
          }
        }
      });
    },
    // 分页
    handleSizeChange(val) {
      this.params.limit = val;
      this.refresh(val);
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      this.refresh(val);
    }
  },
  created() {
    this.refresh();
  },
  watch: {
    editAttendance(val) {
      if (!val) {
        this.$refs.form.resetFields();
      }
    }
  }
};
</script>

<style lang="scss">
#editAttendanceShift {
  .shiftName,
  .shiftCode {
    width: 48%;
    display: inline-block;
  }
  .shiftName {
    .el-select {
      display: inline-block;
      width: 70%;
    }
  }
  .el-form-item__error {
    margin-left: 80px;
  }
  .shiftCode {
    .el-select {
      display: inline-block;
      width: 70%;
    }
    .el-form-item__error {
      margin-left: 80px;
    }
  }
  .shiftName .el-input {
    width: 70%;
  }
  .shiftCode .el-input {
    width: 70%;
  }
  .punchBorad {
    padding-left: 10px;
    // border: 1px solid #dcdfe6;
    width: 95%;
    height: 32px;
    line-height: 32px;
  }
  .workingHours {
    .el-input {
      width: 30%;
    }
  }
  .workingRest {
    .el-input {
      width: 30%;
    }
  }
  .totalTime {
    font-size: 12px;
    .el-form-item__content {
      margin-left: 20px !important;
      line-height: auto;
    }
    .el-input {
      width: 10%;
    }
    span {
      font-size: 12px;
      // margin-left: 10px;
    }
  }
  .el-form-item__content {
    margin-left: 0 !important;
  }
  .workingPunch {
    text-align: left;
    padding-left: 20px;

    .el-checkbox + .el-checkbox {
      margin-left: 0;
    }
  }

  .beLateMin,
  .beLateTotal,
  .beLateSeriousMin,
  .completionBan,
  .completionDay {
    display: block;
    height: 50px;
    margin-bottom: 0;
  }
  .samllWidth {
    width: 100px;
    display: inline-block;
  }
  .error {
    .el-form-item__error {
      margin-left: 220px;
    }
  }
  .bigWidth {
    display: inline-block;
    padding-left: 20px;
    width: 200px;
    line-height: 10px;
    font-size: 14px;
  }
  .btn {
    text-align: right;
  }
  .addAttendanceShift {
    text-align: right;
    margin-bottom: 10px;
    margin-right: 70px;
  }
}
</style>
