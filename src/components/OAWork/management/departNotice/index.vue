<template>
  <div @click="show=false" @contextmenu="closeMenu">
    <div>
      <div class="highRanking" style=" position: absolute; top: 120px; right: 110px;">
        <div class="highSearch">
          <el-form :inline="true" onsubmit="return false" size="medium">
            <el-form-item>
              <el-input placeholder="公告内容" v-model="form.search" @keyup.enter.native="myData(1)" size="mini"
                        clearable>
                <el-button slot="append" icon="el-icon-search" @click="myData(1)"></el-button>
                <!--<el-button slot="append" icon="el-icons-fa-bars"></el-button>-->
              </el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" size="mini" @click="highGrade">高级</el-button>
            </el-form-item>
          </el-form>
          <el-button @click="openModalDialogx('noticeDialog')" class="sendnotice" size="mini" type="primary"
                     style="margin-right: -80px;">发布公告
          </el-button>
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
                    <div class="el_col_label">选择类别</div>
                  </el-col>
                  <el-col :span="16" class="el_col_option">
                    <el-form-item>
                      <el-select v-model="form.type" clearable placeholder="请选择类别">
                        <el-option v-for="(key,index) in forms" :label="key.name" :value="key.id"
                                   :key="index"></el-option>
                      </el-select>
                    </el-form-item>
                  </el-col>
                </el-row>
              </el-col>

            </el-row>
            <div class="btnOperate">
              <el-button size="mini" type="primary" @click="myData(1)">搜索</el-button>
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
              :empty-text='rentStatus'
              v-loading="rentLoading"
              element-loading-text="拼命加载中"
              element-loading-spinner="el-icon-loading"
              element-loading-background="rgba(255, 255, 255, 0)"
              @row-contextmenu='noticeMenu'
              style="width: 100%">
              <el-table-column
                label="类型">
                <template slot-scope="scope">
                  <span v-if="scope.row.type === 1">表彰</span>
                  <span v-if="scope.row.type === 2">批评</span>
                  <span v-if="scope.row.type === 3">通知</span>
                </template>
              </el-table-column>
              <el-table-column
                width="140"
                prop="create_time"
                label="创建时间">
              </el-table-column>
              <el-table-column
                prop="real_name"
                label="发布人">
              </el-table-column>
              <el-table-column
                width="500px"
                label="公告内容">
                <template slot-scope="scope">
                  <div v-popover:popover1
                       style="display:block;word-break:keep-all;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;">
                    {{scope.row.title}}
                    <el-popover
                      ref="popover1"
                      placement="top-start"
                      width="200"
                      trigger="hover">
                      {{scope.row.title}}
                    </el-popover>
                  </div>
                </template>
              </el-table-column>
              <el-table-column
                width="260px"
                label="发送对象">
                <template slot-scope="scope">
                  <div v-if="scope.row.department_name" v-popover:popover1
                       style="display:block;word-break:keep-all;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;">
                    {{scope.row.department_name}}
                    <el-popover
                      ref="popover1"
                      placement="top-start"
                      width="200"
                      trigger="hover">
                      {{scope.row.department_name}}
                    </el-popover>
                  </div>
                  <div v-else>暂无</div>
                </template>
              </el-table-column>
              <el-table-column
                label="状态">
                <template slot-scope="scope">
                  <el-button class="btnStatus" v-if="scope.row.draft === '已发布'" type="primary" size="mini">已发布
                  </el-button>
                  <el-button class="btnStatus" v-if="scope.row.draft === '草稿'" type="info" size="mini">草稿</el-button>
                </template>
              </el-table-column>
            </el-table>
          </div>
          <div class="tableBottom">
            <div class="left">
              <el-pagination
                @size-change="handleSizeChange"
                @current-change="myData"
                :current-page="nowPage"
                :page-size="12"
                layout="total, prev, pager, next, jumper"
                :total="total">
              </el-pagination>
            </div>
          </div>
        </div>
      </div>
    </div>
    <RightMenu :startX="rightMenuX+'px'" :startY="rightMenuY+'px'" :list="lists" :show="show"
               @clickOperate="clickEvent"></RightMenu>
    <NoticeResources :noticeDialog="noticeDialog" :rowneedx="rowneed" @close="closeNoticeResources"
                     @threeflag="threeflag"></NoticeResources>
  </div>
</template>

