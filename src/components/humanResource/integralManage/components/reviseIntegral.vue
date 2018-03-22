<template>
  <div class="modalFrame">
    <el-dialog
      title="修改"
      :visible.sync="reviseIntegral"
      width="40%">
      <div class="scroll_bar">
        <el-form :model="form" size="mini" label-width="80px">
          <el-row>
            <el-col :span="12">
              <el-form-item label="姓名">
                <el-input size="mini" ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="部门">
                <el-input size="mini" ></el-input>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row>
            <el-col :span="12">
              <el-form-item label="日期">
                <el-input size="mini" ></el-input>
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
              <el-form-item label="积分项">
                <el-select  clearable placeholder="请选择积分项">
                  <el-option label="得分项目" value="0"></el-option>
                  <el-option label="失分项目" value="1"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="项目名称">
                <el-input size="mini"></el-input>
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
        </el-form>
      </div>

      <span slot="footer">
        <el-button type="primary" @click="reviseIntegral = false">关闭</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
  export default {
    name: "reviseIntegral",
    props: ['module'],
    data () {
      return {
        reviseIntegral: false,
        form: {
          id: 1,
          name: '',
          minus: '',
          amount: '',
        },
      }
    },
    watch:{
      module(val){
        this.reviseIntegral = val;
      },
      reviseIntegral(val){
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
        this.$http.get(globalConfig.server + '/credit/manage/item' + this.form.id,{params: this.form}).then((res) => {
          console.log(res);
        })
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
