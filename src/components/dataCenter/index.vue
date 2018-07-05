<template>
  <div class="">
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <!--<el-tab-pane label="当天收房" name="first">-->
      <!--</el-tab-pane>-->
      <!--<el-tab-pane label="当天租房" name="second">-->
      <!--</el-tab-pane>-->
      <el-tab-pane label="目标业绩" name="third">
        <TargetPerformance></TargetPerformance>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>

  import TargetPerformance from './targetPerformance/index.vue'

  export default {
    name: "index",
    components: {TargetPerformance},
    data() {
      return {
        activeName: 'third'
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
