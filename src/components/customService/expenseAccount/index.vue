<template>
  <div>
    <el-tabs v-model="activeName">
      <el-tab-pane label="收房报销记录" name="first">
        <CollectReimbursement></CollectReimbursement>
      </el-tab-pane>
      <el-tab-pane label="收房报销记录" name="second">
        <RentReimbursement></RentReimbursement>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
  import CollectReimbursement from './collectReimbursement';
  import RentReimbursement from './rentReimbursement';

  export default {
    name: "index",
    components:{CollectReimbursement, RentReimbursement},
    data() {
      return {
        activeName: 'first',
      }
    },
    mounted() {
    },
    watch: {},
    methods: {},
  }
</script>

<style scoped>

</style>
