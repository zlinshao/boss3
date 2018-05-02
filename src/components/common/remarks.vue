<template>
  <div id="remarks">
    <el-dialog :close-on-click-modal="false" title="备注" :visible.sync="dialogVisible" width="40%">

      <div class="scroll_bar" :style="{'padding-right': padding0 + 'px'}">
        <el-table
          :data="tableData"
          max-height="520"
          style="width: 100%">
          <el-table-column
            prop="create_time"
            label="备注时间">
          </el-table-column>

          <el-table-column
            prop="content"
            label="备注内容">
          </el-table-column>

          <el-table-column
            prop="staff_id"
            label="备注人">
          </el-table-column>

          <!--<el-table-column-->
          <!--label="操作"-->
          <!--width="150px">-->
          <!--<template slot-scope="scope">-->
          <!--<el-button-->
          <!--size="mini"-->
          <!--type="text"-->
          <!--@click="handleEdit(scope.$index, scope.row)">编辑-->
          <!--</el-button>-->
          <!--<el-button-->
          <!--size="mini"-->
          <!--type="text"-->
          <!--style="color: red"-->
          <!--@click="openDelete(scope.$index, scope.row)">删除-->
          <!--</el-button>-->
          <!--</template>-->
          <!--</el-table-column>-->

        </el-table>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button size="small" type="primary" style="float: left;" @click="remarkVisible = true">新&nbsp;增</el-button>
        <el-button size="small" @click="dialogVisible = false">取&nbsp;消</el-button>
      </div>
    </el-dialog>

    <el-dialog :close-on-click-modal="false" title="新增备注" :visible.sync="remarkVisible" width="40%">
      <el-form :model="form">
        <el-form-item>
          <el-input v-model="form.remark" type="textarea" :autosize="{minRows: 4, maxRows: 4}"
                    placeholder="请填写备注内容"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button size="small" @click="remarkVisible = false">取&nbsp;消</el-button>
        <el-button size="small" type="primary" @click="onSubmit">确&nbsp;定</el-button>
      </div>
    </el-dialog>

  </div>
</template>

<script>
  export default {
    name: "remarks",
    props: ['module', 'list', 'remarkUrl'],
    data() {
      return {
        form: {
          id: '',
          remark: '',
        },
        personal: globalConfig.personal,
        urls: globalConfig.server,
        dialogVisible: false,
        remarkVisible: false,
        padding0: '1',
        tableData: [],
      }
    },
    mounted() {
    },
    watch: {
      module(val) {
        this.dialogVisible = val;
      },
      list(val) {
        this.padding0 = '0';
        this.tableData = [];
        this.form.id = val.id;
        this.tableData = val.remarks;
      },
      dialogVisible(val) {
        if (!val) {
          this.padding0 = '1';
          this.$emit('close');
        }
      },
      remarkVisible(val) {
        if (!val) {
          this.form.remark = '';
        }
      }
    },
    methods: {
      // 新增
      onSubmit() {
        this.$http.post(this.urls + this.remarkUrl, this.form).then((res) => {
          if (res.data.code === "30210") {
            this.remarkVisible = false;
            this.$emit('addRemark');
            this.$notify.success({
              title: "成功",
              message: res.data.msg,
            });
          } else {
            this.$notify.warning({
              title: "警告",
              message: res.data.msg,
            });
          }
        })
      },
      // 修改
      handleEdit(index, row) {
        console.log(index, row);
        this.form.id = row.remark;
        this.form.remark = row.remark;
        this.remarkVisible = true;
      },
      // 删除
      handleDelete(index, row) {
        console.log(index, row);
      },
      // 删除
      openDelete(index, row) {
        this.$confirm('此操作将删除该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$message({
            type: 'success',
            message: '删除成功!'
          });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });
      }
    },
  }
</script>

<style lang="scss" scoped>

</style>
