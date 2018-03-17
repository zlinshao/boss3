<template>
  <div id="improveImgInfo">
    <el-dialog title="编辑图片信息" :visible.sync="improveImgInfoDialogVisible" width="40%">
      <div class="">
        <el-form size="mini" :model="formInfo" label-width="100px">
          <el-row >
              <el-col center>您已成功上传6张图片</el-col>
          </el-row>
          <el-row >
            <el-col center>统一添加信息 或编辑单条信息</el-col>
          </el-row>
          <el-row >
            <el-form-item label="名称:">
              <el-input v-model="formInfo.title" placeholder="请输入名称"></el-input>
            </el-form-item>
          </el-row>
          <el-row >
            <el-form-item label="描述:">
              <el-input v-model="formInfo.desc" placeholder="请输入描述"></el-input>
            </el-form-item>
          </el-row>
        </el-form>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button size="small" @click="improveImgInfoDialogVisible = false">取 消</el-button>
        <el-button size="small" type="primary" @click="improveImgInfoDialogVisible = false">保存并查看</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
  export default {
    name: 'improve-img-info',
    props: ['improveImgInfoDialog'],
    data() {
      return {
        improveImgInfoDialogVisible: false,
        formInfo: {
          title: '',
          desc: '',
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
  }
</script>

<style scoped>

</style>
