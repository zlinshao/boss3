<template>
  <div>
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <!--<el-tab-pane label="办公管理" name="first">-->
        <!--<Communication></Communication>-->
      <!--</el-tab-pane>-->
      <!--<el-tab-pane label="日程管理" name="second">-->
        <!--<Programme></Programme>-->
      <!--</el-tab-pane>-->
      <el-tab-pane label="制度管理" name="third">
        <Institution></Institution>
      </el-tab-pane>
      <el-tab-pane label="投票管理" name="fourth">
        <Vote></Vote>
      </el-tab-pane>
      <!--<el-tab-pane label="业绩计算器" name="fifth">-->
        <!--<Counter></Counter>-->
      <!--</el-tab-pane>-->
      <!--<el-tab-pane label="部门考勤" name="six">-->
        <!--<department></department>-->
      <!--</el-tab-pane>-->
      <el-tab-pane label="公告管理" name="seven">
        <notice></notice>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
  // import Communication from './communication/index.vue'
  // import Programme from './programme/index.vue'
  import Institution from './institution/index.vue'
   import Vote from './vote/index.vue'
  // import Counter from './counter/index.vue'
  import Notice from './notice/index.vue'

  export default {
    name: "index",
    components: {
      Institution,
      Vote,
      Notice},
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
