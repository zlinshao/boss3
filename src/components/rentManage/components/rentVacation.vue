<template>
  <div id="rentVacation">
    <el-dialog :close-on-click-modal="false" title="租客退房" :visible.sync="rentVacationDialogVisible" width="60%">
      <div class="scroll_bar">
        <div class="title">客户-信息</div>
        <div class="table_border">
          <table class="tableDetail">
            <tr>
              <td>合同编号</td>
              <td>{{contractInfo.contract_number}}</td>
              <td>地址</td>
              <td>{{contractInfo.community_name}}{{contractInfo.doorplate_str}}</td>
              <td>签约人</td>
              <td>{{contractInfo.staff_name}}</td>
            </tr>
            <tr>
              <td>姓名</td>
              <td>
                <span v-if="contractInfo.customers&&contractInfo.customers.length>0">
                  {{contractInfo.customers[0].name}}
                </span>
              </td>
              <td>电话</td>
              <td>
                <span v-if="contractInfo.customers&&contractInfo.customers.length>0">
                  {{contractInfo.customers[0].phone}}
                </span>
              </td>
              <td>中介费</td>
              <td>{{contractInfo.agency}}</td>
            </tr>
            <tr>
              <td>押金</td>
              <td>{{contractInfo.deposit}}</td>
              <td>合同开始时间</td>
              <td>{{contractInfo.begin_date}}</td>
              <td>合同结束时间</td>
              <td>{{contractInfo.end_date}}</td>
            </tr>
          </table>
        </div>
        <el-row>
          <div class="title">财务收款</div>
          <div class="describe_border">
            <el-form size="mini" :model="params" label-width="60px">
              <el-row v-for="(item,index) in financialReceiptsLength" :key="index">
                <el-col :span="5">
                  <el-form-item label="应收">
                    <el-input placeholder="请输入内容" v-model="params.financial_info[index].receivable"
                              @change="financialChange(index)" clearable :disabled="!financial"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="5">
                  <el-form-item label="实收">
                    <el-input placeholder="请输入内容" v-model="params.financial_info[index].actual_receipt"
                              @change="financialChange(index)" clearable :disabled="!financial"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="5">
                  <el-form-item label="差额">
                    <el-input placeholder="请输入内容" v-model="params.financial_info[index].difference"
                              clearable :disabled="!financial"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="备注">
                    <el-input type="textarea" :rows="1" placeholder="请输入内容"
                              v-model="params.financial_info[index].remark" clearable :disabled="!financial"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="1" v-show="index!=0">
                  <i class="el-icon-remove-outline sub_com" @click="subData('financial', index)"></i>
                </el-col>
              </el-row>
              <div style="text-align: center" v-if="financial">
                <el-button type="text" @click="addData('financial')">
                  <i class="el-icon-circle-plus"></i>添加财务收款变化条目
                </el-button>
              </div>
            </el-form>
          </div>
        </el-row>
        <el-row>
          <div class="title">合同收款</div>
          <div class="describe_border">
            <el-form size="mini" :model="params" label-width="60px">
              <el-row v-for="(item, index) in contractCollectionLength" :key="index">
                <el-col :span="5">
                  <el-form-item label="应收">
                    <el-input placeholder="请输入内容" v-model="params.settled_info[index].receivable"
                              clearable></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="备注">
                    <el-input type="textarea" :rows="1" placeholder="请输入内容"
                              v-model="params.settled_info[index].remark"
                              clearable></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="1" v-show="index!=0">
                  <i class="el-icon-remove-outline  sub_com" @click="subData('contract', index)"></i>
                </el-col>
              </el-row>
              <div style="text-align: center">
                <el-button type="text" @click="addData('contract')">
                  <i class="el-icon-circle-plus"></i>添加合同收款变化条目
                </el-button>
              </div>
            </el-form>
          </div>
        </el-row>

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
                    <el-option v-for="item in check_type_dic" :label="item.dictionary_name" :key="item.id"
                               :value="item.id"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="退款时间" required>
                  <el-date-picker type="date" value-format="yyyy-MM-dd" v-model="params.checkout_time"
                                  placeholder="选择日期" style="width: 100%;"></el-date-picker>
                </el-form-item>
              </el-col>
            </el-row>

            <el-row>
              <el-col :span="8" v-if="params.check_type == 333 || params.check_type == 582">
                <el-form-item label="转租费">
                  <el-input placeholder="请输入内容" v-model="params.sublease_fee"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8" v-if="params.check_type == 331">
                <el-form-item label="违约方">
                  <el-select v-model="params.profit_type" @clear="clearProfitType" clearable="" placeholder="请选择违约方" value="">
                    <el-option label="公司" value="1"></el-option>
                    <el-option label="客户" value="2"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="8" v-if="params.check_type == 331">
                <el-form-item label="违约金">
                  <el-input placeholder="请输入内容" :disabled="!params.profit_type" v-model="params.profit"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </div>

        <el-row :gutter="20" style="margin-bottom: 15px">
          <el-col :span="12">
            <div class="title">退房原因</div>
            <el-input type="textarea" resize="none" v-model="params.reason" placeholder="请输入内容"></el-input>
          </el-col>
          <el-col :span="12">
            <div class="title">报备内容</div>
            <el-input type="textarea" resize="none" v-model="params.compensation" placeholder="请输入内容"></el-input>
          </el-col>
        </el-row>

        <!--维修信息-->
        <el-row>
          <div class="title">维修信息</div>
          <div class="describe_border">
            <el-form size="mini" :model="params" label-width="80px">
              <el-row v-for="(item, index) in repairInfoLength" :key="index">
                <el-col :span="5">
                  <el-form-item label="维修内容">
                    <el-input placeholder="请输入内容" v-model="params.repair_info[index].content"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="维修金额">
                    <el-input placeholder="请输入内容" v-model="params.repair_info[index].amount"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="1" v-show="repairInfoLength>1">
                  <i class="el-icon-remove-outline  sub_com" @click="subData('repair', index)"></i>
                </el-col>
              </el-row>
              <div style="text-align: center">
                <el-button type="text" @click="addData('repair')">
                  <i class="el-icon-circle-plus"></i>添加维修信息变化条目
                </el-button>
              </div>
            </el-form>
          </div>
        </el-row>

        <div class="title" style="margin-top: 15px;">上传照片</div>
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
              <el-col :span="10" :offset="2">
                <el-form-item label="合同承担方">
                  <el-select clearable v-model="params.contracting_party" placeholder="请选择承担方" value="">
                    <el-option v-for="item in contracting_party_dic" :label="item.dictionary_name" :value="item.id"
                               :key="item.id"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>

              <el-col :span="12">
                <el-form-item label="实际承担方">
                  <el-input v-model="params.actual_party" placeholder="请输入内容"></el-input>
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
            <el-row>
              <el-col :span="2" style="text-align: right">
                <el-form-item label="其他：" label-width="100px">
                </el-form-item>
              </el-col>
              <el-col :span="10">
                <el-form-item label="其他项">
                  <el-input v-model="params.other_content" placeholder="请输入内容"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="10">
                <el-form-item label="其他金额">
                  <el-input v-model="params.energy_other" placeholder="请输入内容"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="2">
                <div class="content">
                  合计：{{otherEnergyTotal}}
                </div>
              </el-col>
            </el-row>
          </el-form>
        </div>

        <div class="title">应扣其他费用</div>
        <div class="form_border">
          <el-form size="mini" :model="params" label-width="80px">
            <el-row>

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
                <el-form-item label="钥匙费用">
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


        <div class="title">退款信息</div>
        <div class="form_border">
          <el-form size="mini" :model="params" label-width="80px">
            <el-row>
              <el-col :span="8">
                <el-form-item label="实际退款">
                  <el-input v-model="realTotal" disabled></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="是否退款">
                  <el-select v-model="params.is_refund" clearable="" placeholder="请选择是否退款" value="">
                    <el-option label="是" value="1"></el-option>
                    <el-option label="否" value="2"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="姓名">
                  <el-input placeholder="请输入内容" v-model="params.account_name"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="8">
                <el-form-item label="退款账号">
                  <el-input placeholder="请输入内容" @blur="getBank" v-model="params.bank_num"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="开户行">
                  <el-input placeholder="请输入内容" v-model="params.account_bank"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="支行">
                  <el-input placeholder="请输入内容" v-model="params.branch_bank"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button size="small" @click="rentVacationDialogVisible = false">取 消</el-button>
        <el-button size="small" type="primary" @click="confirmAdd(0)">草 稿</el-button>
        <el-button size="small" type="primary" @click="confirmAdd(1)">发 布</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
  import UpLoad from '../../common/UPLOAD.vue'

  export default {
    props: ['rentVacationDialog', 'rentContractId', 'rentContractInfo'],
    components: {UpLoad},
    data() {
      return {
        financialReceiptsLength: 1, //财务收款
        contractCollectionLength: 1,  //合同收款
        repairInfoLength: 1,  //合同收款
        rentVacationDialogVisible: false,
        params: {
          financial_info: [
            {
              receivable: '', //应收
              actual_receipt: '', //实收
              difference: '', //差额
              remark: '',
            },
          ],
          settled_info: [
            {
              receivable: '', //应收
              remark: '',
            },
          ],
          repair_info:[
            {
              content : '',
              amount : '',
            }
          ],
          status_type: '',
          contract_id: '',
          module: '1',
          check_time: '',
          checkout_time: '',
          check_type: '',
          profit: '',
          profit_type : '',   //违约方
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
          contracting_party : '',
          actual_party : '',

          other_content : '',
          energy_other : '',

          liquidated_damages: '',
          trash_fees: '',
          cleaning_fees: '',
          repair_compensation_fees: '',
          other_fees: '',
          overtime_rent: '',
          TV_fees: '',
          network_fees: '',

          is_refund : '',
        },
        isClear: false,
        isDictionary: false,
        check_type_dic: [],
        contracting_party_dic: [],
        rentInfo: {},
        editImage: {},
        financial: false,
        contractInfo : {},
      };
    },
    computed: {
      reimbursementTotal() {
        return Number(this.params.refund_deposit) + Number(this.params.residual_rent) + Number(this.params.viewing_fee)
          + Number(this.params.property_management_fee) + (this.params.profit_type == 1?Number(this.params.profit):-Number(this.params.profit))+
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
      otherEnergyTotal(){
        return Number(this.params.energy_other)
      },
      otherTotal() {
        return Number(this.params.trash_fees) + Number(this.params.cleaning_fees) + Number(this.params.repair_compensation_fees)
          + Number(this.params.other_fees) + Number(this.params.overtime_rent) +
          Number(this.params.TV_fees) + Number(this.params.network_fees);
      },
      realTotal() {
        return Number(this.reimbursementTotal) - Number(this.waterTotal) - Number(this.elePeakTotal) -
          Number(this.eleValTotal) - Number(this.gasTotal) - Number(this.managementTotal) - Number(this.otherTotal)
          - Number(this.params.sublease_fee) - Number(this.otherEnergyTotal);
      },
    },
    watch: {
      rentVacationDialog(val) {
        this.rentVacationDialogVisible = val
      },
      rentVacationDialogVisible(val) {
        if (!val) {
          this.$emit('close');
          this.clearData();
        } else {
          this.isClear = false;
          this.getCheckOutData();
          this.getContractInfo();
          if (!this.isDictionary) {
            this.getDictionary();
          }
          this.getPowerData();
        }
      },
      rentContractId(val) {
        this.params.contract_id = val;
      },

    },
    mounted() {

    },
    methods: {
      //获取合同详情
      getContractInfo() {
        this.$http.get(globalConfig.server + 'lease/rent/' + this.rentContractId).then((res) => {
          if (res.data.code === '61110') {
            this.contractInfo = res.data.data;
            this.params.contracting_party =  res.data.data.property_payer ? Number(res.data.data.property_payer) : '';
          }
        })
      },
      getPowerData() {
        this.$http.get(globalConfig.server + 'special/special/auth?name=checkout_financial').then((res) => {
          if (res.data.code === '10090') {
            this.financial = res.data.data;
          } else {
            this.financial = false;
          }
        });
      },
      financialChange(key) {
        this.params.financial_info[key].difference = this.params.financial_info[key].receivable - this.params.financial_info[key].actual_receipt;
      },
      subData(type, key) {
        if (type === 'financial') {
          this.financialReceiptsLength--;
          this.params.financial_info.splice(key, 1);
        } else if (type === 'contract') {
          this.contractCollectionLength--;
          this.params.settled_info.splice(key, 1);
        } else if (type === 'repair') {
          this.repairInfoLength--;
          this.params.repair_info.splice(key, 1);
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
          this.params.financial_info.push(data);
        } else if (type === 'contract') {
          let data = {
            receivable: '', //应收
            remark: '',
          };
          this.contractCollectionLength++;
          this.params.settled_info.push(data);
        } else if (type === 'repair') {
          let data  = {
            content: '', //应收
            amount: '',
          };
          this.repairInfoLength++;
          this.params.repair_info.push(data);
        }
      },
      getDictionary() {
        this.$http.get(globalConfig.server + 'setting/dictionary/328').then((res) => {
          if (res.data.code === '30010') {
            this.check_type_dic = res.data.data;
            this.isDictionary = true;
          }
        });
        this.dictionary(449, 1).then((res) => {
          this.contracting_party_dic = res.data;
          this.isDictionary = true
        });
      },
      //      退房性质变化
      clearFee() {
        this.params.profit = '';
        this.params.profit_type = '';
        this.params.sublease_fee = '';
      },
      clearProfitType(){
        this.params.profit = '';
      },
      //上传图片
      getImg(val) {
        this.params.image_pic = val[1];
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
            id: this.rentContractId,
            module: 2
          }
        }).then((res) => {
          if (res.data.code === '20090') {
            let data = res.data.data.old_data;
            this.params.check_time = data.checkout_date;
            this.params.check_type = data.check_type.id;
            let editImage = {};
            this.editImage = {};
            if (data.checkout_photo && data.checkout_photo.pic_addresses.length > 0) {
              this.params.image_pic = data.checkout_photo.pic_ids;
              data.checkout_photo.pic_addresses.forEach((item) => {
                editImage[item.id] = item.uri;
              });
              this.editImage = editImage;
            }
          }
        })
      },
      confirmAdd(flag) {
        this.params.status_type = flag ? '' : 'draft';
        this.$http.post(globalConfig.server + 'customer/check_out', this.params).then((res) => {
          if (res.data.code === '20010') {
            this.$notify.success({
              title: '成功',
              message: res.data.msg
            });
            this.rentVacationDialogVisible = false;
            this.$emit('close', 'success');
          } else {
            this.$notify.warning({
              title: '警告',
              message: res.data.msg
            })
          }
        })
      },
      clearData() {
        this.params = {
          financial_info: [
            {
              receivable: '', //应收
              actual_receipt: '', //实收
              difference: '', //差额
              remark: '',
            },
          ],
          settled_info: [
            {
              receivable: '', //应收
              remark: '',
            },
          ],
          repair_info:[
            {
              content : '',
              amount : '',
            }
          ],
          contract_id: this.rentContractId,
          module: '2',
          status_type: '',
          check_time: '',
          checkout_time: '',
          check_type: '',
          profit: '',
          profit_type: '',
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
          contracting_party : '',
          actual_party : '',

          other_content : '',
          energy_other : '',

          liquidated_damages: '',
          trash_fees: '',
          cleaning_fees: '',
          repair_compensation_fees: '',
          other_fees: '',
          overtime_rent: '',
          TV_fees: '',
          network_fees: '',

          is_refund : '',
        };

        this.isClear = true;
        this.financialReceiptsLength = 1;
        this.contractCollectionLength = 1;
        this.repairInfoLength = 1;
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
                  color: #606266;
                  text-align: left;
                  padding: 4px 10px;
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
