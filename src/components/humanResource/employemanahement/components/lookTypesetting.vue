<template>
  <div id="lookTypeseting">
    <el-dialog title="排班" :visible.sync="typesettingDialog" width="60%">
      <div class="top">
        <!-- <el-date-picker v-model="year" type="year" placeholder="请选择年份" size="mini" value-format="yyyy"></el-date-picker> -->
        <!-- <el-date-picker v-model="month" type="month" placeholder="选择月" size="mini"></el-date-picker> -->
        <el-select v-model="year" placeholder="请选择年份" size="mini">
          <el-option v-for="item in yearOptions" :key="item.value" :label="item.label" :value="item.value">
          </el-option>
        </el-select>
        <el-select v-model="month" placeholder="请选择月份" size="mini">
          <el-option v-for="item in monthOptions" :key="item.value" :label="item.label" :value="item.value">
          </el-option>
        </el-select>
        <el-button type="primary" size="mini" @click="searchScheduling" :disable="isTrue">搜 索</el-button>
      </div>
      <div class="calendar" v-if="arr.length > 1">
      <!-- <div class="calendar" > -->
        <table border="1" cellspacing="0" cellpadding="0">
          <tr class='head'>
              <td v-for="(head, index) in heads" :key="index">{{head}}</td>
          </tr>
          <tr v-for="(week, index) in arr" :key="index">
              <td v-for="(item, index) in week" :key="index" :class="{'gray': item.prevmonth || item.nextmonth}" @click="modifyTypesetting(item)">
                <div>{{selectmonth}}月{{item.day}}日</div>
                <div>
                  <span v-if="item.setting == '早班'">{{item.setting}}(9:00 - 18:00)</span>
                  <span v-if="item.setting == '网络班'">{{item.setting}}(10:00 - 19:00)</span>
                  <span v-if="item.setting == '晚班'">{{item.setting}}(13:00 - 21:00)</span>
                  <span v-if="item.setting == '休息'">{{item.setting}}</span>
                </div>
              </td>
          </tr>
      </table>
      </div>
      <div class="wu" v-else>暂无数据</div>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="typesettingDialog = false" size="mini">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 修改排班 -->
    <el-dialog title="修改排班" :visible.sync="modifyDialogVisible" width="30%">
      <div>
        <p v-for="(tmp,index) in checkList" :key="index">
          <el-radio v-model="currentArrange" :label="tmp.alias">{{tmp.alias}}:{{tmp.name}} &nbsp;&nbsp;{{tmp.morning_work_time}}
            - {{tmp.pm_rest_time}}
          </el-radio>
        </p>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="modifyDialogVisible = false" size="mini">取 消</el-button>
        <el-button type="primary" @click="submitModify" size="mini">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  props: ["ids","lookTypesettingLog"],
  data() {
    return {
      isTrue: false,
      currentSort: { //当前排班
        user_id: "",
        arrange: [],
        arrange_month: ""
      }, 
      currentArrange: "A",  // 点击后当前班次
      checkList: [],
      modifyDialogVisible: false,
      typesettingDialog: false,  
      year: new Date().getFullYear(),
      month: new Date().getMonth() + 1,
      monthOptions: [
        {value: "1", label: "1"},
        {value: "2", label: "2"},
        {value: "3", label: "3"},
        {value: "4", label: "4"},
        {value: "5", label: "5"},
        {value: "6", label: "6"},
        {value: "7", label: "7"},
        {value: "8", label: "8"},
        {value: "9", label: "9"},
        {value: "10", label: "10"},
        {value: "11", label: "11"},
        {value: "12", label: "12"},
      ],
      yearOptions: [
         {value: "2016", label: "2016"},
         {value: "2017", label: "2017"},
         {value: "2018", label: "2018"},
         {value: "2019", label: "2019"},
         {value: "2020", label: "2020"},
         {value: "2021", label: "2021"},
      ],
      heads: ["星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六"],
      arr: [],
      dayarr: [],
      params: {
        user_id: "",
        arrange_month: ""
      },
      arrangeList: [],
      modifyDay: "",
      selectmonth: new Date().getMonth() + 1,
    }
  },
  mounted() {
    this.getCheckList();
  },
  created() {},
  watch: {
    lookTypesettingLog(val) {
      this.typesettingDialog = val;
    },
    ids(val) {
      this.params.user_id = val;
      // console.log(this.params.user_id, "1111")
      this.currentSort.user_id = val;
      this.getTypeTime();
    },
    typesettingDialog(val) {
       if (!val) {
        this.$emit('close');
        this.init();
        // this.arr = [];
      }
    }
  },
  methods: {
    getCheckList() {
        this.$http
          .get(globalConfig.server + "attendance/classes", {
            params: {type: "all"}
          })
          .then(res => {
            if (res.status == 200) {
              if (res.data.code == 20000) {
                this.checkList = res.data.data.data;
              } else {
                this.$notify.warning({
                  title: '警告',
                  message: "获取失败"
                })
              }
            }
          });
      },
    // 清除数据
    init() {
      console.log("444444")
      this.year = new Date().getFullYear();
      this.month = new Date().getMonth() + 1;
      this.selectmonth = new Date().getMonth() + 1;
      this.params = {
        user_id: "",
        arrange_month: ""
      }
    },
    // 获取排班
    getTypeTime() {
      this.isTrue = true;
      this.arr = [];
      // this.$http.get(globalConfig.server + "attendance/sort/sort?user_id=289&arrange_month=2018-11").then(res => {   // 测试数据
      this.$http.get(globalConfig.server + "attendance/sort/sort", {params: this.params}).then(res => {  
        if(res.data.code == "20000") {
          this.arrangeList = res.data.data.data.arrange;
          // this.year = res.data.data.year;
          // this.selectmonth = res.data.data.month;
          // this.params.data = this.year + "-" + this.month;
          this.getCalendar(res.data.data.year, res.data.data.month, true);
        } else {
          this.arr = [];
          this.year = res.data.data.year;
          this.month = res.data.data.month;
          // // this.params.data = this.year + "-" + this.month;
          // this.getCalendar(this.year, this.month, true);
        }
      })
    },
     // 获取日历
    getCalendar(year, month, isClear) {
      if (isClear) {
        this.dayarr = [];
      }
      var themonth1stday = new Date(year, month - 1, 1).getDay(); 
      var y = month == 12 ? year + 1 : year;
      var m = month == 12 ? 1 : month;
      var themonthdaysamount = new Date(new Date(y, m, 1) - 1).getDate();
      var prevmonthlastday = new Date(
        new Date(year, month - 1, 1) - 1
      ).getDate();
      while (themonth1stday-- > 0) {
        this.dayarr.unshift({
          day: prevmonthlastday--,
          prevmonth: true,
          currentmonth: false
        });
      } //本月的日期
      var count = 0;
      while (themonthdaysamount--) {
        this.dayarr.push({
          day: ++count,
          currentmonth: true
        });
      }
      var c = 42 - this.dayarr.length;
      var count2 = 1;
      while (c-- > 0) {
        this.dayarr.push({
          day: count2++,
          nextmonth: true,
          currentmonth: false
        });
      }
      var _arr = [];
      for (var i = 0; i < 6; i++) {
        var _week = [];
        for (var j = 0; j < 7; j++) {
          _week.push(this.dayarr[i * 7 + j]);
        }
        _arr.push(_week);
      }
      let _this = this;
      // let settingArr = Object.values(this.arrangeList);
      let settingArr = [];
      // if(this.arrangeList instanceof Array) {
      //   settingArr = this.arrangeList;
      // } else {
      //   settingArr = Object.values(this.arrangeList);
      // }
      // for(let key in this.arrangeList) {
      //   settingArr.push(this.arrangeList[key])
      // }
      _arr.forEach((item, index) => {
        item.forEach((val, key) => {
          if(val.currentmonth) {
            //  settingArr.forEach((a, b) => {
            //    if(_arr[index][key].day == b + 1) {
            //       if(a == "A") {
            //         _arr[index][key].setting = "早班";
            //       } else if(a == "B") {
            //         _arr[index][key].setting = "网络班";
            //       } else if(a == "C") {
            //         _arr[index][key].setting = "晚班";
            //       } else if (a == "休") {
            //         _arr[index][key].setting = "休息";
            //       }
            //     }
            // })
            for(let ids in _this.arrangeList) {
              // console.log(ids, "3333")
              if(_arr[index][key].day == ids) {
                if(_this.arrangeList[ids] == "A") {
                  _arr[index][key].setting = "早班";
                } else if(_this.arrangeList[ids] == "B") {
                  _arr[index][key].setting = "网络班";
                } else if(_this.arrangeList[ids] == "C") {
                  _arr[index][key].setting = "晚班";
                } else if (_this.arrangeList[ids] == "休") {
                  _arr[index][key].setting = "休息";
                }
              }
            }
          }
        })
      })
      this.arr = _arr;
      this.isTrue = false;
    },
    // 修改排班
    modifyTypesetting(item) {
      if(item.currentmonth) {
        this.modifyDialogVisible = true;
        this.modifyDay = item.day;
      }
    },
    submitModify() {
       this.currentSort.arrange_month = this.year + "-" + this.month;
       this.arrangeList[this.modifyDay] = this.currentArrange;
      //  this.arrangeList.forEach((item, index) => {

      //  })
      //  console.log(this.arrangeList, "77777")
      //  return false;
      //  this.currentSort.arrange = Object.values(this.arrangeList)
       this.currentSort.arrange = this.arrangeList;
      this.$http.post(globalConfig.server + "attendance/sort", {
              user_id: this.currentSort.user_id,
              arrange: this.currentSort.arrange,
              arrange_month: this.currentSort.arrange_month
       }).then(res => {
         if(res.data.code == "20000") {
           this.$notify.success({
             title: "成功",
             message: res.data.msg
           })
           this.getTypeTime();
           this.modifyDialogVisible = false;
         } else {
           this.$notify.warning({
             title: "警告",
             message: res.data.msg
           })
         }
       })
    },
    // 搜索排班
    searchScheduling() {
      this.selectmonth = this.month;
      this.params.arrange_month = this.year + "-" + this.month;
      this.getTypeTime();
    },
  }
};
</script>

<style lang="scss">
  #lookTypeseting {
    .top {
      margin-bottom: 10px;
       .el-date-editor {
        margin-right: 10px;
        width: 20%;
        float: left;
      }
      .el-select {
        margin-right: 10px;
        width: 20%;
        float: left;
      }
    }
    table {
      width: 100%;
      // border-collapse: separate;
      border-spacing: 10px 15px;
      border-collapse: collapse;
      text-align: center;
      td {
        width: 173px;
        height: 33px;
      }
    }
    .gray {
      color: gray;
      overflow: hidden;
      div {
        visibility: hidden;
      }
    }
    .wu {
      height: 50px;
      line-height: 50px;
      text-align: center;
      font-size: 16px;
      border: 1px solid #cecece;
    }
  }
</style>
