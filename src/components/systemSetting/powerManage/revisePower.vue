<template>
  <div>
    <el-dialog :title="name" :visible.sync="dialogVisible" width="30%">
      <el-form :model="form" size="mini" label-width="80px">
        <el-form-item label="规则名">
          <el-input v-model="form.name" auto-complete="off" placeholder="规则名"></el-input>
        </el-form-item>

        <el-form-item label="描述">
          <el-input v-model="form.content" auto-complete="off" placeholder="描述"></el-input>
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
    name: "revise-role",
    props: ['module','name'],
    data() {
      return {
        radio: 1,
        dialogVisible: false,
        form: {
          name: '',
          content: '',
        },
      }
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

</style>
