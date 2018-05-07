<template>
  <div id="reimbursementDetail">
    <el-dialog :close-on-click-modal="false" title="报销单" :visible.sync="reimbursementDetailDialogVisible" width="60%">
      <div class="scroll_bar">
        <div class="title">报销单详情</div>
        <div class="describe_border">
          <el-form size="small" label-width="100px">
            <el-row>
              <el-col :span="8">
                <el-form-item label="创建时间">
                  <div class="content" v-if="reimDetail.create_time">{{reimDetail.create_time}}</div>
                  <div class="content" v-else>暂无</div>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="创建人">
                  <div class="content">
                    <span v-if="reimDetail.staffs && reimDetail.staffs.real_name">{{reimDetail.staffs.real_name}}</span>
                    <span v-else>暂无</span>
                  </div>
                </el-form-item>
              </el-col>
              <!--<el-col :span="8" style="text-align: right">-->
              <!--<el-button type="text" size="small" @click="editRepair(repairDetail.id)">-->
              <!--<i class="el-icon-edit"></i>修改维修单-->
              <!--</el-button>-->
              <!--</el-col>-->
              <el-col :span="8">
                <el-form-item label="报销单编号">
                  <div class="content">
                    <span v-if="reimDetail.reimbursement_number">{{reimDetail.reimbursement_number}}</span>
                    <span v-else>暂无</span>
                  </div>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="8">
                <el-form-item label="房屋地址">
                  <div class="content"
                       v-if="reimDetail.contract_id && reimDetail.contract_id.house && reimDetail.contract_id.house.name">
                    {{reimDetail.contract_id.house.name}}
                  </div>
                  <div class="content" v-else>暂无</div>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="报销类型">
                  <div class="content" v-if="reimDetail.type">{{reimDetail.type}}</div>
                  <div class="content" v-else>暂无</div>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="来源">
                  <div class="content" v-if="reimDetail.source">{{reimDetail.source}}</div>
                  <div class="content" v-else>暂无</div>
                </el-form-item>
              </el-col>
              <!--<el-col :span="8">-->
              <!--<el-form-item label="已完成时间">-->
              <!--<div class="content">-->
              <!--<span v-if="repairDetail.finish_time">{{repairDetail.finish_time}}</span>-->
              <!--<span v-if="!repairDetail.finish_time">暂无</span>-->
              <!--</div>-->
              <!--</el-form-item>-->
              <!--</el-col>-->
            </el-row>
            <el-row>
              <el-col :span="8">
                <el-form-item label="报销金额">
                  <div class="content">
                    <span v-if="reimDetail.amount">{{reimDetail.amount}}</span>
                    <span v-else>暂无</span>
                  </div>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="开户行">
                  <div class="content">
                    <span v-if="reimDetail.account_bank">{{repairDetail.account_bank}}</span>
                    <span v-else>暂无</span>
                  </div>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="支行">
                  <div class="content">
                    <span v-if="reimDetail.branch_bank">{{reimDetail.branch_bank}}</span>
                    <span v-else>暂无</span>
                  </div>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="8">
                <el-form-item label="开户人">
                  <div class="content">
                    <span v-if="reimDetail.account_name">{{reimDetail.account_name}}</span>
                    <span v-else>暂无</span>
                  </div>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="银行卡号">
                  <div class="content">
                    <span v-if="reimDetail.bank_num">{{reimDetail.bank_num}}</span>
                    <span v-else>暂无</span>
                  </div>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="24" v-if="reimDetail.album">
                <el-form-item label="截图">
                  <img v-if="reimDetail.album.image_pic!=[]" data-magnify
                       v-for="(val,key) in reimDetail.album.image_pic" :data-src="val[0].uri" :src="val[0].uri"
                       alt="">
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="24">
                <el-form-item label="备注">
                  <div class="content">
                    <span v-if="reimDetail.remark">{{reimDetail.remark}}</span>
                    <span v-else>暂无</span>
                  </div>
                </el-form-item>
              </el-col>
            </el-row>
            <div class="follow_result">
              <div class="title">报销结果</div>
              <!--<el-button type="text" size="small" @click="addResult(repairDetail.id)">-->
                <!--<i class="el-icon-plus"></i>新增跟进结果-->
              <!--</el-button>-->
            </div>
            <div v-if="repairDetail.follow && repairDetail.follow.length>0">
              <el-form size="small" label-width="100px" v-if="repairDetail.follow">
                <el-row v-for="item in repairDetail.follow" :key="item.id"
                        style="margin-bottom: 15px;border-bottom: 1px solid #eef3fc;">
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
                        <span v-if="item.followor">{{item.followor}}</span>
                        <span v-if="!item.followor">暂无</span>
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
              </el-form>
            </div>
            <div class="content" v-else="" style="text-align: center;line-height: 30px">
              暂无数据
            </div>
          </el-form>
        </div>
      </div>
      <!--<span slot="footer" class="dialog-footer">-->
        <!--<el-button size="small" @click="orderDetailDialogVisible = false">取 消</el-button>-->
        <!--<el-button size="small" type="primary" @click="confirmAdd">确 定</el-button>-->
      <!--</span>-->
    </el-dialog>
    <!--<EditCollectRepair :addCollectRepairDialog="collectRepairDialog" :editId="editId"-->
    <!--@close="closeModal"></EditCollectRepair>-->
    <!--<EditRentRepair :addRentRepairDialog="rentRepairDialog" :editId="editId" @close="closeModal"></EditRentRepair>-->

    <!--<AddResult :addResultDialog="addResultDialog" :repairId="addResultId"-->
    <!--@close="closeModal"></AddResult>-->
  </div>
