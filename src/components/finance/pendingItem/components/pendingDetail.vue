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

      <div>
        详情
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

</style>
