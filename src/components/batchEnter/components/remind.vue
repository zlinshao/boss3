<template>
  <div>
    <el-dialog :close-on-click-modal="false" title="尾款提醒" :visible.sync="remindDialogVisible" width="30%">
      <div class="scroll_bar">
        <el-form size="small" onsubmit="return false" label-width="80px">
          <el-form-item label="开始时间">
            <el-date-picker v-model="params.start_date" type="date" value-format="yyyy-MM-dd" placeholder="选择日期"></el-date-picker>
          </el-form-item>
          <el-form-item label="结束时间">
            <el-date-picker v-model="params.end_date" type="date" value-format="yyyy-MM-dd" placeholder="选择日期"></el-date-picker>
          </el-form-item>
          <el-form-item label="历史尾款">
            <el-input v-model="params.message" type="textarea" placeholder="请输入内容"></el-input>
          </el-form-item>
        </el-form>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button size="small" @click="remindDialogVisible = false">取 消</el-button>
        <el-button size="small" type="primary" @click="confirmAdd">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
  export default {
    props: ['remindDialog', 'activeName'],
    data() {
      return {
        remindDialogVisible: false,
        params: {
          start_date:'',
          end_date:'',
          message:'',
        },
      };
    },
    watch: {
      remindDialog(val) {
        this.remindDialogVisible = val
      },
      remindDialogVisible(val) {
        if (!val) {
          this.$emit('close');
          this.params = {
            start_date:'',
            end_date:'',
            message:'',
          };
        }
      }
    },
    methods: {
      confirmAdd() {
        this.$http.post(globalConfig.server+'financial/receivable/remind/arrears',this.params).then((res)=>{
          if(res.data.code === '80000'){
            this.$notify.success({
              title: '成功',
              message: res.data.msg,
            });
            this.remindDialogVisible = false;
          }else {
            this.$notify.warning({
              title: '警告',
              message: res.data.msg,
            })
          }
        })
      }
    }
  };
</script>
<style lang="scss" scoped="">
  .el-select .el-input {
    width: 130px;
  }

  .input-with-select .el-input-group__prepend {
    background-color: #fff;
  }
</style>
