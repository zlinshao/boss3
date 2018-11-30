<template>
    <div id="managerSalary">
      <!--高级-->
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
          <el-form :inline="true" onsubmit="return false" :model="params" size="mini" label-width="100px">
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
                      <el-input v-model="depart_name" @focus="chooseDepartment" placeholder="请选择部门"
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
                    <div class="el_col_label">日期</div>
                  </el-col>
                  <el-col :span="16" class="el_col_option">
                    <el-form-item>
                      <div class="block">
                        <el-date-picker
                          v-model="date"
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
              <el-button size="mini" type="primary" @click="goSearch">搜索</el-button>
              <el-button size="mini" type="primary" @click="goReset">重置</el-button>
              <el-button size="mini" type="primary" @click="highGrade">取消</el-button>
            </div>
          </el-form>
        </div>
      </div>
      <!--表格1-->
      <div>
        <el-table
          :data="allSalary"
          :empty-text="emptyText"
          v-loading="allLoading"
          element-loading-text="拼命加载中"
          element-loading-icon="element-icon-loading"
          element-loading-background="rgba(255,255,255,0)"
          @row-click="LookDetail"
          highlight-current-row
        >
          <el-table-column label="员工姓名" prop="sign_user.name"></el-table-column>
          <el-table-column label="片区" prop="sign_org.name"></el-table-column>
          <el-table-column label="工资月份" prop="achv_month"></el-table-column>
          <el-table-column label="绩效" prop="amount_due"></el-table-column>
          <el-table-column label="认责" prop="duty"></el-table-column>
          <el-table-column label="综合工资" prop="achv"></el-table-column>
        </el-table>
        <div style="text-align: right;">
          <el-pagination
            size="mini"
            layout="total,prev,pager,next"
            :current-page="params.page"
            :page-size="params.limit"
            :total="allCount"
          ></el-pagination>
        </div>
      </div>

      <!--表格2-->
      <div class="detail">
        <div  style="text-align: right;margin-top: 25px;">
          <el-button type="primary" size="mini" @click="exportDetail">导出详情</el-button>
        </div>
        <el-tabs v-model="activeName" @tab-click="handleTabClick">
          <el-tab-pane label="收房相关" name="first">
            <div>
              <el-table
                :data="collectList"
                :empty-text="collectEmptyText"
                v-loading="collectLoading"
                element-loading-text="拼命加载中"
                element-loading-icon="element-icon-loading"
                element-loading-background="rgba(255,255,255,0)"
              >
                <el-table-column label="片区名称" prop="sign_org.name"></el-table-column>
                <el-table-column label="房屋名称" prop="house.name"></el-table-column>
                <el-table-column label="收房人" prop="lord.sign_user_id.name"></el-table-column>
                <el-table-column label="原收房均价" prop="lord.lord_month_price"></el-table-column>
                <el-table-column label="重新定收房均价" prop="suggest_price"></el-table-column>
                <el-table-column label="收房年限" prop="lord.lord_duration"></el-table-column>
                <el-table-column label="收房空置期" prop="lord.lord_vacancy_date"></el-table-column>
                <el-table-column label="收房中介费" prop="lord.lord_agency_count"></el-table-column>
                <el-table-column label="收房付款方式" prop="lord.lord_pay_way"></el-table-column>
                <el-table-column label="收房综合金额" prop="achv"></el-table-column>
                <el-table-column label="认责" prop="duty"></el-table-column>
                <el-table-column label="净得金额" prop="amount_due"></el-table-column>
              </el-table>
              <div style="text-align: right;">
                <el-pagination
                  :page-size="detailParams.limit"
                  :current-page="detailParams.page"
                  size="mini"
                  layout="total,prev,pager,next"
                  :total="collectCount"
                ></el-pagination>
              </div>
            </div>
          </el-tab-pane>
          <el-tab-pane label="租房相关" name="second">
            <div>
              <el-table
                :data="rentList"
                :empty-text="rentEmptyText"
                v-loading="rentLoading"
                element-loading-text="拼命加载中"
                element-loading-icon="element-icon-loading"
                element-loading-background="rgba(255,255,255,0)"
              >
                <el-table-column label="片区名称" prop="sign_org.name"></el-table-column>
                <el-table-column label="房屋名称" prop="house.name"></el-table-column>
                <el-table-column label="租房人" prop="sign_user.name"></el-table-column>
                <el-table-column label="租房喜报时间" prop="rent.bulletindate"></el-table-column>
                <el-table-column label="合同开始时间" prop="rent.start_at"></el-table-column>
                <el-table-column label="是否新租" prop="achv.typical"></el-table-column>
                <el-table-column label="租房价格" prop="rent.rent_month_price"></el-table-column>
                <el-table-column label="租房付款方式" prop="rent.rent_pay_way"></el-table-column>
                <el-table-column label="租房消耗空置期" prop="rent.rent_vacancy_date"></el-table-column>
                <el-table-column label="租房中介费" prop="rent.rent_agency_count"></el-table-column>
                <el-table-column label="合同签约周期" prop="rent.rent_sign_month"></el-table-column>
                <el-table-column label="认责" prop="duty"></el-table-column>
                <el-table-column label="净得" prop="amount_due"></el-table-column>
              </el-table>
              <div style="text-align: right;">
                <el-pagination
                  size="mini"
                  :page-size="detailParams.limit"
                  :current-page="detailParams.page"
                  layout="total,prev,pager,next"
                  :total="rentCount"
                ></el-pagination>
              </div>
            </div>
          </el-tab-pane>
        </el-tabs>
      </div>

      <!--组织架构-->
      <organization :organizationDialog="organizeVisible" :length="length" :type="organizeType" @close="closeOrganize"
                    @selectMember="selectMember"></organization>
    </div>
