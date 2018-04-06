<template>
  <div id="rentingDetail">

    <div class="stepLine">
      <el-steps direction="vertical" :active="steps" style="cursor: pointer">
        <el-step title="房源信息" @click.native="changeStep(0)"></el-step>
        <el-step title="房东信息" @click.native="changeStep(1)"></el-step>
        <el-step title="合同信息" @click.native="changeStep(2)"></el-step>
        <el-step title="财务信息" @click.native="changeStep(3)"></el-step>
        <el-step title="回访记录" @click.native="changeStep(4)"></el-step>
        <el-step title="操作历史" @click.native="changeStep(5)"></el-step>
      </el-steps>
    </div>

    <div class="container">
      <div class="top">
        <h3>仙居雅苑8-104详情 {{steps}}</h3>
        <h3>
          <el-button size="mini" type="primary" v-if="false">已回访</el-button>
          <el-button size="mini" type="danger">未回访</el-button>
          <el-button size="mini" type="warning" v-if="false">驳回</el-button>
          <el-button size="mini" type="success">通过</el-button>
        </h3>
      </div>
      <div id="mainContent" class="main scroll_bar" @click.stop="getText($event)">

        <div id="houseId" style="border-bottom: 1px solid #ccc;margin: 50px 0 50px 150px;">
          <div class="title">房屋信息</div>
        </div>

        <div class="houseInfo">
          <el-form size="small" label-width="180px">
            <el-row>
              <el-col :span="8">
                <el-form-item label="小区名称">
                  <div class="content">{{houseInfo.community_name}}</div>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="小区地址">
                  <div class="content">{{houseInfo.community_address}}</div>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="小区别名">
                  <div class="content">{{houseInfo.community_nickname}}</div>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="8">
                <el-form-item label="门牌地址">
                  <div class="content">{{houseInfo.doorplate_address}}</div>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="房型">
                  <div class="content">{{houseInfo.house_type}}</div>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="房产证号">
                  <div class="content">{{houseInfo.property_number}}</div>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="8">
                <el-form-item label="丘号">
                  <div class="content">{{houseInfo.mound_number}}</div>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="建筑面积">
                  <div class="content">{{houseInfo.area}}</div>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="装修">
                  <div class="content">{{houseInfo.decorate}}</div>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="8">
                <el-form-item label="楼层">
                  <div class="content">{{houseInfo.floor}}</div>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="楼层数">
                  <div class="content">{{houseInfo.floors}}</div>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="房屋类型">
                  <div class="content">{{houseInfo.property_type}}</div>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="8">
                <el-form-item label="房屋特色">
                  <div class="content">{{houseInfo.property_feature}}</div>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="24">
                <el-form-item label="房屋照片">
                  <div class="image">
                    <img src="../../assets/images/head.jpg" v-for="item in 8">
                  </div>
                </el-form-item>
              </el-col>
            </el-row>
            <!--<el-row>-->
              <!--<el-col :span="24">-->
                <!--<el-form-item label="备注">-->
                  <!--<div class="content">仙居雅苑</div>-->
                <!--</el-form-item>-->
              <!--</el-col>-->
            <!--</el-row>-->
          </el-form>
        </div>

        <div id="ownerId" style="border-bottom: 1px solid #ccc;margin: 50px 0 50px 150px;">
          <div class="title">租客</div>
        </div>

        <div class="ownerInfo">
          <el-form size="small" label-width="180px">
            <el-row>
              <el-col :span="8">
                <el-form-item label="房东姓名">
                  <div class="content">仙居雅苑</div>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="尊称">
                  <div class="content">玄武湖125-5号</div>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="附属房东">
                  <div class="content">8-104</div>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="8">
                <el-form-item label="联系电话">
                  <div class="content">仙居雅苑</div>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="证件类型">
                  <div class="content">玄武湖125-5号</div>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="证件号码">
                  <div class="content">8-104</div>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="8">
                <el-form-item label="国籍">
                  <div class="content">仙居雅苑</div>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="24">
                <el-form-item label="房屋照片">
                  <div class="image">
                    <img src="../../assets/images/head.jpg" v-for="item in 3">
                  </div>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="24">
                <el-form-item label="备注">
                  <div class="content">仙居雅苑</div>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </div>

        <div id="contractId" style="border-bottom: 1px solid #ccc;margin: 50px 0 50px 150px;">
          <div class="title">合同信息</div>
        </div>
        <div class="contractInfo">
          <el-form size="small" label-width="180px">
            <el-row>
              <el-col :span="8">
                <el-form-item label="订单性质">
                  <div class="content">{{contractInfo.type}}</div>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="合同编号">
                  <div class="content">{{contractInfo.contract_number}}</div>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="签约时长(月)">
                  <div class="content">{{contractInfo.month}}</div>
                </el-form-item>
              </el-col>

            </el-row>
            <el-row>
              <el-col :span="8">
                <el-form-item label="合同签约时间">
                  <div class="content">{{contractInfo.sign_date}}</div>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="合同开始时间">
                  <div class="content">{{contractInfo.begin_date}}</div>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="合同结束时间">
                  <div class="content">{{contractInfo.end_date}}</div>
                </el-form-item>
              </el-col>
            </el-row>
            <!--<el-row>-->
              <!--<el-col :span="8">-->
                <!--<el-form-item label="空置时长">-->
                  <!--<div class="content">{{contractInfo.vacancy}}</div>-->
                <!--</el-form-item>-->
              <!--</el-col>-->
              <!--<el-col :span="8">-->
                <!--<el-form-item label="空置开始时间">-->
                  <!--<div class="content">{{contractInfo.begin_date}}</div>-->
                <!--</el-form-item>-->
              <!--</el-col>-->
              <!--<el-col :span="8">-->
                <!--<el-form-item label="空置结束时间">-->
                  <!--<div class="content">{{contractInfo.vacancy_end_date}}</div>-->
                <!--</el-form-item>-->
              <!--</el-col>-->
            <!--</el-row>-->

            <!--<el-row>-->
              <!--<el-col :span="8">-->
                <!--<el-form-item label="空置期安置方式">-->
                  <!--<div class="content">{{contractInfo.vacancy}}</div>-->
                <!--</el-form-item>-->
              <!--</el-col>-->
              <!--<el-col :span="8">-->
                <!--<el-form-item label="保修期">-->
                  <!--<div class="content">{{contractInfo.warranty_month}}{{contractInfo.warranty_day}}</div>-->
                <!--</el-form-item>-->
              <!--</el-col>-->
              <!--<el-col :span="8">-->
                <!--<el-form-item label="订单来源">-->
                  <!--<div class="content">{{contractInfo.from}}</div>-->
                <!--</el-form-item>-->
              <!--</el-col>-->
            <!--</el-row>-->

            <el-row>
              <el-col :span="8">
                <el-form-item label="押金">
                  <div class="content">{{contractInfo.deposit}}</div>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="月单价">
                  <div class="content">{{contractInfo.price}}</div>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="付款方式">
                  <div class="content">{{contractInfo.pay_way}}</div>
                </el-form-item>
              </el-col>
            </el-row>
            <!--<el-row>-->
              <!--<el-col :span="8">-->
                <!--<el-form-item label="第一次打房租时间">-->
                  <!--<div class="content">{{contractInfo.pay_first_date}}</div>-->
                <!--</el-form-item>-->
              <!--</el-col>-->
              <!--<el-col :span="8">-->
                <!--<el-form-item label="第二次打房租时间">-->
                  <!--<div class="content">{{contractInfo.pay_second_date}}</div>-->
                <!--</el-form-item>-->
              <!--</el-col>-->
              <!--<el-col :span="8">-->
                <!--<el-form-item label="收款人姓名">-->
                  <!--<div class="content">{{contractInfo.account_name}}</div>-->
                <!--</el-form-item>-->
              <!--</el-col>-->
            <!--</el-row>-->

            <!--<el-row>-->
              <!--<el-col :span="8">-->
                <!--<el-form-item label="收款人与房东关系">-->
                  <!--<div class="content">{{contractInfo.account_name}}</div>-->
                <!--</el-form-item>-->
              <!--</el-col>-->
              <!--<el-col :span="8">-->
                <!--<el-form-item label="汇款方式">-->
                  <!--<div class="content">{{contractInfo.purchase_way}}</div>-->
                <!--</el-form-item>-->
              <!--</el-col>-->

              <!--<el-col :span="8">-->
                <!--<el-form-item label="账号">-->
                  <!--<div class="content">{{contractInfo.account}}</div>-->
                <!--</el-form-item>-->
              <!--</el-col>-->
            <!--</el-row>-->

            <el-row>
              <el-col :span="8">
                <el-form-item label="总收入金额">
                  <div class="content">{{contractInfo.bank}}</div>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="金额（付款方式）">
                  <div class="content">{{contractInfo.subbranch}}</div>
                </el-form-item>
              </el-col>

            </el-row>
            <el-row>
              <el-col :span="8">
                <el-form-item label="资料补齐时间">
                  <div class="content">{{contractInfo.data_date}}</div>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="中介费">
                  <div class="content">{{contractInfo.agency}}</div>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="违约金">
                  <div class="content">{{contractInfo.penalty}}</div>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="8">
                <el-form-item label="物业费">
                  <div class="content">{{contractInfo.property}}</div>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="物业费付款方">
                  <div class="content">{{contractInfo.property}}</div>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="水表底数">
                  <div class="content">{{contractInfo.property_payer}}</div>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="8">
                <el-form-item label="电表底数">
                  <div class="content">{{contractInfo.electricity_peak+contractInfo.electricity_vally}}</div>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="气表底数">
                  <div class="content">{{contractInfo.gas}}</div>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="物业及公摊费用">
                  <div class="content">{{contractInfo.public}}</div>
                </el-form-item>
              </el-col>
            </el-row>

            <el-row>

              <el-col :span="8">
                <el-form-item label="开单人">
                  <div class="content">{{contractInfo.staff_name}}</div>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="负责人">
                  <div class="content">{{contractInfo.leader_name}}</div>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <el-form-item label="备注条款">
                  <div class="content">{{contractInfo.remark_terms}}</div>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="备注">
                  <div class="content">{{contractInfo.remark}}</div>
                </el-form-item>
              </el-col>
            </el-row>

            <el-row>
              <el-col :span="24">
                <el-form-item label="合同照片">
                  <div class="image">
                    <img src="../../assets/images/head.jpg" v-for="item in 8">
                  </div>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="24">
                <el-form-item label="证件照片">
                  <div>
                    <el-tabs type="border-card">
                      <el-tab-pane label="水表照片">
                        <div class="image">
                          <img src="../../assets/images/head.jpg" v-for="item in 3">
                        </div>
                      </el-tab-pane>
                      <el-tab-pane label="电表照片">
                        <div class="image">
                          <img src="../../assets/images/head.jpg" v-for="item in 2">
                        </div>
                      </el-tab-pane>
                      <el-tab-pane label="燃气表照片">
                        <div class="image">
                          <img src="../../assets/images/head.jpg" v-for="item in 1">
                        </div>
                      </el-tab-pane>
                      <el-tab-pane label="产权证照片">
                        <div class="image">
                          <img src="../../assets/images/head.jpg" v-for="item in 4">
                        </div>
                      </el-tab-pane>
                      <el-tab-pane label="水卡照片">
                        <div class="image">
                          <img src="../../assets/images/head.jpg" v-for="item in 3">
                        </div>
                      </el-tab-pane>
                      <el-tab-pane label="电卡照片">
                        <div class="image">
                          <img src="../../assets/images/head.jpg" v-for="item in 2">
                        </div>
                      </el-tab-pane>
                      <el-tab-pane label="燃气卡照片">
                        <div class="image">
                          <img src="../../assets/images/head.jpg" v-for="item in 5">
                        </div>
                      </el-tab-pane>
                      <el-tab-pane label="交接单">
                        <div class="image">
                          <img src="../../assets/images/head.jpg" v-for="item in 2">
                        </div>
                      </el-tab-pane>
                      <el-tab-pane label="押金收条">
                        <div class="image">
                          <img src="../../assets/images/head.jpg" v-for="item in 1">
                        </div>
                      </el-tab-pane>
                      <el-tab-pane label="委托书">
                        <div class="image">
                          <img src="../../assets/images/head.jpg" v-for="item in 3">
                        </div>
                      </el-tab-pane>
                      <el-tab-pane label="退租交接单">
                        <div class="image">
                          <img src="../../assets/images/head.jpg" v-for="item in 3">
                        </div>
                      </el-tab-pane>
                      <el-tab-pane label="退租结算单">
                        <div class="image">
                          <img src="../../assets/images/head.jpg" v-for="item in 3">
                        </div>
                      </el-tab-pane>
                      <el-tab-pane label="银行卡照片">
                        <div class="image">
                          <img src="../../assets/images/head.jpg" v-for="item in 3">
                        </div>
                      </el-tab-pane>
                    </el-tabs>
                  </div>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </div>

        <div id="financeId" style="border-bottom: 1px solid #ccc;margin: 50px 0 50px 150px;">
          <div class="title">财务信息</div>
        </div>

        <div class="financialInfo">
          <el-form size="small" label-width="180px">
            <el-row>
              <el-col :span="8">
                <el-form-item label="房租期数">
                  <div class="content">{{financeInfo.term_rent}}</div>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="已结算期数">
                  <div class="content">{{financeInfo.term_received}}</div>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="剩余期数">
                  <div class="content">{{financeInfo.term_left}}</div>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="8">
                <el-form-item label="上次付款时间">
                  <div class="content">{{financeInfo.last_money_date}}</div>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="下次付款时间">
                  <div class="content">{{financeInfo.next_money_date}}</div>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="实付金额">
                  <div class="content">{{financeInfo.amount_actual}}</div>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="8">
                <el-form-item label="剩余金额">
                  <div class="content">{{financeInfo.amount_left}}</div>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="应付金额">
                  <div class="content">{{financeInfo.amount_should}}</div>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="下次应付时间">
                  <div class="content">{{financeInfo.next_should_money_date}}</div>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="24">
                <el-form-item label="备注">
                  <div class="content">{{financeInfo.remark}}</div>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </div>

        <div id="returnId" style="border-bottom: 1px solid #ccc;margin: 50px 0 50px 150px;">
          <div class="title">回访信息</div>
        </div>

        <div class="returnVisitInfo">
          <el-form size="small" label-width="180px">
            <el-row>
              <el-col :span="8">
                  <el-form-item label="回访时间">
                  <div class="content">仙居雅苑</div>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="回访结果">
                  <div class="content">玄武湖125-5号</div>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="回访满意度">
                  <div class="content">8-104</div>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="24">
                <el-form-item label="备注">
                  <div class="content">仙居雅苑</div>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </div>

        <div id="historyId" style="border-bottom: 1px solid #ccc;margin: 50px 0 50px 150px;">
          <div class="title">操作历史</div>
        </div>

        <div class="operateHistoryInfo">
          <el-form size="small" label-width="180px">
            <el-row>
              <el-col :span="24">
                <el-form-item label="操作历史">
                  <div class="content">
                    操作历史操作历史操作历史操作历史操作历史操作历史操作历史操作历史操作历史操作历史操作历史操作历史操作历史操作历史操作历史操作历史操作历史操作历史操作历史操作历史操作历史操作历史操作历史操作历史操作历史操作历史操作历史操作历史操作历史操作历史操作历史操作历史操作历史操作历史操作历史操作历史操作历史操作历史
                  </div>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </div>
      </div>
    </div>

    <div class="operatePanel" style="position: fixed;bottom: 100px;right: 60px;" @click="isPanel = !isPanel">
      <i style="color: #6a8dfb;font-size: 40px;opacity: .8;cursor: pointer" class="el-icon-circle-plus"></i>
    </div>
    <div class="panelContent" id="panelContent" v-show="isPanel">
        <div class="panel_header">
          <div style="color: #6a8dfb;font-size: 16px">
            房屋资料缺失项
          </div>

          <div @click="isPanel = false">
            <span style="color: #fb4694;font-size: 16px;cursor: pointer">取消</span>
          </div>
        </div>

        <div class="title">请输入缺失项目名，并使用 “,”隔开</div>
        <div class="textBox">
          <el-input
            type="textarea"
            :autosize="{ minRows: 6, maxRows: 6}"
            placeholder="请输入内容">
          </el-input>
        </div>
        <div style="margin-bottom: 30px">
          <el-form ref="form" :model="sizeForm" label-width="80px">
            <el-form-item label="选择通知人">
              <el-input readonly=""></el-input>
            </el-form-item>
          </el-form>
        </div>
        <div style="text-align: center;">
          <el-button size="mini" type="primary" style="width: 200px">发&nbsp;&nbsp;送</el-button>
        </div>
    </div>
  </div>

