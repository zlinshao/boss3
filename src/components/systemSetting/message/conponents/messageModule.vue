<template>
  <div class="messageModule">
    <el-dialog :title="messageName" :visible.sync="dialogFormVisible" width="30%">
      <el-form :model="form" label-width="80px" size="mini">
        <el-row>
          <el-col :span="12">
            <el-form-item label="所属模块">
              <el-input placeholder="请选择模块" v-model="form.allModule" readonly @focus="openAllModule"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="子模块">
              <el-input placeholder="请选择模块" v-model="form.childModule" readonly @focus="openChildModule"></el-input>
            </el-form-item>
          </el-col>
        </el-row>

        <el-form-item label="模块名称">
          <el-input v-model="form.moduleName"></el-input>
        </el-form-item>

        <el-form-item label="模板内容">
          <el-input type="textarea" v-model="form.moduleContent"></el-input>
        </el-form-item>

      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button size="small" @click="dialogFormVisible = false">取&nbsp;消</el-button>
        <el-button size="small" type="primary" @click="dialogFormVisible = false">确&nbsp;定</el-button>
      </div>
    </el-dialog>

    <AddModule :organizationDialog="dialogVisible" @close="closeModule"></AddModule>
  </div>
</template>

<script>
  import AddModule from '../../../common/organization.vue'

  export default {
    components: {AddModule},
    props: ['module', 'messageName'],
    name: 'hello',
    data() {
      return {
        dialogVisible: false,
        dialogFormVisible: false,
        form: {
          allModule: '',            //所属模块
          childModule: '',          //子模块
          moduleName: '',           //模板名称
          moduleContent: '',        //模板内容
        },
      }
    },
    watch: {
      module(val) {
        this.dialogFormVisible = val
      },
      dialogFormVisible(val) {
        if (!val) {
          this.$emit('close')
        }
      },
    },
    methods: {
      // 所属模块
      openAllModule() {
        this.dialogVisible = true;
      },
      // 子模块
      openChildModule() {
        this.dialogVisible = true;
      },

      closeModule() {
        this.dialogVisible = false;
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">

</style>
