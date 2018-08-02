<template>
  <div @click="show=false" @contextmenu="closeMenu" id="pendingItem">
    <div class="highRanking">
      <div class="highSearch">
        <el-form :model="form" :inline="true" size="mini">
          <el-form-item>
            <el-input placeholder="请输入内容" v-model="form.keyWords" size="mini" clearable>
              <el-button slot="append" icon="el-icon-search"></el-button>
            </el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" size="mini" @click="highGrade">高级</el-button>
          </el-form-item>
        </el-form>
      </div>

      <div class="filter high_grade" :class="isHigh? 'highHide':''">
        <el-form :inline="true" onsubmit="return false" :model="form" size="mini" label-width="100px">
          <div class="filterTitle">
            <i class="el-icons-fa-bars"></i>&nbsp;&nbsp;高级搜索
          </div>

          <el-row class="el_row_border">
            <el-col :span="12">
              <el-row>
                <el-col :span="8">
                  <div class="el_col_label">事件类型</div>
                </el-col>
                <el-col :span="16" class="el_col_option">
                  <el-form-item>
                    <el-select v-model="form.status" clearable size="mini">
                      <el-option label="请选择" value=""></el-option>
                      <el-option v-for="(key,index) in values" :label="key" :value="index + 1" :key="index"></el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
              </el-row>
            </el-col>
            <el-col :span="12">
              <el-row>
                <el-col :span="8">
                  <div class="el_col_label">补齐时间</div>
                </el-col>
                <el-col :span="16" class="el_col_option">
                  <el-form-item>
                    <div class="block">
                      <el-date-picker
                        v-model="form.dates"
                        type="daterange"
                        align="right"
                        unlink-panels
                        range-separator="至"
                        start-placeholder="开始日期"
                        end-placeholder="结束日期"
                        :picker-options="pickerOptions">
                      </el-date-picker>
                    </div>
                  </el-form-item>
                </el-col>
              </el-row>
            </el-col>
          </el-row>
          <el-row class="el_row_border">
            <el-col :span="12">
              <el-row>
                <el-col :span="8">
                  <div class="el_col_label">收租类型</div>
                </el-col>
                <el-col :span="16" class="el_col_option">
                  <el-form-item>
                    <el-select v-model="form.status" clearable size="mini">
                      <el-option label="请选择" value=""></el-option>
                      <el-option v-for="(key,index) in values" :label="key" :value="index + 1" :key="index"></el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
              </el-row>
            </el-col>
          </el-row>

          <div class="btnOperate">
            <el-button size="mini" type="primary" @click="search()">搜索</el-button>
            <el-button size="mini" type="primary" @click="resetting">重置</el-button>
            <el-button size="mini" type="primary" @click="highGrade">取消</el-button>
          </div>
        </el-form>
      </div>
    </div>

    <div class="border_table">
      <el-table
        :data="tableData"
        width="100%"
        @row-dblclick="dblClickTable"
        @row-contextmenu="clickMenu">
        <el-table-column
          label="事项类型"
          prop="item_type">
        </el-table-column>
        <el-table-column
          label="开单人"
          prop="staff_name">
        </el-table-column>
        <el-table-column
          label="房屋地址"
          prop="detailed_address">
        </el-table-column>
        <el-table-column
          label="客户姓名"
          prop="customer_name">
        </el-table-column>
        <el-table-column
          label="应退"
          prop="refund_should">
        </el-table-column>
        <el-table-column
          label="实际扣款"
          prop="refund_diff">
        </el-table-column>
        <el-table-column
          label="实际退款"
          prop="refund_real">
        </el-table-column>
        <el-table-column
          label="结算帐户"
          prop="account_num">
        </el-table-column>
        <el-table-column
          label="结算人"
          prop="operator_name">
        </el-table-column>
        <el-table-column
          label="状态"
          prop="status">
          <template slot-scope="scope">
            <el-button v-if="scope.row.status == 1" class="btn btn1" size="mini">待入账</el-button>
            <el-button v-if="scope.row.status == 2" class="btn btn2" size="mini">待结清</el-button>
            <el-button v-if="scope.row.status == 3" class="btn btn3" size="mini">已结清</el-button>
            <el-button v-if="scope.row.status == 4" class="btn btn4" size="mini">已超额</el-button>
          </template>
        </el-table-column>
      </el-table>

      <div class="block pages">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="currentPage"
          :page-sizes="[pageNumber]"
          :page-size="pageNumber"
          layout="total, sizes, prev, pager, next, jumper"
          :total="400">
        </el-pagination>
      </div>
    </div>
    <!--右键-->
    <RightMenu :startX="rightMenuX+'px'" :startY="rightMenuY+'px'" :list="lists" :show="show"
               @clickOperate="clickEvent"></RightMenu>

    <PendingSettle :module="pendVisible" @close="pendVisible = false"></PendingSettle>
  </div>
