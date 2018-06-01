<template>
  <div @click="show=false">
    <div id="houseContainer">

      <div class="filter" style="text-align: right">
        <el-form :inline="true" size="mini" onsubmit="return false">
          <el-form-item>
            <el-input placeholder="请选择员工" @focus="selectStaff" v-model="staff_name" readonly  size="mini">
              <el-button slot="append" @click="clearStaff">清空</el-button>
            </el-input>
          </el-form-item>

          <el-form-item>
            <el-button type="primary" @click="changelist">返回到报备列表</el-button>
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
                label="修改时间">
                <template slot-scope="scope">
                  <span v-if="scope.row.create_time">{{scope.row.create_time}}</span>
                  <span v-else="">/</span>
                </template>
              </el-table-column>
              <el-table-column
                label="报备类型"
                width="80">
                <template slot-scope="scope">
                  <span v-if="scope.row.type_name">{{scope.row.type_name}}</span>
                  <span v-else="">/</span>
                </template>
              </el-table-column>

              <el-table-column
                label="房屋地址">
                <template slot-scope="scope">
                  <span v-if="scope.row.address">{{scope.row.address}}</span>
                  <span v-else="">/</span>
                </template>
              </el-table-column>

              <el-table-column
                label="修改字段" width="400">
                <template slot-scope="scope" >
                  <span v-if="scope.row.diff&&Object.keys(scope.row.diff).length>0">
                    <span v-for="(value,key) in scope.row.diff">
                      {{key}},
                    </span>
                  </span>
                  <span v-else="">/</span>
                </template>
              </el-table-column>
              <el-table-column
                label="报备人">
                <template slot-scope="scope">
                  <span v-if="scope.row.staff_name">{{scope.row.staff_name}}</span>
                  <span v-else="">/</span>
                </template>
              </el-table-column>
              <el-table-column
                label="报备人部门">
                <template slot-scope="scope">
                  <span v-if="scope.row.department_name">
                   {{scope.row.department_name}}
                  </span>
                  <span v-else="">/</span>
                </template>
              </el-table-column>
              <el-table-column
                label="修改人">
                <template slot-scope="scope">
                  <span v-if="scope.row.staffs">{{scope.row.staffs.name}}</span>
                  <span v-else="">/</span>
                </template>
              </el-table-column>
              <el-table-column
                label="修改人所属部门">
                <template slot-scope="scope">
                  <span v-if="scope.row.staffs">
                    <span v-for="item in scope.row.staffs.org">{{item.name}}&nbsp;</span>
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
                :page-size="formInline.limit"
                layout="total, sizes, prev, pager, next, jumper"
                :total="totalNumber">
              </el-pagination>
            </div>
          </div>
        </div>
      </div>
    </div>

    <ReportDetail :module="reportDetailDialog" :reportId="reportId" @close="closeModal"></ReportDetail>

    <Organization :organizationDialog="organizationDialog" :length="length" :type="type"
                  @selectMember="selectMember" @close="closeModal"></Organization>

  </div>
</template>

<script>
  import RightMenu from '../../common/rightMenu.vue'
  import ReportDetail from './editReportDetail'
  import Organization from '../../common/organization'
  export default {
    components: {RightMenu,ReportDetail,Organization},
    data () {
      return {
        rightMenuX: 0,
        rightMenuY: 0,
        show: false,
        lists: [],
        /***********/
        formInline: {
          limit: 12,
          page: 1,
          staff_id:'',
        },
        staff_name : '',
        tableData: [],
        totalNumber:0,
        emptyContent: ' ',
        tableLoading: false,
        reportDetailDialog : false,
        organizationDialog : false,
        length:'',
        type:'',
        reportId:'',

        isHigh: false,
      }
    },
    mounted(){
      this.getData();
    },
    methods: {
      getData(){
        this.emptyContent = ' ';
        this.tableLoading = true;
        this.$http.get(globalConfig.server + 'bulletin/diff', {params: this.formInline}).then((res) => {
          this.tableLoading = false;
          if(res.data.code === '20000'){
            this.totalNumber = res.data.data.count;
            this.tableData = res.data.data.data;
          }else {
            this.totalNumber = 0;
            this.tableData = [];
            this.emptyContent = '暂无数据';
          }
        })
      },
      search(){
        this.formInline.page = 1;
        this.getData();
      },

      handleSizeChange(val) {
        this.formInline.limit = val;
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
        this.reportId = row.processable_id;
      },
      selectStaff(){
        this.length = 1;
        this.type = 'staff';
        this.organizationDialog = true;
      },
      closeModal(){
        this.reportDetailDialog = false;
        this.organizationDialog = false;
      },
      selectMember(val){
        this.formInline.staff_id = val[0].id;
        this.staff_name = val[0].name;
        this.search();
      },
      clearStaff(){
        this.formInline.staff_id = '';
        this.staff_name = '';
        this.search();
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
