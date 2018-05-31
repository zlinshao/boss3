<template>
  <div>
    <el-table
      :data="tableData"
      @row-dblclick="dblClickRentTable"
      style="width: 100%">

      <el-table-column
        label="合同上传时间">
        <template slot-scope="scope">
          <span v-if="scope.row.created_at">{{scope.row.created_at}}</span>
          <span v-else="">/</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="contract_number"
        label="合同编号">
      </el-table-column>


      <el-table-column
        prop="mortgage_price"
        label="收房押金">
      </el-table-column>
      <el-table-column
        label="收房价格">
        <template slot-scope="scope">
          <el-popover
            ref="popover4"
            placement="bottom"
            width="300"
            trigger="click">
            <el-table :data="scope.row.month_price">
              <el-table-column width="150" property="price" label="价格(元)"></el-table-column>
              <el-table-column width="150" property="period" label="变化周期(月)"></el-table-column>
            </el-table>
          </el-popover>
          {{scope.row.month_price[0].price}}&nbsp;
          <el-button v-popover:popover4 size="mini" v-show="scope.row.month_price.length>1" type="text">变化</el-button>
        </template>
      </el-table-column>
      <el-table-column
        label="付款方式">
        <template slot-scope="scope">
          <!--{{scope.row.pay_way}}-->
          <el-popover
            ref="payWayRent"
            placement="bottom"
            width="300"
            trigger="click">
            <el-table :data="scope.row.pay_way">
              <el-table-column width="100" property="pay_way_bet" label="押"></el-table-column>
              <el-table-column width="100" property="pay_way" label="付"></el-table-column>
              <el-table-column width="100" property="period" label="变化周期(月)"></el-table-column>
            </el-table>
          </el-popover>
          押 {{scope.row.pay_way[0].pay_way_bet}} 付 {{scope.row.pay_way[0].pay_way}}&nbsp;
          <el-button size="mini" type="text" v-show="scope.row.pay_way.length>1" v-popover:payWayRent>变化</el-button>
        </template>
      </el-table-column>

      <el-table-column
        label="签约时长">
        <template slot-scope="scope">
          <span v-if="scope.row.duration_days">{{scope.row.duration_days}}</span>
        </template>
      </el-table-column>

      <el-table-column
        prop="start_at"
        width="180px"
        label="开始日期">
      </el-table-column>
      <el-table-column
        prop="end_at"
        width="180px"
        label="结束日期">
      </el-table-column>
      <el-table-column
        label="所属部门">
        <template slot-scope="scope">
          <span v-if="scope.row.sign_org">{{scope.row.sign_org.name}}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="签约人">
        <template slot-scope="scope">
          <span v-if="scope.row.sign_user">{{scope.row.sign_user.name}}</span>
        </template>
      </el-table-column>
    </el-table>

  </div>
</template>

<script>
  export default {
    props:['rentData','activeName','all_dic','collectId'],
    data () {
        return {
          tableData:[],
        }
    },
    watch:{
      activeName(val){
        if(val === 'fifth'){
          this.tableData = this.rentData;
        }
      },
      rentData(val){
        if(this.activeName === 'fifth'){
          this.tableData = val;
        }
      }
    },
    methods:{
      matchDictionary(id) {
        let dictionary_name = null;
        this.all_dic.map((item) => {
          if (item.id == id) {
            dictionary_name = item.dictionary_name;
          }
        });
        return dictionary_name;
      },
      dblClickRentTable(row, event){
        const {href} = this.$router.resolve({path: '/rentingDetail',query:{id:row.id,collectId:this.collectId}});
        window.open(href,'_blank','width=1920,height=1080');
      },
    }

  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .label {
    display: inline-block;
    width: 70px;
    height: 30px;
    line-height: 30px;
    text-align: center;
    border-radius: 4px;
    color: #ffffff;
  }
  .success {
    background: #409EFF;
  }
  .yellow {
    background: #FFCC00
  }
  .orange {
    background: #FF9900
  }
  .red {
    background: #FF3900
  }
  img{
    width: 120px;
    height: 120px;
    border-radius: 8px;
    margin: 10px;
  }
</style>
