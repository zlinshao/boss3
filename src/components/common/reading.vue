<template>
  <div>
    <el-dialog :close-on-click-modal="false" width="0" z-index="3000" style="margin-top:20vh" :visible.sync="ReadingDialogVisible">
    <div class="badgeup" >
      <div class="backdiv" v-for="(item,index) in album" v-if="album !=[] && index==imgLen" :key="item.id"  @click="imgLenON">
        <img :src="item.uri" />

      </div>
    </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "hello",
  props: ["ReadingDialog","yanFirstInfo"],
  components: {},
  data() {
    return {
      ReadingDialogVisible: false,
      imgLen: 0,
      album:[],
      albumLen:0,
    };
  },
  mounted() {},
  watch: {
    ReadingDialog(val) {
      this.ReadingDialogVisible = val;
    },
    ReadingDialogVisible(val) {
      if (!val) {
        this.$emit("close");
      }
    },
    yanFirstInfo(val){
      this.album = val.album.image_pic;
      this.albumLen = val.album.image_pic.length;
    }
  },
  methods: {
    imgLenON(){
      this.imgLen++;
      if(this.imgLen>=this.albumLen){
        this.ReadingDialogVisible = false;
      }
    },
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped="">
.badgeup {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 999;
  display: block;
  width: 100%;
  height: 100%;
}
.backdiv {
  position: absolute;
  left: 0px;
  top: 0px;
  width: 100%;
  height: 100%;
  img{
    width: 100%;
    height: 100%;
    cursor: pointer;
  }
}




</style>
