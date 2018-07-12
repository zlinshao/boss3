<template>
  <div @click="show=false" @contextmenu="closeMenu">
    <div id="collectHouseData">
      <div class="highRanking" style=" position: absolute; top: 120px; right: 20px;">
        <div class="highSearch">
          <el-form :inline="true" onsubmit="return false" size="medium">
            <el-form-item>
              <span v-if="sign_date.length>0" style="color: #409EFF;" v-show="!dateShow">合同生成时间：{{sign_date[0]}} - {{sign_date[1]}}</span>
              <span v-if="form.sign_date && form.sign_date.length>0" style="color: #409EFF;" v-show="dateShow">合同生成时间：{{form.sign_date[0]}} - {{form.sign_date[1]}}</span>
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
                    <div class="el_col_label">收房开单人</div>
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
                    <div class="el_col_label">收房片区或者负责人</div>
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
                    <div class="el_col_label">收房年限</div>
                  </el-col>
                  <el-col :span="16" class="el_col_option">
                    <el-form-item>
                      <el-input v-model="form.years[0]" style="width: 150px;" placeholder="起" clearable></el-input>
                      至
                      <el-input v-model="form.years[1]" style="width: 150px;" placeholder="止" clearable></el-input>
                      年
                    </el-form-item>
                  </el-col>
                </el-row>
              </el-col>
            </el-row>
            <el-row class="el_row_border">
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
              :data="tableData.data"
              :empty-text='tableStatus'
              v-loading="tableLoading"
              element-loading-text="拼命加载中"
              element-loading-spinner="el-icon-loading"
              element-loading-background="rgba(255, 255, 255, 0)"
              style="width: 100%"><!--@row-contextmenu='openContextMenu'-->
              <el-table-column
                label="合同生成时间"
                prop="sign_at">
              </el-table-column>
              <el-table-column
                label="合同性质">
                <template slot-scope="scope">
                  <span v-if="scope.row.type==1">收房</span>
                  <span v-else-if="scope.row.type==2">续收</span>
                  <span v-else>暂无</span>
                </template>
              </el-table-column>
              <el-table-column
                label="炸单情况"
                prop="end_type">
              </el-table-column>
              <el-table-column
                label="是否中介单"
                prop="is_agency">
                <template slot-scope="scope">
                  <span v-if="scope.row.is_agency">是</span>
                  <span v-else>否</span>
                </template>
              </el-table-column>
              <el-table-column
                label="房屋地址"
                prop="address">
              </el-table-column>
              <el-table-column
                label="开单人"
                prop="pay_accountname">
              </el-table-column>
              <el-table-column
                label="房屋类型"
                prop="HT">
              </el-table-column>
              <el-table-column
                label="月单价"
                prop="month_price">
              </el-table-column>
              <el-table-column
                label="空置期"
                prop="vacancy">
              </el-table-column>
              <el-table-column
                label="收房年限(月)"
                prop="sign_month">
              </el-table-column>
              <el-table-column
                label="付款方式"
                prop="pay_way">
              </el-table-column>
              <el-table-column
                label="第一次打款时间"
                prop="first_pay_at">
              </el-table-column>
              <el-table-column
                label="收房合同号"
                prop="contract_number">
              </el-table-column>
              <el-table-column
                label="收房片区"
                prop="org_name">
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

        <div style="margin-top: 10px;" v-if="cityTableData.data">
          <div style="float: right;position: relative;z-index: 1;right: 20px;top: 6px;">
            <el-button type="primary" size="mini" @click="switchOrg" v-if="rentActiveName!='公司总计'">{{switchTitle}}
            </el-button>
            <el-button type="primary" size="mini" @click="exportData(2)">导出</el-button>
          </div>
          <el-tabs type="border-card" v-model="rentActiveName" @tab-click="handleClick">
            <el-tab-pane v-for="(item,key) in cityTableData.data" :label="key" :key="key"
                         :name="key" v-if="key==='公司总计'">
              <div class="myHouse">
                <div class="blueTable">
                  <el-table
                    :data="item.data"
                    :empty-text='cityTableStatus'
                    v-loading="cityTableLoading"
                    element-loading-text="拼命加载中"
                    element-loading-spinner="el-icon-loading"
                    element-loading-background="rgba(255, 255, 255, 0)"
                    style="width: 100%">
                    <el-table-column
                      label="部门"
                      prop="name">
                    </el-table-column>
                    <el-table-column
                      label="负责人"
                      prop="leader_name">
                      <template slot-scope="scope">
                        -
                      </template>
                    </el-table-column>
                    <el-table-column
                      label="收房套数"
                      prop="num">
                    </el-table-column>
                    <el-table-column
                      label="支出押金"
                      prop="price">
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
            <el-tab-pane v-for="(item,key) in cityTableData.data" :label="key" :key="key"
                         :name="key" v-if="key!=='公司总计'">
              <div class="myHouse">
                <div class="blueTable">
                  <el-table
                    :data="item.data"
                    :empty-text='cityTableStatus'
                    v-loading="cityTableLoading"
                    element-loading-text="拼命加载中"
                    element-loading-spinner="el-icon-loading"
                    element-loading-background="rgba(255, 255, 255, 0)"
                    style="width: 100%">
                    <el-table-column
                      label="部门"
                      prop="name">
                    </el-table-column>
                    <el-table-column
                      label="负责人"
                      prop="leader_name">
                    </el-table-column>
                    <el-table-column
                      label="收房套数"
                      prop="num">
                    </el-table-column>
                    <el-table-column
                      label="支出押金"
                      prop="price">
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
          page: 1,
          limit: 6,
          address: '',
          sign_id: [],
          staff_id: [],
          contract_number: '',
          org_id: [],  //收房片区
          sign_date: [], //签约日期起止范围
          years: [],  //收房年限
          is_agency: '',
        },
        sign_date: [],
        sign_name: '',
        org_name: '',
        organizationDialog: false,
        organizeType: '',
        currentStatus: '',
        cityCategory: [],
        companyTotalData: [],  //公司总计
        cityTableData: [],   //城市
        rentActiveName: '公司总计',
        cityTableStatus: ' ',
        cityTableLoading: false,
        switchTitle: '切换片区',
        cityForm: {
          page: 1,
          limit: 6,
          below: '',
          zu: '',
          sign_date: [], //签约日期起止范围
        },
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
      setTimeout(() => {
        this.cityForm.below = 1;
        this.getPolyData();
      }, 1);
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
        if (this.cityForm.page > 1) {
          this.cityForm.page = 1;
          this.getPolyData();
        }
      },
      switchOrg() {
        if (this.cityForm.zu === 1) {
          this.cityForm.zu = '';
          this.switchTitle = '切换小组';
        } else {
          this.cityForm.zu = 1;
          this.switchTitle = '切换片区';
        }
        this.cityForm.page = 1;
        this.cityForm.export = '';
        this.getPolyData();
      },
      // 导出
      exportData(val) {
        let header;
        if (val === 1) {
          this.form.export = 1;
          this.form.below = '';
          this.form.zu = '';
          header = this.$http.get(globalConfig.server + 'performance/lord', {
            responseType: 'arraybuffer',
            params: this.form
          });
        } else {
          console.log(this.rentActiveName);
          this.cityForm.export = this.rentActiveName;
          this.form.below = 1;
          header = this.$http.get(globalConfig.server + 'performance/lord', {
            responseType: 'arraybuffer',
            params: this.cityForm
          });
        }
        header.then((res) => { // 处理返回的文件流
          if (!res.data) {
            return;
          }
          console.log(res);
          let url = window.URL.createObjectURL(new Blob([res.data]));
          let link = document.createElement('a');
          link.style.display = 'a';
          link.href = url;
          link.setAttribute('download', 'excel.xls');
          document.body.appendChild(link);
          link.click();
        });
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
        this.organizeType = '';
      },

      search() {
        this.form.page = 1;
        this.getTableData();
      },
      getTableData() {
        this.tableStatus = ' ';
        this.tableLoading = true;
        this.$http.get(globalConfig.server + 'performance/lord', {params: this.form}).then((res) => {
          this.tableLoading = false;
          this.isHigh = false;
          if (res.data.code === '30000') {
            this.tableData = res.data.data.data;
            this.totalNum = res.data.data.data && res.data.data.data.count;
            this.companyTotalData = res.data.data.countA;
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
        this.cityForm.below = 1;
        this.cityForm.sign_date = this.form.sign_date;
        this.$http.get(globalConfig.server + 'performance/lord', {params: this.cityForm}).then((res) => {
          this.cityTableLoading = false;
          if (res.data.code === '30000') {
            this.cityTableData = res.data.data.dat;
          } else {
            this.cityTableStatus = '暂无数据';
            this.cityTableData = [];
          }
        });
      },
      handleSizeChange(val) {
      },
      handleCurrentChange(val) {
        this.form.page = val;
        this.getTableData();
      },
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
        this.form.sign_date = [];
        this.form.contract_number = '';
        this.form.years = [];
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

  .main {
    min-height: 300px;
  }

</style>
