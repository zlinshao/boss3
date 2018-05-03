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
              <el-checkbox v-model="audited_fields.address" :disabled="audited_fieldsxx.address" style="margin-left: 20px;line-height: 28px;"></el-checkbox>
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
              <el-checkbox v-model="audited_fields.contract_month" :disabled="audited_fieldsxx.contract_month" style="margin-left: 20px;line-height: 28px;"></el-checkbox>
            </el-col>  
            <el-col :span="10">
              <el-form-item label="来源">
                <el-input v-model="repairDetail.originate_name" readonly ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="2">
              <el-checkbox v-model="audited_fields.originate_name" :disabled="audited_fieldsxx.originate_name" style="margin-left: 20px;line-height: 28px;"></el-checkbox>
            </el-col>  
          </el-row>
          <el-row v-if="repairDetail.originate === 623">
            <el-col :span="11">
              <el-form-item label="中介名称">
                <el-input v-model="repairDetail.agency" readonly></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="11">
              <el-form-item label="中间价格">
                <el-input v-model="repairDetail.agency_price" readonly></el-input>
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
              <el-checkbox v-model="audited_fields.unit_price[index-1]" :disabled="audited_fieldsxx.unit_price[index-1]" style="margin-left: 20px;line-height: 28px;"></el-checkbox>
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
                  <el-input size="mini" style="width:46px;" v-model="repairDetail.pay_type[1][index-1]" readonly></el-input>
                  <span>付</span>
                  <el-input size="mini" style="width:46px;" v-model="repairDetail.pay_type[2][index-1]" readonly></el-input>
                </el-form-item>
            </el-col>
            <el-col :span="2" >
              <el-checkbox v-model="audited_fields.pay_type[index-1]" :disabled="audited_fieldsxx.pay_type[index-1]" style="margin-left: 20px;line-height: 28px;"></el-checkbox>
            </el-col>   
          </el-row>
          <el-row v-if=" activeName == 'second'">
            <el-col :span="10">
              <el-form-item label="已付金额">
                <el-input v-model="repairDetail.has_pay" readonly ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="2" >
              <el-checkbox v-model="audited_fields.has_pay" :disabled="audited_fieldsxx.has_pay" style="margin-left: 20px;line-height: 28px;"></el-checkbox>
            </el-col>   
          </el-row>
          <el-row  v-for="index in payTypeLen" v-if="activeName == 'second' && index>0" :key="index+111" >
            <el-col :span="10">
              <el-form-item label="支付方式" >
                  <el-input v-for="item in payTypeInfo" :key="item.id" v-model="item.dictionary_name" readonly v-if="repairDetail.pay_method[0][index-1] == item.id"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="2" >
            </el-col>                
            <el-col :span="10" style="margin-left:8.3333%">
              <el-form-item label="金额">
                <el-input size="mini" v-model="repairDetail.pay_method[1][index-1]" readonly  ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="2" >
              <el-checkbox v-model="audited_fields.pay_method[index-1]" :disabled="audited_fieldsxx.pay_method[index-1]" style="margin-left: 20px;line-height: 28px;"></el-checkbox>
            </el-col>               
          </el-row>
          <el-row>
            <el-col :span="10">
              <el-form-item label="是否收取其他费用" class="detailTitle">
                <el-input v-model="repairDetail.has_extra" readonly ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="2" >
              <el-checkbox v-model="audited_fields.has_extra" :disabled="audited_fieldsxx.has_extra" style="margin-left: 20px;line-height: 28px;"></el-checkbox>
            </el-col>   
            <el-col :span="10" >
              <el-form-item label="保修期">
                <el-input v-model="repairDetail.guarantee_month" readonly style="width:35%;float:left;">
                </el-input><span style="float:left;">月</span>
                <el-input v-model="repairDetail.guarantee_day" readonly style="width:35%;float:left;">
                </el-input><span style="float:left;">天</span>
              </el-form-item>
            </el-col>
            <el-col :span="2" >
              <el-checkbox v-model="audited_fields.guarantee_month" :disabled="audited_fieldsxx.guarantee_month" style="margin-left: 20px;line-height: 28px;"></el-checkbox>
            </el-col>   
          </el-row>
          <el-row v-if="repairDetail.has_extra == '是' ">
            <el-col :span="10">
              <el-form-item label="费用名称">
                <el-input v-model="repairDetail.pay_use" readonly></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="2" >
              <el-checkbox v-model="audited_fields.pay_use" :disabled="audited_fieldsxx.pay_use" style="margin-left: 20px;line-height: 28px;"></el-checkbox>
            </el-col>  
            <el-col :span="10">
              <el-form-item label="价格">
                <el-input v-model="repairDetail.array" readonly></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="2" >
              <el-checkbox v-model="audited_fields.array" :disabled="audited_fieldsxx.array" style="margin-left: 20px;line-height: 28px;"></el-checkbox>
            </el-col>  
          </el-row>
          <el-row>
            <el-col :span="22">
              <el-form-item label="备注条款">
                <el-input v-model="repairDetail.remark_clause" readonly></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="2" >
              <el-checkbox v-model="audited_fields.remark_clause" :disabled="audited_fieldsxx.remark_clause" style="margin-left: 20px;line-height: 28px;"></el-checkbox>
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
              <el-checkbox v-model="audited_fields.sale_remark" :disabled="audited_fieldsxx.sale_remark" style="margin-left: 20px;line-height: 28px;"></el-checkbox>
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
                <img v-if="album!=[]" style="max-width:120px; max-height:80px;" data-magnify :key="val"
                v-for="val in album" :data-src="val" :src="val" alt="">
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button size="small" @click="repairDetailDialogVisible = false">取 消</el-button>
        <el-button size="small" type="primary" @click="confirmAdd">确 定</el-button>
      </span>
    </el-dialog>

  </div>
