<template>
  <div @click="show=false" @contextmenu="closeMenu">
    <div id="clientContainer">
      <div class="highRanking">
        <div class="highSearch">
          <el-form :inline="true" size="mini">
            <el-form-item>
              <el-input placeholder="请输入标题" v-model="form.keywords" size="mini" clearable @keyup.enter.native="">
                <el-button slot="append" icon="el-icon-search" @click=""></el-button>
              </el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" size="mini" @click="highGrade">高级</el-button>
            </el-form-item>
          </el-form>
        </div>
        <div class="filter high_grade" :class="isHigh? 'highHide':''">
          <el-form :inline="true" :model="form" size="mini" label-width="100px">
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

                    </el-form-item>
                  </el-col>
                </el-row>
              </el-col>
            </el-row>
            <div class="btnOperate">
              <el-button size="mini" type="primary" @click="">搜索</el-button>
              <el-button size="mini" type="primary" @click="resetting">重置</el-button>
              <el-button size="mini" type="primary" @click="highGrade">取消</el-button>
            </div>
          </el-form>
        </div>
      </div>
      <div class="main">
        <div class="myHouse">
          <div class="myTable" @contextmenu="houseHeadMenu($event)">
            <el-table
              :data="tableData"
              :empty-text='tableStatus'
              v-loading="tableLoading"
              element-loading-text="拼命加载中"
              element-loading-spinner="el-icon-loading"
              element-loading-background="rgba(255, 255, 255, 0)"
              @row-click="clickTable"
              @row-contextmenu='houseMenu'
              style="width: 100%">
              <el-table-column
                prop="contract_type"
                label="合同类型">
                <template slot-scope="scope">
                  <span v-if="scope.row.contract_type">{{scope.row.contract_type}}</span>
                  <span v-if="!scope.row.contract_type">暂无</span>
                </template>
              </el-table-column>
              <el-table-column
                prop="customer_name"
                label="客户姓名">
                <template slot-scope="scope">
                  <span v-if="scope.row.customer_name">{{scope.row.customer_name}}</span>
                  <span v-if="!scope.row.customer_name">暂无</span>
                </template>
              </el-table-column>
              <el-table-column
                prop="sex"
                label="性别">
                <template slot-scope="scope">
                  <span v-if="scope.row.sex">{{scope.row.sex}}</span>
                  <span v-if="!scope.row.sex">暂无</span>
                </template>
              </el-table-column>
              <el-table-column
                prop="customer_mobile"
                label="客户电话">
                <template slot-scope="scope">
                  <span v-if="scope.row.customer_mobile">{{scope.row.customer_mobile}}</span>
                  <span v-if="!scope.row.customer_mobile">暂无</span>
                </template>
              </el-table-column>
              <el-table-column
                prop="content"
                label="维修内容">
                <template slot-scope="scope">
                  <span v-if="scope.row.content">{{scope.row.content}}</span>
                  <span v-if="!scope.row.content">暂无</span>
                </template>
              </el-table-column>
              <el-table-column
                prop="repair_time"
                label="维修时间">
                <template slot-scope="scope">
                  <span v-if="scope.row.repair_time">{{scope.row.repair_time}}</span>
                  <span v-if="!scope.row.repair_time">暂无</span>
                </template>
              </el-table-column>
              <el-table-column
                prop="repair_master"
                label="维修师傅">
                <template slot-scope="scope">
                  <span v-if="scope.row.repair_master">{{scope.row.repair_master}}</span>
                  <span v-if="!scope.row.repair_master">暂无</span>
                </template>
              </el-table-column>
              <el-table-column
                prop="repair_result"
                label="维修结果">
                <template slot-scope="scope">
                  <span v-if="scope.row.repair_result">{{scope.row.repair_result}}</span>
                  <span v-if="!scope.row.repair_result">暂无</span>
                </template>
              </el-table-column>
              <el-table-column
                prop="repair_money"
                label="维修金额">
                <template slot-scope="scope">
                  <span v-if="scope.row.repair_money">{{scope.row.repair_money}}</span>
                  <span v-if="!scope.row.repair_money">暂无</span>
                </template>
              </el-table-column>
              <el-table-column
                prop="status"
                label="维修状态">
                <template slot-scope="scope">
                  <span v-if="scope.row.status">{{scope.row.status}}</span>
                  <span v-if="!scope.row.status">暂无</span>
                </template>
              </el-table-column>
              <el-table-column
                prop="person_liable"
                label="认责人">
                <template slot-scope="scope">
                  <span v-if="scope.row.person_liable">{{scope.row.person_liable}}</span>
                  <span v-if="!scope.row.person_liable">暂无</span>
                </template>
              </el-table-column>
            </el-table>
          </div>
          <div class="block pages">
            <div class="left">
              <el-pagination
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page="form.page"
                :page-size="10"
                layout="total, prev, pager, next, jumper"
                :total="totalNum">
              </el-pagination>
            </div>
          </div>
        </div>
      </div>
    </div>
    <RightMenu :startX="rightMenuX+'px'" :startY="rightMenuY+'px'" :list="lists" :show="show"
               @clickOperate="clickEvent"></RightMenu>
  </div>
