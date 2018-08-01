<template>
  <div id="rentingDetail"
       v-loading="loadingStatus"
       element-loading-text="拼命加载中"
       element-loading-spinner="el-icon-loading"
       element-loading-background="rgba(255, 255, 255, .8)">

    <div class="stepLine">
      <el-steps direction="vertical" :active="steps" style="cursor: pointer">
        <el-step title="房源信息" @click.native="changeStep(0)"></el-step>
        <el-step title="业主信息" @click.native="changeStep(1)"></el-step>
        <el-step title="合同信息" @click.native="changeStep(2)"></el-step>
        <!--<el-step title="财务信息" @click.native="changeStep(3)"></el-step>-->
        <el-step title="回访记录" @click.native="changeStep(4)"></el-step>
        <!--<el-step title="操作历史" @click.native="changeStep(5)"></el-step>-->
      </el-steps>
    </div>

    <div class="container">
      <div class="top">
        <h3>
          {{contractInfo.community_name}} {{contractInfo.doorplate_str}}
          <span v-if="contractInfo.contract_number">（合同编号 : {{contractInfo.contract_number}}）</span>
        </h3>
        <h3>
          <div style="display: inline-block" v-if="contractInfo.operation &&
              !Array.isArray(contractInfo.operation)&& contractInfo.operation.visit">
            <el-dropdown>
              <el-button type="success" size="mini">
              <span v-if="contractInfo.visit_status">
                {{contractInfo.visit_status.name}}
              </span>
                <i class="el-icon-arrow-down el-icon--right"></i>
              </el-button>
              <el-dropdown-menu slot="dropdown">
                <div>
                  <el-dropdown-item
                      v-for="item in contractInfo.operation.visit" :key="item"
                      @click.native="confirmPress(item)">
                    <span v-if="item === 'to_customer_service_publish'">回访提交</span>
                  </el-dropdown-item>
                </div>
              </el-dropdown-menu>
            </el-dropdown>
          </div>
          <div v-else="" style="display: inline-block">
            <el-button type="success" size="mini">
              <span v-if="contractInfo.visit_status">
                {{contractInfo.visit_status.name}}
              </span>
            </el-button>
          </div>

          <div v-if="contractInfo.operation &&!Array.isArray(contractInfo.operation)&& contractInfo.operation.doc"
               style="display: inline-block">
            <el-dropdown>
              <el-button type="primary" size="mini">
              <span v-if="contractInfo.doc_status">
                {{contractInfo.doc_status.name}}
              </span>
                <i class="el-icon-arrow-down el-icon--right"></i>
              </el-button>
              <el-dropdown-menu slot="dropdown">
                <div>
                  <el-dropdown-item
                      v-for="item in contractInfo.operation.doc" :key="item"
                      @click.native="confirmPress(item)">
                    <span v-if="item === 'to_contract_review'">提交合同审核员审核</span>
                    <span v-if="item === 'to_contract_approved'">合同资料无误，同意</span>
                    <span v-if="item === 'to_cancelled'">撤销审核</span>
                    <span v-if="item === 'to_contract_rejected'">合同资料有误，拒绝</span>
                    <span v-if="item === 'to_house_approved'">房屋资料无误，同意</span>
                    <span v-if="item === 'to_house_rejected'">房屋资料有误，拒绝</span>
                  </el-dropdown-item>
                </div>
              </el-dropdown-menu>
            </el-dropdown>
          </div>
          <div v-else="" style="display: inline-block">
            <el-button type="primary" size="mini">
              <span v-if="contractInfo.doc_status">
                {{contractInfo.doc_status.name}}
              </span>
            </el-button>
          </div>
          <!--精简模式-->
          <div style="display: inline-block" @click="switchSimple">
            <el-button type="primary" size="mini" style="background: #6a8dfb;color: #fff;" v-if="!simple">
              <i class="iconfont icon-jingjianmoshi" style="vertical-align: middle;font-size: 13px;"></i>
              <span>精简模式</span>
            </el-button>
            <el-button type="primary" size="mini" style="background: #6a8dfb;color: #fff;" v-if="simple">
              <i class="iconfont icon-putongmoshi" style="vertical-align: middle;font-size: 13px;"></i>
              <span>普通模式</span>
            </el-button>
          </div>
        </h3>
      </div>
      <div id="mainContent" class="main scroll_bar" v-if="!simple">

        <div id="houseId" style="border-bottom: 1px solid #ccc;margin: 10px 0 50px 150px;">
          <div class="title">房屋信息</div>
        </div>

        <div class="houseInfo">
          <el-form size="small" label-width="180px">
            <el-row>
              <el-col :span="8">
                <el-form-item label="小区名称">
                  <div class="content">{{contractInfo.community_name}}</div>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="小区地址">
                  <div class="content">{{contractInfo.community_address}}</div>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="产权地址">
                  <div class="content">{{contractInfo.community_nickname}}</div>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="8">
                <el-form-item label="门牌地址">
                  <div class="content">
                    {{contractInfo.doorplate_str}}
                  </div>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="房型">
                  <div class="content" v-if="contractInfo.house_type">
                    <span>{{contractInfo.house_type[0]}}</span>室
                    <span>{{contractInfo.house_type[1]}}</span>厅
                    <span>{{contractInfo.house_type[2]}}</span>卫
                  </div>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="房产证号">
                  <div class="content">{{contractInfo.property_number}}</div>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="8">
                <el-form-item label="丘号">
                  <div class="content">{{contractInfo.mound_number}}</div>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="建筑面积">
                  <div class="content">{{contractInfo.area}}</div>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="装修">
                  <div class="content">{{matchDictionary(contractInfo.decorate)}}</div>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="8">
                <el-form-item label="楼层">
                  <div class="content">{{contractInfo.floor}}/{{contractInfo.floors}}</div>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="房屋类型">
                  <div class="content">{{matchDictionary(contractInfo.property_type)}}</div>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="8">
                <el-form-item label="水卡卡号">
                  <div class="content">{{contractInfo.water_card_number}}</div>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="电卡卡号">
                  <div class="content">{{contractInfo.electricity_card_number}}</div>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="燃气卡卡号">
                  <div class="content">{{contractInfo.gas_card_number}}</div>
                </el-form-item>
              </el-col>
            </el-row>
            <!--<el-row>-->
            <!--<el-col :span="8">-->
            <!--<el-form-item label="房屋特色">-->
            <!--<div class="content">{{matchDictionary(contractInfo.house_feature)}}</div>-->
            <!--</el-form-item>-->
            <!--</el-col>-->
            <!--</el-row>-->
          </el-form>
        </div>

        <div id="ownerId" style="border-bottom: 1px solid #ccc;margin: 50px 0 50px 150px;">
          <div class="title">业主信息</div>
        </div>

        <div class="ownerInfo">
          <el-form size="small" label-width="180px">
            <div v-for="(item,index) in customersInfo">
              <div class="title" style="margin-left: 150px" v-if="index>0">附属房东信息（{{index}}）</div>
              <el-row>
                <el-col :span="8">
                  <el-form-item label="房东姓名">
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
                  <div class="content" v-if="contractInfo.contract_type == 1">公司单</div>
                  <div class="content" v-else="">非公司单</div>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="合同编号">
                  <div class="content">{{contractInfo.contract_number}}</div>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="合同性质">
                  <div class="content">
                    <span v-if="contractInfo.type==1">新收</span>
                    <span v-else-if="contractInfo.type==2">续收</span>
                    <span v-else="">/</span>
                  </div>
                </el-form-item>
              </el-col>

            </el-row>
            <el-row>
              <el-col :span="8">
                <el-form-item label="签约时长">
                  <div class="content">{{contractInfo.month}}月{{contractInfo.day}}天</div>
                </el-form-item>
              </el-col>

              <el-col :span="8" class="blueColor">
                <el-form-item label="合同开始时间">
                  <div class="content">{{contractInfo.begin_date}}</div>
                </el-form-item>
              </el-col>
              <el-col :span="8" class="blueColor">
                <el-form-item label="合同结束时间">
                  <div class="content">{{contractInfo.end_date}}</div>
                </el-form-item>
              </el-col>
            </el-row>

            <el-row>
              <el-col :span="8">
                <el-form-item label="空置时长(天)">
                  <div class="content">{{contractInfo.vacancy}}</div>
                </el-form-item>
              </el-col>
              <el-col :span="8" class="blueColor">
                <el-form-item label="空置开始时间">
                  <div class="content">{{contractInfo.begin_date}}</div>
                </el-form-item>
              </el-col>
              <el-col :span="8" class="blueColor">
                <el-form-item label="空置结束时间">
                  <div class="content">{{contractInfo.vacancy_end_date}}</div>
                </el-form-item>
              </el-col>
            </el-row>

            <el-row>

              <el-col :span="8">
                <el-form-item label="空置期安置方式">
                  <div class="content">{{matchDictionary(contractInfo.vacancy_way)}}</div>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="保修期(月)">
                  <div class="content">
                    <span v-if="contractInfo.warranty_month">{{contractInfo.warranty_month}}月</span>
                    <span v-if="contractInfo.warranty_day">{{contractInfo.warranty_day}}天</span>
                  </div>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="押金(元)">
                  <div class="content">{{contractInfo.deposit}}</div>
                </el-form-item>
              </el-col>
            </el-row>

            <el-row>


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
                      {{matchDictionary(item.pay_way)}}，{{item.period}}个月 <span
                        v-show="index<contractInfo.pay_way-1">;</span>
                    </span>
                  </div>
                </el-form-item>
              </el-col>
              <el-col :span="8" class="blueColor">
                <el-form-item label="合同上传时间">
                  <div class="content">{{contractInfo.contract_create_time}}</div>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>

              <el-col :span="8" class="blueColor">
                <el-form-item label="第一次打房租时间">
                  <div class="content">{{contractInfo.pay_first_date}}</div>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="第二次打房租时间">
                  <div class="content">{{contractInfo.pay_second_date}}</div>
                </el-form-item>
              </el-col>
              <el-col :span="8" class="blueColor">
                <el-form-item label="合同签约时间">
                  <div class="content">{{contractInfo.sign_date}}</div>
                </el-form-item>
              </el-col>
            </el-row>

            <el-row>
              <el-col :span="8">
                <el-form-item label="收款人姓名">
                  <div class="content">{{contractInfo.account_name}}</div>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="收款人与房东关系">
                  <div class="content">{{contractInfo.relationship}}</div>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="支付方式">
                  <div class="content">{{matchDictionary(contractInfo.purchase_way)}}</div>
                </el-form-item>
              </el-col>
            </el-row>

            <el-row>
              <el-col :span="8">
                <el-form-item label="账号">
                  <div class="content">{{contractInfo.account}}</div>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="开户行">
                  <div class="content">{{contractInfo.bank}}</div>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="支行">
                  <div class="content">{{contractInfo.subbranch}}</div>
                </el-form-item>
              </el-col>

            </el-row>

            <el-row>
              <el-col :span="8" class="blueColor">
                <el-form-item label="是否中介">
                  <div class="content" v-if="contractInfo.is_agency">中介</div>
                  <div class="content" v-else="">个人</div>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="原中介费(元)">
                  <div class="content">{{contractInfo.agency}}</div>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="现中介费(元)">
                  <div class="content">
                    <span v-if="contractInfo.agency_info && Array.isArray(contractInfo.agency_info)&&contractInfo.agency_info.length>0">
                       {{contractInfo.agency_info[0].agency_price}}
                    </span>
                  </div>
                </el-form-item>
              </el-col>
            </el-row>

            <el-row>
              <el-col :span="8">
                <el-form-item label="中介名称">
                  <div class="content">
                    <span v-if="contractInfo.agency_info && Array.isArray(contractInfo.agency_info)&&contractInfo.agency_info.length>0">
                       {{contractInfo.agency_info[0].agency_name}}
                    </span>
                  </div>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="中介电话">
                  <div class="content">
                    <span v-if="contractInfo.agency_info && Array.isArray(contractInfo.agency_info)&&contractInfo.agency_info.length>0">
                       {{contractInfo.agency_info[0].agency_phone}}
                    </span>
                  </div>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="中介人">
                  <div class="content">
                    <span v-if="contractInfo.agency_info && Array.isArray(contractInfo.agency_info)&&contractInfo.agency_info.length>0">
                       {{contractInfo.agency_info[0].agency_username}}
                    </span>
                  </div>
                </el-form-item>
              </el-col>
            </el-row>

            <el-row>
              <el-col :span="8">
                <el-form-item label="物业费付款方">
                  <div class="content">{{matchDictionary(contractInfo.property_payer)}}</div>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="物业及公摊费用(元)">
                  <div class="content">{{contractInfo.public_fee}}</div>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="违约金(元)">
                  <div class="content">{{contractInfo.penalty}}</div>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="8">
                <el-form-item label="水表底数(度)">
                  <div class="content">{{contractInfo.water}}</div>
                </el-form-item>
              </el-col>
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
            <el-col :span="8">
              <el-form-item label="所属部门">
                <div class="content">{{contractInfo.department_name}}</div>
              </el-form-item>
            </el-col>
            <el-row>
              <el-col :span="8" class="blueColor">
                <el-form-item label="资料补齐时间">
                  <div class="content">{{contractInfo.data_date}}</div>
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
                  <div class="image" id="photo" @dragover='allowDrop($event)'>
                    <img v-for="(value,key) in contractInfo.photo" :src="value"
                         @drag="currentPicId(key)" data-magnify="" :data-src="value">
                  </div>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="24">
                <el-form-item label="其他照片">
                  <div>
                    <el-tabs type="border-card">
                      <el-tab-pane>
                        <span slot="label">
                          <el-badge is-dot class="item" v-if="albumObject.identity_photo.length<1">证件照片</el-badge>
                          <span v-else="">证件照片</span>
                        </span>
                        <div class="image" id="identity_photo" @dragover='allowDrop($event)'>
                          <span v-if="albumObject.identity_photo.length<1">暂无照片</span>
                          <img v-for="(value,key) in contractInfo.identity_photo" @drag="currentPicId(key)"
                               :src="value" data-magnify="" :data-src="value">
                        </div>
                      </el-tab-pane>
                      <el-tab-pane>
                          <span slot="label">
                            <el-badge is-dot class="item" v-if="albumObject.bank_photo.length<1">银行卡照片</el-badge>
                            <span v-else="">银行卡照片</span>
                          </span>

                        <div class="image" id="bank_photo" @dragover='allowDrop($event)'>
                          <span v-if="albumObject.bank_photo.length<1">暂无照片</span>
                          <img v-for="(value,key) in contractInfo.bank_photo" :src="value"
                               data-magnify="" :data-src="value" @drag="currentPicId(key)">
                        </div>
                      </el-tab-pane>
                      <el-tab-pane>
                        <span slot="label">
                          <el-badge is-dot class="item" v-if="albumObject.water_photo.length<1">水表照片</el-badge>
                          <span v-else="">水表照片</span>
                        </span>
                        <div class="image" @dragover='allowDrop($event)' id="water_photo">
                          <span v-if="albumObject.water_photo.length<1">暂无照片</span>
                          <img v-for="(value,key) in contractInfo.water_photo" :src="value"
                               data-magnify="" :data-src="value" @drag="currentPicId(key)">
                        </div>
                      </el-tab-pane>
                      <el-tab-pane>
                        <span slot="label">
                          <el-badge is-dot class="item"
                                    v-if="albumObject.electricity_photo.length<1">电表照片</el-badge>
                          <span v-else="">电表照片</span>
                        </span>
                        <div class="image" @dragover='allowDrop($event)' id="electricity_photo">
                          <span v-if="albumObject.electricity_photo.length<1">暂无照片</span>
                          <img v-for="(value,key) in contractInfo.electricity_photo" :src="value"
                               data-magnify="" :data-src="value" @drag="currentPicId(key)">
                        </div>
                      </el-tab-pane>
                      <el-tab-pane>
                        <span slot="label">
                          <el-badge is-dot class="item" v-if="albumObject.gas_photo.length<1">燃气表照片</el-badge>
                          <span v-else="">燃气表照片</span>
                        </span>
                        <div class="image" @dragover='allowDrop($event)' id="gas_photo">
                          <span v-if="albumObject.gas_photo.length<1">暂无照片</span>
                          <img v-for="(value,key) in contractInfo.gas_photo" :src="value"
                               data-magnify="" :data-src="value" @drag="currentPicId(key)">
                        </div>
                      </el-tab-pane>


                      <el-tab-pane>
                        <span slot="label">
                          <el-badge is-dot class="item" v-if="albumObject.property_photo.length<1">房产证照片</el-badge>
                          <span v-else="">房产证照片</span>
                        </span>
                        <div class="image" @dragover='allowDrop($event)' id="property_photo">
                          <span v-if="albumObject.property_photo.length<1">暂无照片</span>
                          <img v-for="(value,key) in contractInfo.property_photo" :src="value"
                               data-magnify="" :data-src="value" @drag="currentPicId(key)">
                        </div>
                      </el-tab-pane>
                      <el-tab-pane>
                        <span slot="label">
                          <el-badge is-dot class="item" v-if="albumObject.water_card_photo.length<1">水卡照片</el-badge>
                          <span v-else="">水卡照片</span>
                        </span>
                        <div class="image" @dragover='allowDrop($event)' id="water_card_photo">
                          <span v-if="albumObject.water_card_photo.length<1">暂无照片</span>
                          <img v-for="(value,key) in contractInfo.water_card_photo" :src="value"
                               data-magnify="" :data-src="value" @drag="currentPicId(key)">
                        </div>
                      </el-tab-pane>
                      <el-tab-pane>
                        <span slot="label">
                          <el-badge is-dot class="item"
                                    v-if="albumObject.electricity_card_photo.length<1">电卡照片</el-badge>
                          <span v-else="">电卡照片</span>
                        </span>
                        <div class="image" @dragover='allowDrop($event)' id="electricity_card_photo">
                          <span v-if="albumObject.electricity_card_photo.length<1">暂无照片</span>
                          <img v-for="(value,key) in contractInfo.electricity_card_photo" :src="value"
                               data-magnify="" :data-src="value" @drag="currentPicId(key)">
                        </div>
                      </el-tab-pane>

                      <el-tab-pane>
                        <span slot="label">
                          <el-badge is-dot class="item" v-if="albumObject.gas_card_photo.length<1">燃气卡照片</el-badge>
                          <span v-else="">燃气卡照片</span>
                        </span>
                        <div class="image" @dragover='allowDrop($event)' id="gas_card_photo">
                          <span v-if="albumObject.gas_card_photo.length<1">暂无照片</span>
                          <img v-for="(value,key) in contractInfo.gas_card_photo" :src="value"
                               data-magnify="" :data-src="value" @drag="currentPicId(key)">
                        </div>
                      </el-tab-pane>


                      <el-tab-pane>
                        <span slot="label">
                          <el-badge is-dot class="item" v-if="albumObject.checkin_photo.length<1">交接单</el-badge>
                          <span v-else="">交接单</span>
                        </span>
                        <div class="image" @dragover='allowDrop($event)' id="checkin_photo">
                          <span v-if="albumObject.checkin_photo.length<1">暂无照片</span>
                          <img v-for="(value,key) in contractInfo.checkin_photo" :src="value"
                               data-magnify="" :data-src="value" @drag="currentPicId(key)">
                        </div>
                      </el-tab-pane>

                      <el-tab-pane>
                        <span slot="label">
                          <el-badge is-dot class="item" v-if="albumObject.auth_photo.length<1">委托书</el-badge>
                          <span v-else="">委托书</span>
                        </span>
                        <div class="image" @dragover='allowDrop($event)' id="auth_photo">
                          <span v-if="albumObject.auth_photo.length<1">暂无照片</span>
                          <img v-for="(value,key) in contractInfo.auth_photo" :src="value"
                               data-magnify="" :data-src="value" @drag="currentPicId(key)">
                        </div>
                      </el-tab-pane>
                      <el-tab-pane>
                        <span slot="label">
                          <el-badge is-dot class="item" v-if="albumObject.deposit_photo.length<1">押金收条</el-badge>
                          <span v-else="">押金收条</span>
                        </span>
                        <div class="image" @dragover='allowDrop($event)' id="deposit_photo">
                          <span v-if="albumObject.deposit_photo.length<1">暂无照片</span>
                          <img v-for="(value,key) in contractInfo.deposit_photo" :src="value"
                               data-magnify="" :data-src="value" @drag="currentPicId(key)">
                        </div>
                      </el-tab-pane>
                      <el-tab-pane>

                        <span slot="label">
                          <el-badge is-dot class="item" v-if="albumObject.promise.length<1">承诺书照片</el-badge>
                          <span v-else="">承诺书照片</span>
                        </span>
                        <div class="image" @dragover='allowDrop($event)' id="promise">
                          <span v-if="albumObject.promise.length<1">暂无照片</span>
                          <img v-for="(value,key) in contractInfo.promise" :src="value"
                               data-magnify="" :data-src="value" @drag="currentPicId(key)">
                        </div>
                      </el-tab-pane>
                      <el-tab-pane>
                        <span slot="label">
                          <el-badge is-dot class="item" v-if="albumObject.other_photo.length<1">补充照片</el-badge>
                          <span v-else="">补充照片</span>
                        </span>
                        <div class="image" @dragover='allowDrop($event)' id="other_photo">
                          <span v-if="albumObject.other_photo.length<1">暂无照片</span>
                          <img v-for="(value,key) in contractInfo.other_photo" :src="value"
                               data-magnify="" :data-src="value" @drag="currentPicId(key)">
                        </div>
                      </el-tab-pane>
                      <el-tab-pane>

                        <span slot="label">
                          <el-badge is-dot class="item"
                                    v-if="albumObject.checkout_photo.length<1">退租交接单</el-badge>
                          <span v-else="">退租交接单</span>
                        </span>
                        <div class="image" @dragover='allowDrop($event)' id="checkout_photo">
                          <span v-if="albumObject.checkout_photo.length<1">暂无照片</span>
                          <img v-for="(value,key) in contractInfo.checkout_photo"
                               :src="value" data-magnify="" :data-src="value" @drag="currentPicId(key)">
                        </div>
                      </el-tab-pane>

                      <el-tab-pane>

                        <span slot="label">
                          <el-badge is-dot class="item"
                                    v-if="albumObject.checkout_settle_photo.length<1">退租结算单</el-badge>
                          <span v-else="">退租结算单</span>
                        </span>
                        <div class="image" @dragover='allowDrop($event)' id="checkout_settle_photo">
                          <span v-if="albumObject.checkout_settle_photo.length<1">暂无照片</span>
                          <img v-for="(value,key) in contractInfo.checkout_settle_photo" :src="value"
                               data-magnify="" :data-src="value" @drag="currentPicId(key)">
                        </div>
                      </el-tab-pane>

                    </el-tabs>
                  </div>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </div>
        <!--
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
-->
        <div id="returnId" style="border-bottom: 1px solid #ccc;margin: 50px 0 50px 150px;">
          <div class="title">回访信息</div>
        </div>

        <div class="returnVisitInfo">
          <el-form size="small" label-width="180px">
            <div v-if="repairDetail.length<1">
              <el-row>
                <el-col :span="8">
                  <el-form-item label="">
                    暂无回访信息
                  </el-form-item>
                </el-col>
              </el-row>
            </div>
            <div v-else>
              <el-row>
                <el-col :span="8">
                  <el-form-item label="创建时间">
                    <div class="content">{{repairDetail.create_time}}</div>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="合同周期">
                    <div class="content">{{repairDetail.contract_month}}月{{repairDetail.contract_day}}天
                    </div>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="来源">
                    <div class="content">{{repairDetail.originate_name}}</div>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row v-if="repairDetail.originate === 623">
                <el-col :span="8">
                  <el-form-item label="中介名称">
                    <div class="content">{{repairDetail.agency}}</div>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="中介价格">
                    <div class="content">{{repairDetail.agency_price}}</div>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="中介人">
                    <div class="content">{{repairDetail.agency_person}}</div>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="8" v-if="repairDetail.originate === 623">
                  <el-form-item label="中介电话">
                    <div class="content">{{repairDetail.agency_tel}}</div>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="月单价">
                    <div class="content">
                    <span v-for="index in priceLen" :key="index" v-if="index>0">
                      {{repairDetail.unit_price[0][index-1][0]}}-{{repairDetail.unit_price[0][index-1][1]}},
                      {{repairDetail.unit_price[1][index-1]}}元
                       <span v-show="index<priceLen-1">;</span>
                    </span>
                    </div>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="付款方式">
                    <div class="content">
                    <span v-for="index in payForLen" :key="index+55" v-if="index>0">
                      {{repairDetail.pay_type[0][index-1][0]}}-{{repairDetail.pay_type[0][index-1][1]}},
                      <span v-for="item in payTypeInfo" :key="item.id"
                            v-if="repairDetail.pay_type[1][index-1] == item.id">
                        {{item.dictionary_name}}</span>
                      <span v-show="index<payForLen-1">;</span>
                    </span>
                    </div>
                  </el-form-item>
                </el-col>
              </el-row>
              <!-- <el-row>
                <el-col :span="8">
                  <el-form-item label="已付金额" >
                    <div class="content">{{repairDetail.create_time}}</div>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="支付方式" >
                    <div class="content">{{repairDetail.operator}}</div>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="金额">
                    <div class="content">{{item.simple_staff.real_name}}</div>
                  </el-form-item>
                </el-col>
              </el-row> -->
              <el-row>
                <el-col :span="8">
                  <el-form-item label="是否收取其他费用">
                    <div class="content">{{repairDetail.has_extra}}</div>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="保修期">
                    <div class="content">{{repairDetail.guarantee_month}}月{{repairDetail.guarantee_day}}天</div>
                  </el-form-item>
                </el-col>
                <el-col :span="8" v-if="repairDetail.has_extra == '是' ">
                  <el-form-item label="费用名称">
                    <div class="content">
                    <span v-for="index in payUseLen" :key="index+999" v-if="index>0">
                     {{repairDetail.pay_use[0][index-1]}},{{repairDetail.pay_use[1][index-1]}}
                       <span v-show="index<payUseLen-1">;</span>
                    </span>
                    </div>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="24">
                  <el-form-item label="备注条款">
                    <div class="content">{{repairDetail.remark_clause}}</div>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="24">
                  <el-form-item label="业务员态度">
                    <el-rate v-model="repairDetail.star" disabled></el-rate>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="24">
                  <el-form-item label="业务员专业度">
                    <div class="content">{{repairDetail.sale_remark}}</div>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="24">
                  <el-form-item label="备注">
                    <div class="content">{{repairDetail.remark}}</div>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="8">
                  <el-form-item label="中介费">
                    <div class="content">{{agency_price_origin}}</div>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="现中介费">
                    <div class="content">{{agency_price_now}}</div>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="中介名">
                    <div class="content">{{agency_name}}</div>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="8">
                  <el-form-item label="中介人">
                    <div class="content">{{agency_user_name}}</div>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="手机号">
                    <div class="content">{{agency_phone}}</div>
                  </el-form-item>
                </el-col>
              </el-row>

            </div>
          </el-form>
        </div>
      </div>

      <div id="mainContent" v-if="simple">
        <el-row style="height: 100%;">
          <el-col :span="12" id="simple" class="simple_left scroll_bar"
                  style="height: 100%;padding-right: 10px;margin-left: 120px;">
            <div id="houseId" style="border-bottom: 1px solid #ccc;margin: 10px 0 50px 150px;">
              <div class="title">房屋信息</div>
            </div>
            <div class="houseInfo">
              <el-form size="small" label-width="180px" label-position="right" style="margin-left: 100px;">
                <el-form-item label="小区名称">
                  <div class="content">{{contractInfo.community_name}}</div>
                </el-form-item>
                <el-form-item label="小区地址">
                  <div class="content">{{contractInfo.community_address}}</div>
                </el-form-item>
                <el-form-item label="产权地址">
                  <div class="content">{{contractInfo.community_nickname}}</div>
                </el-form-item>
                <el-form-item label="门牌地址">
                  <div class="content">
                    {{contractInfo.doorplate_str}}
                  </div>
                </el-form-item>

                <el-form-item label="房型">
                  <div class="content" v-if="contractInfo.house_type">
                    <span>{{contractInfo.house_type[0]}}</span>室
                    <span>{{contractInfo.house_type[1]}}</span>厅
                    <span>{{contractInfo.house_type[2]}}</span>卫
                  </div>
                </el-form-item>
                <el-form-item label="房产证号">
                  <div class="content">{{contractInfo.property_number}}</div>
                </el-form-item>
                <el-form-item label="丘号">
                  <div class="content">{{contractInfo.mound_number}}</div>
                </el-form-item>
                <el-form-item label="建筑面积">
                  <div class="content">{{contractInfo.area}}</div>
                </el-form-item>

                <el-form-item label="装修">
                  <div class="content">{{matchDictionary(contractInfo.decorate)}}</div>
                </el-form-item>
                <el-form-item label="楼层">
                  <div class="content">{{contractInfo.floor}}/{{contractInfo.floors}}</div>
                </el-form-item>
                <el-form-item label="房屋类型">
                  <div class="content">{{matchDictionary(contractInfo.property_type)}}</div>
                </el-form-item>
                <el-form-item label="水卡卡号">
                  <div class="content">{{contractInfo.water_card_number}}</div>
                </el-form-item>
                <el-form-item label="电卡卡号">
                  <div class="content">{{contractInfo.electricity_card_number}}</div>
                </el-form-item>
                <el-form-item label="燃气卡卡号">
                  <div class="content">{{contractInfo.gas_card_number}}</div>
                </el-form-item>
                <!--<el-form-item label="房屋特色">-->
                <!--<div class="content">{{matchDictionary(contractInfo.house_feature)}}</div>-->
                <!--</el-form-item>-->
              </el-form>
            </div>
            <div id="ownerId" style="border-bottom: 1px solid #ccc;margin: 50px 0 50px 150px;">
              <div class="title">业主信息</div>
            </div>
            <div class="ownerInfo">
              <el-form size="small" label-width="180px" label-position="right" style="margin-left: 100px;">
                <div v-for="(item,index) in customersInfo">
                  <div class="title" style="margin-left: 120px" v-if="index>0">附属房东信息（{{index}}）</div>

                  <el-form-item label="房东姓名">
                    <div class="content">{{item.name}}</div>
                  </el-form-item>

                  <el-form-item label="尊称">
                    <div class="content" v-if="item.sex==1">先生</div>
                    <div class="content" v-else="">女士</div>
                  </el-form-item>

                  <el-form-item label="联系电话">
                    <div class="content">{{item.phone}}</div>
                  </el-form-item>

                  <el-form-item label="证件类型">
                    <div class="content">{{matchDictionary(item.idtype)}}</div>
                  </el-form-item>
                  <el-form-item label="证件号码">
                    <div class="content">{{item.idcard}}</div>
                  </el-form-item>
                </div>
              </el-form>
            </div>
            <div id="contractId" style="border-bottom: 1px solid #ccc;margin: 50px 0 50px 150px;">
              <div class="title">合同信息</div>
            </div>
            <div class="contractInfo">
              <el-form size="small" label-width="180px" label-position="right" style="margin-left: 100px;">
                <el-form-item label="订单性质">
                  <div class="content" v-if="contractInfo.contract_type == 1">公司单</div>
                  <div class="content" v-else="">非公司单</div>
                </el-form-item>
                <el-form-item label="合同编号">
                  <div class="content">{{contractInfo.contract_number}}</div>
                </el-form-item>
                <el-form-item label="合同性质">
                  <div class="content">
                    <span v-if="contractInfo.type==1">新租</span>
                    <span v-else-if="contractInfo.type==2">转租</span>
                    <span v-else-if="contractInfo.type==3">续租</span>
                    <span v-else-if="contractInfo.type==4">未收先租</span>
                    <span v-else-if="contractInfo.type==5">调租</span>
                    <span v-else="">/</span>
                  </div>
                </el-form-item>
                <el-form-item label="签约时长">
                  <div class="content">{{contractInfo.month}}月{{contractInfo.day}}天</div>
                </el-form-item>
                <el-form-item label="合同开始时间" class="blueColor">
                  <div class="content">{{contractInfo.begin_date}}</div>
                </el-form-item>
                <el-form-item label="合同结束时间" class="blueColor">
                  <div class="content">{{contractInfo.end_date}}</div>
                </el-form-item>
                <el-form-item label="空置时长(天)">
                  <div class="content">{{contractInfo.vacancy}}</div>
                </el-form-item>
                <el-form-item label="空置开始时间" class="blueColor">
                  <div class="content">{{contractInfo.begin_date}}</div>
                </el-form-item>
                <el-form-item label="空置结束时间" class="blueColor">
                  <div class="content">{{contractInfo.vacancy_end_date}}</div>
                </el-form-item>
                <el-form-item label="空置期安置方式">
                  <div class="content">{{matchDictionary(contractInfo.vacancy_way)}}</div>
                </el-form-item>
                <el-form-item label="保修期(月)">
                  <div class="content">
                    <span v-if="contractInfo.warranty_month">{{contractInfo.warranty_month}}月</span>
                    <span v-if="contractInfo.warranty_day">{{contractInfo.warranty_day}}天</span>
                  </div>
                </el-form-item>
                <el-form-item label="押金(元)">
                  <div class="content">{{contractInfo.deposit}}</div>
                </el-form-item>
                <el-form-item label="月单价(元)">
                  <div class="content">
                    <span v-for="(item,index) in contractInfo.price">
                      {{item.price}}元，{{item.period}}个月 <span v-show="index<contractInfo.price-1">;</span>
                    </span>
                  </div>
                </el-form-item>
                <el-form-item label="付款方式">
                  <div class="content">
                    <span v-for="(item,index) in contractInfo.pay_way">
                      {{matchDictionary(item.pay_way)}}，{{item.period}}个月 <span
                        v-show="index<contractInfo.pay_way-1">;</span>
                    </span>
                  </div>
                </el-form-item>
                <el-form-item label="合同上传时间" class="blueColor">
                  <div class="content">{{contractInfo.contract_create_time}}</div>
                </el-form-item>
                <el-form-item label="第一次打房租时间" class="blueColor">
                  <div class="content">{{contractInfo.pay_first_date}}</div>
                </el-form-item>
                <el-form-item label="第二次打房租时间">
                  <div class="content">{{contractInfo.pay_second_date}}</div>
                </el-form-item>
                <el-form-item label="合同签约时间" class="blueColor">
                  <div class="content">{{contractInfo.sign_date}}</div>
                </el-form-item>
                <el-form-item label="收款人姓名">
                  <div class="content">{{contractInfo.account_name}}</div>
                </el-form-item>
                <el-form-item label="收款人与房东关系">
                  <div class="content">{{contractInfo.relationship}}</div>
                </el-form-item>
                <el-form-item label="支付方式">
                  <div class="content">{{matchDictionary(contractInfo.purchase_way)}}</div>
                </el-form-item>
                <el-form-item label="账号">
                  <div class="content">{{contractInfo.account}}</div>
                </el-form-item>
                <el-form-item label="开户行">
                  <div class="content">{{contractInfo.bank}}</div>
                </el-form-item>
                <el-form-item label="支行">
                  <div class="content">{{contractInfo.subbranch}}</div>
                </el-form-item>
                <div class="blueColor">
                  <el-form-item label="是否中介">
                    <div class="content" v-if="contractInfo.is_agency">中介</div>
                    <div class="content" v-else="">个人</div>
                  </el-form-item>
                </div>
                <el-form-item label="原中介费(元)">
                  <div class="content">{{contractInfo.agency}}</div>
                </el-form-item>
                <el-form-item label="现中介费(元)">
                  <div class="content">
                    <span v-if="contractInfo.agency_info && Array.isArray(contractInfo.agency_info)&&contractInfo.agency_info.length>0">
                       {{contractInfo.agency_info[0].agency_price}}
                    </span>
                  </div>
                </el-form-item>
                <el-form-item label="中介名称">
                  <div class="content">
                    <span v-if="contractInfo.agency_info && Array.isArray(contractInfo.agency_info)&&contractInfo.agency_info.length>0">
                       {{contractInfo.agency_info[0].agency_name}}
                    </span>
                  </div>
                </el-form-item>
                <el-form-item label="中介电话">
                  <div class="content">
                    <span v-if="contractInfo.agency_info && Array.isArray(contractInfo.agency_info)&&contractInfo.agency_info.length>0">
                       {{contractInfo.agency_info[0].agency_phone}}
                    </span>
                  </div>
                </el-form-item>
                <el-form-item label="中介人">
                  <div class="content">
                    <span v-if="contractInfo.agency_info && Array.isArray(contractInfo.agency_info)&&contractInfo.agency_info.length>0">
                       {{contractInfo.agency_info[0].agency_username}}
                    </span>
                  </div>
                </el-form-item>
                <el-form-item label="物业费付款方">
                  <div class="content">{{matchDictionary(contractInfo.property_payer)}}</div>
                </el-form-item>
                <el-form-item label="物业及公摊费用(元)">
                  <div class="content">{{contractInfo.public_fee}}</div>
                </el-form-item>
                <el-form-item label="违约金(元)">
                  <div class="content">{{contractInfo.penalty}}</div>
                </el-form-item>
                <el-form-item label="水表底数(度)">
                  <div class="content">{{contractInfo.water}}</div>
                </el-form-item>
                <el-form-item label="电表底数(度)">
                  <div class="content">
                    <el-col :span="12">峰：{{contractInfo.electricity_peak}}</el-col>
                    <el-col :span="12">谷：{{contractInfo.electricity_valley}}</el-col>
                  </div>
                </el-form-item>
                <el-form-item label="气表底数(度)">
                  <div class="content">{{contractInfo.gas}}</div>
                </el-form-item>
                <el-form-item label="开单人">
                  <div class="content">{{contractInfo.staff_name}}</div>
                </el-form-item>
                <el-form-item label="负责人">
                  <div class="content">{{contractInfo.leader_name}}</div>
                </el-form-item>

                <el-form-item label="所属部门">
                  <div class="content">{{contractInfo.department_name}}</div>
                </el-form-item>
                <el-form-item label="资料补齐时间" class="blueColor">
                  <div class="content">{{contractInfo.data_date}}</div>
                </el-form-item>
                <el-form-item label="备注条款">
                  <div class="content">{{contractInfo.remark_terms}}</div>
                </el-form-item>
                <el-form-item label="备注">
                  <div class="content">{{contractInfo.remark}}</div>
                </el-form-item>
                <el-form-item label="合同照片">
                  <div class="image">
                    <img v-for="(value,key) in contractInfo.photo" :src="value" data-magnify="" data-align="right"
                         :data-src="value">
                  </div>
                </el-form-item>
                <el-row>
                  <el-col :span="24">
                    <el-form-item label="其他照片">
                      <div>
                        <div class="title">证件照片</div>
                        <div class="image">
                          <span v-if="albumObject.identity_photo.length<1">暂无照片</span>
                          <img v-for="(value,key) in contractInfo.identity_photo" data-align="right"
                               :src="value" data-magnify="" :data-src="value">
                        </div>
                        <div class="title">银行卡照片</div>
                        <div class="image" id="bank_photo" @dragover='allowDrop($event)'>
                          <span v-if="albumObject.bank_photo.length<1">暂无照片</span>
                          <img v-for="(value,key) in contractInfo.bank_photo" :src="value"
                               data-align="right" data-magnify="" :data-src="value">
                        </div>
                        <div class="title">水表照片</div>
                        <div class="image" @dragover='allowDrop($event)' id="water_photo">
                          <span v-if="albumObject.water_photo.length<1">暂无照片</span>
                          <img v-for="(value,key) in contractInfo.water_photo" :src="value"
                               data-align="right" data-magnify="" :data-src="value">
                        </div>
                        <div class="title">电表照片</div>
                        <div class="image" @dragover='allowDrop($event)' id="electricity_photo">
                          <span v-if="albumObject.electricity_photo.length<1">暂无照片</span>
                          <img v-for="(value,key) in contractInfo.electricity_photo" :src="value"
                               data-align="right" data-magnify="" :data-src="value">
                        </div>
                        <div class="title">燃气表照片</div>
                        <div class="image" @dragover='allowDrop($event)' id="gas_photo">
                          <span v-if="albumObject.gas_photo.length<1">暂无照片</span>
                          <img v-for="(value,key) in contractInfo.gas_photo" :src="value"
                               data-align="right" data-magnify="" :data-src="value">
                        </div>
                        <div class="title">房产证照片</div>
                        <div class="image" @dragover='allowDrop($event)' id="property_photo">
                          <span v-if="albumObject.property_photo.length<1">暂无照片</span>
                          <img v-for="(value,key) in contractInfo.property_photo" :src="value"
                               data-align="right" data-magnify="" :data-src="value">
                        </div>
                        <div class="title">水卡照片</div>
                        <div class="image" @dragover='allowDrop($event)' id="water_card_photo">
                          <span v-if="albumObject.water_card_photo.length<1">暂无照片</span>
                          <img v-for="(value,key) in contractInfo.water_card_photo" :src="value"
                               data-align="right" data-magnify="" :data-src="value">
                        </div>
                        <div class="title">电卡照片</div>
                        <div class="image" @dragover='allowDrop($event)' id="electricity_card_photo">
                          <span v-if="albumObject.electricity_card_photo.length<1">暂无照片</span>
                          <img v-for="(value,key) in contractInfo.electricity_card_photo" :src="value"
                               data-align="right" data-magnify="" :data-src="value">
                        </div>
                        <div class="title">燃气卡照片</div>
                        <div class="image" @dragover='allowDrop($event)' id="gas_card_photo">
                          <span v-if="albumObject.gas_card_photo.length<1">暂无照片</span>
                          <img v-for="(value,key) in contractInfo.gas_card_photo" :src="value"
                               data-align="right" data-magnify="" :data-src="value">
                        </div>
                        <div class="title">交接单</div>
                        <div class="image" @dragover='allowDrop($event)' id="checkin_photo">
                          <span v-if="albumObject.checkin_photo.length<1">暂无照片</span>
                          <img v-for="(value,key) in contractInfo.checkin_photo" :src="value"
                               data-align="right" data-magnify="" :data-src="value">
                        </div>
                        <div class="title">委托书</div>
                        <div class="image" @dragover='allowDrop($event)' id="auth_photo">
                          <span v-if="albumObject.auth_photo.length<1">暂无照片</span>
                          <img v-for="(value,key) in contractInfo.auth_photo" :src="value"
                               data-align="right" data-magnify="" :data-src="value">
                        </div>
                        <div class="title">押金收条</div>
                        <div class="image" @dragover='allowDrop($event)' id="deposit_photo">
                          <span v-if="albumObject.deposit_photo.length<1">暂无照片</span>
                          <img v-for="(value,key) in contractInfo.deposit_photo" :src="value"
                               data-align="right" data-magnify="" :data-src="value">
                        </div>
                        <div class="title">承诺书照片</div>
                        <div class="image" @dragover='allowDrop($event)' id="promise">
                          <span v-if="albumObject.promise.length<1">暂无照片</span>
                          <img v-for="(value,key) in contractInfo.promise" :src="value"
                               data-align="right" data-magnify="" :data-src="value">
                        </div>
                        <div class="title">补充照片</div>
                        <div class="image" @dragover='allowDrop($event)' id="other_photo">
                          <span v-if="albumObject.other_photo.length<1">暂无照片</span>
                          <img v-for="(value,key) in contractInfo.other_photo" :src="value"
                               data-align="right" data-magnify="" :data-src="value">
                        </div>
                        <div class="title">退租交接单</div>
                        <div class="image" @dragover='allowDrop($event)' id="checkout_photo">
                          <span v-if="albumObject.checkout_photo.length<1">暂无照片</span>
                          <img v-for="(value,key) in contractInfo.checkout_photo"
                               data-align="right" :src="value" data-magnify="" :data-src="value">
                        </div>
                        <div class="title">退租结算单</div>
                        <div class="image" @dragover='allowDrop($event)' id="checkout_settle_photo">
                          <span v-if="albumObject.checkout_settle_photo.length<1">暂无照片</span>
                          <img v-for="(value,key) in contractInfo.checkout_settle_photo" :src="value"
                               data-align="right" data-magnify="" :data-src="value">
                        </div>
                      </div>
                    </el-form-item>
                  </el-col>
                </el-row>
              </el-form>
            </div>

            <div id="returnId" style="border-bottom: 1px solid #ccc;margin: 50px 0 50px 150px;">
              <div class="title">回访信息</div>
            </div>
            <div class="returnVisitInfo">
              <el-form size="small" label-width="180px" label-position="right" style="margin-left: 100px;">
                <div v-if="repairDetail.length<1">
                  <el-form-item label="">
                    暂无回访信息
                  </el-form-item>
                </div>
                <div v-else>
                  <el-form-item label="创建时间">
                    <div class="content">{{repairDetail.create_time}}</div>
                  </el-form-item>
                  <el-form-item label="合同周期">
                    <div class="content">{{repairDetail.contract_month}}月{{repairDetail.contract_day}}天
                    </div>
                  </el-form-item>
                  <el-form-item label="来源">
                    <div class="content">{{repairDetail.originate_name}}</div>
                  </el-form-item>
                  <el-form-item label="中介名称" v-if="repairDetail.originate === 623">
                    <div class="content">{{repairDetail.agency}}</div>
                  </el-form-item>
                  <el-form-item label="中介价格" v-if="repairDetail.originate === 623">
                    <div class="content">{{repairDetail.agency_price}}</div>
                  </el-form-item>
                  <el-form-item label="中介人" v-if="repairDetail.originate === 623">
                    <div class="content">{{repairDetail.agency_person}}</div>
                  </el-form-item>
                  <el-form-item label="中介电话" v-if="repairDetail.originate === 623">
                    <div class="content">{{repairDetail.agency_tel}}</div>
                  </el-form-item>
                  <el-form-item label="月单价">
                    <div class="content">
                    <span v-for="index in priceLen" :key="index" v-if="index>0">
                      {{repairDetail.unit_price[0][index-1][0]}}-{{repairDetail.unit_price[0][index-1][1]}},
                      {{repairDetail.unit_price[1][index-1]}}元
                       <span v-show="index<priceLen-1">;</span>
                    </span>
                    </div>
                  </el-form-item>
                  <el-form-item label="付款方式">
                    <div class="content">
                    <span v-for="index in payForLen" :key="index+55" v-if="index>0">
                      {{repairDetail.pay_type[0][index-1][0]}}-{{repairDetail.pay_type[0][index-1][1]}},
                      <span v-for="item in payTypeInfo" :key="item.id"
                            v-if="repairDetail.pay_type[1][index-1] == item.id">
                        {{item.dictionary_name}}</span>
                      <span v-show="index<payForLen-1">;</span>
                    </span>
                    </div>
                  </el-form-item>
                  <!-- <el-row>
                    <el-col :span="8">
                      <el-form-item label="已付金额" >
                        <div class="content">{{repairDetail.create_time}}</div>
                      </el-form-item>
                    </el-col>
                    <el-col :span="8">
                      <el-form-item label="支付方式" >
                        <div class="content">{{repairDetail.operator}}</div>
                      </el-form-item>
                    </el-col>
                    <el-col :span="8">
                      <el-form-item label="金额">
                        <div class="content">{{item.simple_staff.real_name}}</div>
                      </el-form-item>
                    </el-col>
                  </el-row> -->
                  <el-form-item label="是否收取其他费用">
                    <div class="content">{{repairDetail.has_extra}}</div>
                  </el-form-item>
                  <el-form-item label="保修期">
                    <div class="content">{{repairDetail.guarantee_month}}月{{repairDetail.guarantee_day}}天</div>
                  </el-form-item>
                  <el-form-item label="费用名称" v-if="repairDetail.has_extra == '是' ">
                    <div class="content">
                    <span v-for="index in payUseLen" :key="index+999" v-if="index>0">
                     {{repairDetail.pay_use[0][index-1]}},{{repairDetail.pay_use[1][index-1]}}
                       <span v-show="index<payUseLen-1">;</span>
                    </span>
                    </div>
                  </el-form-item>
                  <el-form-item label="备注条款">
                    <div class="content">{{repairDetail.remark_clause}}</div>
                  </el-form-item>
                  <el-form-item label="业务员态度">
                    <el-rate v-model="repairDetail.star" disabled></el-rate>
                  </el-form-item>
                  <el-form-item label="业务员专业度">
                    <div class="content">{{repairDetail.sale_remark}}</div>
                  </el-form-item>
                  <el-form-item label="备注">
                    <div class="content">{{repairDetail.remark}}</div>
                  </el-form-item>
                  <el-form-item label="中介费">
                    <div class="content">{{agency_price_origin}}</div>
                  </el-form-item>
                  <el-form-item label="现中介费">
                    <div class="content">{{agency_price_now}}</div>
                  </el-form-item>
                  <el-form-item label="中介名">
                    <div class="content">{{agency_name}}</div>
                  </el-form-item>
                  <el-form-item label="中介人">
                    <div class="content">{{agency_user_name}}</div>
                  </el-form-item>
                  <el-form-item label="手机号">
                    <div class="content">{{agency_phone}}</div>
                  </el-form-item>
                </div>
              </el-form>
            </div>
          </el-col>
          <el-col :span="10" style="height: 100%;"></el-col>
        </el-row>
      </div>
    </div>

    <div class="operatePanel" style="position: fixed;bottom: 120px;right: 80px;" v-if="!isModal"
         @click="isModal = true">
      <i style="color: #6a8dfb;font-size: 40px;opacity: .8;cursor: pointer" class="el-icon-circle-plus"></i>
    </div>
    <transition name="el-zoom-in-bottom">
      <div class="operatePanel" style="position: fixed;bottom: 120px;right: 80px;z-index: 10000;" v-if="isModal"
           @click="isModal = false">
        <div class="buttonItem" @click="isPanel = true" title="添加备忘">
          <i style="font-size: 20px;color: #FFFFFF;line-height: 38px" class="iconfont icon-bianji--"></i>
        </div>
        <div class="buttonItem" @click="memoDialog = true" title="备忘记录">
          <i style="font-size: 20px;color: #FFFFFF;line-height: 38px" class="el-icon-document"></i>
        </div>
        <div class="buttonItem" @click="approvalHistoryDialog = true" title="审批历史详情">
          <i style="font-size: 20px;color: #FFFFFF;line-height: 38px" class="iconfont icon-chakanlishixiangqing"></i>
        </div>
        <div class="buttonItem" @click="isModal = false">
          <i style="font-size: 20px;color: #FFFFFF;line-height: 38px" class="el-icon-minus"></i>
        </div>
      </div>
    </transition>
    <div style="position: fixed;width: 100%;height: 100%;top:0;right:0;left:0;bottom:0;
                z-index: 9999;background: rgba(255,255,255,.3)" @click="isModal = false" v-if="isModal"></div>


    <div class="panelContent" id="panelContent" :class="{'div_fade': isPanel}">
      <div class="panel_header">
        <div style="color: #6a8dfb;font-size: 16px">
          房屋资料缺失项
        </div>
        <div @click="isPanel = false">
          <!--<span style="color: #fb4694;font-size: 16px;cursor: pointer">取消</span>-->
          <i style="font-size: 23px;opacity: .8;cursor: pointer" class="el-icon-close"></i>
        </div>
      </div>
      <div style="padding: 10px;">
        <div class="title">请输入缺失项目名，并使用 “,”隔开</div>
        <div class="textBox">
          <el-input
              type="textarea"
              :autosize="{ minRows: 6, maxRows: 6}"
              v-model="params.content"
              placeholder="请输入内容">
          </el-input>
        </div>
        <div style="margin-bottom: 30px">
          <el-form ref="form" :model="sizeForm" label-width="80px">
            <el-col :span="18">
              <el-form-item label="选择通知人">
                <el-input readonly="" v-model="receiverNames" size="mini" @focus="selectPeople">
                  <template slot="append">
                    <div style="cursor: pointer;" @click="emptyPeople">清空</div>
                  </template>
                </el-input>
              </el-form-item>
            </el-col>
          </el-form>
        </div>
        <div style="text-align: center;clear: both;">
          <el-button size="mini" :disabled="!canSendStatus" type="primary" @click="noteSave(1)">发 送</el-button>&nbsp;&nbsp;&nbsp;
          <el-button size="mini" :disabled="!canSendStatus" type="primary" @click="noteSave(0)">保 存</el-button>
        </div>
      </div>

    </div>
    <el-dialog :close-on-click-modal="false" title="客户信息" :visible.sync="customerInfoDialog" width="50%">
      <div v-for="(item, index) in customerInfo">
        <div class="title">旧客户({{index+1}})</div>
        <div class="form_border">
          <el-form onsubmit="return false" size="mini" label-width="70px">
            <el-row>
              <el-col :span="4">
                <el-form-item label="姓名">
                  <div class="content">
                    <span v-if="item.old && item.old.name">{{item.old && item.old.name}}</span>
                    <span v-else>暂无</span>
                  </div>
                </el-form-item>
              </el-col>
              <el-col :span="4">
                <el-form-item label="姓别">
                  <div class="content" v-if="item.old && item.old.sex==1">男</div>
                  <div class="content" v-else-if="item.old && item.old.sex==0">女</div>
                  <div class="content" v-else>暂无</div>
                </el-form-item>
              </el-col>
              <el-col :span="5">
                <el-form-item label="手机号">
                  <div class="content">
                    <span v-if="item.old && item.old.phone">{{item.old && item.old.phone}}</span>
                    <span v-else>暂无</span>
                  </div>
                </el-form-item>
              </el-col>
              <el-col :span="5">
                <el-form-item label="证件类型">
                  <div class="content" v-if="item.old && item.old.idtype && item.old.idtype.dictionary_name">{{item.old && item.old.idtype && item.old.idtype.dictionary_name}}</div>
                  <div class="content" v-else>暂无</div>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="证件号码">
                  <div class="content" v-if="item.old && item.old.idcard">{{item.old && item.old.idcard}}</div>
                  <div class="content" v-else>暂无</div>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </div>
        <div class="title">新客户({{index+1}})</div>
        <div class="form_border">
          <el-form onsubmit="return false" size="mini" label-width="70px">
            <el-row>
              <el-col :span="4">
                <el-form-item label="姓名">
                  <div class="content" v-if="item.new && item.new.name">{{item.new && item.new.name}}</div>
                  <div class="content" v-else>暂无</div>
                </el-form-item>
              </el-col>
              <el-col :span="4">
                <el-form-item label="姓别">
                  <div class="content" v-if="item.new && item.new.sex==1">男</div>
                  <div class="content" v-else-if="item.new && item.new.sex==0">女</div>
                  <div class="content" v-else>暂无</div>
                </el-form-item>
              </el-col>
              <el-col :span="5">
                <el-form-item label="手机号">
                  <div class="content" v-if="item.new && item.new.phone">{{item.new && item.new.phone}}</div>
                  <div class="content" v-else>暂无</div>
                </el-form-item>
              </el-col>
              <el-col :span="5">
                <el-form-item label="证件类型">
                  <div class="content" v-if="item.new && item.new.idtype && item.new.idtype.dictionary_name">{{item.new && item.new.idtype && item.new.idtype.dictionary_name}}</div>
                  <div class="content" v-else>暂无</div>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="证件号码">
                  <div class="content" v-if="item.new && item.new.idcard">{{item.new && item.new.idcard}}</div>
                  <div class="content" v-else>暂无</div>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </div>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button size="small" @click="customerInfoDialog=false">取 消</el-button>
        <!--<el-button size="small" type="primary" @click="leaseStatusPress('add')">新 增</el-button>-->
        <el-button size="small" type="primary" @click="leaseStatusPress('update')">修 改</el-button>
        <el-button size="small" type="primary" @click="leaseStatusPress('continue')">使用旧客户</el-button>
      </div>
    </el-dialog>
    <Organization :organizationDialog="organizationDialog" :type="type" @close="closeOrganization"
                  @selectMember="selectMember"></Organization>
    <MemorandumRecord :memoDialog="memoDialog" is_rent="0" :selectContractId="contract_id"
                      @close="closeOrganization"></MemorandumRecord>
    <ApprovalHistory :approvalHistory="approvalHistoryDialog" is_rent="0" :contractId="contract_id"
                     @close="closeOrganization"></ApprovalHistory>
  </div>
