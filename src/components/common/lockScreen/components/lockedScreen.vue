<template>
  <div id="locking">
    <div class="lock_container">
      <div class="header">
        <img src="../../../../assets/images/head.jpg" alt="">
      </div>
      <div class="name">
        LEJIA
      </div>
      <div class="input">
        <el-input placeholder="请输入密码" type="password" @keyup.enter.native="btnClick" v-model="keywords"></el-input>
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
        keywords: ''
      }
    },
    mounted(){
      let height = window.innerHeight;
      let lock_div  = document.getElementById('locking');
      window.onresize = function(){
          height=window.innerHeight;
        lock_div.style.height = height+'px';
      };
      lock_div.style.height = height+'px';
    },
    methods: {
      btnClick(){
        this.$http.get(globalConfig.server+'special/special/unlock_screen?pwd_lock='+this.keywords).then((res)=>{
          if(res.data.code === '100200'){
            new Promise((resolve,reject) =>{
              localStorage.setItem('lockStatus', 0);
              if(Number(localStorage.getItem('lockStatus')) !== 1){
                resolve();
              }
            }).then((data)=>{
              this.$router.push({path: localStorage.getItem('beforePath')});
            });
          }else if(res.data.code === '100202'){
            new Promise((resolve,reject) =>{
              localStorage.setItem('lockStatus', 0);
              if(Number(localStorage.getItem('lockStatus')) !== 1){
                resolve();
              }
            }).then((data)=>{
              this.$notify({
                title: '警告',
                message: '登陆已过期，请重新登陆！',
                type: 'warning'
              });
              this.$router.push({path: '/login'});
            });
          }else {
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

  #locking{
    width: 100vw;
    height: 100%;
    background: url("../../../../assets/images/背景.png") no-repeat;
    background-size: 100% 100%;
    .lock_container{
      width: 250px;
      height: 300px;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      >div{
        margin-bottom: 10px;
      }
      .header{
        text-align: center;
        img{
          width: 90px;
          height: 90px;
          border-radius: 50%;
        }
      }
      .name{
        text-align: center;
        font-size: 16px;
        font-weight: bold;
      }
      div.input{
        margin-top: 60px;
        text-align: center;
        width: 250px;
        .el-input__inner{
          border-radius: 20px;
        }
      }
    }

  }
</style>
