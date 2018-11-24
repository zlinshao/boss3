<template>
  <div>
    <el-dialog :close-on-click-modal="false" title="修改部门" :visible.sync="editDepartDialogVisible" width="30%">
      <div>
        <el-form size="mini" onsubmit="return false;" :model="params" label-width="100px">
          <el-row>
            <el-col :span="24">
              <el-form-item label="上级部门">
                <el-input placeholder="请输入内容" @focus="selectDepart" readonly="" v-model="department"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="24">
              <el-form-item label='部门名称'>
                <el-input placeholder="请输入内容" v-model="params.name"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="24">
              <el-form-item label="是否为公司" required>
                <el-switch
                  v-model="is_corp"
                  active-color="#409EFF">
                </el-switch>
              </el-form-item>
            </el-col>
            <el-col :span="24" v-if="is_corp">
              <el-form-item label="企业微信id" required>
                <el-input placeholder="请输入企业微信id" v-model="params.corp_wx"></el-input>
              </el-form-item>
            </el-col>
             <!--新加-->
            <el-col :span="24" v-if="is_corp">
              <el-form-item label="社会统一信用代码" required>
                <el-input placeholder="请输入社会统一信用代码" v-model="params.cods_id"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="24" v-if="is_corp">
              <el-form-item label="联系方式" required>
                <el-input placeholder="请输入联系方式" v-model="params.phone"></el-input>
              </el-form-item>
            </el-col>
            <!--新加-->
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
        <el-button size="small" @click="editDepartDialogVisible=false">取 消</el-button>
        <el-button size="small" type="primary" @click.native="confirmEdit">确 定</el-button>
      </span>
    </el-dialog>
    <Organization :organizationDialog="organizationDialog" @close="closeOrganization"
                  @selectMember="selectMember"></Organization>
  </div>
</template>

<script>
  import Organization from '../../../common/organization.vue'

  export default {
    props: ['editDepartDialog', 'departId'],
    components: {Organization},
    data() {
      return {
        editDepartDialogVisible: false,
        params: {
          parent_id: '',
          name: '',
          order: '',
          is_corp: '0',
          corp_wx: '',
          cods_id: '',
          phone: '',
        },
        paramsOrg: {
          infinite: 20,
        },
        is_corp: false,
        organizationDialog: false,
        department: '',
      };
    },
    watch: {
      editDepartDialog(val) {
        this.editDepartDialogVisible = val
      },
      editDepartDialogVisible(val) {
        if (!val) {
          this.$emit('close')
        }
      },
      departId(val) {
        if (val) {
          this.getDepartInfo(val);
        }
      },
      is_corp(val) {
        this.params.corp_wx = '';
        this.params.cods_id = '';
        this.params.phone = '';
        this.params.is_corp = val ? '1' : '0';
      },
    },
    methods: {
      getDepartInfo(id) {
        this.$http.get(globalConfig.server + 'organization/org/' + id, {
          params: this.paramsOrg,
        }).then((res) => {
          if (res.data.code === '20020') {
            let data = res.data.data;
            this.params.name = data.name;
            this.params.order = data.order;
            this.params.parent_id = data.parent_id;
            this.params.is_corp = data.is_corp;
            this.is_corp = String(data.is_corp) !== '0';
            if (data.corp_wx) {
              this.params.corp_wx = data.corp_wx;
            } else {
              this.params.corp_wx = '';
            }
            this.department = '';
            this.$http.get(globalConfig.server + 'organization/org/' + this.params.parent_id, {
              params: this.paramsOrg,
            }).then((res) => {
              if (res.data.code === '20020') {
                this.department = res.data.data.name;
              }
            });
          } else {
            this.prompt('warning', res.data.msg);
          }
        });
      },
      confirmEdit() {
        this.params.is_corp = this.is_corp ? '1' : '0';
        this.$http.put(globalConfig.server + 'organization/org/' + this.departId, this.params).then((res) => {
          if (res.data.code === '20030') {
            this.$emit('close', 'success');
            this.closeModal();
            this.prompt('success', res.data.msg);
          } else {
            this.prompt('warning', res.data.msg);
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
        this.params.parent_id = val[0].id;
        this.department = val[0].name;
        this.organizationDialog = false;
      },
      closeModal() {
        this.editDepartDialogVisible = false;
        this.params = {
          parent_id: '',
          name: '',
          order: '',
          is_corp: '0',
          corp_wx: '',
          cods_id: '',
          phone: '',
        };
        this.is_corp = false;
        this.department = '';
      }
    }
  };
</script>
<style lang="scss" scoped="">
  #addRentRepair {
  }

</style>
