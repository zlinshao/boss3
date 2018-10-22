<template>
  <div id="staffRecordsDetail">
    <el-dialog :close-on-click-modal="false" title="员工档案" :visible.sync="staffRecordsDetailDialogVisible" width="50%">
      <div class="scroll_bar">
        <!--<div class="title">基本信息</div>-->
        <!--<div class="describe_border">-->
        <el-form size="small" label-width="100px"
                 v-loading="loading"
                 element-loading-text="拼命加载中"
                 element-loading-spinner="el-icon-loading"
                 element-loading-background="rgba(255, 255, 255, 0.7)">
          <el-row>
            <el-col :span="12">
              <el-form-item label="员工姓名">
                <div class="content">
                  <span v-if="detail.name">{{detail.name}}</span>
                  <span v-else>暂无</span>
                </div>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="入职时间">
                <div class="content">
                  <span v-if="detail.start_time">{{detail.start_time}}</span>
                  <span v-else>暂无</span>
                </div>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="部门">
                <div class="content">
                  <span v-if="detail.org">{{detail.org}}</span>
                  <span v-else>暂无</span>
                </div>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="岗位">
                <div class="content">
                  <span v-if="detail.department">{{detail.department}}</span>
                  <span v-else>暂无</span>
                </div>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
        <!--</div>-->
        <!--<div class="title">跟进记录</div>-->
        <div class="" v-for="item in detail.data">
          <el-row>
            <el-col :span="3">
              <div style="text-align: center;">
                <span style="display: inline-block;width: 80%;margin-top: 8px;">{{item.add_time}}</span>
                <br/>
                <span>{{item.add_user}}</span>
              </div>
            </el-col>
            <el-col :span="18">
              <div class="circle"
                   :class="{'praises': item.type==1, 'criticisms':item.type==2, 'doubts':item.type==3, 'others':item.type==4}"></div>
              <div style="border-left: 1px solid #c0c4cc;padding-left: 20px;padding-top: 8px;min-height: 50px;">
                <div>{{item.remark}}</div>
                <div style="margin-top: 10px;" v-if="item.images && item.images.length>0">
                  <img v-for="img in item.images" :src="img.url" :key="img.id" data-magnify="" :data-src="img.url">
                </div>
              </div>
            </el-col>
            <el-col :span="3" style="text-align: right;cursor: pointer;padding-top: 8px;">
              <span @click="editRecord(item)" style="color: #409eff;">
                <i class="el-icon-edit"></i>编辑
              </span>
              <span @click="removeRecord(item.detail_id)" style="color: #409eff;margin-left: 6px;">
                <i class="el-icon-close"></i>删除
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
    props: ['staffRecordsDetailDialog', 'record_id'],
    components: {EditStaffRecord},
    data() {
      return {
        staffRecordsDetailDialogVisible: false,
        editStaffRecordDialog: false,
        detail: {},
        record: {},
        loading: false,
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
      // 删除
      removeRecord(id) {
        this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$http.post(globalConfig.server + 'credit/manage/record-delete', {detail_id: id}).then((res) => {
            if (res.data.code === '100100') {
              this.$message({
                type: 'success',
                message: '删除成功!'
              });
              this.getDetail();
            }
          });
        }).catch(() => {
        });
      },
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
        this.loading = true;
        this.$http.post(globalConfig.server + 'credit/manage/employeedetail', {record_id: this.record_id}).then((res) => {
          this.loading = false;
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
