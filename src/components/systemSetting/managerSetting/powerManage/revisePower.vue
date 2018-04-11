<template>
  <div>
    <el-dialog :close-on-click-modal="false" :title="title" :visible.sync="dialogVisible" width="30%">
      <el-form :model="form" size="mini" label-width="80px">
        <div v-if="names === 'first'">
          <el-form-item label="系统标示">
            <el-input v-model="form.name" :disabled="title === '修改'" :clearable="title !== '修改'"
                      placeholder="系统标示"></el-input>
          </el-form-item>
          <el-form-item label="系统名称">
            <el-input v-model="form.display_name" clearable placeholder="系统名称"></el-input>
          </el-form-item>
          <el-form-item label="系统描述">
            <el-input v-model="form.content" :disabled="title === '修改'" :clearable="title !== '修改'"
                      placeholder="系统描述"></el-input>
          </el-form-item>
        </div>

        <div v-if="names === 'second'">
          <el-form-item label="模块标示">
            <el-input v-model="form.name" :disabled="title === '修改'" :clearable="title !== '修改'"
                      placeholder="模块标示"></el-input>
          </el-form-item>
          <el-form-item label="模块名称">
            <el-input v-model="form.display_name" clearable placeholder="模块名称"></el-input>
          </el-form-item>
          <el-form-item label="模块描述">
            <el-input v-model="form.content" :disabled="title === '修改'" :clearable="title !== '修改'" clearable
                      placeholder="模块描述"></el-input>
          </el-form-item>
        </div>

        <div v-if="names === 'third'">
          <el-form-item label="选择权限">
            <el-radio-group v-model="form.radio">
              <el-radio :label="1">操作权限</el-radio>
              <el-radio :label="2">数据权限</el-radio>
            </el-radio-group>

          </el-form-item>
          <el-form-item label="权限标示">
            <el-input v-model="form.name" :disabled="title === '修改'" :clearable="title !== '修改'"
                      placeholder="权限标示"></el-input>
          </el-form-item>
          <el-form-item label="权限名称">
            <el-input v-model="form.display_name" clearable placeholder="权限名称"></el-input>
          </el-form-item>
          <el-form-item label="权限描述">
            <el-input v-model="form.content" :disabled="title === '修改'" :clearable="title !== '修改'" clearable
                      placeholder="权限描述"></el-input>
          </el-form-item>
        </div>
      </el-form>

      <div slot="footer" class="dialog-footer">
        <el-button size="small" @click="dialogVisible = false">取&nbsp;消</el-button>
        <el-button size="small" v-if="names === 'first'" type="primary" @click="addPower(title)">{{title}}
        </el-button>
        <el-button size="small" v-if="names === 'second'" type="primary" @click="addModule(title)">{{title}}
        </el-button>
        <el-button size="small" v-if="names === 'third'" type="primary" @click="authorityModule(title)">{{title}}
        </el-button>
        <div style="float: left;margin-top: 6px">
          <el-checkbox v-model="checked" v-if="names === 'third' && title === '新增'">持续新增</el-checkbox>
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  export default {
    name: "revise-role",
    props: ['module', 'title', 'addID', 'msg', 'names'],
    data() {
      return {
        urls: globalConfig.server_user,
        dialogVisible: false,

        checked: false,
        tableSecond: [],
        form: {
          radio: 1,
          ids: '',
          sys_id: '',            //所属系统
          mod_id: '',            //所属模块
          name: '',
          display_name: '',
          content: '',
        },
      }
    },

    watch: {
      msg(val) {
        if (this.title === '修改') {
          if (this.names === 'first') {
            this.form.ids = val.id;
            this.form.name = val.name;
            this.form.display_name = val.display_name;
            this.form.content = val.description;
          }
          if (this.names === 'second') {
            this.form.ids = val.id;
            this.form.name = val.name;
            this.form.display_name = val.display_name;
            this.form.content = val.description;
          }
          if (this.names === 'third') {
            this.form.ids = val.id;
            this.form.radio = val.type;
            this.form.name = val.name;
            this.form.display_name = val.display_name;
            this.form.content = val.description;
          }
        }
      },

      module(val) {
        this.dialogVisible = val;
        if (this.title === '新增' && this.names === 'third') {
          this.form.radio = 1;
        }
      },

      dialogVisible(val) {
        if (!val) {
          this.$emit('close');
          this.close_();
        }
      }
    },
    methods: {
      // ===============系统新增/修改=================
      addPower(val) {
        if (val === '修改') {
          this.$http.put(this.urls + 'systems/' + this.form.ids, {
            name: this.form.name,
            display_name: this.form.display_name,
            description: this.form.content,
          }).then((res) => {
            if (res.data.status === 'success') {
              this.prompt(res.data.message, 1);
              this.$emit('sure', this.names);
            } else {
              this.prompt(res.data.message, 2);
            }
          })
        } else {
          this.$http.post(this.urls + 'systems', {
            name: this.form.name,
            display_name: this.form.display_name,
            description: this.form.content,
          }).then((res) => {
            if (res.data.status === 'success') {
              this.prompt(res.data.message, 1);
              this.$emit('sure', this.names);
            } else {
              this.prompt(res.data.message, 2);
            }
          })
        }
      },

      // ====================新增/修改模块==============
      addModule(val) {
        if (val === '修改') {
          this.$http.put(this.urls + 'modules/' + this.form.ids, {
            name: this.form.name,
            display_name: this.form.display_name,
            description: this.form.content,
          }).then((res) => {
            if (res.data.status === 'success') {
              this.prompt(res.data.message, 1);
              this.$emit('sure', this.names);
            } else {
              this.prompt(res.data.message, 2);
            }
          })
        } else {
          this.$http.post(this.urls + 'modules', {
            sys_id: this.addID.firstID,
            name: this.form.name,
            display_name: this.form.display_name,
            description: this.form.content,
          }).then((res) => {
            if (res.data.status === 'success') {
              this.prompt(res.data.message, 1);
              this.$emit('sure', this.names);
            } else {
              this.prompt(res.data.message, 2);
            }
          })
        }
      },

      // ===================新增/修改权限=================
      authorityModule(val) {
        if (val === '修改') {
          this.$http.put(this.urls + 'permissions/' + this.form.ids, {
            mod_id: this.addID.secondID,
            name: this.form.name,
            display_name: this.form.display_name,
            description: this.form.content,
          }).then((res) => {
            if (res.data.status === 'success') {
              this.prompt(res.data.message, 1);
              this.$emit('sure', this.names);
              this.$emit('close');
            } else {
              this.prompt(res.data.message, 2);
            }
          })
        } else {
          this.$http.post(this.urls + 'permissions', {
            type: this.form.radio,
            sys_id: this.addID.firstID,
            mod_id: this.addID.secondID,
            name: this.form.name,
            display_name: this.form.display_name,
            description: this.form.content,
          }).then((res) => {
            if (res.data.status === 'success') {
              this.prompt(res.data.message, 1);
              this.$emit('sure', this.names);
              if (this.checked) {
                this.close_();
              } else {
                this.$emit('close');
              }
            } else {
              this.prompt(res.data.message, 2);
            }
          })
        }
      },

      // 清空数据
      close_() {
        this.form.radio = 1;
        this.form.ids = '';
        this.form.sys_id = '';
        this.form.mod_id = '';
        this.form.sys_name = '';
        this.form.name = '';
        this.form.display_name = '';
        this.form.content = '';
      },

      // ====================提示信息=================
      prompt(val, stu) {
        if (stu === 1) {
          this.$notify({
            title: '成功',
            message: val,
            type: 'success'
          });
        } else {
          let dataList = [];
          let index = 0;
          let interval = null;
          for (let key in val) {
            dataList.push(val[key][0]);
          }
          new Promise((resolve, reject) => {
            interval = setInterval(() => {
              this.$notify({
                title: '警告',
                message: dataList[index],
                type: 'warning'
              });
              index++;
              if (index === dataList.length) {
                resolve()
              }
            }, 100)
          }).then(() => {
            clearInterval(interval);
            interval = null;
          })
        }
      },
    },
  }
</script>

<style lang="scss">

</style>
