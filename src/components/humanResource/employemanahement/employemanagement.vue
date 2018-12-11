<template>
  <div id="employemanagement">
    <el-container>
      <el-header style="overflow: hidden;line-height: 60px;">
        <div class="addstaff">
          <el-button type="primary" size="mini" @click="addEmployDialog = true">新增员工</el-button>
        </div>
        <div class="search">
          <el-input v-model="input" placeholder="公司/部门/岗位/姓名/正式" size="mini"></el-input>
          <el-button type="primary" size="mini">搜索</el-button>
          <el-button type="primary" size="mini">导入薪资</el-button>
        </div>
      </el-header>
      <el-main style="padding: 0">
        <el-table :data="tableData" border style="width: 100%">
          <el-table-column prop="name" label="姓名" width="180"></el-table-column>
          <el-table-column prop="date" label="公司和部门" width="180"></el-table-column>
          <el-table-column prop="date" label="岗位名称" width="180"></el-table-column>
          <el-table-column prop="date" label="入职时间" width="180"></el-table-column>
          <el-table-column prop="date" label="岗位状态" width="180"></el-table-column>
          <el-table-column prop="date" label="正式" width="180"></el-table-column>
          <el-table-column prop="date" label="薪资记录" width="180"></el-table-column>
          <el-table-column prop="date" label="奖励记录" width="180"></el-table-column>
          <el-table-column prop="date" label="排版" width="180"></el-table-column>
          <el-table-column prop="date" label="审批" width="180"></el-table-column>
          <el-table-column prop="date" label="考勤" width="180"></el-table-column>
        </el-table>
      </el-main>
    </el-container>
    <!-- 新增员工 -->
    <el-dialog title="新增员工" :visible.sync="addEmployDialog" width="60%">
      <addEmploy></addEmploy>
      <span slot="footer" class="dialog-footer">
        <el-button @click="addEmployDialog = false" size="mini">取 消</el-button>
        <el-button type="primary" @click="addEmployDialog = false" size="mini">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import addEmploy from './addEmploy'   // 新增员工
export default {
  components: {addEmploy},
  data() {
    return {
      input: "",
      tableData: [],
      addEmployDialog: false,
    }
  }
};
</script>

<style lang="scss">
  #employemanagement {
    .addstaff {
      float: left
    }
    .search {
      float: right;
      .el-input {
        width: 52%;
      }
    }
  }
</style>
