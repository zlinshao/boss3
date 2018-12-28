<template>
    <div id="dailyLog">
      <div style="margin-bottom: 10px;text-align: right">
        <el-date-picker
          size="mini"
          v-model="date"
          type="datetimerange"
          value-format="yyyy-MM-dd HH-mm-ss"
          range-separator="至"
          @change="handlePickerDate"
          start-placeholder="开始日期"
          end-placeholder="结束日期">
        </el-date-picker>
        <el-input size="mini" style="width: 15%;" clearable @keydown.enter.native="getLogList" v-model="params.key" placeholder="请输入需要搜索的内容">
          <el-button slot="append" icon="el-icon-search"></el-button>
        </el-input>
      </div>
      <div>
        <el-table
          :data="logList"
        >
          <el-table-column prop="user_name" label="操作人"></el-table-column>
          <el-table-column prop="create_time" label="创建时间"></el-table-column>
          <el-table-column prop="ip" label="ip"></el-table-column>
          <el-table-column prop="model" label="模型"></el-table-column>
          <el-table-column prop="method" label="方法"></el-table-column>
          <el-table-column prop="params" label="备注">
            <template slot-scope="scope">
              {{ JSON.parse(scope.row.params) && JSON.parse(scope.row.params).content}}
            </template>
          </el-table-column>
        </el-table>
        <el-pagination
          :total="logCount"
          style="text-align: right"
          :current-page="params.num"
          :page-size="params.size"
          layout="total,prev,pager,next"
          @current-change="handlePageChange"
        ></el-pagination>
      </div>
    </div>
</template>

<script>
    export default {
        name: "index",
      data() {
          return {
            url: globalConfig.finance_server,
            logList: [],
            logCount: 0,
            date: '',
            params: {
              size: 12,
              num: 1,
              key: '',
              start_time: '',
              end_time: ''
            }
          }
      },
      mounted() {
        this.getLogList();
      },
      methods: {
        handlePickerDate(date) {
          this.params.start_time = date[0];
          this.params.end_time = date[1];
          this.getLogList();
        },
        handlePageChange(num) {
          this.params.num = num;
          this.getLogList();
        },
        getLogList() {
          this.$http.get(this.url + 'logmanage/index',{
            params: this.params
          }).then(res => {
            if (res.data.success ){
              this.logList = res.data.data.data;
              this.logCount = res.data.data.count;
            }
          }).catch(err => {
            console.log(err);
          })
        }
      }
    }
</script>

<style scoped>

</style>
