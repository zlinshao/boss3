<template>
  <div id="addFollowUp">
    <el-dialog :close-on-click-modal="false" title="工单详情" :visible.sync="orderDetailModule" width="60%">
      <div class="scroll_bar">
        <div class="workOrderDetail">
          <div class="title">
            <span>事项详情</span>
            <div class="title-info">
              <div>
                <span>地址：</span>
                <span>{{house_name}}</span>
              </div>
              <div>
                <span>合同编号：</span>
                <span>{{workOrderDetail.contract_number}}</span>
              </div>
              <div>
                <span>创建时间：</span>
                <span>{{workOrderDetail.create_time}}</span>
              </div>
              <div>
                <span>创建人：</span>
                <span v-if="workOrderDetail.creators">{{workOrderDetail.creators.name}}</span>
                <span v-else></span>
              </div>
              <div>
                <span>城市：</span>
                <span>{{workOrderDetail.city_name}}</span>
              </div>
            </div>
          </div>
          <el-button type="text" size="small" @click="editWorkOrder">
            <i class="el-icon-edit"></i>修改工单内容
          </el-button>
        </div>
        <div class="describe_border">
          <el-form size="small" label-width="100px"
                   v-loading="workOrderLoading"
                   element-loading-text="拼命加载中"
                   element-loading-spinner="el-icon-loading"
                   element-loading-background="rgba(255, 255, 255, 0)">
            <el-row>
              <el-col :span="8" class="acount-text">
                <el-form-item label="工单类型">
                  <div class="content">{{workOrderDetail.types}}{{complaintStr}}</div>
                </el-form-item>
              </el-col>
              <el-col :span="8"  v-if="isComplainOrder" class="acount-text">
                <el-form-item label="投诉渠道">
                  <div class="content">{{channel_of_complaint}}</div>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="回复电话" class="acount-text">
                  <div class="content">
                    <span v-if="workOrderDetail.mobile">{{workOrderDetail.mobile}}</span>
                    <span v-if="!workOrderDetail.mobile">暂无</span>
                  </div>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="8">
                <el-form-item label="下次跟进人" class="acount-text">
                  <div class="content">
                    <span v-if="workOrderDetail.follows">{{workOrderDetail.follows.name}}</span>
                    <span v-if="!workOrderDetail.follows">暂无</span>
                  </div>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="下次跟进时间" class="acount-text">
                  <div class="content">
                    <span v-if="workOrderDetail.follow_time">{{workOrderDetail.follow_time}}</span>
                    <span v-if="!workOrderDetail.follow_time">暂无</span>
                  </div>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="8" v-if="workOrderDetail.follow_status === 338">
                <el-form-item label="完成时间" class="acount-text">
                  <div class="content">
                    <span v-if="workOrderDetail.finish_time">{{workOrderDetail.finish_time}}</span>
                    <span v-if="!workOrderDetail.finish_time">暂无</span>
                  </div>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="24">
                <el-form-item label="工单内容" class="acount-text">
                  <div class="content">
                    <span v-if="workOrderDetail.matters">{{workOrderDetail.matters}}</span>
                    <span v-if="!workOrderDetail.matters">暂无</span>
                  </div>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="24" v-if="workOrderDetail.album">
                <el-form-item label="照片" class="acount-text">
                  <img v-if="workOrderDetail.album.image_pic !== []" data-magnify
                       v-for="(val,key) in workOrderDetail.album.image_pic" :data-src="val[0].uri" :src="val[0].uri"
                       alt="">
                </el-form-item>
              </el-col>
            </el-row>
            <!--认责开始-->
            <div class="accountability_result" v-if="workOrderDetail.type === 699">
              <div class="title">
                <span>认责结果</span>
                <div class="accountability-info" v-if="showAccount">
                  <div>
                    <span>添加人：</span>
                    <span>{{accountability_info.add_user}}</span>
                  </div>
                  <div>
                    <span>时间：</span>
                    <span>{{accountability_info.add_time}}</span>
                  </div>
                </div>
              </div>
              <el-button type="text" size="small" @click="editDutyResult">
                <i class="el-icon-plus"></i>编辑认责结果
              </el-button>
            </div>
            <el-form size="small" label-width="100px" :disabled="forbidEdit" v-if="workOrderDetail.type === 699 && showAccount">
              <el-row v-if="workOrderDetail.type_of_complaint == 3 || workOrderDetail.type_of_complaint == 4">
                <el-col :span="8">
                  <el-form-item label="投诉有效性：" class="acount-text">
                    <el-radio-group v-model="accountability_info.is_valid">
                      <el-radio label="1">有效</el-radio>
                      <el-radio label="0">无效</el-radio>
                    </el-radio-group>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row v-for="(item, index) in dutyResultLength" :key='index'>
                <el-col :span="6">
                  <el-form-item label="认责人" class="acount-text">
                    <el-select placeholder="请选择" value-key="value" v-if="!forbidEdit"  value="" v-model='accountability_info.dutyInfo[index].dutyUser' @change='selectUser(item, index)'>
                      <el-option 
                        v-for="_item in account_holder"
                        :key="_item.id"
                        :label="_item.role_name"
                        :value="_item.id">
                      </el-option>
                    </el-select>
                    <div class="content" v-if="forbidEdit">
                      <span>{{accountability_info.dutyInfo[index].dutyUserName}}</span>
                    </div>
                  </el-form-item>
                </el-col>
                <el-col :span="6">
                  <el-form-item label="姓名" class="acount-text">
                    <div class="" v-if="!forbidEdit" :class="'input-' + index">
                      <el-input  v-model="accountability_info.dutyInfo[index].dutyName" @focus="openOrganizeModal"></el-input>
                    </div>
                    <div class="content" v-if="forbidEdit">
                      <span>{{accountability_info.dutyInfo[index].dutyName}}</span>
                    </div>
                  </el-form-item>
                </el-col>
                <el-col :span="6">
                  <el-form-item label="认责金额" class="acount-text">
                    <div class="" v-if="!forbidEdit">
                      <el-input v-model="accountability_info.dutyInfo[index].dutyMoney"></el-input>
                    </div>
                    <div class="content" v-if="forbidEdit">
                      <span>{{accountability_info.dutyInfo[index].dutyMoney}}</span>
                    </div>
                  </el-form-item>
                </el-col>
                <i class="el-icon-remove-outline icon-edit" @click="removeDutyUser(index)" v-if="dutyResultLength > 1 && !forbidEdit" ></i>
                <i class="el-icon-circle-plus-outline icon-edit" @click="addDutyUser" v-if="index == (dutyResultLength-1) && !forbidEdit"></i>
              </el-row>
              <el-row>
                <el-col :span="12">
                  <el-form-item label="认责结果" class="acount-text">
                    <div class="" v-if="!forbidEdit">
                      <el-input v-model="accountability_info.dutyRes"></el-input>
                    </div>
                    <div class="content" v-if="forbidEdit">
                      <span>{{accountability_info.dutyRes}}</span>
                    </div>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row v-if="showButton">
                <el-col :span="24" class="flex-end">
                  <el-button size="small" @click="cancelEdit">取 消</el-button>
                  <el-button size="small" type="primary" @click="sureEdit">确 定</el-button>
                </el-col>
              </el-row>
            </el-form>
            <div class="accountability-tips" v-if="workOrderDetail.accountability_info === null && forbidEdit && workOrderDetail.type === 699">暂无</div>
            <!--认责结束-->
            <!--跟进开始-->
            <div class="follow_result">
              <div class="title">跟进结果</div>
              <el-button type="text" size="small" @click="addResult(workOrderDetail.id)" :disabled="workOrderDetail.follow_status === 338">
                <i class="el-icon-plus"></i>新增跟进结果
              </el-button>
            </div>
            <div class="addWorkOrder" v-if="showAddWork">
              <el-row>
                <el-col :span="12">
                  <el-form-item label="工单状态：" class="acount-text">
                    <el-radio-group v-model="params.follow_status">
                      <el-radio label="338">已完成</el-radio>
                      <el-radio label="337">处理中</el-radio>
                    </el-radio-group>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="紧急程度" class="acount-text">
                    <el-radio-group v-model="params.emergency">
                      <el-radio label="2">紧急</el-radio>
                      <el-radio label="1">一般</el-radio>
                    </el-radio-group>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="12">
                  <el-form-item label="跟进结果" required="" class="acount-text">
                    <el-input type="textarea" v-model="params.content"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <!-- <el-col :span="12">
                  <el-form-item label="跟进状态" required="">
                    <el-select clearable v-model="params.follow_status" placeholder="选择跟进状态" value="">
                      <el-option v-for="item in workFollow" :label="item.dictionary_name" :value="item.id"
                                 :key="item.id"></el-option>
                    </el-select>
                  </el-form-item>
                </el-col> -->
                <el-col :span="12">
                  <el-form-item label="下次跟进时间" class="acount-text">
                    <el-date-picker type="date" placeholder="选择日期时间" @change="formatTime"
                                    value-format="yyyy-MM-dd"
                                    v-model="params.next_follow_time"></el-date-picker>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="下次跟进人" class="acount-text">
                    <el-input v-model="params.next_follow_name" @focus="openOrganizeModal" placeholder="请选择">
                      <el-button slot="append" type="primary" @click="emptyFollowPeople">清空</el-button>
                    </el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <!-- <el-row>
                <el-col :span="24">
                  <el-form-item label="跟进结果" required="">
                    <el-input type="textarea" v-model="params.content"></el-input>
                  </el-form-item>
                </el-col>
              </el-row> -->
              <el-row>
                <el-col :span="24">
                  <el-form-item label="上传照片" class="acount-text">
                    <UPLOAD :ID="'addResultPic'" :isClear="isClear" @getImg="getImgData"></UPLOAD>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="24" class="flex-end">
                  <el-button size="small" @click="showAddWork = false">取 消</el-button>
                  <el-button size="small" type="primary" @click="confirmAdd">确 定</el-button>
                </el-col>
              </el-row>
            </div>
            <!--跟进结果展示-->
            <div v-if="workOrderDetail.remarks && workOrderDetail.remarks.length > 0">
              <el-form size="small" label-width="100px" v-if="workOrderDetail.remarks">
                <div  class="wrap" 
                      :class="{lastestStep:index === 0}"
                      v-for="(item,index) in workOrderDetail.remarks" 
                      :key="item.id" 
                      v-if="index !== workOrderDetail.remarks.length - 1">
                  <div class="user">
                    <div class="add_user" v-if="item.simple_staff">{{item.simple_staff.real_name}}</div>
                    <div class="add_time">{{item.create_time}}</div>
                  </div>
                  <div class="icon">
                    <div class="cricle" :class="{lastest:index === 0 && workOrderDetail.follow_status !== 338}"></div>
                    <div class="line" v-if="index !== 0"></div>
                  </div>
                  <div class="text">
                    <span class="add-content">{{item.content}}</span>
                    <span v-if="item.img != undefined">
                    <i  class="el-icon-picture" 
                        v-if="item.img.image_pic && Object.keys(item.img.image_pic)[0] !== '' && val.length > 0" 
                        data-magnify
                        v-for="val in item.img.image_pic" :key="val.id" :data-src="val[0].uri" :src="val[0].uri">
                    </i>
                    </span>
                  </div>
                </div>
                <!-- <el-row v-for="(item,index) in workOrderDetail.remarks" :key="item.id"
                        v-if="index !== workOrderDetail.remarks.length - 1"
                        class="remarks">
                  <el-col :span="12">
                    <el-form-item label="跟进时间">
                      <div class="content">
                        <span v-if="item.create_time">{{item.create_time}}</span>
                        <span v-if="!item.create_time">暂无</span>
                      </div>
                    </el-form-item>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item label="跟进人">
                      <div class="content">
                        <span v-if="item.simple_staff">{{item.simple_staff.real_name}}</span>
                        <span v-if="!item.simple_staff">暂无</span>
                      </div>
                    </el-form-item>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item label="下次跟进时间">
                      <div class="content">
                        <span v-if="item.next_follow_time">{{item.next_follow_time}}</span>
                        <span v-if="!item.next_follow_time">暂无</span>
                      </div>
                    </el-form-item>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item label="跟进状态">
                      <div class="content">
                        <span v-if="item.follow_status">{{item.follow_status}}</span>
                        <span v-if="!item.follow_status">暂无</span>
                      </div>
                    </el-form-item>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item label="跟进结果">
                      <div class="content">
                        <span v-if="item.content">{{item.content}}</span>
                        <span v-if="!item.content">暂无</span>
                      </div>
                    </el-form-item>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item label="下次跟进人">
                      <div class="content">
                        <span v-if="item.next_follow_name">{{item.next_follow_name}}</span>
                        <span v-if="!item.next_follow_name">暂无</span>
                      </div>
                    </el-form-item>
                  </el-col>
                  <el-col :span="24" v-if="item.img">
                    <el-form-item label="截图">
                      <img v-if="Object.keys(item.img.image_pic)[0] !== '' && val.length > 0" data-magnify
                           v-for="val in item.img.image_pic" :data-src="val[0].uri" :src="val[0].uri">
                           <span v-else>没有上传图片</span>
                    </el-form-item>
                  </el-col>
                </el-row> -->
              </el-form>
            </div>
            <!--跟进结束-->
            <div class="content" v-else style="text-align: center;line-height: 30px">
              暂无数据
            </div>
          </el-form>
        </div>
      </div>
    </el-dialog>
    <EditWork :editWorkDialog="editWorkDialog" :editWord="workOrderDetail" @close="closeModal"></EditWork>

    <Organization :organizationDialog="organizationDialog" :length="length" :type="type" :dutyIndex="dutyIndex"
                  @close='closeOrganize' @selectMember="selectMember"></Organization>
  </div>
