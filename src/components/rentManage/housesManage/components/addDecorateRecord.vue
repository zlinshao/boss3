<template>
  <div>
    <el-dialog :close-on-click-modal="false" title="添加装修记录" :visible.sync="addDecorateDialogVisible" width="40%">
      <div>
        <!--<div class="form_border">-->
        <el-form size="mini" :model="formInline" label-width="100px">
          <el-row>
            <el-col :span="12">
              <el-form-item label='装修状态' required>
                <el-select clearable placeholder="请选择装修类型" v-model="formInline.decoration_type" value="">
                  <el-option v-for="item in decorate_dic" :label="item.dictionary_name" :value="item.id" :key="item.id"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label='装修后效果' required>
                <el-select clearable placeholder="请选择装修类型" v-model="formInline.after_decoration_effect" value="">
                  <el-option v-for="item in decorate_dic" :label="item.dictionary_name" :value="item.id" :key="item.id"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label='装修开始时间' required>
                <el-date-picker value-format="yyyy-MM-dd" type="date"
                                 placeholder="选择日期" v-model="formInline.decoration_start_time"></el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label='装修结束时间' required>
                <el-date-picker value-format="yyyy-MM-dd" type="date"
                                 placeholder="选择日期" v-model="formInline.decoration_end_time"></el-date-picker>
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
                <el-input type="textarea" v-model="formInline.remark" placeholder="请输入内容"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
        <!--</div>-->
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button size="small" @click="addDecorateDialogVisible = false">取 消</el-button>
        <el-button size="small" type="primary" @click="confirmAdd">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
  import UpLoad from '../../../common/UPLOAD.vue'
  export default {
    props:['addDecorateDialog','houseId'],
    components:{UpLoad},
    data() {
      return {
        addDecorateDialogVisible:false,
        formInline:{
          house_id : '',
          decoration_type : '',
          decoration_start_time : '',
          decoration_end_time : '',
          after_decoration_effect : '',
          remark : '',
          album_file:[],
        },

        isClear:false,
        decorate_dic:[],
      };
    },
    watch:{
      addDecorateDialog(val){
        this.addDecorateDialogVisible = val
      },
      addDecorateDialogVisible(val){
        if(!val){
          this.$emit('close');
          this.formInline = {
            house_id : this.houseId,
            decoration_type : '',
            decoration_start_time : '',
            decoration_end_time : '',
            after_decoration_effect : '',
            remark : '',
            album_file:[],
          };
          this.isClear = false;
        }else {
          this.isClear = true;
          if(!this.isDictionary){
            this.getDictionary();
          }
        }
      },
      houseId(val){
        this.formInline.house_id = val;
      }
    },
    methods:{
      getImg(val){
        this.formInline.album_file = val[1];
        this.isUpload = val[2];
      },
      getDictionary(){
        this.dictionary(404,1).then((res) => {this.decorate_dic = res.data;this.isDictionary = true});
      },
      confirmAdd(){
        if(!this.isUpload){
          this.$http.post(globalConfig.server+'core/decoration',this.formInline).then((res) => {
            if(res.data.code === '30010'){
              this.addDecorateDialogVisible = false;
              this.$emit('close','success');
              this.$notify.success({
                title:'成功',
                message:res.data.msg,
              })
            }else {
              this.$notify.warning({
                title:'警告',
                message:res.data.msg,
              })
            }
          })
        }else {
          this.$notify.warning({
            title:'警告',
            message:'图片正在上传',
          })
        }
      },
    }
  };
</script>
<style lang="scss" scoped="">
</style>
