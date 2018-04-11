<template>
  <div>
    <el-dialog :close-on-click-modal="false" title="添加提醒" :visible.sync="addFollowUpDialogVisible" width="30%">
      <div>

        <el-form size="mini" :model="formInline" label-width="100px">
          <el-form-item label="提醒内容">
            <el-input type="textarea" v-model="formInline.desc"></el-input>
          </el-form-item>

          <el-form-item label="提醒时间">
            <el-col :span="12">
              <el-date-picker type="date" placeholder="选择日期" v-model="formInline.date1" style="width: 100%;"></el-date-picker>
            </el-col>
          </el-form-item>
        </el-form>

      </div>
      <span slot="footer" class="dialog-footer">
        <el-button size="small" @click="addFollowUpDialogVisible = false">取 消</el-button>
        <el-button size="small" type="primary" @click="addFollowUpDialogVisible = false">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
  import ElCol from "element-ui/packages/col/src/col";
  export default {
    components: {ElCol},
    props:['addFollowUpDialog'],
    data() {
      return {
        addFollowUpDialogVisible:false,
        formInline: {region:''},
        tableData:[],
        value1:'',
      };
    },
    watch:{
      addFollowUpDialog(val){
        this.addFollowUpDialogVisible = val
      },
      addFollowUpDialogVisible(val){
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
