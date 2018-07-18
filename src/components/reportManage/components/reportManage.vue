<template>
  <div @click="show=false">
    <div id="houseContainer">
      <div class="filter" style="text-align: right">
        <el-form :inline="true" size="mini" onsubmit="return false">
          <el-form-item>
            <el-input placeholder="请输入房屋地址" @keyup.enter.native="search" v-model="params.q" size="mini" clearable>
              <el-button slot="append" icon="el-icon-search" @click="search"></el-button>
            </el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" size="mini" @click="highGrade">高级</el-button>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="changelist">报备修改记录</el-button>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="reportData">报备数据汇总</el-button>
          </el-form-item>
        </el-form>
      </div>
      <div class="highRanking">
        <div class="filter high_grade" :class="isHigh? 'highHide':''" style=" margin-top: -40px;">
          <el-form :inline="true" onsubmit="return false" size="mini" label-width="100px">
            <div class="filterTitle">
              <i class="el-icons-fa-bars"></i>&nbsp;&nbsp;高级搜索
            </div>
            <el-row class="el_row_border">
              <el-col :span="12">
                <el-row>
                  <el-col :span="8">
                    <div class="el_col_label">开始时间</div>
                  </el-col>
                  <el-col :span="16" class="el_col_option">
                    <el-form-item>
                      <el-date-picker
                        v-model="params.start_time"
                        type="date"
                        value-format="yyyy-MM-dd"
                        placeholder="开始日期">
                      </el-date-picker>
                    </el-form-item>
                  </el-col>
                </el-row>
              </el-col>
              <el-col :span="12">
                <el-row>
                  <el-col :span="8">
                    <div class="el_col_label">结束时间</div>
                  </el-col>
                  <el-col :span="16" class="el_col_option">
                    <el-form-item>
                      <el-date-picker
                        v-model="params.end_time"
                        type="date"
                        value-format="yyyy-MM-dd"
                        placeholder="结束日期">
                      </el-date-picker>
                    </el-form-item>
                  </el-col>
                </el-row>
              </el-col>
            </el-row>
            <el-row class="el_row_border">
              <el-col :span="12">
                <el-row>
                  <el-col :span="8">
                    <div class="el_col_label">报备类型</div>
                  </el-col>
                  <el-col :span="16" class="el_col_option">
                    <el-form-item>
                      <el-select clearable v-model="params.processable_type" placeholder="请选择跟进状态" value="">
                        <el-option v-for="item in processableType" :label="item.name" :value="item.key"
                                   :key="item.key"></el-option>
                      </el-select>
                    </el-form-item>
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
              :empty-text='tableStatus'
              v-loading="tableLoading"
              element-loading-text="拼命加载中"
              element-loading-spinner="el-icon-loading"
              element-loading-background="rgba(255, 255, 255, 0)"
              @row-dblclick="dblClickTable"
              :row-class-name="tableRowCollectName"
              style="width: 100%">
              <el-table-column
                prop="created_at"
                label="发起时间">
              </el-table-column>
              <el-table-column
                prop="bulletin"
                label="报备类型">
              </el-table-column>
              <el-table-column
                prop="name"
                label="报备人">
              </el-table-column>
              <el-table-column
                prop="house_name"
                label="房屋地址">
              </el-table-column>
              <el-table-column
                prop="place"
                label="状态">
              </el-table-column>
              <el-table-column
                prop="finish_at"
                label="完成时间">
              </el-table-column>
            </el-table>
          </div>
          <div class="tableBottom">
            <div class="left">
              <el-pagination
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page="params.page"
                :page-sizes="[12, 20, 30, 40]"
                :page-size="params.per_page_number"
                layout="total, sizes, prev, pager, next, jumper"
                :total="totalNum">
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
    components: {RightMenu, ReportDetail},
    data() {
      return {
        rightMenuX: 0,
        rightMenuY: 0,
        show: false,
        lists: [],
        isHigh: false,
        /***********/
        params: {
          q: '',
          per_page_number: 12,
          page: 1,
          is_page: 1,
          search: 1,
          processable_type: '', //报备类型
          start_time: '',
          end_time: '',
        },

        tableData: [],
        totalNum: 0,
        tableStatus: ' ',
        tableLoading: false,
        reportDetailDialog: false,
        reportId: '',
        processableType: [
          {key: 'bulletin_quality', name: '质量报备'},
          {key: 'bulletin_collect_basic', name: '普通收房报备'},
          {key: 'bulletin_collect_continued', name: '续收报备'},
          {key: 'bulletin_rent_basic', name: '租房报备'},
          {key: 'bulletin_rent_trans', name: '转租报备'},
          {key: 'bulletin_rent_continued', name: '续租报备'},
          {key: 'bulletin_rent_RWC', name: '未收先租报备'},
          {key: 'bulletin_RWC_confirm', name: '未收先租确定报备'},
          {key: 'bulletin_agency', name: '中介费报备'},
          {key: 'bulletin_banish', name: '清退报备'},
          {key: 'bulletin_change', name: '调房报备'},
          {key: 'bulletin_confiscate', name: '充公报备'},
          {key: 'bulletin_lose', name: '炸单报备'},
          {key: 'bulletin_refund', name: '退款报备'},
          {key: 'bulletin_retainage', name: '尾款报备'},
          {key: 'bulletin_special', name: '特殊报备'},
          {key: 'bulletin_checkout', name: '退租报备'},
        ],
      }
    },
    mounted() {
      this.getData();
      this.getDictionary();
    },
    methods: {
      highGrade() {
        this.isHigh = !this.isHigh;
      },
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
      getData() {
        this.tableStatus = ' ';
        this.tableLoading = true;
        this.isHigh = false;
        this.$http.get(globalConfig.server_user + 'process', {params: this.params}).then((res) => {
          this.tableLoading = false;
          let data = res.data.data;
          if (res.data.status === 'success' && data.length !== 0) {
            this.totalNum = res.data.meta.total;
            let dataList = [];
            for (let i = 0; i < data.length; i++) {
              let user = {};
              if (data[i]) {
                user.created_at = data[i].created_at;
                user.finish_at = data[i].finish_at !== null ? data[i].finish_at : '/';
                if (data[i].content) {
                  user.bulletin = data[i].content.staff_name + '的' + data[i].content.bulletin_name || '/';
                  user.name = data[i].content.staff_name || '';
                  user.house_name = (data[i].content.house && data[i].content.house.name) || '/';
                }
                user.id = data[i].id;
                user.place = data[i].place.display_name;
                user.status = data[i].place.status;
              } else {
                user.place = '/';
                user.status = '/';
              }
              dataList.push(user);
            }
            this.tableData = dataList;
          } else {
            this.tableData = [];
            this.totalNum = 0;
            this.tableStatus = '暂无数据';
          }
        })
      },
      search() {
        this.params.page = 1;
        this.getData();
      },
      resetting() {
        this.params.processable_type = '';
        this.params.start_time = [];
        this.params.end_time = [];
      },
      handleSizeChange(val) {
        this.params.per_page_number = val;
        this.getData();
      },
      handleCurrentChange(val) {
        this.params.page = val;
        this.getData();
      },

      //************************************************************************/

      tableRowCollectName({row, rowIndex}) {
        if (row.id === this.houseId) {
          return 'selected_tr';
        }
        return '';
      },

      dblClickTable(row, event) {
        this.reportDetailDialog = true;
        this.reportId = row.flow.id;
      },
      closeModal(val) {
        this.reportDetailDialog = false;
        if (val === 'success') {
          this.getData();
        }
      },

      changelist() {
        this.$store.dispatch('toEditList')
      },
      reportData() {
        this.$router.push({path: '/reportingData'});
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
