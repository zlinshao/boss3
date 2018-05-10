<template>
  <div>
    <el-table
      :data="rentData"
      :empty-text='emptyContent'
      v-loading="tableLoading"
      element-loading-text="拼命加载中"
      element-loading-spinner="el-icon-loading"
      element-loading-background="rgba(0, 0, 0, 0)"
      style="width: 100%">
      <el-table-column
        prop="name"
        label="房东姓名">
        <template slot-scope="scope">
          <span v-if="scope.row.name">{{scope.row.name}}</span>
          <span v-if="!scope.row.name">暂无</span>
        </template>
      </el-table-column>
      <el-table-column
        label="性别">
        <template slot-scope="scope">
          <span v-if="scope.row.sex == 1">男</span>
          <span v-else="">女</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="created_at"
        label="录入时间">
        <template slot-scope="scope">
          <span v-if="scope.row.created_at">{{scope.row.created_at}}</span>
          <span v-if="!scope.row.created_at">暂无</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="idcard"
        label="证件号码">
        <template slot-scope="scope">
          <span v-if="scope.row.idcard">{{scope.row.idcard}}</span>
          <span v-if="!scope.row.idcard">暂无</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="phone"
        label="手机号码">
        <template slot-scope="scope">
          <span v-if="scope.row.phone">{{scope.row.phone}}</span>
          <span v-if="!scope.row.phone">暂无</span>
        </template>
      </el-table-column>
    </el-table>

    <!--<div class="pagination">-->
    <!--<el-pagination-->
    <!--@current-change="currentChange"-->
    <!--:current-page="params.pages"-->
    <!--:page-size="3"-->
    <!--layout="total, prev, pager, next, jumper"-->
    <!--:total="totalNumber">-->
    <!--</el-pagination>-->
    <!--</div>-->
  </div>
</template>

<script>
  export default {
    props: ['rentContractId', 'activeName'],
    data() {
      return {
        /***********/
        rentData: [],
        isRequestData: false,
        emptyContent: '暂无数据',
        tableLoading: false,
      }
    },
    mounted() {
    },
    watch: {
      rentContractId(val) {
        this.isRequestData = false;
        if (this.activeName === 'RentInfoTab') {
          this.getData();
          this.isRequestData = true;
        }else {
          this.collectData = [];
        }
      },
      activeName(val) {
        if (this.rentContractId && val === 'RentInfoTab') {
          this.getData();
          this.isRequestData = true;
        } else {
          this.rentData = [];
        }
      }
    },
    methods: {
      getData() {
        this.tableLoading = true;
        this.emptyContent = ' ';
        this.rentData = [];
        this.$http.get(globalConfig.server + 'lease/rent/' + this.rentContractId).then((res) => {
          this.tableLoading = false;
          if (res.data.code === '61110') {
            if (Array.isArray(res.data.data.customers)) {
              this.rentData = res.data.data.customers;
            } else {
              this.rentData = [];
              this.emptyContent = '暂无数据';
            }
          } else {
            this.rentData = [];
            this.emptyContent = '暂无数据';
          }
        })
      },
      currentChange(val) {
        this.params.page = val;
        this.getData();
      },
    }
  }
</script>


<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
  .content {
    min-height: 100px;
    .tableDetail {
      width: 100%;
      border-collapse: collapse;
      tr {
        td {
          border: 1px solid #ebeef5;
          padding: 8px 0;
          color: #606266;
          text-align: center;
          &:nth-child(odd) {
            width: 8%;
          }
          &:nth-child(even) {
            width: 12%;
          }
        }
      }
    }
  }

  .remarks {
    padding: 8px;
    border-top: 1px solid #efefef;
  }
</style>
