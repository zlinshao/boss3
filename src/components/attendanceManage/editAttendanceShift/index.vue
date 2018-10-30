<template>
  <div id="editAttendanceShift">
    <el-table :data="tableData" border style="width: 100%">
      <el-table-column prop="alias" label="班次代号" width="140%">
      </el-table-column>
      <el-table-column prop="name" label="班次名称" width="140%">
      </el-table-column>
      <el-table-column prop="province" label="考勤时间">
      </el-table-column>
      <el-table-column label="操作" width="200%">
        <template slot-scope="scope">
          <el-button type="primary" @click="editAttendanceShift(scope.row.alias, scope.row.name)" size="mini">编辑</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 编辑考勤班次 -->
    <el-dialog title="编辑考勤班次" :visible.sync="editAttendance" width="34%">
      <!-- 表达内容 -->
      <el-form ref="form" :model="form" label-width="80px" :rules="rules">
        <el-form-item label="班次名称" class="shiftName" prop="name">
          <!-- <el-input v-model="form.shiftName" size="small"></el-input> -->
          <el-select v-model="form.name" placeholder="请选择班次名称" size="mini">
            <el-option v-for="item in nameOptions" :key="item.value" :label="item.label" :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="班次代号" class="shiftCode" prop="alias">
          <!-- <el-input v-model="form.shiftCode" size="small"></el-input> -->
          <el-select v-model="form.alias" placeholder="请选择班次代号" size="mini">
            <el-option v-for="item in  aliasOptions" :key="item.value" :label="item.label" :value="item.value">
            </el-option>
          </el-select>
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
              start: '09:00',
              step: '1:00',
              end: '13:00'
            }" placeholder="选择时间" class="workingHours">
          </el-time-select>
          <!-- <span>可提前</span>
          <el-input v-model="form.workingTimeBefore" size="mini"></el-input>
          <span>分钟打卡</span> -->
        </el-form-item>
        <el-form-item label="下班时间" class="workingHours" prop="pm_rest_time" size="mini">
          <el-time-select v-model="form.pm_rest_time" :picker-options="{
              start: '18:00',
              step: '1:00',
              end: '21:00'
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
        <el-form-item class="beLateSeriousMin">
          <p class="bigWidth">严重迟到分钟数</p>
          <el-input v-model="form.warring_late_minute" size="mini" class="samllWidth"></el-input>
        </el-form-item>
        <el-form-item class="beLateSeriousMin" prop="relief_late_minute">
          <p class="bigWidth">免责迟到分钟数</p>
          <el-input v-model="form.relief_late_minute" size="mini" class="samllWidth"></el-input>
        </el-form-item>
        <el-form-item class="completionBan">
          <p class="bigWidth">旷工半天迟到分钟数</p>
          <el-input v-model="form.cheat_half_minute" size="mini" class="samllWidth"></el-input>
        </el-form-item>
        <el-form-item class="completionDay">
          <p class="bigWidth">旷工一天迟到分钟数</p>
          <el-input v-model="form.cheat_day_minute" size="mini" class="samllWidth"></el-input>
        </el-form-item>
        <el-form-item class="btn">
          <el-button @click="cancelAttendance()" size="mini">取 消</el-button>
          <el-button type="primary" @click="editAttendanceSubmit()" size="mini">确 定</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
export default {
  // name: '编辑班次',
  data() {
    let checkShiftName = (rule, value, callback) => {
      if (value == this.judgeName) {
        callback(new Error("该名称已经存在"));
      } else {
        callback();
      }
    };
    let checkShiftCode = (rule, value, callback) => {
      if (value == this.judgeAlias) {
        callback(new Error("该班次已经存在"));
      } else {
        callback();
      }
    };
    let checkPmTime = (rule, value, callback) => {
      if (!value ) {
        callback(new Error("请选择时间"))
      } else {
        callback()
      }
    }
    let checkAmTime = (rule, value, callback) => {
      if(!value) {
        callback(new Error("请选择时间")) 
      }  else {
        callback()
      }
    }
    let checkRelief = (rule, value, callback) => {
      if(!value) {
        callback(new Error("严重迟到分钟数")) 
      } else {
        callback()
      }
    }
    return {
      nameOptions: [
        { value: '早班', label: '早班' },
        { value: '正常班',  label: '正常班'  },
        { value: '晚班', label: '晚班'},
        { value: '休息', label: '休息' },
      ],
      aliasOptions: [
        { value: 'A', label: 'A' },
        { value: 'B', label: 'B'  },
        { value: 'C', label: 'C' },
        { value: '休', label: '休' },
      ],
      tableData: [],
      rules: {
        name: [
          { required: true, message: "请输入班次名称", trigger: "change" },
          { validator: checkShiftName, trigger: "change" }
        ],
        alias: [
          { required: true, message: "请输入班次代号", trigger: "change" },
          { validator: checkShiftCode, trigger: "change" }
        ],
        pm_rest_time: [
          { required: true, message: "请选择时间", trigger: "change" },
          { validator: checkPmTime, trigger: "change" }
        ],
        morning_work_time: [
          { required: true, message: "请选择时间", trigger: "change" },
          { validator: checkAmTime, trigger: "change" }
        ],
        relief_late_minute: [
          { required: true, message: "请选择时间", trigger: "blur" },
          { validator: checkRelief, trigger: "blur" }
        ]
      },
      judgeName: "", //检查班次名称
      judgeAlias: "", //检查班次代号
      editAttendance: false, // 考勤班次
      punchMode: 1, // 打卡方式
      form: {
        name: "", //班次名称
        alias: "", //检查班次代号
        morning_work_time: "", // 上班时间
        pm_rest_time: "", // 下班可提前打卡
        warring_late_minute: "", //严重迟到分钟数
        cheat_half_minute: "", //旷工半天
        cheat_day_minute: "", //旷工一天
        relief_late_minute: "", // 免责迟到分钟数

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
    handleClick(row) {
      console.log(row);
    },
    editAttendanceShift(alias, name) {
      this.editAttendance = true;
      this.judgeName = name;
      this.judgeAlias = alias;
    },
    cancelAttendance() {
      this.editAttendance = false;
      // this.$refs[formName].resetFields();
    },
    editAttendanceSubmit() {
      this.editAttendance = false;
      this.$http
        .post(globalConfig.server + "/attendance/classes", this.form)
        .then(res => {
          if (res.code == 20010) {
            this.$notify.success({
              title: "成功",
              message: res.data.msg
            });
          } else {
            this.$notify.warning({
              title: "警告",
              message: res.data.msg
            });
          }
        });
    }
  },
  created() {
    this.$http.get(globalConfig.server + "attendance/classes").then(res => {
      if ((res.code = 2000)) {
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
          this.tableData.push(dataObj);
        }
      }
    });
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
  .bigWidth {
    padding-left: 20px;
    width: 200px;
    font-size: 14px;
    display: inline-block;
  }
  .btn {
    text-align: right;
  }
}
</style>
