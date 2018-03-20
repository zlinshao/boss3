<template>
  <div class="modalFrame">
    <el-dialog
      title="明细"
      :visible.sync="integralDetail"
      width="40%">
      <div class="scroll_bar">
        <el-form :model="form" size="mini" label-width="80px">
          <el-row>
            <el-col :span="12">
              <el-form-item label="姓名">
                <el-input size="mini" readonly></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="部门">
                <el-input size="mini" readonly></el-input>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row>
            <el-col :span="12">
              <el-form-item label="日期">
                <el-input size="mini" readonly></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="积分分数">
                <el-input size="mini" readonly></el-input>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row>
            <el-col :span="12">
              <el-form-item label="项目类别">
                <el-input size="mini" readonly></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="项目名称">
                <el-input size="mini" readonly></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="积分变动">
                <el-input size="mini" readonly></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-form-item label="备注">
            <el-input size="mini" readonly></el-input>
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
    props: ['module'],
    data () {
      return {
        integralDetail: false,
        form: {},
        id: '',
      }
    },
    watch:{
      module(val){
        this.integralDetail = val;
      },
      integralDetail(val){
        if(!val){
          this.$emit('close');
        }
      }
    },
    mounted(){
      // this.getIntegralDetl();
    },
    methods: {
      getIntegralDetl () {
        // this.$http.get(globalConfig.server + '/credit/manage/'+this.id).then((res) => {
        //   console.log(res);
        // })
      }
    }
  }
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
