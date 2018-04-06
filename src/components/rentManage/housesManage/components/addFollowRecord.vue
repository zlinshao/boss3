<template>
  <div>
    <el-dialog title="添加跟进记录" :visible.sync="addFollowDialogVisible" width="30%">
      <div>
        <!--<div class="form_border">-->
        <el-form size="mini" :model="formInline" label-width="80px">
          <el-row>
            <el-col :span="24">
              <el-form-item label="跟进方式" required>
                <el-select clearable placeholder="请选择装修类型" value="">
                  <el-option label="item.dictionary_name" value="item.id"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24">
              <el-form-item label="上传图片">
                <UpLoad :ID="'addFollow_pic'" :isClear="isClear"  @getImg="getImg"></UpLoad>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24">
              <el-form-item label="备注">
                <el-input type="textarea" placeholder="请输入内容"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
        <!--</div>-->
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button size="small" @click="addFollowDialogVisible = false">取 消</el-button>
        <el-button size="small" type="primary" @click="addFollowDialogVisible = false">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
  import UpLoad from '../../../common/UPLOAD.vue'
  export default {
    props:['addFollowDialog'],
    components:{UpLoad},
    data() {
      return {
        addFollowDialogVisible:false,
        formInline:{},
        FormVisible: false,

        isClear:false,
      };
    },
    watch:{
      addFollowDialog(val){
        this.addFollowDialogVisible = val
      },
      addFollowDialogVisible(val){
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
