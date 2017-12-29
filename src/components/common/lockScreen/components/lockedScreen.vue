<template>
  <div id="locking">
    <div class="foo">
      <span class="letter" data-letter="B">B</span>
      <span class="letter" data-letter="O">O</span>
      <span class="letter" data-letter="S">S</span>
      <span class="letter" data-letter="S">S</span>
    </div>
    <div class="input">
      <el-input placeholder="请输入密码" @keyup.enter.native="btnClick" v-model="keywords">
        <el-button slot="append" @click="btnClick">确定</el-button>
      </el-input>
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
        if(this.keywords){
          Cookies.set('locking', '0');
          this.$router.push({
            path: Cookies.get('last_page_path') // 解锁之后跳转到锁屏之前的页面
          });
        }else {
          this.$message('请输入密码');
        }
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">

  #locking{
    background: #409EFF;
    opacity: .7;
    div.input{
      .el-input-group{
        width: 300px;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
      }
    }
    div.foo {
      padding-top: 250px;
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
