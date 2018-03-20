<template>
  <div id="visitRecord">
    <el-dialog title="回访记录" :visible.sync="visitRecordDialogVisible" width="50%">
      <div class="">
        <el-form size="mini" onsubmit="return false;" :model="form" label-width="100px">
          <el-row >
            <el-form-item label="回访时间：">
              <el-date-picker v-model="form.date" type="datetime" placeholder="选择日期时间"></el-date-picker>
            </el-form-item>
          </el-row>
          <el-row>
            <el-form-item label="回访内容：">
              <el-input v-model="form.description" type="textarea" placeholder="请输入回访内容"></el-input>
            </el-form-item>
          </el-row>
          <el-row >
            <el-form-item label="回访人：">
              <el-input v-model="form.name" placeholder="请输入回访人" ></el-input>
            </el-form-item>
          </el-row>
        </el-form>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button size="small" @click="visitRecordDialogVisible = false">取 消</el-button>
        <el-button size="small" type="primary" @click="">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
  export default {
    name: "create-album",
    props: ['visitRecordDialog'],
    components: { },
    data() {
      return {
        visitRecordDialogVisible: false,
        form: {
          date: '',
          name: '',
          description: '',
        },
      }
    },
    watch: {
      visitRecordDialog(val) {
        this.visitRecordDialogVisible = val;
      },
      visitRecordDialogVisible(val) {
        if(!val) {
          this.$emit('close');
        }
      },
    },
    methods: {

    },
  }
</script>

<style scoped>

</style>
