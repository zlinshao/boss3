<template>
  <div>
    <el-dialog :close-on-click-modal="false" title="付款时间" :visible.sync="dialogVisible" width="40%">
      <el-form :inline="true" onsubmit="return false" size="mini" label-width="111px">
        <el-form-item v-for="(key,index) in date" :label="'第'+ (index + 1) + '次付款时间'" :key="index">
          <div class="block" v-if="title === 'revisePay' || title === 'reviseCollect'">
            <el-date-picker
              v-model="date[index]"
              type="date"
              format="yyyy-MM-dd"
              value-format="yyyy-MM-dd"
              placeholder="选择日期">
            </el-date-picker>
          </div>
          <div class="block look"  v-if="title === 'lookPay' || title === 'lookCollect'">
            {{key}}
          </div>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button size="small" @click="dialogVisible = false">取&nbsp;消</el-button>
        <el-button size="small" type="primary" @click="dialogVisible = false">确&nbsp;定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  export default {
    name: "pay-time",
    props: ['module', 'date', 'title'],
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

<style scoped lang="scss">
  .block.look {
    width: 208px;
    height: 28px;
    padding-left: 20px;
    background-color: #eef3fc;
    -webkit-border-radius: 6px;
    -moz-border-radius: 6px;
    border-radius: 6px;
  }
</style>