</template>
<script>
  import organization from '../../../common/organization';

    export default{
        name:'managersalary',
      components:{ organization },
        data(){
            return{
              url: globalConfig.server,
              activeName: 'first',
              params: {
                page: 1,
                limit:10,
                search: '',
                depart_ids: '',
                date: ''
              },
              depart_name: '',
              organizeVisible: false,
              organizeType: '',
              length: 0 ,
              detailParams: {
                page: 1,
                limit: 10,
                date: '',
                staff_ids: '',
                category: 1
              },
              date: '',
              isHigh: false,
              allSalary: [],
              allCount: 0,
              emptyText: "",
              allLoading: false,
              collectList: [],
              collectCount: 0,
              collectLoading: false,
              collectEmptyText: "",
              rentList: [],
              rentCount: 0,
              rentLoading: false,
              rentEmptyText: "",
            }
        },
      mounted() {
          this.getCurrentDate();
          this.getManagerSalary();
      },
        methods:{
          getDetailSalary() {
            this.detailParams.date = this.date.split("/").join("").substring(2,6);
            if(!this.detailParams.staff_ids){
              this.$notify.warning({
                title: "警告",
                message: "请先选择管理员"
              });
              return false;
            }
            if(this.detailParams.category === 1){
              this.collectLoading  = true;
            }else {
              this.rentLoading = true;
            }
            this.$http.get(this.url + "salary/achv/getmanagerSalaDetail",{
              params: this.detailParams
            }).then(res => {
              if(res.data.code === "88800"){
                if(this.detailParams.category === 1){
                  this.collectLoading = false;
                  this.collectEmptyText = " ";
                  this.collectList = res.data.data.data;
                  this.collectCount = res.data.data.count;
                }else {
                  this.rentLoading = false;
                  this.rentEmptyText = " ";
                  this.rentList = res.data.data.data;
                  this.rentCount = res.data.data.count;
                }
              }else {
                if(this.detailParams.category ===1){
                  this.collectLoading = false;
                  this.collectEmptyText = "暂无数据";
                  this.collectList = [];
                  this.collectCount = 0;
                }else {
                  this.rentLoading = false;
                  this.rentEmptyText = "暂无数据";
                  this.rentList = [];
                  this.rentCount = 0;
                }
              }
            }).catch(err => {
              console.log(err);
            })
          },
          LookDetail(row) {
            this.detailParams.staff_ids = row.staff_id;
            this.getDetailSalary();
          },
          getCurrentDate(){
            this.date = new Date().toLocaleDateString();
          },
          getManagerSalary() {
            this.allLoading = true;
            this.params.date = this.date.split("/").join("").substring(2,6);
            this.$http.get(this.url + "salary/achv/getmanagerSala",{
              params: this.params
            }).then(res => {
              if(res.data.code === "88800"){
                  this.allLoading = false;
                  this.emptyText = " ";
                  this.allSalary = res.data.data.data;
                  this.allCount = res.data.data.count;
              }else {
                  this.allSalary = [];
                  this.allCount = 0;
                  this.allLoading = false;
                  this.emptyText = "暂无数据";
              }
            }).catch(err => {
              console.log(err);
            })
          },
          //打开部门
          chooseDepartment() {
            this.organizeVisible = true;
            this.organizeType = 'depart';
            this.length = 1;
          },
          closeOrganize() {
            this.organizeVisible = false;
          },
          selectMember(val) {
            this.params.depart_ids = val[0].id;
            this.depart_name = val[0].name;
          },
          //清空部门
          closeDepart() {
            this.depart_name = "";
            this.params.depart_ids = "";
          },
          //搜索
          goSearch() {
            this.getManagerSalary();
            this.isHigh = false;
          },
          //重置
          goReset() {
            this.closeDepart();
            this.getCurrentDate();
          },
          //切换click
          handleTabClick(tab) {
            this.detailParams.category = parseInt(tab.index) + 1;
            this.getDetailSalary();
          },
          //高级
          highGrade() {
            this.isHigh = !this.isHigh;
          },
          //导出
          exportData() {
            window.location.href = this.url + `salary/achv/getmanagerSala?page=${this.params.page}&limit=${this.params.limit}&depart_ids=${this.params.depart_ids}&
            date=${this.params.date}&export=1`
          },
          //导出详情
          exportDetail() {
            if(!this.detailParams.staff_ids){
              this.$notify.warning({
                title: "警告",
                message: "请先选择管理员"
              });
              return false;
            }
            window.location.href = this.url + `salary/achv/getmanagerSalaDetail?page=${this.detailParams.page}&limit=${this.detailParams.limit}&staff_ids=${this.detailParams.staff_ids}&
            category=${this.detailParams.category}&date=${this.detailParams.date}&export=1`;
          },
        }
    }
</script>
<style scoped lang="scss">
  #managerSalary{
    width: 100%;
    .detail{
      margin: 15px auto;
    }
  }
</style>
