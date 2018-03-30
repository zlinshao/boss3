<template>
   <div>
     <div style="margin: 15px 10px">
       <el-row >
         <el-col :span="2">发送人</el-col>
         <el-col :span="7"><el-input type="text" size="mini" placeholder="请选择发送人"></el-input></el-col>
         <el-col :span="3" style="margin-left: 38px;"><el-button class="primary" size="mini">搜索</el-button></el-col>
       </el-row>
       <el-row style="margin: 20px 0;">
         <el-col :span="2"> 时间</el-col>
         <el-date-picker v-model="form.start_time" type="date" size="mini" placeholder="选择日期"></el-date-picker> ——
         <el-date-picker v-model="form.end_time" type="date" size="mini"  placeholder="选择日期"></el-date-picker>
       </el-row>
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
   </div>
</template>

<script>
    export default {
        name: 'hello',
        data () {
            return {
              form: {
                staff_id: '',
                start_time: '',
                end_time: '',
                limit: 12,
                page: 1,
                type: 1, // 1 2 3 4 日周月业绩
                style: 'count',
                self: '',
              },
              buttonVal: ['日报', '周报', '月报', '业绩日报'],
              active: 0,
              logData: [],
            }
        },
      methods: {
        getLookLog() {
          this.$http.get(globalConfig.server+ 'oa/daily_tmp/index?style=count&self=1&page=1&type='+(this.active+1) ).then((res) => {
            if(res.data.code === '80000') {
              this.logData = res.data.data.data;
            }
          });
        },
        // 按钮切换
        tagClick(val) {
          this.active = val;
          this.getLookLog();
          // switch(val) {
          //   case 0:  //日报
          //     this.form.type = 1;
          //     this.getLookLog();
          //     break;
          //   case 1:  //月报
          //     this.form.type = 2;
          //     this.getLookLog();
          //     break;
          //   case 2:  //周报
          //     this.form.type = 3;
          //     this.getLookLog();
          //     break;
          //   case 3:  //业绩日报
          //     this.form.type = 4;
          //     this.getLookLog();
          //     break;
          // }
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
