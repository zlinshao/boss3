<template>
  <div @click="show=false" @contextmenu="closeMenu">
    <div>
      <div class="highRanking" style=" position: absolute; top: 120px; right: 20px;">
        <div class="highSearch">
          <el-form :inline="true" onsubmit="return false" size="medium">
            <el-form-item>
              <el-input placeholder="标题" v-model="form.search" @keyup.enter.native="search" size="mini"
                        clearable>
                <el-button slot="append" icon="el-icon-search" @click="search"></el-button>
              </el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" size="mini" @click="highGrade">高级</el-button>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" size="mini" @click="replierManageDialog=true;">
                <i class="iconfont icon-baomingzhong-" style="font-size: 14px;"></i> 分发问答
              </el-button>
            </el-form-item>
            <el-form-item style="margin-right: 20px;">
              <el-button type="primary" size="mini" @click="questionTypeDialog=true;">
                <i class="el-icon-setting" style="font-size: 15px;"></i> 问题类型
              </el-button>
            </el-form-item>
          </el-form>
        </div>
      </div>
      <div class="highRanking">
        <div class="filter high_grade" :class="isHigh? 'highHide':''" style=" margin-top: -40px;">
          <el-form :inline="true" onsubmit="return false" :model="form" size="mini" label-width="100px">
            <div class="filterTitle">
              <i class="el-icons-fa-bars"></i>&nbsp;&nbsp;高级搜索
            </div>
            <el-row class="el_row_border">
              <el-col :span="12">
                <el-row>
                  <el-col :span="8">
                    <div class="el_col_label">问题类型</div>
                  </el-col>
                  <el-col :span="16" class="el_col_option">
                    <el-form-item>
                      <el-select v-model="form.type" placeholder="请选择" clearable>
                        <el-option v-for="item in questionTypeData" :key="item.id" :label="item.name"
                                   :value="item.id">{{item.name}}
                        </el-option>
                      </el-select>
                    </el-form-item>
                  </el-col>
                </el-row>
              </el-col>
              <el-col :span="12">
                <el-row>
                  <el-col :span="8">
                    <div class="el_col_label">被分配部门</div>
                  </el-col>
                  <el-col :span="16" class="el_col_option">
                    <el-form-item>
                      <el-input readonly="" v-model="departname" @focus="openOrganizationModal('depart')"
                                placeholder="点击选择">
                        <template slot="append">
                          <div style="cursor: pointer;" @click="emptyDepart">清空</div>
                        </template>
                      </el-input>
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
          <div class="blueTable">
            <el-table
              :data="tableData"
              :empty-text='tableStatus'
              v-loading="tableLoading"
              element-loading-text="拼命加载中"
              element-loading-spinner="el-icon-loading"
              element-loading-background="rgba(255, 255, 255, 0)"
              @selection-change="handleSelectionChange"
              @row-contextmenu='openContextMenu'
              @row-dblclick="dblClickTable"
              style="width: 100%">
              <el-table-column
                type="selection"
                width="65">
              </el-table-column>
              <el-table-column
                prop="create_time"
                label="创建时间">
              </el-table-column>
              <el-table-column
                prop="title"
                label="标题">
                <template slot-scope="scope">
                  <span v-if="scope.row.title">{{scope.row.title}}</span>
                  <span v-else>暂无</span>
                </template>
              </el-table-column>
              <el-table-column
                prop="type.value"
                label="问题类型">
              </el-table-column>
              <el-table-column
                prop="asker.name"
                label="提问者">
                <template slot-scope="scope">
                  <span v-if="scope.row.is_anonymous">匿名</span>
                  <span v-else>{{scope.row.asker && scope.row.asker.name}}</span>
                </template>
              </el-table-column>
              <el-table-column
                prop="description"
                label="描述">
                <template slot-scope="scope">
                  <span v-if="scope.row.description">{{scope.row.description}}</span>
                  <span v-else>暂无</span>
                </template>
              </el-table-column>
              <el-table-column
                label="职位">
                <template slot-scope="scope">
                  <span v-if="scope.row.is_anonymous">匿名</span>
                  <span v-else-if="scope.row.asker.role.length<1">暂无</span>
                  <span v-for="v in scope.row.asker.role" v-else>{{v.display_name}}&nbsp;&nbsp;&nbsp;</span>
                </template>
              </el-table-column>
              <el-table-column
                label="部门">
                <template slot-scope="scope">
                  <span v-if="scope.row.is_anonymous">匿名</span>
                  <span v-else-if="scope.row.asker.org.length<1">暂无</span>
                  <span v-for="v in scope.row.asker.org" v-else>{{v.name}}&nbsp;&nbsp;&nbsp;</span>
                </template>
              </el-table-column>
              <el-table-column
                label="被分配部门">
                <template slot-scope="scope">
                  <span v-if="scope.row.replier_org.length<1">暂无</span>
                  <span v-for="v in scope.row.replier_org" v-else>{{v.name}}&nbsp;&nbsp;&nbsp;</span>
                </template>
              </el-table-column>
              <el-table-column
                label="状态">
                <template slot-scope="scope">
                  <el-tag type="success" v-if="scope.row.is_open">公开</el-tag>
                  <el-tag type="warning" v-if="scope.row.is_open==false">非公开</el-tag>
                  <el-tag type="warning" v-if="scope.row.is_drop">下架</el-tag>
                  <el-tag type="success" v-if="scope.row.is_drop==false">上架</el-tag>
                </template>
              </el-table-column>
            </el-table>
          </div>
          <div class="tableBottom">
            <div class="left">
              <el-pagination
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page="form.page"
                :page-size="form.limit"
                layout="total, prev, pager, next, jumper"
                :total="totalNum">
              </el-pagination>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div id="replierManageDialog">
      <el-dialog :close-on-click-modal="false" :visible.sync="replierManageDialog" title="回复信息" width="45%">
        <div style="margin-top: 20px;">
          <el-table
            ref="multipleTable"
            :data="tableReplierData"
            @selection-change="handleSelectionReplierChange"
            style="width: 100%">
            <el-table-column
              type="selection"
              width="65">
            </el-table-column>
            <el-table-column
              label="部门">
              <template slot-scope="scope">
                <span v-if="scope.row.department.name">{{scope.row.department.name}}</span>
                <span v-else>暂无</span>
              </template>
            </el-table-column>
            <el-table-column
              prop="replier"
              label="回复人">
              <template slot-scope="scope">
                <span v-for="v in scope.row.replier">{{v.name}}&nbsp;&nbsp;&nbsp;</span>
              </template>
            </el-table-column>
          </el-table>
        </div>
        <div class="tableBottom">
          <div class="left">
            <el-pagination
              @size-change="handleSizeReplierChange"
              @current-change="handleCurrentReplierChange"
              :current-page="formReplier.page"
              :page-size="formReplier.limit"
              layout="total, prev, pager, next, jumper"
              :total="totalReplierNum">
            </el-pagination>
          </div>
        </div>
        <span slot="footer" class="dialog-footer">
           <el-button size="mini" @click="replierManageDialog = false">取消</el-button>
           <el-button type="primary" size="mini" @click="distribute">确定</el-button>
        </span>
      </el-dialog>
    </div>
    <div id="questionTypeDialog">
      <el-dialog :close-on-click-modal="false" :visible.sync="questionTypeDialog" title="问题类型" width="45%">
        <el-button type="primary" size="mini" @click="questionTypeManageDialog=true;"
                   style="float: right;margin-bottom: 10px;margin-right: 10px;">
          新增
        </el-button>
        <div style="margin-top: 20px;">
          <el-table
            :data="questionTypeData"
            style="width: 100%">
            <el-table-column
              prop="replier"
              label="创建时间">
              <template slot-scope="scope">
                <span v-if="scope.row.create_time">{{scope.row.create_time}}</span>
                <span v-else>暂无</span>
              </template>
            </el-table-column>
            <el-table-column
              label="类型名称">
              <template slot-scope="scope">
                <span v-if="scope.row.name">{{scope.row.name}}</span>
                <span v-else>暂无</span>
              </template>
            </el-table-column>
            <el-table-column
              label="操作">
              <template slot-scope="scope">
                <span @click="editQuestionType(scope.row.id)"><i class="el-icon-edit"
                                                                 style="color: #409EFF;font-size: 16px;cursor: pointer;"></i></span>
                <span @click="deleteQuestionType(scope.row.id)" style="margin-left: 15px"><i class="el-icon-delete"
                                                                                             style="color: #409EFF;font-size: 16px;cursor: pointer;"></i></span>
              </template>
            </el-table-column>

          </el-table>
        </div>
        <div class="tableBottom">
          <div class="left">
            <el-pagination
              @size-change="handleSizeQuesTypeChange"
              @current-change="handleCurrentQuesTypeChange"
              :current-page="quesTypeForm.page"
              :page-size="quesTypeForm.limit"
              layout="total, prev, pager, next, jumper"
              :total="totalQuesTypeFormNum">
            </el-pagination>
          </div>
        </div>

      </el-dialog>
    </div>
    <div id="questionTypeManageDialog">
      <el-dialog :close-on-click-modal="false" :visible.sync="questionTypeManageDialog" :title="quesTypeTitle"
                 width="35%">
        <div style="margin-top: 20px;">
          <el-form size="mini" onsubmit="return false;" :model="quesTypeForm" label-width="100px">
            <el-row>
              <el-col :span="22">
                <el-form-item label="类型名称" required>
                  <el-input v-model="quesTypeForm.name" placeholder="请输入类型名称" clearable></el-input>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </div>
        <span slot="footer" class="dialog-footer">
          <el-button size="mini" @click="questionTypeManageDialog = false">取消</el-button>
          <el-button type="primary" size="mini" @click="quesTypeAdd">确定</el-button>
        </span>
      </el-dialog>
    </div>
    <Organization :organizationDialog="organizationDialog" :type="organizeType" @close="closeOrganization"
                  @selectMember="selectMember"></Organization>
    <RightMenu :startX="rightMenuX+'px'" :startY="rightMenuY+'px'" :list="lists" :show="show"
               @clickOperateMore="clickEvent"></RightMenu>
    <MessageCenterDetail :messageCenterDetailDialog="messageCenterDetailDialog" :messageCenterId="messageCenterId"
                         @close="closeModal"></MessageCenterDetail>
  </div>
