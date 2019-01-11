<template>
    <div id="customerSel">
      <el-dialog
        :visible.sync="dialogVisible"
        title="客户列表"
        @close="handleCloseCustomer"
      >
        <el-row :gutter="20" style="margin-bottom: 20px">
          <el-col :span="10">
            <span>客户类型</span>
            <el-select v-model="params.type" size="mini" style="width: 70%">
              <el-option :value="1" label="房东"></el-option>
              <el-option :value="2" label="租客"></el-option>
              <el-option :value="3" label="未知租客"></el-option>
            </el-select>
          </el-col>
          <el-col :span="12">
            <el-input v-model="params.search" size="mini" clearable style="width: 65%" placeholder="请输入需要搜索的内容">
              <el-button slot="append" icon="el-icon-search" @click="getCustomerList"></el-button>
            </el-input>
            <el-button size="mini" type="primary" @click="getCustomerList">搜索</el-button>
            <el-button size="mini" type="success" @click="handleOkSel">确定选择</el-button>
          </el-col>
        </el-row>
        <el-table
          :data="customer_list"
          highlight-current-row
          @current-change="customer_list_select"
        >
          <el-table-column label="客户名称" prop="customer_name"></el-table-column>
          <el-table-column label="身份" prop="ident"></el-table-column>
          <el-table-column label="房屋地址" prop="address" min-width="150px"></el-table-column>
          <el-table-column label="账户" prop="account_owner"></el-table-column>
          <el-table-column label="账号" prop="account_num" min-width="150px"></el-table-column>
          <el-table-column label="开单人" prop="staff.name"></el-table-column>
        </el-table>
        <el-pagination
          :total="customer_list_count"
          :current-page="params.page"
          @current-change="handlePageChange"
          layout="total,prev,pager,next"
          style="text-align: right"
        ></el-pagination>
      </el-dialog>
    </div>
</template>

<script>
    export default {
      name: "customerSel",
      props: ['customerVisible'],
      data() {
        return {
          params: {
            page: 1,
            limit: 10,
            type: 1,
            search: '',
          },
          dialogVisible: false,
          customer_list: [],
          customer_list_count: 0,
          currentSelRow: '',
        }
      },
      watch: {
        customerVisible(val) {
          this.dialogVisible = val;
        }
      },
      mounted() {
        this.getCustomerList();
      },
      methods: {
        customer_list_select(row) {
          this.currentSelRow = row;
        },
        handleOkSel() {
          if (!this.currentSelRow) {
            this.$notify.warning({
              title: '警告',
              message: '请先单击表格行进行选择'
            });
            return false;
          }
          this.$emit('customerSel',{address: this.currentSelRow.address,customer_name: this.currentSelRow.customer_name,customer_id: this.currentSelRow.id,customer_type: this.params.type});
          this.dialogVisible = false;
        },
        handleCloseCustomer() {
          this.$emit('close');
          this.currentSelRow = '';
        },
        handlePageChange(page) {
          this.params.page = page;
          this.getCustomerList();
        },
        getCustomerList() {
          this.$http.get(globalConfig.finance_server + 'account/receivable/customer',{params: this.params}).then(res => {
            if (res.data.success) {
              this.customer_list = res.data.data.data;
              this.customer_list_count = res.data.data.count;
            }
          })
        }
      }
    }
</script>

<style scoped lang="scss">
  #customerSel{

  }
</style>
