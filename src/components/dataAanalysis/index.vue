<template>
    <div id="dataAnalysis">
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane name="first" class="checkone">
        <span slot="label" class="cockCheck" >驾驶舱</span>
        <cockpit></cockpit>
      </el-tab-pane>
      <el-tab-pane name="second">
        <span slot="label"><i class="el-icon-date"></i> 指标仓库</span>
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

      }
    },
  }
</script>
<style scoped lang="scss">
.cockCheck{
  display: block;
  padding-left: 16px;
  background:url("../../assets/images/meter1.png") no-repeat left 45%;;
  background-size: 12px 12px;
  &:hover {
    background-image: url("../../assets/images/meter2.png")
  }
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

