<template>
  <div>
    <el-dialog :close-on-click-modal="false" title="上传截图凭证" :visible.sync="upLoadDialogVisible" width="30%">
      <div>
        <el-form size="mini" :model="formInline" label-width="80px">
          <el-row>
            <el-col :span="24">
              <el-form-item label="上传图片">
                <UpLoad :ID="'upLoad_pic'" :isClear="isClear" @getImg="getImg"></UpLoad>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button size="small" @click="upLoadDialogVisible = false">取 消</el-button>
        <el-button size="small" v-if="status == 3" type="primary" @click="confirmAdd">结 算</el-button>
        <el-button size="small" v-if="status == 4" type="primary" @click="confirmAdd">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
  import UpLoad from '../../../../common/UPLOAD.vue'
  export default {
    props:['upLoadDialog','vacationId','status'],
    components:{UpLoad},
    data() {
      return {
        upLoadDialogVisible:false,
        formInline:{
          payment_pic:[],
        },
        editImage: {},
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
            payment_pic : [],
          };
          this.isClear = false;
        }else {
          this.getData();
          this.isClear = true;
        }
      },
    },
    methods:{
      getImg(val){
        console.log(val)
        this.formInline.payment_pic = val[1];
        this.isUpload = val[2];
      },
      //获取退房详情
      getData() {
        this.$http.get(globalConfig.server + 'customer/check_out/' + this.vacationId).then((res) => {
          if (res.data.code === '20020') {
            let data = res.data.data;
            let picObject = {};
            this.editImage = {};
            this.formInline.payment_pic = [];
            if (data.payment_pic !== []) {
              for (let key in data.payment_pic) {
                picObject[key] = data.payment_pic[key][0].uri;
                this.formInline.payment_pic.push(key);
              }
            }
            this.editImage = picObject;
          }
        })
      },
      confirmAdd(){
        if(!this.isUpload){
          this.$http.put(globalConfig.server+'customer/check_out/status/'+this.vacationId,this.formInline).then((res)=> {
            if (res.data.code == '20060') {
              this.$emit('close', 'success');
              this.$notify.success({
                title: '成功！',
                message: res.data.msg,
              });
            } else {
              this.$notify.warning({
                title: '警告！',
                message: res.data.msg,
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
