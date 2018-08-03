<template>
  <div id="pendingDetail">
    <el-dialog :close-on-click-modal="false" title="详情" :visible.sync="dialogVisible" width="40%">
      <div
        style="width: 90%;"
        v-loading="fullLoading"
        element-loading-text="拼命加载中"
        element-loading-spinner="el-icon-loading"
        element-loading-background="rgba(255, 255, 255, 0)">
      </div>

      <div class="scroll_bar">
        <el-row>
          <el-col :span="12">
            <div class="contents" v-for="key in titles1">
              <div class="titles">{{key}}</div>
              <div class="values">范德萨范德萨放附近的斯拉撒</div>
            </div>
          </el-col>
          <el-col :span="12">
            <div class="contents" v-for="key in titles2">
              <div class="titles">{{key}}</div>
              <div class="values">范德萨范德萨放附近的斯拉撒</div>
            </div>
          </el-col>
        </el-row>
      </div>

      <div slot="footer" class="dialog-footer">
        <el-button size="small" type="primary" @click="dialogVisible = false">关&nbsp;闭</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  export default {
    name: "pending-detail",
    props: ['module'],
    data() {
      return {
        dialogVisible: false,
        fullLoading: false,
        titles1: ['客户姓名','房屋地址','事项类型','收退款类型','水费','电费','燃气费','物业费','网络费','转租费用','管理费','违约金',],
        titles2: ['合同开始时间','合同结束时间','物业校验','应退','实际扣款','实际退款','结算方式','结算账户','签约人','所属部门','收款人','结算日期'],
      }
    },
    mounted() {
    },
    activated() {
    },
    watch: {
      module(val) {
        this.dialogVisible = val;
      },
      dialogVisible(val) {
        if (!val) {
          this.$emit('close');
        }
      },
    },
    methods: {},
  }
</script>

<style lang="scss">
  #pendingDetail {
    @mixin border_($n) {
      -webkit-border-radius: $n;
      -moz-border-radius: $n;
      border-radius: $n;
    }
    @mixin flex {
      display: flex;
      display: -webkit-flex;
    }
    .contents {
      @include flex;
      align-items: center;
      margin-bottom: 12px;
      .titles {
        min-width: 100px;
        line-height: 30px;
        height: 30px;
        text-align: right;
        padding-right: 12px;
      }
      .values {
        padding: 4px 20px;
        background-color: #eef3fc;
        @include border_(6px);
      }
    }
  }

</style>
