<template>
    <div id="business">
      <div>
        <span style="font-weight: bold;">显示：</span>
        <el-radio-group v-model="params.group">
          <el-radio label="city">城市</el-radio>
          <el-radio label="org">片区</el-radio>
        </el-radio-group>
      </div>
      <div style="margin-top: 20px;">
        <el-row :gutter="20">
          <el-col :span="16">
            <span style="font-weight: bold;font-size: 12px !important;color: rgb(159,155,155)">城市组成：</span>
            <div style="display: inline-block;font-size: 12px !important;" class="font_style">
              <div style="display: flex;justify-content: space-between; flex-wrap: nowrap;">
                <el-checkbox label="全部" v-model="cityAll" @change="handleCityCheckAll"></el-checkbox>
                <el-checkbox-group v-model="helpParams.city" @change="selectCity" style="margin-left: 30px;">
                  <el-checkbox v-for="city in cityList" :label="city.name" :key="city.id"></el-checkbox>
                </el-checkbox-group>
              </div>
            </div>
          </el-col>
          <el-col :span="8">
            <span style="font-weight: bold; font-size: 12px !important;color: rgb(159,155,155)">片区组成：</span>
            <div style="display: inline-block;">
              <div style="display: flex;justify-content: space-between;flex-wrap: nowrap;" class="font_style">
                <el-checkbox label="全部" v-model="helpParams.composeShow" style="margin-right: 30px;" @change="composeAllCheck"></el-checkbox>
                <el-checkbox-group v-model="helpParams.compose" @change="handleChangeCompose">
                  <el-checkbox v-for="compose in helpParams.composeList" :label="compose.name" :key="compose.value"></el-checkbox>
                </el-checkbox-group>
              </div>
            </div>
          </el-col>
        </el-row>
      </div>
      <!--时间-->
      <div class="container">
        <div style="margin-top: 20px; width: 58%;">
          <span style="font-weight: bold;">时间：</span>
          <el-radio-group v-model="helpParams.time" @change="handleChangeDate">
            <el-radio :label="1">今天</el-radio>
            <el-radio :label="7">最近7天</el-radio>
            <el-radio :label="30">最近30天</el-radio>
            <el-radio label="day">
              <template>
                <el-input @focus="handleFocusDays" type="number" size="mini" style="width: 80px;" v-model="helpParams.days" @change="handleInputDays"></el-input>
              </template>
              天
            </el-radio>
            <el-radio label="date">
              <template>
                <el-date-picker
                  v-model="helpParams.dateTime"
                  size="mini"
                  type="daterange"
                  range-separator="至"
                  start-placeholder="开始日期"
                  end-placeholder="结束日期"
                  value-format="yyyy-MM-dd"
                  @change="handleChangeDateRange"
                >
                </el-date-picker>
              </template>
            </el-radio>
          </el-radio-group>
          <el-button type="primary" size="mini" @click="handleDownFiltrate">筛选</el-button>
        </div>
        <div style="margin-top: 20px;width: 42%;text-align:left;" class="composeCheck">
          <!--<el-checkbox v-model="params.auto_compare" size="mini" style="margin-top: 5px;margin-right: 50px;font-weight: bold;" @change="handleAddCompare">增加对比项</el-checkbox>-->

          <el-select v-model="params.order_scope" size="mini" @change="handleOrderScope" style="width:20%;margin: 0 15px;">
            <el-option value="inner" label="区域内排序"></el-option>
            <el-option value="" label="区域间排序"></el-option>
          </el-select>

          <el-select v-model="params.order_field" size="mini" clearable @change="handleOrderField" style="width:20%;">
            <el-option v-for="field in businessFieldList" :label="field.name" :key="field.value" :value="field.value"></el-option>
          </el-select>

          <el-radio-group v-model="params.order_sort" @change="handleOrderSort" style="margin-left: 15px; ">
            <el-radio label="asc">升序</el-radio>
            <el-radio label="desc">降序</el-radio>
          </el-radio-group>

        </div>
      </div>
      <div style="margin-top: 30px;">
        <el-table
          :header-cell-class-name="headerStyle"
          :cell-style="cellStyle"
          :row-class-name="tableRowClassName"
          :data="businessList"
          @header-click="handleHeaderClick"
          @cell-click="handleCellClick"
          :empty-text="businessEmptyText"
          v-loading="businessLoading"
          element-loading-text="拼命加载中..."
          element-loading-spinner="el-icon-loading"
          element-loading-background="rgba(255, 255, 255, 0)"
        >
          <el-table-column label="区域" min-width="150px;">
            <template slot-scope="scope">
              <div>
                <span v-if="scope.row.group">{{ scope.row.group }}</span>
                <span v-else></span>
                <el-button v-if="scope.row.first && scope.row.group" type="text" size="mini" icon="el-icon-plus" @click.stop="handleAddClick(scope)">时间段</el-button>
              </div>
            </template>
          </el-table-column>
          <el-table-column label="时间段" prop="date_range" min-width="125px;"></el-table-column>

          <el-table-column label="收房">
            <el-table-column label="数量/套" prop="lord.count"></el-table-column>
            <el-table-column label="渠道单比例" prop="lord.agency_percentage"></el-table-column>
            <el-table-column label="均价/元" prop="lord.price_avg"></el-table-column>
            <el-table-column label="空置期" prop="lord.ready_days_avg"></el-table-column>
            <el-table-column label="总月数" prop="lord.sign_month_avg"></el-table-column>
          </el-table-column>
          <el-table-column label="租房">
            <el-table-column label="数量/套" prop="renter.count"></el-table-column>
            <el-table-column label="已空置" prop="renter.ready_days_avg"></el-table-column>
            <el-table-column label="渠道单比例" prop="renter.agency_percentage"></el-table-column>
            <el-table-column label="均价/元" prop="renter.price_avg"></el-table-column>
            <el-table-column label="回款" prop="renter.pay_back_avg"></el-table-column>
            <el-table-column label="平均差价/元" prop="renter.price_diff_avg"></el-table-column>
          </el-table-column>
          <el-table-column label="空置">
            <el-table-column label="空置房源(套)" prop="vacant.count"></el-table-column>
            <el-table-column label="平均已空置/天" prop="vacant.vacant_day_avg"></el-table-column>
          </el-table-column>
          <el-table-column label="业绩">
            <el-table-column label="总业绩" prop="performance.performance"></el-table-column>
          </el-table-column>
        </el-table>
        <el-pagination
          :total="businessTotal"
          :page-size="businessCurrentPageSize"
          :current-page="businessCurrentPage"
          @current-change="handleChangePage"
          layout="total,prev,pager,next"
          style="text-align: right;margin-top: 20px;"
        ></el-pagination>
      </div>
      <el-dialog
        title="数据统计"
        :visible.sync="statisticalVisible"
        width="40%"
      >
          <div style="width:100%;text-align: center;">
            <h3 style="text-align: left;margin-left: 10%;">{{ chartTitle[currentTitle] }}</h3>
            <div>
              <series-line :chartData="charData"></series-line>
            </div>
          </div>
      </el-dialog>
      <el-dialog
        :title="currentDetailTitle"
        :visible.sync="infoDetailVisible"
        width="60%"
        @close="handleCloseInfoDetail"
      >
        <el-tabs v-model="activeName" @tab-click="handleTabClick">
          <el-tab-pane label="收房" name="first">
            <el-table
              :data="detailData.lord"
              :cell-style="DetailCellStyle"
              :header-cell-class-name="headerDetailStyle"
            >
              <el-table-column label="日期" prop="bulletin_date" min-width="120px"></el-table-column>
              <el-table-column label="员工" prop="user"></el-table-column>
              <el-table-column label="月单价" prop="month_price"></el-table-column>
              <el-table-column label="付款方式" prop="pay_way"></el-table-column>
              <el-table-column label="总月数" prop="sign_month"></el-table-column>
              <el-table-column label="渠道费" prop="agency_amount">
                <template slot-scope="scope">
                  <span v-if="scope.row.agency_amount">{{ scope.row.agency_amount }}</span>
                  <span v-else>0</span>
                </template>
              </el-table-column>
              <el-table-column label="名称" prop="address" min-width="120px"></el-table-column>
              <el-table-column label="姓名" prop="customer"></el-table-column>
              <el-table-column label="空置期" prop="ready_days"></el-table-column>
              <el-table-column label="位置" prop="city"></el-table-column>
              <el-table-column label="合同">
                <template slot-scope="scope">
                  <el-button type="text" @click="goHeTongDetail(scope.row,'lord')">详情</el-button>
                </template>
              </el-table-column>
            </el-table>
          </el-tab-pane>
          <el-tab-pane label="租房" name="second">
            <el-table
              :data="detailData.renter"
              :cell-style="DetailCellStyle2"
              :header-cell-class-name="headerDetailStyle"
            >
              <el-table-column label="日期" prop="bulletin_date" min-width="130px"></el-table-column>
              <el-table-column label="员工" prop="user"></el-table-column>
              <el-table-column label="月单价" prop="month_price"></el-table-column>
              <el-table-column label="价格差" prop="price_diff"></el-table-column>
              <el-table-column label="付款方式" prop="pay_way"></el-table-column>
              <el-table-column label="总月数" prop="sign_month"></el-table-column>
              <el-table-column label="渠道费" prop="agency_amount">
                <template slot-scope="scope">
                  <span v-if="scope.row.agency_amount">{{ scope.row.agency_amount }}</span>
                  <span v-else>0</span>
                </template>
              </el-table-column>
              <el-table-column label="名称" prop="address" min-width="120px"></el-table-column>
              <el-table-column label="姓名" prop="customer"></el-table-column>
              <el-table-column label="已空置" prop="ready_days"></el-table-column>
              <el-table-column label="位置" prop="city"></el-table-column>
              <el-table-column label="合同">
                <template slot-scope="scope">
                  <el-button type="text" @click="goHeTongDetail(scope.row,'renter')">详情</el-button>
                </template>
              </el-table-column>
            </el-table>
          </el-tab-pane>
          <el-tab-pane label="空置" name="third">
            <el-table
              :data="detailData.vacant"
            >
              <el-table-column label="名称" prop="name"></el-table-column>
              <el-table-column label="已空置天数" prop="vacant_days"></el-table-column>
              <el-table-column label="位置" prop="city"></el-table-column>
              <el-table-column label="收房人" prop="user"></el-table-column>
              <el-table-column label="收房片区" prop="org"></el-table-column>
              <el-table-column label="合同">
                <template slot-scope="scope">
                  <el-button type="text" @click="goHeTongDetail(scope.row,'vacant')">详情</el-button>
                </template>
              </el-table-column>
            </el-table>
          </el-tab-pane>
          <el-tab-pane label="业绩" name="fourth">
            <el-table
              :data="detailData.performance"
              :cell-style="DetailCellStyle2"
              :header-cell-class-name="headerDetailStyle"
            >
              <el-table-column label="日期" prop="bulletin_date" min-width="130px"></el-table-column>
              <el-table-column label="员工" prop="user"></el-table-column>
              <el-table-column label="月单价" prop="month_price"></el-table-column>
              <el-table-column label="价格差" prop="price_diff"></el-table-column>
              <el-table-column label="付款方式" prop="pay_way"></el-table-column>
              <el-table-column label="总月数" prop="sign_month"></el-table-column>
              <el-table-column label="渠道费" prop="agency_amount">
                <template slot-scope="scope">
                  <span v-if="scope.row.agency_amount">{{ scope.row.agency_amount }}</span>
                  <span v-else>0</span>
                </template>
              </el-table-column>
              <el-table-column label="名称" prop="address" min-width="120px"></el-table-column>
              <el-table-column label="姓名" prop="customer"></el-table-column>
              <el-table-column label="空置期" prop="ready_days"></el-table-column>
              <el-table-column label="业绩" prop="performance"></el-table-column>
              <el-table-column label="位置" prop="city"></el-table-column>
              <el-table-column label="合同">
                <template slot-scope="scope">
                  <el-button type="text" @click="goHeTongDetail(scope.row,'renter')">详情</el-button>
                </template>
              </el-table-column>
            </el-table>
          </el-tab-pane>
        </el-tabs>
      </el-dialog>
        <div ref="lineChart"></div>
    </div>
