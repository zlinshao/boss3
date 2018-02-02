<template>
  <div id="periodicTable">
    <div class="topTabs">
      <el-form :inline="true" size="mini" style="margin: 10px 0">
        <el-button v-for="(key,index) in tabs" :class="{'btn': isActive === index}"
                   @click="onSubmit(index)" size="mini" :key="index">{{key}}
        </el-button>
      </el-form>
    </div>

    <div class="filter">
      <el-form :inline="true" :model="form" size="mini" label-width="80px">
        <el-form-item>
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
          <el-dropdown @command="leadingOut">
            <el-button type="primary" size="mini">
              导出<i class="el-icon-arrow-down el-icon--right"></i>
            </el-button>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item v-for="(key,index) in tabs" :command="index + 1" :key="index">{{key}}</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </el-form-item>
      </el-form>
    </div>

    <el-table
      v-if="isActive == 0"
      :data="tableData"
      width="100%">
      <el-table-column
        label="名称"
        prop="id">
      </el-table-column>
      <el-table-column
        label="收房(套)"
        prop="describe">
      </el-table-column>
      <el-table-column
        label="租房(套)"
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
        label="所属部门"
        prop="module">
      </el-table-column>
      <el-table-column
        label="备注"
        prop="module">
      </el-table-column>
    </el-table>

    <el-table
      v-if="isActive == 1"
      :data="tableData1"
      width="100%">
      <el-table-column
        label="名称"
        prop="id">
      </el-table-column>
      <el-table-column
        label="收房(套)"
        prop="describe">
      </el-table-column>
      <el-table-column
        label="租房(套)"
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
        label="所属部门"
        prop="module">
      </el-table-column>
      <el-table-column
        label="备注"
        prop="module">
      </el-table-column>
    </el-table>

    <el-table
      v-if="isActive == 2"
      :data="tableData"
      width="100%">
      <el-table-column
        label="名称"
        prop="id">
      </el-table-column>
      <el-table-column
        label="收房(套)"
        prop="describe">
      </el-table-column>
      <el-table-column
        label="租房(套)"
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
        label="所属部门"
        prop="module">
      </el-table-column>
      <el-table-column
        label="备注"
        prop="module">
      </el-table-column>
    </el-table>

    <el-table
      v-if="isActive == 3"
      :data="tableData"
      width="100%">
      <el-table-column
        label="名称"
        prop="id">
      </el-table-column>
      <el-table-column
        label="收房(套)"
        prop="describe">
      </el-table-column>
      <el-table-column
        label="租房(套)"
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
        label="所属部门"
        prop="module">
      </el-table-column>
      <el-table-column
        label="备注"
        prop="module">
      </el-table-column>
    </el-table>

    <el-table
      v-if="isActive == 4"
      :data="tableData"
      width="100%">
      <el-table-column
        label="名称"
        prop="id">
      </el-table-column>
      <el-table-column
        label="收房(套)"
        prop="describe">
      </el-table-column>
      <el-table-column
        label="租房(套)"
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
        label="所属部门"
        prop="module">
      </el-table-column>
      <el-table-column
        label="备注"
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
        tabs: ['个人', '组', '区', '城市', '公司'],
        isActive: 0,
        currentPage: 1,
        form: {
          organize: '',
          dates: '',
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

        tableData: [
          {
            id: 1,
            describe: '1发发的挥到',
            module: '1Manger',
          }, {
            id: 2,
            describe: '2放大范德萨',
            module: '1Manger',
          },
        ],
        tableData1: [
          {
            id: 1,
            describe: '1发发的挥到',
            module: '1Manger',
          }, {
            id: 2,
            describe: '2放大范德萨',
            module: '1Manger',
          },{
            id: 2,
            describe: '2放大范德萨',
            module: '1Manger',
          },{
            id: 2,
            describe: '2放大范德萨',
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
      // tabs切换
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
  #periodicTable {

  }
</style>
