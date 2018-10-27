<template>
    <div id="editArrange">
        <div class="editTop">
            <el-row>
                <el-col span="12">
                    排班月份
                    <div class="time" >{{date}}</div>
                </el-col>
                <el-col span="12">
                    应用对象
                    <el-input type="text" size="mini" style="width:300px;"></el-input>
                </el-col>
            </el-row>
        </div>
        <div class="editTable">
            <el-table :data="tableData" border style="width: 100%">
                <el-table-column prop="one" label="一" width="180">
                </el-table-column>
                <el-table-column prop="two" label="二" width="180">
                </el-table-column>
                <el-table-column prop="three" label="三">
                </el-table-column>
                <el-table-column prop="four" label="四">
                </el-table-column>
                <el-table-column prop="five" label="五">
                </el-table-column>
                <el-table-column prop="six" label="六">
                </el-table-column>
                <el-table-column prop="seven" label="七">
                </el-table-column>
            </el-table>
        </div>
    </div>
</template>

<script>
import GetDateList from './currentData.js'
export default {
  name: "editArrange",
  props: ["date"],
  data() {
      return {
          time: '',
          tableData: [{
              one: 1,
              two: 2,
              three: 3,
              four: 4,
              five: 5,
              six: 6,
              seven: 7
          }]
      }
  },
  created() {
      console.log(GetDateList());
      
  },
  mehtod: {
      getDay() {
          let currentDate = new Date();
      }
  }
};
</script>

<style lang="scss">
#editArrange {
  width: 100%;
  .editTop {
    padding-bottom: 10px;
  }
  .time {
      display: inline-block;
      padding: 4px 10px;
      border:  1px solid #dcdfe6;
  }
}
</style>

