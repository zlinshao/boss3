<template>
  <div id="increaseGoods">
    <el-dialog :close-on-click-modal="false" title="公告发布" :visible.sync="increaseGoodsDialogVisible" width="60%">
      <div>
        <el-form :model="form" label-width="100px">
          <el-row>
            <el-col :span="12">
              <el-form-item label="公告类型" required>
                <el-select v-model="form.type" placeholder="请选择">
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
              <el-form-item label="对象">
                <el-input v-model="form.obj" readonly @click.native="openOrganizationModal()"
                          placeholder="点击选择"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24">
              <el-form-item label="正文" required>
                <vue-editor id="editor" useCustomImageHandler @imageAdded="handleImageAdded"
                            v-model="form.context"></vue-editor>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24">
              <el-form-item label="附件">
                <div class="upload_div">
                  <Upload :ID="'noticeUpload'" @getImg="getImage" :editImage="cover_pic" :isClear="secondfalg"></Upload>
                </div>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button size="small" @click="increaseGoodsDialogVisible = false">取 消</el-button>
        <el-button size="small" type="primary" @click="look">预览</el-button>
        <el-button size="small" type="primary" @click="savex" :disabled="draftDisabled">保存</el-button>
        <el-button size="small" type="primary" @click="sendx" :disabled="publishDisabled">发布</el-button>
      </span>
    </el-dialog>
    <Organization :organizationDialog="organizationDialog" :type="typex" @close="closeOrganization"
                  @selectMember="selectMember"></Organization>
    <Warning :warningDialog="warningDialog" :lookat="lookat" @close="closeWarning"></Warning>
  </div>
</template>

