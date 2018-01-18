<template>
  <div id="back_up">
    <el-dialog title="查看备份" :visible.sync="backUpDialogVisible">
      <div>
        <el-table
          :data="tableData"
          style="width: 100%">
          <el-table-column
            prop="date"
            label="文件名"
            width="180">
          </el-table-column>
          <el-table-column
            prop="name"
            label="备份时间"
            width="180">
          </el-table-column>
          <el-table-column
            prop="address"
            label="备份人">
          </el-table-column>
          <el-table-column
            prop="aa"
            label="操作">
          </el-table-column>
        </el-table>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button size="small" @click="backUpDialogVisible = false">取 消</el-button>
        <el-button size="small" type="primary" @click="backUpDialogVisible = false">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
  export default {
    props:['backUpDialog'],
    data() {
      return {
        backUpDialogVisible:false,
        tableData:[],
      };
    },
    watch:{
      backUpDialog(val){
        this.backUpDialogVisible = val
      },
      backUpDialogVisible(val){
        if(!val){
          this.$emit('close')
        }
      }
    }
  };
</script>
<style lang="scss">
  #back_up{
    .el-dialog__wrapper{
      .el-dialog{
        .el-dialog__header{
          border-bottom: 1px solid #eee;
          .el-dialog__title{
            color: #409EFF;
            line-height: 0;
            font-size: 16px;
          }
        }
        .el-dialog__body{
          padding: 15px;
          >div{
            border: 1px solid #dfe6fb;
            .el-table{
              th{
                background-color: #dfe6fb;
              }
            }
          }
        }
      }
    }
  }

</style>
