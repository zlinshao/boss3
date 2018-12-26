<template>
    <div id="employeeDetails">
      <el-dialog :close-on-click-modal="false" title="员工详情" :visible.sync="staffDetail" width="60%">
        <div class="scroll_bar">
          <el-form size="small" label-width="120px" >
            <el-tabs v-model="detailActiveName">
              <el-tab-pane label="个人信息" name="first">
                <div class="form_border">
                  <el-row :gutter="20">
                    <el-col :span="8">
                      <el-form-item label="真实姓名">
                        <div class="content">
                      <span v-if="staffDetailData && staffDetailData.detail && staffDetailData.detail.real_name">
                      {{staffDetailData && staffDetailData.detail && staffDetailData.detail.real_name}}</span>
                          <span v-else>暂无</span>
                        </div>
                      </el-form-item>
                    </el-col>
                    <el-col :span="8">
                      <el-form-item label="性别">
                        <div class="content">
                          <span>
                            {{ gender }}
                          </span>
                        </div>
                      </el-form-item>
                    </el-col>
                    <el-col :span="8">
                      <el-form-item label="手机号码">
                        <div class="content">
                      <span v-if="staffDetailData && staffDetailData.phone">
                        {{staffDetailData && staffDetailData.phone}}</span>
                          <span v-else>暂无</span>
                        </div>
                      </el-form-item>
                    </el-col>
                  </el-row>
                  <el-row :gutter="20">
                    <el-col :span="8">
                      <el-form-item label="身份证号">
                        <div class="content">
                      <span v-if="staffDetailData && staffDetailData.detail && staffDetailData.detail.id_num">
                      {{staffDetailData && staffDetailData.detail && staffDetailData.detail.id_num}}</span>
                          <span v-else>暂无</span>
                        </div>
                      </el-form-item>
                    </el-col>
                    <el-col :span="8">
                      <el-form-item label="生日">
                        <div class="content">
                      <span v-if="staffDetailData && staffDetailData.detail && staffDetailData.detail.birthday">
                        {{staffDetailData && staffDetailData.detail && staffDetailData.detail.birthday}}</span>
                          <span v-else>暂无</span>
                        </div>
                      </el-form-item>
                    </el-col>
                    <el-col :span="8">
                      <el-form-item label="生育状况">
                        <div class="content">
                          <span>{{ fertility_status }}</span>
                        </div>
                      </el-form-item>
                    </el-col>
                  </el-row>
                  <el-row :gutter="20">
                    <el-col :span="8">
                      <el-form-item label="家庭住址">
                        <div class="content">
                      <span v-if="staffDetailData && staffDetailData.detail && staffDetailData.detail.home_addr">
                      {{staffDetailData && staffDetailData.detail && staffDetailData.detail.home_addr}}</span>
                          <span v-else>暂无</span>
                        </div>
                      </el-form-item>
                    </el-col>
                    <el-col :span="8">
                      <el-form-item label="婚姻状况">
                        <div class="content">
                          <span>{{ marital_status }}</span>
                        </div>
                      </el-form-item>
                    </el-col>
                    <el-col :span="8">
                      <el-form-item label="紧急电话">
                        <div class="content">
                      <span v-if="staffDetailData && staffDetailData.detail && staffDetailData.detail.emergency_call">
                      {{staffDetailData && staffDetailData.detail && staffDetailData.detail.emergency_call}}</span>
                          <span v-else>暂无</span>
                        </div>
                      </el-form-item>
                    </el-col>
                  </el-row>
                  <el-row :gutter="24">
                    <el-col :span="8">
                      <el-form-item label="银行卡号">
                        <div class="content">
                      <span v-if="staffDetailData && staffDetailData.detail && staffDetailData.detail.bank_num">
                        {{staffDetailData && staffDetailData.detail && staffDetailData.detail.bank_num}}</span>
                          <span v-else>暂无</span>
                        </div>
                      </el-form-item>
                    </el-col>
                    <el-col :span="8">
                      <el-form-item label="开户行">
                        <div class="content">
                      <span v-if="staffDetailData && staffDetailData.detail && staffDetailData.detail.account_bank">
                        {{staffDetailData && staffDetailData.detail && staffDetailData.detail.account_bank}}</span>
                          <span v-else>暂无</span>
                        </div>
                      </el-form-item>
                    </el-col>
                    <el-col :span="8">
                      <el-form-item label="政治面貌">
                        <div class="content">
                          <span>{{ political_status }}</span>
                        </div>
                      </el-form-item>
                    </el-col>
                  </el-row>
                  <el-row :gutter="20">
                    <el-col :span="8">
                      <el-form-item label="支行">
                        <div class="content">
                      <span v-if="staffDetailData && staffDetailData.detail && staffDetailData.detail.branch_bank">
                        {{staffDetailData && staffDetailData.detail && staffDetailData.detail.branch_bank}}</span>
                          <span v-else>暂无</span>
                        </div>
                      </el-form-item>
                    </el-col>
                    <el-col :span="8">
                      <el-form-item label="银联行号">
                        <div class="content">
                      <span v-if="staffDetailData && staffDetailData.detail && staffDetailData.detail.account_name">
                        {{staffDetailData && staffDetailData.detail && staffDetailData.detail.account_name}}</span>
                          <span v-else>暂无</span>
                        </div>
                      </el-form-item>
                    </el-col>
                    <el-col :span="8">
                      <el-form-item label="籍贯">
                        <div class="content">
                          <span v-if="staffDetailData && staffDetailData.detail && staffDetailData.detail.origin_addr">
                          {{staffDetailData && staffDetailData.detail && staffDetailData.detail.origin_addr}}</span>
                          <span v-else>暂无</span>
                        </div>
                      </el-form-item>
                    </el-col>
                  </el-row>
                  <el-row>
                    <el-col :span="8">
                      <el-form-item label="毕业院校">
                        <div class="content">
                          <span v-if="staffDetailData && staffDetailData.detail && staffDetailData.detail.school">
                            {{staffDetailData && staffDetailData.detail && staffDetailData.detail.school}}</span>
                          <span v-else>暂无</span>
                        </div>
                      </el-form-item>
                    </el-col>
                    <el-col :span="8">
                      <el-form-item label="专业">
                        <div class="content">
                          <span v-if="staffDetailData && staffDetailData.detail && staffDetailData.detail.major">
                            {{staffDetailData && staffDetailData.detail && staffDetailData.detail.major}}</span>
                          <span v-else>暂无</span>
                        </div>
                      </el-form-item>
                    </el-col>
                    <el-col :span="8">
                      <el-form-item label="学历">
                        <div class="content">
                          <span>{{ education }}</span>
                        </div>
                      </el-form-item>
                    </el-col>
                  </el-row>
                  <el-row>
                    <el-col :span="8">
                      <el-form-item label="毕业时间">
                        <div class="content">
                          <span v-if="staffDetailData && staffDetailData.detail && staffDetailData.detail.graduation_time">
                            {{staffDetailData && staffDetailData.detail && staffDetailData.detail.graduation_time}}</span>
                          <span v-else>暂无</span>
                        </div>
                      </el-form-item>
                    </el-col>
                  </el-row>
                  
                </div>
              </el-tab-pane>
              <el-tab-pane label="工作信息" name="second">
                <div class="form_border">
                  <el-row :gutter="24">
                    <!-- <el-col :span="8">
                      <el-form-item label="公司">
                        <div class="content">
                          <span v-if="department">{{department}}</span>
                          <span v-else>暂无</span>
                        </div>
                      </el-form-item>
                    </el-col> -->
                    <el-col :span="8">
                      <el-form-item label="部门">
                        <div class="content">
                          <span v-if="department">{{department}}</span>
                          <span v-else>暂无</span>
                        </div>
                      </el-form-item>
                    </el-col>
                    <el-col :span="8">
                      <el-form-item label="职位">
                        <div class="content">
                          <span v-if="currentDuty">{{currentDuty}}</span>
                          <span v-else>暂无</span>
                        </div>
                      </el-form-item>
                    </el-col>
                  </el-row>
                  <el-row :gutter="24">
                    <el-col :span="8">
                      <el-form-item label="岗位">
                        <div class="content">
                          <span v-if="currentPosi">{{currentPosi}}</span>
                          <span v-else>暂无</span>
                        </div>
                      </el-form-item>
                    </el-col>
                    <el-col :span="8">
                      <el-form-item label="账号状态">
                        <div class="content">
                          <span v-if="staffDetailData && staffDetailData.is_enable">禁用</span>
                          <span v-if="staffDetailData && !staffDetailData.is_enable">启用</span>
                        </div>
                      </el-form-item>
                    </el-col>
                    <el-col :span="8">
                      <el-form-item label="在职状态">
                        <div class="content">
                          <span v-if="staffDetailData && staffDetailData.is_on_job">离职</span>
                          <span v-if="staffDetailData && !staffDetailData.is_on_job">在职</span>
                        </div>
                      </el-form-item>
                    </el-col>
                  </el-row>
                  <el-row :gutter="24">
                    <el-col :span="8">
                      <el-form-item label="等级">
                        <div class="content">
                          <span v-if="staffDetailData && staffDetailData.detail && staffDetailData.detail.level">
                            <span v-for="item in branchBankCategory">{{item.id == staffDetailData.detail.level ? item.dictionary_name : ''}}</span>
                          </span>
                          <span v-else>暂无</span>
                        </div>
                      </el-form-item>
                    </el-col>
                    <el-col :span="8">
                      <el-form-item label="入职时间">
                        <div class="content">
                      <span v-if="staffDetailData && staffDetailData.detail && staffDetailData.detail.enroll">
                        {{staffDetailData && staffDetailData.detail && staffDetailData.detail.enroll}}</span>
                          <span v-else>暂无</span>
                        </div>
                      </el-form-item>
                    </el-col>
                    <el-col :span="8">
                      <el-form-item label="入职途径">
                        <div class="content">
                          <span
                            v-if="staffDetailData && staffDetailData.detail && staffDetailData.detail.entry_way && staffDetailData.detail.entry_way !== 'null'">
                              {{staffDetailData.detail.entry_way.entry_type ? entryWayCategory[staffDetailData.detail.entry_way.entry_type-1].name : ''}}
                          </span>
                          <span v-else>暂无</span>
                        </div>
                      </el-form-item>
                    </el-col>
                    <!-- 
                     -->
                  </el-row>
                  <el-row :gutter="24">
                    <el-col :span="8">
                      <el-form-item label="推荐人">
                        <div class="content">
                          <span>{{ recommender }}</span>
                        </div>
                      </el-form-item>
                    </el-col>
                    <el-col :span="8">
                      <el-form-item label="转正时间">
                        <div class="content">
                          <span v-if="staffDetailData && staffDetailData.detail && staffDetailData.detail.forward_time">
                            {{staffDetailData && staffDetailData.detail && staffDetailData.detail.forward_time}}</span>
                          <span v-else>暂无</span>
                        </div>
                      </el-form-item>
                    </el-col>
                    <el-col :span="8">
                      <el-form-item label="薪资">
                        <div class="content">
                          <span v-if="staffDetailData && staffDetailData.detail && staffDetailData.detail.salary">
                            {{staffDetailData && staffDetailData.detail && staffDetailData.detail.salary}}</span>
                          <span v-else>暂无</span>
                        </div>
                      </el-form-item>
                    </el-col>
                    <!-- <el-col :span="8">
                      <el-form-item label="备注">
                        <div class="content">
                      <span
                        v-if="staffDetailData && staffDetailData.detail && staffDetailData.detail.entry_way && staffDetailData.detail.entry_way !== 'null'">
                        {{staffDetailData.detail.entry_way.entry_mess}}</span>
                          <span v-else>暂无</span>
                        </div>
                      </el-form-item>
                    </el-col> -->
                  </el-row>
                  <el-row :gutter="24">
                    <el-col :span="8">
                      <el-form-item label="第一次签合同时间">
                        <div class="content">
                          <span v-if="staffDetailData && staffDetailData.detail && staffDetailData.detail.agreement_first_time">
                            {{staffDetailData && staffDetailData.detail && staffDetailData.detail.agreement_first_time}}</span>
                          <span v-else>暂无</span>
                        </div>
                      </el-form-item>
                    </el-col>
                    <el-col :span="8">
                      <el-form-item label="第一次合同到期时间">
                        <div class="content">
                          <span v-if="staffDetailData && staffDetailData.detail && staffDetailData.detail.agreement_first_end_time">
                            {{staffDetailData && staffDetailData.detail && staffDetailData.detail.agreement_first_end_time}}</span>
                          <span v-else>暂无</span>
                        </div>
                      </el-form-item>
                    </el-col>
                     <el-col :span="8">
                      <el-form-item label="第二次签合同时间">
                        <div class="content">
                          <span v-if="staffDetailData && staffDetailData.detail && staffDetailData.detail.agreement_second_time">
                            {{staffDetailData && staffDetailData.detail && staffDetailData.detail.agreement_second_time}}</span>
                          <span v-else>暂无</span>
                        </div>
                      </el-form-item>
                    </el-col>
                    <!-- 
                    <el-col :span="8">
                      <el-form-item label="具体描述">
                        <div class="content">
                      <span
                        v-if="staffDetailData && staffDetailData.detail && staffDetailData.detail.dismiss_reason && staffDetailData.detail.dismiss_reason !== 'null'">
                        {{staffDetailData.detail.dismiss_reason.dismiss_mess}}</span>
                          <span v-else>暂无</span>
                        </div>
                      </el-form-item>
                    </el-col> -->
                  </el-row>
                  <el-row>
                    <el-col :span="8">
                      <el-form-item label="离职时间">
                        <div class="content">
                          <span v-if="staffDetailData && staffDetailData.detail && staffDetailData.detail.dismiss_time">
                            {{staffDetailData && staffDetailData.detail && staffDetailData.detail.dismiss_time}}</span>
                          <span v-else>暂无</span>
                        </div>
                      </el-form-item>
                    </el-col>
                    <el-col :span="8">
                      <el-form-item label="离职原因">
                        <div class="content">
                          <span v-if="staffDetailData && staffDetailData.detail && staffDetailData.detail.dismiss_reason && staffDetailData.detail.dismiss_reason !== 'null'">
                            {{DRCategory[staffDetailData.detail.dismiss_reason.dismiss_type]}}</span>
                          <span v-else>暂无</span>
                        </div>
                        <div>
                          <div style="display: inline-block;">
                            <el-button type="text" v-if="dismiss_group == 1" @click="sendMessage(1)">已发送群信息</el-button>
                            <el-button type="text" @click="sendMessage(1)" v-else>发送群消息</el-button>
                          </div>
                          <div style="display: inline-block;">
                            <el-button type="text" v-if="dismiss_sms == 1" @click="sendMessage(2)">已发送离职短信</el-button>
                            <el-button type="text" @click="sendMessage(2)" v-else>离职短信</el-button>
                          </div>
                        </div>
                      </el-form-item>
                    </el-col>
                    <el-col :span="8">
                      <el-form-item label="离职备注">
                        <div class="content">
                          <!-- <span v-if="staffDetailData && staffDetailData.detail && staffDetailData.detail.remark">
                            {{staffDetailData && staffDetailData.detail && staffDetailData.detail.remark}}</span> -->
                            <span v-if="staffDetailData && staffDetailData.detail && staffDetailData.detail.dismiss_reason && staffDetailData.detail.dismiss_reason !== 'null'">
                            {{staffDetailData.detail.dismiss_reason.dismiss_mess}}</span>
                          <span v-else>暂无</span>
                        </div>
                      </el-form-item>
                    </el-col>
                  </el-row>
                  <!-- <el-row :gutter="20">
                    <el-col :span="24">
                      <el-form-item label="入职材料">
                        <div class="content">
                      <span>
                        <el-checkbox-group v-model="entry_materials" style="display: inline;">
                          <el-checkbox v-for="item in entryMaterialsCategory" :label="item.id" :key="item.id"
                                      :value="item.id"
                                      disabled>{{item.dictionary_name}}</el-checkbox>
                        </el-checkbox-group>
                      </span>
                        </div>
                      </el-form-item>
                    </el-col>
                  </el-row> -->
                    <!-- <el-row :gutter="20">
                      <el-col :span="8">
                        <el-form-item label="企业邮箱">
                          <div class="content">
                        <span v-if="staffDetailData && staffDetailData.detail && staffDetailData.detail.mail">
                          {{staffDetailData && staffDetailData.detail && staffDetailData.detail.mail}}</span>
                            <span v-else>暂无</span>
                          </div>
                        </el-form-item>
                      </el-col>
                    </el-row> -->
                  <el-row>
                    <el-col :span="24">
                      <el-form-item label="身份证复印件">
                        <div class="image" @dragover='allowDrop($event)' id="certificate_photo">
                          <span v-if="IDimgList.length<1">暂无照片</span>
                          <img v-for="(value,key) in IDimgList" :key="key" :src="value" data-magnify="" :data-src="value" @drag="currentPicId(key)">
                        </div>
                      </el-form-item>
                    </el-col>
                    <el-col :span="24">
                      <el-form-item label="银行卡复印件">
                        <div class="image" @dragover='allowDrop($event)' id="certificate_photo">
                          <span v-if="BankimgList.length<1">暂无照片</span>
                          <img v-for="(value,key) in BankimgList" :key="key" :src="value" data-magnify="" :data-src="value" @drag="currentPicId(key)">
                        </div>
                      </el-form-item>
                    </el-col>
                    <el-col :span="24">
                      <el-form-item label="劳动合同">
                        <div class="image" @dragover='allowDrop($event)' id="certificate_photo">
                          <span v-if="ContractimgList.length<1">暂无照片</span>
                          <img v-for="(value,key) in ContractimgList" :key="key" :src="value" data-magnify="" :data-src="value" @drag="currentPicId(key)">
                        </div>
                      </el-form-item>
                    </el-col>
                    <el-col :span="24">
                      <el-form-item label="学历复印件">
                        <div class="image" @dragover='allowDrop($event)' id="certificate_photo">
                          <span v-if="EducationimgList.length<1">暂无照片</span>
                          <img v-for="(value,key) in EducationimgList" :key="key" :src="value" data-magnify="" :data-src="value" @drag="currentPicId(key)">
                        </div>
                      </el-form-item>
                    </el-col>
                    <el-col :span="24">
                      <el-form-item label="应聘表">
                        <div class="image" @dragover='allowDrop($event)' id="certificate_photo">
                          <span v-if="ApplyimgList.length<1">暂无照片</span>
                          <img v-for="(value,key) in ApplyimgList" :key="key" :src="value" data-magnify="" :data-src="value" @drag="currentPicId(key)">
                        </div>
                      </el-form-item>
                    </el-col>
                    <el-col :span="24">
                      <el-form-item label="上家离职单位证明">
                        <div class="image" @dragover='allowDrop($event)' id="certificate_photo">
                          <span v-if="DismissimgList.length<1">暂无照片</span>
                          <img v-for="(value,key) in DismissimgList" :key="key" :src="value" data-magnify="" :data-src="value" @drag="currentPicId(key)">
                        </div>
                      </el-form-item>
                    </el-col>
                  </el-row> 
                </div>
              </el-tab-pane>
              <el-tab-pane label="成长轨迹" name="third">
                <div class="form_border">
                  <div v-if="growthData.length>0">
                    <el-form size="small" v-if="growthData">
                      <el-row :gutter="20" v-for="item in growthData" :key="item.id" style="margin-bottom: 15px;">
                        <el-col :span="4">
                          <div class="content">
                            <span v-if="item.create_time">{{item.create_time}}</span>
                            <span v-if="!item.create_time">暂无</span>
                          </div>
                        </el-col>
                        <el-col :span="20">
                          <div class="content">
                            <span v-if="item.content">{{item.content}}</span>
                            <span v-if="!item.content">暂无</span>
                          </div>
                        </el-col>
                      </el-row>
                    </el-form>
                  </div>
                  <div class="content" v-else="" style="text-align: center;line-height: 30px;margin-bottom: 15px;">
                    暂无数据
                  </div>
                </div>
              </el-tab-pane>
            </el-tabs>
          </el-form>
        </div>
        <span slot="footer" class="dialog-footer">
          <el-button size="mini" type="primary" @click="staffDetail = false">确 定</el-button>
        </span>
      </el-dialog>
      <!-- 发送离职消息 -->

    </div>
