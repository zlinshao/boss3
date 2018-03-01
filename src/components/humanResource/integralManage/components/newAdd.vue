<template>
  <div>
    <el-dialog title="添加维修" :visible.sync="newAddDialogVisible" width="40%">
      <div>
        <el-form size="mini" :model="form" label-width="100px">
          <el-row>
            <!--<el-col :span="24">-->
              <!--<el-form-item label="报修时间">-->
                <!--<el-date-picker type="date" v-model="form.date" placeholder="选择日期"></el-date-picker>-->
              <!--</el-form-item>-->
            <!--</el-col>-->
            <el-col :span="24">
              <el-form-item label="姓名">
                <el-input placeholder="请输入内容"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="24">
              <el-form-item label="部门">
                <el-input placeholder="请输入内容"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="积分项">
                <el-select v-model="form.region" clearable="" placeholder="请选择积分项">
                  <el-option label="区域一" value="shanghai"></el-option>
                  <el-option label="区域二" value="beijing"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="16">
              <el-form-item label-width="20px">
                <el-select v-model="form.region" clearable="" placeholder="请选择积分项">
                  <el-option label="区域一" value="shanghai"></el-option>
                  <el-option label="区域二" value="beijing"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="24">
              <el-form-item label="积分项">
                <el-input placeholder="请输入内容"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="24">
              <el-form-item label="对应积分">
                <el-input placeholder="请输入内容"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="24">
              <el-form-item label="现有积分">
                <el-input placeholder="请输入内容"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="24">
              <el-form-item label="备注">
                <el-input type="textarea" placeholder="请输入内容"></el-input>
              </el-form-item>
            </el-col>

          </el-row>
        </el-form>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button size="small" @click="newAddDialogVisible = false">取 消</el-button>
        <el-button size="small" type="primary" @click="newAddDialogVisible = false">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
  export default {
    props:['newAddDialog'],
    data() {
      return {
        newAddDialogVisible:false,
        form:{},
      };
    },
    watch:{
      newAddDialog(val){
        this.newAddDialogVisible = val
      },
      newAddDialogVisible(val){
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
