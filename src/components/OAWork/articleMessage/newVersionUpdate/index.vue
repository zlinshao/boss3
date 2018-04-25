<template>
  <div @click="show=false" @contextmenu="closeMenu">
    <div class="highRanking" style=" position: absolute; top: 120px; right: 20px;">
      <div class="highSearch">
        <el-form :inline="true" size="mini">
          <el-form-item>
            <el-input placeholder="请输入标题" v-model="form.keywords" size="mini" clearable
                      @keyup.enter.native="getLejiaTableData()">
              <el-button slot="append" icon="el-icon-search" @click="getLejiaTableData()"></el-button>
            </el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" size="mini" @click="highGrade">高级</el-button>
          </el-form-item>
          <el-form-item>
            <el-button type="success" @click="publicArticle">发布文章</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
    <div class="highRanking">
      <div class="filter high_grade" :class="isHigh? 'highHide':''" style=" margin-top: -40px;">
        <el-form :inline="true" :model="form" size="mini" label-width="100px">
          <div class="filterTitle">
            <i class="el-icons-fa-bars"></i>&nbsp;&nbsp;高级搜索
          </div>
          <!-- <el-row class="el_row_border">
            <el-col :span="12">
              <el-row>
                <el-col :span="8">
                  <div class="el_col_label">选择状态</div>
                </el-col>
                <el-col :span="16" class="el_col_option">
                  <el-form-item>
                    <el-select v-model="form.status" clearable placeholder="请选择状态">
                      <el-option v-for="(key,index) in dict.status" :label="key.dictionary_name" :value="key.id"
                                 :key="index"></el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
              </el-row>
            </el-col>
          </el-row> -->
          <div class="btnOperate">
            <el-button size="mini" type="primary" @click="getLejiaTableData()">搜索</el-button>
            <el-button size="mini" type="primary" @click="resetting">重置</el-button>
            <el-button size="mini" type="primary" @click="highGrade">取消</el-button>
          </div>
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
            prop="version"
            label="版本">
          </el-table-column>
          <el-table-column
            prop="content"
            label="内容">
          </el-table-column>
          <el-table-column
            prop="staffs.name"
            label="发布人">
            <template slot-scope="scope">
              <span v-if="scope.row.staffs && scope.row.staffs.real_name">{{scope.row.staffs && scope.row.staffs.real_name}}</span>
              <span v-if="!(scope.row.staffs && scope.row.staffs.real_name)">暂无</span>
            </template>
          </el-table-column>
          <el-table-column
            prop="create_time"
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
        },
        totalNum: 0,
        tableData: [],
        pitch: '',
        info:'',
        if_shows: '',
        moduleId: '',
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
        this.$router.push({path: '/Infodetails', query: {moduleType: this.moduleType}});
      },
      // 高级
      highGrade() {
        this.isHigh = !this.isHigh;
      },
      // 重置
      resetting() {
        this.isHigh = false;
        this.form.dict_id = '';
        this.form.keywords = '';
        this.getLejiaTableData();
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
          this.$http.get(this.urls + 'oa/portal/delete/' + id).then((res) => {
            if (res.data.code === '80040') {
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
      moduleId(val) {
        if (!val) {
          this.form.dict_id = 361;
        } else {
          this.form.dict_id = val;
        }
      },
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

</style>