</template>

<script>
export default {
  props: ["ids", "lookResigntion"],
  data() {
    return {
      dismiss_sms: "",
      dismiss_group: "",
      IDimgList: [],           // ID图片
      BankimgList: [],        // 银行卡图片
      ContractimgList: [],   // 合同图片
      EducationimgList: [],  // 学历图片
      ApplyimgList: [],      // 申请图片
      DismissimgList: [],   // 离职证明图片
      staffDetail: false,
      detailActiveName: 'first',
      employDetailId: "",  // 员工id
      staffDetailData: {},
      gender: '',           // 性别
      department: '',  //部门
      currentDuty: '',  // 职位
      entry_materials: [],   // 入职材料
      entryMaterialsCategory: [],  // 入职材料
      marital_status: '',   // 婚姻状况
      political_status: '',  // 政治面貌
      growthData: [],  // 成长轨迹
      education: '',  //学历
      fertility_status: "",  // 生育状况
      currentPosi: '',  // 岗位
      recommender: "", // 推荐人
      branchBankCategory: [],  // 等级
      DRCategory: {"1": "主动离职", "2": "旷工离职", "3": "劝退", "4": "开除",},
      entryWayCategory: [
          {id: "1", name: '智联招聘'},
          {id: "2", name: '前程无忧'},
          {id: "3", name: '58同城'},
          {id: "4", name: 'BOSS直聘'},
          {id: "5", name: '猎聘网'},
          {id: "6", name: '首席信才'},
          {id: "7", name: '德盛人才'},
          {id: "8", name: '校园招聘会'},
          {id: "9", name: '社会招聘会'},
          {id: "10", name: '推荐'},
          {id: "11", name: '其他'},
        ],
    }
  },
  watch: {
    lookResigntion(val) {
      this.staffDetail = val;
    },
    staffDetail(val) {
      if(!val) {
        this.$emit("close");
      }
    },
    ids(val) {
      this.employDetailId = val;
      this.openDetail(val);
    }
  },
  mounted() {
    this.getBranchBank();
  },
  methods: {
    // 发送群消息
    sendMessage(val) {
      if(val == 1) {
        this.$confirm('员工在职状态将会改变并且向群里发送消息，是否继续？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
           this.$http.get(globalConfig.server + `organization/staff/leave-group/${this.employDetailId}?dismiss_time=${this.staffDetailData.detail.dismiss_time}`).then((res) => {
            if(res.data.code == "710910") {
              this.$notify.success({
                title: '成功',
                message: res.data.msg
              });
              this.openDetail(this.employDetailId);
            } else {
              this.$notify.warning({
                title: '失败',
                message: res.data.msg
              });
            }
          })
        })
      } else if (val == 2) {
         this.$confirm('员工已离职是否发送短信，是否继续？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$http.get(globalConfig.server + 'organization/staff/leave-sms', { params: {id: this.employDetailId, date: this.staffDetailData.detail.dismiss_time}}).then(res => {
            if (res.data.code === "710910") { 
              this.$notify.success({
                title: '成功',
                message: res.data.msg
              });
              this.openDetail(this.employDetailId);
            } else {
              this.$notify.warning({
                title: '失败',
                message: res.data.msg
              });
            }
          })
        })
      }
    },
    // 查看图片
    allowDrop(e) {
      e.preventDefault();
    },
    currentPicId(key) {
      this.dragPicId = key;
    },
    //员工详情
    openDetail(id) {
      // this.staffDetail = true;
      this.$http.get(globalConfig.server + 'organization/staff/' + id).then((res) => {
        this.getDuty(res.data.data.id, true);
        if (res.data.data.detail.recommender) {
          this.getDuty(res.data.data.detail.recommender, false);
        } else {
          this.recommender = "暂无";
        }
        this.staffDetailData = {};
        this.currentPost = this.currentPosition = '';
        if (res.data.code === '710910') {
          let detail = res.data.data.detail;
          this.staffDetailData = res.data.data;
          this.entry_materials = [];
          //入职材料
          if (detail && detail.entry_materials && detail.entry_materials.length > 0) {
            for (let i = 0; i < detail.entry_materials.length; i++) {
              this.entry_materials.push(Number(detail.entry_materials[i]));
            }
          }
          //部门
          let departNameArray = [];
          if (res.data.data && res.data.data && res.data.data.org.length > 0) {
            res.data.data.org.forEach((item) => {
              departNameArray.push(item.name);
            });
          }
          this.department = departNameArray.join(',');
          //职位，岗位
          let roleArray = res.data.data.role;
          let roleNames = [];
          let positionNames = [];
          if (roleArray && roleArray.length > 0) {
            roleArray.forEach((item) => {
              roleNames.push(item.display_name);
              if (item.positions) {
                positionNames.push(item.positions.name);
              }
            });
          }
          this.currentPost = roleNames.join(',');
          this.currentPosition = positionNames.join(',');

        }
      });
      //成长轨迹
      this.$http.get(globalConfig.server + 'manager/staff/growth/' +id).then((res) => {
        if (res.data.code === '10070') {
          this.growthData = res.data.data;
        } else {
          this.growthData = [];
        }
      });
    },
    //获取职位岗位
    getDuty(user_id, status) {
      this.ContractimgList = [];
      this.EducationimgList  = [];
      this.DismissimgList = [];
      this.ApplyimgList = [];
      this.IDimgList = [];
      this.BankimgList = [];
      this.$http.get(globalConfig.server + 'hrm/User/userInfo', {
        params: {
          user_id
        }
      }).then(res => {
        if (res.status === 200) {
          if (res.data.code == 90010) {
            if (status) {
              this.currentDuty = res.data.data.dutyInfoNames;
              this.currentPosi = res.data.data.positionInfoNames;
              if(res.data.data.send_info) {
                this.dismiss_group =  res.data.data.send_info.dismiss_group;
                this.dismiss_sms =  res.data.data.send_info.dismiss_sms;
              }
              // console.log(res.data.data.image_info, "22222222")
              if(res.data.data.image_info) {
                for( let key in res.data.data.image_info) {
                  if(key == "doc_photo") {
                    res.data.data.image_info[key].forEach((item, index) => {
                      this.IDimgList.push(item.uri)
                    })
                  }
                   if(key == "education") {
                    res.data.data.image_info[key].forEach((item, index) => {
                      this.EducationimgList.push(item.uri)
                    })
                  }
                  if(key == "labor_contract") {
                    res.data.data.image_info[key].forEach((item, index) => {
                      this.ContractimgList.push(item.uri)
                    })
                  }
                  if(key == "resignation") {
                    res.data.data.image_info[key].forEach((item, index) => {
                      this.DismissimgList.push(item.uri)
                    })
                  }
                  if(key == "resume") {
                    res.data.data.image_info[key].forEach((item, index) => {
                      this.ApplyimgList.push(item.uri)
                    })
                  }
                  if(key == "bank") {
                    res.data.data.image_info[key].forEach((item, index) => {
                      this.BankimgList.push(item.uri)
                    })
                  }
                }
              }
              this.dict(res);
            } else {
              this.recommender = res.data.data.name;
            }
          }
        }
      }).catch(err => {
        console.log(err);
      })
    },
    dict(res) {
      this.dictionary(228, 1).then(result => {// 性别
        result.data.map((item, index) => {
          if (res.data.data.gender) {
            if (item.id === res.data.data.gender) {
              this.gender = result.data[index].dictionary_name;
            }
          } else {
            this.gender = "暂无";
          }
        })
      });
      this.dictionary(231, 1).then(result => {// 生育状况
        result.data.map((item, index) => {
          if (res.data.data.fertility_status) {
            if (item.id == res.data.data.fertility_status) {
              this.fertility_status = result.data[index].dictionary_name;
            }
          } else {
            this.fertility_status = "暂无";
          }
        })
      });
      this.dictionary(33, 1).then(result => {// 婚姻状况
        result.data.map((item, index) => {
          if (res.data.data.marital_status) {
            if (item.id == res.data.data.marital_status) {
              this.marital_status = result.data[index].dictionary_name;
            }
          } else {
            this.marital_status = "暂无";
          }
        })
      });
      this.dictionary(38, 1).then(result => {// 政治面貌
        result.data.map((item, index) => {
          if (res.data.data.political_status) {
            if (item.id == res.data.data.political_status) {
              this.political_status = result.data[index].dictionary_name;
            }
          } else {
            this.political_status = "暂无";
          }
        })
      });
      this.dictionary(39, 1).then(result => {
        result.data.map((item, index) => {
          if (res.data.data.education) {
            if (item.id == res.data.data.education) {
              this.education = result.data[index].dictionary_name;
            }
          } else {
            this.education = "暂无";
          }
        })
      })
    },
    //等级
    getBranchBank() {
      this.$http.get(globalConfig.server + 'setting/dictionary/234').then((res) => {
        if (res.data.code === '30010') {
          this.branchBankCategory = res.data.data;
        } else {
          this.branchBankCategory = [];
        }
      });
    },
  }
}
</script>

<style lang="scss">
  #employeeDetails {
    .content {
      padding: 0 10px;
      min-height: 32px;
      background: #eef3fc;
      border-radius: 4px;
      font-size: 12px;
      color: #727479;
      line-height: 30px;
    }
    .image {
      img {
        width: 80px;
        height: 80px;
        margin-right: 10px;
      }
    }
  }
  
</style>
