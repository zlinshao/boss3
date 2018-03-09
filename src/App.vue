<template>
  <div id="app" @contextmenu="prevent($event)" @click="closeMenu">
    <router-view></router-view>
  </div>
</template>

<script>
  export default {
    name: 'app',

    mounted(){
      document.onkeydown = function (e) {//键盘按键控制
        e = e || window.event;
        if(e.keyCode == 116){

        }
      };
    },
    methods: {
      prevent(e) {
        e.preventDefault();
        this.$store.dispatch('closeMenu')
      },
      closeMenu(){
        this.$store.dispatch('closeMenu')
      }
    }
  }
</script>

<style lang="scss">

  body, html {
    margin: 0;
    padding: 0;
    height: 100%;
    font-family: "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", "微软雅黑", Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: #787a7e;
    font-size: 14px;
    background-color: #f4f3f6;
    overflow-x: hidden;
    #app {
      height: 100%;
    }
    a {
      text-decoration: none;
      color: #787a7e;
    }
    ol, ul {
      list-style: none;
      padding: 0;
      margin: 0;
    }
    .el-pagination {
      span, li, .el-input {
        font-size: 12px !important;
      }
    }

    .el-table {
      th, td {
        padding: 6px 0;
        font-size: 12px;
      }
    }
    .el-tabs {
      .el-tabs__header {
        .el-tabs__item {
          font-size: 12px;
        }
      }
    }
    &::-webkit-scrollbar {
      width: 4px;
    }

    &::-webkit-scrollbar-button {
      height: 0;
      background-color: #eee;
    }

    &::-webkit-scrollbar-track {
      background: #eee;
    }

    &::-webkit-scrollbar-thumb {
      background: #6a8dfb;
    }
  }

  .scroll_bar {
    &::-webkit-scrollbar {
      width: 4px;
      height: 6px;
    }

    &::-webkit-scrollbar-button {
      height: 10px;
      background-color: #e4e7ed;
    }

    &::-webkit-scrollbar-track {
      background: #e4e7ed;
    }

    &::-webkit-scrollbar-thumb {
      background: #c5cce2;
    }
  }

  .el-table__body-wrapper.is-scroll-right, .el-table__body-wrapper.is-scroll-left, .el-table__body-wrapper.is-scroll-middle {
    &::-webkit-scrollbar {
      width: 4px;
      height: 5px;
    }

    &::-webkit-scrollbar-button {
      height: 0;
      background-color: #eee;
    }

    &::-webkit-scrollbar-track {
      background: #e4e7ed;
    }

    &::-webkit-scrollbar-thumb {
      background: #c5cce2;
    }
  }

</style>
