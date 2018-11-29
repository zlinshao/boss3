<template>
  <div id="addFollowUp">
    <el-dialog :close-on-click-modal="false" title="维修记录" :visible.sync="detailDialog" width="60%"
               v-loading="repairLoading"
               element-loading-text="拼命加载中"
               element-loading-spinner="el-icon-loading"
               element-loading-background="rgba(255, 255, 255, 0)">
      <div class="scroll_bar">
        <div class="topDetail">
          <div class="title">
            <span>维修单详情</span>
            <div class="preview">
              <div class="preview-item">
                <span>地址:</span>
                <span v-if="repairDetail.house_name">{{repairDetail.house_name}}</span>
                <span v-if="!repairDetail.house_name">暂无</span>
              </div>
              <div class="preview-item">
                <span>合同编号:</span>
                <span v-if="repairDetail.contract">{{repairDetail.contract.contract_number}}</span>
                <span v-if="!repairDetail.contract">暂无</span>
              </div>
              <div class="preview-item">
                <span>创建时间:</span>
                <span v-if="repairDetail.create_time">{{repairDetail.create_time}}</span>
                <span v-if="!repairDetail.create_time">暂无</span>
              </div>
              <div class="preview-item">
                <span>创建人:</span>
                <span v-if="repairDetail.operators">{{repairDetail.operators.name}}</span>
                <span v-if="!repairDetail.operators">暂无</span>
              </div>
              <div class="preview-item">
                <span>城市:</span>
                <span v-if="repairDetail.city_name">{{repairDetail.city_name}}</span>
                <span v-if="!repairDetail.city_name">暂无</span>
              </div>
            </div>
          </div>
          <el-button type="text" size="small" @click="editRepair()" :disabled="!isFlag">
            <i class="el-icon-edit"></i>修改维修单
          </el-button>
        </div>
        <div class="describe_border">
          <el-form size="small" label-width="100px">
            <!-- <el-row>
              <el-col :span="8">
                <el-form-item label="创建时间">
                  <div class="content">
                    <span v-if="repairDetail.create_time">{{repairDetail.create_time}}</span>
                    <span v-if="!repairDetail.create_time">暂无</span>
                  </div>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="创建人">
                  <div class="content">
                    <span v-if="repairDetail.operators">{{repairDetail.operators.name}}</span>
                    <span v-if="!repairDetail.operators">暂无</span>
                  </div>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="合同编号">
                  <div class="content">
                    <span v-if="repairDetail.contract">{{repairDetail.contract.contract_number}}</span>
                    <span v-if="!repairDetail.contract">暂无</span>
                  </div>
                </el-form-item>
              </el-col>
            </el-row> -->
            <el-row>
              <!-- <el-col :span="8">
                <el-form-item label="房屋地址">
                  <div class="content">
                    <span v-if="repairDetail.house_name">{{repairDetail.house_name}}</span>
                    <span v-if="!repairDetail.house_name">暂无</span>
                  </div>
                </el-form-item>
              </el-col> -->
              <!-- <el-col :span="8">
                <el-form-item label="所属城市">
                  <div class="content" v-if="repairDetail.city_name">{{repairDetail.city_name}}</div>
                  <div class="content" v-if="!repairDetail.city_name">暂无</div>
                </el-form-item>
              </el-col> -->
              <el-col :span="8">
                <el-form-item label="客户姓名" class="repair-text">
                  <div class="content">
                    <span v-if="repairDetail.customer_name">{{repairDetail.customer_name}}</span>
                    <span v-if="!repairDetail.customer_name">暂无</span>
                  </div>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="回复电话" class="repair-text">
                  <div class="content">
                    <span v-if="repairDetail.customer_mobile">{{repairDetail.customer_mobile}}</span>
                    <span v-if="!repairDetail.customer_mobile">暂无</span>
                  </div>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item :label="customer_type + '电话'" class="repair-text">
                  <div class="content">
                    <span v-if="repairDetail.landlord_mobile">{{repairDetail.landlord_mobile}}</span>
                    <span v-if="!repairDetail.landlord_mobile">暂无</span>
                  </div>
                </el-form-item>
              </el-col>
            </el-row>
            <!-- <el-row>
              <el-col :span="8">
                <el-form-item label="紧急程度">
                  <div class="content">
                    <span v-if="repairDetail.emergency === 1">一般</span>
                    <span v-if="repairDetail.emergency === 2">紧急</span>
                  </div>
                </el-form-item>
              </el-col>
            </el-row> -->
            <el-row>
              <el-col :span="8">
                <el-form-item label="下次跟进人" class="repair-text">
                  <div class="content">
                    <span v-if="repairDetail.follow_name">{{repairDetail.follow_name}}</span>
                    <span v-if="!repairDetail.follow_name">暂无</span>
                  </div>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="初步认责人" class="repair-text">
                  <div class="content">
                    <span v-if="repairDetail.person_liable">{{personCategories[repairDetail.person_liable]}}</span>
                    <span v-if="!repairDetail.person_liable">暂无</span>
                  </div>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="前租客姓名" v-if="repairDetail.person_liable === 692" class="repair-text">
                  <div class="content">
                    <span v-if="repairDetail.liable_name">{{repairDetail.liable_name}}</span>
                    <span v-if="!repairDetail.liable_name">暂无</span>
                  </div>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row v-if="repairDetail.status === 600">
              <el-col :span="8">
                <el-form-item label="完成时间" class="repair-text">
                  <div class="content">
                    <span v-if="repairDetail.finish_time">{{repairDetail.finish_time}}</span>
                    <span v-if="!repairDetail.finish_time">暂无</span>
                  </div>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="24">
                <el-form-item label="维修内容" class="repair-text">
                  <div class="content">
                    <span v-if="repairDetail.content">{{repairDetail.content}}</span>
                    <span v-if="!repairDetail.content">暂无</span>
                  </div>
                </el-form-item>
              </el-col>
            </el-row>
            
            <el-row>
              <el-col :span="24">
                <el-form-item label="备注" class="repair-text">
                  <div class="content">
                    <span v-if="repairDetail.remark">{{repairDetail.remark}}</span>
                    <span v-if="!repairDetail.remark">暂无</span>
                  </div>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="24">
                <el-form-item label="截图" class="repair-text">
                  <div>
                    <img v-if="repairDetail.album" v-for="item in repairDetail.album" :data-src="item.uri" :src="item.uri" data-magnify=""></img>
                  </div>
                </el-form-item>
              </el-col>
            </el-row>
            <div class="follow_result">
              <div class="title">跟进结果</div>
              <el-button type="text" size="small" @click="showAddResult()" :disabled="repairDetail.status === 600">
                <i class="el-icon-plus"></i>新增跟进结果
              </el-button>
            </div>
            <!--新增跟进结果-->
            <div v-if="addResult" class="addResult">
              <el-row>
                <el-col :span="12">
                  <el-form-item label="维修时间">
                    <el-date-picker
                      v-model="params.repair_time"
                      type="date" placeholder="选择日期时间"
                      value-format="yyyy-MM-dd">
                    </el-date-picker>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="维修状态" required>
                    <el-select v-model="params.status" placeholder="请选择维修状态" clearable>
                      <el-option v-for="item in state_repair" :label="item.dictionary_name" :key="item.id"
                                 :value="item.id" size="small">
                      </el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="12">
                  <el-form-item label="维修金额">
                    <el-input v-model="params.repair_money"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="维修师傅">
                    <el-input v-model="params.repair_master"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="12">
                  <el-form-item label="下次跟进人">
                    <el-input v-model="next_follow_name" readonly @focus="chooseStaff" placeholder="请选择下次跟进人">
                      <template slot="append">
                        <div style="cursor: pointer;" @click="emptyStaff">清空</div>
                      </template>
                    </el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="下次跟进时间">
                    <el-date-picker
                      v-model="params.estimated_time"
                      type="date"
                      placeholder="选择日期时间"
                      value-format="yyyy-MM-dd">
                    </el-date-picker>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="12">
                  <el-form-item label="最终认责人">
                    <el-select v-model="params.final_liable" placeholder="请选择最终认责人" clearable>
                      <el-option v-for="item in personCategory" :label="item.dictionary_name" :key="item.id"
                                 :value="item.id">
                      </el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :span="12" v-if="params.final_liable === 692">
                  <el-form-item label="前租客姓名">
                    <el-input v-model="params.final_liable_name" placeholder="请填写前租客姓名" clearable></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="24">
                  <el-form-item label="跟进结果" required>
                    <el-input type="textarea" v-model="params.content"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <div class="flex-end">
                <el-button size="small" @click="addResult = false">取 消</el-button>
                <el-button size="small" type="primary" @click="btnResult" :disabled="btnDisabled">确 定</el-button>
              </div>
            </div>
            <!--跟进结果展示-->
            <div v-if="repairDetail.follow && repairDetail.follow.length > 0">
              <div class="wrap" v-for="(item, index) in repairDetail.follow" :key="item.id" :class="{'lastestStep':index === 0}">
                <div class="user">
                  <div class="add-user">
                    <span v-if="item.followor">{{item.followor.name}}</span>
                    <span v-if="!item.followor">暂无</span>
                  </div>
                  <div class="add-time">
                    <span v-if="item.create_time">{{item.create_time}}</span>
                    <span v-if="!item.create_time">暂无</span>
                  </div>
                </div>
                <div class="icon">
                  <div class="line" v-if="index !== 0"></div>
                  <div class="circle"></div>
                </div>
                <div class="text">
                  <span class="res-status" v-if="item.status" :class="{'lastest':index === 0 && repairDetail.status !== 600}">{{states[item.status]}}</span>
                  <span class="res-status" v-if="!item.status">暂无</span>
                  <span class="res-text" v-if="item.content">{{item.content}}</span>
                  <span class="res-text" v-if="!item.content">暂无</span>
                </div>
              </div>
              <!-- <el-form size="small" label-width="100px">
                <el-row v-for="item in repairDetail.follow" :key="item.id" class="bearFruit">
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
                        <span v-if="item.followor">{{item.followor.name}}</span>
                        <span v-if="!item.followor">暂无</span>
                      </div>
                    </el-form-item>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item label="下次跟进人">
                      <div class="content">
                        <span v-if="item.next_follows">{{item.next_follows.name}}</span>
                        <span v-if="!item.next_follows">暂无</span>
                      </div>
                    </el-form-item>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item label="维修时间">
                      <div class="content">
                        <span v-if="item.repair_time">{{item.repair_time}}</span>
                        <span v-if="!item.repair_time">暂无</span>
                      </div>
                    </el-form-item>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item label="下次跟进时间">
                      <div class="content">
                        <span v-if="item.estimated_time">{{item.estimated_time}}</span>
                        <span v-if="!item.estimated_time">暂无</span>
                      </div>
                    </el-form-item>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item label="维修状态">
                      <div class="content">
                        <span v-if="item.status">{{states[item.status]}}</span>
                        <span v-if="!item.status">暂无</span>
                      </div>
                    </el-form-item>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item label="维修金额">
                      <div class="content">
                        <span v-if="item.repair_money">{{item.repair_money}}</span>
                        <span v-if="!item.repair_money">暂无</span>
                      </div>
                    </el-form-item>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item label="维修师傅">
                      <div class="content">
                        <span v-if="item.repair_master">{{item.repair_master}}</span>
                        <span v-if="!item.repair_master">暂无</span>
                      </div>
                    </el-form-item>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item label="最终认责人">
                      <div class="content">
                        <span v-if="item.final_liable">{{personCategories[item.final_liable]}}</span>
                        <span v-if="!item.final_liable ">暂无</span>
                      </div>
                    </el-form-item>
                  </el-col>
                  <el-col :span="12" v-if="item.final_liable === 692">
                    <el-form-item label="前租客姓名">
                      <div class="content">
                        <span v-if="item.final_liable_name">{{item.final_liable_name}}</span>
                        <span v-if="!item.final_liable_name">暂无</span>
                      </div>
                    </el-form-item>
                  </el-col>
                  <el-col :span="24">
                    <el-form-item label="跟进结果">
                      <div class="content">
                        <span v-if="item.content">{{item.content}}</span>
                        <span v-if="!item.content">暂无</span>
                      </div>
                    </el-form-item>
                  </el-col>
                </el-row>
              </el-form> -->
            </div>
            <!--跟进结果展示-->
            <div class="content" v-else style="text-align: center;line-height: 30px">
              暂无数据
            </div>
          </el-form>
        </div>
      </div>
    </el-dialog>
    <!--修改维修单 收-->
    <EditCollectRepair :module="collectRepairDialog" :detail="repairDetail" @close="closeModal"></EditCollectRepair>
    <!--修改维修单 租-->
    <EditRentRepair :module="rentRepairDialog" :detail="repairDetail" @close="closeModal"></EditRentRepair>
    <!--跟进记录 新增-->
    <!--<AddResult :addResultDialog="addResultDialog" :repairId="addResultId" @close="closeModal"></AddResult>-->

    <Organization :organizationDialog="organizationDialog" :type="organizeType" @close="closeOrganization"
                  @selectMember="selectMember"></Organization>
  </div>
