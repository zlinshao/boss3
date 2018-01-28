<template>
  <div class="reviseRole">
    <el-dialog :title="name" :visible.sync="dialogVisible" width="40%">
      <div class="scroll_bar">
        <el-form :model="form" label-width="80px" size="mini">
          <el-row>
            <el-col :span="22">
              <el-form-item label="描述">
                <el-input v-model="form.name" auto-complete="off" placeholder="描述"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="11">
              <el-form-item label="模块">
                <el-input v-model="form.module" auto-complete="off" placeholder="模块"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="11">
              <el-form-item label="子模块">
                <el-input v-model="form.childModule" auto-complete="off" placeholder="子模块"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
        <div class="radio">
          <div v-for="(key,index) in 50" >
            <el-radio v-model="radio" :label="key">备选项</el-radio>
          </div>
        </div>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button size="small" @click="dialogVisible = false">取&nbsp;消</el-button>
        <el-button size="small" type="primary" @click="dialogVisible = false">确&nbsp;定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  export default {
    name: "revise-role",
    props: ['module','name'],
    data() {
      return {
        radio: 1,
        dialogVisible: false,
        form: {
          name: '',
          module: '',
          childModule: '',
        },
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
          this.$emit('close');
        }
      }
    },
    methods: {},
  }
</script>

<style lang="scss">
  .reviseRole {
    .el-dialog__wrapper {
      .el-dialog {
        .el-dialog__body {
          div {
            overflow: auto;
            max-height: 550px;
            div.radio{
              width: 100%;
              display: flex;
              display: -webkit-flex;
              flex-wrap: wrap;
              div{
                height: 30px;
                display: flex;
                display: -webkit-flex;
                width: 33.3%;
                justify-content: center;
              }
            }
          }
        }
      }
    }
  }
</style>
