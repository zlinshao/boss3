<template>
    <div id="Payroll">
      <div class="highRanking">
        <div class="tabsSearch">
          <el-form :inline="true" size="mini">
            <el-form-item>
              <el-input placeholder="请输入内容" v-model="form.selects" class="input-with-select">
                <el-select v-model="form.keyWords" slot="prepend" placeholder="请选择" clearable>
                  <el-option label="收房" value="1"></el-option>
                  <el-option label="租房" value="2"></el-option>
                </el-select>
                <el-button slot="append" icon="el-icon-search"></el-button>
              </el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" size="mini" @click="highGrade">高级</el-button>
            </el-form-item>
            <el-form-item>
              <el-dropdown trigger="click" @command="leadingOut">
                <el-button type="primary" size="mini">
                  导出<i class="el-icon-arrow-down el-icon--right"></i>
                </el-button>
                <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item command="one">工资条</el-dropdown-item>
                  <el-dropdown-item command="tow">详情</el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>
            </el-form-item>
            <!--<el-form-item v-if="multipleSelection.length > 0">-->
              <!--<el-button type="primary" size="mini" @click="openBadge">标记</el-button>-->
            <!--</el-form-item>-->
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
                    <div class="el_col_label">日期</div>
                  </el-col>
                  <el-col :span="16" class="el_col_option">
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
      <div class="main">
        <div style="margin: 10px 0;">
          <el-button :class="{'primary': active === index}" @click="tagClick(index)" size="mini"
                     v-for="(key,index) in buttonVal" :key="index">{{key}}
          </el-button>
        </div>
        <div class="roll_table">
          <table v-for="item in tableData">
            <span v-for="(val,key) in item.content">
              <thead>
                <th style="width: 100%;">{{key}}</th>
              </thead>
              <tbody>
                <td>{{val}}</td>
              </tbody>

            </span>
          </table>
        </div>
      </div>
      <div class="block pages">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="form.page"
          :page-size="6"
          layout="total, prev, pager, next, jumper"
          :total="totalNum">
        </el-pagination>
      </div>
    </div>
</template>

<script>
  export default {
    name: "payroll",
    data() {
      return {
        isHigh: false,
        tableData: [],
        totalNum: 0,
        buttonVal: ['业务员','管理层'],
        active: 0,
        form: {
          category: 1,
          keyWords: '',
          date: '',
          page: 1,
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
      }
    },
    mounted() {
      this.getTableData();
    },
    activated() {
      this.getTableData();
    },
    methods:{
      // 按钮切换
      tagClick(val) {
        this.active = val;
        switch(val) {
          case 0:  //业务员
            this.form.category = 1;
            this.getTableData();
            break;
          case 1:  //管理层
            this.form.category = 2;
            this.getTableData();
            break;
        }
      },
      getTableData(){
        this.$http.get(globalConfig.server+ 'salary/dashboard?category='+this.form.category+'&page='+this.form.page).then((res) => {
          this.isHigh = false;
            if(res.data.code === '88800'){
              this.tableData = res.data.data.data;
              this.totalNum = Number(res.data.data.count);
            }else{
              this.tableData = [];
              this.totalNum = 0;
            }
        });
      },
      handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
      },
      handleCurrentChange(val) {
        console.log(`当前页: ${val}`);
        this.form.page = val;
        this.getTableData();
      },
      // 重置
      resetting() {
      },
      // 高级筛选
      highGrade() {
        this.isHigh = !this.isHigh;
      },
      leadingOut() {

      },
      // 冻结工资
      openFreeze() {
      },
      closeFreeze() {
      },
      // 标记
      openBadge() {
      },
    },
  }
</script>

<style scoped>
  .primary {
    background: #409EFF;
    border-color: #409EFF;
    color: #ffffff;
  }
  .roll_table table{
    width: 100%;
    /*border-collapse:collapse;*/
  }
  .roll_table table thead th{
    background: #ebeef5;

  }
  .roll_table table tbody td{
    background: #fafafa;
  }
</style>