</template>

<script>
  import AddResult from "./addResult.vue";
  import EditCollectRepair from "./addCollectRepair";
  import EditRentRepair from "./addRentRepair";
  import Organization from "../../common/organization";

  export default {
    name: "repair-detail",
    props: ["module", 'houseData'],
    components: {AddResult, EditCollectRepair, EditRentRepair, Organization},
    data() {
      return {
        organizationDialog: false,
        detailDialog: false,
        repairLoading: false,
        addResult: false,
        btnDisabled: false,               //禁止按钮
        repairDetail: {},
        flag: '',                         // 用来判断前租客是否显示
        organizeType: '',
        length: '',
        personCategory: [],               //认责人
        personCategories: {},             //认责人

        collectRepairDialog: false,
        rentRepairDialog: false,
        isFlag: false,                    // 用来判断是否可以修改维修单
        params: {
          repair_time: '',                //维修时间
          status: '',                     //维修状态
          repair_money: '',               //维修金额
          repair_master: '',              //维修师傅
          next_follow_id: '',             //下次跟进人
          estimated_time: '',             //下次跟进时间
          final_liable: '',               //最终认责人
          content: '',                    //跟进结果
          final_liable_name: '',          //前租客姓名
        },
        next_follow_name: '',             //下次跟进人
        state_repair: [],                 //维修状态
        states: {},                       //维修状态
        customer_type:''
      };
    },
    watch: {
      module(val) {
        this.detailDialog = val;
      },
      detailDialog(val) {
        if (!val) {
          this.$emit("close");
          this.repairDetail = {};
          this.init();
        } else {
          this.getDetail();
        }
      },
    },
    mounted() {
      console.log(this)
      // 维修状态
      this.dictionary(595, 1).then((res) => {
        this.state_repair = res.data;
        res.data.forEach(res => {
          this.states[res.id] = res.dictionary_name;
        })
      });
      // 认责人
      this.dictionary(604, 1).then((res) => {
        this.personCategory = res.data;
        res.data.forEach((item) => {
          this.personCategories[item.id] = item.dictionary_name;
        })
      });
    },
    methods: {
      getDetail() {
        this.repairLoading = true;
        this.$http.get(globalConfig.server + "repaire/info/" + this.houseData.id).then(res => {
          this.repairLoading = false;
          if (res.data.code === "600200") {
            this.isFlag = res.data.data.update;
            this.repairDetail = res.data.data;
            if(res.data.data.contract_type.indexOf('Renter') > -1){
              this.customer_type = '租客';
            }else{
              this.customer_type = '房东';
            }
            this.repairDetail.house_name = this.houseData.house_name;
            if(res.data.data.album){
              this.repairDetail.album = res.data.data.album;
            }
            if(res.data.data.followor){
              this.repairDetail.follow_name = res.data.data.followor.name;
            }
          } else {
            this.$notify.warning({
              title: "警告",
              message: res.data.msg
            });
          }
        });
      },
      
      closeModal(val) {
        this.collectRepairDialog = false;
        this.rentRepairDialog = false;
        if (val === "success") {
          this.getDetail();
        }
      },
      editRepair() {
        this.repairDetail = Object.assign({},this.repairDetail)
        if (this.houseData.activeName === "first") {
          this.collectRepairDialog = true;
        } else {
          this.rentRepairDialog = true;
        }
      },
      init() {
        this.params = {
          repair_time: '',        //维修时间
          status: '',             //维修状态
          repair_money: '',       //维修金额
          repair_master: '',      //维修师傅
          next_follow_id: '',     //下次跟进人
          estimated_time: '',     //下次跟进时间
          final_liable: '',       //最终认责人
          content: '',            //跟进结果
          final_liable_name: '',  //前租客姓名
        };
        this.addResult = false;
        this.next_follow_name = '';
      },
      closeOrganization() {
        this.organizationDialog = false;
        this.organizeType = '';
        this.length = '';
      },
      chooseStaff() {
        this.organizationDialog = true;
        this.organizeType = 'staff';
        this.length = 1;
      },
      selectMember(val) {
        this.next_follow_name = val[0].name;
        this.params.next_follow_id = val[0].id;
      },
      emptyStaff() {
        this.next_follow_name = '';
        this.params.next_follow_id = '';
      },
      // 增加跟进结果
      showAddResult() {
        this.init();
        this.addResult = true;
      },
      btnResult() {
        this.btnDisabled = true;
        this.$http.post(globalConfig.server + "repaire/follow/" + this.houseData.id, this.params).then(res => {
          if (res.data.code === "600200") {
            this.addResult = false;
            this.getDetail();
            this.$notify.success({
              title: "成功",
              message: res.data.msg
            });
          } else {
            this.$notify.warning({
              title: "警告",
              message: res.data.msg
            });
          }
          this.btnDisabled = false;
        });
      },
    }
  };
