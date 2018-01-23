<template>
  <div>
    <el-dialog title="制度上传" :visible.sync="addKnowledgeDialogVisible" width="40%">
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
            <el-col :span="11">
              <el-form-item label="作者" required>
                <el-input placeholder="请输入内容"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="11">
              <el-form-item label="知识类型" required>
                <el-select v-model="formInline.region" placeholder="请选择活动区域">
                  <el-option label="区域一" value="shanghai"></el-option>
                  <el-option label="区域二" value="beijing"></el-option>
                </el-select>
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
        <el-button size="small" @click="addKnowledgeDialogVisible = false">取 消</el-button>
        <el-button size="small" type="primary" @click="addKnowledgeDialogVisible = false">确 定</el-button>
      </span>
    </el-dialog>
    <Organization :organizationDialog="organizationDialog" @close="closeOrganization"></Organization>
  </div>
</template>

<script>
  import Organization from '../../../common/organization.vue'
  import DropZone from '../../../common/dropzone.vue'
  export default {
    props:['addKnowledgeDialog'],
    components:{Organization,DropZone},
    data() {
      return {
        addKnowledgeDialogVisible:false,
        organizationDialog: false,
        formInline: {region:''},
        tableData:[],
        value1:'',
      };
    },
    watch:{
      addKnowledgeDialog(val){
        this.addKnowledgeDialogVisible = val
      },
      addKnowledgeDialogVisible(val){
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