</template>

<script>
  // import AddResult from './addResult.vue';
  // import EditCollectRepair from './addCollectRepair';
  // import EditRentRepair from './addRentRepair';

  export default {
    name: 'reimbursement-detail',
    props: ['reimbursementDetailDialog', 'reimbursementId', 'module'],
    // components: {AddResult, EditCollectRepair, EditRentRepair},
    data() {
      return {
        reimbursementDetailDialogVisible: false,
        reimDetail: {},  //报销单详情
        repairDetail: {},
        addResultId: '',
        addResultDialog: false,
        editId: '',
        collectRepairDialog: false,
        rentRepairDialog: false,
      };
    },
    watch: {
      reimbursementDetailDialog(val) {
        this.reimbursementDetailDialogVisible = val;
      },
      reimbursementDetailDialogVisible(val) {
        if (!val) {
          this.$emit('close');
        } else {
          this.getDetail();
        }
      },
    },
    mounted() {

    },
    methods: {
      getDetail() {
        this.$http.get(globalConfig.server + 'customer/reimbursement/' + this.reimbursementId).then((res) => {
          if (res.data.code === "30020") {
            this.reimDetail = res.data.data;
          } else {
            this.reimDetail = {};
            this.$notify.warning({
              title: '警告',
              message: res.data.msg,
            });
          }
        });
      },
      addResult(id) {
        this.addResultId = id;
        this.addResultDialog = true;
      },
      closeModal(val) {
        this.addResultDialog = false;
        this.collectRepairDialog = false;
        this.rentRepairDialog = false;
        if (val === 'success') {
          this.getDetail();
        }
      },
      editRepair(id) {
        this.editId = id;
        if (this.activeName === 'first') {
          this.collectRepairDialog = true;
        } else {
          this.rentRepairDialog = true;
        }
      }
    }
  };
</script>
<style lang="scss" scoped="">
  #reimbursementDetail {
    .content {
      padding: 0 10px;
      min-height: 32px;
      background: #eef3fc;
      border-radius: 4px;
      font-size: 12px;
      color: #727479;
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
  }

</style>
