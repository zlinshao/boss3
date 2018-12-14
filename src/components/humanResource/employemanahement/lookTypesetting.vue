<template>
  <div id="lookTypeseting">
    <el-dialog title="排版" :visible.sync="typesettingDialog" width="60%">
      <div class="top">
        <el-date-picker v-model="year" type="year" placeholder="请选择年份" size="mini"></el-date-picker>
        <!-- <el-date-picker v-model="month" type="month" placeholder="选择月" size="mini"></el-date-picker> -->
        <el-select v-model="month" placeholder="请选择月份" size="mini">
          <el-option v-for="item in monthOptions" :key="item.value" :label="item.label" :value="item.value">
          </el-option>
        </el-select>
        <el-button type="primary" size="mini">搜 索</el-button>
      </div>
      <div class="calendar">
        <table border="1" cellspacing="0" cellpadding="0">
          <tr class='head'>
              <td v-for="(head, index) in heads" :key="index">{{head}}</td>
          </tr>
          <tr v-for="(week, index) in arr" :key="index">
              <td v-for="(item, index) in week" :key="index" :class="{'gray': item.prevmonth || item.nextmonth}">
                <div>{{month}}月{{item.day}}日</div>
                <div>
                  <span v-if="item.setting == '早班'">{{item.setting}}(9:00 - 18:00)</span>
                  <span v-if="item.setting == '晚班'">{{item.setting}}(13:00 - 21:00)</span>
                  <span v-if="item.setting == '休息'">{{item.setting}}</span>
                </div>
              </td>
          </tr>
      </table>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="typesettingDialog = false" size="mini">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  props: ["ids","lookTypesettingLog"],
  data() {
    return {
      typesettingDialog: false,  
      year: "",
      month: "",
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
      heads: ["星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六"],
      arr: [],
      dayarr: [],
      params: {
        user_id: "",
        date: ""
      },
      arrange: [],
    }
  },
  created() {
    // this.month = new Date().getMonth() + 1
  },
  watch: {
    lookTypesettingLog(val) {
      this.typesettingDialog = val;
      this.getTypeTime();
    },
    ids(val) {
      this.params.user_id = val;
    },
    typesettingDialog(val) {
       if (!val) {
        this.$emit('close');
      }
    }
  },
  methods: {
    // 获取排班
    getTypeTime() {
      // this.$http.get(globalConfig.server + "attendance/sort/sort?user_id=289&arrange_month=2018-11").then(res => {   // 测试数据
      this.$http.get(globalConfig.server + "attendance/sort/sort", {params: this.params}).then(res => {  
        if(res.data.code == "20000") {
          this.arrange = res.data.data.data.arrange;
          this.year = res.data.data.year;
          this.month = res.data.data.month;
          this.params = this.year + "-" + this.month;
          this.getCalendar(this.year, this.month, true);
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
      let settingArr = Object.values(this.arrange);
      _arr.forEach((item, index) => {
        item.forEach((val, key) => {
          if(val.currentmonth) {
             settingArr.forEach((a, b) => {
               if(_arr[index][key].day == b + 1) {
                  if(a == "A") {
                    _arr[index][key].setting = "早班";
                  } else if(a == "B") {
                    _arr[index][key].setting = "晚班";
                  } else if(a == "C") {
                    _arr[index][key].setting = "网络班";
                  } else if (a == "休") {
                    _arr[index][key].setting = "休息";
                  }
                }
            })
          }
        })
      })
     
      // let settingObj = Object.values(this.typesetting);
        // let typeArr = [];
        // typeArr = Object.values(this.typesettingDate);
        // for(let key in _this.typesettingDate) {
        //   typeArr.push(_this.typesettingDate[key])
        // }
      // _arr.forEach((item, index) => {
      //     item.forEach((val, key) => {
      //       if (val.currentmonth) {
      //         settingObj.forEach((a, b) => {
      //           if (_arr[index][key].day == b + 1) {
      //             _arr[index][key]["typesetting"] = a;
      //           }
      //         });
      //         typeArr.forEach((c, d) => {
      //           if(_arr[index][key].day == d + 1) {
      //             _arr[index][key]["correct"] = c
      //           }
      //         })
      //       }
      //     });
      // });
      this.arr = _arr;
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
      }
    }
    .gray {
      color: gray;
      overflow: hidden;
    }
  }
</style>
