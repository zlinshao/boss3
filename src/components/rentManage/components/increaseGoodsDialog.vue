<template>
  <div id="increaseGoods">
    <el-dialog title="物品增配" :visible.sync="increaseGoodsDialogVisible" width="40%">
      <div>
        <el-form :inline="true" size="small" :model="form" label-width="100px">
          <el-form-item label="增配时间">
            <el-date-picker type="date" placeholder="选择日期"></el-date-picker>
          </el-form-item>
          <el-form-item label="物品来源">
            <el-select v-model="form.region" placeholder="请选择活动区域">
              <el-option label="区域一" value="shanghai"></el-option>
              <el-option label="区域二" value="beijing"></el-option>
            </el-select>
          </el-form-item>
        </el-form>

        <el-form size="small" :model="form" label-width="100px">
          <el-form-item label="物品名称">
            <el-input type="textarea"></el-input>
          </el-form-item>
          <el-form-item label="价格">
            <el-input></el-input>
          </el-form-item>
          <el-form-item label="原物品去向">
            <el-input></el-input>
          </el-form-item>
        </el-form>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button size="small" @click="increaseGoodsDialogVisible = false">取 消</el-button>
        <el-button size="small" type="primary" @click="increaseGoodsDialogVisible = false">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
  export default {
    props:['increaseGoodsDialog'],
    data() {
      return {
        increaseGoodsDialogVisible:false,
        form:{},
      };
    },
    watch:{
      increaseGoodsDialog(val){
        this.increaseGoodsDialogVisible = val
      },
      increaseGoodsDialogVisible(val){
        if(!val){
          this.$emit('close')
        }
      }
    }
  };
</script>
<style lang="scss">
  #increaseGoods{
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
        }
      }
    }
  }

</style>
