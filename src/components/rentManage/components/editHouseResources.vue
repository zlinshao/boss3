<template>
  <div id="addHouseResources">
    <el-dialog :close-on-click-modal="false" title="修改房源" :visible.sync="editHouseResourcesDialogVisible" width="60%">
      <div>
        <el-tabs v-model="activeName">
          <el-tab-pane label="房源信息" name="first">
            <div class="form_border">
              <el-form size="mini" :model="params" label-width="100px">
                <el-row>
                  <el-col :span="6">
                    <el-form-item label="小区名称" required>
                      <el-input placeholder="请输入内容" v-model="community_name" @focus="openVillageModal"
                                readonly=""></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="6">
                    <el-form-item label="小区地址" required>
                      <el-input placeholder="请输入内容" v-model="community_address" disabled=""></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="6">
                    <el-form-item label="小区别名" required="">
                      <el-input placeholder="请输入内容" v-model="params.community_nickname"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="6">
                    <el-form-item label="丘号" required="">
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
                    <el-form-item label="房型" required="">
                      <el-col :span="8" style="padding-right: 10px">
                        <el-select clearable v-model="params.house_type[0]" placeholder="室" value="">
                          <el-option label="一室" value="1"></el-option>
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
                <el-row>
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
                    <el-form-item label="装修" required="">
                      <el-select clearable v-model="params.decorate" placeholder="请选择装修类型" value="">
                        <el-option v-for="item in decorate_dic" :label="item.dictionary_name" :value="item.id"
                                   :key="item.id"></el-option>
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

                <el-row>
                  <el-col :span="6">
                    <el-form-item label="房屋类型" required="">
                      <el-select clearable v-model="params.property_type" placeholder="请选择房屋类型" value="">
                        <el-option v-for="item in property_type_dic" :label="item.dictionary_name" :value="item.id"
                                   :key="item.id"></el-option>
                      </el-select>
                    </el-form-item>
                  </el-col>
                  <el-col :span="6">
                    <el-form-item label="房屋特色">
                      <el-select clearable v-model="params.house_feature" placeholder="请选择房屋特色" value="">
                        <el-option v-for="item in house_feature_dic" :label="item.dictionary_name" :value="item.id"
                                   :key="item.id"></el-option>
                      </el-select>
                    </el-form-item>
                  </el-col>
                </el-row>

              </el-form>
            </div>
          </el-tab-pane>
          <el-tab-pane label="房东信息" name="second">
            <div class="scroll_bar">
              <div v-for="item in customersAmount">
                <div style="display: flex;justify-content: space-between">
                  <div class="title" v-if="item == 1">房东信息</div>
                  <div class="title" v-else="">附属房东信息({{item - 1}})</div>
                  <div v-if="item>1" class="deleteNumber" @click="deleteCustoms(item-1)">删除</div>
                </div>
                <div class="form_border">
                  <el-form size="mini" :model="params" label-width="100px">
                    <el-row>
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
                    <el-row>
                      <el-col :span="8">
                        <el-form-item label="证件类型" required="">
                          <el-select clearable v-model="id_typeArray[item-1]" placeholder="请选择装修类型" value="">
                            <el-option v-for="item in id_type_dic" :label="item.dictionary_name" :value="item.id"
                                       :key="item.id"></el-option>
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
                  <el-row>
                    <el-col :span="6">
                      <el-form-item label="是否公司单" required="">
                        <el-switch v-model="params.contract_type" active-value="1" inactive-value="0"></el-switch>
                      </el-form-item>
                    </el-col>
                    <el-col :span="6">
                      <el-form-item label="合同编号" required>
                        <el-input placeholder="请输入内容" v-model="params.contract_number"></el-input>
                      </el-form-item>
                    </el-col>
                    <el-col :span="6" class="unitMessage">
                      <el-form-item label="签约时长" required>
                        <el-col :span="12" style="padding-right: 10px">
                          <el-input placeholder="月数" @blur="changeMonth" v-model="params.month">
                            <template slot="append">月</template>
                          </el-input>
                        </el-col>
                        <el-col :span="12">
                          <el-input placeholder="天数" v-model="params.day">
                            <template slot="append">天</template>
                          </el-input>
                        </el-col>
                      </el-form-item>
                    </el-col>
                    <el-col :span="6">
                      <el-form-item label="签约日期" required="">
                        <el-date-picker value-format="yyyy-MM-dd" type="date" placeholder="选择日期"
                                        v-model="params.sign_date"></el-date-picker>
                      </el-form-item>
                    </el-col>
                  </el-row>

                  <el-row>
                    <el-col :span="6">
                      <el-form-item label="空置期天数" required="">
                        <el-input placeholder="请输入内容" @blur="computedEndDate" v-model="params.vacancy"></el-input>
                      </el-form-item>
                    </el-col>
                    <el-col :span="6">
                      <el-form-item label="空置安置方式" required>
                        <el-select clearable v-model="params.vacancy_way" @change="vacancyWay" placeholder="请选择安置方式"
                                   value="">
                          <el-option v-for="item in vacancy_way_dic" :label="item.dictionary_name" :value="item.id"
                                     :key="item.id"></el-option>
                        </el-select>
                      </el-form-item>
                    </el-col>
                    <el-col :span="6" v-if="params.vacancy_way == 442">
                      <el-form-item label="其他" required="">
                        <el-input placeholder="请输入内容" v-model="params.vacancy_other"></el-input>
                      </el-form-item>
                    </el-col>
                    <el-col :span="6" class="unitMessage">
                      <el-form-item label="保修期" required="">
                        <el-col :span="12" style="padding-right: 10px">
                          <el-input placeholder="月数" v-model="params.warranty_month">
                            <template slot="append">月</template>
                          </el-input>
                        </el-col>
                        <el-col :span="12">
                          <el-input placeholder="天数" v-model="params.warranty_day">
                            <template slot="append">天</template>
                          </el-input>
                        </el-col>
                      </el-form-item>
                    </el-col>
                  </el-row>

                  <el-row>

                    <el-col :span="6">
                      <el-form-item label="空置开始时间" required="">
                        <el-date-picker @blur="computedEndDate" value-format="yyyy-MM-dd" type="date"
                                        placeholder="选择日期" v-model="params.begin_date"></el-date-picker>
                      </el-form-item>
                    </el-col>
                    <el-col :span="6">
                      <el-form-item label="空置结束时间" required="">
                        <el-date-picker value-format="yyyy-MM-dd" type="date" placeholder="选择日期" disabled=""
                                        v-model="params.vacancy_end_date"></el-date-picker>
                      </el-form-item>
                    </el-col>

                    <el-col :span="6">
                      <el-form-item label="合同开始时间" required="">
                        <el-date-picker value-format="yyyy-MM-dd"
                                        type="date" placeholder="选择日期" disabled=""
                                        v-model="params.begin_date"></el-date-picker>
                      </el-form-item>
                    </el-col>
                    <el-col :span="6">
                      <el-form-item label="合同结束时间" required="">
                        <el-date-picker value-format="yyyy-MM-dd" type="date" placeholder="选择日期"
                                        v-model="params.end_date"></el-date-picker>
                      </el-form-item>
                    </el-col>

                  </el-row>


                  <el-row>
                    <el-col :span="6">
                      <el-form-item label="是否中介" required="">
                        <el-switch v-model="params.is_agency" active-value="1" inactive-value="0"></el-switch>
                      </el-form-item>
                    </el-col>
                    <el-col :span="6">
                      <el-form-item label="押金" required>
                        <el-input placeholder="请输入内容" v-model="params.deposit"></el-input>
                      </el-form-item>
                    </el-col>
                  </el-row>

                  <div class="title">月单价</div>
                  <div class="form_border">
                    <div v-for="item in priceChangeAmount">
                      <el-row>
                        <el-col :span="6">
                          <el-form-item label="月单价" required="">
                            <el-input placeholder="请输入内容" v-model="priceArray[item-1]"></el-input>
                          </el-form-item>
                        </el-col>
                        <el-col :span="6">
                          <el-form-item label="变化周期(月)" required="">
                            <el-input placeholder="请输入内容" :disabled="priceChangeAmount<2"
                                      v-model="periodArray[item-1]"></el-input>
                          </el-form-item>
                        </el-col>
                        <el-col :span="6" v-if="item>1">
                          <div class="deleteNumber">
                            <span @click="deletePriceChange(item-1)">删除</span>
                          </div>
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
                          <el-form-item label="付款方式" required="">
                            <el-select clearable v-model="payWayArray[item-1]" placeholder="请选择付款方式" value="">
                              <el-option v-for="item in pay_way_dic" :label="item.dictionary_name" :value="item.id"
                                         :key="item.id"></el-option>
                            </el-select>
                          </el-form-item>
                        </el-col>
                        <el-col :span="6">
                          <el-form-item label="变化周期(月)" required="">
                            <el-input placeholder="请输入内容" :disabled="payWayChangeAmount<2"
                                      v-model="payPeriodArray[item-1]"></el-input>
                          </el-form-item>
                        </el-col>
                        <el-col :span="6" v-if="item>1">
                          <div class="deleteNumber">
                            <span @click="deletePayWayChange(item-1)">删除</span>
                          </div>
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
                      <el-form-item label="第一次打房租" required="">
                        <el-date-picker value-format="yyyy-MM-dd" type="date" placeholder="选择日期"
                                        v-model="params.pay_first_date"></el-date-picker>
                      </el-form-item>
                    </el-col>
                    <el-col :span="6">
                      <el-form-item label="第二次打房租" required="">
                        <el-date-picker value-format="yyyy-MM-dd" type="date" placeholder="选择日期"
                                        v-model="params.pay_second_date"></el-date-picker>
                      </el-form-item>
                    </el-col>
                    <el-col :span="6">
                      <el-form-item label="收款姓名" required="">
                        <el-input placeholder="请输入内容" v-model="params.account_name"></el-input>
                      </el-form-item>
                    </el-col>
                    <el-col :span="6">
                      <el-form-item label="与房东关系" required="">
                        <el-input placeholder="请输入内容" v-model="params.relationship"></el-input>
                      </el-form-item>
                    </el-col>
                  </el-row>
                  <el-row>
                    <el-col :span="6">
                      <el-form-item label="支付方式" required="">
                        <el-select clearable v-model="params.purchase_way" placeholder="请选择支付方式" value="">
                          <el-option v-for="item in purchase_way_dic" :label="item.dictionary_name" :value="item.id"
                                     :key="item.id"></el-option>
                        </el-select>
                      </el-form-item>
                    </el-col>
                    <el-col :span="6">
                      <el-form-item label="账号" required="">
                        <el-input placeholder="请输入内容" v-model="params.account"></el-input>
                      </el-form-item>
                    </el-col>
                    <el-col :span="6">
                      <el-form-item label="开户行" required="" v-if="params.purchase_way == 509 || params.purchase_way == 510">
                        <el-input placeholder="请输入内容" v-model="params.bank"></el-input>
                      </el-form-item>
                    </el-col>
                    <el-col :span="6">
                      <el-form-item label="支行" required="" v-if="params.purchase_way == 509 || params.purchase_way == 510">
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
                      <el-form-item label="违约金" required="">
                        <el-input placeholder="请输入内容" v-model="params.penalty"></el-input>
                      </el-form-item>
                    </el-col>
                    <el-col :span="6">
                      <el-form-item label="物业费金额">
                        <el-input placeholder="请输入内容" v-model="params.property">
                          <template slot="append">元/m²</template>
                        </el-input>
                      </el-form-item>
                    </el-col>
                    <el-col :span="6">
                      <el-form-item label="物业费承担方" required="">
                        <el-select clearable v-model="params.property_payer" placeholder="请选择承担方" value="">
                          <el-option v-for="item in property_payer_dic" :label="item.dictionary_name" :value="item.id"
                                     :key="item.id"></el-option>
                        </el-select>
                      </el-form-item>
                    </el-col>
                  </el-row>

                  <el-row >
                    <el-col :span="6">
                      <el-form-item label="水表底数">
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
                            <el-input placeholder="请输入内容" v-model="params.electricity_valley"></el-input>
                          </el-form-item>
                        </el-col>
                      </el-form-item>
                    </el-col>
                    <el-col :span="6">
                      <el-form-item label="燃气表底数">
                        <el-input placeholder="请输入内容" v-model="params.gas"></el-input>
                      </el-form-item>
                    </el-col>
                    <el-col :span="6">
                      <el-form-item label="公摊费用">
                        <el-input placeholder="请输入内容" v-model="params.public_fee"></el-input>
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
                        <el-input placeholder="请输入内容" @focus="openOrganizeModal('staff')" readonly="" v-model="staff_name"></el-input>
                      </el-form-item>
                    </el-col>
                    <!--<el-col :span="6">-->
                      <!--<el-form-item label="负责人">-->
                        <!--<el-input placeholder="请输入内容" @focus="openOrganizeModal('leader')" readonly="" v-model="leader_name"></el-input>-->
                      <!--</el-form-item>-->
                    <!--</el-col>-->
                    <el-col :span="6">
                      <el-form-item label="部门">
                        <el-input placeholder="请输入内容" @focus="openOrganizeModal('depart')" readonly="" v-model="department_name"></el-input>
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
              <el-form label-width="100px">
                <el-form-item label="证件照片" required="">
                  <UpLoad :ID="'addHouse_id_card'" :isClear="isClear" :editImage="identity_photo" @getImg="getImg"></UpLoad>
                </el-form-item>
                <el-form-item label="银行卡照片" required="">
                  <UpLoad :ID="'addHouse_bank_card'" :isClear="isClear" :editImage="bank_photo" @getImg="getImg"></UpLoad>
                </el-form-item>
                <el-form-item label="合同照片" required="">
                  <UpLoad :ID="'addHouse_contract_card'" :isClear="isClear" :editImage="photo" @getImg="getImg"></UpLoad>
                </el-form-item>
                <el-form-item label="水表照片">
                  <UpLoad :ID="'addHouse_water_card'" :isClear="isClear" :editImage="water_photo" @getImg="getImg"></UpLoad>
                </el-form-item>
                <el-form-item label="电表照片">
                  <UpLoad :ID="'addHouse_ele_card'" :isClear="isClear" :editImage="electricity_photo" @getImg="getImg"></UpLoad>
                </el-form-item>
                <el-form-item label="燃气表照片">
                  <UpLoad :ID="'addHouse_gas_card'" :isClear="isClear" :editImage="gas_photo" @getImg="getImg"></UpLoad>
                </el-form-item>
                <el-form-item label="交接单照片">
                  <UpLoad :ID="'addHouse_hand_over_card'" :isClear="isClear" :editImage="checkin_photo" @getImg="getImg"></UpLoad>
                </el-form-item>
                <el-form-item label="委托书" required="">
                  <UpLoad :ID="'addHouse_proxy_card'" :isClear="isClear" :editImage="auth_photo" @getImg="getImg"></UpLoad>
                </el-form-item>
                <el-form-item label="押金收条" required="">
                  <UpLoad :ID="'addHouse_deposit_card'" :isClear="isClear" :editImage="deposit_photo" @getImg="getImg"></UpLoad>
                </el-form-item>
                <el-form-item label="承诺书" required="">
                  <UpLoad :ID="'addHouse_commitment_card'" :isClear="isClear" :editImage="promise" @getImg="getImg"></UpLoad>
                </el-form-item>
                <el-form-item label="补充照片">
                  <UpLoad :ID="'addHouse_other_card'" :isClear="isClear" :editImage="other_photo" @getImg="getImg"></UpLoad>
                </el-form-item>
                <el-form-item label="退租交接单照片">
                  <UpLoad :ID="'checkout_card'" :isClear="isClear" :editImage="checkout_photo" @getImg="getImg"></UpLoad>
                </el-form-item>
                <el-form-item label="退租结算照片">
                  <UpLoad :ID="'checkout_settle_card'" :isClear="isClear" :editImage="checkout_settle_photo" @getImg="getImg"></UpLoad>
                </el-form-item>
              </el-form>
            </div>
          </el-tab-pane>
        </el-tabs>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button size="small" @click="editHouseResourcesDialogVisible = false">取 消</el-button>
        <el-button size="small" type="primary" @click="confirmAdd">修 改</el-button>
      </span>
    </el-dialog>
    <VillageModal :villageDialog="villageDialog" @close="closeVillageModal"></VillageModal>
    <Organization :organizationDialog="organizationDialog" :length="length" :type="type"
                  @close='closeModal' @selectMember="selectMember"></Organization>
  </div>
