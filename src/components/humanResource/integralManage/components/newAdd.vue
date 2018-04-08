<template>
  <div>
    <el-dialog :title="newAdd" :visible.sync="newAddDialogVisible" width="40%">
      <div>
        <el-form size="mini" :model="form" label-width="100px">
          <el-row>
            <!--<el-col :span="24">-->
            <!--<el-form-item label="报修时间">-->
            <!--<el-date-picker type="date" v-model="form.date" placeholder="选择日期"></el-date-picker>-->
            <!--</el-form-item>-->
            <!--</el-col>-->
            <el-col :span="24">
              <el-form-item label="姓名" v-if="newAdd === '新增' " required >
                <el-input readonly="" v-model="form.sname" @focus="openOrganizeModal"></el-input>
              </el-form-item>
              <el-form-item label="姓名" v-if="newAdd === '修改' " required>
                 <el-input  placeholder="请输入内容" readonly  v-model="form.sname"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="24">
              <el-form-item label="部门" required>
                <el-input placeholder="请输入内容" readonly v-model="form.dname"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="10">
              <el-form-item label="积分项" required>
                <el-select v-model="form.minus" @change="integral" clearable="" placeholder="请选择积分项">
                  <el-option label="得分项目" value="0"></el-option>
                  <el-option label="失分项目" value="1"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="14">
              <el-form-item label-width="20px">
                <el-select v-model="form.name" @change="integralAmount" clearable placeholder="请选择积分项">
                  <el-option v-for="(key,index) in integralList" :label="key.name" :value="key.id"
                             :key="index"></el-option>
                  <el-option label="其他" value="other" v-if="integralList.length !== 0"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="24" v-if="otherType">
              <el-form-item label="积分项">
                <el-input placeholder="请输入内容" v-model="form.integralPro"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="24">
              <el-form-item label="对应积分">
                <el-input placeholder="请输入内容" :disabled="!otherType" v-model="form.amount_str"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="24">
              <el-form-item label="现有积分">
                <el-input disabled v-model="form.existing"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="24">
              <el-form-item label="备注">
                <el-input type="textarea" placeholder="请输入内容" v-model="form.remark"></el-input>
              </el-form-item>
            </el-col>

          </el-row>
        </el-form>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button size="small" @click="newAddDialogVisible = false">取 消</el-button>
        <el-button size="small" type="primary" @click="submitIntegral">确 定</el-button>
      </span>
    </el-dialog>
    <Organization :organizationDialog="organizationDialog" :length="length" :type="type"
                  @close='closeModal' @selectMember="selectMember"></Organization>    
  </div>
</template>

