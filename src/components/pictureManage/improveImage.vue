<template>
  <div id="improveImgInfo">
    <el-dialog title="上传完成" :visible.sync="improveImgInfoDialogVisible" width="40%">
      <div class="">
        <el-form size="small" :model="formInfo" label-width="100px">
          <el-row >
            <el-col align="center"><i class="iconfont icon-shenhetongguo"></i>
              <span style="margin-left: 10px;font-size: 15px;">您已成功上传<strong style="font-size: 15px;color: red;"> {{uploadImgLength}} </strong>张图片</span>
              <el-button type="text" style="margin-left: 15px;color: #2595B7;" @click="continueUploading">继续上传</el-button>
            </el-col>
          </el-row>
          <el-row >
            <el-col align="center">
              <span style="margin: 10px auto;display: inline-block;"><strong>统一添加信息</strong>
              </span>
            </el-col>
          </el-row>
          <el-row>
            <el-form-item label="名称:">
              <el-input v-model="formInfo.name" placeholder="请输入名称"></el-input>
            </el-form-item>
          </el-row>
        </el-form>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button size="small" @click="improveImgInfoDialogVisible = false">取 消</el-button>
        <el-button size="small" type="primary" @click="saveAllPhoto()">保存</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
  export default {
    name: 'improve-img-info',
    props: ['improveImgInfoDialog','pictureIds','uploadImgLength','albumId'],
    data() {
      return {
        improveImgInfoDialogVisible: false,
        editImgInfoDialogVisible: false,
        formInfo: {
          name: '',
        },
        photo_ids:[],
      }
    },
    watch: {
      improveImgInfoDialog(val) {
        this.improveImgInfoDialogVisible = val;
      },
      improveImgInfoDialogVisible(val) {
        if(!val) {
          this.$emit('close');
        }
      },
      pictureIds(val) {

      }
    },
    methods: {
      continueUploading() {
        this.improveImgInfoDialogVisible = false;
        this.$emit("upload");
      },
      saveAllPhoto() {
        this.$http.put(globalConfig.server + "/photo/edit",{album_id:this.albumId,photo_ids:this.pictureIds,name:this.formInfo.name}).then((res)=>{
          if(res.data.code == "20210"){
            this.improveImgInfoDialogVisible = false;
            this.$notify.success({
              title:"成功",
              message:res.data.msg
            });
          }
        });
      },
    }
  }
</script>

<style scoped>
.icon-shenhetongguo {
  font-size: 33px;
  color: green;
  vertical-align: middle;
}
  .imgDetail {
    max-width: 210px;
    max-width: 160px;
  }
</style>
