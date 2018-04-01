<template>
  <div id="addHouseResources">
    <el-dialog title="登记房源" :visible.sync="addHouseResourcesDialogVisible" width="60%">
      <div>
        <el-tabs v-model="activeName">
          <el-tab-pane label="房源信息" name="first">
            <div class="form_border">
              <el-form size="mini" :model="params" label-width="100px">
                <el-row >
                  <el-col :span="6">
                    <el-form-item label="小区名称" required>
                      <el-input placeholder="请输入内容" v-model="community_name" @focus="openVillageModal" readonly=""></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="6">
                    <el-form-item label="小区地址" required>
                      <el-input placeholder="请输入内容" v-model="community_address" disabled=""></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="6">
                    <el-form-item label="小区别名">
                      <el-input placeholder="请输入内容" v-model="params.community_nickname"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="6">
                    <el-form-item label="丘号">
                      <el-input placeholder="请输入内容" v-model="params.mound_number"></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="12">
                    <el-form-item label="门牌地址" required>
                      <el-col :span="8" style="padding-right: 10px">
                        <el-input placeholder="座/栋" v-model="params.building"></el-input>
                      </el-col>
                      <el-col :span="8" style="padding-right: 10px">
                        <el-input placeholder="单元" v-model="params.unit"></el-input>
                      </el-col>
                      <el-col :span="8">
                        <el-input placeholder="门牌号" v-model="params.doorplate"></el-input>
                      </el-col>
                    </el-form-item>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item label="房型">
                      <el-col :span="8" style="padding-right: 10px">
                        <el-select clearable v-model="params.house_type[0]" placeholder="室" value="">
                          <el-option label="一室" value="1"></el-option>
                          <el-option label="二室" value="2"></el-option>
                          <el-option label="三室" value="3"></el-option>
                          <el-option label="四室" value="4"></el-option>
                          <el-option label="五室" value="5"></el-option>
                          <el-option label="六室" value="6"></el-option>
                          <el-option label="七室" value="7"></el-option>
                          <el-option label="八室" value="8"></el-option>
                        </el-select>
                      </el-col>
                      <el-col :span="8" style="padding-right: 10px">
                        <el-select clearable v-model="params.house_type[1]" placeholder="厅" value="">
                          <el-option label="一厅" value="1"></el-option>
                          <el-option label="二厅" value="2"></el-option>
                          <el-option label="三厅" value="3"></el-option>
                          <el-option label="四厅" value="4"></el-option>
                          <el-option label="五厅" value="5"></el-option>
                        </el-select>
                      </el-col>
                      <el-col :span="8">
                        <el-select clearable v-model="params.house_type[2]" placeholder="卫" value="">
                          <el-option label="一卫" value="1"></el-option>
                          <el-option label="二卫" value="2"></el-option>
                          <el-option label="三卫" value="3"></el-option>
                          <el-option label="四卫" value="4"></el-option>
                          <el-option label="五卫" value="5"></el-option>
                        </el-select>
                      </el-col>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row >
                  <el-col :span="6">
                    <el-form-item label="房产证号" required>
                      <el-input placeholder="请输入内容" v-model="params.property_number"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="6">
                    <el-form-item label="建筑面积" required>
                      <el-input placeholder="请输入内容" v-model="params.area"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="6">
                    <el-form-item label="装修">
                      <el-select clearable v-model="params.decorate" placeholder="请选择装修类型" value="">
                        <el-option v-for="item in decorate_dic" :label="item.dictionary_name" :value="item.id" :key="item.id"></el-option>
                      </el-select>
                    </el-form-item>
                  </el-col>
                  <el-col :span="6">
                    <el-form-item label="楼层" required>
                      <el-col :span="10">
                        <el-input placeholder="楼层" v-model="params.floor"></el-input>
                      </el-col>
                      <el-col :span="4" style="text-align: center">
                        /
                      </el-col>
                      <el-col :span="10">
                        <el-input placeholder="总楼层" v-model="params.floors"></el-input>
                      </el-col>
                    </el-form-item>
                  </el-col>
                </el-row>

                <el-row >
                  <el-col :span="6">
                    <el-form-item label="房屋类型">
                      <el-select clearable v-model="params.property_type" placeholder="请选择房屋类型" value="">
                        <el-option v-for="item in property_type_dic" :label="item.dictionary_name" :value="item.id" :key="item.id"></el-option>
                      </el-select>
                    </el-form-item>
                  </el-col>
                  <el-col :span="6">
                    <el-form-item label="房屋特色">
                      <el-select clearable v-model="params.house_feature" placeholder="请选择房屋特色" value="">
                        <el-option v-for="item in house_feature_dic" :label="item.dictionary_name" :value="item.id" :key="item.id"></el-option>
                      </el-select>
                    </el-form-item>
                  </el-col>
                </el-row>

                <!--<el-row >-->
                  <!--<el-col :span="6">-->
                    <!--<el-form-item label="水表卡号" required>-->
                      <!--<el-input placeholder="请输入内容">换房</el-input>-->
                    <!--</el-form-item>-->
                  <!--</el-col>-->
                  <!--<el-col :span="6">-->
                    <!--<el-form-item label="燃气表卡号" required>-->
                      <!--<el-input placeholder="请输入内容">换房</el-input>-->
                    <!--</el-form-item>-->
                  <!--</el-col>-->
                  <!--<el-col :span="6">-->
                    <!--<el-form-item label="电表卡号" required>-->
                      <!--<el-input placeholder="请输入内容"></el-input>-->
                    <!--</el-form-item>-->
                  <!--</el-col>-->
                  <!--<el-col :span="6">-->
                    <!--<el-form-item label="卫生情况">-->
                      <!--<el-select clearable v-model="params.region" placeholder="请选择卫生情况">-->
                        <!--<el-option label="一般" value="shanghai"></el-option>-->
                        <!--<el-option label="良好" value="beijing"></el-option>-->
                      <!--</el-select>-->
                    <!--</el-form-item>-->
                  <!--</el-col>-->
                <!--</el-row>-->

                <!--<el-row>-->
                  <!--<el-col :span="12">-->
                    <!--<el-form-item label="配套设施">-->
                      <!--<el-input type="textarea"></el-input>-->
                    <!--</el-form-item>-->
                  <!--</el-col>-->
                  <!--<el-col :span="12">-->
                    <!--<el-form-item label="备注">-->
                      <!--<el-input type="textarea"></el-input>-->
                    <!--</el-form-item>-->
                  <!--</el-col>-->
                <!--</el-row>-->
              </el-form>
            </div>
          </el-tab-pane>
          <el-tab-pane label="房东信息" name="second">
            <div class="scroll_bar">
              <div v-for="item in customersAmount">
                <div style="display: flex;justify-content: space-between">
                  <div class="title" v-if="item == 1">房东信息</div>
                  <div class="title" v-else="">附属房东信息({{item-1}})</div>
                  <div v-if="item>1" class="deleteNumber" @click="deleteCustoms(item-1)">删除</div>
                </div>
                <div class="form_border">
                  <el-form size="mini" :model="params" label-width="100px">
                    <el-row >
                      <el-col :span="8">
                        <el-form-item label="姓名" required>
                          <el-input placeholder="请输入内容" v-model="nameArray[item-1]"></el-input>
                        </el-form-item>
                      </el-col>
                      <el-col :span="8">
                        <el-form-item label="尊称" required>
                          <el-radio-group v-model="sexArray[item-1]">
                            <el-radio label="1">先生</el-radio>
                            <el-radio label="2">女士</el-radio>
                          </el-radio-group>
                        </el-form-item>
                      </el-col>
                      <el-col :span="8">
                        <el-form-item label="联系电话" required>
                          <el-input placeholder="请输入内容" v-model="phoneArray[item-1]"></el-input>
                        </el-form-item>
                      </el-col>
                    </el-row>
                    <el-row >
                      <el-col :span="8">
                        <el-form-item label="证件类型">
                          <el-select clearable v-model="id_typeArray[item-1]" placeholder="请选择装修类型" value="">
                            <el-option v-for="item in id_type_dic" :label="item.dictionary_name" :value="item.id" :key="item.id"></el-option>
                          </el-select>
                        </el-form-item>
                      </el-col>
                      <el-col :span="8">
                        <el-form-item label="证件号码" required>
                          <el-input placeholder="请输入内容" v-model="id_numberArray[item-1]"></el-input>
                        </el-form-item>
                      </el-col>
                    </el-row>
                  </el-form>
                </div>
              </div>
              <div style="text-align: center">
                <el-button type="text" @click="addMoreCustoms">
                  <i class="el-icon-circle-plus"></i>新增附属房东信息
                </el-button>
              </div>
            </div>
          </el-tab-pane>
          <el-tab-pane label="合同信息" name="third">
            <div class="scroll_bar">
              <div class="form_border ">
                <el-form size="mini" :model="params" label-width="100px">
                  <el-row >
                    <el-col :span="6">
                      <el-form-item label="订单性质">
                        <el-select clearable v-model="params.contract_type" placeholder="请选择订单性质" value="">
                          <el-option v-for="item in contract_type_dic" :label="item.dictionary_name" :value="item.id" :key="item.id"></el-option>
                        </el-select>
                      </el-form-item>
                    </el-col>
                    <el-col :span="6">
                      <el-form-item label="合同编号" required>
                        <el-input placeholder="请输入内容" v-model="params.contract_number"></el-input>
                      </el-form-item>
                    </el-col>
                    <el-col :span="6">
                      <el-form-item label="签约时长" required>
                        <el-col :span="12" style="padding-right: 10px">
                          <el-input placeholder="月数" v-model="params.month"></el-input>
                        </el-col>
                        <el-col :span="12">
                          <el-input placeholder="天数" v-model="params.day"></el-input>
                        </el-col>
                      </el-form-item>
                    </el-col>
                    <el-col :span="6">
                      <el-form-item label="签约日期">
                        <el-date-picker value-format="yyyy-MM-dd" type="date" placeholder="选择日期" v-model="params.sign_date"></el-date-picker>
                      </el-form-item>
                    </el-col>
                  </el-row>

                  <el-row >
                    <el-col :span="6">
                      <el-form-item label="合同开始时间">
                        <el-date-picker value-format="yyyy-MM-dd" type="date" placeholder="选择日期" v-model="params.begin_date"></el-date-picker>
                      </el-form-item>
                    </el-col>
                    <el-col :span="6">
                      <el-form-item label="合同结束时间">
                        <el-date-picker value-format="yyyy-MM-dd" type="date" placeholder="选择日期" v-model="params.end_date"></el-date-picker>
                      </el-form-item>
                    </el-col>
                    <el-col :span="6">
                      <el-form-item label="空置开始时间">
                        <el-date-picker value-format="yyyy-MM-dd" type="date" placeholder="选择日期" disabled="" v-model="params.begin_date"></el-date-picker>
                      </el-form-item>
                    </el-col>
                    <el-col :span="6">
                      <el-form-item label="空置结束时间">
                        <el-date-picker value-format="yyyy-MM-dd" type="date" placeholder="选择日期" disabled="" v-model="params.vacancy_end_date"></el-date-picker>
                      </el-form-item>
                    </el-col>
                  </el-row>
                  <el-row>
                    <el-col :span="6">
                      <el-form-item label="空置期天数">
                        <el-input placeholder="请输入内容" v-model="params.vacancy"></el-input>
                      </el-form-item>
                    </el-col>
                    <el-col :span="6">
                      <el-form-item label="空置安置方式" required>
                        <el-select clearable v-model="params.vacancy_way" placeholder="请选择安置方式" value="">
                          <el-option v-for="item in vacancy_way_dic" :label="item.dictionary_name" :value="item.id" :key="item.id"></el-option>
                        </el-select>
                      </el-form-item>
                    </el-col>
                    <el-col :span="6">
                      <el-form-item label="保修期">
                        <el-col :span="12" style="padding-right: 10px">
                          <el-input placeholder="月数" v-model="params.warranty_month"></el-input>
                        </el-col>
                        <el-col :span="12">
                          <el-input placeholder="天数" v-model="params.warranty_day"></el-input>
                        </el-col>
                      </el-form-item>
                    </el-col>
                  </el-row>

                  <el-row>
                    <el-col :span="6">
                      <el-form-item label="订单来源">
                        <el-select clearable v-model="params.from" placeholder="请选择订单来源" value="">
                          <el-option v-for="item in from_dic" :label="item.dictionary_name" :value="item.id" :key="item.id"></el-option>
                        </el-select>
                      </el-form-item>
                    </el-col>
                    <el-col :span="6">
                      <el-form-item label="押金" required>
                        <el-input placeholder="请输入内容" v-model="params.deposit"></el-input>
                      </el-form-item>
                    </el-col>
                  </el-row>

                  <!--<el-row>-->
                    <!--<el-col :span="6">-->
                      <!--<el-form-item label="月单价">-->
                        <!--<el-input placeholder="请输入内容" v-model="params.price"></el-input>-->
                      <!--</el-form-item>-->
                    <!--</el-col>-->
                    <!--<el-col :span="6">-->
                      <!--<el-form-item label="" label-width="20px">-->
                        <!--<el-checkbox v-model="priceChange"><span style="font-size: 12px">月单价不固定</span></el-checkbox>-->
                      <!--</el-form-item>-->
                    <!--</el-col>-->
                    <!--<el-col :span="6">-->
                      <!--<el-form-item label="付款方式">-->
                        <!--<el-select clearable v-model="params.pay_way" placeholder="请选择付款方式" value="">-->
                          <!--<el-option v-for="item in pay_way_dic" :label="item.dictionary_name" :value="item.id" :key="item.id"></el-option>-->
                        <!--</el-select>-->
                      <!--</el-form-item>-->
                    <!--</el-col>-->
                    <!--<el-col :span="6">-->
                      <!--<el-form-item label="" label-width="20px">-->
                        <!--<el-checkbox v-model="payWayChange"><span style="font-size: 12px">付款方式不固定</span></el-checkbox>-->
                      <!--</el-form-item>-->
                    <!--</el-col>-->
                  <!--</el-row>-->
                  <div class="title">月单价</div>
                  <div class="form_border">
                    <div v-for="item in priceChangeAmount">
                      <el-row>
                        <el-col :span="6">
                          <el-form-item label="月单价">
                            <el-input placeholder="请输入内容" v-model="priceArray[item-1]"></el-input>
                          </el-form-item>
                        </el-col>
                        <el-col :span="6">
                          <el-form-item label="变化周期(月)">
                            <el-input placeholder="请输入内容" v-model="periodArray[item-1]"></el-input>
                          </el-form-item>
                        </el-col>
                        <el-col :span="6" v-if="item>1">
                          <div class="deleteNumber" @click="deletePriceChange(item-1)">删除</div>
                        </el-col>
                      </el-row>
                    </div>
                    <div style="text-align: center">
                      <el-button type="text" :disabled="!params.month" @click="addMorePriceChange">
                        <i class="el-icon-circle-plus"></i>添加月单价变化条目
                      </el-button>
                    </div>
                  </div>

                  <div class="title">付款方式</div>
                  <div class="form_border">
                    <div v-for="item in payWayChangeAmount">
                      <el-row>
                        <el-col :span="6">
                          <el-form-item label="付款方式">
                            <el-select clearable v-model="payWayArray[item-1]" placeholder="请选择付款方式" value="">
                              <el-option v-for="item in pay_way_dic" :label="item.dictionary_name" :value="item.id" :key="item.id"></el-option>
                            </el-select>
                          </el-form-item>
                        </el-col>
                        <el-col :span="6">
                          <el-form-item label="变化周期(月)">
                            <el-input placeholder="请输入内容" v-model="payPeriodArray[item-1]"></el-input>
                          </el-form-item>
                        </el-col>
                        <el-col :span="6" v-if="item>1">
                          <div class="deleteNumber" @click="deletePayWayChange(item-1)">删除</div>
                        </el-col>
                      </el-row>
                    </div>
                    <div style="text-align: center">
                      <el-button type="text" :disabled="!params.month" @click="addMorePayWayChange">
                        <i class="el-icon-circle-plus"></i>添加付款方式变化条目
                      </el-button>
                    </div>
                  </div>

                  <el-row>
                    <el-col :span="6">
                      <el-form-item label="第一次打房租">
                        <el-date-picker value-format="yyyy-MM-dd" type="date" placeholder="选择日期" v-model="params.pay_first_date"></el-date-picker>
                      </el-form-item>
                    </el-col>
                    <el-col :span="6">
                      <el-form-item label="第二次打房租">
                        <el-date-picker value-format="yyyy-MM-dd" type="date" placeholder="选择日期" v-model="params.pay_second_date"></el-date-picker>
                      </el-form-item>
                    </el-col>
                    <el-col :span="6">
                      <el-form-item label="收款姓名">
                        <el-input placeholder="请输入内容" v-model="params.account_name"></el-input>
                      </el-form-item>
                    </el-col>
                    <el-col :span="6">
                      <el-form-item label="与房东关系">
                        <el-input placeholder="请输入内容" v-model="params.relationship"></el-input>
                      </el-form-item>
                    </el-col>
                  </el-row>
                  <el-row>
                    <el-col :span="6">
                      <el-form-item label="汇款方式">
                        <el-select clearable v-model="params.purchase_way" placeholder="请选择汇款方式" value="">
                          <el-option label="银行卡" value="1"></el-option>
                          <el-option label="存折" value="2"></el-option>
                          <el-option label="支付宝" value="3"></el-option>
                          <el-option label="微信" value="4"></el-option>
                        </el-select>
                      </el-form-item>
                    </el-col>
                    <el-col :span="6">
                      <el-form-item label="账号">
                        <el-input placeholder="请输入内容" v-model="params.account"></el-input>
                      </el-form-item>
                    </el-col>
                    <el-col :span="6">
                      <el-form-item label="开户行" v-if="params.purchase_way<3">
                        <el-input placeholder="请输入内容" v-model="params.bank"></el-input>
                      </el-form-item>
                    </el-col>
                    <el-col :span="6">
                      <el-form-item label="支行" v-if="params.purchase_way<3">
                        <el-input placeholder="请输入内容" v-model="params.subbranch"></el-input>
                      </el-form-item>
                    </el-col>
                  </el-row>


                  <el-row>
                    <el-col :span="6">
                      <el-form-item label="中介费">
                        <el-input placeholder="请输入内容" v-model="params.agency"></el-input>
                      </el-form-item>
                    </el-col>
                    <el-col :span="6">
                      <el-form-item label="违约金">
                        <el-input placeholder="请输入内容" v-model="params.penalty"></el-input>
                      </el-form-item>
                    </el-col>
                    <el-col :span="6">
                      <el-form-item label="物业费金额">
                        <el-input placeholder="请输入内容" v-model="params.property"></el-input>
                      </el-form-item>
                    </el-col>
                    <el-col :span="6">
                      <el-form-item label="物业费承担方">
                        <el-select clearable v-model="params.property_payer" placeholder="请选择承担方" value="">
                          <el-option v-for="item in property_payer_dic" :label="item.dictionary_name" :value="item.id" :key="item.id"></el-option>
                        </el-select>
                      </el-form-item>
                    </el-col>
                  </el-row>

                  <el-row >
                    <el-col :span="6">
                      <el-form-item label="水表底数" required>
                        <el-input placeholder="请输入内容" v-model="params.water"></el-input>
                      </el-form-item>
                    </el-col>
                    <el-col :span="6">
                      <el-form-item label="电表底数">
                        <el-col :span="12">
                          <el-form-item label="峰" label-width="15px" style="margin-bottom: 0;">
                            <el-input placeholder="请输入内容" v-model="params.electricity_peak"></el-input>
                          </el-form-item>
                        </el-col>
                        <el-col :span="12">
                          <el-form-item label="谷" label-width="15px" style="margin-bottom: 0;">
                            <el-input placeholder="请输入内容" v-model="params.electricity_vally"></el-input>
                          </el-form-item>
                        </el-col>
                      </el-form-item>
                    </el-col>
                    <el-col :span="6">
                      <el-form-item label="燃气表底数" required>
                        <el-input placeholder="请输入内容" v-model="params.gas"></el-input>
                      </el-form-item>
                    </el-col>
                    <el-col :span="6">
                      <el-form-item label="公摊费用" required>
                        <el-input placeholder="请输入内容" v-model="params.public"></el-input>
                      </el-form-item>
                    </el-col>
                  </el-row>

                  <el-row>
                    <el-col :span="6">
                      <el-form-item label="资料补齐时间">
                        <el-date-picker value-format="yyyy-MM-dd" type="date" placeholder="选择日期" v-model="params.data_date"></el-date-picker>
                      </el-form-item>
                    </el-col>
                    <el-col :span="6">
                      <el-form-item label="开单人">
                        <el-input placeholder="请输入内容" readonly="" v-model="params.staff_name"></el-input>
                      </el-form-item>
                    </el-col>
                    <el-col :span="6">
                      <el-form-item label="负责人">
                        <el-input placeholder="请输入内容" readonly="" v-model="params.leader_name"></el-input>
                      </el-form-item>
                    </el-col>
                    <el-col :span="6">
                      <el-form-item label="部门">
                        <el-input placeholder="请输入内容" readonly="" v-model="params.department_name"></el-input>
                      </el-form-item>
                    </el-col>
                  </el-row>
                  <el-row>
                    <el-col :span="6" style="padding-left: 15px">
                      房东同意我司对该房屋进行装修
                    </el-col>
                    <el-col :span="18">
                      <el-checkbox-group v-model="params.decorate_allow">
                        <el-checkbox label="1"><span style="font-size: 12px">是，可以进行装修，但不得拆除承重墙体</span></el-checkbox>
                        <el-checkbox label="2"><span style="font-size: 12px">可增加墙体</span></el-checkbox>
                        <el-checkbox label="3"><span style="font-size: 12px">可增加墙体及卫生间</span></el-checkbox>
                        <el-checkbox label="4"><span style="font-size: 12px">否，不可进行装修</span></el-checkbox>
                      </el-checkbox-group>
                    </el-col>
                  </el-row>
                  <el-row>
                    <el-col :span="12">
                      <el-form-item label="备注条款">
                        <el-input type="textarea" v-model="params.remark_terms"></el-input>
                      </el-form-item>
                    </el-col>
                    <el-col :span="12">
                      <el-form-item label="备注">
                        <el-input type="textarea" v-model="params.remark"></el-input>
                      </el-form-item>
                    </el-col>
                  </el-row>
                </el-form>
              </div>
            </div>
          </el-tab-pane>
          <el-tab-pane label="合同照片" name="fourth">
            <div class="scroll_bar">
              <!--<div class="title">房源信息</div>-->
              <!--<div class="title">房东信息</div>-->
              <!--<div class="title">合同信息</div>-->
              <el-form label-width="100px">
                <el-form-item label="证件照片" required="">
                  <UpLoad :ID="'addHouse_id_card'" :isClear="isClear" @getImg="getImg"></UpLoad>
                </el-form-item>
                <el-form-item label="银行卡照片" required="">
                  <UpLoad :ID="'addHouse_bank_card'" :isClear="isClear" @getImg="getImg"></UpLoad>
                </el-form-item>
                <el-form-item label="合同照片" required="">
                  <UpLoad :ID="'addHouse_contract_card'" :isClear="isClear" @getImg="getImg"></UpLoad>
                </el-form-item>
                <el-form-item label="水表照片">
                  <UpLoad :ID="'addHouse_water_card'" :isClear="isClear" @getImg="getImg"></UpLoad>
                </el-form-item>
                <el-form-item label="电表照片">
                  <UpLoad :ID="'addHouse_ele_card'" :isClear="isClear" @getImg="getImg"></UpLoad>
                </el-form-item>
                <el-form-item label="燃气表照片">
                  <UpLoad :ID="'addHouse_gas_card'" :isClear="isClear" @getImg="getImg"></UpLoad>
                </el-form-item>
                <el-form-item label="交接单照片">
                  <UpLoad :ID="'addHouse_hand_over_card'" :isClear="isClear" @getImg="getImg"></UpLoad>
                </el-form-item>
                <el-form-item label="委托书">
                  <UpLoad :ID="'addHouse_proxy_card'" :isClear="isClear" @getImg="getImg"></UpLoad>
                </el-form-item>
                <el-form-item label="押金收条">
                  <UpLoad :ID="'addHouse_deposit_card'" :isClear="isClear" @getImg="getImg"></UpLoad>
                </el-form-item>
                <el-form-item label="承诺书">
                  <UpLoad :ID="'addHouse_commitment_card'" :isClear="isClear" @getImg="getImg"></UpLoad>
                </el-form-item>
                <el-form-item label="补充照片">
                  <UpLoad :ID="'addHouse_other_card'" :isClear="isClear" @getImg="getImg"></UpLoad>
                </el-form-item>
                <el-form-item label="退租交接单照片">
                  <UpLoad :ID="'checkout_card'" :isClear="isClear" @getImg="getImg"></UpLoad>
                </el-form-item>
                <el-form-item label="退租结算照片">
                  <UpLoad :ID="'checkout_settle_card'" :isClear="isClear" @getImg="getImg"></UpLoad>
                </el-form-item>
              </el-form>
            </div>
          </el-tab-pane>
        </el-tabs>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button size="small" @click="addHouseResourcesDialogVisible = false">取 消</el-button>
        <el-button size="small" type="primary" @click="confirmAdd(1)">草 稿</el-button>
        <el-button size="small" type="primary" @click="confirmAdd(0)">发 布</el-button>
      </span>
    </el-dialog>
    <VillageModal :villageDialog="villageDialog" @close="closeVillageModal"></VillageModal>
  </div>
