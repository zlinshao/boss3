<template>
  <div class="backgroundImg">


    <div class="foo">
      <span class="letter" data-letter="B">B</span>
      <span class="letter" data-letter="O">O</span>
      <span class="letter" data-letter="S">S</span>
      <span class="letter" data-letter="S">S</span>
    </div>

    <el-form :model="ruleForm2" :rules="rules2" ref="ruleForm2" class="demo-ruleForm login-container">
      <h3 class="title">系统登录</h3>
      <el-form-item prop="account">
        <el-input type="text" v-model="ruleForm2.account" auto-complete="off" placeholder="账号"></el-input>
      </el-form-item>
      <el-form-item prop="checkPass">
        <el-input type="password" v-model="ruleForm2.checkPass" auto-complete="off" placeholder="密码"></el-input>
      </el-form-item>
      <el-checkbox v-model="checked" checked class="remember">记住密码</el-checkbox>
      <el-form-item style="width:100%;">
        <el-button type="primary" style="width:100%;" @click.native.prevent="handleSubmit2" :loading="logining">登录
        </el-button>
      </el-form-item>
    </el-form>


    <!--星空背景-->
    <!--<div class="header" id="demo">-->
      <!--<canvas id="canvas"></canvas>-->
    <!--</div>-->

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
        rules2: {
          account: [
            {required: true, message: '请输入账号', trigger: 'blur'},
            //{ validator: validaePass }
          ],
          checkPass: [
            {required: true, message: '请输入密码', trigger: 'blur'},
            //{ validator: validaePass2 }
          ]
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
          w = canvas.width = window.innerWidth-10,
          h = canvas.height = window.innerHeight-10,
          hue = 217,
          stars = [],
          count = 0,
          maxStars = 1300;//星星数量

        //实时监测浏览器窗口的大小
        window.onresize = function () {
          w = canvas.width = window.innerWidth-10;
          h = canvas.height = window.innerHeight-10;
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

<style lang="scss" scoped>
  .backgroundImg {
    width: 100vw;
    height:100vh;
    background: #409EFF ;
    position: relative;
    .login-container {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      z-index: 1000;
      -webkit-border-radius: 5px;
      border-radius: 5px;
      -moz-border-radius: 5px;
      background-clip: padding-box;
      width: 350px;
      padding: 35px 35px 15px 35px;
      background: #fff;
      opacity: .8;
      border: 1px solid #eaeaea;
      box-shadow: 0 0 25px #cac6c6;
      .title {
        margin: 0 auto 40px auto;
        text-align: center;
        color: #666;
      }
      .remember {
        margin: 0 0 35px 0;
      }
    }


    div.foo {
      padding-top: 100px;
      width: 90%;
      margin: 0 auto;
      text-align: center;
      .letter {
        display: inline-block;
        font-weight: 900;
        font-size: 8em;
        margin: 0.2em;
        position: relative;
        color: #00B4F1;
        transform-style: preserve-3d;
        z-index: 1;
        transition: all 0.3s ease-in-out;
        &:before, &:after {
          position: absolute;
          content: attr(data-letter);
          transform-origin: top left;
          top: 0;
          left: 0;
        }

        &:before, &:after {
          transition: all 0.3s ease-in-out;
        }

        &:before {
          color: #fff;
          text-shadow: -1px 0px 1px rgba(255, 255, 255, .8),
          1px 0px 1px rgba(0, 0, 0, .8);
          z-index: 3;
          transform: rotateX(0deg) rotateY(-15deg) rotateZ(0deg);
        }

        &:after {
          color: rgba(0, 0, 0, .11);
          z-index: 2;
          transform: scale(1.08, 1) rotateX(0deg) rotateY(0deg) rotateZ(0deg) skew(0deg, 1deg);
        }

        &:hover:before {
          color: #fafafa;
          transform: rotateX(0deg) rotateY(-40deg) rotateZ(0deg);
        }

        &:hover:after {
          transform: scale(1.08, 1) rotateX(0deg) rotateY(40deg) rotateZ(0deg) skew(0deg, 22deg);
        }
      }
    }
  }


</style>
