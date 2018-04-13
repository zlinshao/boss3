<template>
  <div @click="show = false" @contextmenu="closeMenu">
    <div class="highRanking">
      <div class="highHide" style="text-align: right;margin-bottom: 10px;">
        <el-button type="primary" size="mini" @click="newSystem"><i class="el-icon-plus"></i>&nbsp;新增系统</el-button>
      </div>
    </div>
    <div class="border_1">
      <el-table
        :empty-text='emptyContent1'
        v-loading="tableLoading1"
        element-loading-text="拼命加载中"
        element-loading-spinner="el-icon-loading"
        element-loading-background="rgba(0, 0, 0, 0)"
        :row-class-name="tableFirstName"
        :data="tableFirst"
        style="width: 100%"
        @row-contextmenu='houseMenu'
        @row-click="firstClick">
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
      <div class="block pages">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="powerList"
          :current-page="firstPage"
          :page-size="showSize"
          layout="total, prev, pager, next, jumper"
          :total="paging1">
        </el-pagination>
      </div>
    </div>


    <div class="border_1">
      <el-table
        :empty-text='emptyContent2'
        v-loading="tableLoading2"
        element-loading-text="拼命加载中"
        element-loading-spinner="el-icon-loading"
        element-loading-background="rgba(0, 0, 0, 0)"
        :row-class-name="tableSecondName"
        :data="tableSecond"
        style="width: 100%"
        @row-contextmenu='moduleMenu'
        @row-click="secondClick">
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
      <div class="block pages">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="moduleList"
          :current-page="secondPage"
          :page-size="showSize"
          layout="total, prev, pager, next, jumper"
          :total="paging2">
        </el-pagination>
      </div>
    </div>


    <div class="border_1">
      <el-table
        :empty-text='emptyContent3'
        v-loading="tableLoading3"
        element-loading-text="拼命加载中"
        element-loading-spinner="el-icon-loading"
        element-loading-background="rgba(0, 0, 0, 0)"
        :row-class-name="tableThirdName"
        :data="tableThird"
        style="width: 100%"
        @row-contextmenu='modMenu'>
        <el-table-column
          prop="id"
          label="ID"
          width="88px;">
        </el-table-column>
        <el-table-column
          prop="name"
          label="权限标示">
        </el-table-column>
        <el-table-column
          prop="display_name"
          label="权限名称">
        </el-table-column>
        <el-table-column
          prop="description"
          label="权限描述">
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
      <div class="block pages">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="authority"
          :current-page="thirdPage"
          :page-size="showSize"
          layout="total, prev, pager, next, jumper"
          :total="paging3">
        </el-pagination>
      </div>
    </div>

    <RevisePower :module="powerModule" :title="title" :names="moduleName" :addID="addID" :msg="tableDetail"
                 @close="close_" @sure="search"></RevisePower>

    <!--右键-->
    <RightMenu :startX="rightMenuX+'px'" :startY="rightMenuY+'px'" :list="lists" :show="show"
               @clickOperate="clickEvent"></RightMenu>
  </div>
</template>

