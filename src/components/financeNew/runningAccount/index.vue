<template >
   <div id="runningAccount">
       <div style="text-align: right;">
         <el-input v-model="params.search" @keyup.enter.native="handleGoSearch" clearable style="width: 15%" placeholder="请输入需要搜索的内容" size="mini">
           <el-button slot="append" icon="el-icon-search" @click="handleGoSearch"></el-button>
         </el-input>
         <el-button type="primary" size="mini" @click="isHigh = !isHigh">高级</el-button>
         <el-button type="success" size="mini" @click="outData">导出</el-button>
       </div>
     <div class="highRanking" style="margin-top: 10px">
       <div class="filter high_grade" :class="isHigh? 'highHide':''" style=" margin-top: -40px;">
         <el-form :inline="true" onsubmit="return false" :model="params" size="mini" label-width="100px">
           <div class="filterTitle">
             <i class="el-icons-fa-bars"></i>&nbsp;&nbsp;高级搜索
           </div>
           <el-row class="el_row_border">
             <el-col :span="12">
               <el-row>
                 <el-col :span="8">
                   <div class="el_col_label">操作时间周期</div>
                 </el-col>
                 <el-col :span="16" class="el_col_option">
                   <el-form-item>
                     <el-date-picker
                      v-model="operationTime"
                      type="daterange"
                      align="right"
                      unlink-panels
                      value-format="yyyy-MM-dd"
                      range-separator="至"
                      start-placeholder="开始日期"
                      @change="handleSelRangDate"
                      end-placeholder="结束日期"
                      :picker-options="pickerOptions"
                     ></el-date-picker>
                   </el-form-item>
                 </el-col>
               </el-row>
             </el-col>
             <el-col :span="12">
               <el-row>
                 <el-col :span="8">
                   <div class="el_col_label">始终时间周期</div>
                 </el-col>
                 <el-col :span="16" class="el_col_option">
                   <el-form-item>
                     <el-date-picker
                       v-model="time"
                       type="daterange"
                       align="right"
                       unlink-panels
                       value-format="yyyy-MM-dd"
                       range-separator="至"
                       start-placeholder="开始日期"
                       @change="handleSelRangDate1"
                       end-placeholder="结束日期"
                       :picker-options="pickerOptions"
                     ></el-date-picker>
                   </el-form-item>
                 </el-col>
               </el-row>
             </el-col>
           </el-row>
           <el-row class="el_row_border">
             <el-col :span="12">
               <el-row>
                 <el-col :span="8">
                   <div class="el_col_label">类型</div>
                 </el-col>
                 <el-col :span="16" class="el_col_option">
                   <el-form-item>
                     <el-select v-model="params.cate">
                       <el-option :value="1" label="应收"></el-option>
                       <el-option :value="2" label="应付"></el-option>
                       <el-option :value="3" label="全部"></el-option>
                     </el-select>
                   </el-form-item>
                 </el-col>
               </el-row>
             </el-col>
             <el-col :span="12">
               <el-row>
                 <el-col :span="8">
                   <div class="el_col_label">科目</div>
                 </el-col>
                 <el-col :span="16" class="el_col_option">
                   <el-form-item>
                     <el-input @focus="subjectVisible = true" v-model="subject_name" placeholder="请选择">
                       <el-button slot="append" @click="clearParams">清空</el-button>
                     </el-input>
                   </el-form-item>
                 </el-col>
               </el-row>
             </el-col>
           </el-row>
           <div class="btnOperate">
             <el-button size="mini" type="primary" @click="getTableList">搜索</el-button>
             <el-button size="mini" type="primary" @click="resetting">重置</el-button>
             <el-button size="mini" type="primary" @click="highGrade">取消</el-button>
           </div>
         </el-form>
       </div>
     </div>
     <div style="margin-top: 10px">
       <el-table
        :data="tableList"
        v-loading="isLoading"
        :empty-text="emptyText"
        element-loading-text="拼命加载中"
        element-loading-spinner="el-icon-loading"
        element-loading-background="rgba(255, 255, 255, 0)"
       >
         <el-table-column label="ID" prop="id"></el-table-column>
         <el-table-column label="交易时间" prop="create_time"></el-table-column>
         <el-table-column label="客户姓名" prop="customer.customer_name"></el-table-column>
         <el-table-column label="地址" prop="address"></el-table-column>
         <el-table-column label="科目名称" prop="subject"></el-table-column>
         <el-table-column label="类型" prop="category"></el-table-column>
         <el-table-column label="账户名称" prop="account_name"></el-table-column>
         <el-table-column label="卡号" prop="account_num"></el-table-column>
         <el-table-column label="应收金额" prop="amount_receivable"></el-table-column>
         <el-table-column label="实收金额" prop="amount_received"></el-table-column>
         <el-table-column label="应付金额" prop="amount_payable"></el-table-column>
         <el-table-column label="实付金额" prop="amount_paid"></el-table-column>
         <el-table-column label="账户余额" prop="amount_remain"></el-table-column>
         <el-table-column label="详细信息" prop="info" min-width="300px"></el-table-column>
         <el-table-column label="收/付款人员" prop="operator_name"></el-table-column>
       </el-table>
       <el-pagination
        :total="all_count"
        layout="total,prev,pager,next"
        :current-page="params.page"
        :page-size="params.limit"
        style="text-align: right"
        @current-change="handleChangePage"
       ></el-pagination>
     </div>

     <!-- 科目搜索 -->
     <subjectTree :subjectDialog="subjectVisible" :types="subjectType" @close="closeSubjectTree"
                  @selectSubject="selectSubject"></subjectTree>
   </div>
