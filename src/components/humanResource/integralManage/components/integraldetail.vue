<template>
  <div id="integraldetail">
    <div class="integrationdown">
      <el-button type="primary">积分明细下载</el-button>
      <div style="margin-left: 20px">
        <el-select v-model="value" placeholder="请选择">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </div>
    </div>
    <div style="margin-top: 10px">
      <el-table
        :data="tableData"
        style="width: 100%">
        <el-table-column
          prop="date"
          label="标题"
          width="180">
        </el-table-column>
        <el-table-column
          prop="name"
          label="详情">
        </el-table-column>
        <el-table-column
          prop="address"
          label="日期">
        </el-table-column>
      </el-table>
    </div>
    <div class="pagination">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page.sync="currentPage2"
        :page-sizes="[10, 20, 30, 40]"
        :page-size="100"
        layout="sizes, prev, pager, next"
        :total="1000">
      </el-pagination>
    </div>
  </div>
</template>

<script>
  export default {
    name: "integraldetail",
    data() {
      return {
        options: [{
          value: '选项1',
          label: '得分项目'
        }, {
          value: '选项2',
          label: '失分项目'
        },],
        value: '',

        tableData: [{
          date: '得分项目',
          name: ' Lorem ipsum dolor sit amet, consectetur adipisicing elit.',
          address: '2016-05-04'
        }, {
          date: '失分项目',
          name: ' Lorem ipsum dolor sit amet, consectetur adipisicing elit. Maiores, non, quo. A ad alias dolor, dolorum earu',
          address: '2016-05-04'
        }, {
          date: '失分项目',
          name: ' Lorem ipsum dolor sit amet, consectetur adipisicing elit. Maiores, non, quo. A ad alias dolor, dolorum earu',
          address: '2016-05-04'
        }, {
          date: '得分项目',
          name: ' Lorem ipsum dolor sit amet, consectetur adipisicing elit. Maiores, non, quo. A ad alias dolor, dolorum earu',
          address: '2016-05-04'
        }],

        currentPage2: 1,
      }
    },
    methods: {
      handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
      },
      handleCurrentChange(val) {
        console.log(`当前页: ${val}`);
      }
    },
  }
</script>

<style scoped lang="scss">
  @mixin flex {
    display: -webkit-flex;
    display: flex;
  }

  @mixin border_radius($n) {
    -webkit-border-radius: $n;
    -moz-border-radius: $n;
    border-radius: $n;
  }

  #integraldetail {
    .integrationdown {
      @include flex;
      justify-content: flex-end;
    }
    .pagination {
      text-align: right;
      margin-top: 10px;
    }
  }
</style>
