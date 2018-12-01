<template>
    <div id="historySalary">
      <div class="highRanking" style=" position: absolute; top: 122px; right: 55px;">
        <div class="tabsSearch" style="position: relative;">
            <el-form :inline="true" onsubmit="return false" size="mini">
            <el-form-item>
                    <el-input
                      v-model="form.search"
                      placeholder="请输入需要搜索的员工姓名"
                      size="mini"
                      style="width:250px;dispaly:inline-block;margin-left:20px;"
                      clearable
                      @keyup.enter.native.prevent="getTableData">
                      <el-button slot="append" icon="el-icon-search" @click="getTableData"></el-button>
                    </el-input>
                  </el-form-item>    
            <el-form-item>
                <el-button type="primary" size="mini" @click="highGrade">高级</el-button>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" size="mini" @click="importShow = true">导入<i
                      class="el-icon-upload el-icon--right"></i></el-button>
            </el-form-item>
            </el-form>
        </div>
        </div>
    <div class="highRanking">
      <div class="filter high_grade" :class="isHigh? 'highHide':''"  style=" margin-top: -40px;">
        <el-form :inline="true" onsubmit="return false" :model="form" size="mini" label-width="100px">
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
                        type="month"
                        placeholder="选择月"
                        value-format="yyyy-MM">
                      </el-date-picker>
                    </div>
                  </el-form-item>
                </el-col>
              </el-row>
            </el-col>
          </el-row>
          <div class="btnOperate">
            <el-button size="mini" type="primary" @click="getTableData">搜索</el-button>
            <el-button size="mini" type="primary" @click="resetting">重置</el-button>
            <el-button size="mini" type="primary" @click="highGrade">取消</el-button>
          </div>
        </el-form>
      </div>
    </div>
    <el-table
          :data="tableData"
          :empty-text='collectStatus'
          v-loading="collectLoading"
          element-loading-text="拼命加载中"
          element-loading-spinner="el-icon-loading"
          element-loading-background="rgba(255, 255, 255, 0)"
          width="100%">
          <el-table-column
            label="姓名"
            prop="name"
          ></el-table-column>
          <el-table-column
            label="部门"
            prop="depart">
          </el-table-column>
          <el-table-column
            label="实际出勤天数"
            prop="at_day">
          </el-table-column>
          <el-table-column
            label="老绩效溢出业绩"
            prop="old_overflow_achv">
          </el-table-column>
          <el-table-column
            label="新绩效溢出业绩"
            prop="new_overflow_achv">
          </el-table-column>
          <el-table-column
            label="老绩效基本工资"
            prop="old_basic_achv">
          </el-table-column>
          <el-table-column
            label="新绩效工资"
            prop="new_basic_achv">
          </el-table-column>
          <el-table-column
            label="提成工资"
            prop="push_money">
          </el-table-column>
          <el-table-column
            label="原收房奖励"
            prop="old_lord_award">
          </el-table-column>
          <el-table-column
            label="收溢价奖励"
            prop="lord_overflow_award">
          </el-table-column>
          <el-table-column
            label="收房奖励"
            prop="lord_award">
          </el-table-column>
          <el-table-column
            label="原租房奖励"
            prop="old_rent_award">
          </el-table-column>
          <el-table-column
            label="租溢价奖励"
            prop="rent_overflow_award">
          </el-table-column>
          <el-table-column
            label="租房奖励"
            prop="rent_award">
          </el-table-column>
          <el-table-column
            label="新绩效续租奖励"
            prop="new_secondrent_award">
          </el-table-column>
          <el-table-column
            label="各项补贴"
            prop="bonus">
          </el-table-column>
          <el-table-column
            label="应发工资"
            prop="deserved_salary">
          </el-table-column>
          <el-table-column
            label="新绩效工资"
            prop="new_basic_achv">
          </el-table-column>
          <el-table-column
            label="南京市最低工资计算最低工资"
            prop="nanjing_lowest_salary">
          </el-table-column>
          <el-table-column
            label="迟到扣款"
            prop="late_cut">
          </el-table-column>
            <el-table-column
            label="缺卡扣天数"
            prop="missing_date">
          </el-table-column>
          <el-table-column
            label="病假扣款"
            prop="sick_leave_cut">
          </el-table-column>
          <el-table-column
            label="事假扣款"
            prop="personal_leave_cut">
          </el-table-column>
          <el-table-column
            label="缺卡扣款"
            prop="missing_cut_money">
          </el-table-column>
          <el-table-column
            label="缺勤扣款"
            prop="missing_date_money">
          </el-table-column>
          <el-table-column
            label="旷工扣款"
            prop="absenteeism_cut">
          </el-table-column>
          <el-table-column
            label="社保扣款"
            prop="social_security_cut">
          </el-table-column>
          <el-table-column
            label="电动车扣款"
            prop="ele_driver_cut">
          </el-table-column>
          <el-table-column
            label="宿舍扣款"
            prop="dormitory_cut">
          </el-table-column>
          <el-table-column
            label="合同扣款"
            prop="contract_cut">
          </el-table-column>
          <el-table-column
            label="意外险扣款"
            prop="accident_security_cut">
          </el-table-column>
          <el-table-column
            label="行政扣款"
            prop="administration_cut">
          </el-table-column>
          <el-table-column
            label="新媒体扣款"
            prop="new_media_cut">
          </el-table-column>
          <el-table-column
            label="产品管控扣款"
            prop="product_control_cut">
          </el-table-column>
          <el-table-column
            label="财务扣款"
            prop="finance_cut">
          </el-table-column>
          <el-table-column
            label="客服扣款"
            prop="customer_server_cut">
          </el-table-column>
          <el-table-column
            label="上月工资负数"
            prop="prev_month_salary">
          </el-table-column>
          <el-table-column
            label="其他扣款"
            prop="other_cut">
          </el-table-column>
          <el-table-column
            label="应税工资"
            prop="taxable_salary">
          </el-table-column>
          <el-table-column
            label="个税"
            prop="personal_income_tax">
          </el-table-column>
          <el-table-column
            label="应扣合计"
            prop="cut_sum">
          </el-table-column>
          <el-table-column
            label="实发工资"
            prop="actual_salary">
          </el-table-column>
          <el-table-column
            label="2020标准补发"
            prop="standard_supplement">
          </el-table-column>
          <el-table-column
            label="实发"
            prop="actual_money">
          </el-table-column>
          <el-table-column
            label="资料不齐"
            prop="doc_complete">
          </el-table-column>
          <el-table-column
            label="尾款不齐"
            prop="final_money_complete">
          </el-table-column>
          <el-table-column
            label="最终实发金额"
            prop="amount_due">
          </el-table-column>
        </el-table>

      <div class="block pages">
        <el-pagination
          @current-change="handleCurrentChange"
          :current-page="form.page"
          :page-size="5"
          layout="total, prev, pager, next, jumper"
          :total="totalNum">
        </el-pagination>
      </div> 
      <div>
        <el-dialog
            title="导入"
            :visible.sync="importShow"
            width="20%">
            <Upload :ID="'uploadExcel'" :isClear="isClear" @getImg="getImg"></Upload>
            <div style="width:100%;text-align:right;">
            <el-button size="mini" @click="cencelUpload">取消</el-button>
            <el-button size="mini" type="primary" @click="importExl" :loading="importTmp">确定</el-button>
            </div>
        </el-dialog>
    </div>
    </div> 
    
