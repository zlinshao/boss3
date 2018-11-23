<template>
  <div>
    <div class="highRanking" style=" position: absolute; top: 122px; right: 45px;">
      <div class="highHide">
        <el-button size="mini" type="primary" @click="openReviseCompany"><i class="el-icon-plus"></i>&nbsp;新增关联</el-button>
      </div>
    </div>
    <el-table
      :data="tableData"
      :empty-text='tableStatus'
      v-loading="tableLoading"
      element-loading-text="拼命加载中"
      element-loading-spinner="el-icon-loading"
      element-loading-background="rgba(255, 255, 255, 0)"
      @row-contextmenu="contextMenu"
      @row-click="show = false">
      style="width: 100%">
      <el-table-column
        prop="organization[0].name"
        label="片区名称">
      </el-table-column>
      <el-table-column
        prop="company[0].name"
        label="所属公司">
      </el-table-column>
      <el-table-column
        prop="start_date"
        label="开始时间">
      </el-table-column>
    </el-table>
    <div class="block pages">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="params.page"
        :page-size="params.limit"
        layout="total, prev, pager, next, jumper"
        :total="totalNum">
      </el-pagination>
    </div>

    <ReviseCompany :reviseCompanyDialog="reviseCompanyDialog" @close="closeModal"></ReviseCompany>
     <!--右键-->
    <RightMenu :startX="rightMenuX+'px'" :startY="rightMenuY+'px'" :list="lists" :show="show"
               @clickOperate="clickEvent"></RightMenu>
  </div>
</template>

<script>
  import ReviseCompany from './components/reviseCompany.vue'
  import RightMenu from '../../../common/rightMenu.vue'    //右键
  export default {
    components: {ReviseCompany,RightMenu},
    name: 'company-manage',
    data() {
      return {
        reviseCompanyDialog: false,
        tableData: [],
        roleModule: false,
        params: {
          page: 1,
          limit: 12,
        },
        tableStatus: ' ',
        tableLoading: false,
        totalNum: 0,
        tableDetail: {},
        details: {},
        rightMenuX: 0,
        rightMenuY: 0,
        show: false,
        lists: [],
      }
    },
    mounted() {
      this.getTableData();
    },
    methods: {
      getTableData() {
        this.tableStatus = ' ';
        this.tableLoading = true;
        this.$http.get(globalConfig.server + 'organization/companyorg',{
          params: this.params,
        }).then((res) => {
          this.tableLoading = false;
          if (res.data.code === "71000") {
            this.tableData = res.data.data.data;
            this.totalNum = res.data.data.count;
            if (res.data.data.data < 1) {
              this.tableData = [];
              this.totalNum = 0;
              this.tableStatus = '暂无数据';
            }
          } else {
            this.tableData = [];
            this.totalNum = 0;
            this.tableStatus = '暂无数据';
          }
        })
      },
      // 新增
      openReviseCompany() {
        this.reviseCompanyDialog = true;
      },
      //modal 关闭回调
      closeModal(val) {
        this.reviseCompanyDialog = false;
        if (val === 'success') {
          this.params.page = 1;
          this.getTableData();
        }
      },
      handleSizeChange(val) {

      },
      handleCurrentChange(val) {
        this.params.page = val;
        this.getTableData();
      },
      // 右键 
      contextMenu(row, event) {
        this.details = row;
        this.lists = [
          {clickIndex: 'deleteCompany', headIcon: 'el-icon-circle-close-outline', label: '删除'},
        ];
        this.contextMenuParam(event);
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
      // 右键回调
      clickEvent(val) {
        switch (val) {
          case 'deleteCompany':
            this.openDelete(this.details);
            break;
        }
      },
      // 删除
      openDelete(id) {
        this.$confirm('此操作将删除该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$http.get(globalConfig.server + 'organization/companyorg/delete/' + id.id).then((res) => {
            if (res.data.code === '71040') {
              this.show = false;
              this.prompt('success', '删除成功');
              this.getTableData();
            } else {
              this.prompt('warning', res.data.msg);
            }
          });
        }).catch(() => {
          this.show = false;
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });
      },
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">

</style>
