<template>
  <div id="companyRole">
    <el-dialog :close-on-click-modal="false" title="新增关联" :visible.sync="reviseCompanyDialogVisible" width="40%">
      <div class="scroll_bar">
        <el-form :model="form" label-width="80px" size="mini">
          <el-row>
              <el-col :span="22" class="el_col_option">
                <el-form-item label="公司" required="">
                  <el-select v-model="form.company_id" placeholder="请选择" clearable>
                    <el-option v-for="item in companyArr" :key="item.id" :label="item.name"
                               :value="item.id">{{item.name}}
                    </el-option>
                  </el-select>
                </el-form-item>
              </el-col>
          </el-row>
          <el-row>
            <el-col :span="22">
              <el-form-item label="片区" required="">
                        <el-input  placeholder="请选择"
                          @focus="openOrganizeModal('depart')"  v-model="org_name">
                        </el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="22">
             <el-form-item label="开始时间" required="">
                        <el-date-picker  value-format="yyyy-MM-dd"
                                        type="date" placeholder="选择日期"
                                        v-model="form.start_date"></el-date-picker>
                      </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button size="small" @click="reviseCompanyDialogVisible = false">取&nbsp;消</el-button>
        <el-button size="small" type="primary" @click="confirmAdd">确&nbsp;定</el-button>
      </div>
    </el-dialog>
    <Organization :organizationDialog="organizationDialog" :length="length" :type="type"
                  @close='closeModal' @selectMember="selectMember"></Organization>
  </div>
</template>

<script>
 import Organization from '../../../../common/organization.vue';
  export default {
     components: { Organization},
    name: "revise-company",
    props: ['reviseCompanyDialog'],
    data() {
      return {
        radio: 1,
        reviseCompanyDialogVisible: false,
        organizationDialog:false,
        form: {
          company_id: '',
          org_id: '',
          start_date: '',
        },
        org_name:'',
        company_name:'',
        length: 0,
        type: '',
        companyArr:[]
      }
    },
    mounted() {
    },
    watch: {
      reviseCompanyDialog(val) {
        this.reviseCompanyDialogVisible = val;
      },
      reviseCompanyDialogVisible(val) {
        if (!val) {
          this.$emit('close');
        }else{
          this.getCompanys();
        }
      }
    },
    methods: {
      confirmAdd() {
        this.$http.post(globalConfig.server + 'organization/companyorg', this.form).then((res) => {
          if (res.data.code === '71010') {
            this.prompt('success', res.data.msg);
            this.reviseRoleDialogVisible = false;
            this.$emit('close', 'success');
          } else {
            this.prompt('warning', res.data.msg);
          }
        });
      },
      closeModal() {
        this.organizationDialog = false
      },
      //调出选人组件
      openOrganizeModal(val) {
        this.selectType = val;
        this.type = val === 'depart' ? 'depart' : 'staff';
        this.organizationDialog = true;
        this.length = 1;
      },
      getCompanys(){
        this.$http.get(globalConfig.server + 'organization/org/company/', this.form).then((res) => {
          if (res.data.code === '20010') {
              this.companyArr=res.data.data;
          } else {
            this.prompt('warning', res.data.msg);
          }
        });
      },
      selectMember(val) {
        this.organizationDialog = false;
        this.form.org_id = val[0].id;
        this.org_name = val[0].name;
        
      },
    }
    
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