</script>
<style lang="scss">
  #addFollowUp {
    .addResult {
      margin-bottom: 18px;
      border-bottom: 1px solid #dfe6fb;
    }
    .topDetail{
      display: flex;
      display: -webkit-flex;
      justify-content: space-between;
      .title{
        display: flex;
        display: -webkit-flex;
        justify-content: space-between;
        .preview{
          color: #999;
          display: flex;
          display: -webkit-flex;
          .preview-item{
            margin: 0 10px 0 10px;
            span{
              margin: 0 5px 0 5px;
            }
          }
        }
      }
    }
    .wrap{
      display: flex;
      align-items: flex-end;
      justify-content: flex-start;
      height: 88px;
      margin-left: 50px;
      .user{
        text-align: center;
      }
      .icon{
        height: 88px;
        width: 14px;
        position: relative;
        bottom: 0;
        margin: 0 5px;
        .line{
          height: 74px;
          width: 1px;
          background: #727479;
          position: absolute;
          left: 50%;
          transform: translateX(-50%);
          bottom: 14px;
        }
        .circle{
          width: 12px;
          height: 12px;
          border-radius: 50%;
          border: 1px solid #727479;
          position: absolute;
          bottom: 0px;
          left: 0;
        }
      }
      .text{
        .res-status{
          color: #999;
          margin: 0 5px;
        }
        .lastest{
          color: #409EFF;
        }
      }
    }
    .lastestStep{
      height: 40px;
    }
    .repair-text label{
      color: #999;
    }
    .bearFruit {
      margin-bottom: 15px;
      border-bottom: 1px solid #eef3fc;
    }
    .content, .content-append {
      padding: 0 10px;
      min-height: 32px;
      background: #eef3fc;
      border-radius: 4px;
      font-size: 12px;
      color: #727479;
    }
    .content-append {
      background: #fff;
      color: #eef3fc;
      min-height: 33px;
    }
    .content_color {
      color: #fff;
    }
    img {
      width: 80px;
      height: 80px;
      border-radius: 6px;
      margin: 0 10px 10px 0;
    }
    .follow_result {
      display: flex;
      justify-content: space-between;
    }
    .flex-end {
      display: flex;
      display: -webkit-flex;
      justify-content: flex-end;
      padding-bottom: 18px;
    }
  }
</style>
