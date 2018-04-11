<template>
  <div id="createAlbum">
    <el-dialog :close-on-click-modal="false" :title="dialogTitle" :visible.sync="createAlbumDialogVisible" width="30%">
      <div class="">
        <el-form size="mini" onsubmit="return false;" :model="form" label-width="100px">
          <el-row >
              <el-form-item label="相册名称:" required>
                <el-input v-model="form.name" placeholder="请输入相册名称" ></el-input>
              </el-form-item>
          </el-row>
          <el-row>
              <el-form-item label="相册说明:">
                <el-input v-model="form.description" type="textarea" placeholder="请输入相册说明"></el-input>
              </el-form-item>
          </el-row>
          <!--<el-row>-->
            <!--<el-form-item label="主题:" required>-->
              <!--<el-radio-group v-model="form.theme">-->
                <!--<el-radio label="1" :key="1">个人</el-radio>-->
                <!--<el-radio label="2" :key="2">房屋</el-radio>-->
                <!--<el-radio label="3" :key="3">部门</el-radio>-->
              <!--</el-radio-group>-->
            <!--</el-form-item>-->
          <!--</el-row>-->
        </el-form>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button size="small" @click="createAlbumDialogVisible = false">取 消</el-button>

        <el-button size="small" type="primary" @click="editAlbum" v-if="albumId">确 定</el-button>
        <el-button size="small" type="primary" @click="createAlbum" v-else>确 定</el-button>
      </span>
    </el-dialog>
    <choose-pictures :choosePicturesDialog="choosePicturesDialog" @close="closeChoosePicturesDialog" :albumId="createAlbumId"></choose-pictures>
  </div>
</template>

<script>
  import choosePictures from './selectPictures.vue';
    export default {
        name: "create-album",
        props: ['createAlbumDialog','albumId','fromDetail'],
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
            dialogTitle: this.albumId ?  '编辑相册': '创建相册',
            createAlbumId: '',
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
          },
          albumId(val) {
            var self = this;
            if(val){
              this.dialogTitle = '编辑相册';
            }
            this.$http.get(globalConfig.server+"album/"+ this.albumId).then((res) =>{
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
                this.createAlbumId = res.data.data.id;
                this.form = {};
                this.$confirm('相册'+ res.data.data.name+'保存成功，是否马上上传照片到这个相册?', '创建成功', {
                  confirmButtonText: '确定',
                  cancelButtonText: '取消',
                  type: 'warning'
                }).then(() => {
                  this.choosePicturesDialog = true;
                  this.createAlbumDialogVisible = false;
                  this.$emit('close');
                }).catch(() => {
                  this.choosePicturesDialog = false;
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
          this.$http.put(globalConfig.server + 'album/'+ this.albumId,this.form).then((res)=>{
            if(res.data.code == '20110') {

              this.createAlbumDialogVisible = false;
              this.$emit('close');
              this.$notify.success({
                title:"成功",
                message:res.data.msg
              });

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
          this.$emit("close");
        }
      },
    }
</script>

<style scoped>

</style>
