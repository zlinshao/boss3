<template>
  <div>
    <el-dialog title="合同模板" :visible.sync="dialogVisible" width="30%">
      <el-form :model="form" size="mini" label-width="80px">
        <el-row>
          <el-col :span="12">
            <el-form-item label="合同类型">
              <el-select v-model="form.contractType" clearable>
                <el-option label="房东" value="1"></el-option>
                <el-option label="租客" value="2"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="业务类型">
              <el-select v-model="form.serviceType" clearable>
                <el-option label="整租" value="1"></el-option>
                <el-option label="合租" value="2"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-form-item label="合同名称">
          <el-input v-model="form.name" auto-comlete="off"></el-input>
        </el-form-item>
        <el-form-item label="合同照片">
          <Dropzone :id="'contract'" :url="'http://test.v2.api.boss.lejias.cn/picture/upload'"></Dropzone>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button size="small" @click="dialogVisible = false">取&nbsp;消</el-button>
        <el-button size="small" type="primary" @click="dialogVisible = false">确&nbsp;定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  import Dropzone from '../../common/dropzone.vue'

  export default {
    name: "revise-module",
    components: { Dropzone },
    props: ['module'],
    data() {
      return {
        dialogVisible: false,
        form: {
          contractType: '',
          serviceType: '',
          name: '',
        }
      }
    },
    mounted() {
    },
    watch: {
      module(val) {
        this.dialogVisible = val;
      },
      dialogVisible(val) {
        if (!val) {
          this.$emit('close')
        }
      }
    },
    methods: {},
  }
</script>

<style scoped>

</style>
