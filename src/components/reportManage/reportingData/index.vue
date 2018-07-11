<template>
  <div @click="show=false" @contextmenu="closeMenu">
    <div>
      <div class="highRanking" style=" position: absolute; top: 120px; right: 20px;">
        <div class="highSearch">
          <el-form :inline="true" onsubmit="return false" size="medium">
            <el-form-item>
              <el-button type="primary" size="mini" @click="highGrade">高级</el-button>
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
                    <div class="el_col_label">搜索时间范围</div>
                  </el-col>
                  <el-col :span="16" class="el_col_option">
                    <el-form-item>
                      <el-date-picker
                        v-model="form.timestart"
                        type="date"
                        value-format="yyyy-MM-dd"
                        placeholder="开始时间">
                      </el-date-picker>
                      至
                      <el-date-picker
                        v-model="form.timeend"
                        type="date"
                        value-format="yyyy-MM-dd"
                        placeholder="结束时间">
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
              style="width: 100%">
              <!--@row-contextmenu='openContextMenu'-->
              <el-table-column
                label="日期"
                prop="time">
              </el-table-column>
              <el-table-column
                label="质量报备总数"
                prop="quality">
              </el-table-column>
              <el-table-column
                label="收房报备总数"
                prop="collect">
              </el-table-column>
              <el-table-column
                label="租房报备总数"
                prop="rent">
              </el-table-column>
              <el-table-column
                label="退租报备总数"
                prop="checkout">
              </el-table-column>
              <el-table-column
                label="炸单报备总数"
                prop="lose">
              </el-table-column>
              <el-table-column
                label="尾款报备总数"
                prop="retainage">
              </el-table-column>
              <el-table-column
                label="中介费报备总数"
                prop="agency">
              </el-table-column>
              <el-table-column
                label="退款报备总数"
                prop="refund">
              </el-table-column>
              <el-table-column
                label="平均空置期"
                prop="ready_days">
              </el-table-column>
              <el-table-column
                label="平均收房年限"
                prop="sign_month">
              </el-table-column>
              <el-table-column
                label="中介费单数(收房)"
                prop="agencylord">
              </el-table-column>
              <el-table-column
                label="中介费单数(租房)"
                prop="agencyrenter">
              </el-table-column>
              <el-table-column
                label="租房平均单价"
                prop="contract_renter">
              </el-table-column>
              <el-table-column
                label="收房平均单价"
                prop="contract_lord">
              </el-table-column>
            </el-table>
          </div>
          <!--<div class="tableBottom">-->
          <!--<div class="left">-->
          <!--<el-pagination-->
          <!--@size-change="handleSizeChange"-->
          <!--@current-change="handleCurrentChange"-->
          <!--:current-page="form.page"-->
          <!--:page-size="form.limit"-->
          <!--layout="total, prev, pager, next, jumper"-->
          <!--:total="totalNum">-->
          <!--</el-pagination>-->
          <!--</div>-->
          <!--</div>-->
        </div>
      </div>
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
          // page: 1,
          // limit: 12,
          timestart: '',
          timeend: '',
          excel: 0,
        },
        organizationDialog: false,
        organizeType: '',
        currentStatus: '',
      };
    },
    activated() {
      this.getTableData();
    },
    watch: {},
    methods: {
      // 导出
      exportData() {
        this.form.excel = 1;
        this.$http.get(globalConfig.server + 'performance/bulletin_sum/selsum', {
          responseType: 'arraybuffer',
          params: this.form
        }).then((res) => { // 处理返回的文件流
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
      getTableData() {
        this.tableStatus = ' ';
        this.tableLoading = true;
        this.form.excel = 0;
        this.$http.get(globalConfig.server + 'performance/bulletin_sum/selsum', {params: this.form}).then((res) => {
          this.tableLoading = false;
          this.isHigh = false;
          if (res.data.code === '20020') {
            this.tableData = res.data.data;
            // this.totalNum = res.data.data.count;  //记录总条数
            if (res.data.data.length < 1) {
              this.tableStatus = '暂无数据';
              // this.totalNum = 0;
              this.tableData = [];
            }
          } else {
            this.tableStatus = '暂无数据';
            // this.totalNum = 0;
            this.tableData = [];
            this.$notify.warning({
              type: '警告',
              message: res.data.msg
            });
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
        this.form.timestart = '';
        this.form.timeend = '';
        this.form.excel = '';
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

  .main {
    margin-top: 50px;
    margin-bottom: 50px;
  }
</style>
