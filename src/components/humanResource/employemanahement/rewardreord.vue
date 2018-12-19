<template>
    <div id="rewardreord">
      <el-dialog title="提示" :visible.sync="RewardDialogVisible" width="60%">
        <div class="top">
          <el-form ref="form" :model="form" label-width="80px">
            <el-row>
              <el-col :span="12">
                <el-form-item label="姓名">
                  <el-input v-model="form.name" :disabled="true" size="mini"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="入职时间">
                  <el-input v-model="form.time" :disabled="true" size="mini"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <el-form-item label="部门">
                  <el-input v-model="form.department" :disabled="true" size="mini"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="职位">
                  <el-input v-model="form.position" :disabled="true" size="mini"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </div>
        <div class="rewardreList">
          <el-form ref="rewardreForm" :model="form" label-width="80px">
            <el-row>
              <el-col :span="5">
                <el-form-item label="表扬数">
                  <el-input v-model="rewardreForm.praiseNumber" :disabled="true" size="mini"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="5">
                <el-form-item label="批评数">
                  <el-input v-model="rewardreForm.criticismNumber" :disabled="true" size="mini"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="5">
                <el-form-item label="疑惑数">
                  <el-input v-model="rewardreForm.doubtNumber" :disabled="true" size="mini"></el-input>
                </el-form-item>
              </el-col>
               <el-col :span="5">
                <el-form-item label="其他">
                  <el-input v-model="rewardreForm.otherNumber" :disabled="true" size="mini"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="4" style="text-align: center; margin-top: 10px;">
                <el-button type="text" size="mini" @click="addEditReward('1')">新增记录</el-button>
              </el-col>
            </el-row>
          </el-form>
        </div>
        <div class="content">
          <div class="" v-for="(item, index) in detail.data" :key="index">
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
                  <div style="margin-top: 10px;" v-if="item.images && item.images.length>0" class="lookImg">
                    <img v-for="img in item.images" :src="img.url" :key="img.id" data-magnify="" :data-src="img.url">
                  </div>
                </div>
              </el-col>
              <el-col :span="3" style="text-align: right;cursor: pointer;padding-top: 8px;">
                <span @click="addEditReward('2', item)" style="color: #409eff;">
                  <i class="el-icon-edit"></i>编辑
                </span>
                <span @click="removeRecord(item.detail_id)" style="color: #409eff;margin-left: 6px;">
                  <i class="el-icon-close"></i>删除
                </span>
              </el-col>
            </el-row>
          </div>
        </div>
        <span slot="footer" class="dialog-footer">
          <el-button type="primary" @click="RewardDialogVisible = false" size="mini">确 定</el-button>
        </span>
      </el-dialog>
      <!-- 新增记录 -->
      <el-dialog :close-on-click-modal="false" :title="titleName" :visible.sync="editStaffRecordDialogVisible" width="30%">
        <div>
          <el-form size="mini" onsubmit="return false;" :model="params[0]" label-width="100px">
            <el-row>
              <el-col :span="10">
                <el-form-item label="类型选择" required>
                  <el-select v-model="params[0].remarks[0].type" placeholder="请选择" clearable>
                    <el-option v-for="val in typeCategory" :key="val.id" :value="val.id" :label="val.name">
                      {{val.name}}
                    </el-option>
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="16">
                <el-form-item label="描述" required>
                  <el-input v-model="params[0].remarks[0].remark" type="textarea" rows="2" placeholder="请填写描述"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="24">
                <el-form-item label="照片">
                  <UPLOAD ID="single_records" :isClear="isClear" :editImage="editImage" @getImg="getImg"></UPLOAD>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </div>
        <span slot="footer" class="dialog-footer">
          <el-button size="small" @click="editStaffRecordDialogVisible=false">取 消</el-button>
          <el-button size="small" type="primary" @click.native="confirmEdit" >确 定</el-button>
        </span>
      </el-dialog>
    </div>
</template>

