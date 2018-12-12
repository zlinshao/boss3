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
                <el-button type="text" size="mini" @click="addRecordDiag = true">新增记录</el-button>
              </el-col>
            </el-row>
          </el-form>
        </div>
        <div class="content">
          <div class="rewardreShowList">
            <p>2018.11.11</p>
            <div>
              <el-col :span="8">
                <span>模糊胡</span>
              </el-col>  
              <el-col :span="8">
                <div>asdasdasdadadadadassadassaadfcsdfsa</div>
              </el-col>
              <el-col :span="8">
                <el-button type="text" size="mini">编辑</el-button>
                <el-button type="text" size="mini">删除</el-button>
              </el-col>
            </div>
          </div>
        </div>
        <span slot="footer" class="dialog-footer">
          <el-button type="primary" @click="RewardDialogVisible = false" size="mini">确 定</el-button>
        </span>
      </el-dialog>
      <!-- 新增记录 -->
      <el-dialog title="提示" :visible.sync="addRecordDiag" width="30%">
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
      addRecordDiag: false,
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
      ]
    }
  },
  watch: {
    lookRewardLog(val) {
      this.RewardDialogVisible = val;
    },
    ids(val) {
      console.log(val);
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
    // 上传图片
    getImg(val) {
      console.log(val)
        // if(val[0] === 'comment_pic'){
        //   this.commentParams.image_pic = val[1];
        // }else if(val[0] === 'comment_video'){
        //   this.commentParams.video_file = val[1];
        // }
        // this.isUpload = val[2];
      },
  }
}
</script>

<style lang="scss">

</style>
