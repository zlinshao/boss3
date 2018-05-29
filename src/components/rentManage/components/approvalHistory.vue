<template>
  <div>
    <el-dialog :close-on-click-modal="false" title="审批历史详情" :visible.sync="approvalHistoryVisible" width="50%">
      <div>
        <el-table
          :data="memoTableData"
          :empty-text='incompleteStatus'
          v-loading="incompleteLoading"
          element-loading-text="拼命加载中"
          element-loading-spinner="el-icon-loading"
          element-loading-background="rgba(255, 255, 255, 0)"
          style="width: 100%">

          <el-table-column
            label="操作历史">
            <template slot-scope="scope">
              <span v-if="scope.row.historiable_operation === 'to_contract_review'">提交合同审核员审核</span>
              <span v-if="scope.row.historiable_operation === 'to_contract_approved'">合同资料无误，同意</span>
              <span v-if="scope.row.historiable_operation === 'to_cancelled'">撤销审核</span>
              <span v-if="scope.row.historiable_operation === 'to_contract_rejected'">合同资料有误，拒绝</span>
              <span v-if="scope.row.historiable_operation === 'to_house_approved'">房屋资料无误，同意</span>
              <span v-if="scope.row.historiable_operation === 'to_house_rejected'">房屋资料有误，拒绝</span>
            </template>
          </el-table-column>

          <el-table-column
            prop="create_time"
            label="审批时间">
          </el-table-column>

          <el-table-column
            prop="sname"
            label="审批人">
          </el-table-column>
        </el-table>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button size="small" type="primary" @click="approvalHistoryVisible = false">确&nbsp;定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  export default {
    props:['is_rent','contractId','approvalHistory'],
    data(){
      return{
        approvalHistoryVisible: false, //备忘模态框
        memoTableData: [],
        incompleteStatus: ' ',
        incompleteLoading: false,
        params:{
          is_rent:this.is_rent,
          contract_id : this.contractId,
          page : 1,
          limit:12,
        }
      }
    },
    watch:{
      approvalHistory(val){
        this.approvalHistoryVisible = val
      },
      approvalHistoryVisible(val){
        if (!val) {
          this.$emit('close');
        } else {
          this.getData();
        }
      },

    },
    methods:{
      getData(){


        this.incompleteStatus = " ";
        this.incompleteLoading = true;
        this.$http.get(globalConfig.server + 'history/approval',{params:this.params}).then((res) => {
          this.incompleteLoading = false;
          if (res.data.code === '41010') {
            this.memoTableData = res.data.data;
            if (res.data.data.length < 1) {
              this.incompleteStatus = "暂无数据";
            }
          } else {
            this.incompleteStatus = "暂无数据";
            this.memoTableData = [];
          }
        });
      }
    }
  }
</script>

<style scoped>

</style>
