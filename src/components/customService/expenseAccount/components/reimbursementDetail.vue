<template>
  <div id="reimbursementDetail">
    <el-dialog :close-on-click-modal="false" title="报销单" :visible.sync="reimbursementDetailDialogVisible" width="70%">
      <el-row>
        <el-col :span="18">
          <div class="scroll_bar">
            <div class="title">报销单详情</div>
            <div class="describe_border">
              <el-form size="small" label-width="100px">
                <el-row>
                  <el-col :span="8">
                    <el-form-item label="创建时间">
                      <div class="content" v-if="reimDetail.create_time">{{reimDetail.create_time}}</div>
                      <div class="content" v-else>暂无</div>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item label="创建人">
                      <div class="content">
                        <span v-if="reimDetail.staffs && reimDetail.staffs.real_name">{{reimDetail.staffs.real_name}}</span>
                        <span v-else>暂无</span>
                      </div>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item label="报销单编号">
                      <div class="content">
                        <span v-if="reimDetail.reimbursement_number">{{reimDetail.reimbursement_number}}</span>
                        <span v-else>暂无</span>
                      </div>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="8">
                    <el-form-item label="房屋地址">
                      <div class="content"
                           v-if="reimDetail.contract_id && reimDetail.contract_id.house && reimDetail.contract_id.house.name">
                        {{reimDetail.contract_id.house.name}}
                      </div>
                      <div class="content" v-else>暂无</div>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item label="报销类型">
                      <div class="content" v-if="reimDetail.type">{{arrSplitToArray(reimDetail.type).join(',')}}</div>
                      <div class="content" v-else>暂无</div>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item label="来源">
                      <div class="content" v-if="reimDetail.sources">{{reimDetail.sources}}</div>
                      <div class="content" v-else>暂无</div>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="8">
                    <el-form-item label="报销人">
                      <div class="content" v-if="reimDetail.reimbursement&&reimDetail.reimbursement.reimburtype">
                        {{reimDetail.reimbursement.reimburtype}}
                      </div>
                      <div class="content" v-else>暂无</div>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item label="报销人姓名">
                      <div class="content" v-if="reimDetail.reimbursement&&reimDetail.reimbursement.reimburperson_id_name">
                        {{reimDetail.reimbursement.reimburperson_id_name}}
                      </div>
                      <div class="content" v-else>暂无</div>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item label="报销金额">
                      <div class="content">
                        <span v-if="reimDetail.amount">{{reimDetail.amount}}</span>
                        <span v-else>暂无</span>
                      </div>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="8">
                    <el-form-item label="开户行">
                      <div class="content">
                        <span v-if="reimDetail.account_bank">{{reimDetail.account_bank}}</span>
                        <span v-else>暂无</span>
                      </div>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item label="支行">
                      <div class="content">
                        <span v-if="reimDetail.branch_bank">{{reimDetail.branch_bank}}</span>
                        <span v-else>暂无</span>
                      </div>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item label="开户人">
                      <div class="content">
                        <span v-if="reimDetail.account_name">{{reimDetail.account_name}}</span>
                        <span v-else>暂无</span>
                      </div>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="8">
                    <el-form-item label="银行卡号">
                      <div class="content">
                        <span v-if="reimDetail.bank_num">{{reimDetail.bank_num}}</span>
                        <span v-else>暂无</span>
                      </div>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="24" v-if="reimDetail.album">
                    <el-form-item label="截图">
                      <img v-if="reimDetail.album.image_pic!=[]" data-magnify
                           v-for="(val,key) in reimDetail.album.image_pic" :data-src="val.uri" :src="val.uri"
                           alt="">
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="24">
                    <el-form-item label="备注">
                      <div class="content">
                        <span v-if="reimDetail.remark">{{reimDetail.remark}}</span>
                        <span v-else>暂无</span>
                      </div>
                    </el-form-item>
                  </el-col>
                </el-row>
              </el-form>
            </div>
            <div class="title">报销结果</div>
            <div class="describe_border">
              <div v-if="reimDetail.results">
                <el-form size="small" label-width="100px" style="margin-bottom: 15px;border-bottom: 1px solid #eef3fc;"
                         v-if="reimDetail.results.water_fee.time && reimDetail.results.water_fee.time.length>0">
                  <el-row>
                    <el-col :span="12">
                      <el-form-item label="水费">
                        <div class="content">
                          <span>{{reimDetail.results.water_fee.time[0]}}——{{reimDetail.results.water_fee.time[1]}}</span>
                        </div>
                      </el-form-item>
                    </el-col>
                    <el-col :span="12">
                      <el-form-item label="总金额">
                        <div class="content">
                          <span v-if="reimDetail.results.water_fee && reimDetail.results.water_fee.total">{{reimDetail.results.water_fee.total}}</span>
                          <span v-else>暂无</span>
                        </div>
                      </el-form-item>
                    </el-col>
                  </el-row>
                  <div v-for="(item,key) in reimDetail.results.water_data" :key="key"
                       v-if="reimDetail.results.water_data.length>0">
                    <el-row>
                      <el-col :span="8">
                        <el-form-item label="水费">
                          <div class="content">
                            <span v-if="item.time.length>0">{{item.time[0]}}——{{item.time[1]}}</span>
                            <span v-else>暂无</span>
                          </div>
                        </el-form-item>
                      </el-col>
                      <el-col :span="8">
                        <el-form-item label="认责人">
                          <div class="content">
                            <span v-if="item.accusers">{{item.accusers}}</span>
                            <span v-else>暂无</span>
                          </div>
                        </el-form-item>
                      </el-col>
                      <el-col :span="8" v-if="item.accusers=='员工'">
                        <el-form-item label="认责人姓名">
                          <div class="content">
                            <span v-if="item.accuser_id_name">{{item.accuser_id_name}}</span>
                            <span v-else>暂无</span>
                          </div>
                        </el-form-item>
                      </el-col>
                    </el-row>
                    <el-row>
                      <el-col :span="4">
                        <el-form-item label="上次底数">
                          <div class="content">
                            <span v-if="item.last">{{item.last}}</span>
                            <span v-else>暂无</span>
                          </div>
                        </el-form-item>
                      </el-col>
                      <el-col :span="4">
                        <el-form-item label="本次底数">
                          <div class="content">
                            <span v-if="item.now">{{item.now}}</span>
                            <span v-else>暂无</span>
                          </div>
                        </el-form-item>
                      </el-col>
                      <el-col :span="4">
                        <el-form-item label="单价">
                          <div class="content">
                            <span v-if="item.unit_price">{{item.unit_price}}</span>
                            <span v-else>暂无</span>
                          </div>
                        </el-form-item>
                      </el-col>
                      <el-col :span="4">
                        <el-form-item label="滞纳金">
                          <div class="content">
                            <span v-if="item.late_payment">{{item.late_payment}}</span>
                            <span v-else>暂无</span>
                          </div>
                        </el-form-item>
                      </el-col>
                      <el-col :span="4">
                        <el-form-item label="其他">
                          <div class="content">
                            <span v-if="item.other">{{item.other}}</span>
                            <span v-else>暂无</span>
                          </div>
                        </el-form-item>
                      </el-col>
                      <el-col :span="4">
                        <el-form-item label="合计">
                          <div class="content">
                            <span v-if="item.total">{{item.total}}</span>
                            <span v-else>暂无</span>
                          </div>
                        </el-form-item>
                      </el-col>
                    </el-row>
                  </div>

                </el-form>
                <el-form size="small" label-width="100px" style="margin-bottom: 15px;border-bottom: 1px solid #eef3fc;"
                         v-if="reimDetail.results.electricity_fee.time && reimDetail.results.electricity_fee.time.length>0">
                  <el-row>
                    <el-col :span="12">
                      <el-form-item label="电费">
                        <div class="content">
                          <span>{{reimDetail.results.electricity_fee.time[0]}}——{{reimDetail.results.electricity_fee.time[1]}}</span>
                        </div>
                      </el-form-item>
                    </el-col>
                    <el-col :span="12">
                      <el-form-item label="总金额">
                        <div class="content">
                          <span v-if="reimDetail.results.electricity_fee && reimDetail.results.electricity_fee.total">{{reimDetail.results.electricity_fee.total}}</span>
                          <span v-else>暂无</span>
                        </div>
                      </el-form-item>
                    </el-col>
                  </el-row>
                  <div v-for="(item,key) in reimDetail.results.electricity_data" :key="key"
                       v-if="reimDetail.results.electricity_data.length>0">
                    <el-row>
                      <el-col :span="8">
                        <el-form-item label="电费">
                          <div class="content">
                            <span v-if="item.time.length>0">{{item.time[0]}}——{{item.time[1]}}</span>
                            <span v-else>暂无</span>
                          </div>
                        </el-form-item>
                      </el-col>
                      <el-col :span="8">
                        <el-form-item label="认责人">
                          <div class="content">
                            <span v-if="item.accusers">{{item.accusers}}</span>
                            <span v-else>暂无</span>
                          </div>
                        </el-form-item>
                      </el-col>
                      <el-col :span="8" v-if="item.accusers=='员工'">
                        <el-form-item label="认责人姓名">
                          <div class="content">
                            <span v-if="item.accuser_id_name">{{item.accuser_id_name}}</span>
                            <span v-else>暂无</span>
                          </div>
                        </el-form-item>
                      </el-col>
                    </el-row>
                    <el-row>
                      <el-col :span="4">
                        <el-form-item label="(峰)上次底数">
                          <div class="content">
                            <span v-if="item.peak_last">{{item.peak_last}}</span>
                            <span v-else>暂无</span>
                          </div>
                        </el-form-item>
                      </el-col>
                      <el-col :span="4">
                        <el-form-item label="本次底数">
                          <div class="content">
                            <span v-if="item.peak_now">{{item.peak_now}}</span>
                            <span v-else>暂无</span>
                          </div>
                        </el-form-item>
                      </el-col>
                      <el-col :span="4">
                        <el-form-item label="单价">
                          <div class="content">
                            <span v-if="item.peak_unit_price">{{item.peak_unit_price}}</span>
                            <span v-else>暂无</span>
                          </div>
                        </el-form-item>
                      </el-col>
                      <el-col :span="4">
                        <el-form-item label="滞纳金">
                          <div class="content">
                            <span v-if="item.peak_late_payment">{{item.peak_late_payment}}</span>
                            <span v-else>暂无</span>
                          </div>
                        </el-form-item>
                      </el-col>
                      <el-col :span="4">
                        <el-form-item label="其他">
                          <div class="content">
                            <span v-if="item.peak_other">{{item.peak_other}}</span>
                            <span v-else>暂无</span>
                          </div>
                        </el-form-item>
                      </el-col>
                      <el-col :span="4">
                        <el-form-item label="合计">
                          <div class="content">
                            <span v-if="item.peak_total">{{item.peak_total}}</span>
                            <span v-else>暂无</span>
                          </div>
                        </el-form-item>
                      </el-col>
                      <el-col :span="4">
                        <el-form-item label="(谷)上次底数">
                          <div class="content">
                            <span v-if="item.valley_last">{{item.valley_last}}</span>
                            <span v-else>暂无</span>
                          </div>
                        </el-form-item>
                      </el-col>
                      <el-col :span="4">
                        <el-form-item label="本次底数">
                          <div class="content">
                            <span v-if="item.valley_now">{{item.valley_now}}</span>
                            <span v-else>暂无</span>
                          </div>
                        </el-form-item>
                      </el-col>
                      <el-col :span="4">
                        <el-form-item label="单价">
                          <div class="content">
                            <span v-if="item.valley_unit_price">{{item.valley_unit_price}}</span>
                            <span v-else>暂无</span>
                          </div>
                        </el-form-item>
                      </el-col>
                      <el-col :span="4">
                        <el-form-item label="滞纳金">
                          <div class="content">
                            <span v-if="item.valley_late_payment">{{item.valley_late_payment}}</span>
                            <span v-else>暂无</span>
                          </div>
                        </el-form-item>
                      </el-col>
                      <el-col :span="4">
                        <el-form-item label="其他">
                          <div class="content">
                            <span v-if="item.valley_other">{{item.valley_other}}</span>
                            <span v-else>暂无</span>
                          </div>
                        </el-form-item>
                      </el-col>
                      <el-col :span="4">
                        <el-form-item label="合计">
                          <div class="content">
                            <span v-if="item.valley_total">{{item.valley_total}}</span>
                            <span v-else>暂无</span>
                          </div>
                        </el-form-item>
                      </el-col>
                    </el-row>
                  </div>

                </el-form>
                <el-form size="small" label-width="100px" style="margin-bottom: 15px;border-bottom: 1px solid #eef3fc;"
                         v-if="reimDetail.results.gas_fee.time && reimDetail.results.gas_fee.time.length>0">
                  <el-row>
                    <el-col :span="12">
                      <el-form-item label="燃气费">
                        <div class="content">
                          <span>{{reimDetail.results.gas_fee.time[0]}}——{{reimDetail.results.gas_fee.time[1]}}</span>
                        </div>
                      </el-form-item>
                    </el-col>
                    <el-col :span="12">
                      <el-form-item label="总金额">
                        <div class="content">
                          <span v-if="reimDetail.results.gas_fee && reimDetail.results.gas_fee.total">{{reimDetail.results.gas_fee.total}}</span>
                          <span v-else>暂无</span>
                        </div>
                      </el-form-item>
                    </el-col>
                  </el-row>
                  <div v-for="(item,key) in reimDetail.results.gas_data" :key="key"
                       v-if="reimDetail.results.gas_data.length>0">
                    <el-row>
                      <el-col :span="8">
                        <el-form-item label="燃气费">
                          <div class="content">
                            <span v-if="item.time.length>0">{{item.time[0]}}——{{item.time[1]}}</span>
                            <span v-else>暂无</span>
                          </div>
                        </el-form-item>
                      </el-col>
                      <el-col :span="8">
                        <el-form-item label="认责人">
                          <div class="content">
                            <span v-if="item.accusers">{{item.accusers}}</span>
                            <span v-else>暂无</span>
                          </div>
                        </el-form-item>
                      </el-col>
                      <el-col :span="8" v-if="item.accusers=='员工'">
                        <el-form-item label="认责人姓名">
                          <div class="content">
                            <span v-if="item.accuser_id_name">{{item.accuser_id_name}}</span>
                            <span v-else>暂无</span>
                          </div>
                        </el-form-item>
                      </el-col>
                    </el-row>
                    <el-row>
                      <el-col :span="4">
                        <el-form-item label="上次底数">
                          <div class="content">
                            <span v-if="item.last">{{item.last}}</span>
                            <span v-else>暂无</span>
                          </div>
                        </el-form-item>
                      </el-col>
                      <el-col :span="4">
                        <el-form-item label="本次底数">
                          <div class="content">
                            <span v-if="item.now">{{item.now}}</span>
                            <span v-else>暂无</span>
                          </div>
                        </el-form-item>
                      </el-col>
                      <el-col :span="4">
                        <el-form-item label="单价">
                          <div class="content">
                            <span v-if="item.unit_price">{{item.unit_price}}</span>
                            <span v-else>暂无</span>
                          </div>
                        </el-form-item>
                      </el-col>
                      <el-col :span="4">
                        <el-form-item label="滞纳金">
                          <div class="content">
                            <span v-if="item.late_payment">{{item.late_payment}}</span>
                            <span v-else>暂无</span>
                          </div>
                        </el-form-item>
                      </el-col>
                      <el-col :span="4">
                        <el-form-item label="其他">
                          <div class="content">
                            <span v-if="item.other">{{item.other}}</span>
                            <span v-else>暂无</span>
                          </div>
                        </el-form-item>
                      </el-col>
                      <el-col :span="4">
                        <el-form-item label="合计">
                          <div class="content">
                            <span v-if="item.total">{{item.total}}</span>
                            <span v-else>暂无</span>
                          </div>
                        </el-form-item>
                      </el-col>
                    </el-row>
                  </div>

                </el-form>
                <el-form size="small" label-width="100px" style="margin-bottom: 15px;border-bottom: 1px solid #eef3fc;"
                         v-if="reimDetail.results.property_management_fee.time && reimDetail.results.property_management_fee.time.length>0">
                  <el-row>
                    <el-col :span="12">
                      <el-form-item label="物管费">
                        <div class="content">
                          <span>{{reimDetail.results.property_management_fee.time[0]}}——{{reimDetail.results.property_management_fee.time[1]}}</span>
                        </div>
                      </el-form-item>
                    </el-col>
                    <el-col :span="12">
                      <el-form-item label="总金额">
                        <div class="content">
                        <span
                            v-if="reimDetail.results.property_management_fee && reimDetail.results.property_management_fee.total">{{reimDetail.results.property_management_fee.total}}</span>
                          <span v-else>暂无</span>
                        </div>
                      </el-form-item>
                    </el-col>
                  </el-row>
                  <div v-for="(item,key) in reimDetail.results.property_management_data" :key="key"
                       v-if="reimDetail.results.property_management_data.length>0">
                    <el-row>
                      <el-col :span="8">
                        <el-form-item label="物管费">
                          <div class="content">
                            <span v-if="item.time.length>0">{{item.time[0]}}——{{item.time[1]}}</span>
                            <span v-else>暂无</span>
                          </div>
                        </el-form-item>
                      </el-col>
                      <el-col :span="8">
                        <el-form-item label="认责人">
                          <div class="content">
                            <span v-if="item.accusers">{{item.accusers}}</span>
                            <span v-else>暂无</span>
                          </div>
                        </el-form-item>
                      </el-col>
                      <el-col :span="8" v-if="item.accusers=='员工'">
                        <el-form-item label="认责人姓名">
                          <div class="content">
                            <span v-if="item.accuser_id_name">{{item.accuser_id_name}}</span>
                            <span v-else>暂无</span>
                          </div>
                        </el-form-item>
                      </el-col>
                    </el-row>
                    <el-row>
                      <el-col :span="12">
                        <el-form-item label="上次时间">
                          <div class="content">
                            <span v-if="item.last">{{item.last}}</span>
                            <span v-else>暂无</span>
                          </div>
                        </el-form-item>
                      </el-col>
                      <el-col :span="12">
                        <el-form-item label="本次时间">
                          <div class="content">
                            <span v-if="item.now">{{item.now}}</span>
                            <span v-else>暂无</span>
                          </div>
                        </el-form-item>
                      </el-col>
                      <el-col :span="5">
                        <el-form-item label="公摊水费">
                          <div class="content">
                            <span v-if="item.water">{{item.water}}</span>
                            <span v-else>暂无</span>
                          </div>
                        </el-form-item>
                      </el-col>
                      <el-col :span="5">
                        <el-form-item label="公摊电费">
                          <div class="content">
                            <span v-if="item.electricity">{{item.electricity}}</span>
                            <span v-else>暂无</span>
                          </div>
                        </el-form-item>
                      </el-col>
                      <el-col :span="5">
                        <el-form-item label="物业费">
                          <div class="content">
                            <span v-if="item.fees">{{item.fees}}</span>
                            <span v-else>暂无</span>
                          </div>
                        </el-form-item>
                      </el-col>
                      <el-col :span="5">
                        <el-form-item label="其他">
                          <div class="content">
                            <span v-if="item.other">{{item.other}}</span>
                            <span v-else>暂无</span>
                          </div>
                        </el-form-item>
                      </el-col>
                      <el-col :span="4">
                        <el-form-item label="合计">
                          <div class="content">
                            <span v-if="item.total">{{item.total}}</span>
                            <span v-else>暂无</span>
                          </div>
                        </el-form-item>
                      </el-col>
                    </el-row>
                  </div>

                </el-form>
                <el-form size="small" label-width="100px">
                  <el-row>
                    <el-col :span="24" v-if="reimDetail.results.album">
                      <el-form-item label="截图">
                        <img v-if="reimDetail.results.album.image_pic!=[]" data-magnify
                             v-for="(val,key) in reimDetail.results.album.image_pic" :data-src="val.uri" :src="val.uri"
                             alt="">
                      </el-form-item>
                    </el-col>
                  </el-row>
                  <el-form-item label="结算人">
                    <div class="content">
                      <span v-if="reimDetail.staffs && reimDetail.staffs.real_name">{{reimDetail.staffs.real_name}}</span>
                      <span v-else>暂无</span>
                    </div>
                  </el-form-item>
                  <el-row>
                    <el-col :span="24">
                      <el-form-item label="备注">
                        <div class="content">
                        <span
                            v-if="reimDetail.results && reimDetail.results.remark">{{reimDetail.results.remark}}</span>
                          <span v-else>暂无</span>
                        </div>
                      </el-form-item>
                    </el-col>
                  </el-row>
                </el-form>
              </div>
              <div class="content" v-else="" style="text-align: center;line-height: 30px">
                暂无数据
              </div>
            </div>
            <div class="title">付款凭证</div>
            <div class="describe_border">
              <el-form size="small" label-width="100px">
                <el-row>
                  <el-col :span="24" v-if="reimDetail.payment_pic">
                    <el-form-item label="付款凭证">
                      <img v-if="reimDetail.payment_pic.length>0" data-magnify
                           v-for="(val,key) in reimDetail.payment_pic" :data-src="val.uri" :src="val.uri"
                           alt="">
                    </el-form-item>
                  </el-col>
                </el-row>
              </el-form>
            </div>
          </div>
        </el-col>
        <el-col :span="6">
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
        <el-button v-if="reimDetail.statuss === '待审核'" v-for="item in examineStatusCategory"
                   :type="item.id==664?'warning':'success'"
                   :key="item.id" size="small" @click="examineConfirm(item.id)">
          {{item.dictionary_name}}
        </el-button>
        <el-button size="small" type="primary" @click="commentVisible = true">评 论</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
  import UpLoad from '../../../common/UPLOAD.vue'
  export default {
    name: 'reimbursement-detail',
    props: ['reimbursementDetailDialog', 'reimbursementId', 'module'],
    components:{UpLoad},
    data() {
      return {
        reimbursementDetailDialogVisible: false,
        reimDetail: {},  //报销单详情
        commentVisible : false,   //评论
        isClear: false,
        isUpload: false,
        isClick: false,
        commentParams : {
          content : '',
          parent_id : 0,
          image_pic :[],
          video_file : [],
        },
        commentList : [],
        examineStatusCategory : [],
        isDictionary : false,
      };
    },
    watch: {
      reimbursementDetailDialog(val) {
        this.reimbursementDetailDialogVisible = val;
      },
      reimbursementDetailDialogVisible(val) {
        if (!val) {
          this.$emit('close');
          this.reimDetail = {};
          this.commentList = [];
        } else {
          this.getDetail();
          this.getCommentData();
          if(!this.isDictionary){
            this.getDictionary()
          }
        }
      },
      commentVisible(val){
        this.isClear = !this.isClear;
      }
    },
    methods: {
      getDictionary(){
        this.dictionary(642).then((res) => {
          let finish_status = res.data;
          finish_status.forEach((item) => {
            if (item.id === 663 || item.id === 664) {
              this.examineStatusCategory.push(item);
            }
          });
          this.isDictionary = true;
        });
      },
      getDetail() {
        this.$http.get(globalConfig.server + 'customer/reimbursement/' + this.reimbursementId).then((res) => { //
          if (res.data.code === "30020") {
            this.reimDetail = res.data.data;
          } else {
            this.reimDetail = {};
            this.$notify.warning({
              title: '警告',
              message: res.data.msg,
            });
          }
        });
      },
      //上传图片
      getImg(val) {
        if(val[0] === 'comment_pic'){
          this.commentParams.image_pic = val[1];
        }else if(val[0] === 'comment_video'){
          this.commentParams.video_file = val[1];
        }
        this.isUpload = val[2];
      },
      //获取评论信息
      getCommentData(){
        this.$http.get(globalConfig.server + 'customer/reimbursement/comment/' + this.reimbursementId).then(res => {
          if(res.data.code === '30000'){
            this.commentList = res.data.data.data;
          }
        })
      },
      arrSplitToArray(json){
        let arr = [];
        json.forEach(item=>{
          arr.push(item.dictionary_name);
        });
        return arr;
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
          this.$http.post(globalConfig.server + 'customer/reimbursement/comment/'+ this.reimbursementId,
            this.commentParams).then(res=>{
            this.isClick = false;
            if(res.data.code === '30000'){
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
      examineConfirm(val) {
        this.$http.put(globalConfig.server + 'customer/reimbursement_result/status/' +
          this.reimbursementId, {status: val}).then((res) => {
          if (res.data.code === '40050') {
            this.$notify.success({
              title: '成功',
              message: res.data.msg
            });
            // if(val == 664){
            //   this.commentVisible = true;
            // }
            this.reimbursementDetailDialogVisible = val;
            this.$emit('close','success')
          } else {
            this.$notify.warning({
              title: '警告',
              message: res.data.msg
            });
          }
        });
      },
    }
  };
</script>
<style lang="scss" scoped="">
  #reimbursementDetail {
    .content {
      padding: 0 10px;
      min-height: 32px;
      background: #eef3fc;
      border-radius: 4px;
      font-size: 12px;
      color: #727479;
    }
    img {
      width: 80px;
      height: 80px;
      border-radius: 6px;
      margin: 0 10px 10px 0;
    }
    .follow_result {
      display: flex;
      justify-content: space-between;
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
  }

</style>
