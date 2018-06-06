<template>
  <div>
    <el-dialog :close-on-click-modal="false" title="导 入" :visible.sync="importDialogVisible" width="30%">
      <div class="scroll_bar">
        <el-form size="small" onsubmit="return false" label-width="80px">
          <el-form-item label="上传文件">
            <UpLoad :ID="'batchEnterImport'" :isClear="isClear" @getImg="getImg"></UpLoad>
          </el-form-item>
        </el-form>
        <div style="color: #fb5c70">提示：请上传excel文件，只能上传一份</div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button size="small" @click="importDialogVisible = false">取 消</el-button>
        <el-button size="small" type="primary" @click="confirmAdd">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
  import UpLoad from '../../common/UPLOAD'
  export default {
    props:['importDialog'],
    components:{UpLoad},
    data() {
      return {
        importDialogVisible:false,
        params:{
          doc_id:'',
        },
        isClear : false,
      };
    },
    watch:{
      importDialog(val){
        this.importDialogVisible = val
      },
      importDialogVisible(val){
        if(!val){
          this.$emit('close');
          this.isClear = true;
          this.params.doc_id = '';

        }else {
          this.isClear = false;
        }
      }
    },
    methods:{
      getImg(val){
        this.params.doc_id = val[1][0];
      },
      confirmAdd(){
        this.$http.post(globalConfig.server+'financial/payable/transfer',this.params).then((res)=>{
          if(res.data.code == '80000'){
            this.$notify.success({
              title:'成功',
              msg:res.data.msg,
            })
            this.importDialogVisible = false;
            this.$emit('close','success');
          }else {
            this.$notify.warning({
              title:'警告',
              msg:res.data.msg,
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
