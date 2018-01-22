<template>
  <div>
    <el-dialog title="制度上传" :visible.sync="addInstitutionDialogVisible" width="40%">
      <div>

      </div>
      <span slot="footer" class="dialog-footer">
        <el-button size="small" @click="addInstitutionDialogVisible = false">取 消</el-button>
        <el-button size="small" type="primary" @click="addInstitutionDialogVisible = false">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
  export default {
    props:['addInstitutionDialog'],
    data() {
      return {
        addInstitutionDialogVisible:false,
        formInline: {region:''},
        tableData:[],
        value1:'',
      };
    },
    watch:{
      addInstitutionDialog(val){
        this.addInstitutionDialogVisible = val
      },
      addInstitutionDialogVisible(val){
        if(!val){
          this.$emit('close')
        }
      }
    },
    methods:{

    }
  };
</script>
<style lang="scss" scoped="">

</style>
