<template>
  <div>
    <el-dialog :close-on-click-modal="false" title="修改岗位" :visible.sync="editPositionDialogVisible" width="30%">
      <div>
        <el-form size="mini" onsubmit="return false;" :model="params" label-width="100px">
          <el-row>
            <el-col :span="24">
              <el-form-item label="职位" required="">
                <el-select v-model="params.duty_id" size="mini" clearable>
                  <el-option v-for="item in duties" :label="item.name" :value="item.id" :key="item.id">{{item.name}}</el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24">
              <el-form-item label="岗位" required="">
                <el-input placeholder="请输入内容" v-model="params.name"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button size="small" @click="editPositionDialogVisible=false">取 消</el-button>
        <el-button size="small" type="primary" @click="confirmAdd">确 定</el-button>
      </span>
    </el-dialog>

    <Organization :organizationDialog="organizationDialog" @close="closeOrganization"
                  @selectMember="selectMember"></Organization>
  </div>
</template>


<script>
  import Organization from '../../../common/organization.vue'

  export default {
    props: ['editPositionDialog', 'positionId', 'positionName', 'dutyId'],
    components: {Organization},
    data() {
      return {
        editPositionDialogVisible: false,
        organizationDialog: false,
        urls: globalConfig.server,
        duties: [],
        params: {
          duty_id: '',
          name: '',
        },
      };
    },
    watch: {
      editPositionDialog(val) {
        this.editPositionDialogVisible = val;
        this.params.name = this.positionName;
        this.params.duty_id = this.dutyId;
      },
      editPositionDialogVisible(val) {
        if (!val) {
          this.$emit('close');
        }
      },
      positionName(val) {
        this.params.name = val;
      }
    },
    mounted() {
      this.getDuty();
    },
    methods: {
      getDuty() {
        this.$http.get(this.urls + 'organization/duty?page=1&limit=500').then(res => {
          if (res.data.code === '20000') {
            this.duties = res.data.data.data;
          }
        })
      },
      confirmAdd() {
        this.$http.put(this.urls + 'organization/position/' + this.positionId, this.params).then((res) => {
          if (res.data.code === '20030') {
            this.$emit('close', 'success');
            this.closeModal();
            this.prompt('success', res.data.msg)
          } else {
            if (typeof res.data.msg === 'object') {
              res.data.msg.name.forEach((item) => {
                this.prompt('warning', item)
              })
            } else {
              this.prompt('warning', item)
            }
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
        this.getPosition();
        this.department = val[0].name;
        this.organizationDialog = false;
      },
      closeModal() {
        this.editPositionDialogVisible = false;
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
