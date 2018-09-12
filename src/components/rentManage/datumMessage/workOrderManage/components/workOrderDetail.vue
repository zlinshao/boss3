<template>
  <div id="addFollowUp">
    <el-dialog :close-on-click-modal="false" title="工单详情" :visible.sync="orderDetailModule" width="60%">
      <div class="scroll_bar">
        <div class="workOrderDetail">
          <div class="title">事项详情</div>
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
              <el-col :span="8">
                <el-form-item label="创建时间">
                  <div class="content">
                    <span v-if="workOrderDetail.create_time">{{workOrderDetail.create_time}}</span>
                    <span v-if="!workOrderDetail.create_time">暂无</span>
                  </div>
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
              <el-col :span="8">
                <el-form-item label="房屋地址">
                  <div class="content" v-if="house_name">{{house_name}}</div>
                  <div class="content" v-if="!house_name">暂无</div>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="8">
                <el-form-item label="所属城市">
                  <div class="content" v-if="workOrderDetail.city_name">{{workOrderDetail.city_name}}</div>
                  <div class="content" v-if="!workOrderDetail.city_name">暂无</div>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="工单编号">
                  <div class="content">
                    <span v-if="workOrderDetail.num">{{workOrderDetail.num}}</span>
                    <span v-if="!workOrderDetail.num">暂无</span>
                  </div>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="下次跟进人">
                  <div class="content">
                    <span v-if="workOrderDetail.follows">{{workOrderDetail.follows.name}}</span>
                    <span v-if="!workOrderDetail.follows">暂无</span>
                  </div>
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
                <el-form-item label="工单类型">
                  <div class="content">{{workOrderDetail.types}}</div>
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
            </el-row>
            <el-row>
              <el-col :span="8">
                <el-form-item label="紧急程度">
                  <div class="content">
                    <span v-if="workOrderDetail.emergency === 1">一般</span>
                    <span v-if="workOrderDetail.emergency === 2">紧急</span>
                  </div>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="完成时间">
                  <div class="content">
                    <span v-if="workOrderDetail.finish_time">{{workOrderDetail.finish_time}}</span>
                    <span v-if="!workOrderDetail.finish_time">暂无</span>
                  </div>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="24">
                <el-form-item label="工单内容">
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
                  <img v-if="workOrderDetail.album.image_pic !== []" data-magnify
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
            <div class="addWorkOrder" v-if="showAddWork">
              <el-row>
                <el-col :span="12">
                  <el-form-item label="跟进状态">
                    <el-select clearable v-model="params.follow_status" placeholder="选择跟进状态" value="">
                      <el-option v-for="item in workFollow" :label="item.dictionary_name" :value="item.id"
                                 :key="item.id"></el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="下次跟进时间">
                    <el-date-picker type="datetime" placeholder="选择日期时间"
                                    value-format="yyyy-MM-dd HH:mm:ss"
                                    v-model="params.next_follow_time"></el-date-picker>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="12">
                  <el-form-item label="下次跟进人">
                    <el-input v-model="params.next_follow_name" @focus="openOrganizeModal" placeholder="请选择">
                      <el-button slot="append" type="primary" @click="emptyFollowPeople">清空</el-button>
                    </el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="24">
                  <el-form-item label="跟进结果" required="">
                    <el-input type="textarea" v-model="params.content"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="24">
                  <el-form-item label="上传照片">
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
            <div v-if="workOrderDetail.remarks && workOrderDetail.remarks.length > 0">
              <el-form size="small" label-width="100px" v-if="workOrderDetail.remarks">
                <el-row v-for="(item,index) in workOrderDetail.remarks" :key="item.id"
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
                        <span v-if="item.follow_statuss">{{item.follow_statuss}}</span>
                        <span v-if="!item.follow_statuss">暂无</span>
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
                      <img v-if="item.img.image_pic !== []" data-magnify
                           v-for="(val,key) in item.img.image_pic" :data-src="val[0].uri" :src="val[0].uri" alt="">
                    </el-form-item>
                  </el-col>
                </el-row>
              </el-form>
            </div>
            <div class="content" v-else style="text-align: center;line-height: 30px">
              暂无数据
            </div>
          </el-form>
        </div>
      </div>
    </el-dialog>
    <EditWork :editWorkDialog="editWorkDialog" :editWord="workOrderDetail" @close="closeModal"></EditWork>

    <Organization :organizationDialog="organizationDialog" :length="length" :type="type"
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
        isClear: false,
        showAddWork: false,
        params: {
          id: '',
          follow_status: '',//跟进状态
          next_follow_time: '',//下次跟进时间
          next_follow_name: '',//下次跟进人
          next_follow_id: '',//下次跟进人
          content: '',//跟进结果
          album: '',//图片
        },
        organizationDialog: false,
        length: 0,
        type: '',
        workOrderLoading: false,
        house_name: '',
      };
    },
    watch: {
      orderDetailDialog(val) {
        this.orderDetailModule = val;
      },
      orderDetailModule(val) {
        if (!val) {
          this.init();
          this.workOrderDetail = {};
          this.$emit('close');
        } else {
          this.isClear = false;
          this.getDetail();
        }
      },
      wordData(val) {
        this.house_name = val.name;
      },
    },
    mounted() {
      // 跟进状态
      this.dictionary(335, 1).then((res) => {
        this.workFollow = res.data;
      })
    },
    methods: {
      // 关闭组织架构
      closeOrganize() {
        this.organizationDialog = false;
      },
      //打开组织架构
      openOrganizeModal() {
        this.organizationDialog = true;
        this.type = 'staff';
        this.length = 1;
      },
      // 选择回调
      selectMember(val) {
        this.type = '';
        this.length = '';
        this.params.next_follow_id = val[0].id;
        this.params.next_follow_name = val[0].name;
      },
      // 清空组织架构
      emptyFollowPeople() {
        this.params.next_follow_id = '';
        this.params.next_follow_name = '';
      },
      // 新增跟进结果
      confirmAdd() {
        this.params.module = this.wordData.module;
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
      init() {
        this.showAddWork = false;
        this.params = {
          id: '',
          follow_status: '',//跟进状态
          next_follow_time: '',//下次跟进时间
          next_follow_name: '',//下次跟进人
          content: '',//跟进结果
          album: '',//图片
        }
      },
      getDetail() {
        this.workOrderLoading = true;
        this.$http.get(globalConfig.server + 'customer/work_order/' + this.wordData.id).then((res) => {
          this.workOrderLoading = false;
          if (res.data.code === "10020") {
            this.workOrderDetail = res.data.data;
          }
        });
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
    }
  };
</script>
<style lang="scss" scoped="">
  #addFollowUp {
    .workOrderDetail {
      display: flex;
      display: -webkit-flex;
      justify-content: space-between;
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
    .follow_result {
      display: flex;
      justify-content: space-between;
    }
    .addWorkOrder {
      margin-bottom: 15px;
      padding-bottom: 15px;
      border-bottom: 1px solid rgb(238, 243, 252);
    }
    .remarks {
      margin-bottom: 15px;
      border-bottom: 1px solid #eef3fc;
    }
  }
</style>
