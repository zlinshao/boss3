<template>
  <div>
    <div class="tabs">
      <div>选择模板</div>
      <div style="margin: 10px 0;">
        <el-button :class="{'primary': active === index}" @click="tagClick(index)" size="mini"
                   v-for="(key,index) in buttonVal" :key="index">{{key}}
        </el-button>
      </div>
    </div>
    <div v-if="dayRecord">
      <el-form size="mini" onsubmit="return false;" :model="dayForm" >
        <div class="sendLog">
          <div class="sendTitle">今日完成工作</div>
          <el-form-item>
            <el-input v-model="dayForm.finish_job" type="textarea" placeholder="请输入文字" style="margin: 0"></el-input>
          </el-form-item>
        </div>
        <div class="sendLog">
          <div class="sendTitle">未完成工作</div>
          <el-form-item>
            <el-input v-model="dayForm.unfinished_job" type="textarea" placeholder="请输入文字"></el-input>
          </el-form-item>
        </div>
        <div class="sendLog">
          <div class="sendTitle">需协调工作</div>
          <el-form-item>
            <el-input v-model="dayForm.need_coordinate_job" type="textarea" placeholder="请输入文字"></el-input>
          </el-form-item>
        </div>
        <div class="sendLog">
          <div class="sendTitle">备注</div>
          <el-form-item>
            <el-input v-model="dayForm.need_coordinate_job" type="textarea" placeholder="请输入文字"></el-input>
          </el-form-item>
        </div>
        <div class="sendLog">
          <div class="sendTitle">增加照片或附件</div>
          <el-form-item>
            <Upload :ID="'day_record_upload'" @getImg="getImage" :isClear="isClear"></Upload>
          </el-form-item>
        </div>
        <div class="sendLog">
          <div class="sendTitle">发送给</div>
        </div>
        <div style="text-align: center;">
          <el-button type="primary" >提交</el-button>
        </div>
      </el-form>
    </div>
    <div v-if="weekRecord">
      <el-form size="mini" onsubmit="return false;" :model="weekForm"  >
        <div class="sendLog">
          <div class="sendTitle">本周完成工作</div>
          <el-form-item>
            <el-input v-model="weekForm.finish_job" type="textarea" placeholder="请输入文字" style="margin: 0"></el-input>
          </el-form-item>
        </div>
        <div class="sendLog">
          <div class="sendTitle">本周工作总结</div>
          <el-form-item>
            <el-input v-model="weekForm.job_summary" type="textarea" placeholder="请输入文字"></el-input>
          </el-form-item>
        </div>
        <div class="sendLog">
          <div class="sendTitle">下周工作计划</div>
          <el-form-item>
            <el-input v-model="weekForm.next_plan" type="textarea" placeholder="请输入文字"></el-input>
          </el-form-item>
        </div>
        <div class="sendLog">
          <div class="sendTitle">需协调与帮助</div>
          <el-form-item>
            <el-input v-model="weekForm.need_coordinate_job" type="textarea" placeholder="请输入文字"></el-input>
          </el-form-item>
        </div>
        <div class="sendLog">
          <div class="sendTitle">备注</div>
          <el-form-item>
            <el-input v-model="weekForm.remark" type="textarea" placeholder="请输入文字"></el-input>
          </el-form-item>
        </div>
        <div class="sendLog">
          <div class="sendTitle">增加照片或附件</div>
          <el-form-item>
            <Upload :ID="'week_record_upload'" @getImg="getImage" :isClear="isClear"></Upload>
          </el-form-item>
        </div>
        <div class="sendLog">
          <div class="sendTitle">发送给</div>
        </div>
        <div style="text-align: center;">
          <el-button type="primary" >提交</el-button>
        </div>
      </el-form>
    </div>
    <div v-if="monthRecord">
      <el-form size="mini" onsubmit="return false;" :model="monthForm" >
        <div class="sendLog">
          <div class="sendTitle">本月完成工作</div>
          <el-form-item>
            <el-input v-model="monthForm.finish_job" type="textarea" placeholder="请输入文字" style="margin: 0"></el-input>
          </el-form-item>
        </div>
        <div class="sendLog">
          <div class="sendTitle">本月工作总结</div>
          <el-form-item>
            <el-input v-model="monthForm.job_summary" type="textarea" placeholder="请输入文字"></el-input>
          </el-form-item>
        </div>
        <div class="sendLog">
          <div class="sendTitle">下月工作计划</div>
          <el-form-item>
            <el-input v-model="monthForm.next_plan" type="textarea" placeholder="请输入文字"></el-input>
          </el-form-item>
        </div>
        <div class="sendLog">
          <div class="sendTitle">需帮助与支持</div>
          <el-form-item>
            <el-input v-model="monthForm.need_coordinate_job" type="textarea" placeholder="请输入文字"></el-input>
          </el-form-item>
        </div>
        <div class="sendLog">
          <div class="sendTitle">备注</div>
          <el-form-item>
            <el-input v-model="monthForm.remark" type="textarea" placeholder="请输入文字"></el-input>
          </el-form-item>
        </div>
        <div class="sendLog">
          <div class="sendTitle">增加照片或附件</div>
          <el-form-item>
            <Upload :ID="'month_record_upload'" @getImg="getImage" :isClear="isClear"></Upload>
          </el-form-item>
        </div>
        <div class="sendLog">
          <div class="sendTitle">发送给</div>
        </div>
        <div style="text-align: center;">
          <el-button type="primary" >提交</el-button>
        </div>
      </el-form>
    </div>
    <div v-if="achieveDayRecord">
      <el-form size="mini" onsubmit="return false;" :model="achieveForm" >
        <div class="sendLog">
          <div class="sendTitle">今日营业额</div>
          <el-form-item>
            <el-input v-model="achieveForm.turnover_today" type="text" placeholder="请输入数字" style="width: 300px;"></el-input>
          </el-form-item>
        </div>
        <div class="sendLog">
          <div class="sendTitle">今日客户数</div>
          <el-form-item>
            <el-input v-model="achieveForm.customer_num" type="text" placeholder="请输入数字"  style="width: 300px;"></el-input>
          </el-form-item>
        </div>
        <div class="sendLog">
          <div class="sendTitle">月累计营业额</div>
          <el-form-item>
            <el-input v-model="achieveForm.month_total_turnover" type="text" placeholder="请输入数字"  style="width: 300px;"></el-input>
          </el-form-item>
        </div>
        <div class="sendLog">
          <div class="sendTitle">本月业绩目标</div>
          <el-form-item>
            <el-input v-model="achieveForm.month_achievement_goals" type="text" placeholder="请输入数字"  style="width: 300px;"></el-input>
          </el-form-item>
        </div>
        <div class="sendLog">
          <div class="sendTitle">今日思考</div>
          <el-form-item>
            <el-input v-model="achieveForm.thinking_today" type="textarea" placeholder="请输入文字"></el-input>
          </el-form-item>
        </div>
        <div class="sendLog">
          <div class="sendTitle">备注</div>
          <el-form-item>
            <el-input v-model="achieveForm.remark" type="textarea" placeholder="请填写备注"></el-input>
          </el-form-item>
        </div>
        <div class="sendLog">
          <div class="sendTitle">增加照片或附件</div>
          <el-form-item>
            <Upload :ID="'month_record_upload'" @getImg="getImage" :isClear="isClear"></Upload>
          </el-form-item>
        </div>
        <div class="sendLog">
          <div class="sendTitle">发送给</div>
        </div>
        <div style="text-align: center;">
          <el-button type="primary" >提交</el-button>
        </div>
      </el-form>
    </div>
  </div>
