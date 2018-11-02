<template>
  <div>
    <el-dialog :close-on-click-modal="false" title="修改职位" :visible.sync="editOnlyPositionDialogVisible" width="30%">
      <div>
        <el-form size="mini" onsubmit="return false;" :model="params" label-width="100px">
          <el-row>
            <el-col :span="24">
              <el-form-item label="职位名称" required="">
                <el-input placeholder="请输入内容" v-model="params.name"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button size="small" @click="editOnlyPositionDialogVisible=false">取 消</el-button>
        <el-button size="small" type="primary" @click.native="confirmAdd">确 定</el-button>
      </span>
    </el-dialog>

    <Organization :organizationDialog="organizationDialog" @close="closeOrganization"
                  @selectMember="selectMember"></Organization>
  </div>
</template>


<script>
  import Organization from '../../../common/organization.vue'

  export default {
    props: ['editOnlyPositionDialog', 'onlyPositionId', 'onlyPositionName'],
    components: {Organization},
    data() {
      return {
        editOnlyPositionDialogVisible: false,
        params: {
          name: '',
        },
        organizationDialog: false,
      };
    },
    watch: {
      editOnlyPositionDialog(val) {
        this.editOnlyPositionDialogVisible = val;
        this.params.name = this.onlyPositionName;
      },
      editOnlyPositionDialogVisible(val) {
        if (!val) {
          this.$emit('close');
        }
      },
      onlyPositionName(val) {
        this.params.name = val;
      }
    },
    methods: {
      confirmAdd() {
        this.$http.put(globalConfig.server + 'organization/duty/' + this.onlyPositionId, this.params).then((res) => {
          if (res.data.code === '20030') {
            this.$emit('close', 'success');
            this.closeModal();
            this.$notify.success({
              title: '成功',
              message: res.data.msg,
            });
          } else {
            this.$notify.warning({
              title: '警告',
              message: res.data.msg,
            });
          }
        });
      },
      selectDepart() {
        this.organizationDialog = true
      },
      //关闭选人框回调
      closeOrganization() {
        this.organizationDialog = false;
      },
      selectMember(val) {
        this.params.org_id = val[0].id;
        this.department = val[0].name;
        this.organizationDialog = false;
      },
      closeModal() {
        this.editOnlyPositionDialogVisible = false;
        this.params = {
          name: '',
        };
      }
    }
  };
</script>
<style lang="scss" scoped="">
  #addRentRepair {
  }

</style>