<script>
import UPLOAD from "../../common/UPLOAD.vue"
export default {
  props: ["ids", "lookRewardLog", "names", "orgs", "roles", "times"],
  components: {UPLOAD},
  data() {
    return {
      //  isUpload: false,
      isClear: false,
      RewardDialogVisible: false,
      editStaffRecordDialogVisible: false,
      uesr_id: "",
      form: {
        name: "",
        time: "",
        department: "",
        position: "",
      },
      rewardreForm: {
        praiseNumber: "",
        criticismNumber: "",
        doubtNumber: "",
        otherNumber: ""
      },
      rewardreCotent: [],
      detail: {},
      params: [{
        detail_id: "",
        uid: '',
        name: '',
        remarks: [
          {
            type: '',
            remark: '',
            images: [],
          }
        ],
      }],
      editParams: {
        detail_id: "",
        remark: "",
        type: "",
        images: []
      },
      typeCategory: [
        {id: 1, name: '表扬'},
        {id: 2, name: '批评'},
        {id: 3, name: '疑惑'},
        {id: 4, name: '其他'},
      ],
      editImage: {},
      titleName: "",
      isAddOrEdit: "1",
      saveName: "",
      saveUid: "",
    }
  },
  watch: {
    lookRewardLog(val) {
      this.RewardDialogVisible = val;
    },
    ids(val) {
      this.saveUid = val;
      this.gerRewardReord(val)
    },
    names(val) {
      this.form.name = val;
      this.saveName = val;
    },
     orgs(val) {
       this.form.department = val;
    },
     roles(val) {
       this.form.position = val;
    },
     times(val) {
       this.form.time = val;
    },
    RewardDialogVisible(val) {
      if(!val) {
        this.$emit("close");
        this.form = {};
        this.isClear = true;
      }
    },
    editStaffRecordDialogVisible(val) {
      if(!val) {
        // this.initParams();
        // this.initEditParams();
        this.isClear = true;
      }
    }
  },
  methods: {
    // 清空数据
    initParams() {
      this.params = [{
        detail_id: "",
        uid: '',
        name: '',
        remarks: [
          {
            type: '',
            remark: '',
            images: [],
          }
        ],
      }]
    },
    initEditParams() {
      console.log(1)
      this.editParams = {
        detail_id: "",
        remark: "",
        type: "",
        images: []
      }
    },
     // 上传图片
    getImg(val) {
      this.params[0].remarks[0].images = val[1];
      this.editParams.images = val[1];
    },
    // 获取详情
    gerRewardReord(val) {
       this.loading = true;
       this.initParams();
       this.initEditParams();
      this.$http.post(globalConfig.server + 'credit/manage/employeedetail', {user_id: val}).then(res => {
        this.loading = false;
        if (res.data.code === "100100") {
          this.detail = res.data.data;
          this.rewardreForm.praiseNumber = res.data.data.praises;
          this.rewardreForm.criticismNumber = res.data.data.criticisms;
          this.rewardreForm.doubtNumber = res.data.data.doubts;
          this.rewardreForm.otherNumber = res.data.data.others;
        } else {
          this.detail = {};
          this.$notify.warning({
            title: '警告',
            message: res.data.msg,
          });
        }
      })
    },
    addEditReward(val, item) {
      this.initParams();
      this.initEditParams();
      this.editStaffRecordDialogVisible = true;
      if (val == '1') {
        this.titleName = "新增记录";
        this.isAddOrEdit = "1";
      } else if (val == '2') {
        this.titleName = "编辑记录";
        this.isAddOrEdit = "2";
        this.editRecord(item);
      }
    },
    // 新增奖励记录
    confirmEdit() {
      if(this.isAddOrEdit == "1") {
        this.params[0].name = this.saveName;
        this.params[0].uid = this.saveUid;
        this.$http.post(globalConfig.server + 'credit/manage/addemployee', this.params).then((res) => {
          if (res.data.code === '10000') {
            this.$notify.success({
              title: '成功',
              message: res.data.msg,
            });
            this.editStaffRecordDialogVisible = false;
            this.isClear = true;
            this.gerRewardReord(this.saveUid);
            this.initParams();
          } else {
            this.$notify.warning({
              title: '警告',
              message: res.data.msg,
            });
          }
        })
      } else if(this.isAddOrEdit == "2") {
        this.editParams.remark = this.params[0].remarks[0].remark;
        this.$http.post(globalConfig.server + 'credit/manage/employeeedit', this.editParams).then(res => {
          if (res.data.code === '100100') {
            this.$notify.success({
              title: '成功',
              message: res.data.msg,
            });
            this.editStaffRecordDialogVisible = false;
            this.isClear = true;
            this.gerRewardReord(this.saveUid);
            this.initParams();
          } else {
            this.$notify.warning({
              title: '警告',
              message: res.data.msg,
            });
          }
        })
      }
    },
    // 获取编辑奖励记录
    editRecord(val) {
      this.initEditParams()
      this.initParams();
      this.params[0].detail_id = val.detail_id;
      this.editParams.detail_id = val.detail_id;
      this.editParams.type = val.type;
      this.$http.post(globalConfig.server + 'credit/manage/getonerecorddetail', {detail_id:  val.detail_id}).then(res => {
        if (res.data.code === '10000') {
          if (res.data.data && res.data.data.images.length > 0) {
            this.params[0].remarks[0].type = res.data.data.type;
            this.params[0].remarks[0].remark = res.data.data.remark;
            let data = {};
            res.data.data.images.forEach((item) => {
              this.params[0].remarks[0].images.push(item.id);
              data[item.id] = item.url;
            });
            this.editImage = data;
            console.log(this.editImage)
          }
        } else {
          this.$notify.warning({
            title: '警告',
            message: res.data.msg,
          });
        }
      })
    },
    // 删除奖励
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
            this.gerRewardReord(this.saveUid);
          }
        });
      }).catch(() => {
      });
    },
  }
}
</script>

<style lang="scss">
  #rewardreord {
    .lookImg {
      img {
        width: 80px;
        height: 80px;
        border-radius: 6px;
        margin: 0 10px 10px 0;
      }
    }
  }
</style>
