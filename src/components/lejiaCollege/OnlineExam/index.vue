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
          <el-form>
            <el-form-item>
              <span>选择类型</span>
              <el-select v-model="formInline.type" size="mini" placeholder="请选择" clearable>
                <el-option v-for="item in 4" :key="item.id" label="C语言" :value="item.value"></el-option>
              </el-select>
            </el-form-item>
          </el-form>
          <el-form>
            <el-form-item style="margin-right: 10px;">
              <el-input placeholder="搜索关键字" v-model="search" size="mini" class="search_input">
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
              :data="quizData"
              :empty-text='rentStatus'
              v-loading="rentLoading"
              element-loading-text="拼命加载中"
              element-loading-spinner="el-icon-loading"
              element-loading-background="rgba(255, 255, 255, 0)"
              @row-dblclick="dblClickTable"
              @row-contextmenu='openContextMenu'
              style="width: 100%">
              <el-table-column
                prop="contract_num"
                label="总题数">
              </el-table-column>
              <el-table-column
                prop="address"
                label="试卷名称">
              </el-table-column>
              <el-table-column
                prop="house_type"
                label="总分值">
              </el-table-column>
              <el-table-column
                prop="deposit"
                label="总时长">
              </el-table-column>
              <el-table-column
                prop="price"
                label="类型">
              </el-table-column>
            </el-table>
          </div>
          <div class="blocks page" >
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
      <el-dialog :close-on-click-modal="false" :visible.sync="examDialog" title="新建考试" width="50%">
        <div>
          <div style="color: #6a8dfb;">新建考试信息</div>
          <div class="exam_content">
            <el-form size="mini" onsubmit="return false;" :model="formExam" label-width="70px">
              <el-row :gutter="50">
                <el-col :span="12">
                  <el-form-item label="场次名称" required>
                    <el-input v-model="formExam.name" placeholder="请输入场次"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="试卷类型" required>
                    <el-select v-model="formExam.name" size="mini" placeholder="请选择类型" clearable>
                      <el-option v-for="item in 4" :key="item.id" label="C语言" :value="item.value"></el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row :gutter="50">
                <el-col :span="12">
                  <el-form-item label="使用试卷">
                    <el-select v-model="formExam.name" size="mini" placeholder="请选择试卷" clearable>
                      <el-option v-for="item in 4" :key="item.id" label="C语言" :value="item.value"></el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-checkbox label="试卷随机"></el-checkbox>
              </el-row>
              <el-row :gutter="50">
                <el-col :span="12">
                  <el-form-item label="开考时间">
                    <el-date-picker v-model="formExam.name" type="datetime" placeholder="请选择"></el-date-picker>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="试卷时长">
                    <el-input placeholder="请输入分钟" v-model="formExam.name">
                      <template slot="append">分钟</template>
                    </el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row :gutter="50">
                <el-col :span="12">
                  <el-form-item label="开考后">
                    <el-input placeholder="请输入分钟" v-model="formExam.name">
                      <template slot="append">分钟</template>
                    </el-input>
                  </el-form-item>
                </el-col>
                <span class="vt_align">设定时间后不能在登陆考试系统</span>

              </el-row>
              <el-row :gutter="50">
                <el-col :span="12">
                  <el-form-item label="考生选择">
                    <el-select v-model="formExam.name" size="mini" placeholder="请选择类型" clearable>
                      <el-option v-for="item in 4" :key="item.id" label="C语言" :value="item.value"></el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
              </el-row>
            </el-form>
          </div>
          <span slot="footer" class="dialog-footer">
            <el-button size="small" type="primary" @click="saveExam" style="padding: 10px 20px;">保存</el-button>
          </span>
        </div>
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
  </div>
</template>

<script>
  import RightMenu from "../../common/rightMenu.vue"; //右键
  export default {
    name: "index",
    components: {RightMenu},
    data() {
      return {
        rightMenuX: 0,
        rightMenuY: 0,
        show: false,
        lists: [],
        rentStatus: ' ',
        rentLoading: false,
        formInline: {
          type: ""
        },
        params: {
          page: 1,
          limit:10
        },
        totalNum: 0,
        search: "",
        quizData: [],
        examType: [
          {id: 1, name: "新员工入职"},
          {id: 2, name: "初级晋升考试"},
          {id: 3, name: "中级晋升考试"}
        ],
        examDialog: false,
        testPaperDialog: false,
        examTypeDialog: false,
        formExam: {
          name: "",
          description: ""
        },
        currentPage: 1
      };
    },
    mounted() {
      this.getTestPaperData();
    },
    watch: {},
    methods: {
      saveExam() {
        this.examDialog = false;
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
            this.testPaperDialog = true;
            break;
          case "examDialog":
            this.examDialog = true;
            break;
        }
      },
      getTestPaperData() {
        this.$http.get(globalConfig.server+ 'exam/paper', {params: this.params}).then((res)=>{
          if(res.data.code === ''){

          }else{

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
    .el-dialog__title {
      color: #6a8dfb !important;
    }
    .exam_content {
      border: 1px solid #dfe6fb;
      padding: 10px;
    }
    .vt_align {
      vertical-align: middle;
      vertical-align: -webkit-baseline-middle;
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
