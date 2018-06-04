<template>
  <div>
    <div class="main">
      <!--<div class="highRanking" style=" position: absolute; top: 122px; right: 20px;z-index: 99;">-->
      <!--<div class="highSearch">-->
      <!--<el-form :inline="true" onsubmit="return false" size="mini">-->

      <!--<el-form-item label="审批时间范围">-->
      <!--<el-date-picker-->
      <!--v-model="params.date_range"-->
      <!--type="daterange"-->
      <!--unlink-panels-->
      <!--@change="search"-->
      <!--range-separator="至"-->
      <!--start-placeholder="开始日期"-->
      <!--end-placeholder="结束日期"-->
      <!--value-format="yyyy-MM-dd">-->
      <!--</el-date-picker>-->
      <!--</el-form-item>-->

      <!--<el-form-item label="员工">-->
      <!--<el-input v-model="staff_name" @focus="selectStaff()" readonly placeholder="请选择员工">-->
      <!--<el-button style="cursor: pointer;" slot="append" @click="emptyStaff()">清空</el-button>-->
      <!--</el-input>-->
      <!--</el-form-item>-->

      <!--&lt;!&ndash;<el-form-item>&ndash;&gt;-->
      <!--&lt;!&ndash;<el-button type="primary" size="mini" @click="highGrade">高级</el-button>&ndash;&gt;-->
      <!--&lt;!&ndash;</el-form-item>&ndash;&gt;-->
      <!--</el-form>-->
      <!--</div>-->
      <!--</div>-->
      <!--<div class="highRanking">-->
      <!--<div class="filter high_grade" :class="isHigh? 'highHide':''">-->
      <!--<el-form :inline="true" onsubmit="return false" :model="params" size="mini" label-width="100px">-->
      <!--<div class="filterTitle">-->
      <!--<i class="el-icons-fa-bars"></i>&nbsp;&nbsp;高级搜索-->
      <!--</div>-->
      <!--<el-row class="el_row_border">-->
      <!--<el-col :span="12">-->
      <!--<el-row>-->
      <!--<el-col :span="8">-->
      <!--<div class="el_col_label">创建时间</div>-->
      <!--</el-col>-->
      <!--<el-col :span="16" class="el_col_option">-->
      <!--<el-form-item>-->
      <!--<el-date-picker-->
      <!--v-model="params.date_range"-->
      <!--type="daterange"-->
      <!--align="right"-->
      <!--unlink-panels-->
      <!--range-separator="至"-->
      <!--start-placeholder="开始日期"-->
      <!--end-placeholder="结束日期"-->
      <!--value-format="yyyy-MM-dd">-->
      <!--</el-date-picker>-->
      <!--</el-form-item>-->
      <!--</el-col>-->
      <!--</el-row>-->
      <!--</el-col>-->
      <!--<el-col :span="12">-->
      <!--<el-row>-->
      <!--<el-col :span="8">-->
      <!--<div class="el_col_label">发送人</div>-->
      <!--</el-col>-->
      <!--<el-col :span="16" class="el_col_option">-->
      <!--<el-form-item>-->
      <!--<el-input v-model="params.sender" @focus="selectStaff('sender')" readonly placeholder="请选择发送人">-->
      <!--<el-button style="cursor: pointer;" slot="append" @click="emptyStaff('sender')">清空</el-button>-->
      <!--</el-input>-->
      <!--</el-form-item>-->
      <!--</el-col>-->
      <!--</el-row>-->
      <!--</el-col>-->
      <!--</el-row>-->
      <!--<div class="btnOperate">-->
      <!--<el-button size="mini" type="primary" @click="search">搜索</el-button>-->
      <!--<el-button size="mini" type="primary" @click="resetting">重置</el-button>-->
      <!--<el-button size="mini" type="primary" @click="highGrade">取消</el-button>-->
      <!--</div>-->
      <!--</el-form>-->
      <!--</div>-->
      <!--</div>-->
      <div>
        <div>
          <el-tabs v-model="activeName" @tab-click="handleClick">
            <el-tab-pane label="收房审批报表" name="first">
              <div style="display: flex;justify-content: space-between">
                <div style="color: #6a8dfb" >
                  <span style="margin-right: 10px">总通过数量 :
                    <span v-if="tableMeta.approval_sum">{{tableMeta.approval_sum}}</span>
                    <span v-if="isLoading"><i class="el-icon-loading"></i></span>
                     <span v-if="!isLoading&&!tableMeta.approval_sum">0</span>
                  </span>
                  <span style="margin-right: 10px">总查看数量 :
                    <span v-if="tableMeta.review_sum">{{tableMeta.review_sum}}</span>
                    <span v-if="isLoading"><i class="el-icon-loading"></i></span>
                    <span v-if="!isLoading&&!tableMeta.review_sum">0</span>
                  </span>
                  <span style="margin-right: 10px">总通过率 :
                    <span v-if="tableMeta.approval_sum_ratio">{{tableMeta.approval_sum_ratio}}</span>
                    <span v-if="isLoading"><i class="el-icon-loading"></i></span>
                    <span v-if="!isLoading&&!tableMeta.approval_sum_ratio">0</span>
                  </span>
                </div>
                <el-form :inline="true" onsubmit="return false" size="mini">
                  <el-form-item label="审批时间范围">
                    <el-date-picker
                      v-model="params.date_range"
                      type="daterange"
                      unlink-panels
                      @change="search"
                      range-separator="至"
                      start-placeholder="开始日期"
                      end-placeholder="结束日期"
                      value-format="yyyy-MM-dd">
                    </el-date-picker>
                  </el-form-item>

                  <el-form-item label="员工">
                    <el-input v-model="staff_name" @focus="selectStaff()" readonly placeholder="请选择员工">
                      <el-button style="cursor: pointer;" slot="append" @click="emptyStaff()">清空</el-button>
                    </el-input>
                  </el-form-item>
                </el-form>
              </div>

              <div class="myTable">
                <el-table
                  :data="tableData"
                  :empty-text='emptyStatus'
                  v-loading="isLoading"
                  element-loading-text="拼命加载中"
                  element-loading-spinner="el-icon-loading"
                  element-loading-background="rgba(255, 255, 255, 0)"
                  style="width: 100%">

                  <el-table-column
                    label="通过数量">
                    <template slot-scope="scope">
                      <span v-if="scope.row.approval_num">{{scope.row.approval_num}}</span>
                      <span v-else>0</span>
                    </template>
                  </el-table-column>
                  <el-table-column
                    label="查看数量">
                    <template slot-scope="scope">
                      <span v-if="scope.row.review_num">{{scope.row.review_num}}</span>
                      <span v-else>0</span>
                    </template>
                  </el-table-column>
                  <el-table-column
                    label="通过率">
                    <template slot-scope="scope">
                      <span v-if="scope.row.approval_ratio">{{scope.row.approval_ratio }}</span>
                      <span v-else>0</span>
                    </template>
                  </el-table-column>

                  <el-table-column
                    label="操作人">
                    <template slot-scope="scope">
                      <span v-if="scope.row.staff">{{scope.row.staff.name }}</span>
                      <span v-else>/</span>
                    </template>
                  </el-table-column>
                </el-table>
              </div>
            </el-tab-pane>
            <el-tab-pane label="租房审批报表" name="second">
              <div style="display: flex;justify-content: space-between">
                <div style="color: #6a8dfb" >
                  <span style="margin-right: 10px">总通过数量 :
                    <span v-if="tableMeta.approval_sum">{{tableMeta.approval_sum}}</span>
                    <span v-if="isLoading"><i class="el-icon-loading"></i></span>
                     <span v-if="!isLoading&&!tableMeta.approval_sum">0</span>
                  </span>
                  <span style="margin-right: 10px">总查看数量 :
                    <span v-if="tableMeta.review_sum">{{tableMeta.review_sum}}</span>
                    <span v-if="isLoading"><i class="el-icon-loading"></i></span>
                    <span v-if="!isLoading&&!tableMeta.review_sum">0</span>
                  </span>
                  <span style="margin-right: 10px">总通过率 :
                    <span v-if="tableMeta.approval_sum_ratio">{{tableMeta.approval_sum_ratio}}</span>
                    <span v-if="isLoading"><i class="el-icon-loading"></i></span>
                    <span v-if="!isLoading&&!tableMeta.approval_sum_ratio">0</span>
                  </span>
                </div>
                <el-form :inline="true" onsubmit="return false" size="mini">
                  <el-form-item label="审批时间范围">
                    <el-date-picker
                      v-model="params.date_range"
                      type="daterange"
                      unlink-panels
                      @change="search"
                      range-separator="至"
                      start-placeholder="开始日期"
                      end-placeholder="结束日期"
                      value-format="yyyy-MM-dd">
                    </el-date-picker>
                  </el-form-item>

                  <el-form-item label="员工">
                    <el-input v-model="staff_name" @focus="selectStaff()" readonly placeholder="请选择员工">
                      <el-button style="cursor: pointer;" slot="append" @click="emptyStaff()">清空</el-button>
                    </el-input>
                  </el-form-item>
                </el-form>
              </div>
              <div class="myTable">
                <el-table
                  :data="tableData"
                  :empty-text='emptyStatus'
                  v-loading="isLoading"
                  element-loading-text="拼命加载中"
                  element-loading-spinner="el-icon-loading"
                  element-loading-background="rgba(255, 255, 255, 0)"
                  style="width: 100%">
                  <el-table-column
                    label="通过数量">
                    <template slot-scope="scope">
                      <span v-if="scope.row.approval_num">{{scope.row.approval_num}}</span>
                      <span v-else>0</span>
                    </template>
                  </el-table-column>
                  <el-table-column
                    label="查看数量">
                    <template slot-scope="scope">
                      <span v-if="scope.row.review_num">{{scope.row.review_num}}</span>
                      <span v-else>0</span>
                    </template>
                  </el-table-column>
                  <el-table-column
                    label="通过率">
                    <template slot-scope="scope">
                      <span v-if="scope.row.approval_ratio">{{scope.row.approval_ratio }}</span>
                      <span v-else>0</span>
                    </template>
                  </el-table-column>

                  <el-table-column
                    label="操作人">
                    <template slot-scope="scope">
                      <span v-if="scope.row.staff">{{scope.row.staff.name }}</span>
                      <span v-else>/</span>
                    </template>
                  </el-table-column>
                </el-table>
              </div>
            </el-tab-pane>
          </el-tabs>
          <div class="block pages">
            <div>
              <el-pagination
                @current-change="handleCurrentChange"
                :current-page="params.page"
                :page-size="params.limit"
                layout="total, prev, pager, next, jumper"
                :total="totalNum">
              </el-pagination>
            </div>
          </div>
        </div>
      </div>
    </div>

    <Organization :organizationDialog="organizationDialog" :type="type" :length="length" @close="closeOrganization"
                  @selectMember="selectMember"></Organization>
  </div>
