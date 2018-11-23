<template>
    <div id="detail">
        <el-tabs v-model="activeName2" type="border-card" @tab-click="handleClick">
        <el-tab-pane label="收房业绩" name="first">
            <div class="table-list">
                <el-table
                    style="width: 100%"
                    :data="detailData"
                    v-loading="getShow"
                    :empty-text="TableInfo"
                    element-loading-text="拼命加载中"
                    element-loading-spinner="el-icon-loading"
                    element-loading-background="rgba(255, 255, 255, 0)">
                    <el-table-column
                    label="发喜报日期"
                    prop="bulletin_date"
                    ></el-table-column>
                    <el-table-column
                    label="房屋地址"
                    prop="address"
                    width="150px"
                    ></el-table-column>
                    <el-table-column
                    label="收房状态"
                    prop="house_type"
                    ></el-table-column>
                    <el-table-column
                    label="付款状态"
                    prop="lord_data.lord_pay_way"
                    >
                    </el-table-column>
                    <el-table-column
                    label="签约年数"
                    prop="lord_data.lord_duration"
                    ></el-table-column>
                    <el-table-column
                    label="单价"
                    prop="lord_data.lord_month_price"
                    ></el-table-column>
                    <el-table-column
                    label="空置期"
                    prop="lord_data.lord_vacancy_date"
                    ></el-table-column>
                    <el-table-column
                    label="中介费"
                    prop="lord_data.lord_property_fee"
                    ></el-table-column>
                    <el-table-column
                    label="实际业绩"
                    prop="achv_res.lord.basic_achievement"
                    ></el-table-column>
                    <el-table-column
                    label="溢出业绩"
                    prop="achv_res.lord.overflow"
                    ></el-table-column>
                    <el-table-column
                    label="提成"
                    prop="achv_res.lord.real_money"
                    ></el-table-column>
                    <el-table-column
                    label="维护费"
                    prop="achv_res.lord.extra_award"
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
            </div>
        </el-tab-pane>
        <el-tab-pane label="租房业绩" name="second">
            <div class="table-list">
                <el-table
                    style="width: 100%"
                    :data="detailData"
                    v-loading="getShow"
                    :empty-text="TableInfo"
                    element-loading-text="拼命加载中"
                    element-loading-spinner="el-icon-loading"
                    element-loading-background="rgba(255, 255, 255, 0)">
                    <el-table-column
                    label="发喜报日期"
                    prop="bulletin_date"
                    ></el-table-column>
                    <el-table-column
                    label="房屋地址"
                    prop="address"
                    width="150px"
                    ></el-table-column>
                    <el-table-column
                    label="收房状态"
                    prop="house_type"
                    ></el-table-column>
                    <el-table-column
                    label="付款状态"
                    prop="rent_data.rent_pay_way"
                    >
                
                    </el-table-column>
                    <el-table-column
                    label="签约月数"
                    prop="rent_data.rent_sign_month"
                    ></el-table-column>
                    <el-table-column
                    label="单价"
                    prop="rent_data.rent_month_price"
                    ></el-table-column>
                    <el-table-column
                    label="消耗空置期"
                    prop="rent_data.rent_vacancy_date"
                    ></el-table-column>
                    <el-table-column
                    label="中介费"
                    prop="rent_data.rent_agency_count"
                    ></el-table-column>
                    <el-table-column
                    label="实际业绩"
                    prop="achv_res.rent.basic_achievement"
                    ></el-table-column>
                    <el-table-column
                    label="溢出业绩"
                    prop="achv_res.rent.overflow"
                    ></el-table-column>
                    <el-table-column
                    label="提成"
                    prop="achv_res.rent.real_money"
                    ></el-table-column>
                    <el-table-column
                    label="维护费"
                    prop="achv_res.rent.extra_award"
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
            </div>
        </el-tab-pane>
        <el-tab-pane label="全部业绩" name="third">
            <div class="table-list">
                <el-table
                    style="width: 100%"
                    :data="detailData"
                    v-loading="getShow"
                    :empty-text="TableInfo"
                    element-loading-text="拼命加载中"
                    element-loading-spinner="el-icon-loading"
                    element-loading-background="rgba(255, 255, 255, 0)">
                    <el-table-column
                    label="发喜报日期"
                    prop="bulletin_date"
                    ></el-table-column>
                    <el-table-column
                    label="房屋地址"
                    prop="address"
                    width="150px"
                    ></el-table-column>
                    <el-table-column
                    label="收房签约年数"
                    prop="lord_data.lord_duration"
                    ></el-table-column>
                    <el-table-column
                    label="租房签约月数"
                    prop="rent_data.rent_sign_month"
                    >
                    </el-table-column>
                    <el-table-column
                    label="收房月单价"
                    prop="lord_data.lord_month_price"
                    ></el-table-column>
                    <el-table-column
                    label="租房月单价"
                    prop="rent_data.rent_month_price"
                    ></el-table-column>
                    <el-table-column
                    label="总基本业绩"
                    prop="achv_res.all.basic_achievement"
                    ></el-table-column>
                    <el-table-column
                    label="总溢出业绩"
                    prop="achv_res.all.overflow"
                    ></el-table-column>
                    <el-table-column
                    label="总提成"
                    prop="achv_res.all.real_money"
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
            
            </div>
        </el-tab-pane>
        <div style="width: 100%;text-align: right;margin-top: 20px;">
            <el-pagination
            :total="totalPage"
            :page-size="limit"
            :current-page="page"
            @current-change="handleCurrentChange"
            layout="total,prev,pager,next,jumper"
            ></el-pagination>
        </div>
  </el-tabs>
    </div>
</template>
<script>
    export default {
        name:'achieve-detail',
        props:['staff_id','start_time','end_time'],
    data() {
      return {
        activeName2: 'first',
        detailData: [],
        getShow: false,
        TableInfo: '',
        totalPage: 0,
        limit:5,
        page:1,
      };
    },
    watch:{
       staff_id(val){
           this.getListData();
       } 
    },
    methods: {
        getListData() {
        this.getShow = true;
        this.TableInfo = " ";
        let params={
            page:this.page,
            limit:this.limit,
            staff_ids:this.staff_id,
            start_time:this.start_time,
            end_time:this.end_time
        };
        this.$http.get(globalConfig.server + 'salary/achv/commission/', {
          params: params
        }).then(res => {
          if (res.status == 200) {
            if (res.data.code == 88800) {
              this.detailData = res.data.data.data;
              this.totalPage = res.data.data.count;
              this.getShow = false;
            } else {
              // this.$notify.warning({
              //   title: '警告',
              //   message: res.data.msg
              // });
              this.detailData = [];
              this.TableInfo = '暂无数据';
              this.getShow = false;
            }
          }
        }).catch(err => {
          console.log(err);
        })
      },
      handleClick(tab, event) {
        // console.log(tab, event);
      },
      handleCurrentChange(val) {
        this.page=val;
        this.getListData();
      },
    }
  };
</script>
<style scoped>

</style>
