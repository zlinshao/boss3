<template>
  <div id="rentVacation">
    <el-dialog :close-on-click-modal="false" title="房东退房" :visible.sync="collectVacationDialogVisible" width="60%">
      <div class="scroll_bar">
        <div class="title">客户-信息</div>
        <div class="table_border">
          <table class="tableDetail">
            <tr>
              <td>合同编号</td>
              <td>{{collectContractInfo.contract_number}}</td>
              <td>地址</td>
              <td>{{collectContractInfo.address}}</td>
              <td>电话</td>
              <td>{{collectContractInfo.phone}}</td>
            </tr>
            <tr>
              <td>中介费</td>
              <td>{{collectContractInfo.agency}}</td>
              <td>押金</td>
              <td>{{collectContractInfo.deposit}}</td>
              <td>合同期限</td>
              <td>{{collectContractInfo.duration}}</td>
            </tr>
            <tr>
              <td>合同开始时间</td>
              <td>{{collectContractInfo.begin_date}}</td>
              <td>合同结束时间</td>
              <td>{{collectContractInfo.end_date}}</td>
              <td></td>
              <td></td>
            </tr>
          </table>
        </div>
        <div class="title">退房信息</div>
        <div class="form_border">
          <el-form size="mini" :model="params" label-width="100px">
            <el-row>
              <el-col :span="8">
                <el-form-item label="退房时间" required>
                  <el-date-picker type="date" value-format="yyyy-MM-dd" v-model="params.check_time"
                                  placeholder="选择日期" style="width: 100%;"></el-date-picker>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="退房性质" required>
                  <el-select v-model="params.check_type" @change="clearFee" clearable="" placeholder="请选择退房性质" value="">
                    <el-option v-for="item in dictionary" :label="item.dictionary_name" :key="item.id"
                               :value="item.id"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="8" v-if="params.check_type == 331">
                <el-form-item label="违约盈利" required>
                  <el-input placeholder="请输入内容" v-model="params.profit"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8" v-if="params.check_type == 333 || params.check_type == 582">
                <el-form-item label="转租费" required>
                  <el-input placeholder="请输入内容" v-model="params.sublease_fee"></el-input>
                </el-form-item>
              </el-col>

              <el-col :span="8">
                <el-form-item label="姓名" required>
                  <el-input placeholder="请输入内容" v-model="params.account_name"></el-input>
                </el-form-item>
              </el-col>
            </el-row>

            <el-row>
              <el-col :span="8">
                <el-form-item label="退款账号" required>
                  <el-input placeholder="请输入内容" @blur="getBank" v-model="params.bank_num"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="开户行" required>
                  <el-input placeholder="请输入内容" v-model="params.account_bank"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="支行" required>
                  <el-input placeholder="请输入内容" v-model="params.branch_bank"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </div>
        <el-row :gutter="20">
          <el-col :span="12">
            <div class="title">退房原因</div>
            <el-input type="textarea" resize="none" v-model="params.reason" placeholder="请输入内容"></el-input>
          </el-col>
          <el-col :span="12">
            <div class="title">维修赔偿详情</div>
            <el-input type="textarea" resize="none" v-model="params.compensation" placeholder="请输入内容"></el-input>
          </el-col>
        </el-row>
        <!--<el-row style="margin-top: 15px;">-->
          <!--<div class="title">财务收款</div>-->
          <!--<div class="describe_border">-->
            <!--<el-form size="mini" :model="params" label-width="60px">-->
              <!--<el-row v-for="(item,index) in financialReceiptsLength" :key="index">-->
                <!--<el-col :span="5">-->
                  <!--<el-form-item label="应收">-->
                    <!--<el-input placeholder="请输入内容" v-model="params.financialReceipts[index].receivable"-->
                              <!--@change="financialChange(index)" clearable></el-input>-->
                  <!--</el-form-item>-->
                <!--</el-col>-->
                <!--<el-col :span="5">-->
                  <!--<el-form-item label="实收">-->
                    <!--<el-input placeholder="请输入内容" v-model="params.financialReceipts[index].actual_receipt"-->
                              <!--@change="financialChange(index)" clearable></el-input>-->
                  <!--</el-form-item>-->
                <!--</el-col>-->
                <!--<el-col :span="5">-->
                  <!--<el-form-item label="差额">-->
                    <!--<el-input placeholder="请输入内容" v-model="params.financialReceipts[index].difference"-->
                              <!--clearable></el-input>-->
                  <!--</el-form-item>-->
                <!--</el-col>-->
                <!--<el-col :span="8">-->
                  <!--<el-form-item label="备注">-->
                    <!--<el-input type="textarea" :rows="1" placeholder="请输入内容"-->
                              <!--v-model="params.financialReceipts[index].remark" clearable></el-input>-->
                  <!--</el-form-item>-->
                <!--</el-col>-->
                <!--<el-col :span="1" v-show="index!=0">-->
                  <!--<i class="el-icon-remove-outline sub_com" @click="subData('financial', index)"></i>-->
                <!--</el-col>-->
              <!--</el-row>-->
              <!--<div style="text-align: center">-->
                <!--<el-button type="text" @click="addData('financial')">-->
                  <!--<i class="el-icon-circle-plus"></i>添加财务收款变化条目-->
                <!--</el-button>-->
              <!--</div>-->
            <!--</el-form>-->
          <!--</div>-->
        <!--</el-row>-->
        <!--<el-row>-->
          <!--<div class="title">合同收款</div>-->
          <!--<div class="describe_border">-->
            <!--<el-form size="mini" :model="params" label-width="60px">-->
              <!--<el-row v-for="(item, index) in contractCollectionLength" :key="index">-->
                <!--<el-col :span="5">-->
                  <!--<el-form-item label="应收">-->
                    <!--<el-input placeholder="请输入内容" v-model="params.contractCollection[index].receivable"-->
                              <!--clearable></el-input>-->
                  <!--</el-form-item>-->
                <!--</el-col>-->
                <!--<el-col :span="8">-->
                  <!--<el-form-item label="备注">-->
                    <!--<el-input type="textarea" :rows="1" placeholder="请输入内容"-->
                              <!--v-model="params.contractCollection[index].remark"-->
                              <!--clearable></el-input>-->
                  <!--</el-form-item>-->
                <!--</el-col>-->
                <!--<el-col :span="1" v-show="index!=0">-->
                  <!--<i class="el-icon-remove-outline  sub_com" @click="subData('contract', index)"></i>-->
                <!--</el-col>-->
              <!--</el-row>-->
              <!--<div style="text-align: center">-->
                <!--<el-button type="text" @click="addData('contract')">-->
                  <!--<i class="el-icon-circle-plus"></i>添加合同收款变化条目-->
                <!--</el-button>-->
              <!--</div>-->
            <!--</el-form>-->
          <!--</div>-->
        <!--</el-row>-->
        <div class="title">上传照片</div>
        <div class="describe_border">
          <UpLoad :ID="'collectVacationId'" :editImage="editImage" :isClear="isClear" @getImg="getImg"></UpLoad>
        </div>
        <div class="title">应退还</div>
        <div class="form_border">
          <el-form size="mini" label-width="100px">
            <el-row>
              <el-col :span="6">
                <el-form-item label="退还押金">
                  <el-input v-model="params.refund_deposit" type="number" placeholder="请输入内容"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="剩余房租">
                  <el-input v-model="params.residual_rent" type="number" placeholder="请输入内容"></el-input>
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
                  <el-input v-model="params.electricity_fee" type="number" placeholder="请输入内容"></el-input>
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
              <el-col :span="4">
                <el-form-item label="上次底数">
                  <el-input v-model="params.water_last" placeholder="请输入内容"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="4">
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
                <el-form-item label="其他">
                  <el-input v-model="params.water_other" placeholder="请输入内容"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="2">
                <div class="content">
                  合计：{{waterTotal}}
                </div>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="2" style="text-align: right">
                <el-form-item label="电费（峰）：" label-width="100px">
                </el-form-item>
              </el-col>
              <el-col :span="4">
                <el-form-item label="上次底数">
                  <el-input v-model="params.electricity_peak_last" placeholder="请输入内容"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="4">
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
                <el-form-item label="其他">
                  <el-input v-model="params.electricity_peak_other" placeholder="请输入内容"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="2">
                <div class="content">
                  合计：{{elePeakTotal}}
                </div>
              </el-col>
            </el-row>

            <el-row>
              <el-col :span="2" style="text-align: right">
                <el-form-item label="电费（谷）：" label-width="100px">
                </el-form-item>
              </el-col>
              <el-col :span="4">
                <el-form-item label="上次底数">
                  <el-input v-model="params.electricity_valley_last" placeholder="请输入内容"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="4">
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
                <el-form-item label="其他">
                  <el-input v-model="params.electricity_valley_other" placeholder="请输入内容"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="2">
                <div class="content">
                  合计：{{eleValTotal}}
                </div>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="2" style="text-align: right">
                <el-form-item label="燃气费：" label-width="100px">
                </el-form-item>
              </el-col>
              <el-col :span="4">
                <el-form-item label="上次底数">
                  <el-input v-model="params.gas_last" placeholder="请输入内容"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="4">
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
                <el-form-item label="其他">
                  <el-input v-model="params.gas_other" placeholder="请输入内容"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="2">
                <div class="content">
                  合计：{{gasTotal}}
                </div>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="2" style="text-align: right">
                <el-form-item label="物管费：" label-width="100px">
                </el-form-item>
              </el-col>
              <el-col :span="10">
                <el-form-item label="上次交到">
                  <el-date-picker type="date" v-model="params.property_management_last"
                                  placeholder="选择日期"></el-date-picker>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="本次交到">
                  <el-date-picker type="date" v-model="params.property_management_now"
                                  placeholder="选择日期"></el-date-picker>
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
              <el-col :span="5">
                <el-form-item label="物业费">
                  <el-input v-model="params.property_management_total_fees" placeholder="请输入内容"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="5">
                <el-form-item label="其他">
                  <el-input v-model="params.property_management_other" placeholder="请输入内容"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="2">
                <div class="content">
                  合计：{{managementTotal}}
                </div>
              </el-col>
            </el-row>
          </el-form>
        </div>

        <div class="title">应扣其他费用</div>
        <div class="form_border">
          <el-form size="mini" :model="params" label-width="80px">
            <el-row>
              <!--<el-col :span="6">-->
              <!--<el-form-item label="违约金">-->
              <!--<el-input v-model="params.liquidated_damages" placeholder="请输入内容"></el-input>-->
              <!--</el-form-item>-->
              <!--</el-col>-->
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
        <el-button size="small" @click="collectVacationDialogVisible = false">取 消</el-button>
        <el-button size="small" type="primary" @click="confirmAdd(0)">草 稿</el-button>
        <el-button size="small" type="primary" @click="confirmAdd(1)">发 布</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
  import UpLoad from '../../common/UPLOAD.vue'

  export default {
    props: ['collectVacationDialog', 'collectContractId', 'collectInfo'],
    components: {UpLoad},
    data() {
      return {
        financialReceiptsLength: 1, //财务收款
        contractCollectionLength: 1,  //合同收款
        collectVacationDialogVisible: false,
        params: {
          financialReceipts: [
            {
              receivable: '', //应收
              actual_receipt: '', //实收
              difference: '', //差额
              remark: '',
            },
          ],
          contractCollection: [
            {
              receivable: '', //应收
              remark: '',
            },
          ],
          status_type: '',
          contract_id: '',
          module: '1',
          check_time: '',
          check_type: '',
          profit: '',
          sublease_fee: '',
          bank_num: '',
          account_bank: '',
          branch_bank: '',
          account_name: '',
          reason: '',
          compensation: '',
          image_pic: [],

          refund_deposit: '',
          residual_rent: '',
          viewing_fee: '',
          property_management_fee: '',
          water_fee: '',
          electricity_fee: '',
          gas_fee: '',

          water_last: '',
          water_now: '',
          water_unit_price: '',
          water_late_payment: '',
          water_other: '',

          electricity_peak_last: '',
          electricity_peak_now: '',
          electricity_peak_unit_price: '',
          electricity_peak_late_payment: '',
          electricity_peak_other: '',

          electricity_valley_last: '',
          electricity_valley_now: '',
          electricity_valley_unit_price: '',
          electricity_valley_late_payment: '',
          electricity_valley_other: '',

          gas_last: '',
          gas_now: '',
          gas_unit_price: '',
          gas_late_payment: '',
          gas_other: '',

          property_management_last: '',
          property_management_now: '',
          property_management_electricity: '',
          property_management_water: '',
          property_management_total_fees: '',
          property_management_other: '',

          liquidated_damages: '',
          trash_fees: '',
          cleaning_fees: '',
          repair_compensation_fees: '',
          other_fees: '',
          overtime_rent: '',
          TV_fees: '',
          network_fees: '',
        },
        isClear: false,
        isDictionary: false,
        dictionary: [],
        collectContractInfo: {},
        editImage: {},
      };
    },
    computed: {
      reimbursementTotal() {
        return Number(this.params.refund_deposit) + Number(this.params.residual_rent) + Number(this.params.viewing_fee)
          + Number(this.params.property_management_fee) +
          Number(this.params.water_fee) + Number(this.params.electricity_fee) + Number(this.params.gas_fee);
      },
      waterTotal() {
        return (Number(this.params.water_now) - Number(this.params.water_last)) * Number(this.params.water_unit_price)
          + Number(this.params.water_late_payment) + Number(this.params.water_other);
      },
      elePeakTotal() {
        return (Number(this.params.electricity_peak_now) - Number(this.params.electricity_peak_last)) * Number(this.params.electricity_peak_unit_price)
          + Number(this.params.electricity_peak_late_payment) + Number(this.params.electricity_peak_other);
      },
      eleValTotal() {
        return (Number(this.params.electricity_valley_now) - Number(this.params.electricity_valley_last)) * Number(this.params.electricity_valley_unit_price)
          + Number(this.params.electricity_valley_late_payment) + Number(this.params.electricity_valley_other);
      },
      gasTotal() {
        return (Number(this.params.gas_now) - Number(this.params.gas_last)) * Number(this.params.gas_unit_price)
          + Number(this.params.gas_late_payment) + Number(this.params.gas_other);
      },
      managementTotal() {
        return Number(this.params.property_management_electricity) + Number(this.params.property_management_water)
          + Number(this.params.property_management_total_fees) + Number(this.params.property_management_other);
      },
      otherTotal() {
        return Number(this.params.trash_fees) + Number(this.params.cleaning_fees) + Number(this.params.repair_compensation_fees)
          + Number(this.params.other_fees) + Number(this.params.overtime_rent) +
          Number(this.params.TV_fees) + Number(this.params.network_fees);
      },
      realTotal() {
        return Number(this.reimbursementTotal) - Number(this.waterTotal) - Number(this.elePeakTotal) -
          Number(this.eleValTotal) - Number(this.gasTotal) - Number(this.managementTotal) - Number(this.otherTotal)
          - Number(this.params.sublease_fee) - Number(this.params.profit);
      },
    },
    watch: {
      collectVacationDialog(val) {
        this.collectVacationDialogVisible = val
      },
      collectVacationDialogVisible(val) {
        if (!val) {
          this.$emit('close');
          this.initData();
        } else {
          this.isClear = false;
          this.getContractData();
          this.getCheckOutData();
          if (!this.isDictionary) {
            this.getDictionary();
          }
        }
      },
      collectContractId(val) {
        this.params.contract_id = val;
      },
      collectInfo(val) {
        this.collectContractInfo = val;
      },
    },
    mounted() {

    },
    methods: {
      financialChange(key) {
        this.params.financialReceipts[key].difference = this.params.financialReceipts[key].receivable - this.params.financialReceipts[key].actual_receipt;
      },
      subData(type, key) {
        if (type === 'financial') {
          this.financialReceiptsLength--;
          this.params.financialReceipts.splice(key, 1);
        } else if (type === 'contract') {
          this.contractCollectionLength--;
          this.params.contractCollection.splice(key, 1);
        }
      },
      addData(type) {
        if (type === 'financial') {
          let data = {
            receivable: '', //应收
            actual_receipt: '', //实收
            difference: '', //差额
            remark: '',
          };
          this.financialReceiptsLength++;
          this.params.financialReceipts.push(data);
        } else if (type === 'contract') {
          let data1 = {
            receivable: '', //应收
            remark: '',
          };
          this.contractCollectionLength++;
          this.params.contractCollection.push(data1);
        }
      },
      getDictionary() {
        this.$http.get(globalConfig.server + 'setting/dictionary/328').then((res) => {
          if (res.data.code === '30010') {
            this.dictionary = res.data.data;
            this.isDictionary = true;
          }
        })
      },
      getBank() {
        this.$http.get(globalConfig.server + 'manager/staff/info?bank_num=' + this.params.bank_num).then((res) => {
          if (res.data.code === '10050') {
            this.params.account_bank = res.data.data.bankname;
          }
        })
      },
      getCheckOutData() {
        this.$http.get(globalConfig.server + 'customer/check_out/data', {
          params: {
            id: this.collectContractId,
            module: 1
          }
        }).then((res) => {
          if (res.data.code === '20090') {
            let data = res.data.data.old_data;
            this.params.check_time = data.checkout_date;
            this.params.check_type = data.check_type;
            let editImage = {};
            this.editImage = {};
            if (data.checkout_photo && data.checkout_photo.pic_addresses.length > 0) {
              this.params.image_pic = data.checkout_photo.pic_ids;
              data.checkout_photo.pic_addresses.forEach((item) => {
                editImage[item.id] = item.uri;
              });
              this.editImage = editImage;
              console.log(this.editImage)
            }
          }
        })
      },
//      退房性质变化
      clearFee() {
        this.params.profit = '';
        this.params.sublease_fee = '';
      },
      //上传图片
      getImg(val) {
        this.params.image_pic = val[1];
      },
      getContractData() {

      },
      confirmAdd(flag) {
        this.params.status_type = flag ? 'audited' : '';
        this.$http.post(globalConfig.server + 'customer/check_out', this.params).then((res) => {
          if (res.data.code === '20010') {
            this.$notify.success({
              title: '成功',
              message: res.data.msg
            });
            this.collectVacationDialogVisible = false;
            this.$emit('close', 'updateCollect');
          } else {
            this.$notify.warning({
              title: '警告',
              message: res.data.msg
            })
          }
        })
      },
      initData() {
        this.params = {
          financialReceipts: [
            {
              receivable: '', //应收
              actual_receipt: '', //实收
              difference: '', //差额
              remark: '',
            },
          ],
          contractCollection: [
            {
              receivable: '', //应收
              remark: '',
            },
          ],
          contract_id: this.collectContractId,
          module: '1',
          status_type: '',

          check_time: '',
          check_type: '',
          profit: '',
          sublease_fee: '',
          bank_num: '',
          account_bank: '',
          branch_bank: '',
          account_name: '',
          reason: '',
          compensation: '',
          image_pic: [],

          refund_deposit: '',
          residual_rent: '',
          viewing_fee: '',
          property_management_fee: '',
          water_fee: '',
          electricity_fee: '',
          gas_fee: '',

          water_last: '',
          water_now: '',
          water_unit_price: '',
          water_late_payment: '',
          water_other: '',

          electricity_peak_last: '',
          electricity_peak_now: '',
          electricity_peak_unit_price: '',
          electricity_peak_late_payment: '',
          electricity_peak_other: '',

          electricity_valley_last: '',
          electricity_valley_now: '',
          electricity_valley_unit_price: '',
          electricity_valley_late_payment: '',
          electricity_valley_other: '',

          gas_last: '',
          gas_now: '',
          gas_unit_price: '',
          gas_late_payment: '',
          gas_other: '',

          property_management_last: '',
          property_management_now: '',
          property_management_electricity: '',
          property_management_water: '',
          property_management_total_fees: '',
          property_management_other: '',

          liquidated_damages: '',
          trash_fees: '',
          cleaning_fees: '',
          repair_compensation_fees: '',
          other_fees: '',
          overtime_rent: '',
          TV_fees: '',
          network_fees: '',
        };
        this.isClear = false;
      },
    }
  };
</script>
<style lang="scss" scoped="">
  #rentVacation {
    .sub_com {
      color: #409eff;
      font-size: 18px;
      vertical-align: middle;
      margin-left: 10px;
      cursor: pointer;
    }
    .el-dialog__wrapper {
      .el-dialog {
        .el-dialog__body {
          padding: 15px;
          > div {
            padding-right: 10px;
            max-height: 580px;
            overflow-x: auto;
          }

          .table_border {
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

          .form_border {
            .total {
              border-top: 1px solid #dfe6fb;
              padding: 5px;
              text-align: right;
            }
          }
        }
      }
    }
    .content {
      padding: 0 5px;
      min-height: 30px;
      background: #f5f7fa;
      border-radius: 4px;
      font-size: 12px;
      text-align: center;
      line-height: 30px;
      color: #727479;
      margin-left: 15px;
    }
  }

</style>
