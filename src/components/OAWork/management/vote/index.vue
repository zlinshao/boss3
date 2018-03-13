<template>
  <div>
    <UPLOAD :ID="upID" @getImg="getImgData"></UPLOAD>
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