<script>
  import RevisePower from './revisePower.vue'
  import RightMenu from '../../../common/rightMenu.vue'    //右键

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

        showSize: 5,
        firstForm: {
          page: 1
        },
        secondForm: {
          page: 1
        },
        thirdForm: {
          page: 1
        },
        firstPage: 1,
        secondPage: 1,
        thirdPage: 1,
        paging1: 0,
        paging2: 0,
        paging3: 0,

        moduleName: 'first',
        tableFirst: [],
        tableSecond: [],
        tableThird: [],
        addID: {
          firstID: '',
          secondID: '',
          thirdID: '',
        },
        tableDetail: {},
        details: {},
        powerModule: false,
        title: '',

        emptyContent1: ' ',
        tableLoading1: false,
        emptyContent2: ' ',
        tableLoading2: false,
        emptyContent3: ' ',
        tableLoading3: false,
      }
    },
    mounted() {
      this.powerList(1);
    },

    methods: {
      // 行 变色
      tableFirstName({row, rowIndex}) {
        if (row.id === this.addID.firstID) {
          return 'success-row';
        }
        return '';
      },
      tableSecondName({row, rowIndex}) {
        if (row.id === this.addID.secondID) {
          return 'success-row';
        }
        return '';
      },
      tableThirdName({row, rowIndex}) {
        if (row.id === this.addID.thirdID) {
          return 'success-row';
        }
        return '';
      },
      // ===================系统================
      // 系统列表
      powerList(val) {
        this.emptyContent1 = ' ';
        this.tableLoading1 = true;
        this.firstForm.page = val;
        this.$http.get(this.urls + 'systems?per_page_number=5', {
          params: this.firstForm
        }).then((res) => {
          this.tableLoading1 = false;
          let data = res.data.data;
          if (res.data.status === 'success' && data.length !== 0) {
            this.tableFirst = data;
            this.paging1 = res.data.meta.total;
          } else {
            this.paging1 = 0;
            this.emptyContent1 = '暂无数据';
          }
        })
      },

      firstClick(row) {
        this.addID.firstID = row.id;
        this.moduleList(1);
        this.tableSecond = [];
        this.tableThird = [];
      },
      // ==============模块=================
      // 模块列表
      moduleList(val, id) {
        this.emptyContent2 = ' ';
        this.tableLoading2 = true;
        this.secondForm.page = val;
        this.$http.get(this.urls + 'modules?per_page_number=5&sys_id=' + this.addID.firstID, {
          params: this.secondForm
        }).then((res) => {
          this.tableLoading2 = false;
          let data = res.data.data;
          if (res.data.status === 'success' && data.length !== 0) {
            this.tableSecond = res.data.data;
            this.paging2 = res.data.meta.total;
          } else {
            this.paging2 = 0;
            this.emptyContent2 = '暂无数据';
          }
        });
      },

      secondClick(row) {
        this.addID.secondID = row.id;
        this.authority(1);
        this.tableThird = [];
      },
      // ==============权限=================
      authority(val) {
        this.emptyContent3 = ' ';
        this.tableLoading3 = true;
        this.thirdForm.page = val;
        this.$http.get(this.urls + 'permissions?per_page_number=5&mod_id=' + this.addID.secondID, {
          params: this.thirdForm
        }).then((res) => {
          this.tableLoading3 = false;
          let data = res.data.data;
          if (res.data.status === 'success' && data.length !== 0) {
            this.tableThird = res.data.data;
            this.paging3 = res.data.meta.total;
          } else {
            this.paging3 = 0;
            this.emptyContent3 = '暂无数据';
          }
        });
      },

      newSystem() {
        this.moduleName = 'first';
        this.onSubmit();
      },

      onSubmit() {
        this.title = '新增';
        this.powerModule = true;
      },

      // 搜索当前页
      search(val) {
        if (val === 'first') {
          this.powerList(1);
          this.close_();
        } else if (val === 'second') {
          this.moduleList(1, this.addID.firstID);
          this.close_();
        } else {
          this.authority(1, this.addID.secondID);
        }
      },

      // 关闭模态框
      close_() {
        this.powerModule = false;
      },

      // 删除
      openDelete(id, val) {
        this.$confirm('此操作将删除该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          let address;
          if (val === 'first') {
            address = this.urls + 'systems/';
          } else if (val === 'second') {
            address = this.urls + 'modules/';
          } else {
            address = this.urls + 'permissions/';
          }
          this.$http.delete(address + id.id).then((res) => {
            if (res.data.status === 'success') {
              this.search(val);
              this.prompt(res.data.message, 1);
            } else {
              this.prompt(res.data.message, 2);
            }
          });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });
      },

      // 右键 系统
      houseMenu(row, event) {
        this.firstClick(row);
        this.tableDetail = {};
        this.details = row;
        this.lists = [
          {clickIndex: 'add2', headIcon: 'el-icon-edit-outline', label: '新增模块'},
          {clickIndex: 'revise', headIcon: 'el-icon-edit-outline', label: '编辑'},
          {clickIndex: 'delete', headIcon: 'el-icon-circle-close-outline', label: '删除'},
        ];
        this.contextMenuParam(event);
      },
      // 右键 模块
      moduleMenu(row, event) {
        this.secondClick(row);
        this.tableDetail = {};
        this.details = row;
        this.addID.secondID = row.id;
        this.lists = [
          {clickIndex: 'add3', headIcon: 'el-icon-edit-outline', label: '新增权限'},
          {clickIndex: 'reviseModule', headIcon: 'el-icon-edit-outline', label: '编辑'},
          {clickIndex: 'deleteModule', headIcon: 'el-icon-circle-close-outline', label: '删除'},
        ];
        this.contextMenuParam(event);
      },
      // 右键 权限
      modMenu(row, event) {
        this.tableDetail = {};
        this.details = row;
        this.lists = [
          {clickIndex: 'reviseMod', headIcon: 'el-icon-edit-outline', label: '编辑'},
          {clickIndex: 'deleteMod', headIcon: 'el-icon-circle-close-outline', label: '删除'},
        ];
        this.contextMenuParam(event);
      },
      stickTop() {
        document.body.scrollTop = document.documentElement.scrollTop = 0;
      },
      // 右键回调
      clickEvent(val) {
        switch (val) {
          case 'add2':
            this.onSubmit();
            this.moduleName = 'second';
            this.stickTop();
            break;
          case 'add3':
            this.onSubmit();
            this.moduleName = 'third';
            this.stickTop();
            break;
          case 'revise':
            this.title = '修改';
            this.moduleName = 'first';
            this.tableDetail = this.details;
            this.powerModule = true;
            break;
          case 'reviseModule':
            this.moduleName = 'second';
            this.tableDetail = this.details;
            this.title = '修改';
            this.powerModule = true;
            break;
          case 'reviseMod':
            this.moduleName = 'third';
            this.tableDetail = this.details;
            this.title = '修改';
            this.powerModule = true;
            break;
          case 'delete':
            this.openDelete(this.details, 'first');
            break;
          case 'deleteModule':
            this.openDelete(this.details, 'second');
            break;
          case 'deleteMod':
            this.openDelete(this.details, 'third');
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
      // ====================提示信息=================
      prompt(val, stu) {
        if (stu === 1) {
          this.$notify({
            title: '成功',
            message: val,
            type: 'success'
          });
        } else {
          this.$notify({
            title: '警告',
            message: val,
            type: 'warning'
          });
        }
      },
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
  .border_1 {
    padding: 10px;
    border: 1px solid #DDDDDD;
    -webkit-box-shadow: 0 0 10px 0 #DDDDDD;
    -moz-box-shadow: 0 0 10px 0 #DDDDDD;
    box-shadow: 0 0 10px 0 #DDDDDD;
    margin-bottom: 15px;
  }

  .el-table .success-row {
    background: #f0f9eb;
  }
</style>
