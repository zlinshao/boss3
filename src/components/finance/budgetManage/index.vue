<template>
  <div>
    <div class="filter">
      <el-form :inline="true" :model="form" size="mini">
        <el-form-item>
          <el-date-picker
            v-model="form.dates"
            type="daterange"
            unlink-panels
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            :picker-options="pickerOptions">
          </el-date-picker>
        </el-form-item>
      </el-form>
    </div>

    <el-table :data="tableData"
              style="width: 100%">
      <el-table-column
        prop="date"
        label="短信生成时间"
        width="180">
      </el-table-column>
      <el-table-column
        prop="name"
        label="发送人"
        width="180">
      </el-table-column>
      <el-table-column
        prop="mobile"
        label="接收人手机">
      </el-table-column>
      <el-table-column
        prop="types"
        label="类型">
      </el-table-column>
      <el-table-column
        prop="fruit"
        label="结果">
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
  export default {
    name: "index",
    data() {
      return {
        form: {
          dates: '',
        },
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
            text: '未来一周',
            onClick(picker) {
              const start = new Date();
              const end = new Date();
              end.setTime(start.getTime() + 3600 * 1000 * 24 * 7);
              picker.$emit('pick', [start, end]);
            },
          }, {
            text: '最近一个月',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              picker.$emit('pick', [start, end]);
            }
          }, {
            text: '未来一个月',
            onClick(picker) {
              const start = new Date();
              const end = new Date();
              end.setTime(start.getTime() + 3600 * 1000 * 24 * 30);
              picker.$emit('pick', [start, end]);
            },
          }, {
            text: '最近三个月',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
              picker.$emit('pick', [start, end]);
            },
          }, {
            text: '最近三个月',
            onClick(picker) {
              const start = new Date();
              const end = new Date();
              end.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
              picker.$emit('pick', [start, end]);
            },
          }]
        },
        tableData: [
          {
            date: '2016-05-02',
            name: '王小虎',
            mobile: '18052111111',
            types: '离职提醒',
            fruit: '成功',
          },  {
            date: '2016-05-02',
            name: '王小虎',
            mobile: '18052111111',
            types: '离职提醒',
            fruit: '成功',
          },  {
            date: '2016-05-02',
            name: '王小虎',
            mobile: '18052111111',
            types: '离职提醒',
            fruit: '成功',
          },  {
            date: '2016-05-02',
            name: '王小虎',
            mobile: '18052111111',
            types: '离职提醒',
            fruit: '成功',
          },  {
            date: '2016-05-02',
            name: '王小虎',
            mobile: '18052111111',
            types: '离职提醒',
            fruit: '成功',
          },  {
            date: '2016-05-02',
            name: '王小虎',
            mobile: '18052111111',
            types: '离职提醒',
            fruit: '成功',
          },  {
            date: '2016-05-02',
            name: '王小虎',
            mobile: '18052111111',
            types: '离职提醒',
            fruit: '成功',
          },
        ],
      }
    },
    mounted() {
    },
    watch: {},
    methods: {},
  }
</script>

<style scoped>

</style>
