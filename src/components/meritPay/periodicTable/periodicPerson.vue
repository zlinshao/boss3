<template>
  <div>
    <div class="highRanking">
      <div class="highSearch">
        <el-form :inline="true" size="mini">
          <el-form-item>
            <el-button type="primary" size="mini" @click="highGrade">高级</el-button>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" trigger="click" size="mini">
              导出<i class="el-icon-arrow-down el-icon--right"></i>
            </el-button>
          </el-form-item>
        </el-form>
      </div>

      <div class="filter high_grade" :class="isHigh? 'highHide':''">
        <el-form :inline="true" :model="form" size="mini" label-width="100px">
          <div class="filterTitle">
            <i class="el-icons-fa-bars"></i>&nbsp;&nbsp;高级搜索
          </div>
          <el-row class="el_row_border">
            <el-col :span="12">
              <el-row>
                <el-col :span="8">
                  <div class="el_col_label">日期</div>
                </el-col>
                <el-col :span="16" class="el_col_option">
                  <el-form-item>
                    <div class="block">
                      <el-date-picker
                        v-model="form.date"
                        type="daterange"
                        align="right"
                        unlink-panels
                        range-separator="至"
                        start-placeholder="开始日期"
                        end-placeholder="结束日期"
                        :picker-options="pickerOptions"
                        value-format="yyyy-MM-dd">
                      </el-date-picker>
                    </div>
                  </el-form-item>
                </el-col>
              </el-row>
            </el-col>
            <el-col :span="12">
              <el-row>
                <el-col :span="8">
                  <div class="el_col_label">部门</div>
                </el-col>
                <el-col :span="16" class="el_col_option">
                  <el-form-item>
                    <el-input v-model="form.organize" @focus="openOrganize" placeholder="请选择部门/员工"
                              readonly>
                      <template slot="append">
                        <div style="cursor: pointer;" @click="close_">清空</div>
                      </template>
                    </el-input>
                  </el-form-item>
                </el-col>
              </el-row>
            </el-col>
          </el-row>
          <div class="btnOperate">
            <el-button size="mini" type="primary">搜索</el-button>
            <el-button size="mini" type="primary" @click="resetting">重置</el-button>
            <el-button size="mini" type="primary" @click="highGrade">取消</el-button>
          </div>
        </el-form>
      </div>
    </div>
    <div class="main">
      <div>
        <el-table
          :data="tableData"
          width="100%">
          <el-table-column
            label="名称"
            prop="simple_staff.real_name">
          </el-table-column>
          <el-table-column
            label="收房(套)"
            prop="collect_count">
          </el-table-column>
          <el-table-column
            label="租房(套)"
            prop="rent_count">
          </el-table-column>
          <el-table-column
            label="实际业绩"
            prop="achv_real">
          </el-table-column>
          <el-table-column
            label="溢出业绩"
            prop="achv_overflow">
          </el-table-column>
          <el-table-column
            label="所属部门"
            prop="department">
          </el-table-column>
        </el-table>
      </div>
      <div class="block pages">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="form.page"
          :page-size="12"
          layout="total, prev, pager, next, jumper"
          :total="totalNum">
        </el-pagination>
      </div>
    </div>
    <!--组织架构-->
    <organization :organizationDialog="organizeVisible" @close="closeOrganize"></organization>
  </div>
</template>

<script>
  import organization from '../../common/organization.vue';
    export default {
      name: "periodic-person",
      components: {organization},
      data() {
        return {
          tableData: [],
          form: {
            page: 1,
            limit: 12,
            date: '',
            organize: '',
          },
          totalNum: 0,
          isHigh: false,
          organizeVisible: false,
          pickerOptions: {
            shortcuts: [{
              text: '最近一周',
              onClick(picker) {
                const end = new Date();
                const start = new Date();
                start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
                picker.$emit('pick', [start, end]);
              }
            }, {
              text: '最近一个月',
              onClick(picker) {
                const end = new Date();
                const start = new Date();
                start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
                picker.$emit('pick', [start, end]);
              }
            }, {
              text: '最近三个月',
              onClick(picker) {
                const end = new Date();
                const start = new Date();
                start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
                picker.$emit('pick', [start, end]);
              }
            }]
          },
        }
      },
      methods: {
        getTableData(){
          this.$http.get(globalConfig.server+'salary/periodic/personal').then((res)=>{
              if(res.data.code === '88810'){
                this.tableData = res.data.data.data;
                this.totalNum = res.data.data.count;
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
        // 重置
        resetting() {
          this.form.organize = '';
          this.form.dates = '';
          this.form.keywords = '';
        },
        // 高级筛选
        highGrade() {
          this.isHigh = !this.isHigh;
        },
        // 部门员工筛选
        openOrganize() {
          this.organizeVisible = true;
        },
        // 部门员工筛选
        closeOrganize() {
          this.organizeVisible = false;
        },
        // 清空部门
        close_() {
          console.log(1);
        },
        // 导出
        leadingOut(val) {
          console.log(val);
        },

      },
      mounted() {
        this.getTableData();
      },
      activated() {
        this.getTableData();
      },
    }
</script>

<style scoped>

</style>
