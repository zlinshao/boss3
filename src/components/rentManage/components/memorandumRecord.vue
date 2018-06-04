<template>
  <div>
    <el-dialog :close-on-click-modal="false" title="合同备忘" :visible.sync="memoDialogVisible" width="50%">
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
            prop="create_time"
            label="创建时间">
          </el-table-column>
          <el-table-column
            prop="contract_number"
            label="合同编号">
          </el-table-column>
          <el-table-column
            prop="house_name"
            label="房屋地址">
          </el-table-column>
          <el-table-column
            prop="update_time"
            label="资料补齐时间">
          </el-table-column>
          <el-table-column
            prop="content"
            label="备忘内容">
          </el-table-column>
          <el-table-column
            prop="receivers"
            label="接收人">
          </el-table-column>
          <el-table-column
            prop="sender"
            label="发送人">
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
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button size="small" type="primary" @click="memoDialogVisible = false">确&nbsp;定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  export default {
    props:['is_rent','selectContractId','memoDialog'],
    data(){
      return{
        memoDialogVisible: false, //备忘模态框
        memoTableData: [],
        incompleteStatus: ' ',
        incompleteLoading: false,
      }
    },
    watch:{
      memoDialog(val){
        this.memoDialogVisible = val
      },
      memoDialogVisible(val){
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
        this.$http.get(globalConfig.server + 'lease/note/index?limit=500&is_rent=' + this.is_rent + '&contract_id=' + this.selectContractId).then((res) => {
          this.incompleteLoading = false;
          if (res.data.code === '60510') {
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
