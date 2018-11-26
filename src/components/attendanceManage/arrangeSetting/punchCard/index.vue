<template>
    <div id="punchCard">
        <div style="margin-bottom:20px;text-align:right">
            <el-row>
                <el-col :span="22">
                    <el-input
                        placeholder="请输入要搜索的内容"
                        clearable
                        v-model="punchCardParams.search"
                        size="mini"
                        style="width:250px;"
                        @keyup.enter.native="goSearch"
                    >
                        <el-button slot="append" icon="el-icon-search" @click="goSearch"></el-button>
                    </el-input>
                </el-col>
                <el-col :span="1">
                    <el-button type="primary" size="mini" @click="isHighPunch = !isHighPunch">高级</el-button>
                </el-col>
            </el-row>
        </div>
        <div>
            <el-table
                :data="punchCardList"
                v-loading="gettingList"
                element-loading-text="拼命加载中"
                element-loading-spinner="el-icon-loading"
                :empty-text="punchListInfo"
            >
                <el-table-column
                    label="头像"
                    align="center"
                >
                    <template slot-scope="scope">
                        <div>
                            <img style="width:50px;height:50px;border-radius:50%;" :src="scope.row.avatar != null ? scope.row.avatar : ''" alt="">
                        </div>
                    </template>
                </el-table-column>
                <el-table-column
                    label="姓名"
                    prop="name"
                ></el-table-column>
                <el-table-column
                    label="部门"
                >
                    <template slot-scope="scope">
                        <div v-text="department(scope.row)"></div>
                    </template>
                </el-table-column>
                <el-table-column
                    label="日期"
                >
                  <template slot-scope="scope">
                    <div>
                      {{ punchCardParams.arrange_day }}
                    </div>
                  </template>
                </el-table-column>
                 <el-table-column label="上班排班时间" prop="attendanceData[0].workShift">
                </el-table-column>
                <el-table-column label="下班排班时间" prop="attendanceData[0].workOffShift">
                </el-table-column>
                <el-table-column label="上班打卡时间" prop="attendanceData[0].goWork">
                    <template slot-scope="scope">
                        <div :class="bg(scope.row)">{{scope.row.attendanceData[0].goWork}}</div>
                    </template>
                </el-table-column>
                <el-table-column label="打卡结果" prop="attendanceData[0].resultWork">
                </el-table-column>
                <el-table-column label="下班打卡时间" prop="attendanceData[0].goOffWork">
                </el-table-column>
                <el-table-column label="打卡结果"  prop="attendanceData[0].resultOffWork"> 
                </el-table-column>
                <el-table-column
                    label="是否上班缺卡"
                    prop="is_am_sign"
                >
                    <template slot-scope="scope">
                        <div>
                            {{ scope.row.is_am_sign ? '是' : '否'}}
                        </div>
                    </template>
                </el-table-column>
                <el-table-column
                    label="是否下班缺卡"
                    prop="is_pm_sign"
                >
                    <template slot-scope="scope">
                        <div>
                            {{ scope.row.is_pm_sign ? '是' : '否'}}
                        </div>
                    </template>
                </el-table-column>
                <el-table-column
                    label="是否休息"
                    prop="is_rest"
                >
                    <template slot-scope="scope">
                        <div>
                            {{ scope.row.is_rest ? '是' : '否'}}
                        </div>
                    </template>
                </el-table-column>
                <el-table-column
                    label="是否加班"
                    prop="is_work_overtime"
                >
                    <template slot-scope="scope">
                        <div>
                            {{ scope.row.is_work_overtime ? '是' : '否'}}
                        </div>
                    </template>
                </el-table-column>
                <el-table-column
                    label="是否排班"
                    prop="is_arrange"
                >
                    <template slot-scope="scope">
                        <div>
                            {{ scope.row.is_arrange ? '是' : '否'}}
                        </div>
                    </template>
                </el-table-column>
                <el-table-column
                    label="是否出差"
                    prop="is_business"
                >
                    <template slot-scope="scope">
                        <div>
                            {{ scope.row.is_business ? '是' : '否'}}
                        </div>
                    </template>
                </el-table-column>
                <el-table-column
                    label="是否迟到"
                    prop="is_late"
                >
                    <template slot-scope="scope">
                        <div>
                            {{ scope.row.is_late ? '是' : '否'}}
                        </div>
                    </template>
                </el-table-column>
                <el-table-column
                    label="迟到分钟数"
                    prop="late_minutes"
                ></el-table-column>
                <el-table-column
                    label="是否请假"
                    prop="is_vacate"
                >
                    <template slot-scope="scope">
                        <div>
                            {{ scope.row.is_vacate ? '是' : '否'}}
                        </div>
                    </template>
                </el-table-column>
                 <el-table-column
                    label="是否旷工"
                    prop="is_absenteeism"
                >
                    <template slot-scope="scope">
                        <div>
                            {{ scope.row.is_absenteeism ? '是' : '否'}}
                        </div>
                    </template>
                </el-table-column>
            </el-table>
        </div>
        <div style="width:100%;text-align:right;margin-top:25px;">
            <el-pagination
                @size-change="punchSizeChange"
                @current-change="punchCurrentChange"
                :page-sizes="[12,24,36]"
                :page-size="punchCardParams.limit"
                :current-page="punchCardParams.page"
                layout="total,sizes,prev, pager, next ,jumper"
                :total="punchCount">
            </el-pagination>
        </div>
        <!-- 高级 -->
        <div class="highRanking" style="position:static !important;">
            <div class="filter high_grade" :class="isHighPunch? 'highHide':''">
                <el-form :inline="true" onsubmit="return false" :model="punchCardParams" size="mini" label-width="100px">
                <div class="filterTitle">
                    <i class="el-icons-fa-bars"></i>&nbsp;&nbsp;高级搜索
                </div>
                <el-row class="el_row_border">
                    <el-col :span="12">
                    <el-row>
                        <el-col :span="8">
                        <div class="el_col_label">月份</div>
                        </el-col>
                        <el-col :span="16" class="el_col_option">
                            <el-date-picker
                                v-model="punchCardParams.arrange_day"
                                type="date"
                                format="yyyy-MM-dd"
                                style="width:195px;"
                                @change = "changeDate"
                                size="mini"
                                placeholder="选择月">
                            </el-date-picker>
                        </el-col>
                    </el-row>
                    </el-col>
                    <el-col :span="12">
                    <el-row>
                        <el-col :span="8">
                        <div class="el_col_label">是否上班缺卡</div>
                        </el-col>
                        <el-col :span="16" class="el_col_option">
                            <el-select size="mini" v-model="punchCardParams.is_am_sign" placeholder="请选择">
                                <el-option label="是" :value="1"></el-option>
                                <el-option label="否" :value="0"></el-option>
                            </el-select>
                        </el-col>
                    </el-row>
                    </el-col>
                </el-row>

                <el-row class="el_row_border">
                    <el-col :span="12">
                    <el-row>
                        <el-col :span="8">
                        <div class="el_col_label">是否下班缺卡</div>
                        </el-col>
                        <el-col :span="16" class="el_col_option">
                            <el-select size="mini" v-model="punchCardParams.is_pm_sign" placeholder="请选择">
                                <el-option label="是" :value="1"></el-option>
                                <el-option label="否" :value="0"></el-option>
                            </el-select>
                        </el-col>
                    </el-row>
                    </el-col>
                    <el-col :span="12">
                    <el-row>
                        <el-col :span="8">
                        <div class="el_col_label">是否休息</div>
                        </el-col>
                        <el-col :span="16" class="el_col_option">
                            <el-select size="mini" v-model="punchCardParams.is_rest" placeholder="请选择">
                                <el-option label="是" :value="1"></el-option>
                                <el-option label="否" :value="0"></el-option>
                            </el-select>
                        </el-col>
                    </el-row>
                    </el-col>
                </el-row>

                <el-row class="el_row_border">
                    <el-col :span="12">
                    <el-row>
                        <el-col :span="8">
                        <div class="el_col_label">是否加班</div>
                        </el-col>
                        <el-col :span="16" class="el_col_option">
                            <el-select size="mini" v-model="punchCardParams.is_work_overtime" placeholder="请选择">
                                <el-option label="是" :value="1"></el-option>
                                <el-option label="否" :value="0"></el-option>
                            </el-select>
                        </el-col>
                    </el-row>
                    </el-col>
                    <el-col :span="12">
                    <el-row>
                        <el-col :span="8">
                        <div class="el_col_label">是否排班</div>
                        </el-col>
                        <el-col :span="16" class="el_col_option">
                            <el-select size="mini" v-model="punchCardParams.is_arrange" placeholder="请选择">
                                <el-option label="是" :value="1"></el-option>
                                <el-option label="否" :value="0"></el-option>
                            </el-select>
                        </el-col>
                    </el-row>
                    </el-col>
                </el-row>
                <el-row class="el_row_border">
                    <el-col :span="12">
                    <el-row>
                        <el-col :span="8">
                        <div class="el_col_label">是否出差</div>
                        </el-col>
                        <el-col :span="16" class="el_col_option">
                            <el-select size="mini" v-model="punchCardParams.is_business" placeholder="请选择">
                                <el-option label="是" :value="1"></el-option>
                                <el-option label="否" :value="0"></el-option>
                            </el-select>
                        </el-col>
                    </el-row>
                    </el-col>
                    <el-col :span="12">
                    <el-row>
                        <el-col :span="8">
                        <div class="el_col_label">是否迟到</div>
                        </el-col>
                        <el-col :span="16" class="el_col_option">
                            <el-select size="mini" v-model="punchCardParams.is_late" placeholder="请选择">
                                <el-option label="是" :value="1"></el-option>
                                <el-option label="否" :value="0"></el-option>
                            </el-select>
                        </el-col>
                    </el-row>
                    </el-col>
                </el-row>
                <el-row class="el_row_border">
                    <el-col :span="12">
                    <el-row>
                        <el-col :span="8">
                        <div class="el_col_label">是否请假</div>
                        </el-col>
                        <el-col :span="16" class="el_col_option">
                            <el-select size="mini" v-model="punchCardParams.is_vacate" placeholder="请选择">
                                <el-option label="是" :value="1"></el-option>
                                <el-option label="否" :value="0"></el-option>
                            </el-select>
                        </el-col>
                    </el-row>
                    </el-col>
                    <el-col :span="12">
                    <el-row>
                        <el-col :span="8">
                        <div class="el_col_label">是否旷工</div>
                        </el-col>
                        <el-col :span="16" class="el_col_option">
                            <el-select size="mini" v-model="punchCardParams.is_absenteeism" placeholder="请选择">
                                <el-option label="是" :value="1"></el-option>
                                <el-option label="否" :value="0"></el-option>
                            </el-select>
                        </el-col>
                    </el-row>
                    </el-col>
                </el-row>
                  <el-row class="el_row_border">
                    <el-col :span="12">
                      <el-row>
                        <el-col :span="8">
                          <div class="el_col_label">部门</div>
                        </el-col>
                        <el-col :span="16" class="el_col_option">
                          <el-input size="mini" placeholder="请选择" @focus="openOrgan('org_names', 'depart')" style="width:260px;"
                                    v-model="org_name">
                            <el-button slot="append" @click="emptyDepart('org_names')">清空</el-button>
                          </el-input>
                        </el-col>
                      </el-row>
                    </el-col>
                    <el-col :span="12">
                      <el-row>
                        <el-col :span="8">
                          <div class="el_col_label">离职人员</div>
                        </el-col>
                        <el-col :span="16" class="el_col_option">
                          <el-checkbox v-model="is_dimissionNum" @change="retired">包括离职员工</el-checkbox>
                        </el-col>
                      </el-row>
                    </el-col>
                  </el-row>
                <div class="btnOperate">
                    <el-button size="mini" type="primary" @click="goSearch">搜索</el-button>
                    <el-button size="mini" type="primary" @click="resetting">重置</el-button>
                    <el-button size="mini" type="primary" @click="highGrade">取消</el-button>
                </div>
                </el-form>
            </div>
        </div>

      <!--部门-->
      <Organization :organizationDialog="organModule" :type="organizeType" :length="lengths" @close="closeOrgan"
                    @selectMember="selectMember"></Organization>
    </div>
