<template>
  <div id="createAlbum">
    <el-dialog title="创建相册" :visible.sync="createAlbumDialogVisible" width="30%">
      <div class="">
        <el-form size="mini" onsubmit="return false;" :model="form" label-width="100px">
          <el-row >
              <el-form-item label="相册名称:">
                <el-input v-model="form.name" placeholder="请输入相册名称" ></el-input>
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
                <el-radio label="1" :key="1">个人</el-radio>
                <el-radio label="2" :key="2">房屋</el-radio>
                <el-radio label="3" :key="3">部门</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-row>
        </el-form>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button size="small" @click="createAlbumDialogVisible = false">取 消</el-button>

        <el-button size="small" type="primary" @click="editAlbum" v-if="albumId">确 定</el-button>
        <el-button size="small" type="primary" @click="createAlbum" v-else>确 定</el-button>
      </span>
    </el-dialog>
    <choose-pictures :choosePicturesDialog="choosePicturesDialog" @close="closeChoosePicturesDialog"></choose-pictures>
  </div>
</template>

<script>
  import choosePictures from './selectPictures.vue';
    export default {
        name: "create-album",
        props: ['createAlbumDialog','albumId'],
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
      mounted() {
          //console.log(`createAlbum-albumDetail====${this.albumDetail}`);
      },
        watch: {
          createAlbumDialog(val) {
            this.createAlbumDialogVisible = val;
          },
          createAlbumDialogVisible(val) {
            if(!val) {
              this.$emit('close');
            }
          },
          albumId(val) {
            // this.form = val;
            // this.form.theme = val.theme.toString(); // 主题需要字符串才能选中显示
            console.log(`createAlbum-albumId-watch====${JSON.stringify(val)}`);
            var self = this;
            this.$http.get(globalConfig.server+"album/2").then((res) =>{
              if(res.data.code == "20110") {
                self.form = res.data.data;
                self.form.theme =  res.data.data.theme.toString(); // 主题需要字符串才能选中显示
              }
            })
          }
        },
      methods: {
        createAlbum() {
            this.$http.post(globalConfig.server + "album",this.form).then((res)=>{
              if(res.data.code == '20110'){
                this.createAlbumDialogVisible = false;
                this.$confirm('相册'+this.form.name+'保存成功，是否马上上传照片到这个相册?', '创建成功', {
                  confirmButtonText: '确定',
                  cancelButtonText: '取消',
                  type: 'warning'
                }).then(() => {
                  this.choosePicturesDialog = true;
                }).catch(() => {
                  this.choosePicturesDialog = false;
                  // window.location.reload()
                });
              }else {
                this.$notify.warning({
                  title:"警告",
                  message:res.data.msg
                });
              }
            });
          },
        editAlbum() {
          this.$http.put(globalConfig.sever + 'album/2',this.form).then((res)=>{
            if(res.data.code == '20110') {
              this.choosePicturesDialog = true;
            }else{
              this.$notify.warning({
                title:"警告",
                message:res.data.msg
              });
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
