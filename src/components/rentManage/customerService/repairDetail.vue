<template>
  <div id="addFollowUp">
    <el-dialog :close-on-click-modal="false" title="回访详情" :visible.sync="repairDetailDialogVisible" width="600px">
        <el-form size="mini" :model="form" label-width="86px">
          <el-row>
            <el-col :span="10">
              <el-form-item label="创建时间" >
                <el-input v-model="repairDetail.create_time" readonly ></el-input>
              </el-form-item>
            </el-col> 
            <el-col :span="10" style="margin-left:8.33333%">
              <el-form-item label="回访人" >
                <el-input v-model="repairDetail.operator" readonly ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="2">
            </el-col>    
          </el-row>
          <el-row>
            <el-col :span="10">
              <el-form-item label="房屋地址" >
                <el-input v-model="repairDetail.address"  readonly></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="2">
              <el-checkbox style="margin-left: 20px;line-height: 28px;"></el-checkbox>
            </el-col>  
            <el-col :span="10">
              <el-form-item label="合同类型" >
                <el-input v-model="repairDetail.contract_type"  readonly></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="2">
            </el-col>  
            </el-row>
            <el-row>
            <el-col :span="10">
              <el-form-item label="合同周期">
                <el-input v-model="repairDetail.contract_month" readonly style="width:35%;float:left;">
                </el-input><span style="float:left;">月</span>
                <el-input v-model="repairDetail.contract_day" readonly style="width:35%;float:left;">
                </el-input><span style="float:left;">天</span>
              </el-form-item>
            </el-col>
            <el-col :span="2">
              <el-checkbox style="margin-left: 20px;line-height: 28px;"></el-checkbox>
            </el-col>  
            <el-col :span="10">
              <el-form-item label="来源">
                <el-input v-model="repairDetail.originate_name" readonly ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="2">
              <el-checkbox style="margin-left: 20px;line-height: 28px;"></el-checkbox>
            </el-col>  
          </el-row>
          <el-row v-if="repairDetail.originate === 623">
            <el-col :span="11">
              <el-form-item label="中介名称">
                <el-input v-model="repairDetail.agency"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="11">
              <el-form-item label="中间价格">
                <el-input v-model="repairDetail.agency_price"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row v-for="index in priceLen" :key="index" v-if="index>0">
            <el-col :span="12">
              <el-form-item label="月单价" >
                <el-input class="input" style="width:45%" v-model="repairDetail.unit_price[0][index-1][0]" readonly ></el-input> -
                <el-input class="input" style="width:45%" v-model="repairDetail.unit_price[0][index-1][1]" readonly ></el-input>
              </el-form-item>
            </el-col>         
            <el-col :span="10" >
              <el-form-item>
                <el-input v-model="repairDetail.unit_price[1][index-1]"  readonly ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="2">
              <el-checkbox style="margin-left: 20px;line-height: 28px;"></el-checkbox>
            </el-col>      
          </el-row>
          <el-row v-for="index in payForLen" :key="index+55" v-if="index>0">
            <el-col :span="12">
              <el-form-item label="付款方式">
                <el-input class="input" style="width:45%" v-model="repairDetail.pay_type[0][index-1][0]" readonly ></el-input> -
                <el-input class="input" style="width:45%" v-model="repairDetail.pay_type[0][index-1][1]" readonly ></el-input>
              </el-form-item>
            </el-col>            
            <el-col :span="10"  v-if=" activeName !='second'">
              <el-form-item>
                <el-input  v-model="repairDetail.pay_type[1][index-1]" readonly ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="10" v-if=" activeName =='second'">
                <el-form-item label="">
                  <span>押</span>
                  <el-input size="mini" style="width:46px;" v-model="repairDetail.pay_type[1][index-1]"></el-input>
                  <span>付</span>
                  <el-input size="mini" style="width:46px;" v-model="repairDetail.pay_type[2][index-1]"></el-input>
                </el-form-item>
            </el-col>
            <el-col :span="2" >
              <el-checkbox style="margin-left: 20px;line-height: 28px;"></el-checkbox>
            </el-col>   
          </el-row>
          <el-row v-if=" activeName == 'second'">
            <el-col :span="10">
              <el-form-item label="已付金额">
                <el-input v-model="repairDetail.has_pay" readonly ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="2" >
              <el-checkbox style="margin-left: 20px;line-height: 28px;"></el-checkbox>
            </el-col>   
          </el-row>
          <el-row  v-for="index in payTypeLen" v-if="activeName == 'second' && index>0" :key="index+111" >
            <el-col :span="10">
              <el-form-item label="支付方式" >
                  <el-input v-for="item in payTypeInfo" :key="item.id" v-model="item.dictionary_name" v-if="repairDetail.pay_method[0][index-1] == item.id"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="2" >
              <el-checkbox style="margin-left: 20px;line-height: 28px;"></el-checkbox>
            </el-col>                
            <el-col :span="10">
              <el-form-item label="金额">
                <el-input size="mini" v-model="repairDetail.pay_method[1][index-1]" readonly  ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="2" >
              <el-checkbox style="margin-left: 20px;line-height: 28px;"></el-checkbox>
            </el-col>               
          </el-row>
          <el-row>
            <el-col :span="10">
              <el-form-item label="是否收取其他费用" class="detailTitle">
                <el-input value="是" readonly ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="2" >
              <el-checkbox style="margin-left: 20px;line-height: 28px;"></el-checkbox>
            </el-col>   
            <el-col :span="10" >
              <el-form-item label="保修期">
                <el-input v-model="repairDetail.guarantee_month" style="width:35%;float:left;">
                </el-input><span style="float:left;">月</span>
                <el-input v-model="repairDetail.guarantee_day" style="width:35%;float:left;">
                </el-input><span style="float:left;">天</span>
              </el-form-item>
            </el-col>
            <el-col :span="2" >
              <el-checkbox style="margin-left: 20px;line-height: 28px;"></el-checkbox>
            </el-col>   
          </el-row>
          <el-row >
            <el-col :span="10">
              <el-form-item label="费用名称">
                <el-input value="吃喝" readonly></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="2" >
              <el-checkbox style="margin-left: 20px;line-height: 28px;"></el-checkbox>
            </el-col>  
            <el-col :span="10">
              <el-form-item label="价格">
                <el-input value="3000" readonly></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="2" >
              <el-checkbox style="margin-left: 20px;line-height: 28px;"></el-checkbox>
            </el-col>  
          </el-row>
          <el-row>
            <el-col :span="22">
              <el-form-item label="备注条款">
                <el-input v-model="repairDetail.remark_clause" readonly></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="2" >
              <el-checkbox style="margin-left: 20px;line-height: 28px;"></el-checkbox>
            </el-col>  
          </el-row>
          <el-row>
            <el-col :span="22">
              <el-form-item label="业务员态度" required="">
                <el-rate v-model="repairDetail.star" readonly></el-rate>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="22">
              <el-form-item label="业务员专业度" class="detailTitle2">
                <el-input type="textarea" v-model="repairDetail.sale_remark" readonly></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="2" >
              <el-checkbox style="margin-left: 20px;line-height: 28px;"></el-checkbox>
            </el-col>  
          </el-row>
          <el-row>
            <el-col :span="22">
              <el-form-item label="备注">
                <el-input v-model="repairDetail.remark" readonly></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="22">
              <el-form-item label="合同照片">
                <!-- <img v-if="workOrderDetail.album.image_pic!=[]" data-magnify :key="key"
                v-for="(val,key) in workOrderDetail.album.image_pic" :data-src="val[0].uri" :src="val[0].uri" alt=""> -->
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      <span slot="footer" class="dialog-footer">
        <!--<el-button size="small" @click="orderDetailDialogVisible = false">取 消</el-button>-->
        <!--<el-button size="small" type="primary" @click="confirmAdd">确 定</el-button>-->
      </span>
    </el-dialog>

  </div>
