<template>
  <div>
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="房租" name="first">
        <RoomCharge></RoomCharge>
      </el-tab-pane>
      <el-tab-pane label="押金" name="second">
        押金
      </el-tab-pane>
      <el-tab-pane label="中介费" name="third">
        中介费
      </el-tab-pane>
      <el-tab-pane label="公司认责" name="fourth">
        公司认责
      </el-tab-pane>
      <el-tab-pane label="其他" name="fifth">
        <OtherSum></OtherSum>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
  import RoomCharge from './roomCharge/index.vue'
  import OtherSum from './otherSum/index.vue'

  export default {
    name: "index",
    components: {RoomCharge, OtherSum},
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
