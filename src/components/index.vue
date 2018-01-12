<template>
 <div id="index" @click="clickScreen">
   <div class="navBar">
     <div class="left">
       <div class="logo">
         <div class="boss">BOSS</div>
         <div class="el-icon-menu" @click="changeCollapse"></div>
       </div>
       <div class="slogan">
         <img src="../assets/slogan.png" alt="">
       </div>
     </div>
     <div class="right">
        <div class="countdown">
          <el-tooltip class="item" effect="dark" content="锁屏" placement="bottom">
            <i class="el-icon-time" @click="lockScreen"></i>
          </el-tooltip>

          {{Countdown}}s
        </div>
        <div class="message">
          <el-badge is-dot class="item">
            <i class="el-icon-bell"></i>
            消息
          </el-badge>
        </div>

        <div class="guide">
          <i class="el-icon-warning"></i>
          使用指南
        </div>
        <div class="personInfo">
          <div class="head"><img src="../assets/images/head.png"></div>
          <el-dropdown trigger="click">
              <span class="el-dropdown-link">
                解兆飞<i class="el-icon-arrow-down el-icon--right"></i>
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
   </div>

   <div class="contentBox" :class="isCollapse? 'hideSidebar' : ''">
     <el-container>
       <div class="aside">
         <el-menu :default-active="$route.path" class="el-menu-vertical-demo" unique-opened
                  :collapse="isCollapse" @open="handleOpen" @close="handleClose" router
                  background-color="#6a8dfb" text-color="#fff" active-text-color="#ffd04b">
           <template v-for="(item,index) in $router.options.routes">
             <!--一级菜单-->
             <el-menu-item  v-if="item.hidden" v-for="child in item.children" :index="child.path" :key="child.path">
               <i :class="child.icon"></i>
               <span slot="title"> {{child.name}}</span>
             </el-menu-item>

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
           </template>
         </el-menu>
       </div>
       <el-main>
         <TagsView></TagsView>
         <div style="padding: 10px;background: #fff">
           <router-view></router-view>
         </div>
       </el-main>
     </el-container>
   </div>
 </div>
</template>

<script>
  import Cookies from 'js-cookie';
  import TagsView from './tagsView.vue'
  export default {
    name: 'Index',
    components:{TagsView},
    data(){
      return{
        isCollapse:false,
        Countdown:999999999,  //倒计时
        screenStatus : false,
      }
    },
    mounted(){
        this.countTime();
    },
    computed: {
      visitedViews() {
        return this.$store
      }
    },
    methods: {
      handleOpen(key, keyPath) { console.log(key);},
      handleClose(key, keyPath) { console.log(keyPath);},
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
          this.Countdown = 99999999999;
          this.countTime();
          this.screenStatus = false;
        })
      },
      changeCollapse(){
        this.isCollapse = !this.isCollapse
      },
      lockScreen(){
        Cookies.set('last_page_path', this.$route.path); // 本地存储锁屏之前打开的页面以便解锁后打开
        setTimeout(() => {
          this.$router.push({path: '/lock'});
        });
        Cookies.set('locking', '1');
      }
    }
  }
</script>

<style lang="scss">
  #index{
    .navBar{
      width: 100%;
      height: 80px;
      background: #fff;
      position: fixed;
      top: 0;
      left: 0;
      z-index: 66;
      display: flex;
      .left{
        width: 50%;
        height: 100%;
        display: flex;
        align-items: center;
        .logo{
          width: 240px;
          height: 100%;
          border-right: 1px solid #e6e6e6;
          display: flex;
          align-items: center;
          justify-content : space-between;
          .boss{
            font-size: 26px;
            color: #6a8dfb;
            margin-left: 50px;
          }
          .el-icon-menu{
            font-size: 28px;
            color: #4f5aa2;
            margin-right: 25px;
            cursor: pointer;
          }

        }
        .slogan{
          margin-left: 30px;
        }
      }
      .right{
        width: 50%;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content : flex-end;
        div{
          display: flex;
          align-items: center;
          font-size: 16px;
        }
        .countdown,.message,.guide{
          width: 120px;
          cursor: pointer;
          justify-content :center;
          border-left: 1px solid #e6e6e6;
          i{
            margin-right: 10px;
            font-size: 20px;
            color: #409EFF;
          }
        }
        .countdown{
          border: none;
        }
        .guide{
          width: 150px;
        }
        .personInfo{
          height: 100%;
          width: 200px;
          .head{
            width: 40px;
            height: 40px;
            padding: 0 0 0 25px;
            img{
              width: 40px;
              height: 40px;
              border-radius: 50%;
            }
          }
          .el-dropdown{
            margin-left: 20px;
            font-size: 15px;
            cursor: pointer;
          }
        }
      }
    }

    .contentBox{
      .el-container{
        .aside{
          position: fixed;
          top: 80px;
          height: 100%;
          z-index: 66;
          .developBack{
            background: #405597 !important;
          }
          .el-menu{
            i{
              color: #fff !important;
            }
          }
          .el-menu--collapse {
            width: 64px;
            height: 100%;
          }
          .el-menu-vertical-demo:not(.el-menu--collapse) {
            width: 240px;
            min-height: 100%;
          }
        }
        .el-main {
          margin-top: 80px;
          padding: 10px 20px;
          margin-left: 240px;
          transition: margin-left .4s;
        }
      }
    }
    .hideSidebar{
      .el-main {
        margin-left: 64px !important;
      }
    }
  }
</style>
