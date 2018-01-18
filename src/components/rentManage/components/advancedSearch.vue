<template>
  <div id="advancedSearch">
    <el-dialog title="高级搜索" :visible.sync="advancedDialogVisible" width="40%">
      <div>
        <el-form :inline="true" size="small" :model="formInline" class="demo-form-inline">
          <el-row :gutter="0">
            <el-col :span="6">
              <el-form-item>
                <el-select v-model="formInline.region" placeholder="客户名称">
                  <el-option label="区域一" value="shanghai"></el-option>
                  <el-option label="区域二" value="beijing"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="3">
              <el-form-item>
                <el-select v-model="formInline.region" placeholder="包含">
                  <el-option label="区域一" value="shanghai"></el-option>
                  <el-option label="区域二" value="beijing"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item>
                <el-input v-model="formInline.user" placeholder="审批人"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
        <div style="font-size: 12px;color: #409EFF;cursor: pointer">
          <i class="el-icon-plus"></i>添加筛选条件
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button size="small" @click="advancedDialogVisible = false">取 消</el-button>
        <el-button size="small" type="primary" @click="advancedDialogVisible = false">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
  export default {
    props:['advancedDialog'],
    data() {
      return {
        advancedDialogVisible:false,
        formInline: {
          user: '',
          region: ''
        }
      };
    },
    watch:{
      advancedDialog(val){
        this.advancedDialogVisible = val
      },
      advancedDialogVisible(val){
        if(!val){
          this.$emit('close')
        }
      }
    },
    methods:{

    }
  };
</script>
<style lang="scss">
  #advancedSearch{
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
