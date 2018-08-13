<template>
  <div id="reimResult">
    <el-dialog :close-on-click-modal="false" :title="resultTitle"
               :visible.sync="reimResultDialogVisible" width="70%">
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
            <el-form size="mini" :model="form" label-width="80px">
              <div class="title">水费</div>
              <div class="describe_border">
                <el-row>
                  <el-col :span="8">
                    <el-form-item label="水费">
                      <el-date-picker
                          type="daterange"
                          v-model="form.water_fee.time"
                          range-separator="至"
                          start-placeholder="开始日期"
                          end-placeholder="结束日期"
                          value-format="yyyy-MM-dd"
                      ></el-date-picker>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item label="总金额">
                      <el-input v-model="form.water_fee.total" placeholder="请输入总金额" clearable></el-input>
                    </el-form-item>
                  </el-col>

                  <el-col :span="4" style="text-align: right">
                    <el-button type="text" size="small" @click="showAccCom('water')" :disabled="form.water_data.length > 0">
                      +添加认责组成
                    </el-button>
                  </el-col>
                </el-row>
                <div v-if="waterAccCom" v-for="(item,key) in waterAccComLength" :key="key">
                  <el-row>
                    <el-col :span="8">
                      <el-form-item label="水费">
                        <el-date-picker
                            type="daterange"
                            v-model="form.water_data[key].time"
                            range-separator="至"
                            start-placeholder="开始日期"
                            end-placeholder="结束日期"
                            value-format="yyyy-MM-dd"
                            @change="timeChange('water',key)"></el-date-picker>
                      </el-form-item>
                    </el-col>
                    <el-col :span="7">
                      <el-form-item label="认责人">
                        <el-select v-model="form.water_data[key].accuser" placeholder="请选择认责归属" clearable>
                          <el-option v-for="item in responsiblePersonCategory" :label="item.dictionary_name" :key="item.id"
                                     :value="item.id">{{item.dictionary_name}}
                          </el-option>
                        </el-select>
                      </el-form-item>
                    </el-col>
                    <el-col :span="7" v-if="form.water_data[key].accuser === 658">
                      <el-form-item label="认责人姓名">
                        <el-input v-model="form.water_data[key].accuser_id_name" readonly
                                  @focus="chooseStaff('water',key)" placeholder="请选择">
                          <template slot="append">
                            <div style="cursor: pointer;" @click="emptyStaff('water',key)">清空</div>
                          </template>
                        </el-input>
                      </el-form-item>
                    </el-col>
                    <el-col :span="7" v-else-if="form.water_data[key].accuser === 657 ||
                            form.water_data[key].accuser === 656 || form.water_data[key].accuser === 659">
                      <el-form-item label="认责人姓名">
                        <el-input placeholder="请输入"></el-input>
                      </el-form-item>
                    </el-col>
                    <el-col :span="7" v-else><span style="visibility: hidden">1</span></el-col>
                    <el-col :span="2" style="text-align:center">
                      <i class="el-icon-remove-outline  sub_com" @click="subAccCom('water',key)"></i>
                    </el-col>
                  </el-row>
                  <el-row>
                    <el-col :span="4">
                      <el-form-item label="上次底数">
                        <el-input v-model="form.water_data[key].last" @blur="computeWaterTotal" clearable></el-input>
                      </el-form-item>
                    </el-col>
                    <el-col :span="4">
                      <el-form-item label="本次底数">
                        <el-input v-model="form.water_data[key].now" @blur="computeWaterTotal" clearable></el-input>
                      </el-form-item>
                    </el-col>
                    <el-col :span="4">
                      <el-form-item label="单价">
                        <el-input v-model="form.water_data[key].unit_price" @blur="computeWaterTotal" clearable></el-input>
                      </el-form-item>
                    </el-col>
                    <el-col :span="4">
                      <el-form-item label="滞纳金">
                        <el-input v-model="form.water_data[key].late_payment" @blur="computeWaterTotal" clearable></el-input>
                      </el-form-item>
                    </el-col>
                    <el-col :span="4">
                      <el-form-item label="其他">
                        <el-input v-model="form.water_data[key].other" @blur="computeWaterTotal" clearable></el-input>
                      </el-form-item>
                    </el-col>
                    <el-col :span="4">
                      <el-form-item label="合计">
                        <el-input v-model="form.water_data[key].total" clearable></el-input>
                      </el-form-item>
                    </el-col>
                  </el-row>
                </div>
                <div style="text-align: center" v-if="form.water_data.length>0">
                  <el-button type="text" @click="addAccCom('water')">
                    <i class="el-icon-circle-plus"></i>添加水费认责任明细
                  </el-button>
                </div>
              </div>
              <div class="title">电费</div>
              <div class="describe_border">
                <el-row>
                  <el-col :span="8">
                    <el-form-item label="电费">
                      <el-date-picker
                          type="daterange" v-model="form.electricity_fee.time"
                          range-separator="至"
                          start-placeholder="开始日期"
                          end-placeholder="结束日期"
                          value-format="yyyy-MM-dd"></el-date-picker>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item label="总金额">
                      <el-input v-model="form.electricity_fee.total" placeholder="请输入总金额" clearable></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="4" style="text-align: right">
                    <el-button type="text" size="small" @click="showAccCom('electricity')" :disabled="form.electricity_data.length>0">
                      +添加认责组成
                    </el-button>
                  </el-col>
                </el-row>
                <div v-if="elecAccCom" v-for="(item,key) in elecAccComLength" :key="key">
                  <el-row>
                    <el-col :span="8">
                      <el-form-item label="电费">
                        <el-date-picker
                            type="daterange" v-model="form.electricity_data[key].time"
                            range-separator="至"
                            start-placeholder="开始日期"
                            end-placeholder="结束日期"
                            value-format="yyyy-MM-dd"
                            @change="timeChange('elec',key)"></el-date-picker>
                      </el-form-item>
                    </el-col>
                    <el-col :span="7">
                      <el-form-item label="认责人">
                        <el-select v-model="form.electricity_data[key].accuser" placeholder="请选择认责归属" clearable>
                          <el-option v-for="item in responsiblePersonCategory" :label="item.dictionary_name" :key="item.id"
                                     :value="item.id">{{item.dictionary_name}}
                          </el-option>
                        </el-select>
                      </el-form-item>
                    </el-col>
                    <el-col :span="7" v-if="form.electricity_data[key].accuser === 658">
                      <el-form-item label="认责人姓名">
                        <el-input v-model="form.electricity_data[key].accuser_id_name" readonly
                                  @focus="chooseStaff('electricity',key)" placeholder="请选择">
                          <template slot="append">
                            <div style="cursor: pointer;" @click="emptyStaff('electricity',key)">清空</div>
                          </template>
                        </el-input>
                      </el-form-item>
                    </el-col>
                    <el-col :span="7" v-else-if="form.electricity_data[key].accuser === 657 ||
                            form.electricity_data[key].accuser === 656 || form.electricity_data[key].accuser === 659">
                      <el-form-item label="认责人姓名">
                        <el-input placeholder="请输入"></el-input>
                      </el-form-item>
                    </el-col>
                    <el-col :span="7" v-else><span style="visibility: hidden">1</span></el-col>
                    <el-col :span="2" style="text-align:center">
                      <i class="el-icon-remove-outline  sub_com" @click="subAccCom('electricity',key)"></i>
                    </el-col>
                  </el-row>
                  <el-row>
                    <el-col :span="4">
                      <el-form-item label="(峰)上次底数">
                        <el-input v-model="form.electricity_data[key].peak_last" @blur="computeEleTotal" clearable></el-input>
                      </el-form-item>
                    </el-col>
                    <el-col :span="4">
                      <el-form-item label="本次底数">
                        <el-input v-model="form.electricity_data[key].peak_now" @blur="computeEleTotal" clearable></el-input>
                      </el-form-item>
                    </el-col>
                    <el-col :span="4">
                      <el-form-item label="单价">
                        <el-input v-model="form.electricity_data[key].peak_unit_price" @blur="computeEleTotal" clearable></el-input>
                      </el-form-item>
                    </el-col>
                    <el-col :span="4">
                      <el-form-item label="滞纳金">
                        <el-input v-model="form.electricity_data[key].peak_late_payment" @blur="computeEleTotal" clearable></el-input>
                      </el-form-item>
                    </el-col>
                    <el-col :span="4">
                      <el-form-item label="其他">
                        <el-input v-model="form.electricity_data[key].peak_other" @blur="computeEleTotal" clearable></el-input>
                      </el-form-item>
                    </el-col>
                    <el-col :span="4">
                      <el-form-item label="合计">
                        <el-input v-model="form.electricity_data[key].peak_total" clearable></el-input>
                      </el-form-item>
                    </el-col>
                  </el-row>
                  <el-row>
                    <el-col :span="4">
                      <el-form-item label="(谷)上次底数">
                        <el-input v-model="form.electricity_data[key].valley_last" @blur="computeEleTotal" clearable></el-input>
                      </el-form-item>
                    </el-col>
                    <el-col :span="4">
                      <el-form-item label="本次底数">
                        <el-input v-model="form.electricity_data[key].valley_now" @blur="computeEleTotal" clearable></el-input>
                      </el-form-item>
                    </el-col>
                    <el-col :span="4">
                      <el-form-item label="单价">
                        <el-input v-model="form.electricity_data[key].valley_unit_price" @blur="computeEleTotal" clearable></el-input>
                      </el-form-item>
                    </el-col>
                    <el-col :span="4">
                      <el-form-item label="滞纳金">
                        <el-input v-model="form.electricity_data[key].valley_late_payment" @blur="computeEleTotal" clearable></el-input>
                      </el-form-item>
                    </el-col>
                    <el-col :span="4">
                      <el-form-item label="其他">
                        <el-input v-model="form.electricity_data[key].valley_other" @blur="computeEleTotal" clearable></el-input>
                      </el-form-item>
                    </el-col>
                    <el-col :span="4">
                      <el-form-item label="合计">
                        <el-input v-model="form.electricity_data[key].valley_total" clearable></el-input>
                      </el-form-item>
                    </el-col>
                  </el-row>
                </div>
                <div style="text-align: center" v-if="form.electricity_data.length>0">
                  <el-button type="text"@click="addAccCom('electricity')">
                    <i class="el-icon-circle-plus"></i>添加电费认责任明细
                  </el-button>
                </div>
              </div>
              <div class="title">燃气费</div>
              <div class="describe_border">
                <el-row>
                  <el-col :span="8">
                    <el-form-item label="燃气费">
                      <el-date-picker
                          type="daterange" v-model="form.gas_fee.time"
                          range-separator="至"
                          start-placeholder="开始日期"
                          end-placeholder="结束日期"
                          value-format="yyyy-MM-dd"></el-date-picker>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item label="总金额">
                      <el-input v-model="form.gas_fee.total" placeholder="请输入总金额" clearable></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="4" style="text-align: right">
                    <el-button type="text" size="small" @click="showAccCom('gas')" :disabled="form.gas_data.length>0">
                      +添加认责组成
                    </el-button>
                  </el-col>
                </el-row>
                <div v-if="gasAccCom" v-for="(item,key) in gasAccComLength" :key="key">
                  <el-row>
                    <el-col :span="8">
                      <el-form-item label="燃气费">
                        <el-date-picker
                            type="daterange" v-model="form.gas_data[key].time"
                            range-separator="至"
                            start-placeholder="开始日期"
                            end-placeholder="结束日期"
                            value-format="yyyy-MM-dd"
                            @change="timeChange('gas',key)"></el-date-picker>
                      </el-form-item>
                    </el-col>
                    <el-col :span="7">
                      <el-form-item label="认责人">
                        <el-select v-model="form.gas_data[key].accuser" placeholder="请选择认责归属" clearable>
                          <el-option v-for="item in responsiblePersonCategory" :label="item.dictionary_name" :key="item.id"
                                     :value="item.id">{{item.dictionary_name}}
                          </el-option>
                        </el-select>
                      </el-form-item>
                    </el-col>
                    <el-col :span="7" v-if="form.gas_data[key].accuser === 658">
                      <el-form-item label="认责人姓名">
                        <el-input v-model="form.gas_data[key].accuser_id_name" readonly @focus="chooseStaff('gas',key)"
                                  placeholder="请选择">
                          <template slot="append">
                            <div style="cursor: pointer;" @click="emptyStaff('gas',key)">清空</div>
                          </template>
                        </el-input>
                      </el-form-item>
                    </el-col>
                    <el-col :span="7" v-else-if="form.gas_data[key].accuser === 657 ||
                            form.gas_data[key].accuser === 656 || form.gas_data[key].accuser === 659">
                      <el-form-item label="认责人姓名">
                        <el-input placeholder="请输入"></el-input>
                      </el-form-item>
                    </el-col>
                    <el-col :span="7" v-else><span style="visibility: hidden">1</span></el-col>
                    <el-col :span="2" style="text-align:center">
                      <i class="el-icon-remove-outline  sub_com" @click="subAccCom('gas',key)"></i>
                    </el-col>
                  </el-row>
                  <el-row>
                    <el-col :span="4">
                      <el-form-item label="上次底数">
                        <el-input v-model="form.gas_data[key].last" @blur="computeGasTotal" clearable></el-input>
                      </el-form-item>
                    </el-col>
                    <el-col :span="4">
                      <el-form-item label="本次底数">
                        <el-input v-model="form.gas_data[key].now" @blur="computeGasTotal" clearable></el-input>
                      </el-form-item>
                    </el-col>
                    <el-col :span="4">
                      <el-form-item label="单价">
                        <el-input v-model="form.gas_data[key].unit_price" @blur="computeGasTotal" clearable></el-input>
                      </el-form-item>
                    </el-col>
                    <el-col :span="4">
                      <el-form-item label="滞纳金">
                        <el-input v-model="form.gas_data[key].late_payment" @blur="computeGasTotal" clearable></el-input>
                      </el-form-item>
                    </el-col>
                    <el-col :span="4">
                      <el-form-item label="其他">
                        <el-input v-model="form.gas_data[key].other" @blur="computeGasTotal" clearable></el-input>
                      </el-form-item>
                    </el-col>
                    <el-col :span="4">
                      <el-form-item label="合计">
                        <el-input v-model="form.gas_data[key].total" clearable></el-input>
                      </el-form-item>
                    </el-col>
                  </el-row>
                </div>
                <div style="text-align: center" v-if="form.gas_data.length>0">
                  <el-button type="text"@click="addAccCom('gas')">
                    <i class="el-icon-circle-plus"></i>添加燃气费认责任明细
                  </el-button>
                </div>
              </div>
              <div class="title">物管费</div>
              <div class="describe_border">
                <el-row>
                  <el-col :span="8">
                    <el-form-item label="物管费">
                      <el-date-picker
                          type="daterange" v-model="form.property_management_fee.time"
                          range-separator="至"
                          start-placeholder="开始日期"
                          end-placeholder="结束日期"
                          value-format="yyyy-MM-dd"></el-date-picker>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item label="总金额">
                      <el-input v-model="form.property_management_fee.total" placeholder="请输入总金额" clearable></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="4" style="text-align: right">
                    <el-button type="text" size="small" @click="showAccCom('prop')" :disabled="form.property_management_data.length>0">
                      +添加认责组成
                    </el-button>
                  </el-col>
                </el-row>
                <div v-if="propAccCom" v-for="(item,key) in propAccComLength" :key="key">
                  <el-row>
                    <el-col :span="8">
                      <el-form-item label="物管费">
                        <el-date-picker
                            type="daterange" v-model="form.property_management_data[key].time"
                            range-separator="至"
                            start-placeholder="开始日期"
                            end-placeholder="结束日期"
                            value-format="yyyy-MM-dd"
                            @change="timeChange('prop',key)"></el-date-picker>
                      </el-form-item>
                    </el-col>
                    <el-col :span="7">
                      <el-form-item label="认责人">
                        <el-select v-model="form.property_management_data[key].accuser" placeholder="请选择认责归属" clearable>
                          <el-option v-for="item in responsiblePersonCategory" :label="item.dictionary_name" :key="item.id"
                                     :value="item.id">{{item.dictionary_name}}
                          </el-option>
                        </el-select>
                      </el-form-item>
                    </el-col>
                    <el-col :span="7" v-if="form.property_management_data[key].accuser === 658">
                      <el-form-item label="认责人姓名">
                        <el-input v-model="form.property_management_data[key].accuser_id_name" readonly
                                  @focus="chooseStaff('prop',key)" placeholder="请选择">
                          <template slot="append">
                            <div style="cursor: pointer;" @click="emptyStaff('prop',key)">清空</div>
                          </template>
                        </el-input>
                      </el-form-item>
                    </el-col>
                    <el-col :span="7" v-else-if="form.property_management_data[key].accuser === 657 ||
                            form.property_management_data[key].accuser === 656 || form.property_management_data[key].accuser === 659">
                      <el-form-item label="认责人姓名">
                        <el-input placeholder="请输入"></el-input>
                      </el-form-item>
                    </el-col>
                    <el-col :span="7" v-else><span style="visibility: hidden">1</span></el-col>
                    <el-col :span="2" style="text-align:center">
                      <i class="el-icon-remove-outline  sub_com" @click="subAccCom('prop',key)"></i>
                    </el-col>
                  </el-row>
                  <!--<el-row>-->
                    <!--<el-col :span="8">-->
                      <!--<el-form-item label="上次时间">-->
                        <!--<el-date-picker type="date" value-format="yyyy-MM-dd"-->
                                        <!--v-model="form.property_management_data[key].last"-->
                                        <!--placeholder="请选择日期"></el-date-picker>-->
                      <!--</el-form-item>-->
                    <!--</el-col>-->
                    <!--<el-col :span="8">-->
                      <!--<el-form-item label="本次时间">-->
                        <!--<el-date-picker type="date" value-format="yyyy-MM-dd"-->
                                        <!--v-model="form.property_management_data[key].now"-->
                                        <!--placeholder="请选择日期"></el-date-picker>-->
                      <!--</el-form-item>-->
                    <!--</el-col>-->
                  <!--</el-row>-->
                  <el-row>
                    <el-col :span="4">
                      <el-form-item label="公摊水费">
                        <el-input v-model="form.property_management_data[key].water" @blur="computePropertyTotal" clearable></el-input>
                      </el-form-item>
                    </el-col>
                    <el-col :span="4">
                      <el-form-item label="公摊电费">
                        <el-input v-model="form.property_management_data[key].electricity" @blur="computePropertyTotal" clearable></el-input>
                      </el-form-item>
                    </el-col>
                    <el-col :span="4">
                      <el-form-item label="物业费">
                        <el-input v-model="form.property_management_data[key].fees" @blur="computePropertyTotal" clearable></el-input>
                      </el-form-item>
                    </el-col>
                    <el-col :span="4">
                      <el-form-item label="其他">
                        <el-input v-model="form.property_management_data[key].other" @blur="computePropertyTotal" clearable></el-input>
                      </el-form-item>
                    </el-col>
                    <el-col :span="4">
                      <el-form-item label="合计">
                        <el-input v-model="form.property_management_data[key].total" clearable></el-input>
                      </el-form-item>
                    </el-col>
                  </el-row>
                </div>
                <div style="text-align: center" v-if="form.property_management_data.length>0">
                  <el-button type="text"@click="addAccCom('prop')">
                    <i class="el-icon-circle-plus"></i>添加物管费认责任明细
                  </el-button>
                </div>
              </div>
              <el-row>
                <el-col :span="24">
                  <el-form-item label="截图">
                    <Upload :ID="'result'" @getImg="getResultImage" :editImage="picResultImg" :isClear="isClear"></Upload>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="16">
                  <el-form-item label="备注">
                    <el-input type="textarea" v-model="form.remark"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
            </el-form>
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
              <Upload :ID="'comment_pic'" :isClear="isClear" @getImg="getImg"></Upload>
            </el-form-item>
            <el-form-item label="上传视频">
              <Upload :ID="'comment_video'" :isClear="isClear" @getImg="getImg"></Upload>
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
        <el-button size="small" @click="reimResultDialogVisible = false">取 消</el-button>
        <el-button size="small" type="warning" @click="confirmAdd(0)">拒 绝</el-button>
        <el-button size="small" type="primary" @click="confirmAdd(1)">保 存</el-button>
        <el-button size="small" type="primary" @click="confirmAdd(2)">保存并提交</el-button>
        <el-button size="small" type="primary" @click="commentVisible = true">评 论</el-button>
      </span>
    </el-dialog>
    <Organization :organizationDialog="organizationDialog" :type="organizeType" @close="closeOrganization"
                  @selectMember="selectMember"></Organization>
  </div>
