<template>
  <div id="periodicTable">
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="个人" name="first">
        <periodic-person></periodic-person>
      </el-tab-pane>
      <el-tab-pane label="组" name="second">
        <periodic-group></periodic-group>
      </el-tab-pane>
      <el-tab-pane label="区" name="third">
        <periodic-region></periodic-region>
      </el-tab-pane>
      <el-tab-pane label="城市" name="fourth">
        <periodic-city></periodic-city>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
  import periodicPerson from './periodicPerson.vue';
  import periodicGroup from './periodicGroup.vue';
  import periodicRegion from './periodicRegion.vue';
  import periodicCity from './periodicCity.vue';
  export default {
    name: 'index',
    components: {periodicPerson,periodicGroup,periodicRegion,periodicCity},
    data() {
      return {
        isHigh: false,
        activeName: 'first',
        restaurants: [],
      }
    },
    mounted() {
      this.restaurants = this.loadAll();
    },
    methods: {

      // tabs标签页
      handleClick(tab, event) {
        // console.log(tab, event);
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
        // console.log(item);
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

    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">

</style>
