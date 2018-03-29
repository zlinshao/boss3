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
            <el-input v-model="dayForm.remark" type="textarea" placeholder="请填写备注"></el-input>
          </el-form-item>
        </div>
        <div class="sendLog">
          <div class="sendTitle">增加照片</div>
          <el-form-item>
            <Upload :ID="'record_img'" @getImg="getImage" :isClear="isClear"></Upload>
          </el-form-item>
        </div>
        <div class="sendLog">
          <div class="sendTitle">增加附件</div>
          <el-form-item>
            <Upload :ID="'record_file'" @getImg="getFile" :isClear="isClear"></Upload>
          </el-form-item>
        </div>
        <div class="sendLog">
          <div class="sendTitle">发给谁 <span style="color: #cdcdcd;">（默认通过工作通知发送给对方，点击头像删除）</span></div>
          <div>
            <span v-for="item in sendPeople" class="send_people">
              <img :src="item.avatar" v-if="item.avatar">
              <img src="../../../assets/images/head.jpg" v-else>
            </span>
            <img src="../../../assets/images/add.svg" @click="choosePeople">
          </div>
        </div>
        <div style="text-align: center;">
          <el-button type="primary" @click="dayRecordSubmit">提交</el-button>
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
            <el-input v-model="weekForm.remark" type="textarea" placeholder="请填写备注"></el-input>
          </el-form-item>
        </div>
        <div class="sendLog">
          <div class="sendTitle">增加照片</div>
          <el-form-item>
            <Upload :ID="'record_img'" @getImg="getImage" :isClear="isClear"></Upload>
          </el-form-item>
        </div>
        <div class="sendLog">
          <div class="sendTitle">增加附件</div>
          <el-form-item>
            <Upload :ID="'record_file'" @getImg="getFile" :isClear="isClear"></Upload>
          </el-form-item>
        </div>
        <div class="sendLog">
          <div class="sendTitle">发给谁 <span style="color: #cdcdcd;">（默认通过工作通知发送给对方，点击头像删除）</span></div>
          <div>
            <span v-for="item in sendPeople" class="send_people">
              <img :src="item.avatar" v-if="item.avatar">
              <img src="../../../assets/images/head.jpg" v-else>
            </span>
            <img src="../../../assets/images/add.svg" @click="choosePeople">
          </div>
        </div>
        <div style="text-align: center;">
          <el-button type="primary" @click="weekRecordSubmit">提交</el-button>
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
            <el-input v-model="monthForm.remark" type="textarea" placeholder="请填写备注"></el-input>
          </el-form-item>
        </div>
        <div class="sendLog">
          <div class="sendTitle">增加照片</div>
          <el-form-item>
            <Upload :ID="'record_img'" @getImg="getImage" :isClear="isClear"></Upload>
          </el-form-item>
        </div>
        <div class="sendLog">
          <div class="sendTitle">增加附件</div>
          <el-form-item>
            <Upload :ID="'record_file'" @getImg="getFile" :isClear="isClear"></Upload>
          </el-form-item>
        </div>
        <div class="sendLog">
          <div class="sendTitle">发给谁 <span style="color: #cdcdcd;">（默认通过工作通知发送给对方，点击头像删除）</span></div>
          <div>
            <span v-for="item in sendPeople" class="send_people">
              <img :src="item.avatar" v-if="item.avatar">
              <img src="../../../assets/images/head.jpg" v-else>
            </span>
            <img src="../../../assets/images/add.svg" @click="choosePeople">
          </div>
        </div>
        <div style="text-align: center;">
          <el-button type="primary" @click="monthRecordSubmit">提交</el-button>
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
          <div class="sendTitle">增加照片</div>
          <el-form-item>
            <Upload :ID="'record_img'" @getImg="getImage" :isClear="isClear"></Upload>
          </el-form-item>
        </div>
        <div class="sendLog">
          <div class="sendTitle">增加照片或附件</div>
          <el-form-item>
            <Upload :ID="'record_file'" @getImg="getFile" :isClear="isClear"></Upload>
          </el-form-item>
        </div>
        <div class="sendLog">
          <div class="sendTitle">发给谁 <span style="color: #cdcdcd;">（默认通过工作通知发送给对方，点击头像删除）</span></div>
          <div>
            <span v-for="item in sendPeople" class="send_people">
              <img :src="item.avatar" v-if="item.avatar">
              <img src="../../../assets/images/head.jpg" v-else>
            </span>
            <img src="../../../assets/images/add.svg" @click="choosePeople">
          </div>
        </div>
        <div style="text-align: center;">
          <el-button type="primary" @click="achieveDayRecordSubmit">提交</el-button>
        </div>
      </el-form>
    </div>
    <Organization :organizationDialog="organizationDialog" :type="selectType" @close="closeOrganization" @selectMember="selectMember"></Organization>
  </div>
</template>

