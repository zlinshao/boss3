<template>
    <div id="lookAttendance">
      <el-dialog title="考勤" :visible.sync="lookAttendanceDialog" border width="60%">
        <el-table :data="attendanceData" style="width: 100%" 
                        v-loading="isLoading" 
                        :empty-text="emptyText"  
                        element-loading-text="拼命加载中"
                        element-loading-spinner="el-icon-loading"
                        element-loading-background="rgba(255, 255, 255, 0)">
          <el-table-column prop="sign_date" label="日期"></el-table-column>
          <el-table-column label="班次">
            <template slot-scope="scope">
              <!-- <span v-if="scope.row.attendance == '早班'">{{scope.row.attendance + "9:00 - 18:00"}}</span>
              <span v-if="scope.row.attendance == '休息'">{{scope.row.attendance}}</span>
              <span v-if="scope.row.attendance == '晚班'">{{scope.row.attendance + "13:00 - 21:00"}}</span>
              <span v-if="scope.row.attendance == '夜班'">{{scope.row.attendance + "18:00 - 23:00"}}</span> -->
              <span v-if="allAttendance.filter(item => item.name === scope.row.attendance).length">
                {{allAttendance.filter(item => item.name === scope.row.attendance)[0].name}}(
                {{allAttendance.filter(item => item.name === scope.row.attendance)[0].morning_work_time}} -
                {{allAttendance.filter(item => item.name === scope.row.attendance)[0].pm_rest_time}})
              </span>
            </template>
          </el-table-column>
          <!-- <el-table-column prop="hugh" label="休息"></el-table-column> -->
          <el-table-column prop="goWork" label="上班打卡时间"></el-table-column>
          <el-table-column  label="上班打卡结果">
            <template slot-scope="scope">
              <div v-if="scope.row.day <= days && scope.row.resultWork">
                <span v-if="scope.row.resultWork == '正常'">{{scope.row.resultWork}}</span>
                <span style="color: #ff00b1;" v-else-if="scope.row.resultWork == '休息并打卡'">{{scope.row.resultWork}}</span>
                <span v-else-if="scope.row.attendance == '休息'">{{scope.row.attendance}}</span>
                <span style="color: #fd0c0c;" v-else-if="scope.row.resultWork == '缺卡'">{{scope.row.resultWork}}</span>
                <span style="color: red;" v-else>迟到{{scope.row.resultWork}}分钟</span>
              </div>
            </template>
          </el-table-column>
          <el-table-column prop="goOffWork" label="下班打卡时间"></el-table-column>
          <el-table-column prop="" label="下班打卡结果">
            <template slot-scope="scope">
              <div v-if="scope.row.day <= days && scope.row.resultOffWork">
                <span v-if="scope.row.resultOffWork == '正常'">{{scope.row.resultOffWork}}</span>
                <span style="color: #ff00b1;" v-else-if="scope.row.resultOffWork == '休息并打卡'">{{scope.row.resultOffWork}}</span>
                <span v-else-if="scope.row.attendance == '休息'">{{scope.row.attendance}}</span>
                <span style="color: #fd0c0c;" v-else-if="scope.row.resultOffWork == '缺卡'">{{scope.row.resultOffWork}}</span>
                <span style="color: red;" v-else>早退{{scope.row.resultOffWork}}分钟</span>
              </div>
            </template>   
          </el-table-column>
      </el-table>
      <span slot="footer" class="dialog-footer">
        <!-- <el-button @click="lookAttendanceDialog = false" size="mini">取 消</el-button> -->
        <el-button type="primary" @click="lookAttendanceDialog = false" size="mini">确 定</el-button>
      </span>
    </el-dialog>
      
    </div>
</template>

