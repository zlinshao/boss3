<template>
  <div @click="show=false" @contextmenu="closeMenu">
    <div>
      <div class="highRanking" style=" position: absolute; top: 120px; right: 20px;">
        <div class="highSearch">
          <el-form :inline="true" onsubmit="return false" size="medium">
            <el-form-item>
              <el-button type="primary" size="mini" @click="highGrade">高级</el-button>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" size="mini" @click="exportData">导出</el-button>
            </el-form-item>
          </el-form>
        </div>
      </div>
      <div class="highRanking">
        <div class="filter high_grade" :class="isHigh? 'highHide':''" style=" margin-top: -40px;">
          <el-form :inline="true" onsubmit="return false" :model="form" size="mini" label-width="100px">
            <div class="filterTitle">
              <i class="el-icons-fa-bars"></i>&nbsp;&nbsp;高级搜索
            </div>
            <el-row class="el_row_border">
              <el-col :span="12">
                <el-row>
                  <el-col :span="8">
                    <div class="el_col_label">房屋地址</div>
                  </el-col>
                  <el-col :span="16" class="el_col_option">
                    <el-form-item>
                      <el-input v-model="form.address" placeholder="请输入房屋地址" clearable></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
              </el-col>
              <el-col :span="12">
                <el-row>
                  <el-col :span="8">
                    <div class="el_col_label">租房签约人</div>
                  </el-col>
                  <el-col :span="16" class="el_col_option">
                    <el-form-item>
                      <el-input readonly="" v-model="sign_name" @focus="chooseStaff('search')"
                                placeholder="点击选择">
                        <template slot="append">
                          <div style="cursor: pointer;" @click="emptyStaff('search')">清空</div>
                        </template>
                      </el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
              </el-col>
            </el-row>
            <el-row class="el_row_border">
              <el-col :span="12">
                <el-row>
                  <el-col :span="8">
                    <div class="el_col_label">报备日期起止范围</div>
                  </el-col>
                  <el-col :span="16" class="el_col_option">
                    <el-form-item>
                      <el-date-picker
                        v-model="form.report_date"
                        type="daterange"
                        value-format="yyyy-MM-dd"
                        start-placeholder="开始日期"
                        end-placeholder="结束日期">
                      </el-date-picker>
                    </el-form-item>
                  </el-col>
                </el-row>
              </el-col>
              <el-col :span="12">
                <el-row>
                  <el-col :span="8">
                    <div class="el_col_label">收房片区</div>
                  </el-col>
                  <el-col :span="16" class="el_col_option">
                    <el-form-item>
                      <el-input readonly="" v-model="org_name" @focus="chooseDepart('search')"
                                placeholder="点击选择">
                        <template slot="append">
                          <div style="cursor: pointer;" @click="emptyDepart('search')">清空</div>
                        </template>
                      </el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
              </el-col>
            </el-row>
            <el-row class="el_row_border">
              <el-col :span="12">
                <el-row>
                  <el-col :span="8">
                    <div class="el_col_label">签约日期起止范围</div>
                  </el-col>
                  <el-col :span="16" class="el_col_option">
                    <el-form-item>
                      <el-date-picker
                        v-model="form.sign_date"
                        type="daterange"
                        value-format="yyyy-MM-dd"
                        start-placeholder="开始日期"
                        end-placeholder="结束日期">
                      </el-date-picker>
                    </el-form-item>
                  </el-col>
                </el-row>
              </el-col>
              <el-col :span="12">
                <el-row>
                  <el-col :span="8">
                    <div class="el_col_label">是否中介单</div>
                  </el-col>
                  <el-col :span="16" class="el_col_option">
                    <el-form-item>
                      <el-select v-model="form.is_agency" placeholder="请选择" clearable>
                        <el-option key="1" label="是" value="1">是</el-option>
                        <el-option key="0" label="否" value="0">否</el-option>
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
        <div class="myHouse">
          <div class="blueTable">
            <el-table
              :data="tableData"
              :empty-text='tableStatus'
              v-loading="tableLoading"
              element-loading-text="拼命加载中"
              element-loading-spinner="el-icon-loading"
              element-loading-background="rgba(255, 255, 255, 0)"
              style="width: 100%"><!--@row-contextmenu='openContextMenu'-->
              <el-table-column
                label="报备日期"
                prop="created_at">
              </el-table-column>
              <el-table-column
                label="补充信息"
                prop="type">
              </el-table-column>
              <el-table-column
                label="炸单情况"
                prop="end_type">
              </el-table-column>
              <el-table-column
                label="是否中介单"
                prop="is_agency">
              </el-table-column>
              <el-table-column
                label="签约日期"
                prop="sign_at">
              </el-table-column>
              <el-table-column
                label="尾款时间"
                prop="final_payment_at">
              </el-table-column>
              <el-table-column
                label="房屋地址"
                prop="house.name">
              </el-table-column>
              <el-table-column
                label="房屋类型"
                prop="house.type">
              </el-table-column>
              <el-table-column
                label="月单价"
                prop="month_price[0].price">
              </el-table-column>
              <el-table-column
                label="付款方式"
                prop="pay_way[0].pay_way">
                <template slot-scope="scope">
                  <span v-if="scope.row.pay_way && scope.row.pay_way[0] && scope.row.pay_way[0].pay_way_bet">
                    押{{scope.row.pay_way && scope.row.pay_way[0] && scope.row.pay_way[0].pay_way_bet}}
                    付{{scope.row.pay_way && scope.row.pay_way[0] &&scope.row.pay_way[0].pay_way}}
                  </span>
                </template>
              </el-table-column>
              <el-table-column
                label="签约时长"
                prop="sign_month">
              </el-table-column>
              <el-table-column
                label="总金额"
                prop="money_sum">
              </el-table-column>
              <el-table-column
                label="租房签约人"
                prop="staff_name">
              </el-table-column>
              <el-table-column
                label="租房片区"
                prop="org">
              </el-table-column>
              <el-table-column
                label="已收定金"
                prop="mortgage_price">
              </el-table-column>
            </el-table>
          </div>
          <div class="tableBottom">
            <div class="left">
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
        </div>

        <div style="margin-top: 10px;">
          <div style="float: right;position: relative;z-index: 1;right: 20px;top: 6px;"
               v-show="rentActiveName != 'first'">
            <el-button type="primary" size="mini" @click="switchOrg">{{switchTitle}}</el-button>
            <el-button type="primary" size="mini" @click="">导出</el-button>
          </div>
          <el-tabs type="border-card" v-model="rentActiveName">
            <el-tab-pane label="公司总计" name="first">
              <div class="myHouse">
                <div class="blueTable">
                  <el-table
                    :data="companyTotalData"
                    :empty-text='tableStatus'
                    v-loading="tableLoading"
                    element-loading-text="拼命加载中"
                    element-loading-spinner="el-icon-loading"
                    element-loading-background="rgba(255, 255, 255, 0)"
                    @row-contextmenu='openContextMenu'
                    style="width: 100%">
                    <el-table-column
                      label="租房套数"
                      prop="department_name">
                    </el-table-column>
                    <el-table-column
                      label="租房业绩"
                      prop="leader_name">
                    </el-table-column>
                  </el-table>
                </div>
                <!--<div class="tableBottom">-->
                <!--<div class="left">-->
                <!--<el-pagination-->
                <!--@size-change="handleSizeChange"-->
                <!--@current-change="handleCurrentChange"-->
                <!--:current-page="form.page"-->
                <!--:page-size="form.limit"-->
                <!--layout="total, prev, pager, next, jumper"-->
                <!--:total="totalNum">-->
                <!--</el-pagination>-->
                <!--</div>-->
                <!--</div>-->
              </div>
            </el-tab-pane>
            <el-tab-pane v-for="(item,key) in cityTableData" :label="key" :key="item.id" :name="key">
              <div class="myHouse">
                <div class="blueTable">
                  <el-table
                    :data="item[0]"
                    :empty-text='cityTableStatus'
                    v-loading="cityTableLoading"
                    element-loading-text="拼命加载中"
                    element-loading-spinner="el-icon-loading"
                    element-loading-background="rgba(255, 255, 255, 0)"
                    style="width: 100%">
                    <el-table-column
                      label="片区"
                      prop="org">
                    </el-table-column>
                    <!--<el-table-column-->
                    <!--label="负责人"-->
                    <!--prop="leader">-->
                    <!--</el-table-column>-->
                    <el-table-column
                      label="租房套数"
                      prop="count">
                    </el-table-column>
                    <el-table-column
                      label="租房业绩"
                      prop="sum">
                    </el-table-column>
                  </el-table>
                </div>
                <div class="tableBottom">
                  <div class="left">
                    <el-pagination
                      @size-change="handleCitySizeChange"
                      @current-change="handleCityCurrentChange"
                      :current-page="cityForm.page"
                      :page-size="cityForm.limit"
                      layout="total, prev, pager, next, jumper"
                      :total="totalCityNum">
                    </el-pagination>
                  </div>
                </div>
              </div>
            </el-tab-pane>
          </el-tabs>
        </div>
      </div>

    </div>
    <Organization :organizationDialog="organizationDialog" :type="organizeType" @close="closeOrganization"
                  @selectMember="selectMember"></Organization>
    <RightMenu :startX="rightMenuX+'px'" :startY="rightMenuY+'px'" :list="lists" :show="show"
               @clickOperate="clickEvent"></RightMenu>
  </div>
