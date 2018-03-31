<template>
   <div>
     <div class="highRanking">
       <div class="highSearch">
         <el-form :inline="true" size="mini">
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
                   <div class="el_col_label">发送人</div>
                 </el-col>
                 <el-col :span="16" class="el_col_option">
                   <el-form-item>
                     <el-input v-model="selectMemberName" @focus="openOrganize" placeholder="点击选择发送人"
                               readonly>
                       <template slot="append">
                         <div style="cursor: pointer;" @click="close_">清空</div>
                       </template>
                     </el-input>
                   </el-form-item>
                 </el-col>
               </el-row>
             </el-col>
             <el-col :span="12">
               <el-row>
                 <el-col :span="8">
                   <div class="el_col_label">选择时间</div>
                 </el-col>
                 <el-col :span="16" class="el_col_option">
                   <el-form-item>
                     <el-date-picker
                       v-model="form.date"
                       type="daterange"
                       align="right"
                       unlink-panels
                       range-separator="至"
                       start-placeholder="开始日期"
                       end-placeholder="结束日期"
                       :picker-options="pickerOptions"
                     >
                     </el-date-picker>
                     <!--<el-date-picker v-model="form.start_time" type="date" size="mini" placeholder="选择日期" style="width:160px;"></el-date-picker>至-->
                   </el-form-item>
                   <!--<el-form-item>-->
                   <!--<el-date-picker v-model="form.end_time" type="date" size="mini"  placeholder="选择日期" style="width:160px;"></el-date-picker>-->
                   <!--</el-form-item>-->
                 </el-col>
               </el-row>
             </el-col>
           </el-row>
           <div class="btnOperate">
             <el-button size="mini" type="primary" @click="getLookLog">搜索</el-button>
             <el-button size="mini" type="primary" @click="resetting">重置</el-button>
             <el-button size="mini" type="primary" @click="highGrade">取消</el-button>
           </div>
         </el-form>
       </div>
     </div>
     <div style="margin: 10px 0;">
       <el-button :class="{'primary': active === index}" @click="tagClick(index)" size="mini"
                  v-for="(key,index) in buttonVal" :key="index">{{key}}
       </el-button>
     </div>
     <div v-if="active===0">
       <el-table
         :data="logData"
         width="100%">
         <el-table-column
           label="填报人"
           prop="creator_id.name">
         </el-table-column>
         <el-table-column
           label="填报时间"
           prop="create_time">
         </el-table-column>
         <el-table-column
           label="今日完成工作"
           prop="daily.finish_job">
         </el-table-column>
         <el-table-column
           label="未完成工作"
           prop="daily.unfinished_job">
         </el-table-column>
         <el-table-column
           label="需协调工作"
           prop="daily.need_coordinate_job">
         </el-table-column>
       </el-table>
     </div>
     <div v-if="active===1">
       <el-table
         :data="logData"
         width="100%">
         <el-table-column
           label="填报人"
           prop="creator_id.name">
         </el-table-column>
         <el-table-column
           label="填报时间"
           prop="create_time">
         </el-table-column>
         <el-table-column
           label="本周完成工作"
           prop="daily.finish_job">
         </el-table-column>
         <el-table-column
           label="本周工作总结"
           prop="daily.job_summary">
         </el-table-column>
         <el-table-column
           label="下周工作计划"
           prop="daily.next_plan">
         </el-table-column>
         <el-table-column
           label="需协调与帮助"
           prop="daily.need_coordinate_job">
         </el-table-column>
       </el-table>
     </div>
     <div v-if="active===2">
       <el-table
         :data="logData"
         width="100%">
         <el-table-column
           label="填报人"
           prop="creator_id.name">
         </el-table-column>
         <el-table-column
           label="填报时间"
           prop="create_time">
         </el-table-column>
         <el-table-column
           label="本月工作内容"
           prop="daily.finish_job">
         </el-table-column>
         <el-table-column
           label="本月工作总结"
           prop="daily.job_summary">
         </el-table-column>
         <el-table-column
           label="下月工作计划"
           prop="daily.next_plan">
         </el-table-column>
         <el-table-column
           label="需帮助与支持"
           prop="daily.need_coordinate_job">
         </el-table-column>
       </el-table>
     </div>
     <div v-if="active===3">
       <el-table
         :data="logData"
         width="100%">
         <el-table-column
           label="填报人"
           prop="creator_id.name">
         </el-table-column>
         <el-table-column
           label="填报时间"
           prop="create_time">
         </el-table-column>
         <el-table-column
           label="今日营业额"
           prop="daily.turnover_today">
         </el-table-column>
         <el-table-column
           label="今日客户数"
           prop="daily.customer_num">
         </el-table-column>
         <el-table-column
           label="月累计营业额"
           prop="daily.month_total_turnover">
         </el-table-column>
         <el-table-column
           label="本月业绩目标"
           prop="daily.month_achievement_goals">
         </el-table-column>
         <el-table-column
           label="今日思考"
           prop="daily.thinking_today">
         </el-table-column>
       </el-table>
     </div>
     <div class="block pages">
       <el-pagination
         @size-change="handleSizeChange"
         @current-change="handleCurrentChange"
         :current-page="form.page"
         :page-size="12"
         layout="total, prev, pager, next, jumper"
         :total="totalNum">
       </el-pagination>
     </div>
     <!--组织架构-->
     <organization :organizationDialog="organizeVisible" :type="organizaType" @close="closeOrganize"></organization>
   </div>
