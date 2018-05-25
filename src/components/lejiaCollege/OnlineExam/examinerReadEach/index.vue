<template>
  <div>
    <div id="onlineExam">
      <div class="highRanking">
        <div class="highSearch">
          <el-form :inline="true" onsubmit="return false" size="mini">
            <el-form-item>
              <el-input placeholder="请输入" v-model="form.search" @keyup.enter.native="search" size="mini"
                        clearable>
                <el-button slot="append" icon="el-icon-search" @click="search"></el-button>
                <!--<el-button slot="append" icon="el-icons-fa-bars"></el-button>-->
              </el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" size="mini" @click="highGrade">高级</el-button>
            </el-form-item>
          </el-form>
        </div>
        <div class="filter high_grade" :class="isHigh? 'highHide':''">
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
                      <el-input readonly="" v-model="departname" @focus="openOrganizationModal"
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
              :empty-text='rentStatus'
              v-loading="rentLoading"
              element-loading-text="拼命加载中"
              element-loading-spinner="el-icon-loading"
              element-loading-background="rgba(255, 255, 255, 0)"
              style="width: 100%">
              <el-table-column
                prop="start_time"
                label="考试时间">
              </el-table-column>
              <el-table-column
                prop="name"
                label="试卷名称">
              </el-table-column>
              <el-table-column
                prop="category"
                label="试卷类型">
              </el-table-column>
              <el-table-column
                prop="examinee.real_name"
                label="考生姓名">
              </el-table-column>
              <!--<el-table-column-->
              <!--prop="depart"-->
              <!--label="考生部门">-->
              <!--</el-table-column>-->
              <el-table-column
                prop="statue"
                label="考生状态">
                <template slot-scope="scope">
                  <span v-if="scope.row.result_id == 0">缺考</span>
                  <span v-if="scope.row.result_id !== 0">完成考试</span>
                </template>
              </el-table-column>
              <el-table-column
                prop="result_info.score"
                label="考生成绩">
                <template slot-scope="scope">
                  <span v-if="scope.row.result_id==0">0</span>
                  <span v-if="scope.row.result_id!==0">{{scope.row.result_info && scope.row.result_info.score}}</span>
                </template>
              </el-table-column>
              <el-table-column
                label="操作">
                <template slot-scope="scope">
                  <span
                    v-if="scope.row.result_id == 0 || (scope.row.result_info && scope.row.result_info.waiting && scope.row.result_info.waiting.length == 0)"
                    style="cursor: pointer;color: #6a8dfb;" @click="lookExam(scope.row)">已完成,点击查看</span>
                  <span v-else @click="correctExam(scope.row)" style="cursor: pointer;color: #6a8dfb;">点击阅卷</span>
                </template>
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
              :total="tableNumber">
            </el-pagination>
          </div>
        </div>
      </div>
    </div>
    <Organization :organizationDialog="organizationDialog"  :type="organizeType" @close="closeOrganization"
                  @selectMember="selectMember"></Organization>
  </div>
</template>

<script>
  import Organization from "../../../common/organization.vue";

  export default {
    name: "examiner-read-each",
    components: {Organization},
    data() {
      return {
        tableData: [],
        tableNumber: 0,
        examId: '',
        form: {
          page: 1,
          limit: 12,
          department_id: ''
        },
        departname: '',
        isHigh: false, //高级搜索
        organizeType: '',
        organizationDialog: false,
        rentStatus: ' ',
        rentLoading: false,
        pickerOptions: {
          shortcuts: [
            {
              text: "最近一周",
              onClick(picker) {
                const end = new Date();
                const start = new Date();
                start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
                picker.$emit("pick", [start, end]);
              }
            },
            {
              text: "最近一个月",
              onClick(picker) {
                const end = new Date();
                const start = new Date();
                start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
                picker.$emit("pick", [start, end]);
              }
            },
            {
              text: "最近三个月",
              onClick(picker) {
                const end = new Date();
                const start = new Date();
                start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
                picker.$emit("pick", [start, end]);
              }
            }
          ]
        },
      };
    },
    activated() {
      this.getQueryData();
      this.myData();
    },
    watch: {},
    methods: {
      search(){
        this.form.page = 1;
        this.myData();
      },
      correctExam(val) {
        this.$router.push({path: "/examinerShortAn", query: {result_id: val.result_id, exam_id: val.exam_id}});
      },
      lookExam(val) {
        this.$router.push({path: '/lookExam', query: {result_id: val.result_id, exam_id: val.exam_id, from: 'manage'}});
      },
      getQueryData() {
        if (!this.$route.query.id) {
          this.examId = this.$store.state.onlineExam.examiner_read_id;
          this.$router.push({path: '/examinerReadEach', query: {id: this.$store.state.onlineExam.examiner_read_id}});
        } else {
          this.$store.dispatch('examinerReadId', this.$route.query.id);
          this.examId = this.$route.query.id;
        }
      },
      myData() {
        this.rentStatus = " ";
        this.rentLoading = true;
        this.$http.get(globalConfig.server + "exam/finished/" + this.examId, {params: this.form}).then(res => {
          this.rentLoading = false;
          this.isHigh = false;
          if (res.data.code == "30000") {
            this.tableData = res.data.data.data;
            this.tableNumber = res.data.data.count;
          } else {
            this.tableData = [];
            this.tableNumber = 0;
            this.rentStatus = "暂无数据";
          }
        });
      },
      openOrganizationModal() {
        this.organizationDialog = true;
        this.organizeType = 'depart';
      },
      closeOrganization() {
        this.organizationDialog = false;
        this.organizeType = '';
      },
      selectMember(val) {
        this.departname = val[0].name;
        this.form.department_id = val[0].id;
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
          department_id: ''
        };
        this.departname = '';
      },
      handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
      },
      handleCurrentChange(val) {
        this.form.page = val;
        this.myData();
      }
    }
  };
</script>

<style lang="scss" scoped>

</style>
