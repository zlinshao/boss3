<template>
  <div>
    <el-dialog :close-on-click-modal="false" title="新建部门" :visible.sync="addDepartDialogVisible" width="30%">
      <div>
        <el-form size="mini" onsubmit="return false;" :model="params" label-width="100px">
          <el-row>
            <el-col :span="24">
              <el-form-item label="上级部门">
                <el-input placeholder="请输入内容" disabled="" v-model="parent_name"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="24">
              <el-form-item label='部门名称'>
                <el-input placeholder="请输入内容" v-model="params.name"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="24">
              <el-form-item label="是否为公司">
                <el-switch
                  v-model="params.is_corp"
                  active-color="#409EFF">
                </el-switch>
              </el-form-item>
            </el-col>
            <el-col :span="24" v-if="!params.is_corp">
              <el-form-item label="企业微信id">
                <el-input placeholder="请输入企业微信id" v-model="params.corp_wx"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="24">
              <el-form-item label='排序'>
                <el-input-number v-model="params.order"></el-input-number>
                <span style="color: #fb435e;margin-left: 15px">注意：数值越大，排序越靠前！</span>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button size="small" @click="addDepartDialogVisible=false">取 消</el-button>
        <el-button size="small" type="primary" @click="confirmEdit">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
  export default {
    props: ['addDepartDialog', 'parentId', 'parentName'],
    data() {
      return {
        addDepartDialogVisible: false,
        params: {
          parent_id: '',
          name: '',
          order: '',
          is_corp: false,
          corp_wx: ''
        },
        parent_name: '',
      };
    },
    watch: {
      addDepartDialog(val) {
        this.addDepartDialogVisible = val
      },
      addDepartDialogVisible(val) {
        if (!val) {
          this.$emit('close')
        }
      },
      'params.is_corp'(val) {
        this.params.corp_wx = '';
      },
      parentId(val) {
        if (val) {
          this.params.parent_id = val;
        }
      },
      parentName(val) {
        if (val) {
          this.parent_name = val;
        }
      }
    },
    methods: {
      confirmEdit() {
        this.$http.post(globalConfig.server + 'organization/org', this.params).then((res) => {
          if (res.data.code === '20010') {
            this.$emit('close', 'success');
            this.closeModal();
            this.prompt('success', res.data.msg);
          } else {
            this.prompt('warning', res.data.msg);
          }
        });
      },
      closeModal() {
        this.addDepartDialogVisible = false;
        this.params = {
          parent_id: '',
          name: '',
          order: '',
          is_corp: false,
          corp_wx: ''
        }
      }
    }
  };
</script>

<style lang="scss" scoped="">

</style>