</template>

<script>

  import Organization from '../common/organization.vue';
  import MemorandumRecord from './components/memorandumRecord'
  import ApprovalHistory from './components/approvalHistory'

  export default {
    components: {Organization, MemorandumRecord, ApprovalHistory},
    data() {
      return {
        simple: false,
        steps: 0,
        sizeForm: {},
        isPanel: false,
        isModal: false,
        memoDialog: false,
        approvalHistoryDialog: false,
        houseInfo: [],
        customersInfo: [],
        contractInfo: [],
        financeInfo: [],
        returnInfo: [],
        historyInfo: [],
        houseId: '',
        ownerId: '',
        contractId: '',
        financeId: '',
        returnId: '',
        historyId: '',
        all_dic: [],   //房屋类型
        organizationDialog: false,
        type: '',
        contract_id: this.$route.query.id, //合同Id
        params: {
          contract_id: this.$route.query.id,
          content: '',
          receiver_id: [],
          is_rent: 0,
          is_send: null,
        },

        history_content: '',   //历史备忘
        canSendStatus: false,
        receiverNames: '',
        loadingStatus: true,
        reBackData: [],
        approveParams: {
          is_rent: 0,
          operation: '',
          type: '',
        },
        dragPicId: '',

        albumObject: {
          photo: [],
          identity_photo: [],
          bank_photo: [],
          water_photo: [],
          electricity_photo: [],
          gas_photo: [],
          property_photo: [],
          water_card_photo: [],
          electricity_card_photo: [],
          gas_card_photo: [],
          checkin_photo: [],
          auth_photo: [],
          deposit_photo: [],
          promise: [],
          other_photo: [],
          checkout_photo: [],
          checkout_settle_photo: [],
        },

        operation: {
          doc: [
            "to_contract_review",
            "to_contract_approved",
            "to_cancelled",
            "to_contract_rejected",
            "to_house_approved",
            "to_house_rejected"
          ],
          visit: [
            "to_customer_service_review",
            "to_customer_service_publish"
          ]
        },
        //回访相关
        form: {
          contract_id: '',
          module: 1
        },
        priceLen: 0,
        payForLen: 0,
        payTypeLen: 0,
        payUseLen: 0,
        album: [],
        payTypeInfo: [],
        repairDetail: [],
        agency_price_origin: "",            //中介费
        agency_price_now: "",               //现中介费
        agency_name: "",                    //中介名
        agency_user_name: "",               //中介人
        agency_phone: "",                   //手机号
        needReGet: true,
        customerInfoDialog: false,   //客户信息
        customerInfo: [],
      }
    },
    beforeCreate() {

    },
    created() {
      this.getDictionary();

    },
    mounted() {
      this.initData();
      this.getContractDetail();
      this.getReBackDetail();
      this.getFeedBack();
      this.houseId = document.getElementById('houseId').offsetTop - 201;
      this.ownerId = document.getElementById('ownerId').offsetTop - 201;
      this.contractId = document.getElementById('contractId').offsetTop - 201;
//      this.financeId = document.getElementById('financeId').offsetTop - 201;
      this.returnId = document.getElementById('returnId').offsetTop - 201;
//      this.historyId = document.getElementById('historyId').offsetTop - 201;
    },
    watch: {
      // 自动获取上一条备忘
      isPanel(val) {
        if (val && this.needReGet) {
          this.getMemorandum();
        }
      },
      'params.content': {
        deep: true,
        handler(val, oldVal) {
          this.canSendStatus = val !== this.history_content;
        }
      }
    },
    methods: {
      switchSimple() {
        this.simple = !this.simple;
        if (this.simple) {
          setTimeout(() => {
            document.getElementById('simple').addEventListener('scroll', () => {
              this.houseId = document.getElementById('houseId').offsetTop - 60;
              this.ownerId = document.getElementById('ownerId').offsetTop - 200;
              this.contractId = document.getElementById('contractId').offsetTop - 200;
              this.returnId = document.getElementById('returnId').offsetTop;
              let scroll_top = document.getElementById('simple').scrollTop;
              if (scroll_top >= this.houseId && scroll_top < this.ownerId) {
                this.steps = 1;
              } else if (scroll_top >= this.ownerId && scroll_top < this.contractId) {
                this.steps = 2;
              } else if (scroll_top >= this.contractId && scroll_top < this.returnId) {
                this.steps = 4;
              } else if (scroll_top < this.houseId) {
                this.steps = 0;
              }
            });
            // this.changeStep(this.steps);
          }, 500)
        } else {
          this.initData();
        }
        if ($('.magnify-modal') && $('.magnify-modal').length) {
          $('.el-icon-close').click();
        }
      },
      //获取历史备忘记录
      getMemorandum() {
        this.history_content = '';
        this.params.content = '';
        this.needReGet = false;
        this.$http.get(globalConfig.server + 'lease/note?is_rent=0&contract_id=' + this.contract_id).then((res) => {
          if (res.data.code === '60510') {
            if (res.data.data) {
              this.history_content = res.data.data.content;
              this.params.content = res.data.data.content;
              if (res.data.data.receiver_id) {
                this.params.receiver_id = [];
                let receiver = res.data.data.receiver_id;
                let names = [];
                receiver.forEach((item) => {
                  this.params.receiver_id.push(item.id);
                  names.push(item.name);
                });
                this.receiverNames = names.join(',');
              }
            }
          }
        })
      },
      //图片拖拽
      dragInit() {
        let photo = document.getElementById('photo');
        let identity_photo = document.getElementById('identity_photo');
        let bank_photo = document.getElementById('bank_photo');
        let water_photo = document.getElementById('water_photo');
        let electricity_photo = document.getElementById('electricity_photo');
        let gas_photo = document.getElementById('gas_photo');
        let property_photo = document.getElementById('property_photo');
        let water_card_photo = document.getElementById('water_card_photo');
        let electricity_card_photo = document.getElementById('electricity_card_photo');
        let gas_card_photo = document.getElementById('gas_card_photo');
        let checkin_photo = document.getElementById('checkin_photo');
        let auth_photo = document.getElementById('auth_photo');
        let deposit_photo = document.getElementById('deposit_photo');
        let promise = document.getElementById('promise');
        let other_photo = document.getElementById('other_photo');
        let checkout_photo = document.getElementById('checkout_photo');
        let checkout_settle_photo = document.getElementById('checkout_settle_photo');

        let lis = document.getElementsByTagName('img');
        for (let i = 0; i < lis.length; i++) {
          lis[i].draggable = true;
          lis[i].flag = false;
          lis[i].ondragstart = function () {
            this.flag = true;

          };
          lis[i].ondragend = function () {
            this.flag = false;
          }
        }
        let _this = this;
        photo.ondrop = function (e) {
          _this.changeChild(photo, lis);
          _this.dragEnd('photo');
        };

        identity_photo.ondrop = function (e) {
          _this.changeChild(identity_photo, lis);
          _this.dragEnd('identity_photo');
        };
        bank_photo.ondrop = function (e) {
          _this.changeChild(bank_photo, lis);
          _this.dragEnd('bank_photo');
        };
        water_photo.ondrop = function (e) {
          _this.changeChild(water_photo, lis);
          _this.dragEnd('water_photo');
        };
        electricity_photo.ondrop = function (e) {
          _this.changeChild(electricity_photo, lis);
          _this.dragEnd('electricity_photo');
        };
        gas_photo.ondrop = function (e) {
          _this.changeChild(gas_photo, lis);
          _this.dragEnd('gas_photo');
        };
        property_photo.ondrop = function (e) {
          _this.changeChild(property_photo, lis);
          _this.dragEnd('property_photo');
        };
        water_card_photo.ondrop = function (e) {
          _this.changeChild(water_card_photo, lis);
          _this.dragEnd('water_card_photo');
        };
        electricity_card_photo.ondrop = function (e) {
          _this.changeChild(electricity_card_photo, lis);
          _this.dragEnd('electricity_card_photo');
        };
        gas_card_photo.ondrop = function (e) {
          _this.changeChild(gas_card_photo, lis);
          _this.dragEnd('gas_card_photo');
        };
        checkin_photo.ondrop = function (e) {
          _this.changeChild(checkin_photo, lis);
          _this.dragEnd('checkin_photo');
        };
        auth_photo.ondrop = function (e) {
          _this.changeChild(auth_photo, lis);
          _this.dragEnd('auth_photo');
        };
        deposit_photo.ondrop = function (e) {
          _this.changeChild(deposit_photo, lis);
          _this.dragEnd('deposit_photo');
        };
        promise.ondrop = function (e) {
          _this.changeChild(promise, lis);
          _this.dragEnd('promise');
        };
        other_photo.ondrop = function (e) {
          _this.changeChild(other_photo, lis);
          _this.dragEnd('other_photo');
        };
        checkout_photo.ondrop = function (e) {
          _this.changeChild(checkout_photo, lis);
          _this.dragEnd('checkout_photo');
        };
        checkout_settle_photo.ondrop = function (e) {
          _this.changeChild(checkout_settle_photo, lis);
          _this.dragEnd('checkout_settle_photo');
        };


      },

      changeChild(boxid, lis) {
        for (let i = 0; i < lis.length; i++) {
          if (lis[i].flag) { //如果flag为真，则添加一个li至box里
            boxid.appendChild(lis[i]);
          }
        }
      },

      allowDrop(e) {
        e.preventDefault();
      },
      currentPicId(key) {
        this.dragPicId = key;
      },
      dragEnd(id) {
        this.albumObject.photo = this.albumObject.photo.filter((x) => {
          return x != this.dragPicId
        });
        this.albumObject.identity_photo = this.albumObject.identity_photo.filter((x) => {
          return x != this.dragPicId
        });
        this.albumObject.bank_photo = this.albumObject.bank_photo.filter((x) => {
          return x != this.dragPicId
        });
        this.albumObject.water_photo = this.albumObject.water_photo.filter((x) => {
          return x != this.dragPicId
        });
        this.albumObject.electricity_photo = this.albumObject.electricity_photo.filter((x) => {
          return x != this.dragPicId
        });
        this.albumObject.gas_photo = this.albumObject.gas_photo.filter((x) => {
          return x != this.dragPicId
        });
        this.albumObject.property_photo = this.albumObject.property_photo.filter((x) => {
          return x != this.dragPicId
        });
        this.albumObject.water_card_photo = this.albumObject.water_card_photo.filter((x) => {
          return x != this.dragPicId
        });
        this.albumObject.electricity_card_photo = this.albumObject.electricity_card_photo.filter((x) => {
          return x != this.dragPicId
        });
        this.albumObject.gas_card_photo = this.albumObject.gas_card_photo.filter((x) => {
          return x != this.dragPicId
        });
        this.albumObject.checkin_photo = this.albumObject.checkin_photo.filter((x) => {
          return x != this.dragPicId
        });
        this.albumObject.auth_photo = this.albumObject.auth_photo.filter((x) => {
          return x != this.dragPicId
        });
        this.albumObject.deposit_photo = this.albumObject.deposit_photo.filter((x) => {
          return x != this.dragPicId
        });
        this.albumObject.promise = this.albumObject.promise.filter((x) => {
          return x != this.dragPicId
        });
        this.albumObject.other_photo = this.albumObject.other_photo.filter((x) => {
          return x != this.dragPicId
        });
        this.albumObject.checkout_photo = this.albumObject.checkout_photo.filter((x) => {
          return x != this.dragPicId
        });
        this.albumObject.checkout_settle_photo = this.albumObject.checkout_settle_photo.filter((x) => {
          return x != this.dragPicId
        });
        switch (id) {
          case 'photo':
            this.albumObject.photo.push(this.dragPicId);
            break;
          case 'identity_photo':
            this.albumObject.identity_photo.push(this.dragPicId);
            break;
          case 'bank_photo':
            this.albumObject.bank_photo.push(this.dragPicId);
            break;
          case 'water_photo':
            this.albumObject.water_photo.push(this.dragPicId);
            break;
          case 'electricity_photo':
            this.albumObject.electricity_photo.push(this.dragPicId);
            break;
          case 'gas_photo':
            this.albumObject.gas_photo.push(this.dragPicId);
            break;
          case 'property_photo':
            this.albumObject.property_photo.push(this.dragPicId);
            break;
          case 'water_card_photo':
            this.albumObject.water_card_photo.push(this.dragPicId);
            break;
          case 'electricity_card_photo':
            this.albumObject.electricity_card_photo.push(this.dragPicId);
            break;
          case 'gas_card_photo':
            this.albumObject.gas_card_photo.push(this.dragPicId);
            break;
          case 'checkin_photo':
            this.albumObject.checkin_photo.push(this.dragPicId);
            break;
          case 'auth_photo':
            this.albumObject.auth_photo.push(this.dragPicId);
            break;
          case 'deposit_photo':
            this.albumObject.deposit_photo.push(this.dragPicId);
            break;
          case 'promise':
            this.albumObject.promise.push(this.dragPicId);
            break;
          case 'other_photo':
            this.albumObject.other_photo.push(this.dragPicId);
            break;
          case 'checkout_photo':
            this.albumObject.checkout_photo.push(this.dragPicId);
            break;
          case 'checkout_settle_photo':
            this.albumObject.checkout_settle_photo.push(this.dragPicId);
            break;
        }
        this.sortPic()
      },

      sortPic() {
        this.$http.put(globalConfig.server + 'lease/collect/move/' + this.contract_id, {album: this.albumObject}).then((res) => {
          if (res.data.code === '61010') {

          } else {
            this.$notify.warning({
              title: '警告',
              duration: 1000,
              message: res.data.msg
            });
          }
        });
      },

      selectPeople() {
        this.organizationDialog = true;
        this.type = 'staff';
      },
      emptyPeople() {
        this.params.receiver_id = [];
        this.receiverNames = '';
      },
      closeOrganization() {
        this.organizationDialog = false;
        this.memoDialog = false;
        this.approvalHistoryDialog = false;
      },
      //发送/保存备忘
      noteSave(val) {
        this.params.is_send = val;
        this.$http.post(globalConfig.server + 'lease/note/save', this.params).then((res) => {
          if (res.data.code === '60510') {
            this.$notify.success({
              title: '成功',
              duration: 1000,
              message: res.data.msg
            });
            this.isPanel = false;
          } else {
            this.$notify.warning({
              title: '警告',
              duration: 1000,
              message: res.data.msg
            });
          }
        });
      },
      selectMember(val) {
        this.params.receiver_id = [];
        let name = [];
        if (val.length > 0) {
          val.forEach((item) => {
            this.params.receiver_id.push(item.id);
            name.push(item.name);
          });
        }
        this.receiverNames = name.join(',');
        this.type = '';
      },
      getContractDetail() {
        this.$http.get(globalConfig.server + 'lease/collect/' + this.contract_id).then((res) => {
          this.loadingStatus = false;
          if (res.data.code === '61010') {

            this.contractInfo = res.data.data;
            this.customersInfo = res.data.data.customers;

            this.albumObject.photo = this.getImgId(this.contractInfo.photo);
            this.albumObject.identity_photo = this.getImgId(this.contractInfo.identity_photo);
            this.albumObject.bank_photo = this.getImgId(this.contractInfo.bank_photo);
            this.albumObject.water_photo = this.getImgId(this.contractInfo.water_photo);
            this.albumObject.electricity_photo = this.getImgId(this.contractInfo.electricity_photo);
            this.albumObject.gas_photo = this.getImgId(this.contractInfo.gas_photo);
            this.albumObject.property_photo = this.getImgId(this.contractInfo.property_photo);
            this.albumObject.water_card_photo = this.getImgId(this.contractInfo.water_card_photo);
            this.albumObject.electricity_card_photo = this.getImgId(this.contractInfo.electricity_card_photo);
            this.albumObject.gas_card_photo = this.getImgId(this.contractInfo.gas_card_photo);
            this.albumObject.checkin_photo = this.getImgId(this.contractInfo.checkin_photo);
            this.albumObject.auth_photo = this.getImgId(this.contractInfo.auth_photo);
            this.albumObject.deposit_photo = this.getImgId(this.contractInfo.deposit_photo);
            this.albumObject.promise = this.getImgId(this.contractInfo.promise);
            this.albumObject.other_photo = this.getImgId(this.contractInfo.other_photo);
            this.albumObject.checkout_photo = this.getImgId(this.contractInfo.checkout_photo);
            this.albumObject.checkout_settle_photo = this.getImgId(this.contractInfo.checkout_settle_photo);

            if (this.contractInfo.doc_status.id < 4) {
              setTimeout(() => {
                this.dragInit();
              }, 1000)
            }
          } else {
            this.$notify.warning({
              title: '警告',
              duration: 1000,
              message: res.data.msg
            })
          }
        })

      },
      getFeedBack() {
        this.form.contract_id = this.contract_id;
        this.dictionary(443).then(res => {
          //支付方式
          this.payTypeInfo = res.data;
        });
        this.$http
          .get(globalConfig.server + 'contract/feedback/one?', {
            params: this.form
          })
          .then(res => {
            if (res.data.code === "1212200") {
              this.album = res.data.data[0].album;
              this.agency_price_origin = res.data.data[0].agency_price_origin;
              this.agency_price_now = res.data.data[0].agency_price_now;
              this.agency_name = res.data.data[0].agency_name;
              this.agency_user_name = res.data.data[0].agency_user_name;
              this.agency_phone = res.data.data[0].agency_phone;
              this.repairDetail = res.data.data[0];

              if (res.data.data[0].unit_price != "") {
                this.priceLen = res.data.data[0].unit_price[0].length;
              }
              if (res.data.data[0].pay_type != "") {
                this.payForLen = res.data.data[0].pay_type[0].length;
              }
              if (res.data.data[0].pay_method != "") {
                this.payTypeLen = res.data.data[0].pay_method[0].length;
              }
              if (res.data.data[0].pay_use && res.data.data[0].pay_use != "") {
                this.payUseLen = res.data.data[0].pay_use[0].length;
              }
              if (this.repairDetail.has_extra == 1) {
                this.repairDetail.has_extra = "是";
              } else {
                this.repairDetail.has_extra = "否";
              }
            }
          });
      },
      getImgId(data) {
        let arr = [];
        for (let key in data) {
          arr.push(key);
        }
        return arr;
      },

      getReBackDetail() {
        this.$http.get(globalConfig.server + 'contract/feedback?contract_id=' + this.contract_id + '&category=1').then((res) => {
          if (res.data.code === '20000') {
            this.reBackData = res.data.data.data;
          } else {
            this.reBackData = [];
          }
        })
      },
      getDictionary() {
        this.$http.get(globalConfig.server + 'setting/dictionary/all').then((res) => {
          this.all_dic = res.data.data;
        })
      },

      matchDictionary(id) {
        let dictionary_name = null;
        this.all_dic.map((item) => {
          if (item.id == id) {
            dictionary_name = item.dictionary_name;
          }
        });
        return dictionary_name;
      },

      initData() {
        if (!this.simple) {
          document.getElementById('mainContent').addEventListener('scroll', () => {
            this.houseId = document.getElementById('houseId').offsetTop;
            this.ownerId = document.getElementById('ownerId').offsetTop - 200;
            this.contractId = document.getElementById('contractId').offsetTop - 200;
            this.returnId = document.getElementById('returnId').offsetTop - 200;
            let scroll_top = document.getElementById('mainContent').scrollTop;
            if (scroll_top >= this.houseId && scroll_top < this.ownerId) {
              this.steps = 1;
            } else if (scroll_top >= this.ownerId && scroll_top < this.contractId) {
              this.steps = 2;
            } else if (scroll_top >= this.financeId && scroll_top < this.returnId) {
              // this.steps = 3;
            } else if (scroll_top >= this.contractId && scroll_top < this.returnId) {
              this.steps = 4;
            } else if (scroll_top > this.historyId) {
              // this.steps = 5;
            } else if (scroll_top < this.houseId) {
              this.steps = 0;
            }
            // this.changeStep(this.steps);
          });
        }
        document.getElementById('mainContent').style.height = window.innerHeight - 240 + 'px';
        window.onresize = function () {
          document.getElementById('mainContent').style.height = window.innerHeight - 240 + 'px';
        }
      },
      changeStep(step) {
        this.steps = step;
        switch (step) {
          case 0:
            if (!this.simple) {
              document.getElementById('mainContent').scrollTop = 0;
            } else {
              document.getElementById('simple').scrollTop = 0;
            }
            break;
          case 1:
            if (!this.simple) {
              document.getElementById('mainContent').scrollTop = this.ownerId - 200;
            } else {
              document.getElementById('simple').scrollTop = this.ownerId - 200;
            }
            break;
          case 2:
            if (!this.simple) {
              document.getElementById('mainContent').scrollTop = this.contractId - 200;
            } else {
              document.getElementById('simple').scrollTop = this.contractId - 200;
            }
            break;
          case 3:
            document.getElementById('mainContent').scrollTop = this.financeId;
            break;
          case 4:
            if (!this.simple) {
              document.getElementById('mainContent').scrollTop = this.returnId - 200;
            } else {
              document.getElementById('simple').scrollTop = this.returnId - 200;
            }
            break;
          case 5:
            document.getElementById('mainContent').scrollTop = this.historyId;
            break;
        }
      },
      getText(e) {
        console.log(e.target.innerText)
      },
      leaseStatusPress(val) {
        this.approveParams.type = val;
        this.$http.put(globalConfig.server + 'lease/status/press/' + this.contract_id, this.approveParams).then((res) => {
          if (res.data.code === '60610') {
            this.$notify.success({
              title: '成功',
              duration: 1000,
              message: res.data.msg,
            });
            this.customerInfoDialog = false;
            this.getContractDetail();
          } else if (res.data.code === '60690') {
            this.$notify.warning({
              title: '警告',
              message: res.data.msg,
            });
            this.customerInfoDialog = true;
            this.customerInfo = res.data.data;
          } else {
            this.$notify.warning({
              title: '警告',
              duration: 1000,
              message: res.data.msg,
            });
          }
        });
      },
      confirmPress(val) {
        this.approveParams.operation = val;
        this.$confirm('您确认操作吗, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.leaseStatusPress();
        }).catch(() => {
          this.$notify.info({
            title: '消息',
            duration: 1000,
            message: '已取消操作',
          })
        });
      },
    },
  }
