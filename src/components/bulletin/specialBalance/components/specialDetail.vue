<template>
  <div id="specialDetail">
    <el-dialog title="详情" :visible.sync="dialogVisible" width="60%">
      <div class="scroll_bar">
        <div class="title">喜报详情</div>
        <div class="form_border">
          <el-form size="mini" label-width="110px">
            <el-row v-for="(key,index) in 6" :key="index">
              <el-col :span="8">
                <el-form-item label="第一次付款时间">
                  <div class="special">房贷首付克里</div>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="第一次付款时间">
                  <div class="special">房贷首付克里斯</div>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="第一次付款时间">
                  <div class="special">房贷首付克里斯</div>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </div>
        <div class="title">充公详情</div>
        <div class="form_border">
          <el-form size="mini" label-width="110px">
            <el-row v-for="(key,index) in 6" :key="index">
              <el-col :span="8">
                <el-form-item label="第一次付款时间">
                  <div class="special">房贷首付</div>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="第一次付款时间">
                  <div class="special">房贷首付克里斯蒂</div>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="第一次付款时间">
                  <div class="special">房贷首付克里斯蒂</div>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </div>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button size="small" @click="dialogVisible = false">取&nbsp;消</el-button>
        <el-button size="small" type="primary" @click="dialogVisible = false">确&nbsp;定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  export default {
    name: "special-detail",
    props: ['module'],
    data() {
      return {
        dialogVisible: false,
      }
    },
    mounted() {
    },
    watch: {
      module(val) {
        this.dialogVisible = val;
      },
      dialogVisible(val) {
        if (!val) {
          this.$emit('close');
        }
      }
    },
    methods: {},
  }
</script>

<style lang="scss">
  #specialDetail{
    .special {
      min-height: 28px;
      padding: 0 20px;
      background-color: #eef3fc;
      -webkit-border-radius: 6px;
      -moz-border-radius: 6px;
      border-radius: 6px;
    }
    .el-dialog__wrapper{
      .el-dialog{
        .el-dialog__body{
          padding: 15px;
          div.scroll_bar{
            padding-right: 10px;
            max-height: 520px;
            overflow-x: auto;
          }
          .form_border{
            .total{
              border-top: 1px solid #dfe6fb;
              padding: 5px;
              text-align: right;
            }
          }

        }
      }
    }
  }

</style>
