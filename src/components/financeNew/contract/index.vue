<template>
    <div id="contract">
      <div style="text-align: right;width: 100%">
        <el-input size="mini" v-model="params.keywords" style="width: 15%;vertical-align: middle" clearable placeholder="请输入你想搜索的内容">
          <el-button slot="append" icon="el-icon-search" @click="getTableList"></el-button>
        </el-input>
        <!--<el-date-picker-->
          <!--v-model="rangeDate"-->
          <!--type="daterange"-->
          <!--align="right"-->
          <!--size="mini"-->
          <!--unlink-panels-->
          <!--value-format="yyyy-MM-dd"-->
          <!--range-separator="至"-->
          <!--start-placeholder="开始日期"-->
          <!--end-placeholder="结束日期"-->
          <!--@change="handleSelRangDate"-->
          <!--:picker-options="pickerOptions">-->
        <!--</el-date-picker>-->
        <!--<el-button size="mini" type="primary">搜索</el-button>-->
      </div>
      <div>
        <el-tabs v-model="activeName" @tab-click="handleTabClick">
          <el-tab-pane label="收房合同" name="first">
            <el-table
              :data="list"
              v-loading="loading"
              :empty-text="empty"
            >
              <el-table-column label="合同编号" prop="contract_num"></el-table-column>
              <el-table-column label="合同上传时间" prop="create_time"></el-table-column>
              <el-table-column label="房屋地址" prop="detailed_address"></el-table-column>
              <el-table-column label="合同开始时间" prop="start_date"></el-table-column>
              <el-table-column label="合同结束时间" prop="end_date"></el-table-column>
              <el-table-column label="客户" prop="name"></el-table-column>
              <el-table-column label="客户电话" prop="mobile"></el-table-column>
              <el-table-column label="合同状态" prop="pass_status"></el-table-column>
            </el-table>
            <el-pagination
              style="text-align: right"
              :total="count"
              layout="total,prev,pager,next"
              :current-page="params.pages"
              :page-size="params.limit"
              @current-change="handleChangePage"
            ></el-pagination>
          </el-tab-pane>
          <el-tab-pane label="租房合同" name="second">
            <el-table
              :data="list2"
              v-loading="loading"
              :empty-text="empty"
            >
              <el-table-column label="合同编号" prop="contract_num"></el-table-column>
              <el-table-column label="合同上传时间" prop="create_time"></el-table-column>
              <el-table-column label="房屋地址" prop="detailed_address"></el-table-column>
              <el-table-column label="合同开始时间" prop="start_date"></el-table-column>
              <el-table-column label="合同结束时间" prop="end_date"></el-table-column>
              <el-table-column label="客户" prop="name"></el-table-column>
              <el-table-column label="客户电话" prop="mobile"></el-table-column>
              <el-table-column label="合同状态" prop="pass_status"></el-table-column>
            </el-table>
            <el-pagination
              style="text-align: right"
              :total="count2"
              layout="total,prev,pager,next"
              :current-page="params.pages"
              :page-size="params.limit"
              @current-change="handleChangePage"
            ></el-pagination>
          </el-tab-pane>
        </el-tabs>
      </div>
    </div>
</template>

<script>
    export default {
        name: "index",
      data() {
          return {
            url: globalConfig.finance_server,
            rangeDate: '',
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
              },{
                text: '最近一年',
                onClick(picker) {
                  const end = new Date();
                  const start = new Date();
                  start.setTime(start.getTime() - 3600 * 1000 * 24 * 365);
                  picker.$emit('pick', [start, end]);
                }
              }]
            },
            params: {
              start_date: '',
              end_date: '',
              pages: 1,
              limit: 15,
              keywords: '',
            },
            activeName: 'first',
            loading: false,
            empty: '',
            list: [],
            count: 0,
            list2:[],
            count2: 0
          }
      },
      mounted() {
          this.getTableList();
      },
      methods: {
        handleChangePage(page) {
          this.params.pages = page;
          this.getTableList();
        },
        handleTabClick(tab) {
          this.activeName = tab.name;
          this.params.pages = 1;
          this.getTableList();
        },
        emptyData() {
          this.list = [];
          this.list2 = [];
          this.count = 0;
          this.count2 = 0;
          this.empty = "暂无数据";
        },
        getTableList() {
          this.params.keywords = this.params.keywords.trim();
          this.loading = true;
          if (this.activeName === 'first') {
            this.$http.get(this.url + 'contract/lord/index',{params: this.params}).then(res => {
              if (res.data.success) {
                if (res.data.data.data.length < 1){
                  this.emptyData();
                }
                this.list = res.data.data.data;
                this.count = res.data.data.all_count;
              } else {
                this.emptyData();
              }
              this.loading = false;
            }).catch(err => {
              console.log(err);
            })
          } else {
            this.$http.get(this.url + 'contract/rent/index',{params: this.params}).then(res => {
              if (res.data.success) {
                if (res.data.data.data.length < 1){
                  this.emptyData();
                }
                this.list2 = res.data.data.data;
                this.count2 = res.data.data.all_count;
              } else {
                this.emptyData();
              }
              this.loading = false;
            }).catch(err => {
              console.log(err);
            })
          }
        },
        handleSelRangDate(val) {
          if (val) {
            this.params.start_date = val[0];
            this.params.end_date = val[1];
          } else {
            this.params.start_date = "";
            this.params.end_date = "";
          }
        }
      }
    }
</script>

<style scoped>

</style>