</script>

<style scoped lang="scss">
  .content {
    padding: 0 10px;
    min-height: 32px;
    background: #eef3fc;
    border-radius: 4px;
    font-size: 12px;
    color: #727479;
  }

  i.iconfont.icon-bianji--:hover {
    photo-shadow: 0 1px 14px 1px #909399;
    border-radius: 6px;
    transition: all .5s;
    &:hover {
      transform: scale(1.1);
    }
  }

  .div_fade {
    right: 230px !important;
  }

  #rentingDetail {
    height: 100%;
    overflow: hidden;
    background: #ffffff;
    .el-badge__content.is-fixed {
      top: 5px !important;
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
    .panelContent {
      width: 500px;
      height: 375px;
      background: #FFFFFF;
      z-index: 2000;
      border-radius: 6px;
      position: fixed;
      bottom: 100px;
      right: -550px;
      border: 1px solid rgba(64, 158, 255, .12);
      /*photo-shadow: 0 2px 4px 0 rgba(64, 158, 255, .12), 0 0 6px 0 rgba(64, 158, 255, .04);*/
      /*photo-shadow: 0 4px 15px 0 #9093999c, 0 0 18px 0 #909399;*/
      photo-shadow: 0 0px 9px 0 #909399;
      padding: 0 10px;
      -webkit-transition: all 0.3s linear;
      -moz-transition: all 0.3s linear;
      -ms-transition: all 0.3s linear;
      -o-transition: all 0.3s linear;
      transition: all 0.3s linear;
      .panel_header {
        height: 50px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        photo-sizing: border-photo;
        border-bottom: 1px solid #E1E1E1;
      }

      .textBox {
        margin-bottom: 15px;
      }
    }

    @media screen and (min-width: 1280px) {
      .stepLine {
        height: 70%;
        position: fixed;
        top: 150px;
        left: 10%;
        z-index: 1
      }
    }
    @media screen and (max-width: 1279px) {
      .stepLine {
        height: 75%;
        position: fixed;
        top: 150px;
        left: 1%;
        z-index: 1
      }
    }

    .el-button--mini {
      min-width: 80px;
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
      height: 80px;
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
    .main, .simple_left {
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
          min-height: 90px;
          img {
            width: 120px;
            height: 80px;
            border-radius: 4px;
            margin-right: 10px;
            transition: all .5s;
          }
        }
      }
    }
    .buttonItem {
      width: 38px;
      height: 38px;
      margin-top: 15px;
      background: #6a8dfb;
      opacity: 0.8;
      border-radius: 50%;
      cursor: pointer;
      text-align: center;
    }
  }
</style>