</template>

<script>
  import seriesLine from './chart/seriesLine';
    export default {
      name: "index",
      components: { seriesLine },
      data() {
        return {
          url: globalConfig.server,
          helpParams: {
            city: [], //显示
            compose: ['新绩效组','旧绩效组'], //数据来源
            composeShow: true, //数据来源全选
            composeList: [
              {name: '新绩效组',value: 'new_perf'},
              {name: '旧绩效组',value: 'old_perf'},
            ], //数据来源列表
            time: 1, //天数
            days: '',
            chooseDay: false,
            dateTime: '',
            chooseDate: false,
            checkCity: '',
          },
          params: {
            order_scope: '', //区域间、内排序
            order_field: '', //列表字段排序
            order_sort: 'asc', //升序降序 asc升 desc降
            start_time: '',
            end_time: '',
            city: [], //选择的城市
            group: 'city',//显示城市或区域
            compose: ['new_perf','old_perf'],//数据组成
            // auto_compare: true, //增加对比项
            page_id: '',
            addition: '',
          },
          cityList: [],
          cityAll: true,
          businessList: [
            {city: '南京',first:true,dateRange: '12-01~12-07',collect:{num:400,zhongjie:'50%',avg: '3500/月',kongzhi: '20天',months: '20月'},
              rent:{num:200,kongzhi:'10天',qudao: '50%',avg: '3500/月',back:'20天',avgPrice:'-500'},other:{kongzhi:'150套',kongzhiday:'20天',all:15000}},
          ],
          statisticalVisible: false,
          infoDetailVisible: false,
          charData: [],
          activeName: 'first',
          detailData: [],
          businessEmptyText: '',
          businessLoading: false,
          businessTotal: 0,
          businessFieldList: [],
          businessCurrentPageSize: 10,
          businessCurrentPage: 1,
          chartTitle: {
            "lord.count": '收房数量变化(套)',
            "lord.agency_percentage": '收房渠道单比例变化(%)',
            "lord.price_avg": '收房均价变化(元)',
            "lord.ready_days_avg": '收房空置期变化(天)',
            "lord.sign_month_avg": '收房总月数变化(月)',
            "renter.count": '租房数量变化(套)',
            "renter.ready_days_avg": '租房已空置变化',
            "renter.agency_percentage": '租房渠道单比例变化(%)',
            "renter.price_avg":'租房均价变化(元)',
            "rent.pay_back_avg": '租房回款变化(元)',
            "renter.price_diff_avg": '租房平均差价变化'
          },
          currentTitle: '',
          currentDetailTitle: ''
        }
      },
      mounted() {
        this.getCity();
        this.getFieldList();
        this.handleSetTime();
        this.getBusinessList();
      },
      methods: {
        //获取图表数据
        getChartData(params) {
          this.$http.get(this.url + 'performance/business/chart',{
            params
          }).then(res => {
            if(res.data.code === '20010') {
              if(res.data.data.length> 0) {
                this.charData = res.data.data;
                this.statisticalVisible =true;
              }else {
                this.charData = [];
                this.$notify.warning({
                  title: '警告',
                  message: '该统计图暂无数据'
                });
                return false;
              }
            }else {
              this.charData = [];
              this.$notify.warning({
                title: '警告',
                message: res.data.msg
              });
              return false;
            }
          }).catch(err =>{
            console.log(err);
          })
        },
        //关闭详情
        handleCloseInfoDetail() {
          this.activeName = 'first';
        },
        //合同详情
        goHeTongDetail(row,type) {
          if (type === 'lord') {
            const {href} = this.$router.resolve({path: '/collectDetail', query: {id: row.contract_id}});
            window.open(href, '_blank', 'width=1920,height=1080');
          } else if (type === 'renter') {
            const {href} = this.$router.resolve({path: '/rentingDetail', query: {id: row.contract_id}});
            window.open(href, '_blank', 'width=1920,height=1080');
          }else if (type === 'vacant') {
            const {href} = this.$router.resolve({path: '/collectDetail', query: {id: row.contract_id}});
            window.open(href, '_blank', 'width=1920,height=1080');
          }else {
            return false;
          }
        },
        //详情
        getDetailInfo(params) {
          this.$http.get(this.url + 'performance/business/detail',{
            params
          }).then(res => {
            if(res.data.code === '20000') {
              this.detailData = res.data.data;
              this.infoDetailVisible = true;
            }else {
              this.detailData = [];
              this.$notify.warning({
                title: '警告',
                message: '获取详情失败,请刷新重试'
              })
            }
          }).catch(err => {
            console.log(err);
          })
        },
        //分页
        handleChangePage(page) {
          this.businessCurrentPage = page;
          this.getBusinessList();
        },
        //字段排序
        handleOrderField(val) {
          this.params.order_field = val;
          this.getBusinessList();
        },
        //升降序
        handleOrderSort(val) {
          this.params.order_sort = val;
          this.getBusinessList();
        },
        //区域间排序
        handleOrderScope(val) {
          this.params.order_scope = val;
          this.getBusinessList();
        },
        //增加对比项
        handleAddCompare(val) {
          this.params.auto_compare = val;
          this.getBusinessList();
        },
        //字段列表
        getFieldList() {
          this.$http.get(this.url + 'performance/business/orderFields').then(res => {
            if(res.data.code === '20010') {
              this.businessFieldList = res.data.data;
            }
          }).catch(err => {
            console.log(err);
          })
        },
        //获取列表
        getBusinessList() {
          this.businessLoading = true;
          this.$http.get(this.url + '/performance/business',{
            params: this.params
          }).then(res => {
            if(res.data.code === '20000') {
              this.businessLoading = false;
              this.businessEmptyText = ' ';
              this.businessList = res.data.data.data;
              this.businessList = this.businessList.slice((this.businessCurrentPage - 1) * this.businessCurrentPageSize , this.businessCurrentPage * this.businessCurrentPageSize);
              this.businessTotal = res.data.data.data.length;
              this.params.page_id = res.data.data.page_id;
              this.params.addition = '';
            }else {
              this.businessLoading = false;
              this.businessEmptyText = '暂无数据';
              this.businessList = [];
              this.params.page_id = '';
              this.params.addition = '';
            }
          }).catch(err => {
            console.log(err);
          })
        },
        //tab切换
        handleTabClick(tab) {
          // console.log(tab);
          return false;
        },
        //片区组成全选
        composeAllCheck(val) {
          this.helpParams.compose = val ? ['新绩效组','旧绩效组'] : [];
          if(val) {
            this.params.compose = [];
            this.helpParams.composeList.map(item => {
              this.params.compose.push(item.value);
            })
          }else {
            this.params.compose = [];
          }
        },
        //选择数据来源
        handleChangeCompose(val) {
          this.params.compose = [];
          var ValLen = val.length;
          var composeLen = this.helpParams.composeList.length;
          this.helpParams.composeShow = ValLen < composeLen ? false : true;
          this.helpParams.composeList.map(item => {
            for (var i=0;i<ValLen;i++) {
              if(item.name === val[i]) {
                this.params.compose.push(item.value);
              }
            }
          });
        },
        //城市全选
        handleCityCheckAll(val) {
          if (val) {
            this.params.city = [];
            this.helpParams.city = [];
            this.cityList.map(item => {
              this.params.city.push(item.id);
              this.helpParams.city.push(item.name);
            })
          } else {
            this.params.city = [];
            this.helpParams.city = [];
          }
        },
        //选择城市
        selectCity(val) {
          this.params.city = [];
          var ValLen = val.length;
          var cityLen = this.cityList.length;
          this.cityAll = ValLen < cityLen ? false : true;
          this.cityList.map(item => {
            for (var j=0;j<ValLen;j++) {
              if (item.name === val[j]) {
                this.params.city.push(item.id);
              }
            }
          });
        },
        //获取城市列表
        getCity() {
          this.$http.get(this.url + '/performance/business/cities').then(res => {
            if(res.data.code === "20010"){
              this.cityList = res.data.data;
              this.cityList.map(item => {
                this.params.city.push(item.id);
                this.helpParams.city.push(item.name);
              })
            }else {
              this.cityList = [];
              this.$notify.warning({
                title: '警告',
                message: '获取城市列表失败！'
              })
            }
          }).catch(err => {
            console.log(err);
          })
        },
        //确定筛选
        handleDownFiltrate() {
          if(this.helpParams.chooseDay) {
            if(this.helpParams.days){
              this.handleSetTime(this.helpParams.days);
            }
          }
          if(this.helpParams.chooseDate) {
            if(this.helpParams.dateTime) {
              if(this.helpParams.dateTime.length > 1) {
                this.params.end_time = this.helpParams.dateTime[1];
                this.params.start_time = this.helpParams.dateTime[0];
              }
            }else {
              this.$notify.warning({
                title: '警告',
                message: '请选择筛选时间！'
              });
              return false;
            }
          }
          let params = this.params;
          if(!params.end_time || !params.start_time) {
            this.$notify.warning({
              title: '警告',
              message: '请选择筛选时间！'
            });
            return false;
          }
          if(params.city.length < 1) {
            this.$notify.warning({
              title: '警告',
              message: '至少有一个进行筛选的城市！'
            });
            return false;
          }
          if(params.compose.length < 1) {
            this.$notify.warning({
              title: '警告',
              message: '至少有一个进行筛选的片区组成！'
            });
            return false;
          }
          this.getBusinessList();
        },
        //输入天数
        handleInputDays(val) {
          this.handleChangeDate(val);
        },
        handleFocusDays() {
          this.helpParams.time = 'day';
          this.helpParams.chooseDay = true;
          this.helpParams.chooseDate = false;
          this.helpParams.dateTime = "";
        },
        handleChangeDateRange() {
          this.helpParams.time = 'date';
          this.helpParams.chooseDay = false;
          this.helpParams.chooseDate = true;
          this.helpParams.days = "";
        },
        //筛选时间
        handleChangeDate(val) {
          if(val === 1 || val === 7 || val === 30){
            this.handleSetTime(val);
            this.helpParams.chooseDay = false;
            this.helpParams.chooseDate = false;
            this.helpParams.days = '';
            this.helpParams.dateTime = "";
          }else if(val === 'day'){
            this.params.start_time = '';
            this.params.end_time = '';
            this.helpParams.chooseDay = true;
            this.helpParams.chooseDate = false;
            this.helpParams.dateTime = "";
          }else if(val === 'date'){
            this.helpParams.chooseDay = false;
            this.helpParams.chooseDate = true;
            this.helpParams.days = "";
            this.params.start_time = "";
            this.params.end_time = "";
          }
        },
        //设置周期
        handleSetTime(val = 1) {
          var date = new Date();
          var start_time = '';
          var end_time = '';
          if (val === 1) {
            start_time = date.toLocaleDateString().split("/").join("-");
            end_time = date.setDate(date.getDate() + val);
          }else {
            end_time = date.toLocaleDateString().split("/").join("-");
            start_time = date.setDate(date.getDate() - val);
          }
          start_time = new Date(start_time).toLocaleDateString().split("/").join("-");
          end_time = new Date(end_time).toLocaleDateString().split("/").join("-");
          this.params.end_time = end_time;
          this.params.start_time = start_time;
        },
        headerStyle({row, column}) {
          if(column.label === '收房'){
            return 'collectBg';
          }else if(column.label === '租房'){
            return "rentBg";
          }else if(column.label === '空置'){
            return "vacancyBg";
          }else if(column.label === '业绩'){
            return "businessBg";
          }else if(column.label === '区域' || column.label === '时间段') {
            return "area_time";
          } else {
            return "otherBg";
          }
        },
        headerDetailStyle({row,column}) {
          if(column.label === '月单价' || column.label === '付款方式' || column.label === '总月数' || column.label === '价格差') {
            return 'vacancyBg';
          }else if(column.label === '渠道费' || column.label === '名称' || column.label === '姓名'){
            return 'rentBg';
          }
        },
        //表头单击事件
        handleHeaderClick(column) {
          if(!column.property) {
            return false;
          }
          var type = column.property.split('.')[0];
          var field = column.property.split('.')[1];
          var chart_field = '';
          if(type === 'lord') {
            chart_field = `${type}.${field}`;
            this.currentTitle = chart_field;
          }else if(type === 'renter') {
            chart_field = `${type}.${field}`;
            this.currentTitle = chart_field;
          }else {
            return false;
          }
          var obj = {
            chart_field,
            page_id: this.params.page_id,
            order_field: this.params.order_field, //列表字段排序
            order_sort: this.params.order_sort, //升序降序 asc升 desc降
          };
          this.getChartData(obj);
        },
        //单元格被单击
        handleCellClick(row) {
          var str = '';
          this.helpParams.compose.forEach(item => {
            str += item + '&';
          });
          str = str.substring(0,str.length - 1);
          this.currentDetailTitle = `数据详情 ( ${row.group} ${row.date_range} ${str})`;
          var detailParams = {};
          detailParams.start_time = row.start;
          detailParams.end_time = row.end;
          detailParams.org_ids = row.all_org_id;
          this.getDetailInfo(detailParams);
        },
        //添加时间段
        handleAddClick(scope) {
          this.params.addition = scope.row.group_id;
          this.getBusinessList();
        },
        //表头颜色
        cellStyle({row, column, rowIndex, columnIndex}) {
          if(column.label === '总业绩'){
            return "color: #DDAF6A";
          }else if(columnIndex > 1 && columnIndex < 7){
            return "color: #409EFF ";
          }else if(columnIndex > 6 && columnIndex < 13){
            return "color: #F56C6C";
          }else if(columnIndex > 12 && columnIndex < 16){
            return "color: #67C23A";
          }
        },
        /**
         * @return {string}
         */
        DetailCellStyle({row, column, rowIndex, columnIndex}) {
          if(columnIndex > 1 && columnIndex < 5 ) {
            return "color: #36AA35";
          }else if(columnIndex > 4 && columnIndex < 8) {
            return "color: #E38E8E";
          }
        },
        /**
         * @return {string}
         */
        DetailCellStyle2({row, column, rowIndex, columnIndex}) {
          if(columnIndex > 1 && columnIndex < 6 ) {
            return "color: #36AA35";
          }else if(columnIndex > 5 && columnIndex < 9) {
            return "color: #E38E8E";
          }
        },
        //区域颜色划分
        tableRowClassName({row}) {
          if(row.first){
            return "success-row";
          }else {
            return "";
          }
        },
      }
    }
</script>

<style lang="scss">
  body{
    padding-right: 0 !important;
  }
  #business{
    width: 100%;
    .el-table--border,
    .el-table--border td,
    .el-table--border th,
    .el-table--border tr{
      border: none !important;
    }
    .el-table .success-row {
      background: #f0f9eb;
    }
    .el-table::before{
      height: 0 !important;
    }
    .el-table--border::after, .el-table--group::after{
      width: 0 !important;
    }
    .rentBg{
      color: white;
      background-color: #E38E8E !important;
    }
    .collectBg{
      background-color: #DFE6FB !important;
    }
    .otherBg{
      background-color: #EEEEEE !important;
    }
    .area_time{
      background-color: #f0f9eb !important;
    }
    .vacancyBg{
      color: white;
      background-color: #36AA35 !important;
    }
    .businessBg{
      color: white;
      background-color: #DDAF6A !important;
    }
    .container{
      width: 100%;
      display: flex;
      justify-content: space-between;
      flex-wrap: nowrap;
    }
    .composeCheck{
      .el-checkbox__input.is-checked+.el-checkbox__label{
        color: #787a7e !important;
      }
    }
    .font_style{
      .el-checkbox__label{
        font-size: 12px !important;
      }
    }
  }
</style>
