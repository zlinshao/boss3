<template>
  <div>
    <el-dialog :close-on-click-modal="false" title="制度上传" :visible.sync="addInstitutionDialogVisible" width="40%">
      <div>
        <el-form size="small" label-width="100px" :modal="formInline">
          <el-row>
            <el-col :span="22">
              <el-form-item label="标题" required>
                <el-input placeholder="请输入内容"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="22">
              <el-form-item label="文件上传" required>
                <DropZone @dropzone-removedFile="dropzoneR" @dropzone-success="dropzoneS" @complete="dropzoneALL"
                          id="myVueDropzone" url="https://httpbin.org/post"></DropZone>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="22">
              <el-form-item label="所属部门" required>
                <el-input readonly placeholder="请输入内容" @focus="openModal"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="22">
              <el-form-item label="可查看人员" required >
                <el-input readonly placeholder="请输入内容" @focus="openModal"></el-input>
              </el-form-item>
            </el-col>
          </el-row>

        </el-form>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button size="small" @click="addInstitutionDialogVisible = false">取 消</el-button>
        <el-button size="small" type="primary" @click="addInstitutionDialogVisible = false">确 定</el-button>
      </span>
    </el-dialog>
    <Organization :organizationDialog="organizationDialog" @close="closeOrganization"></Organization>
  </div>
</template>

<script>
  import Organization from '../../../../common/organization.vue'
  import DropZone from '../../../../common/dropzone.vue'
  export default {
    props:['addInstitutionDialog'],
    components:{Organization,DropZone},
    data() {
      return {
        addInstitutionDialogVisible:false,
        organizationDialog: false,
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
      },
    },
    methods:{
      openModal(){
          this.organizationDialog = true;
      },
      closeOrganization(){
        this.organizationDialog = false;
      },
      dropzoneS(file) {
        console.log(file)
        this.$message({ message: '上传成功', type: 'success' })
      },
      dropzoneR(file) {
        console.log(file)
        this.$message({ message: '删除成功', type: 'success' })
      },
      dropzoneALL(val){
        alert(val)
      }
    }
  };
</script>
<style lang="scss" scoped="">

</style>
