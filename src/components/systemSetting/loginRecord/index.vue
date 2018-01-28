<template>
  <div>
    <div class="filter">
      <el-form :inline="true" ref="form" :model="sizeForm" label-width="80px" size="mini">
        <el-form-item label="登陆时间">
          <div class="block">
            <el-date-picker
              v-model="sizeForm.date"
              type="daterange"
              align="right"
              unlink-panels
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              :picker-options="pickerOptions">
            </el-date-picker>
          </div>
        </el-form-item>
        <el-form-item label="登陆人">
          <el-input v-model="sizeForm.staff_name" @focus="openModule" placeholder="请选择登陆人" readonly></el-input>
        </el-form-item>
        <el-form-item label="登陆部门">
          <el-input v-model="sizeForm.department_name" @focus="openModule" placeholder="请选择登陆部门" readonly></el-input>
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

    <!--组织架构-->
    <AddModule :organizationDialog="module" @close="closeModule"></AddModule>
  </div>
</template>

<script>
  import AddModule from '../../common/organization.vue'

  export default {
    components: {AddModule},
    data() {
      return {
        currentPage: 1,       //分页
        module: false,        //组织架构状态
        sizeForm: {
          staff_name: '',
          department_name: '',
          date: '',
        },
        pickerOptions: {
          shortcuts: [{
            text: '最近一周',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit('pick', [start, end]);
            }
          }, {
            text: '最近一个月',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              picker.$emit('pick', [start, end]);
            }
          }, {
            text: '最近三个月',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
              picker.$emit('pick', [start, end]);
            }
          }]
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
      // 登陆人
      openModule() {
        this.module = true;
      },
      // 登陆人
      closeModule() {
        this.module = false;
      },
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
