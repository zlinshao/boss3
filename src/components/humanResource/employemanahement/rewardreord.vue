<template>
    <div class="rewardreord">
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
                <el-button type="text" size="mini" @click="addEditReward(1)">新增记录</el-button>
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
        <span slot="footer" class="dialog-footer">
          <el-button type="primary" @click="RewardDialogVisible = false" size="mini">确 定</el-button>
        </span>
      </el-dialog>
      <!-- 新增记录 -->
      <!-- <el-dialog title="提示" :visible.sync="addRecordDiag" width="30%">
        <el-form ref="form" :model="addRecordForm" label-width="80px">
          <el-form-item label="奖励类型">
            <el-select v-model="addRecordForm.recordType" placeholder="请选择奖励类型" size="mini">
              <el-option v-for="(item, index) in recordOptions" :key="index" :label="item.label" :value="item.value"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="描述">
            <el-input type="textarea" :rows="2" placeholder="请输入内容" v-model="addRecordForm.textarea"></el-input>
          </el-form-item>
          <el-form-item label="图片">
             <UpLoad :ID="'comment_pic'" :isClear="isClear" @getImg="getImg"></UpLoad>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="addRecordDiag = false" size="mini">取 消</el-button>
          <el-button type="primary" @click="addRecordDiag = false" size="mini">确 定</el-button>
        </span>
      </el-dialog> -->
      <el-dialog :close-on-click-modal="false" title="修改记录" :visible.sync="editStaffRecordDialogVisible" width="30%">
        <div>
          <el-form size="mini" onsubmit="return false;" :model="params" label-width="100px">
            <el-row>
              <el-col :span="10">
                <el-form-item label="类型选择" required>
                  <el-select v-model="params.type" placeholder="请选择" clearable>
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
                  <el-input v-model="params.remark" type="textarea" rows="2" placeholder="请填写描述"></el-input>
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
          <el-button size="small" type="primary" @click.native="confirmEdit" :disabled="disabledBtn">确 定</el-button>
        </span>
      </el-dialog>
      <!-- 删除记录 -->
      <el-dialog title="删除记录" :visible.sync="deletedDialogVisible" width="30%">
        <span>此操作将永远删除该记录，是否继续？</span>
        <span slot="footer" class="dialog-footer">
          <el-button @click="deletedDialogVisible = false" size="mini">取 消</el-button>
          <el-button type="primary" @click="deletedDialogVisible = false" size="mini">确 定</el-button>
        </span>
      </el-dialog>
    </div>
</template>

<script>
import UpLoad from "../../common/UPLOAD.vue"
export default {
  props: ["ids", "lookRewardLog", "names", "orgs", "roles", "times"],
  components: {UpLoad},
  data() {
    return {
      //  isUpload: false,
      isClear: false,
      RewardDialogVisible: false,
      editStaffRecordDialogVisible: false,
      deletedDialogVisible: false,
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
      addRecordForm: {
        recordType: "",
        textarea: "",

      },
      recordOptions: [
        {value: "表扬", label: "表扬"},
        {value: "批评", label: "批评"},
        {value: "其他", label: "其他"},
      ],
      rewardreCotent: [],
      detail: {},
      params: {
        type: '',
        detail_id: '',
        remark: '',
        images: []
      },
      typeCategory: [
        {id: 1, name: '表扬'},
        {id: 2, name: '批评'},
        {id: 3, name: '疑惑'},
        {id: 4, name: '其他'},
      ],
      editImage: {},
    }
  },
  watch: {
    lookRewardLog(val) {
      this.RewardDialogVisible = val;
    },
    ids(val) {
      console.log(val);
      this.uesr_id = val;
      this.gerRewardReord(val)
    },
    names(val) {
      this.form.name = val;
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
        this.isClear = !this.isClear;
      }
    }
  },
  methods: {
    // 获取详情
    gerRewardReord(val) {
       this.loading = true;
      this.$http.post(globalConfig.server + 'credit/manage/employeedetail', {user_id: val}).then(res => {
      // this.$http.post(globalConfig.server + 'credit/manage/employeedetail?user_id=205').then(res => {   // 测试数据
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
      })
    },
    // 上传图片
    getImg(val) {
      this.params.images = val[1];
    },
    addEditReward(val) {
      this.addRecordDiag = true;
      if (val == 1) {
        
      } else if (val == 2) {
        this.editRewardReord();
      }
    },
    // 新增奖励记录
    addRewardReord() {
      this.$http.post(globalConfig.server + 'credit/manage/addemployee', this.params).then((res) => {
        if (res.data.code === '10000') {
          // this.$emit('close', 'success');
          this.addStaffDialogVisible = false;
          this.$notify.success({
            title: '成功',
            message: res.data.msg,
          });
        } else {
          this.disabledBtn = false;
          this.$notify.warning({
            title: '警告',
            message: res.data.msg,
          });
        }
      })
    },
    // 编辑奖励记录
    editRewardReord(val) {
      this.$http.post(globalConfig.server + 'credit/manage/getonerecorddetail', {uesr_id: this.uesr_id}).then(res => {
        if (res.data.code === '10000') {
          this.params.type = res.data.data.type;
          this.params.remark = res.data.data.remark;
          if (res.data.data && res.data.data.images.length > 0) {
            let data = {};
            res.data.data.images.forEach((item) => {
              this.params.images.push(item.id);
              data[item.id] = item.url;
            });
            this.editImage = data;
          }
        } else {
          this.$notify.warning({
            title: '警告',
            message: res.data.msg,
          });
        }
      })
    }
  }
}
</script>

<style lang="scss">

</style>
