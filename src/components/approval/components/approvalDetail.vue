<template>
    <div id="approvalDetail">
      <el-dialog
        title="审批详情"
        :visible.sync="innerVisible"
        @close="handleClose"
      >
        this is approvalVisible
      </el-dialog>
    </div>
</template>

<script>
    export default {
      name: "approvalDetail",
      data() {
        return {
          innerVisible: false
        }
      },
      props: ['approvalVisible'],
      watch:{
        approvalVisible:function (val) {
          this.innerVisible = val;
        }
      },
      methods: {
        handleClose() {
          this.$emit('approvalClose');
        }
      }
    }
</script>

<style scoped lang="scss">

</style>
