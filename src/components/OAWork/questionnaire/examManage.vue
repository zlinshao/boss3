<template>
  <div @click="show=false" @contextmenu="closeMenu">
    <div class="highRanking" style=" position: absolute; top: 120px; right: 20px;">
      <div class="highSearch">
        <el-form :inline="true" size="mini">
          <el-form-item>
            <el-input placeholder="考试场次" v-model="params.search" size="mini" clearable
                      @keyup.enter.native="getExamData()">
              <el-button slot="append" icon="el-icon-search" size="mini" @click="getExamData()"></el-button>
            </el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" size="mini" @click="highGrade">高级</el-button>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" size="mini" @click="examDialog = true;examId = '';">
              <i class="iconfont icon-jinrukaoshi" style="font-size: 14px;"></i>&nbsp;新建调查
            </el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
    <div class="highRanking">
      <div class="filter high_grade" :class="isHigh? 'highHide':''" style=" margin-top: -40px;">
        <el-form :inline="true" size="mini" label-width="100px">
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
                    <el-select v-model="params.category" clearable placeholder="请选择">
                      <el-option v-for="item in examType" :key="item.id" :label="item.dictionary_name" :value="item.id">
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
                  <div class="el_col_label">考试状态</div>
                </el-col>
                <el-col :span="16" class="el_col_option">
                  <el-form-item>
                    <el-select v-model="params.status" clearable placeholder="请选择">
                      <el-option v-for="item in examStatus" :label="item.name" :value="item.id"
                                 :key="item.id"></el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
              </el-row>
            </el-col>
          </el-row>
          <div class="btnOperate">
            <el-button size="mini" type="primary" @click="getExamData">搜索</el-button>
            <el-button size="mini" type="primary" @click="resetting">重置</el-button>
            <el-button size="mini" type="primary" @click="highGrade">取消</el-button>
          </div>
        </el-form>
      </div>
    </div>
    <div class="main">
      <div class="myHouse">
        <div>
          <el-table
            :data="tableData"
            :empty-text='tableStatus'
            v-loading="tableLoading"
            element-loading-text="拼命加载中"
            element-loading-spinner="el-icon-loading"
            element-loading-background="rgba(255, 255, 255, 0)"
            @row-dblclick="dblClickTable"
            @row-contextmenu='openContextMenu'
            style="width: 100%">
            <el-table-column
              prop="name"
              label="标题">
              <template slot-scope="scope">
                <span v-if="scope.row.name">{{scope.row.name}}</span>
                <span v-if="!scope.row.name">暂无</span>
              </template>
            </el-table-column>
            <el-table-column
              prop="paper.name"
              label="试卷名称">
              <template slot-scope="scope">
                <span v-if="scope.row.paper && scope.row.paper.name">{{scope.row.paper && scope.row.paper.name}}</span>
                <span v-if="!(scope.row.paper && scope.row.paper.name)">暂无</span>
              </template>
            </el-table-column>
            <el-table-column
              prop="paper.category"
              label="试卷类型">
              <template slot-scope="scope">
                <span
                  v-if="scope.row.paper && scope.row.paper.category">{{scope.row.paper && scope.row.paper.category}}</span>
                <span v-if="!(scope.row.paper && scope.row.paper.category)">暂无</span>
              </template>
            </el-table-column>
            <el-table-column
              prop="start_time"
              label="发布人">
              <template slot-scope="scope">
                <span v-if="scope.row.start_time">{{scope.row.start_time}}</span>
                <span v-if="!scope.row.start_time">暂无</span>
              </template>
            </el-table-column>
            <el-table-column
              prop="start_time"
              label="发布时间">
              <template slot-scope="scope">
                <span v-if="scope.row.start_time">{{scope.row.start_time}}</span>
                <span v-if="!scope.row.start_time">暂无</span>
              </template>
            </el-table-column>
            <el-table-column
              prop="start_time"
              label="问卷周期">
              <template slot-scope="scope">
                <span v-if="scope.row.start_time">{{scope.row.start_time}}</span>
                <span v-if="!scope.row.start_time">暂无</span>
              </template>
            </el-table-column>
            <el-table-column
              prop="duration"
              label="回复量">
              <template slot-scope="scope">
                <span v-if="scope.row.duration">{{scope.row.duration}}</span>
                <span v-if="!scope.row.duration">暂无</span>
              </template>
            </el-table-column>
            <el-table-column
              prop="examinees_count"
              label="调查对象(人数)">
              <template slot-scope="scope">
                <span v-if="scope.row.examinees_count">{{scope.row.examinees_count}}</span>
                <span v-if="!scope.row.examinees_count">暂无</span>
              </template>
            </el-table-column>
            <el-table-column
              prop="status"
              label="问卷状态">
              <template slot-scope="scope">
                <el-button v-if="scope.row.status === 1" type="primary" size="mini">未开始</el-button>
                <el-button v-if="scope.row.status === 2" type="warning" size="mini">已开始</el-button>
                <el-button v-if="scope.row.status === 3" type="info" size="mini">已结束</el-button>
                <span v-if="!scope.row.status">暂无</span>
              </template>
            </el-table-column>
          </el-table>
        </div>
        <div class="block pages" style="float: right;">
          <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="params.page"
            :page-size="12"
            layout="total, prev, pager, next, jumper"
            :total="totalNum">
          </el-pagination>
        </div>
      </div>
    </div>
    <div id="examDialog">
      <el-dialog :close-on-click-modal="false" :visible.sync="examDialog" :title="examTitle" width="40%">
        <div>
          <el-form size="mini" onsubmit="return false;" :model="formExam" label-width="100px">
            <el-row :gutter="30">
              <el-col :span="12">
                <el-form-item label="标题" required>
                  <el-input v-model="formExam.name" size="mini" placeholder="请输入调查名称" clearable></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="试卷类型" required>
                  <el-select v-model="formExam.category" size="mini" placeholder="请选择" clearable>
                    <el-option v-for="item in examType" :key="item.id" :label="item.dictionary_name" :value="item.id">
                      {{item.dictionary_name}}
                    </el-option>
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="30">
              <el-col :span="12">
                <el-form-item label="使用试卷" required>
                  <el-select v-model="formExam.paper_id" size="mini" placeholder="请选择试卷" clearable>
                    <el-option v-for="item in useTestPapers" :key="item.id" :label="item.name" :value="item.id">
                      {{item.name}}
                    </el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-checkbox label="试卷随机" v-model="formExam.rand" style="line-height: 30px;"></el-checkbox>
            </el-row>
            <el-row :gutter="30">
              <el-col :span="20">
                <el-form-item label="有效时间" required>
                  <el-date-picker size="mini" v-model="formExam.time" type="datetimerange"
                                  :picker-options="pickerOptions"
                                  range-separator="至"
                                  start-placeholder="开始日期"
                                  end-placeholder="结束日期"
                                  value-format="yyyy-MM-dd HH:mm:ss"
                                  align="right"></el-date-picker>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="30">
              <el-col :span="20">
                <el-form-item label="调查对象" required>
                  <el-input v-model="examinees_name" @click.native="chooseStaff" size="mini" placeholder="请选择调查对象"
                            clearable>
                    <template slot="append">
                      <div style="cursor: pointer;" @click="emptyRespondent">清空</div>
                    </template>
                  </el-input>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
          <span slot="footer" class="dialog-footer">
            <el-button size="small" @click="examDialog = false;examId = '';">取消</el-button>
            <el-button size="small" type="primary" @click="saveExam">保存</el-button>
          </span>
        </div>
      </el-dialog>
    </div>
    <div id="examineeDialog">
      <el-dialog :close-on-click-modal="false" :visible.sync="examineeDialog" title="考生信息" width="45%">
        <div>
          <el-row :gutter="10">
            <el-col :span="18">
              <el-input size="mini" placeholder="请选择考生" v-model="selectExaminees" readOnly @focus="openOrganize">
                <template slot="append">
                  <div style="cursor: pointer;" @click="emptyExaminees">清空</div>
                </template>
              </el-input>
            </el-col>
            <el-col :span="6">
              <el-button type="primary" size="mini" @click="addExaminees">新增</el-button>
            </el-col>
          </el-row>
        </div>
        <div style="margin-top: 20px;">
          <el-table
            :data="examineesData"
            :empty-text='tableStatus'
            v-loading="tableLoading"
            element-loading-text="拼命加载中"
            element-loading-spinner="el-icon-loading"
            element-loading-background="rgba(255, 255, 255, 0)"
            style="width: 100%">
            <el-table-column
              prop="real_name"
              label="考生姓名">
              <template slot-scope="scope">
                <span v-if="scope.row.real_name">{{scope.row.real_name}}</span>
                <span v-if="!scope.row.real_name">暂无</span>
              </template>
            </el-table-column>
            <el-table-column
              prop="pivot.enroll_time"
              label="报名时间">
              <template slot-scope="scope">
                <span v-if="scope.row.pivot && scope.row.pivot.enroll_time">{{scope.row.pivot && scope.row.pivot.enroll_time}}</span>
                <span v-if="!(scope.row.pivot && scope.row.pivot.enroll_time)">暂无</span>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </el-dialog>
    </div>
    <RightMenu :startX="rightMenuX+'px'" :startY="rightMenuY+'px'" :list="lists" :show="show"
               @clickOperate="clickEvent"></RightMenu>
    <Organization :organizationDialog="organizationDialog" :type="organizeType" @selectMember="selectMember"
                  @close="closeOrganization"></Organization>
  </div>
