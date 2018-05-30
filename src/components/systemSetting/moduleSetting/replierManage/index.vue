<template>
  <div>
    <div>
      <div class="highRanking" style=" position: absolute; top: 120px; right: 20px;">
        <div class="highSearch">
          <el-form :inline="true" onsubmit="return false" size="medium">
            <el-form-item>
              <el-input placeholder="标题/内容关键字" v-model="form.search" @keyup.enter.native="search" size="mini"
                        clearable>
                <el-button slot="append" icon="el-icon-search" @click="search"></el-button>
              </el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" size="mini" @click="highGrade">高级</el-button>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" size="mini" @click="openOrganizationModal('staff')">分发问答</el-button>
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
                      <el-input readonly="" v-model="departname" @focus="openOrganizationModal('depart')"
                                placeholder="点击选择">
                        <template slot="append">
                          <div style="cursor: pointer;" @click="emptyDepart">清空</div>
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
              @selection-change="handleSelectionChange"
              style="width: 100%">
              <el-table-column
                type="selection"
                width="65">
              </el-table-column>
              <el-table-column
                prop="title"
                label="标题">
              </el-table-column>
              <el-table-column
                prop="create_time"
                label="创建时间">
              </el-table-column>
              <el-table-column
                prop="asker"
                label="提问者">
              </el-table-column>
              <el-table-column
                prop="description"
                label="描述">
              </el-table-column>
              <el-table-column
                prop=""
                label="职位">
              </el-table-column>
              <el-table-column
                prop=""
                label="部门">
              </el-table-column>
              <el-table-column
                prop=""
                label="所属部门">
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
  </div>
</template>
<script>
  import Organization from "../../../common/organization.vue";

  export default {
    components: {Organization},
    data() {
      return {
        tableData: [],
        form: {
          page: 1,
          limit: 12,
          search: '',
          department_id: '',
        },
        totalNum: 0,
        isHigh: false,
        tableStatus: ' ',
        tableLoading: false,
        departname: '',
        organizationDialog: false,
        organizeType: '',
        askAnswerIds: [],  //问答编号
        userIds: '',
      };
    },
    mounted() {
      this.getTableData();
    },
    methods: {
      handleSelectionChange(val) {
        this.askAnswerIds = [];
        val.forEach((item) => {
          this.askAnswerIds.push(item.id);
        });
      },
      search() {
        this.form.page = 1;
        this.getTableData();
      },
      getTableData() {
        this.tableStatus = ' ';
        this.tableLoading = true;
        this.$http.get(globalConfig.server + 'qa/replier_manage', {params: this.form}).then((res) => {
          this.tableLoading = false;
          if (res.data.code === '199200') {
            this.tableData = res.data.data;
            this.tableNum = res.data.count;  //记录总条数
          } else {
            this.tableStatus = '暂无数据';
            this.tableNum = 0;
          }
        });
      },
      //分发部门
      distribute() {
        this.$http.post(globalConfig.server + 'ans/send',{id: this.askAnswerIds, uids: this.userIds}).then((res) => {

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
      openOrganizationModal(val) {
        this.organizationDialog = true;
        if(val === 'staff'){
          this.organizeType = 'staff';
        }else{
          this.organizeType = 'depart';
        }
      },
      closeOrganization() {
        this.organizationDialog = false;
        this.organizeType = '';
      },
      selectMember(val) {
        if(this.organizeType === 'staff'){
          this.userIds = val[0].id;
          this.distribute();
        }else{
          this.departname = val[0].name;
          this.form.department_id = val[0].id;
        }
        this.organizeType = '';
      },
      emptyDepart() {
        this.departname = '';
        this.form.department_id = '';
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
        };
        this.departname = '';
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
