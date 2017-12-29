<template>
  <div>
    <div>
      <el-color-picker v-model="color"></el-color-picker>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        color: '#409EFF',
      }
    }
  };
</script>

<style scoped>
  .theme-picker .el-color-picker__trigger {
    vertical-align: middle;
  }

  .theme-picker-dropdown .el-color-dropdown__link-btn {
    display: none;
  }
</style>
