<template>
  <div id="rentChange">
    <el-dialog title="租客换房" :visible.sync="rentChangeRoomDialogVisible" width="60%">
      <div class="scroll_bar">
        <div class="title">客户-信息</div>
        <div class="table_border" >
          <table class="tableDetail">
            <tr>
              <td>合同编号</td>
              <td></td>
              <td>地址</td>
              <td></td>
              <td>户型</td>
              <td></td>
              <td>姓名</td>
              <td></td>
              <td>电话</td>
              <td></td>
            </tr>
            <tr>
              <td>身份证</td>
              <td></td>
              <td>建筑面积</td>
              <td></td>
              <td>押金</td>
              <td></td>
              <td>月单价</td>
              <td></td>
              <td>合同期限</td>
              <td></td>
            </tr>
            <tr>
              <td>合同开始时间</td>
              <td></td>
              <td>合同结束时间</td>
              <td></td>
              <td>门禁卡</td>
              <td></td>
              <td>钥匙数</td>
              <td colspan="3"></td>
              <!--<td>证件号码</td>-->
              <!--<td></td>-->
            </tr>
            <tr>
              <td>水表底数</td>
              <td></td>
              <td>燃气表底数</td>
              <td></td>
              <td>电表底数</td>
              <td colspan="5"></td>
            </tr>
            <tr>
              <td>备注</td>
              <td colspan="9"></td>
            </tr>
          </table>
        </div>
        <div class="title">换房信息</div>
        <div class="form_border">
          <el-form size="mini" :model="params" label-width="100px">
            <el-row >
              <el-col :span="8">
                <el-form-item label="退房时间" required>
                  <el-date-picker type="date" v-model="params.check_time" placeholder="选择日期" style="width: 100%;"></el-date-picker>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="退房性质" required>
                  <el-select v-model="params.check_type" clearable="" placeholder="请选择退房性质" value="">
                    <el-option v-for="item in dictionary" :label="item.dictionary_name" :key="item.id" :value="item.id"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="所在区域" required>
                  <el-input v-model="params.department_id" placeholder="请输入内容"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="房屋地址" required>
                  <el-input v-model="params.address" placeholder="请输入内容"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="开单人" required>
                  <el-input v-model="params.biller_id" placeholder="请输入内容"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="负责人" required>
                  <el-input v-model="params.leader_id" placeholder="请输入内容"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </div>
        <el-row :gutter="20">
          <el-col :span="12">
            <div class="title">换房原因</div>
            <el-input type="textarea" resize="none" v-model="params.reason" placeholder="请输入内容"></el-input>
          </el-col>
          <el-col :span="12">
            <div class="title">维修赔偿详情</div>
            <el-input type="textarea" resize="none" v-model="params.compensation" placeholder="请输入内容"></el-input>
          </el-col>
        </el-row>

        <div class="title">上传照片</div>
        <div class="describe_border">
          <UpLoad :ID="'rentingVacationId'" :isClear="isClear" @getImg="getImg"></UpLoad>
        </div>



        <div class="title">应退还</div>
        <div class="form_border">
          <el-form size="mini" label-width="100px">
            <el-row >
              <el-col :span="6">
                <el-form-item label="退还押金">
                  <el-input v-model="params.refund_deposit" type="number" placeholder="请输入内容">换房</el-input>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="剩余房租">
                  <el-input v-model="params.residual_rent" type="number" placeholder="请输入内容">换房</el-input>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="收视费">
                  <el-input v-model="params.viewing_fee" type="number" placeholder="请输入内容"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="预存物管费">
                  <el-input v-model="params.property_management_fee" type="number" placeholder="请输入内容"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="预存水费">
                  <el-input v-model="params.water_fee" type="number" placeholder="请输入内容"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="预存电费">
                  <el-input v-model="params.electricity_fee"  type="number" placeholder="请输入内容"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="预存气费">
                  <el-input v-model="params.gas_fee" type="number" placeholder="请输入内容"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="应退还">
                  <el-input :disabled="true" v-model="reimbursementTotal" placeholder="请输入内容"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </div>

        <div class="title">应扣除源能费</div>
        <div class="form_border">
          <el-form size="mini" :model="params" label-width="80px">
            <el-row>
              <el-col :span="2" style="text-align: right">
                <el-form-item label="水费：" label-width="100px">
                </el-form-item>
              </el-col>
              <el-col :span="5">
                <el-form-item label="上次底数">
                  <el-input v-model="params.water_last"  placeholder="请输入内容"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="5">
                <el-form-item label="本次底数">
                  <el-input v-model="params.water_now" placeholder="请输入内容"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="4">
                <el-form-item label="单价">
                  <el-input v-model="params.water_unit_price" placeholder="请输入内容"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="4">
                <el-form-item label="滞纳金">
                  <el-input v-model="params.water_late_payment" placeholder="请输入内容"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="4">
                <el-form-item label="合计">
                  <el-input v-model="waterTotal" disabled="" placeholder="请输入内容"></el-input>
                </el-form-item>
              </el-col>
              <!--<el-col :span="2" style="text-align: right">-->
              <!--<el-button size="mini" type="primary">计 算</el-button>-->
              <!--</el-col>-->
            </el-row>
            <el-row>
              <el-col :span="2" style="text-align: right">
                <el-form-item label="电费（峰）：" label-width="100px">
                </el-form-item>
              </el-col>
              <el-col :span="5">
                <el-form-item label="上次底数">
                  <el-input v-model="params.electricity_peak_last" placeholder="请输入内容"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="5">
                <el-form-item label="本次底数">
                  <el-input v-model="params.electricity_peak_now" placeholder="请输入内容"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="4">
                <el-form-item label="单价">
                  <el-input v-model="params.electricity_peak_unit_price" placeholder="请输入内容"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="4">
                <el-form-item label="滞纳金">
                  <el-input v-model="params.electricity_peak_late_payment" placeholder="请输入内容"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="4">
                <el-form-item label="合计">
                  <el-input v-model="elePeakTotal" disabled="" placeholder="请输入内容"></el-input>
                </el-form-item>
              </el-col>
              <!--<el-col :span="2" style="text-align: right">-->
              <!--<el-button size="mini" type="primary">计 算</el-button>-->
              <!--</el-col>-->
            </el-row>

            <el-row>
              <el-col :span="2" style="text-align: right">
                <el-form-item label="电费（谷）：" label-width="100px">
                </el-form-item>
              </el-col>
              <el-col :span="5">
                <el-form-item label="上次底数">
                  <el-input v-model="params.electricity_valley_last" placeholder="请输入内容"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="5">
                <el-form-item label="本次底数">
                  <el-input v-model="params.electricity_valley_now" placeholder="请输入内容"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="4">
                <el-form-item label="单价">
                  <el-input v-model="params.electricity_valley_unit_price" placeholder="请输入内容"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="4">
                <el-form-item label="滞纳金">
                  <el-input v-model="params.electricity_valley_late_payment" placeholder="请输入内容"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="4">
                <el-form-item label="合计">
                  <el-input v-model="eleValTotal" disabled="" placeholder="请输入内容"></el-input>
                </el-form-item>
              </el-col>
              <!--<el-col :span="2" style="text-align: right">-->
              <!--<el-button size="mini" type="primary">计 算</el-button>-->
              <!--</el-col>-->
            </el-row>
            <el-row>
              <el-col :span="2" style="text-align: right">
                <el-form-item label="燃气费：" label-width="100px">
                </el-form-item>
              </el-col>
              <el-col :span="5">
                <el-form-item label="上次底数">
                  <el-input v-model="params.gas_last" placeholder="请输入内容"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="5">
                <el-form-item label="本次底数">
                  <el-input v-model="params.gas_now" placeholder="请输入内容"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="4">
                <el-form-item label="单价">
                  <el-input v-model="params.gas_unit_price" placeholder="请输入内容"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="4">
                <el-form-item label="滞纳金">
                  <el-input v-model="params.gas_late_payment" placeholder="请输入内容"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="4">
                <el-form-item label="合计">
                  <el-input v-model="gasTotal" disabled="" placeholder="请输入内容"></el-input>
                </el-form-item>
              </el-col>
              <!--<el-col :span="2" style="text-align: right">-->
              <!--<el-button size="mini" type="primary">计 算</el-button>-->
              <!--</el-col>-->
            </el-row>
            <el-row>
              <el-col :span="2" style="text-align: right">
                <el-form-item label="物管费：" label-width="100px">
                </el-form-item>
              </el-col>
              <el-col :span="10">
                <el-form-item label="上次交到">
                  <el-date-picker type="date" v-model="params.property_management_last" placeholder="选择日期"></el-date-picker>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="本次交到">
                  <el-date-picker type="date" v-model="params.property_management_now" placeholder="选择日期"></el-date-picker>
                </el-form-item>
              </el-col>

              <el-col :span="5" :offset="2">
                <el-form-item label="公摊水费">
                  <el-input v-model="params.property_management_electricity" placeholder="请输入内容"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="5">
                <el-form-item label="公摊电费">
                  <el-input v-model="params.property_management_water" placeholder="请输入内容"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="物业费">
                  <el-input v-model="params.property_management_total_fees" placeholder="请输入内容"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="4">
                <el-form-item label="合计">
                  <el-input v-model="managementTotal" disabled="" placeholder="请输入内容"></el-input>
                </el-form-item>
              </el-col>
              <!--<el-col :span="2" style="text-align: right">-->
              <!--<el-button size="mini" type="primary">计 算</el-button>-->
              <!--</el-col>-->
            </el-row>
          </el-form>
        </div>

        <div class="title">应扣其他费用</div>
        <div class="form_border">
          <el-form size="mini" :model="params" label-width="80px">
            <el-row >
              <el-col :span="6">
                <el-form-item label="违约金">
                  <el-input v-model="params.liquidated_damages" placeholder="请输入内容"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="垃圾费">
                  <el-input v-model="params.trash_fees" placeholder="请输入内容"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="清洁费">
                  <el-input v-model="params.cleaning_fees" placeholder="请输入内容"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="维修赔偿">
                  <el-input v-model="params.repair_compensation_fees" placeholder="请输入内容"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="其他费用">
                  <el-input v-model="params.other_fees" placeholder="请输入内容"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="超期房时">
                  <el-input v-model="params.overtime_rent" placeholder="请输入内容"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="超期房费">
                  <el-input v-model="params.TV_fees" placeholder="请输入内容"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="超期网费">
                  <el-input v-model="params.network_fees" placeholder="请输入内容"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </div>


        <div class="title">实际退还</div>
        <div class="describe_border">
          实际退还：{{realTotal}}
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button size="small" @click="rentChangeRoomDialogVisible = false">取 消</el-button>
        <el-button size="small" type="primary" @click="confirmAdd">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
  import UpLoad from '../../common/UPLOAD.vue'
  export default {
    props:['rentChangeRoomDialog','rentContractId'],
    components:{UpLoad},
    data() {
      return {
        rentChangeRoomDialogVisible:false,
        params: {
          contract_id : '',
          check_time : '',
          check_type : 333,
          department_id : "1",
          address : "1",
          biller_id : "103",
          leader_id : "103",
          reason : '',
          compensation : '',
          image_pic : [],

          refund_deposit : '',
          residual_rent : '',
          viewing_fee : '',
          property_management_fee : '',
          water_fee : '',
          electricity_fee : '',
          gas_fee : '',

          water_last : '',
          water_now : '',
          water_unit_price : '',
          water_late_payment : '',

          electricity_peak_last : '',
          electricity_peak_now : '',
          electricity_peak_unit_price : '',
          electricity_peak_late_payment : '',

          electricity_valley_last : '',
          electricity_valley_now : '',
          electricity_valley_unit_price : '',
          electricity_valley_late_payment : '',

          gas_last : '',
          gas_now : '',
          gas_unit_price : '',
          gas_late_payment : '',

          property_management_last : '',
          property_management_now : '',
          property_management_electricity : '',
          property_management_water : '',
          property_management_total_fees : '',

          liquidated_damages : '',
          trash_fees : '',
          cleaning_fees : '',
          repair_compensation_fees : '',
          other_fees : '',
          overtime_rent : '',
          TV_fees : '',
          network_fees : '',
        },
        tableData:[],
        value1:'',
        isClear : false,
        isDictionary:false,
        dictionary:[],
      };
    },
    computed:{
      reimbursementTotal(){
        return Number(this.params.refund_deposit)+Number(this.params.residual_rent)+Number(this.params.viewing_fee)
          +Number(this.params.property_management_fee)+
          Number(this.params.water_fee)+Number(this.params.electricity_fee)+Number(this.params.gas_fee);
      },
      waterTotal(){
        return (Number(this.params.water_now)-Number(this.params.water_last))*Number(this.params.water_unit_price)
          +Number(this.params.water_late_payment);
      },
      elePeakTotal(){
        return (Number(this.params.electricity_peak_now)-Number(this.params.electricity_peak_last))*Number(this.params.electricity_peak_unit_price)
          +Number(this.params.electricity_peak_late_payment);
      },
      eleValTotal(){
        return (Number(this.params.electricity_valley_now)-Number(this.params.electricity_valley_last))*Number(this.params.electricity_valley_unit_price)
          +Number(this.params.electricity_valley_late_payment);
      },
      gasTotal(){
        return (Number(this.params.gas_now)-Number(this.params.gas_last))*Number(this.params.gas_unit_price)
          +Number(this.params.gas_late_payment);
      },
      managementTotal(){
        return Number(this.params.property_management_electricity)+Number(this.params.property_management_water)
          +Number(this.params.property_management_total_fees);
      },
      otherTotal(){
        return Number(this.params.liquidated_damages)+Number(this.params.trash_fees)+Number(this.params.cleaning_fees)
          +Number(this.params.repair_compensation_fees)+Number(this.params.other_fees)+
          Number(this.params.overtime_rent)+Number(this.params.TV_fees)+Number(this.params.network_fees);
      },
      realTotal(){
        return Number(this.reimbursementTotal)-Number(this.waterTotal)-Number(this.elePeakTotal)-
          Number(this.eleValTotal)-Number(this.gasTotal)-Number(this.managementTotal)-Number(this.otherTotal)
      },
    },
    watch:{
      rentChangeRoomDialog(val){
        this.rentChangeRoomDialogVisible = val
      },
      rentChangeRoomDialogVisible(val){
        if(!val){
          this.$emit('close')
        }else {
          this.isClear = false;
          this.getData();
          if(!this.isDictionary){
            this.getDictionary();
          }
        }
      },
      rentContractId(val){
        this.params.contract_id = val;
      }
    },
    mounted(){

    },
    methods:{
      getData(){
        this.$http.get(globalConfig.server+'customer/check_out/1').then((res) => {
        })
      },
      getDictionary(){
        this.$http.get(globalConfig.server+'setting/dictionary/328').then((res) => {
          if(res.data.code === '30010'){
            this.dictionary=res.data.data;
            this.isDictionary = true;
          }
        })
      },
      //上传图片
      getImg(val){
        this.params.image_pic = val[1];
      },

      confirmAdd(){
//        this.rentChangeRoomDialogVisible = false;
        this.$http.post(globalConfig.server+'customer/check_out',this.params).then((res) => {
          if(res.data.code === '20010'){
            this.$notify.success({
              title:'成功',
              message:res.data.msg
            })
          }else {
            this.$notify.warning({
              title:'警告',
              message:res.data.msg
            })
          }
        })
      }
    }
  };
</script>
<style lang="scss" scoped="">
  #rentChange{
    .el-dialog__wrapper{
      .el-dialog{
        .el-dialog__body{
          padding: 15px;
          >div{
            padding-right: 10px;
            max-height: 580px;
            overflow-x: auto;
          }

          .table_border{
            .tableDetail {
              width: 100%;
              border-collapse: collapse;
              tr {
                td {
                  border: 1px solid #ebeef5;
                  padding: 2px 0;
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

          .form_border{
            .total{
              border-top: 1px solid #dfe6fb;
              padding: 5px;
              text-align: right;
            }
          }
        }
      }
    }
  }

</style>
