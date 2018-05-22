<template>
  <div @click="show=false" @contextmenu="closeMenu">
    <div class="highRanking" style=" position: absolute; top: 120px; right: 20px;">
      <div class="highSearch">
        <el-form :inline="true" size="mini">
          <el-form-item>
            <el-input placeholder="标题" v-model="params.search" size="mini" clearable
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
                  <div class="el_col_label">调查状态</div>
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
      <div>
        <div>
          <el-table
            :data="tableData"
            :empty-text='tableStatus'
            v-loading="tableLoading"
            element-loading-text="拼命加载中"
            element-loading-spinner="el-icon-loading"
            element-loading-background="rgba(255, 255, 255, 0)"
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
              label="问卷名称">
              <template slot-scope="scope">
                <span v-if="scope.row.paper && scope.row.paper.name">{{scope.row.paper && scope.row.paper.name}}</span>
                <span v-if="!(scope.row.paper && scope.row.paper.name)">暂无</span>
              </template>
            </el-table-column>
            <el-table-column
              label="发布人">
              <template slot-scope="scope">
                <span v-if="(scope.row.simple_staff && scope.row.simple_staff.real_name)">{{scope.row.simple_staff.real_name}}</span>
                <span v-else>暂无</span>
              </template>
            </el-table-column>
            <el-table-column
              prop="create_time"
              label="发布时间">
              <template slot-scope="scope">
                <span v-if="scope.row.create_time">{{scope.row.create_time}}</span>
                <span v-else>暂无</span>
              </template>
            </el-table-column>
            <el-table-column
              prop="start_time"
              label="开始时间">
              <template slot-scope="scope">
                <span v-if="scope.row.start_time">{{scope.row.start_time}}</span>
                <span v-else>暂无</span>
              </template>
            </el-table-column>
            <el-table-column
              prop="duration"
              label="有效期(天)">
              <template slot-scope="scope">
                <span v-if="scope.row.duration">{{scope.row.duration}}</span>
                <span v-else>暂无</span>
              </template>
            </el-table-column>
            <el-table-column
              label="回复量">
              <template slot-scope="scope">
                <span v-if="scope.row.finished_count != null">{{scope.row.finished_count}}</span>
                <span v-else>暂无</span>
              </template>
            </el-table-column>
            <el-table-column
              prop="examinees_count"
              label="调查对象(人数)">
              <template slot-scope="scope">
                <span v-if="scope.row.examinees_count != null">{{scope.row.examinees_count}}</span>
                <span v-else>暂无</span>
              </template>
            </el-table-column>
            <el-table-column
              prop="status"
              label="调查状态">
              <template slot-scope="scope">
                <el-button v-if="scope.row.status === 1" type="primary" size="mini">未开始</el-button>
                <el-button v-if="scope.row.status === 2" type="warning" size="mini">已开始</el-button>
                <el-button v-if="scope.row.status === 3" type="info" size="mini">已结束</el-button>
                <span v-if="!scope.row.status">暂无</span>
              </template>
            </el-table-column>
            <el-table-column
              label="操作">
              <template slot-scope="scope">
                <span @click="seeNaireResult(scope.row.id)" style="cursor: pointer;color: #6a8dfb;">查看统计结果</span>
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
      <el-dialog :close-on-click-modal="false" :visible.sync="examDialog" :title="examTitle" width="30%">
        <div>
          <div class="title">问卷调查</div>
          <div class="describe_border" style="padding: 25px 10px;">
            <el-form size="mini" onsubmit="return false;" :model="formExam" label-width="100px">
              <el-row :gutter="30">
                <el-col :span="22">
                  <el-form-item label="标题" required>
                    <el-input v-model="formExam.name" size="mini" placeholder="请输入调查名称" clearable></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="22">
                  <el-form-item label="使用问卷" required>
                    <el-select v-model="formExam.paper_id" size="mini" placeholder="请选择问卷" clearable>
                      <el-option v-for="item in useTestPapers" :key="item.id" :label="item.name" :value="item.id">
                        {{item.name}}
                      </el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :span="22">
                  <el-form-item label="开始时间" required>
                    <el-date-picker v-model="formExam.start_time" type="datetime" placeholder="请选择"
                                    value-format="yyyy-MM-dd HH:mm:ss"></el-date-picker>
                  </el-form-item>
                </el-col>
                <el-col :span="22">
                  <el-form-item label="有效期" required>
                    <el-input placeholder="请输入天数" v-model="formExam.duration">
                      <template slot="append">天</template>
                    </el-input>
                  </el-form-item>
                </el-col>
                <!--<el-col :span="20">-->
                <!--<el-form-item label="调查对象">-->
                <!--<el-input v-model="selectExaminees" @focus="openOrganize" size="mini" placeholder="请选择调查对象">-->
                <!--<template slot="append">-->
                <!--<div style="cursor: pointer;" @click="emptyExaminees">清空</div>-->
                <!--</template>-->
                <!--</el-input>-->
                <!--</el-form-item>-->
                <!--</el-col>-->
              </el-row>
            </el-form>
          </div>
          <span slot="footer" class="dialog-footer">
            <el-button size="small" @click="examDialog = false;examId = '';">取消</el-button>
            <el-button size="small" type="primary" @click="saveExam">保存</el-button>
          </span>
        </div>
      </el-dialog>
    </div>
    <div id="examineeDialog">
      <el-dialog :close-on-click-modal="false" :visible.sync="examineeDialog" title="调查对象" width="45%">
        <div>
          <el-row :gutter="10">
            <el-col :span="22">
              <el-input size="mini" placeholder="请选择调查对象" v-model="selectExaminees" readOnly @focus="openOrganize">
                <!--<template slot="append">-->
                  <!--<div style="cursor: pointer;" @click="emptyExaminees">清空</div>-->
                <!--</template>-->
              </el-input>
            </el-col>
            <!--<el-col :span="6">-->
              <!--<el-button type="primary" size="mini" @click="addExaminees">新增</el-button>-->
            <!--</el-col>-->
          </el-row>
        </div>
        <div style="margin-top: 20px;">
          <el-table
            :data="examineesPageData"
            :empty-text='tableStatus'
            v-loading="tableLoading"
            element-loading-text="拼命加载中"
            element-loading-spinner="el-icon-loading"
            element-loading-background="rgba(255, 255, 255, 0)"
            style="width: 100%">
            <el-table-column width="65">
              <template slot-scope="scope">
                <el-checkbox :label="scope.row.pivot.examinee_id" v-model="examinees"></el-checkbox>
              </template>
            </el-table-column>
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
          <div class="block pages" style="margin-right: 50px;">
            <el-pagination
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
              :current-page="params.page"
              :page-size="12"
              layout="total, prev, pager, next, jumper"
              :total="examineesCount">
            </el-pagination>
          </div>
        </div>
        <span slot="footer" class="dialog-footer">
            <el-button size="small" type="primary" @click="deleteExaminess">删除</el-button>
          </span>
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
          status: '',   //考试状态
        },
        //考试状态
        examStatus: [
          {id: 1, name: '未开始'},
          {id: 2, name: '已开始'},
          {id: 3, name: '已结束'},
        ],
        examDialog: false,  //新建考试模态框
        //新增问卷调查
        formExam: {
          name: '',    //考试名称
          start_time: '',  //时间周期
          duration: '',  //有效期
          paper_id: '',    //问卷id
          examinees: [],
        },
        examiness_name: [],
        examineesCount: 0,
        selectExaminees: '',
        examineeDialog: false,
        examId: '', //考试场次的id
        useTestPapers: [],
        examineesData: [],
        examineesPageData: [],

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
        examinees: [],
      };
    },
    mounted() {
      this.getExamData();
      this.getPaperData();
    },
    watch: {
      examDialog(val) {
        if (val) {
          this.initial();
          this.getPaperData();
          if (this.examId) {
            this.examTitle = '编辑调查';
            this.getExamDetail();
          } else {
            this.examTitle = '新建调查';
          }
        }
      },
      examineeDialog(val) {
        if (!val) {
          this.examineesData = [];
        }
      }
    },
    methods: {
      deleteExaminess() {
        this.$confirm('确认移除该调查对象吗?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$http.post(globalConfig.server + 'questionnaire/banish/' + this.examId, {examinees: this.examinees}).then((res) => {
            if (res.data.code === '30010') {
              this.$notify.success({
                title: '成功',
                message: res.data.msg
              });
              this.getExamDetail();
            } else {
              this.$notify.warning({
                title: '警告',
                message: res.data.msg
              });
            }
          });
        }).catch(() => {
          this.$notify.info({
            title: '提示',
            message: '已取消移除'
          });
        });
      },
      seeNaireResult(id) {
        this.$router.push({path: '/lookNaire', query: {id: id}});
      },
      getPaperData() {
        this.$http.get(globalConfig.server + 'exam/paper?qtn=1', {params: this.params}).then((res) => {
          this.tableLoading = false;
          this.isHigh = false;
          if (res.data.code === '36000') {
            this.useTestPapers = res.data.data.data;
          } else {
            this.$notify.warning({
              title: '警告',
              message: res.data.msg
            });
          }
        });
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
      //打开选人组件
      openOrganize() {
        this.organizationDialog = true;
      },
      selectMember(val) {
        this.formExam.examinees = [];
        this.examiness_name = [];
        this.selectExaminees = '';
        val.forEach((item) => {
          if (typeof item.avatar != 'undefined') {
            //选的是人
            this.formExam.examinees.push(item.id);
            this.examiness_name.push(item.name);
          } else {
            //选的部门
            this.$http.get(globalConfig.server + 'manager/staff?is_recursion=1&page=1&limit=500&org_id=' + item.id).then((res) => {
              if (res.data.code === '10000') {
                let data = res.data.data.data;
                data.forEach((value) => {
                  this.formExam.examinees.push(value.id);
                  this.examiness_name.push(value.name);
                  this.selectExaminees = '';
                  this.selectExaminees = this.examiness_name.join(',');
                });
              }
            })
          }
        });
        this.selectExaminees = this.examiness_name.join(',');
        this.addExaminees();
      },
      emptyExaminees() {
        this.selectExaminees = '';
        this.examiness_name = '';
        this.formExam.examinees = [];
      },
      addExaminees() {
        this.$http.post(globalConfig.server + 'questionnaire/batch_enroll/' + this.examId, {examinees: this.formExam.examinees}).then((res) => {
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
        this.$http.get(globalConfig.server + 'questionnaire/' + this.examId).then((res) => {
          if (res.data.code === '30000') {
            let detail = res.data.data;
            if (detail) {
              this.formExam.name = detail.name;
              this.formExam.start_time = detail.start_time;
              this.formExam.duration = detail.duration;
              this.formExam.paper_id = detail.paper_id;
              //考生信息
              this.examineesData = detail.examinees;
              this.examineesCount = detail.examinees_count;

              if (detail.examinees.length > 0) {
                this.examineesPageData = detail.examinees[0];
              } else {
                this.examineesPageData = [];
              }
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
      //保存/新增考试
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
      handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
      },
      handleCurrentChange(val) {
        console.log(`当前页: ${val}`);
        this.examineesPageData = this.examineesData[val - 1];
      },
      //右键菜单
      openContextMenu(row, event) {
        this.examId = row.id;
        this.lists = [
          {
            clickIndex: "editExam",
            headIcon: "el-icon-edit",
            label: "编辑调查"
          },
          {
            clickIndex: "deleteExam",
            headIcon: "el-icon-delete",
            label: "删除调查"
          },
          {
            clickIndex: "manageExaminee",
            headIcon: "el-icon-view",
            label: "查看/添加调查对象"
          },
          // {
          //   clickIndex: "answer",
          //   headIcon: "el-icon-view",
          //   label: "调查作答"
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
              this.$http.post(globalConfig.server + 'questionnaire/delete/' + this.examId).then((res) => {
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
              this.$notify.info({
                title: "提示",
                message: "已取消删除"
              });
            });
            break;
          case 'manageExaminee':
            this.examineeDialog = true;
            this.getExamDetail();
            break;
          case 'answer':
            this.$router.push({path: 'answerNaire', query: {id: this.examId}});
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
          name: '',    //考试名称
          start_time: '',  //时间周期
          duration: '',  //有效期
          paper_id: '',    //问卷id
          examinees: '',
        };
        this.selectExaminees = '';
        this.examiness_name = '';
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
