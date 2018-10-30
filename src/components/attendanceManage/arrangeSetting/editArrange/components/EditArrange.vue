<template>
    <div id="editArrange">
        <div class="editTop">
            <el-row>
                <el-col span="12">
                    排班月份
                    <div class="time">{{previousDate}}</div>
                </el-col>
                <el-col span="12">
                    应用对象
                    <el-input type="text" size="mini" style="width:300px;"></el-input>
                </el-col>
            </el-row>
        </div>
        <div class="editTable">
            <table cellspacing='0' cellpadding='0'>
                <tr class='head'>
                    <td v-for="(head, index) in heads" :key="index">{{head}}</td>
                </tr>
                <tr v-for="(item, index) in show" :key="index">
                    <td :class="{now: item1.now, last_month:item1.attr == 'last_month',next_month:item1.attr == 'next_month'}" v-for="(item1, index) in item" :key=" index">{{item1.num}}
                        <el-select v-model="value" placeholder="请选择" v-if="!(item1.attr == 'last_month')" v-show="!(item1.attr == 'next_month')">
                            <el-option v-for="(select, index) in options" :key="index" :label="select.label" :value="select.value">
                            </el-option>
                        </el-select>
                    </td>
                </tr>
            </table>
        </div>
    </div>
</template>

<script>
import GetDateList from "./currentData.js";
export default {
  name: "editArrange",
  props: ["previousDate"],
  data() {
    return {
      time: "",
      tableData: [],
      options: [
        {
          value: "选项1",
          label: "A:09:00-18:00"
        },
        {
          value: "选项2",
          label: "B:10:00-19:00"
        },
        {
          value: "选项3",
          label: "C:13:00-21:00"
        },
        {
          value: "选项4",
          label: "休:休息"
        }
      ],
      value: "A:09:00-18:00", // 默认选择项
      body: "",
      header: "",
      currentYear: "",
      currentMonth: "",
      currentDay: "",
      heads: ["日", "一", "二", "三", "四", "五", "六"],
      datas: new Array(),
      show: new Array()
    };
  },
  created() {
    console.log(GetDateList());
    console.log(this.previousDate, 444);

    this.setCalender(new Date());
  },
  methods: {
    initline: function() {
      this.datas = new Array();
      this.show = new Array();
    },
    backToday: function() {
      this.setCalender(new Date());
    },
    getcurrentDates: function(calender_Date) {
      //传入正常的Date（）类型数据
      this.initline();
      var months = calender_Date.getMonth();
      months = months + 1;
      calender_Date.setMonth(months);
      calender_Date.setDate(0);

      return calender_Date.getDate();
    },
    getlastDates: function(calenderdDate) {
      //传入正常的Date（）类型数据
      var curDate = calenderdDate;
      curDate.setDate(0);
      return curDate.getDate();
    },
    left: function() {
      this.initline();
      var yy = this.currentYear;
      var mm = this.currentMonth;
      var dd = 1;
      if (yy == new Date().getFullYear() && mm == new Date().getMonth() + 1) {
        dd = new Date().getDate();
      }
      if (mm == 0) {
        mm = 12;
        yy = yy - 1;
        this.currentMonth = mm;
        this.currentYear = yy;
      }
      var calenderrDate = yy + "-" + mm + "-" + dd;
      this.setCalender(new Date(calenderrDate));
    },
    right: function() {
      this.initline();
      var yy = this.currentYear;
      var mm = this.currentMonth + 2;
      var dd = 1;
      if (yy == new Date().getFullYear() && mm == new Date().getMonth() + 1) {
        dd = new Date().getDate();
      }
      if (mm > 12) {
        mm = 1;
        yy++;
        this.currentMonth = mm;
        this.currentYear = yy;
      }
      var calender__Date = yy + "-" + mm + "-" + dd;
      this.setCalender(new Date(calender__Date));
    },
    setCalender(dateNow) {
      //显示日历部分
      console.log(dateNow);

      var firstday;
      var today = dateNow;
      var yy = today.getFullYear();
      this.currentYear = yy;
      var mm = today.getMonth() + 1; //today=2;mm=3
      this.currentMonth = mm - 1; //this.curr=2
      var dd = today.getDate();
      this.currentDay = dd; //30
      firstday = yy + "-" + mm + "-1"; //2018-3-1
      //本月第一天是星期几,也表示前面有几个空的天数
      var firstday_day = new Date(firstday).getDay();
      //日历头
      this.header = yy + "年" + mm + "月";
      var cur_days = this.getcurrentDates(today);
      //上一月有多少天
      var last_days = this.getlastDates(dateNow);

      //上个月从哪天开始出现
      var last_first_day = last_days - firstday_day + 1;
      //firstline
      //存上个月的日期
      for (var i = last_first_day; i <= last_days; i++) {
        var date = new Object();
        date.num = i;
        date.attr = "last_month";
        date.now = false;
        this.datas.push(date);
        // this.dateData.firstline.push(date);
      }
      //temp存放换行前上一个数据
      //下一行第一个数字
      var num_second = 7 - firstday_day + 1;
      //存本月日期
      for (var i = 1; i <= cur_days; i++) {
        var date = new Object();
        date.num = i;
        date.attr = "this_month";
        if (
          i == this.currentDay &&
          this.currentMonth == new Date().getMonth() &&
          this.currentYear == new Date().getFullYear()
        ) {
          date.now = true;
        } else {
          date.now = false;
        }
        this.datas.push(date);
      }
      for (
        var i = 1;
        i <= 42 - cur_days - (last_days - last_first_day + 1);
        i++
      ) {
        var date = new Object();
        date.num = i;
        date.attr = "next_month";
        this.datas.push(date);
      }

      var k = 0;
      for (var i = 0; i < 6; i++) {
        var line = new Array();
        for (var j = 0; j < 7; j++) {
          line.push(this.datas[k++]);
        }
        this.show.push(line);
      }
    }
  }
};
</script>

<style lang="scss">
#editArrange {
  width: 100%;
  .editTop {
    padding-bottom: 10px;
  }
  .time {
    display: inline-block;
    padding: 4px 10px;
    border: 1px solid #dcdfe6;
  }
  td {
    width: 14.28%;
    height: 40px;
    text-align: center;
    line-height: 40px;
    border: 1px solid gray;
    padding: 10px;
    color: black;
  }
  .next_month,
  .last_month {
    color: gray;
  }
  .btn {
    margin-top: 20px;
    text-align: right;
  }
  //   table样式
  #calender {
    overflow: auto;
    position: relative;
    width: 100%;
    border: 2px solid rgb(170, 105, 231);
    #calender_body {
      .last_month {
        color: lightgray;
      }

      .next_month {
        color: lightgray;
      }
    }

    #calender_foot {
      text-align: center;
      line-height: 40px;
      p {
        color: blue;
        font-size: 10px;
      }
    }
  }
}
</style>