</template>

<script>
  import Organization from '../../common/organization.vue'
    export default {
        name: 'hello',
        components: {Organization},
        data () {
            return {
              pickerOptions: {
                shortcuts: [
                  {
                    text: '最近一天',
                    onClick(picker) {
                      const end = new Date();
                      const start = new Date();
                      start.setTime(start.getTime() - 3600 * 1000 * 24 * 1);
                      picker.$emit('pick', [start, end]);
                    }
                  },
                  {
                    text: '最近一周',
                    onClick(picker) {
                      const end = new Date();
                      const start = new Date();
                      start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
                      picker.$emit('pick', [start, end]);
                    }
                  },
                  {
                    text: '最近一个月',
                    onClick(picker) {
                      const end = new Date();
                      const start = new Date();
                      start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
                      picker.$emit('pick', [start, end]);
                    }
                  }]
              },
              form: {
                staff_id: '',
                date: '',
                start_time: '',
                end_time: '',
                page: 1,
                type: 1, // 1 2 3 4 日周月业绩
                style: 'count',
                self: '',
              },
              buttonVal: ['日报', '周报', '月报', '业绩日报'],
              active: 0,
              logData: [],
              isHigh: false,
              organizeVisible: false,
              organizaType: '',
              totalNum: 0,
              selectMemberName: '',
            }
        },
      methods: {
        // 重置
        resetting() {
          this.form.staff_id = '';
          this.selectMemberName = '';
          this.form.start_time =this.end_time = '';
        },
        // 高级
        highGrade() {
          this.isHigh = !this.isHigh;
        },
        close_() {
          this.form.staff_id = '';
          this.selectMemberName = '';
        },
        getLookLog() {
          if(this.form.date){
            this.form.start_time = this.form.date[0];
            this.form.end_time = this.form.date[1];
          }else{
            this.form.start_time = '';
            this.form.end_time = '';
          }
          this.$http.get(globalConfig.server+ 'oa/daily_tmp/index?style=count&self=1&limit=12&type='+(this.active+1)+'&page='+this.form.page
            +'&start_time='+this.form.start_time+'&end_time='+this.form.end_time).then((res) => {
            if(res.data.code === '80000') {
              this.logData = res.data.data.data;
              this.totalNum = res.data.data.count;
            }
          });
        },
        handleSizeChange(val) {
          console.log(`每页 ${val} 条`);
        },
        handleCurrentChange(val) {
          console.log(`当前页: ${val}`);
          this.form.page = val;
          this.getLookLog();
        },
        openOrganize() {
          this.organizeVisible = true;
          this.organizaType = 'staff';
        },
        closeOrganize() {
          this.organizeVisible = false;
        },
        selectMember(val){
          this.organizationDialog = false;
          this.selectMemberName = val[0].name;
          this.form.staff_id = val[0].id;
        },
        // 按钮切换
        tagClick(val) {
          this.active = val;
          this.getLookLog();
        },
      },
      mounted() {
        this.getLookLog();
      },
      activated() {
        this.getLookLog();
      },
    }
</script>

<style scoped>
  .primary {
    background: #409EFF;
    border-color: #409EFF;
    color: #ffffff;
  }
</style>
