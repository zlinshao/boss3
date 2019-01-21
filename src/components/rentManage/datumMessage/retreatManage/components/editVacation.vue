<template>
  <div id="editVacation">
    <el-dialog :close-on-click-modal="false" title="修改退房信息" :visible.sync="editCollectVacationVisible" width="75%">
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
        <el-row >
          <div class="title">财务收款</div>
          <div class="describe_border">
            <el-form size="mini" :model="params" label-width="60px">
              <el-row v-for="(item,index) in financialReceiptsLength" :key="index">
                <el-col :span="6">
                  <el-form-item label="收款周期">
                    <el-date-picker
                        :disabled="!financial"
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
                    <el-input placeholder="请输入内容" v-model="params.financial_info[index].receivable"
                              @change="financialChange(index)" clearable :disabled="!financial"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="4">
                  <el-form-item label="实收">
                    <el-input placeholder="请输入内容" v-model="params.financial_info[index].actual_receipt"
                              @change="financialChange(index)" clearable :disabled="!financial"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="4">
                  <el-form-item label="差额">
                    <el-input placeholder="请输入内容" v-model="params.financial_info[index].difference"
                              clearable :disabled="!financial"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="5">
                  <el-form-item label="备注">
                    <el-input type="textarea" autosize placeholder="请输入内容"
                              v-model="params.financial_info[index].remark" clearable :disabled="!financial"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="1" v-show="financialReceiptsLength>1">
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
                <el-col :span="8">
                  <el-form-item label="收款周期">
                    <el-date-picker
                        :disabled="status==1"
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
                    <el-input placeholder="请输入内容" v-model="params.settled_info[index].receivable"
                              clearable :disabled="status==1"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="备注">
                    <el-input type="textarea" autosize placeholder="请输入内容"
                              v-model="params.settled_info[index].remark"
                              clearable :disabled="status==1"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="1" v-show="contractCollectionLength>1">
                  <i class="el-icon-remove-outline  sub_com" @click="subData('contract', index)"></i>
                </el-col>
              </el-row>
              <div style="text-align: center" >
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
                                  placeholder="选择日期" @blur="computeCheckout" style="width: 100%;"></el-date-picker>
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
            <el-input type="textarea" resize="none" v-model="params.reason" placeholder="请输入内容"
                      :disabled="status==1"></el-input>
          </el-col>
          <el-col :span="12">
            <div class="title">报备内容</div>
            <el-input type="textarea" resize="none" v-model="params.compensation" placeholder="请输入内容"
                      :disabled="status==1"></el-input>
          </el-col>
        </el-row>

        <!--维修信息-->
        <el-row>
          <div class="title">维修信息</div>
          <div class="describe_border">
            <el-form size="mini" :model="params" label-width="80px">
              <el-row v-for="(item, index) in repairInfoLength" :key="index">
                <el-col :span="8">
                  <el-form-item label="维修内容">
                    <el-input placeholder="请输入内容" type="textarea" autosize v-model="params.repair_info[index].content"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="6">
                  <el-form-item label="维修金额">
                    <el-input placeholder="请输入内容" @blur="computedTotal" v-model="params.repair_info[index].amount"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="1" v-show="repairInfoLength>1">
                  <i class="el-icon-remove-outline  sub_com" @click="subData('repair', index)"></i>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="6">
                  <el-form-item label="维修总金额">
                    <el-input disabled v-model="repair_cost"></el-input>
                  </el-form-item>
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
          <UpLoad :ID="'editCollectVacationId'" :editImage="editImage" :isClear="isClear" @getImg="getImg"></UpLoad>
        </div>

        <div class="title">应退还</div>
        <div class="form_border">
          <el-form size="mini" label-width="100px">
            <el-row>
              <el-col :span="6">
                <el-form-item label="退还押金">
                  <el-input v-model="params.refund_deposit" type="number" placeholder="请输入内容"
                            :disabled="status==1"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="剩余房租">
                  <el-input v-model="params.residual_rent" type="number" placeholder="请输入内容"
                            :disabled="status==1"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="收视费">
                  <el-input v-model="params.viewing_fee" type="number" placeholder="请输入内容"
                            :disabled="status==1"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="预存物管费">
                  <el-input v-model="params.property_management_fee" type="number" placeholder="请输入内容"
                            :disabled="status==1"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="预存水费">
                  <el-input v-model="params.water_fee" type="number" placeholder="请输入内容"
                            :disabled="status==1"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="预存电费">
                  <el-input v-model="params.electricity_fee" type="number" placeholder="请输入内容"
                            :disabled="status==1"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="预存气费">
                  <el-input v-model="params.gas_fee" type="number" placeholder="请输入内容" :disabled="status==1"></el-input>
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
                <el-form-item label="电费：" label-width="100px">
                </el-form-item>
              </el-col>
              <el-col :span="4">
                <el-form-item label="上次底数">
                  <el-input v-model="params.electricity_total_last" placeholder="请输入内容"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="4">
                <el-form-item label="本次底数">
                  <el-input v-model="params.electricity_total_now" placeholder="请输入内容"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="4">
                <el-form-item label="单价">
                  <el-input v-model="params.electricity_total_unit_price" placeholder="请输入内容"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="4">
                <el-form-item label="滞纳金">
                  <el-input v-model="params.electricity_total_late_payment" placeholder="请输入内容"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="4">
                <el-form-item label="其他">
                  <el-input v-model="params.electricity_total_other" placeholder="请输入内容"></el-input>
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
                  <el-input v-model="params.property_management_total_fees" placeholder="请输入内容"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="4">
                <el-form-item label="合同承担方">
                  <el-select clearable v-model="params.contracting_party" placeholder="请选择承担方" value="">
                    <el-option v-for="item in contracting_party_dic" :label="item.dictionary_name" :value="item.id"
                               :key="item.id"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>

              <el-col :span="4">
                <el-form-item label="实际承担方">
                  <el-input v-model="params.actual_party" placeholder="请输入内容"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="4">
                <el-form-item label="公摊费">
                  <el-input v-model="params.property_management_water_electricity" placeholder="请输入内容"></el-input>
                </el-form-item>
              </el-col>
              <!--<el-col :span="5">-->
              <!--<el-form-item label="公摊电费">-->
              <!--<el-input v-model="params.property_management_water" placeholder="请输入内容"></el-input>-->
              <!--</el-form-item>-->
              <!--</el-col>-->

              <el-col :span="4">
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
              <el-col :span="24">
                <el-form-item label="备注">
                  <el-input type="textarea" autosize placeholder="请输入内容"
                            v-model="params.remark" clearable></el-input>
                </el-form-item>
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
                  <el-input v-model="params.trash_fees" placeholder="请输入内容" :disabled="status==1"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="清洁费">
                  <el-input v-model="params.cleaning_fees" placeholder="请输入内容" :disabled="status==1"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="钥匙费用">
                  <el-input v-model="params.repair_compensation_fees" placeholder="请输入内容"
                            :disabled="status==1"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="其他费用">
                  <el-input v-model="params.other_fees" placeholder="请输入内容" :disabled="status==1"></el-input>
                </el-form-item>
              </el-col>
              <!--<el-col :span="6">-->
                <!--<el-form-item label="超期房时">-->
                  <!--<el-input v-model="params.overtime_rent" placeholder="请输入内容" :disabled="status==1"></el-input>-->
                <!--</el-form-item>-->
              <!--</el-col>-->
              <el-col :span="6">
                <el-form-item label="滞纳金">
                  <el-input v-model="params.TV_fees" :disabled="status==1" placeholder="请输入内容"></el-input>
                </el-form-item>
              </el-col>
              <!--<el-col :span="6">-->
                <!--<el-form-item label="超期房费">-->
                  <!--<el-input v-model="params.TV_fees" placeholder="请输入内容" :disabled="status==1"></el-input>-->
                <!--</el-form-item>-->
              <!--</el-col>-->
              <el-col :span="6">
                <el-form-item label="超期网费">
                  <el-input v-model="params.network_fees" placeholder="请输入内容" :disabled="status==1"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="合计">
                  <el-input disabled v-model="otherTotal" disabled="" placeholder="请输入内容"></el-input>
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
        <el-button size="small" @click="editCollectVacationVisible = false">取 消</el-button>
         <el-button size="small" type="primary" @click="confirmAdd(0)">草 稿</el-button>
        <el-button size="small" type="primary" @click="confirmAdd(1)">发 布</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
  import UpLoad from '../../../../common/UPLOAD.vue'

  export default {
    props: ['editCollectVacation', 'vacationId', 'status'],
    components: {UpLoad},
    data() {
      return {
        financialReceiptsLength: 1, //财务收款
        contractCollectionLength: 1,  //合同收款
        repairInfoLength: 1,  //合同收款
        editCollectVacationVisible: false,
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
        isClear: false,
        isDictionary: false,
        check_type_dic: [],
        contracting_party_dic: [],
        contractInfo: {},
        editImage: {},
        isLoading: false,
        financial: false,
      };
    },
    computed: {
      reimbursementTotal() {
        return Number(this.params.refund_deposit) + Number(this.params.residual_rent) + Number(this.params.viewing_fee)
          + Number(this.params.property_management_fee) +
          Number(this.params.water_fee) + Number(this.params.electricity_fee) + Number(this.params.gas_fee);
      },
      waterTotal() {
        return ((Number(this.params.water_now) - Number(this.params.water_last)) * Number(this.params.water_unit_price)
          + Number(this.params.water_late_payment) + Number(this.params.water_other)).toFixed(2);
      },
      elePeakTotal() {
        return ((Number(this.params.electricity_peak_now) - Number(this.params.electricity_peak_last)) * Number(this.params.electricity_peak_unit_price)
          + Number(this.params.electricity_peak_late_payment) + Number(this.params.electricity_peak_other)).toFixed(2);
      },
      eleValTotal() {
        return ((Number(this.params.electricity_valley_now) - Number(this.params.electricity_valley_last)) * Number(this.params.electricity_valley_unit_price)
          + Number(this.params.electricity_valley_late_payment) + Number(this.params.electricity_valley_other)).toFixed(2);
      },
      eleTotalTotal() {
        return ((Number(this.params.electricity_total_now) - Number(this.params.electricity_total_last)) * Number(this.params.electricity_total_unit_price)
          + Number(this.params.electricity_total_late_payment) + Number(this.params.electricity_total_other)).toFixed(2);
      },
      gasTotal() {
        return ((Number(this.params.gas_now) - Number(this.params.gas_last)) * Number(this.params.gas_unit_price)
          + Number(this.params.gas_late_payment) + Number(this.params.gas_other)).toFixed(2);
      },
      managementTotal() {
        return (Number(this.params.property_management_total_fees) + Number(this.params.property_management_water_electricity)).toFixed(2);
      },
      otherEnergyTotal(){
        return Number(this.params.energy_other).toFixed(2)
      },
      otherTotal() {
        return (Number(this.params.trash_fees) + Number(this.params.cleaning_fees) + Number(this.params.repair_compensation_fees)
          + Number(this.params.other_fees) + Number(this.params.TV_fees) + Number(this.params.network_fees)).toFixed(2);
      },
      realTotal() {
        return (Number(this.reimbursementTotal) - Number(this.waterTotal) - Number(this.elePeakTotal) - Number(this.eleTotalTotal)
          - Number(this.eleValTotal) - Number(this.gasTotal) - Number(this.managementTotal) - Number(this.otherTotal)
          - Number(this.params.sublease_fee) - Number(this.otherEnergyTotal)- Number(this.repair_cost) +
          (this.params.profit_type == 1?Number(this.params.profit):-Number(this.params.profit))).toFixed(2);
      },
    },
    watch: {
      editCollectVacation(val) {
        this.editCollectVacationVisible = val
      },
      editCollectVacationVisible(val) {
        if (!val) {
          this.$emit('close');
          this.initData();
        } else {
          this.isClear = false;
          this.getData();
          if (!this.isDictionary) {
            this.getDictionary();
          }
          this.getPowerData();
        }
      },
    },
    activated() {
    },
    methods: {
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
          this.computedTotal()
        }
      },
      addData(type) {
        if (type === 'financial') {
          let data = {
            payment_cycle : [],
            receivable: '', //应收
            actual_receipt: '', //实收
            difference: '', //差额
            remark: '',
          };
          this.financialReceiptsLength++;
          this.params.financial_info.push(data);
        } else if (type === 'contract') {
          let data = {
            payment_cycle : [],
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
      //获取退房详情
      getData() {
        this.isLoading = true;
        this.$http.get(globalConfig.server + 'customer/check_out/' + this.vacationId).then((res) => {
          this.isLoading = false;
          if (res.data.code === '20020') {
            let data = res.data.data;
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

            this.params.contract_id = data.contract_id;
            this.params.module = data.module;
            this.getContractInfo(data.module, data.contract_id);

            this.params.check_time = data.check_time;
            this.params.checkout_time = data.checkout_time;
            this.params.check_type = data.check_type;
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
        })
      },

      getContractInfo(module, id) {
        if (module == 1) {
          this.$http.get(globalConfig.server + 'lease/collect/' + id).then((res) => {
            if (res.data.code === '61010') {
              this.contractInfo = res.data.data;
            }
          })
        } else {
          this.$http.get(globalConfig.server + 'lease/rent/' + id).then((res) => {
            if (res.data.code === '61110') {
              this.contractInfo = res.data.data;
            }
          })
        }
      },

      confirmAdd(flag) {
        this.params.status_type = flag ? '' : 'draft';
        this.$http.put(globalConfig.server + 'customer/check_out/' + this.vacationId, this.params).then((res) => {
          if (res.data.code === '20030') {
            this.$notify.success({
              title: '成功',
              message: res.data.msg
            });
            this.editCollectVacationVisible = false;
            this.$emit('close', 'success');
          } else {
            this.$notify.warning({
              title: '警告',
              message: res.data.msg
            })
          }
        })
      },

      //计算维修总金额
      computedTotal(){
        this.repair_cost = 0;
        this.params.repair_info.forEach((item)=>{
          this.repair_cost += Number(item.amount);
        })
      },
      //计算退款时间
      computeCheckout(){
        let date = new Date(this.params.check_time).getTime() + 14*24*60*60*1000;
        this.params.checkout_time = this.timestampToDate(date);
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
        this.isClear = true;
      },
    }
  };
</script>
<style lang="scss" scoped="">
  #editVacation {
    input[disabled] {
      background: #eee;
    }
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
