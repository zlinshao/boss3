<template>
  <div id="rentVacation">
    <el-dialog :close-on-click-modal="false" title="退房详情" :visible.sync="vacationDetailVisible" width="80%">
      <el-row>
        <el-col :span="18">
          <div class="scroll_bar"
               v-loading="isLoading"
               element-loading-text="拼命加载中"
               element-loading-spinner="el-icon-loading"
               element-loading-background="rgba(255, 255, 255, .7)">
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
                    <el-col :span="6">
                      <el-form-item label="收款周期">
                        <el-date-picker disabled
                            v-model="params.financial_info[index].payment_cycle"
                            type="daterange"
                            value-format="yyyy-MM-dd"
                            range-separator="至"
                            start-placeholder="开始日期"
                            end-placeholder="结束日期">
                        </el-date-picker>
                      </el-form-item>
                    </el-col>
                    <el-col :span="4">
                      <el-form-item label="应收">
                        <el-input disabled placeholder="请输入内容" v-model="params.financial_info[index].receivable"
                                  @change="financialChange(index)" clearable ></el-input>
                      </el-form-item>
                    </el-col>
                    <el-col :span="4">
                      <el-form-item label="实收">
                        <el-input disabled placeholder="请输入内容" v-model="params.financial_info[index].actual_receipt"
                                  @change="financialChange(index)" clearable></el-input>
                      </el-form-item>
                    </el-col>
                    <el-col :span="4">
                      <el-form-item label="差额">
                        <el-input disabled placeholder="请输入内容" v-model="params.financial_info[index].difference"
                                  clearable></el-input>
                      </el-form-item>
                    </el-col>
                    <el-col :span="5">
                      <el-form-item label="备注">
                        <el-input disabled type="textarea" autosize placeholder="请输入内容"
                                  v-model="params.financial_info[index].remark"></el-input>
                      </el-form-item>
                    </el-col>
                  </el-row>
                </el-form>
              </div>
            </el-row>
            <el-row>
              <div class="title">合同收款</div>
              <div class="describe_border">
                <el-form size="mini" :model="params" label-width="60px">
                  <el-row v-for="(item, index) in contractCollectionLength" :key="index">
                    <el-col :span="8">
                      <el-form-item label="收款周期">
                        <el-date-picker
                            disabled
                            v-model="params.settled_info[index].payment_cycle"
                            type="daterange"
                            value-format="yyyy-MM-dd"
                            range-separator="至"
                            start-placeholder="开始日期"
                            end-placeholder="结束日期">
                        </el-date-picker>
                      </el-form-item>
                    </el-col>
                    <el-col :span="5">
                      <el-form-item label="应收">
                        <el-input v-model="params.settled_info[index].receivable"
                                  disabled></el-input>
                      </el-form-item>
                    </el-col>
                    <el-col :span="8">
                      <el-form-item label="备注">
                        <el-input type="textarea" :rows="1"
                                  v-model="params.settled_info[index].remark"
                                  disabled></el-input>
                      </el-form-item>
                    </el-col>
                  </el-row>
                </el-form>
              </div>
            </el-row>
            <div class="title">退房信息</div>
            <div class="form_border">
              <el-form size="mini" :model="params" label-width="100px">
                <el-row>
                  <el-col :span="8">
                    <el-form-item label="退房时间" required>
                      <el-date-picker disabled type="date" value-format="yyyy-MM-dd" v-model="params.check_time"
                                       style="width: 100%;"></el-date-picker>
                    </el-form-item>
                  </el-col>

                  <el-col :span="8">
                    <el-form-item label="退房性质" required>
                      <el-select v-model="params.check_type"  disabled placeholder="请选择退房性质" value="">
                        <el-option v-for="item in check_type_dic" :label="item.dictionary_name" :key="item.id"
                                   :value="item.id"></el-option>
                      </el-select>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item label="退款时间" required>
                      <el-date-picker type="date" value-format="yyyy-MM-dd" v-model="params.checkout_time"
                                      style="width: 100%;" disabled></el-date-picker>
                    </el-form-item>
                  </el-col>
                </el-row>

                <el-row>
                  <el-col :span="8" v-if="params.check_type == 333 || params.check_type == 582">
                    <el-form-item label="转租费">
                      <el-input disabled v-model="params.sublease_fee"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8" v-if="params.check_type == 331">
                    <el-form-item label="违约方">
                      <el-select disabled v-model="params.profit_type"  value="">
                        <el-option label="公司" value="1"></el-option>
                        <el-option label="客户" value="2"></el-option>
                      </el-select>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8" v-if="params.check_type == 331">
                    <el-form-item label="违约金">
                      <el-input disabled  v-model="params.profit"></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>

                <el-row>
                  <el-col :span="8">
                    <el-form-item label="结算人">
                      <el-input disabled v-model="settlers"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item label="审核人">
                      <el-input disabled v-model="auditors"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item label="退款人">
                      <el-input disabled  v-model="payers"></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
              </el-form>
            </div>


            <el-row :gutter="20" style="margin-bottom: 15px">
              <el-col :span="12">
                <div class="title">退房原因</div>
                <el-input disabled type="textarea" resize="none" v-model="params.reason"></el-input>
              </el-col>
              <el-col :span="12">
                <div class="title">报备内容</div>
                <el-input disabled type="textarea" resize="none" v-model="params.compensation"></el-input>
              </el-col>
            </el-row>

            <!--维修信息-->
            <el-row>
              <div class="title">维修信息</div>
              <div class="describe_border">
                <el-form size="mini" :model="params" label-width="80px">
                  <el-row v-for="(item, index) in repairInfoLength" :key="index">
                    <el-col :span="6">
                      <el-form-item label="维修金额">
                        <el-input disabled v-model="params.repair_info[index].amount"></el-input>
                      </el-form-item>
                    </el-col>
                    <el-col :span="8">
                      <el-form-item label="维修内容">
                        <el-input disabled type="textarea" autosize v-model="params.repair_info[index].content"></el-input>
                      </el-form-item>
                    </el-col>
                  </el-row>

                  <el-row>
                    <el-col :span="6">
                      <el-form-item label="维修总金额">
                        <el-input disabled v-model="repair_cost"></el-input>
                      </el-form-item>
                    </el-col>
                  </el-row>
                </el-form>
              </div>
            </el-row>
            <div class="title" style="margin-top: 15px;">上传照片</div>
            <div class="describe_border">
              <div class="editImg" v-if="Object.keys(editImage).length>0">
                <img v-for="(val,key) in editImage" :src="val" alt="" data-magnify="" :data-src="val"
                     style="width: 120px;  height: 120px; border-radius:6px;margin: 0 15px 15px 0">
              </div>
            </div>
            <div class="title">应退还</div>
            <div class="form_border">
              <el-form size="mini" label-width="100px">
                <el-row>
                  <el-col :span="6">
                    <el-form-item label="退还押金">
                      <el-input disabled v-model="params.refund_deposit" type="number"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="6">
                    <el-form-item label="剩余房租">
                      <el-input disabled v-model="params.residual_rent" type="number"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="6">
                    <el-form-item label="收视费">
                      <el-input disabled v-model="params.viewing_fee" type="number"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="6">
                    <el-form-item label="预存物管费">
                      <el-input disabled v-model="params.property_management_fee" type="number"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="6">
                    <el-form-item label="预存水费">
                      <el-input disabled v-model="params.water_fee" type="number"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="6">
                    <el-form-item label="预存电费">
                      <el-input disabled v-model="params.electricity_fee" type="number"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="6">
                    <el-form-item label="预存气费">
                      <el-input disabled v-model="params.gas_fee" type="number"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="6">
                    <el-form-item label="应退还">
                      <el-input disabled :disabled="true" v-model="reimbursementTotal"></el-input>
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
                      <el-input disabled v-model="params.water_last"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="4">
                    <el-form-item label="本次底数">
                      <el-input disabled v-model="params.water_now"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="4">
                    <el-form-item label="单价">
                      <el-input disabled v-model="params.water_unit_price"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="4">
                    <el-form-item label="滞纳金">
                      <el-input disabled v-model="params.water_late_payment"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="4">
                    <el-form-item label="其他">
                      <el-input disabled v-model="params.water_other"></el-input>
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
                    <el-form-item label="燃气费：" label-width="100px">
                    </el-form-item>
                  </el-col>
                  <el-col :span="4">
                    <el-form-item label="上次底数">
                      <el-input disabled v-model="params.gas_last"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="4">
                    <el-form-item label="本次底数">
                      <el-input disabled v-model="params.gas_now"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="4">
                    <el-form-item label="单价">
                      <el-input disabled v-model="params.gas_unit_price"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="4">
                    <el-form-item label="滞纳金">
                      <el-input disabled v-model="params.gas_late_payment"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="4">
                    <el-form-item label="其他">
                      <el-input disabled v-model="params.gas_other"></el-input>
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
                    <el-form-item label="电费（谷）：" label-width="100px">
                    </el-form-item>
                  </el-col>
                  <el-col :span="4">
                    <el-form-item label="上次底数">
                      <el-input disabled v-model="params.electricity_valley_last"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="4">
                    <el-form-item label="本次底数">
                      <el-input disabled v-model="params.electricity_valley_now"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="4">
                    <el-form-item label="单价">
                      <el-input disabled v-model="params.electricity_valley_unit_price"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="4">
                    <el-form-item label="滞纳金">
                      <el-input disabled v-model="params.electricity_valley_late_payment"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="4">
                    <el-form-item label="其他">
                      <el-input disabled v-model="params.electricity_valley_other"></el-input>
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
                    <el-form-item label="电费（峰）：" label-width="100px">
                    </el-form-item>
                  </el-col>
                  <el-col :span="4">
                    <el-form-item label="上次底数">
                      <el-input disabled v-model="params.electricity_peak_last"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="4">
                    <el-form-item label="本次底数">
                      <el-input disabled v-model="params.electricity_peak_now"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="4">
                    <el-form-item label="单价">
                      <el-input disabled v-model="params.electricity_peak_unit_price"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="4">
                    <el-form-item label="滞纳金">
                      <el-input disabled v-model="params.electricity_peak_late_payment"></el-input>
                    </el-form-item>
                  </el-col>

                  <el-col :span="4">
                    <el-form-item label="其他">
                      <el-input disabled v-model="params.electricity_peak_other"></el-input>
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
                    <el-form-item label="电费：" label-width="100px">
                    </el-form-item>
                  </el-col>
                  <el-col :span="4">
                    <el-form-item label="上次底数">
                      <el-input disabled v-model="params.electricity_total_last" placeholder="请输入内容"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="4">
                    <el-form-item label="本次底数">
                      <el-input disabled v-model="params.electricity_total_now" placeholder="请输入内容"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="4">
                    <el-form-item label="单价">
                      <el-input disabled v-model="params.electricity_total_unit_price" placeholder="请输入内容"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="4">
                    <el-form-item label="滞纳金">
                      <el-input disabled v-model="params.electricity_total_late_payment" placeholder="请输入内容"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="4">
                    <el-form-item label="其他">
                      <el-input disabled v-model="params.electricity_total_other" placeholder="请输入内容"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="2">
                    <div class="content">
                      合计：{{eleTotalTotal}}
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
                      <el-input disabled v-model="params.other_content"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="10">
                    <el-form-item label="其他金额">
                      <el-input disabled v-model="params.energy_other"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="2">
                    <div class="content">
                      合计：{{otherEnergyTotal}}
                    </div>
                  </el-col>
                </el-row>

                <el-row>
                  <el-col :span="2" style="text-align: right">
                    <el-form-item label="物管费：" label-width="100px">
                    </el-form-item>
                  </el-col>
                  <!--<el-col :span="10">-->
                  <!--<el-form-item label="上次交到">-->
                  <!--<el-date-picker type="date" v-model="params.property_management_last"-->
                  <!--placeholder="选择日期"></el-date-picker>-->
                  <!--</el-form-item>-->
                  <!--</el-col>-->
                  <!--<el-col :span="12">-->
                  <!--<el-form-item label="本次交到">-->
                  <!--<el-date-picker type="date" v-model="params.property_management_now"-->
                  <!--placeholder="选择日期"></el-date-picker>-->
                  <!--</el-form-item>-->
                  <!--</el-col>-->
                  <el-col :span="4">
                    <el-form-item label="物业费">
                      <el-input disabled v-model="params.property_management_total_fees" placeholder="请输入内容"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="4">
                    <el-form-item label="合同承担方">
                      <el-select disabled clearable v-model="params.contracting_party" placeholder="请选择承担方" value="">
                        <el-option v-for="item in contracting_party_dic" :label="item.dictionary_name" :value="item.id"
                                   :key="item.id"></el-option>
                      </el-select>
                    </el-form-item>
                  </el-col>

                  <el-col :span="4">
                    <el-form-item label="实际承担方">
                      <el-input disabled v-model="params.actual_party" placeholder="请输入内容"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="4">
                    <el-form-item label="公摊费">
                      <el-input disabled v-model="params.property_management_water_electricity" placeholder="请输入内容"></el-input>
                    </el-form-item>
                  </el-col>
                  <!--<el-col :span="5">-->
                  <!--<el-form-item label="公摊电费">-->
                  <!--<el-input v-model="params.property_management_water" placeholder="请输入内容"></el-input>-->
                  <!--</el-form-item>-->
                  <!--</el-col>-->

                  <el-col :span="4">
                    <el-form-item label="其他">
                      <el-input disabled v-model="params.property_management_other" placeholder="请输入内容"></el-input>
                    </el-form-item>
                  </el-col>

                  <el-col :span="2">
                    <div class="content">
                      合计：{{managementTotal}}
                    </div>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="24">
                    <el-form-item label="备注">
                      <el-input type="textarea" autosize placeholder="请输入内容"
                                v-model="params.remark" clearable disabled></el-input>
                    </el-form-item>
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
                      <el-input disabled v-model="params.trash_fees"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="6">
                    <el-form-item label="清洁费">
                      <el-input disabled v-model="params.cleaning_fees"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="6">
                    <el-form-item label="钥匙费用">
                      <el-input disabled v-model="params.repair_compensation_fees"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="6">
                    <el-form-item label="其他费用">
                      <el-input disabled v-model="params.other_fees"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="6">
                    <el-form-item label="滞纳金">
                      <el-input disabled v-model="params.TV_fees" placeholder="请输入内容"></el-input>
                    </el-form-item>
                  </el-col>
                  <!--<el-col :span="6">-->
                    <!--<el-form-item label="超期房时">-->
                      <!--<el-input disabled v-model="params.overtime_rent"></el-input>-->
                    <!--</el-form-item>-->
                  <!--</el-col>-->
                  <!--<el-col :span="6">-->
                    <!--<el-form-item label="超期房费">-->
                      <!--<el-input disabled v-model="params.TV_fees"></el-input>-->
                    <!--</el-form-item>-->
                  <!--</el-col>-->
                  <el-col :span="6">
                    <el-form-item label="超期网费">
                      <el-input disabled v-model="params.network_fees"></el-input>
                    </el-form-item>
                  </el-col>

                  <el-col :span="6">
                    <el-form-item label="合计">
                      <el-input disabled v-model="otherTotal" disabled=""></el-input>
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
                      <el-select disabled v-model="params.is_refund" value="">
                        <el-option label="是" value="1"></el-option>
                        <el-option label="否" value="2"></el-option>
                      </el-select>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item label="姓名">
                      <el-input disabled v-model="params.account_name"></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="8">
                    <el-form-item label="退款账号">
                      <el-input disabled v-model="params.bank_num"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item label="开户行">
                      <el-input disabled v-model="params.account_bank"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item label="支行">
                      <el-input disabled v-model="params.branch_bank"></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
              </el-form>
            </div>


            <div class="title">款项凭证</div>
            <div class="describe_border">
              <div class="editImg" v-if="vacationData.payment_pic&&vacationData.payment_pic.length>0">
                <img v-for="img in vacationData.payment_pic" :src="img.uri" alt="" data-magnify="" :data-src="img.uri"
                     style="width: 120px;  height: 120px; border-radius:6px;margin: 0 15px 15px 0">
              </div>
            </div>
          </div>
        </el-col>
        <el-col :span="6" style="padding-left: 10px">
          <div class="scroll_bar">
            <div v-if="commentList.length<1" style="text-align: center;margin-top: 50px">暂无相关评论信息</div>
            <div v-else v-for="(item,index) in commentList" class="reportItem" style="margin-bottom: 12px;">
              <div class="commentContent">
                <div class="commentA">
                <span class="headSculpture">
                  <img v-if="item.staffs && item.staffs.avatar" :src="item.staffs.avatar" alt="">
                </span>
                  {{item.staffs.name}}
                  <span v-for="(org,index) in item.staffs.org" v-if="index === 0">-{{org.name}}</span>
                </div>
                <div class="commentB">
                  {{item.create_time}}
                </div>
              </div>
              <div class="commentC">
                <p>{{item.content}}</p>
                <div v-if="item.album&&item.album.image_pic.length>0">
                  <img v-for="(p,index) in item.album.image_pic" data-magnify="" :data-src="p.uri" :src="p.uri">
                </div>
                <div v-if="item.album&&item.album.video_file.length>0">
                  <video v-for="(v,index) in item.album.video_file" class="video-js" controls preload="auto" width="200" height="120" data-setup="{}">
                    <source :src="v.uri" type="video/mp4">
                  </video>
                </div>
              </div>
            </div>
          </div>
        </el-col>
      </el-row>
      <!--款项-->
      <el-dialog
        width="30%"
        title="款项"
        :visible.sync="passedDialog"
        append-to-body>
        <div>
          <el-form size="mini" onsubmit="return false" label-width="80px">
            <el-form-item label="款项类型" required>
              <el-select v-model="passParams.type" clearable="" placeholder="请选择款项类型" value="">
                <el-option label="应收款项" value="1"></el-option>
                <el-option label="应付款项" value="2"></el-option>
              </el-select>
            </el-form-item>
            <el-row>
              <el-col :span="12">
                <el-form-item label="科目" required>
                  <el-select v-model="subjectId" placeholder="请选择科目" @change="getSubject">
                    <el-option v-for="item in subjectList" :label="item.title" :key="item.id"
                               :value="item.id"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="12" v-if="subjectList2.length>0">
                <el-form-item>
                  <el-select v-model="subjectId2" placeholder="请选择科目">
                    <el-option v-for="item in subjectList2" :label="item.title" :key="item.id"
                               :value="item.id"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>
            <el-form-item label="结算金额" required>
              <el-input v-model="passParams.amount"></el-input>
            </el-form-item>
          </el-form>
        </div>
        <span slot="footer" class="dialog-footer">
        <el-button size="small" type="primary" @click="confirmPass">确 定</el-button>
      </span>
      </el-dialog>
      <!--添加评论信息-->
      <el-dialog append-to-body title="评论" :visible.sync="commentVisible" width="40%">
        <div class="scroll_bar" style="padding: 0;">
          <el-form size="mini" label-width="80px">
            <el-form-item label="评论信息" required>
              <el-input type="textarea" :rows="4" placeholder="说点什么吧！" v-model="commentParams.content"></el-input>
            </el-form-item>
            <el-form-item label="上传照片">
              <UpLoad :ID="'comment_pic'" :isClear="isClear" @getImg="getImg"></UpLoad>
            </el-form-item>
            <el-form-item label="上传视频">
              <UpLoad :ID="'comment_video'" :isClear="isClear" @getImg="getImg"></UpLoad>
            </el-form-item>
          </el-form>
          <h5 style="color: #e45057;margin-left: 80px">注意：照片和视频请分开上传，否则将不能正常显示</h5>
        </div>
        <div slot="footer" class="dialog-footer">
          <el-button size="small" @click="commentVisible = false">关&nbsp;闭</el-button>
          <el-button size="small" :disabled="isClick" type="primary" @click="addComment">确 定</el-button>
        </div>
      </el-dialog>

      <span slot="footer" class="dialog-footer">
        <div class='edit-time'>
          <span v-if="show_audited_time">提交审核时间 ： {{audited_time}}</span>
          <span v-if="show_reject_time">驳回时间 ： {{reject_time}}</span>
        </div>
        <div>
          <el-button v-if="params.status_type == 1" size="small" type="warning" @click="reject">驳 回</el-button>
          <el-button v-if="params.status_type == 1" size="small" type="primary" @click="passed">通 过</el-button>
          <el-button size="small" type="primary" @click="commentVisible = true">评 论</el-button>
        </div>
      </span>
    </el-dialog>
  </div>