<script>
  import Upload from '../../common/UPLOAD.vue';
  import Organization from '../../common/organization.vue'
  export default {
    name: 'hello',
    components:{Upload, Organization},
    data () {
      return {
        personnal: globalConfig.personal,
        buttonVal: ['日报', '周报', '月报', '业绩日报'],  // active 0 1 2 3
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
          image_pic: [],
          annex_file: [],
          receivers_id: [],
        },
        //周报
        weekForm: {
          finish_job: '',
          job_summary: '',
          next_plan: '',
          need_coordinate_job: '',
          remark: '',
          image_pic: [],
          annex_file: [],
          receivers_id: [],
        },
        // 月报
        monthForm: {
          finish_job: '',
          job_summary: '',
          next_plan: '',
          need_coordinate_job: '',
          remark: '',
          image_pic: [],
          annex_file: [],
          receivers_id: [],
        },
        // 业绩日报
        achieveForm: {
          turnover_today: '',
          customer_num: '',
          month_total_turnover: '',
          month_achievement_goals: '',
          thinking_today: '',
          remark: '',
          image_pic: [],
          annex_file: [],
          receivers_id: [],
        },
        organizationDialog: false,
        isClear: false,
        selectType: '',
        sendPeople: [],
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
        switch(this.active){
          case 0:
            this.dayForm.image_pic = val[1]; //选择的图片数组ids
            break;
          case 1:
            this.weekForm.image_pic = val[1]; //选择的图片数组ids
            break;
          case 2:
            this.monthForm.image_pic = val[1]; //选择的图片数组ids
            break;
          case 3:
            this.achieveForm.image_pic = val[1]; //选择的图片数组ids
            break;
        }
      },
      getFile(val) {
        switch(this.active){
          case 0:
            this.dayForm.annex_file = val[1]; //选择的文件数组ids
            break;
          case 1:
            this.weekForm.annex_file = val[1]; //选择的文件数组ids
            break;
          case 2:
            this.monthForm.annex_file = val[1]; //选择的文件数组ids
            break;
          case 3:
            this.achieveForm.annex_file = val[1]; //选择的文件数组ids
            break;
        }
      },
      // 提交日报
      dayRecordSubmit(){
        this.$http.post(globalConfig.server+ 'oa/day',this.dayForm).then((res) => {
            if(res.data.code === '100010') {
              this.dayForm = {};
              this.isClear = true;
              this.sendPeople = [];
              this.$emit('appointLookLog'); //发完日志跳转到我发的日志标签页
              this.$notify.success({
                title: '成功',
                message: res.data.msg
              })
            } else {
              this.$notify.warning({
                title: '警告',
                message: res.data.msg
              })
            }
        });
      },
      // 提交周报
      weekRecordSubmit() {
        this.$http.post(globalConfig.server+ 'oa/week',this.weekForm).then((res) => {
          if(res.data.code === '110010') {
            this.weekForm = {};
            this.isClear = true;
            this.sendPeople = [];
            this.$emit('appointLookLog');
            this.$notify.success({
              title: '成功',
              message: res.data.msg
            })
          } else {
            this.$notify.warning({
              title: '警告',
              message: res.data.msg
            })
          }
        });
      },
      // 提交月报
      monthRecordSubmit() {
        this.$http.post(globalConfig.server+ 'oa/month',this.monthForm).then((res) => {
          if(res.data.code === '120010') {
            this.monthForm = {};
            this.isClear = true;
            this.sendPeople = [];
            this.$emit('appointLookLog');
            this.$notify.success({
              title: '成功',
              message: res.data.msg
            });
          } else {
            this.$notify.warning({
              title: '警告',
              message: res.data.msg
            });
          }
        });
      },
      // 提交业绩日报
      achieveDayRecordSubmit(){
        this.$http.post(globalConfig.server+ 'oa/achievement',this.achieveForm).then((res) => {
          if(res.data.code === '130010') {
            this.achieveForm = {};
            this.isClear = true;
            this.sendPeople = [];
            this.$emit('appointLookLog');
            this.$notify.success({
              title: '成功',
              message: res.data.msg
            });
          } else {
            this.$notify.warning({
              title: '警告',
              message: res.data.msg
            });
          }
        });
      },
      choosePeople() {
        this.organizationDialog = true;
        this.selectType = 'staff';
      },
      //关闭选人框回调
      closeOrganization(){
        this.organizationDialog = false;
      },
      selectMember(val){
        console.log("selectMember==="+JSON.stringify(val));
        this.organizationDialog = false;
        this.sendPeople = val;
        switch(this.active){
          case 0:
            for(var i=0; i<this.sendPeople.length;i++){
              this.dayForm.receivers_id.push(this.sendPeople[i].id);
            }
            break;
          case 1:
            for(var i=0; i<this.sendPeople.length;i++){
              this.weekForm.receivers_id.push(this.sendPeople[i].id);
            }
            break;
          case 2:
            for(var i=0; i<this.sendPeople.length;i++){
              this.monthForm.receivers_id.push(this.sendPeople[i].id);
            }
            break;
          case 3:
            for(var i=0; i<this.sendPeople.length;i++){
              this.achieveForm.receivers_id.push(this.sendPeople[i].id);
            }
            break;
        }

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
  .send_people img{
    width: 45px;
    height: 45px;
    border-radius: 50%;
    margin-left: 5px;
  }
</style>
