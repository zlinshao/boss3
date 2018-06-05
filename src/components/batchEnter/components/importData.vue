<template>
  <div>
    <el-dialog :close-on-click-modal="false" title="导出" :visible.sync="exportDialogVisible" width="30%">
      <div class="scroll_bar">
        <el-form size="small" onsubmit="return false" label-width="80px">
          <el-form-item label="导入账户">
            <UpLoad :ID="'batchEnterImport'" :isClear="isClear" @getImg="getImg"></UpLoad>
          </el-form-item>
        </el-form>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button size="small" @click="exportDialogVisible = false">取 消</el-button>
        <el-button size="small" type="primary" @click="exportDialogVisible = false">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
  import UpLoad from '../../common/UPLOAD'
  export default {
    props:['exportDialog'],
    components:{UpLoad},
    data() {
      return {
        exportDialogVisible:false,
        tableData:[],
        select : '',
        params:{
          search:'',
        },
        isClear : false,
      };
    },
    watch:{
      exportDialog(val){
        this.exportDialogVisible = val
      },
      exportDialogVisible(val){
        if(!val){
          this.$emit('close')
        }
      }
    },
    methods:{
      getImg(val){}
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
