<template>
  <div>
    <el-dialog :close-on-click-modal="false" title="调整预警状态" :visible.sync="addEarlyWarningDialogVisible" width="30%">
      <div>
        <!--<div class="form_border">-->
        <el-form size="mini" :model="formInline" label-width="80px">
          <el-row>
            <el-col :span="24">
              <el-form-item label="控制预警" required>
                <el-select clearable placeholder="请选择控制预警" v-model="formInline.after_warning_status" value="">
                  <el-option  label="正常" value="1"></el-option>
                  <el-option  label="黄色预警" value="2"></el-option>
                  <el-option  label="橙色预警" value="3"></el-option>
                  <el-option  label="红色预警" value="4"></el-option>
                  <!--<el-option v-for="item in warning_dic" :label="item.dictionary_name" :value="item.id" :key="item.id"></el-option>-->
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row>
            <el-col :span="24">
              <el-form-item label="调整原因" required="">
                <el-input type="textarea" v-model="formInline.reason" placeholder="请输入内容"></el-input>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row>
            <el-col :span="24">
              <el-form-item label="上传图片" required="">
                <UpLoad :ID="'earlyWarning_pic'" :isClear="isClear"  @getImg="getImg"></UpLoad>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
        <!--</div>-->
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button size="small" @click="addEarlyWarningDialogVisible = false">取 消</el-button>
        <el-button size="small" type="primary" @click="confirmAdd">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
  import UpLoad from '../../../common/UPLOAD.vue'
  export default {
    props:['addEarlyWarningDialog','houseId'],
    components:{UpLoad},
    data() {
      return {
        addEarlyWarningDialogVisible:false,
        formInline:{
          house_id : '',
          after_warning_status : '',
          reason : '',
          album_file:[],
        },
        FormVisible: false,

        isClear:false,
        warning_dic:[],
        isDictionary : false,
        isUpload : false,
      };
    },
    watch:{
      addEarlyWarningDialog(val){
        this.addEarlyWarningDialogVisible = val
      },
      addEarlyWarningDialogVisible(val){
        if(!val){
          this.$emit('close');
          this.formInline = {
            house_id : this.houseId,
            after_warning_status : '',
            reason : '',
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
        this.dictionary(590,1).then((res) => {this.warning_dic = res.data;this.isDictionary = true});
      },
      confirmAdd(){
        if(!this.isUpload){
          this.$http.post(globalConfig.server+'core/warning',this.formInline).then((res) => {
            if(res.data.code === '40010'){
              this.addEarlyWarningDialogVisible = false;
              this.$emit('close','success_tab');
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
