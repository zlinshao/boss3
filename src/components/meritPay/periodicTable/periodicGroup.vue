<template>
  <div>
    <div class="highRanking" style="position: absolute; top: 120px; right: 20px;">
      <div class="highSearch">
        <el-form :inline="true" onsubmit="return false" size="mini">
          <el-form-item>
            <el-button type="primary" size="mini" @click="highGrade">高级</el-button>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" size="mini" @click="exportData">导出</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
    <div class="highRanking">
      <div class="filter high_grade" :class="isHigh? 'highHide':''"  style="margin-top: -40px;">
        <el-form :inline="true" onsubmit="return false" :model="form" size="mini" label-width="100px">
          <div class="filterTitle">
            <i class="el-icons-fa-bars"></i>&nbsp;&nbsp;高级搜索
          </div>
          <el-row class="el_row_border">
            <el-col :span="12">
              <el-row>
                <el-col :span="8">
                  <div class="el_col_label">部门</div>
                </el-col>
                <el-col :span="16" class="el_col_option">
                  <el-form-item>
                    <el-input v-model="depart_name" @focus="chooseDepart" placeholder="请选择部门"
                              readonly>
                      <template slot="append">
                        <div style="cursor: pointer;" @click="closeDepart">清空</div>
                      </template>
                    </el-input>
                  </el-form-item>
                </el-col>
              </el-row>
            </el-col>
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
          </el-row>
          <div class="btnOperate">
            <el-button size="mini" type="primary" @click="getTableData">搜索</el-button>
            <el-button size="mini" type="primary" @click="resetting">重置</el-button>
            <el-button size="mini" type="primary" @click="highGrade">取消</el-button>
          </div>
        </el-form>
      </div>
    </div>
    <div class="main">
      <div style="height:120px;">
        <el-table
          :data="tableData"
          :empty-text='collectStatus'
          v-loading="collectLoading"
          element-loading-text="拼命加载中"
          element-loading-spinner="el-icon-loading"
          element-loading-background="rgba(255, 255, 255, 0)"
          width="100%">
          <el-table-column
            label="名称"
            prop="department">
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
    <organization :organizationDialog="organizeVisible" :type="organizeType" @close="closeOrganize"
                  @selectMember="selectMember"></organization>
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
        depart_name: '',
        form: {
          page: 1,
          limit: 12,
          date: '',
          depart_ids: [],
          start_time: '',
          end_time: '',
        },
        totalNum: 0,
        isHigh: false,
        organizeVisible: false,
        organizeType: '',
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
        collectStatus: ' ',
        collectLoading: false,
      }
    },
    methods: {
      getTableData() {
        if (this.form.date) {
          this.form.start_time = this.form.date[0];
          this.form.end_time = this.form.date[1];
        } else {
          this.form.start_time = '';
          this.form.end_time = '';
        }
        this.isHigh = false;
        this.collectLoading = true;
        this.collectStatus = ' ';
        this.$http.get(globalConfig.server + 'salary/periodic/district?limit=12&page=' + this.form.page
          + '&start_time=' + this.form.start_time + '&end_time=' + this.form.end_time
          + '&depart_ids=' + this.form.depart_ids).then((res) => {
          this.collectLoading = false;
          if (res.data.code === '88810') {
            this.tableData = res.data.data.data;
            this.totalNum = res.data.data.count;
          } else if (res.data.code === '88811') {
            this.collectStatus = '暂无数据';
            this.tableData = [];
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
      // 重置
      resetting() {
        this.form.dates = '';
        this.form.start_time = '';
        this.form.end_time = '';
        this.closeDepart();
        this.closeStaff();
      },
      // 高级筛选
      highGrade() {
        this.isHigh = !this.isHigh;
      },
      // 部门筛选
      chooseDepart() {
        this.organizeVisible = true;
        this.organizeType = 'depart';
      },
      closeOrganize() {
        this.organizeVisible = false;
      },
      // 清空部门
      closeDepart() {
        this.form.depart_ids = [];
        this.depart_name = '';
      },
      selectMember(val) {
        if (this.organizeType === 'depart') {
          for (var i = 0; i < val.length; i++) {
            this.depart_name = this.depart_name === "" ? val[i].name : this.depart_name + "," + val[i].name;
            this.form.depart_ids.push(val[i].id);
          }
        }
      },
      // 导出
      exportData() {
        this.$http.get(globalConfig.server + 'salary/periodic/export/district', {responseType: 'arraybuffer'}).then((res) => { // 处理返回的文件流
          if (!res.data) {
            return;
          }
          let url = window.URL.createObjectURL(new Blob([res.data]));
          let link = document.createElement('a');
          link.style.display = 'a';
          link.href = url;
          link.setAttribute('download', 'excel.xlsx');
          document.body.appendChild(link);
          link.click();
        });
      },
    },
    mounted() {
      this.getTableData();
    },
  }
</script>

<style scoped>

</style>
