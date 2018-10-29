<template>
  <div id="editAttendanceShift">
    <el-table :data="tableData" border style="width: 100%">
      <el-table-column prop="date" label="班次代号" width="140%">
      </el-table-column>
      <el-table-column prop="shiftCode" label="班次名称" width="140%">
      </el-table-column>
      <el-table-column prop="province" label="考勤时间">
      </el-table-column>
      <el-table-column label="操作" width="200%">
        <template slot-scope="scope">
          <!-- <el-button @click="handleClick(scope.row)" type="text" size="small">查看</el-button> -->
          <el-button type="primary" size="small" @click="editAttendanceShift">编辑</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 编辑考勤班次 -->
    <el-dialog title="编辑考勤班次" :visible.sync="editAttendance" width="34%">
      <!-- 表达内容 -->
      <el-form ref="form" :model="form" label-width="80px">
        <el-form-item label="班次名称" class="shiftName">
          <el-input v-model="form.shiftName" size="small"></el-input>
        </el-form-item>
        <el-form-item label="班次代号" class="shiftCode">
          <el-input v-model="form.shiftCode" size="small"></el-input>
        </el-form-item>
        <el-form-item label="打卡方式" class="punchMode">
          <div class="punchBorad">
            <el-radio-group v-model="punchMode">
              <el-radio :label="1">一天二次打卡</el-radio>
              <el-radio :label="2">一天四次打卡</el-radio>
            </el-radio-group>
          </div>
        </el-form-item>
        <el-form-item label="上班时间" class="workingHours">
          <el-time-select v-model="workingTime" :picker-options="{
              start: '09:00',
              step: '1:00',
              end: '13:00'
            }" placeholder="选择时间" class="workingHours">
          </el-time-select>
          <span>可提前</span>
          <el-input v-model="form.workingTimeBefore" size="small"></el-input>
          <span>分钟打卡</span>
        </el-form-item>
         <el-form-item label="下班时间" class="workingHours">
          <el-time-select v-model="workingOffTime" :picker-options="{
              start: '18:00',
              step: '1:00',
              end: '21:00'
            }" placeholder="选择时间" class="workingHours">
          </el-time-select>
          <span>可延迟</span>
          <el-input v-model="form.workingOffTimeAfter" size="small"></el-input>
          <span>分钟打卡</span>
        </el-form-item>
        <el-form-item label="休息时间" class="workingRest">
          <span>从</span>
          <el-time-select v-model="workingRest1" :picker-options="{
              start: '12:00',
              end: '18:00'
            }" placeholder="选择时间">
          </el-time-select>
          <span>到</span>
          <el-time-select v-model="workingRest2" :picker-options="{
              start: '12:00',
              end: '18:00'
            }" placeholder="选择时间">
          </el-time-select>
        </el-form-item>
        <el-form-item class="totalTime">
          <span>工作时长总计</span>
          <el-input v-model="totalTime" size="small"></el-input>
          <span style="margin-left: 10px">时</span>
          <el-input v-model="totalMin" size="small"></el-input>
          <span style="margin-left: 10px">分钟</span>
          <span>（考勤统计工作时长及请假调休加班统计，以此时间为准）</span>
        </el-form-item>
        <el-from-item class="workingPunch">
          <el-checkbox v-model="workingPunch">上班不用打卡<span style="margin-left: 20px">(开启后，上班不打卡也不会记作考勤异常)</span></el-checkbox>
          <el-checkbox v-model="workingOffPunch">下班不用打卡<span style="margin-left: 20px">(开启后，下班不打卡也不会记作考勤异常)</span></el-checkbox>
        </el-from-item>
        <el-from-item class="beLateMin">
          <p class="bigWidth">一个月内每次允许迟到分钟数</p>
           <el-input v-model="beLateMin" size="small" class="samllWidth"></el-input>
        </el-from-item>
        <el-from-item class="beLateTotal">
          <p class="bigWidth">一个月内每次允许迟到次数</p>
           <el-input v-model="beLateTotal" size="small"  class="samllWidth"></el-input>
        </el-from-item>
        <el-from-item class="beLateSeriousMin">
          <p class="bigWidth">严重迟到分钟数</p>
           <el-input v-model="beLateSeriousMin" size="small"  class="samllWidth"></el-input>
        </el-from-item>
        <el-from-item class="completionBan">
          <p class="bigWidth">旷工半天迟到分钟数</p>
           <el-input v-model="completionBan" size="small"  class="samllWidth"></el-input>
        </el-from-item>
        <el-from-item class="completionDay">
          <p class="bigWidth">旷工一天迟到分钟数</p>
           <el-input v-model="completionDay" size="small"  class="samllWidth"></el-input>
        </el-from-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="editAttendance = false">取 消</el-button>
        <el-button type="primary" @click="editAttendance = false">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  // name: '编辑班次'
  data() {
    return {
      tableData: [
        {
          date: "A",
          shiftCode: "早班",
          province: "09:00-18:00"
        },
        {
          date: "B",
          shiftCode: "正常班",
          province: "09:00-19:00"
        },
        {
          date: "C",
          shiftCode: "晚班",
          province: "13:00-21:00"
        }
      ],
      editAttendance: false, // 考勤班次
      punchMode: 1, // 打卡方式
      workingTime: '09:00',  //上班时间
      workingOffTime: '',  //下班时间
      workingRest1: "", // 休息时间
      workingRest2: "", // 休息时间
      totalTime: "",  //工作总时长
      totalMin: "", //工作总分钟
      workingPunch: "", // 上班不用打卡
      workingOffPunch: "", //下班不用打卡
      beLateMin: "", //迟到分钟
      beLateTotal: "",  //迟到次数
      beLateSeriousMin: "", //严重迟到分钟数
      completionBan: "", //旷工半天
      completionDay: "", //旷工一天
      form: {
        shiftName: "",
        shiftCode: "",
        workingTimeBefore: "",
        workingOffTime: "",
        workingOffTimeAfter: "",
        workingRest1: "",
        workingRest2: "",
        totalTime: "",
        totalMin: "",
        workingPunch: "",
        workingOffPunch: "",
        beLateMin: "",
        beLateTotal: "",
        beLateSeriousMin: "", 
        completionBan: "",
        completionDay: "",
      }
    };
  },
  methods: {
    handleClick(row) {
      console.log(row);
    },
    editAttendanceShift() {
      this.editAttendance = true;
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
  .punchBorad {
    padding-left: 10px;
    border: 1px solid #dcdfe6;
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
      margin-left: 20px!important;
    }
    .el-input {
      width: 4%;
    }
    span{
      font-size: 12px;
      // margin-left: 10px;
    }
  }
  .workingPunch {
    text-align: left;
    padding-left: 20px;
    .el-checkbox+.el-checkbox {
      margin-left: 20px;
    }
  }
  
  .beLateMin,
  .beLateTotal,
  .beLateSeriousMin,
  .completionBan,
  .completionDay {
    display: block;
  }
  .samllWidth, {
    width: 40px;
    display: inline-block;
  }
  .bigWidth {
    padding-left: 20px;
    width: 200px;
    font-size: 14px;
    display: inline-block;
  }
}
</style>
