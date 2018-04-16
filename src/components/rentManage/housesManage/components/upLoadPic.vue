<template>
  <div>
    <el-dialog :close-on-click-modal="false" title="上传房屋照片" :visible.sync="upLoadDialogVisible" width="30%">
      <div>
        <!--<div class="form_border">-->
        <el-form size="mini" :model="formInline" label-width="80px">
          <el-row>
            <el-col :span="24">
              <el-form-item label="上传图片">
                <UpLoad :ID="'upLoad_pic'" :isClear="isClear" @getImg="getImg"></UpLoad>
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
        <el-button size="small" @click="upLoadDialogVisible = false">取 消</el-button>
        <el-button size="small" type="primary" @click="confirmAdd">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
  import UpLoad from '../../../common/UPLOAD.vue'
  export default {
    props:['upLoadDialog','houseId'],
    components:{UpLoad},
    data() {
      return {
        upLoadDialogVisible:false,
        formInline:{
          house_id : '',
          album_file : [],
          remark : '',
        },
        FormVisible: false,

        isClear:false,
        isUpload:false,
      };
    },
    watch:{
      upLoadDialog(val){
        this.upLoadDialogVisible = val
      },
      upLoadDialogVisible(val){
        if(!val){
          this.$emit('close');
          this.formInline = {
            house_id : this.houseId,
            album_file : [],
            remark : '',
          };
          this.isClear = false;
        }else {
          this.isClear = true;
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

      confirmAdd(){
        if(!this.isUpload){
          this.$http.post(globalConfig.server+'house/album',this.formInline).then((res) => {
            if(res.data.code === '30060'){
              this.upLoadDialogVisible = false;
//              this.$emit('close','success');
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
