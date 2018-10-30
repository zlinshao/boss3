<template>
    <div id="dataAnalysis">
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane name="first" class="checkone">
        <span slot="label"><i class="bi-icon-meter comicon"></i>驾驶舱</span>
        <cockpit></cockpit>
      </el-tab-pane>
      <el-tab-pane name="second">
        <span slot="label"><i class="el-icon-date comicon"></i> 指标仓库</span>
        <wareHouseData></wareHouseData>
      </el-tab-pane>
    </el-tabs>

  </div>
</template>
<script>
    import cockpit from "./cockpit/index.vue"
    import wareHouseData from "./wareHouseData/index.vue"

    export default {
    name: "index",
    components: {cockpit, wareHouseData},
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
      },
      changeActive(){
        this.activeName = "first"
      }

    },
  }
</script>
<style scoped lang="scss">
.comicon{
  padding-right: 8px;
  font-size: 14px;
}
.show{
  display: block
}
.hide{
  display: none
}

</style>
<style>
#dataAnalysis .el-tabs__content{
  overflow:visible;
  
}
</style>

