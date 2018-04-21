<template>
  <div id="addFollowUp">
    <el-dialog :close-on-click-modal="false" title="维修记录" :visible.sync="repairDetailDialogVisible" width="60%">
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
                <el-button type="text" size="small" @click="editRepair(repairDetail.id)">
                  <i class="el-icon-edit"></i>修改维修单
                </el-button>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="8">
                <el-form-item label="维修单编号">
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
                <el-form-item label="客户性别">
                  <div class="content">
                    <span v-if="repairDetail.sexuality">{{repairDetail.sexuality}}</span>
                    <span v-if="!repairDetail.sexuality">暂无</span>
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
            </el-row>
            <el-row>
              <el-col :span="8">
                <el-form-item label="跟进人">
                  <div class="content">
                    <span v-if="repairDetail.followor">{{repairDetail.followor}}</span>
                    <span v-if="!repairDetail.followor">暂无</span>
                  </div>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="下次跟进时间">
                  <div class="content">
                    <span v-if="repairDetail.estimated_time">{{repairDetail.estimated_time}}</span>
                    <span v-if="!repairDetail.estimated_time">暂无</span>
                  </div>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="初步认责人">
                  <div class="content">
                    <span v-if="repairDetail.liable">{{repairDetail.liable}}</span>
                    <span v-if="!repairDetail.liable">暂无</span>
                  </div>
                </el-form-item>
              </el-col>
            </el-row>

            <el-row>
              <el-col :span="8">
                <el-form-item label="维修时间">
                  <div class="content">
                    <span v-if="repairDetail.repair_time">{{repairDetail.repair_time}}</span>
                    <span v-if="!repairDetail.repair_time">暂无</span>
                  </div>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="维修金额">
                  <div class="content">
                    <span v-if="repairDetail.repair_money">{{repairDetail.repair_money}}</span>
                    <span v-if="!repairDetail.repair_money">暂无</span>
                  </div>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="维修师傅">
                  <div class="content">
                    <span v-if="repairDetail.repair_master">{{repairDetail.repair_master}}</span>
                    <span v-if="!repairDetail.repair_master">暂无</span>
                  </div>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="8">
                <el-form-item label="维修状态">
                  <div class="content">
                    <span v-if="repairDetail.statu">{{repairDetail.statu}}</span>
                    <span v-if="!repairDetail.statu">暂无</span>
                  </div>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="实际维修金额">
                  <div class="content">
                    <span v-if="repairDetail.real_money">{{repairDetail.real_money}}</span>
                    <span v-if="!repairDetail.real_money">暂无</span>
                  </div>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="最终认责人">
                  <div class="content">
                    <span v-if="repairDetail.final_liabler">{{repairDetail.final_liabler}}</span>
                    <span v-if="!repairDetail.final_liabler">暂无</span>
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
  </div>
</template>

<script>
  import AddResult from './addResult.vue';
  import EditCollectRepair from './addCollectRepair';
  import EditRentRepair from './addRentRepair';

  export default {
    name: 'repair-detail',
    props: ['repairDetailDialog', 'repairId', 'activeName'],
    components: {AddResult, EditCollectRepair, EditRentRepair},
    data() {
      return {
        repairDetailDialogVisible: false,
        repairDetail: {},
        addResultId: '',
        addResultDialog: false,
        editId: '',
        collectRepairDialog: false,
        rentRepairDialog: false,
      };
    },
    watch: {
      repairDetailDialog(val) {
        this.repairDetailDialogVisible = val;
      },
      repairDetailDialogVisible(val) {
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
        this.$http.get(globalConfig.server + 'repaire/info/' + this.repairId).then((res) => {
          if (res.data.code === "600200") {
            this.repairDetail = res.data.data;
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
  #addFollowUp {
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
