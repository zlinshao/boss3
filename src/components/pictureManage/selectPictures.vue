<template>
  <div id="choosePictures">
    <el-dialog :close-on-click-modal="false" title="选择相册" :visible.sync="choosePicturesDialogVisible" width="50%">
      <div class="">
        <el-form size="mini" :model="form" label-width="100px">
          <el-row >
            <el-form-item label="选择相册" >
              <el-col :span="8" >
              <el-select v-model="form.album_id" placeholder="请选择相册" >
                <el-option  v-for="album in albumData" :label="album.name" :value="album.id" :key="album.id">{{album.name}}</el-option>
              </el-select>
              </el-col>
            </el-form-item>
            <!--图片ids-->
            <el-form-item label="上传图片">
              <Upload :ID="'upload'" @getImg="getImage" :isClear="isClear"></Upload>
            </el-form-item>
          </el-row>
        </el-form>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button size="small" @click="choosePicturesDialogVisible = false">取 消</el-button>
        <el-button size="small" type="primary" @click="saveImages">保存</el-button>
      </span>
    </el-dialog>
    <improve-img-info :improveImgInfoDialog="improveImgInfoDialog" @close="closeImproveImgInfoDialog" @upload="continueUploading" :pictureIds="form.picture_ids" :uploadImgLength="uploadImgLength" :albumId="albumId"></improve-img-info>
  </div>
</template>

<script>
    import Upload from '../common/UPLOAD.vue';
    import ImproveImgInfo from './improveImage.vue';
    export default {
      name: "choose-pictures",
      props: ['choosePicturesDialog','albumId'],
      components:{
        Upload,
        ImproveImgInfo,
      },
      data() {
        return {
          choosePicturesDialogVisible: false,
          improveImgInfoDialog: false,
          form: {
            album_id: '',
            picture_ids: [],
          },
          albumData: [],
          uploadImgLength: 0,
          isClear: false,
        }
      },
      methods: {
        saveImages() {
          this.$http.post(globalConfig.server + 'photo',this.form).then((res)=>{
            if(res.data.code == '20210') {
              this.$emit("close");
              this.choosePicturesDialogVisible = false;
              this.improveImgInfoDialog = true;  //显示完善照片信息界面
              this.isClear = true;
              this.form = {
                album_id: '',
                picture_ids: [],
              }
            }else{
              this.$notify.warning({
                title: "警告",
                message: res.data.msg
              });
            }
          });
        },
        getImage(val) {
          this.form.picture_ids = val[1]; //选择的图片数组ids
          this.uploadImgLength = val[1].length;
        },
        closeImproveImgInfoDialog() {
          this.improveImgInfoDialog = false;  //关闭完善照片信息界面
          this.$emit('close');
        },
        continueUploading() {
          this.choosePicturesDialogVisible = true;
        },
        // 获取指定相册信息
        getImgData() {
          this.$http.get(globalConfig.server + "album").then((res) =>{
            if (res.data.code == "20110") {
              this.albumData = res.data.data;
            }
          });
        },
      },
      watch: {
        choosePicturesDialog(val) {
          this.choosePicturesDialogVisible = val;
          this.getImgData();
        },
        choosePicturesDialogVisible(val) {
          if(!val) {
            this.$emit('close');
          }
        },
        albumId(val) {
          this.getImgData();
          this.form.album_id = Number(this.albumId) ;
        }
      },
      mounted() {
         this.getImgData();
         this.form.album_id =  this.albumId;
      },
    }
</script>

<style scoped>

</style>
