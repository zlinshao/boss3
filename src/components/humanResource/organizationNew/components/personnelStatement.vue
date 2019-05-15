<template>
  <div @click="show=false" @contextmenu="closeMenu">
    <div>
      <div class="highRanking">
        <div class="top_words" style="float: left;line-height: 38px;margin-left: 30px;">
          <span class="can_click" @click="showDetail('entry')">入职人数：{{totalData.ruzhi || 0}} 人</span>&nbsp;&nbsp;&nbsp;
          <span>复职人数：{{totalData.fuzhi || 0}} 人</span>&nbsp;&nbsp;&nbsp;
          <span class="can_click" @click="showDetail('dismiss')">离职人数：{{totalData.lizhi || 0}} 人</span>&nbsp;&nbsp;&nbsp;
          <span>调岗人数：{{totalData.tiaogang || 0}} 人</span>&nbsp;&nbsp;&nbsp;
          <span>转正人数：{{totalData.zhuanzheng || 0}} 人</span>&nbsp;&nbsp;&nbsp;
          <span>共计人数：{{Number(totalData.ruzhi) +Number(totalData.fuzhi) +Number(totalData.lizhi)
            +Number(totalData.tiaogang) + Number(totalData.zhuanzheng)}} 人</span>&nbsp;&nbsp;&nbsp;
        </div>
        <div class="highSearch">
          <el-form :inline="true" onsubmit="return false" size="mini">
            <el-form-item>
              <el-button class="iconfont icon-zhengchangliebiao" @click="params.altogether=!params.altogether"
                         :disabled="params.altogether"
                         style="font-size: 12px;"
                         size="mini" type="primary" plain>共计
              </el-button>
              <el-button class="iconfont icon-liebiaozhankai" @click="params.altogether=!params.altogether"
                         :disabled="!params.altogether"
                         style="font-size: 12px;"
                         size="mini" type="primary" plain>部门
              </el-button>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" size="mini" @click="highGrade">高级</el-button>
            </el-form-item>
          </el-form>
        </div>
        <div class="filter high_grade" :class="isHigh? 'highHide':''">
          <el-form :inline="true" onsubmit="return false" size="mini" label-width="100px">
            <div class="filterTitle">
              <i class="el-icons-fa-bars"></i>&nbsp;&nbsp;高级搜索
            </div>
            <el-row class="el_row_border">
              <el-col :span="12">
                <el-row>
                  <el-col :span="8">
                    <div class="el_col_label">时间</div>
                  </el-col>
                  <el-col :span="16" class="el_col_option">
                    <el-form-item>
                      <el-date-picker
                          v-model="params.time"
                          type="daterange"
                          value-format="yyyy-MM-dd"
                          range-separator="至"
                          start-placeholder="开始日期"
                          end-placeholder="结束日期">
                      </el-date-picker>
                    </el-form-item>
                  </el-col>
                </el-row>
              </el-col>
              <el-col :span="12" v-if="params.altogether">
                <el-row>
                  <el-col :span="8">
                    <div class="el_col_label">操作人</div>
                  </el-col>
                  <el-col :span="16" class="el_col_option">
                    <el-form-item>
                      <el-input v-model="operator_name" @focus="openOrganizeModal('staff')" placeholder="请选择"
                                readonly>
                        <template slot="append">
                          <div style="cursor: pointer;" @click="emptyOrganization('staff')">清空</div>
                        </template>
                      </el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
              </el-col>
              <el-col :span="12" v-if="!params.altogether">
                <el-row>
                  <el-col :span="8">
                    <div class="el_col_label">部门</div>
                  </el-col>
                  <el-col :span="16" class="el_col_option">
                    <el-form-item>
                      <el-input v-model="org_name" @focus="openOrganizeModal('depart')" placeholder="请选择"
                                readonly>
                        <template slot="append">
                          <div style="cursor: pointer;" @click="emptyOrganization('depart')">清空</div>
                        </template>
                      </el-input>
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
        <div>
          <el-table
              :empty-text='tableStatus'
              v-loading="tableLoading"
              element-loading-text="拼命加载中"
              element-loading-spinner="el-icon-loading"
              element-loading-background="rgba(255, 255, 255, 0)"
              :data="tableData"
              @row-dblclick="dblClickTable"
              style="width: 100%">
            <el-table-column
                prop="date(create_time)"
                label="时间">
            </el-table-column>
            <el-table-column
                prop="ruzhi"
                label="入职人数">
            </el-table-column>
            <el-table-column
                prop="fuzhi"
                label="复职人数">
            </el-table-column>
            <el-table-column
                prop="lizhi"
                label="离职人数">
            </el-table-column>
            <el-table-column
                prop="tiaogang"
                label="调岗人数">
            </el-table-column>
            <el-table-column
                prop="zhuanzheng"
                label="转正人数">
            </el-table-column>
            <el-table-column
                v-if="params.altogether"
                label="操作人">
              <template slot-scope="scope">
                <span v-if="scope.row.staff && scope.row.staff.real_name">
                  {{scope.row.staff.real_name}}
                </span>
              </template>
            </el-table-column>
            <el-table-column
                v-if="!params.altogether"
                prop="finish_at"
                label="部门">
              <template slot-scope="scope">
                <span v-if="scope.row.org && scope.row.org.name">
                  {{scope.row.org.name}}
                </span>
                <span v-else>
                 /
                </span>
              </template>
            </el-table-column>
          </el-table>
          <div class="block pages">
            <div class="left">
              <el-pagination
                  @size-change="handleSizeChange"
                  @current-change="handleCurrentChange"
                  :page-size="12"
                  layout="total, prev, pager, next, jumper"
                  :total="totalNum">
              </el-pagination>
            </div>
          </div>
        </div>
      </div>
    </div>
    <el-dialog :close-on-click-modal="false" title="详情" :visible.sync="detailDialog" width="30%">
      <div v-if="detailDialogType==='entry'">
        <el-table
            :data="entryTableData"
            style="width: 100%">
          <el-table-column
              prop="type"
              label="入职途径">
          </el-table-column>
          <el-table-column
              prop="num"
              label="对应人数">
          </el-table-column>
        </el-table>
      </div>
      <div v-if="detailDialogType==='dismiss'">
        <el-table
            :data="dismissTableData"
            style="width: 100%">
          <el-table-column
              prop="type"
              label="离职原因">
          </el-table-column>
          <el-table-column
              prop="num"
              label="对应人数">
          </el-table-column>
        </el-table>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button size="small" @click="detailDialog=false">取 消</el-button>
        <el-button size="small" type="primary" @click="detailDialog=false">确 定</el-button>
      </span>
    </el-dialog>
    <RightMenu :startX="rightMenuX+'px'" :startY="rightMenuY+'px'" :list="lists" :show="show"
               @clickOperate="clickEvent"></RightMenu>

    <Organization :organizationDialog="organizationDialog" :type="organizeType"
                  @close='closeOrganize' @selectMember="selectMember"></Organization>
  </div>
