<template>
  <div id="ownerArrears">
    <el-dialog title="添加欠款信息" :visible.sync="ownerArrearsDialogVisible" width="40%">
      <div>
        <el-form size="mini" :model="form" label-width="100px">
          <el-row>
            <el-col :span="12">
              <el-form-item label="欠款时间" required>
                <el-date-picker type="date" placeholder="选择日期"></el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="欠款金额" required>
                <el-input></el-input>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row>
            <el-col :span="12">
              <el-form-item label="还款期限" required>
                <el-date-picker type="date" placeholder="选择日期"></el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="欠款身份" required>
                <el-select v-model="form.region" placeholder="请选择活动区域">
                  <el-option label="房东" value="shanghai"></el-option>
                  <el-option label="租客" value="beijing"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>

          <el-form-item label="欠款类型" required>
            <el-radio-group v-model="form.resource">
              <el-radio label="他人欠公司"></el-radio>
              <el-radio label="公司欠他人"></el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="录入人" required>
            <el-col>
              <el-input></el-input>
            </el-col>
          </el-form-item>
          <el-form-item label="物品名称" required>
            <el-input type="textarea"></el-input>
          </el-form-item>
        </el-form>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button size="small" @click="ownerArrearsDialogVisible = false">取 消</el-button>
        <el-button size="small" type="primary" @click="ownerArrearsDialogVisible = false">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
  export default {
    props:['ownerArrearsDialog'],
    data() {
      return {
        ownerArrearsDialogVisible:false,
        form:{},
      };
    },
    watch:{
      ownerArrearsDialog(val){
        this.ownerArrearsDialogVisible = val
      },
      ownerArrearsDialogVisible(val){
        if(!val){
          this.$emit('close')
        }
      }
    }
  };
</script>
<style lang="scss" scoped="">


</style>
