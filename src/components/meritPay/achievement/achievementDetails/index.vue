<template>
  <div id="achieveDetail">
    <!--搜索-->
    <div class="nav-search">
      <el-input
        v-model="searchList.search"
        placeholder="请输入需要搜索的内容"
        size="mini"
        style="width: 250px;"
        clearable
      >
        <template slot="append">
          <el-button type="primary" icon="el-icon-search" @click="getListData" @keyup.enter.prevent.native="">搜索</el-button>
        </template>
      </el-input>
      <el-button type="primary" size="mini" @click="isHigh = !isHigh">高级</el-button>
      <el-button type="success" size="mini" @click="exportFile">导出</el-button>
    </div>
    <!--列表-->
    <div class="table-list">
      <el-table
        style="width: 100%"
        :data="detailData"
        v-loading="getShow"
        :empty-text="TableInfo"
        element-loading-text="拼命加载中"
        element-loading-spinner="el-icon-loading"
        element-loading-background="rgba(255, 255, 255, 0)"
        @selection-change="selectRow"
      >
        <!-- <el-table-column
          type="selection"
          width="55">
        </el-table-column> -->
        <el-table-column
          label="发喜报日期"
          prop="bulletin_date"
        ></el-table-column>
        <el-table-column
          label="房屋地址"
          prop="house_name"
          width="150px"
        ></el-table-column>
        <el-table-column
          label="收房状态"
          prop="house_type"
        ></el-table-column>
        <el-table-column
          label="付款状态"
          prop="pay_type"
        >
          <template slot-scope="scope">
            {{ scope.row.pay_type === 1 ? '月付' : scope.row.pay_type === 3 ? '季付' : scope.row.pay_type === 6 ? '半年付' :
            '年付'}}
          </template>
        </el-table-column>
        <el-table-column
          label="签约月数"
          prop="month"
        ></el-table-column>
        <el-table-column
          label="单价"
          prop="month_price"
        ></el-table-column>
        <el-table-column
          label="空置期"
          prop="vacancy"
        ></el-table-column>
        <el-table-column
          label="中介费"
          prop="medi_cost"
        ></el-table-column>
        <el-table-column
          label="实际业绩"
          prop="achv_real"
        ></el-table-column>
        <el-table-column
          label="溢出业绩"
          prop="achv_overflow"
        ></el-table-column>
        <el-table-column
          label="提成"
          prop="amount_due"
        ></el-table-column>
        <el-table-column
          label="维护费"
          prop="services_fee"
        ></el-table-column>
        <el-table-column
          label="名称"
          prop="staff_name"
        ></el-table-column>
        <el-table-column
          label="所属部门"
          prop="department"
        ></el-table-column>
        <el-table-column
          label="备注"
        ></el-table-column>
      </el-table>
      <div style="width: 100%;text-align: right;margin-top: 20px;">
        <el-pagination
          :page-sizes="[5,10,15,20]"
          :total="totalPage"
          :page-size="searchList.limit"
          :current-page="searchList.page"
          layout="total,sizes,prev,pager,next,jumper"
        ></el-pagination>
      </div>
    </div>
    <!--组织架构-->
    <Organization :organizationDialog="organModule" :type="organizeType" :length="lengths" @close="closeOrgan"
                  @selectMember="selectMember"></Organization>
                  <div class="highRanking" style="position:static !important;">
    <div class="filter high_grade" :class="isHigh? 'highHide':''">
        <el-form :inline="true" onsubmit="return false" :model="searchList" size="mini" label-width="100px">
          <div class="filterTitle">
            <i class="el-icons-fa-bars"></i>&nbsp;&nbsp;高级搜索
          </div>
          <el-row class="el_row_border">
            <el-col :span="12">
              <el-row>
                <el-col :span="8">
                  <div class="el_col_label">收房状态</div>
                </el-col>
                <el-col :span="16" class="el_col_option">
                  <el-select size="mini" v-model="searchList.type">
                    <el-option :value="1" label="收房"></el-option>
                    <el-option :value="2" label="租房"></el-option>
                  </el-select>
                </el-col>
              </el-row>
            </el-col>
            <el-col :span="12">
              <el-row>
                <el-col :span="8">
                  <div class="el_col_label">部门</div>
                </el-col>
                <el-col :span="16" class="el_col_option">
                  <el-form-item>
                    <el-input placeholder="请选择" @focus="openOrgan('org_names', 'depart')" style="width:300px;"
                        v-model="org_name"
                        size="mini">
                      <el-button slot="append" @click="emptyDepart('org_names')">清空</el-button>
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
                  <el-date-picker
                    v-model="dateValue"
                    size="mini"
                    type="daterange"
                    align="right"
                    unlink-panels
                    @change = "changeDate"
                    range-separator="至"
                    start-placeholder="开始日期"
                    end-placeholder="结束日期">
                  </el-date-picker>
                </el-col>
              </el-row>
            </el-col>
          </el-row>
          <div class="btnOperate">
            <el-button size="mini" type="primary" @click="getListData">搜索</el-button>
            <el-button size="mini" type="primary" @click="resetParams">重置</el-button>
            <el-button size="mini" type="primary" @click="isHigh = false">取消</el-button>
          </div>
        </el-form>
      </div>
    </div>

  </div>
