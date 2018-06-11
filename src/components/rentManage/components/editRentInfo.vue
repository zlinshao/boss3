<template>
  <div id="addHouseResources">
    <el-dialog :close-on-click-modal="false" title="修改租客信息" :visible.sync="editRentInfoDialogVisible" width="60%">
      <div>
        <el-tabs v-model="activeName">
          <el-tab-pane label="房源信息" name="first">
            <div class="form_border"
                 v-loading="tableLoading"
                 element-loading-text="拼命加载中"
                 element-loading-spinner="el-icon-loading"
                 element-loading-background="rgba(255, 255, 255, .8)">
              <el-form size="mini" :model="params" label-width="100px">
                <el-row>
                  <el-col :span="8">
                    <el-form-item label="小区名称">
                      <div class="content">
                        <span v-if="houseInfo.community">{{houseInfo.community.name}}</span>
                      </div>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item label="小区地址">
                      <div class="content">
                        <span v-if="houseInfo.community">{{houseInfo.community.detailed_address}}</span>
                      </div>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item label="小区别名">
                      <div class="content">
                        <span v-if="houseInfo.community">{{houseInfo.community.nickname}}</span>
                      </div>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="8">
                    <el-form-item label="门牌号">
                      <div class="content">
                    <span v-if="houseInfo.door_address">
                      {{houseInfo.door_address}}
                    </span>
                      </div>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item label="面积">
                      <div class="content">
                    <span v-if="houseInfo.area">
                      {{houseInfo.area}}
                    </span>
                      </div>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item label="朝向">
                      <div class="content">
                    <span v-if="houseInfo.direction">
                      {{houseInfo.direction.name}}
                    </span>
                      </div>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="8">
                    <el-form-item label="房屋类型">
                      <div class="content">
                        <span v-if="houseInfo.property_type">{{houseInfo.property_type.name}}</span>
                      </div>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item label="楼层">
                      <div class="content">
                    <span v-if="houseInfo.floor">
                      {{houseInfo.floor.this}}/{{houseInfo.floor.all}}
                    </span>
                      </div>
                    </el-form-item>
                  </el-col>
                </el-row>
              </el-form>
            </div>
          </el-tab-pane>
          <el-tab-pane label="租客信息" name="second">
            <div class="scroll_bar">
              <div v-for="item in customersAmount">
                <div style="display: flex;justify-content: space-between">
                  <div class="title" v-if="item == 1">租客信息</div>
                  <div class="title" v-else="">附属租客信息({{item - 1}})</div>
                  <div v-if="(isAll || (isPc && !isDoc)) && item>1" class="deleteNumber" @click="deleteCustoms(item-1)">删除</div>
                </div>
                <div class="form_border">
                  <el-form size="mini" :model="params" label-width="100px">
                    <el-row>
                      <el-col :span="8">
                        <el-form-item label="姓名">
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
                        <el-form-item label="联系电话">
                          <el-input placeholder="请输入内容" v-model="phoneArray[item-1]"></el-input>
                        </el-form-item>
                      </el-col>
                    </el-row>
                    <el-row>
                      <el-col :span="8">
                        <el-form-item label="证件类型">
                          <el-select :clearable="!isDoc || isAll" :disabled="isDoc && !isAll" v-model="id_typeArray[item-1]"
                                     placeholder="请选择装修类型" value="">
                            <el-option v-for="item in id_type_dic" :label="item.dictionary_name" :value="item.id"
                                       :key="item.id"></el-option>
                          </el-select>
                        </el-form-item>
                      </el-col>
                      <el-col :span="8">
                        <el-form-item label="证件号码">
                          <el-input :disabled="isDoc && !isAll" placeholder="请输入内容" v-model="id_numberArray[item-1]"></el-input>
                        </el-form-item>
                      </el-col>
                    </el-row>
                  </el-form>
                </div>
              </div>
              <div style="text-align: center">
                <el-button type="text" @click="addMoreCustoms" :disabled="isDoc && !isAll">
                  <i class="el-icon-circle-plus"></i>新增附属租客信息
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
                        <el-switch :disabled="(!isPc || isDoc) && !isAll" v-model="params.contract_type" active-value="1" inactive-value="0"></el-switch>
                      </el-form-item>
                    </el-col>
                    <el-col :span="6">
                      <el-form-item label="合同编号" required>
                        <el-input :disabled="isDoc" placeholder="请输入内容" v-model="params.contract_number"></el-input>
                      </el-form-item>
                    </el-col>
                    <el-col :span="6">
                      <el-form-item label="是否中介" required="">
                        <el-switch :disabled="(!isPc || isDoc) && !isAll" v-model="params.is_agency" active-value="1" inactive-value="0"></el-switch>
                      </el-form-item>
                    </el-col>

                  </el-row>

                  <el-row>
                    <el-col :span="6">
                      <el-form-item label="签约日期" required="">
                        <el-date-picker :disabled="(!isPc || isDoc) && !isAll" value-format="yyyy-MM-dd" type="date" placeholder="选择日期"
                                        v-model="params.sign_date"></el-date-picker>
                      </el-form-item>
                    </el-col>
                    <el-col :span="6">
                      <el-form-item label="合同开始时间" required="">
                        <el-date-picker :disabled="(!isPc || isDoc) && !isAll" @blur="computedEndDate" value-format="yyyy-MM-dd"
                                        type="date" placeholder="选择日期" v-model="params.begin_date"></el-date-picker>
                      </el-form-item>
                    </el-col>
                    <el-col :span="6" class="unitMessage">
                      <el-form-item label="签约月数" required>
                        <el-col :span="12" style="padding-right: 10px">
                          <el-input :disabled="(!isPc || isDoc) && !isAll" placeholder="月数" @blur="changeMonth" v-model="params.month">
                            <template slot="append">月</template>
                          </el-input>
                        </el-col>
                        <el-col :span="12">
                          <el-input :disabled="(!isPc || isDoc) && !isAll" placeholder="天数" @blur="computedEndDate" v-model="params.day">
                            <template slot="append">天</template>
                          </el-input>
                        </el-col>
                      </el-form-item>
                    </el-col>
                    <el-col :span="6">
                      <el-form-item label="合同结束时间" required="">
                        <el-date-picker :disabled="(!isPc || isDoc) && !isAll" value-format="yyyy-MM-dd" type="date"
                                        placeholder="选择日期" v-model="params.end_date"></el-date-picker>
                      </el-form-item>
                    </el-col>
                  </el-row>

                  <el-row>
                    <el-col :span="6">
                      <el-form-item label="押金" required>
                        <el-input :disabled="(!isPc || isDoc) && !isAll" placeholder="请输入内容" v-model="params.deposit"></el-input>
                      </el-form-item>
                    </el-col>
                    <el-col :span="6">
                      <el-form-item label="总收款金额" required>
                        <el-input :disabled="(!isPc || isDoc) && !isAll" placeholder="请输入内容" v-model="params.money_sum"></el-input>
                      </el-form-item>
                    </el-col>
                  </el-row>

                  <div class="title">月单价</div>
                  <div class="form_border">
                    <div v-for="item in priceChangeAmount">
                      <el-row>
                        <el-col :span="6">
                          <el-form-item label="月单价" required="">
                            <el-input :disabled="(!isPc || isDoc) && !isAll" placeholder="请输入内容" v-model="priceArray[item-1]"></el-input>
                          </el-form-item>
                        </el-col>
                        <el-col :span="6">
                          <el-form-item label="变化周期(月)" required="">
                            <el-input placeholder="请输入内容" :disabled="(!isPc || isDoc) && !isAll"
                                      v-model="periodArray[item-1]"></el-input>
                          </el-form-item>
                        </el-col>
                        <el-col :span="6"  v-if="(isAll || (isPc && !isDoc)) && item>1">
                          <div class="deleteNumber">
                            <span @click="deletePriceChange(item-1)">删除</span>
                          </div>
                        </el-col>
                      </el-row>
                    </div>
                    <div style="text-align: center">
                      <el-button type="text" :disabled="(!isPc || isDoc) && !isAll" @click="addMorePriceChange">
                        <i class="el-icon-circle-plus"></i>添加月单价变化条目
                      </el-button>
                    </div>
                  </div>

                  <div class="title">付款方式</div>
                  <div class="form_border">
                    <div v-for="item in payWayChangeAmount">
                      <el-row>
                        <el-col :span="6">
                          <el-form-item label="押" required="">
                            <el-select :disabled="(!isPc || isDoc) && !isAll" v-model="pay_way_bet[0]" placeholder="请选择付款方式" value="">
                              <el-option v-for="item in 3" :value="item-1"
                                         :key="item-1"></el-option>
                            </el-select>
                          </el-form-item>
                        </el-col>
                        <el-col :span="6">
                          <el-form-item label="付" required="">
                            <el-input :disabled="(!isPc || isDoc) && !isAll" placeholder="请输入内容"
                                      v-model="payWayArray[item-1]"></el-input>
                          </el-form-item>
                        </el-col>
                        <el-col :span="6">
                          <el-form-item label="变化周期(月)" required="">
                            <el-input placeholder="请输入内容" :disabled="(!isPc || isDoc) && !isAll"
                                      v-model="payPeriodArray[item-1]"></el-input>
                          </el-form-item>
                        </el-col>
                        <el-col :span="6"  v-if="(isAll || (isPc && !isDoc)) && item>1">
                          <div class="deleteNumber">
                            <span @click="deletePayWayChange(item-1)">删除</span>
                          </div>
                        </el-col>
                      </el-row>
                    </div>
                    <div style="text-align: center">
                      <el-button type="text" :disabled="(!isPc || isDoc) && !isAll" @click="addMorePayWayChange">
                        <i class="el-icon-circle-plus"></i>添加付款方式变化条目
                      </el-button>
                    </div>
                  </div>

                  <div class="title">金额+支付方式</div>
                  <div class="form_border">
                    <div v-for="item in moneyTableChangeAmount">
                      <el-row>
                        <el-col :span="6">
                          <el-form-item label="支付方式" required="">
                            <el-select :disabled="(!isPc || isDoc) && !isAll" v-model="moneyWayArray[item-1]"
                                       placeholder="请选择支付方式" value="">
                              <el-option v-for="item in purchase_way_dic" :label="item.dictionary_name" :value="item.id"
                                         :key="item.id"></el-option>
                            </el-select>
                          </el-form-item>
                        </el-col>
                        <el-col :span="6">
                          <el-form-item label="金额（元）" required="">
                            <el-input :disabled="(!isPc || isDoc) && !isAll" placeholder="请输入内容" v-model="moneySepArray[item-1]"></el-input>
                          </el-form-item>
                        </el-col>
                        <el-col :span="6"  v-if="(isAll || (isPc && !isDoc)) && item>1">
                          <div class="deleteNumber">
                            <span @click="deleteMoneyTableChange(item-1)">删除</span>
                          </div>
                        </el-col>
                      </el-row>
                    </div>
                    <div style="text-align: center">
                      <el-button type="text" :disabled="(!isPc || isDoc) && !isAll" @click="addMoreMoneyTableChange">
                        <i class="el-icon-circle-plus"></i>添加付款方式变化条目
                      </el-button>
                    </div>
                  </div>

                  <div class="title">收据编号</div>
                  <div class="form_border">
                    <div v-for="item in receiptChangeAmount">
                      <el-row>
                        <el-col :span="6">
                          <el-form-item label="收据编号" required>
                            <el-input placeholder="请输入内容" :disabled="(!isPc || isDoc) && !isAll"
                                      v-model="params.receipt[item-1]"></el-input>
                          </el-form-item>
                        </el-col>

                        <el-col :span="6" v-if="(isAll || (isPc && !isDoc)) && item>1">
                          <div class="deleteNumber">
                            <span @click="deleteReceiptChange(item-1)">删除</span>
                          </div>
                        </el-col>
                      </el-row>
                    </div>
                    <div style="text-align: center">
                      <el-button type="text" @click="addReceiptChange" :disabled="(!isPc || isDoc) && !isAll">
                        <i class="el-icon-circle-plus"></i>添加收据编号
                      </el-button>
                    </div>
                  </div>

                  <el-row>
                    <el-col :span="6">
                      <el-form-item label="中介费">
                        <el-input :disabled="(!isPc || isDoc) && !isAll" placeholder="请输入内容" v-model="params.agency"></el-input>
                      </el-form-item>
                    </el-col>
                    <el-col :span="6">
                      <el-form-item label="违约金">
                        <el-input placeholder="请输入内容" v-model="params.penalty"></el-input>
                      </el-form-item>
                    </el-col>
                    <!--<el-col :span="6" class="unitMessage">-->
                    <!--<el-form-item label="物业费金额">-->
                    <!--<el-input placeholder="请输入内容" v-model="params.property">-->
                    <!--<template slot="append">元/m²</template>-->
                    <!--</el-input>-->
                    <!--</el-form-item>-->
                    <!--</el-col>-->
                    <el-col :span="6">
                      <el-form-item label="物业费承担方">
                        <el-select v-model="params.property_payer" placeholder="请选择承担方" value="">
                          <el-option v-for="item in property_payer_dic" :label="item.dictionary_name" :value="item.id"
                                     :key="item.id"></el-option>
                        </el-select>
                      </el-form-item>
                    </el-col>
                  </el-row>

                  <el-row>
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
                      <el-form-item label="管理费">
                        <el-input placeholder="请输入内容" v-model="params.manage_fee"></el-input>
                      </el-form-item>
                    </el-col>

                    <el-col :span="6">
                      <el-form-item label="尾款补齐时间" required="">
                        <el-date-picker value-format="yyyy-MM-dd" type="date" placeholder="选择日期"
                                        :disabled="(!isPc || isDoc) && !isAll" v-model="params.retainage_date"></el-date-picker>
                      </el-form-item>
                    </el-col>
                    <el-col :span="6">
                      <el-form-item label="资料补齐时间" required="">
                        <el-date-picker value-format="yyyy-MM-dd" type="date" placeholder="选择日期"
                                        :disabled="isDoc" v-model="params.data_date"></el-date-picker>
                      </el-form-item>
                    </el-col>
                  </el-row>
                  <el-row>
                    <el-col :span="6">
                      <el-form-item label="开单人">
                        <el-input :disabled="(!isPc || isDoc) && !isAll" placeholder="请输入内容" @focus="openOrganizeModal('staff')" readonly=""
                                  v-model="staff_name"></el-input>
                      </el-form-item>
                    </el-col>
                    <!--<el-col :span="6">-->
                    <!--<el-form-item label="负责人">-->
                    <!--<el-input placeholder="请输入内容" @focus="openOrganizeModal('leader')" readonly=""-->
                    <!--v-model="leader_name"></el-input>-->
                    <!--</el-form-item>-->
                    <!--</el-col>-->
                    <el-col :span="6">
                      <el-form-item label="部门">
                        <el-input :disabled="(!isPc || isDoc) && !isAll" placeholder="请输入内容" @focus="openOrganizeModal('depart')" readonly=""
                                  v-model="department_name"></el-input>
                      </el-form-item>
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
                <el-form-item label="证件照片">
                  <UpLoad :ID="'editRent_id_card'" :isClear="isClear" :onlyShow="isDoc && !isAll"
                          :editImage="identity_photo" @getImg="getImg"></UpLoad>
                </el-form-item>
                <el-form-item label="合同照片">
                  <UpLoad :ID="'editRent_contract_card'" :isClear="isClear" :onlyShow="isDoc && !isAll"
                          :editImage="photo" @getImg="getImg"></UpLoad>
                </el-form-item>
                <el-form-item label="水表照片">
                  <UpLoad :ID="'editRent_water_card'" :isClear="isClear" :editImage="water_photo"
                          @getImg="getImg"></UpLoad>
                </el-form-item>
                <el-form-item label="电表照片">
                  <UpLoad :ID="'editRent_ele_card'" :isClear="isClear" :editImage="electricity_photo"
                          @getImg="getImg"></UpLoad>
                </el-form-item>
                <el-form-item label="燃气表照片">
                  <UpLoad :ID="'editRent_gas_card'" :isClear="isClear" :editImage="gas_photo" @getImg="getImg"></UpLoad>
                </el-form-item>
                <el-form-item label="交接单照片">
                  <UpLoad :ID="'editRent_hand_over_card'" :isClear="isClear" :editImage="checkin_photo"
                          @getImg="getImg"></UpLoad>
                </el-form-item>
                <el-form-item label="截图凭证">
                  <UpLoad :ID="'editRent_certificate_photo'" :onlyShow="(!isPc || isDoc) && !isAll"
                          :isClear="isClear" :editImage="certificate_photo" @getImg="getImg"></UpLoad>
                </el-form-item>
                <el-form-item label="押金收条">
                  <UpLoad :ID="'editRent_deposit_card'" :isClear="isClear"
                          :editImage="deposit_photo" @getImg="getImg"></UpLoad>
                </el-form-item>

                <el-form-item label="补充照片">
                  <UpLoad :ID="'editRent_other_card'" :isClear="isClear" :editImage="other_photo"
                          @getImg="getImg"></UpLoad>
                </el-form-item>
                <el-form-item label="退租交接单照片">
                  <UpLoad :ID="'editRent_checkout_card'" :isClear="isClear" :editImage="checkout_photo"
                          @getImg="getImg"></UpLoad>
                </el-form-item>
                <el-form-item label="退租结算照片">
                  <UpLoad :ID="'editRent_checkout_settle_card'" :isClear="isClear" :editImage="checkout_settle_photo"
                          @getImg="getImg"></UpLoad>
                </el-form-item>
              </el-form>
            </div>
          </el-tab-pane>
        </el-tabs>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button size="small" @click="editRentInfoDialogVisible = false">取 消</el-button>
        <!--<el-button size="small" type="primary" @click="confirmAdd(1)">草 稿</el-button>-->
        <el-button size="small" type="primary" @click="confirmAdd(0)">修 改</el-button>
        <el-button size="small" type="primary" @click="confirmAdd(1)">保存并提交</el-button>
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
    components: {UpLoad, VillageModal, Organization},
    props: ['editRentInfoDialog', 'collectContractId','rentContractId','collectHouseId'],
    data() {
      return {
        editRentInfoDialogVisible: false,
        activeName: 'first',
        isClear: false,
        villageDialog: false,
        organizationDialog: false,
        length: 0,
        type: '',

        houseInfo: {},                //房屋相关信息
        params: {
          is_submit: 0,
          id: '',   //合同id
          house_id:'',
          //------------------小区详情--------------------//
          customers: [],               //租客数组
          //-------------------合同详情--------------------//
          contract_type: '1',           // 订单性质（合同种类）
          contract_number: '',         // 合同编号
          month: '',                   // 租房月数
          day: '',                   // 租房月数
          sign_date: '',               // 签约日期
          begin_date: '',              // 合同开始时间
          end_date: '',                // 合同结束时间
          is_agency: '1',               // 来源
          deposit: '',                 // 押金

          price: [],                   // 月单价
          pay_way: [],                 // 付款方式
          money_sum: '',              //收款总金额
          money_table: [],            //金额+付款方式

          retainage_date: '',         //尾款补齐时间
          receipt: [],                 //收据编号
          agency: '',                  // 中介费
          penalty: '',                 // 赔偿金
          property: '',                // 物业费
          property_payer: '',          // 物业费付款方
          water: '',                   // 水
          electricity_peak: '',        // 电峰
          electricity_valley: '',       // 电谷
          gas: '',                     // 气
          public_fee: '',              // 公摊
          manage_fee: '',
          data_date: '',               // 资料补齐时间
          staff_id: '',                // 开单人
          department_id: '',           // 部门

          remark_terms: '',            // 备注条款
          remark: '',                  // 备注
          //----------------照片----------------//
          identity_photo: [],
          photo: [],
          water_photo: [],
          electricity_photo: [],
          gas_photo: [],
          checkin_photo: [],
          certificate_photo: [],
          deposit_photo: [],
          other_photo: [],
          checkout_photo: [],
          checkout_settle_photo: [],
        },
        community_name: '',           //小区名
        community_address: '',        //小区地址
        staff_name: '',                //组件选中显示名字
//        leader_name: '',               //组件选中显示名字
        department_name: '',           //组件选中显示名字

        customersAmount: 1,
        nameArray: [],
        sexArray: [],
        id_typeArray: [],
        id_numberArray: [],
        idArray : [],
        phoneArray: [],

        //-----------------字典----------------------//
        property_type_dic: [],   //房屋类型
        house_feature_dic: [],   //房屋特色
        decorate_dic: [],        //装修
        id_type_dic: [],         //证件类型
        contract_type_dic: [],
        vacancy_way_dic: [],
        pay_way_dic: [],
        property_payer_dic: [],
        purchase_way_dic: [],
        isUpPic: false,

        priceChangeAmount: 1,
        priceArray: [],
        periodArray: [],

        payWayChangeAmount: 1,
        payWayArray: [],
        pay_way_bet: [],
        payPeriodArray: [],

        moneyTableChangeAmount: 1,
        moneyWayArray: [],
        moneySepArray: [],
        receiptChangeAmount : 1,
        py: '',
        year: '',
        //照片修改
        identity_photo: {},
        photo: {},
        water_photo: {},
        electricity_photo: {},
        gas_photo: {},
        checkin_photo: {},
        certificate_photo: {},
        deposit_photo: {},
        other_photo: {},
        checkout_photo: {},
        checkout_settle_photo: {},
        tableLoading : false,

        isPc : false,
        isDoc : false,
        isAll : false,
      };
    },
    watch: {
      editRentInfoDialog(val){
        this.editRentInfoDialogVisible = val
      },
      editRentInfoDialogVisible(val){
        if (!val) {
          this.$emit('close');
          this.clearData();
        } else {
          this.getCurrentCity();
          this.getHouseInfo();
          this.getDetail();
          this.isClear = true;
          if (!this.isDictionary) {
            this.getDictionary();
          }
        }
      },
      rentContractId(val){
        this.params.id = val;
      },
      collectHouseId(val){
        this.params.house_id = val;
      },
      'params.purchase_way': {
        handler(val, oldVal){
          this.account = '';
          this.bank = '';
          this.subbranch = '';
        }
      },
    },
    methods: {
      getCurrentCity(){
        this.$http.get(globalConfig.server + 'setting/others/ip_address').then((res) => {
          if(res.data.code === '1000120'){
            this.py = res.data.data.py;
            this.year = res.data.data.year;
          }
        });
      },
      getDictionary(){
        this.dictionary(410, 1).then((res) => {
          this.property_type_dic = res.data;
          this.isDictionary = true
        });
        this.dictionary(425, 1).then((res) => {
          this.house_feature_dic = res.data;
          this.isDictionary = true
        });
        this.dictionary(404, 1).then((res) => {
          this.decorate_dic = res.data;
          this.isDictionary = true
        });
        this.dictionary(409, 1).then((res) => {
          this.id_type_dic = res.data;
          this.isDictionary = true
        });

        this.dictionary(430, 1).then((res) => {
          this.contract_type_dic = res.data;
          this.isDictionary = true
        });
        this.dictionary(437, 1).then((res) => {
          this.vacancy_way_dic = res.data;
          this.isDictionary = true
        });
        this.dictionary(443, 1).then((res) => {
          this.pay_way_dic = res.data;
          this.isDictionary = true
        });
        this.dictionary(449, 1).then((res) => {
          this.property_payer_dic = res.data;
          this.isDictionary = true
        });
        this.dictionary(508, 1).then((res) => {
          this.purchase_way_dic = res.data;
          this.isDictionary = true
        });
      },

      getHouseInfo(){
        this.tableLoading = true;
        this.$http.get(globalConfig.server + 'house/album/' + this.collectHouseId).then((res) => {
          this.tableLoading = false;
          if (res.data.code === '30070') {
            this.houseInfo = res.data.data.detail;
          }
        })
      },

      //获取详情
      getDetail(){
        this.$http.get(globalConfig.server+'lease/rent/'+this.rentContractId).then((res) => {
          if(res.data.code === '61110'){
            this.nameArray = [];
            this.sexArray = [];
            this.id_typeArray = [];
            this.id_numberArray = [];
            this.idArray = [];
            this.phoneArray = [];

            let data = res.data.data;

            this.isPc = data.generate_from==2;
            this.isDoc = data.doc_status.id>2;
            this.isAll = data.auth_level == 'all';

            //租客信息
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
            this.params.end_date = data.end_date;
            this.params.is_agency = String(data.is_agency);
            this.params.deposit = data.deposit;
            this.params.money_sum = data.money_sum;

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
            this.pay_way_bet = [];
            this.payPeriodArray = [];
            data.pay_way.forEach((item,index) => {
              this.payWayArray.push(Number(item.pay_way));
              this.pay_way_bet.push(Number(item.pay_way_bet));
              this.payPeriodArray.push(item.period);
            });

            this.moneyTableChangeAmount = data.money_table.length;
            this.moneyWayArray = [];
            this.moneySepArray = [];
            data.money_table.forEach((item,index) => {
              this.moneyWayArray.push(item.money_way);
              this.moneySepArray.push(item.money_sep);
            });

            //--------------------------------------------------//
            this.params.retainage_date = data.retainage_date;

            if(Array.isArray(data.receipt)){
              this.receiptChangeAmount = data.receipt.length ? data.receipt.length : 1;

              data.receipt.forEach((item) => {
                this.params.receipt.push(item);
              });
            }else {
              this.receiptArray[0] = data.receipt;
              this.receiptChangeAmount = 1;
            }

            this.params.agency = data.agency;
            this.params.penalty = data.penalty;
            this.params.property = data.property?Number(data.property):'';
            this.params.property_payer = data.property_payer;
            this.params.water = data.water;
            this.params.electricity_peak = data.electricity_peak;
            this.params.electricity_valley = data.electricity_valley;
            this.params.gas = data.gas;
            this.params.public_fee = data.public_fee;
            this.params.manage_fee = data.manage_fee?Number(data.manage_fee):'';
            this.params.data_date = data.data_date;

            this.params.staff_id = data.staff_id;
            this.staff_name = data.staff_name;

            this.params.department_id = data.department_id;
            this.department_name = data.department_name;

            this.params.remark_terms = data.remark_terms;
            this.params.remark = data.remark;

            //照片
            this.identity_photo = data.identity_photo;
            this.photo = data.photo;
            this.water_photo = data.water_photo;
            this.electricity_photo = data.electricity_photo;
            this.gas_photo = data.gas_photo;
            this.checkin_photo = data.checkin_photo;
            this.certificate_photo = data.certificate_photo;
            this.deposit_photo = data.deposit_photo;
            this.other_photo = data.other_photo;
            this.checkout_photo = data.checkout_photo;
            this.checkout_settle_photo = data.checkout_settle_photo;

            //先清空图片数组id
            this.params.identity_photo= [];
            this.params.photo= [];
            this.params.water_photo= [];
            this.params.electricity_photo= [];
            this.params.gas_photo= [];
            this.params.checkin_photo= [];
            this.params.certificate_photo= [];
            this.params.deposit_photo= [];
            this.params.other_photo= [];
            this.params.checkout_photo= [];
            this.params.checkout_settle_photo= [];
            this.imageArray(data.identity_photo,this.params.identity_photo);
            this.imageArray(data.photo,this.params.photo);
            this.imageArray(data.water_photo,this.params.water_photo);
            this.imageArray(data.electricity_photo,this.params.electricity_photo);
            this.imageArray(data.gas_photo,this.params.gas_photo);
            this.imageArray(data.checkin_photo,this.params.checkin_photo);
            this.imageArray(data.certificate_photo,this.params.certificate_photo);
            this.imageArray(data.deposit_photo,this.params.deposit_photo);
            this.imageArray(data.other_photo,this.params.other_photo);
            this.imageArray(data.checkout_photo,this.params.checkout_photo);
            this.imageArray(data.checkout_settle_photo,this.params.checkout_settle_photo)
          }
        })
      },

      imageArray(data, array){
        if (!Array.isArray(data)) {
          for (let key in data) {
            array.push(key)
          }
        }
      },

      //改变收房月数
      changeMonth(){
        this.computedEndDate();
        this.periodArray[0] = this.params.month;
        this.payPeriodArray[0] = this.params.month;
        this.priceArray.splice(1, this.priceArray.length);
        this.periodArray.splice(1, this.periodArray.length);
        this.payWayArray.splice(1, this.payWayArray.length);
        this.pay_way_bet.splice(1, this.pay_way_bet.length);
        this.payPeriodArray.splice(1, this.payPeriodArray.length);
        this.priceChangeAmount = 1;
        this.payWayChangeAmount = 1;
      },
      vacancyWay(){
        this.params.vacancy_other = '';
      },
      //调出选人组件
      openOrganizeModal(val){
        this.selectType = val;
        this.type = val === 'depart' ? 'depart' : 'staff';
        this.organizationDialog = true;
        this.length = 1;
      },
      selectMember(val){
        this.organizationDialog = false;
        if (this.selectType === 'staff') {
          this.params.staff_id = val[0].id;
          this.staff_name = val[0].name;
          if(val[0].org.length>0){
            this.params.department_id = val[0].org[0].id;
            this.department_name = val[0].org[0].name;
          }
        } else if (this.selectType === 'depart') {
          this.params.department_id = val[0].id;
          this.department_name = val[0].name;
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
        if (val) {
          this.params.community_id = val.id;
          this.community_name = val.village_name;
          this.community_address = val.address;
        }
      },

      //增加附属租客
      addMoreCustoms(){
        this.customersAmount++;
      },
      deleteCustoms(item){
        this.nameArray.splice(item, 1);
        this.sexArray.splice(item, 1);
        this.id_typeArray.splice(item, 1);
        this.id_numberArray.splice(item, 1);
        this.idArray.splice(item, 1);
        this.phoneArray.splice(item, 1);
        this.customersAmount--;
      },

      //月单价变化
      addMorePriceChange(){
        this.priceChangeAmount++;
      },
      deletePriceChange(item){
        this.priceArray.splice(item, 1);
        this.periodArray.splice(item, 1);
        this.priceChangeAmount--;
      },

      //付款方式变化
      addMorePayWayChange(){
        this.payWayChangeAmount++;
      },
      deletePayWayChange(item){
//        this.pay_way_bet.splice(item, 1);
        this.payWayArray.splice(item, 1);
        this.payPeriodArray.splice(item, 1);
        this.payWayChangeAmount--;
      },
      //jine bianhua
      addMoreMoneyTableChange(){
        this.moneyTableChangeAmount++;
      },
      deleteMoneyTableChange(item){
        this.moneyWayArray.splice(item, 1);
        this.moneySepArray.splice(item, 1);
        this.moneyTableChangeAmount--;
      },
      addReceiptChange(){
        this.receiptChangeAmount++;
        this.params.receipt[this.receiptChangeAmount-1] = this.py+this.year;
      },
      deleteReceiptChange(item){
        this.receiptChangeAmount--;
        this.params.receipt.splice(item, 1);
      },
      //计算空置期结束时间
      computedEndDate(){
        this.$http.get(globalConfig.server+'lease/helper/rentdates?begin_date='+this.params.begin_date+'&month='
          +this.params.month +'&day='+this.params.day+'&vacancy='+this.params.vacancy ).then((res) =>{
          if(res.data.code === '69910'){
            this.params.end_date = res.data.data.end_date;
          }
        })
      },
      formatDate(now) {
        let year = now.getFullYear();
        let month = now.getMonth() + 1;
        let date = now.getDate();
        return year + "-" + month + "-" + date;
      },
      getImg(val){
        this.isUpPic = val[2];
        if (val[0] === 'editRent_id_card') {
          this.params.identity_photo = val[1];
        } else if (val[0] === 'editRent_contract_card') {
          this.params.photo = val[1];
        } else if (val[0] === 'editRent_water_card') {
          this.params.water_photo = val[1];
        } else if (val[0] === 'editRent_ele_card') {
          this.params.electricity_photo = val[1];
        } else if (val[0] === 'editRent_gas_card') {
          this.params.gas_photo = val[1];
        } else if (val[0] === 'editRent_hand_over_card') {
          this.params.checkin_photo = val[1];
        } else if (val[0] === 'editRent_certificate_photo') {
          this.params.certificate_photo = val[1];
        } else if (val[0] === 'editRent_deposit_card') {
          this.params.deposit_photo = val[1];
        } else if (val[0] === 'editRent_other_card') {
          this.params.other_photo = val[1];
        } else if (val[0] === 'editRent_checkout_card') {
          this.params.checkout_photo = val[1];
        } else if (val[0] === 'editRent_checkout_settle_card') {
          this.params.checkout_settle_photo = val[1];
        }
      },

      confirmAdd(val){
        this.params.is_submit =val;
        //租客
        let customItem = {};
        this.params.customers = [];
        for (let i = 0; i < this.customersAmount; i++) {
          customItem = {};
          customItem.name = this.nameArray[i] ? this.nameArray[i] : '';
          customItem.sex = this.sexArray[i] ? this.sexArray[i] : '';
          customItem.id_type = this.id_typeArray[i] ? this.id_typeArray[i] : '';
          customItem.id_number = this.id_numberArray[i] ? this.id_numberArray[i] : '';
          customItem.id = this.idArray[i] ? this.idArray[i] : '';
          customItem.phone = this.phoneArray[i] ? this.phoneArray[i] : '';
          this.params.customers.push(customItem);
        }
        //月单价
        let priceItem = {};
        this.params.price = [];
        for (let i = 0; i < this.priceChangeAmount; i++) {
          priceItem = {};
          priceItem.price = this.priceArray[i] ? this.priceArray[i] : '';
          priceItem.period = this.periodArray[i] ? this.periodArray[i] : '';
          this.params.price.push(priceItem);
        }

        //付款方式
        let payWayItem = {};
        this.params.pay_way = [];
        for (let i = 0; i < this.payWayChangeAmount; i++) {
          payWayItem = {};
          payWayItem.pay_way_bet = this.pay_way_bet[0] ? this.pay_way_bet[0] : 0;
          payWayItem.pay_way = this.payWayArray[i] ? this.payWayArray[i] : '';
          payWayItem.period = this.payPeriodArray[i] ? this.payPeriodArray[i] : '';
          this.params.pay_way.push(payWayItem);
        }

        //table
        let moneyTableItem = {};
        this.params.money_table = [];
        for (let i = 0; i < this.moneyTableChangeAmount; i++) {
          moneyTableItem = {};
          moneyTableItem.money_way = this.moneyWayArray[i] ? this.moneyWayArray[i] : '';
          moneyTableItem.money_sep = this.moneySepArray[i] ? this.moneySepArray[i] : '';
          this.params.money_table.push(moneyTableItem);
        }

        if (!this.isUpPic) {
          this.$http.put(globalConfig.server + 'lease/rent/'+this.rentContractId, this.params).then((res) => {
            if (res.data.code === '61110') {
              this.clearData();
              this.editRentInfoDialogVisible = false;
              this.$emit('close','updateRent');
              this.$notify.success({
                title: '成功',
                message: res.data.msg
              })
            } else {
              this.$notify.warning({
                title: '警告',
                message: res.data.msg
              })
            }
          })
        } else {
          this.$notify.warning({
            title: '警告',
            message: '图片正在上传！'
          })
        }
      },
      clearData(){
        this.isClear = false;
        this.params = {
          is_submit:0,
          id: this.rentContractId,   //合同id
          house_id : this.collectHouseId,
          customers: [],               //租客数组
          //-------------------合同详情--------------------//
          contract_type: '1',           // 订单性质（合同种类）
          contract_number: '',         // 合同编号
          month: '',                   // 租房月数
          day: '',                   // 租房月数
          sign_date: '',               // 签约日期
          begin_date: '',              // 空置期开始时间
          end_date: '',                // 合同结束时间
          is_agency: '',               // 来源
          deposit: '',                 // 押金
          price: [],                   // 月单价
          pay_way: [],                 // 付款方式

          money_sum: '',              //收款总金额
          money_table: [],            //金额+付款方式
          retainage_date: '',         //尾款补齐时间
          receipt : [],
          agency: '',                  // 中介费
          penalty: '',                 // 赔偿金
          property: '',                // 物业费
          property_payer: '',          // 物业费付款方
          water: '',                   // 水
          electricity_peak: '',        // 电峰
          electricity_valley: '',       // 电谷
          gas: '',                     // 气
          public_fee: '',                  // 公摊
          manage_fee: '',

          data_date: '',               // 资料补齐时间
          leader_id: '',               // 负责人
          department_id: '',           // 部门
          remark_terms: '',            // 备注条款
          remark: '',                  // 备注
          //----------------照片----------------//
          identity_photo: [],
          photo: [],
          water_photo: [],
          electricity_photo: [],
          gas_photo: [],
          checkin_photo: [],
          certificate_photo: [],
          deposit_photo: [],

          other_photo: [],
          checkout_photo: [],
          checkout_settle_photo: [],
        };
        this.community_name = '';           //小区名
        this.community_address = '';        //小区地址
        this.staff_name = '';                //组件选中显示名字
        this.department_name = '';           //组件选中显示名字
        this.customersAmount = 1;
        this.nameArray = [];
        this.sexArray = [];
        this.id_typeArray = [];
        this.id_numberArray = [];
        this.idArray = [];
        this.phoneArray = [];
        //-----------------字典----------------------//

        this.isUpPic = false;
        this.priceChangeAmount = 1;
        this.priceArray = [];
        this.periodArray = [];
        this.payWayChangeAmount = 1;
        this.payWayArray = [];
        this.pay_way_bet = [];
        this.payPeriodArray = [];
        this.moneyTableChangeAmount = 1;
        this.moneyWayArray = [];
        this.moneySepArray = [];

        this.identity_photo = {};
        this.photo = {};
        this.water_photo = {};
        this.electricity_photo = {};
        this.gas_photo = {};
        this.checkin_photo = {};
        this.certificate_photo = {};
        this.deposit_photo = {};
        this.other_photo = {};
        this.checkout_photo = {};
        this.checkout_settle_photo = {};

        this.isPc = false;
        this.isDoc = false;
        this.isAll = false;
      }
    }
  };
</script>
<style lang="scss" scoped="">
  #addHouseResources {
    .el-dialog__wrapper {
      .el-dialog {
        .el-dialog__body {
          padding: 15px;
          > div {
            padding-right: 10px;
            max-height: 550px;
            /*overflow-x: auto;*/
          }
          .scroll_bar {
            max-height: 450px;
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
          .content {
            padding: 0 10px;
            height: 32px;
            overflow: hidden;
            background: #eef3fc;
            border-radius: 4px;
            font-size: 12px;
            color: #727479;
          }
          .deleteNumber {
            text-align: center;
            cursor: pointer;
            margin-top: 2px;
            color: #409EFF;
            &:hover {
              color: #6a8dfb;

            }
          }
        }
      }
    }
  }

</style>
