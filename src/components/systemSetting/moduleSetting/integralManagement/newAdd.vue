<template>
  <div>
    <el-dialog :title="newAdd" :visible.sync="newAddDialogVisible" width="30%">
      <div>
        <el-form size="mini" :model="form" label-width="100px">
          <el-row>

            <el-col :span="24">
              <el-form-item label="所属类型">
                <el-select v-model="changeNinus"  clearable="" placeholder="请选择积分类型">
                  <el-option label="得分项目" value="0"></el-option>
                  <el-option label="失分项目" value="1"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="24">
              <el-form-item label="积分项" >
                    <el-input placeholder="请输入内容"  v-model="form.name"></el-input>
              </el-form-item>
            </el-col>

            <el-col :span="24">
              <el-form-item label="对应积分">
                <el-input placeholder="请输入内容" v-model="form.amount" @change="checkNo(form.amount)"></el-input>
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
        <el-button size="small" type="primary" @click="submitIntegral">保 存</el-button>
      </span>
    </el-dialog>

  </div>
</template>

<script>
export default {
  props: ["newAdd", "newAddDialog", "formDetail"],
  components: {},
  data() {
    return {
      newAddDialogVisible: false,
      newOrChange: "",
      length: 0,
      type: "",
      formid:'',
      form: {
        name:"",
        amount: "",
        minus: "",
        remark:""
      },
      changeNinus:"",
      otherType: false,

    };
  },
  watch: {
    formDetail(val) {
        this.formid=val.id;
        this.form.name=val.name;
        this.form.amount=val.amount;
        this.changeNinus= val.item;
        if(val.remarks){
            if(val.remarks[0]){
            if(val.remarks[0].content){
                for(let i=0;i<val.remarks.length;i++){
                this.form.remark +=val.remarks[i].content +";"
                }
            }
        }}
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
        this.close();
      }
    }
  },
  mounted() {},
  methods: {

    submitIntegral() {
      if(this.changeNinus == "得分项目" || this.changeNinus == 0){
          this.form.minus=0
      }
      else if(this.changeNinus == "失分项目" || this.changeNinus == 1){
          this.form.minus=1;
      }
      if (this.newAdd == "新增") {
          this.$http
            .post(globalConfig.server + "credit/manage/item",this.form)
            .then(res => {
              if (res.data.code === "30210") {
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
            .put(globalConfig.server + "credit/manage/item/" + this.formid, this.form)
            .then(res => {
              if (res.data.code === "30210") {
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
 
    },

    close() {
        this.formid='';
      this.form={
        name:"",
        amount: "",
        minus: "",
        remark:""
      }
    },
        checkNo(value){
        let reg = /^[1-9]\d*$/;
          if (value) {
            if (value > 999999 || new  RegExp(reg).test(value) == false) {
            this.form.amount =''
            }
          }
        }
  }
};
</script>
<style lang="scss" scoped="">
#addRentRepair {
}
</style>
