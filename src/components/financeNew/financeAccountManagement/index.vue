<template>
  <div id="accountMmanagement">
     <el-tabs v-model="activeName">
      <el-tab-pane label="账户管理" name="first">
        <account></account>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import account from './components/account2'
export default {
  components:{account},
  data() {
    return {
      activeName: 'first',
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
