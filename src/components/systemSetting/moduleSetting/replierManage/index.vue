<template>
  <div>
    <div>
      <div class="highRanking" style=" position: absolute; top: 120px; right: 20px;">
        <div class="highSearch">
          <el-form :inline="true" onsubmit="return false" size="medium">
            <!--<el-form-item>-->
            <!--<el-input placeholder="标题/内容关键字" v-model="form.search" @keyup.enter.native="search" size="mini"-->
            <!--clearable>-->
            <!--<el-button slot="append" icon="el-icon-search" @click="search"></el-button>-->
            <!--</el-input>-->
            <!--</el-form-item>-->
            <el-form-item>
              <el-button type="primary" size="mini" @click="highGrade">高级</el-button>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" size="mini" @click="openReplierDialog">
                <i class="el-icon-plus"></i>新增
              </el-button>
            </el-form-item>
          </el-form>
        </div>
      </div>
      <div class="highRanking">
        <div class="filter high_grade" :class="isHigh? 'highHide':''" style=" margin-top: -40px;">
          <el-form :inline="true" onsubmit="return false" :model="form" size="mini" label-width="100px">
            <div class="filterTitle">
              <i class="el-icons-fa-bars"></i>&nbsp;&nbsp;高级搜索
            </div>
            <el-row class="el_row_border">
              <el-col :span="12">
                <el-row>
                  <el-col :span="8">
                    <div class="el_col_label">部门搜索</div>
                  </el-col>
                  <el-col :span="16" class="el_col_option">
                    <el-form-item>
                      <el-input readonly="" v-model="form.department_name" @focus="chooseDepart('search')"
                                placeholder="点击选择">
                        <template slot="append">
                          <div style="cursor: pointer;" @click="emptyDepart('search')">清空</div>
                        </template>
                      </el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
              </el-col>

            </el-row>
            <div class="btnOperate">
              <el-button size="mini" type="primary" @click="search">搜索</el-button>
              <el-button size="mini" type="primary" @click="resetting">重置</el-button>
              <el-button size="mini" type="primary" @click="highGrade">取消</el-button>
            </div>
          </el-form>
        </div>
      </div>
      <div class="main">
        <div class="myHouse">
          <div class="blueTable">
            <el-table
              :data="tableData"
              :empty-text='tableStatus'
              v-loading="tableLoading"
              element-loading-text="拼命加载中"
              element-loading-spinner="el-icon-loading"
              element-loading-background="rgba(255, 255, 255, 0)"
              style="width: 100%">
              <el-table-column
                prop="department.name"
                label="部门">
              </el-table-column>
              <el-table-column
                prop="replier_id"
                label="回复人">
              </el-table-column>
            </el-table>
          </div>
          <div class="tableBottom">
            <div class="left">
              <el-pagination
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page="form.page"
                :page-size="form.limit"
                layout="total, prev, pager, next, jumper"
                :total="totalNum">
              </el-pagination>
            </div>
          </div>
        </div>
      </div>
    </div>
    <Organization :organizationDialog="organizationDialog" :type="organizeType" @close="closeOrganization"
                  @selectMember="selectMember"></Organization>
    <div id="replierDialog">
      <el-dialog :close-on-click-modal="false" :visible.sync="replierDialog" title="新增回复" width="30%">
        <el-form size="mini" onsubmit="return false;" :model="replierForm" label-width="100px">
          <el-row>
            <el-col :span="20">
              <el-form-item label="部门" required>
                <el-input v-model="replierForm.department_name" placeholder="请点击选择" @focus="chooseDepart('dialog')">
                  <template slot="append">
                    <div style="cursor: pointer;" @click="emptyDepart('dialog')">清空</div>
                  </template>
                </el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="20">
              <el-form-item label="回复人" required>
                <el-input v-model="replierForm.replier_name" placeholder="请点击选择" @focus="chooseStaff">
                  <template slot="append">
                    <div style="cursor: pointer;" @click="emptyStaff">清空</div>
                  </template>
                </el-input>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button size="small" @click="replierDialog = false;replierId = '';">取消</el-button>
          <el-button size="small" type="primary" @click="confirmAdd">保存</el-button>
        </span>
      </el-dialog>
    </div>
  </div>
