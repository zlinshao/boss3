<template>
  <div>
    <el-dialog title="发送短信" :visible.sync="sendMessageDialogVisible" width="40%">
      <div>
        <div class="title">收件人信息</div>
        <div class="form_border">
          <el-form size="mini" :model="formInline" label-width="100px">
            <el-row>
              <el-col :span="12">
                <el-form-item label="收件人" required>
                  <el-input placeholder="请输入内容"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="电话号码" required>
                  <el-input placeholder="请输入内容"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <el-form-item label="短信名称">
                  <el-select v-model="formInline.region" placeholder="请选择短信名称">
                    <el-option label="区域一" value="shanghai"></el-option>
                    <el-option label="区域二" value="beijing"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </div>
        <div class="title">短信内容</div>
        <div class="describe_border">


          短信内容

          根据所选模板内容自动生成

        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button size="small" @click="sendMessageDialogVisible = false">取 消</el-button>
        <el-button size="small" type="primary" @click="sendMessageDialogVisible = false">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
  export default {
    name:'addFollowUp',
    props:['sendMessageDialog'],
    data() {
      return {
        sendMessageDialogVisible:false,
        formInline:{},
        FormVisible: false,
      };
    },
    watch:{
      sendMessageDialog(val){
        this.sendMessageDialogVisible = val
      },
      sendMessageDialogVisible(val){
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
</style>
