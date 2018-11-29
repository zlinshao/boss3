<template>
    <div id="lordtraderdetail">
      <div class="highRanking" style=" float:right;z-index:65535;margin:7px 10px 0 0;">
      </div>
      <div style="text-align: right;margin-top: 15px;">
        <el-button size="mini" type="primary" @click="exportDetail">导出详情</el-button>
      </div>
        <el-tabs v-model="activeName2" @tab-click="handleClick">
        <el-tab-pane label="收房相关" name="first">
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
                    label="片区名称"
                    prop="sign_org.name"
                    ></el-table-column>
                    <el-table-column
                      label="收房人"
                      prop="staff_name"
                    ></el-table-column>
                    <el-table-column
                      label="原收房价"
                      prop="collect_price"
                    ></el-table-column>
                  <el-table-column
                    label="重新定义收房价"
                    prop="house.suggest_price"
                  ></el-table-column>
                  <el-table-column
                    label="收房年限"
                    prop="month"
                  ></el-table-column>
                  <el-table-column
                    label="收房空置期"
                    prop="vacancy"
                  ></el-table-column>
                  <el-table-column
                    label="收房中介费"
                    prop="medi_cost"
                  ></el-table-column>
                  <el-table-column
                    label="收房付款方式"
                    prop="pay_type"
                  ></el-table-column>
                  <el-table-column
                    label="收房实际业绩"
                    prop="achv_real"
                  ></el-table-column>
                  <el-table-column
                    label="收房溢出业绩"
                    prop="achv_overflow"
                  ></el-table-column>
                  <el-table-column
                    label="收房人绩效"
                    prop="amount_due"
                  ></el-table-column>
                </el-table>
            </div>
        </el-tab-pane>
        <el-tab-pane label="租房相关" name="second">
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
                        label="片区名称"
                        prop="sign_org.name"
                      ></el-table-column>
                  <el-table-column
                    label="房屋地址"
                    prop="address"
                  ></el-table-column>
                  <el-table-column
                    label="租房人"
                    prop="staff_name"
                  ></el-table-column>
                  <el-table-column
                    label="租房喜报时间"
                    prop="bulletin_date"
                  ></el-table-column>
                  <el-table-column
                    label="合同开始时间"
                    prop="rentContrct.start_at"
                  ></el-table-column>
                  <el-table-column
                    label="是否新租"
                    prop="is_doc_achv"
                  ></el-table-column>
                  <el-table-column
                    label="租房价格"
                    prop="rent_price"
                  ></el-table-column>
                  <el-table-column
                    label="租房付款方式"
                    prop="pay_type"
                  ></el-table-column>
                  <el-table-column
                    label="租房消耗空置期"
                    prop="vacancy"
                  ></el-table-column>
                  <el-table-column
                    label="租房中介费"
                    prop="medi_cost"
                  ></el-table-column>
                  <el-table-column
                    label="合同签约周期"
                    prop="month"
                  ></el-table-column>
                  <el-table-column
                    label="租房实际业绩"
                    prop="achv_real"
                  ></el-table-column>
                  <el-table-column
                  label="租房溢出业绩"
                  prop="achv_overflow"
                  ></el-table-column>
                  <el-table-column
                    label="租房人绩效"
                    prop="amount_due"
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
        name:'lordtrader-detail',
        props:['staff_id','date'],
    data() {
      return {
        activeName2: 'first',
        detailData: [],
        getShow: false,
        TableInfo: '',
        totalPage: 0,
        limit:5,
        page:1,
        category:1
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
            date:this.date,
            category:this.category
        };
        this.$http.get(globalConfig.server + 'salary/achv/getSalaryDetail/', {
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
        console.log(tab.name);
        if(tab.name=='first'){
            this.category=1;
        }else if(tab.name=='second'){
            this.category=2;
        }
        this.getListData();
      },
      handleCurrentChange(val) {
        this.page=val;
        this.getListData();
      },
      exportDetail(){
        if(!this.staff_id){
          this.$notify.warning({
            title: '警告',
            message: '请先选择员工!'
          });
          return false;
        }
        let url=globalConfig.server + 'salary/achv/commission/?export=1&staff_ids='+this.staff_id+'&start_time='+this.start_time+'&end_time='+this.end_time;
        window.location.href=url;
      }
    }
  };
</script>
<style scoped>

</style>
