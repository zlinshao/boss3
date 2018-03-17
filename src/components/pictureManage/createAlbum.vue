<template>
  <div id="createAlbum">
    <el-dialog title="创建相册" :visible.sync="createAlbumDialogVisible" width="30%">
      <div class="">
        <el-form size="mini" :model="form" label-width="100px">
          <el-row >
              <el-form-item label="相册名称:">
                <el-input v-model="form.title" placeholder="请输入相册名称"></el-input>
              </el-form-item>
          </el-row>
          <el-row>
              <el-form-item label="相册说明:">
                <el-input v-model="form.description" type="textarea" placeholder="请输入相册说明"></el-input>
              </el-form-item>
          </el-row>
          <el-row>
            <el-form-item label="主题:" prop="type">
              <el-checkbox-group v-model="form.theme">
                <el-checkbox label="个人" name="type"></el-checkbox>
                <el-checkbox label="部门" name="type"></el-checkbox>
                <el-checkbox label="房屋" name="type"></el-checkbox>
              </el-checkbox-group>
            </el-form-item>
          </el-row>
        </el-form>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button size="small" @click="createAlbumDialogVisible = false">取 消</el-button>
        <el-button size="small" type="primary" @click="createAlbumSuccess">确 定</el-button>
      </span>
    </el-dialog>
    <choose-pictures :choosePicturesDialog="choosePicturesDialog" @close="closeChoosePicturesDialog"></choose-pictures>
  </div>
</template>

<script>
  import choosePictures from './choosePictures.vue';
    export default {
        name: "create-album",
        props: ['createAlbumDialog'],
        components: {
          choosePictures,
        },
        data() {
          return {
            createAlbumDialogVisible: false,
            choosePicturesDialog: false,
            form: {
              title: '',
              description: '',
              theme: '',
            },
          }
        },
        watch: {
          createAlbumDialog(val) {
            this.createAlbumDialogVisible = val;
          },
          createAlbumDialogVisible(val) {
            if(!val) {
              this.$emit('close');
            }
          }
        },
      methods: {
        createAlbumSuccess() {
          var self = this;
          this.createAlbumDialogVisible = false;
            this.$confirm('相册111创建成功，是否马上上传照片到这个相册?', '创建成功', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
            }).then(() => {
              // this.$message({
              //   type: 'success',
              //   message: '点击确定!'
              // });
              self.choosePicturesDialog = true;
              console.log(`111111111${self.choosePicturesDialog}`);
            }).catch(() => {
              // this.$message({
              //   type: 'info',
              //   message: '已取消上传'
              // });
              self.choosePicturesDialog = false;
            });

          },
        closeChoosePicturesDialog() {
          this.choosePicturesDialog = false;
        }
      },
    }
</script>

<style scoped>

</style>
