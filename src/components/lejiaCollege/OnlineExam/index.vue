<template>
  <div>
    <div id="onlineExam">
      <div class="tool">
        <div class="tool_left">
          <el-button type="success" size="mini" @click="openModalDialog('examDialog')">
            <i class="iconfont icon-jinrukaoshi" style="font-size: 14px;"></i>&nbsp;新建考试
          </el-button>
          <el-button type="danger" size="mini" style="background: #fb4699;" @click="openModalDialog('testPaperDialog')">
            <i class="iconfont icon-xinjianshijuan" style="font-size: 14px;"></i>&nbsp;新建试卷
          </el-button>
        </div>
        <div class="tool_right">
          <el-form :inline="true" :model="params" onsubmit="return false;">
            <el-form-item label="选择类型">
              <el-select v-model="params.type" size="mini" placeholder="请选择" clearable>
                <el-option v-for="item in examType" :key="item.id" :label="item.dictionary_name" :value="item.id">
                  {{item.dictionary_name}}
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item style="margin-right: 15px;">
              <el-input placeholder="搜索关键字" v-model="params.keywords" size="mini" style="vertical-align: initial;">
                <el-button slot="append" icon="el-icon-search" class="search_button"></el-button>
              </el-input>
            </el-form-item>
          </el-form>
        </div>
      </div>
      <div class="main">
        <div class="myHouse">
          <div>
            <el-table
              :data="quizTableData"
              :empty-text='tableStatus'
              v-loading="tableLoading"
              element-loading-text="拼命加载中"
              element-loading-spinner="el-icon-loading"
              element-loading-background="rgba(255, 255, 255, 0)"
              @row-dblclick="dblClickTable"
              @row-contextmenu='openContextMenu'
              style="width: 100%">
              <el-table-column
                prop="question_count"
                label="总题数">
              </el-table-column>
              <el-table-column
                prop="name"
                label="试卷名称">
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
                prop="paper.category"
                label="类型">
              </el-table-column>
            </el-table>
          </div>
          <div class="block page" style="float: right;">
            <el-pagination
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
              :current-page="params.page"
              :page-size="10"
              layout="total, prev, pager, next, jumper"
              :total="totalNum">
            </el-pagination>
          </div>
        </div>
      </div>
    </div>
    <div id="examDialog">
      <el-dialog :close-on-click-modal="false" :visible.sync="examDialog" title="新建考试" width="45%">
        <div>
          <div class="title">新建考试信息</div>
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
                    <el-select v-model="formExam.type" size="mini" placeholder="请选择" clearable>
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
                      <el-option v-for="item in examType" :key="item.id" :label="item.name" :value="item.id">
                        {{item.name}}
                      </el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-checkbox label="试卷随机" style="line-height: 30px;"></el-checkbox>
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
                    <el-input placeholder="请输入分钟" v-model="formExam.limited_time">
                      <template slot="append">分钟</template>
                    </el-input>
                  </el-form-item>
                </el-col>
                <span class="vt_align tips">* 设定时间后不能再登陆考试系统</span>
              </el-row>
              <el-row :gutter="30">
                <el-col :span="12">
                  <el-form-item label="考生选择">
                    <el-input v-model="examinees_name" readonly @focus="chooseStaff" placeholder="请选择">
                      <template slot="append">
                        <div style="cursor: pointer;" @click="emptyStaff">清空</div>
                      </template>
                    </el-input>
                  </el-form-item>
                </el-col>
              </el-row>
            </el-form>
          </div>
          <span slot="footer" class="dialog-footer">
            <el-button size="small" @click="examDialog = false">取消</el-button>
            <el-button size="small" type="primary" @click="saveExam">保存</el-button>
          </span>
        </div>
      </el-dialog>
    </div>
    <div id="paperTypeDialog">
      <el-dialog :close-on-click-modal="false" :visible.sync="paperTypeDialog" title="新建试卷" width="30%">
        <el-form :model="paperTypeForm" onsubmit="return false;" label-width="100px">
          <el-row>
            <el-form-item label="试卷类型">
              <el-select v-model="paperTypeForm.type" size="mini" placeholder="请选择" clearable>
                <el-option v-for="item in examType" :key="item.id" :label="item.dictionary_name" :value="item.id">
                  {{item.dictionary_name}}
                </el-option>
              </el-select>
            </el-form-item>
          </el-row>
          <el-row>
            <el-form-item label="试卷名称">
              <el-input v-model="paperTypeForm.name" size="mini" placeholder="请输入名称" clearable></el-input>
            </el-form-item>
          </el-row>
        </el-form>
        <span slot="footer" class="dialog-footer">
            <el-button size="small" @click="paperTypeDialog = false">取消</el-button>
            <el-button size="small" type="primary" @click="paperTypeBtn">保存</el-button>
        </span>
      </el-dialog>
    </div>
    <div id="testPaperDialog">
      <el-dialog :close-on-click-modal="false" :visible.sync="testPaperDialog" title="新建试卷" width="38%"
                 style="margin-top:18vh">
        <el-row :gutter="30" style="margin-bottom:26px;">
          <el-col :span="12">
            <div class="import_questions" @click="importQuestion">
              <div><img src="../../../assets/images/examination/import_question.svg"><br/>批量导入试题</div>
            </div>
          </el-col>
          <el-col :span="12">
            <div class="import_questions" @click="myselfQuestion"
                 style="border: 1px solid #fda2cc;box-shadow: 0 0 3px 1px #fda2cc;">
              <div><img src="../../../assets/images/examination/self_entry.svg"><br/>自己录入</div>
            </div>
          </el-col>
        </el-row>
      </el-dialog>
    </div>
    <RightMenu :startX="rightMenuX+'px'" :startY="rightMenuY+'px'" :list="lists" :show="show"
               @clickOperate="clickEvent"></RightMenu>
    <Organization :organizationDialog="organizationDialog" :type="organizeType" @close="closeOrganization"
                  @selectMember="selectMember"></Organization>
  </div>
