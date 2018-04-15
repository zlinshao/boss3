<template>
  <div>
    <el-dialog :close-on-click-modal="false" title="添加跟进记录" :visible.sync="addFollowDialogVisible" width="30%">
      <div>
        <!--<div class="form_border">-->
        <el-form size="mini" :model="formInline" label-width="80px">
          <el-row>
            <el-col :span="24">
              <el-form-item label="跟进方式">
                <el-select clearable placeholder="请选择装修类型" v-model="formInline.follow_type" value="">
                  <el-option v-for="item in follow_type_dic" :label="item.dictionary_name" :value="item.id" :key="item.id"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24">
              <el-form-item label="跟进内容">
                <el-input type="textarea" v-model="formInline.follow_content" placeholder="请输入内容"></el-input>
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
        </el-form>
        <!--</div>-->
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button size="small" @click="addFollowDialogVisible = false">取 消</el-button>
        <el-button size="small" type="primary" @click="confirmAdd">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
  import UpLoad from '../../../common/UPLOAD.vue'
  export default {
    props:['addFollowDialog','houseId'],
    components:{UpLoad},
    data() {
      return {
        addFollowDialogVisible:false,
        formInline:{
          house_id : '',
          follow_type : '',
          follow_content : '',
          album_file : [],
        },
        FormVisible: false,

        isClear:false,
        isUpload:false,
        follow_type_dic:[],
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
      getDictionary(){
        this.dictionary(583,1).then((res) => {this.follow_type_dic = res.data;this.isDictionary = true});
      },
      getImg(val){
        this.formInline.album_file = val[1];
        this.isUpload = val[2];
      },
      confirmAdd(){
        if(!this.isUpload){
          this.$http.post(globalConfig.server+'core/follow',this.formInline).then((res) => {
            if(res.data.code === '20010'){
              this.addFollowDialogVisible = false;
              this.$emit('close','success');
              this.formInline = {
                house_id : this.houseId,
                follow_type : '',
                follow_content : '',
                album_file : [],
              };
              this.isClear = false;
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
