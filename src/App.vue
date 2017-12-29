<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'app'
}
</script>

<style lang="scss">
  #app {
    font-family: "Helvetica Neue",Helvetica,"PingFang SC","Hiragino Sans GB","Microsoft YaHei","微软雅黑",Arial,sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: #787a7e;
    font-size: 14px;
  }

body, html {
  margin: 0;
  padding: 0;
  background-color: #f4f3f6;
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
    width: 10px;
    height: 10px;
  }

  &::-webkit-scrollbar-button {
    background-color: #ffff;
  }

  &::-webkit-scrollbar-track {
    background: #ffffff;
  }

  &::-webkit-scrollbar-thumb {
    background: rgba(121, 121, 121, .2);
    border-radius: 10px;
  }
}
.scroll_bar{
  &::-webkit-scrollbar {
    width: 10px;
    height: 10px;
  }

  &::-webkit-scrollbar-button {
    background-color: #ffff;
  }

  &::-webkit-scrollbar-track {
    background: #ffffff;
  }

  &::-webkit-scrollbar-thumb {
    background: rgba(121, 121, 121, .2);
    border-radius: 10px;
  }
}
</style>
