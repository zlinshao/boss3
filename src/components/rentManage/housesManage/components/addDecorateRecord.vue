<template>
  <div>
    <el-dialog :close-on-click-modal="false" title="添加装修记录" :visible.sync="addDecorateDialogVisible" width="40%">
      <div>
        <!--<div class="form_border">-->
        <el-form size="mini" :model="formInline" label-width="100px">
          <el-row>
            <el-col :span="12">
              <el-form-item label='装修状态' required>
                <el-select clearable placeholder="请选择装修状态" value="">
                  <el-option label="item.dictionary_name" value="item.id"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label='装修后效果' required>
                <el-select clearable placeholder="请选择装修状态" value="">
                  <el-option label="item.dictionary_name" value="item.id"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label='装修开始时间' required>
                <el-date-picker value-format="yyyy-MM-dd" type="date"
                                 placeholder="选择日期" v-model="formInline.begin_date"></el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label='装修结束时间' required>
                <el-date-picker value-format="yyyy-MM-dd" type="date"
                                 placeholder="选择日期" v-model="formInline.begin_date"></el-date-picker>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row>
            <el-col :span="24">
              <el-form-item label="上传图片">
                <UpLoad :ID="'addDecorate_pic'" :isClear="isClear"  @getImg="getImg"></UpLoad>
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
        <el-button size="small" @click="addDecorateDialogVisible = false">取 消</el-button>
        <el-button size="small" type="primary" @click="addDecorateDialogVisible = false">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
  import UpLoad from '../../../common/UPLOAD.vue'
  export default {
    props:['addDecorateDialog'],
    components:{UpLoad},
    data() {
      return {
        addDecorateDialogVisible:false,
        formInline:{},
        FormVisible: false,

        isClear:false,
      };
    },
    watch:{
      addDecorateDialog(val){
        this.addDecorateDialogVisible = val
      },
      addDecorateDialogVisible(val){
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
