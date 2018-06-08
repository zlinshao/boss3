<template>
  <div>
    <div id="lineCollege">
      <div class="highRanking">
        <div class="highSearch">
          <el-form :inline="true" onsubmit="return false" size="mini">
            <el-form-item>
              <el-input placeholder="考试名称" v-model="form.search" @keyup.enter.native="search" size="mini"
                        clearable>
                <el-button slot="append" icon="el-icon-search" @click="search"></el-button>
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
                    <div class="el_col_label">试卷类型</div>
                  </el-col>
                  <el-col :span="16" class="el_col_option">
                    <el-form-item>
                      <el-select v-model="form.category" clearable placeholder="请选择类型">
                        <el-option v-for="item in examType" :key="item.id" :label="item.dictionary_name"
                                   :value="item.id">
                          {{item.dictionary_name}}
                        </el-option>
                      </el-select>
                    </el-form-item>
                  </el-col>
                </el-row>
              </el-col>
              <el-col :span="12">
                <el-row>
                  <el-col :span="8">
                    <div class="el_col_label">选择试卷</div>
                  </el-col>
                  <el-col :span="16" class="el_col_option">
                    <el-form-item>
                      <el-select v-model="form.paper_id" clearable placeholder="请选择试卷">
                        <el-option v-for="(key,index) in useTestPapers" :label="key.name" :value="key.id"
                                   :key="index"></el-option>
                      </el-select>
                    </el-form-item>
                  </el-col>
                </el-row>
              </el-col>
            </el-row>
            <el-row class="el_row_border">
              <el-col :span="12">
                <el-row>
                  <el-col :span="8">
                    <div class="el_col_label">考试时间</div>
                  </el-col>
                  <el-col :span="16" class="el_col_option">
                    <el-date-picker
                      size="mini"
                      v-model="form.time"
                      type="daterange"
                      :picker-options="pickerOptions"
                      value-format="yyyy-MM-dd"
                      range-separator="至"
                      start-placeholder="开始日期"
                      end-placeholder="结束日期"
                      align="right">
                    </el-date-picker>
                  </el-col>
                </el-row>
              </el-col>
              <el-col :span="12">
                <el-row>
                  <el-col :span="8">
                    <div class="el_col_label">部门搜索</div>
                  </el-col>
                  <el-col :span="16" class="el_col_option">
                    <el-form-item>
                      <el-input readonly v-model="depart_name" @focus="openOrganizationModal"
                                placeholder="请选择部门">
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
              style="width: 100%">
              <el-table-column
                prop="start_time"
                label="考试时间">
              </el-table-column>
              <el-table-column
                prop="name"
                label="考试名称">
              </el-table-column>
              <el-table-column
                prop="paper.category"
                label="试卷类型">
              </el-table-column>
              <el-table-column
                label="姓名">
                <template slot-scope="scope">
                  <span>{{personal && personal.name}}</span>
                </template>
              </el-table-column>
              <el-table-column
                label="所在部门">
                <template slot-scope="scope">
                  <span>{{department}}</span>
                </template>
              </el-table-column>
              <el-table-column
                prop="score"
                label="得分">
                <template slot-scope="scope">
                  <span v-if="scope.row.score!=null && scope.row.waiting.length===0">{{scope.row.score}}</span>
                  <span v-else-if="scope.row.score!=null && scope.row.waiting.length>0">批改中</span>
                  <span v-else>—</span>
                </template>
              </el-table-column>
              <el-table-column
                label="操作">
                <template slot-scope="scope">
                  <el-button size="mini" type="primary" v-if="scope.row.result_id == 0 && scope.row.available"
                             @click="answerExam(scope.row.id)">立即答题
                  </el-button>
                  <el-button size="mini" type="info" v-if="scope.row.result_id !== 0 " @click="lookExam(scope.row)">
                    查看试卷
                  </el-button>
                  <span v-if="!scope.row.available && !scope.row.result_id">—</span>
                </template>
              </el-table-column>
              <el-table-column
                label="状态">
                <template slot-scope="scope">
                  <span style="cursor: pointer;color: #6a8dfb;" v-if="scope.row.available===0">已结束</span>
                  <span style="cursor: pointer;color: #6a8dfb;" v-if="scope.row.started === 0">未开始</span>
                  <span style="cursor: pointer;color: #6a8dfb;" v-if="scope.row.in_progress === 1">进行中</span>
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
    <Organization :organizationDialog="organizationDialog" :type="depart" @close="closeOrganization"
                  @selectMember="selectMember"></Organization>
  </div>
</template>

