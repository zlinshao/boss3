<template>
  <div>
    <UPLOAD :ID="'first'" :editImage="editImg" @getImg="getImgData"></UPLOAD>
    <UPLOAD :ID="'second'" :editImage="editImg1" @getImg="getImgData"></UPLOAD>
    <UPLOAD :ID="'third'" :editImage="editImg2" @getImg="getImgData"></UPLOAD>
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
        editImg:{

        },
        editImg1:{},
        editImg2:{}
      }
    },
    mounted(){
        this.editImg = {
          '01':'http://img.taopic.com/uploads/allimg/120727/201995-120HG1030762.jpg',
          '02':'http://img07.tooopen.com/images/20170316/tooopen_sy_201956178977.jpg',
          '03':'http://img.zcool.cn/community/010f87596f13e6a8012193a363df45.jpg@1280w_1l_2o_100sh.jpg',
        };
          this.editImg1 = {
            '022':'http://img07.tooopen.com/images/20170316/tooopen_sy_201956178977.jpg',
            '033':'http://img.zcool.cn/community/010f87596f13e6a8012193a363df45.jpg@1280w_1l_2o_100sh.jpg',
            '014':'http://img.taopic.com/uploads/allimg/120727/201995-120HG1030762.jpg',
          } ;
          this.editImg2 = {
            '0232':'http://img.zcool.cn/community/01058a556895750000012716d39e4e.jpg@3000w_1l_2o_100sh.jpg',
            '0433':'http://img3.redocn.com/tupian/20150312/haixinghezhenzhubeikeshiliangbeijing_3937174.jpg',
            '0123':'http://pic2.nipic.com/20090424/1242397_110033072_2.jpg',
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