<script>
  import RightMenu from "../../../common/rightMenu.vue"; //右键
  import NoticeResources from "./components/NoticeResources.vue"; //增加物品页面
  export default {
    components: {
      RightMenu,
      NoticeResources,
    },
    data() {
      return {
        /***********/
        urls: globalConfig.server,
        departname: "",
        pename: "",
        tableData: [],
        organizationDialog: false,
        noticeDialog: false,
        warningDialog: false,
        rightrow: {},
        rowneed: {},
        depart: "",
        form: {
          page: 1,
          limit: 12,
          type: "",
          search: ""
        },
        isHigh: false,
        nowPage: 1, //当前页
        total: 0, //总条数
        show: false,
        rightMenuX: 0,
        rightMenuY: 0,
        lists: [],
        department_name: "",
        forms: [
          {id: "1", name: "表彰"},
          {id: "2", name: "批评"},
          {id: "3", name: "通知"},
        ],
        rentStatus: ' ',
        rentLoading: false,
      };
    },

    methods: {
      handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
      },
      threeflag(val) {
        if (val) {
          this.myData(1);
        }
      },
      openModalDialogx() {
        this.noticeDialog = true;
      },
      closeNoticeResources() {
        this.rowneed = {};
        this.noticeDialog = false;
      },
      closeWarning() {
        this.warningDialog = false;
      },
      //右键回调时间
      clickEvent(index) {
        this.openModalDialog(index);
      },
      //关闭右键菜单
      closeMenu() {
        this.show = false;
      },
      // 高级
      highGrade() {
        this.isHigh = !this.isHigh;
      },
      // 重置
      resetting() {
        this.isHigh = false;
        this.form = {
          page: 1,
          limit: 12,
          type: "",
          search: ""
        },
          this.myData(1);
      },
      //右键参数
      contextMenuParam(event) {
        //param: user right param
        let e = event || window.event; //support firefox contextmenu
        this.show = false;
        this.rightMenuX = e.clientX + document.documentElement.scrollLeft - document.documentElement.clientLeft;
        this.rightMenuY = e.clientY + document.documentElement.scrollTop - document.documentElement.clientTop;
        event.preventDefault();
        event.stopPropagation();
        this.$nextTick(() => {
          this.show = true;
        });
      },
      //公告右键
      noticeMenu(row, event) {
        this.rightrow = row;
        if (row.draft == "草稿") {
          this.lists = [
            {clickIndex: "noticeDialog", headIcon: "el-icons-fa-edit", label: "编辑"},
            {clickIndex: "delete", headIcon: "el-icons-fa-trash-o", label: "删除"},
            {clickIndex: "sendnotice", headIcon: "el-icons-fa-check-circle-o", label: "发布"}
          ];
          this.contextMenuParam(event);
        } else { //if (row.draft == "已发布")
          this.lists = [
            {clickIndex: "delete", headIcon: "el-icons-fa-trash-o", label: "删除"},
          ];
          this.contextMenuParam(event);
        }

      },
      myData(val) {
        this.tableData = [];
        this.form.page = val;
        this.rentStatus = " ";
        this.rentLoading = true;
        this.$http.get(this.urls + "announcement?brief=1", {params: this.form}).then(res => {
          this.rentLoading = false;
          this.isHigh = false;
          if (res.data.code === "80010") {
            this.tableData = res.data.data;
            this.nowPage = val;
            this.total = res.data.num;

            for (let j = 0; j < res.data.data.length; j++) {
              this.tableData[j].department_name = "";
              for (let m = 0; m < res.data.data[j].department_id.length; m++) {
                this.tableData[j].department_name += res.data.data[j].department_id[m].name + ";";
              }
              if (res.data.data[j].draft == "0") {
                this.tableData[j].draft = "已发布";
              } else if (res.data.data[j].draft == "1") {
                this.tableData[j].draft = "草稿";
              }
              if (res.data.data[j].unstage == 1) {
                this.tableData[j].draft = "已撤回";
              }
              if (!res.data.data[j].real_name) {
                this.tableData[j].real_name = "未知人员";
              }
            }
            if (res.data.data && res.data.data.length < 1) {
              this.tableData = [];
              this.total = 0;
              this.rentStatus = '暂无数据';
            }
          } else {
            this.total = 0;
            this.rentStatus = '暂无数据';
          }
        });
      },
      openModalDialog(index) {
        //右键编辑
        if (index == "noticeDialog") {
          if (this.rightrow.draft == "已发布") {
            this.$notify({
              title: "警告",
              message: "该公告已发布不支持编辑",
              type: "warning"
            });
          } else {
            this.rowneed = this.rightrow;
            this.noticeDialog = true;
          }
        }
        //右键删除
        if (index == "delete") {
          this.$confirm("确定要删除该公告吗？", "提示", {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            type: "warning"
          }).then(() => {
            this.$http.put(this.urls + "announcement/" + this.rightrow.id).then(res => {
              if (res.data.code == "80010") {
                this.$notify({
                  title: "成功",
                  message: "操作成功",
                  type: "success"
                });
                this.myData(this.form.page);
              } else {
                this.$notify.warning({
                  title: "警告",
                  message: "操作失败"
                });
              }
            });
          })

        }
        //右键发布
        if (index == "sendnotice") {
          if (this.rightrow.draft == "已发布") {
            this.$notify({
              title: "警告",
              message: "该公告已发布不用重复发布",
              type: "warning"
            });
          } else {
            this.letsend();
          }
        }
      },
      //发布接口
      letsend() {
        this.$confirm("确定要发布该公告吗？", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }).then(() => {
          this.$http.post(this.urls + "announcement", {
            brief: 1,
            title: this.rightrow.title,
            type: this.rightrow.type,
            content: this.rightrow.content,
            id: this.rightrow.id,
            draft: 0,
            department_id: this.rightrow.department_id,
          }).then(res => {
            if (res.data.code == "99910") {
              this.$notify.success({
                title: "成功",
                message: "操作成功",
              });
              this.myData(1);
            } else {
              this.$notify.warning({
                title: "警告",
                message: "操作失败"
              });
            }
          });
        }).catch(() => {
          this.$message.info({
            type: '提示',
            message: '已取消发布'
          });
        });
      }
    },
    mounted() {
      this.myData(1);
    }
  };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped="">
  .menu-ui {
    width: 80px;
  }

  .btnStatus {
    cursor: inherit;
    min-width: 68px;
  }

  .filter {
    /*padding: 10px 0;*/
  }

  .sendnotice {
    position: absolute;
    right: 0;
    top: 5px;
  }

  .main {
    margin-top: 10px;
  }

  .tableBottom {
    padding: 8px;
    display: flex;
    justify-content: flex-end;
  }

  .el-table .cell {
    text-align: center;
  }
</style>
