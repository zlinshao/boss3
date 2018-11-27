<template>
    <div id="traderSalary">
        <div class="highRanking" style=" position: absolute; top: 122px; right: 55px;">
            <div class="tabsSearch" style="position: relative;">
                <el-form :inline="true" onsubmit="return false" size="mini">
                <el-form-item>
                    <el-button type="primary" size="mini" @click="highGrade">高级</el-button>
                </el-form-item>
                <el-form-item>
                  <el-button type="primary" @click="exportData">导出</el-button>
                </el-form-item>
                </el-form>
            </div>
        </div>
        <div class="highRanking">
            <div class="filter high_grade" :class="isHigh? 'highHide':''"  style=" margin-top: -80px;">
                <el-form :inline="true" onsubmit="return false" :model="form" size="mini" label-width="100px">
                <div class="filterTitle">
                    <i class="el-icons-fa-bars"></i>&nbsp;&nbsp;高级搜索
                </div>
                <el-row class="el_row_border">
                  <el-col :span="12">
                    <el-row>
                      <el-col :span="8">
                        <div class="el_col_label">部门</div>
                      </el-col>
                      <el-col :span="16" class="el_col_option">
                        <el-form-item>
                          <el-input v-model="depart_name" @focus="chooseDepart" placeholder="请选择部门"
                                    readonly>
                            <template slot="append">
                              <div style="cursor: pointer;" @click="closeDepart">清空</div>
                            </template>
                          </el-input>
                        </el-form-item>
                      </el-col>
                    </el-row>
                  </el-col>
                  <el-col :span="12">
                    <el-row>
                      <el-col :span="8">
                        <div class="el_col_label">员工</div>
                      </el-col>
                      <el-col :span="16" class="el_col_option">
                        <el-form-item>
                          <el-input v-model="staff_name" @focus="chooseStaff" placeholder="请选择员工"
                                    readonly>
                            <template slot="append">
                              <div style="cursor: pointer;" @click="closeStaff">清空</div>
                            </template>
                          </el-input>
                        </el-form-item>
                      </el-col>
                    </el-row>
                  </el-col>
                </el-row>
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
                                v-model="month"
                                type="month"
                                placeholder="选择月"
                                value-format="yyyyMM">
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
          @row-click='clickTable'
          width="100%">
          <el-table-column
            label="员工"
            prop="staff_name"
          ></el-table-column>
          <el-table-column
            label="工资月份"
            prop="achv_month">
          </el-table-column>
          <el-table-column
            label="总溢出业绩"
            prop="achv_overflow">
          </el-table-column>
          <el-table-column
            label="总综合金额"
            prop="achv">
          </el-table-column>
          <el-table-column
            label="总基本业绩"
            prop="achv_real">
          </el-table-column>
          <el-table-column
            label="总到手金额"
            prop="amount_due">
          </el-table-column>
          <el-table-column
            label="总服务费"
            prop="services_fee">
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
      <div class="myDetail">
        <LordtraderDetail :staff_id="staff_id" :date="form.date"></LordtraderDetail>
      </div>
      <organization :organizationDialog="organizeVisible" :type="organizeType" @close="closeOrganize"
                  @selectMember="selectMember"></organization>
      <right-menu :startX="rightMenuX+'px'" :startY="rightMenuY+'px'" :list="lists" :show="show"
                @clickOperateMore="clickEvent"></right-menu>

    </div>
</template>
<script>
  import Organization from '../../../common/organization.vue';
  import RightMenu from '../../../common/rightMenu.vue';    //右键
  import LordtraderDetail from './lordtraderdetail';
    export default{
        name:'tradersalary',
        components:{Organization,RightMenu,LordtraderDetail},
        data(){
            return{
                isHigh: false,
                tableData: [],
                totalNum: 0,
                active: 0,
                form: {
                    limit:5,
                    date: '',
                    page: 1,
                    staff_ids:[],
                    depart_ids:[],
                },
                month:'',
                // importFile: {},
                isClear: false,
                collectStatus: ' ',
                collectLoading: false,
                depart_name:'',
                staff_name:'',
                organizeType: '',
                organizeVisible: false,
                rightMenuX: 0,
                rightMenuY: 0,
                lists: [],
                show:false,
                staff_id:''
            }
        },
        mounted() {
          this.getTableData();
        },
        methods:{
          getTableData() {
            console.log(this.form);
            if (this.month) {
              this.form.date = this.month.substring(2);
            }
            this.collectLoading = true;
            this.collectStatus = ' ';
            this.$http.get(globalConfig.server + 'salary/achv/getSalary/',{params:this.form}).then((res) => {
              this.isHigh = false;
              this.collectLoading = false;
              if (res.data.code === '88800') {
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
           // 部门筛选
          chooseDepart() {
            this.organizeVisible = true;
            this.organizeType = 'depart';
          },
          // 员工筛选
          chooseStaff() {
            this.organizeVisible = true;
            this.organizeType = 'staff';
          },
          closeOrganize() {
            this.organizeVisible = false;
          },
          // 清空部门
          closeDepart() {
            this.form.depart_ids = [];
            this.depart_name = '';
          },
          // 清空员工
          closeStaff() {
            this.form.staff_ids = [];
            this.staff_name = '';
          },
          selectMember(val) {
            if (this.organizeType === 'depart') {
              for (var i = 0; i < val.length; i++) {
                this.depart_name = this.depart_name === "" ? val[i].name : this.depart_name + "," + val[i].name;
                this.form.depart_ids.push(val[i].id);
              }
            } else if (this.organizeType === 'staff') {
              for (var i = 0; i < val.length; i++) {
                this.staff_name = this.staff_name === "" ? val[i].name : this.staff_name + "," + val[i].name;
                this.form.staff_ids.push(val[i].id);
              }
            }
          },
          exportData(){
            alert('导出');
          },
          // 右键
          openContextMenu(row, event) {
            this.pitch = row.id;
            this.lists = [
              {clickIndex: 'confiscation', headIcon: 'el-icon-edit-outline', label: '是否充公'},
              {clickIndex: 'editOverAchv', headIcon: 'el-icon-edit-outline', label: '编辑溢出业绩'},
            ];
            this.contextMenuParam(event);
          },
          openDetail(row) {
            console.log(row);
            this.dblRowData = row;
            this.dialogVisible = true;
          },
          // 右键回调
          clickEvent(val) {
            switch (val.clickIndex) {
              case 'confiscation':

                break;
              case 'editOverAchv':
                this.editAble = true;
                break;

            }
          },
          //右键参数
          contextMenuParam(event) {
            let e = event || window.event;
            this.show = false;
            this.rightMenuX = e.clientX + document.documentElement.scrollLeft - document.documentElement.clientLeft;
            this.rightMenuY = e.clientY + document.documentElement.scrollTop - document.documentElement.clientTop;
            event.preventDefault();
            event.stopPropagation();
            this.$nextTick(() => {
              this.show = true
            })
          },
          //关闭右键菜单
          closeMenu() {
            this.show = false;
          },
          clickTable(row, event) {
            this.staff_id=row.staff_id;
          },
        }
    }
</script>
<style  scoped>

</style>
