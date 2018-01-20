<template>
  <div id="decreaseGoods">
    <el-dialog title="物品搬出" :visible.sync="decreaseGoodsDialogVisible" width="40%">
      <div>
        <el-form size="mini" :model="form" label-width="100px">
          <el-row>
            <el-col :span="12">
              <el-form-item label="操作时间">
                <el-date-picker type="date" placeholder="选择日期"></el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="物品去向">
                <el-select v-model="form.region" placeholder="请选择活动区域">
                  <el-option label="区域一" value="shanghai"></el-option>
                  <el-option label="区域二" value="beijing"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row>
            <el-col :span="12">
              <el-form-item label="物品所有权">
                <el-select v-model="form.region" placeholder="请选择活动区域">
                  <el-option label="区域一" value="shanghai"></el-option>
                  <el-option label="区域二" value="beijing"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="操作人">
                <el-input></el-input>
              </el-form-item>
            </el-col>
          </el-row>

        </el-form>

        <el-form size="small" :model="form" label-width="100px">
          <el-form-item label="物品名称">
            <el-input type="textarea"></el-input>
          </el-form-item>
        </el-form>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button size="small" @click="decreaseGoodsDialogVisible = false">取 消</el-button>
        <el-button size="small" type="primary" @click="decreaseGoodsDialogVisible = false">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
  export default {
    props:['decreaseGoodsDialog'],
    data() {
      return {
        decreaseGoodsDialogVisible:false,
        form:{},
      };
    },
    watch:{
      decreaseGoodsDialog(val){
        this.decreaseGoodsDialogVisible = val
      },
      decreaseGoodsDialogVisible(val){
        if(!val){
          this.$emit('close')
        }
      }
    }
  };
</script>
<style lang="scss" scoped="">
</style>
