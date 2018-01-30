<template>
  <div>
    <div id="tagView">
      <el-tag v-for="item in visitedViews" :key="item.name" closable :type="isActive(item)?'danger':'default'" @close="handleClose(item)">
        <span class="tag_span" @click="skipPage(item)">
          {{item.name}}
        </span>
      </el-tag>
    </div>

  </div>
</template>

<script>
    export default {
      data(){
          return{
            editableTabsValue : '',
          }
      },
      computed: {
        visitedViews() {
          return this.$store.state.app.visitedViews
        }
      },
      mounted(){
        this.addViewTags();
      },

      watch: {
        $route() {
          this.addViewTags()
          }
        },
      methods:{
        addViewTags() {
          const route = this.generateRoute();

          let isExist = this.visitedViews.some((item) => {
             return route.name === item.name;
          });
          if (!route) {
            return false
          }else if(this.visitedViews.length>9 && !isExist){
            this.$notify({
              title: '警告',
              message: '您最多打开十个标签页，请先关闭其他标签页',
              type: 'warning'
            });
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
      }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->

<style rel="stylesheet/scss" lang="scss">
    #tagView {
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
