<template>
  <div id="message">
    <div style="text-align: right;margin-bottom: 10px;">
      <el-input style="width: 250px;" size="mini" v-model="params.keywords" placeholder="请输入手机号搜索" @keyup.enter.native="getTableList('search')">
        <el-button icon="el-icon-search" slot="append" @click="getTableList"></el-button>
      </el-input>
    </div>
    <div>
      <el-table
        :data="list"
        :empty-text="empty"
        v-loading="loading"
      >
        <el-table-column label="生成时间" prop="create_time"></el-table-column>
        <el-table-column label="发送人" prop="user_name"></el-table-column>
        <el-table-column label="接收手机号" prop="receive_id"></el-table-column>
        <el-table-column label="类型" prop="category"></el-table-column>
        <el-table-column label="结果" prop="result"></el-table-column>
      </el-table>
      <el-pagination
        :total="count"
        layout="total,prev,pager,next"
        :current-page="params.pages"
        @current-change="handlePageChange"
        style="text-align: right"
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
        params: {
          pages: 1,
          keywords: ''
        },
        list: [],
        loading: false,
        empty: '',
        count: 0,
      }
    },
    mounted() {
      this.getTableList();
    },
    methods: {
      handlePageChange(page) {
        this.params.pages = page;
        this.getTableList();
      },
      emptyData() {
        this.empty = '暂无数据';
        this.count = 0;
        this.list = [];
      },
      getTableList(search) {
        if (search) {
          this.params.pages = 1;
        }
        this.loading = true;
        this.$http.get(this.url + 'message/index', {params: this.params}).then(res => {
          if (res.data.success) {
            if (res.data.data.data.length < 1) {
              this.emptyData();
            }
            this.list = res.data.data.data;
            this.count = res.data.data.count;
            this.empty = ' ';
          } else {
            this.emptyData();
          }
          this.loading = false;
        }).catch(err => {
          console.log(err);
        })
      },
    }
  }
</script>

<style scoped>

</style>
