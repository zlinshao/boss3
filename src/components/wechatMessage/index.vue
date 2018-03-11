<template>
  <div>
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="微信报销" name="first">
        <Reimbursement></Reimbursement>
      </el-tab-pane>
      <el-tab-pane label="微信投诉" name="second">
        <Complain></Complain>
      </el-tab-pane>
      <el-tab-pane label="预约看房" name="third">
        <LookHouse></LookHouse>
      </el-tab-pane>
      <el-tab-pane label="房东加盟" name="fourth">
        <League></League>
      </el-tab-pane>
      <el-tab-pane label="意见反馈" name="fifth">
        <Feedback></Feedback>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
  import Reimbursement from './reimbursement/index.vue'
  import Complain from './complain/index.vue'
  import LookHouse from './lookHouse/index.vue'
  import League from './league/index.vue'
  import Feedback from './feedback/index.vue'

  export default {
    name: "index",
    components: {
      Reimbursement,
      Complain,
      LookHouse,
      League,
      Feedback,
    },
    data() {
      return {
        activeName: 'first'
      }
    },
    mounted() {
    },
    watch: {},
    methods: {
      handleClick(val) {

      }
    },
  }
</script>

<style scoped>

</style>