</template>

<script>
  import UpLoad from '../../common/UPLOAD.vue'
  import VillageModal from '../../common/villageSearch.vue'
  import Organization from '../../common/organization.vue'

  export default {
    components: {UpLoad,VillageModal,Organization},
    props:['editHouseResourcesDialog','collectContractId'],
    data() {
      return {
        editHouseResourcesDialogVisible:false,
        activeName : 'first',
        isClear:false,
        villageDialog:false,
        organizationDialog:false,
        length:0,
        type:'',

        params: {
          type : '',
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
          contract_type : '1',           // 订单性质（合同种类）
          contract_number : '',         // 合同编号
          month : '',                   // 租房月数
          day : '',                     // 租房天数
          sign_date : '',               // 签约日期
          begin_date : '',              // 空置期开始时间
          vacancy_end_date : '',        // 空置期结束时间
          end_date : '',                // 合同结束时间
          vacancy : '',                 // 空置期
          vacancy_way : '',             // 空置期安置方式
          vacancy_other : '',           //空置期安置方式(其他)
          warranty_month : '',          // 保修期月数
          warranty_day : '',            // 保修期天数
          is_agency  : '1',              // 来源
          deposit : '',                 // 押金
          price : [],                   // 月单价
          pay_way : [],                 // 付款方式
          pay_first_date : '',          // 第一次打款时间
          pay_second_date : '',         // 第二次打款时间
          account_name : '',            // 帐户名
          relationship : '',            // 关系
          purchase_way : '',            // 支付方式
          account : '',                 // 帐户
          bank : '',                    // 银行
          subbranch : '',               // 支行
          agency : '',                  // 中介费
          penalty : '',                 // 赔偿金
          property : '',                // 物业费
          property_payer : '',          // 物业费付款方
          water : '',                   // 水
          electricity_peak : '',        // 电峰
          electricity_valley : '',       // 电谷
          gas : '',                     // 气
          public_fee : '',              // 公摊
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
        idArray : [],
        phoneArray : [],

        //-----------------字典----------------------//
        property_type_dic : [],   //房屋类型
        house_feature_dic : [],   //房屋特色
        decorate_dic : [],        //装修
        id_type_dic : [],         //证件类型
        contract_type_dic : [],
        vacancy_way_dic : [],
        pay_way_dic : [],
        property_payer_dic : [],
        purchase_way_dic : [],
        isUpPic:false,

        priceChangeAmount : 1,
        priceArray : [],
        periodArray : [],

        payWayChangeAmount : 1,
        payWayArray : [],
        payPeriodArray : [],

        //照片修改
        identity_photo : {},
        bank_photo : {},
        photo : {},
        water_photo : {},
        electricity_photo : {},
        gas_photo : {},
        checkin_photo : {},
        auth_photo : {},
        deposit_photo : {},
        promise : {},
        other_photo : {},
        checkout_photo : {},
        checkout_settle_photo : {},
      };
    },
    watch:{
      editHouseResourcesDialog(val){
        this.editHouseResourcesDialogVisible = val
      },
      editHouseResourcesDialogVisible(val){
        if(!val){
          this.$emit('close')
        }else {
          this.isClear = true;
          this.getDetail();
          if(!this.isDictionary){
            this.getDictionary();
          }
        }
      },
      'params.purchase_way':{
        handler(val,oldVal){
          this.account = '';
          this.bank = '';
          this.subbranch = '';
        }
      },
    },
    methods:{
      getDictionary(){
        this.dictionary(410,1).then((res) => {this.property_type_dic = res.data;this.isDictionary = true});
        this.dictionary(425,1).then((res) => {this.house_feature_dic = res.data;this.isDictionary = true});
        this.dictionary(404,1).then((res) => {this.decorate_dic = res.data;this.isDictionary = true});
        this.dictionary(409,1).then((res) => {this.id_type_dic = res.data;this.isDictionary = true});

        this.dictionary(430,1).then((res) => {this.contract_type_dic = res.data;this.isDictionary = true});
        this.dictionary(437,1).then((res) => {this.vacancy_way_dic = res.data;this.isDictionary = true});
        this.dictionary(443,1).then((res) => {this.pay_way_dic = res.data;this.isDictionary = true});
        this.dictionary(449,1).then((res) => {this.property_payer_dic = res.data;this.isDictionary = true});
        this.dictionary(508,1).then((res) => {this.purchase_way_dic = res.data;this.isDictionary = true});

      },
      //获取详情
      getDetail(){
        this.$http.get(globalConfig.server+'lease/collect/'+this.collectContractId).then((res) => {
          if(res.data.code === '61010'){
            this.nameArray = [];
            this.sexArray = [];
            this.id_typeArray = [];
            this.id_numberArray = [];
            this.idArray = [];
            this.phoneArray = [];

            let data = res.data.data;
            //房屋信息
            this.params.type = data.type;
            this.params.community_id = data.community_id;
            this.community_name = data.community_name;
            this.community_address = data.community_address;
            this.params.community_nickname = data.community_nickname;
            this.params.building = data.building;
            this.params.unit = data.unit;
            this.params.doorplate = data.doorplate;
            this.params.house_type = data.house_type;
            this.params.property_number = data.property_number;
            this.params.mound_number = data.mound_number;
            this.params.area = data.area;
            this.params.decorate = data.decorate?Number(data.decorate):'';
            this.params.floor = data.floor;
            this.params.floors = data.floors;
            this.params.property_type = data.property_type?Number(data.property_type):'';
            this.params.house_feature = data.house_feature?Number(data.house_feature):'';
            //房东信息
            this.customersAmount = data.customers.length;
            data.customers.forEach((item) => {
              this.nameArray.push(item.name);
              this.sexArray.push(String(item.sex));
              this.id_typeArray.push(item.idtype);
              this.id_numberArray.push(item.idcard);
              this.idArray.push(item.id);
              this.phoneArray.push(item.phone);
            });

            //合同信息
            this.params.contract_type = String(data.contract_type);
            this.params.contract_number = data.contract_number;
            this.params.month = data.month;
            this.params.day = data.day;
            this.params.sign_date = data.sign_date;
            this.params.begin_date = data.begin_date;
            this.params.vacancy_end_date = data.vacancy_end_date;
            this.params.end_date = data.end_date;
            this.params.vacancy = data.vacancy;
            this.params.vacancy_way = data.vacancy_way;
            this.params.vacancy_other = data.vacancy_other;
            this.params.warranty_month = data.warranty_month;
            this.params.warranty_day = data.warranty_day;
            this.params.is_agency = String(data.is_agency);
            this.params.deposit = data.deposit;
            //------------月单价和付款方式-----------------------//
            this.priceChangeAmount = data.price.length;
            this.priceArray = [];
            this.periodArray = [];
            data.price.forEach((item,index) => {
              this.priceArray.push(item.price);
              this.periodArray.push(item.period);
            });
            this.payWayChangeAmount = data.pay_way.length;
            this.payWayArray = [];
            this.payPeriodArray = [];
            data.pay_way.forEach((item,index) => {
              this.payWayArray.push(Number(item.pay_way));
              this.payPeriodArray.push(item.period);
            });
            //--------------------------------------------------//
            this.params.pay_first_date = data.pay_first_date;
            this.params.pay_second_date = data.pay_second_date;
            this.params.account_name = data.account_name;
            this.params.relationship = data.relationship;
            this.params.purchase_way = data.purchase_way?Number(data.purchase_way):'';
            this.params.account = data.account;
            this.params.bank = data.bank;
            this.params.subbranch = data.subbranch;
            this.params.agency = data.agency;
            this.params.penalty = data.penalty;
            this.params.property = data.property;
            this.params.property_payer = data.property_payer?Number(data.property_payer):'';
            this.params.water = data.water;
            this.params.electricity_peak = data.electricity_peak;
            this.params.electricity_valley = data.electricity_valley;
            this.params.gas = data.gas;
            this.params.public_fee = data.public_fee;
            this.params.data_date = data.data_date;

            this.params.staff_id = data.staff_id;
            this.staff_name = data.staff_name;

            this.params.leader_id = data.leader_id;

            this.params.department_id = data.department_id;
            this.department_name = data.department_name;

            this.params.decorate_allow = data.decorate_allow;
            this.params.remark_terms = data.remark_terms;
            this.params.remark = data.remark;
            //照片
            this.identity_photo = data.identity_photo;
            this.bank_photo = data.bank_photo;
            this.photo = data.photo;
            this.water_photo = data.water_photo;
            this.electricity_photo = data.electricity_photo;
            this.gas_photo = data.gas_photo;
            this.checkin_photo = data.checkin_photo;
            this.auth_photo = data.auth_photo;
            this.deposit_photo = data.deposit_photo;
            this.promise = data.promise;
            this.other_photo = data.other_photo;
            this.checkout_photo = data.checkout_photo;
            this.checkout_settle_photo = data.checkout_settle_photo;

            //先清空图片数组id
            this.params.identity_photo = [];
            this.params.bank_photo = [];
            this.params.photo = [];
            this.params.water_photo = [];
            this.params.electricity_photo = [];
            this.params.gas_photo = [];
            this.params.checkin_photo = [];
            this.params.auth_photo = [];
            this.params.deposit_photo = [];
            this.params.promise = [];
            this.params.other_photo = [];
            this.params.checkout_photo = [];
            this.params.checkout_settle_photo = [];
            this.imageArray(data.identity_photo,this.params.identity_photo);
            this.imageArray(data.bank_photo,this.params.bank_photo);
            this.imageArray(data.photo,this.params.photo);
            this.imageArray(data.water_photo,this.params.water_photo);
            this.imageArray(data.electricity_photo,this.params.electricity_photo);
            this.imageArray(data.gas_photo,this.params.gas_photo);
            this.imageArray(data.checkin_photo,this.params.checkin_photo);
            this.imageArray(data.auth_photo,this.params.auth_photo);
            this.imageArray(data.deposit_photo,this.params.deposit_photo);
            this.imageArray(data.promise,this.params.promise);
            this.imageArray(data.other_photo,this.params.other_photo);
            this.imageArray(data.checkout_photo,this.params.checkout_photo);
            this.imageArray(data.checkout_settle_photo,this.params.checkout_settle_photo);
          }
        })
      },

      imageArray(data,array){
        if(!Array.isArray(data)){
          for(let key in data){
            array.push(key)
          }
        }
      },

      //改变收房月数
      changeMonth(){
        this.periodArray[0] = this.params.month;
        this.payPeriodArray[0] = this.params.month;
        this.priceArray.splice(1,this.priceArray.length);
        this.periodArray.splice(1,this.periodArray.length);
        this.payWayArray.splice(1,this.payWayArray.length);
        this.payPeriodArray.splice(1,this.payPeriodArray.length);
        this.priceChangeAmount = 1;
        this.payWayChangeAmount = 1;
      },
      vacancyWay(){
        this.params.vacancy_other = '';
      },
      //调出选人组件
      openOrganizeModal(val){
        this.selectType = val;
        this.type = val==='depart'?'depart':'staff';
        this.organizationDialog = true;
        this.length = 1;
      },
      selectMember(val){
        this.organizationDialog = false;
        if(this.selectType === 'staff'){
          this.params.staff_id = val[0].id;
          this.staff_name = val[0].name;

          if(val[0].org.length>0){
            this.params.department_id = val[0].org[0].id;
            this.department_name = val[0].org[0].name;
          }
        }else if(this.selectType === 'leader'){
          this.params.leader_id = val[0].id;
          this.leader_name =  val[0].name;
        }else if(this.selectType === 'depart'){
          this.params.department_id = val[0].id;
          this.department_name =  val[0].name;
        }
      },

      closeModal(){
        this.organizationDialog = false
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
        this.idArray.splice(item,1);
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

      //计算空置期结束时间
      computedEndDate(){
        let timestamp = Date.parse(new Date(this.params.begin_date))+ Number(this.params.vacancy)*24*60*60*1000;
        this.params.vacancy_end_date = this.formatDate(new Date(timestamp));
      },
      formatDate(now) {
        let year=now.getFullYear();
        let month=now.getMonth()+1;
        let date=now.getDate();
        return year+"-"+month+"-"+date;
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

      confirmAdd(){
        //房东
        let customItem = {};
        this.params.customers = [];
        for(let i=0;i<this.customersAmount;i++){
          customItem = {};
          customItem.name = this.nameArray[i]?this.nameArray[i]:'';
          customItem.sex = this.sexArray[i]?this.sexArray[i]:'';
          customItem.id_type = this.id_typeArray[i]?this.id_typeArray[i]:'';
          customItem.id_number = this.id_numberArray[i]?this.id_numberArray[i]:'';
          customItem.id = this.idArray[i]?this.idArray[i]:'';
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
          this.$http.put(globalConfig.server+'lease/collect/'+this.collectContractId,this.params).then((res) => {
            if(res.data.code === '61010'){
              this.clearData();
              this.editHouseResourcesDialogVisible = false;
              this.$emit('close','updateCollect');
              this.$notify.success({
                title: '成功',
                message:res.data.msg
              })
            }else {
              this.$notify.warning({
                title: '警告',
                message:res.data.msg
              })
            }
          })
        }else {
          this.$notify.warning({
            title: '警告',
            message:'图片正在上传！'
          })
        }
      },
      clearData(){
        this.isClear = false;
        this.params = {
          type : '',
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
          contract_type : '1',           // 订单性质（合同种类）
          contract_number : '',         // 合同编号
          month : '',                   // 租房月数
          day : '',                     // 租房天数
          sign_date : '',               // 签约日期
          begin_date : '',              // 空置期开始时间
          vacancy_end_date : '',        // 空置期结束时间
          end_date : '',                // 合同结束时间
          vacancy : '',                 // 空置期
          vacancy_way : '',             // 空置期安置方式
          vacancy_other : '',           // 空置期安置方式(其他)
          warranty_month : '',          // 保修期月数
          warranty_day : '',            // 保修期天数
          is_agency  : '1',                    // 来源
          deposit : '',                 // 押金
          price : [],                   // 月单价
          pay_way : '[]',                 // 付款方式
          pay_first_date : '',          // 第一次打款时间
          pay_second_date : '',         // 第二次打款时间
          account_name : '',            // 帐户名
          relationship : '',            // 关系
          purchase_way : '',            // 支付方式
          account : '',                 // 帐户
          bank : '',                    // 银行
          subbranch : '',               // 支行
          agency : '',                  // 中介费
          penalty : '',                 // 赔偿金
          property : '',                // 物业费
          property_payer : '',          // 物业费付款方
          water : '',                   // 水
          electricity_peak : '',        // 电峰
          electricity_valley : '',       // 电谷
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
        };
        this.community_name = '';           //小区名
        this.community_address = '';        //小区地址
        this.staff_name = '';                //组件选中显示名字
        this.leader_name = '';               //组件选中显示名字
        this.department_name = '';           //组件选中显示名字
        this.customersAmount=1;
        this.nameArray = [];
        this.sexArray = [];
        this.id_typeArray = [];
        this.id_numberArray = [];
        this.idArray = [];
        this.phoneArray = [];
        //-----------------字典----------------------//

        this.isUpPic=false;
        this.priceChangeAmount = 1;
        this.priceArray = [];
        this.periodArray = [];
        this.payWayChangeAmount = 1;
        this.payWayArray = [];
        this.payPeriodArray = [];
      }
    }
  };
</script>
<style lang="scss" scoped="">
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
