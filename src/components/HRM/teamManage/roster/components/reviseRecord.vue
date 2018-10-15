<template>
  <div>
    <el-dialog :close-on-click-modal="false" title="修改记录" :visible.sync="dialogVisible" width="30%">

      <div slot="footer" class="dialog-footer">
        <el-button size="small" @click="dialogVisible = false">取&nbsp;消</el-button>
        <el-button size="small" type="primary" @click="reviseRecord">修&nbsp;改</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  export default {
    name: "revise-record",
    data() {
      return {
        dialogVisible: false,
      }
    },
    mounted() {
    },
    activated() {
    },
    watch: {},
    computed: {},
    methods: {
      reviseRecord() {

      },
    },
  }
</script>

<style lang="scss" scoped>

</style>
