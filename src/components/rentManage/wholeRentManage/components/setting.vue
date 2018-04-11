<template>
  <div>
    <el-dialog :close-on-click-modal="false" title="设置" :visible.sync="settingDialogVisible" width="40%">
      <div class="scroll_bar">
        <div class="title">退房提醒设置</div>
        <div class="form_border">
          <el-form size="mini" :model="formInline" label-width="100px">
            <el-row>
              <el-col :span="6">
                <el-checkbox label="财务人员" name="type"></el-checkbox>
              </el-col>
              <el-col :span="6">
                <el-checkbox label="财务经理" name="type"></el-checkbox>
              </el-col>
              <el-col :span="6">
                <el-checkbox label="行政经理" name="type"></el-checkbox>
              </el-col>
              <el-col :span="6">
                <el-checkbox label="行政人员" name="type"></el-checkbox>
              </el-col>

              <el-col :span="6">
                <el-checkbox label="收房业务员" name="type"></el-checkbox>
              </el-col>
              <el-col :span="6">
                <el-checkbox label="租房业务员" name="type"></el-checkbox>
              </el-col>
              <el-col :span="6">
                <el-checkbox label="综合事务部经理" name="type"></el-checkbox>
              </el-col>

              <el-col :span="6">
                <el-checkbox label="客服经理" name="type"></el-checkbox>
              </el-col>
              <el-col :span="6">
                <el-checkbox label="综合事务部专员" name="type"></el-checkbox>
              </el-col>
            </el-row>
            <div style="color: #ff5264">
              备注：勾选职务后，只要有租客退房，系统会自动发送待办提醒给该职位下所有员工。
            </div>
          </el-form>
        </div>
        <div class="title">租期将近提醒设置</div>
        <div class="form_border">
          <el-form size="mini" :model="formInline" label-width="100px">
            <el-row>
              <el-col :span="24">
                <el-checkbox label="财务人员" name="type"></el-checkbox>
                启用房东/租客合同到期自动提醒，提前
                <el-input style="width: 150px" size="mini"></el-input>
                天
              </el-col>
            </el-row>
            <h4>通知人员</h4>
            <el-row>
              <el-col :span="6">
                <el-checkbox label="财务人员" name="type"></el-checkbox>
              </el-col>
              <el-col :span="6">
                <el-checkbox label="财务经理" name="type"></el-checkbox>
              </el-col>
              <el-col :span="6">
                <el-checkbox label="租房业务员" name="type"></el-checkbox>
              </el-col>
              <el-col :span="6">
                <el-checkbox label="综合事务部经理" name="type"></el-checkbox>
              </el-col>

              <el-col :span="6">
                <el-checkbox label="客服经理" name="type"></el-checkbox>
              </el-col>
              <el-col :span="6">
                <el-checkbox label="综合事务部专员" name="type"></el-checkbox>
              </el-col>
            </el-row>
          </el-form>
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button size="small" @click="settingDialogVisible = false">取 消</el-button>
        <el-button size="small" type="primary" @click="settingDialogVisible = false">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
  import ElCol from "element-ui/packages/col/src/col";
  export default {
    components: {ElCol},
    props:['settingDialog'],
    data() {
      return {
        settingDialogVisible:false,
        formInline: {region:''},
        tableData:[],
        value1:'',
      };
    },
    watch:{
      settingDialog(val){
        this.settingDialogVisible = val
      },
      settingDialogVisible(val){
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
