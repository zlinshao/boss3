<template>
  <div id="choosePictures">
    <el-dialog title="选择相册" :visible.sync="choosePicturesDialogVisible" width="40%">
      <div class="">
        <el-form size="mini" :model="formImg" label-width="100px">
          <el-row >
            <el-form-item label="选择相册" >
              <el-col :span="8" >
              <el-select v-model="formImg.albums" placeholder="请选择相册">
                <el-option label="相册一" value="shanghai"></el-option>
                <el-option label="相册二" value="beijing"></el-option>
                <el-option label="相册三" value="nanjing"></el-option>
              </el-select>
              </el-col>
            </el-form-item>
          </el-row>
        </el-form>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button size="small" @click="choosePicturesDialogVisible = false">取 消</el-button>
        <el-button size="small" type="primary" @click="startUploadImages">开始上传</el-button>
      </span>
      <Upload :ID="'upload'" @getImg="getImage" style="margin-left: 20px;"></Upload>
    </el-dialog>
    <improve-img-info :improveImgInfoDialog="improveImgInfoDialog" @close="closeImproveImgInfoDialog" @upload="continueUploading"></improve-img-info>
  </div>
</template>

<script>
    import Upload from '../common/UPLOAD.vue';
    import ImproveImgInfo from './improveImgInfo.vue';
    export default {
        name: "choose-pictures",
        props: ['choosePicturesDialog'],
        components:{
          Upload,
          ImproveImgInfo,
        },
        data() {
          return {
            choosePicturesDialogVisible: false,
            improveImgInfoDialog: false,
            formImg: {
              albums: '',
            },
          }
        },
      methods: {
        startUploadImages() {
          this.choosePicturesDialogVisible = false;
          this.improveImgInfoDialog = true;  //显示完善照片信息界面
        },
        getImage(val) {
          console.log(val);
        },
        closeImproveImgInfoDialog(){
          this.improveImgInfoDialog = false;  //关闭完善照片信息界面
        },
        continueUploading() {
          this.choosePicturesDialogVisible = true;
        }
      },
      watch: {
        choosePicturesDialog(val) {
          this.choosePicturesDialogVisible = val;
        },
        choosePicturesDialogVisible(val) {
          if(!val) {
            this.$emit('close');
          }
        }
      },
    }
</script>

<style scoped>

</style>
