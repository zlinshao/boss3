<template>
  <div id="addRentRepair">
    <el-dialog :close-on-click-modal="false" title="添加维修" :visible.sync="addRentRepairDialogVisible" width="40%">
      <div>
        <el-form size="mini" :model="form" label-width="100px">
          <el-row>
            <el-col :span="12">
              <el-form-item label="报修时间">
                <el-date-picker type="date" v-model="form.date" placeholder="选择日期"></el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="维修人员">
                <el-input placeholder="请输入内容"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="客户姓名">
                <el-input placeholder="请输入内容"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="客户电话">
                <el-input placeholder="请输入内容"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="客户期望时间">
                <el-date-picker type="date" v-model="form.date1" placeholder="选择日期"></el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="责任归属">
                <el-select v-model="form.region" placeholder="请选择责任归属">
                  <el-option label="区域一" value="shanghai"></el-option>
                  <el-option label="区域二" value="beijing"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="24">
              <el-form-item label="操作人">
                <el-input placeholder="请输入内容"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="24">
              <el-form-item label="报修事件">
                <el-input placeholder="请输入内容"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
        <div class="describe_border">
          功能说明：再次发布维修信息，您指定维修人员会收到短信，即使维修人员在外作业也能知道接下来的工作内容。
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button size="small" @click="addRentRepairDialogVisible = false">取 消</el-button>
        <el-button size="small" type="primary" @click="addRentRepairDialogVisible = false">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
  export default {
    props:['addRentRepairDialog'],
    data() {
      return {
        addRentRepairDialogVisible:false,
        form:{},
      };
    },
    watch:{
      addRentRepairDialog(val){
        this.addRentRepairDialogVisible = val
      },
      addRentRepairDialogVisible(val){
        if(!val){
          this.$emit('close')
        }
      }
    }
  };
</script>
<style lang="scss" scoped="">
  #addRentRepair{
  }

</style>