</template>
<script>
  import RightMenu from '../../common/rightMenu.vue';    //右键
  import Organization from '../../common/organization.vue';  //组织架构

  export default {
    components: {Organization, RightMenu},
    data() {
      return {
        rightMenuX: 0,
        rightMenuY: 0,
        show: false,
        lists: [],
        isHigh: false,
        tableData: [],
        totalNum: 0,
        tableStatus: ' ',
        tableLoading: false,
        form: {
          search: '',  //模糊搜索
          page: 1,
          limit: 6,
          address: '',  //房屋地址
          sign_id: [],  //租房签约人
          org_id: [],  //收房片区
          sign_date: [], //签约日期起止范围
          is_agency: '',  //是否中介单
        },
        sign_name: '',
        org_name: '',
        organizationDialog: false,
        organizeType: '',
        currentStatus: '',
        cityCategory: [],

        companyTotalData: [],  //公司总计
        cityTableData: [],   //城市
        rentActiveName: 'first',
        cityTableStatus: ' ',
        cityTableLoading: false,
        switchTitle: '切换片区',
        cityForm: {
          page: 1,
          form: 6,
        },
        totalCityNum: 0,
      };
    },
    mounted() {
      this.getCityCategory();
      this.getTableData();
      this.form.aggr = 'leaf';
      this.getPolyData();
    },
    activated() {

    },
    watch: {},
    methods: {
      switchOrg() {
        if (this.form.aggr === 'leaf') {
          this.form.aggr = 'third';
          this.switchTitle = '切换小组';
        } else {
          this.form.aggr = 'leaf';
          this.switchTitle = '切换片区';
        }
        this.getPolyData();
      },
      getCityCategory() {
        this.dictionary(306, 1).then((res) => {
          this.cityCategory = res.data;
        });
      },
      // 导出
      exportData() {
        // this.$http.get(globalConfig.server + 'salary/achv/export', {responseType: 'arraybuffer'}).then((res) => { // 处理返回的文件流
        //   if (!res.data) {
        //     return;
        //   }
        //   console.log(res);
        //   let url = window.URL.createObjectURL(new Blob([res.data]));
        //   let link = document.createElement('a');
        //   link.style.display = 'a';
        //   link.href = url;
        //   link.setAttribute('download', 'excel.xlsx');
        //   document.body.appendChild(link);
        //   link.click();
        // });
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
      //右键菜单
      openContextMenu(row, event) {
        this.achievementId = row.id;
        this.lists = [
          // {
          //   clickIndex: "edit",
          //   headIcon: "el-icon-edit",
          //   label: "编辑"
          // },
          // {
          //   clickIndex: "delete",
          //   headIcon: "el-icon-delete",
          //   label: "删除"
          // },
        ];
        let e = event || window.event; //support firefox contextmenu
        this.show = false;
        this.rightMenuX =
          e.clientX +
          document.documentElement.scrollLeft -
          document.documentElement.clientLeft;
        this.rightMenuY =
          e.clientY +
          document.documentElement.scrollTop -
          document.documentElement.clientTop;
        event.preventDefault();
        event.stopPropagation();
        this.$nextTick(() => {
          this.show = true;
        });
      },
      //右键回调事件
      clickEvent(index) {
        switch (index) {
          case 'edit':
            break;
          case 'delete':
            break;
        }
      },
      chooseDepart(val) {
        this.organizationDialog = true;
        this.organizeType = 'depart';
        this.currentStatus = val;
      },
      chooseStaff(val) {
        this.organizationDialog = true;
        this.organizeType = 'staff';
        this.currentStatus = val;
      },
      emptyStaff(val) {
        if (val === 'search') {
          this.form.sign_id = [];
          this.sign_name = '';
        }
      },
      emptyDepart(val) {
        if (val === 'search') {
          this.form.org_id = [];
          this.org_name = '';
        }
      },
      closeOrganization() {
        this.organizationDialog = false;
        this.organizeType = '';
        this.currentStatus = '';
      },
      selectMember(val) {
        if (this.currentStatus === 'search') {
          if (this.organizeType === 'staff') {
            // this.form.sign_id = val[0].id;
            // this.sign_name = val[0].name;
            this.form.sign_id = [];
            this.sign_name = '';
            let names = [];
            if (val.length > 0) {
              val.forEach((item) => {
                this.form.sign_id.push(item.id);
                names.push(item.name);
              });
            }
            this.sign_name = names.join(',');
          } else {
            // this.form.org_id = val[0].id;
            // this.org_name = val[0].name;
            this.form.org_id = [];
            this.org_name = '';
            let names = [];
            if (val.length > 0) {
              val.forEach((item) => {
                this.form.org_id.push(item.id);
                names.push(item.name);
              });
            }
            this.org_name = names.join(',');
          }
        }
        this.organizeType = '';
      },
      search() {
        this.form.page = 1;
        this.getTableData();
      },
      getTableData() {
        this.tableStatus = ' ';
        this.tableLoading = true;
        this.form.aggr = '';
        this.$http.get(globalConfig.server + 'performance/renter', {params: this.form}).then((res) => {
          this.tableLoading = false;
          this.isHigh = false;
          if (res.data.code === '20000') {
            this.tableData = res.data.data.data;
            this.totalNum = res.data.data.count;  //记录总条数
            if (res.data.data.length < 1) {
              this.tableStatus = '暂无数据';
              this.totalNum = 0;
              this.tableData = [];
            }
          } else {
            this.tableStatus = '暂无数据';
            this.totalNum = 0;
            this.tableData = [];
          }
        });
      },
      //聚合列表数据
      getPolyData() {
        this.cityTableStatus = ' ';
        this.cityTableLoading = true;
        this.$http.get(globalConfig.server + 'performance/renter', {params: this.form}).then((res) => {
          this.cityTableLoading = false;
          this.isHigh = false;
          if (res.data.code === '20010') {
            this.cityTableData = res.data.data;
            // this.totalNum = res.data.data.count;  //记录总条数
          } else {
            this.cityTableStatus = '暂无数据';
            // this.totalNum = 0;
            this.cityTableData = [];
          }
        });
      },
      handleSizeChange(val) {},
      handleCurrentChange(val) {
        this.form.page = val;
        this.getTableData();
      },

      handleCitySizeChange(val) {},
      handleCityCurrentChange(val) {
        this.cityForm.page = val;
        this.getPolyData();
      },
      // 高级
      highGrade() {
        this.isHigh = !this.isHigh;
      },
      // 重置
      resetting() {
        this.form.address = '';
        this.form.sign_id = [];
        this.form.org_id = [];
        this.form.report_date = [];
        this.form.sign_date = [];
        this.form.is_agency = '';
        this.sign_name = '';
        this.org_name = '';
      },
    },
  };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped="">
  .tableBottom {
    padding: 8px;
    display: flex;
    justify-content: flex-end;
  }
</style>
