<template>
  <div class="modalFrame">
    <el-dialog :close-on-click-modal="false"
      title="明细"
      :visible.sync="integralDetail"
      width="40%">
      <div class="scroll_bar">
        <el-form  size="mini" label-width="80px">
          <el-row>
            <el-col :span="12">
              <el-form-item label="姓名">
                <el-input size="mini" disabled="" v-model="integralInfo.sname"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="部门">
                 <el-input size="mini" v-model="integralInfo.dname"  disabled="" ></el-input>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row>
            <el-col :span="12">
              <el-form-item label="日期">
                <el-input size="mini" v-model="integralInfo.date"  disabled="" ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="积分分数">
                <el-input size="mini" v-model="integralInfo.amount_str"  disabled="" ></el-input>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row>
            <el-col :span="12">
              <el-form-item label="项目类别">
                <el-input size="mini" v-model="integralInfo.minus"  disabled="" ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="项目名称">
                <el-input size="mini" v-model="integralInfo.name"  disabled="" ></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="积分变动">
                <el-input size="mini" v-model="integralInfo.amount"  disabled="" ></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-form-item label="备注" >
            <!-- <el-input size="mini"   clearable disabled="" ></el-input> -->
            <el-input size="mini"  v-model="remark" clearable disabled="" ></el-input>
          </el-form-item>
        </el-form>
      </div>

      <span slot="footer">
        <el-button type="primary" @click="integralDetail = false">关闭</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "integralDetl",
  props: ["module", "rowid"],
  data() {
    return {
      integralDetail: false,
      form: {},
      id: "",
      integralInfo: [],
      remark: ""
    };
  },
  watch: {
    module(val) {
      this.integralDetail = val;
    },
    integralDetail(val) {
      if (!val) {
        this.$emit("close");
      }
    },
    rowid(val) {
      this.getIntegralDetl(val);
    }
  },
  mounted() {},
  methods: {
    getIntegralDetl(val) {
      this.$http
        .get(globalConfig.server + "/credit/manage/" + val)
        .then(res => {
          if (res.data.code == "30310") {
            this.integralInfo = res.data.data;
            if (res.data.data.minus == 0) {
              this.integralInfo.minus = "得分";
            } else {
              this.integralInfo.minus = "失分";
            }
        this.remark="";
        if(res.data.data.remarks){
            if(res.data.data.remarks[0]){
            if(res.data.data.remarks[0].content){
                for(let i=0;i<res.data.data.remarks.length;i++){
                this.remark +=res.data.data.remarks[i].content +";"
                }}else{this.remark="";}
            }else{this.remark="";}
        }else{
          this.remark="";
        }
          } else {
            this.integralInfo = [];
          }
        });
    }
  }
};
</script>

<style scoped lang="scss">
@mixin flex {
  display: -webkit-flex;
  display: flex;
}

@mixin border_radius($n) {
  -webkit-border-radius: $n;
  -moz-border-radius: $n;
  border-radius: $n;
}
</style>
