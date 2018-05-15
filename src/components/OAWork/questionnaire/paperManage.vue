<template>
  <div @click="show=false" @contextmenu="closeMenu">
    <div class="highRanking" style=" position: absolute; top: 120px; right: 20px;">
      <div class="highSearch">
        <el-form :inline="true" size="mini">
          <el-form-item>
            <el-input placeholder="问卷名称" v-model="params.search" size="mini" clearable
                      @keyup.enter.native="getTestPaperData()">
              <el-button slot="append" icon="el-icon-search" @click="getTestPaperData()"></el-button>
            </el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" size="mini" @click="paperDialog = true">
              <i class="iconfont icon-xinjianshijuan" style="font-size: 14px;"></i>&nbsp;新建问卷
            </el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
    <div class="main">
      <div>
        <div>
          <el-table
            :data="testPaperTableData"
            :empty-text='tableStatus'
            v-loading="tableLoading"
            element-loading-text="拼命加载中"
            element-loading-spinner="el-icon-loading"
            element-loading-background="rgba(255, 255, 255, 0)"
            @row-contextmenu='openContextMenu'
            style="width: 100%">
            <el-table-column
              prop="name"
              label="问卷名称">
              <template slot-scope="scope">
                <span v-if="scope.row.name">{{scope.row.name}}</span>
                <span v-if="!scope.row.name">暂无</span>
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
          </el-table>
        </div>
        <div class="block page" style="float: right;">
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
    <div id="paperDialog">
      <el-dialog :close-on-click-modal="false" :visible.sync="paperDialog" title="新建问卷" width="30%">
        <el-form :model="paperForm" onsubmit="return false;" label-width="100px">
          <el-row>
            <el-form-item label="问卷名称" required>
              <el-input v-model="paperForm.name" size="mini" placeholder="请输入名称" clearable></el-input>
            </el-form-item>
          </el-row>
        </el-form>
        <span slot="footer" class="dialog-footer">
            <el-button size="small" @click="paperDialog = false">取消</el-button>
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
    <Organization :organizationDialog="organizationDialog" @close="closeOrganization"></Organization>
  </div>
</template>

<script>
  import RightMenu from '../../common/rightMenu.vue'    //右键
  import Organization from '../../common/organization.vue'

  export default {
    components: {RightMenu, Organization},
    name: 'paper-manage',
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
          limit: 12,
          search: '',
          category: '',
        },
        testPaperDialog: false, //新建问卷录入题目方式模态框
        paperDialog: false,  //新建问卷模态框

        examinees_name: '',//新建考试报名考生
        // 新建问卷 类型和名称
        paperForm: {
          name: '',
          is_questionnaire: 1,
        },
        paperId: '', //新增成功后的问卷id, 用于自己录入的时候使用
        testPaperId: '',
      };
    },
    mounted() {
      this.getTestPaperData();
    },
    watch: {
      paperDialog(val) {
        if (val) {
          this.initial();
        }
      },
      testPaperDialog(val) {
        if (!val) {
          this.getTestPaperData();
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
        this.params.category = '';
        this.getTestPaperData();
      },
      paperTypeBtn() {
        if (!this.paperForm.name) {
          this.$notify.warning({
            title: '警告',
            message: '问卷名称不能为空'
          });
          return;
        }
        this.paperDialog = false;
        this.testPaperDialog = true;
      },
      //批量导入
      importQuestion() {
        this.testPaperDialog = false;
        var type_name = $('#testPaperType').val();
        this.$router.push({
          path: "/batchNaire",
          query: {name: this.paperForm.name}
        });
      },
      //自己录入
      myselfQuestion() {
        this.testPaperDialog = false;
        //创建问卷
        this.$http.post(globalConfig.server + 'exam/paper', this.paperForm).then((res) => {
          if (res.data.code === '36010') {
            this.paperId = res.data.data;
            this.getTestPaperData();
            if (this.paperId) {
              this.$router.push({
                path: "/myselfNaire",
                query: {paper_id: this.paperId, type: 'add'}
              });
            }
          } else {
            this.$notify.warning({
              title: '警告',
              message: res.data.msg
            });
          }
        });

      },
      getTestPaperData() {
        this.tableStatus = " ";
        this.tableLoading = true;
        this.$http.get(globalConfig.server + 'exam/paper?qtn=1', {params: this.params}).then((res) => {
          this.tableLoading = false;
          this.isHigh = false;
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
            label: "编辑问卷"
          },
          {
            clickIndex: "deleteTestPaper",
            headIcon: "el-icon-delete",
            label: "删除问卷"
          },
          {
            clickIndex: "previewTestPaper",
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
      //右键回调事件
      clickEvent(index) {
        switch (index) {
          case 'editTestPaper':
            this.$router.push({path: "/configNaire", query: {id: this.testPaperId}});
            break;
          case 'deleteTestPaper':
            this.$confirm("删除后不可恢复, 是否继续?", "提示", {
              confirmButtonText: "确定",
              cancelButtonText: "取消",
              type: "warning"
            }).then(() => {
              this.$http.post(globalConfig.server + 'exam/paper/delete/' + this.testPaperId).then((res) => {
                if (res.data.code === '36000') {
                  this.$notify.success({
                    title: "成功",
                    message: res.data.msg
                  });
                  this.getTestPaperData();
                } else {
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
          case 'previewTestPaper':
            this.$router.push({path: "/previewNaire", query: {id: this.testPaperId}});
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
        // 新建调查问卷
        this.paperForm = {
          name: '',
          is_questionnaire: 1,
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
