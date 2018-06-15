<template>
  <div>
    <el-dialog :close-on-click-modal="false" title="图片下载" width="60%" :visible.sync="downloadPicDialogVisible">
      <div class="scroll_bar"
           v-loading="tableLoading"
           element-loading-text="拼命加载中"
           element-loading-spinner="el-icon-loading"
           element-loading-background="rgba(255, 255, 255, .7)">

        <el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange">全选</el-checkbox>
        <div style="margin: 15px 0;"></div>

        <el-checkbox-group v-model="downloadArray" @change="handleCheckedCitiesChange">
          <el-checkbox v-for="(img,index) in imgArray" :label="img" :key="index">
            <img :src="img" alt="" data-magnify="" :data-src="img">
          </el-checkbox>
        </el-checkbox-group>

      </div>


      <span slot="footer" class="dialog-footer">
        <el-button size="small" @click="downloadPicDialogVisible = false">取 消</el-button>
        <el-button size="small" :disabled="downloadArray.length<1" type="primary" @click="downLoad">下 载</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
  export default {
    props: ['downloadPicDialog', 'houseId'],
    data() {
      return {
        downloadPicDialogVisible: false,
        tableLoading: false,
        imgArray:[],
        downloadArray : [],

        checkAll: false,
        isIndeterminate: true
      };
    },
    watch: {
      downloadPicDialog(val) {
        this.downloadPicDialogVisible = val
      },
      downloadPicDialogVisible(val) {
        if (!val) {
          this.$emit('close');
          this.downloadArray = [];
          this.imgArray = [];
          this.checkAll = false;
          this.isIndeterminate = true;
        } else {
          this.getData();
        }
      },
    },
    methods: {
      downLoad() {
        this.downloadArray.map( (img) => {
          fetch(img).then(res => {res.blob().then(blob => {
            let a = document.createElement('a');
            let url = window.URL.createObjectURL(blob);
            let filename = '';
            a.href = url;
            a.download = filename;
            a.click();
            window.URL.revokeObjectURL(url);
          })}).then((data)=>{
            this.downloadArray = [];
            this.checkAll = false;
            this.isIndeterminate = true;
          })
        })
      },
      getData() {
        this.tableLoading = true;
        this.$http.get(globalConfig.server + 'house/album/' + this.houseId).then((res) => {
          this.tableLoading = false;
          if (res.data.code === '30070') {
            let albumData = res.data.data.album;
            this.imgArray = [];
            if(albumData.length>0){
              albumData.forEach((item) => {
                item.album.album_file.forEach((img)=>{
                  if(img.info && img.info.mime && img.info.mime.indexOf('image')>-1){
                    this.imgArray.push(img.uri);
                  }
                })
              })
            }
          } else {
            this.$notify.warning({
              title: "警告",
              message: res.data.msg,
            })
          }
        })
      },
      handleCheckAllChange(val) {
        this.downloadArray = val ? this.imgArray : [];
        this.isIndeterminate = false;
      },
      handleCheckedCitiesChange(value) {
        let checkedCount = value.length;
        this.checkAll = checkedCount === this.imgArray.length;
        this.isIndeterminate = checkedCount > 0 && checkedCount < this.imgArray.length;
      }

    }
  };
</script>
<style lang="scss" scoped="">
  @mixin border_($n) {
    -webkit-border-radius: $n;
    -moz-border-radius: $n;
    border-radius: $n;
  }
  img {
    width: 120px;
    height: 120px;
    border-radius: 8px;
    margin: 10px;
  }

  .scroll_bar{
    height: 550px;
  }
  .el-checkbox {
    margin-left: 30px;
  }
</style>