</template>
<script>
  import subjectTree from '../components/subjectTree.vue'
    export default{
        name:'runningAccount',
        components: { subjectTree },
        data(){
            return{
              url: globalConfig.finance_server,
              //列表
              tableList: [],
              diff_sum: 0,
              expend_sum: 0,
              receive_sum: 0,
              tableCount: 0,
              all_count: 0,
              subject_name: '',
              operationTime: '',
              time: '',
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
                search: '',
                page: 1,
                limit: 15,
                start_date: '',
                end_date: '',
                cate: '',
                subject_id: '',
                account_id: '',
                operate_start_date: '',
                operate_end_date: '',
              },
              isHigh: false,
              subjectVisible: false,
              subjectType: '',
              isLoading: false,
              emptyText: ''
            }
        },
        mounted(){
          this.getTableList();
        },
        methods:{
          handleSelRangDate(val) {
            if (val) {
              this.params.operate_start_date = val[0];
              this.params.operate_end_date = val[1];
            } else {
              this.params.operate_start_date = "";
              this.params.operate_end_date = "";
            }
          },
          handleSelRangDate1(val) {
            if (val) {
              this.params.start_date = val[0];
              this.params.end_date = val[1];
            } else {
              this.params.start_date = "";
              this.params.end_date = "";
            }
          },
          handleGoSearch() {
            this.params.page = 1;
            this.getTableList();
          },
          handleChangePage(page) {
            this.params.page = page;
            this.getTableList();
          },
          outData() {
            this.$http.get(this.url + 'fundflow/running/export',{responseType: 'arraybuffer',params: this.params}).then(res => {
              this.$exportData(res.data);
            })
          },
          clearParams() {
            this.subject_name = "";
            this.params.subject_id = "";
          },
          closeSubjectTree() {
            this.subjectVisible = false;
          },
          selectSubject(val) {
            this.subject_name = val.name;
            this.params.subject_id = val.id;
          },
          resetting() {
            this. params = {
              search: '',
              page: 1,
              limit: 12,
              start_date: '',
              end_date: '',
              cate: '',
              subject_id: '',
              account_id: ''
            };
            this.time = "";
            this.operationTime = "";
            this.subject_name = "";
          },
          highGrade() { this.isHigh = false },
          getTableList() {
            this.isHigh = false;
            this.isLoading = true;
            this.$http.get(this.url + 'fundflow/running/index',{params: this.params}).then(res => {
              if (res.data.success) {
                this.isLoading = false;
                this.emptyText = " ";
                this.tableList = res.data.data.data;
                this.diff_sum = res.data.data.diff_sum;
                this.expend_sum = res.data.data.expend_sum;
                this.receive_sum = res.data.data.receive_sum;
                this.all_count = res.data.data.all_count;
              }else {
                this.tableList = [];
                this.diff_sum = res.data.data.diff_sum;
                this.expend_sum = res.data.data.expend_sum;
                this.receive_sum = res.data.data.receive_sum;
                this.all_count = res.data.data.all_count;
                this.isLoading = false;
                this.emptyText = "暂无数据";
              }
            }).catch(err => {
              console.log(err);
            })
          }
        }
    }

</script>
<style scoped>
  #runningAccount{

  }
</style>
