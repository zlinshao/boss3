<template>
  <div id="login">
    <div class="container">
      <div class="top">
        <div class="beijing"></div>
        <div class="logo">
          <img src="../assets/images/maotou.png" alt="">
        </div>
        <div class="slogan">
          <img src="../assets/images/slogan.png" style="width: 100%" alt="">
        </div>
        <div class="loginType">
          <div><img src="../assets/images/dd2.png" alt=""></div>
          <div><img src="../assets/images/sj.png" alt=""></div>
          <div><img src="../assets/images/weixin1.png" alt=""></div>
        </div>
      </div>
      <div class="formItem">
        <el-input placeholder="请输入手机号">
          <template slot="append">
            <span class="china">中国</span> +86
          </template>
        </el-input>
        <el-input placeholder="请输入6位短信验证码">
          <el-button slot="append" size="small" type="success">获取验证码</el-button>
        </el-input>

        <el-checkbox>记录本机登陆方式！</el-checkbox>

        <div class="confirmLogin">
          <el-button size="medium" type="primary"  @click.native.prevent="handleSubmit2" :loading="logining">登 陆</el-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  //import NProgress from 'nprogress'
  export default {
    data() {
      return {
        logining: false,
        ruleForm2: {
          account: 'admin',
          checkPass: '123456'
        },
        checked: true
      };
    },
    mounted(){
//      this.getBackground();
    },
    methods: {
      //背景特效
      getBackground(){
        let canvas = document.getElementById('canvas'),
          ctx = canvas.getContext('2d'),
          w = canvas.width = window.innerWidth - 10,
          h = canvas.height = window.innerHeight - 10,
          hue = 217,
          stars = [],
          count = 0,
          maxStars = 1300;//星星数量

        //实时监测浏览器窗口的大小
        window.onresize = function () {
          w = canvas.width = window.innerWidth - 10;
          h = canvas.height = window.innerHeight - 10;
        };

        let canvas2 = document.createElement('canvas'),
          ctx2 = canvas2.getContext('2d');
        canvas2.width = 100;
        canvas2.height = 100;
        let half = canvas2.width / 2,
          gradient2 = ctx2.createRadialGradient(half, half, 0, half, half, half);
        gradient2.addColorStop(0.025, '#CCC');
        gradient2.addColorStop(0.1, 'hsl(' + hue + ', 61%, 33%)');
        gradient2.addColorStop(0.25, 'hsl(' + hue + ', 64%, 6%)');
        gradient2.addColorStop(1, 'transparent');

        ctx2.fillStyle = gradient2;
        ctx2.beginPath();
        ctx2.arc(half, half, half, 0, Math.PI * 2);
        ctx2.fill();

        // End cache

        function random(min, max) {
          if (arguments.length < 2) {
            max = min;
            min = 0;
          }

          if (min > max) {
            let hold = max;
            max = min;
            min = hold;
          }

          return Math.floor(Math.random() * (max - min + 1)) + min;
        }

        function maxOrbit(x, y) {
          let max = Math.max(x, y),
            diameter = Math.round(Math.sqrt(max * max + max * max));
          return diameter / 2;
          //星星移动范围，值越大范围越小，
        }

        let Star = function () {

          this.orbitRadius = random(maxOrbit(w, h));
          this.radius = random(60, this.orbitRadius) / 8;
          //星星大小
          this.orbitX = w / 2;
          this.orbitY = h / 2;
          this.timePassed = random(0, maxStars);
          this.speed = random(this.orbitRadius) / 50000;
          //星星移动速度
          this.alpha = random(2, 10) / 10;

          count++;
          stars[count] = this;
        };

        Star.prototype.draw = function () {
          let x = Math.sin(this.timePassed) * this.orbitRadius + this.orbitX,
            y = Math.cos(this.timePassed) * this.orbitRadius + this.orbitY,
            twinkle = random(10);

          if (twinkle === 1 && this.alpha > 0) {
            this.alpha -= 0.05;
          } else if (twinkle === 2 && this.alpha < 1) {
            this.alpha += 0.05;
          }

          ctx.globalAlpha = this.alpha;
          ctx.drawImage(canvas2, x - this.radius / 2, y - this.radius / 2, this.radius, this.radius);
          this.timePassed += this.speed;
        };

        for (let i = 0; i < maxStars; i++) {
          new Star();
        }

        function animation() {
          ctx.globalCompositeOperation = 'source-over';
          ctx.globalAlpha = 0.5; //尾巴
          ctx.fillStyle = 'hsla(' + hue + ', 64%, 6%, 2)';
          ctx.fillRect(0, 0, w, h)

          ctx.globalCompositeOperation = 'lighter';
          for (let i = 1, l = stars.length; i < l; i++) {
            stars[i].draw();
          }

          window.requestAnimationFrame(animation);
        }

        animation();
      },


      handleReset2() {
        this.$refs.ruleForm2.resetFields();
      },
      handleSubmit2(ev) {
        sessionStorage.setItem('user', JSON.stringify(this.ruleForm2));
        this.$router.push({path: '/main'});

//        this.$refs.ruleForm2.validate((valid) => {
//          if (valid) {
//            //_this.$router.replace('/table');
//            this.logining = true;
//            //NProgress.start();
//            let loginParams = { username: this.ruleForm2.account, password: this.ruleForm2.checkPass };
//            requestLogin(loginParams).then(data => {
//              this.logining = false;
//              //NProgress.done();
//              let { msg, code, user } = data;
//              if (code !== 200) {
//                this.$message({
//                  message: msg,
//                  type: 'error'
//                });
//              } else {
//                sessionStorage.setItem('user', JSON.stringify(user));
//                this.$router.push({ path: '/table' });
//              }
//            });
//          } else {
//            console.log('error submit!!');
//            return false;
//          }
//        });
      }
    }
  }

