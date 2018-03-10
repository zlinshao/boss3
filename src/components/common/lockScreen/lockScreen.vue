<template>
    <div>
        <i class="lockScreen"  @click="lockScreen"></i>
    </div>
</template>

<script>
  import Cookies from 'js-cookie';
    export default {
        name: 'hello',
        data () {
            return {

            }
        },
        methods:{
//          lockScreen(){
//            Cookies.set('last_page_path', this.$route.path); // 本地存储锁屏之前打开的页面以便解锁后打开
//            setTimeout(() => {
//              this.$router.push({path: '/lock'});
//            });
//            Cookies.set('locking', '1');
//          }
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
    .lockScreen {
      cursor: pointer;
      display: inline-block;
      width: 20px;
      height: 20px;
      color: #fff;
      background-size: 100% 100%;
      background-image: url("../../../assets/images/icon/锁.svg");
    }
</style>
