<template>
  <div>
    <el-dialog title="新增科目" :visible.sync="dialogVisible" width="40%">
      <el-form :model="form" size="mini" label-width="80px">
        <el-form-item label="上级科目">
          <el-input v-model="form.preSubject" placeholder="请选择科目" readonly>
            <template slot="append">
              <div style="cursor: pointer;" @click="close_">清空</div>
            </template>
          </el-input>
        </el-form-item>
        <el-row>
          <el-col :span="12">
            <el-form-item label="科目名称">
              <el-input v-model="form.subjectName" placeholder="请输入科目名称"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="类型">
              <el-input v-model="form.subjectType" placeholder="类型" :disabled="true"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-form-item label="备注">
          <el-input type="textarea" :autosize="{minRows: 2, maxRows: 4}" placeholder="请填写备注"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button size="small" @click="dialogVisible = false">取&nbsp;消</el-button>
        <el-button size="small" type="primary" @click="dialogVisible = false">确&nbsp;定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  export default {
    name: "add-subject",
    props: ['FormVisible'],
    data() {
      return {
        dialogVisible: false,
        form: {
          preSubject: '',
          subjectName: '',
          subjectType: '',
          remark: '',
        },
      }
    },
    mounted() {
    },
    watch: {
      FormVisible(val) {
        this.dialogVisible = val;
      },
      dialogVisible(val) {
        if (!val) {
          this.$emit('close')
        }
      }
    },
    methods: {
      close_() {
        console.log(1);
      }
    },
  }
</script>

<style scoped>

</style>
