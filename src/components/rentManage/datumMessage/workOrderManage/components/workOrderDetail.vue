<template>
  <div id="addFollowUp">
    <el-dialog :close-on-click-modal="false" title="工单详情" :visible.sync="orderDetailDialogVisible" width="60%">
      <div class="scroll_bar">
        <div class="title">事项详情</div>
        <div class="describe_border">
          <el-form size="small" label-width="100px">
            <el-row>
              <el-col :span="8">
                <el-form-item label="创建时间">
                  <div class="content" v-if="workOrderDetail.create_time">{{workOrderDetail.create_time}}</div>
                  <div class="content" v-if="!workOrderDetail.create_time">暂无</div>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="创建人">
                  <div class="content">
                    <span v-if="workOrderDetail.creators">{{workOrderDetail.creators.name}}</span>
                    <span v-if="!workOrderDetail.creators">暂无</span>
                  </div>
                </el-form-item>
              </el-col>
              <el-col :span="8" style="text-align: right">
                <el-button type="text" size="small" @click="editOrder(workOrderDetail.id)">
                  <i class="el-icon-edit"></i>修改跟进事项
                </el-button>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="8">
                <el-form-item label="工单编号">
                  <div class="content">
                    <span v-if="workOrderDetail.num">{{workOrderDetail.num}}</span>
                    <span v-if="!workOrderDetail.num">暂无</span>
                  </div>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="所属城市">
                  <div class="content" v-if="workOrderDetail.city_name">{{workOrderDetail.city_name}}</div>
                  <div class="content" v-if="!workOrderDetail.city_name">暂无</div>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="工单类型">
                  <div class="content">{{workOrderDetail.types}}</div>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="8">
                <el-form-item label="回复电话">
                  <div class="content">
                    <span v-if="workOrderDetail.mobile">{{workOrderDetail.mobile}}</span>
                    <span v-if="!workOrderDetail.mobile">暂无</span>
                  </div>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="跟进状态">
                  <div class="content">
                    <span v-if="workOrderDetail.follow_statuss">{{workOrderDetail.follow_statuss}}</span>
                  </div>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="跟进人">
                  <div class="content">
                    <span v-if="workOrderDetail.follows">{{workOrderDetail.follows.name}}</span>
                  </div>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="8">
                <el-form-item label="完成时间">
                  <div class="content">
                    <span v-if="workOrderDetail.finish_time">{{workOrderDetail.finish_time}}</span>
                    <span v-if="!workOrderDetail.finish_time">暂无</span>
                  </div>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="跟进时间">
                  <div class="content">
                    <span v-if="workOrderDetail.follow_time">{{workOrderDetail.follow_time}}</span>
                    <span v-if="!workOrderDetail.follow_time">暂无</span>
                  </div>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="下次跟进时间">
                  <div class="content">
                    <span v-if="workOrderDetail.follow_time">{{workOrderDetail.expected_finish_time}}</span>
                    <span v-if="!workOrderDetail.follow_time">暂无</span>
                  </div>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="24">
                <el-form-item label="跟进事项">
                  <div class="content">
                    <span v-if="workOrderDetail.matters">{{workOrderDetail.matters}}</span>
                    <span v-if="!workOrderDetail.matters">暂无</span>
                  </div>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="24" v-if="workOrderDetail.album">
                <el-form-item label="截图">
                  <img v-if="workOrderDetail.album.image_pic!=[]" data-magnify
                       v-for="(val,key) in workOrderDetail.album.image_pic" :data-src="val[0].uri" :src="val[0].uri"
                       alt="">
                </el-form-item>
              </el-col>
            </el-row>
            <div class="follow_result">
              <div class="title">跟进结果</div>
              <el-button type="text" size="small" @click="addResult(workOrderDetail.id)">
                <i class="el-icon-plus"></i>新增跟进结果
              </el-button>
            </div>
            <div v-if="workOrderDetail.remarks&&workOrderDetail.remarks.length>0">
              <el-form size="small" label-width="100px" v-if="workOrderDetail.remarks">
                <el-row v-for="item in workOrderDetail.remarks" :key="item.id" style="margin-bottom: 15px;border-bottom: 1px solid #eef3fc;">
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
        <div class="title">子工单项</div>
        <div class="describe_border" v-for="item in workOrderDetail.child">
          <el-form size="small" label-width="100px">
            <el-row>
              <el-col :span="8">
                <el-form-item label="创建时间">
                  <div class="content">
                    <span v-if="item.create_time">{{item.create_time}}</span>
                    <span v-if="!item.create_time">暂无</span>
                  </div>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="创建人">
                  <div class="content">
                    <span v-if="item.creators">{{item.creators.name}}</span>
                    <span v-if="!item.creators">暂无</span>
                  </div>
                </el-form-item>
              </el-col>
              <el-col :span="8" style="text-align: right">
                <el-button type="text" size="small" @click="editOrder(item.id)">
                  <i class="el-icon-edit"></i>修改跟进事项
                </el-button>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="8">
                <el-form-item label="工单编号">
                  <div class="content">
                    <span v-if="item.num">{{item.num}}</span>
                    <span v-if="!item.num">暂无</span>
                  </div>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="所属城市">
                  <div class="content">
                    <span v-if="item.city_name">{{item.city_name}}</span>
                    <span v-if="!item.city_name">暂无</span>
                  </div>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="工单类型">
                  <div class="content">
                    <span v-if="item.types">{{item.types}}</span>
                    <span v-if="!item.types">暂无</span>
                  </div>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="8">
                <el-form-item label="回复电话">
                  <div class="content">
                    <span v-if="item.mobile">{{item.mobile}}</span>
                    <span v-if="!item.mobile">暂无</span>
                  </div>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="跟进状态">
                  <div class="content">
                    <span v-if="item.follow_statuss">{{item.follow_statuss}}</span>
                  </div>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="跟进人">
                  <div class="content">
                    <span v-if="item.follows">{{item.follows && item.follows.name}}</span>
                    <span v-if="!item.follows">暂无</span>
                  </div>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="8">
                <el-form-item label="完成时间">
                  <div class="content">
                    <span v-if="item.finish_time">{{item.finish_time}}</span>
                    <span v-if="!item.finish_time">暂无</span>
                  </div>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="跟进时间">
                  <div class="content">
                    <span v-if="item.follow_time">{{item.follow_time}}</span>
                    <span v-if="!item.follow_time">暂无</span>
                  </div>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="下次跟进时间">
                  <div class="content">
                    <span v-if="item.expected_finish_time">{{item.expected_finish_time}}</span>
                    <span v-if="!item.expected_finish_time">暂无</span>
                  </div>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="24">
                <el-form-item label="跟进事项">
                  <div class="content">
                    <span v-if="item.matters">{{item.matters}}</span>
                    <span v-if="!item.matters">暂无</span>
                  </div>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="24" v-if="item.album">
                <el-form-item label="截图">
                  <img v-if="item.album.image_pic!=[]" data-magnify
                       v-for="(val,key) in item.album.image_pic" :data-src="val[0].uri" :src="val[0].uri" alt="">
                </el-form-item>
              </el-col>
            </el-row>
            <div class="follow_result">
              <div class="title">跟进结果</div>
              <el-button type="text" size="small" @click="addResult(item.id)">
                <i class="el-icon-plus"></i>新增跟进结果
              </el-button>
            </div>
            <div v-if="item.remarks&&item.remarks.length>0">
              <el-form size="small" label-width="100px" v-if="item.remarks">
                <el-row v-for="item in item.remarks" :key="item.id" style="margin-bottom: 15px;border-bottom: 1px solid #eef3fc;">
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
    <EditWork :editWorkDialog="editWorkDialog" :activeId="editId" :startEdit="startEdit" @close="closeModal"></EditWork>

    <AddResult :addResultDialog="addResultDialog" :startAddResult="startAddResult" :activeId="addResultId"
               @close="closeModal"></AddResult>
  </div>
