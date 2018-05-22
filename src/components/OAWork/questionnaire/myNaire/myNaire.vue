<template>
  <div>
    <div id="myNaire">
      <div class="main">
        <div class="myHouse">
          <div class="blueTable">
            <el-table
              :data="questionNaireData"
              :empty-text='tableStatus'
              v-loading="tableLoading"
              element-loading-text="拼命加载中"
              element-loading-spinner="el-icon-loading"
              element-loading-background="rgba(255, 255, 255, 0)"
              style="width: 100%">
              <el-table-column
                prop="name"
                label="标题">
                <template slot-scope="scope">
                  <span v-if="scope.row.name">{{scope.row.name}}</span>
                  <span v-else>暂无</span>
                </template>
              </el-table-column>
              <el-table-column
                prop="start_time"
                label="开始时间">
                <template slot-scope="scope">
                  <span v-if="scope.row.start_time">{{scope.row.start_time}}</span>
                  <span v-else>暂无</span>
                </template>
              </el-table-column>
              <el-table-column
                prop="end_time"
                label="结束时间">
                <template slot-scope="scope">
                  <span v-if="scope.row.end_time">{{scope.row.end_time}}</span>
                  <span v-else>暂无</span>
                </template>
              </el-table-column>
              <el-table-column
                label="操作">
                <template slot-scope="scope">
                  <el-button v-if="scope.row.available && !scope.row.result_id" type="primary" size="mini"
                             @click="answerNaire(scope.row.id)">点击作答
                  </el-button>
                  <span v-if="scope.row.result_id" type="primary" size="mini"
                        style="cursor: pointer;color: #6a8dfb;">已完成</span>
                </template>
              </el-table-column>
            </el-table>
          </div>
          <div class="block pages">
            <el-pagination
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
              :current-page="form.page"
              :page-size="12"
              layout="total, prev, pager, next, jumper"
              :total="tableNum">
            </el-pagination>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "my-naire",
    data() {
      return {
        tableData: [],
        tableNum: 0,
        form: {
          page: 1,
          limit: 12,
        },
        questionNaireData: [],
        tableStatus: ' ',
        tableLoading: false,
      };
    },
    activated() {
      this.getQuesNaireData();
    },
    watch: {},
    methods: {
      answerNaire(id) {
        setTimeout(() => {
          this.$router.push({path: '/answerNaire', query: {id: id}});
        }, 0);
      },
      getQuesNaireData() {
        this.tableStatus = " ";
        this.tableLoading = true;
        this.$http.get(globalConfig.server + 'questionnaire/my').then((res) => {
          this.tableLoading = false;
          if (res.data.code === '30000') {
            this.questionNaireData = res.data.data.data;
            this.tableNum = res.data.data.count;
            if (res.data.data.data.length < 1) {
              this.tableStatus = "暂无数据";
              this.questionNaireData = [];
              this.tableNum = 0;
            }
          } else {
            this.tableStatus = "暂无数据";
            this.questionNaireData = [];
            this.tableNum = 0;
          }
        });
      },
      handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
      },
      handleCurrentChange(val) {
        console.log(`当前页： ${val}`);
        this.form.page = val;
        this.getQuesNaireData();
      }
    }
  };
</script>

<style lang="scss" scoped>

</style>
