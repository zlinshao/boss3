<template>
  <div id="addFollowUp">
    <el-dialog title="添加跟进" :visible.sync="addFollowUpDialogVisible">
      <div>
        <el-form size="small" :model="formInline" label-width="80px">
          <el-col :span="8">
            <el-form-item label="跟进时间">
              <el-date-picker type="date" placeholder="选择日期" v-model="formInline.date1"></el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="跟进方式">
              <el-select clearable v-model="formInline.region" placeholder="缴费方式">
                <el-option label="区域一" value="shanghai"></el-option>
                <el-option label="区域二" value="beijing"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="事件等级">
              <el-select clearable v-model="formInline.region" placeholder="缴费方式">
                <el-option label="区域一" value="shanghai"></el-option>
                <el-option label="区域二" value="beijing"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="身份">
              <el-date-picker type="date" placeholder="选择日期" v-model="formInline.date1"></el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="事件类型">
              <el-select clearable v-model="formInline.region" placeholder="缴费方式">
                <el-option label="区域一" value="shanghai"></el-option>
                <el-option label="区域二" value="beijing"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="事件转交">
              <el-select clearable v-model="formInline.region" placeholder="缴费方式">
                <el-option label="区域一" value="shanghai"></el-option>
                <el-option label="区域二" value="beijing"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="完成时间">
              <el-date-picker type="date" placeholder="选择日期" v-model="formInline.date1"></el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="录入时间">
              <el-date-picker type="date" placeholder="选择日期" v-model="formInline.date1"></el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="具体事件">
              <el-input v-model="formInline.user" placeholder="提前"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="具体事件" prop="desc">
              <el-input type="textarea" v-model="formInline.remarks"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="具体事件" prop="desc">
              <el-input v-model="formInline.user" placeholder="提前"></el-input>
            </el-form-item>
          </el-col>
        </el-form>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button size="small" @click="addFollowUpDialogVisible = false">取 消</el-button>
        <el-button size="small" type="primary" @click="addFollowUpDialogVisible = false">确 定</el-button>
      </span>
    </el-dialog>
    <StaffSelect :FormVisible="FormVisible" @close="closeStaff"></StaffSelect>
  </div>
</template>

<script>
  import StaffSelect from '../../common/organization.vue'
  export default {
    name:'addFollowUp',
    props:['addFollowUpDialog'],
    components:{StaffSelect},
    data() {
      return {
        addFollowUpDialogVisible:false,
        formInline:{},
        FormVisible: false,
      };
    },
    watch:{
      addFollowUpDialog(val){
        this.addFollowUpDialogVisible = val
      },
      addFollowUpDialogVisible(val){
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
  #addFollowUp{

  }

</style>