</template>

<script>

  export default {
    data() {
      return {
        steps: 0,
        sizeForm: {},
        isPanel: false,
        houseInfo : [],
        contractInfo : [],
        financeInfo : [],
        returnInfo : [],
        historyInfo : [],
        houseId : '',
        ownerId : '',
        contractId : '',
        financeId : '',
        returnId : '',
        historyId : '',
      }
    },
    mounted(){
      this.initData();
      this.getContractDetail();
      this.houseId = document.getElementById('houseId').offsetTop -201;
      this.ownerId = document.getElementById('ownerId').offsetTop -201;
      this.contractId = document.getElementById('contractId').offsetTop -201;
      this.financeId = document.getElementById('financeId').offsetTop -201;
      this.returnId = document.getElementById('returnId').offsetTop -201;
      this.historyId = document.getElementById('historyId').offsetTop -201;
    },
    methods: {
      getContractDetail(){
         this.$http.get(globalConfig.server+'lease/detail/'+this.$route.query.id +'?collect_or_rent='+this.$route.query.type).then((res) =>{
            if(res.data.code === '60010'){
              this.houseInfo = res.data.data.house;
              this.contractInfo = res.data.data.contract;
              this.financeInfo = res.data.data.finance;
              this.returnInfo = res.data.data.return;
              this.historyInfo = res.data.data.contract;
            }
         })
      },
      initData(){
        document.getElementById('mainContent').addEventListener('scroll', () => {
          let scroll_top = document.getElementById('mainContent').scrollTop;
          if(scroll_top >= this.ownerId && scroll_top<this.contractId){
            this.steps =1;
          }else if(scroll_top >= this.contractId && scroll_top<this.financeId){
            this.steps =2;
          }else if(scroll_top >= this.financeId && scroll_top<this.returnId-201){
            this.steps =3;
          }else if(scroll_top >= this.returnId-201 && scroll_top<this.historyId-201){
            this.steps =4;
          }else if(scroll_top>this.historyId-201){
            this.steps =5;
          }else if(scroll_top < this.ownerId){
            this.steps = 0;
          }
        });
        document.getElementById('mainContent').style.height = window.innerHeight - 240 + 'px';
        window.onresize = function () {
          document.getElementById('mainContent').style.height = window.innerHeight - 240 + 'px';
        }
      },
      changeStep(step){
        this.steps = step;
        switch (step) {
          case 0:
            document.getElementById('mainContent').scrollTop = this.houseId;
            break;
          case 1:
            document.getElementById('mainContent').scrollTop = this.ownerId;
            break;
          case 2:
            document.getElementById('mainContent').scrollTop = this.contractId;
            break;
          case 3:
            document.getElementById('mainContent').scrollTop = this.financeId;
            break;
          case 4:
            document.getElementById('mainContent').scrollTop = this.returnId;
            break;
          case 5:
            document.getElementById('mainContent').scrollTop = this.historyId;
            break;
        }
      },
      getText(e){
        console.log(e.target.innerText)
      }
    },
  }
