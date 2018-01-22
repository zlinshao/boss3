<template>
  <div id="app" @contextmenu="prevent($event)">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'app',
  methods:{
    prevent(e){
        e.preventDefault();
    }
  }
}
</script>

<style lang="scss">

  body, html {
    margin: 0;
    padding: 0;
    height: 100%;
    font-family: "Helvetica Neue",Helvetica,"PingFang SC","Hiragino Sans GB","Microsoft YaHei","微软雅黑",Arial,sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: #787a7e;
    font-size: 14px;
    background-color: #f4f3f6;
    #app {
      height: 100%;
    }
    a{
      text-decoration: none;
      color: #787a7e;
    }
    ol, ul {
      list-style: none;
      padding: 0;
      margin: 0;
    }
    .el-pagination{
      span,li,.el-input{
        font-size: 12px !important;
      }
    }

    .el-table{
      th,td{
        padding: 6px 0;
        font-size: 12px;
      }
    }
    .el-tabs{
      .el-tabs__header{
        .el-tabs__item{
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
  .scroll_bar{
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
      background: #bbb;
    }
  }
</style>
