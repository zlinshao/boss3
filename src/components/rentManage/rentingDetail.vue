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
                  <div class="content">
                    {{houseInfo.building}}-{{houseInfo.unit}}-{{houseInfo.doorplate}}
                  </div>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="房型">
                  <div class="content" v-if="houseInfo.house_type">
                    <span>{{houseInfo.house_type[0]}}</span>室
                    <span>{{houseInfo.house_type[1]}}</span>厅
                    <span>{{houseInfo.house_type[2]}}</span>卫
                  </div>
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
                  <div class="content">{{matchDictionary(houseInfo.decorate)}}</div>
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
                  <div class="content">{{matchDictionary(houseInfo.property_type)}}</div>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="8">
                <el-form-item label="房屋特色">
                  <div class="content">{{matchDictionary(houseInfo.house_feature)}}</div>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </div>

        <div id="ownerId" style="border-bottom: 1px solid #ccc;margin: 50px 0 50px 150px;">
          <div class="title">租客信息</div>
        </div>

        <div class="ownerInfo">
          <el-form size="small" label-width="180px">
            <div v-for="(item,index) in customersInfo">
              <div class="title" style="margin-left: 150px" v-if="index>0">附属租客信息（{{index}}）</div>
              <el-row>
                <el-col :span="8">
                  <el-form-item label="租客姓名">
                    <div class="content">{{item.name}}</div>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="尊称">
                    <div class="content" v-if="item.sex==1">先生</div>
                    <div class="content" v-else="">女士</div>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="联系电话">
                    <div class="content">{{item.phone}}</div>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="8">
                  <el-form-item label="证件类型">
                    <div class="content">{{matchDictionary(item.idtype)}}</div>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="证件号码">
                    <div class="content">{{item.idcard}}</div>
                  </el-form-item>
                </el-col>
              </el-row>
            </div>
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
                  <div class="content" v-if="contractInfo.type">公司单</div>
                  <div class="content" v-else="">非公司单</div>
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
            <el-row>
              <el-col :span="8">
                <el-form-item label="押金(元)">
                  <div class="content">{{contractInfo.deposit}}</div>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="月单价(元)">
                  <div class="content">
                    <span v-for="(item,index) in contractInfo.price">
                      {{item.price}}元，{{item.period}}个月 <span v-show="index<contractInfo.price-1">;</span>
                    </span>
                  </div>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="付款方式">
                  <div class="content">
                    <span v-for="(item,index) in contractInfo.pay_way">
                      {{item.pay_way}}元，{{item.period}}个月 <span v-show="index<contractInfo.pay_way-1">;</span>
                    </span>
                  </div>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="8">
                <el-form-item label="总收入金额">
                  <div class="content">{{contractInfo.money_sum}}</div>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="金额（支付方式）">
                  <div class="content">
                     <span v-for="(item,index) in contractInfo.money_table">
                      {{item.money_sep}}元，{{matchDictionary(item.money_way)}} <span v-show="index<contractInfo.money_table-1">;</span>
                    </span>
                  </div>
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
                <el-form-item label="物业费(元)">
                  <div class="content">{{contractInfo.property}}</div>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="物业费付款方">
                  <div class="content">{{matchDictionary(contractInfo.property)}}</div>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="水表底数(度)">
                  <div class="content">{{contractInfo.property_payer}}</div>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="8">
                <el-form-item label="电表底数(度)">
                  <div class="content">
                    <el-col :span="12">峰：{{contractInfo.electricity_peak}}</el-col>
                    <el-col :span="12">谷：{{contractInfo.electricity_valley}}</el-col>
                  </div>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="气表底数(度)">
                  <div class="content">{{contractInfo.gas}}</div>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="物业及公摊费用(元)">
                  <div class="content">{{contractInfo.public_fee}}</div>
                </el-form-item>
              </el-col>
            </el-row>


            <el-row>

              <el-col :span="8">
                <el-form-item label="开单人">
                  <div class="content">{{contractInfo.staff_name}}</div>；
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="所属部门">
                  <div class="content">{{contractInfo.department_name}}</div>
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
                    <img v-for="(value,key) in contractInfo.photo" :src="value" data-magnify="" :data-src="value">
                  </div>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="24">
                <el-form-item label="证件照片">
                  <div>
                    <el-tabs type="border-card">
                      <el-tab-pane label="证件照片">
                        <div class="image">
                          <img v-for="(value,key) in contractInfo.identity_photo" :src="value" data-magnify="" :data-src="value">
                        </div>
                      </el-tab-pane>
                      <el-tab-pane label="水表照片">
                        <div class="image">
                          <img v-for="(value,key) in contractInfo.water_photo" :src="value" data-magnify="" :data-src="value">
                        </div>
                      </el-tab-pane>
                      <el-tab-pane label="电表照片">
                        <div class="image">
                          <img v-for="(value,key) in contractInfo.electricity_photo" :src="value" data-magnify="" :data-src="value">
                        </div>
                      </el-tab-pane>
                      <el-tab-pane label="燃气表照片">
                        <div class="image">
                          <img v-for="(value,key) in contractInfo.gas_photo" :src="value" data-magnify="" :data-src="value">
                        </div>
                      </el-tab-pane>
                      <el-tab-pane label="交接单">
                        <div class="image">
                          <img v-for="(value,key) in contractInfo.checkin_photo" :src="value" data-magnify="" :data-src="value">
                        </div>
                      </el-tab-pane>

                      <el-tab-pane label="凭证照片">
                        <div class="image">
                          <img v-for="(value,key) in contractInfo.certificate_photo" :src="value" data-magnify="" :data-src="value">
                        </div>
                      </el-tab-pane>
                      <el-tab-pane label="押金收条">
                        <div class="image">
                          <img v-for="(value,key) in contractInfo.deposit_photo" :src="value" data-magnify="" :data-src="value">
                        </div>
                      </el-tab-pane>
                      <el-tab-pane label="补充照片">
                        <div class="image">
                          <img v-for="(value,key) in contractInfo.other_photo" :src="value" data-magnify="" :data-src="value">
                        </div>
                      </el-tab-pane>
                      <el-tab-pane label="退租交接单">
                        <div class="image">
                          <img v-for="(value,key) in contractInfo.checkout_photo" :src="value" data-magnify="" :data-src="value">
                        </div>
                      </el-tab-pane>

                      <el-tab-pane label="退租结算单">
                        <div class="image">
                          <img v-for="(value,key) in contractInfo.checkout_settle_photo" :src="value" data-magnify="" :data-src="value">
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
                  <div class="content"></div>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="回访结果">
                  <div class="content"></div>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="回访满意度">
                  <div class="content"></div>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="24">
                <el-form-item label="备注">
                  <div class="content"></div>
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
        all_dic:[],
      }
    },
    created(){
      this.getDictionary();
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
        this.$http.get(globalConfig.server+'lease/collect/'+this.$route.query.collectId).then((res) =>{
          if(res.data.code === '61010'){
            this.houseInfo = res.data.data;

          }
        });
        this.$http.get(globalConfig.server+'lease/rent/'+this.$route.query.id).then((res) =>{
          if(res.data.code === '61110'){
            this.contractInfo = res.data.data;
            this.customersInfo = res.data.data.customers;

          }
        })
      },

      getDictionary(){
        this.$http.get(globalConfig.server+'setting/dictionary/all').then( (res) => {
          this.all_dic = res.data.data;
        })
      },

      matchDictionary(id){
        let dictionary_name = null;
        this.all_dic.map((item) => {
          if(item.id == id ){
            dictionary_name = item.dictionary_name;
          }
        });
        return dictionary_name;
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
