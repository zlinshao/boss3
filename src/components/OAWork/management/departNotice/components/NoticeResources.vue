<template>
  <div id="increaseGoods">
    <el-dialog :close-on-click-modal="false" title="公告发布" :visible.sync="increaseGoodsDialogVisible" width="60%">
      <div>
        <el-form :model="form" label-width="100px">
          <el-row>
            <el-col :span="12">
              <el-form-item label="公告类型" required>
                <el-select v-model="form.type" placeholder="请选择" size="small">
                  <el-option v-for="item in forms" :key="item.id" :label="item.name" :value="item.id">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="20">
              <el-form-item label="公告内容" required>
                <el-input v-model="form.title" placeholder="" size="small" type="textarea" placeholder="请输入"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="20">
              <el-form-item label="对象">
                <el-input v-model="form.obj" readonly @click.native="openOrganizationModal"
                          placeholder="请点击选择" size="small">
                  <template slot="append">
                    <div style="cursor: pointer;" @click="form.obj=''">清空</div>
                  </template>
                </el-input>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button size="small" @click="increaseGoodsDialogVisible = false">取 消</el-button>
        <el-button size="small" type="primary" @click="savex">保存</el-button>
        <el-button size="small" type="primary" @click="sendx">发布</el-button>
      </span>
    </el-dialog>
    <Organization :organizationDialog="organizationDialog" :type="organizaType" @close="closeOrganization"
                  @selectMember="coloseaa"></Organization>
  </div>
</template>

<script>
  import Organization from "../../../../common/organization.vue";
  import Upload from "../../../../common/UPLOAD.vue";
  import {VueEditor} from "vue2-editor";

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
        organizaType: "",
        firstflag: false, //编辑或新建标识
        twoflag: false, //保存或发布标识
        threeflag: true, //是否成功发布标识
        form: {
          title: "",
          type: "",
          obj: "",
          departmentInfo: [],
        },
        forms: [
          {id: "1", name: "表彰"},
          {id: "2", name: "批评"},
          {id: "3", name: "通知"}
        ],
      };
    },
    watch: {
      noticeDialog(val) {
        this.increaseGoodsDialogVisible = val;
      },
      increaseGoodsDialogVisible(val) {
        if (!val) {
          this.$emit("close");
          this.$emit("threeflag", this.threeflag);
        } else {
        }
      },
      rowneedx(val) {
        if (val.content) {
          this.form.type = val.type;
          this.form.title = val.title;
          for (let i = 0; i < val.department_id.length; i++) {
            this.form.obj += val.department_id[i].name + ";";
          }
        } else {
          this.form.type = "";
          this.form.title = "";
          this.form.obj = "";
        }
      }
    },
    methods: {
      //保存
      savex() {
        this.midfunc();
      },
      //发布
      sendx() {
        this.midfunc();
      },
      midfunc() {
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
        this.$http.post(this.urls + "announcement", {
          title: this.form.title,
          type: this.form.type,
          id: this.form.id,
          department_id: this.form.departmentInfo,
        }).then(res => {
          if (res.data.code == "99910") {
            this.$notify({
              title: "成功",
              message: "操作成功",
              type: "success"
            });
            this.increaseGoodsDialogVisible = false;
            this.$emit("threeflag", this.threeflag);
          } else {
            this.$notify.error({
              title: "错误",
              message: res.data.msg
            });
            this.threeflag = false;
            this.$emit("threeflag", this.threeflag);
          }
        });
      },
      openOrganizationModal() {
        this.organizationDialog = true;
        this.organizaType = "depart";
      },
      closeOrganization() {
        this.organizationDialog = false;
      },
      coloseaa(val) {
        this.form.obj = "";
        this.form.departmentInfo = val;
        for (let i = 0; i < val.length; i++) {
          this.form.obj += val[i].name + ";";
        }
      },
    },

  };
</script>
<style lang="scss" scoped="">

</style>