<script>
  import Organization from "../../common/organization.vue";

  export default {
    name: "index",
    components: {Organization},
    data() {
      return {
        tableData: [],
        tableNumber: 0,
        form: {
          page: 1,
          limit: 12,
          search: '',
          category: '',
          paper_id: '',
          time: '',
          department_id: '',
        },
        depart_name: '',
        isHigh: false, //高级搜索
        organizationDialog: false,
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
        depart: '',   //选部门组件 类型
        personal: {},
        department: '',
        confirmArrival: [],
        examType: [],
        useTestPapers: [],
        questionNaireData: [],
        tableStatus: ' ',
        tableLoading: false,
      };
    },
    mounted() {
      this.myData();
      this.getDictionary();
      this.getTestPapers();
      //初始化个人信息
      this.personal = JSON.parse(localStorage.personal);
      let departNameArray = [];
      if (this.personal.org && this.personal.org.length > 0) {
        this.personal.org.forEach((item) => {
          departNameArray.push(item.name);
        });
      }
      this.department = departNameArray.join(',');
    },
    activated() {
      this.myData();
      this.confirmArrival = JSON.parse(localStorage.getItem('confirmArrivals'));
    },
    watch: {
      "form.category": {
        deep: true,
        handler(val, oldVal) {
          if (val) {
            this.$http.get(globalConfig.server + 'exam/paper/search?category=' + val).then((res) => {
              if (res.data.code === '36000') {
                this.useTestPapers = res.data.data;
              } else {
                this.useTestPapers = [];
              }
            });
          } else {
            this.getTestPapers();
          }
        }
      },
    },
    methods: {
      search() {
        this.form.page = 1;
        this.myData();
      },
      lookExam(val) {
        this.$router.push({path: '/lookExam', query: {result_id: val.result_id, exam_id: val.id, from: ''}});
      },
      getTestPapers() {
        this.$http.get(globalConfig.server + 'exam/paper?page=1&limit=100').then((res) => {
          if (res.data.code === '36000') {
            this.useTestPapers = res.data.data.data;
          } else {
            this.useTestPapers = [];
          }
        });
      },
      answerExam(id) {
        if (this.confirmArrival && this.confirmArrival.length > 0 && this.confirmArrival.indexOf(id) > -1) {
          this.$router.push({path: '/answerExam', query: {id: id}});
        } else {
          this.$http.post(globalConfig.server + 'exam/check_in/' + id).then((res) => {
            if (res.data.code === '30000') {
              let examIds;
              if (this.confirmArrival === null) {
                examIds = [];
              } else {
                examIds = this.confirmArrival;
              }
              examIds.push(id);
              localStorage.setItem('confirmArrivals', JSON.stringify(examIds));  //保存已到场的考试id
              this.$router.push({path: '/answerExam', query: {id: id}});
            } else if (res.data.code === '30003') {
              //迟到
              this.$router.push({path: '/beforeExam', query: {address: 'exam', id: id, type: 'third'}});
            } else if (res.data.code === '30004') {
              //未开始
              this.$router.push({path: '/beforeExam', query: {address: 'exam', id: id, type: 'first'}});
            } else {
              this.$notify.warning({
                title: '警告',
                message: res.data.msg
              });
            }
          });
        }
      },
      myData() {
        this.tableStatus = ' ';
        this.tableLoading = true;
        if (!this.form.time) {
          this.form.time = [];
        }
        this.$http.get(globalConfig.server + "exam/exam/my?enrolled=1", {params: this.form}).then((res) => {
          this.tableLoading = false;
          this.isHigh = false;
          if (res.data.code == '30000') {
            this.tableData = res.data.data.data;
            this.tableNumber = res.data.data.count;
            // this.tableData.forEach((item) => {
            //   if (item.available === 0) {
            //     localStorage.removeItem("answers_" + item.id);
            //     let examIds = JSON.parse(localStorage.getItem('confirmArrivals'));
            //     if (examIds && examIds.length > 0) {
            //       examIds.splice(examIds.indexOf(item.id), 1);
            //       localStorage.setItem('confirmArrivals', JSON.stringify(examIds));
            //     }
            //   }
            // });
          } else {
            this.tableData = [];
            this.tableStatus = '暂无数据';
            this.tableNumber = 0;
          }

        });
      },
      handleClick(tab, event) {
        this.form.page = 1;
        this.myData();
      },
      openOrganizationModal() {
        this.organizationDialog = true;
        this.depart = 'depart';
      },
      emptyDepart() {
        this.depart_name = '';
        this.form.department_id = '';
      },
      closeOrganization() {
        this.organizationDialog = false;
        this.len = 0;
        this.depart = "";
      },
      selectMember(val) {
        this.depart_name = val[0].name;
        this.form.department_id = val[0].id;
        this.depart = "";
      },
      getDictionary() {
        //试卷类型
        this.dictionary(613).then((res) => {
          this.examType = res.data;
        });
      },
      // 高级
      highGrade() {
        this.isHigh = !this.isHigh;
      },
      // 重置
      resetting() {
        this.form.category = '';
        this.form.paper_id = '';
        this.form.time = '';
        this.form.department_id = '';
        this.depart_name = '';
      },
      handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
      },
      handleCurrentChange(val) {
        console.log(`当前页： ${val}`);
        this.form.page = val;
        this.myData();
      }
    }
  };
</script>

<style lang="scss" scoped>

</style>
