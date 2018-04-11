<template>
  <div>
    <el-dialog :close-on-click-modal="false" title="修改标题" :visible.sync="editDepartDialogVisible" width="30%">
      <div>
        <el-form size="mini" :model="params" label-width="100px">
          <el-row>
            <el-col :span="24">
              <el-form-item label='标题名称'>
                <el-input placeholder="请输入内容" v-model="params.title"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button size="small" @click="editDepartDialogVisible=false">取 消</el-button>
        <el-button size="small" type="primary" @click.native="confirmEdit">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
  export default {
    props:['editDepartDialog','departId','departName','topId'],
    components:{},
    data() {
      return {
        editDepartDialogVisible:false,
        params:{
          id:'',
          title:'',
          pid:''
        },
        department:'',
      };
    },
    watch:{
      editDepartDialog(val){
        this.editDepartDialogVisible = val
      },
      editDepartDialogVisible(val){
        if(!val){
          this.$emit('close')
        }
      },
      departId(val){
        this.params.id=val;
      },
      departName(val){
        this.params.title=val
      },
      topId(val){
        this.params.pid=val;
      },
    },
    methods:{

      confirmEdit(){
        this.$http.put(globalConfig.server+'des/update',this.params).then((res) => {
          if(res.data.code === '188200'){
            this.$notify({
              title: '成功',
              message: res.data.msg,
              type:'success'
            });
            this.$emit('close','success');
          }else {
            this.$notify({
              title: '警告',
              message: res.data.message,
              type:'warning'
            });
          }
        });
      },

    }
  };
</script>
<style lang="scss" scoped="">

</style>
