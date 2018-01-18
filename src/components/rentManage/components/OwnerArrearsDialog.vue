<template>
  <div id="decreaseGoods">
    <el-dialog title="添加欠款信息" :visible.sync="ownerArrearsDialogVisible" width="40%">
      <div>
        <el-form :inline="true" size="small" :model="form" label-width="100px">
          <el-form-item label="欠款时间">
            <el-date-picker type="date" placeholder="选择日期"></el-date-picker>
          </el-form-item>
          <el-form-item label="欠款金额">
            <el-input></el-input>
          </el-form-item>
          <el-form-item label="还款期限">
            <el-date-picker type="date" placeholder="选择日期"></el-date-picker>
          </el-form-item>
          <el-form-item label="欠款身份">
            <el-select v-model="form.region" placeholder="请选择活动区域">
              <el-option label="房东" value="shanghai"></el-option>
              <el-option label="租客" value="beijing"></el-option>
            </el-select>
          </el-form-item>
        </el-form>

        <el-form size="small" :model="form" label-width="100px">
          <el-form-item label="欠款类型">
            <el-radio-group v-model="form.resource">
              <el-radio label="他人欠公司"></el-radio>
              <el-radio label="公司欠他人"></el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="录入人">
            <el-col :span="10">
              <el-input></el-input>
            </el-col>
          </el-form-item>
          <el-form-item label="物品名称">
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
<style lang="scss">
  #decreaseGoods{
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
          .el-date-editor.el-input, .el-date-editor.el-input__inner {
            width: 215px;
          }
        }
      }
    }
  }

</style>