</template>

<script>
export default {
  name: "repair-detail",
  props: ["repairDetailDialog", "ToActiveName" ,'repairId'],
  components: {},
  data() {
    return {
      repairDetailDialogVisible: false,
      repairDetail: {},
      form: {
        id:"",
      },
      payTypeInfo:[],
      activeName: "",
      abc: 3,
      repairIdTo:"",
      priceLen:0,
      payForLen:0,
      payTypeLen:0,
      feedBackInfo:[],
    };
  },
  watch: {
    repairDetailDialog(val) {
      this.repairDetailDialogVisible = val;
    },
    repairDetailDialogVisible(val) {
      if (!val) {
        this.$emit("close");
      } else {
        this.getDetail();

      }
    },
    ToActiveName(val) {
      if (val) {
        this.activeName = val;
      }
    },
    repairId(val){
       this.$http
        .put(globalConfig.server + "contract/feedback/" + val)
        .then(res => {
          if (res.data.code === "1212200") {
            this.feedBackInfo = res.data.data;           
          } else {
            this.$notify.warning({
              title: "警告",
              message: res.data.msg
            });
          }
        }); 
      this.form.id= val;
    }
  },
  mounted() {
    
  },
  methods: {

    getDetail() {
        this.dictionary(629).then((res) => {  //支付方式
          this.payTypeInfo = res.data;
        });
      this.$http
        .get(globalConfig.server + "contract/feedback/info", {params:this.form})
        .then(res => {
          if (res.data.code === "1212200") {
            this.repairDetail = res.data.data;
            if(res.data.data.unit_price != ""){
              this.priceLen =  res.data.data.unit_price[0].length;
            }
            if(res.data.data.pay_type != ""){
              this.payForLen =  res.data.data.pay_type[0].length;
            }       
            if(res.data.data.pay_method != ""){
               this.payTypeLen =  res.data.data.pay_method[0].length;
            }
             
          } else {
            this.$notify.warning({
              title: "警告",
              message: res.data.msg
            });
          }
        });

    },


  }
};
</script>
<style lang="scss">
#addFollowUp {
  @mixin flex {
    display: flex;
    display: -webkit-flex;
  }
  .addicon {
    font-size: 20px;
    line-height: 28px;
    margin-left: 28px;
    cursor: pointer;
  }
  .detailTitle {
    label {
      width: 60px !important;
      margin-left: 20px;
      line-height: 15px;
      height: 30px;
      @include flex;
      align-items: center;
      justify-content: flex-end;
    }
  }
  .detailTitle2 {
    label {
      width: 54px !important;
      margin-left: 26px;
      line-height: 15px;
      height: 48px;
      @include flex;
      align-items: center;
      justify-content: flex-end;
    }
  }
  .input{
    input{
      padding: 0 10px !important;
    }
  }
}
</style>