</template>

<script>
  import UpLoad from '../../common/UPLOAD.vue'
  import VillageModal from '../../common/villageSearch.vue'
  export default {
    components: {UpLoad,VillageModal},
    props:['addHouseResourcesDialog','VillageModal'],
    data() {
      return {
        addHouseResourcesDialogVisible:false,
        activeName : 'first',
        isClear:false,
        villageDialog:false,

        params: {
          draft:'',
          //------------------小区详情--------------------//
          community_id : '',            //小区id
          community_nickname : '',      //小区昵称
          building : '',                //栋
          unit : '',                    //单元
          doorplate : '',               //门牌号
          house_type : ['','',''],              //房型
          property_number : '',         //房产证号
          mound_number : '',            //丘号
          area : '',                    //面积
          decorate : '',                //装修
          floor : '',                   //楼层
          floors : '',                  //层数
          property_type : '',           //房屋类型
          house_feature : '',           //房屋特色

          customers : [],               //房东数组
          //-------------------合同详情--------------------//
          contract_type : '',           // 订单性质（合同种类）
          contract_number : '',         // 合同编号
          month : '',                   // 租房月数
          day : '',                     // 租房天数
          sign_date : '',               // 签约日期
          begin_date : '',              // 空置期开始时间
          vacancy_end_date : '',        // 空置期结束时间
          end_date : '',                // 合同结束时间
          vacancy : '',                 // 空置期
          vacancy_way : '',             // 空置期安置方式
          warranty_month : '',          // 保修期月数
          warranty_day : '',            // 保修期天数
          from : '',                    // 来源
          deposit : '',                 // 押金
          price : '',                   // 月单价
          pay_way : '',                 // 付款方式
          pay_first_date : '',          // 第一次打款时间
          pay_second_date : '',         // 第二次打款时间
          account_name : '',            // 帐户名
          relationship : '',            // 关系
          purchase_way : '',            // 汇款方式
          account : '',                 // 帐户
          bank : '',                    // 银行
          subbranch : '',               // 支行
          agency : '',                  // 中介费
          penalty : '',                 // 赔偿金
          property : '',                // 物业费
          property_payer : '',          // 物业费付款方
          water : '',                   // 水
          electricity_peak : '',        // 电峰
          electricity_vally : '',       // 电谷
          gas : '',                     // 气
          public_fee : '',                  // 公摊
          data_date : '',               // 资料补齐时间
          staff_id : '',                // 开单人
          leader_id : '',               // 负责人
          department_id : '',           // 部门
          decorate_allow : [],          // 装修批准
          remark_terms : '',            // 备注条款
          remark : '',                  // 备注
          //----------------照片----------------//
          identity_photo : [],
          bank_photo : [],
          photo : [],
          water_photo : [],
          electricity_photo : [],
          gas_photo : [],
          checkin_photo : [],
          auth_photo : [],
          deposit_photo : [],
          promise : [],
          other_photo : [],
          checkout_photo : [],
          checkout_settle_photo : [],
        },
        community_name : '',           //小区名
        community_address : '',        //小区地址
        staff_name : '',                //组件选中显示名字
        leader_name : '',               //组件选中显示名字
        department_name : '',           //组件选中显示名字

        customersAmount:1,
        nameArray : [],
        sexArray : [],
        id_typeArray : [],
        id_numberArray : [],
        phoneArray : [],

        //-----------------字典----------------------//
        property_type_dic : [],   //房屋类型
        house_feature_dic : [],   //房屋特色
        decorate_dic : [],        //装修
        id_type_dic : [],         //证件类型
        contract_type_dic : [],
        from_dic : [],
        vacancy_way_dic : [],
        pay_way_dic : [],
        property_payer_dic : [],
        isUpPic:false,

        priceChangeAmount : 1,
        priceArray : [],
        periodArray : [],

        payWayChangeAmount : 1,
        payWayArray : [],
        payPeriodArray : [],
      };
    },
    watch:{
      addHouseResourcesDialog(val){
        this.addHouseResourcesDialogVisible = val
      },
      addHouseResourcesDialogVisible(val){
        if(!val){
          this.$emit('close')
        }else {
          this.isClear = false;
          this.getDictionary();
        }
      },
      'params.purchase_way':{
        handler(val,oldVal){
          this.account = '';
          this.bank = '';
          this.subbranch = '';
        }
      },
      'params.month' : {
        handler(val,oldVal){
          this.periodArray[0] = val;
          this.payPeriodArray[0] = val;
        }
      }
    },
    methods:{
      getDictionary(){
        this.dictionary(410,1).then((res) => {this.property_type_dic = res.data;this.isDictionary = true});
        this.dictionary(425,1).then((res) => {this.house_feature_dic = res.data;this.isDictionary = true});
        this.dictionary(404,1).then((res) => {this.decorate_dic = res.data;this.isDictionary = true});
        this.dictionary(409,1).then((res) => {this.id_type_dic = res.data;this.isDictionary = true});

        this.dictionary(430,1).then((res) => {this.contract_type_dic = res.data;this.isDictionary = true});
        this.dictionary(434,1).then((res) => {this.from_dic = res.data;this.isDictionary = true});
        this.dictionary(437,1).then((res) => {this.vacancy_way_dic = res.data;this.isDictionary = true});
        this.dictionary(443,1).then((res) => {this.pay_way_dic = res.data;this.isDictionary = true});
        this.dictionary(449,1).then((res) => {this.property_payer_dic = res.data;this.isDictionary = true});

      },

      //打开小区模态框
      openVillageModal(){
        this.villageDialog = true
      },
      closeVillageModal(val){
        this.villageDialog = false;
        if(val){
          this.params.community_id = val.id;
          this.community_name = val.village_name;
          this.community_address = val.address;
        }
      },

      //增加附属租客
      addMoreCustoms(){
          this.customersAmount ++;
      },
      deleteCustoms(item){
        this.nameArray.splice(item,1);
        this.sexArray.splice(item,1);
        this.id_typeArray.splice(item,1);
        this.id_numberArray.splice(item,1);
        this.phoneArray.splice(item,1);
        this.customersAmount --;
      },

      //月单价变化
      addMorePriceChange(){
        this.priceChangeAmount ++;
      },
      deletePriceChange(item){
        this.priceArray.splice(item,1);
        this.periodArray.splice(item,1);
        this.priceChangeAmount --;
      },

      //付款方式变化
      addMorePayWayChange(){
        this.payWayChangeAmount ++;
      },
      deletePayWayChange(item){
        this.payWayArray.splice(item,1);
        this.payPeriodArray.splice(item,1);
        this.payWayChangeAmount --;
      },

      getImg(val){
        this.isUpPic = val[2];
        if(val[0] === 'addHouse_id_card'){
            this.params.identity_photo = val[1];
        }else if(val[0] === 'addHouse_bank_card'){
          this.params.bank_photo = val[1];
        }else if(val[0] === 'addHouse_contract_card'){
          this.params.photo = val[1];
        }else if(val[0] === 'addHouse_water_card'){
          this.params.water_photo = val[1];
        }else if(val[0] === 'addHouse_ele_card'){
          this.params.electricity_photo = val[1];
        }else if(val[0] === 'addHouse_gas_card'){
          this.params.gas_photo = val[1];
        }else if(val[0] === 'addHouse_hand_over_card'){
          this.params.checkin_photo = val[1];
        }else if(val[0] === 'addHouse_proxy_card'){
          this.params.auth_photo = val[1];
        }else if(val[0] === 'addHouse_deposit_card'){
          this.params.deposit_photo = val[1];
        }else if(val[0] === 'addHouse_commitment_card'){
          this.params.promise = val[1];
        }else if(val[0] === 'addHouse_other_card'){
          this.params.other_photo = val[1];
        }else if(val[0] === 'checkout_card'){
          this.params.checkout_photo = val[1];
        }else if(val[0] === 'checkout_settle_card'){
          this.params.checkout_settle_photo = val[1];
        }
      },

      confirmAdd(val){
        this.params.draft = val;
        //房东
        let customItem = {};
        this.params.customers = [];
        for(let i=0;i<this.customersAmount;i++){
          customItem = {};
          customItem.name = this.nameArray[i]?this.nameArray[i]:'';
          customItem.sex = this.sexArray[i]?this.sexArray[i]:'';
          customItem.id_type = this.id_typeArray[i]?this.id_typeArray[i]:'';
          customItem.id_number = this.id_numberArray[i]?this.id_numberArray[i]:'';
          customItem.phone = this.phoneArray[i]?this.phoneArray[i]:'';
          this.params.customers.push(customItem);
        }
        //月单价
        let priceItem = {};
        this.params.price = [];
        for(let i=0;i<this.priceChangeAmount;i++){
          priceItem = {};
          priceItem.price = this.priceArray[i]?this.priceArray[i]:'';
          priceItem.period = this.periodArray[i]?this.periodArray[i]:'';
          this.params.price.push(priceItem);
        }

        //付款方式
        let payWayItem = {};
        this.params.pay_way = [];
        for(let i=0;i<this.payWayChangeAmount;i++){
          payWayItem = {};
          payWayItem.pay_way = this.payWayArray[i]?this.payWayArray[i]:'';
          payWayItem.period = this.payPeriodArray[i]?this.payPeriodArray[i]:'';
          this.params.pay_way.push(payWayItem);
        }

        if(!this.isUpPic){
          this.$http.post(globalConfig.server+'lease/collect',this.params).then((res) => {

          })
        }else {
          this.$notify.warning({
            title: '警告',
            message:'图片正在上传！'
          })
        }
      }
    }
  };
</script>
<style lang="scss">
  #addHouseResources{
    .el-dialog__wrapper{
      .el-dialog{
        .el-dialog__body{
          padding: 15px;
          >div{
            padding-right: 10px;
            max-height: 550px;
            /*overflow-x: auto;*/
          }
          .scroll_bar{
            max-height: 450px;
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
          .deleteNumber{
            text-align: center;
            cursor: pointer;
            margin-top: 2px;
            color: #409EFF;
            &:hover{
              color: #6a8dfb;

            }
          }
        }
      }
    }
  }

</style>
