<template>
  <div @click="show=false">
    <div id="houseContainer">

      <div class="filter" style="text-align: right">
        <el-form :inline="true" size="mini" onsubmit="return false">
          <el-form-item>
            <el-input placeholder="请输入房屋地址" @keyup.enter.native="search" v-model="formInline.q" size="mini" clearable>
              <el-button slot="append" icon="el-icon-search" @click="search"></el-button>
            </el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="changelist">查看报备修改记录</el-button>
          </el-form-item>
        </el-form>
      </div>

      <div class="main">
        <div class="tableBox">
          <div class="myTable">
            <el-table
              :data="tableData"
              :empty-text='emptyContent'
              v-loading="tableLoading"
              element-loading-text="拼命加载中"
              element-loading-spinner="el-icon-loading"
              element-loading-background="rgba(255, 255, 255, 0)"
              @row-dblclick="dblClickTable"
              @row-click='clickTable'
              :row-class-name="tableRowCollectName"
              style="width: 100%">

              <el-table-column
                label="报备类型">
                <template slot-scope="scope">
                  <span v-if="scope.row.title">{{scope.row.title}}</span>
                  <span v-else="">/</span>
                </template>
              </el-table-column>
              <el-table-column
                label="报备时间">
                <template slot-scope="scope">
                  <span v-if="scope.row.created_at">{{scope.row.created_at}}</span>
                  <span v-else="">/</span>
                </template>
              </el-table-column>
              <el-table-column
                label="房屋地址">
                <template slot-scope="scope">
                  <span v-if="scope.row.flow&&scope.row.flow.content">{{scope.row.flow.content.address}}</span>
                  <span v-else="">/</span>
                </template>
              </el-table-column>

              <el-table-column
                label="报备人">
                <template slot-scope="scope">
                  <span v-if="scope.row.flow.user">{{scope.row.flow.user.name}}</span>
                  <span v-else="">/</span>
                </template>
              </el-table-column>
              <el-table-column
                label="部门">
                <template slot-scope="scope">
                  <span v-if="scope.row.flow.user">
                    <span v-for="item in scope.row.flow.user.org">{{item.name}}&nbsp;</span>
                  </span>
                  <span v-else="">/</span>
                </template>
              </el-table-column>
              <el-table-column
                label="审批状态">
                <template slot-scope="scope">
                  <span v-if="scope.row.flow&&scope.row.flow.place">{{scope.row.flow.place.display_name}}</span>
                  <span v-else="">/</span>
                </template>
              </el-table-column>
            </el-table>
          </div>
          <div class="tableBottom">
            <div class="left">
              <el-pagination
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page="formInline.page"
                :page-sizes="[12, 20, 30, 40]"
                :page-size="formInline.per_page_number"
                layout="total, sizes, prev, pager, next, jumper"
                :total="totalNumber">
              </el-pagination>
            </div>
          </div>
        </div>
      </div>
    </div>
    <ReportDetail :module="reportDetailDialog" :reportId="reportId" @close="closeModal"></ReportDetail>
  </div>
</template>

<script>
  import RightMenu from '../../common/rightMenu.vue'
  import ReportDetail from './editReportDetail'
  export default {
    components: {RightMenu,ReportDetail},
    data () {
      return {
        rightMenuX: 0,
        rightMenuY: 0,
        show: false,
        lists: [],
        /***********/
        formInline: {
          q: '',
          per_page_number:12,
          page: 1,
        },

        tableData: [],
        totalNumber:0,
        emptyContent: ' ',
        tableLoading: false,
        reportDetailDialog : false,
        reportId:'',
      }
    },
    mounted(){
      this.getData();
      this.getDictionary();
    },
    methods: {
      getDictionary() {
        this.$http.get(globalConfig.server + 'setting/dictionary/all').then((res) => {
          this.all_dic = res.data.data;
        })
      },

      matchDictionary(id) {
        let dictionary_name = null;
        this.all_dic.map((item) => {
          if (item.id == id) {
            dictionary_name = item.dictionary_name;
          }
        });
        return dictionary_name;
      },
      getData(){
        this.emptyContent = ' ';
        this.tableLoading = true;
        this.$http.get(globalConfig.server_user + 'process', {params: this.formInline}).then((res) => {
          this.tableLoading = false;
          if (res.data.status === 'success') {
            this.totalNumber = res.data.meta.total;
            if (res.data.data.length > 0) {
              this.tableData = res.data.data;
            } else {
              this.tableData = [];
              this.emptyContent = '暂无数据';
            }
          } else {
            this.tableData = [];
            this.totalNumber = 0;
            this.emptyContent = '暂无数据';
          }
        })
      },
      search(){
        this.formInline.page = 1;
        this.getData();
      },

      handleSizeChange(val) {
        this.formInline.per_page_number = val;
        this.getData();
      },
      handleCurrentChange(val) {
        this.formInline.page = val;
        this.getData();
      },

      //************************************************************************/
      clickTable(row, event){
        this.houseId = row.id;
      },
      tableRowCollectName({row, rowIndex}) {
        if (row.id === this.houseId) {
          return 'selected_tr';
        }
        return '';
      },

      dblClickTable(row, event){
        this.reportDetailDialog = true;
        this.reportId = row.flow.id;
      },
      closeModal(){
        this.reportDetailDialog = false;
      },

      changelist(){
        this.$store.dispatch('toEditList')
      },
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped="">
  #houseContainer {
    .earlyWarning {
      button {
        cursor: default;
        color: #666;
        :hover {
          /*color: #6a8dfb;*/
        }
      }
    }
    .label {
      display: inline-block;
      width: 70px;
      height: 30px;
      line-height: 30px;
      text-align: center;
      border-radius: 4px;
      color: #ffffff;
    }
    .success {
      background: #409EFF;
    }
    .yellow {
      background: #FFCC00
    }
    .orange {
      background: #FF9900
    }
    .red {
      background: #FF3900
    }
    .main {
      font-size: 12px;
      .tableBottom {
        padding: 8px;
        display: flex;
        justify-content: flex-end;
        .right {
          display: flex;
          align-items: center;
          div {
            width: 100px;
            text-align: center;
            span {
              color: #fb529f;
            }
            &:first-child {
              border-right: 1px solid #ccc;
            }
          }
        }
      }
    }
  }
</style>
