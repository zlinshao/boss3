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
            <!--<span v-if="editImages" v-for="img in editImages">-->
              <!--<img :src="img.uri" style="width: 120px;height: 120px;border-radius: 5px;">-->
            <!--</span>-->
            <Upload :ID="'record_img'" @getImg="getImage" :editImage="editImgToUpload" :isClear="isClear"></Upload>
          </el-form-item>
        </div>
        <div class="sendLog">
          <div class="sendTitle">增加附件</div>
          <el-form-item>
            <!--<span v-if="editFiles" v-for="file in editFiles">-->
              <!--<img :src="file.uri" style="width: 120px;height: 120px;border-radius: 5px;">-->
            <!--</span>-->
            <Upload :ID="'record_file'" @getImg="getFile" :editImage="editFiles" :isClear="isClear"></Upload>
          </el-form-item>
        </div>
        <div class="sendLog">
          <div class="sendTitle">发给谁 <span style="color: #cdcdcd;">（默认通过工作通知发送给对方，点击头像删除）</span></div>
          <div>
            <span v-for="item in sendPeople" class="send_people">
              <img :src="item.avatar" v-if="item.avatar" @click="deletePeople(item)">
              <img src="../../../assets/images/head.jpg" @click="deletePeople(item)" v-else>
            </span>
            <img src="../../../assets/images/add.svg" @click="choosePeople" >
          </div>
        </div>
        <div style="text-align: center;">
          <el-button type="primary" @click="dayRecordSubmit" :disabled="first">提交</el-button>
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
            <!--<span v-if="editImages" v-for="img in editImages">-->
              <!--<img :src="img.uri" style="width: 120px;height: 120px;border-radius: 5px;">-->
            <!--</span>-->
            <Upload :ID="'record_img'" @getImg="getImage" :editImage="editImgToUpload" :isClear="isClear"></Upload>
          </el-form-item>
        </div>
        <div class="sendLog">
          <div class="sendTitle">增加附件</div>
          <el-form-item>
            <!--<span v-if="editFiles" v-for="file in editFiles">-->
              <!--<img :src="file.uri" style="width: 120px;height: 120px;border-radius: 5px;">-->
            <!--</span>-->
            <Upload :ID="'record_file'" @getImg="getFile" :editImage="editFiles" :isClear="isClear"></Upload>
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
          <el-button type="primary" @click="weekRecordSubmit" :disabled="first">提交</el-button>
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
            <!--<span v-if="editImages" v-for="img in editImages">-->
              <!--<img :src="img.uri" style="width: 120px;height: 120px;border-radius: 5px;">-->
            <!--</span>-->
            <Upload :ID="'record_img'" @getImg="getImage" :editImage="editImgToUpload" :isClear="isClear"></Upload>
          </el-form-item>
        </div>
        <div class="sendLog">
          <div class="sendTitle">增加附件</div>
          <el-form-item>
            <!--<span v-if="editFiles" v-for="file in editFiles">-->
              <!--<img :src="file.uri" style="width: 120px;height: 120px;border-radius: 5px;">-->
            <!--</span>-->
            <Upload :ID="'record_file'" @getImg="getFile" :editImage="editFiles" :isClear="isClear"></Upload>
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
          <el-button type="primary" @click="monthRecordSubmit" :disabled="first">提交</el-button>
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
            <!--<span v-if="editImages" v-for="img in editImages">-->
              <!--<img :src="img.uri" style="width: 120px;height: 120px;border-radius: 5px;">-->
            <!--</span>-->
            <Upload :ID="'record_img'" @getImg="getImage" :editImage="editImgToUpload" :isClear="isClear"></Upload>
          </el-form-item>
        </div>
        <div class="sendLog">
          <div class="sendTitle">增加照片或附件</div>
          <el-form-item>
            <!--<span v-if="editFiles" v-for="file in editFiles">-->
              <!--<img :src="file.uri" style="width: 120px;height: 120px;border-radius: 5px;">-->
            <!--</span>-->
            <Upload :ID="'record_file'" @getImg="getFile" :editImage="editFiles" :isClear="isClear"></Upload>
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
          <el-button type="primary" @click="achieveDayRecordSubmit" :disabled="first">提交</el-button>
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
    props: ['edit','getData'],
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
          id: '',
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
          id: '',
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
          id: '',
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
          id: '',
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
        selectType: '',  //选人
        sendPeople: [],
        editImages: [], //编辑时候的初始图片
        editFiles: [],  //编辑时候的初始文件
        logId: '',
        editImgToUpload: {},
        first: false,
      }
    },
    methods:{
      // 按钮切换
      tagClick(val) {
        this.first = false;
        this.active = val;
        this.isClear = false;
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
        if(this.logId){
          this.first = true;
          this.dayForm.id = this.logId;
          this.$http.put(globalConfig.server+ 'oa/day',this.dayForm).then((res) => {
            if(res.data.code === '100030') {
              this.dayForm = {};
              this.sendPeople = [];
              this.editImages = [];
              this.editFiles = [];
              this.isClear = true;
              setTimeout( ()=> {
                this.$emit('appointLookLog');
              },0);
              this.$notify.success({
                title: '成功',
                message: res.data.msg
              });
            } else {
              this.first = false;
              this.$notify.warning({
                title: '警告',
                message: res.data.msg
              });
            }
          });
        }else{
          this.first = true;
          this.dayForm.id = '';
          this.$http.post(globalConfig.server+ 'oa/day',this.dayForm).then((res) => {
            if(res.data.code === '100010') {
              this.dayForm = {};
              this.sendPeople = [];
              this.editImages = [];
              this.editFiles = [];
              this.isClear = true;
              setTimeout( ()=> {
                this.$emit('appointLookLog');
              },0);
              this.$notify.success({
                title: '成功',
                message: res.data.msg
              });
            } else {
              this.first = false;
              this.$notify.warning({
                title: '警告',
                message: res.data.msg
              })
            }
          });
        }

      },
      // 提交周报
      weekRecordSubmit() {
        if(this.logId){
          this.first = true;
          this.weekForm.id = this.logId;
          this.$http.put(globalConfig.server+ 'oa/week',this.weekForm).then((res) => {
            if(res.data.code === '110030') {
              this.weekForm = {};
              this.sendPeople = [];
              this.editImages = [];
              this.editFiles = [];
              this.isClear = true;
              setTimeout( ()=> {
                this.$emit('appointLookLog');
              },0);
              this.$notify.success({
                title: '成功',
                message: res.data.msg
              })
            } else {
              this.first = false;
              this.$notify.warning({
                title: '警告',
                message: res.data.msg
              });
            }
          });
        }else{
          this.first = true;
          this.weekForm.id = '';
          this.$http.post(globalConfig.server+ 'oa/week',this.weekForm).then((res) => {
            if(res.data.code === '110010') {
              this.weekForm = {};
              this.sendPeople = [];
              this.editImages = [];
              this.editFiles = [];
              this.isClear = true;
              setTimeout( ()=> {
                this.$emit('appointLookLog');
              },0);
              this.$notify.success({
                title: '成功',
                message: res.data.msg
              })
            } else {
              this.first = false;
              this.$notify.warning({
                title: '警告',
                message: res.data.msg
              });
            }
          });
        }
      },
      // 提交月报
      monthRecordSubmit() {
        if(this.logId){
          this.first = true;
          this.monthForm.id = this.logId;
          this.$http.put(globalConfig.server+ 'oa/month',this.monthForm).then((res) => {
            if(res.data.code === '120030') {
              this.monthForm = {};
              this.sendPeople = [];
              this.editImages = [];
              this.editFiles = [];
              this.isClear = true;
              this.$emit('appointLookLog');
              this.$notify.success({
                title: '成功',
                message: res.data.msg
              });
            } else {
              this.first = false;
              this.$notify.warning({
                title: '警告',
                message: res.data.msg
              });
            }
          });
        }else{
          this.first = true;
          this.monthForm.id = '';
          this.$http.post(globalConfig.server+ 'oa/month',this.monthForm).then((res) => {
            if(res.data.code === '120010') {
              this.monthForm = {};
              this.sendPeople = [];
              this.editImages = [];
              this.editFiles = [];
              this.isClear = true;
              setTimeout( ()=> {
                this.$emit('appointLookLog');
              },0);
              this.$notify.success({
                title: '成功',
                message: res.data.msg
              });
            } else {
              this.first = false;
              this.$notify.warning({
                title: '警告',
                message: res.data.msg
              });
            }
          });
        }
      },
      // 提交业绩日报
      achieveDayRecordSubmit(){
        if(this.logId){
          this.first = true;
          this.achieveForm.id = this.logId;
          this.$http.put(globalConfig.server+ 'oa/achievement',this.achieveForm).then((res) => {
            if(res.data.code === '130030') {
              this.achieveForm = {};
              this.sendPeople = [];
              this.editImages = [];
              this.editFiles = [];
              this.isClear = true;
              setTimeout( ()=> {
                this.$emit('appointLookLog');
              },0);
              this.$notify.success({
                title: '成功',
                message: res.data.msg
              });
            } else {
              this.first = false;
              this.$notify.warning({
                title: '警告',
                message: res.data.msg
              });
            }
          });
        }else{
          this.first = true;
          this.achieveForm.id = '';
          this.$http.post(globalConfig.server+ 'oa/achievement',this.achieveForm).then((res) => {
            if(res.data.code === '130010') {
              this.achieveForm = {};
              this.sendPeople = [];
              this.editImages = [];
              this.editFiles = [];
              this.isClear = true;
              setTimeout( ()=> {
                this.$emit('appointLookLog');
              },0);
              this.$notify.success({
                title: '成功',
                message: res.data.msg
              });
            } else {
              this.first = false;
              this.$notify.warning({
                title: '警告',
                message: res.data.msg
              });
            }
          });
        }
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
        this.organizationDialog = false;
        for (var i=0;i<val.length;i++){
          let hasSamePeople = false;
          for(var j=0; j<this.sendPeople.length; j++){
            if(val[i].id === this.sendPeople[j].id){
              hasSamePeople = true;
              return;
            }
          }
          if(!hasSamePeople){
            this.sendPeople.push(val[i]);
          }
        }
        switch(this.active){
          case 0:
            this.dayForm.receivers_id = [];
            for(var i=0; i<this.sendPeople.length;i++){
              this.dayForm.receivers_id.push(this.sendPeople[i].id);
            }
            break;
          case 1:
            this.weekForm.receivers_id = [];
            for(var i=0; i<this.sendPeople.length;i++){
              this.weekForm.receivers_id.push(this.sendPeople[i].id);
            }
            break;
          case 2:
            this.monthForm.receivers_id = [];
            for(var i=0; i<this.sendPeople.length;i++){
              this.monthForm.receivers_id.push(this.sendPeople[i].id);
            }
            break;
          case 3:
            this.achieveForm.receivers_id = [];
            for(var i=0; i<this.sendPeople.length;i++){
              this.achieveForm.receivers_id.push(this.sendPeople[i].id);
            }
            break;
        }

      },
      initialData(){
        //初始化
        this.dayForm.id = '';
        this.dayForm.finish_job = '';
        this.dayForm.unfinished_job = '';
        this.dayForm.need_coordinate_job = '';
        this.dayForm.remark = '';
        this.dayForm.image_pic = [];
        this.dayForm.annex_file = [];
        this.dayForm.receivers_id = [];

        this.weekForm.id = '';
        this.weekForm.finish_job = '';
        this.weekForm.job_summary = '';
        this.weekForm.next_plan = '';
        this.weekForm.need_coordinate_job = '';
        this.weekForm.remark = '';
        this.weekForm.image_pic = [];
        this.weekForm.annex_file = [];
        this.weekForm.receivers_id = [];

        this.monthForm.id = '';
        this.monthForm.finish_job = '';
        this.monthForm.job_summary = '';
        this.monthForm.next_plan = '';
        this.monthForm.need_coordinate_job = '';
        this.monthForm.remark = '';
        this.monthForm.image_pic = [];
        this.monthForm.annex_file = [];
        this.monthForm.receivers_id = [];

        this.achieveForm.id = '';
        this.achieveForm.turnover_today = '';
        this.achieveForm.customer_num = '';
        this.achieveForm.month_total_turnover = '';
        this.achieveForm.month_achievement_goals = '';
        this.achieveForm.thinking_today = '';
        this.achieveForm.remark = '';
        this.achieveForm.image_pic = [];
        this.achieveForm.annex_file = [];
        this.achieveForm.receivers_id = [];
        this.sendPeople = [];
        this.editImages = [];
        this.editFiles = [];
        this.isClear = true;
      },
      deletePeople(val){
        var index = '';
        switch(this.active){
          case 0:
            index = this.dayForm.receivers_id.indexOf(Number(val.id));
            this.dayForm.receivers_id.splice(index,1);
            break;
          case 1:
            index = this.dayForm.receivers_id.indexOf(Number(val.id));
            this.weekForm.receivers_id.splice(index,1);
            break;
          case 2:
            index = this.dayForm.receivers_id.indexOf(Number(val.id));
            this.monthForm.receivers_id.splice(index,1);
            break;
          case 3:
            index = this.dayForm.receivers_id.indexOf(Number(val.id));
            this.achieveForm.receivers_id.splice(index,1);
            break;
        }
        this.sendPeople.splice(index,1);
      }
    },
    watch:{
      edit(val) {
        console.log(val)
        this.logId = val.daily_id;
        this.initialData();
        if(val.module === 'app\\oa\\model\\DailyDay'){  //日报
          this.active = 0;
          this.tagClick(0);
          this.$http.get(globalConfig.server+ 'oa/day/'+this.logId).then((res)=>{
            if(res.data.code === '100020'){
              var logData = res.data.data;
              this.dayForm.finish_job = logData.finish_job;
              this.dayForm.unfinished_job = logData.unfinished_job;
              this.dayForm.need_coordinate_job = logData.need_coordinate_job;
              this.dayForm.remark = logData.remark;

              var img_pic = logData.album.image_pic;
              if(img_pic){
                for(var item in img_pic){
                  this.dayForm.image_pic.push(Number(item));
                  let img = {};
                  img.id = img_pic[item][0].id;
                  img.uri = img_pic[item][0].uri;
                  this.editImages.push(img);
                }

                //照片修改
                let picObject = {};
                this.editImages.forEach((item) =>{
                  picObject[item.id] = item.uri;
                });
                this.editImgToUpload = picObject;

              }
              var file_pic = logData.album.annex_file;
              if(file_pic) {
                for(var item in file_pic){
                  this.dayForm.annex_file.push(Number(item));
                  let file = {};
                  file.id = file_pic[item][0].id;
                  file.uri = file_pic[item][0].uri;
                  this.editFiles.push(file);
                }
              }
              var receivers = logData.receivers;
              if(receivers) {
                for(var i=0; i<receivers.length; i++) {
                  let people ={};
                  people.id = receivers[i].id;
                  people.avatar = receivers[i].avatar;
                  this.sendPeople.push(people);
                  this.dayForm.receivers_id.push(Number(receivers[i].id));
                }
              }
            }
          });
        }else if(val.module === 'app\\oa\\model\\DailyWeek') {   //周报
          this.active = 1;
          this.tagClick(1);
          this.$http.get(globalConfig.server+ 'oa/week/'+this.logId).then((res)=>{
            if(res.data.code === '110020'){
              var logData = res.data.data;
              this.weekForm.finish_job = logData.finish_job;
              this.weekForm.job_summary = logData.job_summary;
              this.weekForm.next_plan = logData.next_plan;
              this.weekForm.need_coordinate_job = logData.need_coordinate_job;
              this.weekForm.remark = logData.remark;
              var img_pic = logData.album.image_pic;
              if(img_pic) {
                for(var item in img_pic){
                  this.weekForm.image_pic.push(Number(item));
                  let img = {};
                  img.id = img_pic[item][0].id;
                  img.uri = img_pic[item][0].uri;
                  this.editImages.push(img);
                }
                //照片修改
                let picObject = {};
                this.editImages.forEach((item) =>{
                  picObject[item.id] = item.uri;
                });
                this.editImgToUpload = picObject;
              }
              var file_pic = logData.album.annex_file;
              if(file_pic) {
                for(var item in file_pic){
                  this.weekForm.annex_file.push(Number(item));
                  let file = {};
                  file.id = file_pic[item][0].id;
                  file.uri = file_pic[item][0].uri;
                  this.editFiles.push(file);
                }
              }
              var receivers = logData.receivers;
              if(receivers) {
                for(var i=0; i<receivers.length; i++) {
                  let people ={};
                  people.id = receivers[i].id;
                  people.avatar = receivers[i].avatar;
                  this.sendPeople.push(people);
                  this.weekForm.receivers_id.push(Number(receivers[i].id));
                }
              }
            }
          });
        } else if(val.module === 'app\\oa\\model\\DailyMonth') {   //月报
          this.active = 2;
          this.tagClick(2);
          this.$http.get(globalConfig.server+ 'oa/month/'+this.logId).then((res)=>{
            if(res.data.code === '120020'){
              var logData = res.data.data;
              this.monthForm.finish_job = logData.finish_job;
              this.monthForm.job_summary = logData.job_summary;
              this.monthForm.next_plan = logData.next_plan;
              this.monthForm.need_coordinate_job = logData.need_coordinate_job;
              this.monthForm.remark = logData.remark;

              var img_pic = logData.album.image_pic;
              if(img_pic){
                for(var item in img_pic){
                  this.monthForm.image_pic.push(Number(item));
                  let img = {};
                  img.id = img_pic[item][0].id;
                  img.uri = img_pic[item][0].uri;
                  this.editImages.push(img);
                }
                //照片修改
                let picObject = {};
                this.editImages.forEach((item) =>{
                  picObject[item.id] = item.uri;
                });
                this.editImgToUpload = picObject;
              }
              var file_pic = logData.album.annex_file;
              if(file_pic){
                for(var item in file_pic){
                  this.monthForm.annex_file.push(Number(item));
                  let file = {};
                  file.id = file_pic[item][0].id;
                  file.uri = file_pic[item][0].uri;
                  this.editFiles.push(file);
                }
              }
              var receivers = logData.receivers;
              if(receivers) {
                for(var i=0; i<receivers.length; i++) {
                  let people ={};
                  people.id = receivers[i].id;
                  people.avatar = receivers[i].avatar;
                  this.sendPeople.push(people);
                  this.monthForm.receivers_id.push(Number(receivers[i].id));
                }
              }
            }
          });
        } else if(val.module === 'app\\oa\\model\\DailyAchievement'){   //业绩日报
          this.active = 3;
          this.tagClick(3);
          this.$http.get(globalConfig.server+ 'oa/achievement/'+this.logId).then((res)=>{
            if(res.data.code === '130020'){
              var logData = res.data.data;
              this.achieveForm.turnover_today = logData.turnover_today;
              this.achieveForm.customer_num = logData.customer_num;
              this.achieveForm.month_total_turnover = logData.month_total_turnover;
              this.achieveForm.month_achievement_goals = logData.month_achievement_goals;
              this.achieveForm.thinking_today = logData.thinking_today;
              this.achieveForm.remark = logData.remark;

              var img_pic = logData.album.image_pic;
              if(img_pic){
                for(var item in img_pic){
                  this.achieveForm.image_pic.push(Number(item));
                  let img = {};
                  img.id = img_pic[item][0].id;
                  img.uri = img_pic[item][0].uri;
                  this.editImages.push(img);
                }
                //照片修改
                let picObject = {};
                this.editImages.forEach((item) =>{
                  picObject[item.id] = item.uri;
                });
                this.editImgToUpload = picObject;
              }
              var file_pic = logData.album.annex_file;
              if(file_pic){
                for(var item in file_pic){
                  this.achieveForm.annex_file.push(Number(item));
                  let file = {};
                  file.id = file_pic[item][0].id;
                  file.uri = file_pic[item][0].uri;
                  this.editFiles.push(file);
                }
              }
              var receivers = logData.receivers;
              if(receivers) {
                for(var i=0; i<receivers.length; i++) {
                  let people ={};
                  people.id = receivers[i].id;
                  people.avatar = receivers[i].avatar;
                  this.sendPeople.push(people);
                  this.achieveForm.receivers_id.push(Number(receivers[i].id));
                }
              }
            }
          });

        }
      },
      getData(val) {
        this.first = false;
      },
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
