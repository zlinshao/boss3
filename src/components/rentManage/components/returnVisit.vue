<template>
  <div>
    <el-dialog title="回访信息" :visible.sync="returnVisitDialogVisible" width="40%">
      <div>
        <!--<div class="form_border">-->
        <el-form size="mini" :model="formInline" label-width="150px">
            <el-row>
              <el-col :span="12">
                <el-form-item label="回访人" required>
                  <el-input placeholder="请输入内容"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="回访时间">
                  <el-date-picker type="date" placeholder="选择日期" v-model="formInline.date1"></el-date-picker>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <el-form-item label="回访结果">
                  <el-input placeholder="请输入内容"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="服务态度" required>
                  <el-input placeholder="请输入内容"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <el-form-item label="是否按时间完成">
                  <el-input placeholder="请输入内容"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="是否私自买配件" required>
                  <el-input placeholder="请输入内容"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <el-form-item label="是否私自向客户收取费用">
                  <el-input placeholder="请输入内容"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="24">
                <el-form-item label="备注" required>
                  <el-input type="textarea" placeholder="请输入内容"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
        <!--</div>-->
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button size="small" @click="returnVisitDialogVisible = false">取 消</el-button>
        <el-button size="small" type="primary" @click="returnVisitDialogVisible = false">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
  export default {
    props:['returnVisitDialog'],
    data() {
      return {
        returnVisitDialogVisible:false,
        formInline:{},
        FormVisible: false,
      };
    },
    watch:{
      returnVisitDialog(val){
        this.returnVisitDialogVisible = val
      },
      returnVisitDialogVisible(val){
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
