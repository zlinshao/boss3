<template>
  <div>
    <div class="filter">
      <el-form class="demo-form-inline" size="small">
        <el-form-item>
          <el-button type="primary" style="float: right;" @click="onSubmit"><i class="el-icon-plus"></i>&nbsp;新&nbsp;增</el-button>
        </el-form-item>
      </el-form>
    </div>
    <el-table
      :data="tableData"
      style="width: 100%">

      <el-table-column
        prop="id"
        label="ID"
        width="88px;">
      </el-table-column>

      <el-table-column
        prop="describe"
        label="描述">
      </el-table-column>

      <el-table-column
        prop="module"
        label="模块">
      </el-table-column>

      <el-table-column
        prop="child_module"
        label="子模块">
      </el-table-column>

      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button
            size="mini"
            @click="handleEdit(scope.$index, scope.row)">编辑
          </el-button>
          <el-button
            size="mini"
            type="danger"
            @click="openDelete(scope.$index, scope.row)">删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <ReviseRole :module="roleModule" :name="title" @close="closeEdit"></ReviseRole>
  </div>
</template>

<script>
  import ReviseRole from './reviseRole.vue'

  export default {
    components: {ReviseRole},
    name: 'hello',
    data() {
      return {
        tableData: [{
          id: 1,
          describe: '发挥到了萨菲航空斯大林饭卡上的',
          module: 'Manger',
          child_module: 'conference',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          id: 2,
          describe: '发挥到了萨菲航空斯大林饭卡上的',
          module: 'Manger',
          child_module: 'conference',
          address: '上海市普陀区金沙江路 1517 弄'
        }, {
          id: 3,
          describe: '发挥到了萨菲航空斯大林饭卡上的',
          module: 'Manger',
          child_module: 'conference',
          address: '上海市普陀区金沙江路 1519 弄'
        }, {
          id: 4,
          describe: '发挥到了萨菲航空斯大林饭卡上的',
          module: 'Manger',
          child_module: 'conference',
          address: '上海市普陀区金沙江路 1516 弄'
        }],
        roleModule: false,
        title: '',
      }
    },
    methods: {
      // 新增
      onSubmit() {
        this.roleModule = true;
        this.title = '新增角色';
      },
      // 修改
      handleEdit(index, row) {
        console.log(index, row);
        this.roleModule = true;
        this.title = '修改角色';
      },
      closeEdit() {
        this.roleModule = false;
      },
      handleDelete(index, row) {
        console.log(index, row);
      },
      // 删除
      openDelete(index, row) {
        this.$confirm('此操作将删除该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$message({
            type: 'success',
            message: '删除成功!'
          });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