</template>

<script>
  import RightMenu from '../../common/rightMenu.vue'            //右键
  import PendingSettle from './components/pendingSettle.vue'    //结算
  export default {
    name: "index",
    components: {RightMenu, PendingSettle},
    data() {
      return {
        rightMenuX: 0,
        rightMenuY: 0,
        show: false,
        lists: [],

        values: ['待入账', '待结清', '已结清', '已超额',],
        isHigh: false,
        pageNumber: 15,
        currentPage: 1,
        form: {
          dates: '',
          status: '',
          keywords: '',
        },

        detailVisible: false,

        pendVisible: false,
        pickerOptions: {
          shortcuts: [{
            text: '最近一周',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit('pick', [start, end]);
            }
          }, {
            text: '最近一个月',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              picker.$emit('pick', [start, end]);
            }
          }, {
            text: '最近三个月',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
              picker.$emit('pick', [start, end]);
            }
          }]
        },
        tableData: [
          {
            item_type: '1990-01-01',
            staff_name: '上官海棠',
            detailed_address: '废话肯定是傅撒1-1-1-11-1',
            customer_name: '归海一刀',
            refund_should: '1222',
            refund_diff: '1333',
            refund_real: '1666',
            account_num: '8989898989898989898989',
            operator_name: '结算人',
            status: 1,
          },
        ],
      }
    },
    mounted() {
    },
    activated() {
    },
    watch: {},
    methods: {
      // 搜索
      search() {
        this.highGrade();
      },
      // 重置
      resetting() {
        this.form.keywords = '';
        this.form.status = '';
        this.form.date = '';
      },
      // 高级筛选
      highGrade() {
        this.isHigh = !this.isHigh;
      },
      // 双击 详情
      dblClickTable(row, event) {

      },
      // 右键
      clickMenu(row, event) {
        this.lists = [
          {clickIndex: 'delete', headIcon: 'el-icon-circle-close-outline', label: '删除',},
          {clickIndex: 'settle', headIcon: 'el-icon-circle-close-outline', label: '结算',},
        ];
        this.contextMenuParam(event);
      },
      // 右键回调
      clickEvent(val) {
        if (val === 'delete') {
          this.openDelete();
        } else if (val === 'settle') {
          this.pendVisible = true;
        }
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
      // 删除
      openDelete() {
        this.$confirm('此操作将删除该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$message({
            type: 'success',
            message: '删除成功!'
          });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });
      },
      //关闭右键菜单
      closeMenu() {
        this.show = false;
      },
      handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
      },
      handleCurrentChange(val) {
        console.log(`当前页: ${val}`);
      },
    },
  }
</script>

<style lang="scss">
  #pendingItem {
    .btn {
      float: left;
      border: 0;
      color: #FFFFFF;
      cursor: default;
    }

    .btn1 {
      background-color: #fc0;
    }

    .btn2 {
      background-color: #f99;
    }

    .btn3 {
      background-color: #78cd51;
    }

    .btn4 {
      background-color: #F04D3D;
    }
    .cell {
      display: flex;
      display: -webkit-flex;
      align-items: center;
      justify-content: center;
    }
  }
</style>
