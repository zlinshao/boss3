<template>
  <div id="addFollowUp">
    <el-dialog :close-on-click-modal="false" title="添加跟进记录" :visible.sync="addResultDialogVisible" width="40%">
      <div>
        <el-form size="small" :model="params" label-width="100px">
          <el-row>
            <el-col :span="24">
              <el-form-item label="跟进结果" required="">
                <el-input type="textarea" v-model="params.content"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button size="small" @click="addResultDialogVisible = false">取 消</el-button>
        <el-button size="small" type="primary" @click="confirmAdd">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
  export default {
    name:'addFollowUp',
    props:['addResultDialog','repairId'],
    components:{},
    data() {
      return {
        addResultDialogVisible:false,
        params:{
          repaire_id: '',
          content : '',            //'跟进内容',
        },
        follow_name:'',
      };
    },
    watch:{
      addResultDialog(val){
        this.addResultDialogVisible = val
      },
      addResultDialogVisible(val){
        if(!val){
          this.$emit('close');
        }else {
          this.params.repaire_id = this.repairId;
        }
      },

    },
    methods:{
      //确认提交
      confirmAdd(){
        this.$http.post(globalConfig.server+ 'repaire/follow',this.params).then((res) => {
          if(res.data.code === '600200'){
            this.$notify.success({
              title:'成功',
              message:res.data.msg  
            });
            this.init();
            this.$emit('close','success');
            this.addResultDialogVisible = false;
          }else {
            this.$notify.warning({
              title:'警告',
              message:res.data.msg
            })
          }
        })
      },
      init(){
        this.params = {
          repaire_id:'',
          content : '',             //'跟进内容',
        };
        this.follow_name = '';
        this.isClear = true;
      }
    }
  };
</script>
<style lang="scss" scoped="">
  #addFollowUp{

  }

</style>