</script>

<style scoped lang="scss">
  #rentingDetail {
    height: 100%;
    overflow: hidden;
    background: #ffffff;

    .panelContent {
      width: 500px;
      height: 375px;
      background: #FFFFFF;
      z-index: 2000;
      border-radius: 6px;
      position: fixed;
      bottom: 100px;
      right: 230px;
      border: 1px solid rgba(64,158,255,.12);
      box-shadow: 0 2px 4px 0 rgba(64,158,255,.12), 0 0 6px 0 rgba(64,158,255,.04);
      padding: 0 10px;
      .panel_header{
        height: 50px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        box-sizing: border-box;
        border-bottom: 1px solid #E1E1E1;
      }
      .title {
        color: #409EFF;
        margin: 18px 0 10px 0;
        &:before {
          border-radius: 2px;
          margin-right: 5px;
          background: #409EFF;
          border-left: 1px solid #409EFF;
          content: '|';
        }
      }
      .textBox{
        margin-bottom: 15px;
      }
    }

    @media screen and (min-width: 1280px) {
      .stepLine {
        height: 70%;
        position: fixed;
        top: 150px;
        left: 10%;
        z-index: 1000
      }
    }
    @media screen and (max-width: 1279px) {
      .stepLine {
        height: 75%;
        position: fixed;
        top: 150px;
        left: 1%;
        z-index: 1000
      }
    }

    .el-button--mini {
      width: 80px;
    }
    .el-button--primary {
      background-color: #6a8dfb;
      border-color: #6a8dfb;
      box-shadow: 0 2px 8px 0 #6a8dfb;
    }
    .el-button--danger {
      background-color: #fb4694;
      border-color: #fb4694;
      box-shadow: 0 2px 8px 0 #fb4694;
    }
    .el-button--warning {
      background-color: #fdca41;
      border-color: #fdca41;
      box-shadow: 0 2px 8px 0 #fdca41;
    }
    .el-button--success {
      background-color: #58d788;
      border-color: #58d788;
      box-shadow: 0 2px 8px 0 #58d788;
    }
    @media screen and (min-width: 1280px) {
      .top {
        padding: 0 200px;
      }
    }
    @media screen and (max-width: 1279px) {
      .top {
        padding: 0 50px;
      }
    }
    .top {
      height: 100px;
      border-bottom: 1px solid #dbdbdb;
      display: flex;
      align-items: flex-end;
      justify-content: space-between;
      > h3 {
        &:first-child {
          color: #7696fb;
          padding-left: 30px;
          border-left: 5px solid #7696fb;
        }
      }
    }
    @media screen and (min-width: 1280px) {
      .main {
        width: 76%;
      }
    }
    @media screen and (max-width: 1279px) {
      .main {
        width: 95%;
      }
    }
    .main {
      overflow: auto;
      margin: 50px auto;
      padding: 0 50px;
      > div {
        /*margin-bottom: 90px;*/
        &:last-child {
          margin-bottom: 0;
        }
        .content {
          padding: 0 10px;
          min-height: 32px;
          background: #eef3fc;
          border-radius: 4px;
          font-size: 12px;
          color: #727479;
        }
        .image {
          img {
            width: 120px;
            height: 80px;
            border-radius: 4px;
            margin-right: 10px;

          }
        }
      }
    }
  }
</style>
