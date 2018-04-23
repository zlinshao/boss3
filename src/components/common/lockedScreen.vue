<template>
  <div id="locking">
    <div class="clock" v-if="year" style="position: fixed;top: 80px;left: 150px;">
      <div style="font-size: 48px;">{{hours}}:{{minutes}}:{{seconds}}</div>
      <div style="font-size: 18px;width: 197px;display:flex;justify-content: space-between">
        <span>{{year}}-{{months}}-{{day}}</span>
        <span>{{week}}</span>
      </div>
      <div style="font-size: 17px;color: #6a8dfb;margin-top: 60px">
        {{xljt}}
      </div>
    </div>
    <div class="lock_container">
      <div class="header">
        <img v-if="personal && personal.avatar" :src="personal.avatar" alt="">
        <img src="../../assets/images/head.jpg" v-else="" alt="">
      </div>
      <div v-if="personal && personal.name" class="name">{{personal.name}}</div>
      <div class="name" v-else="">LEJIA</div>
      <div class="input">
        <el-input placeholder="请输入密码" type="password" @keyup.enter.native="btnClick" v-model="keywords"></el-input>
        <el-button type="text" class="el-icons-fa-arrow-circle-right deBlocking" @click="btnClick"></el-button>
      </div>
      <!--<a href="javascript:;" style="font-size: 14px;color: #6a8dfb">-->
        <!--忘记密码？-->
      <!--</a>-->
    </div>

    <div style="position: fixed;bottom: 120px;right: 170px;">
      <div class="log_off" @click="log_off" title="注销">
        <img src="../../assets/images/log_out.png" alt="">
      </div>
    </div>

    <!--<SetLockPwd :setLockPwdDialog="setLockPwdDialog" :type="type" @close="closeModal"></SetLockPwd>-->
  </div>
</template>

<script>
  import SetLockPwd from './setLockPwd.vue'
  import Cookies from 'js-cookie';
  export default {
    name: 'hello',
    components:{SetLockPwd},
    data () {
      return {
        setLockPwdDialog:false,
        type:'onlySetPwd',
        keywords: '',
        personal: {},
        interval: null,
        year: '',
        months: '',
        day: '',
        hours: '',
        minutes: '',
        seconds: '',
        xljt: '',
        xljxArray:[
          '幸福是持续地拥有满足感和知足感^_^',
          '喝一杯咖啡，放松一下自己^_^',
          '像蜜蜂一样勤劳工作才能享受蜜甜生活^_^',
          '再忙，也别忘了照顾自己^_^' ,
          '丢下一些包袱后，你会惊讶的发现，原来自己可以飞的那么高^_^' ,
          '做一个微笑挂在嘴边，快乐放在心上的人^_^',
          '将来的你，一定会感谢现在拼命努力的你^_^',
          '理想是一面旗帜，信念是一枚火炬^_^',
          '休息，休息一会', '喝杯茶吧, 让精神抖擞一下^_^'
        ],
      }
    },
    mounted(){
      this.getFlag();
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
      getFlag(){
          this.$http.get(globalConfig.server + "special/special/loginInfo").then((res) => {
            localStorage.setItem('personal', JSON.stringify(res.data.data));
            globalConfig.personal = res.data.data.data;
          });
        let length = this.xljxArray.length;
        let num = Math.floor(Math.random()*length);
        this.xljt = this.xljxArray[num]?this.xljxArray[num]:'乐伽不止眼前的合同，还有诗和远方的田野！';
      },
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
        this.$http.get(globalConfig.server + "logout").then(res => {
          sessionStorage.setItem('lockStatus', 0);
          this.$router.push('/login');
        });
      },
      closeModal(){

      },
      btnClick(){
        this.$http.get(globalConfig.server + 'special/special/unlock_screen?pwd_lock=' + this.keywords).then((res) => {
          if (res.data.code === '100200') {

          let badge = true;
          this.$store.dispatch('badgeFlag', badge);
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
            console.log(this.$notify.warning)
            this.keywords = '';
            this.$notify.warning({
              title: '警告',
              message: res.data.msg,
            });
          }
        })

      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped="">
  #locking {
    font-family: '苹方-简', sans-serif;
    font-weight: lighter;
    letter-spacing: 1px;
    user-select: none;
    position: absolute;
    z-index: 99999;
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
    background: url("../../assets/images/背景.png") no-repeat;
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
        position: relative;
        .deBlocking{
          font-size: 25px;
          position: absolute;
          top: -5px;
          right: 10px;
        }
      }
    }

  }
</style>
