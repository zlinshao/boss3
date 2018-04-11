<template>
  <div id="locking">
    <div class="clock" v-if="year" style="position: fixed;top: 80px;left: 150px;">
      <div style="font-size: 50px;">{{hours}}:{{minutes}}:{{seconds}}</div>
      <div style="font-size: 18px;width: 197px;display:flex;justify-content: space-between">
        <span>{{year}}-{{months}}-{{day}}</span>
        <span>{{week}}</span>
      </div>
      <div style="font-size: 16px;color: #6a8dfb;margin-top: 60px">
        乐伽不止眼前的合同，还有诗和远方的田野！
      </div>
    </div>
    <div class="lock_container">
      <div class="header">
        <img v-if="personal && personal.avatar" :src="personal.avatar" alt="">
        <img src="../../../../assets/images/head.jpg" v-else="" alt="">
      </div>
      <div v-if="personal && personal.name" class="name">{{personal.name}}</div>
      <div class="name" v-else="">LEJIA</div>
      <div class="input">
        <el-input placeholder="请输入密码" type="password" @keyup.enter.native="btnClick" v-model="keywords"></el-input>
      </div>
    </div>

    <div style="position: fixed;bottom: 120px;right: 170px;">
      <div class="log_off" @click="log_off">
        <img src="../../../../assets/images/log_out.png" alt="">
      </div>
    </div>
  </div>
</template>

<script>
  import Cookies from 'js-cookie';
  export default {
    name: 'hello',
    data () {
      return {
        keywords: '',
        personal: {},
        interval: null,
        year: '',
        months: '',
        day: '',
        hours: '',
        minutes: '',
        seconds: '',
      }
    },
    mounted(){
      clearInterval(this.interval);
      this.times();
      this.interval = setInterval(() => {
        this.times();
      }, 1000);

      this.personal = JSON.parse(localStorage.personal);
      let height = window.innerHeight;
      let lock_div = document.getElementById('locking');
      window.onresize = function () {
        height = window.innerHeight;
        lock_div.style.height = height + 'px';
      };
      lock_div.style.height = height + 'px';
    },
    methods: {
      times(){
        let date = new Date();
        this.year = date.getFullYear() + "";
        this.months = date.getMonth() + 1;
        this.months = this.months < 10 ? '0' + this.months : this.months + "";
        this.day = date.getDate();
        this.day = this.day < 10 ? '0' + this.day : this.day + "";
        this.hours = date.getHours();
        this.hours = this.hours < 10 ? '0' + this.hours : this.hours + "";
        this.minutes = date.getMinutes();
        this.minutes = this.minutes < 10 ? '0' + this.minutes : this.minutes + "";
        this.seconds = date.getSeconds();
        this.seconds = this.seconds < 10 ? '0' + this.seconds : this.seconds + "";
        let weekArray = new Array("日", "一", "二", "三", "四", "五", "六");
        let week = new Date().getDay();
        this.week = "星期"+ weekArray[week];
      },
      log_off(){
        this.$router.push('/login');
      },
      btnClick(){
        this.$http.get(globalConfig.server + 'special/special/unlock_screen?pwd_lock=' + this.keywords).then((res) => {
          if (res.data.code === '100200') {
            new Promise((resolve, reject) => {
              sessionStorage.setItem('lockStatus', 0);
              if (Number(sessionStorage.getItem('lockStatus')) !== 1) {
                resolve();
              }
            }).then((data) => {
              if (sessionStorage.getItem('beforePath') === '/lock') {
                this.$router.push('/main');
              } else {
                this.$router.push({path: sessionStorage.getItem('beforePath')});
              }
            });
          } else if (res.data.code === '100202') {
            new Promise((resolve, reject) => {
              sessionStorage.setItem('lockStatus', 0);
              if (Number(sessionStorage.getItem('lockStatus')) !== 1) {
                resolve();
              }
            }).then((data) => {
              this.$notify({
                title: '警告',
                message: '登陆已过期，请重新登陆！',
                type: 'warning'
              });
              this.$router.push({path: '/login'});
            });
          } else {
            this.keywords = '';
            this.$notify({
              title: '警告',
              message: res.data.msg,
              type: 'warning'
            });
          }
        })

      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">

  #locking {
    font-family: 'NSimSun', sans-serif;
    .log_off {
      width: 40px;
      height: 40px;
      border-radius: 50%;
      background: #ffffff;
      display: flex;
      cursor: pointer;
      align-items: center;
      justify-content: center;
      img {
        width: 18px;
        transition: all .3s;
      }
      &:hover img {
        width: 22px;
      }
    }
    width: 100vw;
    height: 100%;
    background: url("../../../../assets/images/背景.png") no-repeat;
    background-size: 100% 100%;
    .lock_container {
      width: 250px;
      height: 300px;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      > div {
        margin-bottom: 10px;
      }
      .header {
        text-align: center;
        img {
          width: 90px;
          height: 90px;
          border-radius: 50%;
        }
      }
      .name {
        text-align: center;
        font-size: 16px;
        font-weight: bold;
      }
      div.input {
        margin-top: 60px;
        text-align: center;
        width: 250px;
        .el-input__inner {
          border-radius: 20px;
          border: 1px solid rgba(64,158,255,.12);
          box-shadow: 0 2px 4px 0 rgba(64,158,255,.12), 0 0 6px 0 rgba(64,158,255,.04);
        }
      }
    }

  }
</style>
