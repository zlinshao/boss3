<template>
  <div id="visitRecord">
    <el-dialog title="回访记录" :visible.sync="visitRecordDialogVisible" width="50%">
      <div class="">
        <el-form size="mini" onsubmit="return false;" :model="form" label-width="100px">
          <el-row >
            <el-form-item label="回访时间："></el-form-item>
          </el-row>
          <el-row>
            <el-form-item label="回访人："></el-form-item>
          </el-row>
          <el-row>
            <el-form-item label="回访内容：">
              <el-input v-model="form.content" type="textarea" placeholder="请输入回访内容"></el-input>
            </el-form-item>
          </el-row>
          <el-row >
            <el-form-item>
              <el-input v-model="form.contract_id" type="hidden"></el-input>
            </el-form-item>
            <el-for-item>
              <el-input v-model="form.category" type="hidden"></el-input>
            </el-for-item>
          </el-row>
        </el-form>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button size="small" @click="visitRecordDialogVisible = false">取 消</el-button>
        <el-button size="small" type="primary" @click="saveVisitRecord">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
  export default {
    name: "create-album",
    props: ['visitRecordDialog','contractId','category'],
    components: { },
    data() {
      return {
        visitRecordDialogVisible: false,
        form: {
          content: '',
          contract_id: '1', //从父组件传过来 合同id
          category: 1, // 从父组件传过来  // 收房1 租房2
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
      contractId(val) {
        this.form.contract_id = val;
      },
      category(val) {
        this.form.category = val;
      },
    },
    methods: {
      saveVisitRecord() {
        this.$http.post(globalConfig.server + "contract/feedback",this.form).then((res) => {
          if(res.data.code == "20010") {
            this.$notify.success({
              title:"成功",
              message:res.data.msg
            });
            this.visitRecordDialogVisible = false;
            this.form = {};
          }else{
            this.$notify.warning({
              title:"警告",
              message:res.data.msg
            });
          }
        });
      }
    },
  }
</script>

<style scoped>

</style>
