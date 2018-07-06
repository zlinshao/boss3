<template>
  <div @click="show=false" @contextmenu="closeMenu">
    <div>
      <div class="highRanking" style=" position: absolute; top: 120px; right: 20px;">
        <div class="highSearch">
          <el-form :inline="true" onsubmit="return false" size="medium">
            <el-form-item>
              <el-input placeholder="组名/组长名称" v-model="form.search"
                        @keyup.enter.native="search" size="mini" clearable>
                <el-button slot="append" icon="el-icon-search" @click="search"></el-button>
              </el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" size="mini" @click="highGrade">高级</el-button>
            </el-form-item>
            <el-form-item>
              <el-dropdown @command="handleCommand">
                <el-button type="primary" size="mini">
                  <i class="iconfont icon-paixu" style="vertical-align: middle;font-size: 13px;"></i>
                  {{sortType}}<i class="el-icon-arrow-down el-icon--right"></i>
                </el-button>
                <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item command="2">时间排序</el-dropdown-item>
                  <el-dropdown-item command="0">目标业绩升序</el-dropdown-item>
                  <el-dropdown-item command="1">目标业绩降序</el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" size="mini" @click="achievementDialog=true;achievementId='';">
                新增目标业绩
              </el-button>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" size="mini" @click="exportData">导出</el-button>
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
                    <div class="el_col_label">片区</div>
                  </el-col>
                  <el-col :span="16" class="el_col_option">
                    <el-form-item>
                      <el-input readonly="" v-model="form.department_name" @focus="chooseDepart('search')"
                                placeholder="点击选择">
                        <template slot="append">
                          <div style="cursor: pointer;" @click="emptyDepart('search')">清空</div>
                        </template>
                      </el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
              </el-col>
              <el-col :span="12">
                <el-row>
                  <el-col :span="8">
                    <div class="el_col_label">搜索时间范围</div>
                  </el-col>
                  <el-col :span="16" class="el_col_option">
                    <el-form-item>
                      <el-date-picker
                        v-model="form.month[0]"
                        type="month"
                        value-format="yyyy-MM"
                        placeholder="开始月份">
                      </el-date-picker>
                      至
                      <el-date-picker
                        v-model="form.month[1]"
                        type="month"
                        value-format="yyyy-MM"
                        placeholder="截止月份">
                      </el-date-picker>
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
              @row-contextmenu='openContextMenu'
              style="width: 100%">
              <el-table-column
                label="小组名称"
                prop="department_name">
              </el-table-column>
              <el-table-column
                label="组长姓名"
                prop="leader_name">
                <template slot-scope="scope">
                  <span v-if="scope.row.leader_name">{{scope.row.leader_name}}</span>
                  <span v-else>暂无</span>
                </template>
              </el-table-column>
              <el-table-column
                label="目标业绩(万元)"
                prop="target">
              </el-table-column>
              <el-table-column
                label="统计周期"
                prop="month">
              </el-table-column>
              <el-table-column
                label="备注">
                <template slot-scope="scope">
                  <span v-if="scope.row.memo">{{scope.row.memo}}</span>
                  <span v-else>暂无</span>
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
    <div id="achievementDialog">
      <el-dialog :close-on-click-modal="false" :visible.sync="achievementDialog" :title="achievementTitle" width="30%">
        <el-form size="mini" onsubmit="return false;" :model="achievementForm" label-width="100px">
          <el-row>
            <el-col :span="20">
              <el-form-item label="统计月份" required>
                <el-date-picker
                  v-model="achievementForm.month"
                  type="month"
                  value-format="yyyy-MM"
                  placeholder="选择月">
                </el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :span="20">
              <el-form-item label="目标业绩金额" required>
                <el-input v-model="achievementForm.target" placeholder="请输入金额">
                  <el-button slot="append">万元</el-button>
                </el-input>
              </el-form-item>
            </el-col>
            <el-col :span="20">
              <el-form-item label="片区" required>
                <el-input v-model="achievementForm.department_name" placeholder="请点击选择" @focus="chooseDepart('dialog')">
                  <template slot="append">
                    <div style="cursor: pointer;" @click="emptyDepart('dialog')">清空</div>
                  </template>
                </el-input>
              </el-form-item>
            </el-col>
            <el-col :span="20">
              <el-form-item label="备注">
                <el-input
                  type="textarea"
                  :rows="2"
                  placeholder="请输入内容"
                  v-model="achievementForm.memo">
                </el-input>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button size="small" @click="achievementDialog = false;">取消</el-button>
          <el-button size="small" type="primary" @click="confirmAdd">保存</el-button>
        </span>
      </el-dialog>
    </div>
    <Organization :organizationDialog="organizationDialog" :type="organizeType" @close="closeOrganization"
                  @selectMember="selectMember"></Organization>
    <RightMenu :startX="rightMenuX+'px'" :startY="rightMenuY+'px'" :list="lists" :show="show"
               @clickOperate="clickEvent"></RightMenu>
  </div>