</template>

<script>
  import RightMenu from '../../../common/rightMenu.vue'
  import Organization from '../../../common/organization.vue'

  export default {
    name: 'hello',
    components: {RightMenu, Organization},
    data() {
      return {
        rightMenuX: 0,
        rightMenuY: 0,
        show: false,
        lists: [],
        isHigh: false,
        /***********/
        totalNum: 0,
        params: {
          page: 1,
          limit: 12,
          time: [],
          operator_id: '',
          org_id: '',
          altogether: true,  //true为共计，false为部门
        },
        operator_name: '',
        org_name: '',
        tableData: [],
        //模态框
        organizationDialog: false,
        organizeType: '',
        tableStatus: ' ',
        tableLoading: false,
        sign_date: [],
        detailDialog: false,
        detailDialogType: '',
        entryTableData: [],
        dismissTableData: [],
        totalData: {},
        entryWayCategory: {
          '58tongcheng': '58同城',
          'boss': 'BOSS直聘',
          'desheng': '德盛人才',
          'liepin': '猎聘网',
          'qiancheng': '前程无忧',
          'qita': '其他',
          'shezhao': '社会招聘会',
          'shouxi': '首席信才',
          'tuijian': '推荐',
          'xiaoyuan': '校园招聘会',
          'zhilian': '智联招聘'
        },
        dismissReasonCategory: {
          'zhudong': '主动离职',
          'kuanggong': '旷工离职',
          'quantui': '劝退',
          'kaichu': '开除'
        }
      }
    },
    watch: {
      "params.altogether": {
        deep: true,
        handler(val, oldVal) {
          if (val) {
            this.emptyOrganization('depart');
          } else {
            this.emptyOrganization('staff');
          }
          this.params.page = 1;
          this.search();
        }
      },
    },
    created() {
      let Nowdate = new Date();
      let year = new Date(Nowdate).getFullYear();
      let month = new Date(Nowdate).getMonth();
      let month1 = new Date(Nowdate).getMonth() + 1;
      let date = new Date(Nowdate).getDate();
      let date1 = new Date(Nowdate).getDate() - 7;
      if (month < 10) month = "0" + month;
      if (month1 < 10) month1 = "0" + month1;
      if (date < 10) date = "0" + date;
      if (date1 < 10) date1 = "0" + date1;
      // this.params.time = [new Date(year, month, date), new Date(year, month, date)];
      this.sign_date[0] = year + "-" + month1 + "-" + date1;
      this.sign_date[1] = year + "-" + month1 + "-" + date;
      this.params.time = this.sign_date;
      this.getTableData();
    },
    methods: {
      showDetail(val) {
        this.detailDialog = true;
        if (val === 'entry') {
          //todo show 入职途径的对应人数
          this.detailDialogType = 'entry';
        } else if (val === 'dismiss') {
          //todo show 离职原因的对应人数
          this.detailDialogType = 'dismiss';
        }
      },
      //获取列表数据
      getTableData() {
        this.tableLoading = true;
        this.tableStatus = ' ';
        this.isHigh = false;
        this.$http.get(globalConfig.server + 'manager/staff/persontable', {params: this.params}).then((res) => { //, {params: this.params}
          this.tableLoading = false;
          if (res.data.code === '10060') {
            this.tableData = res.data.data.meitian;
            this.totalData = res.data.data.zongji;
            let entry = res.data.data.ruzhitujing;
            let dismiss = res.data.data.lizhiyuanyin;
            this.totalNum = res.data.num;
            this.entryTableData = [];
            this.dismissTableData = [];
            for (let key in entry) {
              let object = {};
              if (entry[key]) {
                object.type = this.entryWayCategory[key];
                object.num = entry[key];
                this.entryTableData.push(object)
              }
            }
            for (let key in dismiss) {
              let object = {};
              if (dismiss[key]) {
                object.type = this.dismissReasonCategory[key];
                object.num = dismiss[key];
                this.dismissTableData.push(object)
              }
            }

          } else {
            this.tableData = [];
            this.totalNum = 0;
            this.tableStatus = '暂无数据';
            this.$notify.warning({
              title: '警告',
              message: res.data.msg
            });
          }
        });
      },
      handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
      },
      handleCurrentChange(val) {
        this.params.page = val;
        this.getTableData();
      },
      dblClickTable(row, event) {
      },
      //调出选人组件
      openOrganizeModal(val) {
        this.organizationDialog = true;
        this.organizeType = val;
      },
      emptyOrganization(val) {
        if (val === 'staff') {
          this.params.operator_id = '';
          this.operator_name = '';
        } else {
          this.params.org_id = '';
          this.org_name = '';
        }
      },
      selectMember(val) {
        if (this.organizeType === 'staff') {
          this.params.operator_id = val[0].id;
          this.operator_name = val[0].name;
        } else {
          this.params.org_id = val[0].id;
          this.org_name = val[0].name;
        }
        this.organizeType = '';
      },
      highGrade() {
        this.isHigh = !this.isHigh;
      },
      search() {
        this.getTableData();
      },
      resetting() {
        this.params.time = this.sign_date;
        this.params.operator_id = '';
        this.params.org_id = '';
        this.operator_name = '';
        this.org_name = '';
        this.search();
      },
      //右键回调事件
      clickEvent(index) {
      },
      //关闭右键菜单
      closeMenu() {
        this.show = false;
      },
      //右键参数
      contextParams() {
        //param: user right param
        let e = event || window.event;let event = window.event;	//support firefox contextmenu
        this.show = false;
        this.rightMenuX = e.clientX + document.documentElement.scrollLeft - document.documentElement.clientLeft;
        this.rightMenuY = e.clientY + document.documentElement.scrollTop - document.documentElement.clientTop;
        event.preventDefault();
        event.stopPropagation();
        this.$nextTick(() => {
          this.show = true
        })
      },
      closeOrganize() {
        this.organizationDialog = false;
      },

    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped="">
  .main {
    min-height: 200px;
  }

  .top_words .can_click {
    cursor: pointer;
    color: #409EFF;
  }
</style>
