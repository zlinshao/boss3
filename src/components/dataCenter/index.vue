<template>
  <div class="">
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="收房数据" name="first">
        <CollectHouseData></CollectHouseData>
      </el-tab-pane>
      <el-tab-pane label="租房数据" name="second">
        <RentHouseData></RentHouseData>
      </el-tab-pane>
      <el-tab-pane label="目标业绩" name="third">
        <TargetPerformance></TargetPerformance>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>

  import CollectHouseData from './collectHouseData/index.vue'
  import RentHouseData from './rentHouseData/index.vue'
  import TargetPerformance from './targetPerformance/index.vue'
  export default {
    name: "index",
    components: {TargetPerformance, CollectHouseData, RentHouseData},
    data() {
      return {
        activeName: 'first',
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