<script>
export default {
  name: 'lookAttendance',
  props: ['ids', 'lookAttendanceLog'], 
  data() {
    return {
      isLoading: false,
      emptyText: " ",
      lookAttendanceDialog: false,
      attendanceData: [],   // 考勤时间
      params: {
        user_id: ""
      },
      days: "",
      allAttendance: [],
    }
  },
  watch: {
    ids(val) {
      this.params.user_id = val;
      this.getAttendance()
    },
    lookAttendanceLog(val) {
      this.lookAttendanceDialog = val;
    },
    lookAttendanceDialog(val) {
      if (!val) {
        this.$emit('close');
      }else{
        this.getAllAttendance()
      }
    }
  },
  mounted() {
   
  },
  methods: {
    getAttendance(id) {
      this.attendanceData = [];
      this.isLoading = true;
      this.$http.get(globalConfig.server + "attendance/summary", {params: this.params}).then(res => {   
        if(res.data.code == "20000") {
          let obj = null;
          this.emptyText = " ";
          let  year = new Date().getFullYear();
          let month = new Date().getMonth() + 1;
          this.days= new Date().getDate();
          if(!res.data.data.data[0].sort_dimension.length) {
            this.isLoading = false;
            this.emptyText = "暂无数据";
          }
          res.data.data.data[0].sort_dimension.forEach((item, index) => {
            obj = {}
            let currentAttendance = false;  // 今天是否有排班
            let currentMon = false;   // 早上是否有 实际打卡
            let currentWan = false;   // 下班是否有 实际打卡 
            item.forEach((a, b) => {
              // console.log(a.dimensions.day)
              if(a.dimensions && a.dimensions.day){
                if(a.dimensions.day <= this.days) {
                  if(a.event_attribute == 3) {
                    currentAttendance = true;
                  }
                  if(a.event_attribute == 1) {
                    currentMon = true;
                  }
                  if(a.event_attribute == 2)   {
                    currentWan = true;
                  }
                  if(currentAttendance && !currentMon) {
                    obj.resultWork = "缺卡";
                  }
                  if(currentAttendance && !currentWan) {
                    obj.resultOffWork = "缺卡";
                  }
                }
              }
            })
            item.forEach((val, key) => {
              obj.sign_date = val.sign_date;
              obj.day = Number(val.sign_date.split("-")[2]);
              if(val.classes) {
                obj.attendance = val.classes.name
              }
              if(val.event_attribute == 1) {
                if(val.status == 0) {
                  obj.resultWork = "正常";
                  item.forEach((c, d) => {
                    if(c.event_attribute == 5) {
                      obj.resultWork = "休息并打卡";
                    }
                  })
                } else if(val.status == 1) {
                  // obj.resultWork = "迟到";
                  obj.resultWork = Number(val.dimensions.minute);
                } 
                obj.goWork = val.dimensions.hour + ":" + val.dimensions.minute;       // 上班时间
              } else if (val.event_attribute == 2) {
                if(val.status == 0) {
                  obj.resultOffWork = "正常";
                  item.forEach((c, d) => {
                    if(c.event_attribute == 5) {
                      obj.resultOffWork = "休息并打卡";
                    }
                  })
                } else if (val.status == 2) {
                  // console.log(item)
                  // console.log(val)
                  // obj.resultOffWork = "早退";
                  // obj.resultOffWork = 60 - Number(val.dimensions.minute);
                  // console.log(val)
                  item.forEach(i => {
                    if(i.classes){
                      obj.resultOffWork = this.exchangeHour(i.classes.pm_rest_time, val.dimensions.hour + ":" + val.dimensions.minute);
                    }
                  })
                }
                obj.goOffWork = val.dimensions.hour + ":" + val.dimensions.minute;  // 下班时间
              } else if (val.event_attribute == 3) {
                if(val.dimensions && val.dimensions.hour){
                  obj.workShift = val.dimensions.hour + ":" + val.dimensions.minute;  // 上班排班时间
                }
                
              } else if(val.event_attribute == 4) {
                if(val.dimensions && val.dimensions.hour){
                  obj.workOffShift = val.dimensions.hour + ":" + val.dimensions.minute;  // 下班班排版时间
                }
              } else if(val.event_attribute == 5) {
                obj.attendance = "休息";
              }
            })
              this.attendanceData.push(obj)
              // console.log(this.attendanceData)
              this.isLoading = false;
          })
        } else {
          this.isLoading = false;
          this.emptyText = "暂无数据";
        }
      })
    },
    //早退时间
    exchangeHour(prev, next){
      var hour1 = +prev.split(":")[0],
          minute1 = /^0/.test(prev.split(":")[1]) ? +prev.split(":")[1].replace("0", "") : +prev.split(":")[1],
          hour2 = +next.split(":")[0],
          minute2 = /^0/.test(next.split(":")[1]) ? +next.split(":")[1].replace("0", "") : next.split(":")[1],
          res = 0;
      if(hour1 > hour2){
        res = (hour1 - hour2) * 60 + (minute1 - minute2)
      }
      return res
    },
    getAllAttendance(){
      this.$http.get(globalConfig.server + 'attendance/classes?type=all').then(res => {
        if(res.data.code === '20000'){
          // console.log(123)
          this.allAttendance = res.data.data.data;
        }
      })
    }
  }
}
</script>

<style lang="scss">

</style>
