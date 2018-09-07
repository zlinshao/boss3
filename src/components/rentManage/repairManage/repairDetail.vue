<template>
  <div id="addFollowUp">
    <el-dialog :close-on-click-modal="false" title="维修记录" :visible.sync="repairDetailDialogVisible" width="60%" :close="init">
      <div class="scroll_bar">
        <div class="title">维修单详情</div>
        <div class="describe_border">
          <el-form size="small" label-width="100px">
            <el-row>
              <el-col :span="8">
                <el-form-item label="创建时间">
                  <div class="content" v-if="repairDetail.create_time">{{repairDetail.create_time}}</div>
                  <div class="content" v-if="!repairDetail.create_time">暂无</div>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="创建人">
                  <div class="content">
                    <span v-if="repairDetail.operator">{{repairDetail.operator}}</span>
                    <span v-if="!repairDetail.operator">暂无</span>
                  </div>
                </el-form-item>
              </el-col>
              <el-col :span="8" style="text-align: right">
                <el-button type="text" size="small" @click="editRepair(repairDetail.id)" :disabled="!isflag">
                  <i class="el-icon-edit"></i>修改维修单
                </el-button>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="8">
                <el-form-item label="合同编号">
                  <div class="content">
                    <span v-if="repairDetail.repaire_num">{{repairDetail.repaire_num}}</span>
                    <span v-if="!repairDetail.repaire_num">暂无</span>
                  </div>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="所属城市">
                  <div class="content" v-if="repairDetail.city_name">{{repairDetail.city_name}}</div>
                  <div class="content" v-if="!repairDetail.city_name">暂无</div>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="已完成时间">
                  <div class="content">
                    <span v-if="repairDetail.finish_time">{{repairDetail.finish_time}}</span>
                    <span v-if="!repairDetail.finish_time">暂无</span>
                  </div>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="8">
                <el-form-item label="客户姓名">
                  <div class="content">
                    <span v-if="repairDetail.customer_name">{{repairDetail.customer_name}}</span>
                    <span v-if="!repairDetail.customer_name">暂无</span>
                  </div>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="回复电话">
                  <div class="content">
                    <span v-if="repairDetail.customer_mobile">{{repairDetail.customer_mobile}}</span>
                    <span v-if="!repairDetail.customer_mobile">暂无</span>
                  </div>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="下次跟进人">
                  <div class="content">
                    <span v-if="repairDetail.followor">{{repairDetail.followor.name}}</span>
                    <span v-if="!repairDetail.followor">暂无</span>
                  </div>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="8">
                <el-form-item label="初步认责人">
                  <div class="content">
                    <span v-if="repairDetail.liable">{{repairDetail.liable}}</span>
                    <span v-if="!repairDetail.liable">暂无</span>
                  </div>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="房屋地址">
                  <div class="content">
                    <span v-if="repairDetail.contract">{{repairDetail.contract.house.name}}</span>
                    <span v-if="!repairDetail.contract">暂无</span>
                  </div>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="房东电话">
                  <div class="content">
                    <span v-if="repairDetail.landlord_mobile">{{repairDetail.landlord_mobile}}</span>
                    <span v-if="!repairDetail.landlord_mobile">暂无</span>
                  </div>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="24">
                <el-form-item label="维修内容">
                  <div class="content">
                    <span v-if="repairDetail.content">{{repairDetail.content}}</span>
                    <span v-if="!repairDetail.content">暂无</span>
                  </div>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="24">
                <el-form-item label="备注">
                  <div class="content">
                    <span v-if="repairDetail.remark">{{repairDetail.remark}}</span>
                    <span v-if="!repairDetail.remark">暂无</span>
                  </div>
                </el-form-item>
              </el-col>
            </el-row>
            <div class="follow_result">
              <div class="title">跟进结果</div>
              <el-button type="text" size="small" @click="addResult(repairDetail.id)">
                <i class="el-icon-plus"></i>新增跟进结果
              </el-button>
            </div>
            <div v-if="repairDetail.follow && repairDetail.follow.length>0">
              <el-form size="small" label-width="100px" v-if="repairDetail.follow">
                <el-row v-for="item in repairDetail.follow" :key="item.id" style="margin-bottom: 15px;border-bottom: 1px solid #eef3fc;">
                  <el-col :span="12">
                    <el-form-item label="跟进时间">
                      <div class="content" style="background-color:#fff">
                        <el-input v-if="item.create_time" v-model="item.create_time" disabled></el-input>
                        <el-input v-if="!item.create_time" disabled value="暂无"></el-input>
                      </div>
                    </el-form-item>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item label="跟进人">
                      <div class="content" style="background-color:#fff">
                        <el-input v-if="item.followor" v-model="item.followor.name" disabled></el-input>
                        <el-input v-if="!item.followor" disabled value="暂无"></el-input>
                      </div>
                    </el-form-item>
                  </el-col>
                   <el-col :span="12">
                    <el-form-item label="下次跟进人">
                      <div class="content" style="background-color:#fff">
                        <el-input v-if="item.next_follows" v-model="item.next_follows.name" disabled></el-input>
                        <el-input v-if="!item.next_follows" disabled value="暂无"></el-input>
                      </div>
                    </el-form-item>
                  </el-col>
                   <el-col :span="12">
                    <el-form-item label="维修时间">
                      <div class="content" style="background-color:#fff">
                        <el-input v-if="repairDetail.follow" v-model="item.repair_time" disabled></el-input>
                        <el-input v-if="!repairDetail.follow" disabled value="暂无"></el-input>
                      </div>
                    </el-form-item>
                  </el-col>
                   <el-col :span="12">
                    <el-form-item label="下次跟进时间">
                      <div class="content" style="background-color:#fff">
                        <el-input v-if="repairDetail.estimated_time" v-model="item.estimated_time" disabled></el-input>
                        <el-input v-if="!repairDetail.estimated_time" disabled value="暂无"></el-input>
                      </div>
                    </el-form-item>
                  </el-col>
                  <el-col :span="12">
                <el-form-item label="维修状态">
                  <div class="content" style="background-color:#fff">
                    <el-input v-if="repairDetail.statu" v-model="repairDetail.statu" disabled></el-input>
                    <el-input v-if="!repairDetail.statu" disabled value="暂无"></el-input>
                  </div>
                </el-form-item>
              </el-col>
                  <el-col :span="12" v-if="repaires.status === 600 ? isfinish_time : !isfinish_time">
                    <el-form-item label="已完成时间">
                      <div class="content" style="background-color:#fff">
                        <el-input v-if="repairDetail.finish_time" v-model="repairDetail.finish_time" disabled></el-input>
                        <el-input v-if="!repairDetail.finish_time" disabled value="暂无"></el-input>
                      </div>
                    </el-form-item>
                  </el-col>
              <el-col :span="12">
                <el-form-item label="维修金额">
                  <div class="content" style="background-color:#fff">
                    <el-input v-if="repairDetail.follow" v-model="item.repair_money" disabled></el-input>
                    <el-input v-if="!repairDetail.follow" disabled value="暂无"></el-input>
                  </div>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="维修师傅">
                  <div class="content" style="background-color:#fff">
                    <el-input v-if="repairDetail.follow" v-model="item.repair_master" disabled></el-input>
                    <el-input v-if="!repairDetail.follow" disabled value="暂无"></el-input>
                  </div>
                </el-form-item>
              </el-col>
                  <el-col :span="24">
                    <el-form-item label="跟进结果" required>
                      <div class="content" style="background-color:#fff">
                        <el-input v-if="item.content" v-model="item.content" type="textarea" disabled></el-input>
                        <el-input v-if="!item.content" disabled value="暂无"></el-input>
                      </div>
                    </el-form-item>
                  </el-col>
                </el-row>
               
              </el-form>
            </div>
            <div class="content" v-else="" style="text-align: center;line-height: 30px" v-show="!isappend">
              暂无数据
            </div>
             <!-- 点击新增结果  显示出来 -->
                <el-row v-show="isappend">
                   <el-col :span="12">
                    <el-form-item label="跟进时间">
                      <div class="content-append">
                        <el-input disabled v-model="setTime"></el-input>
                      </div>
                    </el-form-item>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item label="跟进人">
                      <div class="content-append">
                        <el-input disabled v-model="follow_name"></el-input>
                      </div>
                    </el-form-item>
                  </el-col>
                   <el-col :span="12">
                    <el-form-item label="下次跟进人">
                      <div class="content-append">
                        <el-input v-model="next_follow_id" readonly @focus="chooseStaff" placeholder="请选择下次跟进人">
                          <template slot="append">
                            <div style="cursor: pointer;" @click="emptyStaff">清空</div>
                          </template>
                        </el-input>
                         </div>
                      </el-form-item> 
                  </el-col>
                   <el-col :span="12">
                    <el-form-item label="维修时间">
                      <div class="content-append">
                        <el-date-picker
                          v-model="repaires.repair_time"
                          type="datetime"
                          placeholder="选择日期时间"
                          default-time="12:00:00" ref="repair_time">
                        </el-date-picker>
                      </div>
                    </el-form-item>
                  </el-col>
                   <el-col :span="12">
                    <el-form-item label="下次跟进时间">
                      <div class="content-append">
                        <el-date-picker
                          v-model="append_time"
                          type="datetime"
                          placeholder="选择日期时间"
                          default-time="12:00:00" ref="estimated_time">
                        </el-date-picker>
                      </div>
                    </el-form-item>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item label="维修状态" required>
                      <div class="content-append">
                           <el-select clearable placeholder="请选择维修状态" value="" v-model="city">
                            <el-option v-for="item in state_repair" :label="item.dictionary_name" :value="item.id"
                                      :key="item.id"></el-option>
                          </el-select>
                        </div>
                    </el-form-item>
                  </el-col>
              <el-col :span="12">
                <el-form-item label="维修金额">
                  <div class="content-append">
                    <el-input v-model="repaires.repair_money"></el-input>
                  </div>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="维修师傅">
                 <div class="content-append">
                    <el-input v-model="repaires.repair_master"></el-input>
                  </div>
                </el-form-item>
              </el-col>
               <el-col :span="12">
                    <el-form-item label="最终认责人">
                      <div class="content-append">
                      <el-select v-model="repaires.final_liable" placeholder="请选择最终认责归属" clearable @change="setchange">
                        <el-option v-for="item in responsiblePersonCategory" :label="item.dictionary_name" :key="item.id"
                                  :value="item.id" size="small">{{item.dictionary_name}}
                        </el-option>
                      </el-select>
                      </div>
                      </el-form-item> 
                  </el-col>
                  <el-col :span="12" v-if="flag">
                  <el-form-item label="前租客姓名" required>
                    <div class="content-append">
                    <el-input></el-input>
                    </div>
                  </el-form-item>
                </el-col>
                  <el-col :span="24">
                    <el-form-item label="跟进结果">
                      <div class="content-append">
                        <el-input type="textarea" v-model="repaires.content"></el-input>
                      </div>
                    </el-form-item>
                  </el-col>
                  <div class="right">
                    <el-button size="small" type="info" @click="close">取消</el-button>
                    <el-button size="small" type="primary" @click="submit">确定</el-button>
                  </div>
                </el-row>
          </el-form>
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <!--<el-button size="small" @click="orderDetailDialogVisible = false">取 消</el-button>-->
        <!--<el-button size="small" type="primary" @click="confirmAdd">确 定</el-button>-->
      </span>
    </el-dialog>
    <EditCollectRepair :addCollectRepairDialog="collectRepairDialog" :editId="editId"
                       @close="closeModal"></EditCollectRepair>
    <EditRentRepair :addRentRepairDialog="rentRepairDialog" :editId="editId" @close="closeModal"></EditRentRepair>

    <AddResult :addResultDialog="addResultDialog" :repairId="addResultId"
               @close="closeModal"></AddResult>
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
  props: ["repairDetailDialog", "repairId", "activeName"],
  components: { AddResult, EditCollectRepair, EditRentRepair, Organization },
  data() {
    return {
      _thisId: "", //当前的ID 需要传递给后台
      organizationDialog: false,
      isfinish_time : true,
      follow_name: "", //跟进人名字
      repairDetailDialogVisible: false,
      repairDetail: {},
      _repairDetail: [],
      addResultId: "",
      addResultDialog: false,
      editId: "",
      collectRepairDialog: false,
      rentRepairDialog: false,
      isflag: false, // 用来判断是否可以修改维修单
      isappend: false,
      append_time: "", // 下次跟进时间
      finish_time: "", // 已完成時間
      state_repair: [],
      city: "",
      organizeType: "",
      follow_id: "",
      setTime: "",
      _follow_name: "",
      next_follow_id: "",
      responsiblePersonCategory: [],
      flag : "", // 用来判断前租客是否显示
      repaires: {
        // 新增跟进结果数据
        content: "", // 维修结果
        repair_time: "", //维修时间
        // estimated_time: this.estimated_time,
        repair_money: "", // 维修金额
        repair_master: "", // 维修师傅
        status: "", //维修状态
        final_liable: "", // 最终认责人
        next_follow_id: "" // 下次跟进人
      }
    };
  },
  watch: {
    repairDetailDialog(val) {
      this.repairDetailDialogVisible = val;
    },
    repairDetailDialogVisible(val) {
      if (!val) {
        this.$emit("close");
        this.init();
      } else {
        this.getDetail();
        this.setchange();
      }
    }
  },
  mounted() {
    this.init();
  },
  methods: {
    setchange() {
      //  判断  如果初步责任人  选择的是 前租客  显示 前租客姓名的文本框 否则隐藏
      if (this.repaires.final_liable === 692) {
        this.flag = true;
      } else {
        this.flag = false;
      }
    },
    getDetail() {
      this.$http
        .get(globalConfig.server + "repaire/info/" + this.repairId)
        .then(res => {
          if (res.data.code === "600200") {
            this.repairDetail = res.data.data;
            this._repairDetail = res.data.data.follow;
            this.isflag = res.data.data.update;
            this._thisId = res.data.data.id;
            this.finish_time = res.data.data.finish_time;
            this.repaires.status = res.data.data.status;
            if(this.repaires.status !== 600){
              this.isfinish_time == true;
            }        
          if(res.data.data.followor){
              this._follow_name = res.data.data.followor.name;
            }
          } else {
            this.$notify.warning({
              title: "警告",
              message: res.data.msg
            });
          }
        });
      this.$http
        .get(globalConfig.server + "setting/dictionary/595")
        .then(res => {
          // 拿到维修状态列表
          if (res.data.code === "30010") {
            this.state_repair = res.data.data;
          }
        });
      this.dictionary(604).then(res => {
        //认责人
        this.responsiblePersonCategory = res.data;
      });
    },
    addResult(id) {
      this.addResultId = id;
      this.addResultDialog = false;
      this.isappend = true;
    },
    closeModal(val) {
      this.addResultDialog = false;
      this.collectRepairDialog = false;
      this.rentRepairDialog = false;
      if (val === "success") {
        this.getDetail();
      }
    },
    editRepair(id) {
      this.editId = id;
      if (this.activeName === "first") {
        this.collectRepairDialog = true;
      } else {
        this.rentRepairDialog = true;
      }
    },
    init() {
      this.isappend = false;
      this.city = "";
      this.setTime = "";
      this.follow_name = "";
      this.repaires.next_follow_id = "";
      this.repaires.final_liable = "";
      this.append_time = "";
      this.repaires.repair_time = "";
      this.repaires.content = "";
      this.repaires.repair_money = "";
      this.repaires.repair_master = "";
      this.repaires.status = "";
      this.next_follow_id = "";
    },
    closeOrganization() {
      this.organizeType = "";
      this.organizationDialog = false;
    },
    selectMember(val) {
      this.next_follow_id = val[0].name;
      this.repaires.next_follow_id = val[0].id;
    },
    chooseStaff(id) {
      this.organizationDialog = true;
      this.organizeType = "staff";
      this.tlos = id;
    },
    emptyStaff() {
      this.follow_name = "";
      this.follow_id = "";
      this.final_liable = "";
    },
    submit() {
      //点击确定 系统自动显示跟进时间,跟进人
      let date = new Date();
      let y = date.getFullYear(); // 年
      let m = date.getMonth() + 1; // 月
      let d = date.getDate(); // 日
      let hh = date.getHours(); //小时
      let mm = date.getMinutes(); //分钟
      let ss = date.getSeconds(); // 秒
      if (m < 10) {
        m = "0" + m;
      }
      if (d < 10) {
        d = "0" + d;
      }
      if (hh < 10) {
        hh = "0" + hh;
      }
      if (mm < 10) {
        mm = "0" + mm;
      }
      if (ss < 10) {
        ss = "0" + ss;
      }
      this.setTime = y + "-" + m + "-" + d + " " + hh + ":" + mm + ":" + ss;
      this.follow_name = this._follow_name;
      
      this.$http
        .post(
          globalConfig.server + "repaire/follow/" + this._thisId,
          this.repaires
        )
        .then(res => {
          if (res.data.code === "600200") {
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
        });
      let repair_time_1 = this.$refs.repair_time.displayValue;
      this.repaires.repair_time = repair_time_1.substring(0, 10);
      let estimated_time_1 = this.$refs.estimated_time.displayValue;
      this.repaires.estimated_time = estimated_time_1.substring(0, 10);
      this.repaires.status = this.city;
      if(this.repaires.content !== ""){   
          setTimeout(() => {
          this.$emit("close");
        }, 1500);
      }
    },
    close() {
      //  点击取消  关闭窗口
      this.$emit("close");
    }
  }
};
</script>
<style lang="scss" scoped="">
#addFollowUp {
  .content,
  .content-append {
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
  .right {
    float: right;
  }
}
</style>
