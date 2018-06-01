<template>
  <div @click="show=false">
    <div id="houseContainer">

      <div class="highRanking" style="margin-top: 10px">
        <div class="highSearch">
          <el-form :inline="true" onsubmit="return false" size="mini">
            <el-form-item>
              <el-input placeholder="请输入房屋地址" @keyup.enter.native="search" v-model="formInline.q" size="mini" clearable>
                <el-button slot="append" icon="el-icon-search" @click="search"></el-button>
              </el-input>
            </el-form-item>

            <el-form-item>
              <el-button type="primary" size="mini" @click="highGrade">高级</el-button>
            </el-form-item>

            <el-form-item>
              <el-button type="primary" @click="changelist">返回到报备列表</el-button>
            </el-form-item>
          </el-form>
        </div>
        <!--高級搜索-->
        <div class="filter high_grade" :class="isHigh? 'highHide':''">
          <el-form :inline="true" onsubmit="return false" size="mini" label-width="100px">
            <div class="filterTitle">
              <i class="el-icons-fa-bars"></i>&nbsp;&nbsp;高级搜索
            </div>
            <el-row class="el_row_border">
              <el-col :span="12">
                <el-row>
                  <el-col :span="8">
                    <div class="el_col_label">合同开始时间范围</div>
                  </el-col>
                  <el-col :span="16" class="el_col_option">

                  </el-col>
                </el-row>
              </el-col>
              <el-col :span="12">
                <el-row>
                  <el-col :span="8">
                    <div class="el_col_label">合同结束时间范围</div>
                  </el-col>
                  <el-col :span="16" class="el_col_option">

                  </el-col>
                </el-row>
              </el-col>
            </el-row>
            <div class="btnOperate">
              <el-button size="mini" type="primary" @click="search">搜索</el-button>
              <el-button size="mini" type="primary" @click="resetting">重置</el-button>
              <el-button size="mini" type="primary" @click="highGrade">取消</el-button>
            </div>
          </el-form>
        </div>
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
                label="修改时间">
                <template slot-scope="scope">
                  <span v-if="scope.row.created_at">{{scope.row.created_at}}</span>
                  <span v-else="">/</span>
                </template>
              </el-table-column>
              <el-table-column
                label="报备类型">
                <template slot-scope="scope">
                  <span v-if="scope.row.title">{{scope.row.title}}</span>
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
                label="修改字段">
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
                    <span v-for="item in scope.row.user.org">{{item.name}}&nbsp;</span>
                  </span>
                  <span v-else="">/</span>
                </template>
              </el-table-column>
              <el-table-column
                label="修改人">
                <template slot-scope="scope">
                  <span v-if="scope.row.flow.user">{{scope.row.flow.user.name}}</span>
                  <span v-else="">/</span>
                </template>
              </el-table-column>
              <el-table-column
                label="修改人所属部门">
                <template slot-scope="scope">
                  <span v-if="scope.row.flow.user">
                    <span v-for="item in scope.row.user.org">{{item.name}}&nbsp;</span>
                  </span>
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

        isHigh: false,
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
        this.isHigh = false;
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


      //高级搜索
      highGrade() {
        this.isHigh = !this.isHigh;
      },
      resetting() {

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
