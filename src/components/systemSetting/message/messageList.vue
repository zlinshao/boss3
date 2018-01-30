<template>
  <div>
    <div>
      <div class="filter">
        <el-form :inline="true" :model="formInline" class="demo-form-inline" size="mini">
          <el-form-item label="发送时间">
            <el-date-picker
              v-model="dateValue"
              type="daterange"
              unlink-panels
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              :picker-options="pickerOptions">
            </el-date-picker>
          </el-form-item>

          <el-form-item label="发送人">
            <el-input v-model="formInline.user" @focus="openDepartment" placeholder="发送人" readonly></el-input>
          </el-form-item>

          <el-form-item>
            <el-button type="primary">重置</el-button>
          </el-form-item>

          <el-form-item>
            <el-button type="primary" @click="onSubmit"><i class="el-icon-search"></i>&nbsp;查询</el-button>
          </el-form-item>
        </el-form>
      </div>

      <el-table :data="tableData"
                style="width: 100%">
        <el-table-column
          prop="date"
          label="短信生成时间"
          width="180">
        </el-table-column>
        <el-table-column
          prop="name"
          label="发送人"
          width="180">
        </el-table-column>
        <el-table-column
          prop="mobile"
          label="接收人手机">
        </el-table-column>
        <el-table-column
          prop="types"
          label="类型">
        </el-table-column>
        <el-table-column
          prop="fruit"
          label="结果">
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

    <!--组织架构-->
    <AddModule :organizationDialog="departmentVisible" @close="closeDepartment"></AddModule>
  </div>
</template>

<script>
  import AddModule from '../../common/organization.vue'
  export default {
    name: 'message-list',
    components: {AddModule},
    data() {
      return {
        departmentVisible: false,
        tableData: [
          {
            date: '2016-05-02',
            name: '王小虎',
            mobile: '18052111111',
            types: '离职提醒',
            fruit: '成功',
          },  {
            date: '2016-05-02',
            name: '王小虎',
            mobile: '18052111111',
            types: '离职提醒',
            fruit: '成功',
          },  {
            date: '2016-05-02',
            name: '王小虎',
            mobile: '18052111111',
            types: '离职提醒',
            fruit: '成功',
          },  {
            date: '2016-05-02',
            name: '王小虎',
            mobile: '18052111111',
            types: '离职提醒',
            fruit: '成功',
          },  {
            date: '2016-05-02',
            name: '王小虎',
            mobile: '18052111111',
            types: '离职提醒',
            fruit: '成功',
          },  {
            date: '2016-05-02',
            name: '王小虎',
            mobile: '18052111111',
            types: '离职提醒',
            fruit: '成功',
          },  {
            date: '2016-05-02',
            name: '王小虎',
            mobile: '18052111111',
            types: '离职提醒',
            fruit: '成功',
          },
        ],
        formInline: {
          user: '',
          region: '',
          status: false,
        },
        currentPage: 1,


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
            text: '未来一周',
            onClick(picker) {
              const start = new Date();
              const end = new Date();
              end.setTime(start.getTime() + 3600 * 1000 * 24 * 7);
              picker.$emit('pick', [start, end]);
            },
          }, {
            text: '最近一个月',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              picker.$emit('pick', [start, end]);
            }
          }, {
            text: '未来一个月',
            onClick(picker) {
              const start = new Date();
              const end = new Date();
              end.setTime(start.getTime() + 3600 * 1000 * 24 * 30);
              picker.$emit('pick', [start, end]);
            },
          }, {
            text: '最近三个月',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
              picker.$emit('pick', [start, end]);
            },
          }, {
            text: '最近三个月',
            onClick(picker) {
              const start = new Date();
              const end = new Date();
              end.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
              picker.$emit('pick', [start, end]);
            },
          }]
        },
        dateValue: [],
        loading: true,
      }
    },
    mounted() {
      this.getDate();
    },
    methods: {
      openDepartment() {
        this.departmentVisible = true
      },
      closeDepartment() {
        this.departmentVisible = false
      },
      onSubmit() {
        console.log('submit!');
      },
      handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
      },
      handleCurrentChange(val) {
        console.log(`当前页: ${val}`);
      },
      getDate() {
        new Promise((resolve, reject) => {
          setTimeout(() => {
            this.loading = false;
            console.log('执行完成');
            resolve('随便什么数据');
          }, 2000)
        }).then(function (data) {
          console.log(data)
        })
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">

</style>
