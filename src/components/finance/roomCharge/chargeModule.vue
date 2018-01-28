<template>
  <div>
    <el-dialog :visible-sync="dialogVisible">

    </el-dialog>
  </div>
</template>

<script>
  export default {
    name: "charge-module",
    props: ['module'],
    data() {
      return {
        dialogVisible: false,
        form: {

        }
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

<style scoped>

</style>
