<template>
  <div>
    <el-dialog :title="title" :visible.sync="dialogVisible" width="30%">


      <el-form :model="form" size="mini" label-width="80px">
        <div v-if="names === 'first'">
          <el-form-item label="系统标示">
            <el-input v-model="form.name" :disabled="title === '修改'" clearable placeholder="系统标示"></el-input>
          </el-form-item>
          <el-form-item label="系统名称">
            <el-input v-model="form.display_name" clearable placeholder="系统名称"></el-input>
          </el-form-item>
          <el-form-item label="系统描述">
            <el-input v-model="form.content" :disabled="title === '修改'" clearable placeholder="系统描述"></el-input>
          </el-form-item>
        </div>

        <div v-if="names === 'second'">
          <el-form-item label="所属系统">
            <el-select v-model="form.sys_id" clearable>
              <el-option v-for="(item,index) in table" :label="item.display_name" :value="item.id"
                         :key="index"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="模块标示">
            <el-input v-model="form.name" clearable placeholder="模块标示"></el-input>
          </el-form-item>
          <el-form-item label="模块名称">
            <el-input v-model="form.display_name" clearable placeholder="模块名称"></el-input>
          </el-form-item>
          <el-form-item label="模块描述">
            <el-input v-model="form.content" clearable placeholder="描述"></el-input>
          </el-form-item>
        </div>
      </el-form>

      <div slot="footer" class="dialog-footer">
        <el-button size="small" @click="dialogVisible = false">取&nbsp;消</el-button>
        <el-button size="small" v-if="names === 'first'" type="primary" @click="addPower(title)">{{title}}
        </el-button>
        <el-button size="small" v-if="names === 'second'" type="primary" @click="addModule()">新增
        </el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  export default {
    name: "revise-role",
    props: ['module', 'title', 'msg','table', 'names'],
    data() {
      return {
        urls: globalConfig.server_user,
        dialogVisible: false,
        ids: '',
        form: {
          sys_id: '',            //所属系统
          name: '',
          display_name: '',
          content: '',
        },
      }
    },

    watch: {
      msg(val) {
        if (this.names === 'first' && this.title === '修改') {
          this.ids = val.id;
          this.form.name = val.name;
          this.form.display_name = val.display_name;
          this.form.content = val.description;
        }if (this.names === 'second') {

        }
      },

      module(val) {
        this.dialogVisible = val;
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
        let type;
        if (val === '修改') {
          type = this.$http.put;
        } else {
          type = this.$http.post;
        }
        type(this.urls + 'api/v1/systems/' + this.ids, {
          name: this.form.name,
          display_name: this.form.display_name,
          description: this.form.content,
        }).then((res) => {
          if (res.data.status === 'success') {
            this.prompt(res.data.message, 1);
            this.$emit('sure');
          } else {
            this.prompt(res.data.message, 2);
          }
        })
      },

      // ====================新增修改模块==============
      addModule() {
        this.$http.post(this.urls + 'api/v1/modules', {
          sys_id: this.form.sys_id,
          name: this.form.name,
          display_name: this.form.display_name,
          description: this.form.content,
        }).then((res) => {
          if (res.data.status === 'success') {
            this.prompt(res.data.message, 1);
            // this.$emit('sure');
          } else {
            this.prompt(res.data.message, 2);
          }
        })
      },

      // 清空数据
      close_() {
        this.ids = '';
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
            dataList.push(val[key][0])
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
