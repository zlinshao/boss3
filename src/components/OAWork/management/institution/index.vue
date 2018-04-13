<template>
  <div>

    <div class="highRanking">
      <div class="highSearch">
        <el-form :inline="true" size="mini">
          <el-form-item>
            <el-input placeholder="请输入标题" v-model="form.keywords" size="mini" clearable
                      @keyup.enter.native="getSystemTableData()">
              <el-button slot="append" icon="el-icon-search" @click="getSystemTableData()"></el-button>
            </el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" size="mini" @click="highGrade">高级</el-button>
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
            <el-button size="mini" type="primary" @click="getSystemTableData()">搜索</el-button>
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
    <Organization :organizationDialog="organizationDialog" @close="closeOrganization"></Organization>
    <!--<eat-loading :loading="loading"></eat-loading>-->
  </div>
</template>

<script>
  import Organization from '../../../common/organization.vue'
  import EatLoading from '../../../common/eatLoading.vue'

  export default {
    name: 'system-management',
    components: {Organization, EatLoading},
    data() {
      return {
        urls: globalConfig.server,
        rightMenuX: 0,
        rightMenuY: 0,
        isHigh: false,
        lists: [],
        /***********/
        dict: {
          region: [],
          status: [],
        },
        form: {
          list: 12,
          dict_id: 380,
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
        moduleType: 'systemManageMent',
        collectStatus: ' ',
        collectLoading: false,
      }
    },
    mounted() {
      this.getSystemTableData(1);
      this.getDict();
    },
    created() {
      this.form.pages = this.currentPage;
    },
    watch: {
      moduleId(val) {
        if (!val) {
          this.form.dict_id = 380;
        } else {
          this.form.dict_id = val;
        }
      },
    },
    computed: {
      currentPage() {
        return this.$store.state.article.system_page;
      }
    },
    methods: {
      getDict() {
        this.$http.get(this.urls + 'setting/dictionary/380').then((res) => {
          this.dict.region = res.data.data;
        });
        this.$http.get(this.urls + 'setting/dictionary/147').then((res) => {
          this.dict.status = res.data.data;
        });
      },
      getSystemTableData() {
        this.collectLoading = true;
        this.collectStatus = ' ';
        this.$http.get(this.urls + 'oa/portal/', {params: this.form}).then((res) => {
          this.isHigh = false;
          this.collectLoading = false;
          if (res.data.code === '80000') {
            this.tableData = res.data.data.data;
            this.totalNum = res.data.data.count;
          } else {
            this.collectStatus = '暂无数据';
            this.tableData = [];
            this.totalNum = 0;
          }
        })
      },
      // 详情
      openDetail(row) {
        var data = {ids: row.id};
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
        this.getSystemTableData(1);
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
        this.$store.dispatch('systemPage', val);
        this.getSystemTableData();

      },
      // 组织架构
      openOrganizationModal() {
        this.organizationDialog = true
      },
      closeOrganization() {
        this.organizationDialog = false;
      },

      // 提示信息
      prompt(val, info) {
        if (val === 1) {
          this.$message({
            type: 'success',
            message: info,
          });
        } else {
          this.$message({
            type: 'info',
            message: info,
          });
        }
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
