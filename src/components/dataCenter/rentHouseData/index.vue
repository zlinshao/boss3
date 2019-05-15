<template>
  <div @click="show=false" @contextmenu="closeMenu">
    <div id="rentHouseData">
      <div class="highRanking" style=" position: absolute; top: 120px; right: 20px;">
        <div class="highSearch">
          <el-form :inline="true" onsubmit="return false" size="medium">
            <el-form-item>
              <span v-if="sign_date.length>0" style="color: #409EFF;" v-show="!dateShow">发布时间：{{sign_date[0]}} - {{sign_date[1]}}</span>
              <span v-if="form.sign_date && form.sign_date.length>0" style="color: #409EFF;" v-show="dateShow">发布时间：{{form.sign_date[0]}} - {{form.sign_date[1]}}</span>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" size="mini" @click="highGrade">高级搜索</el-button>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" size="mini" @click="exportData(1)">导出</el-button>
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
                    <div class="el_col_label">租房开单人</div>
                  </el-col>
                  <el-col :span="16" class="el_col_option">
                    <el-form-item>
                      <el-input readonly="" v-model="sign_name" @focus="openOrganization('search', 'staff')"
                                placeholder="点击选择">
                        <template slot="append">
                          <div style="cursor: pointer;" @click="emptyOrganization('search', 'staff')">清空</div>
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
                    <div class="el_col_label">合同编号</div>
                  </el-col>
                  <el-col :span="16" class="el_col_option">
                    <el-form-item>
                      <el-input v-model="form.contract_number" placeholder="请输入合同编号" clearable></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
              </el-col>
              <el-col :span="12">
                <el-row>
                  <el-col :span="8">
                    <div class="el_col_label">租房片区或负责人</div>
                  </el-col>
                  <el-col :span="16" class="el_col_option">
                    <el-form-item>
                      <el-input readonly="" v-model="org_name" @focus="openOrganization('search', '')"
                                placeholder="点击选择">
                        <template slot="append">
                          <div style="cursor: pointer;" @click="emptyOrganization('search', '')">清空</div>
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
                        end-placeholder="结束日期"
                        @change="dateChange">
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
            <el-row class="el_row_border">
              <el-col :span="12">
                <el-row>
                  <el-col :span="8">
                    <div class="el_col_label">订单类型</div>
                  </el-col>
                  <el-col :span="16" class="el_col_option">
                    <el-form-item>
                      <el-select v-model="form.type" placeholder="请选择" clearable>
                        <el-option v-for="(key,index) in types" :key="index" :label="key"
                                   :value="index + 1"></el-option>
                      </el-select>
                    </el-form-item>
                  </el-col>
                </el-row>
              </el-col>
              <el-col :span="12">
                <el-row>
                  <el-col :span="8">
                    <div class="el_col_label">是否炸单</div>
                  </el-col>
                  <el-col :span="16" class="el_col_option">
                    <el-form-item>
                      <el-select v-model="form.lose" placeholder="请选择" clearable>
                        <el-option key="1" label="是" value="1">是</el-option>
                        <el-option key="2" label="否" value="2">否</el-option>
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
                label="发布时间"
                prop="created_at">
              </el-table-column>
              <el-table-column
                label="合同性质"
                prop="type">
              </el-table-column>
              <el-table-column
                label="失效合同 "
                prop="end_type">
                <template slot-scope="scope">
                  <span v-if="scope.row.end_type">{{scope.row.end_type}}</span>
                  <span v-else>暂无</span>
                </template>
              </el-table-column>
              <el-table-column
                label="是否中介单"
                prop="is_agency">
                <template slot-scope="scope">
                  <span v-if="scope.row.is_agency!=''">{{scope.row.is_agency}}</span>
                  <span v-else>暂无</span>
                </template>
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
                <template slot-scope="scope">
                  <span
                    v-if="scope.row.house && scope.row.house.type!=''">{{scope.row.house && scope.row.house.type}}</span>
                  <span v-else>暂无</span>
                </template>
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
                label="开单人"
                prop="staff_name">
              </el-table-column>
              <el-table-column
                label="租房片区"
                prop="org">
              </el-table-column>
              <el-table-column
                label="租房合同编号"
                prop="contract_number">
                <template slot-scope="scope">
                  <span v-if="scope.row.contract_number">{{scope.row.contract_number}}</span>
                  <span v-else>暂无</span>
                </template>
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
        <div style="float: right;">
          <el-button type="primary" size="mini" @click="switchOrg" v-if="rentActiveName!='公司总计'">{{switchTitle}}
          </el-button>
          <el-button type="primary" size="mini" @click="exportAch()">导出业绩数据</el-button>
          <el-button type="primary" size="mini" @click="exportData(2)">导出</el-button>
        </div>
        <div style="margin-top: 40px;">
          <el-tabs type="border-card" v-model="rentActiveName" @tab-click="handleClick">
            <el-tab-pane v-for="(item,key) in cityTableData" :label="key" :key="item.id" :name="key">
              <div class="myHouse">
                <div class="blueTable"
                     v-if="item.data && item.data[cityForm.page-1] && item.data[cityForm.page-1].length>=0">
                  <el-table
                    :data="item.data[cityForm.page-1]"
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
                    <el-table-column
                      label="负责人"
                      prop="leader">
                    </el-table-column>
                    <el-table-column
                      label="租房套数"
                      prop="count">
                    </el-table-column>
                    <el-table-column
                      label="租房业绩"
                      prop="sum">
                    </el-table-column>
                    <el-table-column
                      label="待确认业绩">
                      <template slot-scope="scope">
                        <div v-if="scope.row.orgid">{{attch[scope.row.orgid]}}</div>
                        <div v-else>点击切换小组查看</div>
                      </template>
                    </el-table-column>
                  </el-table>
                </div>
                <div class="tableBottom">
                  <div class="left">
                    <el-pagination
                      @size-change="handleSizeChange"
                      @current-change="handleCityCurrentChange"
                      :current-page="cityForm.page"
                      :page-size="cityForm.limit"
                      layout="total, prev, pager, next, jumper"
                      :total="item.count">
                    </el-pagination>
                  </div>
                </div>
              </div>
            </el-tab-pane>
          </el-tabs>
        </div>
      </div>
      <el-dialog :close-on-click-modal="false" title="导出业绩数据" :visible.sync="achievementVisible" width="30%">
        <el-form :inline="true" size="medium">
          <el-form-item label="活动时间" style="display: flex;">
            <el-col :span="11">
              <el-form-item prop="start">
                <el-date-picker
                  size="mini"
                  v-model="achParams.start"
                  type="datetime"
                  placeholder="选择开始时间"
                  format="yyyy-MM-dd HH:mm:ss"
                  value-format="yyyy-MM-dd HH:mm:ss"
                  default-time="12:00:00">
                </el-date-picker>
              </el-form-item>
            </el-col>
            <el-col style="text-align: center" :span="2">-</el-col>
            <el-col :span="11">
              <el-form-item prop="end">
                <el-date-picker
                  size="mini"
                  v-model="achParams.end"
                  type="datetime"
                  format="yyyy-MM-dd HH:mm:ss"
                  value-format="yyyy-MM-dd HH:mm:ss"
                  placeholder="选择结束时间"
                  default-time="12:00:00">
                </el-date-picker>
              </el-form-item>
            </el-col>
          </el-form-item>
        </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button size="small" @click="achievementVisible = false">取&nbsp;消</el-button>

            <el-button size="small" type="primary" @click="exportData(3)">导&nbsp;出
            </el-button>
          </div>
      </el-dialog>
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
        achievementVisible: false,//导出业绩数据
        achParams: {
          start: '',
          end: '',
        },
        rightMenuX: 0,
        rightMenuY: 0,
        show: false,
        lists: [],
        isHigh: false,
        tableData: [],
        totalNum: 0,
        tableStatus: ' ',
        tableLoading: false,
        types: ['租房', '转租', '续租', '未收先租', '调租'],
        form: {
          type: '',
          lose: '',
          page: 1,
          limit: 6,
          address: '',  //房屋地址
          sign_id: [],  //租房签约人
          org_id: [],  //收房片区
          staff_id: [],  //收房负责人
          sign_date: [], //签约日期起止范围
          is_agency: '',  //是否中介单
          contract_number: '',
        },
        sign_date: [],
        sign_name: '',
        org_name: '',
        organizationDialog: false,
        organizeType: '',
        currentStatus: '',
        cityTableData: [],   //城市
        rentActiveName: '公司总计',
        cityTableStatus: ' ',
        cityTableLoading: false,
        switchTitle: '切换小组',
        cityForm: {
          page: 1,
          limit: 6,
          sign_date: [],
          aggr: 'third',
        },
        orgids: [],
        attch: {},
        totalCityNum: 0,
        dateShow: false,
      };
    },
    mounted() {
      let Nowdate = new Date();
      let year = new Date(Nowdate).getFullYear();
      let month = new Date(Nowdate).getMonth();
      let month1 = new Date(Nowdate).getMonth() + 1;
      let date = new Date(Nowdate).getDate();
      if (month < 10) month = "0" + month;
      if (month1 < 10) month1 = "0" + month1;
      if (date < 10) date = "0" + date;
      this.form.sign_date = [new Date(year, month, date), new Date(year, month, date)];
      this.sign_date[0] = this.sign_date[1] = year + "-" + month1 + "-" + date;
      this.form.sign_date = this.sign_date;
      this.getTableData();
      this.getPolyData();
    },
    activated() {
    },
    watch: {
      "form.sign_date": {
        deep: true,
        handler(val, oldVal) {
          this.getPolyData();
        }
      }
    },
    methods: {
      dateChange(val) {
        this.dateShow = true;
      },
      handleClick(val) {
        this.cityForm.page = 1;
      },
      switchOrg() {
        if (this.cityForm.aggr === 'leaf') {
          this.cityForm.aggr = 'third';
          this.switchTitle = '切换小组';
        } else {
          this.cityForm.aggr = 'leaf';
          this.switchTitle = '切换片区';
        }
        this.cityForm.page = 1;
        this.getPolyData();
      },
      // 导出业绩数据
      exportAch() {
        this.achievementVisible = true;
      },
      // 导出
      exportData(val) {
        let header;
        if (val === 1) {
          this.form.export = 1;
          header = this.$http.get(globalConfig.server + 'performance/renter', {
            responseType: 'arraybuffer',
            params: this.form
          });
        } else if (val === 2) {
          this.cityForm.export = 1;
          header = this.$http.get(globalConfig.server + 'performance/renter', {
            responseType: 'arraybuffer',
            params: this.cityForm
          });
        } else {
          window.location.href = globalConfig.server + 'performance/renter/export?start=' + this.achParams.start + '&end=' + this.achParams.end;
          this.achParams.start = '';
          this.achParams.end = '';
          this.achievementVisible = false;
          return;
        }
        header.then((res) => { // 处理返回的文件流
          if (!res.data) {
            return;
          }
          let url = window.URL.createObjectURL(new Blob([res.data]));
          let link = document.createElement('a');
          link.style.display = 'a';
          link.href = url;
          link.setAttribute('download', 'excel.xlsx');
          document.body.appendChild(link);
          link.click();
        });
      },
      //关闭右键菜单
      closeMenu() {
        this.show = false;
      },
      //右键参数
      contextParams() {
        let e = event || window.event;let event = window.event;
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
      openContextMenu(row) {
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
        let e = event || window.event;let event = window.event; //support firefox contextmenu
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
      emptyOrganization(position, type) {
        if (position === 'search') {
          if (type === 'staff') {
            this.form.sign_id = [];
            this.sign_name = '';
          } else if (type === 'depart') {
            this.form.org_id = [];
            this.org_name = '';
          } else {
            this.form.staff_id = [];
            this.form.org_id = [];
            this.org_name = '';
          }
        }
      },

      openOrganization(position, type) {
        //type: depart/staff ,position: search/dialog
        this.organizationDialog = true;
        this.currentStatus = position;
        this.organizeType = type;
      },
      closeOrganization() {
        this.organizationDialog = false;
        this.organizeType = '1';
        this.currentStatus = '';
      },
      selectMember(val) {
        if (this.currentStatus === 'search') {
          // if (this.organizeType === 'staff') {
          //
          //   this.form.sign_id = [];
          //   this.sign_name = '';
          //   let names = [];
          //   if (val.length > 0) {
          //     val.forEach((item) => {
          //       this.form.sign_id.push(item.id);
          //       names.push(item.name);
          //     });
          //   }
          //   this.sign_name = names.join(',');
          // } else {
          //   // this.form.org_id = val[0].id;
          //   // this.org_name = val[0].name;
          //   this.form.org_id = [];
          //   this.org_name = '';
          //   let names = [];
          //   if (val.length > 0) {
          //     val.forEach((item) => {
          //       this.form.org_id.push(item.id);
          //       names.push(item.name);
          //     });
          //   }
          //   this.org_name = names.join(',');
          // }

          if (this.organizeType === 'staff') {
            this.form.sign_id = [];
            this.form.sign_id.push(val[0].id);
            this.sign_name = val[0].name;
          } else {
            this.form.staff_id = [];
            this.form.org_id = [];
            if (val[0].hasOwnProperty('avatar')) {
              //选的是人
              this.form.staff_id.push(val[0].id);
            } else {
              //选的部门
              this.form.org_id.push(val[0].id);
            }
            this.org_name = val[0].name;
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
        this.form.export = '';
        this.isHigh = false;
        this.$http.get(globalConfig.server + 'performance/renter', {params: this.form}).then((res) => {
          this.tableLoading = false;
          if (res.data.code === '20000') {
            res.data.data.data.forEach((item) => {
              item.created_at = item.created_at.substring(0, 10);
            });
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
        this.cityForm.sign_date = this.form.sign_date;
        this.cityForm.export = '';
        this.$http.get(globalConfig.server + 'performance/renter', {params: this.cityForm}).then((res) => {
          this.cityTableLoading = false;
          if (res.data.code === '20010') {
            this.cityTableData = res.data.data;
            this.orgids = [];
            this.traverse(res.data.data);
            if (this.orgids.length !== 0) {
              this.$http.post(globalConfig.server + 'performance/renter/attach', {
                sign_date: this.cityForm.sign_date,
                aggr: this.cityForm.aggr,
                ids: this.orgids,
              }).then((res) => {
                this.attch = res.data;
              })
            }
          } else {
            this.cityTableStatus = '暂无数据';
            this.cityTableData = [];
          }
        });
      },
      traverse(obj) {
        for (let key in obj) {
          if (typeof(obj[key]) === "object") {
            this.traverse(obj[key]); //递归遍历
          } else {
            if (key === 'orgid') {
              this.orgids.push(obj[key]);
              // console.log(obj[key]); //如果是值就显示
            }
          }
        }
      },
      handleSizeChange(val) {
      },
      handleCurrentChange(val) {
        this.form.page = val;
        this.getTableData();
      },
      handleCityCurrentChange(val) {
        this.cityForm.page = val;
        // this.getPolyData();
      },
      // 高级
      highGrade() {
        this.isHigh = !this.isHigh;
      },
      // 重置
      resetting() {
        let Nowdate = new Date();
        let year = new Date(Nowdate).getFullYear();
        let month = new Date(Nowdate).getMonth();
        let month1 = new Date(Nowdate).getMonth() + 1;
        let date = new Date(Nowdate).getDate();
        if (month < 10) month = "0" + month;
        if (month1 < 10) month1 = "0" + month1;
        if (date < 10) date = "0" + date;
        this.form.sign_date = [new Date(year, month, date), new Date(year, month, date)];
        this.sign_date[0] = this.sign_date[1] = year + "-" + month1 + "-" + date;
        this.form.sign_date = this.sign_date;

        this.form.address = '';
        this.form.lose = '';
        this.form.contract_number = '';
        this.form.sign_id = [];
        this.form.org_id = [];
        // this.form.sign_date = [];
        this.form.is_agency = '';
        this.form.type = '';
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

  .main {
    min-height: 300px;
  }
</style>
