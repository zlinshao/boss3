<template>
  <div id="remarks">
    <el-dialog title="备注" :visible.sync="dialogVisible" width="40%">
      <div class="scroll_bar">
        <el-table
          :data="tableData"
          style="width: 100%"
          max-height="550">
          <el-table-column
            prop="date"
            label="备注时间"
            width="90px;">
          </el-table-column>

          <el-table-column
            prop="contents"
            label="备注内容">
          </el-table-column>

          <el-table-column
            prop="name"
            label="备注人"
            width="100px">
          </el-table-column>

          <el-table-column
            label="操作"
            width="150px">
            <template slot-scope="scope">
              <el-button
                size="mini"
                type="text"
                @click="handleEdit(scope.$index, scope.row)">编辑
              </el-button>
              <el-button
                size="mini"
                type="text"
                style="color: red"
                @click="openDelete(scope.$index, scope.row)">删除
              </el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button size="small" type="primary" style="float: left;" @click="remarkVisible = true">新&nbsp;增</el-button>
        <el-button size="small" @click="dialogVisible = false">取&nbsp;消</el-button>
        <el-button size="small" type="primary" @click="dialogVisible = false">确&nbsp;定</el-button>
      </div>
    </el-dialog>

    <el-dialog title="新增备注" :visible.sync="remarkVisible" width="40%">
      <el-form :model="form">
        <el-form-item>
          <el-input v-model="form.remarks" type="textarea" :autosize="{minRows: 4, maxRows: 4}"
                    placeholder="请填写备注内容"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button size="small" @click="remarkVisible = false">取&nbsp;消</el-button>
        <el-button size="small" type="primary" @click="remarkVisible = false">确&nbsp;定</el-button>
      </div>
    </el-dialog>

  </div>
</template>

<script>
  export default {
    name: "remarks",
    props: ['module'],
    data() {
      return {
        form: {
          remarks: '',
        },
        dialogVisible: false,
        remarkVisible: false,
        powerModule: false,
        tableData: [
          {
            date: '2018-01-01 00:00:00',
            contents: '发挥到了萨菲航空斯大林饭卡恐惧和顾客上费大概多少个梵蒂冈地方是个杜帅杜帅广东省广东省广东省广泛大使馆电风扇赶得上过分的事广东省广东省过分的事的',
            name: '活雷锋',
          }, {
            date: '2018-01-01 00:00:00',
            contents: '反对和科技示范户是打开回复会计师大后方看见撒旦回复卡萨丁回复看见萨菲航空基地撒回复看爱的',
            name: '活雷锋',
          }, {
            date: '2018-01-01 00:00:00',
            contents: '广泛大概是个范德萨打发时光的发生过的方式广泛的广泛大使馆的附属国豆腐干反对是',
            name: '活雷锋',
          }, {
            date: '2018-01-01 00:00:00',
            contents: '政府都感到十分广泛大使馆反倒是广东佛山杜帅广东省高度广泛的鬼地方高浮雕鬼地方收购的方式过分的事房东广东佛山士大夫',
            name: '活雷锋',
          }, {
            date: '2018-01-01 00:00:00',
            contents: '政府都感到十分广泛大使馆反倒是广东佛山杜帅广东省高度广泛的鬼地方高浮雕鬼地方收购的方式过分的事房东广东佛山士大夫',
            name: '活雷锋',
          }, {
            date: '2018-01-01 00:00:00',
            contents: '政府都感到十分广泛大使馆反倒是广东佛山杜帅广东省高度广泛的鬼地方高浮雕鬼地方收购的方式过分的事房东广东佛山士大夫',
            name: '活雷锋',
          }, {
            date: '2018-01-01 00:00:00',
            contents: '政府都感到十分广泛大使馆反倒是广东佛山杜帅广东省高度广泛的鬼地方高浮雕鬼地方收购的方式过分的事房东广东佛山士大夫',
            name: '活雷锋',
          }, {
            date: '2018-01-01 00:00:00',
            contents: '政府都感到十分广泛大使馆反倒是广东佛山杜帅广东省高度广泛的鬼地方高浮雕鬼地方收购的方式过分的事房东广东佛山士大夫',
            name: '活雷锋',
          }, {
            date: '2018-01-01 00:00:00',
            contents: '政府都感到十分广泛大使馆反倒是广东佛山杜帅广东省高度广泛的鬼地方高浮雕鬼地方收购的方式过分的事房东广东佛山士大夫',
            name: '活雷锋',
          }, {
            date: '2018-01-01 00:00:00',
            contents: '政府都感到十分广泛大使馆反倒是广东佛山杜帅广东省高度广泛的鬼地方高浮雕鬼地方收购的方式过分的事房东广东佛山士大夫',
            name: '活雷锋',
          }, {
            date: '2018-01-01 00:00:00',
            contents: '政府都感到十分广泛大使馆反倒是广东佛山杜帅广东省高度广泛的鬼地方高浮雕鬼地方收购的方式过分的事房东广东佛山士大夫',
            name: '活雷锋',
          },
        ],
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
      },
      remarkVisible(val) {
        if (!val) {
          console.log(1);
          this.form.remarks = '';
        }
      }
    },
    methods: {
      // 新增
      onSubmit() {

      },
      // 修改
      handleEdit(index, row) {
        console.log(index, row);
        this.form.remarks = row.contents;
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

<style lang="scss">

</style>
