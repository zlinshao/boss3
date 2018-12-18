<template>
  <div id="pendingDetail">
    <el-dialog :close-on-click-modal="false" title="详情" :visible.sync="dialogVisible" width="40%">
      <div
        style="width: 90%;"
        v-loading="fullLoading"
        element-loading-text="拼命加载中"
        element-loading-spinner="el-icon-loading"
        element-loading-background="rgba(255, 255, 255, 0)">
      </div>

      <div class="scroll_bar">
        <el-row>
          <el-col :span="12">
            <div class="contents" v-for="item in contentsleft">
              <div class="titles">{{item.label}} :</div>
              <div class="values">{{item.value}} </div>
            </div>
          </el-col>
          <el-col :span="12">
            <div class="contents" v-for="item in contentsright">
              <div class="titles">{{item.label}} :</div>
              <div class="values">{{item.value}}</div>
            </div>
          </el-col>
        </el-row>
      </div>

      <div slot="footer" class="dialog-footer">
        <el-button size="small" type="primary" @click="dialogVisible = false">关&nbsp;闭</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  export default {
    name: "pending-detail",
    props: ['module','detailData'],
    data() {
      return {
        dialogVisible: false,
        fullLoading: false,
        contentsleft:[],
        contentsright:[],
      }
    },
    mounted() {
    },
    activated() {
    },
    watch: {
      module(val) {
        this.dialogVisible = val;
      },
      dialogVisible(val) {
        if (!val) {
          this.$emit('close');
        }
      },
      detailData(val){
        this.renderData(val);
      }
    },
    methods: {
      renderData(data){
        console.log(data);
        let item_type,receive_pay;
        if(data.item_type===1){
          item_type='违约';
        }else if(data.item_type===2){
          item_type='转租';
        }else if(data.item_type===3){
          item_type='调租';
        }else if(data.item_type===4){
          item_type='退租';
        }else if(data.item_type===5){
          item_type='收房炸单';
        }else if(data.item_type===6){
            item_type='租房炸单';
        }
        if(data.receive_pay===1){
          receive_pay='收款';
        }else if(data.receive_pay===2){
          receive_pay='退款';
        }
        this.contentsleft=[
          {
          value:data.customer_name,
          label:'客户姓名'
        },{
          value:data.detailed_address,
          label:'房屋地址'
        },{
          value:item_type,
          label:'事项类型'
        },{
          value:receive_pay,
          label:'收退款类型'
        },{
          value:data.water_fee,
          label:'水费'
        },{
          value:data.elec_fee,
          label:'电费'
        },{
          value:data.gas_fee,
          label:'燃气费'
        },{
          value:data.property_fee,
          label:'物业费'
        },{
          value:data.net_fee,
          label:'网络费'
        },{
          value:data.sublet_fee,
          label:'转租费用'
        },{
          value:data.remark,
          label:'备注'
        },{
          value:data.start_date,
          label:'合同开始时间'
        },{
          value:data.end_date,
          label:'合同结束时间'
        }];
        this.contentsright=[
          {
          value:data.manage_fee,
          label:'管理费'
        },{
          value:data.check_fee,
          label:'物业校验'
        },{
          value:data.penalty_fee,
          label:'违约金'
        },{
          value:data.refund_should,
          label:'应退'
        },{
          value:data.refund_diff,
          label:'实际扣款'
        },{
          value:data.refund_real,
          label:'实际退款'
        },{
          value:data.account_type,
          label:'结算方式'
        },{
          value:data.account_num,
          label:'结算账户'
        },{
          value:data.staff_name,
          label:'签约人'
        },{
          value:data.department_name,
          label:'所属部门'
        },{
          value:'',
          label:'收款人'
        },{
          value:data.settle_date,
          label:'结算日期'
        }];
      }
      
    },
  }
</script>

<style lang="scss">
  #pendingDetail {
    @mixin border_($n) {
      -webkit-border-radius: $n;
      -moz-border-radius: $n;
      border-radius: $n;
    }
    @mixin flex {
      display: flex;
      display: -webkit-flex;
    }
    .contents {
      @include flex;
      align-items: center;
      margin-bottom: 12px;
      .titles {
        min-width: 100px;
        line-height: 30px;
        height: 30px;
        text-align: right;
        padding-right: 12px;
      }
      .values {
        // padding: 4px 20px;
        // background-color: #eef3fc;
        // @include border_(6px);
      }
    }
  }

</style>