</template>

<script>
export default {
  name: "repair-detail",
  props: ["repairDetailDialog", "ToActiveName", "repairId", "photopic"],
  components: {},
  data() {
    return {
      repairDetailDialogVisible: false,
      repairDetail: {},
      form: {
        id: ""
      },
      payTypeInfo: [],
      activeName: "",
      abc: 3,
      repairIdTo: "",
      priceLen: 0,
      payForLen: 0,
      payTypeLen: 0,
      feedBackInfo: [],
      audited_fields: [],
      album: [],
      audited_fields: {
        address: "",
        contract_month: "",
        contract_day: "",
        originate_name: "",
        unit_price: [],
        pay_type: [],
        pay_method: [],
        has_extra: "",
        has_pay:"",
        pay_use: "",
        array: "",
        guarantee_month: "",
        guarantee_day: "",
        remark_clause: "",
        sale_remark: ""
      },
      audited_fieldsxx: {
        address: "",
        contract_month: "",
        contract_day: "",
        originate_name: "",
        unit_price: [],
        pay_type: [],
        pay_method: [],
        has_extra: "",
        has_pay:"",
        pay_use: "",
        array: "",
        guarantee_month: "",
        guarantee_day: "",
        remark_clause: "",
        sale_remark: ""
      }
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
        (this.audited_fields = {
          address: "",
          contract_month: "",
          contract_day: "",
          originate_name: "",
          unit_price: [],
          pay_type: [],
          pay_method: [],
          has_extra: "",
          pay_use: "",
          array: "",
          guarantee_month: "",
          guarantee_day: "",
          remark_clause: "",
          sale_remark: ""
        }),
          (this.audited_fieldsxx = {
            address: "",
            contract_month: "",
            contract_day: "",
            originate_name: "",
            unit_price: [],
            pay_type: [],
            pay_method: [],
            has_extra: "",
            pay_use: "",
            array: "",
            guarantee_month: "",
            guarantee_day: "",
            remark_clause: "",
            sale_remark: ""
          });
        this.getDetail();
      }
    },
    ToActiveName(val) {
      if (val) {
        this.activeName = val;
      }
    },
    repairId(val) {
      this.form.id = val;
    },
    photopic(val) {
      this.album = val;
    }
  },
  mounted() {},
  methods: {
    getDetail() {
      this.dictionary(629).then(res => {
        //支付方式
        this.payTypeInfo = res.data;
      });
      this.$http
        .get(globalConfig.server + "contract/feedback/info", {
          params: this.form
        })
        .then(res => {
          if (res.data.code === "1212200") {
            this.repairDetail = res.data.data;
            this.audited_fields.address = res.data.data.audited_fields.address == "1" ? true : false;
            this.audited_fields.contract_month = res.data.data.audited_fields.contract_month == "1" ? true : false;
            this.audited_fields.contract_day = res.data.data.audited_fields.contract_day == "1" ? true : false;
            this.audited_fields.originate_name = res.data.data.audited_fields.originate_name == "1" ? true : false;
            this.audited_fields.has_pay = res.data.data.audited_fields.has_pay == "1" ? true : false;
            if(res.data.data.audited_fields.unit_price !=[] && res.data.data.audited_fields != "" ){
              for(let i=0;i<res.data.data.audited_fields.unit_price.length;i++){
                this.audited_fields.unit_price[i]=res.data.data.audited_fields.unit_price[i]  == "1" ? true : false;
                this.audited_fieldsxx.unit_price[i]=res.data.data.audited_fields.unit_price[i]  == "1" ? true : false;
              }
            }
            if(res.data.data.audited_fields.pay_type !=[] && res.data.data.audited_fields != ""){
              for(let j=0;j<res.data.data.audited_fields.pay_type.length;j++){
                this.audited_fields.pay_type[j]=res.data.data.audited_fields.pay_type[j]  == "1" ? true : false;
                this.audited_fieldsxx.pay_type[j]=res.data.data.audited_fields.pay_type[j]  == "1" ? true : false;           
              }
            }

            if(res.data.data.audited_fields.pay_method !=[] && res.data.data.audited_fields != ""){
              for(let k=0;k<res.data.data.audited_fields.pay_method.length;k++){
                this.audited_fields.pay_method[k]=res.data.data.audited_fields.pay_method[k]  == "1" ? true : false;
                this.audited_fieldsxx.pay_method[k]=res.data.data.audited_fields.pay_method[k]  == "1" ? true : false;
              }
            }
            this.audited_fields.has_extra = res.data.data.audited_fields.has_extra == "1" ? true : false;
            this.audited_fields.pay_use = res.data.data.audited_fields.pay_use == "1" ? true : false;
            this.audited_fields.array = res.data.data.audited_fields.array == "1" ? true : false;
            this.audited_fields.guarantee_month = res.data.data.audited_fields.guarantee_month == "1"? true: false;
            this.audited_fields.guarantee_day = res.data.data.audited_fields.guarantee_day == "1" ? true : false;
            this.audited_fields.remark_clause = res.data.data.audited_fields.remark_clause == "1" ? true : false;
            this.audited_fields.sale_remark = res.data.data.audited_fields.sale_remark == "1" ? true : false;
            

            this.audited_fieldsxx.address = res.data.data.audited_fields.address == "1" ? true : false;
            this.audited_fieldsxx.contract_month = res.data.data.audited_fields.contract_month == "1" ? true : false;
            this.audited_fieldsxx.contract_day = res.data.data.audited_fields.contract_day == "1" ? true : false;
            this.audited_fieldsxx.originate_name =  res.data.data.audited_fields.originate_name == "1" ? true : false;
            this.audited_fieldsxx.has_extra = res.data.data.audited_fields.has_extra == "1" ? true : false;
            this.audited_fieldsxx.pay_use = res.data.data.audited_fields.pay_use == "1" ? true : false;
            this.audited_fieldsxx.array = res.data.data.audited_fields.array == "1" ? true : false;
            this.audited_fieldsxx.guarantee_month = res.data.data.audited_fields.guarantee_month == "1" ? true : false;
            this.audited_fieldsxx.guarantee_day = res.data.data.audited_fields.guarantee_day == "1" ? true : false;
            this.audited_fieldsxx.remark_clause = res.data.data.audited_fields.remark_clause == "1" ? true : false;
            this.audited_fieldsxx.sale_remark =  res.data.data.audited_fields.sale_remark == "1" ? true : false;
            this.audited_fieldsxx.has_pay = res.data.data.audited_fields.has_pay == "1" ? true : false;

            if (res.data.data.unit_price != "") {
              this.priceLen = res.data.data.unit_price[0].length;
            }
            if (res.data.data.pay_type != "") {
              this.payForLen = res.data.data.pay_type[0].length;
            }
            if (res.data.data.pay_method != "") {
              this.payTypeLen = res.data.data.pay_method[0].length;
            }
            if (this.repairDetail.has_extra == 1) {
              this.repairDetail.has_extra = "是";
            } else {
              this.repairDetail.has_extra = "否";
            }
          } else {
            this.$notify.warning({
              title: "警告",
              message: res.data.msg
            });
          }
        });
    },
    confirmAdd() {
      this.audited_fields.contract_day = this.audited_fields.contract_month;
      this.audited_fields.guarantee_day = this.audited_fields.guarantee_month;
      this.$http
        .put(globalConfig.server + "contract/feedback", {
          id: this.form.id,
          audited_fields: this.audited_fields
        })
        .then(res => {
          if (res.data.code === "1212200") {
            this.repairDetailDialogVisible = false;
            this.$notify.success({
              title: "成功",
              message: res.data.msg
            });
          } else {
            this.$notify.warning({
              title: "警告",
              message: res.data.msg
            });
          }
        });
    }
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
  .input {
    input {
      padding: 0 10px !important;
    }
  }
}
</style>
