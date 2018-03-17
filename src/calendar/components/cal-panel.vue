<template>
  <div class="cal-wrapper">
    <div class="cal-header" style="border:1px solid #eee;">
      <div class="l" @click="preMonth"><div class="arrow-left icon">&nbsp</div></div>
      <div class="title" style="font-size: 20px">{{curYearMonth}}</div>
      <div class="r" @click="nextMonth"><div class="arrow-right icon">&nbsp</div></div>
    </div>
    <div class="cal-body" style="border-left:1px solid #eee;border-right:1px solid #eee">
      <div class="weeks">
        <span
          v-for="(dayName, dayIndex) in i18n[calendar.options.locale].dayNames"
          class="item"
          :key="dayIndex"
        >
          {{i18n[calendar.options.locale].dayNames[(dayIndex + calendar.options.weekStartOn) % 7]}}
        </span>
      </div>
      <div class="dates" >
        <div v-for="date in dayList"  class="item dayItem" :class="date.color?'border_color':''" :style="{borderColor:date.status?date.color:''}">
          <p style="line-height: 32px;font-size: 18px" @click="handleChangeCurday(date)">
            <span v-if="date.status&&date.title==='Late'" style="color:#FCA131">{{date.status ? date.date.split('/')[2] : '&nbsp'}}</span>
            <span v-if="date.status&&date.title==='Early'" style="color:#6a8dfb">{{date.status ? date.date.split('/')[2] : '&nbsp'}}</span>
            <span v-if="date.status&&date.title==='NotSigned'" style="color:#fc2c96">{{date.status ? date.date.split('/')[2] : '&nbsp'}}</span>
            <span v-if="date.status&&date.title==='Absenteeism'" style="color:#fc2c96">{{date.status ? date.date.split('/')[2] : '&nbsp'}}</span>
            <span v-if="date.status&&!date.title" style="color:#333">{{date.status ? date.date.split('/')[2] : '&nbsp'}}</span>
          </p>
          <!--<span v-if="date.status ? (today == date.date) : false" class="is-today" :style="{backgroundColor: customColor }" ></span>-->
          <!--<span v-if="date.status ? (date.title != undefined) : false" class="is-event"-->
          <!--:style="{borderColor: customColor, backgroundColor: (date.date == selectedDay) ? customColor : 'inherit'}"></span>-->
          <span v-if="date.status&&date.title==='Late'" style="color:#fc2c96">
            <span class="time">{{date.start}} - {{date.end}}<br /></span>迟到
            <span v-if="date.status&&date.desc==='Early'">( 早退 )</span>
            <span v-if="date.status&&date.desc==='NotSigned'">( 未打卡 )</span>
            <span v-if="date.status&&date.desc==='Absenteeism'">( 旷工 )</span>
          </span>
          <span v-if="date.status&&date.title==='Early'" style="color:#fc2c96">
            <span class="time">{{date.start}} - {{date.end}}<br /></span>早退
            <span v-if="date.status&&date.desc==='Late'">( 迟到 )</span>
            <span v-if="date.status&&date.desc==='NotSigned'">( 未打卡 )</span>
            <span v-if="date.status&&date.desc==='Absenteeism'">( 旷工 )</span>
          </span>
          <span v-if="date.status&&date.title==='NotSigned'" style="color:#fc2c96">
            <span class="time">{{date.start}} - {{date.end}}<br /></span>未打卡
            <span v-if="date.status&&date.desc==='Late'">( 迟到 )</span>
            <span v-if="date.status&&date.desc==='Early'">( 早退 )</span>
            <span v-if="date.status&&date.desc==='Absenteeism'">( 旷工 )</span>
          </span>
          <span v-if="date.status&&date.title==='Absenteeism'" style="color:#fc2c96">
            <span class="time">{{date.start}} - {{date.end}}<br /></span>旷工
            <span v-if="date.status&&date.desc==='Late'">( 迟到 )</span>
            <span v-if="date.status&&date.desc==='Early'">( 早退 )</span>
            <span v-if="date.status&&date.desc==='NotSigned'">( 未打卡 )</span>
          </span>
          <span v-if="date.status&&!date.title" style="color:#bbb"><span class="time">09:00 - 18:00<br /></span>正常</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import i18n from '../i18n.js'
  import { dateTimeFormatter, isEqualDateStr} from '../tools.js'

  const inBrowser = typeof window !== 'undefined';
  export default {
    name: 'cal-panel',
    data () {
      return {
        i18n
      }
    },
    props: {
      events: {
        type: Array,
        required: true
      },
      calendar: {
        type: Object,
        required: true
      },
      selectedDay: {
        type: String,
        required: false
      }
    },
    computed: {
      dayList () {
        let firstDay = new Date(this.calendar.params.curYear, this.calendar.params.curMonth, 1);
        let dayOfWeek = firstDay.getDay();
        // 根据当前日期计算偏移量 // Calculate the offset based on the current date
        if (this.calendar.options.weekStartOn > dayOfWeek) {
          dayOfWeek = dayOfWeek - this.calendar.options.weekStartOn + 7
        } else {
          dayOfWeek = dayOfWeek - this.calendar.options.weekStartOn
        }

        let startDate = new Date(firstDay);
        startDate.setDate(firstDay.getDate() - dayOfWeek);

        let item, status, tempArr = [], tempItem;
        for (let i = 0 ; i < 42 ; i++) {
          item = new Date(startDate);
          item.setDate(startDate.getDate() + i);

          if (this.calendar.params.curMonth === item.getMonth()) {
            status = 1
          } else {
            status = 0
          }
          tempItem = {
            date: `${item.getFullYear()}/${item.getMonth()+1}/${item.getDate()}`,
            status: status,
            customClass: []
          };
          this.events.forEach((event) => {
            if (isEqualDateStr(event.date, tempItem.date)) {
              if(event.title){    
                  tempItem.color = '#fc2c96'      
              }
              tempItem.title = event.title;
              tempItem.title1 = event.title1;
              tempItem.start = event.start;
              tempItem.end = event.end;
              tempItem.desc = event.desc || '';
              if (event.customClass) tempItem.customClass.push(event.customClass)
            }
          });
          tempArr.push(tempItem)
        }
        return tempArr
      },
      today () {
        let dateObj = new Date();
        return `${dateObj.getFullYear()}/${dateObj.getMonth()+1}/${dateObj.getDate()}`
      },
      curYearMonth () {
        let tempDate = Date.parse(new Date(`${this.calendar.params.curYear}/${this.calendar.params.curMonth+1}/01`))
        return dateTimeFormatter(tempDate, this.i18n[this.calendar.options.locale].format)
      },
      customColor () {
        return this.calendar.options.color
      }
    },
    methods: {
      nextMonth () {
        this.$EventCalendar.nextMonth();
        
        this.$emit('month-changed', this.curYearMonth)
      },
      preMonth () {
        this.$EventCalendar.preMonth();
        this.$emit('month-changed', this.curYearMonth)
      },
      handleChangeCurday (date) {
//      if (date.status) {
//        this.$emit('cur-day-changed', date.date)
//      }
      }
    }
  }
</script>

<style scoped="" lang="scss">
  @font-face{
    font-family:Impact;//////字体名称
    src:url(../../assets/font/impact-2.ttf);  ////字体路径
  }
  .cal-wrapper{
    /*margin-bottom: 30px;*/
    font-family: 'Impact', sans-serif;
    .dayItem{
      border: 1px solid #eee;
      height: 90px;
    }

    .border_color{
      border-radius: 4px;
    }
    .weeks .item{
      color: #10fb2f;
    }
    .weeks .item:first-child{
      color: #ff5cf4;
    }
    .weeks .item:last-child{
      color: #ff5cf4;
    }
    .weeks{
      height: 60px;
    }
    .dates .time{
      font-family:sans-serif;
      margin: 3px 0;
      display: block;
      font-size: 16px;
    }
  }
  
</style>
