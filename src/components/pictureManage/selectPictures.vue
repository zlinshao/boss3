<template>
  <div id="choosePictures">
    <el-dialog title="选择相册" :visible.sync="choosePicturesDialogVisible" width="40%">
      <div class="">
        <el-form size="mini" :model="form" label-width="100px">
          <el-row >
            <el-form-item label="选择相册" >
              <el-col :span="8" >
              <el-select v-model="form.album_id" placeholder="请选择相册" >
                <div v-for="album in albumData">
                  <el-option  :label="album.name" :value="album.id">{{album.name}}</el-option>
                </div>
              </el-select>
              </el-col>
            </el-form-item>
            <!--图片ids-->
            <el-form-item label="上传图片">
              <Upload :ID="'upload'" @getImg="getImage"></Upload>
            </el-form-item>
          </el-row>
        </el-form>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button size="small" @click="choosePicturesDialogVisible = false">取 消</el-button>
        <el-button size="small" type="primary" @click="saveImages">保存</el-button>
      </span>
    </el-dialog>
    <improve-img-info :improveImgInfoDialog="improveImgInfoDialog" @close="closeImproveImgInfoDialog" @upload="continueUploading"></improve-img-info>
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
            albumData: '',
          }
        },
      methods: {
        saveImages() {
          this.$http.post(globalConfig.server + 'photo',this.form).then((res)=>{
            if(res.data.code == '20210') {
              this.choosePicturesDialogVisible = false;
              this.improveImgInfoDialog = true;  //显示完善照片信息界面
              this.form.picture_ids = [];
            }else{
              this.$notify.warning({
                title:"警告",
                message:res.data.msg
              });
            }
          });

        },
        getImage(val) {
          console.log(val);
          this.form.picture_ids = val[1]; //选择的图片数组ids
        },
        closeImproveImgInfoDialog() {
          this.improveImgInfoDialog = false;  //关闭完善照片信息界面
        },
        continueUploading() {
          this.choosePicturesDialogVisible = true;
        },
        getImgData() {
          this.$http.get(globalConfig.server + "album").then((res) =>{
            if (res.data.code == "20110") {
              this.albumData = res.data.data;
              console.log(`select-albumData-------${JSON.stringify(this.albumData)}`);
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
