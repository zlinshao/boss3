<template>
  <div id="treeModule">
    <el-dialog :title="title" :visible.sync="knowVisible" width="30%">
      <el-form :model="form" label-width="60px" size="mini">
        <el-form-item label="层级">
          <el-select v-model="form.topClass" clearable>
            <el-option v-for="(key,index) in values" :value="index + 1" :label="key" :key="index"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="名称">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button size="small" @click="knowVisible = false">取&nbsp;消</el-button>
        <el-button size="small" type="primary">确&nbsp;定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  export default {
    name: "know-module",
    props: ['module', 'msg'],
    data() {
      return {
        urls: globalConfig.server,
        knowVisible: false,
        values: ['上级', '平级', '下级'],
        form: {
          topClass: '',
          name: '',
        },
        title: '',
      }
    },
    watch: {
      module(val) {
        this.knowVisible = val;
      },

      knowVisible(val) {
        if (!val) {
          this.$emit('close');
        }
      },
    },
    methods: {
      sureTree(val) {
        let type, urls, rev;
        if (val === 1) {
          type = this.$http.post;
          urls = this.urls + 'setting/dictionary/save';
        } else {
          type = this.$http.put;
          urls = this.urls + 'setting/dictionary/update';
        }
        type(urls, {

        }).then((res) => {

        })
      }
    }
  }
</script>

<style lang="scss">

</style>
