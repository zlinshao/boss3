<template>
  <div>
    <UPLOAD :ID="'first'" @getImg="getImgData"></UPLOAD>
    <UPLOAD :ID="'second'" @getImg="getImgData"></UPLOAD>
    <UPLOAD :ID="'third'" @getImg="getImgData"></UPLOAD>
    <UPLOAD :ID="'fourth'" @getImg="getImgData"></UPLOAD>
    <UPLOAD :ID="'fifth'" @getImg="getImgData"></UPLOAD>
  </div>
</template>

<script>
  import UPLOAD from '../../../common/UPLOAD.vue'
  export default {
    components:{UPLOAD},
    data() {
      return {
          upID:"PICID"
      }
    },
    methods: {
      getImgData(val){
          console.log(val)
      }
    }
  }
</script>

<style scoped="" lang="scss">

</style>
