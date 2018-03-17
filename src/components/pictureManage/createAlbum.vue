<template>
  <div id="createAlbum">
    <el-dialog title="创建相册" :visible.sync="createAlbumDialogVisible" width="30%">
      <div class="">
        <el-form size="mini" onsumbit="return false;" :model="form" label-width="100px">
          <el-row >
              <el-form-item label="相册名称:">
                <el-input v-model="form.name" placeholder="请输入相册名称"></el-input>
              </el-form-item>
          </el-row>
          <el-row>
              <el-form-item label="相册说明:">
                <el-input v-model="form.description" type="textarea" placeholder="请输入相册说明"></el-input>
              </el-form-item>
          </el-row>
          <el-row>
            <el-form-item label="主题:">
              <el-radio-group v-model="form.theme">
                <el-radio label="1" key="1">个人</el-radio>
                <el-radio label="2" key="2">房屋</el-radio>
                <el-radio label="3" key="3">部门</el-radio>
              </el-radio-group>
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
              name: '',
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
            this.$http.post(globalConfig.server + "album",this.form).then((res)=>{
              if(res.data.code ==='20110'){
                this.createAlbumDialogVisible = false;
                this.$confirm('相册111创建成功，是否马上上传照片到这个相册?', '创建成功', {
                  confirmButtonText: '确定',
                  cancelButtonText: '取消',
                  type: 'warning'
                }).then(() => {
                  this.choosePicturesDialog = true;
                }).catch(() => {
                  this.choosePicturesDialog = false;
                });
              }else {
                this.$notify.warning({
                  title:"警告",
                  message:res.data.msg
                })
              }
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
