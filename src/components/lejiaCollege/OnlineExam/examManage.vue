<template>
  <div id="quesNaireManage" @click="show=false" @contextmenu="closeMenu">
    <div class="highRanking" style=" position: absolute; top: 120px; right: 20px;">
      <div class="highSearch">
        <el-form :inline="true" size="mini">
          <el-form-item>
            <el-input placeholder="考试场次" v-model="params.search" size="mini" clearable
                      @keyup.enter.native="search">
              <el-button slot="append" icon="el-icon-search" size="mini" @click="search"></el-button>
            </el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" size="mini" @click="highGrade">高级</el-button>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" size="mini" @click="examDialog = true;examId = '';">
              <i class="iconfont icon-jinrukaoshi" style="font-size: 14px;"></i>&nbsp;新建考试
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
            <el-button size="mini" type="primary" @click="search">搜索</el-button>
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
            @row-contextmenu='openContextMenu'
            style="width: 100%">
            <el-table-column
              prop="name"
              label="场次名称">
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
              label="开考时间">
              <template slot-scope="scope">
                <span v-if="scope.row.start_time">{{scope.row.start_time}}</span>
                <span v-if="!scope.row.start_time">暂无</span>
              </template>
            </el-table-column>
            <el-table-column
              prop="duration"
              label="考试时长">
              <template slot-scope="scope">
                <span v-if="scope.row.duration">{{scope.row.duration}}</span>
                <span v-if="!scope.row.duration">暂无</span>
              </template>
            </el-table-column>
            <el-table-column
              prop="examinees_count"
              label="总考生(人数)">
              <template slot-scope="scope">
                <span v-if="scope.row.examinees_count">{{scope.row.examinees_count}}</span>
                <span v-if="!scope.row.examinees_count">暂无</span>
              </template>
            </el-table-column>
            <el-table-column
              prop="status"
              label="考试状态">
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
      <el-dialog :close-on-click-modal="false" :visible.sync="examDialog" :title="examTitle" width="45%">
        <div>
          <div class="title">考试信息</div>
          <div class="describe_border" style="padding: 25px 10px;">
            <el-form size="mini" onsubmit="return false;" :model="formExam" label-width="100px">
              <el-row :gutter="30">
                <el-col :span="12">
                  <el-form-item label="场次名称" required>
                    <el-input v-model="formExam.name" placeholder="请输入场次"></el-input>
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
                <el-col :span="12">
                  <el-form-item label="开考时间" required>
                    <el-date-picker v-model="formExam.start_time" type="datetime" placeholder="请选择"
                                    value-format="yyyy-MM-dd HH:mm:ss"></el-date-picker>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="试卷时长" required>
                    <el-input placeholder="请输入分钟" v-model="formExam.duration">
                      <template slot="append">分钟</template>
                    </el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row :gutter="30">
                <el-col :span="12">
                  <el-form-item label="开考后">
                    <el-input placeholder="请输入分钟" v-model="formExam.late_tolerance">
                      <template slot="append">分钟</template>
                    </el-input>
                  </el-form-item>
                </el-col>
                <span class="vt_align tips">* 设定时间后不能再登陆考试系统</span>
              </el-row>
              <!--<el-row :gutter="30">-->
              <!--<el-col :span="12">-->
              <!--<el-form-item label="考生选择">-->
              <!--<el-input v-model="examinees_name" readonly @focus="chooseStaff" placeholder="请选择">-->
              <!--<template slot="append">-->
              <!--<div style="cursor: pointer;" @click="emptyStaff">清空</div>-->
              <!--</template>-->
              <!--</el-input>-->
              <!--</el-form-item>-->
              <!--</el-col>-->
              <!--</el-row>-->
            </el-form>
          </div>
          <span slot="footer" class="dialog-footer">
            <el-button size="small" @click="examDialog = false;examId = '';">取消</el-button>
            <el-button size="small" type="primary" @click="saveExam" :disabled="examDisabled">保存</el-button>
          </span>
        </div>
      </el-dialog>
    </div>
    <div id="examineeDialog">
      <el-dialog :close-on-click-modal="false" :visible.sync="examineeDialog" title="考生信息" width="45%">
        <div style="position: absolute;right: 10px;z-index: 1;">
          <el-form :inline="true" v-if="activeName==='first'">
            <el-form-item label="考生来源">
              <el-select v-model="examineesForm.from" size="mini" placeholder="请选择" clearable>
                <el-option v-for="item in sourceCategory" :key="item.id" :label="item.name" :value="item.id">
                  {{item.name}}
                </el-option>
              </el-select>
            </el-form-item>
          </el-form>
          <el-form :inline="true" v-if="activeName==='second'">
            <el-form-item label="考生状态">
              <el-select v-model="examineesForm.approved" size="mini" placeholder="请选择" clearable>
                <el-option v-for="item in statusCategory" :key="item.id" :label="item.name" :value="item.id">
                  {{item.name}}
                </el-option>
              </el-select>
            </el-form-item>
          </el-form>
        </div>
        <div>
          <el-tabs v-model="activeName" @tab-click="handleClick">
            <el-tab-pane label="本次考生" name="first">
              <div style="margin-top: 20px;">
                <el-table
                  :data="examineesData"
                  :empty-text='tableExamineesStatus'
                  v-loading="tableExamineesLoading"
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
                    prop="real_name"
                    label="考生姓名">
                    <template slot-scope="scope">
                      <span
                        v-if="scope.row.staff_info && scope.row.staff_info.name">{{scope.row.staff_info.name}}</span>
                      <span v-else>暂无</span>
                    </template>
                  </el-table-column>
                  <el-table-column
                    label="职位">
                    <template slot-scope="scope">
                      <span
                        v-if="scope.row.staff_info && scope.row.staff_info.role && scope.row.staff_info.role.length>0">
                        <span v-for="item in scope.row.staff_info.role">&nbsp;{{item.display_name}}&nbsp;</span></span>
                      <span v-else>暂无</span>
                    </template>
                  </el-table-column>
                  <el-table-column
                    label="部门">
                    <template slot-scope="scope">
                      <span
                        v-if="scope.row.staff_info && scope.row.staff_info.org && scope.row.staff_info.org.length>0">
                        <span v-for="item in scope.row.staff_info.org">&nbsp;{{item.name}}&nbsp;</span></span>
                      <span v-else>暂无</span>
                    </template>
                  </el-table-column>
                  <el-table-column
                    label="报名时间">
                    <template slot-scope="scope">
                      <span v-if="scope.row.enroll_time">{{scope.row.enroll_time}}</span>
                      <span v-else>暂无</span>
                    </template>
                  </el-table-column>
                  <el-table-column
                    label="状态">
                    <template slot-scope="scope">
                      <span v-if="scope.row.named_enroll_type">
                        <span v-if="scope.row.named_enroll_type=='指定'">邀请考试</span>
                        <span v-if="scope.row.named_enroll_type=='自选'">自主报名</span>
                      </span>
                      <span v-else>暂无</span>
                    </template>
                  </el-table-column>
                </el-table>
              </div>
              <div class="block pages" style="float: right;margin-right: 40px;">
                <el-pagination
                  @size-change="handleSizeExamineesChange"
                  @current-change="handleCurrentExamineesChange"
                  :current-page="examineesForm.page"
                  :page-size="examineesForm.limit"
                  layout="total, prev, pager, next, jumper"
                  :total="totalExamineesNum">
                </el-pagination>
              </div>
            </el-tab-pane>
            <el-tab-pane label="报名考生" name="second">
              <div style="margin-top: 20px;">
                <el-table
                  :data="examineesData"
                  :empty-text='tableExamineesStatus'
                  v-loading="tableExamineesLoading"
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
                    prop="real_name"
                    label="考生姓名">
                    <template slot-scope="scope">
                      <span
                        v-if="scope.row.staff_info && scope.row.staff_info.name">{{scope.row.staff_info.name}}</span>
                      <span v-else>暂无</span>
                    </template>
                  </el-table-column>
                  <el-table-column
                    label="职位">
                    <template slot-scope="scope">
                      <span
                        v-if="scope.row.staff_info && scope.row.staff_info.role && scope.row.staff_info.role.length>0">
                        <span v-for="item in scope.row.staff_info.role">&nbsp;{{item.display_name}}&nbsp;</span></span>
                      <span v-else>暂无</span>
                    </template>
                  </el-table-column>
                  <el-table-column
                    label="部门">
                    <template slot-scope="scope">
                      <span
                        v-if="scope.row.staff_info && scope.row.staff_info.org && scope.row.staff_info.org.length>0">
                        <span v-for="item in scope.row.staff_info.org">&nbsp;{{item.name}}&nbsp;</span></span>
                      <span v-else>暂无</span>
                    </template>
                  </el-table-column>
                  <el-table-column
                    label="报名时间">
                    <template slot-scope="scope">
                      <span v-if="scope.row.enroll_time">{{scope.row.enroll_time}}</span>
                      <span v-else>暂无</span>
                    </template>
                  </el-table-column>
                  <el-table-column
                    label="状态">
                    <template slot-scope="scope">
                      <span v-if="scope.row.named_enroll_status">{{scope.row.named_enroll_status}}</span>
                      <span v-else>暂无</span>
                    </template>
                  </el-table-column>
                </el-table>
              </div>
              <div class="block pages" style="float: right;margin-right: 40px;">
                <el-pagination
                  @size-change="handleSizeExamineesChange"
                  @current-change="handleCurrentExamineesChange"
                  :current-page="examineesForm.page"
                  :page-size="examineesForm.limit"
                  layout="total, prev, pager, next, jumper"
                  :total="totalExamineesNum">
                </el-pagination>
              </div>
            </el-tab-pane>
          </el-tabs>
        </div>
        <span slot="footer" class="dialog-footer clearfix" >
           <el-button type="primary" size="mini" style="float: left;" @click="openOrganize" v-if="activeName==='first'">新增</el-button>
            <el-button size="mini" type="primary" style="float: left;" @click="deleteExaminess" v-if="activeName==='first'">删除</el-button>
            <!--<el-button size="small" type="primary" @click="confirmSend" v-if="activeName==='first'">确认并发送消息</el-button>-->
          <el-button size="small" type="primary" @click="approved(1)" v-if="activeName==='second'">同意</el-button>
          <el-button size="small" type="primary" @click="approved(2)" v-if="activeName==='second'">拒绝</el-button>
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
        examTitle: '新建考试',
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
        //新增考试表单
        formExam: {
          rand: true,
          name: '',    //考试名称
          start_time: '',  //开考时间
          duration: '',   //考试时长
          paper_id: '',    //试卷id
          category: '',  //试卷类型
          late_tolerance: '', //开考后多长时间不能登陆
        },
        examineeDialog: false,
        examId: '', //考试场次的id
        useTestPapers: [],
        examineesData: [],
        selectExaminees: '',
        selectExamineeIds: [],
        examinees: [],
        examiness_name: [],
        loading: false,
        //考生来源
        sourceCategory: [
          {
            id: 179,
            name: '邀请考试'
          },
          {
            id: 180,
            name: '自主报名'
          }
        ],
        //考生状态
        statusCategory: [
          {
            id: 1,
            name: '审批中'
          },
          {
            id: 2,
            name: '已同意'
          },
          {
            id: 3,
            name: '已拒绝'
          }
        ],
        examineesForm: {
          page: 1,
          limit: 12,
          from: '',  //考生来源
          approved: 2  //是否已同意
        },
        totalExamineesNum: 0,
        tableExamineesStatus: ' ',
        tableExamineesLoading: false,
        examDisabled: false,
      };
    },
    mounted() {
      this.getExamData();
      this.getDictionary();
    },
    activated() {
      this.getExamData();
    },
    watch: {
      'examineesForm.from': {
        deep: true,
        handler(val, oldVal) {
          this.getExaminees();
        }
      },
      'examineesForm.approved': {
        deep: true,
        handler(val, oldVal) {
          this.getExaminees();
        }
      },
      examDialog(val) {
        if (val) {
          this.examDisabled = false;
          this.initial();
          if (this.examId) {
            this.examTitle = '编辑考试';
            this.getExamDetail();
          } else {
            this.examTitle = '新建考试';
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
      examineeDialog(val) {
        if (val) {
          this.emptyExaminees();
          this.examinees = [];
        }
      },
    },
    methods: {
      approved(val) {
        if (val === 1) {
          this.$confirm('您确认同意此考生参加本场考试？如确认，系统会已消息形式通知考生', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            this.$http.post(globalConfig.server + 'exam/lock/' + this.examId, {examinees: this.examinees}).then((res) => {
              if (res.data.code === '30000') {
                this.$notify.success({
                  title: '成功',
                  message: res.data.msg
                });
                this.getExaminees();
              } else {
                this.$notify.warning({
                  title: '警告',
                  message: res.data.msg
                });
              }
            }).catch(() => {
              this.$notify.info({
                title: '提示',
                message: '已取消发送'
              });
            });
          });
        } else {
          this.deleteExaminess();
        }
      },
      handleSelectionChange(val) {
        this.examinees = [];
        val.forEach((item) => {
          this.examinees.push(item.examinee_id);
        });
      },
      confirmSend() {
        this.$confirm('确认发送吗?确认后，该试卷的所有信息，包括试题、场次、考生设置，均不可再修改！系统会已消息形式通知考生', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$http.post(globalConfig.server + 'exam/lock/' + this.examId, {examinees: this.examinees}).then((res) => {
            if (res.data.code === '30000') {
              this.$notify.success({
                title: '成功',
                message: res.data.msg
              });
            } else {
              this.$notify.warning({
                title: '警告',
                message: res.data.msg
              });
            }
          }).catch(() => {
            this.$notify.info({
              title: '提示',
              message: '已取消发送'
            });
          });
        });
      },
      deleteExaminess() {
        this.$confirm('您是否确认删除该考生?如确认，删除后系统会已消息形式通知考生', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$http.post(globalConfig.server + 'exam/banish/' + this.examId, {examinees: this.examinees}).then((res) => {
            if (res.data.code === '30000') {
              this.$notify.success({
                title: '成功',
                message: res.data.msg
              });
              this.getExaminees();
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
      search() {
        this.params.page = 1;
        this.getExamData();
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
        // this.organizeType = 'staff';
      },
      selectMember(val) {
        this.examiness_name = [];
        this.selectExaminees = '';
        this.selectExamineeIds = [];
        let length = 0;
        val.forEach((item) => {
          this.loading = true;
          if (item.hasOwnProperty('avatar')) {
            //选的是人
            this.selectExamineeIds.push(item.id);
            this.examiness_name.push(item.name);
            length++;
            if (val.length === length) {
              this.addExaminees();
            }
          } else {
            //选的部门
            this.$http.get(globalConfig.server + 'manager/staff?is_recursion=1&page=1&limit=500&org_id=' + item.id).then((res) => {
              if (res.data.code === '10000') {
                let data = res.data.data.data;
                data.forEach((value) => {
                  this.selectExamineeIds.push(value.id);
                  this.examiness_name.push(value.name);
                  this.selectExaminees = '';
                  this.selectExaminees = this.examiness_name.join(',');
                });
                length++;
                if (val.length === length) {
                  this.addExaminees();
                }
              } else {
                length++;
                if (val.length === length) {
                  this.addExaminees();
                }
              }
            }).catch((err) => {
              length++;
              if (val.length === length) {
                this.addExaminees('error');
              }
            });
          }
        });
        this.selectExaminees = this.examiness_name.join(',');
      },
      emptyExaminees() {
        this.selectExaminees = '';
        this.selectExamineeIds = [];
        this.examiness_name = [];
      },
      addExaminees() {
        this.$http.post(globalConfig.server + 'exam/batch_enroll/' + this.examId, {examinees: this.selectExamineeIds}).then((res) => {
          this.loading = false;
          if (res.data.code === '30010') {
            this.$notify.success({
              title: '成功',
              message: res.data.msg
            });
            this.getExaminees();
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
              this.formExam.rand = detail.rand;
              this.formExam.start_time = detail.start_time;
              this.formExam.duration = detail.duration;
              this.formExam.category = detail.paper && detail.paper.category_id;
              this.formExam.late_tolerance = detail.late_tolerance;
              this.formExam.paper_id = detail.paper && detail.paper.id;
              // 考生信息
              // this.examineesData = detail.examinees;
            }
          } else {
            this.$notify.warning({
              title: '警告',
              message: res.data.msg
            });
          }
        });
      },
      //考试列表
      getExamData() {
        this.tableStatus = " ";
        this.tableLoading = true;
        this.$http.get(globalConfig.server + 'exam', {params: this.params}).then((res) => {
          this.tableLoading = false;
          this.isHigh = false;
          if (res.data.code === '30000') {
            this.tableData = res.data.data.data;
            this.totalNum = res.data.data.count;
          } else {
            this.tableData = [];
            this.totalNum = 0;
            this.tableStatus = "暂无数据";
            // this.$notify.warning({
            //   title: '警告',
            //   message: res.data.msg
            // });
          }
        });
      },
      //保存/新增试卷
      saveExam() {
        this.examDisabled = true;
        let header = '';
        if (this.examId) {
          header = this.$http.put(globalConfig.server + 'exam/' + this.examId, this.formExam);
        } else {
          header = this.$http.post(globalConfig.server + 'exam', this.formExam);
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
            this.examDisabled = false;
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
      handleSizeExamineesChange(val) {
        console.log(`每页 ${val} 条`);
      },
      handleCurrentExamineesChange(val) {
        console.log(`当前页: ${val}`);
        this.examineesForm.page = val;
        this.getExaminees();
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
              this.$notify.info({
                title: "提示",
                message: "已取消删除"
              });
            });
            break;
          case 'manageExaminee':
            this.examineeDialog = true;
            this.getExaminees();
            break;
        }
      },
      getExaminees() {
        this.tableExamineesStatus = " ";
        this.tableExamineesLoading = true;
        this.examineesForm.exam_id = this.examId;
        this.$http.get(globalConfig.server + 'exam/examinees', {params: this.examineesForm}).then((res) => {
          this.tableExamineesLoading = false;
          if (res.data.code === '30000') {
            this.examineesData = res.data.data.data;
            this.totalExamineesNum = res.data.data.count;
            if (res.data.data.data.length < 1) {
              this.examineesData = [];
              this.totalExamineesNum = 0;
              this.tableExamineesStatus = "暂无数据";
            }
          } else {
            this.examineesData = [];
            this.totalExamineesNum = 0;
            this.tableExamineesStatus = "暂无数据";
            this.$notify.warning({
              title: '警告',
              message: res.data.msg
            });
          }
        });
      },
      handleClick() {
        if (this.activeName === 'first') {
          this.examineesForm.from = '';
          this.examineesForm.approved = 2;
        } else {
          this.examineesForm.approved = '';
          this.examineesForm.from = 180;
        }
        this.getExaminees();
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
          rand: false,   //默认0 勾选之后为1
          name: '',    //考试名称
          start_time: '',  //开考时间
          duration: '',   //考试时长
          paper_id: '',    //试卷id
          category: '',  //试卷类型
          late_tolerance: '', //开考后多长时间不能登陆
        };

      },
    },
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
  .clearfix:before,
  .clearfix:after {
    display: table;
    content: "";
  }

  .clearfix:after {
    clear: both
  }
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
