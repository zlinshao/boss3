<template>
  <div id="increaseGoods">
    <el-dialog title="公告发布" :visible.sync="increaseGoodsDialogVisible" width="60%">
      <div>
        <el-form :model="form" label-width="100px" >
          <el-row>
            <el-col :span="12">
              <el-form-item label="公告类型" required>
               <el-select  v-model="form.type" placeholder="请选择">
                  <el-option v-for="item in forms" :key="item.id" :label="item.name" :value="item.id">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24">
              <el-form-item label="公告标题" required>
                <el-input v-model="form.title" placeholder=""></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24">
              <el-form-item label="对象" >
                 <el-input v-model="form.obj" @click.native="openOrganizationModal()" placeholder="点击选择" ></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24">
              <el-form-item label="正文" required>
                <vue-editor id="editor" useCustomImageHandler @imageAdded="handleImageAdded"
                v-model="form.context" :disabled="editorDisabled"></vue-editor>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24">
              <el-form-item label="附件" >
                <div class="upload_div"><Upload :ID="'upload'" @getImg="getImage"   :isClear="secondfalg" ></Upload></div>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button size="small" @click="increaseGoodsDialogVisible = false">取 消</el-button>
        <el-button size="small" type="primary" @click="look">预览</el-button>
        <el-button size="small" type="primary" @click="savex">保存</el-button>
        <el-button size="small" type="primary" @click="sendx">发布</el-button>
      </span>
    </el-dialog>
    <Organization :organizationDialog="organizationDialog" :type="typex"  @close="closeOrganization"  @selectMember="coloseaa"></Organization>
  </div>
</template>

