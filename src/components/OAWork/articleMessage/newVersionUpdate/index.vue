<template>
  <div @click="show=false" @contextmenu="closeMenu">
    <div class="highRanking" style=" position: absolute; top: 120px; right: 20px;">
      <div class="highSearch">
        <el-form :inline="true" size="mini">
          <el-form-item>
            <el-input placeholder="请输入关键字" v-model="keyword" size="mini" clearable @keyup.enter.native="search">
              <el-button slot="append" icon="el-icon-search" @click="search"></el-button>
            </el-input>
          </el-form-item>

          <el-form-item>
            <el-button type="success" @click="publicArticle">发布文章</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>

    <div class="main">
      <div class="blueTable left_table">
        <el-table
          :data="tableData"
          :empty-text='collectStatus'
          v-loading="collectLoading"
          element-loading-text="拼命加载中"
          element-loading-spinner="el-icon-loading"
          element-loading-background="rgba(255, 255, 255, 0)"
          @row-contextmenu='openContextMenu'
          @cell-dblclick='openDetail'
          style="width: 100%">
          <el-table-column
            width="100px"
            label="版本类型">
            <template slot-scope="scope">
              <span v-if="scope.row.type ==673">大版本</span>
              <span v-else-if="scope.row.type ==674">小版本</span>
              <span v-else>boss3(app,安卓)</span>
            </template>
          </el-table-column>
          <el-table-column
            prop="version"
            width="300px"
            label="版本">
          </el-table-column>
          <el-table-column
            label="内容">
            <template slot-scope="scope">
            <div  style=" height:41px;display:block;word-break:keep-all;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;">
            <span class="mpn" v-html="scope.row.content"></span>
            </div>
            </template>
          </el-table-column>
          <el-table-column
            prop="staffs.name"
            width="300px"
            label="发布人">
            <template slot-scope="scope">
              <span v-if="scope.row.staffs && scope.row.staffs.real_name">{{scope.row.staffs && scope.row.staffs.real_name}}</span>
              <span v-if="!(scope.row.staffs && scope.row.staffs.real_name)">暂无</span>
            </template>
          </el-table-column>
          <el-table-column
            prop="create_time"
            width="300px"
            label="创建时间">
          </el-table-column>
        </el-table>
      </div>

      <div class="block pages">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="form.page"
          :page-size="form.limit"
          layout="total, prev, pager, next, jumper"
          :total="totalNum">
        </el-pagination>
      </div>
    </div>

    <RightMenu :startX="rightMenuX+'px'" :startY="rightMenuY+'px'" :list="lists" :show="show"
               @clickOperateMore="clickEvent"></RightMenu>

    <!--<eat-loading :loading="loading"></eat-loading>-->
  </div>
</template>

<script>
  import RightMenu from '../../../common/rightMenu.vue'    //右键
  import EatLoading from '../../../common/eatLoading.vue'

  export default {
    components: {RightMenu, EatLoading},
    name: 'lejia-college',
    data() {
      return {
        urls: globalConfig.server,
        rightMenuX: 0,
        rightMenuY: 0,
        show: false,
        isHigh: false,
        lists: [],
        /***********/
        dict: {
          region: [],
          status: [],
        },
        form: {
          limit: 12,
          page: 1,
          keywords:"",
        },
        keyword:"",
        totalNum: 0,
        tableData: [],
        pitch: '',
        info:'',
        moduleType: 'newVersionUpdate',
        collectStatus: ' ',
        collectLoading: false,
      }
    },
    mounted() {
      this.getLejiaTableData();
    },
    activated() {
      let refresh = this.$route.query.refresh;
      if (refresh) {
        this.getLejiaTableData();
      }
    },
    created() {
      this.form.page = this.currentPage;
    },
    methods: {
      search(){
        this.form.page = 1;
        this.getLejiaTableData();
      },
      getLejiaTableData() {
        this.collectLoading = true;
        this.collectStatus = ' ';
        this.$http.get(this.urls + 'setting/update/',{params: this.form}).then((res) => {
          this.isHigh = false;
          this.collectLoading = false;
          if (res.data.code === '50020') {
            this.tableData = res.data.data.data;
            this.totalNum = res.data.data.count;
          } else {
            this.collectStatus = '暂无数据';
            this.tableData = [];
            this.totalNum = 0;
          }
        });
      },
      // 详情
      openDetail(row) {
        this.$store.dispatch('newversion',row);
        this.$router.push({path: '/Infodetails', query: {moduleType: this.moduleType, from: 'publicArticleBtn'}});
      },
      // 高级
      highGrade() {
        this.isHigh = !this.isHigh;
      },
      // 重置
      resetting() {
        this.form.keywords = '';
        this.search();
      },
      // 文章发布
      publicArticle() {
        this.$store.dispatch('deleteArticleId');
        this.$router.push({path: '/publicArticle', query: {moduleType: this.moduleType}});
        this.$store.dispatch('moduleType', this.moduleType);
      },
      handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
      },
      handleCurrentChange(val) {
        console.log(`当前页: ${val}`);
        this.form.page = val;
        this.$store.dispatch('lejiaPage', val);
        this.getLejiaTableData();
      },

      // 右键
      openContextMenu(row, event) {
        this.pitch = row.id;
        this.info = row;
          this.lists = [
            {clickIndex: 'revise', headIcon: 'iconfont icon-bianji--', label: '编辑'},
            {clickIndex: 'delete', headIcon: 'el-icon-delete', label: '删除'},
          ];

        this.contextMenuParam(event);
      },
      // 右键回调
      clickEvent(val) {
        switch (val.clickIndex) {
          case 'revise':
            this.$router.push({path: '/publicArticle', query: {ids: this.pitch, moduleType: this.moduleType}});
            this.$store.dispatch('moduleType', this.moduleType);
            this.$store.dispatch('newversion',this.info);
            break;
          case 'delete':
            this.deleteInfo(this.pitch);
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
      // 删除
      deleteInfo(id) {
        this.$confirm('删除后不可恢复, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$http.get(this.urls + 'setting/update/delete/' + id).then((res) => {
            if (res.data.code === '50060') {
              this.getLejiaTableData();
              this.prompt(1, res.data.msg);
            } else {
              this.prompt(2, res.data.msg);
            }
          });
        }).catch(() => {
          this.$notify.info({
            title: '提示',
            message: '已取消删除'
          });
        });
      },



      // 提示信息
      prompt(val, info) {
        if (val === 1) {
          this.$notify.success({
            title: '成功',
            message: info,
          });
        } else {
          this.$notify.warning({
            title: '提示',
            message: info,
          });
        }
      },


    },
    watch: {
      keyword(val){
        this.form.keywords = val;
        if( val == ""){
           this.getLejiaTableData();
        }

      }
    },
    computed: {
      currentPage() {
        return this.$store.state.article.lejia_page;
      }
    },

  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
  .el-table th {
    text-align: left !important;
  }

  .el-table__body td {
    text-align: left !important;
  }

  .btnStatus {
    cursor: inherit;
    min-width: 68px;
  }
  .mpn p{
    line-height: 0px;
  }

</style>
