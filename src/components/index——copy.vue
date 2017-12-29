<template>
 <div id="Index" @click="clickScreen">
   <el-container>
     <el-header>
       <div class="collapse" @click="changeCollapse">
         <i class="el-icon-menu" v-if="isCollapse"></i>
         <i class="el-icon-menu" v-if="!isCollapse"></i>
       </div>

       <div class="logo">
         BOSS
       </div>

       <div class="header-nav">

         <div class="screen">
           <el-tooltip content="锁屏" placement="bottom" effect="light">
             <LockScreen></LockScreen>
           </el-tooltip>
         </div>

         <div class="bell">
           <i class="el-icon-bell"></i>
         </div>
         <div class="time_icon">
           <i class="el-icon-time"></i>
         </div>
         <div class="time">
            {{Countdown}}s
         </div>
          <div class="head">
            <img src="../assets/images/head.png">
            <el-dropdown trigger="click">
              <span class="el-dropdown-link">
                谢兆飞<i class="el-icon-arrow-down el-icon--right"></i>
              </span>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item>黄金糕</el-dropdown-item>
                <el-dropdown-item>狮子头</el-dropdown-item>
                <el-dropdown-item>螺蛳粉</el-dropdown-item>
                <el-dropdown-item>双皮奶</el-dropdown-item>
                <el-dropdown-item>蚵仔煎</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </div>

       </div>
     </el-header>

     <el-container>
       <!--<el-aside>-->

       <el-menu :default-active="$route.path" class="el-menu-vertical-demo" :collapse="isCollapse" @open="handleOpen" @close="handleClose" router>
           <template v-for="(item,index) in $router.options.routes">
             <el-submenu :index="index+''" v-if="!item.hidden">
               <template slot="title">
                 <i :class="item.icon"></i>
                 <span>{{item.name}}</span>
               </template>
               <template v-for="(child,key) in item.children">
                 <!--三级菜单-->
                 <el-submenu :index="key+''" v-if="child.children">
                   <template slot="title">
                     <i :class="child.icon"></i>
                     <span>{{child.name}}</span>
                   </template>
                   <el-menu-item v-for="last in child.children" :index="last.path" :key="last.path">
                      {{last.name}}
                   </el-menu-item>
                 </el-submenu>
                 <!--二级菜单-->
                 <el-menu-item v-if="!child.children" :index="child.path" :key="child.path">
                   <i :class="child.icon"></i>
                   <span>{{child.name}}</span>
                 </el-menu-item>
               </template>
             </el-submenu>
             <!--一级菜单-->
             <el-menu-item v-if="item.hidden" v-for="child in item.children" :index="child.path" :key="child.path">
               <i :class="child.icon"></i>
               <span slot="title"> {{child.name}}</span>
             </el-menu-item>
           </template>
       </el-menu>

       <!--</el-aside>-->
       <el-main>
         <TagsView></TagsView>
         <router-view></router-view>
       </el-main>
     </el-container>
   </el-container>

   <el-tooltip placement="top" content="返回顶部">
     <back-to-top transitionName="fade" :customStyle="myBackToTopStyle" :visibilityHeight="300" :backPosition="50"></back-to-top>
   </el-tooltip>
 </div>
</template>

<script>
  import Cookies from 'js-cookie';
  import TagsView from './tagsView.vue'
  import BackToTop from '../components/common/backToTop.vue'
  import LockScreen from '../components/common/lockScreen/lockScreen.vue'
  export default {
    name: 'Index',
    components:{TagsView,BackToTop,LockScreen},
    data(){
        return{
          loading:false,
          isCollapse:false,
          Countdown:360,  //倒计时
          screenStatus : false,
          color4: '#409EFF',
          myBackToTopStyle: {
            right: '30px',
            bottom: '30px',
            width: '40px',
            height: '40px',
            'border-radius': '4px',
            'line-height': '45px', // 请保持与高度一致以垂直居中
            background: '#e7eaf1'// 按钮的背景颜色
          }
        }
    },
    mounted(){
      this.countTime();
      console.log(this.$router.options.routes)
    },
    computed: {
      visitedViews() {
        return this.$store
      }
    },
    methods: {
      handleOpen(key, keyPath) {},
      handleClose(key, keyPath) {},
      clickScreen(){
          this.screenStatus = true;
      },
      countTime(){
        new Promise((resolve,reject) => {
          let interval = setInterval( () => {
            this.Countdown --;
            if (this.Countdown < 0){
                resolve('锁屏');
                clearInterval(interval)
            }
            if(this.screenStatus){
                reject('重新计数');
                clearInterval(interval)
            }
          },1000)
        }).then( (data) => {
          Cookies.set('last_page_path', this.$route.path); // 本地存储锁屏之前打开的页面以便解锁后打开
          setTimeout(() => {
            this.$router.push({path: '/lock'});
          });
          Cookies.set('locking', '1');
        }).catch((data) => {
            this.Countdown = 360;
            this.countTime();
            this.screenStatus = false;
        })
      },
      changeCollapse(){
          this.isCollapse = !this.isCollapse
      }
    }
  }
</script>

<style scoped lang="scss">
  body, html {
    background-color: #EEF5F9;
    .el-container{
      .el-header {
        background-color: #409EFF;
        color: #fff !important;
        width: 100%;
        line-height: 60px;
        display: block;
        position: fixed;
        z-index: 1000;
        .collapse{
          float: left;
          margin-left: 20px;
        }
        .logo {
          margin: 0 20px;
          float: left;
          font-size: 20px;
        }
        .header-nav {
          float: right;
          height: 60px;
          margin-right: 20px;
          display: flex;
          align-items: center;
          .head{
            margin: 0 10px;
            img{
              display: inline-block;
              width: 30px;
              height: 30px;
              border-radius: 50%;
              vertical-align: middle;
              margin-right: 5px;
            }
            .el-dropdown{
              color: #fff;
              cursor: pointer;
            }

          }
          .time_icon{
            font-size: 22px;
            margin: 0 2px;
          }
          .bell{
            font-size: 22px;
            margin: 0 10px;
          }
          .screen{
            font-size: 28px;
            margin: 0 10px;
          }
        }
      }
      .el-menu-vertical-demo:not(.el-menu--collapse) {
        width: 250px;
      }
      .el-container{
        margin-top: 60px;
        .el-main {
          background-color: #F5FAFF;
          min-height: 880px;
          padding:0 20px;
          .page-container {
            font-size: 20px;
            text-align: center;
            color: rgb(192, 204, 218);
          }
        }
      }
    }
  }

</style>
