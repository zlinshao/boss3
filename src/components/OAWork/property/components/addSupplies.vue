<template>
  <div>
    <el-dialog :close-on-click-modal="false" :title="title" :visible.sync="addSuppliesDialogVisible" width="40%">
      <div>
        <el-form size="small" label-width="80px" :modal="formInline">
          <el-row>
            <el-col :span="12">
              <el-form-item label="名称" required>
                <el-input placeholder="请输入内容"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="单位" required>
                <el-select v-model="formInline.region" placeholder="请选择单位">
                  <el-option label="区域一" value="shanghai"></el-option>
                  <el-option label="区域二" value="beijing"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="单价" required>
                <el-input placeholder="请输入内容"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="规格" required>
                <el-select v-model="formInline.region" placeholder="请选择规格">
                  <el-option label="区域一" value="shanghai"></el-option>
                  <el-option label="区域二" value="beijing"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="颜色" required>
                <el-input placeholder="请输入内容"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="品牌" required>
                <el-select v-model="formInline.region" placeholder="请选择品牌">
                  <el-option label="区域一" value="shanghai"></el-option>
                  <el-option label="区域二" value="beijing"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="增加数量" required>
                <el-input placeholder="请输入内容"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="入库时间" required>
                <el-date-picker type="date" placeholder="选择日期" v-model="formInline.date1" style="width: 100%;"></el-date-picker>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="库存数量">
                <el-input disabled placeholder="请输入内容"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="库存金额" required>
                <el-input disabled placeholder="请输入内容"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="警戒库存">
                <el-popover
                  ref="popover1"
                  placement="right"
                  title="标题"
                  width="400"
                  trigger="hover"
                  content="当库存下限达到警戒库存是，该条信息在列表中会被标记为红色，但并不影响操作">
                </el-popover>
                <el-input v-popover:popover1 placeholder="请输入内容"></el-input>

              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24">
              <el-form-item label="备注">
                <el-input type="textarea" placeholder="请输入内容"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </div>

      <span slot="footer" class="dialog-footer">
        <el-button size="small" @click="addSuppliesDialogVisible = false">取 消</el-button>
        <el-button size="small" type="primary" @click="addSuppliesDialogVisible = false">确 定</el-button>
      </span>
    </el-dialog>

    <Organization :organizationDialog="organizationDialog" @close="closeOrganization"></Organization>
  </div>
</template>

<script>
  import Organization from '../../../common/organization.vue'
  import DropZone from '../../../common/dropzone.vue'
  export default {
    props:['addSuppliesDialog','isReverse'],
    components:{Organization,DropZone},
    data() {
      return {
        addSuppliesDialogVisible:false,
        innerVisible: false,
        organizationDialog: false,
        formInline: {region:''},
        tableData:[],
        value1:'',
        title:'物品新增',
      };
    },
    watch:{
      addSuppliesDialog(val){
        this.addSuppliesDialogVisible = val
      },
      addSuppliesDialogVisible(val){
        if(!val){
          this.$emit('close')
        }
      },
      isReverse(val){
          if(val){
              this.title  = '物品修改'
          }else {
              this.title  = '物品新增'
          }
      }
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
