<template>
  <div>
    <el-tabs v-model="activeName">
      <el-tab-pane label="房东" name="first">
        <LandLord></LandLord>
      </el-tab-pane>
      <el-tab-pane label="租客" name="second">
        <Renter></Renter>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
  import LandLord from './landLord/index.vue';
  import Renter from './renter/index.vue';
  export default {
    name: "index",
    components: {LandLord, Renter},
    data() {
      return {
        activeName: 'first',
      }
    },
    mounted() {
    },
    activated() {
    },
    watch: {},
    methods: {},
  }
</script>

<style lang="scss">

</style>
