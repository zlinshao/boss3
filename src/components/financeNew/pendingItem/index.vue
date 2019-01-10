<template>
  <div @click="show=false" @contextmenu="closeMenu" id="pendingItem">
    <div class="highRanking">
      <div class="highSearch">
        <el-form :model="form" :inline="true" size="mini">
          <el-form-item>
            <el-input placeholder="请输入内容" v-model="form.search" size="mini" clearable
                      @keyup.enter.native.prevent="getTableData('search')"
            >
              <el-button slot="append" icon="el-icon-search" @click="getTableData('search')"></el-button>
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
                    <el-select v-model="form.event_type" clearable size="mini">
                      <el-option label="请选择" value=""></el-option>
                      <el-option v-for="(key,index) in event_type" :label="key" :value="index + 1"
                                 :key="index"></el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
              </el-row>
            </el-col>
            <el-col :span="12">
              <el-row>
                <el-col :span="8">
                  <div class="el_col_label">创建时间</div>
                </el-col>
                <el-col :span="16" class="el_col_option">
                  <el-form-item>
                    <div class="block">
                      <el-date-picker
                        v-model="dates"
                        type="daterange"
                        align="right"
                        unlink-panels
                        range-separator="至"
                        start-placeholder="开始日期"
                        end-placeholder="结束日期"
                        :picker-options="pickerOptions"
                        value-format="yyyy-MM-dd"
                      >
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
                    <el-select v-model="form.collect_rent" clearable size="mini">
                      <el-option label="请选择" value=""></el-option>
                      <el-option v-for="(key,index) in collect_rent" :label="key" :value="index + 1"
                                 :key="index"></el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
              </el-row>
            </el-col>
          </el-row>

          <div class="btnOperate">
            <el-button size="mini" type="primary" @click="getTableData">搜索</el-button>
            <el-button size="mini" type="primary" @click="resetting">重置</el-button>
            <el-button size="mini" type="primary" @click="highGrade">取消</el-button>
          </div>
        </el-form>
      </div>
    </div>

    <div class="border_table">
      <el-table
        :empty-text='collectStatus'
        v-loading="collectLoading"
        element-loading-text="拼命加载中"
        element-loading-spinner="el-icon-loading"
        element-loading-background="rgba(255, 255, 255, 0)"
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
          prop="staff.name">
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
          prop="operator.name">
        </el-table-column>
        <el-table-column
          label="状态"
          prop="status">
          <template slot-scope="scope">
            <el-button v-if="scope.row.status == 1" class="btn btn1" size="mini">待结算</el-button>
            <el-button v-if="scope.row.status == 2" class="btn btn2" size="mini">已结算</el-button>
          </template>
        </el-table-column>
      </el-table>

      <div class="block pages">
        <el-pagination
          @current-change="handleCurrentChange"
          :current-page="currentPage"
          :page-size="12"
          layout="total, prev, pager, next"
          :total="totalNum">
        </el-pagination>
      </div>
    </div>
    <!--右键-->
    <RightMenu :startX="rightMenuX+'px'" :startY="rightMenuY+'px'" :list="lists" :show="show"
               @clickOperateMore="clickEvent"></RightMenu>

    <PendingSettle :module="pendVisible" @close="closeSettle" :detailData="detailData"></PendingSettle>

    <PendingDetail :module="detailVisible" :detailData="detailData" @close="detailVisible = false"></PendingDetail>
  </div>
</template>

<script>
  import RightMenu from '../../common/rightMenu.vue'            //右键
  import PendingSettle from './pendingSettle.vue'    //结算
  import PendingDetail from './pendingDetail.vue'    //详情
  export default {
    name: "index",
    components: {RightMenu, PendingSettle, PendingDetail},
    data() {
      return {
        rightMenuX: 0,
        rightMenuY: 0,
        show: false,
        lists: [],
        url: globalConfig.finance_server,
        event_type: ['违约', '转租', '调租', '退租', '收房炸单', '租房炸单'],
        collect_rent: ['收房', '租房'],
        isHigh: false,
        currentPage: 1,
        form: {
          event_type: '',
          collect_rent: '',
          start_time: '',
          end_time: '',
          search: '',
          page: 1,
          limit: 12
        },
        detailData: {},
        dates: '',
        totalNum: 0,
        detailVisible: false,
        collectLoading: false,
        collectStatus: '',
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
        tableData: [],
      }
    },
    mounted() {
      this.getTableData();
    },
    activated() {
    },
    watch: {},
    methods: {
      getTableData(search) {
        if (search) {
          this.form.page = 1;
        }
        if (this.dates) {
          this.form.start_time = this.dates[0];
          this.form.end_time = this.dates[1];
        }
        this.collectLoading = true;
        this.collectStatus = ' ';
        let params = this.form;
        this.$http.get(this.url + 'account/pending/index', {params: params}).then((res) => {
          if (res.data.success) {
            if (res.data.data.count) {
              this.isHigh = false;
              this.collectLoading = false;
              this.tableData = res.data.data.data;
              this.totalNum = res.data.data.count;
            } else {
              this.collectStatus = '暂无数据';
              this.tableData = [];
              this.totalNum = 0;
            }
          } else {
            this.collectStatus = '暂无数据';
            this.tableData = [];
            this.totalNum = 0;
          }
        });
      },
      // 搜索
      search() {
        this.highGrade();
      },
      // 重置
      resetting() {
        this.dates = '';
        this.form.event_type = '';
        this.form.collect_rent = '';
      },
      // 高级筛选
      highGrade() {
        this.isHigh = !this.isHigh;
      },
      // 双击 详情
      dblClickTable(row, event) {
        this.detailData = row;
        this.detailVisible = true;
      },
      // 右键
      clickMenu(row, event) {
        this.lists = [
          {clickIndex: 'delete', headIcon: 'el-icon-circle-close-outline', label: '删除', data: row},
          {clickIndex: 'settle', headIcon: 'el-icon-circle-close-outline', label: '结算', data: row},
        ];
        this.contextMenuParam(event);
      },
      // 右键回调
      clickEvent(val) {
        // console.log(val);
        if (val.clickIndex === 'delete') {
          this.openDelete(val.data.id);
        } else if (val.clickIndex === 'settle') {
          if (val.data.status === 1) {
            this.detailData = val.data;
            this.pendVisible = true;
          } else {
            this.$message({
              type: 'info',
              message: '已结算'
            });
          }
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
      openDelete(id) {
        this.$confirm('此操作将删除该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$http.get(this.url + 'account/pending/delete/' + id).then((res) => {
            if (res.data.success) {
              this.$message({
                type: 'success',
                message: res.data.message
              });
              this.getTableData();
            } else {
              this.$message.error(res.data.message);
            }
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
      closeSettle(val) {
        this.pendVisible = false;
        if (val == 'success') {
          this.getTableData();
        }
      },
      handleCurrentChange(val) {
        this.form.page = val;
        this.getTableData();
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
