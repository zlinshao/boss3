<template>
  <div @click="show=false" @contextmenu="closeMenu">

    <div class="highRanking">
      <div class="highSearch">
        <el-form :inline="true" size="mini">
          <el-form-item>
            <el-input placeholder="请输入标题" v-model="form.keywords" size="mini" clearable
                      @keyup.enter.native="getCompanyTableData()">
              <el-button slot="append" icon="el-icon-search" @click="getCompanyTableData()"></el-button>
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

      <div class="filter high_grade" :class="isHigh? 'highHide':''">
        <el-form :inline="true" :model="form" size="mini" label-width="100px">
          <div class="filterTitle">
            <i class="el-icons-fa-bars"></i>&nbsp;&nbsp;高级搜索
          </div>
          <el-row class="el_row_border">
            <el-col :span="12">
              <el-row>
                <el-col :span="8">
                  <div class="el_col_label">选择类别</div>
                </el-col>
                <el-col :span="16" class="el_col_option">
                  <el-form-item>
                    <el-select v-model="moduleId" clearable placeholder="请选择类别">
                      <el-option v-for="(key,index) in dict.region" :label="key.dictionary_name" :value="key.id"
                                 :key="index"></el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
              </el-row>
            </el-col>
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
          </el-row>
          <div class="btnOperate">
            <el-button size="mini" type="primary" @click="getCompanyTableData()">搜索</el-button>
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
          @row-contextmenu='openContextMenu'
          @cell-dblclick='openDetail'
          style="width: 100%">
          <el-table-column
            prop="title"
            label="标题">
          </el-table-column>
          <el-table-column
            prop="dict_ids"
            label="类型">
          </el-table-column>
          <el-table-column
            prop="staffs.name"
            label="发布人">
          </el-table-column>
          <el-table-column
            prop="create_time"
            label="创建时间">
          </el-table-column>
          <el-table-column
            label="状态">
            <template slot-scope="scope">
              <el-button class="btnStatus" v-if="scope.row.statuss === '已发布'" type="primary" size="mini">
                {{scope.row.statuss}}
              </el-button>
              <el-button class="btnStatus" v-if="scope.row.statuss === '已结束'" type="warning" size="mini">
                {{scope.row.statuss}}
              </el-button>
              <el-button class="btnStatus" v-if="scope.row.statuss === '草稿'" type="info" size="mini">
                {{scope.row.statuss}}
              </el-button>
              <el-tag type="success" v-if="scope.row.top !== null ">置顶</el-tag>
              <el-tag type="warning" v-if="scope.row.fine !==null ">精华</el-tag>
            </template>
          </el-table-column>
        </el-table>
      </div>

      <div class="block pages">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="form.pages"
          :page-size="form.list"
          layout="total, prev, pager, next, jumper"
          :total="totalNum">
        </el-pagination>
      </div>
    </div>

    <RightMenu :startX="rightMenuX+'px'" :startY="rightMenuY+'px'" :list="lists" :show="show"
               @clickOperateMore="clickEvent"></RightMenu>

    <Organization :organizationDialog="organizationDialog" @close="closeOrganization"></Organization>
    <eat-loading :loading="loading"></eat-loading>
  </div>
</template>

