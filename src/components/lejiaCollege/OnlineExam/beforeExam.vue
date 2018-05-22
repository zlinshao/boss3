<template>
  <div>
    <div class="container">
      <div v-show="showType==='first'">
        <div class="title">您目前没有考试</div>
        <div class="content">
          <div class="content_title">最近一场考试</div>
          <p>场次名称：{{examData.name}}</p>
          <p>考试时间：{{examData.start_time}}</p>
        </div>
        <p class="view_history" @click="goHistory('exam')">查看历史考试>></p>
      </div>
      <div v-show="showType==='second'">
        <div class="title">开考倒计时</div>
        <div class="count_down">{{timeString}}</div>
        <div class="content">
          <p>场次名称：{{examData.name}}</p>
          <p>考试时间：{{examData.start_time}}</p>
          <p>试卷时长：{{examData.duration}}分钟</p>
        </div>
        <p class="view_history" @click="goHistory('exam')">查看历史考试>></p>
      </div>
      <div v-show="showType==='third'">
        <div class="title" style="font-size: 50px;">您已超过规定开考时间</div>
        <div class="count_down">无法参加考试</div>
        <div class="content">
          <p>如有疑问，请联系主考官</p>
        </div>
        <p class="view_history" @click="goHistory">查看历史考试>></p>
      </div>
    </div>
  </div>

</template>

<script>
  export default {
    name: "before-exam",
    data() {
      return {
        showType: 'third',
        examId: '',
        examData: {},
        countDown: 0,
        timeString: '09:59:59',
        timeClear: '',
      };
    },
    activated() {
      this.examId = '';
      this.getExamNaireRedCircle();
      clearTimeout(this.timeClear);
    },
    watch: {
      examId(val) {
        if(val){
          this.getExamData();
        }
      },
      countDown(num) {
        clearTimeout(this.timeClear);
        if (num >= 0) {
          this.clock(num/1000);
        }
      }
    },
    methods: {
      goHistory(val) {
        this.$router.push({path: '/LineCollege'});
      },
      getExamNaireRedCircle() {
        this.$http.get(globalConfig.server + 'exam/active').then((res) => {
          if (res.data.code === '30000') {
            this.examId = res.data.data && res.data.data.id;
          }
        });
      },
      getExamData() {
        this.$http.get(globalConfig.server+ 'exam/'+this.examId).then((res)=>{
          if(res.data.code === '30000') {
            this.examData = res.data.data;
            // if((new Date(this.examData.start_time).getTime() - (new Date().getTime())) > 10*60*1000){
            //   this.showType = 'first';
            // }else{
              this.showType = 'second';
              this.countDown = new Date(res.data.data.start_time).getTime() - (new Date().getTime());
            // }
          }
        });
      },
      clock(n) {
        let val = Number(n);
        if(val<0){
          this.$router.push({path: '/answerExam', query: {id: this.examData.id}});
          return;
        }
        let h = Number(Math.floor(val / 3600));
        let m = 0, s = 0;
        if ((val - h * 3600) >= 0) {
          m = Number(Math.floor((val - h * 3600) / 60));
          if ((val - h * 3600 - m * 60) >= 0) {
            s = Number(Math.floor(val - h * 3600 - m * 60));
          }
        }
        if (h < 10) {
          h = '0' + h;
        }
        if (m < 10) {
          m = '0' + m;
        }
        if (s < 10) {
          s = '0' + s;
        }
        this.timeString = h + ':' + m + ':' + s;
        val--;
        this.timeClear = setTimeout(() => {
          this.clock(val);
        }, 1000);
      },
    }
  };
</script>

<style lang="scss" scoped>
  .container {
    color: #999;
    width: 100%;
    min-height: 800px;
    text-align: center;
    position: relative;
    .title {
      font-size: 60px;
      position: absolute;
      margin: 0 auto;
      top: 130px;
      left: 0;
      width: 100%;
      filter: alpha(opacity=30);
      -ms-filter: "alpha(opacity=30)";
    }
    .count_down {
      font-size: 50px;
      position: absolute;
      margin: 0 auto;
      top: 210px;
      left: 0;
      width: 100%;
    }
    .content {
      color: #393939;
      margin-top: 330px;
      background-color: #dfe6fb;
      border-radius: 8px;
      display: inline-block;
      padding: 20px 100px;
      position: relative;
      text-align: left;
      .content_title {
        margin-top: 10px;
      }
    }
    .view_history {
      cursor: pointer;
      margin-top: 200px;
      color: #39b1ff;
      position: absolute;
      bottom: 20px;
      width: 100%;
      margin: 0 auto;
    }

  }

</style>
