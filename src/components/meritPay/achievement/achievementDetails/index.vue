<template>
  <div id="achieveDetail">
    <!--搜索-->
    <div class="nav-search">
      <el-select size="mini" v-model="searchList.selectValue">
        <el-option label="1" value="1"></el-option>
        <el-option label="2" value="2"></el-option>
        <el-option label="3" value="3"></el-option>
      </el-select>
      <el-input placeholder="请选择" @focus="openOrgan('org_names', 'depart')" style="width:300px;"
                v-model="searchList.org_name"
                size="mini">
        <el-button slot="append" @click="emptyDepart('org_names')">清空</el-button>
      </el-input>
      <el-date-picker
        v-model="searchList.dateValue"
        size="mini"
        type="daterange"
        align="right"
        unlink-panels
        range-separator="至"
        start-placeholder="开始日期"
        end-placeholder="结束日期">
      </el-date-picker>
      <el-input
        v-model="searchList.search"
        placeholder="请输入需要搜索的内容"
        size="mini"
        style="width: 250px;"
        clearable
      >
        <template slot="append">
          <el-button type="primary" icon="el-icon-search">搜索</el-button>
        </template>
      </el-input>
      <el-button type="primary" size="mini" @click="resetParams">重置</el-button>
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
        @selection-change = "selectRow"
      >
        <el-table-column
          type="selection"
          width="55">
        </el-table-column>
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
            {{ scope.row.pay_type == 1 ? '月付' : scope.row.pay_type == 3 ? '季付' : scope.row.pay_type == 6 ? '半年付' : '年付'}}
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
          label="总金额"
          prop="achv"
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
        searchList: {
          selectValue: '',
          dateValue: '',
          search: '',
          org_name: '',
          limit: 5,
          page: 1,
          startTime: '',
          end_time: '',
        },
        organModule: false,
        lengths: 0,
        organizeType: "",
        staff_id: "",
        detailData: [],
        getShow: false,
        TableInfo: '',
        totalPage: 0,
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
        this.$http.get(this.url + 'salary/achv/commission/',{
          params: {
            start_time: this.searchList.startTime,
            end_time: this.searchList.end_time,
            staff_if: this.staff_id,
            limit: this.searchList.limit,
            page: this.searchList.page
          }
        }).then(res =>{
          console.log(res);
          if(res.status ==200){
            if(res.data.code == 88800){
              this.detailData = res.data.data.data;
              this.totalPage = res.data.data.count;
              this.getShow = false;
            }else{
              this.$notify.warning({
                title: '警告',
                message: res.data.msg
              });
              this.detailData = [];
              this.TableInfo = '暂无数据';
              this.getShow = false;
            }
          }
        }).catch(err =>{
          console.log(err);
        })
      },
      getRoute() {
        this.staff_id = this.$route.query.user_id;
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
        console.log(val);
      },
      emptyDepart() {
      },
      exportFile() {
        this.$message('功能尚未开启');
      },
      resetParams() {
        this.$message('功能尚未开启');
      },
      selectRow(row) {
        console.log(row);
      }
    }
  }
</script>

<style lang="scss" scoped>
  #achieveDetail {
    width: 100%;
    .nav-search {
      width: 100%;
      height: 40px;
      text-align: right;
      margin-bottom: 20px;
    }
  }
</style>
