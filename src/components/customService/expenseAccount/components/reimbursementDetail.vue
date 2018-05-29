<template>
  <div id="reimbursementDetail">
    <el-dialog :close-on-click-modal="false" title="报销单" :visible.sync="reimbursementDetailDialogVisible" width="60%">
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
                  <div class="content" v-if="reimDetail.types">{{reimDetail.types}}</div>
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
                <el-form-item label="报销金额">
                  <div class="content">
                    <span v-if="reimDetail.amount">{{reimDetail.amount}}</span>
                    <span v-else>暂无</span>
                  </div>
                </el-form-item>
              </el-col>
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
            </el-row>
            <el-row>
              <el-col :span="8">
                <el-form-item label="开户人">
                  <div class="content">
                    <span v-if="reimDetail.account_name">{{reimDetail.account_name}}</span>
                    <span v-else>暂无</span>
                  </div>
                </el-form-item>
              </el-col>
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
            <div class="follow_result">
              <div class="title">报销结果</div>
            </div>
            <div v-if="reimDetail.results">
              <el-form size="small" label-width="100px" style="margin-bottom: 15px;border-bottom: 1px solid #eef3fc;"  v-if="reimDetail.results.water_fee.time && reimDetail.results.water_fee.time.length>0">
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
                <el-row v-for="(item,key) in reimDetail.results.water_data" :key="key"
                        v-if="reimDetail.results.water_data.length>0">
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
                  <el-col :span="8">
                    <el-form-item label="认责人姓名">
                      <div class="content">
                        <span v-if="item.accuser_id_name">{{item.accuser_id_name}}</span>
                        <span v-else>暂无</span>
                      </div>
                    </el-form-item>
                  </el-col>
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
                <el-row v-for="(item,key) in reimDetail.results.electricity_data" :key="key"
                        v-if="reimDetail.results.electricity_data.length>0">
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
                  <el-col :span="8">
                    <el-form-item label="认责人姓名">
                      <div class="content">
                        <span v-if="item.accuser_id_name">{{item.accuser_id_name}}</span>
                        <span v-else>暂无</span>
                      </div>
                    </el-form-item>
                  </el-col>
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
                        <span v-if="item.total">{{item.total}}</span>
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
                        <span v-if="item.total">{{item.total}}</span>
                        <span v-else>暂无</span>
                      </div>
                    </el-form-item>
                  </el-col>
                </el-row>
              </el-form>
              <el-form size="small" label-width="100px" style="margin-bottom: 15px;border-bottom: 1px solid #eef3fc;" v-if="reimDetail.results.gas_fee.time && reimDetail.results.gas_fee.time.length>0">
                <el-row>
                  <el-col :span="12">
                    <el-form-item label="燃气费">
                      <div class="content">
                        <span >{{reimDetail.results.gas_fee.time[0]}}——{{reimDetail.results.gas_fee.time[1]}}</span>
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
                <el-row v-for="(item,key) in reimDetail.results.gas_data" :key="key"
                        v-if="reimDetail.results.gas_data.length>0">
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
                  <el-col :span="8">
                    <el-form-item label="认责人姓名">
                      <div class="content">
                        <span v-if="item.accuser_id_name">{{item.accuser_id_name}}</span>
                        <span v-else>暂无</span>
                      </div>
                    </el-form-item>
                  </el-col>
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
                <el-row v-for="(item,key) in reimDetail.results.property_management_data" :key="key"
                        v-if="reimDetail.results.property_management_data.length>0">
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
                  <el-col :span="8">
                    <el-form-item label="认责人姓名">
                      <div class="content">
                        <span v-if="item.accuser_id_name">{{item.accuser_id_name}}</span>
                        <span v-else>暂无</span>
                      </div>
                    </el-form-item>
                  </el-col>
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
                <el-row>
                  <el-col :span="24">
                    <el-form-item label="备注">
                      <div class="content">
                        <span v-if="reimDetail.results && reimDetail.results.remark">{{reimDetail.results.remark}}</span>
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
          </el-form>
        </div>
      </div>

    </el-dialog>

  </div>
</template>

<script>

  export default {
    name: 'reimbursement-detail',
    props: ['reimbursementDetailDialog', 'reimbursementId', 'module'],
    data() {
      return {
        reimbursementDetailDialogVisible: false,
        reimDetail: {},  //报销单详情
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
        } else {
          this.getDetail();
        }
      },
    },
    methods: {
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
  }

</style>
