<template>
  <div>
    <div class="highRanking">
      <div class="highSearch">
        <el-form :model="form" :inline="true" size="mini">
          <el-form-item>
            <el-input placeholder="请输入内容" v-model="form.keyWords" size="mini" clearable>
              <el-button slot="append" icon="el-icon-search"></el-button>
              <!--<el-button slot="append" icon="el-icons-fa-bars"></el-button>-->
            </el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" size="mini" @click="highGrade">高级</el-button>
          </el-form-item>
        </el-form>
      </div>

      <div class="filter high_grade" :class="isHigh? 'highHide':''">
        <el-form :inline="true" :model="form" size="mini" label-width="100px">
          <div class="filterTitle">
            <i class="el-icons-fa-bars"></i>&nbsp;&nbsp;高级搜索
          </div>
          <el-row class="el_row_border">
            <el-col :span="12">
              <el-row>
                <el-col :span="8">
                  <div class="el_col_label">登陆人</div>
                </el-col>
                <el-col :span="16" class="el_col_option">
                  <el-form-item>
                    <el-input v-model="form.staff_name" @focus="openModule" placeholder="请选择登陆人" readonly></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
            </el-col>
            <el-col :span="12">
              <el-row>
                <el-col :span="8">
                  <div class="el_col_label">登陆时间</div>
                </el-col>
                <el-col :span="16" class="el_col_option">
                  <el-form-item>
                    <el-form-item>
                      <div class="block">
                        <el-date-picker
                          v-model="form.date"
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
                  </el-form-item>
                </el-col>
              </el-row>
            </el-col>
          </el-row>
          <el-row class="el_row_border">
            <el-col :span="12">
              <el-row>
                <el-col :span="8">
                  <div class="el_col_label">登陆部门</div>
                </el-col>
                <el-col :span="16" class="el_col_option">
                  <el-form-item>
                    <el-input v-model="form.department_name" @focus="openModule" placeholder="请选择登陆部门" readonly></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
            </el-col>
          </el-row>
          <div class="btnOperate">
            <el-button size="mini" type="primary">搜索</el-button>
            <el-button size="mini" type="primary" @click="resetting">重置</el-button>
            <el-button size="mini" type="primary" @click="highGrade">取消</el-button>
          </div>
        </el-form>
      </div>
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
  import AddModule from '../../../common/organization.vue'

  export default {
    components: {AddModule},
    data() {
      return {
        isHigh: false,
        currentPage: 1,       //分页
        module: false,        //组织架构状态
        form: {
          staff_name: '',
          department_name: '',
          date: '',
          keyWords: '',
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
      // 重置
      resetting() {
        this.form.keywords = '';
      },
      // 高级筛选
      highGrade() {
        this.isHigh = !this.isHigh;
      },

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