</template>

<script>
  import EditWork from './editWorkOrder.vue'
  import Organization from '../../../../common/organization.vue'
  import UPLOAD from '../../../../common/UPLOAD.vue'

  export default {
    name: 'addFollowUp',
    props: ['orderDetailDialog', 'wordData'],
    components: {EditWork, Organization, UPLOAD},
    data() {
      return {
        orderDetailModule: false,
        workOrderDetail: {},
        editWorkDialog: false,
        workFollow: [],
        workFollows: {},
        isClear: false,
        showAddWork: false,
        account_holder:[],
        active: 0,              //步骤条
        showAccount : true,     //展示认责
        params: {
          id: '',
          follow_status: '337',//跟进状态
          next_follow_time: '',//下次跟进时间
          next_follow_name: '',//下次跟进人
          next_follow_id: '',//下次跟进人
          content: '',//跟进结果
          album: '',//图片
          emergency:'1',//紧急程度
          follow_time:'',
          
        },
        accountability_info: {
          add_user:'',
          add_time:'',
          dutyInfo:[
            {
              dutyUser:"",
              dutyUserName:'',
              dutyName:'',
              dutyMoney:'',
            }
          ],
          dutyRes:'',
          is_valid:'1',
        },
        dutyResultLength:1,
        channel_of_complaint:'',              //投诉渠道
        type_of_complaint : '',               //投诉类型
        complaintStr:'',                      //拼接字符
        select_type_complaint:{},
        organizationDialog: false,
        length: 0,
        type: '',
        workOrderLoading: false,
        house_name: '',
        isComplainOrder: false, //是否未投诉单  
        forbidEdit:true,     //禁止编辑认责结果
        showButton:false,    //显示按钮
        create_name:'',      
        dutyIndex:0,
      };
    },
    watch: {
      orderDetailDialog(val) {
        this.orderDetailModule = val;
      },
      orderDetailModule(val) {
        if (!val) {
          this.init();
          this.initAccountInfo();
          this.workOrderDetail = {};
          this.$emit('close');
        } else {
          this.house_name = this.wordData.name;
          this.isClear = false;
          this.getDetail();
        }
      },
    },
    mounted() {
      // 跟进状态
      this.dictionary(335, 1).then((res) => {
        this.workFollow = res.data;
        res.data.forEach((item) => {
          this.workFollows[item.id] = item.dictionary_name;
        })

      })
    },
    methods: {
      // 关闭组织架构
      closeOrganize() {
        this.organizationDialog = false;
      },
      //打开组织架构
      openOrganizeModal(target) {
        this.organizationDialog = true;
        this.dutyIndex = Array.prototype.slice.call(target.path[2].classList).filter(i => i.indexOf('input-') > -1)[0].split('-')[1];
        this.type = 'staff';
        this.length = 1;
      },
      // 选择回调
      selectMember(val) {
        this.type = '';
        this.length = '';
        this.params.next_follow_id = val[0].id;
        this.params.next_follow_name = val[0].name;
        let index = +this.dutyIndex;
        this.accountability_info.dutyInfo[index].dutyName = val[0].name;
      },
      // 清空组织架构
      emptyFollowPeople() {
        this.params.next_follow_id = '';
        this.params.next_follow_name = '';
      },
      // 新增跟进结果
      confirmAdd() {
        this.params.module = this.wordData.module;
        this.params.follow_time = this.getTime(new Date())
        this.$http.post(globalConfig.server + 'customer/work_order/matters', this.params).then((res) => {
          if (res.data.code === '10050') {
            this.init();
            this.getDetail();
            this.showAddWork = false;
            this.prompt(1, res.data.msg);
          } else {
            this.prompt(2, res.data.msg);
          }
        })
      },
      getDetail() {
        this.workOrderLoading = true;
        this.$http.get(globalConfig.server + 'customer/work_order/' + this.wordData.id).then((res) => {
          this.workOrderLoading = false;
          if (res.data.code === "10020") {
            if(res.data.data.type === 699){
              this.isComplainOrder = true;
            }else{
              this.isComplainOrder = false;
            }
            this.workOrderDetail = res.data.data;
            this.account_holder = this.workOrderDetail.option.account_holder;
            this.type_of_complaint = this.workOrderDetail.type_of_complaint;
            this.channel_of_complaint = this.workOrderDetail.channel_of_complaint;
            this.select_type_complaint = this.workOrderDetail.option.select_type_complaint;
            this.getComplainType(this.type_of_complaint, this.select_type_complaint);
            if(this.workOrderDetail.accountability_info === null){
              this.showAccount = false;
            }else{
              this.showAccount = true;
            }
            this.assignVal(this.workOrderDetail.accountability_info);
            for(var item in this.workOrderDetail.album.image_pic){
              if(!this.workOrderDetail.album.image_pic[item].length){
                delete this.workOrderDetail.album.image_pic[item]
              }
            }
          }
        })
      },
      //投诉类型转换投诉详情
      getComplainType(str, obj){
        if(str && obj){
          obj.forEach(item => item.type === str ? this.complaintStr = '(' + item.name + ')' : '')
        }else{
          this.complaintStr = ""
        }
      },
      //时间格式  yy-MM-dd hh-mm-ss
      formatTime(){
        let t = new Date();
        this.params.next_follow_time = this.params.next_follow_time + "   " + this.toFix(t.getHours()) + ":" + this.toFix(t.getMinutes()) + ":" + this.toFix(t.getSeconds())
      },
      //赋值
      assignVal(source){
        let obj = this.deepClone(source);
        this.accountability_info = obj === null ? this.accountability_info : obj;
        this.dutyResultLength = obj === null ? 1 : obj.dutyInfo && obj.dutyInfo.length;
      },
      //深拷贝
      deepClone(source){
        if(source === null){
          return null
        }
        let targetObj = source.constructor === Array ? [] : {}; 
        for(let keys in source){ 
          if(source.hasOwnProperty(keys)){
            if(source[keys] && typeof source[keys] === 'object'){ 
              targetObj[keys] = source[keys].constructor === Array ? [] : {};
              targetObj[keys] = this.deepClone(source[keys]);
            }else{ 
              targetObj[keys] = source[keys];
            }
          } 
        }
        return targetObj;
      },
      init() {
        this.showAddWork = false;
        this.forbidEdit = true;
        this.showButton = false;
        this.params = {
          id: '',
          follow_status: '337',//跟进状态
          next_follow_time: '',//下次跟进时间
          next_follow_name: '',//下次跟进人
          content: '',//跟进结果
          album: '',//图片
          emergency:'1'//紧急程度
        };
      },
      prompt(val, msg) {
        if (val === 1) {
          this.$notify.success({
            title: '成功',
            message: msg
          });
        } else {
          this.$notify.warning({
            title: '警告',
            message: msg
          })
        }
      },
      //时间
      getTime(t){
        return t.getFullYear() + "-" + (+t.getMonth() + 1) + "-" + t.getDate() + "   " + this.toFix(t.getHours()) + ":" + this.toFix(t.getMinutes()) + ":" + this.toFix(t.getSeconds())
      },
      toFix(n){
        return n < 10 ? '0' + n : n
      },
      // 上传图片
      getImgData(val) {
        this.params.album = val[1];
      },
      // 增进跟进结果
      addResult(id) {
        this.init();
        this.params.id = id;
        this.showAddWork = true;
      },
      // 修改工单
      editWorkOrder() {
        this.workOrderDetail.address = this.wordData.name;
        this.editWorkDialog = true;
      },
      closeModal(val) {
        this.editWorkDialog = false;
        if (val === 'success') {
          this.getDetail();
        }
      },
      //编辑认责结果
      editDutyResult(){
        this.forbidEdit = false;
        this.showButton = true;
        this.showAccount = true;
        this.accountability_info.add_time = this.accountability_info.add_time = this.getTime(new Date());
        this.accountability_info.add_user = JSON.parse(localStorage.getItem('personal')).name;
      },
      //添加认责人
      addDutyUser(){
        this.dutyResultLength++;
        let _data = {
          dutyUser:'',
          dutyUserName:'',
          dutyName:'',
          dutyMoney:'',
        }
        this.accountability_info.dutyInfo.push(_data);
      },
      //删除认责人
      removeDutyUser(index){
        this.dutyResultLength--;
        this.accountability_info.dutyInfo.splice(index, 1)
      },
      //选择认责角色
      selectUser(i, ind){
        let _id = this.accountability_info.dutyInfo[ind].dutyUser;
        let _this = this;
        this.account_holder.forEach(function(item, index){
          if(item.id === _id){
            _this.accountability_info.dutyInfo[ind].dutyName = item.name;
            _this.accountability_info.dutyInfo[ind].dutyUserName = item.role_name;
          }
        });

      },
      //取消编辑
      cancelEdit(){
        this.showButton = false;
        this.forbidEdit = true;
        if(this.workOrderDetail.accountability_info === null){
          this.showAccount = false;
        }
        this.assignVal(this.workOrderDetail.accountability_info);
        if(this.workOrderDetail.accountability_info === null){
          this.accountability_info = {
            add_user:'',
            add_time:'',
            dutyInfo:[
              {
                dutyUser:"",
                dutyUserName:'',
                dutyName:'',
                dutyMoney:'',
              }
            ],
            dutyRes:'',
            is_valid:'1',
          };
        }
      },
      //编辑认责确认
      sureEdit(){
        if(this.workOrderDetail.type_of_complaint == 1 || this.workOrderDetail.type_of_complaint == 2){
          this.accountability_info.is_valid = '';
        }
        this.$http.put(globalConfig.server + 'customer/work_order/responsible/' + this.workOrderDetail.id , this.accountability_info).then(res =>{
          if(res.data.code == '10010'){
            this.$notify({
              title: '成功',
              message: res.data.msg,
              type: 'success'
            });
            this.getDetail();
            this.forbidEdit = true;
            this.showButton = false;
          }else{
            this.$notify.error({
              title: '错误',
              message: res.data.msg
            });
          }
        })
      },
      //初始化认责信息
      initAccountInfo(){
        this.accountability_info = {
          add_user:'',
          add_time:'',
          dutyInfo:[
            {
              dutyUser:"",
              dutyUserName:'',
              dutyName:'',
              dutyMoney:'',
            }
          ],
          dutyRes:'',
          is_valid:'1',
        }
      }
    }
  };
