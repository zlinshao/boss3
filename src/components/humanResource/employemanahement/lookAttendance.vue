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
          <el-table-column prop="attendance" label="班次"></el-table-column>
          <el-table-column prop="hugh" label="休息"></el-table-column>
          <el-table-column prop="goWork" label="上班打卡时间"></el-table-column>
          <el-table-column prop="resultWork" label="上班打卡结果"></el-table-column>
          <el-table-column prop="goOffWork" label="下班打卡时间"></el-table-column>
          <el-table-column prop="resultOffWork" label="下班打卡结果"></el-table-column>
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
  props: ['ids', 'lookAttendanceLog'], 
  data() {
    return {
      isLoading: false,
      emptyText: "",
      lookAttendanceDialog: false,
      attendanceData: [],   // 考勤时间
      params: {
        user_id: ""
      }
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
        this.attendanceData = [];
      }
    }
  },
  mounted() {
   
  },
  methods: {
    getAttendance(id) {
      this.isLoading = true;
      this.$http.get(globalConfig.server + "attendance/summary", {params: this.params}).then(res => {   
        if(res.data.code == "20000") {
          let obj = null;
          this.emptyText = " ";
          res.data.data.data[0].sort_dimension.forEach((item, index) => {
            obj = {}
            item.forEach((val, key) => {
              obj.sign_date = val.sign_date;
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
                  obj.resultWork = "迟到";
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
                  obj.resultOffWork = "早退";
                }
                 obj.goOffWork = val.dimensions.hour + ":" + val.dimensions.minute;  // 下班时间
              } else if (val.event_attribute == 3) {
                obj.workShift = val.dimensions.hour + ":" + val.dimensions.minute;  // 上班排班时间
              } else if(val.event_attribute == 4) {
                obj.workOffShift = val.dimensions.hour + ":" + val.dimensions.minute;  // 下班班排版时间
              } else if(val.event_attribute == 5) {
                obj.hugh = "休息";
              }
            })
              this.attendanceData.push(obj)
              this.isLoading = false;
          })
        } else {
          this.isLoading = false;
          this.emptyText = "暂无数据";
        }
      })
    }
  }
}
</script>

<style lang="scss">

</style>
