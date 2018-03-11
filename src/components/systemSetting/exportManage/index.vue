<template>
  <div>
    <div class="filter">
      <el-form :inline="true" :model="form" label-width="80px" size="mini">
        <el-form-item>
          <el-input v-model="form.keyWords" placeholder="请输入小区名称">
            <el-button slot="append" icon="el-icon-search"></el-button>
          </el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary"><i class="el-icons-fa-share-square-o"></i>&nbsp;导出</el-button>
        </el-form-item>
      </el-form>
    </div>

    <el-table
      :data="tableData"
      style="width: 100%">
      <el-table-column
        prop="date"
        label="登陆时间"
        width="180">
      </el-table-column>
      <el-table-column
        prop="name"
        label="登陆人"
        width="180">
      </el-table-column>
      <el-table-column
        prop="department"
        label="部门">
      </el-table-column>
      <el-table-column
        prop="corporate"
        label="公司名称">
      </el-table-column>
      <el-table-column
        prop="contents"
        label="内容">
      </el-table-column>
      <el-table-column
        prop="area"
        label="登陆区域">
      </el-table-column>
      <el-table-column
        prop="loginIP"
        label="登陆IP">
      </el-table-column>
    </el-table>

    <div class="block pages">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="[20, 100, 200, 300, 400]"
        :page-size="20"
        layout="total, sizes, prev, pager, next, jumper"
        :total="400">
      </el-pagination>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        currentPage: 1,       //分页
        form: {
          keywords: '',
        },
        tableData: [
          {
            date: '2016-05-02',
            name: '王小虎',
            department: '研发部',
            corporate: '公司名称',
            contents: '仿佛回到是开发合理的萨芬了',
            area: '江苏  南京',
            loginIP: '192.163.1.1',
          }, {
            date: '2016-05-02',
            name: '王小虎',
            department: '研发部',
            corporate: '公司名称',
            contents: '仿佛回到是开发合理的萨芬了',
            area: '江苏  南京',
            loginIP: '192.163.1.1',
          }, {
            date: '2016-05-02',
            name: '王小虎',
            department: '研发部',
            corporate: '公司名称',
            contents: '仿佛回到是开发合理的萨芬了',
            area: '江苏  南京',
            loginIP: '192.163.1.1',
          }, {
            date: '2016-05-02',
            name: '王小虎',
            department: '研发部',
            corporate: '公司名称',
            contents: '仿佛回到是开发合理的萨芬了',
            area: '江苏  南京',
            loginIP: '192.163.1.1',
          },
        ],
      };
    },
    methods: {
      handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
      },
      handleCurrentChange(val) {
        console.log(`当前页: ${val}`);
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">

</style>
