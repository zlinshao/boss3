<template>
  <div id="periodicTable">
    <div class="filter">
      <el-form :inline="true" :model="form" size="mini" label-width="80px">
        <el-form-item>
          <el-select v-model="form.status" clearable size="mini">
            <el-option label="款项状态" value=""></el-option>
            <el-option v-for="(key,index) in values" :label="key" :value="index + 1" :key="index"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="补齐时间">
          <div class="block">
            <el-date-picker
              v-model="form.dates"
              type="daterange"
              align="right"
              unlink-panels
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              :picker-options="pickerOptions">
            </el-date-picker>
          </div>
        </el-form-item>
        <el-form-item>
          <el-input v-model="form.organize" @focus="openOrganize" placeholder="请选择部门/员工"
                    readonly>
            <template slot="append">
              <div style="cursor: pointer;" @click="close_">清空</div>
            </template>
          </el-input>
        </el-form-item>
        <el-form-item>
          <el-autocomplete
            class="inline-input"
            v-model="state" clearable
            :fetch-suggestions="querySearch"
            placeholder="请输入内容"
            :trigger-on-focus="false"
            @select="handleSelect">
            <el-button slot="append" icon="el-icon-search"></el-button>
          </el-autocomplete>
        </el-form-item>
        <el-form-item>
          <el-button type="primary">导出</el-button>
        </el-form-item>
      </el-form>
    </div>

    <el-table
      :data="tableData"
      width="100%">
      <el-table-column
        label="发喜报日期"
        prop="id">
      </el-table-column>
      <el-table-column
        label="房屋地址"
        prop="describe">
      </el-table-column>
      <el-table-column
        label="收房状态"
        prop="module">
      </el-table-column>
      <el-table-column
        label="付款方式"
        prop="module">
      </el-table-column>
      <el-table-column
        label="签约月数"
        prop="module">
      </el-table-column>
      <el-table-column
        label="单价"
        prop="module">
      </el-table-column>
      <el-table-column
        label="总金额"
        prop="module">
      </el-table-column>
      <el-table-column
        label="空置期"
        prop="module">
      </el-table-column>
      <el-table-column
        label="中介费"
        prop="module">
      </el-table-column>
      <el-table-column
        label="实际业绩"
        prop="module">
      </el-table-column>
      <el-table-column
        label="溢出业绩"
        prop="module">
      </el-table-column>
      <el-table-column
        label="姓名"
        prop="module">
      </el-table-column>
      <el-table-column
        label="所属部门"
        prop="module">
      </el-table-column>
    </el-table>

    <div class="block pages">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="[20, 100, 200, 300, 400]"
        :page-size="20"
        layout="total, sizes, prev, pager, next, jumper"
        :total="400">
      </el-pagination>
    </div>

    <!--组织架构-->
    <organization :organizationDialog="organizeVisible" @close="closeOrganize"></organization>
  </div>
</template>

<script>
  import organization from '../../common/organization.vue'


  export default {
    name: 'index',
    components: {organization},
    data() {
      return {
        currentPage: 1,
        values: ['出租', '提前一个月出租', '提前二个月以上续租'],
        form: {
          status: '',
          organize: '',
          dates: '',
          subject: '',
          keywords: '',
        },
        organizeVisible: false,

        pickerOptions: {
          shortcuts: [{
            text: '最近一周',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit('pick', [start, end]);
            }
          }, {
            text: '最近一个月',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              picker.$emit('pick', [start, end]);
            }
          }, {
            text: '最近三个月',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
              picker.$emit('pick', [start, end]);
            }
          }]
        },
        tabs: ['月报表', '日报表'],
        isActive: 0,

        tableData: [
          {
            id: 1,
            describe: '1发挥到了萨菲航空斯大林饭卡上的',
            module: '1Manger',
          }, {
            id: 2,
            describe: '1发挥到了萨菲航空斯大林饭卡上的',
            module: '1Manger',
          },
        ],

        restaurants: [],
        state: ''
      }
    },
    mounted() {
      this.restaurants = this.loadAll();
    },
    methods: {
      // 部门员工筛选
      openOrganize() {
        this.organizeVisible = true;
      },
      // 部门员工筛选
      closeOrganize() {
        this.organizeVisible = false;
      },
      // 清空部门
      close_() {
        console.log(1);
      },

      querySearch(queryString, cb) {
        let restaurants = this.restaurants;
        let results = queryString ? restaurants.filter(this.createFilter(queryString)) : restaurants;
        // 调用 callback 返回建议列表的数据
        cb(results);
      },
      createFilter(queryString) {
        return (restaurant) => {
          return (restaurant.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0);
        };
      },
      handleSelect(item) {
        console.log(item);
      },
      loadAll() {
        return [
          {"value": "三全鲜食（北新泾店）", "address": "长宁区新渔路144号"},
          {"value": "Hot honey 首尔炸鸡（仙霞路）", "address": "上海市长宁区淞虹路661号"},
          {"value": "新旺角茶餐厅", "address": "上海市普陀区真北路988号创邑金沙谷6号楼113"},
          {"value": "泷千家(天山西路店)", "address": "天山西路438号"},
          {"value": "胖仙女纸杯蛋糕（上海凌空店）", "address": "上海市长宁区金钟"},
          {"value": "贡茶", "address": "上海市长宁区金钟路633号"},
          {"value": "豪大大香鸡排超级奶爸", "address": "上海市嘉定区曹安公路曹安路1685号"},
          {"value": "茶芝兰（奶茶，手抓饼）", "address": "上海市普陀区同普路1435号"},
          {"value": "十二泷町", "address": "上海市北翟路1444弄81号B幢-107"},
          {"value": "星移浓缩咖啡", "address": "上海市嘉定区新郁路817号"},
          {"value": "阿姨奶茶/豪大大", "address": "嘉定区曹安路1611号"},
        ]
      },
      onSubmit(val) {
        this.isActive = val;
        if (val === 0) {

        }
      },
      // 导出
      leadingOut(val) {
        console.log(val);
      },
      handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
      },
      handleCurrentChange(val) {
        console.log(`当前页: ${val}`);
      },
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
  #statistics {
    $color: #409EFF;
    .btn {
      background-color: $color;
      border-color: $color;
      color: #FFFFFF;
      margin-bottom: 10px;
      /*<!-- -webkit-box-shadow: 0 2px 15px 0 $color;-->*/
      /*<!-- -moz-box-shadow: 0 2px 15px 0 $color;-->*/
      /*<!--box-shadow: 0 2px 15px 0 $color;-->*/
    }
  }
</style>