<script>
  import RightMenu from '../../../common/rightMenu.vue'    //右键
  import Organization from '../../../common/organization.vue'
  import EatLoading from '../../../common/eatLoading.vue'

  export default {
    components: {RightMenu, Organization, EatLoading},
    name: 'company-portal',
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
          list: 12,
          dict_id: 377,
          status: '',
          keywords: '',
          pages: 1,
        },
        totalNum: 0,
        tableData: [],
        pitch: '',
        if_shows: '',
        organizationDialog: false,
        moduleId: '',
        moduleType: 'companyPortal',
        loading: false,
      }
    },
    mounted() {
      this.getCompanyTableData();
      this.getDict();
    },
    activated() {
      let refresh = this.$route.query.refresh;
      if (refresh) {
        this.getCompanyTableData();
      }
    },
    created() {
      this.form.pages = this.currentPage;
    },
    watch: {
      moduleId(val) {
        if (!val) {
          this.form.dict_id = 377;
        } else {
          this.form.dict_id = val;
        }
      },
    },
    computed: {
      currentPage() {
        return this.$store.state.article.company_page;
      }
    },
    methods: {
      getDict() {
        this.$http.get(this.urls + 'setting/dictionary/377').then((res) => {
          this.dict.region = res.data.data;
        });
        this.$http.get(this.urls + 'setting/dictionary/147').then((res) => {
          this.dict.status = res.data.data;
        });
      },
      getCompanyTableData() {
        this.loading = true;
        this.$http.get(this.urls + 'oa/portal/', {params: this.form}).then((res) => {
          this.isHigh = false;
          if (res.data.code === '80000') {
            this.tableData = res.data.data.data;
            this.totalNum = res.data.data.count;
            this.loading = false;
          } else {
            this.tableData = [];
            this.totalNum = 0;
            this.loading = false;
          }

        })
      },
      openDetail(row) {
        var data = {ids: row.id, detail: 'port'};
        this.$store.dispatch('articleDetail', data);
        this.$router.push({path: '/Infodetails', query: data});
      },
      // 高级
      highGrade() {
        this.isHigh = !this.isHigh;
      },
      // 重置
      resetting() {
        this.isHigh = false;
        this.form.dict_id = '';
        this.form.status = '';
        this.form.keywords = '';
        this.getCompanyTableData();
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
        this.form.pages = val;
        this.$store.dispatch('companyPage', val);
        this.getCompanyTableData();

      },

      // 右键
      openContextMenu(row, event) {
        this.pitch = row.id;
        if (row.statuss !== '已发布') {
          this.statuss = '已发布';
          this.lists = [
            {clickIndex: 'revise', headIcon: 'el-icon-edit-outline', label: '编辑'},
            {clickIndex: 'delete', headIcon: 'el-icon-circle-close-outline', label: '删除'},
            {clickIndex: 'grounding', headIcon: 'el-icon-circle-close-outline', label: '上架'},
          ];
        } else {
          this.statuss = '已结束';
          if (row.top === null && row.fine === null) {
            this.lists = [
              {clickIndex: 'undercarriage', headIcon: 'el-icon-edit-outline', label: '下架',},
              {clickIndex: 'top', headIcon: 'el-icon-edit-outline', label: '置顶',},
              {clickIndex: 'essence', headIcon: 'el-icon-edit-outline', label: '精华',},
            ];
          } else if (row.top !== null && row.fine === null) {
            this.lists = [
              {clickIndex: 'undercarriage', headIcon: 'el-icon-edit-outline', label: '下架', top: true},
              {clickIndex: 'top', headIcon: 'el-icon-edit-outline', label: '取消置顶',},
              {clickIndex: 'essence', headIcon: 'el-icon-edit-outline', label: '精华',},
            ];
          } else if (row.top === null && row.fine !== null) {
            this.lists = [
              {clickIndex: 'undercarriage', headIcon: 'el-icon-edit-outline', label: '下架', fine: true},
              {clickIndex: 'top', headIcon: 'el-icon-edit-outline', label: '置顶',},
              {clickIndex: 'essence', headIcon: 'el-icon-edit-outline', label: '取消精华',},
            ];
          } else {
            this.lists = [
              {clickIndex: 'undercarriage', headIcon: 'el-icon-edit-outline', label: '下架', top: true, fine: true},
              {clickIndex: 'top', headIcon: 'el-icon-edit-outline', label: '取消置顶',},
              {clickIndex: 'essence', headIcon: 'el-icon-edit-outline', label: '取消精华',},
            ];
          }

        }
        this.contextMenuParam(event);
      },
      // 右键回调
      clickEvent(val) {
        switch (val.clickIndex) {
          case 'revise':
            this.$router.push({path: '/publicArticle', query: {ids: this.pitch, moduleType: this.moduleType}});
            this.$store.dispatch('moduleType', this.moduleType);
            break;
          case 'delete':
            this.deleteInfo(this.pitch);
            break;
          case 'grounding':
            var top_fine = {};
            this.upperShelf(this.pitch, '上架', top_fine);
            break;
          case 'undercarriage':
            var top_fine = {};
            if (val.top) {
              top_fine.top = true;
            }
            if (val.fine) {
              top_fine.fine = true;
            }
            this.upperShelf(this.pitch, '下架', top_fine);
            break;
          case 'top':
            this.top(this.pitch, '置顶');
            break;
          case 'essence':
            this.essence(this.pitch, '精华');
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
      // 组织架构
      openOrganizationModal() {
        this.organizationDialog = true
      },
      closeOrganization() {
        this.organizationDialog = false;
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
              this.getCompanyTableData();
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

      // 上架下架
      upperShelf(id, title, status) {
        this.$confirm('此操作将' + title + '文章, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$http.get(this.urls + 'oa/portal/if_show/' + id).then((res) => {
            if (res.data.code === '80080' || res.data.code === '80010') {
              this.getCompanyTableData();
              this.prompt(1, res.data.msg);
              if (title === '下架') {
                if (status.top) {
                  this.top(id, '置顶');
                }
                if (status.fine) {
                  this.essence(id, '精华');
                }
              }
            } else {
              this.prompt(2, res.data.msg);
            }
          });
        }).catch(() => {
          this.$notify.info({
            title: '提示',
            message: '已取消操作'
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

      //置顶
      top(id, info) {
        this.$http.put(globalConfig.server + "oa/portal/status/" + id, {type: 'top'}).then((res) => {
          if (res.data.code == "800100" || res.data.code == "800110") {
            this.$notify.success({
              title: '成功',
              message: res.data.msg
            });
            this.getCompanyTableData();
            this.getDict();
          }
        });
      },
      //精华
      essence(id, info) {
        this.$http.put(globalConfig.server + "oa/portal/status/" + id, {type: 'fine'}).then((res) => {
          if (res.data.code == "800100" || res.data.code == "800110") {
            this.$notify.success({
              title: '成功',
              message: res.data.msg
            });
            this.getCompanyTableData();
            this.getDict();
          }
        });
      },
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