</template>

<script>
  import Organization from '../../../common/organization.vue';

  export default {
    name: "incomplete-record",
    components: {Organization},
    data() {
      return {
        totalNum: 0,   //总数
        params: {
          page: 1,
          isRent: '',
          limit: 12,
          date_range: [],
          staff_id: [],
        },
        type: '',
        length: '',
        staff_name : '',
        organizationDialog: false,
        activeName: 'first',
        emptyStatus: ' ',
        isLoading: false,
        tableData: [],
        tableMeta: {},

      }
    },
    created() {
      this.getDefaultData();
      let now = new Date();
      this.params.date_range.push(this.formatDate(now));
      this.params.date_range.push(this.formatDate(now));
    },
    activated() {
      this.getDefaultData();
    },

    methods: {
      // tabs标签页
      handleClick(tab, event) {
        this.tableData = [];
        this.tableMeta = {};
        this.params.isRent = this.activeName === 'first' ? 0 : 1;
        this.getData();
      },

      getDefaultData() {
        let query = this.$route.query;
        this.activeName = query.active ? query.active : 'first';
        this.params.isRent = this.activeName === 'first' ? 0 : 1;
        this.getData();
      },

      //获取数据
      getData() {
        this.emptyStatus = " ";
        this.isLoading = true;
        this.$http.get(globalConfig.server + 'report/approval', {params: this.params}).then((res) => {
          this.isLoading = false;
          if (res.data.code === '40010') {
            if(res.data.data.length > 0){
              this.tableData = res.data.data;
              this.tableMeta = res.data.meta;
              this.totalNum = res.data.meta.num;
            }else {
              this.tableData = [];
              this.tableMeta = {};
              this.totalNum = 0;
              this.emptyStatus = "暂无数据";
            }
          } else {
            this.tableData = [];
            this.tableMeta = {};
            this.totalNum = 0;
            this.emptyStatus = "暂无数据";
          }
        })
      },
      //获取当前日期
      formatDate(now) {
        let y = now.getFullYear();
        let m = now.getMonth() + 1; // 注意 JavaScript 月份+1
        let d = now.getDate();
        let h = now.getHours();
        let mim = now.getMinutes();
        let s = now.getSeconds();
        return y + "-" + m + "-" + d;

      },

      handleCurrentChange(val) {
        this.params.page = val;
        this.getData();
      },
      search() {
        this.params.page = 1;
        this.getData();
      },

      emptyStaff() {
        this.params.staff_id = [];
        this.staff_name = '';
        this.search();
      },
      selectStaff(val) {
        this.type = 'staff';
        this.length = 1;
        this.organizationDialog = true
      },
      closeOrganization() {
        this.organizationDialog = false
      },
      selectMember(val) {
        this.params.staff_id[0] = val[0].id;
        this.staff_name = val[0].name;
        this.search();
      },
    }
  }
</script>

<style scoped>

</style>
