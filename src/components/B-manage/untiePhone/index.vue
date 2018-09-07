<template>
  <div>
    <div class="highRanking">
      <div class="highSearch">
        <el-form :inline="true" onsubmit="return false" size="mini">
          <el-form-item>
            <el-input placeholder="请输入姓名" v-model="params.keywords" @keyup.enter.native="search(1)" size="mini"
                      clearable>
              <el-button slot="append" icon="el-icon-search" @click="search(1)"></el-button>
            </el-input>
          </el-form-item>
        </el-form>
      </div>
    </div>
    <el-table
      :empty-text='emptyContent'
      v-loading="examineLoading"
      element-loading-text="拼命加载中"
      element-loading-spinner="el-icon-loading"
      element-loading-background="rgba(255, 255, 255, 0)"
      :data="tableData"
      style="width: 100%">
      <el-table-column
        prop="create_time"
        label="时间">
      </el-table-column>
      <el-table-column
        prop="name"
        label="申请人">
      </el-table-column>
      <el-table-column
        prop="contact"
        label="申请账号">
      </el-table-column>
      <el-table-column
        prop="contact"
        label="联系方式">
      </el-table-column>
      <el-table-column
        prop="description"
        label="原因">
      </el-table-column>
      <el-table-column
        prop="type"
        label="操作">
        <template slot-scope="scope">
          <div v-if="scope.row.type === 2">
            <el-button @click="operations(scope.row, 1)" type="primary" size="mini">解绑</el-button>
            <el-button @click="operations(scope.row, 2)" type="danger" size="mini">拒绝</el-button>
          </div>
          <div v-if="scope.row.type === 1" style="color: #409EFF;">
            已解绑
          </div>
          <div v-if="scope.row.type === 3" style="color: red;">
            已拒绝
          </div>
        </template>
      </el-table-column>
    </el-table>
    <div class="block pages">
      <el-pagination
        @current-change="search"
        :current-page="params.page"
        :page-size="params.limit"
        layout="total, prev, pager, next, jumper"
        :total="paging">
      </el-pagination>
    </div>
  </div>
</template>

<script>
  export default {
    name: "index",
    data() {
      return {
        url: globalConfig.server,
        emptyContent: ' ',
        examineLoading: false,
        tableData: [],
        paging: 20,
        params: {
          keywords: '',
          page: 1,
          limit: 8,
        },
      }
    },
    mounted() {
      this.phoneList();
    },
    activated() {
    },
    watch: {},
    methods: {
      search(val) {
        this.params.page = val;
        this.phoneList();
      },
      phoneList() {
        this.emptyContent = ' ';
        this.examineLoading = true;
        this.$http.get(this.url + 'bapi/plant/geterrornum', {
          params: this.params,
        }).then((res) => {
          this.examineLoading = false;
          if (res.data.code === '20020') {
            this.paging = res.data.data.total;
            this.tableData = res.data.data.data;
          } else {
            this.tableData = [];
            this.paging = 0;
            this.emptyContent = '暂无数据';
          }
        })
      },
      operations(data, val) {
        let params = {
          plant_id: data.plant_id,
          phone: data.phone,
          type: val,
          id: data.id,
        };
        let text = '';
        if (val === 1) {
          text = '同意'
        } else {
          text = '拒绝'
        }
        this.$confirm('此操作将' + text + '解绑手机, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$http.post(this.url + 'bapi/plant/edit', params).then((res) => {
            if (res.data.code === '20020') {
              this.phoneList();
              this.$notify.success({
                title: "成功",
                message: res.data.msg,
              });
            } else {
              this.$notify.warning({
                title: "警告",
                message: res.data.msg,
              });
            }
          })
        }).catch(() => {

        });
      }
    },
  }
</script>

<style lang="scss">

</style>
