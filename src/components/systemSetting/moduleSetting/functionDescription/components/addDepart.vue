<template>
  <div>
    <el-dialog :close-on-click-modal="false" title="新建标题" :visible.sync="addDepartDialogVisible" width="30%">
      <div>
        <el-form size="mini" :model="params" label-width="100px">
          <el-row>
            <el-col :span="24" >
              <el-form-item label="上级标题">
                <el-input placeholder="请输入内容"  readonly="" v-model="department"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="24">
              <el-form-item label='标题名称'>
                <el-input placeholder="请输入内容" v-model="params.title"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="24">
              <el-form-item label='序号'>
                <el-input type="number" placeholder="请输入内容" v-model="sortInt"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button size="small" @click="addDepartDialogVisible=false">取 消</el-button>
        <el-button size="small" type="primary" @click.native="confirmEdit">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
  export default {
    props:['addDepartDialog','parentId','parentName'],
    data() {
      return {
        addDepartDialogVisible:false,
        params:{
          title:'',
          pid:'',
          sort:0
        },
        sortInt:0,
        department:'',
      };
    },
    watch:{
      addDepartDialog(val){
        this.addDepartDialogVisible = val
      },
      sortInt(val){
        this.params.sort = parseInt(val);
      },
      addDepartDialogVisible(val){
        if(!val){
          this.$emit('close')
        }
      },
      parentId(val){
        this.params.pid = val;
      },
      parentName(val){
        this.department = val;
      }
    },
    methods:{

      confirmEdit(){
        this.$http.post(globalConfig.server+'des/insert',this.params).then((res) => {
          if(res.data.code === '188200'){
            this.$notify({
              title: '成功',
              message: res.data.msg,
              type:'success'
            });
            this.$emit('close','success');
            this.closeModal();
          }else {
            this.$notify({
              title: '警告',
              message: res.data.message,
              type:'warning'
            });
          }
        });
      },
      closeModal(){
        this.addDepartDialogVisible = false;
        this.params = {
          title:'',
          pid:'',
        }
        this.department="";
      }
    }
  };
</script>
<style lang="scss" scoped="">

</style>