</template>

<script>
  import RightMenu from '../../common/rightMenu.vue'

  export default {
    name: 'hello',
    components: {RightMenu},
    data() {
      return {
        rightMenuX: 0,
        rightMenuY: 0,
        show: false,
        lists: [],
        form: {
          name: '',
          house: '',
          page: 1,
          limit: 12,
        },
        tableData: [],
        totalNum: 0,
        currentPage: 1,
        isHigh: false,
        tableStatus: ' ',
        tableLoading: false,
      }
    },
    mounted() {
      this.getTableData();
    },
    methods: {
      getTableData() {
        this.tableStatus = ' ';
        this.tableLoading = true;
        this.$http.get(globalConfig.server + 'repaire/list?limit=12&page=' + this.form.page).then((res) => {
          this.isHigh = false;
          this.tableLoading = false;
          if (res.data.code === '600200') {
            this.tableData = res.data.data;
            this.totalNum = res.data.data.count;
          } else {
            this.tableData = [];
            this.totalNum = 0;
            this.tableStatus = '暂无数据';
          }
        });
      },
      // 高级
      highGrade() {
        this.isHigh = !this.isHigh;
      },
      // 重置
      resetting() {
        this.isHigh = false;
      },
      handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
      },
      handleCurrentChange(val) {
        this.form.page = val;
        console.log(`当前页: ${val}`);
      },
      clickTable(row, event, column) {
        console.log(row, event, column)
      },
      //房屋右键
      houseMenu(row, event) {
        this.lists = [
          {clickIndex: 1, headIcon: 'el-icons-fa-home', label: '房源修改',},
          {clickIndex: 1, headIcon: 'el-icon-circle-plus', label: '添加跟进',},
          {clickIndex: 1, headIcon: 'el-icon-edit-outline', label: '修改看房',},
          {clickIndex: 1, headIcon: 'el-icon-edit', label: '修改回访',},
          {clickIndex: 4, headIcon: 'el-icons-fa-envelope-o', label: '发送短信',},
          {clickIndex: 1, headIcon: 'el-icon-error', label: '删除房源',},
        ];
        this.contextMenuParam(event);
      },
      //合同表头右键
      houseHeadMenu(e) {
        this.lists = [
          {clickIndex: 1, headIcon: 'el-icons-fa-home', label: '选择列选项',},
        ];
        this.contextMenuParam(event);
      },

      //右键回调时间
      clickEvent(index) {
        console.log('click ' + index)
      },
      //关闭右键菜单
      closeMenu() {
        this.show = false;
      },
      //右键参数
      contextMenuParam(event) {
        //param: user right param
        let e = event || window.event;	//support firefox contextmenu
        this.show = false;
        this.rightMenuX = e.clientX + document.documentElement.scrollLeft - document.documentElement.clientLeft;
        this.rightMenuY = e.clientY + document.documentElement.scrollTop - document.documentElement.clientTop;
        event.preventDefault();
        event.stopPropagation();
        this.$nextTick(() => {
          this.show = true
        })
      },
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
  #clientContainer {
    .tool {
      border-bottom: 1px solid #eee;
      display: flex;
      padding-bottom: 10px;
      justify-content: space-between;
      .tool_right {
        display: flex;
        align-items: center;
        div {
          width: 100px;
          text-align: center;
          cursor: pointer;
          &:first-child {
            /*border-right: 1px solid #ccc;*/
          }
          i {
            color: #409EFF;
          }
        }
      }
    }
    .filter {
      padding-top: 10px;
    }
    .main {
      font-size: 12px;
      .myHouse {
        border: 1px solid #dfe6fb;
        margin-bottom: 20px;
        box-shadow: 0 2px 4px 0 rgba(0, 0, 0, .12), 0 0 6px 0 rgba(0, 0, 0, .04);
        .myTable {
          .el-table {
            th {
              background-color: #dfe6fb;
            }
          }
        }
        .tableBottom {
          padding: 8px;
          display: flex;
          justify-content: space-between;
          .right {
            display: flex;
            align-items: center;
            div {
              width: 100px;
              text-align: center;
              span {
                color: #fb529f;
              }
              &:first-child {
                border-right: 1px solid #ccc;
              }
            }
          }
        }
      }
    }
  }
</style>