</template>
<script>
  import RightMenu from '../../../common/rightMenu.vue';    //右键
  import Organization from "../../../common/organization.vue";
  import MessageCenterDetail from './messageCenterDetail.vue';  //详情

  export default {
    components: {Organization, RightMenu, MessageCenterDetail},
    data() {
      return {
        rightMenuX: 0,
        rightMenuY: 0,
        show: false,
        lists: [],
        tableData: [],
        form: {
          page: 1,
          limit: 12,
          search: '',
          department_id: '',
          type: '',
        },
        totalNum: 0,
        isHigh: false,
        tableStatus: ' ',
        tableLoading: false,
        departname: '',
        organizationDialog: false,
        organizeType: '',
        askAnswerIds: [],  //问答编号
        userIds: '',
        formReplier: {
          page: 1,
          limit: 12,
        },
        replierManageDialog: false,
        tableReplierData: [],
        tableReplierStatus: ' ',
        tableReplierLoading: false,
        totalReplierNum: 0,
        distributeIds: [],
        messageCenterId: '',
        messageCenterDetailDialog: false,

        questionTypeDialog: false,
        questionTypeData: [],
        questionTypeManageDialog: false,
        quesTypeForm: {
          name: '',
          page: 1,
          limit: 12,
        },
        questionTypeId: '',
        quesTypeTitle: '新增问题类型',
        totalQuesTypeFormNum: 0,
      };
    },
    activated() {
      this.getQuestionTypeData();
      this.getTableData();
      this.getReplierManageData();

    },
    watch: {
      replierManageDialog(val) {
        if (!val) {
          this.askAnswerIds = [];
          this.distributeIds = [];
          this.$refs.multipleTable.clearSelection();
        }
      },
      questionTypeManageDialog(val) {
        if (!val) {
          this.quesTypeTitle = '新增问题类型';
          this.questionTypeId = '';
          this.quesTypeForm.name = '';
        } else {
          if (this.questionTypeId) {
            this.$http.get(globalConfig.server + 'qa/question_type/' + this.questionTypeId).then((res) => {
              if(res.data.code === '70410'){
                this.quesTypeForm.name = res.data.data.name;
              }else{
                this.$notify.warning({
                  title: '警告',
                  message: res.data.msg
                });
              }
            });
          }
        }
      },
    },
    methods: {
      quesTypeAdd() {
        let header;
        if (this.questionTypeId) {
          header = this.$http.put(globalConfig.server + 'qa/question_type/' + this.questionTypeId, this.quesTypeForm);
        } else {
          header = this.$http.post(globalConfig.server + 'qa/question_type', this.quesTypeForm);
        }
        header.then((res) => {
          if (res.data.code === '70410') {
            this.$notify.success({
              title: '成功',
              message: res.data.msg
            });
            this.questionTypeManageDialog = false;
            this.getQuestionTypeData();
          } else {
            this.$notify.warning({
              title: '警告',
              message: res.data.msg
            });
          }
        });
      },
      editQuestionType(id) {
        this.questionTypeId = id;
        this.quesTypeTitle = '编辑问题类型';
        this.questionTypeManageDialog = true;
      },
      deleteQuestionType(id) {
        this.$confirm("删除后不可恢复, 是否继续?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }).then(() => {
          this.$http.put(globalConfig.server + 'qa/question_type/delete/' + id).then((res) => {
            if (res.data.code === "70410") {
              this.$notify.success({
                title: '成功',
                message: res.data.msg
              });
              this.getQuestionTypeData();
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
      },

      getQuestionTypeData() {
        this.$http.get(globalConfig.server + 'qa/question_type', {params: this.quesTypeForm}).then((res) => {
          if (res.data.code === '70410') {
            this.questionTypeData = res.data.data;
            this.totalQuesTypeFormNum = res.data.meta.num;
          }else{
            this.questionTypeData = [];
            this.totalQuesTypeFormNum = 0;
          }
        });
      },
      handleSelectionChange(val) {
        this.askAnswerIds = [];
        val.forEach((item) => {
          this.askAnswerIds.push(item.id);
        });
      },
      handleSelectionReplierChange(val) {
        this.distributeIds = [];
        val.forEach((item) => {
          this.distributeIds.push(item.id);
        });
      },
      search() {
        this.form.page = 1;
        this.getTableData();
      },
      getReplierManageData() {
        this.tableReplierStatus = ' ';
        this.tableReplierLoading = true;
        this.$http.get(globalConfig.server + 'qa/replier_manage', {params: this.formReplier}).then((res) => {
          this.tableReplierLoading = false;
          if (res.data.code === '70010') {
            this.tableReplierData = res.data.data;
            this.totalReplierNum = res.data.meta.num;  //记录总条数
            if (res.data.data.length < 1) {
              this.tableReplierStatus = '暂无数据';
              this.totalReplierNum = 0;
              this.tableReplierData = [];
            }
          } else {
            this.tableReplierStatus = '暂无数据';
            this.totalReplierNum = 0;
            this.tableReplierData = [];
          }
        });
      },
      getTableData() {
        this.tableStatus = ' ';
        this.tableLoading = true;
        this.$http.get(globalConfig.server + 'qa/back', {params: this.form}).then((res) => {
          this.tableLoading = false;
          this.isHigh = false;
          if (res.data.code === '70110') {
            this.tableData = res.data.data;
            this.totalNum = res.data.meta.num;  //记录总条数
            if (res.data.data.length < 1) {
              this.tableStatus = '暂无数据';
              this.totalNum = 0;
              this.tableData = [];
            }
          } else {
            this.tableStatus = '暂无数据';
            this.totalNum = 0;
            this.tableData = [];
          }
        });
      },
      //分发部门
      distribute() {
        this.$confirm('确认分配吗?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {

          this.$http.put(globalConfig.server + 'qa/back/distribute', {
            id: this.askAnswerIds,
            replier_org_id: this.distributeIds
          }).then((res) => {
            if (res.data.code === '70110') {
              this.replierManageDialog = false;
              this.$notify.success({
                title: '成功',
                message: res.data.msg
              });
              this.getTableData();
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
            message: '已取消分配'
          });
        });

      },
      handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
      },
      handleCurrentChange(val) {
        console.log(`当前页: ${val}`);
        this.form.page = val;
        this.getTableData();
      },
      handleSizeReplierChange(val) {
        console.log(`每页 ${val} 条`);
      },
      handleCurrentReplierChange(val) {
        console.log(`当前页: ${val}`);
        this.formReplier.page = val;
        this.getReplierManageData();
      },
      handleSizeQuesTypeChange(val) {
        console.log(`每页 ${val} 条`);
      },
      handleCurrentQuesTypeChange(val) {
        console.log(`当前页: ${val}`);
        this.quesTypeForm.page = val;
        this.getQuestionTypeData();
      },
      openOrganizationModal(val) {
        this.organizationDialog = true;
        if (val === 'staff') {
          this.organizeType = 'staff';
        } else {
          this.organizeType = 'depart';
        }
      },
      closeOrganization() {
        this.organizationDialog = false;
        this.organizeType = '';
      },
      selectMember(val) {
        if (this.organizeType === 'staff') {
          this.userIds = val[0].id;
          this.distribute();
        } else {
          this.departname = val[0].name;
          this.form.department_id = val[0].id;
        }
        this.organizeType = '';
      },
      emptyDepart() {
        this.departname = '';
        this.form.department_id = '';
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
          search: '',
          type: '',
          department_id: '',
        };
        this.departname = '';
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
      //右键菜单
      openContextMenu(row, event) {
        this.messageCenterId = row.id;
        if (row.is_open && !row.is_drop) {
          //公开 上架
          this.lists = [
            {clickIndex: "deleteMessageCenter", headIcon: "el-icon-delete", label: "删除"},
            {clickIndex: "setOpen", headIcon: "el-icon-delete", label: "非公开", openStatus: 'close'},
            {clickIndex: "setDrop", headIcon: "el-icon-delete", label: "下架", dropStatus: 'drop'},
          ];
        } else if (row.is_open && row.is_drop) {
          //公开 下架
          this.lists = [
            {clickIndex: "deleteMessageCenter", headIcon: "el-icon-delete", label: "删除"},
            {clickIndex: "setOpen", headIcon: "el-icon-delete", label: "非公开", openStatus: 'close'},
            {clickIndex: "setDrop", headIcon: "el-icon-delete", label: "上架", dropStatus: 'undrop'},
          ];
        } else if (!row.is_open && row.is_drop) {
          //非公开 下架
          this.lists = [
            {clickIndex: "deleteMessageCenter", headIcon: "el-icon-delete", label: "删除"},
            {clickIndex: "setOpen", headIcon: "el-icon-delete", label: "公开", openStatus: 'open'},
            {clickIndex: "setDrop", headIcon: "el-icon-delete", label: "上架", dropStatus: 'undrop'},
          ];
        } else if (!row.is_open && !row.is_drop) {
          //非公开 上架
          this.lists = [
            {clickIndex: "deleteMessageCenter", headIcon: "el-icon-delete", label: "删除"},
            {clickIndex: "setOpen", headIcon: "el-icon-delete", label: "公开", openStatus: 'open'},
            {clickIndex: "setDrop", headIcon: "el-icon-delete", label: "下架", dropStatus: 'drop'},
          ];
        }
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
      clickEvent(val) {
        switch (val.clickIndex) {
          case 'deleteMessageCenter':
            this.deleteMessageCenter();
            break;
          case 'setOpen':
            var openStatus = val.openStatus;
            this.setOpenDropSatus(openStatus);
            break;
          case 'setDrop':
            var dropStatus = val.dropStatus;
            this.setOpenDropSatus(dropStatus);
            break;
        }
      },
      setOpenDropSatus(val) {
        this.$confirm('确认进行此操作吗?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$http.put(globalConfig.server + 'qa/back/change_status/' + this.messageCenterId, {operation: val}).then((res) => {
            if (res.data.code === '70110') {
              this.$notify.success({
                title: '成功',
                message: res.data.msg
              });
              this.getTableData();
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
            message: '已取消操作'
          });
        });

      },
      deleteMessageCenter() {
        this.$confirm("删除后不可恢复, 是否继续?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }).then(() => {
          this.$http.put(globalConfig.server + 'qa/back/delete/' + this.messageCenterId).then((res) => {
            if (res.data.code === "70110") {
              this.$notify.success({
                title: '成功',
                message: res.data.msg
              });
              this.search();
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
      },
      dblClickTable(row, event) {
        this.messageCenterId = row.id;
        this.messageCenterDetailDialog = true;
      },
      closeModal(val) {
        this.messageCenterId = '';
        this.messageCenterDetailDialog = false;
      },
    },
  };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped="">
  .tableBottom {
    padding: 8px;
    display: flex;
    justify-content: flex-end;
  }

  .el-table .cell {
    text-align: center;
  }
</style>
