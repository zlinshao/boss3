<template>
    <div>
      <!--

      <div class="content">
        <table class="tableDetail">
          <tr>
            <td>房东姓名</td>
            <td></td>
            <td>联系电话</td>
            <td></td>
            <td>合同开始时间</td>
            <td></td>
            <td>空置期开始时间</td>
            <td></td>
            <td>月单价</td>
            <td></td>
          </tr>
          <tr>
            <td>卫生情况</td>
            <td></td>
            <td>付款方式</td>
            <td></td>
            <td>证件类型</td>
            <td></td>
            <td>合同结束时间</td>
            <td></td>
            <td>空置期结束时间</td>
            <td></td>
          </tr>
          <tr>
            <td>签约时长</td>
            <td></td>
            <td>门卡数量</td>
            <td></td>
            <td>押金</td>
            <td></td>
            <td>证件号码</td>
            <td></td>
            <td>钥匙数</td>
            <td></td>
          </tr>
          <tr>
            <td>空置时长</td>
            <td></td>
            <td>合同性质</td>
            <td></td>
            <td>录入时间</td>
            <td></td>
            <td>水电底数</td>
            <td colspan="3"></td>
          </tr>
          <tr>
            <td>所属部门</td>
            <td></td>
            <td>开单人</td>
            <td></td>
            <td>负责人</td>
            <td></td>
            <td>操作人</td>
            <td colspan="3"></td>
          </tr>
        </table>
      </div>
      <div class="remarks">备注：</div>
      -->
      <el-table
        :data="rentData"
        :empty-text = 'emptyContent'
        v-loading="tableLoading"
        element-loading-text="拼命加载中"
        element-loading-spinner="el-icon-loading"
        element-loading-background="rgba(0, 0, 0, 0)"
        style="width: 100%">
        <el-table-column
          prop="name"
          label="房东姓名">
        </el-table-column>
        <el-table-column
          label="性别">
          <template slot-scope="scope">
            <span v-if="scope.row.sex == 1">男</span>
            <span v-else="">女</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="created_at"
          label="录入时间">
        </el-table-column>
        <el-table-column
          prop="idcard"
          label="证件号码">
        </el-table-column>
        <el-table-column
          prop="phone"
          label="手机号码">
        </el-table-column>
      </el-table>

      <!--<div class="pagination">-->
      <!--<el-pagination-->
      <!--@current-change="currentChange"-->
      <!--:current-page="params.pages"-->
      <!--:page-size="3"-->
      <!--layout="total, prev, pager, next, jumper"-->
      <!--:total="totalNumber">-->
      <!--</el-pagination>-->
      <!--</div>-->
    </div>
</template>

<script>
  export default {
    props:['rentContractId','activeName'],
    data () {
      return {
        /***********/
        rentData:[],
        isRequestData : false,
        emptyContent : '暂无数据',
        tableLoading : false,
      }
    },
    mounted(){
    },
    watch:{
      rentContractId(val){
        this.isRequestData = false;
        if(this.activeName === 'RentInfoTab'){
          this.getData();
          this.isRequestData = true;
        }
      },
      activeName(val){
        if(this.rentContractId && val === 'RentInfoTab'){
          this.getData();
          this.isRequestData = true;
        }else {
          this.rentData = [];
        }
      }
    },
    methods:{
      getData(){
        this.tableLoading = true;
        this.emptyContent = ' ';
        this.rentData = [];
        this.$http.get(globalConfig.server+'lease/detail/'+this.rentContractId +'?collect_or_rent=1').then((res) =>{
          this.tableLoading = false;
          if(res.data.code === '60010'){
            if(Array.isArray(res.data.data.customer)){
              this.rentData = res.data.data.customer;
            }else {
              this.rentData = [];
              this.emptyContent = '暂无数据';
            }
          }else {
            this.rentData = [];
            this.emptyContent = '暂无数据';
          }
        })
      },
      currentChange(val){
        this.params.page = val;
        this.getData();
      },
    }
  }
</script>


<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
  .content {
    min-height: 100px;
    .tableDetail {
      width: 100%;
      border-collapse: collapse;
      tr {
        td {
          border: 1px solid #ebeef5;
          padding: 8px 0;
          color: #606266;
          text-align: center;
          &:nth-child(odd) {
            width: 8%;
          }
          &:nth-child(even) {
            width: 12%;
          }
        }
      }
    }
  }
  .remarks {
    padding: 8px;
    border-top: 1px solid #efefef;
  }
</style>
