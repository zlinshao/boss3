<template>
  <div @click="show=false" @contextmenu="closeMenu">
    <div id="tagView">
      <el-tag v-for="(item,index) in visitedViews" :key="item.name" closable :type="isActive(item)?'danger':'default'" @close="handleClose(item)">
        <span class="tag_span" @click="skipPage(item)" @contextmenu = openMenu(item,index)>
          {{item.name}}
        </span>
      </el-tag>
    </div>
    <RightMenu :startX="rightMenuX+'px'" :startY="rightMenuY+'px'" :list="lists" :show="show"
               @clickOperate="clickEvent"></RightMenu>
  </div>
</template>

<script>
    import RightMenu from './rightMenu.vue'
    export default {
      components: {RightMenu},
      data(){
          return{
            rightMenuX: 0,
            rightMenuY: 0,
            show: false,
            lists: [],

            editableTabsValue : '',
            index:'',
            item:{}
          }
      },
      computed: {
        visitedViews() {
          return this.$store.state.app.visitedViews
        },
        menuStatus(){
          return this.$store.state.app.menuStatus
        }
      },
      mounted(){
        this.addViewTags();
      },

      watch: {
        $route() {
          this.addViewTags()
        },
        menuStatus(val){
            this.show = val;
        }
      },
      methods:{
        addViewTags() {
//          const route = this.generateRoute();
//
//          let isExist = this.visitedViews.some((item) => {
//             return route.name === item.name;
//          });
//          if (!route) {
//            return false
//          }else if(this.visitedViews.length>9 && !isExist){
//            this.$notify({
//              title: '警告',
//              message: '您最多打开十个标签页，请先关闭其他标签页',
//              type: 'warning'
//            });
//            return false
//          }
//          this.$store.dispatch('addVisitedViews', route)

          const route = this.generateRoute();
          if (!route) {
            return false
          }
          this.$store.dispatch('addVisitedViews', route)
        },

        generateRoute() {
          if (this.$route.name) {
            return this.$route
          }
          return false
        },
        skipPage(item){
          this.$router.push(item.path);
        },
        handleClose(view) {
          this.$store.dispatch('delVisitedViews', view).then((views) => {
            if (this.isActive(view)) {
              const latestView = views.slice(-1)[0];
              if (latestView) {
                this.$router.push(latestView.path)
              } else {
                this.$router.push('/main')
              }
            }
          })
        },
        isActive(route) {
          return route.path === this.$route.path || route.name === this.$route.name
        },
        openMenu(item,index){
          this.$store.dispatch('openMenu');

          this.index = index;
          this.item = item;
          if(this.visitedViews.length<2){

          }else if(this.visitedViews.length>1&& index===this.visitedViews.length-1){
            this.lists = [
              {clickIndex: 'all', label: '关闭其他标签页',},
              {clickIndex: 'left', label: '关闭左侧标签页',}
            ];
            this.contextMenuParam(event);
          }else if(this.visitedViews.length>1&& index===0){
            this.lists = [
              {clickIndex: 'all', label: '关闭其他标签页',},
              {clickIndex: 'right', label: '关闭右侧标签页',},
            ];
            this.contextMenuParam(event);
          }else {
            this.lists = [
              {clickIndex: 'all', label: '关闭其他标签页',},
              {clickIndex: 'left', label: '关闭左侧标签页',},
              {clickIndex: 'right', label: '关闭右侧标签页',},
            ];
            this.contextMenuParam(event);
          }
        },
        clickEvent (index){
            switch (index){
              case 'all':
                  this.$store.dispatch('closeALLVisited',this.index);
                  this.$router.push(this.item.path)
                  break;
              case 'left':
                  this.$store.dispatch('closeLeftVisited',this.index);
                  break;
              case 'right':
                  this.$store.dispatch('closeRightVisited',this.index);
                  break;
            }
        },
        //关闭右键菜单
        closeMenu(){
          this.show = false;
        },
        //右键参数
        contextMenuParam(event){
          //param: user right param
          let e = event || window.event;	//support firefox contextmenu
          this.show = false;
          this.rightMenuX = e.clientX + document.documentElement.scrollLeft - document.documentElement.clientLeft;
          this.rightMenuY = e.clientY + document.documentElement.scrollTop - document.documentElement.clientTop;
          event.preventDefault();
          event.stopPropagation();
          this.$nextTick(() => {
            this.show = true
          })
        },
      }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->

<style rel="stylesheet/scss" lang="scss">
    #tagView {
      max-height: 35px;
      overflow: hidden;
      display: flex;
      .el-tag{
        margin-right: 3px;
        cursor: pointer;
        height:35px;
        line-height: 35px;
        border-radius: 4px 4px 0 0;
        border-bottom: -1px;
        .tag_span{
          display: inline-block;
          padding: 0 10px;
        }
      }

      .el-tag--default{
        background-color: #e4e7ed;
        color:#787a7e;
        border: none;
        .el-tag__close{
          color: #787a7e;
          &:hover{
            background: #fcfcfc;
            color: #787a7e;
          }
        }
      }
      .el-tag--danger{
        background-color: #fff;
        color:#83a0fc;
        border: none;
        .el-tag__close{
          color: #83a0fc;
          &:hover{
            background: #83a0fc;
            color: #fff;
          }
        }
      }

    }
</style>
