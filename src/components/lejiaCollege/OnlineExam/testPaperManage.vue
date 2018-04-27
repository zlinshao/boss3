<template>
  <div @click="show=false" @contextmenu="closeMenu">
    <div class="highRanking" style=" position: absolute; top: 120px; right: 20px;">
      <div class="highSearch">
        <el-form :inline="true" size="mini">
          <el-form-item>
            <el-input placeholder="请输入标题" v-model="params.keywords" size="mini" clearable
                      @keyup.enter.native="getTestPaperData()">
              <el-button slot="append" icon="el-icon-search" @click="getTestPaperData()"></el-button>
            </el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" size="mini" @click="highGrade">高级</el-button>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" size="mini" @click="paperTypeDialog = true">
              <i class="iconfont icon-xinjianshijuan" style="font-size: 14px;"></i>&nbsp;新建试卷
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

          </el-row>
          <div class="btnOperate">
            <el-button size="mini" type="primary" @click="getTestPaperData">搜索</el-button>
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
            :data="testPaperTableData"
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
              label="试卷名称">
              <template slot-scope="scope">
                <span v-if="scope.row.name">{{scope.row.name}}</span>
                <span v-if="!scope.row.name">暂无</span>
              </template>
            </el-table-column>
            <el-table-column
              prop="category"
              label="试卷类型">
              <template slot-scope="scope">
                <span v-if="scope.row.category">{{scope.row.category}}</span>
                <span v-if="!scope.row.category">暂无</span>
              </template>
            </el-table-column>
            <el-table-column
              prop="count"
              label="总题数">
              <template slot-scope="scope">
                <span v-if="scope.row.count">{{scope.row.count}}</span>
                <span v-if="!scope.row.count">暂无</span>
              </template>
            </el-table-column>
            <el-table-column
              prop="score"
              label="总分值">
              <template slot-scope="scope">
                <span v-if="scope.row.score">{{scope.row.score}}</span>
                <span v-if="!scope.row.score">暂无</span>
              </template>
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
    <div id="paperTypeDialog">
      <el-dialog :close-on-click-modal="false" :visible.sync="paperTypeDialog" title="新建试卷" width="30%">
        <el-form :model="paperTypeForm" onsubmit="return false;" label-width="100px">
          <el-row>
            <el-form-item label="试卷类型" required>
              <el-select v-model="paperTypeForm.category" id="testPaperType" size="mini" placeholder="请选择" clearable>
                <el-option v-for="item in examType" :key="item.id" :label="item.dictionary_name" :value="item.id">
                  {{item.dictionary_name}}
                </el-option>
              </el-select>
            </el-form-item>
          </el-row>
          <el-row>
            <el-form-item label="试卷名称" required>
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
    <Organization :organizationDialog="organizationDialog" @close="closeOrganization"></Organization>
  </div>
</template>

<script>
  import RightMenu from '../../common/rightMenu.vue'    //右键
  import Organization from '../../common/organization.vue'

  export default {
    components: {RightMenu, Organization},
    name: 'testpaper-manage',
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
        testPaperTableData: [],
        isHigh: false,
        //考试列表分页搜索
        params: {
          page: 1,
          limit: 10,
          keywords: '',
          type: ''
        },
        examType: [],
        testPaperDialog: false, //新建试卷模态框
        paperTypeDialog: false,  //新建试卷 选择类型模态框

        examinees_name: '',//新建考试报名考生
        // 新建试卷 类型和名称
        paperTypeForm: {
          category: '',
          name: '',
        },
        paperId: '', //新增成功后的试卷id, 用于自己录入的时候使用
        testPaperId: '',
      };
    },

    mounted() {
      this.getTestPaperData();
      this.getDictionary();
    },
    activated() {
      this.getTestPaperData();
      this.getDictionary();
    },
    watch: {
      paperTypeDialog(val) {
        if (val) {
          this.initial();
        }
      },
    },
    methods: {
      // 高级
      highGrade() {
        this.isHigh = !this.isHigh;
      },
      // 重置
      resetting() {
        this.isHigh = false;

      },
      dblClickTable() {

      },
      paperTypeBtn() {
        if (!this.paperTypeForm.category) {
          this.$notify.warning({
            title: '警告',
            message: '试卷类型不能为空'
          });
          return;
        }
        if (!this.paperTypeForm.name) {
          this.$notify.warning({
            title: '警告',
            message: '试卷名称不能为空'
          });
          return;
        }
        this.$http.post(globalConfig.server + 'exam/paper', this.paperTypeForm).then((res) => {
          if (res.data.code === '36010') {
            this.paperTypeDialog = false;
            this.testPaperDialog = true;
            this.$notify.success({
              title: '成功',
              message: res.data.msg
            });
            this.paperId = res.data.data;
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
        var type_name = $('#testPaperType').val();
        this.$router.push({
          path: "/batchQuestions",
          query: {name: this.paperTypeForm.name, type_id: this.paperTypeForm.category, type_name: type_name}
        });
      },
      myselfQuestion() {
        this.testPaperDialog = false;
        this.$router.push({
          path: "/myselfQuestions",
          query: {name: this.paperTypeForm.name, paper_id: this.paperId}
        });
      },
      getTestPaperData() {
        this.tableStatus = " ";
        this.tableLoading = true;
        this.$http.get(globalConfig.server + 'exam/paper', {params: this.params}).then((res) => {
          this.tableLoading = false;
          if (res.data.code === '36000') {
            this.testPaperTableData = res.data.data.data;
            this.totalNum = res.data.data.count;
          } else {
            this.testPaperTableData = [];
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
        this.testPaperId = row.id;
        this.lists = [
          {
            clickIndex: "editTestPaper",
            headIcon: "el-icon-edit",
            label: "编辑试卷"
          },
          {
            clickIndex: "deleteTestPaper",
            headIcon: "el-icon-delete",
            label: "删除试卷"
          },
          {
            clickIndex: "lookTestPaper",
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
      //右键回调事件
      clickEvent(index) {
        switch (index) {
          case 'editTestPaper':
            this.$router.push({path: "/configExam", query: {id: this.testPaperId }});
            break;
          case 'deleteTestPaper':
            this.$confirm("删除后不可恢复, 是否继续?", "提示", {
              confirmButtonText: "确定",
              cancelButtonText: "取消",
              type: "warning"
            }).then(() => {
              this.$http.post(globalConfig.server+ 'exam/paper/delete/'+this.testPaperId).then((res)=>{
                if(res.data.code==='36000'){
                  this.$notify.success({
                    title: "成功",
                    message: res.data.msg
                  });
                  this.getTestPaperData();
                }else{
                  this.$notify.warning({
                    title: "警告",
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
          case 'lookTestPaper':
            this.$router.push({path: "/previewExam"});
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
        // 新建试卷 类型和名称
        this.paperTypeForm = {
          type: '',
          name: '',
        };

      },
    },

  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
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
