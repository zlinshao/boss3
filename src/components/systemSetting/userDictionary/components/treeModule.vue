<template>
  <div id="treeModule">
    <el-dialog :title="title" :visible.sync="treeVisible" width="30%">
      <el-form :model="form" label-width="60px" size="mini">
        <el-form-item label="层级" v-if="msg.revise !== 'revise' && msg.rev !== 'dict'">
          <el-select v-model="form.topClass" clearable>
            <el-option v-for="(key,index) in values" :value="index + 1" :label="key" :key="index"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="名称">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button size="small" @click="treeVisible = false">取&nbsp;消</el-button>
        <el-button size="small" v-if="msg.revise !== 'revise'" type="primary" @click="sureTree(1)">确&nbsp;定</el-button>
        <el-button size="small" v-if="msg.revise === 'revise'" type="primary" @click="sureTree(2)">修&nbsp;改</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  export default {
    name: "tree-module",
    props: ['module', 'msg'],
    data() {
      return {
        urls: globalConfig.server,
        treeVisible: false,
        values: ['上级', '平级', '下级'],
        form: {
          topClass: '',
          name: '',
        },
        ids: '',
        parent_id: '',
        title: '',
      }
    },
    watch: {
      module(val) {
        this.treeVisible = val;
      },
      msg(val) {
        if (val.revise === 'revise') {
          this.title = '修改';
          this.ids = val.id;
          this.parent_id = val.parent_id;
          this.form.moduleChoose = val.type;
          this.form.name = val.dictionary_name;
        } else {
          this.title = '新增';
          this.ids = '';
          this.parent_id = val.id;
        }
      },
      treeVisible(val) {
        if (!val) {
          this.$emit('close', 1);
          this.form.topClass = '';
          this.form.name = '';
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
        if (this.msg.rev === 'dict') {
          rev = 5;
        } else {
          rev = 4;
        }
        type(urls, {
          id: this.ids,
          type: rev,
          style: this.form.topClass,
          dictionary_name: this.form.name,
          parent_id: this.parent_id,
        }).then((res) => {
          if (res.data.code === '30020' || res.data.code === '30040') {
            if (rev === 5) {
              this.$emit('dict');
            } else if (rev === 4) {
              this.$emit('close', 2);
            }
            this.form.topClass = '';
            this.form.name = '';
          }
        })
      }
    }
  }
</script>

<style lang="scss">

</style>
