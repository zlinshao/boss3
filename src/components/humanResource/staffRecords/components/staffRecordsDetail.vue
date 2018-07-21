<template>
  <div id="staffRecordsDetail">
    <el-dialog :close-on-click-modal="false" title="员工档案" :visible.sync="staffRecordsDetailDialogVisible" width="50%">
      <div class="scroll_bar">
        <!--<div class="title">基本信息</div>-->
        <!--<div class="describe_border">-->
        <el-form size="small" label-width="100px">
          <el-row>
            <el-col :span="12">
              <el-form-item label="员工姓名">
                <div class="content">
                  <!--<span v-if="detail && detail.create_time">{{detail.create_time}}</span>-->
                  <!--<span v-else>暂无</span>-->
                </div>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="入职时间">
                <div class="content">
                  <!--<span v-if="workOrderDetail.creators">{{workOrderDetail.creators.name}}</span>-->
                  <!--<span v-if="!workOrderDetail.creators">暂无</span>-->
                </div>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="部门">
                <div class="content">
                  <!--<span v-if="workOrderDetail.num">{{workOrderDetail.num}}</span>-->
                  <!--<span v-if="!workOrderDetail.num">暂无</span>-->
                </div>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="岗位">
                <div class="content">
                  <!--<span v-if="detail && detail.create_time">{{detail.create_time}}</span>-->
                  <!--<span v-else>暂无</span>-->
                </div>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
        <!--</div>-->
        <!--<div class="title">跟进记录</div>-->
        <div class="" v-for="item in detail">
          <el-row>
            <el-col :span="3">
              <div style="text-align: center;">
                <span style="display: inline-block;width: 80%;margin-top: 8px;">{{item.add_time}}</span>
                <br/>
                <span>{{item.add_user}}</span>
              </div>
            </el-col>
            <el-col :span="18">
              <div class="circle praises"></div>
              <div style="border-left: 1px solid #c0c4cc;padding-left: 20px;padding-top: 8px;">
                <div>{{item.remark}}</div>
                <div><img src="../../../../assets/images/news.png" alt=""></div>
              </div>
            </el-col>
            <el-col :span="2" style="text-align: right;cursor: pointer;">
              <span @click="editRecord(item)">
                <i class="el-icon-edit"></i>编辑
              </span>
            </el-col>
          </el-row>
        </div>
      </div>
    </el-dialog>
    <EditStaffRecord :editStaffRecordDialog="editStaffRecordDialog" :record="record"
                     @close="closeModal"></EditStaffRecord>
  </div>
</template>

<script>
  import EditStaffRecord from './editStaffRecord.vue';

  export default {
    name: 'staffRecordsDetail',
    props: ['staffRecordsDetailDialog', 'detailId'],
    components: {EditStaffRecord},
    data() {
      return {
        staffRecordsDetailDialogVisible: false,
        editStaffRecordDialog: false,
        detail: {},
        record: {},
      };
    },
    watch: {
      staffRecordsDetailDialog(val) {
        this.staffRecordsDetailDialogVisible = val;
      },
      staffRecordsDetailDialogVisible(val) {
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
      editRecord(val) {
        this.record = val;
        this.editStaffRecordDialog = true;
      },
      closeModal(val) {
        this.record = {};
        this.editStaffRecordDialog = false;
        if (val == 'success') {
          this.getDetail();
        }
      },
      getDetail() {
        this.$http.get(globalConfig.server + 'credit/manage/employeedetail/' + this.detailId).then((res) => {
          if (res.data.code === "100100") {
            this.detail = res.data.data;
          } else {
            this.detail = {};
            this.$notify.warning({
              title: '警告',
              message: res.data.msg,
            });
          }
        });
      },
    }
  };
</script>
<style lang="scss" scoped="">
  #staffRecordsDetail {
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
    .circle {
      width: 18px;
      height: 18px;
      border-radius: 50%;
      display: inline-block;
      float: left;
      margin-left: -9px;
      margin-top: 10px;
    }
    .praises {
      background: #58d788;
    }
    .criticisms {
      background: #ff4545;
    }
    .doubts {
      background: #FF9900;
    }
    .others {
      background: #409EFF;
    }

  }

</style>