</script>
<style lang="scss">
  #addFollowUp {
    .workOrderDetail {
      display: flex;
      display: -webkit-flex;
      justify-content: space-between;
      .title{
        display:flex;
        display: -webkit-flex;
        justify-content: space-between;
        .title-info{
          color: #727479;
          display: flex;
          display: -webkit-flex;
          justify-content: space-between;
          div{
            margin: 0 20px;
            span{
              margin: 0 5px;
            }
          }
        }
      }
    }
    .flex-end {
      display: flex;
      display: -webkit-flex;
      justify-content: flex-end;
    }
    .content {
      padding: 0 10px;
      min-height: 32px;
      background: #eef3fc;
      border-radius: 4px;
      font-size: 12px;
      color: #727479;
      word-break: break-all;
    }
    img {
      width: 80px;
      height: 80px;
      border-radius: 6px;
      margin: 0 10px 10px 0;
    }
    .follow_result,.accountability_result{
      display: flex;
      display: -webkit-flex;
      justify-content: space-between;
      .title{
        display: flex;
        display: -webkit-flex;
        justify-content: space-between;
        .accountability-info{
          color: #727479;
          margin-left: 23px;
          display: flex;
          display: -webkit-flex;
          justify-content: space-between;
          div{
            margin: 0 20px;
          }
        }
      }
    }
    .icon-edit{
      font-size: 24px;
      color: #409eff;
      vertical-align: middle;
      margin-top: 5px;
      margin-left: 5px;
    }
    .addWorkOrder {
      margin-bottom: 15px;
      padding-bottom: 15px;
      border-bottom: 1px solid rgb(238, 243, 252);
    }
    .remarks {
      margin-bottom: 15px;
      border-bottom: 1px solid #eef3fc;
      margin-top: 50px;
    }
    .wrap{
      display: flex;
      display: -webkit-flex;
      justify-content: flex-start;
      align-items: flex-end;
      height: 88px;
      margin-left: 50px;
      .user{
        width:100px;
        text-align: center;
      }
      .icon{
        height: 88px;
        width: 14px;
        position: relative;
        bottom: 0;
        .cricle{
          width: 12px;
          height: 12px;
          border-radius: 50%;
          border: 1px solid #727479;
          position: absolute;
          bottom: 0px;
          left: 0;
        }
        .lastest{
          border-color: red;
        }
        .line{
          height: 74px;
          width: 1px;
          background: #727479;
          position: absolute;
          left: 50%;
          transform: translateX(-50%);
          bottom: 14px;
        }
      }
      .text{
        margin-left:10px;
        font-size: 14px;
        width: 880px;
      }
      .el-icon-picture{
        cursor: pointer;
      }
    }
    .lastestStep{
      height: 40px;
    }
    .el-dialog__wrapper .el-dialog .el-dialog__header{
      border-bottom: none !important;
    }
    .accountability-tips{
      padding: 16px 0 16px 16px;
      color: #727479;
      font-size: 14px;
    }
    .acount-text label{
      color: #999;
    }
  }
</style>
