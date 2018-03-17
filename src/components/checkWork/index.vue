<template>
  <div>
    <div class="describe_border">
      <span class="count" style="color: #fce14f"> <i class="el-icon-time" style="font-size: 19px"></i> <span style="color: #787a7e;margin-right:4px;">迟到</span><span>{{this.late}}</span> 次</span>
      <span class="count" style="color: #6a8dfb"> <i class="el-icons-fa-clock-o" style="font-size: 19px"></i> <span style="color: #787a7e;margin-right:4px;">早退</span><span>{{this.early}}</span> 次</span>
      <span class="count" style="color: #fc2c96"> <i class="el-icons-fa-warning" style="font-size: 19px;margin-right:12px;"></i><span style="color: #787a7e;margin-right:4px;">旷工</span> <span>{{this.absent}}</span> 次</span>
      <span class="count" > <i class="iconfont icon-kaoqin1" style="color: #6a8dfb;font-size:19px"></i> <span style="color: #787a7e;margin-right:8px;">出勤天数</span> <span style="color: #6a8dfb">{{this.attend}}</span> 天</span>
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
import calendar from "../../calendar/vue-event-calendar.vue";
export default {
  name: "app",
  components: { calendar },
  data() {
    return {
      urls: globalConfig.server,
      late:0,  //迟到
      early:0,  //早退
      absent:0,  //旷工
      not_signed:0,  // 未打卡
      attend:0, //出勤天数
      demoEvents: [],
      eachitem:{
        date:'',
        start:'',
        end:'',
        title:'',
        desc:''
      }
    };
  },
  methods: {
    handleDayChanged(data) {
      data=data.split('/')[1]+"-"+data.split('/')[0];
      this.checkwork(data);
    },
    handleMonthChanged(data) {  
      data=data.split('/')[1]+"-"+data.split('/')[0];    
      this.checkwork(data);
    },
    checkwork:function(data){
          this.demoEvents= [];
          this.late=0;
          this.early=0;
          this.absent=0;
          this.attend=0;
          this.$http.get(this.urls+'attendance?year_month='+data).then((res) => {
         
          if (res.data.code === '20010') {
            let dataresult = res.data.data.result;
            this.late=res.data.data.late;
            this.early=res.data.data.early;
            this.absent=res.data.data.absent;
            this.attend=res.data.data.attend;
            let k=0;
            for(let i=0;i<dataresult.length;i++){
               this.eachitem={date:'',start:'',end:'',title:'',desc:''}
               for(let j=i+1;j<dataresult.length;j++){
                  if(dataresult[i].work_date == dataresult[j].work_date){
                      this.eachitem.date=dataresult[i].work_date.replace(/-/,"/").replace(/-/,"/");
                      if(dataresult[i].check_type == "OnDuty"){
                         this.eachitem.start=dataresult[i].user_check_time;
                         this.eachitem.end=dataresult[j].user_check_time;
                      }
                      else{
                         this.eachitem.start=dataresult[j].user_check_time;
                         this.eachitem.end=dataresult[i].user_check_time;                 
                      }
                      if(dataresult[i].time_result !='Normal'&& dataresult[j].time_result =='Normal'){
                       this.eachitem.title=dataresult[i].time_result;
                        
                      }
                      else if(dataresult[j].time_result !='Normal' && dataresult[i].time_result =='Normal'){
                        this.eachitem.title=dataresult[j].time_result;
                      }
                      else if(dataresult[i].time_result !='Normal' && dataresult[j].time_result !='Normal'){
                        this.eachitem.title=dataresult[i].time_result;
                        this.eachitem.desc=dataresult[j].time_result;
                      }
                      this.demoEvents.push(this.eachitem);
                  }
               }
            }
          }
         
        }) 
    }
  },
  created: function() {   
        let date = new Date();
        let seperator1 = "-";
        let year = date.getFullYear();
        let month = date.getMonth() + 1;
        if (month >= 1 && month <= 9) {
            month = "0" + month;
        }
        let data = year + seperator1 + month;  
        this.checkwork(data);
  
  }
};
</script>

<style scoped="" lang="scss">
@font-face {
  font-family: Impact; //字体名称
  src: url(../../assets/font/impact-2.ttf); //字体路径
}
.count {
  margin-right: 72px;
}
.describe_border {
  font-family: "Impact", sans-serif;
  font-size: 17px;
  padding: 25px;
  border-radius: 4px;
  color: #6a8dfb;
  margin-bottom: 15px;
  border: 1px solid rgba(64, 158, 255, 0.12);
  box-shadow: 0 4px 8px 0 rgba(64, 158, 255, 0.12),
    0 0 6px 0 rgba(64, 158, 255, 0.04);
}
.describe_border i {
  margin-right: 8px;
}
</style>

