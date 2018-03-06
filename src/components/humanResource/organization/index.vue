<template>
  <div>
    <el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange">全选</el-checkbox>
    <div style="margin: 15px 0;"></div>

    {{cities}} {{checkedCities}}

    <ul>
      <li v-for="city in cities" style="display: flex;justify-content: space-between">
        <el-checkbox-group v-model="checkedCities" @change="handleCheckedCitiesChange">
          <el-checkbox  :label="city" :key="city">{{city}}</el-checkbox>
        </el-checkbox-group>

        fadsfsdfsd
      </li>
    </ul>

  </div>

</template>
<script>
  const cityOptions = ['上海', '北京', '广州', '深圳'];
  export default {
    data() {
      return {
        checkAll: false,
        checkedCities: ['上海', '北京'],
        cities: cityOptions,
        isIndeterminate: true
      };
    },
    methods: {
      handleCheckAllChange(val) {
        this.checkedCities = val ? cityOptions : [];
        this.isIndeterminate = false;
      },
      handleCheckedCitiesChange(value) {
        let checkedCount = value.length;
        this.checkAll = checkedCount === this.cities.length;
        this.isIndeterminate = checkedCount > 0 && checkedCount < this.cities.length;
      }
    }
  };
</script>
