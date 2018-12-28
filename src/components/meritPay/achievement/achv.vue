<template>
  <div id="achv">
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="收房业绩" name="first">
        <lordAchv></lordAchv>
      </el-tab-pane>
      <el-tab-pane label="租房业绩" name="second">
        <rentAchv></rentAchv>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
    import lordAchv from './components/lordAchv'
    import rentAchv from './components/rentAchv'
    export default {
        name: "achv",
        components:{lordAchv,rentAchv},
        data(){
          return {
            activeName: 'first',
          }
        },
      methods:{
        handleClick(){

        }
      }
    }
</script>

<style scoped>

</style>