</template>
<script>
import Upload from '../../../common/UPLOAD.vue'
    export default{
        name :'historySalary',
        components:{Upload},
        data(){
            return{
                isHigh: false,
                tableData: [],
                totalNum: 0,
                active: 0,
                form: {
                    limit: 5,
                    page: 1,
                    date:'',
                    staff_ids:[],
                    depart_ids:[],
                    search:''
                },
                // importFile: {},
                isClear: false,
                collectStatus: ' ',
                collectLoading: false,
                file_id:'',
                importShow:false,
                importTmp: false,
            }
        },
        mounted() {
            this.getTableData();
        },
        methods:{
            goSearch(){
                this.getTableData;
            },
            getImg(val) {
                console.log(val);
                if (val[1].length > 1) {
                this.$notify.warning({
                    title: '警告',
                    message: '仅支持单个文件上传'
                });
                return false;
                }
                this.file_id = val[1][0];
            },
            getTableData() {
                this.collectLoading = true;
                this.collectStatus = ' ';
                this.$http.get(globalConfig.server + 'salary/sala/index/',{params:this.form} ).then((res) => {
                this.isHigh = false;
                this.collectLoading = false;
                if (res.data.code === '88800') {
                    this.header = res.data.data.data[0].header;
                    this.tableData = res.data.data.data;
                    this.totalNum = Number(res.data.data.count);
                } else {
                    this.collectStatus = '暂无数据';
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
                this.form.date = '';
            },
            // 高级筛选
            highGrade() {
                this.isHigh = !this.isHigh;
            },
            cencelUpload() {
                this.importTmp= false,
                this.importShow = false;
            },
            importExl() {
                this.importTmp = true;
                this.$http.post(globalConfig.server + "salary/sala/import/", {
                file_id: this.file_id
                }).then(res => {
                if (res.status == 200) {
                    if (res.data.code == 88800) {
                    this.isClear = true;
                    this.importTmp = false;
                    this.$notify.success({
                        title: "成功",
                        message: res.data.msg
                    });
                    // this.resetting();
                    this.cencelUpload();
                    this.getArrangeList(this.arrangeParams);
                    } else {
                    this.isClear = true;
                    this.importTmp = false;
                    this.$notify.warning({
                        title: "警告",
                        message: res.data.msg
                    });
                    this.resetting();
                    this.cencelUpload();
                    }
                }
                })
            },
        }
    }
</script>
<style scoped>
    
</style>