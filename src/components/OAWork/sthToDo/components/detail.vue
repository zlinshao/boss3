<template>
    <div>
      <div class="tool">
        <div>
          <div><i class="el-icon-setting" style="color: #6a8dfb"></i>&nbsp;使用指南</div>
        </div>

        <div>
          <div><i class="el-icon-setting" style="color: #6a8dfb"></i>&nbsp;设置</div>
        </div>
      </div>
    </div>
</template>

<script>
    export default {
        name: 'hello',
        data () {
            return {
                msg: 'Welcome to Your Vue.js App'
            }
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
  .tool{
    display: flex;
    justify-content: flex-end;
    >div{
      padding: 0 20px;
      border-right: 1px solid #d3d3d4;
      &:last-child{
        border-right: none;
      }
    }
  }
</style>
