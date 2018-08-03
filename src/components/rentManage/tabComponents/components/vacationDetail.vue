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
                  <el-row v-for="(item,index) in params.financial_info.length" :key="index">
                    <el-col :span="5">
                      <el-form-item label="应收">
                        <el-input v-model="params.financial_info[index].receivable"
                                  @change="financialChange(index)" disabled></el-input>
                      </el-form-item>
                    </el-col>
                    <el-col :span="5">
                      <el-form-item label="实收">
                        <el-input v-model="params.financial_info[index].actual_receipt"
                                  @change="financialChange(index)" disabled></el-input>
                      </el-form-item>
                    </el-col>
                    <el-col :span="5">
                      <el-form-item label="差额">
                        <el-input v-model="params.financial_info[index].difference"
                                  disabled></el-input>
                      </el-form-item>
                    </el-col>
                    <el-col :span="8">
                      <el-form-item label="备注">
                        <el-input type="textarea" :rows="1"
                                  v-model="params.financial_info[index].remark" disabled></el-input>
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
                  <el-row v-for="(item, index) in params.settled_info.length" :key="index">
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
                <div class="title">维修赔偿详情</div>
                <el-input disabled type="textarea" resize="none" v-model="params.compensation"></el-input>
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
                        <el-input disabled v-model="params.repair_info[index].content"></el-input>
                      </el-form-item>
                    </el-col>
                    <el-col :span="8">
                      <el-form-item label="维修金额">
                        <el-input disabled v-model="params.repair_info[index].amount"></el-input>
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
                    <el-form-item label="物管费：" label-width="100px">
                    </el-form-item>
                  </el-col>
                  <el-col :span="10">
                    <el-form-item label="上次交到">
                      <el-date-picker type="date" v-model="params.property_management_last" disabled></el-date-picker>
                    </el-form-item>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item label="本次交到">
                      <el-date-picker type="date" v-model="params.property_management_now" disabled></el-date-picker>
                    </el-form-item>
                  </el-col>

                  <el-col :span="5" :offset="2">
                    <el-form-item label="公摊水费">
                      <el-input disabled v-model="params.property_management_electricity"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="5">
                    <el-form-item label="公摊电费">
                      <el-input disabled v-model="params.property_management_water"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="6">
                    <el-form-item label="物业费">
                      <el-input disabled v-model="params.property_management_total_fees"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="6">
                    <el-form-item label="其他">
                      <el-input disabled v-model="params.property_management_other"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="10" :offset="2">
                    <el-form-item label="合同承担方">
                      <el-select disabled v-model="params.contracting_party" value="">
                        <el-option v-for="item in contracting_party_dic" :label="item.dictionary_name"
                                   :value="item.id" :key="item.id"></el-option>
                      </el-select>
                    </el-form-item>
                  </el-col>

                  <el-col :span="10">
                    <el-form-item label="实际承担方">
                      <el-input disabled v-model="params.actual_party" ></el-input>
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
                    <el-form-item label="超期房时">
                      <el-input disabled v-model="params.overtime_rent"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="6">
                    <el-form-item label="超期房费">
                      <el-input disabled v-model="params.TV_fees"></el-input>
                    </el-form-item>
                  </el-col>
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

            <!--<el-form-item label="款项凭证">-->
            <!--<UpLoad :ID="'fundVoucher'" :editImage="editImage" :isClear="isClear" @getImg="getImg"></UpLoad>-->
            <!--</el-form-item>-->
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
          <el-button size="small" type="primary" @click="addComment">确定</el-button>
        </div>
      </el-dialog>

      <span slot="footer" class="dialog-footer">
        <el-button v-if="params.status_type == 1" size="small" type="warning" @click="reject">驳 回</el-button>
        <el-button v-if="params.status_type == 1" size="small" type="primary" @click="passed">通 过</el-button>
        <el-button size="small" type="primary" @click="commentVisible = true">评 论</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
  import UpLoad from '../../../common/UPLOAD.vue'

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
          contract_id: '',
          module: '',
          status_type: '',
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
          contracting_party: '',
          actual_party: '',

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
          - Number(this.params.sublease_fee);
      },
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
      },
      //获取退房详情
      getData() {
        this.isLoading = true;
        this.$http.get(globalConfig.server + 'customer/check_out/' + this.vacationId).then((res) => {
          this.isLoading = false;
          if (res.data.code === '20020') {
            let data = res.data.data;

            this.financialReceiptsLength = data.financial_info && data.financial_info.length || 1;
            this.contractCollectionLength = data.settled_info && data.settled_info.length || 1;
            this.repairInfoLength = data.repair_info && data.repair_info.length || 1;
            this.params.financial_info = data.financial_info || [{
              receivable: '',
              actual_receipt: '',
              difference: '',
              remark: '',
            }];   //财务收款
            this.params.settled_info = data.settled_info || [{receivable: '', remark: '',}];  //合同收款
            this.params.repair_info = data.repair_info || [{content: '', amount: '',}];  //合同收款

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

            this.params.gas_last = (data.details && data.details.gas_last) || 0;
            this.params.gas_now = (data.details && data.details.gas_now) || 0;
            this.params.gas_unit_price = (data.details && data.details.gas_unit_price) || 0;
            this.params.gas_late_payment = (data.details && data.details.gas_late_payment) || 0;
            this.params.gas_other = (data.details && data.details.gas_other) || 0;

            this.params.property_management_last = (data.details && data.details.property_management_last) || '';
            this.params.property_management_now = (data.details && data.details.property_management_now) || '';
            this.params.property_management_electricity = (data.details && data.details.property_management_electricity) || 0;
            this.params.property_management_water = (data.details && data.details.property_management_water) || 0;
            this.params.property_management_total_fees = (data.details && data.details.property_management_total_fees) || 0;
            this.params.property_management_other = (data.details && data.details.property_management_other) || 0;
            this.params.contracting_party = (data.details && data.details.contracting_party) || '';
            this.params.actual_party = (data.details && data.details.actual_party) || '';

            this.params.other_content = (data.details && data.details.other_content) || '';
            this.params.energy_other = (data.details && data.details.energy_other) || 0;

            this.params.liquidated_damages = (data.details && data.details.liquidated_damages) || 0;
            this.params.trash_fees = (data.details && data.details.trash_fees) || 0;
            this.params.cleaning_fees = (data.details && data.details.cleaning_fees) || 0;
            this.params.repair_compensation_fees = (data.details && data.details.repair_compensation_fees) || 0;
            this.params.other_fees = (data.details && data.details.other_fees) || 0;
            this.params.overtime_rent = (data.details && data.details.overtime_rent) || 0;
            this.params.TV_fees = (data.details && data.details.TV_fees) || 0;
            this.params.network_fees = (data.details && data.details.network_fees) || 0;

            this.passParams.amount = data.details && data.details.total_fees;

            this.params.profit_type = data.extend_field && data.extend_field.profit_type ?
                                      String(data.extend_field.profit_type) : '';
            this.params.is_refund =  data.is_refund? String(data.is_refund) : '';

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
      //获取评论信息
      getCommentData(){
        this.$http.get(globalConfig.server + 'customer/check_out/comment/' + this.vacationId).then(res => {
          if(res.data.code === '20000'){
            this.commentList = res.data.data.data;
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

      initData() {
        this.contractInfo = {};
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
          contracting_party: '',
          actual_party: '',

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

        this.financialReceiptsLength = 1;
        this.contractCollectionLength = 1;
        this.repairInfoLength = 1;

        this.isClear = true;
        this.commentVisible = false;
        this.commentList = [];
        this.commentParams = {
          content : '',
          parent_id : 0,
          image_pic :[],
          video_file : [],
        };
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
        this.$http.post(globalConfig.server + 'customer/check_out/comment/'+ this.vacationId,
          this.commentParams).then(res=>{
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
    }
  }
  .commentC {
    color: #000;
    margin-left: 40px;
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