</template>

<script>
  import UpLoad from '../../../../common/UPLOAD.vue'

  export default {
    props: ['vacationDetail', 'vacationId'],
    components: {UpLoad},
    data() {
      return {
        financialReceiptsLength: 1, //财务收款
        contractCollectionLength: 1,  //合同收款
        repairInfoLength : 1,
        vacationDetailVisible: false,
        params: {
          financial_info: [
            {
              payment_cycle : [],
              receivable: '', //应收
              actual_receipt: '', //实收
              difference: '', //差额
              remark: '',
            },
          ],
          settled_info: [
            {
              payment_cycle : [],
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

          electricity_total_last: '',
          electricity_total_now: '',
          electricity_total_unit_price: '',
          electricity_total_late_payment: '',
          electricity_total_other:'',

          gas_last: '',
          gas_now: '',
          gas_unit_price: '',
          gas_late_payment: '',
          gas_other: '',

          // property_management_last: '',
          // property_management_now: '',
          // property_management_electricity: '',
          // property_management_water: '',
          property_management_water_electricity: '',
          property_management_total_fees: '',
          property_management_other: '',
          contracting_party : '',
          actual_party : '',

          other_content : '',
          energy_other : '',
          remark : '',

          liquidated_damages: '',
          trash_fees: '',
          cleaning_fees: '',
          repair_compensation_fees: '',
          other_fees: '',
          // overtime_rent: '',
          TV_fees: '',
          network_fees: '',

          is_refund : '',
        },
        repair_cost : 0,

        settlers : '',      //结算人
        auditors : '',      //审核人
        payers : '',      //退款人

        subjectId: '',
        subjectId2: '',
        passParams: {
          type: '',
          subject: '',
          amount: '',
        },
        isClear: false,
        isDictionary: false,
        check_type_dic: [],
        contracting_party_dic: [],
        contractInfo: {},
        editImage: {},
        isLoading: false,
        passedDialog: false,
        subjectList: [],
        subjectList2: [],
        vacationData: [],

        // 评论相关
        commentVisible : false,
        commentParams : {
          content : '',
          parent_id : 0,
          image_pic :[],
          video_file : [],
        },
        commentList : [],

        isClick : false,  //正在点击
        isUpload : false,  //正在点击
        reimbursementTotal : '',    //应退还
        waterTotal : '',    //应退还
        elePeakTotal : '',    //应退还
        eleValTotal : '',    //应退还
        eleTotalTotal : '',    //应退还
        gasTotal : '',    //应退还
        managementTotal : '',    //应退还
        otherEnergyTotal : '',    //应退还
        otherTotal : '',    //应退还
        realTotal : '',    //应退还
        audited_time:'',       //提交审核时间
        reject_time:'',        //驳回时间
        show_audited_time:false,
        show_reject_time:false,
      };
    },

    watch: {
      vacationDetail(val) {
        this.vacationDetailVisible = val
      },
      vacationDetailVisible(val) {
        if (!val) {
          this.$emit('close');
          this.initData();
        } else {
          this.isClear = false;
          this.getData();
          this.getCommentData();
          if (!this.isDictionary) {
            this.getDictionary();
          }
        }
      },
      commentVisible(val){
        this.isClear = !this.isClear;
      }
    },
    mounted() {

    },
    methods: {
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
      //上传图片
      getImg(val) {
        if(val[0] === 'collectVacationId'){
          this.params.image_pic = val[1];
        }else if(val[0] === 'comment_pic'){
          this.commentParams.image_pic = val[1];
        }else if(val[0] === 'comment_video'){
          this.commentParams.video_file = val[1];
        }
        this.isUpload = val[2];
      },
      //获取退房详情
      getData() {
        this.isLoading = true;
        this.$http.get(globalConfig.server + 'customer/check_out/' + this.vacationId).then((res) => {
          this.isLoading = false;
          if (res.data.code === '20020') {
            let data = res.data.data;
            //展示提交审核时间和驳回时间
            if(data.status === 2){
              this.show_audited_time = true;
              this.show_reject_time = true;
            }else if(data.status === 1){
              this.show_audited_time = true;
              this.show_reject_time = false;
            }else{
              this.show_audited_time = false;
              this.show_reject_time = false;
            }
            if (data.financial_info) {
              if(Object.prototype.toString.call(data.financial_info) === '[object Array]'){
                this.financialReceiptsLength = data.financial_info.length || 1;
                this.params.financial_info =data.financial_info.length>0? data.financial_info : [{
                  payment_cycle : [],
                  receivable: '',
                  actual_receipt: '',
                  difference: '',
                  remark: '',
                }];
              }else if(Object.prototype.toString.call(data.financial_info) === '[object Object]'){
                this.financialReceiptsLength = Object.keys(data.financial_info).length || 1;
                this.params.financial_info =  Object.values(data.financial_info) || [{
                  payment_cycle : [],
                  receivable: '',
                  actual_receipt: '',
                  difference: '',
                  remark: '',
                }];
              }
            }
            if (data.settled_info) {
              if(Object.prototype.toString.call(data.settled_info) === '[object Array]'){
                this.contractCollectionLength = data.settled_info.length || 1;
                this.params.settled_info = data.settled_info.length>0? data.settled_info : [{ payment_cycle : [],receivable: '', remark: '',}];
              }else if(Object.prototype.toString.call(data.settled_info) === '[object Object]'){
                this.contractCollectionLength = Object.keys(data.settled_info).length || 1;
                this.params.settled_info = Object.values(data.settled_info) || [{ payment_cycle : [],receivable: '', remark: '',}];
              }
            }
            if (data.repair_info) {
              if(Object.prototype.toString.call(data.repair_info) === '[object Array]'){
                this.repairInfoLength = data.repair_info.length || 1;
                this.params.repair_info = data.repair_info.length>0? data.repair_info : [{content: '', amount: '',}];
              }else if(Object.prototype.toString.call(data.repair_info) === '[object Object]'){
                this.repairInfoLength = Object.keys(data.repair_info).length || 1;
                this.params.repair_info = Object.values(data.repair_info) || [{content: '', amount: '',}];
              }
            }
            this.repair_cost = data.repair_cost;

            this.vacationData = res.data.data;
            this.params.contract_id = data.contract_id;
            this.params.module = data.module;
            this.getContractInfo(data.module, data.contract_id);

            this.params.check_time = data.check_time;
            this.params.checkout_time = data.checkout_time;
            this.params.check_type = data.check_type;
            this.params.status_type = data.status;

            this.params.profit = data.extend_field && data.extend_field.profit ? data.extend_field.profit : 0;
            this.params.sublease_fee = data.details && data.details.sublease_fee ? data.details.sublease_fee : 0;
            this.params.bank_num = data.bank_num;
            this.params.account_bank = data.account_bank;
            this.params.branch_bank = data.branch_bank;
            this.params.account_name = data.account_name;
            this.params.reason = data.reason;
            this.params.compensation = data.compensation;

            this.params.refund_deposit = (data.details && data.details.refund_deposit) || 0;
            this.params.residual_rent = (data.details && data.details.residual_rent) || 0;
            this.params.viewing_fee = (data.details && data.details.viewing_fee) || 0;
            this.params.property_management_fee = (data.details && data.details.property_management_fee) || 0;
            this.params.water_fee = (data.details && data.details.water_fee) || 0;
            this.params.electricity_fee = (data.details && data.details.electricity_fee) || 0;
            this.params.gas_fee = (data.details && data.details.gas_fee) || 0;

            this.params.water_last = (data.details && data.details.water_last) || 0;
            this.params.water_now = (data.details && data.details.water_now) || 0;
            this.params.water_unit_price = (data.details && data.details.water_unit_price) || 0;
            this.params.water_late_payment = (data.details && data.details.water_late_payment) || 0;
            this.params.water_other = (data.details && data.details.water_other) || 0;

            this.params.electricity_peak_last = (data.details && data.details.electricity_peak_last) || 0;
            this.params.electricity_peak_now = (data.details && data.details.electricity_peak_now) || 0;
            this.params.electricity_peak_unit_price = (data.details && data.details.electricity_peak_unit_price) || 0;
            this.params.electricity_peak_late_payment = (data.details && data.details.electricity_peak_late_payment) || 0;
            this.params.electricity_peak_other = (data.details && data.details.electricity_peak_other) || 0;

            this.params.electricity_valley_last = (data.details && data.details.electricity_valley_last) || 0;
            this.params.electricity_valley_now = (data.details && data.details.electricity_valley_now) || 0;
            this.params.electricity_valley_unit_price = (data.details && data.details.electricity_valley_unit_price) || 0;
            this.params.electricity_valley_late_payment = (data.details && data.details.electricity_valley_late_payment) || 0;
            this.params.electricity_valley_other = (data.details && data.details.electricity_valley_other) || 0;

            this.params.electricity_total_last = (data.details && data.details.electricity_total_last) || 0;
            this.params.electricity_total_now = (data.details && data.details.electricity_total_now) || 0;
            this.params.electricity_total_unit_price = (data.details && data.details.electricity_total_unit_price) || 0;
            this.params.electricity_total_late_payment = (data.details && data.details.electricity_total_late_payment) || 0;
            this.params.electricity_total_other = (data.details && data.details.electricity_total_other) || 0;

            this.params.gas_last = (data.details && data.details.gas_last) || 0;
            this.params.gas_now = (data.details && data.details.gas_now) || 0;
            this.params.gas_unit_price = (data.details && data.details.gas_unit_price) || 0;
            this.params.gas_late_payment = (data.details && data.details.gas_late_payment) || 0;
            this.params.gas_other = (data.details && data.details.gas_other) || 0;

            // this.params.property_management_last = (data.details && data.details.property_management_last) || '';
            // this.params.property_management_now = (data.details && data.details.property_management_now) || '';
            // this.params.property_management_electricity = (data.details && data.details.property_management_electricity) || 0;
            // this.params.property_management_water = (data.details && data.details.property_management_water) || 0;
            this.params.property_management_water_electricity = (data.details && data.details.property_management_water_electricity) || 0;
            this.params.property_management_total_fees = (data.details && data.details.property_management_total_fees) || 0;
            this.params.property_management_other = (data.details && data.details.property_management_other) || 0;
            this.params.contracting_party = (data.details && data.details.contracting_party) || '';
            this.params.actual_party = (data.details && data.details.actual_party) || '';

            this.params.other_content = (data.details && data.details.other_content) || '';
            this.params.energy_other = (data.details && data.details.energy_other) || 0;

            this.params.remark = (data.details && data.details.remark) || '';

            this.params.liquidated_damages = (data.details && data.details.liquidated_damages) || 0;
            this.params.trash_fees = (data.details && data.details.trash_fees) || 0;
            this.params.cleaning_fees = (data.details && data.details.cleaning_fees) || 0;
            this.params.repair_compensation_fees = (data.details && data.details.repair_compensation_fees) || 0;
            this.params.other_fees = (data.details && data.details.other_fees) || 0;
            // this.params.overtime_rent = (data.details && data.details.overtime_rent) || 0;
            this.params.TV_fees = (data.details && data.details.TV_fees) || 0;
            this.params.network_fees = (data.details && data.details.network_fees) || 0;
            this.params.profit_type = data.extend_field && data.extend_field.profit_type ?
              String(data.extend_field.profit_type) : '';
            this.params.is_refund =data.is_refund ? String(data.is_refund):'';

            //已计算费用
            this.reimbursementTotal = (data.details && data.details.should_be_returned_fees) || 0;
            this.waterTotal = (data.details && data.details.water) || 0;
            this.elePeakTotal = (data.details && data.details.electricity_peak) || 0;
            this.eleValTotal = (data.details && data.details.electricity_valley) || 0;
            this.eleTotalTotal = (data.details && data.details.electricity_total) || 0;
            this.gasTotal = (data.details && data.details.gas) || 0;
            this.managementTotal = (data.details && data.details.property_management) || 0;
            this.otherEnergyTotal = (data.details && data.details.energy_other) || 0;
            this.otherTotal = (data.details && data.details.others_fees) || 0;
            this.realTotal = (data.details && data.details.total_fees) || 0;

            this.settlers = data.settlers && !Array.isArray(data.settlers)? data.settlers.name : '';
            this.auditors = data.auditors && !Array.isArray(data.auditors)? data.auditors.name : '';
            this.payers = data.payers && !Array.isArray(data.payers)? data.payers.name : '';

            let picObject = {};
            this.editImage = {};
            this.params.image_pic = [];
            if (data.album !== []) {
              for (let key in data.album.image_pic) {
                picObject[key] = data.album.image_pic[key][0].uri;
                this.params.image_pic.push(key)
              }
            }
            this.editImage = picObject;
          }
        });
      },


      getContractInfo(module, id) {
        if (module == 1) {
          this.$http.get(globalConfig.server + 'lease/collect/' + id).then((res) => {
            if (res.data.code === '61010') {
              let resData = res.data.data;
              console.log(resData)
              this.contractInfo = resData;
              this.audited_time = resData.record_time.audited;
              this.reject_time = resData.record_time.reject;
            }
          })
        } else {
          this.$http.get(globalConfig.server + 'lease/rent/' + id).then((res) => {
            if (res.data.code === '61110') {
              let resData = res.data.data;
              console.log(resData)
              this.contractInfo = resData;
              this.audited_time = resData.record_time.audited;
              this.reject_time = resData.record_time.reject;
            }
          })
        }
      },

      initData() {
        this.contractInfo = {};
        this.params = {
          financial_info: [
            {
              payment_cycle : [],
              receivable: '', //应收
              actual_receipt: '', //实收
              difference: '', //差额
              remark: '',
            },
          ],
          settled_info: [
            {
              payment_cycle : [],
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
          contract_id: this.collectContractId,
          module: '1',
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

          electricity_total_last: '',
          electricity_total_now: '',
          electricity_total_unit_price: '',
          electricity_total_late_payment: '',
          electricity_total_other:'',

          gas_last: '',
          gas_now: '',
          gas_unit_price: '',
          gas_late_payment: '',
          gas_other: '',

          // property_management_last: '',
          // property_management_now: '',
          // property_management_electricity: '',
          // property_management_water: '',
          property_management_water_electricity: '',
          property_management_total_fees: '',
          property_management_other: '',
          contracting_party : '',
          actual_party : '',

          other_content : '',
          energy_other : '',
          remark : '',

          liquidated_damages: '',
          trash_fees: '',
          cleaning_fees: '',
          repair_compensation_fees: '',
          other_fees: '',
          // overtime_rent: '',
          TV_fees: '',
          network_fees: '',

          is_refund : '',
        };
        this.repair_cost = 0;

        this.financialReceiptsLength = 1;
        this.contractCollectionLength = 1;
        this.repairInfoLength = 1;

        this.isClear = !this.isClear;
        this.commentVisible = false;
        this.commentList = [];
        this.commentParams = {
          content : '',
          parent_id : 0,
          image_pic :[],
          video_file : [],
        };
        this.reimbursementTotal  = '';    //应退还
        this.waterTotal  = '';    //应退还
        this.elePeakTotal  = '';    //应退还
        this.eleValTotal  = '';    //应退还
        this.eleTotalTotal  = '';    //应退还
        this.gasTotal  = '';    //应退还
        this.managementTotal  = '';    //应退还
        this.otherEnergyTotal  = '';    //应退还
        this.otherTotal  = '';    //应退还
        this.realTotal  = '';    //应退还
        this.isClick = false;
        this.audited_time = '';
        this.reject_time = '';
      },
      /*****************************************************************************************/
      //获取评论信息
      getCommentData(){
        this.$http.get(globalConfig.server + 'customer/check_out/comment/' + this.vacationId).then(res => {
          if(res.data.code === '20000'){
            this.commentList = res.data.data.data;
          }
        })
      },
      reject() {
        this.$confirm('您确定要撤回吗?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$http.put(globalConfig.server + 'customer/check_out/reject/' + this.vacationId).then((res) => {
            if (res.data.code === '20070') {
              this.$notify.success({
                title: '成功！',
                message: res.data.msg,
              });
              this.vacationDetailVisible = false;
              this.$emit('close', 'success');
            } else {
              this.$notify.warning({
                title: '警告！',
                message: res.data.msg,
              })
            }
          })
        }).catch(() => {

        });
      },
      passed() {
        this.$confirm('您确定要通过审核吗?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.passedDialog = true;
          this.$http.get(globalConfig.server + 'customer/check_out/subject').then((res) => {
            if (res.data.code === '20080') {
              this.subjectList = res.data.data;
            }
          })
        }).catch(() => {

        });
      },

      getSubject() {
        this.subjectList2 = [];
        this.subjectId2 = '';
        this.$http.get(globalConfig.server + 'customer/check_out/subject?id=' + this.subjectId).then((res) => {
          if (res.data.code === '20080') {
            this.subjectList2 = res.data.data;
          }
        })
      },

      confirmPass() {
        this.passParams.subject = this.subjectId2 ? this.subjectId2 : this.subjectId;
        this.$http.put(globalConfig.server + 'customer/check_out/status/' + this.vacationId, this.passParams).then((res) => {
          if (res.data.code == '20060') {
            this.vacationDetailVisible = false;
            this.passedDialog = false;
            this.$emit('close', 'success');
            this.subjectId = '';
            this.subjectId2 = '';
            this.passParams = {
              type: '',
              subject: '',
              amount: '',
            };
            this.$notify.success({
              title: '成功！',
              message: res.data.msg,
            });
          } else {
            this.$notify.warning({
              title: '警告！',
              message: res.data.msg,
            })
          }
        })
      },
      // 添加评论信息
      addComment(){
        if(this.isUpload){
          this.$notify.warning({
            title: '警告！',
            message: '文件正在上传',
          })
        }else {
          this.isClick = true;
          this.$http.post(globalConfig.server + 'customer/check_out/comment/'+ this.vacationId,
            this.commentParams).then(res=>{
            this.isClick = false;
            if(res.data.code === '20000'){
              this.$notify.success({
                title: '成功！',
                message: res.data.msg,
              });
              this.commentVisible = false;
              this.commentParams = {
                content : '',
                parent_id : 0,
                image_pic :[],
                video_file : [],
              };
              this.getCommentData();
            } else {
              this.$notify.warning({
                title: '警告！',
                message: res.data.msg,
              })
            }
          })
        }
      },
    }
  };