<script>
import Organization from "../../../common/organization.vue";
export default {
  props: ["newAdd", "newAddDialog", "formDetail"],
  components: { Organization },
  data() {
    return {
      newAddDialogVisible: false,
      organizationDialog: false,
      newOrChange: "",
      length: 0,
      type: "",
      formList: {
        page: 1,
        limit: 120,
        item_name: "",
        staff_id: "",
        credit_from: "",
        credit_to: "",
        department_id: ""
      },
      form: {
        id: "",
        sname: "",
        staff_id: "",
        dname: "",
        integralPro: "",
        amount: "",
        amount_str: "",
        minus: "",
        name: "",
        existing: "",
        remark: ""
      },
      add: {
        id: "",
        staff_id: "",
        credit_item_id: "",
        remark: ""
      },
      otherType: false,
      integralList: []
    };
  },
  watch: {
    formDetail(val) {
      this.form.sname = val.sname;
      this.form.id = val.id;
      this.form.dname = val.dname;
      this.form.minus = String(val.minus);
      this.formList.staff_id = val.staff_id;
      this.integral(val.minus);
      this.form.remark=""
        if(val.remarks){
            if(val.remarks[0]){
            if(val.remarks[0].content){
                for(let i=0;i<val.remarks.length;i++){
                this.form.remark +=val.remarks[i].content +";"
                }
            }}
        }
      this.form.amount_str = val.amount_str;
      this.form.name = val.name;
      this.form.staff_id = val.staff_id;
      this.$http
        .get(globalConfig.server + "credit/manage/summary", {
          params: this.formList
        })
        .then(res => {
          if(res.data.code=='30310'){
          this.form.existing = res.data.data[0].amount;
          }else{
            this.form.existing=0
          }
        });
    },
    newAdd(val) {
      this.newOrChange = val;
      if (val == "新增") {
        this.close();
      }
    },

    newAddDialog(val) {
      this.newAddDialogVisible = val;
    },
    newAddDialogVisible(val) {
      if (!val) {
        this.$emit("close");
      }
    }
  },
  mounted() {},
  methods: {
    // 积分项

    integral(val) {
      let typeGet = [];
      if (val == "0") {
        typeGet = "credit/manage/item/gain";
      } else {
        typeGet = "credit/manage/item/lose";
      }
      this.integralList = [];
      this.form.name = "";
      this.form.amount_str = "";
      this.otherType = false;
      this.$http
        .get(globalConfig.server + typeGet, {
          params: this.formList
        })
        .then(res => {
          if (res.data.code === "30210") {
            this.integralList = res.data.data;
          }
        });
    },
    integralAmount(val) {
      this.form.integralPro = "";
      this.form.amount_str = "";
      if (val === "other") {
        this.otherType = true;
      } else {
        this.otherType = false;
      }
      for (let i = 0; i < this.integralList.length; i++) {
        if (this.integralList[i].id === val) {
          this.form.amount_str = this.integralList[i].amount_str;
        }
      }
    },

    submitIntegral() {
      let typesubmit = [];
      let typesubmitot = [];
      if(typeof (this.form.name) === 'string'){
                this.$notify.warning({
                  title: "警告",
                  message: "数据未发生改变"
                });
      }else{
      if (this.newAdd == "新增") {
        if (this.form.name === "other") {
          this.$http
            .post(globalConfig.server + "credit/manage/other", {
              staff_id: this.form.staff_id,
              gain_or_lose: Number(this.form.minus),
              amount: this.form.amount_str,
              name: this.form.integralPro,
              credit_item_id: this.form.name,
              remark: this.form.remark
            })
            .then(res => {
              if (res.data.code === "30310") {
                this.$notify.success({
                  title: "成功",
                  message: res.data.msg
                });
                this.$emit("close");
                this.close();
                this.$emit("newAddBack", this.newAdd);
              } else {
                this.$notify.warning({
                  title: "警告",
                  message: res.data.msg
                });
              }
            });
        } else {
          this.$http
            .post(globalConfig.server + "credit/manage", {
              staff_id: this.form.staff_id,
              credit_item_id: this.form.name,
              remark: this.form.remark
            })
            .then(res => {
              if (res.data.code === "30310") {
                this.$notify.success({
                  title: "成功",
                  message: res.data.msg
                });
                this.$emit("close");
                this.close();
                this.$emit("newAddBack", this.newAdd);
              } else {
                this.$notify.warning({
                  title: "警告",
                  message: res.data.msg
                });
              }
            });
        }
      } else {
        if (this.form.name === "other") {
          this.$http
            .put(globalConfig.server + "credit/manage/other/" + this.form.id, {
              id: this.form.id,
              staff_id: this.form.staff_id,
              gain_or_lose: Number(this.form.minus),
              amount: this.form.amount_str,
              name: this.form.integralPro,
              credit_item_id: this.form.name,
              remark: this.form.remark
            })
            .then(res => {
              if (res.data.code === "30310") {
                this.$notify.success({
                  title: "成功",
                  message: res.data.msg
                });
                this.$emit("close");
                this.$emit("newAddBack", this.newAdd);
              } else {
                this.$notify.warning({
                  title: "警告",
                  message: res.data.msg
                });
              }
            });
        } else {
          this.$http
            .put(globalConfig.server + "credit/manage/" + this.form.id, {
              staff_id: this.form.staff_id,
              credit_item_id: this.form.name,
              remark: this.form.remark
            })
            .then(res => {
              if (res.data.code === "30310") {
                this.$notify.success({
                  title: "成功",
                  message: res.data.msg
                });
                this.$emit("close");
                this.$emit("newAddBack", this.newAdd);
              } else {
                this.$notify.warning({
                  title: "警告",
                  message: res.data.msg
                });
              }
            });
        }
      }
      }
    },
    //调出选人组件
    openOrganizeModal() {
      this.organizationDialog = true;
      this.type = "staff";
      this.length = 1;
    },
    selectMember(val) {
      this.organizationDialog = false;
      this.type = "";
      this.length = "";
      this.form.staff_id = val[0].id;
      this.formList.staff_id=val[0].id
      this.$http
        .get(globalConfig.server + "credit/manage/summary", {
          params: this.formList
        })
        .then(res => {
          if(res.data.code=='30310'){
          this.form.existing = res.data.data[0].amount;
          }else{
            this.form.existing=0
          }
        });
      this.form.sname = val[0].name;
      this.form.dname = val[0].org[0].name;

    },
    closeModal() {
      this.organizationDialog = false;
    },
    close() {
      (this.formList = {
        page: 1,
        limit: 120,
        item_name: "",
        staff_id: "",
        credit_from: "",
        credit_to: "",
        department_id: ""
      }),
        (this.form = {
          id: "",
          sname: "",
          staff_id: "",
          dname: "",
          integralPro: "",
          amount: "",
          amount_str: "",
          minus: "",
          name: "",
          existing: "",
          remark: ""
        });
    }
  }
};
</script>
<style lang="scss" scoped="">
#addRentRepair {
}
</style>