</template>

<script>
  import Organization from '../../../common/organization';
  import Upload from '../../../common/UPLOAD.vue';

  export default {
    props: ['reimResultDialog', 'reimbursementId', 'type', 'resultId'],
    components: {Organization, Upload},
    data() {
      return {
        reimDetail: {},
        reimResultDialogVisible: false,
        organizationDialog: false,
        organizeType: '',
        isClear: false,
        uploadStatus: false,
        form: {
          reimbursement_id: '',                                   //维修单id
          water_fee: {time: [], total: '',},                      //水费
          water_data: [],
          electricity_fee: {time: [], total: '',},                //电费
          electricity_data: [],
          gas_fee: {time: [], total: '',},                        //燃气费
          gas_data: [],
          property_management_fee: {time: [], total: '',},        //物管费
          property_management_data: [],
          image_pic: [],                                          //截图
          remark: '',                                             //备注
        },
        picResultImg: {},
        reimbursementTypeCategory: [],                            //报销类型
        reimbursementSourceCategory: [],                          //报销来源
        finishedStatusCategory: [],                               //完成情况
        responsiblePersonCategory: [],                            //认责人

        resultTitle: this.type === 'add' ? '新增报销结果' : '编辑报销结果',

        waterAccCom: false,                                       //水费认责组成
        waterAccComLength: 1,                                     //水费认责组成的长度
        waterKey: '',                                             //当前选中的水费认责组成
        elecKey: '',
        gasKey: '',
        propKey: '',

        elecAccCom: false,
        elecAccComLength: 1,

        gasAccCom: false,
        gasAccComLength: 1,

        propAccCom: false,
        propAccComLength: 1,
        currentOrganize: '',                                       //当前选人组件被谁打开  water/elec/gas/prop

        commentVisible : false,   //评论
        isUpload: false,
        isClick: false,
        commentParams : {
          content : '',
          parent_id : 0,
          image_pic :[],
          video_file : [],
        },
        commentList : [],
        isDictionary : false,
      };
    },
    watch: {
      commentVisible(val){
        this.isClear = !this.isClear;
      },
      waterAccComLength(val, oldVal) {
        if (val < oldVal || val - 2 < 0) {
          return;
        }
        let data = this.form.water_data;
        for (let i = val - 2; i < val; i++) {
          if ((i + 1) < val) {
            data[i + 1].time = [];
            if (data[i].time && data[i].time.length > 0) {
              data[i + 1].time[0] = data[i + 1].time[1] = data[i].time[1];
              this.form.water_data = data;
            }
          }
        }
      },
      elecAccComLength(val, oldVal) {
        if (val < oldVal || val - 2 < 0) {
          return;
        }
        let data = this.form.electricity_data;
        for (let i = val - 2; i < val; i++) {
          if ((i + 1) < val) {
            data[i + 1].time = [];
            if (data[i].time && data[i].time.length > 0) {
              data[i + 1].time[0] = data[i + 1].time[1] = data[i].time[1];
              this.form.electricity_data = data;
            }
          }
        }
      },
      gasAccComLength(val, oldVal) {
        if (val < oldVal || val - 2 < 0) {
          return;
        }
        let data = this.form.gas_data;
        for (let i = val - 2; i < val; i++) {
          if ((i + 1) < val) {
            data[i + 1].time = [];
            if (data[i].time && data[i].time.length > 0) {
              data[i + 1].time[0] = data[i + 1].time[1] = data[i].time[1];
              this.form.gas_data = data;
            }
          }
        }
      },
      propAccComLength(val, oldVal) {
        if (val < oldVal || val - 2 < 0) {
          return;
        }
        let data = this.form.property_management_data;
        for (let i = val - 2; i < val; i++) {
          if ((i + 1) < val) {
            data[i + 1].time = [];
            if (data[i].time && data[i].time.length > 0) {
              data[i + 1].time[0] = data[i + 1].time[1] = data[i].time[1];
              this.form.property_management_data = data;
            }
          }
        }
      },
      reimResultDialog(val) {
        this.reimResultDialogVisible = val;
      },
      reimResultDialogVisible(val) {
        if (!val) {
          this.$emit('close');
          this.initData();
          this.reimDetail = {};
        } else {
          this.getDetail();
          if (this.type === 'add') {
            this.resultTitle = '新增报销结果';
          } else if (this.type === 'edit') {
            this.resultTitle = '编辑报销结果';
            if (this.reimbursementId) {
              this.getReimResultDetail();
            }
          }
          this.isClear = false;
          this.form.reimbursement_id = this.reimbursementId;
          if(!this.isDictionary){
            this.getDictionary()
          }
        }
      },
    },

    methods: {
      //获取字典
      getDictionary() {
        this.dictionary(640).then((res) => {  //报销类型
          this.reimbursementTypeCategory = res.data;
          this.isDictionary = true;
        });
        this.dictionary(641).then((res) => {  //报销来源
          this.reimbursementSourceCategory = res.data;
          this.isDictionary = true;
        });
        this.dictionary(642).then((res) => {  //完成情况
          this.finishedStatusCategory = res.data;
          this.isDictionary = true;
        });
        this.dictionary(643, 1).then((res) => {  //认责人
          this.responsiblePersonCategory = res.data;
          this.isDictionary = true;
        });
      },
      //获取报销详情
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
      //计算费用明细总和
      computeWaterTotal(){
        for (let i = 0; i < this.form.water_data.length; i++) {
          let now = Number(this.form.water_data[i].now);
          let last = Number(this.form.water_data[i].last);
          let unit_price = Number(this.form.water_data[i].unit_price);
          let late_payment = Number(this.form.water_data[i].late_payment);
          let other = Number(this.form.water_data[i].other);
          this.form.water_data[i].total = (now - last) * unit_price + late_payment + other;
        }
      },
      computeEleTotal(){
        let val = this.form.electricity_data;
        for (let i = 0; i < val.length; i++) {
          let now = Number(val[i].peak_now);
          let last = Number(val[i].peak_last);
          let unit_price = Number(val[i].peak_unit_price);
          let late_payment = Number(val[i].peak_late_payment);
          let other = Number(val[i].peak_other);
          val[i].peak_total = (now - last) * unit_price + late_payment + other;
          let valley_now = Number(val[i].valley_now);
          let valley_last = Number(val[i].valley_last);
          let valley_unit_price = Number(val[i].valley_unit_price);
          let valley_late_payment = Number(val[i].valley_late_payment);
          let valley_other = Number(val[i].valley_other);
          val[i].valley_total = (valley_now - valley_last) * valley_unit_price + valley_late_payment + valley_other;
          if (!val[i].time) {
            val[i].time = [];
          }
        }
      },
      computeGasTotal(){
        let val = this.form.gas_data;
        for (let i = 0; i < val.length; i++) {
          let now = Number(val[i].now);
          let last = Number(val[i].last);
          let unit_price = Number(val[i].unit_price);
          let late_payment = Number(val[i].late_payment);
          let other = Number(val[i].other);
          val[i].total = (now - last) * unit_price + late_payment + other;
          if (!val[i].time) {
            val[i].time = [];
          }
        }
      },
      computePropertyTotal(){
        let val = this.form.property_management_data;
        for (let i = 0; i < val.length; i++) {
          let water = Number(val[i].water);
          let electricity = Number(val[i].electricity);
          let fees = Number(val[i].fees);
          let other = Number(val[i].other);
          val[i].total = water + electricity + fees + other;
          if (!val[i].time) {
            val[i].time = [];
          }
        }
      },
      //关于时间的 我也不知道什么鬼
      timeChange(k, n) {
        switch (k) {
          case 'water':
            let data = this.form.water_data;
            for (let i = n; i < this.waterAccComLength; i++) {
              if ((i + 1) < this.waterAccComLength) {
                data[i + 1].time = [];
                if (data[i].time && data[i].time.length > 0) {
                  data[i + 1].time[0] = data[i + 1].time[1] = data[i].time[1];
                  this.form.water_data = data;
                }
              }
            }
            break;
          case 'elec':
            let data1 = this.form.electricity_data;
            for (let i = n; i < this.elecAccComLength; i++) {
              if ((i + 1) < this.elecAccComLength) {
                data1[i + 1].time = [];
                if (data1[i].time && data1[i].time.length > 0) {
                  data1[i + 1].time[0] = data1[i + 1].time[1] = data1[i].time[1];
                  this.form.electricity_data = data1;
                }
              }
            }
            break;
          case 'gas':
            let data2 = this.form.gas_data;
            for (let i = n; i < this.gasAccComLength; i++) {
              if ((i + 1) < this.gasAccComLength) {
                data2[i + 1].time = [];
                if (data2[i].time && data2[i].time.length > 0) {
                  data2[i + 1].time[0] = data2[i + 1].time[1] = data2[i].time[1];
                  this.form.gas_data = data2;
                }
              }
            }
            break;
          case 'prop':
            let data3 = this.form.property_management_data;
            for (let i = n; i < this.propAccComLength; i++) {
              if ((i + 1) < this.propAccComLength) {
                data3[i + 1].time = [];
                if (data3[i].time && data3[i].time.length > 0) {
                  data3[i + 1].time[0] = data3[i + 1].time[1] = data3[i].time[1];
                  this.form.property_management_data = data3;
                }
              }
            }
            break;
        }

      },

      //这个是添加认责组成
      showAccCom(val) {
        let data = {
          // time: [],
          accuser: '',  //认责人下拉框
          accuser_id: '',  // 认责人id
          accuser_id_name: '',   //认责人姓名
          last: '',  //上次底数
          now: '',  //本次底数
          unit_price: '',  //单价
          late_payment: '',  //滞纳金
          other: '',   //其他
          total: '',  //合计
        };
        switch (val) {
          case 'water':
            this.waterAccCom = true;
            this.waterAccComLength = 1;
            this.form.water_data = [];
            this.form.water_data.push(data);
            this.$set(this.form.water_data[0], 'time', []);
            break;
          case 'electricity':
            this.elecAccCom = true;
            this.elecAccComLength = 1;
            this.form.electricity_data = [];
            let elecData = {
              // time: [],
              accuser: '',
              accuser_id: '',  // 认责人id
              accuser_id_name: '',   //认责人姓名
              peak_last: '',
              peak_now: '',
              peak_unit_price: '',
              peak_late_payment: '',
              peak_other: '',
              peak_total: '',
              valley_last: '',
              valley_now: '',
              valley_unit_price: '',
              valley_late_payment: '',
              valley_other: '',
              valley_total: '',
            };
            this.form.electricity_data.push(elecData);
            this.$set(this.form.electricity_data[0], 'time', []);
            break;
          case 'gas':
            this.gasAccCom = true;
            this.gasAccComLength = 1;
            this.form.gas_data = [];
            this.form.gas_data.push(data);
            this.$set(this.form.gas_data[0], 'time', []);
            break;
          case 'prop':
            this.propAccCom = true;
            this.propAccComLength = 1;
            this.form.property_management_data = [];
            let propData = {
              time: [],
              accuser: '',
              accuser_id: '',  // 认责人id
              accuser_id_name: '',   //认责人姓名
              // last: '',
              // now: '',
              water: '',
              electricity: '',
              fees: '',
              other: '',
              total: '',
            };
            this.form.property_management_data.push(propData);
            this.$set(this.form.property_management_data[0], 'time', []);
            break;
        }

      },
      //添加一项认责组成
      addAccCom(val) {
        let data = {
          // time: [],
          accuser: '',  //认责人下拉框
          accuser_id: '',  // 认责人id
          accuser_id_name: '',   //认责人姓名
          last: '',  //上次底数
          now: '',  //本次底数
          unit_price: '',  //单价
          late_payment: '',  //滞纳金
          other: '',   //其他
          total: '',  //合计
        };
        switch (val) {
          case 'water':
            this.waterAccComLength++;
            this.form.water_data.push(data);
            this.$set(this.form.water_data[this.waterAccComLength - 1], 'time', []);
            break;
          case 'electricity':
            this.elecAccComLength++;
            let elecData = {
              // time: [],
              accuser: '',
              accuser_id: '',  // 认责人id
              accuser_id_name: '',   //认责人姓名
              peak_last: '',
              peak_now: '',
              peak_unit_price: '',
              peak_late_payment: '',
              peak_other: '',
              peak_total: '',
              valley_last: '',
              valley_now: '',
              valley_unit_price: '',
              valley_late_payment: '',
              valley_other: '',
              valley_total: '',
            };
            this.form.electricity_data.push(elecData);
            this.$set(this.form.electricity_data[this.elecAccComLength - 1], 'time', []);
            break;
          case 'gas':
            this.gasAccComLength++;
            this.form.gas_data.push(data);
            this.$set(this.form.gas_data[this.gasAccComLength - 1], 'time', []);
            break;
          case 'prop':
            this.propAccComLength++;
            let propData = {
              // time: [],
              accuser: '',
              accuser_id: '',  // 认责人id
              accuser_id_name: '',   //认责人姓名
              // last: '',
              // now: '',
              water: '',
              electricity: '',
              fees: '',
              other: '',
              total: '',
            };
            this.form.property_management_data.push(propData);
            this.$set(this.form.property_management_data[this.propAccComLength - 1], 'time', []);
            break;
        }
      },
      //删除一项认责组成
      subAccCom(val, key) {
        switch (val) {
          case 'water':
            this.waterAccComLength--;
            this.form.water_data.splice(key, 1);
            break;
          case 'electricity':
            this.elecAccComLength--;
            this.form.electricity_data.splice(key, 1);
            break;
          case 'gas':
            this.gasAccComLength--;
            this.form.gas_data.splice(key, 1);
            break;
          case 'prop':
            this.propAccComLength--;
            this.form.property_management_data.splice(key, 1);
            break;
        }
      },

      //上传图片回调
      getResultImage(val) {
        this.form.image_pic = val[1]; //选择的图片数组ids
        this.uploadStatus = val[2];
      },
      //获取报销单编号
      getNumber() {
        this.$http.get(globalConfig.server + 'customer/reimbursement/last').then((res) => {
          if (res.data.code === '30050') {
            this.form.reimbursement_number = res.data.data;
          }
        });
      },
      //获取报销单详情
      getReimResultDetail() {
        this.$http.get(globalConfig.server + 'customer/reimbursement_result/' + this.reimbursementId).then((res) => {
          if (res.data.code === '40020') {
            let detail = res.data.data;
            if (detail) {
              this.form.water_fee = detail.water_fee;
              this.form.water_data = detail.water_data;
              this.waterAccComLength = detail.water_data.length;
              this.waterAccCom = detail.water_data.length > 0;

              this.form.electricity_fee = detail.electricity_fee;
              this.form.electricity_data = detail.electricity_data;
              this.elecAccComLength = detail.electricity_data.length;
              this.elecAccCom = detail.electricity_data.length > 0;

              this.form.gas_fee = detail.gas_fee;
              this.form.gas_data = detail.gas_data;
              this.gasAccComLength = detail.gas_data.length;
              this.gasAccCom = detail.gas_data.length > 0;

              this.form.property_management_fee = detail.property_management_fee;
              this.form.property_management_data = detail.property_management_data;
              this.propAccComLength = detail.property_management_data.length;
              this.propAccCom = detail.property_management_data.length > 0;

              this.form.remark = detail.remark;
              let pic = detail.album.image_pic;
              this.form.image_pic = [];
              let picObject = {};
              pic.forEach((item) => {
                this.form.image_pic.push(item.id);
                picObject[item.id] = item.uri;
              });
              this.picResultImg = picObject;
            }

          }
        });
      },

      //保存 || 保存并提交
      confirmAdd(val) {
        this.form.status = val;
        if (this.type === 'edit') {
          //编辑
          this.$http.put(globalConfig.server + 'customer/reimbursement_result/' + this.reimbursementId, this.form).then((res) => {
            if (res.data.code === '40030') {
              this.$notify.success({
                title: '成功',
                message: res.data.msg
              });
              if(this.form.status == 0){
                this.commentVisible = true;
                this.$emit('close','onlyRenovate');
              }else {
                this.reimResultDialogVisible = false;
              }
            } else {
              this.$notify.warning({
                title: '警告',
                message: res.data.msg
              });
            }
          });
        } else if (this.type === 'add') {
          //新增
          this.$http.post(globalConfig.server + 'customer/reimbursement_result', this.form).then((res) => {
            if (res.data.code === '40010') {
              this.$notify.success({
                title: '成功',
                message: res.data.msg
              });
              if(this.form.status == 0){
                this.commentVisible = true;
              }else {
                this.reimResultDialogVisible = false;
              }
            } else {
              this.$notify.warning({
                title: '警告',
                message: res.data.msg
              });
            }
          });
        }
      },
      //初始化数据
      initData() {
        this.form = {
          reimbursement_id: '',
          water_fee: {
            time: [],
            total: '',
          },
          water_data: [],
          electricity_fee: {
            time: [],
            total: '',
          },
          electricity_data: [],
          gas_fee: {
            time: [],
            total: '',
          },
          gas_data: [],
          property_management_fee: {
            time: [],
            total: '',
          },
          property_management_data: [],
          image_pic: '',
          remark: '',
        };
        this.waterAccCom = false;
        this.waterAccComLength = 1;
        this.elecAccCom = false;
        this.elecAccComLength = 1;
        this.gasAccCom = false;
        this.gasAccComLength = 1;
        this.propAccCom = false;
        this.propAccComLength = 1;
        this.isClear = true;
        this.picResultImg = {};

      },
      closeOrganization() {
        this.organizeType = '';
        this.organizationDialog = false;
      },
      selectMember(val) {
        switch (this.currentOrganize) {
          case 'water':
            this.form.water_data[this.waterKey].accuser_id_name = val[0].name;
            this.form.water_data[this.waterKey].accuser_id = val[0].id;
            break;
          case 'electricity':
            this.form.electricity_data[this.elecKey].accuser_id_name = val[0].name;
            this.form.electricity_data[this.elecKey].accuser_id = val[0].id;
            break;
          case 'gas':
            this.form.gas_data[this.gasKey].accuser_id_name = val[0].name;
            this.form.gas_data[this.gasKey].accuser_id = val[0].id;
            break;
          case 'prop':
            this.form.property_management_data[this.propKey].accuser_id_name = val[0].name;
            this.form.property_management_data[this.propKey].accuser_id = val[0].id;
            break;
        }

      },
      chooseStaff(val, key) {
        this.organizationDialog = true;
        this.organizeType = 'staff';
        if (val === 'water') {
          this.currentOrganize = 'water';
          this.waterKey = key;
        } else if (val === 'electricity') {
          this.currentOrganize = 'electricity';
          this.elecKey = key;
        } else if (val === 'gas') {
          this.currentOrganize = 'gas';
          this.gasKey = key;
        } else if (val === 'prop') {
          this.currentOrganize = 'prop';
          this.propKey = key;
        }
      },
      //清空认责人
      emptyStaff(val, key) {
        if (val === 'water') {
          this.form.water_data[key].accuser_id_name = '';
          this.form.water_data[key].accuser_id = '';
        } else if (val === 'electricity') {
          this.form.electricity_data[key].accuser_id_name = '';
          this.form.electricity_data[key].accuser_id = '';
        } else if (val === 'gas') {
          this.form.gas_data[key].accuser_id_name = '';
          this.form.gas_data[key].accuser_id = '';
        } else if (val === 'prop') {
          this.form.property_management_data[key].accuser_id_name = '';
          this.form.property_management_data[key].accuser_id = '';
        }
      },
      /************************type转化为字符串*******************************/
      arrSplitToArray(json){
        let arr = [];
        json.forEach(item=>{
          arr.push(item.dictionary_name);
        });
        return arr;
      },
      //************************评论信息*******************************//
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
    },
  }
</script>
<style lang="scss" scoped="">
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

  .add_com {
    color: #409eff;
    font-size: 18px;
    vertical-align: middle;
    cursor: pointer;
  }

  .sub_com {
    color: #409eff;
    font-size: 18px;
    vertical-align: middle;
    margin-left: 10px;
    cursor: pointer;
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
