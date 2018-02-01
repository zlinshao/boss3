<template>
  <div>
    <el-dialog title="分配房间" :visible.sync="distributionDialogVisible" width="60%">
      <div class="scroll_bar">
        <div>
          <el-button type="primary" size="mini">主要按钮</el-button>
        </div>
        <div class="title">分配房间</div>
        <div class="form_border">
          <el-form size="mini" label-width="60px" :modal="formInline">
            <el-row>
              <el-col :span="3">
                <el-form-item label="房间号" prop="name">
                  <el-input placeholder="请输入内容"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="3">
                <el-form-item label="套内面积" prop="name" label-width="80px">
                  <el-input placeholder="请输入内容"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="4">
                <el-form-item label="房型" prop="name">
                  <el-select v-model="formInline.region" clearable placeholder="请选择房型">
                    <el-option label="区域一" value="shanghai"></el-option>
                    <el-option label="区域二" value="beijing"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="4">
                <el-form-item label="朝向" prop="name">
                  <el-select v-model="formInline.aa" clearable placeholder="请选择朝向">
                    <el-option label="区域一" value="shanghai"></el-option>
                    <el-option label="区域二" value="beijing"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>

              <el-col :span="6">
                <el-form-item label="基本设施" prop="name" label-width="80px">
                  <el-col :span="7">
                    <el-checkbox label="独卫" name="type"></el-checkbox>
                  </el-col>
                  <el-col :span="7">
                    <el-checkbox label="阳台" name="type"></el-checkbox>
                  </el-col>
                  <el-col :span="7">
                    <el-checkbox label="空调" name="type"></el-checkbox>
                  </el-col>
                </el-form-item>
              </el-col>

              <el-col :span="4">
                <el-form-item label="室内配置" prop="name" label-width="80px">
                  <el-input placeholder="请点击选择"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </div>

      </div>
      <span slot="footer" class="dialog-footer">
        <el-button size="small" @click="distributionDialogVisible = false">取 消</el-button>
        <el-button size="small" type="primary" @click="distributionDialogVisible = false">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
  import ElCol from "element-ui/packages/col/src/col";
  export default {
    components: {ElCol},
    props:['distributionDialog'],
    data() {
      return {
        distributionDialogVisible:false,
        formInline: {region:''},
        tableData:[],
        value1:'',
      };
    },
    watch:{
      distributionDialog(val){
        this.distributionDialogVisible = val
      },
      distributionDialogVisible(val){
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
  .el-dialog__wrapper .el-dialog .el-dialog__body .form_border {
    padding: 18px 10px 18px 10px;
  }
</style>
