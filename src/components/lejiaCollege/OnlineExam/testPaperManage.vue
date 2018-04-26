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
            </el-table-column>
            <el-table-column
              prop="category"
              label="试卷类型">
            </el-table-column>
            <el-table-column
              prop="question_count"
              label="总题数">
            </el-table-column>
            <el-table-column
              prop="score"
              label="总分值">
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
          category: '',
          name: '',
        },
        paperId: '', //新增成功后的试卷id, 用于自己录入的时候使用
      };
    },

    activated() {
      this.getTestPaperData();
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
      //右键回调事件
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

    },
    watch: {

    },
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>

</style>
