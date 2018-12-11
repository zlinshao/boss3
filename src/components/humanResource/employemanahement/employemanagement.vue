<template>
  <div id="employemanagement">
    <el-container>
      <el-header>
        <div class="addstaff">
          <el-button type="primary" size="mini">新增员工</el-button>
        </div>
        <div class="search">
          <el-input v-model="input" placeholder="公司/部门/岗位/姓名/正式" size="mini"></el-input>
          <el-button type="primary" size="mini">搜索</el-button>
          <el-button type="primary" size="mini">导入薪资</el-button>
        </div>
      </el-header>
      <el-main>Main</el-main>
    </el-container>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss">
</style>