</template>
<script>
  import RightMenu from '../../common/rightMenu.vue';    //右键
  import Organization from '../../common/organization.vue';  //组织架构

  export default {
    components: {Organization, RightMenu},
    data() {
      return {
        rightMenuX: 0,
        rightMenuY: 0,
        show: false,
        lists: [],
        isHigh: false,
        tableData: [],
        totalNum: 0,
        tableStatus: ' ',
        tableLoading: false,
        form: {
          page: 1,
          limit: 12,
          org_id: '',  //部门搜索
          department_name: '',
          month: [],  //时间范围
          target_sort: '',  //排序  0 升序 1降序
          search: '',
        },
        organizationDialog: false,
        organizeType: '',
        currentStatus: '',

        achievementDialog: false,
        //管理目标业绩
        achievementForm: {
          month: '',
          target: '',
          org_id: '',
          memo: '',
          department_name: '',
        },
        achievementTitle: '',
        achievementId: '',
        sortType: '时间排序',
      };
    },
    activated() {
      this.getTableData();
    },
    watch: {
      achievementDialog(val) {
        if (val) {
          if (this.achievementId) {
            this.getDetail(this.achievementId);
            this.achievementTitle = '编辑目标业绩';
          } else {
            this.achievementTitle = '添加目标业绩';
          }
        } else {
          this.achievementId = '';
          this.achievementForm = {
            month: '',
            target: '',
            org_id: '',
            memo: '',
            department_name: '',
          };
        }
      },
    },
    methods: {
      // 导出
      exportData() {
        this.form.export = 1;
        this.$http.get(globalConfig.server + 'performance/index', {responseType: 'arraybuffer', params: this.form}).then((res) => { // 处理返回的文件流
          if (!res.data) {
            return;
          }
          console.log(res);
          let url = window.URL.createObjectURL(new Blob([res.data]));
          let link = document.createElement('a');
          link.style.display = 'a';
          link.href = url;
          link.setAttribute('download', 'excel.xls');
          document.body.appendChild(link);
          link.click();
        });
      },
      handleCommand(command) {
        if (command == 0) {
          this.sortType = '目标业绩升序';
          this.form.target_sort = 0;
        } else if (command == 1) {
          this.sortType = '目标业绩降序';
          this.form.target_sort = 1;
        } else {
          this.sortType = '时间排序';
          this.form.target_sort = '';
        }
        this.form.page = 1;
        this.getTableData();
      },
      getDetail(id) {
        this.$http.get(globalConfig.server + 'performance/index/' + id).then((res) => {
          if (res.data.code === '20020') {
            this.achievementForm.month = res.data.data.month;
            this.achievementForm.target = res.data.data.target;
            this.achievementForm.org_id = res.data.data.org_id;
            this.achievementForm.memo = res.data.data.memo;
            this.achievementForm.department_name = res.data.data.department_name;
          }
        });
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
        this.achievementId = row.id;
        this.lists = [
          {
            clickIndex: "edit",
            headIcon: "el-icon-edit",
            label: "编辑"
          },
          {
            clickIndex: "delete",
            headIcon: "el-icon-delete",
            label: "删除"
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
          case 'edit':
            this.achievementDialog = true;
            break;
          case 'delete':
            this.deleteData();
            break;
        }
      },
      deleteData() {
        this.$confirm("删除后不可恢复, 是否继续?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }).then(() => {
          this.$http.get(globalConfig.server + 'performance/index/delete/' + this.achievementId).then((res) => {
            if (res.data.code === "20040") {
              this.$notify.success({
                title: '成功',
                message: res.data.msg
              });
              this.achievementId = '';
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
      chooseDepart(val) {
        this.organizationDialog = true;
        this.organizeType = 'depart';
        this.currentStatus = val;
      },
      closeOrganization() {
        this.organizationDialog = false;
        this.organizeType = '';
        this.currentStatus = '';
      },
      selectMember(val) {
        if (this.currentStatus === 'search') {
          this.form.org_id = val[0].id;
          this.form.department_name = val[0].name;
        } else {
          this.achievementForm.org_id = val[0].id;
          this.achievementForm.department_name = val[0].name;
        }
        this.organizeType = '';
      },
      emptyDepart(val) {
        if (val === 'search') {
          this.form.department_name = '';
          this.form.org_id = '';
        } else {
          this.achievementForm.department_name = '';
          this.achievementForm.org_id = '';
        }
      },
      search() {
        this.form.page = 1;
        this.getTableData();
      },
      confirmAdd() {
        if (this.achievementId) {
          this.$http.put(globalConfig.server + 'performance/index/' + this.achievementId, this.achievementForm).then((res) => {
            if (res.data.code === '20030') {
              this.achievementDialog = false;
              this.$notify.success({
                title: '成功',
                message: res.data.msg
              });
              this.achievementId = '';
              this.getTableData();
            } else {
              this.$notify.warning({
                title: '警告',
                message: res.data.msg
              });
            }
          });
        } else {
          this.$http.post(globalConfig.server + 'performance/index', this.achievementForm).then((res) => {
            if (res.data.code === '20010') {
              this.achievementDialog = false;
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
        }
      },
      getTableData() {
        this.tableStatus = ' ';
        this.tableLoading = true;
        this.form.export = '';
        this.$http.get(globalConfig.server + 'performance/index', {params: this.form}).then((res) => {
          this.tableLoading = false;
          this.isHigh = false;
          if (res.data.code === '20000') {
            this.tableData = res.data.data.data;
            this.totalNum = res.data.data.count;  //记录总条数
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
      handleSizeChange(val) {
      },
      handleCurrentChange(val) {
        this.form.page = val;
        this.getTableData();
      },
      // 高级
      highGrade() {
        this.isHigh = !this.isHigh;
      },
      // 重置
      resetting() {
        this.form.org_id = '';
        this.form.department_name = '';
        this.form.month = [];
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
</style>
