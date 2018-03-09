<template>
  <div>
    <div class="describe_border">
      <span class="count"> <i class="el-icon-time" style="color: #fce14f;font-size: 20px"></i> 迟到 <span style="color: #fce14f">2</span> 次</span>
      <span class="count"> <i class="el-icons-fa-clock-o" style="color: #6a8dfb;font-size: 20px"></i> 早退 <span style="color: #6a8dfb">2</span> 次</span>
      <span class="count"> <i class="el-icons-fa-warning" style="color: #fc2c96;font-size: 20px"></i> 旷工 <span style="color: #fc2c96">2</span> 次</span>
    </div>
    <calendar
      :events="demoEvents"
      @day-changed="handleDayChanged"
      @month-changed="handleMonthChanged"
    ></calendar>
  </div>
</template>

<script>
  let today = new Date();
  import calendar from '../../calendar/vue-event-calendar.vue'
  export default {
    name: 'app',
    components:{calendar},
    data () {
      return {
        demoEvents: [
          {date: "2018/2/1",title:'迟到'},

          {date: "2018/2/4",title:'迟到'},

          {date: "2018/2/6",title:'迟到'},

          {date: "2018/2/9",title:'迟到'},

          {date: "2018/2/12",title:'早退'},

          {date: "2018/2/22",title:'旷工'}
        ]
      }
    },
    methods: {
      handleDayChanged (data) {
        console.log(data)
      },
      handleMonthChanged (data) {
      }
    }
  }
</script>

<style scoped="" lang="scss">

  @font-face{
    font-family:Impact;                           //字体名称
    src:url(../../assets/font/impact-2.ttf);      //字体路径
  }
  .count{
    margin-right: 80px;
  }
  .describe_border{
    font-family: 'Impact', sans-serif;
    font-size: 16px;
    padding: 25px;
    border-radius: 4px;
    color: #6a8dfb;
    margin-bottom: 15px;
    border: 1px solid rgba(64,158,255,.12);
    box-shadow: 0 4px 8px 0 rgba(64,158,255,.12), 0 0 6px 0 rgba(64,158,255,.04);
  }
</style>

