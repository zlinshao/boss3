<template>
  <div @click="show = false" @contextmenu="closeMenu">
    <div class="highRanking">
      <div class="tabsSearch">
        <el-form :inline="true" size="mini">
          <el-form-item>
            <el-button v-if="activeName === 'first'" type="primary" size="mini" @click="onSubmit()">
              <i class="el-icon-plus"></i>&nbsp;新增系统
            </el-button>
            <el-button v-if="activeName === 'second'" type="primary" size="mini" @click="onSubmit()">
              <i class="el-icon-plus"></i>&nbsp;新增模块
            </el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>

    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="系统" name="first">
        <el-table
          :data="tableFirst"
          style="width: 100%"
          @row-contextmenu='houseMenu'>
          <el-table-column
            prop="id"
            label="ID"
            width="88px;">
          </el-table-column>

          <el-table-column
            prop="name"
            label="系统标示">
          </el-table-column>

          <el-table-column
            prop="display_name"
            label="系统名称">
          </el-table-column>

          <el-table-column
            prop="description"
            label="系统描述">
          </el-table-column>

          <el-table-column
            prop="updated_at"
            label="修改时间">
          </el-table-column>

          <el-table-column
            prop="created_at"
            label="创建时间">
          </el-table-column>
        </el-table>
      </el-tab-pane>

      <el-tab-pane label="模块" name="second">
        <el-table
          :data="tableSecond"
          style="width: 100%"
          @row-contextmenu='moduleMenu'>
          <el-table-column
            prop="id"
            label="ID"
            width="88px;">
          </el-table-column>

          <el-table-column
            prop="name"
            label="模块标示">
          </el-table-column>

          <el-table-column
            prop="display_name"
            label="模块名称">
          </el-table-column>

          <el-table-column
            prop="description"
            label="模块描述">
          </el-table-column>

          <el-table-column
            prop="updated_at"
            label="修改时间">
          </el-table-column>

          <el-table-column
            prop="created_at"
            label="创建时间">
          </el-table-column>
        </el-table>
      </el-tab-pane>
    </el-tabs>

    <div class="block pages">
      <el-pagination
        v-show="activeName === 'first'"
        @size-change="handleSizeChange"
        @current-change="powerList"
        :current-page="currentPage"
        :page-size="15"
        layout="total, prev, pager, next, jumper"
        :total="paging">
      </el-pagination>

      <el-pagination
        v-show="activeName === 'second'"
        @size-change="handleSizeChange"
        @current-change="moduleList"
        :current-page="currentPage"
        :page-size="15"
        layout="total, prev, pager, next, jumper"
        :total="paging">
      </el-pagination>
    </div>

    <RevisePower :module="powerModule" :title="title" :names="moduleName" :table="tableFirst" :msg="tableDetail"
                 @close="close_" @sure="search"></RevisePower>

    <!--右键-->
    <RightMenu :startX="rightMenuX+'px'" :startY="rightMenuY+'px'" :list="lists" :show="show"
               @clickOperate="clickEvent"></RightMenu>
  </div>
</template>

