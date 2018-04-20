<template>
  <div>
    <el-dialog :close-on-click-modal="false" title="房屋照片" :visible.sync="houseDetailDialogVisible">
      <div v-if="detailData.album&&detailData.album.length>0&&detailData.album[0].album
                 &&detailData.album[0].album.album_file&&detailData.album[0].album.album_file.length>0">
        <img v-for="item in detailData.album[0].album.album_file" v-if="item.info.ext.indexOf('image')>-1"
             :src="item.uri" data-magnify="" :data-src="item.uri">

        <video v-for="item in detailData.album[0].album.album_file" v-if="item.info.ext.indexOf('video')>-1"
          id="my-video" class="video-js" controls preload="auto" width="200" height="120"
               data-setup="{}">
          <source :src="item.uri" type="video/mp4">
        </video>
      </div>
      <span slot="footer" class="dialog-footer">
        <!--<el-button size="small" @click="houseDetailDialogVisible = false">取 消</el-button>-->
        <!--<el-button size="small" type="primary" @click="confirmAdd">确 定</el-button>-->
      </span>
    </el-dialog>
  </div>
</template>

<script>
  export default {
    props:['houseDetailDialog','houseId'],
    data() {
      return {
        houseDetailDialogVisible:false,
        detailData : [],
      };
    },
    watch:{
      houseDetailDialog(val){
        this.houseDetailDialogVisible = val
      },
      houseDetailDialogVisible(val){
        if(!val){
          this.$emit('close');
        }else {
          this.getData();
        }
      },
    },
    methods:{
      getData(){
        this.$http.get(globalConfig.server+'house/album/'+this.houseId).then((res) => {
          if(res.data.code === '30070'){
              this.detailData = res.data.data;
          }
        })
      },
    }
  };
</script>
<style lang="scss" scoped="">
  img{
    width: 120px;
    height: 120px;
    border-radius: 8px;
    margin: 10px;
  }
  video{
    background: #000;
    margin: 10px;
  }
</style>
