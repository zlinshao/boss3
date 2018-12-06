<template>
    <div id="business">
      <div>
        <el-row :gutter="20">
          <el-col :span="6">
            <div>
              <span>区域：</span>
              <el-radio-group v-model="params.area">
                <el-radio label="city">全部城市</el-radio>
                <el-radio label="area">全部片区</el-radio>
                <el-radio label="approval">新绩效片区</el-radio>
              </el-radio-group>
            </div>
          </el-col>
          <el-col :span="18">
            <div>
              <span>时间：</span>
              <el-radio-group v-model="params.time">
                <el-radio :label="1">最近1天</el-radio>
                <el-radio :label="7">最近7天</el-radio>
                <el-radio :label="30">最近30天</el-radio>
                <el-radio label="self">
                  <template>
                    <el-input type="number" size="mini" style="width: 80px;"></el-input>
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
            </div>
          </el-col>
        </el-row>
      </div>
      <div style="margin-top: 30px;width: 60%;">
        <el-row :gutter="20">
          <el-col :span="3">
            <el-checkbox v-model="params.autoContrast" size="mini" style="margin-top: 5px;">增加对比项</el-checkbox>
          </el-col>
          <el-col :span="4">
            <el-select v-model="params.groupSort" size="mini">
              <el-option value="group" label="区域内排序"></el-option>
              <el-option value="all" label="区域间排序"></el-option>
            </el-select>
          </el-col>
          <el-col :span="4">
            <el-select v-model="params.price" size="mini">
              <el-option value="avg" label="平均差价"></el-option>
            </el-select>
          </el-col>
          <el-col :span="4">
              <el-button type="primary" size="mini" @click="handleAscOrder">升序</el-button>
              <el-button type="primary" size="mini" @click="handleDescOrder">降序</el-button>
          </el-col>
        </el-row>
      </div>

      <div style="margin-top: 30px;">
        <el-table
          :header-cell-class-name="headerStyle"
          :cell-style="cellStyle"
          :data="businessList"
          @header-click="handleHeaderClick"
        >
          <el-table-column label="区域">
            <template slot-scope="scope">
              <div>
                <span v-if="scope.row.first">{{ scope.row.city }}</span><br>
                <el-button v-if="scope.row.first && params.groupSort === 'group'" type="text" size="mini" icon="el-icon-plus" @click="handleAddClick">时间段</el-button>
              </div>
            </template>
          </el-table-column>
          <el-table-column label="时间段" prop="dateRange"></el-table-column>

          <el-table-column label="收房">
            <el-table-column label="数量" prop="collect.num"></el-table-column>
            <el-table-column label="渠道单对比" prop="collect.zhongjie"></el-table-column>
            <el-table-column label="均价" prop="collect.avg"></el-table-column>
            <el-table-column label="空置期" prop="collect.kongzhi"></el-table-column>
            <el-table-column label="总月数" prop="collect.months"></el-table-column>
          </el-table-column>
          <el-table-column label="租房">
            <el-table-column label="数量" prop="rent.num"></el-table-column>
            <el-table-column label="已空置" prop="rent.kongzhi"></el-table-column>
            <el-table-column label="渠道单对比" prop="rent.qudao"></el-table-column>
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
          params: {
            area: 'city',
            time: 1,
            dateTime: '',
            autoContrast: false,
            groupSort: 'group',
            price: ''
          },
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
      methods: {
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
        handleAddClick() {
          this.$message("this is add time range operation");
        },
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
        }
      }
    }
</script>

<style lang="scss">
  #business{
    width: 100%;
    /*.el-table--border th{*/
      /*border-bottom: 1px solid #808080 !important;*/
      /*border-right: 1px solid #808080 !important;*/
    /*}*/
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