</script>
<style lang="scss" scoped="">
  #rentVacation {

    .el-input.is-disabled .el-input__inner {
      background-color: #f5f7fa;
      border-color: #e4e7ed;
      color: #666 !important;
      cursor: default !important;
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
        .dialog-footer{
          display:flex;
          justify-content: space-between;
          align-items: center;
          color:#409EFF;
          span{
            margin-right: 30px;
            font-size: 12px
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

  .reportItem {
    overflow: hidden;
    padding: 8px 16px;
    background-color: #eef3fc;
    border-radius: 4px;
    border-left: 5px solid #409EFF;
    margin-bottom: 10px;
    cursor: pointer;
    .itemLabel {
      display: inline-block;
      width: 70px;
      text-align: right;
      color: #6a8dfb;
      margin-right: 10px;
    }
  }
  .commentContent {
    display: flex;
    justify-content: space-between;

    .commentA, .commentB {
      height: 36px;
    }
    .commentA {
      overflow: hidden;
      span {
        display: inline-block;
        vertical-align: middle;
      }
      .headSculpture {
        min-width: 36px;
        max-width: 36px;
        min-height: 36px;
        max-height: 36px;
        img {
          width: 35px;
          height: 35px;
          border-radius: 50%;
        }
      }
    }
    .commentB {
      text-align: right;
      line-height: 36px;
    }
  }
  .commentC {
    color: #000;
    margin-left: 40px;
    p{
      word-wrap: break-word;
      word-break: normal;
    }
    div {
      img {
        width: 50px;
        height: 50px;
        margin-right: 10px;
      }
    }
  }
  video{
    background: #000;
  }
</style>
