<template>
  <div>
    <div id="onlineExam">
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
                      <el-select v-model="form.category" size="mini" placeholder="请选择" clearable>
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
                    <div class="el_col_label">时间</div>
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
        <div>
          <div>
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
                label="考试名称">
              </el-table-column>
              <el-table-column
                prop="question_count"
                label="总题数">
              </el-table-column>
              <el-table-column
                prop="score"
                label="总分值">
              </el-table-column>
              <el-table-column
                prop="duration"
                label="总时长">
              </el-table-column>
              <el-table-column
                prop="paper.name"
                label="试卷名称">
              </el-table-column>
              <el-table-column
                prop="paper.category"
                label="试卷类型">
              </el-table-column>
              <el-table-column
                prop="examinees_count"
                label="考生人数">
              </el-table-column>
              <el-table-column
                prop="absence_count"
                label="缺考">
              </el-table-column>
              <el-table-column
                prop="more"
                label="详情">
                <template slot-scope="scope">
                  <span @click="lookExam(scope.row.id)" style="cursor: pointer;color: #6a8dfb;">点击查看</span>
                </template>
              </el-table-column>
            </el-table>
          </div>
          <div class="block pages">
            <el-pagination
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
              :current-page="form.page"
              :page-size="2"
              layout="total, prev, pager, next, jumper"
              :total="tableNum">
            </el-pagination>
          </div>
        </div>

      </div>
    </div>
  </div>
</template>

<script>

  export default {
    name: "index",
    data() {
      return {
        tableData: [],
        tableNum: 0,
        form: {
          page: 1,
          limit: 10,
          search: '', //考试名称模糊搜索
          category: '', //试卷类型
          time: [], //考试时间
          paper_id: '',
        },
        forms: [
          {id: "1", name: "表彰"},
          {id: "2", name: "批评"},
          {id: "3", name: "通知"}
          // { id: "4", name: "研发" }
        ],
        isHigh: false, //高级搜索
        rentStatus: " ",
        rentLoading: false,
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
        examType: [],
        useTestPapers: [],
      };
    },
    activated() {
      this.myData();
    },
    mounted() {
      this.getDictionary();
      this.getTestPapers();
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
      lookExam(id) {
        this.$router.push({path: "/examinerReadEach", query: {id: id}});
      },
      getDictionary() {
        //试卷类型
        this.dictionary(613).then((res) => {
          this.examType = res.data;
        });
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
      myData() {
        this.rentStatus = " ";
        this.rentLoading = true;
        if (!this.form.time) {
          this.form.time = [];
        }
        this.$http.get(globalConfig.server + "exam?status=3",{params: this.form}).then((res) => {
          this.rentLoading = false;
          this.isHigh = false;
          if (res.data.code == "30000") {
            this.tableData = res.data.data.data;
            this.tableNumber = res.data.data.count;
          } else {
            this.rentStatus = "暂无数据";
            this.tableNumber = 0;
            this.tableData = [];
            // this.$notify.warning({
            //   title: '警告',
            //   message: res.data.msg
            // });
          }
        });
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
          category: '',
          search: '',
          time: [],
          paper_id: '',
        };
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