<script>
import Organization from "../../../../common/organization.vue";
import Upload from "../../../../common/UPLOAD.vue";
import { VueEditor } from "vue2-editor";
export default {
  props: ["noticeDialog", "rowneedx"],
  components: {
    Organization,
    Upload,
    VueEditor
  },
  data() {
    return {
      increaseGoodsDialogVisible: false,
      urls: globalConfig.server,
      organizationDialog: false,
      saveorsendflag: false,
      lenx: 7,
      typex:'',
      screenshots:[],
      screensho:[],
      secondfalg:false,
      firstflag: false, //编辑或新建标识
      twoflag: false, //保存或发布标识
      threeflag: false, //是否成功发布标识
      linelist: [{}],
      upStatus:false,
      midId:null,
      form: {
        title: "",
        type: "",
        id: "",
        draft: "",
        obj: "",

        departmentInfo:[],
        context: "",
        attachment: [],
        // fujian:'',
        preview: 0
      },
      forms: [
        { id: "1", name: "表彰" },
        { id: "2", name: "批评" },
        { id: "3", name: "通知" }
      ],
      houselist: [],
      editorDisabled: false
    };
  },
  watch: {
    noticeDialog(val) {
      this.increaseGoodsDialogVisible = val;
    },
    increaseGoodsDialogVisible(val) {
      if (!val) {
        this.$emit("close");
        this.secondfalg = true
      }else{
        this.secondfalg = false
      }
    },
    rowneedx(val) {
      this.firstflag = true;
      if (val.content) {
        this.form.type = val.type;
        this.form.title = val.title;
        this.form.context = val.content;

        for(let i =0; i<val.department_id.length;i++){
          this.form.obj += val.department_id[i].name+";";
        }
        
        this.form.id = val.id;
        this.form.attachment = val.attachment;

        this.screenshots= val.attachment;

      } else {
        this.form.type = "";
        this.form.title = "";
        this.form.context = "";
        this.form.obj = "";

        this.form.attachment = [];
        this.firstflag = true;
       
      }
    }
  },
  methods: {
    getImage(val) {
      this.upStatus = val[2];    
      this.form.attachment = val[1];
    },

    //保存
    savex() {
      this.twoflag = true;
      this.midfunc();
    },
    //预览
    look(){
      this.form.preview=1;
      if (this.twoflag) {
        this.form.draft = "1";
      } else {
        this.form.draft = "0";
      }
      if (!this.firstflag) {
        this.form.id = "";
      }
      this.saveorsend();
      if (this.saveorsendflag) {
        if (this.form.type == "表彰") {
          this.form.type = 1;
        }
        if (this.form.type == "批评") {
          this.form.type = 2;
        }
        if (this.form.type == "通知") {
          this.form.type = 3;
        }
        if (this.form.type == "研发") {
          this.form.type = 4;
        }
        if(this.upStatus === true){
          this.$notify.warning({
            title:'警告',
            message:'图片正在上传'
          })
        }else {
        this.$http
          .post(this.urls + "announcement", {
            title: this.form.title,
            type: this.form.type,
            content: this.form.context,
            id: this.form.id,
            draft: this.form.draft,
            preview: this.form.preview,
            attachment: this.form.attachment
          })
          .then(res => {
            if (res.data.code == "99910") {
              this.midId = res.data.data.id;
            }            
          });

      }    
      }
    },
    //发布
    sendx() {
      this.twoflag = false;
      this.midfunc();
    },
    midfunc() {
      this.form.preview=0;
      if (this.twoflag) {
        this.form.draft = "1";
      } else {
        this.form.draft = "0";
      }
      if (!this.firstflag) {
        this.form.id = "";
      }
      if(this.midId){
        this.form.id = this.midId;
      }
      this.saveorsend();
      if (this.saveorsendflag) {
        if (this.form.type == "表彰") {
          this.form.type = 1;
        }
        if (this.form.type == "批评") {
          this.form.type = 2;
        }
        if (this.form.type == "通知") {
          this.form.type = 3;
        }
        if (this.form.type == "研发") {
          this.form.type = 4;
        }
        if(this.upStatus === true){
          this.$notify.warning({
            title:'警告',
            message:'图片正在上传'
          })
        }else {
        this.$http
          .post(this.urls + "announcement", {
            title: this.form.title,
            type: this.form.type,
            content: this.form.context,
            id: this.form.id,
            draft: this.form.draft,
            department_id: this.form.departmentInfo,
            preview: this.form.preview,
            attachment: this.form.attachment
          })
          .then(res => {
            if (res.data.code == "99910") {
              this.$notify({
                title: "成功",
                message: "操作成功",
                type: "success"
              });
              this.midId = null;
              this.threeflag = true;
              this.firstflag = true;
              this.upStatus=false;
              this.$emit("threeflag", this.threeflag);
            } else {
              this.$notify.error({
                title: "错误",
                message: "操作失败"
              });
              this.threeflag = false;
              this.$emit("threeflag", this.threeflag);
            }
          });
        this.increaseGoodsDialogVisible = false;
        
        }
      }
    },
    openOrganizationModal() {
      this.organizationDialog = true;
      this.typex="depart"
    },
    closeOrganization() {
      this.organizationDialog = false;
      
    },
    coloseaa(val) {
      this.form.obj=""
      this.form.departmentInfo=val;
        for(let i =0; i<val.length;i++){
          this.form.obj += val[i].name+";";
        }
    },

    //保存或发布校验
    saveorsend() {
      this.saveorsendflag = true;
      if (this.form.type == "" && this.saveorsendflag == true) {
        this.saveorsendflag = false;
        this.$notify({
          title: "警告",
          message: "公告类型不能为空",
          type: "warning"
        });
      }
      if (this.form.title == "" && this.saveorsendflag == true) {
        this.saveorsendflag = false;
        this.$notify({
          title: "警告",
          message: "公告主题不能为空",
          type: "warning"
        });
      }
      if (this.form.context == "" && this.saveorsendflag == true) {
        this.saveorsendflag = false;
        this.$notify({
          title: "警告",
          message: "正文内容不能为空",
          type: "warning"
        });
      }
    },
      handleImageAdded(file, Editor, cursorLocation, resetUploader) {

        let formData = new FormData();
        formData.append('file', file);

        let config = {
          headers:{'Content-Type':'multipart/form-data'}
        };
        if(file.size > 1024 * 1024 * 2){
            this.$notify.warning({
              title:'警告',
              message:'只能上传jpg/png文件，且不超过2M'
            })
        }else {
          this.$http.post(globalConfig.server_user + 'files', formData ,config).then((res) => {
            if(res.data.status === 'success'){
              Editor.insertEmbed(cursorLocation, 'image', res.data.data.uri);
            }
          })
        }

      },
  },

  created: function() {}
};
</script>
<style lang="scss" scoped="">

</style>
