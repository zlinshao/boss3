<template>
    <div id="approval">
      <el-table
        :data="tableList"
        @row-click="LookDetail"
      >
        <el-table-column prop="name" label="名称"></el-table-column>
        <el-table-column prop="date" label="时间"></el-table-column>
        <el-table-column prop="approvalPeople" label="审批人"></el-table-column>
      </el-table>

      <ApprovalPeople :approvalVisible="approvalVisible" @approvalClose="handleCloseApproval"></ApprovalPeople>
    </div>
</template>

<script>
  import ApprovalPeople from './components/approvalDetail';
    export default {
      name: "index",
      components: { ApprovalPeople },
      data() {
        return {
          tableList: [
            {name: '请假审批',date:'2018-12-01',approvalPeople:'HS'},
            {name: '事假审批',date:'2018-12-02',approvalPeople:'HS'},
            {name: '请假审批',date:'2018-12-03',approvalPeople:'HS'},
            {name: '婚假审批',date:'2018-12-04',approvalPeople:'HS'}
          ],
          approvalVisible: false
        }
      },
      methods: {
        LookDetail(row) {
          console.log(row);
          this.approvalVisible = true;
        },
        handleCloseApproval() {
          this.approvalVisible = false;
        },
      }
    }
</script>

<style scoped lang="scss">

</style>
