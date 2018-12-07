<template>
    <div id="business">
      <div>
        <el-row :gutter="20">
          <el-col :span="4">
            <div>
              <span style="color: #409EFF;">显示：</span>
              <el-radio-group v-model="params.group">
                <el-radio label="city">城市</el-radio>
                <el-radio label="org">片区</el-radio>
              </el-radio-group>
            </div>
          </el-col>
          <el-col :span="18">
            <div>
              <el-row :gutter="20">
                <el-col :span="16">
                  <span style="color: #409EFF;">城市组成：</span>
                  <div style="display: inline-block;">
                    <el-checkbox-group v-model="helpParams.city" @change="selectCity">
                      <el-checkbox label="全部"></el-checkbox>
                      <el-checkbox v-for="city in cityList" :label="city.name" :key="city.id" v-if="!cityAll"></el-checkbox>
                    </el-checkbox-group>
                  </div>
                </el-col>
                <el-col :span="8">
                  <span style="color: #409EFF;">片区组成：</span>
                  <div style="display: inline-block;">
                    <el-checkbox-group v-model="helpParams.compose" @change="handleChangeCompose">
                      <el-checkbox label="全部"></el-checkbox>
                      <el-checkbox v-for="compose in helpParams.composeList" :label="compose.name" :key="compose.value" v-if="!helpParams.composeShow"></el-checkbox>
                    </el-checkbox-group>
                  </div>
                </el-col>
              </el-row>
            </div>
          </el-col>
        </el-row>
      </div>
      <!--时间-->
      <div>
        <el-row :gutter="20">
          <el-col :span="15">
            <div style="margin-top: 20px;">
              <span>时间：</span>
              <el-radio-group v-model="helpParams.time" @change="handleChangeDate">
                <el-radio :label="1">最近1天</el-radio>
                <el-radio :label="7">最近7天</el-radio>
                <el-radio :label="30">最近30天</el-radio>
                <el-radio label="day">
                  <template>
                    <el-input type="number" size="mini" style="width: 80px;" v-model="helpParams.days"></el-input>
                  </template>
                  天
                </el-radio>
                <el-radio label="date">
                  <template>
                    <el-date-picker
                      v-model="params.dateTime"
                      size="mini"
                      type="daterange"
                      range-separator="至"
                      start-placeholder="开始日期"
                      end-placeholder="结束日期">
                    </el-date-picker>
                  </template>
                </el-radio>
              </el-radio-group>
              <el-button type="primary" size="mini" @click="handleDownFiltrate">确定筛选</el-button>
            </div>
          </el-col>
          <el-col :span="9">
            <div style="margin-top: 20px;width: 100%;">
              <el-row :gutter="20">
                <el-col :span="4">
                  <el-checkbox v-model="params.auto_compare" size="mini" style="margin-top: 5px;">增加对比项</el-checkbox>
                </el-col>
                <el-col :span="6">
                  <el-select v-model="params.order_scope" size="mini">
                    <el-option value="inner" label="区域内排序"></el-option>
                    <el-option value="" label="区域间排序"></el-option>
                  </el-select>
                </el-col>
                <el-col :span="6">
                  <el-select v-model="params.order_field" size="mini">
                    <el-option value="avg" label="平均差价"></el-option>
                  </el-select>
                </el-col>
                <el-col :span="6">
                  <el-button type="primary" size="mini" @click="handleAscOrder">升序</el-button>
                  <el-button type="primary" size="mini" @click="handleDescOrder">降序</el-button>
                </el-col>
              </el-row>
            </div>
          </el-col>
        </el-row>
      </div>
      <div style="margin-top: 30px;">
        <el-table
          :header-cell-class-name="headerStyle"
          :cell-style="cellStyle"
          :row-class-name="tableRowClassName"
          :data="businessList"
          @header-click="handleHeaderClick"
        >
          <el-table-column label="区域">
            <template slot-scope="scope">
              <div>
                <span v-if="scope.row.first">{{ scope.row.city }}</span>
                <el-button v-if="scope.row.first" type="text" size="mini" icon="el-icon-plus" @click="handleAddClick(scope)">时间段</el-button>
              </div>
            </template>
          </el-table-column>
          <el-table-column label="时间段" prop="dateRange"></el-table-column>

          <el-table-column label="收房">
            <el-table-column label="数量" prop="collect.num"></el-table-column>
            <el-table-column label="渠道单比例" prop="collect.zhongjie"></el-table-column>
            <el-table-column label="均价" prop="collect.avg"></el-table-column>
            <el-table-column label="空置期" prop="collect.kongzhi"></el-table-column>
            <el-table-column label="总月数" prop="collect.months"></el-table-column>
          </el-table-column>
          <el-table-column label="租房">
            <el-table-column label="数量" prop="rent.num"></el-table-column>
            <el-table-column label="已空置" prop="rent.kongzhi"></el-table-column>
            <el-table-column label="渠道单比例" prop="rent.qudao"></el-table-column>
            <el-table-column label="均价" prop="rent.avg"></el-table-column>
            <el-table-column label="回款" prop="rent.back"></el-table-column>
            <el-table-column label="平均差价" prop="rent.avgPrice"></el-table-column>
          </el-table-column>
          <el-table-column label="空置">
            <el-table-column label="空置房源" prop="other.kongzhi"></el-table-column>
            <el-table-column label="平均已空置" prop="other.kongzhiday"></el-table-column>
          </el-table-column>
          <el-table-column label="业绩">
            <el-table-column label="总业绩" prop="other.all"></el-table-column>
          </el-table-column>
        </el-table>
      </div>
      <el-dialog
        title="数据统计"
        :visible.sync="statisticalVisible"
      >
        <div>
          this is statistical
        </div>
      </el-dialog>
    </div>