<script>
  import RevisePower from './revisePower.vue'
  import RightMenu from '../../common/rightMenu.vue'    //右键

  export default {
    components: {RevisePower, RightMenu},
    name: 'hello',
    data() {
      return {
        urls: globalConfig.server_user,
        rightMenuX: 0,
        rightMenuY: 0,
        show: false,
        lists: [],

        form: {
          page: 1,
        },
        currentPage: 1,
        paging: 0,

        activeName: 'first',
        moduleName: 'first',
        tableFirst: [],
        tableSecond: [],
        tableDetail: {},
        details: {},
        powerModule: false,
        title: '',
      }
    },
    mounted() {
      this.powerList(1);
    },
    watch: {
      activeName(val) {
        this.moduleName = val;
        if (val === 'first') {
          this.powerList(1);
        } else {
          this.moduleList(1);
        }
      }
    },
    methods: {
      // tabs标签页
      handleClick(tab, event) {
        // console.log(tab, event);
      },
      // ===================系统================
      // 系统列表
      powerList(val) {
        this.tableFirst = [];
        this.form.page = val;
        this.close_();
        this.$http.get(this.urls + 'api/v1/systems', {
          params: this.form
        }).then((res) => {
          if (res.data.status === 'success') {
            this.currentPage = val;
            this.tableFirst = res.data.data;
            this.paging = res.data.meta.total;
          }
        })
      },
      // 系统修改
      powerDetail(val) {
        this.$http.get(this.urls + 'api/v1/systems/' + val.id).then((res) => {
          if (res.data.status === 'success') {
            this.powerModule = true;
            this.tableDetail = res.data.data;
            this.title = '修改';
          }
        })
      },

      // ==============模块=================
      moduleList(val) {
        this.tableSecond = [];
        this.form.page = val;
        this.close_();
        this.$http.get(this.urls + 'api/v1/modules', {
          params: this.form
        }).then((res) => {
          if (res.data.status === 'success') {
            this.currentPage = val;
            this.tableSecond = res.data.data;
            this.paging = res.data.meta.total;
          }
        });
      },

      onSubmit() {
        this.title = '新增';
        this.powerModule = true;
      },

      // 搜索当前页
      search(val) {
        if (val === 'first') {
          this.powerList(this.currentPage);
        } else {
          this.moduleList(this.currentPage);
        }
      },

      // 关闭模态框
      close_() {
        this.powerModule = false;
      },

      // 删除
      openDelete(val, id) {
        this.$confirm('此操作将删除该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          if (id === 1) {
            this.$http.delete(this.urls + 'api/v1/systems/' + val.id).then((res) => {
              if (res.data.status === 'success') {
                this.powerList(this.currentPage);
                this.$message({
                  type: 'success',
                  message: res.data.message,
                });
              }
            });
          }
          if (id === 2) {
            this.$http.delete(this.urls + 'api/v1/modules/' + val.id).then((res) => {
              if (res.data.status === 'success') {
                this.moduleList(this.currentPage);
                this.$message({
                  type: 'success',
                  message: res.data.message,
                });
              }
            });
          }
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });
      },

      // 右键
      houseMenu(row, event) {
        this.tableDetail = [];
        this.details = row;
        this.lists = [
          {clickIndex: 'revise', headIcon: 'el-icon-edit-outline', label: '编辑'},
          {clickIndex: 'delete', headIcon: 'el-icon-circle-close-outline', label: '删除'},
        ];
        this.contextMenuParam(event);
      },
      moduleMenu(row, event) {
        this.tableDetail = [];
        this.details = row;
        this.lists = [
          {clickIndex: 'reviseModule', headIcon: 'el-icon-edit-outline', label: '编辑'},
          {clickIndex: 'deleteModule', headIcon: 'el-icon-circle-close-outline', label: '删除'},
        ];
        this.contextMenuParam(event);
      },
      // 右键回调
      clickEvent(val) {
        switch (val) {
          case 'module':
            this.moduleName = 'second';
            this.tableDetail = this.details;
            this.title = '新增';
            this.powerModule = true;
            break;
          case 'revise':
            this.title = '修改';
            this.moduleName = 'first';
            this.tableDetail = this.details;
            this.powerModule = true;
            break;
          case 'delete':
            this.openDelete(this.details, 1);
            break;
          case 'reviseModule':

            break;
          case 'deleteModule':
            this.openDelete(this.details, 2);
            break;
        }
      },
      //关闭右键菜单
      closeMenu() {
        this.show = false;
      },
      //右键参数
      contextMenuParam(event) {
        let e = event || window.event;
        this.show = false;
        this.rightMenuX = e.clientX + document.documentElement.scrollLeft - document.documentElement.clientLeft;
        this.rightMenuY = e.clientY + document.documentElement.scrollTop - document.documentElement.clientTop;
        event.preventDefault();
        event.stopPropagation();
        this.$nextTick(() => {
          this.show = true
        })
      },

      handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
      },

    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
