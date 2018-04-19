<template>
  <div>
    <el-dialog :close-on-click-modal="false" title="房屋照片" :visible.sync="houseDetailDialogVisible">
      <div v-if="detailData.length>0&&detailData[0].album&&detailData[0].album.album_file">
        <img v-for="(val,key) in detailData[0].album.album_file"
             :src="val[0].uri" data-magnify="" :data-src="val[0].uri">
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
</style>