</template>

<script>
  import Upload from '../../common/UPLOAD.vue';
  export default {
    name: 'hello',
    components:{Upload},
    data () {
      return {
        personnal: globalConfig.personal,
        buttonVal: ['日报', '周报', '月报', '业绩日报'],  // 0 1 2 3
        active: 0,
        dayRecord: true,
        weekRecord: false,
        monthRecord: false,
        achieveDayRecord: false,
        // 日报
        dayForm: {
          finish_job: '',
          unfinished_job:'',
          need_coordinate_job: '',
          remark: '',
          picture_ids: [],
        },
        //周报
        weekForm: {
          finish_job: '',
          job_summary: '',
          next_plan: '',
          need_coordinate_job: '',
          remark: '',
        },
        monthForm: {
          finish_job: '',
          job_summary: '',
          next_plan: '',
          need_coordinate_job: '',
          remark: '',
        },
        achieveForm: {
          turnover_today: '',
          customer_num: '',
          month_total_turnover: '',
          month_achievement_goals: '',
          thinking_today: '',
          remark: '',
        },
        isClear: false,
      }
    },
    methods:{
      // 按钮切换
      tagClick(val) {
        this.active = val;
        switch(val) {
          case 0:  //日报
            this.dayRecord = true;
            this.weekRecord = this.monthRecord = this.achieveDayRecord = false;
            break;
          case 1:  //周报
            this.weekRecord = true;
            this.dayRecord = this.monthRecord = this.achieveDayRecord = false;
            break;
          case 2:  //月报
            this.monthRecord = true;
            this.dayRecord = this.weekRecord = this.achieveDayRecord = false;
            break;
          case 3:  //业绩日报
            this.achieveDayRecord = true;
            this.dayRecord = this.monthRecord = this.weekRecord = false;
            break;
        }

      },
      getImage(val) {
        console.log(val);
        this.dayForm.picture_ids = val[1]; //选择的图片数组ids
        // this.uploadImgLength = val[1].length;
      },
    },
    mounted() {

    },
    activated() {

    },
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
  .el-form-item .el-form-item__content{
    margin-left: 0;
  }
  .tabs {
    padding: 0 10px;
    div {
      button + button {
        margin-left: 10px;
      }
    }
    .primary {
      background: #409EFF;
      border-color: #409EFF;
      color: #ffffff;
    }
  }
  .sendLog {
    div.sendTitle {
      margin: 18px 0 6px;
    }
  }
</style>
