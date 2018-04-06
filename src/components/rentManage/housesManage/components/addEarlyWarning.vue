<template>
  <div>
    <el-dialog title="调整预警状态" :visible.sync="addEarlyWarningDialogVisible" width="30%">
      <div>
        <!--<div class="form_border">-->
        <el-form size="mini" :model="formInline" label-width="80px">
          <el-row>
            <el-col :span="24">
              <el-form-item label="控制预警" required>
                <el-select clearable placeholder="请选择控制预警" value="">
                  <el-option label="item.dictionary_name" value="item.id"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row>
            <el-col :span="24">
              <el-form-item label="调整原因">
                <el-input type="textarea" placeholder="请输入内容"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
        <!--</div>-->
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button size="small" @click="addEarlyWarningDialogVisible = false">取 消</el-button>
        <el-button size="small" type="primary" @click="addEarlyWarningDialogVisible = false">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
  import UpLoad from '../../../common/UPLOAD.vue'
  export default {
    props:['addEarlyWarningDialog'],
    components:{UpLoad},
    data() {
      return {
        addEarlyWarningDialogVisible:false,
        formInline:{},
        FormVisible: false,

        isClear:false,
      };
    },
    watch:{
      addEarlyWarningDialog(val){
        this.addEarlyWarningDialogVisible = val
      },
      addEarlyWarningDialogVisible(val){
        if(!val){
          this.$emit('close')
        }else {
          this.isClear = true;
        }
      }
    },
    methods:{
      getImg(val){

      },
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
