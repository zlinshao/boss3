<template>
  <div>
    <el-table
      :data="goodsChangeData"
      :empty-text = 'emptyContent'
      v-loading="tableLoading"
      element-loading-text="拼命加载中"
      element-loading-spinner="el-icon-loading"
      element-loading-background="rgba(0, 0, 0, 0)"
      style="width: 100%">
      <el-table-column
        prop="change_type"
        label="类型">
        <template slot-scope="scope">
          <span v-if="scope.row.change_type">{{scope.row.change_type}}</span>
          <span v-if="!scope.row.change_type">暂无</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="operate_time"
        label="操作时间">
        <template slot-scope="scope">
          <span v-if="scope.row.operate_time">{{scope.row.operate_time}}</span>
          <span v-if="!scope.row.operate_time">暂无</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="codes"
        show-overflow-tooltip
        label="物品编号">
      </el-table-column>
      <el-table-column
        prop="categories"
        show-overflow-tooltip
        label="物品名称">
      </el-table-column>
      <el-table-column
        prop="assets_count"
        label="物品数量">
        <template slot-scope="scope">
          <span v-if="scope.row.assets_count">{{scope.row.assets_count}}</span>
          <span v-if="!scope.row.assets_count">暂无</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="assets_sum"
        label="单价/总计（元）">
        <template slot-scope="scope">
          <span v-if="scope.row.assets_sum">{{scope.row.assets_sum}}</span>
          <span v-if="!scope.row.assets_sum">暂无</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="extra"
        label="物品来源/去向">
        <template slot-scope="scope">
          <span v-if="scope.row.extra">{{scope.row.extra}}</span>
          <span v-if="!scope.row.extra">暂无</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="house"
        label="搬出/搬入地址">
        <template slot-scope="scope">
          <span v-if="scope.row.house">{{scope.row.house}}</span>
          <span v-if="!scope.row.house">暂无</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="origin_dest"
        label="原物品去向">
        <template slot-scope="scope">
          <span v-if="scope.row.origin_dest">{{scope.row.origin_dest}}</span>
          <span v-if="!scope.row.origin_dest">暂无</span>
        </template>
      </el-table-column>
    </el-table>
    <div class="pagination">
      <el-pagination
        @current-change="currentChange"
        :current-page="params.page"
        :page-size="3"
        layout="total, prev, pager, next, jumper"
        :total="total">
      </el-pagination>
    </div>
  </div>
</template>

<script>
    export default {
      props:['collectHouseId','activeName','tabStatusChange'],
      data () {
          return {
            goodsChangeData:[], //物品增减
            goodsChangeLength:'', //物品增减总数
            urls:globalConfig.server,
            total:0,      //物品增减总条数
            params:{
              house_id:'',
              page:1,
              limit:3,
            },
            isRequestData : false,
            emptyContent : '暂无数据',
            tableLoading : false,
          }
      },
      created() {
//        this.getData();
      },

      watch:{
        collectHouseId(val){
          this.params.house_id = val;
          this.isRequestData = false;
          if(this.activeName === 'GoodsChangeTab'){
            this.getData();
            this.isRequestData = true;
          }
        },
        activeName(val){
          if(val=== 'GoodsChangeTab' && this.collectHouseId){
            this.getData();
            this.isRequestData = true;
          }
        },
        tabStatusChange(val){
          if(val=== 'GoodsChangeTab'){
            this.getData();
          }
        }
      },

      methods:{
        currentChange(val) {
          this.params.page = val;
          this.getData();
        } ,
        getData(){
          this.tableLoading = true;
          this.emptyContent = ' ';
          this.goodsChangeData=[];
          this.total=0;
          this.$http.get(this.urls+'house/asset_change', { params: this.params, }).then((res) => {
            this.tableLoading = false;
            if (res.data.code === '20000') {
              this.goodsChangeData=res.data.data.data;
              for(let i=0;i<this.params.limit;i++){
                if(this.goodsChangeData[i].change_type === 'app\\house\\model\\AssetIn'){
                  this.goodsChangeData[i].change_type='增进'
                } else{
                  this.goodsChangeData[i].change_type='搬出'
                }
                this.goodsChangeData[i].codes = this.goodsChangeData[i].codes+";";
                this.goodsChangeData[i].categories = this.goodsChangeData[i].categories+";"
              }
              this.total=res.data.data.count;
            }
            else{
              this.goodsChangeData=[];
              this.total=0;
              this.emptyContent = '暂无数据';
            }
          })
        }
      },
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
