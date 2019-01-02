<template >
   <div id="runningAccount">
       <div style="text-align: right;">
         <el-input v-model="params.search" style="width: 15%" placeholder="请输入需要搜索的内容" size="mini">
           <el-button slot="append" icon="el-icon-search"></el-button>
         </el-input>
         <el-button type="primary" size="mini">高级</el-button>
       </div>
     <div style="margin-top: 10px">
       <el-table
        :data="tableList"
       >
         <el-table-column label="ID" prop="id"></el-table-column>
         <el-table-column label="交易时间" prop="create_time"></el-table-column>
         <el-table-column label="客户姓名" prop=""></el-table-column>
         <el-table-column label="科目名称" prop=""></el-table-column>
         <el-table-column label="类型" prop=""></el-table-column>
         <el-table-column label="账户名称" prop="account_name"></el-table-column>
         <el-table-column label="卡号" prop="account_num"></el-table-column>
         <el-table-column label="实收金额" prop="amount_receivable"></el-table-column>
         <el-table-column label="实付金额" prop="amount_paid"></el-table-column>
         <el-table-column label="账户余额" prop="balance"></el-table-column>
         <el-table-column label="详细信息" prop="info" min-width="300px"></el-table-column>
         <el-table-column label="收/付款人员" prop="operator_name"></el-table-column>
       </el-table>
       <el-pagination
        :total="all_count"
        layout="total,prev,pager,next"
        :current-page="params.page"
        :page-size="params.limit"
        style="text-align: right"
       ></el-pagination>
     </div>
   </div>
</template>
<script>
    export default{
        name:'runningAccount',
        data(){
            return{
              url: globalConfig.finance_server,
              //列表
              tableList: [],
              diff_sum: 0,
              expend_sum: 0,
              receive_sum: 0,
              tableCount: 0,
              all_count: 0,
              params: {
                search: '',
                page: 1,
                limit: 12,
                start_date: '',
                end_date: '',
                cate: '',
                subject_id: '',
                account_id: ''
              }
            }
        },
        mounted(){
          this.getTableList();
        },
        methods:{
          getTableList() {
            this.$http.get(this.url + 'fundflow/running/index',{params: this.params}).then(res => {
              console.log(res);
              if (res.data.success) {
                this.tableList = res.data.data.data;
                this.diff_sum = res.data.data.diff_sum;
                this.expend_sum = res.data.data.expend_sum;
                this.receive_sum = res.data.data.receive_sum;
                this.all_count = res.data.data.all_count;
              }
            }).catch(err => {
              console.log(err);
            })
          }
        }
    }

</script>
<style scoped>
  #runningAccount{

  }
</style>
