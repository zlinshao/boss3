<template>
  <div>
    <el-dialog :close-on-click-modal="false" title="发送短信" :visible.sync="remindDialogVisible" width="32%">
      <div>
        <el-form size="mini" :model="formInline" label-width="100px">
          <el-row>
            <el-col :span="10">
              <el-form-item label="收件人:">
              <span>共计{{number}}人</span>
              </el-form-item>
            </el-col>
            <el-col :span="10">
              <el-form-item label="离职业务员:" required >
               <span><el-input  v-model="name" @focus="selectDep" placeholder="请选择负责人" readonly></el-input></span>
              </el-form-item>
             </el-col>
          </el-row>
          <el-row>
            <el-col :span="10">
              <el-form-item label="短信名称:">
              <span>员工离职短信</span>
              </el-form-item>
            </el-col>
            <el-col :span="10">
              <el-form-item label="离职时间:" required>
                <el-date-picker type="date" format="yyyy-MM-dd" value-format="yyyy-MM-dd" placeholder="选择日期" v-model="formInline.date" style="width: 100%;"></el-date-picker>
              </el-form-item>
            </el-col>
          </el-row>
          <el-form-item label="短信内容:">
            <el-col :span="19">
              <el-input :rows="8" type="textarea" v-model="textarea"  ></el-input>
            </el-col>
          </el-form-item>
        </el-form>

      </div>
      <span slot="footer" class="dialog-footer">
        <el-button size="small" @click="remindDialogVisible = false">取 消</el-button>
        <el-button size="small" type="primary" @click="save">发 送</el-button>
      </span>
    </el-dialog>
        <Organization :organizationDialog="organizeDialog" :length="length" :type="type"
                  @selectMember="selectMember" @close="closeOrganization"></Organization>
  </div>

</template>

<script>
import ElCol from "element-ui/packages/col/src/col";
import Organization from "../../../../common/organization.vue";
export default {
  components: { ElCol,Organization },
  props: ["remindDialog","sendId" ,"sendName" ,"totalNumber"],
  data() {
    return {
      remindDialogVisible: false,
      //模态框
      organizeDialog: false,
      formInline: {
        id: [],
        date: "",
      },
      form: {
        search: "",
        limit: 12,
        page: 1 ,
        user_id:''
      },
      type:'',
      length:'',
      activeNameDialog:'',
        name:"",
        number:'',
        textarea:"【乐伽公寓】尊敬的客户：由于个人原因，我司原业务员@，已于201@年@月@日离职，与本公司解除了劳动合同,自@与我司解除劳动合同之日起，其所从事的一切活动概与我司无关，我司不为其离职后的任何行为承担任何责任，敬请理解。如需缴纳款项，请转至公司指定的账户，如转给个人，我司概不负责。因我司业务人员的变动而给您带来困扰，见请谅解！祝您生活愉快！全国客服热线：4008926606。"
    };
  },
  watch: {
    remindDialog(val) {
      this.remindDialogVisible = val;
    },
    remindDialogVisible(val) {
      if (!val) {
        this.$emit("close");
        this.formInline = {
          id: [],
          date: ""
        };

        this.name="";
      }
    },
    sendId(val) {
      this.formInline.id.push(val);
    },
    sendName(val){
      this.name =val;
    },
    totalNumber(val){
      this.number = val;
    }
  },
  methods: {
    save() {
      if(this.name==""){
             this.$notify.warning({
              title: "警告",
              message: "未选离职业务员"
            });
      }else if(this.formInline.date == ""){
             this.$notify.warning({
              title: "警告",
              message: "未填写离职时间"
            });
      }
      else{
      this.$http
        .post(globalConfig.server + "core/customer/sms", this.formInline)
        .then(res => {
          if (res.data.code === "10050") {
            this.$notify.success({
              title: "成功",
              message: res.data.msg
            });
            this.formInline = {
              id: [],
              date: ""
            };
             this.name="";
             this.remindDialogVisible = false;
          } else {
            this.$notify.warning({
              title: "警告",
              message: res.data.msg
            });
          }
        });

      }

    },
    // 人资搜索
    selectDep() {
      this.organizeDialog = true;
      this.type = 'staff';
      this.length = 1;
    },
      closeOrganization(){
        this.organizeDialog = false
      },
    // 确认部门
    selectMember(val) {
      this.organizeDialog = false;
      if (val[0].hasOwnProperty("avatar")) {
        this.name = val[0].name;
        this.formInline.id = val[0].id;
        this.form.user_id = val[0].id;
      this.$http
        .get(globalConfig.server + "core/customer", { params: this.form })
        .then(res => {
          if (res.data.code === "10000") {
            this.number = res.data.data.total;
          }
        });
      }
    },
  }
};
</script>
<style lang="scss" scoped="">
.el-dialog__wrapper .el-dialog .el-dialog__body .form_border {
  padding: 18px 10px 18px 10px;
}
</style>
