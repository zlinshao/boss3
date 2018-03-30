<template>
  <div>
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="微信报销" name="first">

      </el-tab-pane>
      <el-tab-pane label="微信投诉" name="second">

      </el-tab-pane>
      <el-tab-pane label="预约看房" name="third">

      </el-tab-pane>
      <el-tab-pane label="房东加盟" name="fourth">

      </el-tab-pane>
      <el-tab-pane label="意见反馈" name="fifth">

      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>

  export default {
    name: "index",
    components: {},
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
