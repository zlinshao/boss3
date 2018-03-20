<template>
  <div id="integralDetail">
    <div class="highRanking">
      <div class="highSearch">
        <el-form :inline="true" size="mini">
          <el-form-item>
            <el-select v-model="value" size="mini" clearable placeholder="请选择" @change="search">
              <el-option v-for="(item,index) in options" :key="index" :label="item" :value="index">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" size="mini" @click.native="downloadIntegralList">明细下载</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>

    <el-table
      :data="itemList"
      style="width: 100%">
      <el-table-column
        prop="minus"
        label="项目类别"
        width="180">
        <template slot-scope="scope">
          <div v-if="scope.row.minus === 0">得分项目</div>
          <div v-else>失分项目</div>
        </template>
      </el-table-column>
      <el-table-column
        prop="name"
        label="项目详情">
      </el-table-column>
      <el-table-column
        prop="amount_str"
        label="积分奖惩">
      </el-table-column>
      <el-table-column
        prop="date"
        label="日期">
      </el-table-column>
    </el-table>

    <div class="block pages">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-size="form.limit"
        layout="total, prev, pager, next, jumper"
        :total="paging">
      </el-pagination>
    </div>
  </div>
</template>

<script>
  export default {
    name: "integral-detail",
    data() {
      return {
        urls: globalConfig.server,
        form: {
          page: 1,
          limit: 12,
          minus: '',
        },
        paging: 0,
        options: ['得分项目', '失分项目'],
        value: '',
        itemList: [],
        currentPage: 1,
      }
    },
    mounted() {
      this.getIntegralList(1);
    },
    methods: {
      // 重置
      resetting() {
        this.form.pages = 1;
        this.form.minus = '';
        this.getIntegralList(1);
      },

      search(val) {
        this.form.minus = val;
        this.getIntegralList(1);
      },

      getIntegralList(val) {
        this.form.page = val;
        let address;
        if (this.form.minus === '') {
          address = 'credit';
        } else if (this.form.minus === 0) {
          address = 'credit/gain';
        } else {
          address = 'credit/lose';
        }
        this.$http.get(this.urls + address, {
          params: this.form,
        }).then((res) => {
          if (res.data.code === '30110') {
            this.itemList = res.data.data;
            this.paging = res.data.num;
          } else {
            this.itemList = [];
            this.paging = 0;
          }
        })
      },

      downloadIntegralList() {
        this.$http.get(this.urls + 'credit/download', {
          params: this.form
        }).then((res) => {
          console.log(res);
        })
      },

      handleSizeChange(val) {
        console.log(val);
      },
      handleCurrentChange(val) {
        this.getIntegralList(val);
      }
    },
  }
</script>

<style lang="scss">

</style>