</script>

<style lang="scss">
  #login {
    width: 100vw;
    height: 100%;
    /*background: linear-gradient(to bottom right,#d6d6f7, #d6ebed 40%, #f4f3f6 65%);*/
    background: url("../assets/images/背景.png") no-repeat;
    background-size: 100% 100%;
    .container {
      width: 612px;
      min-height: 450px;
      border-radius: 5px;
      padding: 0;
      /*background: url("../assets/images/椭圆646.png") no-repeat;*/
      /*background-size: 100% 100%;*/
      background: #FFFFFF;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      border: 1px solid rgba(64, 158, 255, .12);
      box-shadow: 0 3px 6px 0 rgba(64, 158, 255, .2), 0 0 6px 0 rgba(64, 158, 255, .04);

      .top {
        width: 100%;
        height: 270px;
        background: #fcfbfc;
        box-sizing: border-box;
        .beijing{
          height: 95px;
          background: url("../assets/images/lanyuan.png") no-repeat;
          background-size: 100% 100%;
        }
        .logo {
          text-align: center;
          margin-top: -55px;
        }
        .slogan {
          width: 230px;
          margin: 10px auto 30px;
        }
        .loginType{
          width: 380px;
          margin:0 auto ;
          display: flex;
          justify-content: space-between;
          >div{
            cursor: pointer;
          }
        }
      }

      .formItem {
        padding: 0 50px;
      }
      .el-input__inner {
        border: none;
        border-bottom: 1px solid #f4f3f6;
        border-radius: 0;
        height: 80px;
      }

      .el-checkbox {
        color: #909399;
        margin: 18px 0;
      }
      .confirmLogin {
        margin: 30px 0 50px 0;
        .el-button--primary {
          background: #6a8dfb;
          border-color: #6a8dfb;
          width: 100%;
          &:hover {
            opacity: .8;
          }
        }
      }

      .el-input-group__append, .el-input-group__prepend {
        background-color: #fff;
        border: none;
        border-bottom: 1px solid #f4f3f6;
        border-radius: 0;
        height: 60px;
        .china {
          padding: 0 30px;
          border-left: 1px solid #babbbc;
        }
        .el-button--success {
          color: #fff;
          background-color: #58d788;
          border-color: #58d788;
          &:hover {
            opacity: .8;
          }
        }
      }
    }
  }


</style>