</template>

<script>
  import Organization from "../../../common/organization";

  export default {
    name: "index",
    components: {Organization},
    data() {
      return {
        url: globalConfig.server,
        org_name: '',
        dateValue: '',
        searchList: {
          type: '',
          search: '',
          limit: 5,
          depart_ids: [],
          page: 1,
          start_time: '',
          end_time: '',
          staff_ids: "",
        },
        organModule: false,
        lengths: 0,
        organizeType: "",
        detailData: [],
        getShow: false,
        TableInfo: '',
        totalPage: 0,
        isHigh: false,
      }
    },
    created() {
      this.getRoute();
    },
    mounted() {
      this.getListData();
    },
    methods: {
      getListData() {
        this.getShow = true;
        this.TableInfo = " ";
        this.$http.get(this.url + 'salary/achv/commission/', {
          params: this.searchList
        }).then(res => {
          if (res.status == 200) {
            if (res.data.code == 88800) {
              this.detailData = res.data.data.data;
              this.totalPage = res.data.data.count;
              this.getShow = false;
              this.isHigh = false;
            } else {
              // this.$notify.warning({
              //   title: '警告',
              //   message: res.data.msg
              // });
              this.detailData = [];
              this.TableInfo = '暂无数据';
              this.getShow = false;
              this.isHigh = false;
            }
          }
        }).catch(err => {
          console.log(err);
        })
      },
      getRoute() {
        this.searchList.staff_ids = this.$route.query.user_id;
      },
      openOrgan(val, type) {
        this.organModule = true;
        this.lengths = '';
        this.organizeType = type;
      },
      closeOrgan() {
        this.organModule = false;
        this.lengths = 0
      },
      selectMember(val) {
        var name = '';
        val.forEach(element => {
          name += element.name + ',';
          this.searchList.depart_ids.push(element.id);
        });
        this.org_name = name.substring(0,name.length - 1 );
      },
      emptyDepart() {
        this.org_name = '';
        this.searchList.depart_ids = [];
      },
      exportFile() {
        window.location.href = `${this.url}salary/achv/commission/?type=${this.searchList.type}
        &search=${this.searchList.search}&page=${this.searchList.page}
        &limit=${this.searchList.limit}&start_time=${this.searchList.start_time}
        &end_time=${this.searchList.end_time}&staff_ids=${this.searchList.staff_ids}&depart_ids=${this.searchList.depart_ids}&export=1`;
      },
      resetParams() {
        this.searchList = {
          type: '',
          search: '',
          limit: 5,
          depart_ids: [],
          page: 1,
          start_time: '',
          end_time: '',
          staff_ids: this.$route.query.user_id,
        };
        this.dateValue = '';
        this.org_name = '';
      },
      selectRow(row) {
        console.log(row);
      },
      changeDate(val) {
        this.searchList.start_time = new Date(val[0]).toLocaleDateString().split('/').join('-');
        this.searchList.end_time = new Date(val[1]).toLocaleDateString().split('/').join('-');
      }
    }
  }
</script>

<style lang="scss" scoped>
  #achieveDetail {
    width: 100%;
    position: relative;
    .nav-search {
      width: 100%;
      height: 40px;
      text-align: right;
      margin-bottom: 20px;
    }
  }
</style>
