<template>
    <div>
      <el-table
        :data="tableData"
        :empty-text='tableStatus'
        v-loading="tableLoading"
        element-loading-text="拼命加载中"
        element-loading-spinner="el-icon-loading"
        element-loading-background="rgba(255, 255, 255, 0)"
        style="width: 100%">
        <el-table-column
          prop="create_time"
          label="创建时间">
          <template slot-scope="scope">
            <span v-if="scope.row.create_time">{{scope.row.create_time}}</span>
            <span v-if="!scope.row.create_time">暂无</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="contract_number"
          label="合同编号">
          <template slot-scope="scope">
            <span v-if="scope.row.contract_number">{{scope.row.contract_number}}</span>
            <span v-if="!scope.row.contract_number">暂无</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="house_name"
          label="房屋地址">
          <template slot-scope="scope">
            <span v-if="scope.row.house_name">{{scope.row.house_name}}</span>
            <span v-if="!scope.row.house_name">暂无</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="update_time"
          label="资料补齐时间">
          <template slot-scope="scope">
            <span v-if="scope.row.update_time">{{scope.row.update_time}}</span>
            <span v-if="!scope.row.update_time">暂无</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="content"
          label="备忘内容">
          <template slot-scope="scope">
            <span v-if="scope.row.content">{{scope.row.content}}</span>
            <span v-if="!scope.row.content">暂无</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="receivers"
          label="接收人">
          <template slot-scope="scope">
            <span v-if="scope.row.receivers">{{scope.row.receivers}}</span>
            <span v-if="!scope.row.receivers">暂无</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="sender"
          label="发送人">
          <template slot-scope="scope">
            <span v-if="scope.row.sender">{{scope.row.sender}}</span>
            <span v-if="!scope.row.sender">暂无</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="is_send"
          label="操作类型">
          <template slot-scope="scope">
            <span v-if="scope.row.is_send===0">保存</span>
            <span v-if="scope.row.is_send===1">发送</span>
            <span v-if="scope.row.is_send===null">暂无</span>
          </template>
        </el-table-column>
      </el-table>
      <div class="block pages">
        <div>
          <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="params.page"
            :page-sizes="[3, 6, 9, 12]"
            :page-size="3"
            layout="total, sizes, prev, pager, next, jumper"
            :total="totalNum">
          </el-pagination>
        </div>
      </div>
    </div>
</template>

<script>
    export default {
        name: 'hello',
        props: ['activeName', 'collectContractId'],
        data () {
            return {
              tableStatus: ' ',
              tableLoading: false,
              tableData: [],
              totalNum: 0,
              params: {
                page: 1,
                limit: 3,
                contract_id: '',
                is_lease :1,
                is_rent:0,
              },

            }
        },
      mounted() {
        this.getTableData();
      },
      activated() {
        this.getTableData();
      },
      watch: {
        activeName(val){
          if(val=== 'CollectMemorandumTab'){
            this.getTableData();
          }
        },
        collectContractId(val) {
          this.params.contract_id = val;
          if(this.activeName === 'CollectMemorandumTab'){
            this.getTableData();
          }
        },
      },
      methods: {
        getTableData() {
          this.tableStatus = " ";
          this.tableLoading = true;
          this.$http.get(globalConfig.server + 'lease/note/index',{params:this.params}).then((res) => {
            this.tableLoading = false;
            if (res.data.code === '60510') {
              this.tableData = res.data.data;
              this.totalNum = res.data.num;
              if (res.data.data.length < 1) {
                this.tableStatus = "暂无数据";
                this.tableData = [];
                this.totalNum = 0;
              }
            } else {
              this.tableStatus = "暂无数据";
              this.tableData = [];
              this.totalNum = 0;
            }
          });
        },
        handleSizeChange(val) {
          console.log(`每页 ${val} 条`);
          this.params.limit = val;
          this.getTableData();
        },
        handleCurrentChange(val) {
          console.log(`当前页: ${val}`);
          this.params.page = val;
          this.getTableData();
        },
      },
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">

</style>
