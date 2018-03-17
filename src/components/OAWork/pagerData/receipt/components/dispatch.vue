<template>
  <div>
    <el-dialog title="收回/取消收回" :visible.sync="dispatchDialogVisible" width="40%">
      <div class="scroll_bar">

        <div class="title">收房合同</div>
        <div class="form_border">
          <el-form size="mini" :model="formInline" label-width="100px">
            <el-row>
              <el-col :span="6">
                <el-checkbox label="LJSF010000015" name="type"></el-checkbox>
              </el-col>
              <el-col :span="6">
                <el-checkbox label="LJSF010000015" name="type"></el-checkbox>
              </el-col>
              <el-col :span="6">
                <el-checkbox label="LJSF010000015" name="type"></el-checkbox>
              </el-col>
              <el-col :span="6">
                <el-checkbox label="LJSF010000015" name="type"></el-checkbox>
              </el-col>

              <el-col :span="6">
                <el-checkbox label="LJSF010000015" name="type"></el-checkbox>
              </el-col>
              <el-col :span="6">
                <el-checkbox label="LJSF010000015" name="type"></el-checkbox>
              </el-col>

            </el-row>
          </el-form>
        </div>

        <div class="title">租房合同</div>
        <div class="form_border">
          <el-form size="mini" :model="formInline" label-width="100px">
            <el-row>
              <el-col :span="6">
                <el-checkbox label="LJSF010000015" name="type"></el-checkbox>
              </el-col>
              <el-col :span="6">
                <el-checkbox label="LJSF010000015" name="type"></el-checkbox>
              </el-col>
              <el-col :span="6">
                <el-checkbox label="LJSF010000015" name="type"></el-checkbox>
              </el-col>
              <el-col :span="6">
                <el-checkbox label="LJSF010000015" name="type"></el-checkbox>
              </el-col>

              <el-col :span="6">
                <el-checkbox label="LJSF010000015" name="type"></el-checkbox>
              </el-col>
              <el-col :span="6">
                <el-checkbox label="LJSF010000015" name="type"></el-checkbox>
              </el-col>

            </el-row>
          </el-form>
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button size="small" @click="dispatchDialogVisible = false">取 消</el-button>
        <el-button size="small" type="primary" @click="dispatchDialogVisible = false">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
  export default {
    props:['dispatchDialog'],
    data() {
      return {
        dispatchDialogVisible:false,
        formInline: {region:''},
        tableData:[],
        value1:'',
      };
    },
    watch:{
      dispatchDialog(val){
        this.dispatchDialogVisible = val
      },
      dispatchDialogVisible(val){
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
