<template>
  <div>
    <div>
    <div class="highRanking">
      <div class="highSearch">
        <el-form :inline="true" size="mini">
          <el-form-item>
            <el-input placeholder="签到人" v-model="form.pename" @keyup.enter.native="myData(1)" size="mini"
                      clearable>
              <el-button slot="append" icon="el-icon-search" @click="myData(1)"></el-button>
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
                  <div class="el_col_label">部门人员</div>
                </el-col>
                <el-col :span="16" class="el_col_option">
                <el-form-item >
                   <el-input readonly="" v-model="this.departname" @click.native="openOrganizationModal()" placeholder="点击选择"></el-input>
                </el-form-item>
                </el-col>
              </el-row>
            </el-col>
            <el-col :span="12">
              <el-row>
                <el-col :span="8">
                  <div class="el_col_label">时间</div>
                </el-col>
                <el-col :span="16" class="el_col_option">
                  <el-date-picker
                    size="mini"
                    v-model="value4"
                    type="datetimerange"
                    :picker-options="pickerOptions2"
                    value-format="yyyy-MM-dd"
                    format="yyyy-MM-dd"
                    range-separator="至"
                    start-placeholder="开始日期"
                    end-placeholder="结束日期"
                    align="right">
                  </el-date-picker>
                </el-col>
              </el-row>
            </el-col>
          </el-row>
          <div class="btnOperate">

            <el-button size="mini" type="primary" @click="search()">搜索</el-button>
            <el-button size="mini" type="primary" @click="resetting">重置</el-button>
            <el-button size="mini" type="primary" @click="highGrade">取消</el-button>
          </div>
        </el-form>
      </div>
    </div>
      <div class="main">
        <div class="myHouse">
          <div class="blueTable">
            <el-table
              :data="tableData"
              style="width: 100%">
              <el-table-column
                prop="name"
                label="签到人">
              </el-table-column>
              <el-table-column
                prop="dname"
                label="部门">
              </el-table-column>
              <el-table-column
                prop="last_date"
                label="签到日期">
              </el-table-column>
              <el-table-column
                prop="last_on"
                label="上班时间">
              </el-table-column>
              <el-table-column
                prop="last_off"
                label="下班时间">
              </el-table-column>
              <el-table-column
                prop="time_result"
                label="签到类型">
              </el-table-column>
              <el-table-column
                prop="attend"
                label="出勤天数">
              </el-table-column>
              <el-table-column
                prop="late"
                label="迟到">
              </el-table-column>
              <el-table-column
                prop="early"
                label="早退">
              </el-table-column>
              <el-table-column
                prop="not_signed"
                label="缺卡">
              </el-table-column>
              <el-table-column
                prop="absent"
                label="旷工">
              </el-table-column>
            </el-table>
          </div>
          <div class="tableBottom">
            <div class="left">
              <el-pagination
                @size-change="handleSizeChange"
                @current-change="myData"
                :current-page="nowPage"
                :page-size="12"
                layout="total, prev, pager, next, jumper"
                :total="total">
              </el-pagination>
            </div>
          </div>
        </div>
      </div>
    </div>
    <Organization :organizationDialog="organizationDialog" :length="len"   @close="closeOrganization"  @selectMember="coloseaa"></Organization>
  </div>
</template>

<script>

 import Organization from '../../../common/organization.vue'
  export default {
    components:{
      Organization
    },
    data () {
      return {
        /***********/
        urls:globalConfig.server,    
        departname:'', 
        pename:'', 
        tableData: [],
        organizationDialog: false,
        len:0,
        orgtype:'',
        form:{
          page:1,
          limit:12,
          time:'',
          pename:'',
          year_month:'2018-03',
          department_id:''
          },
        isHigh: false,
        nowPage: 1,   //当前页
        total:0,      //总条数


        //模态框
        instructionDialog: false,
        pickerOptions2: {
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
        value4: ''
      }
    },

    methods: {
      handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
      },
      openOrganizationModal() {
        this.organizationDialog = true;
        this.len=1;
      },
      closeOrganization() {
        this.organizationDialog = false;
        this.len=0;
      },
      coloseaa(val){
        console.log(val)
        this.departname=val[0].name
        this.form.department_id=val[0].id
        this.len=0;
      },
      myData(val) {
        this.tableData = [];
        this.form.page = val;
        this.form.time=this.value4;
       
        this.$http.get(this.urls+'attendance/summary/', {
          params: this.form,
        }).then((res) => {
            console.log(res);
            if (res.data.code === '20010') {
                this.tableData=res.data.data;
                this.nowPage=val;
                this.total=res.data.num;
            }
            else{
              this.total=0;
            }
      
         })
      },
      clickTable(row, event, column){
        console.log(row, event, column)
      },
      search() {
        this.myData(1);
        this.isHigh = false;
      },
      // 重置
      resetting() {
          this.form.page=1,
          this.form.limit=12,
          this.form.department_id='',
          this.form.time='',
          this.form.pename='',
        this.myData(1);
      },
      // 高级筛选
      highGrade() {
        this.isHigh = !this.isHigh;
      },
    },
    mounted() {
    this.myData(1);
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped="">
  .filter {
    /*padding: 10px 0;*/
  }

  .tableBottom {
    padding: 8px;
    display: flex;
    justify-content: flex-end;

  }
  .el-table .cell{
    text-align: center;
  }
</style>
