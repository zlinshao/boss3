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
                    <el-input v-model="selectMemberName" @focus="openOrganize" placeholder="点击选择发送人" readonly>
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
                      value-format="yyyy-MM-dd"
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
    <div class="lookLog" v-for="item in lookLogData" v-if="lookLogData.length>0">
      <div class="pic">
        <img :src="item.creator_id.avatar" v-if="item.creator_id.avatar">
        <img src="../../../assets/images/head.jpg" v-else>
      </div>
      <div style="width: 100%">
        <div class="titles">
          <div class="a">{{item.creator_id.name}}
            的<span v-if="item.module === 'app\\oa\\model\\DailyDay'">日报</span>
            <span v-if="item.module === 'app\\oa\\model\\DailyWeek'">周报</span>
            <span v-if="item.module === 'app\\oa\\model\\DailyMonth'">月报</span>
            <span v-if="item.module === 'app\\oa\\model\\DailyAchievement'">业绩日报</span>
          </div>
          <div style="display: inline-block;float: right;cursor: pointer;" v-if="personal.id===item.creator_id.id">
            <i class="el-icon-edit" style="font-size: 16px;" @click="editLog(item)"></i>
          </div>
          <div class="b">{{item.create_time}}</div>
          <div v-if="item.module === 'app\\oa\\model\\DailyDay'">
            <p>今日完成工作：<span>{{item.daily.finish_job}}</span></p>
            <p>未完成工作：<span>{{item.daily.unfinished_job}}</span></p>
            <p>需协调工作：<span>{{item.daily.need_coordinate_job}}</span></p>
            <p>备注：<span>{{item.daily.remark}}</span></p>
          </div>
          <div v-if="item.module === 'app\\oa\\model\\DailyWeek'">
            <p>本周完成工作：<span>{{item.daily.finish_job}}</span></p>
            <p>本周工作总结：<span>{{item.daily.job_summary}}</span></p>
            <p>下周工作计划：<span>{{item.daily.next_plan}}</span></p>
            <p>需协调与帮助：<span>{{item.daily.need_coordinate_job}}</span></p>
            <p>备注：<span>{{item.daily.remark}}</span></p>
          </div>
          <div  v-if="item.module === 'app\\oa\\model\\DailyMonth'">
            <p>本月完成工作：<span>{{item.daily.finish_job}}</span></p>
            <p>本月工作总结：<span>{{item.daily.job_summary}}</span></p>
            <p>下月工作计划：<span>{{item.daily.next_plan}}</span></p>
            <p>需帮助与支持：<span>{{item.daily.need_coordinate_job}}</span></p>
            <p>备注：<span>{{item.daily.remark}}</span></p>
          </div>
          <div v-if="item.module === 'app\\oa\\model\\DailyAchievement'">
            <p>今日营业额：<span>{{item.daily.turnover_today}}</span></p>
            <p>今日客户数：<span>{{item.daily.customer_num}}</span></p>
            <p>月累计营业额：<span>{{item.daily.month_total_turnover}}</span></p>
            <p>本月业绩目标：<span>{{item.daily.month_achievement_goals}}</span></p>
            <p>今日思考：<span>{{item.daily.thinking_today}}</span></p>
            <p>备注：<span>{{item.daily.remark}}</span></p>
          </div>
          <div  class="image_file">
            <span v-for="pic in item.daily.album.image_pic" v-if="item.daily && item.daily.album">
              <img :src="pic[0].uri">
            </span>
            <span v-for="pic in item.daily.album.annex_file" @click="downLoad(pic)" v-if="item.daily && item.daily.album">
              <img src="../../../assets/images/file.svg" style="width: 30px;background: aliceblue;border-radius: 5px;padding: 0 10px;">
            </span>
          </div>
        </div>
        <div class="lookPeople">
          <div><span v-if="item.receivers">{{item.receivers.length}}</span> <span v-else>0</span>人已读</div>
          <span v-for="(value,key) in item.receivers" v-if="key<=12">
                  <img :src="value.avatar" v-if="value.avatar">
                  <img src="../../../assets/images/head.jpg" v-else>
                </span>
          <p v-if="item.receivers && item.receivers.length>12">●●●</p>
        </div>

        <!--<div class="commentContent" v-if="false">-->
          <!--<div v-for="key in 3">-->
            <!--<span>习大大：</span>-->
            <!--<span>发射点范德萨范德萨范德萨范德萨打发</span>-->
          <!--</div>-->
          <!--<p>-->
            <!--全部22条评论-->
          <!--</p>-->
        <!--</div>-->
        <!--<div class="comment" v-if="false">-->
          <!--<el-input class="comInput" size="mini" placeholder="请输入内容" v-model="comments"></el-input>-->
          <!--<el-button size="mini" type="primary">评&nbsp;论</el-button>-->
        <!--</div>-->
      </div>
    </div>
    <div v-if="lookLogData.length===0" style="text-align: center;height: 100px;">暂无数据</div>
    <div class="block pages">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="form.page"
        :page-size="6"
        layout="total, prev, pager, next, jumper"
        :total="totalNum">
      </el-pagination>
    </div>
    <!--组织架构-->
    <organization :organizationDialog="organizeVisible" :type="organizaType" @close="closeOrganize" @selectMember="selectMember"></organization>
    <eat-loading :loading="loading"></eat-loading>
  </div>