</template>

<script>
  import Organization from "../../../common/organization";
export default {
  name: "index",
  components: { Organization },
  data (){
      return {
          url: globalConfig.server, //url
          org_name: "",
          punchCardParams: {
              user_id: '',
              org_id: '',
              search: '',//模糊搜索
              arrange_day: '',//搜索日期 格式 2018-10-31
              is_am_sign: "",//是否上班缺卡
              is_pm_sign: "",//是否下班缺卡
              is_rest: "",//是否休息
              is_work_overtime: "",//是否加班
              is_arrange: "",//是否排班
              is_business: "",//是否出差
              is_late: "",//是否迟到
              late_minutes: "",//迟到分钟数
              is_vacate: "",//是否请假
              is_absenteeism: "",//是否旷工
              page: 1,
              limit: 12,
              is_dimission: "0",   // 离职人员
          },
          punchCardList:[],
          gettingList: false,
          punchListInfo: "",
          isHighPunch: false,
          punchCount:0,
          organModule:false,
          organizeType: "",
          lengths: 0,
          organDivision: "",
          is_dimissionNum: false,  // 离职人员
      }
  },
  methods: {
    //   离职人员
       retired(val) {
        if(this.is_dimissionNum) {
            this.punchCardParams.is_dimission = "1";
        } else {
            this.punchCardParams.is_dimission = '0';
        }
      },
      getPunchCardList (){
          this.gettingList = true;
          this.punchListInfo = " ";
          this.$http.get(this.url + "attendance/summary/statistical",{
              params:this.punchCardParams
          }).then(res => {
              if(res.status ==200){
                  if(res.data.code==20000){
                      if(res.data.data.data.length<1){
                        this.emptyData();
                      }
                      this.punchCardList = res.data.data.data
                      this.punchCount = res.data.data.count;
                      this.gettingList = false;
                      this.isHighPunch = false;
                      let attendanceObj = null;
                      let attendanceArr = null; 
                      this.punchCardList.forEach((item, index) => {
                        attendanceArr = [];
                        attendanceObj = {};
                          item.sort_dimension.forEach((val, key) => {
                              if(val.event_attribute == 1) {
                                  if(val.status == 0) {
                                      attendanceObj.resultWork = "正常";
                                  } else if(val.status == 1) {
                                      attendanceObj.resultWork = "迟到";
                                  } else if (val.status == 4) {
                                      attendanceObj.resultWork = "外勤"
                                  }
                                  attendanceObj.goWork = val.dimensions.hour + ":" + val.dimensions.minute;    // 上班打卡
                              } else if(val.event_attribute == 2) {
                                  if(val.status == 0) {
                                      attendanceObj.resultOffWork = "正常";
                                  } else if(val.status == 2) {
                                       attendanceObj.resultOffWork = "早退";
                                  } else if (val.status == 4) {
                                      attendanceObj.resultOffWork = "外勤"
                                  }
                                  attendanceObj.goOffWork = val.dimensions.hour + ":" + val.dimensions.minute;    // 下班打卡
                              } else if(val.event_attribute == 3) {
                                  attendanceObj.workShift = val.dimensions.hour + ":" + val.dimensions.minute;    // 上班排版
                              } else if(val.event_attribute == 4) {
                                  attendanceObj.workOffShift = val.dimensions.hour + ":" + val.dimensions.minute;    // 下班排版
                              } else if(val.event_attribute == 5) {
                                  attendanceObj.hugh = "休息"
                              }
                          })
                            attendanceArr.push(attendanceObj)
                          this.punchCardList[index].attendanceData =  attendanceArr;
                      })
                  }else if(res.data.code == 20001){
                        this.emptyData();
                  }
              }
          }).catch(err => {
              console.log(err);
          })
      },
      emptyData (){
        this.punchCardList = [];
        this.gettingList = false;
        this.punchListInfo = "暂无数据";
        this.isHighPunch = false;
      },
      department (row){
          var name = '';
          row.org.map((item,index) => {
              name += item.name + ",";
          })
          return name.substring(0, name.length - 1);
      },
      changeDate (val){
          this.getCurrentDate(val);
      },
      goSearch (){
        this.punchCardParams.page = 1;
        this.punchCardParams.limit = 12;
        this.getPunchCardList();
      },
      resetting (){
        this.org_name = "";
          this.punchCardParams = {
              user_id: '',
              org_id: '',
              search: '',//模糊搜索
              arrange_day: '',//搜索日期 格式 2018-10-31
              is_am_sign: "",//是否上班缺卡
              is_pm_sign: "",//是否下班缺卡
              is_rest: "",//是否休息
              is_work_overtime: "",//是否加班
              is_arrange: "",//是否排班
              is_business: "",//是否出差
              is_late: "",//是否迟到
              late_minutes: "",//迟到分钟数
              is_vacate: "",//是否请假
              is_absenteeism: "",//是否旷工
          }
          this.getCurrentDate(new Date());
      },
      highGrade (){
          this.resetting();
          this.isHighPunch = false;
      },
      punchSizeChange (val){
          this.punchCardParams.limit = val;
          this.getPunchCardList();
      },
      punchCurrentChange (val){
          this.punchCardParams.page = val;
          this.getPunchCardList();
      },
      getCurrentDate (date){
        var dates = new Date(date).toLocaleDateString().split("/");
        var month = dates[1];
        if(parseInt(month)<10){
          month = "0" + month;
        }
        var day = dates[2];
        if(parseInt(day)<10){
          day = "0" + day;
        }
        var date = dates[0] + "-" + month + "-" + day;
        this.punchCardParams.arrange_day = date;
      },
    openOrgan(val, type) {
      this.organDivision = val;
      this.organModule = true;
      this.organizeType = type;
      this.lengths = 1;
    },
    // 清空部门
    emptyDepart(val) {
      this.org_name = "";
      this.punchCardParams.org_id = "";
    },
    // 关闭组织架构
    closeOrgan() {
      this.organDivision = "";
      this.organModule = false;
      this.organizeType = "";
      this.lengths = 0;
    },
    // 确认部门
    selectMember(val) {
      this.punchCardParams.org_id = val[0].id;
      this.org_name = val[0].name;
    },
    bg(row, label) {
        // console.log(row, "11111");
        
    }
  },
  mounted (){
    var date = new Date();
      this.getCurrentDate(date);
      this.getPunchCardList();
  }
};
</script>

<style lang="scss">
    #punchCard{
        width: 100%;
        position: relative;
        .wanring {
            color: red;
        }
    }
</style>