</template>

<script>
  import AddResult from './addResult.vue'
  import EditWork from './editWorkOrder.vue'

  export default {
    name: 'addFollowUp',
    props: ['orderDetailDialog', 'activeId', 'startDetail'],
    components: {AddResult, EditWork},
    data() {
      return {
        orderDetailDialogVisible: false,
        workOrderDetail: {},
        addResultId: '',
        addResultDialog: false,
        startAddResult: false,
        editWorkDialog: false,
        startEdit: false,
        editId: '',
      };
    },
    watch: {
      orderDetailDialog(val) {
        this.orderDetailDialogVisible = val
      },
      orderDetailDialogVisible(val) {
        if (!val) {
          this.$emit('close');
        } else {
          this.isClear = false
        }
      },
      startDetail(val) {
        if (val) {
          this.getDetail();
        }
      }
    },
    mounted() {

    },
    methods: {
      getDetail() {
        this.$http.get(globalConfig.server + 'customer/work_order/' + this.activeId).then((res) => {
          if (res.data.code === "10020") {
            this.workOrderDetail = res.data.data;
          }
        });
      },
      addResult(id) {
        this.addResultId = id;
        this.addResultDialog = true;
        this.startAddResult = true;

      },
      closeModal(val) {
        this.addResultDialog = false;
        this.editWorkDialog = false;
        this.startEdit = false;
        this.startAddResult = false;
        if (val === 'success') {
          this.getDetail();
        }
      },
      editOrder(id) {
        this.editId = id;
        this.editWorkDialog = true;
        this.startEdit = true;
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