</template>
<script>
  import Organization from "../../../common/organization.vue";

  export default {
    components: {Organization},
    data() {
      return {
        tableData: [],
        totalNum: 0,
        tableStatus: ' ',
        tableLoading: false,
        form: {
          page: 1,
          limit: 12,
          department_id: '',
          department_name: '',
        },
        replierForm: {
          department_id: '',  //部门
          replier_id: [],  //回复人
          department_name: '',
          replier_name: '',
        },
        isHigh: false,
        organizationDialog: false,
        organizeType: '',
        replierDialog: false,
        replierId: '',
        currentStatus: '',
      };
    },
    mounted() {
      this.getTableData();
    },
    watch: {
      replierDialog(val) {
        if (val) {
          this.replierForm = {
            department_id: '',  //部门
            replier_id: [],  //回复人
            department_name: '',
            replier_name: '',
          };
        }
      },
    },
    methods: {
      chooseDepart(val) {
        this.organizationDialog = true;
        this.organizeType = 'depart';
        this.currentStatus = val;
      },
      chooseStaff() {
        this.organizationDialog = true;
        this.organizeType = 'staff';
        this.currentStatus = 'dialog';
      },
      closeOrganization() {
        this.organizationDialog = false;
        this.organizeType = '';
        this.currentStatus = '';
      },
      selectMember(val) {
        if (this.organizeType === 'staff') {
          let names = [];
          val.forEach((item) => {
            this.replierForm.replier_id.push(item.id);
            names.push(item.name);
          });
          this.replierForm.replier_name = names.join(',');
        } else {
          if (this.currentStatus === 'search') {
            this.form.department_id = val[0].id;
            this.form.department_name = val[0].name;
          } else {
            this.replierForm.department_id = val[0].id;
            this.replierForm.department_name = val[0].name;
          }
        }
        this.organizeType = '';
      },
      emptyStaff() {
        this.replierForm.replier_id = [];
        this.replierForm.replier_name = '';
      },
      emptyDepart(val) {
        if (val === 'search') {
          this.form.department_name = '';
          this.form.department_id = '';
        } else {
          this.replierForm.department_name = '';
          this.replierForm.department_id = '';
        }
      },
      search() {
        this.form.page = 1;
        this.getTableData();
      },
      openReplierDialog() {
        this.replierDialog = true;
        this.replierForm = {
          department_id: '',
          replier_id: [],
          department_name: '',
          replier_name: '',
        };
      },
      confirmAdd() {
        this.$http.post(globalConfig.server + 'qa/replier_manage', this.replierForm).then((res) => {
          if (res.data.code === '70010') {
            this.replierDialog = false;
            this.$notify.success({
              title: '成功',
              message: res.data.msg
            });
            this.getTableData();
          }
        });
      },
      getTableData() {
        this.tableStatus = ' ';
        this.tableLoading = true;
        this.$http.get(globalConfig.server + 'qa/replier_manage', {params: this.form}).then((res) => {
          this.tableLoading = false;
          if (res.data.code === '70010') {
            this.tableData = res.data.data;
            this.totalNum = res.data.meta.num;  //记录总条数
          } else {
            this.tableStatus = '暂无数据';
            this.totalNum = 0;
          }
        });
      },
      handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
      },
      handleCurrentChange(val) {
        console.log(`当前页: ${val}`);
        this.form.page = val;
        this.getTableData();
      },
      // 高级
      highGrade() {
        this.isHigh = !this.isHigh;
      },
      // 重置
      resetting() {
        this.form = {
          page: 1,
          limit: 12,
          search: '',
          department_id: '',
          department_name: '',
        };
      },
    },
  };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped="">
  .tableBottom {
    padding: 8px;
    display: flex;
    justify-content: flex-end;
  }

  .el-table .cell {
    text-align: center;
  }
</style>