</template>

<script>
  import Organization from '../../common/organization.vue';
  import EatLoading from '../../common/eatLoading.vue'
  export default {
    components:{Organization,EatLoading},
    props: ['getData'],
    data () {
      return {
        lookLogData: [],
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
          type: '', // 1 2 3 4 日周月业绩
          // style: '',  //看日志 list 日志列表count
          self: '',
        },
        totalNum: 0,
        buttonVal: ['全部','我发出的','日报', '周报', '月报', '业绩日报'],
        active: 0,
        isHigh: false,
        organizeVisible: false,
        organizaType: '',
        selectMemberName: '',
        loading: false,
        personal: {},
      }
    },
    methods: {
      downLoad(val){
        console.log(val);
        window.open(val[0].uri);
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
      getLookLog() {
        this.loading = true;
        if(this.form.date){
          this.form.start_time = this.form.date[0];
          this.form.end_time = this.form.date[1];
        }else{
          this.form.start_time = '';
          this.form.end_time = '';
        }
        this.$http.get(globalConfig.server+ 'oa/daily_tmp/index?limit=6&page='+this.form.page+'&self='+this.form.self+'&staff_id='+this.form.staff_id+
          '&type='+this.form.type+'&start_time='+this.form.start_time+'&end_time='+this.form.end_time).then((res) => {
          if(res.data.code === '80000') {
            this.lookLogData = res.data.data.data;
            this.isHigh = false;
            this.totalNum = res.data.data.count;
            this.loading = false;
          }
        });
      },
      selectMember(val){
        this.organizationDialog = false;
        this.selectMemberName = val[0].name;
        this.form.staff_id = val[0].id;
      },
      // 重置
      resetting() {
        this.form.staff_id = '';
        this.selectMemberName = '';
        this.form.date = '';
        this.form.start_time = this.form.end_time = '';
      },
      // 高级
      highGrade() {
        this.isHigh = !this.isHigh;
      },
      close_() {
        this.form.staff_id = '';
        this.selectMemberName = '';
      },
      editLog(val) {
        this.$emit("editLog",val);
      },
      // 按钮切换
      tagClick(val) {
        this.active = val;
        this.loading = true;
        switch(val) {
          case 0:  //全部
            this.form.self='';
            this.form.start_time='';
            this.form.end_time='';
            this.form.type='';
            this.getLookLog();
            break;
          case 1:  //我发出的
            this.form.self = 1;
            this.form.type = '';
            this.form.start_time='';
            this.form.end_time='';
            this.getLookLog();
            break;
          case 2:  //日报
            this.form.type = 1;
            this.getLookLog();
            break;
          case 3:  //月报
            this.form.type = 2;
            this.getLookLog();
            break;
          case 4:  //周报
            this.form.type = 3;
            this.getLookLog();
            break;
          case 5:  //业绩日报
            this.form.type = 4;
            this.getLookLog();
            break;
        }
      },
    },
    created(){
      this.personal = JSON.parse(localStorage.personal);
    },
    mounted() {
      this.getLookLog();
      this.personal = JSON.parse(localStorage.personal);
    },
    activated() {
      this.getLookLog();
      this.personal = JSON.parse(localStorage.personal);
    },
    watch:{
      getData(val) {
        this.getLookLog();
      },
    },
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
    .filter {
    padding-top: 10px;
  }
  .highRanking .high_grade {
    position: absolute;
    top: 40px;
    right: 0;
    left: 0;
    padding: 0;
    background: #FFFFFF;
    -webkit-box-shadow: 0 3px 16px 0 #aaa;
    -moz-box-shadow: 0 3px 16px 0 #aaa;
    box-shadow: 0 3px 16px 0 #aaa;
    z-index: -1;
    opacity: 0;
    /* transition: all .4s; */
  }
  .highRanking .highHide {
    z-index: 20;
    opacity: 1;
    /* transition: all .4s; */
  }
  .image_file{
    margin-top: 10px;
  }
  .image_file img{
    width: 50px;
    height: 50px;
    margin-left: 5px;
  }
  .primary {
    background: #409EFF;
    border-color: #409EFF;
    color: #ffffff;
  }
  @mixin flex {
    display: flex;
    display: -webkit-flex;
  }

  @mixin border_radius($n) {
    -webkit-border-radius: $n;
    -moz-border-radius: $n;
    border-radius: $n;
  }

  @mixin minMax {
    min-width: 40px;
    max-width: 40px;
    min-height: 40px;
    max-height: 40px;
  }

  img {
    width: 100%;
    height: 100%;
    @include border_radius(50%);
  }
  .lookLog {
    padding: 18px;
    margin: 12px;
    @include flex;
    @include border_radius(6px);
    -webkit-box-shadow: 0 2px 15px 0 #aaaaaa;
    -moz-box-shadow: 0 2px 15px 0 #aaaaaa;
    box-shadow: 0 2px 15px 0 #aaaaaa;
    p {
      margin: 0;
      line-height: 26px;
      font-size: 14px;
    }
    span{
      font-size: 16px;
    }
    .pic {
      @include minMax;
      margin-right: 12px;
    }
    .titles {
      .a {
        font-size: 15px;
      }
      .b {
        font-size: 12px;
        margin: 6px 0;
      }
    }
    .lookPeople {
      @include flex;
      padding: 12px 0;
      margin: 10px 0;
      border: 1px solid #DFE6FB;
      border-left: none;
      border-right: none;
      div {
        width: 100px;
        background: #DFE6FB;
        height: 36px;
        color: #ffffff;
        text-align: center;
        line-height: 36px;
      }
      p, span {
        width: 36px;
        height: 36px;
        line-height: 36px;
        margin-left: 10px;
        cursor: pointer;
      }
      p {
        @include border_radius(50%);
        text-align: center;
        background: #cccccc;
        font-size: 12px;
        color: #ffffff;
      }
    }
    .commentContent {
      div {
        font-size: 12px;
        line-height: 20px;
        span:first-of-type {
          color: #409EFF;
        }
      }
      p {
        cursor: pointer;
        font-size: 12px;
        color: #409EFF;
      }
    }
    .comment {
      margin-top: 6px;
      @include flex;
      .comInput {
        margin-right: 20px;
      }
    }
  }
</style>
