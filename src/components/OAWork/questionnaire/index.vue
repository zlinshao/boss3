<template>
  <div @click="show=false" @contextmenu="closeMenu">
    <div id="onlineExam">
      <div class="tool">
        <div class="tool_left">
          <el-button type="danger" size="mini" style="background: #fb4699;" @click="openModalDialog('testPaperDialog')">
            <i class="iconfont icon-xinjianshijuan" style="font-size: 14px;"></i>&nbsp;新建任务
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
                prop="title"
                label="标题">
              </el-table-column>
              <el-table-column
                prop="house_type"
                label="发布人">
              </el-table-column>
              <el-table-column
                prop="deposit"
                label="发布时间">
              </el-table-column>
              <el-table-column
                prop="price"
                label="有效时间">
              </el-table-column>
              <el-table-column
                prop="price"
                label="任务对象">
              </el-table-column>
              <el-table-column
                prop="price"
                label="回复情况">
              </el-table-column>
              <el-table-column
                prop="price"
                label="状态">
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

    <div id="paperTypeDialog">
      <el-dialog :close-on-click-modal="false" :visible.sync="paperTypeDialog" title="新建问卷" width="30%">
        <el-form :model="paperTypeForm" onsubmit="return false;" label-width="100px">
          <el-row>
            <el-form-item label="标题" required>
              <el-input v-model="paperTypeForm.name" size="mini" placeholder="请输入问卷名称" clearable></el-input>
            </el-form-item>
          </el-row>
          <el-row>
            <el-form-item label="有效时间" required>
              <el-date-picker v-model="value1" type="datetime" placeholder="选择日期时间"></el-date-picker>
            </el-form-item>
          </el-row>
          <el-row>
            <el-form-item label="任务对象" required>
              <el-input v-model="examinees_name" @click.native="chooseStaff" size="mini" placeholder="请选择任务对象" clearable></el-input>
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
      <el-dialog :close-on-click-modal="false" :visible.sync="testPaperDialog" title="新建问卷" width="38%"
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
    <PreviewNaire :previewNaireDialog="previewNaireDialog"  @close="closepreviewNaireDialog"></PreviewNaire>
  </div>
</template>

<script>
import RightMenu from "../../common/rightMenu.vue"; //右键
import Organization from "../../common/organization";
import PreviewNaire from "./previewNaire/index.vue";
export default {
  name: "index",
  components: { RightMenu, Organization ,PreviewNaire },
  data() {
    return {
      organizationDialog: false,
      organizeType: "",
      previewNaireDialog:false,
      rightMenuX: 0,
      rightMenuY: 0,
      show: false,
      lists: [],
      rentStatus: " ",
      rentLoading: false,
      formInline: {
        type: ""
      },
      params: {
        page: 1,
        limit: 10
      },
      totalNum: 0,
      search: "",
      quizData: [
        {"title":"好的"},
        {"title":"好的"}
      ],
      examType: [
        { id: 1, name: "新员工入职" },
        { id: 2, name: "初级晋升考试" },
        { id: 3, name: "中级晋升考试" }
      ],
      testPaperDialog: false,
      examTypeDialog: false,
      paperTypeDialog: false,
      formExam: {
        name: "", //考试名称
        start_time: "", //开考时间
        duration: "", //考试时长
        paper_id: "", //问卷id
        examinees: [], //报考考生id
        type: "", //问卷类型
        limited_time: "" //开考后多长时间不能登陆
      },
      examinees_name: "",
      paperTypeForm: {
        name: ""
      },
      value1:"",
      currentPage: 1
    };
  },
  mounted() {
    this.getTestPaperData();
  },
  watch: {
    paperTypeDialog(val) {
      if (val) {
        this.initial();
      }
    }
  },
  methods: {
    myselfQuestion() {
      this.testPaperDialog = false;
      var type_name = $("#testPaperType").val();
      this.$router.push({
        path: "/myselfQuestions",
        query: {
          name: this.paperTypeForm.name,
          type_name: type_name
        }
      });
    },
    importQuestion() {
      this.testPaperDialog = false;
      var type_name = $("#testPaperType").val();
      this.$router.push({
        path: "/batchQuestions",
        query: {
          name: this.paperTypeForm.name,
          type_name: type_name
        }
      });
    },
    dblClickTable() {},
    openModalDialog(val) {
      switch (val) {
        case "testPaperDialog":
          // this.testPaperDialog = true;
          this.paperTypeDialog = true;
          break;
      }
    },
    getTestPaperData() {
      this.$http
        .get(globalConfig.server + "exam/paper", { params: this.params })
        .then(res => {
          if (res.data.code === "") {
          } else {
          }
        });
    },
    paperTypeBtn() {

      if (!this.paperTypeForm.name) {
        this.$notify.warning({
          title: "警告",
          message: "问卷名称不能为空"
        });
        return;
      }
      this.paperTypeDialog = false;
      this.testPaperDialog = true;
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
          label: "发布任务"
        }, 
        {
          clickIndex: "configExamDialog",
          headIcon: "el-icon-edit",
          label: "下架任务"
        }, 
        {
          clickIndex: "configExamDialog",
          headIcon: "el-icon-edit",
          label: "修改任务信息"
        },        
        {
          clickIndex: "configExamDialog",
          headIcon: "el-icon-edit",
          label: "编辑任务"
        },
        {
          clickIndex: "deleteExam",
          headIcon: "el-icons-fa-hdd-o",
          label: "删除任务"
        },
        {
          clickIndex: "lookExamDialog",
          headIcon: "el-icons-fa-mail-reply",
          label: "预览问卷"
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
      //关闭右键菜单
      closeMenu() {
        this.show = false;
      },
    //右键回调时间
    clickEvent(index) {
      //右键修改
      if (index == "configExamDialog") {
        // var data = {ids: row.id, detail: 'port'};
        this.$router.push({ path: "/configExam" });
      }
      if (index == "deleteExam") {
        this.$confirm("删除后不可恢复, 是否继续?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        })
          .then(() => {})
          .catch(() => {
            this.$message({
              type: "info",
              message: "已取消删除"
            });
          });
      }
      if (index == "lookExamDialog") {
        this.previewNaireDialog = true;
      }
    },
    closepreviewNaireDialog(){
      this.previewNaireDialog = false;
    },
    closeOrganization() {
      this.organizationDialog = false;
      this.organizeType = "";
    },
    selectMember(val) {
      this.examinees_name = "";
      this.formExam.examinees = [];
      var names = [];
      if (val.length > 0) {
        val.forEach(item => {
          this.formExam.examinees.push(item.id);
          names.push(item.name);
        });
      }
      this.examinees_name = names.join(",");
    },
    chooseStaff() {
      this.organizeType = "staff";
      this.organizationDialog = true;
    },
    initial() {
      this.formExam = {
        name: "", //考试名称
        start_time: "", //开考时间
        duration: "", //考试时长
        paper_id: "", //问卷id
        examinees: [], //报考考生id
        type: "", //问卷类型
        limited_time: "" //开考后多长时间不能登陆
      };
      this.examinees_name = ""; //新建考试报名考生
      // 新建问卷 类型和名称
      this.paperTypeForm = {
        name: ""
      };
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