</template>

<script>
  import RightMenu from '../../common/rightMenu.vue'    //右键
  import Organization from '../../common/organization.vue'

  export default {
    components: {RightMenu, Organization},
    name: 'exam-manage',
    data() {
      return {
        activeName: 'first',
        organizationDialog: false,
        organizeType: '',
        rightMenuX: 0,
        rightMenuY: 0,
        show: false,
        lists: [],
        tableStatus: ' ',
        tableLoading: false,
        totalNum: 0,
        tableData: [],
        isHigh: false,
        examTitle: '新建调查',
        //考试列表分页搜索
        params: {
          page: 1,
          limit: 12,
          search: '',
          category: '',  //试卷类型
          status: '',   //考试状态
        },
        //考试状态
        examStatus: [
          {id: 1, name: '未开始'},
          {id: 2, name: '已开始'},
          {id: 3, name: '已结束'},
        ],
        examType: [],
        examDialog: false,  //新建考试模态框
        //新增问卷调查
        formExam: {
          rand: true,
          name: '',    //考试名称
          time: '',  //时间周期
          paper_id: '',    //试卷id
          category: '',  //试卷类型
          examinees: '',
        },
        examinees_name: '',
        examineeDialog: false,
        examId: '', //考试场次的id
        useTestPapers: [],
        examineesData: [],
        selectExaminees: '',
        selectExamineeIds: [],
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
    mounted() {
      this.getExamData();
      this.getDictionary();
    },
    watch: {
      examDialog(val) {
        if (val) {
          this.initial();
          if (this.examId) {
            this.examTitle = '编辑调查';
            this.getExamDetail();
          } else {
            this.examTitle = '新建调查';
          }
        }
      },
      "formExam.category": {
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
          }
        }
      },
      "formExam.rand": {
        deep: true,
        handler(val, oldVal) {
          if (val) {
            if (this.useTestPapers.length < 1) {
              this.$notify.warning({
                title: '警告',
                message: '没有可使用的试卷'
              });
              this.formExam.rand = false;
            } else {
              var key = Math.floor((Math.random() * this.useTestPapers.length));
              this.formExam.paper_id = this.useTestPapers[key].id;
            }
          } else {

          }
        }
      },
    },
    methods: {
      //清除调查对象
      emptyRespondent(){

      },
      // 高级
      highGrade() {
        this.isHigh = !this.isHigh;
      },
      // 重置
      resetting() {
        this.params.category = '';
        this.params.status = '';
        this.getExamData();
      },
      dblClickTable() {

      },
      chooseStaff() {
        // this.organizeType = "staff";
        this.organizationDialog = true;
      },
      //打开选人组件
      openOrganize() {
        this.organizationDialog = true;
        this.organizeType = 'staff';
      },
      selectMember(val) {
        console.log(val)
        this.selectExaminees = '';
        this.selectExamineeIds = [];
        let names = [];
        val.forEach((item) => {
          this.selectExamineeIds.push(item.id);
          names.push(item.name);
        });
        this.selectExaminees = names.join(',');
        this.organizeType = '';
      },
      emptyExaminees() {
        this.selectExaminees = '';
        this.selectExamineeIds = [];
      },
      addExaminees() {
        this.$http.post(globalConfig.server + 'exam/batch_enroll/' + this.examId, {examinees: this.selectExamineeIds}).then((res) => {
          if (res.data.code === '30010') {
            this.$notify.success({
              title: '成功',
              message: res.data.msg
            });
            this.getExamDetail();
            this.emptyExaminees();
          } else {
            this.$notify.warning({
              title: '警告',
              message: res.data.msg
            });
          }
        });
      },
      //考试详情
      getExamDetail() {
        this.$http.get(globalConfig.server + 'exam/' + this.examId).then((res) => {
          if (res.data.code === '30000') {
            let detail = res.data.data;
            if (detail) {
              this.formExam.name = detail.name;
              this.formExam.start_time = detail.start_time;
              this.formExam.duration = detail.duration;
              this.formExam.category = detail.paper && detail.paper.category_id;
              this.formExam.late_tolerance = detail.late_tolerance;
              this.formExam.paper_id = detail.paper && detail.paper.id;
              //考生信息
              this.examineesData = detail.examinees;
            }
          } else {
            this.$notify.warning({
              title: '警告',
              message: res.data.msg
            });
          }
        });
      },
      //问卷列表
      getExamData() {
        this.tableStatus = " ";
        this.tableLoading = true;
        this.$http.get(globalConfig.server + 'questionnaire', {params: this.params}).then((res) => {
          this.tableLoading = false;
          this.isHigh = false;
          if (res.data.code === '30000') {
            this.tableData = res.data.data.data;
            this.totalNum = res.data.data.count;
          } else {
            this.tableData = [];
            this.totalNum = 0;
            this.tableStatus = "暂无数据";
            this.$notify.warning({
              title: '警告',
              message: res.data.msg
            });
          }
        });
      },
      //保存/新增试卷
      saveExam() {
        let header = '';
        if (this.examId) {
          header = this.$http.put(globalConfig.server + 'questionnaire/' + this.examId, this.formExam);
        } else {
          header = this.$http.post(globalConfig.server + 'questionnaire', this.formExam);
        }
        header.then((res) => {
          if (res.data.code === '30010') {
            this.examDialog = false;
            this.examId = '';
            this.$notify.success({
              title: '成功',
              message: res.data.msg
            });
            this.getExamData();
          } else {
            this.$notify.warning({
              title: '警告',
              message: res.data.msg
            });
          }
        });
      },
      getDictionary() {
        //试卷类型
        this.dictionary(613).then((res) => {
          this.examType = res.data;
        });
      },
      handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
      },
      handleCurrentChange(val) {
        console.log(`当前页: ${val}`);
        this.params.page = val;
        this.getExamData();
      },
      //右键菜单
      openContextMenu(row, event) {
        this.examId = row.id;
        this.lists = [
          {
            clickIndex: "editExam",
            headIcon: "el-icon-edit",
            label: "编辑考试"
          },
          {
            clickIndex: "deleteExam",
            headIcon: "el-icon-delete",
            label: "删除考试"
          },
          {
            clickIndex: "manageExaminee",
            headIcon: "el-icon-view",
            label: "查看/添加考生"
          },
          // {
          //   clickIndex: "informExaminee",
          //   headIcon: "el-icons-fa-mail-reply",
          //   label: "通知考生"
          // }
        ];
        let e = event || window.event; //support firefox contextmenu
        this.show = false;
        this.rightMenuX =
          e.clientX +
          document.documentElement.scrollLeft -
          document.documentElement.clientLeft;
        this.rightMenuY =
          e.clientY +
          document.documentElement.scrollTop -
          document.documentElement.clientTop;
        event.preventDefault();
        event.stopPropagation();
        this.$nextTick(() => {
          this.show = true;
        });
      },
      //右键回调事件
      clickEvent(index) {
        switch (index) {
          case 'editExam':
            this.examDialog = true;
            break;
          case 'deleteExam':
            this.$confirm("删除后不可恢复, 是否继续?", "提示", {
              confirmButtonText: "确定",
              cancelButtonText: "取消",
              type: "warning"
            }).then(() => {
              this.$http.post(globalConfig.server + 'exam/delete/' + this.examId).then((res) => {
                if (res.data.code === "30010") {
                  this.$notify.success({
                    title: '成功',
                    message: res.data.msg
                  });
                  this.params.page = 1;
                  this.getExamData();
                } else {
                  this.$notify.warning({
                    title: '警告',
                    message: res.data.msg
                  });
                }
              });
            }).catch(() => {
              this.$message({
                type: "info",
                message: "已取消删除"
              });
            });
            break;
          case 'manageExaminee':
            this.examineeDialog = true;
            this.getExamDetail();
            break;

          case 'informExaminee':

            break;


        }
      },
      //关闭右键菜单
      closeMenu() {
        this.show = false;
      },
      //右键参数
      contextMenuParam(event) {
        let e = event || window.event;
        this.show = false;
        this.rightMenuX = e.clientX + document.documentElement.scrollLeft - document.documentElement.clientLeft;
        this.rightMenuY = e.clientY + document.documentElement.scrollTop - document.documentElement.clientTop;
        event.preventDefault();
        event.stopPropagation();
        this.$nextTick(() => {
          this.show = true
        })
      },
      // 组织架构
      openOrganizationModal() {
        this.organizationDialog = true
      },
      closeOrganization() {
        this.organizationDialog = false;
      },
      initial() {
        this.formExam = {
          rand: false,
          name: '',    //考试名称
          time: '',  //时间周期
          paper_id: '',    //试卷id
          category: '',  //试卷类型
          examinees: '',
        };
        this.examinees_name = '';
      },
    },

  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
  #examDialog {
    .vt_align {
      vertical-align: middle;
      vertical-align: -webkit-baseline-middle;
    }
    .tips {
      color: #409EFF;
      opacity: .7;
    }
    .dialog-footer {
      text-align: center;
      display: block;
      margin-top: 20px;
    }
  }
</style>