</template>

<script>
    export default {
      name: "index",
      data() {
        return {
          url: globalConfig.server,
          helpParams: {
            city: ['全部'], //显示
            compose: ['全部'], //数据来源
            composeShow: true, //数据来源全选
            composeList: [
              {name: '新绩效组',value: 'new_perf'},
              {name: '旧绩效组',value: 'ord_perf'},
            ], //数据来源列表
            time: 1, //天数
            days: '',
          },
          params: {
            dateTime: '',
            order_scope: '', //区域间、内排序
            order_field: '', //列表字段排序
            start_time: '',
            end_time: '',
            city: [], //选择的城市
            group: 'city',//显示城市或区域
            compose: ['new_perf','old_perf'],//数据组成
            auto_compare: true, //增加对比项
          },
          cityList: [],
          cityAll: true,
          businessList: [
            {city: '南京',first:true,dateRange: '12-01~12-07',collect:{num:400,zhongjie:'50%',avg: '3500/月',kongzhi: '20天',months: '20月'},
              rent:{num:200,kongzhi:'10天',qudao: '50%',avg: '3500/月',back:'20天',avgPrice:'-500'},other:{kongzhi:'150套',kongzhiday:'20天',all:15000}},
            {city: '南京',first:false,dateRange: '12-07~12-14',collect:{num:400,zhongjie:'50%',avg: '3500/月',kongzhi: '20天',months: '20月'},
              rent:{num:200,kongzhi:'10天',qudao: '50%',avg: '3500/月',back:'20天',avgPrice:'-500'},other:{kongzhi:'150套',kongzhiday:'20天',all:15000}},
            {city: '南京',first:false,dateRange: '12-14~12-21',collect:{num:400,zhongjie:'50%',avg: '3500/月',kongzhi: '20天',months: '20月'},
              rent:{num:200,kongzhi:'10天',qudao: '50%',avg: '3500/月',back:'20天',avgPrice:'-500'},other:{kongzhi:'150套',kongzhiday:'20天',all:15000}},
            {city: '杭州',first:true,dateRange: '12-14~12-21',collect:{num:400,zhongjie:'50%',avg: '3500/月',kongzhi: '20天',months: '20月'},
              rent:{num:200,kongzhi:'10天',qudao: '50%',avg: '3500/月',back:'20天',avgPrice:'-500'},other:{kongzhi:'150套',kongzhiday:'20天',all:15000}},
            {city: '杭州',first:false,dateRange: '12-01~12-07',collect:{num:400,zhongjie:'50%',avg: '3500/月',kongzhi: '20天',months: '20月'},
              rent:{num:200,kongzhi:'10天',qudao: '50%',avg: '3500/月',back:'20天',avgPrice:'-500'},other:{kongzhi:'150套',kongzhiday:'20天',all:15000}},
            {city: '杭州',first:false,dateRange: '12-01~12-07',collect:{num:400,zhongjie:'50%',avg: '3500/月',kongzhi: '20天',months: '20月'},
              rent:{num:200,kongzhi:'10天',qudao: '50%',avg: '3500/月',back:'20天',avgPrice:'-500'},other:{kongzhi:'150套',kongzhiday:'20天',all:15000}},
            {city: '合肥',first:true,dateRange: '12-01~12-07',collect:{num:400,zhongjie:'50%',avg: '3500/月',kongzhi: '20天',months: '20月'},
              rent:{num:200,kongzhi:'10天',qudao: '50%',avg: '3500/月',back:'20天',avgPrice:'-500'},other:{kongzhi:'150套',kongzhiday:'20天',all:15000}},
            {city: '合肥',first:false,dateRange: '12-01~12-07',collect:{num:400,zhongjie:'50%',avg: '3500/月',kongzhi: '20天',months: '20月'},
              rent:{num:200,kongzhi:'10天',qudao: '50%',avg: '3500/月',back:'20天',avgPrice:'-500'},other:{kongzhi:'150套',kongzhiday:'20天',all:15000}},
            {city: '合肥',first:false,dateRange: '12-01~12-07',collect:{num:400,zhongjie:'50%',avg: '3500/月',kongzhi: '20天',months: '20月'},
              rent:{num:200,kongzhi:'10天',qudao: '50%',avg: '3500/月',back:'20天',avgPrice:'-500'},other:{kongzhi:'150套',kongzhiday:'20天',all:15000}},

          ],
          statisticalVisible: false
        }
      },
      mounted() {
        this.getCity();
        this.handleSetTime();
      },
      methods: {
        //选择数据来源
        handleChangeCompose(val) {
          this.params.compose = [];
          if(val.length >= this.helpParams.composeList.length){
            this.helpParams.compose = ['全部'];
            this.helpParams.composeShow = true;
            this.params.compose = ['new_perf','old_perf'];
            return false;
          }
          if(val.includes('全部')) {
            this.helpParams.composeShow = true;
            this.params.compose = ['new_perf','old_perf'];
          }else {
            this.helpParams.composeShow = false;
            for (var i=0;i<val.length;i++){
              this.helpParams.composeList.map(item => {
                if(val[i] === item.name) {
                  this.params.compose.push(item.value);
                }
              })
            }
          }
        },
        //选择城市
        selectCity(val) {
          var city = [];
          if(val.length >= this.cityList.length){
            this.cityAll = true;
            this.helpParams.city = ['全部'];
            this.cityList.map(value => {
              city.push(value.id);
            });
            this.params.city = city;
            console.log(this.params.city);
            return false;
          }
          if(val.includes('全部')){
            this.cityAll = true;
            this.cityList.map(value => {
              city.push(value.id);
            });
          }else {
            this.cityAll = false;
            for (var j=0;j<val.length;j++){
              this.cityList.map(value => {
                if(val[j] === value.name){
                  city.push(value.id);
                }
              })
            }
          }
          this.params.city = city;
          console.log(this.params.city);
        },
        //获取城市列表
        getCity() {
          this.$http.get(this.url + '/performance/business/cities').then(res => {
            if(res.data.code === "20010"){
              this.cityList = res.data.data;
              this.cityList.map(item => {
                this.params.city.push(item.id);
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
          console.log(this.params);
        },
        //筛选时间
        handleChangeDate(val) {
          if(val === 1 || val === 7 || val === 30){
            this.handleSetTime(val);
          }else {
            console.log("this is self time",val);
            console.log(this.helpParams.days);
          }
        },
        //设置周期
        handleSetTime(val = 1) {
          var date = new Date();
          var end_time = date.toLocaleDateString().split("/").join("-");
          var start_time = date.setDate(date.getDate() - val);
          start_time = new Date(start_time).toLocaleDateString().split("/").join("-");
          this.params.end_time = end_time;
          this.params.start_time = start_time;
          console.log(this.params);
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
          }else {
            return "otherBg";
          }
        },
        //表头单击事件
        handleHeaderClick(column) {
          console.log(column);
          if(column.label !== '收房' && column.label !== '租房' && column.label !== '其他'){
            this.statisticalVisible = true;
          }else {
            return false;
          }
        },
        handleAscOrder() {
          this.$message("升序功能尚未开放");
        },
        handleDescOrder() {
          this.$message("降序功能尚未开放");
        },
        //添加时间段
        handleAddClick(scope) {
          console.log(scope.row);
          this.$message("this is add time range operation");
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
    .vacancyBg{
      color: white;
      background-color: #36AA35 !important;
    }
    .businessBg{
      color: white;
      background-color: #DDAF6A !important;
    }
  }
</style>
