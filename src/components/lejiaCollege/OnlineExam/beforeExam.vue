<template>
  <div>
    <div class="container">
      <div class="content" v-show="showType==='first'">
        <div class="content_img"><img src="../../../assets/images/examination/waiting.png"></div>
        <div class="content_right">
          <div class="title">您目前没有考试</div>
          <div v-show="showExamInfo" style="margin-top: 20px;line-height: 0;margin-bottom: 10px;">
            <div style="color: #606266b5;">最近一场</div>
            <div style="margin-top: 15px;color: #666;line-height: 25px;">
              <div>场次名称：{{examData.name}}</div>
              <div>考试时间：{{examData.start_time}}</div>
            </div>
          </div>
          <el-button class="view_history" :class="{'bottom': !showExamInfo}" @click="goHistory">查看历史考试</el-button>
        </div>
      </div>
      <div class="content" v-show="showType==='second'">
        <div class="content_img"><img src="../../../assets/images/examination/count_down.png"></div>
        <div class="content_right" style="padding-left: 270px;">
          <div class="title">开考倒计时 <span class="count_down">{{timeString}}</span></div>
          <div style="margin-top: 15px;color: #666;line-height: 10px;">
            <p>场次名称：{{examData.name}}</p>
            <p>考试时间：{{examData.start_time}}</p>
            <p>试卷时长：{{examData.duration}}分钟</p>
          </div>
          <el-button class="view_history" @click="goHistory">查看历史考试</el-button>
        </div>

      </div>
      <div class="content" v-show="showType==='third'">
        <div class="content_img"><img src="../../../assets/images/examination/time_out.png"></div>
        <div class="content_right" style="padding-left: 260px;">
          <div class="title" style="font-size: 50px;">您已超过规定开考时间</div>
          <div class="count_down" style="margin-left: 0px;">无法参加考试</div>
          <div style="margin-top: 15px;color: #666;line-height: 10px;">
            <p>如有疑问，请联系主考官</p>
          </div>
          <el-button class="view_history" @click="goHistory">查看历史考试</el-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "before-exam",
    data() {
      return {
        showType: '',
        examId: '',
        examData: {},
        countDown: 0,
        timeString: '09:59:59',
        timeClear: '',
        examDataTime: '',
        showExamInfo: false,
        flag: true,
      };
    },
    activated() {
      this.examId = '';
      this.confirmArrival = JSON.parse(localStorage.getItem('confirmArrivals'));
      this.getQueryData();
      clearTimeout(this.timeClear);
      clearTimeout(this.examDataTime);
      if (this.examId) {
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
        this.clock((num / 1000)+3);
      },
    },
    methods: {
      goHistory(val) {
        this.$router.push({path: '/LineCollege'});
      },
      getQueryData() {
        if (!this.$route.query.address) {
          this.examId = this.$store.state.onlineExam.before_exam.id;
          this.showType = this.$store.state.onlineExam.before_exam.type;
          this.$router.push({
            path: '/beforeExam',
            query: {
              id: this.$store.state.onlineExam.before_exam.id,
              type: this.$store.state.onlineExam.before_exam.type,
              address: this.$store.state.onlineExam.before_exam.address,
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
          this.flag = true;
          if (res.data.code === '30000') {
            this.examData = res.data.data;
            if ((new Date(this.examData.start_time).getTime() - (new Date().getTime())) > 10 * 60 * 1000) {
              this.showType = 'first';
              this.showExamInfo = true;
            } else {
              if ((new Date(this.examData.start_time).getTime() - (new Date().getTime())) <= 10 * 60 * 1000 && (new Date(this.examData.start_time).getTime() - (new Date().getTime())) > 0) {
                this.flag = false;
                clearTimeout(this.examDataTime);
                this.showType = 'second';
                this.countDown = new Date(res.data.data.start_time).getTime() - (new Date().getTime());
              }
              if ((new Date().getTime()) > (new Date(this.examData.end_time).getTime())) {
                // 考试已结束，没有考试
                this.showType = 'first';
                this.showExamInfo = false;
              } else {
                if (this.confirmArrival && this.confirmArrival.length > 0 && this.confirmArrival.indexOf(this.examId) > -1) {
                  this.$router.push({path: '/answerExam', query: {id: this.examId}});
                } else {
                  this.sign_in(this.examId);
                }

              }
            }
          }
        });
      },
      // 考试签到
      sign_in(id) {
        this.$http.post(globalConfig.server + 'exam/check_in/' + id).then((res) => {
          if (res.data.code === '30000') {
            let examIds;
            if (this.confirmArrival === null) {
              examIds = [];
            } else {
              examIds = this.confirmArrival;
            }
            examIds.push(this.examData.id);
            localStorage.setItem('confirmArrivals', JSON.stringify(examIds));  //保存已到场的考试id
            this.$router.push({path: '/answerExam', query: {id: id}});
          } else if (res.data.code === '30003') {
            this.showType = 'third';
          } else if (res.data.code === '30004') {
            this.getExamData();
          }
        });
      },
      clock(n) {
        let val = Number(n);
        if (val <= 0) {
          if (this.confirmArrival && this.confirmArrival.length > 0 && this.confirmArrival.indexOf(this.examData.id) > -1) {
            this.$router.push({path: '/answerExam', query: {id: this.examData.id}});
          } else {
            this.sign_in(this.examData.id);
          }
          let that = this;
          clearTimeout(that.timeClear);
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
    width: 100%;
    min-height: 800px;
    position: relative;
    box-shadow: 0px 0px 3px 1px #dfe6fb;
    .content {
      display: inline-block;
      position: absolute;
      top: 28%;
      width: 70%;
      left: 30%;
      /*background-color: #dfe6fb;*/
      .content_img {
        float: left;
      }
      .content_right {
        padding-left: 300px;
        .title {
          font-size: 35px;
          margin: 0 auto;
          left: 0;
          width: 100%;
          filter: alpha(opacity=30);
          -ms-filter: "alpha(opacity=30)";
          color: rgba(106, 141, 251, 0.75);

        }
        .count_down {
          margin-left: 20px;
          font-size: 30px;
          color: #fb4699c9;
        }

        .view_history {
          cursor: pointer;
          position: absolute;
          background: #6a8dfb;
          color: #fff;
          bottom: -8px;
        }
        .bottom {
          bottom: 10px;
        }
      }
    }

  }

</style>
