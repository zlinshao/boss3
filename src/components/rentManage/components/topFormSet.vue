<template>
  <div>
    <el-dialog :close-on-click-modal="false" title="选择列" :visible.sync="topFormSetDialogVisible" width="40%">
      <div class="scroll_bar">

        <div class="title">选择列（勾选隐藏列）</div>
        <div class="form_border">
          <el-form size="mini" :model="formInline" label-width="100px">
            <el-row>
              <el-col :span="6">
                <el-checkbox label="美食线上活动" name="type"></el-checkbox>
              </el-col>
              <el-col :span="6">
                <el-checkbox label="美食线上活动" name="type"></el-checkbox>
              </el-col>
              <el-col :span="6">
                <el-checkbox label="美食线上" name="type"></el-checkbox>
              </el-col>
              <el-col :span="6">
                <el-checkbox label="美食线上活动" name="type"></el-checkbox>
              </el-col>

              <el-col :span="6">
                <el-checkbox label="美食线上活动" name="type"></el-checkbox>
              </el-col>
              <el-col :span="6">
                <el-checkbox label="美食线上活动" name="type"></el-checkbox>
              </el-col>

            </el-row>
          </el-form>
        </div>

      </div>
      <span slot="footer" class="dialog-footer">
        <el-button size="small" @click="topFormSetDialogVisible = false">取 消</el-button>
        <el-button size="small" type="primary" @click="topFormSetDialogVisible = false">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
  import ElCol from "element-ui/packages/col/src/col";
  export default {
    components: {ElCol},
    props:['topFormSetDialog'],
    data() {
      return {
        topFormSetDialogVisible:false,
        formInline: {region:''},
        tableData:[],
        value1:'',
      };
    },
    watch:{
      topFormSetDialog(val){
        this.topFormSetDialogVisible = val
      },
      topFormSetDialogVisible(val){
        if(!val){
          this.$emit('close')
        }
      }
    },
    methods:{

    }
  };
</script>
<style lang="scss" scoped="">
  .el-dialog__wrapper .el-dialog .el-dialog__body .form_border {
    padding: 18px 10px 18px 10px;
  }
</style>
