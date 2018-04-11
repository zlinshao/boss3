<template>
  <div>
    <el-dialog :close-on-click-modal="false" title="还款" :visible.sync="repaymentDialogVisible" width="40%">
      <div>
        <!--<div class="form_border">-->
          <el-form size="mini" :model="formInline" label-width="100px">
            <el-row>
              <el-col :span="12">
                <el-form-item label="还款时间">
                  <el-date-picker type="date" placeholder="选择日期" v-model="formInline.date1"></el-date-picker>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="应还款金额" required>
                  <el-input placeholder="请输入内容"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="24">
                <el-form-item label="还款状态" required>
                  <el-radio-group v-model="formInline.resource">
                    <el-radio label="已还全部"></el-radio>
                    <el-radio label="已还部分"></el-radio>
                    <el-radio label="坏账"></el-radio>
                  </el-radio-group>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <el-form-item label="本次还款金额">
                  <el-input placeholder="请输入内容"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="剩余还款期限" required>
                  <el-input placeholder="请输入内容"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <el-form-item label="剩余欠款">
                  <el-input placeholder="请输入内容"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <el-form-item label="欠费说明" required>
                  <el-input type="textarea" placeholder="请输入内容"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
        <!--</div>-->
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button size="small" @click="repaymentDialogVisible = false">取 消</el-button>
        <el-button size="small" type="primary" @click="repaymentDialogVisible = false">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
  export default {
    props:['repaymentDialog'],
    data() {
      return {
        repaymentDialogVisible:false,
        formInline:{},
        FormVisible: false,
      };
    },
    watch:{
      repaymentDialog(val){
        this.repaymentDialogVisible = val
      },
      repaymentDialogVisible(val){
        if(!val){
          this.$emit('close')
        }
      }
    },
    methods:{
      selectStaff(){
        this.FormVisible = true;
      },
      closeStaff(){
        this.FormVisible = false;
      }
    }
  };
</script>
<style lang="scss" scoped="">
</style>