<script>
  import Organization from "../../../../common/organization.vue";
  import Upload from "../../../../common/UPLOAD.vue";
  import {VueEditor} from "vue2-editor";
  import Warning from "./Warning.vue"; //预览页面

  export default {
    props: ["noticeDialog", "rowneedx"],
    components: {
      Organization,
      Upload,
      VueEditor,
      Warning
    },
    data() {
      return {
        cover_pic: [],
        increaseGoodsDialogVisible: false,
        urls: globalConfig.server,
        organizationDialog: false,
        saveorsendflag: false,
        lenx: 7,
        typex: "",
        screenshots: [],
        screensho: [],
        secondfalg: false,
        firstflag: false, //编辑或新建标识
        twoflag: false, //保存或发布标识
        threeflag: true, //是否成功发布标识
        linelist: [{}],
        upStatus: false,
        midId: null,
        form: {
          title: "",
          type: "",
          id: "",
          draft: "",
          obj: "",

          departmentInfo: [],
          staffInfo: [],
          context: "",
          attachment: [],
          // fujian:'',
          preview: 0
        },
        forms: [
          {id: 1, name: "表彰"},
          {id: 2, name: "批评"},
          {id: 3, name: "通知"}
        ],
        houselist: [],
        draftDisabled: false,  //草稿按钮
        publishDisabled: false,  //发布按钮
        warningDialog: false,
        lookat: {},
      };
    },
    watch: {
      noticeDialog(val) {
        this.increaseGoodsDialogVisible = val;
      },
      increaseGoodsDialogVisible(val) {
        if (!val) {
          this.$emit("close");
          this.secondfalg = true;
          this.midId = null;
          this.form.id = "";
          this.$emit("threeflag", this.threeflag);

          this.draftDisabled = this.publishDisabled = false;
        } else {
          this.secondfalg = false;
        }
      },
      rowneedx(val) {
        this.$set(this.lookat, 'read_count', val.read_count);
        this.$set(this.lookat, 'unread_count', val.unread_count);
        this.firstflag = true;
        if (val.content) {
          this.cover_pic = [];
          this.$http.get(globalConfig.server + "announcement/" + val.id).then(res => {
            this.cover_pic = res.data.data && res.data.data.attachment;
          });
          this.form.type = val.type;
          this.form.title = val.title;
          this.form.context = val.content;
          this.form.departmentInfo = val.department_id;
          this.form.staffInfo = val.receiver_id;
          for (let i = 0; i < val.department_id.length; i++) {
            this.form.obj += val.department_id[i].name + ";";
          }
          for (let i = 0; i < val.receiver_id.length; i++) {
            this.form.obj += val.receiver_id[i].name + ";";
          }

          this.form.id = val.id;
          this.form.attachment = val.attachment;
          this.screenshots = val.attachment;
        } else {
          this.form.type = "";
          this.form.title = "";
          this.form.context = "";
          this.form.obj = "";

          this.form.attachment = [];
          this.firstflag = true;
          this.cover_pic = [];
        }
      }
    },
    methods: {
      getImage(val) {
        this.upStatus = val[2];
        this.form.attachment = val[1];
      },
      closeWarning() {
        this.warningDialog = false;
      },
      //保存
      savex() {
        this.draftDisabled = true;
        this.twoflag = true;
        this.midfunc();
      },
      //预览
      look() {
        this.midId = null;
        this.form.preview = 1;
        if (this.twoflag) {
          this.form.draft = "1";
        } else {
          this.form.draft = "0";
        }
        if (this.upStatus === true) {
          this.$notify.warning({
            title: "警告",
            message: "图片正在上传"
          });
        } else {
          // this.$http.post(this.urls + "announcement", {
          //     title: this.form.title,
          //     type: this.form.type,
          //     content: this.form.context,
          //     id: this.form.id,
          //     draft: this.form.draft,
          //     preview: this.form.preview,
          //     attachment: this.form.attachment
          //   }).then(res => {
          //     if (res.data.code == "99910") {
          //       this.midId = res.data.data.id;
          //       this.form.id = res.data.data.id;
          //
          //     }
          //   });
          this.$set(this.lookat, 'create_time', this.dateFormat());
          this.$set(this.lookat, 'type', this.form.type);
          this.$set(this.lookat, 'title', this.form.title);
          this.$set(this.lookat, 'content', this.form.context);
          this.warningDialog = true;
        }
      },
      dateFormat() {
        let date = new Date();
        let y = date.getFullYear();
        let m = date.getMonth() + 1;
        m = m < 10 ? ('0' + m) : m;
        let d = date.getDate();
        d = d < 10 ? ('0' + d) : d;
        let h = date.getHours();
        h = h < 10 ? ('0' + h) : h;
        let minute = date.getMinutes();
        minute = minute < 10 ? ('0' + minute) : minute;
        let second = date.getSeconds();
        second = second < 10 ? ('0' + second) : second;
        return y + '-' + m + '-' + d + ' ' + h + ':' + minute + ':' + second;
      },
      //发布
      sendx() {
        this.publishDisabled = true;
        this.twoflag = false;
        this.midfunc();
      },
      midfunc() {
        this.form.preview = 0;
        if (this.twoflag) {
          this.form.draft = "1";
        } else {
          this.form.draft = "0";
        }
        if (this.form.id == "") {
          this.form.id = this.midId;
        }
        if (this.upStatus === true) {
          this.$notify.warning({
            title: "警告",
            message: "图片正在上传"
          });
        } else {
          this.$http.post(this.urls + "announcement", {
            title: this.form.title,
            type: this.form.type,
            content: this.form.context,
            id: this.form.id,
            draft: this.form.draft,
            department_id: this.form.departmentInfo,
            receiver_id: this.form.staffInfo,
            preview: this.form.preview,
            attachment: this.form.attachment
          }).then(res => {
            if (res.data.code == "99910") {
              this.$notify.success({
                title: "成功",
                message: "操作成功",
                type: "success"
              });
              this.midId = null;
              this.form.id = null;
              this.firstflag = true;
              this.upStatus = false;
              this.increaseGoodsDialogVisible = false;
              this.$emit("threeflag", this.threeflag);
            } else {
              this.$notify.warning({
                title: "警告",
                message: res.data.msg
              });
              this.threeflag = false;
              this.$emit("threeflag", this.threeflag);
            }
          });
        }
      },
      openOrganizationModal() {
        this.organizationDialog = true;
        // this.typex = "depart";
      },
      closeOrganization() {
        this.organizationDialog = false;
      },
      selectMember(val) {
        this.form.obj = "";
        // this.form.departmentInfo = val;
        for (let i = 0; i < val.length; i++) {
          this.form.obj += val[i].name + ";";
        }
        this.form.departmentInfo = [];
        this.form.staffInfo = [];
        val.forEach((item) => {
          if (item.hasOwnProperty('avatar')) {
            //选的是人
            this.form.staffInfo.push(item);
          } else {
            //选的部门
            this.form.departmentInfo.push(item);
          }
        });
      },

      handleImageAdded(file, Editor, cursorLocation, resetUploader) {
        let formData = new FormData();
        formData.append('file', file);
        let config = {
          headers: {'Content-Type': 'multipart/form-data'}
        };
        if (file.size > 1024 * 1024 * 2) {
          this.$notify.warning({
            title: '警告',
            message: '只能上传jpg/png文件，且不超过2M'
          })
        } else {
          this.$http.post(globalConfig.server_user + 'files', formData, config).then((res) => {
            if (res.data.status === 'success') {
              Editor.insertEmbed(cursorLocation, 'image', res.data.data.uri);
            }
          })
        }

      },
    },

  };
</script>
<style lang="scss" scoped="">

</style>