</template>

<script>
  import RightMenu from "../../common/rightMenu.vue"; //右键
  import Organization from "../../common/organization";

  export default {
    name: "index",
    components: {RightMenu, Organization},
    data() {
      return {
        organizationDialog: false,
        organizeType: '',
        rightMenuX: 0,
        rightMenuY: 0,
        show: false,
        lists: [],
        tableStatus: ' ',
        tableLoading: false,
        totalNum: 0,
        quizTableData: [],
        //考试列表分页搜索
        params: {
          page: 1,
          limit: 10,
          keywords: '',
          type: ''
        },
        examType: [],
        examDialog: false,  //新建考试模态框
        testPaperDialog: false, //新建试卷模态框
        paperTypeDialog: false,  //新建试卷 选择类型模态框
        //新增考试表单
        formExam: {
          name: '',    //考试名称
          start_time: '',  //开考时间
          duration: '',   //考试时长
          paper_id: '',    //试卷id
          examinees: [],  //报考考生id
          type: '',  //试卷类型
          limited_time: '', //开考后多长时间不能登陆
        },
        examinees_name: '',//新建考试报名考生
        // 新建试卷 类型和名称
        paperTypeForm: {
          type: '',
          name: '',
        }
      };
    },
    mounted() {
      this.getTestPaperData();
      this.getDictionary();
    },
    watch: {},
    methods: {
      saveExam() {
        this.$http.post(globalConfig.server + 'exam', this.formExam).then((res) => {
          if (res.data.code === '30010') {
            this.examDialog = false;
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
        });

      },
      getDictionary() {
        //试卷类型
        this.dictionary(613).then((res) => {
          this.examType = res.data;
        });
      },
      importQuestion() {
        this.testPaperDialog = false;
        this.$router.push({path: "/batchQuestions"});
      },
      myselfQuestion() {
        this.testPaperDialog = false;
        this.$router.push({path: "/myselfQuestions"});
      },
      dblClickTable() {
      },
      openModalDialog(val) {
        switch (val) {
          case "testPaperDialog":
            // this.testPaperDialog = true;
            this.paperTypeDialog = true;
            break;
          case "examDialog":
            this.examDialog = true;
            break;
        }
      },
      getTestPaperData() {
        this.tableStatus = " ";
        this.tableLoading = true;
        this.$http.get(globalConfig.server + 'exam', {params: this.params}).then((res) => {
          this.tableLoading = false;
          if (res.data.code === '30000') {
            this.quizTableData = res.data.data.data;
            this.totalNum = res.data.data.count;
          } else {
            this.quizTableData = [];
            this.totalNum = 0;
            this.tableStatus = "暂无数据";
          }
        });
      },
      handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
      },
      handleCurrentChange(val) {
        console.log(`当前页: ${val}`);
        this.params.page = val;
        this.getTestPaperData();
      },
      //右键菜单
      openContextMenu(row, event) {
        this.lists = [
          {
            clickIndex: "configExamDialog",
            headIcon: "el-icon-edit",
            label: "编辑试卷"
          },
          {
            clickIndex: "deleteExam",
            headIcon: "el-icons-fa-hdd-o",
            label: "删除试卷"
          },
          {
            clickIndex: "lookExamDialog",
            headIcon: "el-icons-fa-mail-reply",
            label: "预览试卷"
          }
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
      //右键回调时间
      clickEvent(index) {
        //右键修改
        if (index == "configExamDialog") {
          // var data = {ids: row.id, detail: 'port'};
          this.$router.push({path: "/configExam"});
        }
        if (index == "deleteExam") {
          this.$confirm("删除后不可恢复, 是否继续?", "提示", {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            type: "warning"
          })
            .then(() => {
            })
            .catch(() => {
              this.$message({
                type: "info",
                message: "已取消删除"
              });
            });
        }
        if (index == "lookExamDialog") {
          this.$router.push({path: "/previewExam"});
        }
      },
      closeOrganization() {
        this.organizationDialog = false;
        this.organizeType = '';
      },
      paperTypeBtn(){
        this.paperTypeDialog = false;
        this.testPaperDialog = true;
      },
      selectMember(val) {
        this.examinees_name = '';
        this.formExam.examinees = [];
        var names = [];
        if (val.length > 0) {
          val.forEach((item) => {
            this.formExam.examinees.push(item.id);
            names.push(item.name);
          });
        }
        this.examinees_name = names.join(',');
      },
      chooseStaff() {
        this.organizeType = 'staff';
        this.organizationDialog = true;
      },
      emptyStaff() {
        this.examinees_name = '';
        this.formExam.examinees = [];
      }
    }
  };
</script>

<style lang="scss" scoped>
  #onlineExam {
    .tool {
      .tool_right {
        .search_input {
          margin-left: 10px;
          /*border: 1px solid #6a8dfb;*/
          color: #6a8dfb;
          .search_button {
            /*background: #6a8dfb;*/
            /*color: #fff;*/
          }
        }
      }
    }
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

  #testPaperDialog {
    padding: 25px 15px;
    .import_questions {
      border: 1px solid #b4c6fd;
      -webkit-box-shadow: 0 0 3px 1px #b4c6fd;
      box-shadow: 0 0 3px 1px #b4c6fd;
      text-align: center;
      display: flex;
      align-items: center;
      justify-content: center;
      height: 180px;
      border-radius: 5px;
    }
  }
</style>
