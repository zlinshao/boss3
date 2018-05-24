<template>
  <div>
    <div class="container">
      <div v-show="showType==='first'">
        <div class="title">您目前没有考试</div>
        <div class="content" v-show="showExamInfo">
          <div class="content_title">最近一场考试</div>
          <p>场次名称：{{examData.name}}</p>
          <p>考试时间：{{examData.start_time}}</p>
        </div>
        <p class="view_history" style="bottom: 50px;" @click="goHistory('exam')">查看历史考试>></p>
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
        showType: 'first',
        examId: '',
        examData: {},
        countDown: 0,
        timeString: '09:59:59',
        timeClear: '',
        examDataTime: '',
        showExamInfo: false,
      };
    },
    activated() {
      this.examId = '';
      this.confirmArrival = localStorage.getItem('confirmArrival');
      this.getQueryData();
      clearTimeout(this.timeClear);
      clearTimeout(this.examDataTime);
      if (this.examId){
        this.getExamData();
      }
    },
    watch: {
      examId(val) {
        if (val) {
          this.getExamData();
        }
      },
      countDown(num) {
        clearTimeout(this.timeClear);
        if (num >= 0) {
          this.clock(num / 1000);
        }
      },
      showType(val) {
        if (val === 'third') {
          clearTimeout(this.examDataTime);
        } else {
          this.examDataTime = setTimeout(() => {
            this.getExamData();
          }, 60 * 1000);
        }
      }
    },
    methods: {
      goHistory(val) {
        this.$router.push({path: '/LineCollege'});
      },
      getQueryData() {
        if (!this.$route.query.type) {
          this.examId = this.$store.state.onlineExam.before_exam.id;
          this.showType = this.$store.state.onlineExam.before_exam.type;
          this.$router.push({
            path: '/beforeExam',
            query: {
              id: this.$store.state.onlineExam.before_exam.id,
              type: this.$store.state.onlineExam.before_exam.type
            }
          });
        } else {
          this.$store.dispatch('beforeExam', this.$route.query);
          this.examId = this.$route.query.id;
          this.showType = this.$route.query.type;
        }
      },
      getExamData() {
        this.$http.get(globalConfig.server + 'exam/' + this.examId).then((res) => {
          if (res.data.code === '30000') {
            this.examData = res.data.data;
            if ((new Date(this.examData.start_time).getTime() - (new Date().getTime())) > 10 * 60 * 1000) {
              this.showType = 'first';
              this.showExamInfo = true;
            } else {
              if (this.showType != 'third') {
                if ((new Date(this.examData.start_time).getTime() - (new Date().getTime())) <= 10 * 60 * 1000 && (new Date(this.examData.start_time).getTime() - (new Date().getTime())) > 0) {
                  this.showType = 'second';
                  this.countDown = new Date(res.data.data.start_time).getTime() - (new Date().getTime());
                }
                if ((new Date().getTime()) > (new Date(this.examData.end_time).getTime())) {
                  this.showType = 'first';
                  this.showExamInfo = false;
                }
              }
            }
          }
        });
      },
      clock(n) {
        let val = Number(n);
        if (val < 0) {
          if (this.confirmArrival && this.confirmArrival.length > 0 && this.confirmArrival.indexOf(this.examData.id) > -1) {
            this.$router.push({path: '/answerExam', query: {id: this.examData.id}});
          } else {
            this.$http.post(globalConfig.server + 'exam/check_in/' + this.examData.id).then((res) => {
              if (res.data.code === '30000') {
                let arr = [];
                arr.push(this.examData.id);
                localStorage.setItem('confirmArrival', arr);  //保存已到场的考试id
                this.$router.push({path: '/answerExam', query: {id: this.examData.id}});
              }
            });
          }
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
