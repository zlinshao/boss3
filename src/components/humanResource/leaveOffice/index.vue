<template>
  <div>
    <div class="highRanking">
      <div class="highSearch">
        <el-form :inline="true" size="mini" onsubmit="return false">
          <el-form-item>
            <el-input placeholder="请输入姓名" v-model="params.search" size="mini" clearable @keyup.enter.native="search">
              <el-button slot="append" icon="el-icon-search" @click="search"></el-button>
            </el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" size="mini" @click="highGrade">高级</el-button>
          </el-form-item>
        </el-form>
      </div>
      <div class="filter high_grade" :class="isHigh? 'highHide':''">
        <el-form :inline="true" :model="params" size="mini" label-width="100px">
          <div class="filterTitle">
            <i class="el-icons-fa-bars"></i>&nbsp;&nbsp;高级搜索
          </div>
          <el-row class="el_row_border">
            <el-col :span="12">
              <el-row>
                <el-col :span="8">
                  <div class="el_col_label">日期</div>
                </el-col>
                <el-col :span="16" class="el_col_option">
                  <el-form-item>
                    <el-date-picker
                      v-model="params.time"
                      type="daterange"
                      align="right"
                      unlink-panels
                      range-separator="至"
                      start-placeholder="开始日期"
                      end-placeholder="结束日期"
                      value-format="yyyy-MM-dd"
                      :picker-options="pickerOptions">
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
      <div class="blueTable">
        <el-table
          :data="tableData"
          :empty-text='tableStatus'
          v-loading="tableLoading"
          element-loading-text="拼命加载中"
          element-loading-spinner="el-icon-loading"
          element-loading-background="rgba(255, 255, 255, 0)"
          style="width: 100%">
          <el-table-column
            prop="create_time"
            label="时间">
          </el-table-column>
          <el-table-column
            prop="staffs.name"
            label="离职员工">
          </el-table-column>
          <el-table-column
            prop="operators.name"
            label="操作人">
          </el-table-column>
          <el-table-column
            prop="operators"
            label="操作人部门">
            <template slot-scope="scope">
              <div v-for="item in scope.row.operators.org">{{item.name}}</div>
            </template>
          </el-table-column>
          <el-table-column
            prop="status"
            label="状态">
            <template slot-scope="scope">
              <div v-if="scope.row.status === 1">发送失败</div>
              <div v-if="scope.row.status === 2">发送成功</div>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div class="block pages">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="params.page"
          :page-size="params.limit"
          layout="total, prev, pager, next, jumper"
          :total="totalNum">
        </el-pagination>
      </div>
    </div>

  </div>
</template>

<script>

  export default {
    name: 'index',
    data() {
      return {
        urls: globalConfig.server,
        params: {
          page: 1,
          limit: 12,
          time: [],
          search: '',   //模糊搜索
        },
        tableData: [],
        isHigh: false,
        totalNum: 0,
        tableStatus: ' ',
        tableLoading: false,
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
      }
    },
    mounted() {
      this.messageList();
    },
    watch: {},
    methods: {
      search() {
        this.params.page = 1;
        this.messageList();
      },
      messageList() {
        this.tableLoading = true;
        this.tableStatus = ' ';
        this.$http.get(this.urls + 'core/customer/smslist', {params: this.params}).then((res) => {
          this.isHigh = false;
          this.tableLoading = false;
          if (res.data.code === '10000') {
            this.tableData = res.data.data.data;
            this.totalNum = res.data.data.count;
            if (res.data.data.data.length < 1) {
              this.tableStatus = '暂无数据';
              this.tableData = [];
              this.totalNum = 0;
            }
          } else {
            this.tableStatus = '暂无数据';
            this.tableData = [];
            this.totalNum = 0;
          }
        });
      },
      // 高级
      highGrade() {
        this.isHigh = !this.isHigh;
      },
      // 重置
      resetting() {
        this.params.time = "";
        // this.search();
      },
      handleSizeChange(val) {

      },
      handleCurrentChange(val) {
        this.params.page = val;
        this.messageList();
      },
    },
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>

</style>
