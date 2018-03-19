<template>
  <div id="improveImgInfo">
    <el-dialog title="上传完成" :visible.sync="improveImgInfoDialogVisible" width="40%">
      <div class="">
        <el-form size="small" :model="formInfo" label-width="100px">
          <el-row >
            <el-col align="center"><i class="iconfont icon-shenhetongguo"></i>
              <span style="margin-left: 10px;font-size: 15px;">您已成功上传<strong style="font-size: 15px;color: red;"> 2 </strong>张图片</span>
              <!--<el-button type="text" style="color: #2595B7;" @click="improveImgInfoDialogVisible = false">查看</el-button>-->
              <el-button type="text" style="margin-left: 15px;color: #2595B7;" @click="continueUploading">继续上传</el-button>
            </el-col>
          </el-row>
          <el-row >
            <el-col align="center">
              <span style="margin: 10px auto;display: inline-block;"><strong>统一添加信息</strong>
                <!--或<el-button type="text" style="color: #2595B7;" @click="editSingleInfo">编辑单条信息</el-button>-->
              </span>
            </el-col>
          </el-row>
          <el-row >
            <el-form-item label="名称:">
              <el-input v-model="formInfo.name" placeholder="请输入名称"></el-input>
            </el-form-item>
          </el-row>
          <el-row >
            <el-form-item label="描述:">
              <el-input v-model="formInfo.description" placeholder="请输入描述"></el-input>
            </el-form-item>
          </el-row>
        </el-form>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button size="small" @click="improveImgInfoDialogVisible = false">取 消</el-button>
        <el-button size="small" type="primary" @click="editAlbum()">保存</el-button>
      </span>
    </el-dialog>
    <!--<el-dialog title="编辑图片信息" :visible.sync="editImgInfoDialogVisible" width="40%" >-->
      <!--<div>-->
        <!--<el-form size="small" :model="formInfo" label-width="100px">-->
          <!--<el-row >-->
            <!--<el-col align="center">-->
              <!--<span ><strong>统一添加信息</strong></span>-->
            <!--</el-col>-->
          <!--</el-row>-->
          <!--<el-row >-->
            <!--<el-form-item label="名称:">-->
              <!--<el-input v-model="formInfo.title" placeholder="请输入名称"></el-input>-->
            <!--</el-form-item>-->
          <!--</el-row>-->
          <!--<el-row >-->
            <!--<el-form-item label="描述:">-->
              <!--<el-input v-model="formInfo.desc" placeholder="请输入描述"></el-input>-->
            <!--</el-form-item>-->
          <!--</el-row>-->
        <!--</el-form>-->
        <!--<div slot="footer" class="dialog-footer" style="text-align: center">-->
          <!--<el-button size="small" type="primary" @click="editImgInfoDialogVisible = false" style="text-align:center;">保存并查看</el-button>-->
        <!--</div>-->
        <!--<el-form size="small" :model="formInfo" label-width="100px">-->
          <!--<el-row :gutter="30">-->
            <!--<el-col :span="12" style="text-align: center;"><img src="../../assets/images/university/caia412-34427.png" class="imgDetail"></el-col>-->
            <!--<el-col :span="12" style="text-align: center;"><img src="../../assets/images/university/caia412-34427.png" class="imgDetail"></el-col>-->
          <!--</el-row>-->
          <!--<el-row :gutter="30">-->
            <!--<el-col :span="12">-->
              <!--<el-form-item label="名称:">-->
                <!--<el-input v-model="formInfo.name" placeholder="请输入名称"></el-input>-->
              <!--</el-form-item>-->
            <!--</el-col>-->
            <!--<el-col :span="12">-->
              <!--<el-form-item label="名称:">-->
                <!--<el-input v-model="formInfo.name" placeholder="请输入名称"></el-input>-->
              <!--</el-form-item>-->
            <!--</el-col>-->
          <!--</el-row>-->

          <!--<el-row :gutter="30">-->
            <!--<el-col :span="12">-->
              <!--<el-form-item label="描述:">-->
                <!--<el-input v-model="formInfo.description" placeholder="请输入描述"></el-input>-->
              <!--</el-form-item>-->
            <!--</el-col>-->
            <!--<el-col :span="12">-->
              <!--<el-form-item label="描述:">-->
                <!--<el-input v-model="formInfo.description" placeholder="请输入描述"></el-input>-->
              <!--</el-form-item>-->
            <!--</el-col>-->
          <!--</el-row>-->
        <!--</el-form>-->
        <!--<div slot="footer" class="dialog-footer" style="text-align: center">-->
          <!--<el-button  size="small" type="primary" @click="editPhotoSuccess()">保存</el-button>-->
        <!--</div>-->
      <!--</div>-->
    <!--</el-dialog>-->
  </div>
</template>

<script>
  export default {
    name: 'improve-img-info',
    props: ['improveImgInfoDialog'],
    data() {
      return {
        improveImgInfoDialogVisible: false,
        editImgInfoDialogVisible: false,
        formInfo: {
          name: '',
          description: '',
        },
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
      }
    },
    methods: {
      continueUploading() {
        this.improveImgInfoDialogVisible = false;
        this.$emit("upload");
      },
      editSingleInfo() {
        this.improveImgInfoDialogVisible = false;
        this.editImgInfoDialogVisible = true;
      },
      editAlbum() {
        this.$http.put(globalConfig.sever + 'album/2',this.formInfo).then((res)=>{
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
