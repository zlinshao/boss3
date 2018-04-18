<template>
  <div id="addCollectRepair">
    <el-dialog :close-on-click-modal="false" title="添加维修" :visible.sync="addCollectRepairDialogVisible" width="60%">
      <div>
        <el-form size="mini" :model="form" label-width="100px">
          <el-row>
            <el-col :span="8">
              <el-form-item label="合同编号">
                <el-input v-model="form.contract_number" ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="合同类型">
                <el-input v-model="form.contract_type" ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="客户姓名">
                <el-input v-model="form.customer_name" ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="客户性别">
                <el-input v-model="form.customer_name" ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="客户电话">
                <el-input v-model="form.customer_mobile" ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="维修内容">
                <el-input type="textarea" v-model="form.content" ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="维修时间">
                <el-date-picker type="date" v-model="form.repair_time" placeholder="选择日期"></el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="维修师傅">
                <el-input  v-model="form.repair_master" ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="维修结果">
                <el-input  v-model="form.repair_result" ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="维修金额">
                <el-input  v-model="form.repair_money" ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="备注">
                <el-input type="textarea" v-model="form.content" ></el-input>
              </el-form-item>
            </el-col>

            <el-col :span="8">
              <el-form-item label="维修状态">
                <el-select v-model="form.status" placeholder="请选择责任归属">
                  <el-option label="区域一" value="shanghai"></el-option>
                  <el-option label="区域二" value="beijing"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="认责人">
                <el-input placeholder="请输入内容"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="操作人">
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
        <el-button size="small" @click="addCollectRepairDialogVisible = false">取 消</el-button>
        <el-button size="small" type="primary" @click="addCollectRepairDialogVisible = false">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
  export default {
    props:['addCollectRepairDialog'],
    data() {
      return {
        addCollectRepairDialogVisible:false,
        form:{
          contract_number: '', //合同编号
          contract_type: '', //合同类型
          customer_name: '',  //客户姓名
          sex: null,     //性别
          customer_mobile: '',  //客户电话
          content: '',  //维修内容
          repair_time: '',  //维修时间
          repair_master: '',  //维修师傅
          repair_result: '',  //维修结果
          repair_money: '',   //维修金额
          remark: '',  //备注
          status: '',  //维修状态
          person_liable: '', //认责人
          operator_id: '', //操作人
        },
      };
    },
    watch:{
      addCollectRepairDialog(val){
        this.addCollectRepairDialogVisible = val
      },
      addCollectRepairDialogVisible(val){
        if(!val){
          this.$emit('close')
        }
      }
    }
  };
</script>
<style lang="scss" scoped="">
  #addCollectRepair{
  }

</style>
