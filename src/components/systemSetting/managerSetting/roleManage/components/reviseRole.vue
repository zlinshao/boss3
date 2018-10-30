<template>
  <div id="reviseRole">
    <el-dialog :close-on-click-modal="false" title="新增角色" :visible.sync="reviseRoleDialogVisible" width="40%">
      <div class="scroll_bar">
        <el-form :model="form" label-width="80px" size="mini">
          <el-row>
            <el-col :span="22">
              <el-form-item label="角色名称" required>
                <el-input v-model="form.display_name" placeholder="请填写角色名称"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="22">
              <el-form-item label="角色标识" required>
                <el-input v-model="form.name" placeholder="请填写角色标识"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="22">
              <el-form-item label="角色描述" required>
                <el-input v-model="form.description" type="textarea" placeholder="请填写角色描述"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button size="small" @click="reviseRoleDialogVisible = false">取&nbsp;消</el-button>
        <el-button size="small" type="primary" @click="confirmAdd">确&nbsp;定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  export default {
    name: "revise-role",
    props: ['reviseRoleDialog'],
    data() {
      return {
        radio: 1,
        reviseRoleDialogVisible: false,
        form: {
          name: '',
          description: '',
          display_name: '',
        },
      }
    },
    mounted() {
    },
    watch: {
      reviseRoleDialog(val) {
        this.reviseRoleDialogVisible = val;
      },
      reviseRoleDialogVisible(val) {
        if (!val) {
          this.$emit('close');
        }
      }
    },
    methods: {
      confirmAdd() {
        this.$http.post(globalConfig.server + 'organization/role', this.form).then((res) => {
          if (res.data.code === '20010') {
            this.prompt('success', res.data.msg);
            this.reviseRoleDialogVisible = false;
            this.$emit('close', 'success');
          } else {
            this.prompt('warning', res.data.msg);
          }
        });
      }
    },
  }
</script>

<style lang="scss">
  #reviseRole {
    .el-dialog__wrapper {
      .el-dialog {
        .el-dialog__body {
          div {
            overflow: auto;
            max-height: 550px;
            div.radio {
              width: 100%;
              display: flex;
              display: -webkit-flex;
              flex-wrap: wrap;
              div {
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
