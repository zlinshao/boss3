<template>
  <div @click="show=false" @contextmenu="closeMenu">
    <div id="wholeRentContainer">
      <div class="highRanking" style="margin-top: 10px">
        <div class="highSearch">
          <el-form :inline="true" onsubmit="return false" size="mini">
            <el-form-item>
              <el-input placeholder="请输入内容" clearable v-model="collectParams.search"
                        @keyup.enter.native="search" size="mini">
                <el-button slot="append" icon="el-icon-search" @click="search"></el-button>
              </el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" size="mini" @click="highGrade">高级</el-button>
            </el-form-item>
            <el-button type="primary" size="mini" @click="openModalDialog('addHouseResourcesDialog')">
              <i class="el-icon-document"></i>&nbsp;登记房源
            </el-button>
          </el-form>
        </div>
        <!--高級搜索-->
        <div class="filter high_grade" :class="isHigh? 'highHide':''">
          <el-form :inline="true" onsubmit="return false" size="mini" label-width="100px">
            <div class="filterTitle">
              <i class="el-icons-fa-bars"></i>&nbsp;&nbsp;高级搜索
            </div>
            <el-row class="el_row_border">
              <el-col :span="12">
                <el-row>
                  <el-col :span="8">
                    <div class="el_col_label">合同开始时间范围</div>
                  </el-col>
                  <el-col :span="16" class="el_col_option">
                    <el-form-item>
                      <el-date-picker
                        v-model="collectParams.lord_start_time"
                        type="daterange"
                        value-format="yyyy-MM-dd"
                        range-separator="至"
                        start-placeholder="开始日期"
                        end-placeholder="结束日期">
                      </el-date-picker>
                    </el-form-item>
                  </el-col>
                </el-row>
              </el-col>
              <el-col :span="12">
                <el-row>
                  <el-col :span="8">
                    <div class="el_col_label">合同结束时间范围</div>
                  </el-col>
                  <el-col :span="16" class="el_col_option">
                    <el-form-item>
                      <el-date-picker
                        v-model="collectParams.lord_end_time"
                        type="daterange"
                        value-format="yyyy-MM-dd"
                        range-separator="至"
                        start-placeholder="开始日期"
                        end-placeholder="结束日期">
                      </el-date-picker>
                    </el-form-item>
                  </el-col>
                </el-row>
              </el-col>
            </el-row>
            <el-row class="el_row_border">
              <el-col :span="12">
                <el-row>
                  <el-col :span="8">
                    <div class="el_col_label">所属部门</div>
                  </el-col>
                  <el-col :span="16" class="el_col_option">
                    <el-form-item>
                      <el-input v-model="department_name" @focus="openOrganizeModal"
                                placeholder="请选择" readonly=""></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
              </el-col>
              <el-col :span="12">
                <el-row>
                  <el-col :span="8">
                    <div class="el_col_label">审核状态</div>
                  </el-col>
                  <el-col :span="16" class="el_col_option">
                    <el-form-item>
                      <el-select v-model="collectParams.doc_status" clearable placeholder="请选择">
                        <el-option v-for="(key,index) in doc_sta" :label="key.title" :value="key.value"
                                   :key="index"></el-option>
                      </el-select>
                    </el-form-item>
                  </el-col>
                </el-row>
              </el-col>
            </el-row>
            <el-row class="el_row_border">
              <el-col :span="12">
                <el-row>
                  <el-col :span="8">
                    <div class="el_col_label">回访状态</div>
                  </el-col>
                  <el-col :span="16" class="el_col_option">
                    <el-form-item>
                      <el-select v-model="collectParams.visit_status" clearable placeholder="请选择">
                        <el-option v-for="(key,index) in visit_sta" :label="key.title" :value="key.value"
                                   :key="index"></el-option>
                      </el-select>
                    </el-form-item>
                  </el-col>
                </el-row>
              </el-col>
            </el-row>
            <div class="btnOperate">
              <el-button size="mini" type="primary" @click="search">搜索</el-button>
              <el-button size="mini" type="primary" @click="resetting">重置</el-button>
              <el-button size="mini" type="primary" @click="highGrade">取消</el-button>
            </div>
          </el-form>
        </div>
      </div>
      <div class="main">
        <div class="myHouse">
          <div class="blueTable">
            <el-table
              :data="collectData"
              :empty-text='collectStatus'
              v-loading="collectLoading"
              element-loading-text="拼命加载中"
              element-loading-spinner="el-icon-loading"
              element-loading-background="rgba(255, 255, 255, 0)"
              @row-dblclick="dblClickTable"
              @row-click="clickCollectTable"
              :row-class-name="tableRowCollectName"
              @row-contextmenu='houseMenu'
              style="width: 100%">
              <el-table-column width="40" align="center">
                <template slot-scope="scope">
                      <span
                        v-if="scope.row.department_name && (scope.row.department_name === '南京马群组' ||
                        scope.row.department_name === '南京仙林一' ||
                        scope.row.department_name === '南京仙林二')">
                        <b style="color: red;">新</b>
                      </span>
                </template>
              </el-table-column>
              <el-table-column width="40">
                <template slot-scope="scope">
                  <span v-if="scope.row.contract_number&&checkContractData[scope.row.contract_number.toUpperCase()]">
                    <i class="el-icon-success" style="color: #6a8dfb"></i>
                  </span>
                </template>
              </el-table-column>

              <el-table-column
                label="合同上传时间">
                <template slot-scope="scope">
                  <span v-if="scope.row.contract_create_time">{{scope.row.contract_create_time}}</span>
                  <span v-else="">/</span>
                </template>
              </el-table-column>
              <el-table-column
                label="合同编号">
                <template slot-scope="scope">
                  <span v-if="scope.row.contract_number">{{scope.row.contract_number}}</span>
                  <span v-else="">/</span>
                </template>
              </el-table-column>


              <el-table-column
                label="房屋地址">
                <template slot-scope="scope">
                  <span v-if="scope.row.address">{{scope.row.address}}</span>
                  <span v-else="">/</span>
                </template>
              </el-table-column>
              <el-table-column
                label="合同性质">
                <template slot-scope="scope">
                  <span v-if="scope.row.type">{{scope.row.type}}</span>
                  <span v-else="">/</span>
                </template>
              </el-table-column>
              <el-table-column
                label="合同状态">
                <template slot-scope="scope">
                  <span v-if="scope.row.status">{{scope.row.status}}</span>
                  <span v-else="">/</span>
                </template>
              </el-table-column>
              <el-table-column
                prop="deposit"
                label="收房押金">
                <template slot-scope="scope">
                  <span v-if="scope.row.deposit">{{scope.row.deposit}}</span>
                  <span v-else="">/</span>
                </template>
              </el-table-column>
              <el-table-column
                label="收房价格">
                <template slot-scope="scope">
                  <el-popover
                    ref="popover4"
                    placement="bottom"
                    width="400"
                    trigger="click">
                    <el-table :data="scope.row.price">
                      <el-table-column width="100" property="begin_date" label="开始时间"></el-table-column>
                      <el-table-column width="100" property="end_date" label="结束时间"></el-table-column>
                      <el-table-column width="100" property="price" label="价格(元)"></el-table-column>
                      <el-table-column width="100" property="period" label="变化周期(月)"></el-table-column>
                    </el-table>
                  </el-popover>
                  <span v-if="scope.row.price&&scope.row.price.length>0">
                    {{scope.row.price[0].price}}&nbsp;
                  </span>
                  <el-button v-popover:popover4 size="mini" v-if="scope.row.price.length>1" type="text">变化</el-button>
                </template>
              </el-table-column>
              <el-table-column
                label="付款方式">
                <template slot-scope="scope">
                  <el-popover
                    ref="payWay"
                    placement="bottom"
                    width="400"
                    trigger="click">
                    <el-table :data="scope.row.pay_way">
                      <el-table-column width="100" property="begin_date" label="开始时间"></el-table-column>
                      <el-table-column width="100" property="end_date" label="结束时间"></el-table-column>
                      <el-table-column width="100" label="付款方式">
                        <template slot-scope="scope">
                          {{matchDictionary(scope.row.pay_way)}}
                        </template>
                      </el-table-column>
                      <el-table-column width="100" property="period" label="变化周期(月)"></el-table-column>
                    </el-table>
                  </el-popover>
                  <span v-if="scope.row.pay_way&&scope.row.pay_way.length>0">
                    {{matchDictionary(scope.row.pay_way[0].pay_way)}}&nbsp;
                  </span>
                  <el-button size="mini" type="text" v-show="scope.row.pay_way.length>1" v-popover:payWay>变化</el-button>
                </template>
              </el-table-column>
              <el-table-column
                label="空置期">
                <template slot-scope="scope">
                  <span v-if="scope.row.vacancy">{{scope.row.vacancy}}天</span>
                  <span v-else="">/</span>
                </template>
              </el-table-column>
              <el-table-column
                label="合同时长">
                <template slot-scope="scope">
                  <span v-if="scope.row.duration">{{scope.row.duration}}</span>
                  <span v-else="">/</span>
                </template>
              </el-table-column>
              <el-table-column
                label="开始日期">
                <template slot-scope="scope">
                  <span v-if="scope.row.begin_date">{{scope.row.begin_date}}</span>
                  <span v-else="">/</span>
                </template>
              </el-table-column>
              <el-table-column
                label="结束日期">
                <template slot-scope="scope">
                  <span v-if="scope.row.end_date">{{scope.row.end_date}}</span>
                  <span v-else="">/</span>
                </template>
              </el-table-column>
              <el-table-column
                label="签约人">
                <template slot-scope="scope">
                  <span v-if="scope.row.staff_name">{{scope.row.staff_name}}</span>
                  <span v-else="">/</span>
                </template>
              </el-table-column>
              <el-table-column
                label="负责人">
                <template slot-scope="scope">
                  <span v-if="scope.row.leader_name">{{scope.row.leader_name}}</span>
                  <span v-else="">/</span>
                </template>
              </el-table-column>
              <el-table-column
                label="所属部门">
                <template slot-scope="scope">
                  <span v-if="scope.row.department_name && scope.row.department_name">{{scope.row.department_name}}</span>
                  <span v-else="">/</span>
                </template>
              </el-table-column>
              <el-table-column
                label="回访状态"
                width="150">
                <template slot-scope="scope">
                  <span v-if="scope.row.visit_status&&scope.row.visit_status.name">
                    {{scope.row.visit_status.name}}
                    <span
                      v-if="collectFeedback[scope.row.contract_id]">({{collectFeedback[scope.row.contract_id]}}条)</span>
                  </span>
                  <span v-else="">/</span>
                </template>
              </el-table-column>
              <el-table-column
                label="审核状态"
                width="150">
                <template slot-scope="scope">
                      <span v-if="scope.row.doc_status&&scope.row.doc_status.name">
                        <span v-if="scope.row.doc_status.id==1">
                          <span class="info_label">{{scope.row.doc_status.name}}</span>
                        </span>
                        <span v-if="scope.row.doc_status.id==2">
                          <span class="yellow_label">{{scope.row.doc_status.name}}</span>
                        </span>
                        <span v-if="scope.row.doc_status.id==3">
                          <span class="orange_label">{{scope.row.doc_status.name}}</span>
                        </span>
                        <span v-if="scope.row.doc_status.id==4">
                          <span class="success_label">{{scope.row.doc_status.name}}</span>
                        </span>
                        <span v-if="scope.row.doc_status.id==5">
                          <span class="info_label">{{scope.row.doc_status.name}}</span>
                        </span>
                      </span>
                  <span v-else="">/</span>
                </template>
              </el-table-column>
            </el-table>
          </div>
          <div class="tableBottom">
            <div class="right">
              <!--<div>未租房源 <span>5&nbsp;套</span></div>-->
              <!--<div>已定 <span>0&nbsp;套</span></div>-->
            </div>
            <div class="left">
              <el-pagination
                @size-change="collectSizeChange"
                @current-change="collectPageChange"
                :current-page="collectParams.page"
                :page-sizes="[5, 10, 15, 20]"
                :page-size="5"
                layout="total, sizes, prev, pager, next, jumper"
                :total="collectTotalNum">
              </el-pagination>
            </div>
          </div>
        </div>
        <div class="myClient">
          <div class="greenTable">
            <el-table
              :data="rentingData"
              :empty-text='rentStatus'
              v-loading="rentLoading"
              element-loading-text="拼命加载中"
              element-loading-spinner="el-icon-loading"
              element-loading-background="rgba(255, 255, 255, 0)"
              @row-click="clickRentTable"
              @row-dblclick="dblClickRentTable"
              @row-contextmenu='clientMenu'
              :row-class-name="tableRowRentName"
              style="width: 100%">
              <el-table-column width="40" align="center">
                <template slot-scope="scope">
                      <span
                        v-if="scope.row.department_name && (scope.row.department_name === '南京马群组' ||
                        scope.row.department_name === '南京仙林一' ||
                        scope.row.department_name === '南京仙林二')">
                        <b style="color: red;">新</b>
                      </span>
                </template>
              </el-table-column>
              <el-table-column
                label="合同上传时间">
                <template slot-scope="scope">
                  <span v-if="scope.row.contract_create_time">{{scope.row.contract_create_time}}</span>
                  <span v-else="">/</span>
                </template>
              </el-table-column>
              <el-table-column
                label="合同编号">
                <template slot-scope="scope">
                  <span v-if="scope.row.contract_number">{{scope.row.contract_number}}</span>
                  <span v-else="">/</span>
                </template>
              </el-table-column>
              <el-table-column
                label="房屋地址">
                <template slot-scope="scope">
                  <span v-if="scope.row.address">{{scope.row.address}}</span>
                  <span v-else="">/</span>
                </template>
              </el-table-column>
              <el-table-column
                label="合同性质">
                <template slot-scope="scope">
                  <span v-if="scope.row.type">{{scope.row.type}}</span>
                  <span v-else="">/</span>
                </template>
              </el-table-column>
              <el-table-column
                label="合同状态">
                <template slot-scope="scope">
                  <span v-if="scope.row.status">{{scope.row.status}}</span>
                  <span v-else="">/</span>
                </template>
              </el-table-column>
              <el-table-column
                label="出租价格">
                <template slot-scope="scope">
                  <el-popover
                    ref="rentPrice"
                    placement="bottom"
                    width="400"
                    trigger="click">
                    <el-table :data="scope.row.price">
                      <el-table-column width="100" property="begin_date" label="开始时间"></el-table-column>
                      <el-table-column width="100" property="end_date" label="结束时间"></el-table-column>
                      <el-table-column width="100" property="price" label="价格(元)"></el-table-column>
                      <el-table-column width="100" property="period" label="变化周期(月)"></el-table-column>
                    </el-table>
                  </el-popover>
                  <span v-if="scope.row.price&&scope.row.price.length>0">
                    {{scope.row.price[0].price}}&nbsp;
                  </span>
                  <el-button v-popover:rentPrice size="mini" v-if="scope.row.price.length>1" type="text">变化</el-button>
                </template>
              </el-table-column>
              <el-table-column
                label="付款方式">
                <template slot-scope="scope">
                  <el-popover
                    ref="payWayRent"
                    placement="bottom"
                    width="500"
                    trigger="click">
                    <el-table :data="scope.row.pay_way">
                      <el-table-column width="100" property="begin_date" label="开始时间"></el-table-column>
                      <el-table-column width="100" property="end_date" label="结束时间"></el-table-column>
                      <el-table-column width="100" property="pay_way_bet" label="押"></el-table-column>
                      <el-table-column width="100" property="pay_way" label="付"></el-table-column>
                      <el-table-column width="100" property="period" label="变化周期(月)"></el-table-column>
                    </el-table>
                  </el-popover>
                  <span v-if="scope.row.pay_way&&scope.row.pay_way.length>0">
                    {{scope.row.pay_way[0].pay_way_str}}&nbsp;
                  </span>
                  <el-button size="mini" type="text" v-show="scope.row.pay_way.length>1" v-popover:payWayRent>变化
                  </el-button>
                </template>
              </el-table-column>
              <el-table-column
                label="合同时长">
                <template slot-scope="scope">
                  <span v-if="scope.row.duration">{{scope.row.duration}}</span>
                  <span v-else="">/</span>
                </template>
              </el-table-column>
              <el-table-column
                label="开始日期">
                <template slot-scope="scope">
                  <span v-if="scope.row.begin_date">{{scope.row.begin_date}}</span>
                  <span v-else="">/</span>
                </template>
              </el-table-column>
              <el-table-column
                label="结束日期">
                <template slot-scope="scope">
                  <span v-if="scope.row.end_date">{{scope.row.end_date}}</span>
                  <span v-else="">/</span>
                </template>
              </el-table-column>
              <el-table-column
                label="签约人">
                <template slot-scope="scope">
                  <span v-if="scope.row.staff_name">{{scope.row.staff_name}}</span>
                  <span v-else="">/</span>
                </template>
              </el-table-column>
              <el-table-column
                label="负责人">
                <template slot-scope="scope">
                  <span v-if="scope.row.leader_name">{{scope.row.leader_name}}</span>
                  <span v-else="">/</span>
                </template>
              </el-table-column>
              <el-table-column
                label="所属部门">
                <template slot-scope="scope">
                  <span v-if="scope.row.department_name">{{scope.row.department_name}}</span>
                  <span v-else="">/</span>
                </template>
              </el-table-column>
              <el-table-column
                label="回访状态"
                width="150">
                <template slot-scope="scope">
                  <span v-if="scope.row.visit_status&&scope.row.visit_status.name">
                    {{scope.row.visit_status.name}}
                   <span v-if="rentFeedback[scope.row.contract_id]">({{rentFeedback[scope.row.contract_id]}}条)</span>
                  </span>
                  <span v-else="">/</span>
                </template>
              </el-table-column>
              <el-table-column
                label="审核状态"
                width="150">
                <template slot-scope="scope">
                  <span v-if="scope.row.doc_status&&scope.row.doc_status.name">
                    <span v-if="scope.row.doc_status.id==1">
                      <span class="info_label">{{scope.row.doc_status.name}}</span>
                    </span>
                    <span v-if="scope.row.doc_status.id==2">
                      <span class="yellow_label">{{scope.row.doc_status.name}}</span>
                    </span>
                    <span v-if="scope.row.doc_status.id==3">
                      <span class="orange_label">{{scope.row.doc_status.name}}</span>
                    </span>
                    <span v-if="scope.row.doc_status.id==4">
                      <span class="success_label">{{scope.row.doc_status.name}}</span>
                    </span>
                  </span>
                  <span v-else="">/</span>
                </template>
              </el-table-column>
            </el-table>
          </div>
          <div class="tableBottom">
            <div class="right">
              <!--<div>本套相差 <span>0&nbsp;元</span></div>-->
              <!--<div>押金差 <span>0&nbsp;元</span></div>-->
            </div>
            <div class="left">
              <el-pagination
                @size-change="rentSizeChange"
                @current-change="rentPageChange"
                :current-page="rentParams.page"
                :page-sizes="[3, 6, 9, 12]"
                :page-size="3"
                layout="total, sizes, prev, pager, next, jumper"
                :total="rentTotalNum">
              </el-pagination>
            </div>
          </div>
        </div>
        <div class="myDetail">
          <el-tabs type="border-card" v-model="activeName">
            <el-tab-pane label="房东信息" name="OwnerInfoTab">
              <OwnerInfoTab :collectContractId="collectContractId" :activeName="activeName"></OwnerInfoTab>
            </el-tab-pane>
            <el-tab-pane label="租客信息" name="RentInfoTab">
              <RentInfoTab :rentContractId="rentContractId" :activeName="activeName"></RentInfoTab>
            </el-tab-pane>
            <el-tab-pane label="物品增减" name="GoodsChangeTab">
              <GoodsChangeTab :collectHouseId="collectHouseId" :tabStatusChange="tabStatusChange"
                              :activeName="activeName"></GoodsChangeTab>
            </el-tab-pane>

            <el-tab-pane label="房东退房记录" name="CollectReturnRomeInfoTab">
              <CollectReturnRomeInfoTab :collectContractId="collectContractId"
                                        :activeName="activeName"></CollectReturnRomeInfoTab>
            </el-tab-pane>
            <el-tab-pane label="租客退房记录" name="rentReturnRomeInfoTab">
              <rentReturnRomeInfoTab :rentContractId="rentContractId" :activeName="activeName"></rentReturnRomeInfoTab>
            </el-tab-pane>
            <!--
            <el-tab-pane label="续约/延期(收)" name="CollectRenewContractTab">
              <CollectRenewContractTab></CollectRenewContractTab>
            </el-tab-pane>
            <el-tab-pane label="续约/延期(租)" name="RentRenewContractTab">
              <RentRenewContractTab></RentRenewContractTab>
            </el-tab-pane>
            <el-tab-pane label="转租记录" name="subletRecordTab">
              <subletRecordTab></subletRecordTab>
            </el-tab-pane>
              <el-tab-pane label="应收款项" name="ReceivableItemTab">
              <ReceivableItemTab></ReceivableItemTab>
            </el-tab-pane>
            <el-tab-pane label="应付款项" name="PayableItemTab">
              <PayableItemTab></PayableItemTab>
            </el-tab-pane>

            -->
            <el-tab-pane label="资料备忘(收)" name="CollectMemorandumTab">
              <CollectMemorandumTab :collectContractId="collectContractId"
                                    :activeName="activeName"></CollectMemorandumTab>
            </el-tab-pane>
            <el-tab-pane label="资料备忘(租)" name="RentMemorandumTab">
              <RentMemorandumTab :rentContractId="rentContractId" :activeName="activeName"></RentMemorandumTab>
            </el-tab-pane>
            <el-tab-pane label="回访记录(收)" name="CollectReturnVisitRecordTab">
              <CollectReturnVisitRecordTab :collectContractId="collectContractId" :tabStatusChange="tabStatusChange"
                                           :activeName="activeName"></CollectReturnVisitRecordTab>
            </el-tab-pane>
            <el-tab-pane label="回访记录(租)" name="RentReturnVisitRecordTab">
              <RentReturnVisitRecordTab :rentContractId="rentContractId" :tabStatusChange="tabStatusChange"
                                        :activeName="activeName"></RentReturnVisitRecordTab>
            </el-tab-pane>
            <el-tab-pane label="收房工单" name="CollectFollowRecordTab">
              <CollectFollowRecordTab :collectContractId="collectContractId" :tabStatusChange="tabStatusChange"
                                      :activeName="activeName"></CollectFollowRecordTab>
            </el-tab-pane>
            <el-tab-pane label="租房工单" name="RentFollowRecordTab">
              <RentFollowRecordTab :rentContractId="rentContractId" :tabStatusChange="tabStatusChange"
                                   :activeName="activeName"></RentFollowRecordTab>
            </el-tab-pane>
            <el-tab-pane label="维修单(收)" name="CollectRepairTab">
              <CollectRepairTab :collectContractId="collectContractId" :activeName="activeName"
                                :tabStatusChange="tabStatusChange"></CollectRepairTab>
            </el-tab-pane>
            <el-tab-pane label="维修单(租)" name="RentRepairTab">
              <RentRepairTab :rentContractId="rentContractId" :activeName="activeName"
                             :tabStatusChange="tabStatusChange"></RentRepairTab>
            </el-tab-pane>
            <el-tab-pane label="报销单(收)" name="CollectReimTab">
              <CollectReimTab :collectContractId="collectContractId" :activeName="activeName"
                              :tabStatusChange="tabStatusChange"></CollectReimTab>
            </el-tab-pane>
            <el-tab-pane label="报销单(租)" name="RentReimTab">
              <RentReimTab :rentContractId="rentContractId" :activeName="activeName"
                           :tabStatusChange="tabStatusChange"></RentReimTab>
            </el-tab-pane>
          </el-tabs>
        </div>
      </div>
    </div>
    <RightMenu :startX="rightMenuX+'px'" :startY="rightMenuY+'px'" :list="lists" :show="show"
               @clickOperate="clickEvent"></RightMenu>

    <Organization :organizationDialog="organizationDialog" :length="length" :type="type"
                  @close='closeModal' @selectMember="selectMember"></Organization>

    <Instruction :instructionDialog="instructionDialog" @close="closeModal"></Instruction>

    <BackUp :backUpDialog="backUpDialog" @close="closeModal"></BackUp>

    <Advanced :advancedDialog="advancedDialog" @close="closeModal"></Advanced>

    <OwnerDelay :ownerDelayDialog="ownerDelayDialog" @close="closeModal"></OwnerDelay>

    <IncreaseGoods :increaseGoodsDialog="increaseGoodsDialog" :collectHouseId="collectHouseId"
                   @close="closeModal"></IncreaseGoods>

    <DecreaseGoods :decreaseGoodsDialog="decreaseGoodsDialog" :collectHouseId="collectHouseId"
                   @close="closeModal"></DecreaseGoods>

    <OwnerArrears :ownerArrearsDialog="ownerArrearsDialog" @close="closeModal"></OwnerArrears>
    <!--收房续约-->
    <OwnerRenew :ownerRenewDialog="ownerRenewDialog" :collectContractId="collectContractId"
                @close="closeModal"></OwnerRenew>
    <!--增加工单-->
    <AddFollowUp :addFollowUpDialog="addFollowUpDialog" :contractModule="contractModule"
                 :houseData="houseData" @close="closeModal"></AddFollowUp>
    <!--退房-->
    <CollectVacation :vacationDialog="vacationDialog" :contractModule="contractModule"
                     :collectContractId="contractOperateId" @close="closeModal"></CollectVacation>
    <!--增加 收房维修单-->
    <AddCollectRepair :module="addCollectRepairDialog" :contract="addReturnInfo"
                      @close="closeModal"></AddCollectRepair>
    <!--增加 租房维修单-->
    <AddRentRepair :module="addRentRepairDialog" :contract="addReturnInfo"
                   @close="closeModal"></AddRentRepair>

    <AddCollectReimbursement :addCollectReimbursementDialog="addCollectReimbursementDialog" :contract="addReturnInfo"
                             @close="closeModal"></AddCollectReimbursement>

    <AddRentReimbursement :addRentReimbursementDialog="addRentReimbursementDialog" :contract="addReturnInfo"
                          @close="closeModal"></AddRentReimbursement>
    <!--租客调房-->
    <RentChangeRoom :rentChangeRoomDialog="rentChangeRoomDialog" :rentContractId="rentContractId"
                    :collectHouseId="collectHouseId"
                    :rentContractInfo="addReturnInfo" @close="closeModal"></RentChangeRoom>
    <!--房屋转租-->
    <Sublease :subleaseDialog="subleaseDialog" :rentContractId="rentContractId" :collectHouseId="collectHouseId"
              :collectContractId="collectContractId" @close="closeModal"></Sublease>
    <!--租客续约-->
    <RentRenew :rentRenewDialog="rentRenewDialog" :rentContractId="rentContractId" :collectHouseId="collectHouseId"
               :collectContractId="collectContractId" @close="closeModal"></RentRenew>
    <!--新增租客-->
    <AddRentInfo :addRentInfoDialog="addRentInfoDialog" :collectContractId="collectContractId"
                 :collectHouseId="collectHouseId" @close="closeModal"></AddRentInfo>
    <!--编辑租客-->
    <EditRentInfo :editRentInfoDialog="editRentInfoDialog" :rentContractId="rentContractId"
                  :collectHouseId="collectHouseId"
                  :collectContractId="collectContractId" @close="closeModal"></EditRentInfo>
    <EditAddress :editAddressDialog="editAddressDialog" :rentContractId="rentContractId"
                 :collectHouseId="collectHouseId"
                 :houseAddress="houseAddress" @close="closeModal"></EditAddress>

    <SendMessage :sendMessageDialog="sendMessageDialog" @close="closeModal"></SendMessage>
    <AddHouseResources :addHouseResourcesDialog="addHouseResourcesDialog" @close="closeModal"></AddHouseResources>
    <EditHouseResources :editHouseResourcesDialog="editHouseResourcesDialog"
                        :collectContractId="collectContractId" @close="closeModal"></EditHouseResources>
    <Repayment :repaymentDialog="repaymentDialog" @close="closeModal"></Repayment>
    <ReturnVisit :returnVisitDialog="returnVisitDialog" @close="closeModal"></ReturnVisit>
    <TopForm :topFormSetDialog="topFormSetDialog" @close="closeModal"></TopForm>
    <Setting :settingDialog="settingDialog" @close="closeModal"></Setting>
    <AddReturnvisit :addReturnvisitDialog="addReturnvisitDialog" :ToActiveName="ToActiveName"
                    :addReturnInfo="addReturnInfo"
                    @close="closeModal"></AddReturnvisit>
  </div>
</template>

<script>
  import RightMenu from '../../common/rightMenu.vue'                                //右键
  import Organization from '../../common/organization.vue'                          //选人组件
  import Instruction from './components/instruction.vue'                            //使用说明
  import BackUp from '../components/back-up.vue'                                    //备份
  import Advanced from '../components/advancedSearch.vue'                           //高级搜索
  import OwnerDelay from '../components/ownerDelay.vue'                             //房东延期
  import OwnerRenew from '../components/ownerRenew.vue'                             //房东续约

  import IncreaseGoods from '../components/increaseGoods.vue'                       //物品增加
  import DecreaseGoods from '../components/decreaseGoods.vue'                       //物品减少
  import OwnerArrears from '../components/OwnerArrears.vue'                         //房东欠款
  import AddFollowUp from '../components/addFollowUp.vue'                           //增加跟进记录
  import CollectVacation from '../components/collectVacation.vue'                   //房东退房
  import AddCollectRepair from '../components/addCollectRepair.vue'                 //添加房东维修
  import AddRentRepair from '../components/addRentRepair.vue'                       //添加租客维修
  import RentChangeRoom from '../components/rentChangeRoom.vue'                     //租客换房
  import Sublease from '../components/sublease.vue'                                 //转租
  import RentRenew from '../components/rentRenew.vue'                               //租客续约
  import AddRentInfo from '../components/addRentInfo.vue'                           //登记租客
  import EditRentInfo from '../components/editRentInfo.vue'                         //修改租客信息
  import SendMessage from '../../common/sendMessage.vue'                            //发送短信
  import AddHouseResources from '../components/addHouseResources.vue'               //登记房源
  import EditHouseResources from '../components/editHouseResources.vue'             //修改房源
  import Repayment from '../components/rentRepayment.vue'
  import ReturnVisit from '../components/returnVisit.vue'                           //查看回访
  import TopForm from '../components/topFormSet.vue'                                //表头列表
  import Setting from './components/setting.vue'
  import AddReturnvisit from "../customerService/ReturnVisitManage/addReturnvisit.vue"; //添加回访
  import AddCollectReimbursement from "../components/addCollectReimbursement.vue";      //添加房屋报销单
  import AddRentReimbursement from "../components/addRentReimbursement.vue";            //添加租客报销单
  import EditAddress from '../components/editAddress'
  //--------------------------tabs content-----------------------------------------------------------------//
  import GoodsChangeTab from '../tabComponents/goodsChange.vue'
  import OwnerInfoTab from '../tabComponents/ownerInfo.vue'
  import RentInfoTab from '../tabComponents/rentInfo.vue'
  //  import InDebtInfoTab from '../tabComponents/InDebtInfo.vue'
  import CollectReturnRomeInfoTab from '../tabComponents/collectReturnInfo.vue';   //退还房
  import rentReturnRomeInfoTab from '../tabComponents/rentReturnInfo.vue';   //退还房
  import CollectRenewContractTab from '../tabComponents/collcetRenewContract.vue';
  import RentRenewContractTab from '../tabComponents/rentRenewContract.vue';
  import subletRecordTab from '../tabComponents/subletRecord.vue';
  import ReceivableItemTab from '../tabComponents/receivableItem.vue';
  import PayableItemTab from '../tabComponents/payableItem.vue';
  import CollectMemorandumTab from '../tabComponents/collectMemorandum.vue';
  import RentMemorandumTab from '../tabComponents/rentMemorandum.vue';
  import CollectReturnVisitRecordTab from '../tabComponents/collectReturnVistitRecord.vue';
  import RentReturnVisitRecordTab from '../tabComponents/rentReturnVistitRecord.vue';
  import CollectFollowRecordTab from '../tabComponents/collectFollowRecord.vue';
  import RentFollowRecordTab from '../tabComponents/rentFollowRecord.vue';
  import CollectRepairTab from '../tabComponents/collectRepair.vue';
  import RentRepairTab from '../tabComponents/rentRepair.vue';
  import CollectReimTab from '../tabComponents/collectReim.vue';   //收房报销单
  import RentReimTab from '../tabComponents/rentReim.vue';   //租房报销单
  //  import ServiceRecordTab from '../tabComponents/serviceRecord.vue'
  export default {
    name: 'hello',
    components: {
      RightMenu,
      Organization,
      Instruction,
      BackUp,
      Advanced,
      OwnerRenew,
      OwnerDelay,
      IncreaseGoods,
      DecreaseGoods,
      OwnerArrears,
      AddFollowUp,
      CollectVacation,
      AddCollectRepair,
      AddRentRepair,
      RentChangeRoom,
      Sublease,
      RentRenew,
      AddRentInfo,
      EditRentInfo,
      SendMessage,
      AddHouseResources,
      EditHouseResources,
      Repayment,
      ReturnVisit,
      TopForm,
      Setting,
      AddReturnvisit,
      AddCollectReimbursement,
      AddRentReimbursement,
      EditAddress,

      //-------tabs------//
      GoodsChangeTab,
      OwnerInfoTab,
      RentInfoTab,
//      InDebtInfoTab,
      CollectReturnRomeInfoTab,
      rentReturnRomeInfoTab,
      CollectRenewContractTab,
      RentRenewContractTab,
      subletRecordTab,
      ReceivableItemTab,
      PayableItemTab,
      CollectMemorandumTab,
      RentMemorandumTab,
      CollectReturnVisitRecordTab,
      RentReturnVisitRecordTab,
      CollectFollowRecordTab,
      RentFollowRecordTab,
      CollectRepairTab,
      RentRepairTab,
      CollectReimTab,
      RentReimTab,
//      ServiceRecordTab,
    },
    data() {
      return {
        rightMenuX: 0,
        rightMenuY: 0,
        show: false,
        lists: [],
        /***********/
        organizationDialog: false,
        length: 0,
        type: '',
        department_name: '',
        //模态框
        instructionDialog: false,//使用说明
        backUpDialog: false, //备份
        advancedDialog: false,//高级搜索
        ownerRenewDialog: false,//房东续约
        ownerDelayDialog: false,//房东延期
        decreaseGoodsDialog: false,  //物品搬出
        increaseGoodsDialog: false,  //物品增加
        ownerArrearsDialog: false,   //房东欠款
        addFollowUpDialog: false,     //添加工单
        vacationDialog: false,     //房东退房
        addCollectRepairDialog: false,    //房东添加维修
        addRentRepairDialog: false,       //租客添加维修
        rentChangeRoomDialog: false,      //租客换房
        subleaseDialog: false,           //转租
        rentRenewDialog: false,          //租客续约
        addRentInfoDialog: false,      //登记租客信息
        editRentInfoDialog: false,      //修改租客信息
        editAddressDialog: false,      //修改租客地址
        sendMessageDialog: false,      //发送短信
        addHouseResourcesDialog: false,  //登记房源
        editHouseResourcesDialog: false,  //修改房源
        repaymentDialog: false,        //还款
        returnVisitDialog: false,      //查看回访
        topFormSetDialog: false,       //选择列
        settingDialog: false,        //设置
        addReturnvisitDialog: false,    //添加回访
        addCollectReimbursementDialog: false,  //添加房屋报销单
        addRentReimbursementDialog: false,  //添加租客报销单


        isHigh: false,
        /*******************收房*********************/
        collectParams: {
          page: 1,
          limit: 5,
          search: '',
          lord_start_time: [],
          lord_end_time: [],
          org_id: '',
          doc_status: '',
          visit_status: '',
        },
        collectTotalNum: 0,
        doc_sta: [
          {
            value: 'draft',
            title: '等待提交',
          },
          {
            value: 'wait_contract_review',
            title: '合同审核员审核中',
          },
          {
            value: 'wait_house_review',
            title: '房屋审核员审核中',
          },
          {
            value: 'published',
            title: '已通过',
          },
        ],
        visit_sta: [
          {
            value: 'draft',
            title: '等待提交',
          },
          {
            value: 'wait_customer_service_review',
            title: '等待回访',
          },
          {
            value: 'published',
            title: '已回访',
          },
        ],
        collectData: [],    //收房列表数据
        collectHouseId: '',   //房屋id
        collectContractId: '', //  收房合同id
        //*******************租房*******************//
        rentParams: {
          page: 1,
          limit: 3,
          house_id: '',
        },
        rentingData: [],     //租房列表数据
        rentTotalNum: 0,
        rentHouseId: '',
        rentContractId: '',
        contractModule: '',
        contractOperateId: '',
        contractCity: '',
        houseAddress: '',
        houseData: {},
        activeName: 'OwnerInfoTab',    //tab name
        pay_way_dic: [],
        tabStatusChange: '',
        collectNumberArray: [],

        collectFeedback: {},
        rentFeedback: {},

        checkContractData: {},
        collectStatus: ' ',
        collectLoading: false,
        rentStatus: ' ',
        rentLoading: false,
        addReturnInfo: {},
        ToActiveName: "",

        cities: [],                     //城市
      }
    },
    created() {
      this.getDictionary()
    },
    mounted() {
      this.initData();
    },
    watch: {
      collectHouseId(val) {
        this.rentParams.page = 1;
        this.rentingData = [];
        this.rentTotalNum = 0;
        this.rentContractId = '';
        this.rentStatus = '暂未出租';
        if (val) {
          this.getRentData();
        }
      }
    },
    methods: {
      getDictionary() {
        this.dictionary(443, 1).then((res) => {
          this.pay_way_dic = res.data;
        });
        //城市
        this.dictionary(306, 1).then((res) => {
          this.cities = res.data;
        });
      },
      matchDictionary(id) {
        let dictionary_name = null;
        this.pay_way_dic.map((item) => {
          if (item.id == id) {
            dictionary_name = item.dictionary_name;
          }
        });
        return dictionary_name;
      },
      //数据初始化
      initData() {
        this.getCollectData();
      },
      openOrganizeModal() {
        this.organizationDialog = true;
        this.length = 1;
        this.type = 'depart';
      },
      selectMember(val) {
        this.organizationDialog = false;
        this.collectParams.org_id = val[0].id;
        this.department_name = val[0].name;
      },
      /*****************************收房*********************************************************/
      search() {
        this.isHigh = false;
        this.collectParams.page = 1;
        this.getCollectData();
      },
      getCollectData() {
        this.collectHouseId = '';
        this.collectContractId = '';
        this.collectLoading = true;
        this.collectStatus = ' ';
        this.$http.get(globalConfig.server + 'lease/collect', {params: this.collectParams}).then((res) => {
          this.collectLoading = false;
          if (res.data.code === '61010') {
            this.collectData = res.data.data;
            this.collectTotalNum = res.data.meta.total;
            this.collectNumberArray = [];
            this.collectData.forEach((item) => {
              this.collectNumberArray.push(item.contract_number);
            });
            let collectIdArray = '';
            this.collectData.forEach((item) => {
              collectIdArray += item.contract_id + ',';
            });
            this.checkHandIn();
            this.getReturnNumber(collectIdArray, 1);
            if (res.data.data.length > 0) {
              this.collectHouseId = this.collectData[0].house_id;
              this.collectContractId = this.collectData[0].contract_id;
            } else {
              this.collectData = [];
              this.collectStatus = '暂无数据';
              this.rentStatus = '暂未出租';
              this.collectTotalNum = 0;
            }
          } else {
            this.collectData = [];
            this.collectStatus = '暂无数据';
            this.rentStatus = '暂未出租';
            this.collectTotalNum = 0;
          }
        })
      },
      checkHandIn() {
        this.$http.post(globalConfig.server + 'contract/number/check', {
          contracts: this.collectNumberArray,
        }).then((res) => {
          if (res.data.code === '20000') {
            this.checkContractData = res.data.data;
          } else {
            this.checkContractData = {};
          }
        })
      },
      getReturnNumber(collectIdArray, type) {
        this.$http.get(globalConfig.server + 'contract/feedback/num', {
          params: {
            contract_ids: collectIdArray,
            module: type,
          }
        }).then((res) => {
          if (res.data.code === '1212200') {
            if (type == 1) {
              this.collectFeedback = res.data.data;
            } else if (type == 2) {
              this.rentFeedback = res.data.data;
            }
          }
        })
      },
      // 城市遍历
      forCity(cities, city) {
        let c = {};
        cities.forEach(res => {
          if (city.startsWith('500')) {
            if (res.variable.city_id.startsWith('500')) {
              c.id = res.id;
              c.name = res.dictionary_name;
            }
            return;
          }
          if (res.variable.city_id === city) {
            c.id = res.id;
            c.name = res.dictionary_name;
          }
        });
        console.log(c);
        return c;
      },
      // 工单/维修单 参数
      returnInfo(row) {
        let city = {};
        if (row.city) {
          city = this.forCity(this.cities, row.city);
        } else {
          city.id = '';
          city.name = '';
        }
        this.addReturnInfo = row;
        this.addReturnInfo.city_id = city.id;
        this.addReturnInfo.city_name = city.name;
        this.addReturnInfo.cities = this.cities;
        this.collectHouseId = row.house_id;
        this.collectContractId = row.contract_id;   //收房id
        this.contractOperateId = row.contract_id;   //通用合同ID
        this.houseAddress = row.address;
        this.houseData = {
          cities: this.cities,
          contract_id: row.contract_id,
          house_name: row.address,
          city_id: city.id,
          city_name: city.name,
        };
      },
      //房东右键
      houseMenu(row, event) {
        this.returnInfo(row);
        this.ToActiveName = "first";
        this.contractModule = '1';
        this.lists = [
          {
            clickIndex: 'editHouseResourcesDialog',
            headIcon: 'el-icons-fa-home',
            label: '修改房源',
            disabled: row.doc_status.id > 3
          },
          {clickIndex: 'addRentInfoDialog', headIcon: 'el-icons-fa-plus', label: '登记租客信息',},
          {clickIndex: 'ownerRenewDialog', headIcon: 'el-icons-fa-pencil-square-o', label: '房东续约',},
          {clickIndex: 'vacationDialog', headIcon: 'el-icons-fa-reply', label: '房东退房',},
//          {clickIndex: 'switchToJoint', headIcon :' el-icons-fa-refresh', label: '转到合租',},
          {clickIndex: 'addFollowUpDialog', headIcon: 'el-icons-fa-plus', label: '添加工单',},
//          {clickIndex: 'ownerArrearsDialog', headIcon: 'el-icons-fa-cny', label: '房东欠款',},
          {
            clickIndex: '', headIcon: 'el-icons-fa-inbox', tailIcon: 'el-icon-arrow-right', label: '物品增减',
            children: [
              {clickIndex: 'decreaseGoodsDialog', label: '物品搬出',},
              {clickIndex: 'increaseGoodsDialog', label: '物品增进',}
            ]
          },
          {clickIndex: 'addCollectRepairDialog', headIcon: 'el-icons-fa-gear', label: '添加维修单',},
//          {clickIndex: 'sendMessageDialog', headIcon: 'el-icons-fa-envelope-o', label: '发送短信',},
          {clickIndex: 'addReturnvisitDialog', headIcon: 'el-icons-fa-pencil-square-o', label: '添加回访记录',},
          {clickIndex: 'addCollectReimbursementDialog', headIcon: 'el-icons-fa-pencil-square-o', label: '添加报销单',},
          {clickIndex: 'deleteCollect', headIcon: 'el-icon-delete', label: '删除',},
        ];
        this.contextMenuParam(event);
      },
      //单机收房列表
      clickCollectTable(row, event, column) {
        this.collectHouseId = row.house_id;
        this.collectContractId = row.contract_id;
      },
      //收房列表选中状态
      tableRowCollectName({row, rowIndex}) {
        if (row.contract_id === this.collectContractId) {
          return 'selected_tr';
        }
        return '';
      },
      collectSizeChange(val) {
        this.collectParams.limit = val;
        this.getCollectData();
      },
      collectPageChange(val) {
        this.collectParams.page = val;
        this.getCollectData();
      },
      dblClickTable(row, event) {   //双击
        const {href} = this.$router.resolve({path: '/collectDetail', query: {id: row.contract_id}});
        window.open(href, '_blank', 'width=1920,height=1080');
      },
      //*********************************租房*******************************************************//
      getRentData() {
        this.rentParams.house_id = this.collectHouseId;
        this.rentLoading = true;
        this.rentStatus = ' ';
        this.$http.get(globalConfig.server + 'lease/rent', {params: this.rentParams}).then((res) => {
          this.rentLoading = false;
          if (res.data.code === '61010') {
            this.rentingData = res.data.data;
            this.rentTotalNum = res.data.meta.total;
            let collectIdArray = '';
            this.rentingData.forEach((item) => {
              collectIdArray += item.contract_id + ',';
            });
            this.getReturnNumber(collectIdArray, 2);
            if (res.data.data.length > 0) {
              this.rentContractId = res.data.data[0].contract_id;
            } else {
              this.rentContractId = '';
              this.rentStatus = '暂未出租';
            }
          } else {
            this.rentingData = [];
            this.rentTotalNum = 0;
            this.rentContractId = '';
            this.rentStatus = '暂未出租';
          }
        })
      },
      rentSizeChange(val) {
        this.rentParams.limit = val;
        this.getRentData();
      },
      rentPageChange(val) {
        this.rentParams.page = val;
        this.getRentData();
      },
      //租客右键
      clientMenu(row, event) {
        this.returnInfo(row);
        this.ToActiveName = "second";
        this.contractModule = '2';
        this.lists = [
          {
            clickIndex: 'editRentInfoDialog',
            headIcon: 'el-icon-edit',
            label: '修改租客信息',
            disabled: row.doc_status.id > 3
          },
          {clickIndex: 'editAddressDialog', headIcon: 'el-icon-edit', label: '修改租房地址'},
          {clickIndex: 'vacationDialog', headIcon: 'el-icons-fa-reply', label: '租客退房',},
          {clickIndex: 'subleaseDialog', headIcon: 'el-icons-fa-refresh', label: '房屋转租',},
          {clickIndex: 'rentRenewDialog', headIcon: 'el-icon-share', label: '租客续约',},
          {clickIndex: 'rentChangeRoomDialog', headIcon: 'el-icons-fa-pencil-square-o', label: '租客调房',},
//          {clickIndex: 'ownerArrearsDialog', headIcon: 'el-icons-fa-cny', label: '租客欠款',},
          {clickIndex: 'addRentRepairDialog', headIcon: 'el-icons-fa-gear', label: '添加维修单',},
//          {clickIndex: 'sendMessageDialog', headIcon: 'el-icons-fa-envelope-o', label: '发送短信',},
          {clickIndex: 'addFollowUpDialog', headIcon: 'el-icons-fa-plus', label: '添加工单',},
          {clickIndex: 'addReturnvisitDialog', headIcon: 'el-icons-fa-pencil-square-o', label: '添加回访记录',},
          {clickIndex: 'addRentReimbursementDialog', headIcon: 'el-icons-fa-pencil-square-o', label: '添加报销单',},
          {clickIndex: 'deleteRent', headIcon: 'el-icon-delete', label: '删除',},
        ];
        this.contextMenuParam(event);
      },
      //租列表选中状态
      tableRowRentName({row, rowIndex}) {
        if (row.contract_id === this.rentContractId) {
          return 'selected_tr';
        }
        return '';
      },
      //单机租房列表
      clickRentTable(row, event, column) {
        this.rentHouseId = row.house_id;
        this.rentContractId = row.contract_id;
      },
      dblClickRentTable(row, event) {
        const {href} = this.$router.resolve({
          path: '/rentingDetail',
          query: {id: row.contract_id, collectId: this.collectContractId}
        });
        window.open(href, '_blank', 'width=1920,height=1080');
      },
      /*****************************************右键处理函数******************************************/
      // 合同表头右键
      // houseHeadMenu(e) {
      //  this.lists = [
      //    {clickIndex: 'topFormSetDialog', headIcon: 'el-icons-fa-home', label: '选择列选项',},
      //  ];
      //  this.contextMenuParam(event);
      // },
      // 详情表头右键
      // detailMenu(e) {
      //  if (e.target.className.indexOf('el-tabs__item') > -1 || e.target.className.indexOf('el-tabs__nav-scroll') > -1) {
      //    this.lists = [
      //      {clickIndex: 1, headIcon: 'el-icons-fa-home', label: '选择列选项',},
      //    ];
      //    this.contextMenuParam(event);
      //  }
      // },

      //右键回调时间
      clickEvent(index) {
        this.openModalDialog(index);
      },
      //关闭右键菜单
      closeMenu() {
        this.show = false;
      },

      //右键参数
      contextMenuParam(event) {
        let e = event || window.event;
        this.show = false;
        this.rightMenuX = e.clientX + document.documentElement.scrollLeft - document.documentElement.clientLeft;
        this.rightMenuY = e.clientY + document.documentElement.scrollTop - document.documentElement.clientTop;
        event.preventDefault();
        event.stopPropagation();
        this.$nextTick(() => {
          this.show = true
        })
      },
      /*****************************模态框打开******************************/
      openModalDialog(type) {
        switch (type) {
          case 'instructionDialog':   //说明书
            this.instructionDialog = true;
            break;
          case 'backUpDialog':        //备份
            this.backUpDialog = true;
            break;
          case 'advancedDialog':      //高级搜索
            this.advancedDialog = true;
            break;
          case 'ownerRenewDialog':    //房东续约
            this.ownerRenewDialog = true;
            break;
          case 'ownerDelayDialog':    //房东延期
            this.ownerDelayDialog = true;
            break;
          case 'vacationDialog':        //租客退房
            this.vacationDialog = true;
            break;
          case 'increaseGoodsDialog':     //物品增加
            this.increaseGoodsDialog = true;
            break;
          case 'decreaseGoodsDialog':     //物品增加
            this.decreaseGoodsDialog = true;
            break;
          case 'ownerArrearsDialog':     //物品增加
            this.ownerArrearsDialog = true;
            break;
          case 'addFollowUpDialog':     //增加跟进
            this.addFollowUpDialog = true;
            break;
          case 'addCollectRepairDialog':     //房东报修
            this.addCollectRepairDialog = true;
            break;
          case 'addRentRepairDialog':     //租客保修
            this.addRentRepairDialog = true;
            break;
          case 'rentChangeRoomDialog':     //租客调房
            this.rentChangeRoomDialog = true;
            break;
          case 'subleaseDialog':     //转租
            this.subleaseDialog = true;
            break;
          case 'rentRenewDialog':     //租客续约
            this.rentRenewDialog = true;
            break;
          case 'addRentInfoDialog':     //登记租客信息
            this.addRentInfoDialog = true;
            break;
          case 'editRentInfoDialog':     //修改租客信息
            this.editRentInfoDialog = true;
            break;
          case 'editAddressDialog':     //修改租客信息
            this.editAddressDialog = true;
            break;
          case 'sendMessageDialog':     //登记租客信息
            this.sendMessageDialog = true;
            break;
          case 'addHouseResourcesDialog':     //登记房源
            this.addHouseResourcesDialog = true;
            break;
          case 'editHouseResourcesDialog':     //修改房源
            this.editHouseResourcesDialog = true;
            break;
          case 'repaymentDialog':     //还款
            this.repaymentDialog = true;
            break;
          case 'returnVisitDialog':     //回访信息
            this.returnVisitDialog = true;
            break;
          case 'switchToJoint':     //转到合租
            this.switchToJoint();
            break;
          case 'topFormSetDialog':     //转到合租
            this.topFormSetDialog = true;
            break;
          case 'settingDialog':     //转到合租
            this.settingDialog = true;
            break;
          case 'addReturnvisitDialog':
            this.addReturnvisitDialog = true;
            break;
          case 'addCollectReimbursementDialog':
            this.addCollectReimbursementDialog = true;
            break;
          case 'addRentReimbursementDialog':
            this.addRentReimbursementDialog = true;
            break;
          case 'deleteRent':
            this.$confirm('此操作将永久删除该条目, 是否继续?', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
            }).then(() => {
              this.deleteColumn('rent');
            }).catch(() => {
              this.$notify.warning({
                title: '警告',
                message: '已取消删除',
              })
            });
            break;
          case 'deleteCollect':
            this.$confirm('此操作将永久删除该条目, 是否继续?', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
            }).then(() => {
              this.deleteColumn('collect');
            }).catch(() => {
              this.$notify.warning({
                title: '警告',
                message: '已取消删除',
              })
            });
            break;
        }
      },
      switchToJoint() {
        this.$confirm('转移以后不可恢复, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$message({
            type: 'success',
            message: '转移成功!'
          });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消转移'
          });
        });
      },
      //删除合同
      deleteColumn(type) {
        if (type === 'collect') {
          this.$http.put(globalConfig.server + 'lease/collect/delete/' + this.collectContractId).then((res) => {
            if (res.data.code === '61010') {
              this.$notify.success({
                title: '成功',
                message: res.data.msg,
              });
              this.getCollectData();
            } else {
              this.$notify.warning({
                title: '警告',
                message: res.data.msg,
              })
            }
          })
        } else {
          this.$http.put(globalConfig.server + 'lease/rent/delete/' + this.rentContractId).then((res) => {
            if (res.data.code === '61110') {
              this.$notify.success({
                title: '成功',
                message: res.data.msg,
              });
              this.getRentData();
            } else {
              this.$notify.warning({
                title: '警告',
                message: res.data.msg,
              })
            }
          })
        }
      },
      closeModal(val) {
        this.addReturnInfo = {};
        this.tabStatusChange = '';
        this.instructionDialog = false;
        this.organizationDialog = false;
        this.backUpDialog = false;
        this.advancedDialog = false;
        this.ownerDelayDialog = false;
        this.increaseGoodsDialog = false;
        this.decreaseGoodsDialog = false;
        this.ownerArrearsDialog = false;
        this.ownerRenewDialog = false;
        this.addFollowUpDialog = false;
        this.vacationDialog = false;
        this.addCollectRepairDialog = false;
        this.addRentRepairDialog = false;
        this.rentChangeRoomDialog = false;
        this.subleaseDialog = false;
        this.rentRenewDialog = false;
        this.addRentInfoDialog = false;
        this.editRentInfoDialog = false;
        this.editAddressDialog = false;
        this.sendMessageDialog = false;
        this.addHouseResourcesDialog = false;
        this.editHouseResourcesDialog = false;
        this.repaymentDialog = false;
        this.returnVisitDialog = false;
        this.topFormSetDialog = false;
        this.settingDialog = false;
        this.addReturnvisitDialog = false;
        this.contractModule = '';
        this.contractOperateId = '';
        this.addCollectReimbursementDialog = false;
        this.addRentReimbursementDialog = false;
        if (val === 'updateCollect') {
          this.getCollectData();
        } else if (val === 'updateRent') {
          this.getRentData();
        } else if (val === 'changeGoods') {
          this.tabStatusChange = 'GoodsChangeTab';
        } else if (val === 'visitRecord') {
          this.tabStatusChange = 'visitRecord';
        } else if (val === 'workOrder') {
          this.tabStatusChange = 'workOrder';
        } else if (val === 'repair') {
          this.tabStatusChange = 'repair';
        } else if (val === 'reimbursement') {
          this.tabStatusChange = 'reimbursement';
        }
      },
      //****************************高级搜索函数**************************//
      highGrade() {
        this.isHigh = !this.isHigh;
      },
      resetting() {
        this.collectParams.lord_start_time = [];
        this.collectParams.lord_end_time = [];
        this.collectParams.org_id = '';
        this.collectParams.doc_status = '';
        this.collectParams.visit_status = '';
        this.department_name = '';
      },
    },
  }
</script>

<style lang="scss" scoped="">
  #wholeRentContainer {
    padding-bottom: 30px;
    .tool {
      border-bottom: 1px solid #eee;
      display: flex;
      padding-bottom: 10px;
      justify-content: space-between;
      .tool_right {
        display: flex;
        align-items: center;
        div {
          width: 100px;
          text-align: center;
          cursor: pointer;
          i {
            color: #409EFF;
          }
        }
      }
    }
    .filter {
      padding-top: 10px;
    }
    .main {
      font-size: 12px;
      .tableBottom {
        padding: 8px;
        display: flex;
        justify-content: space-between;
        .right {
          display: flex;
          align-items: center;
          div {
            width: 100px;
            text-align: center;
            span {
              color: #fb529f;
            }
            &:first-child {
              border-right: 1px solid #ccc;
            }
          }
        }
      }
      .myHouse, .myClient {
        border: 1px solid #dfe6fb;
        margin-bottom: 20px;
        box-shadow: 0 2px 4px 0 rgba(0, 0, 0, .12), 0 0 6px 0 rgba(0, 0, 0, .04);
      }
      .myDetail {
        margin-bottom: 15px;
        width: 100%;
        .el-tabs {
          width: 100%;
          border: 1px solid #d4f0de;
          .el-tabs__content {
            width: 100% !important;
            min-height: 100px;
            .el-tab-pane {

            }
          }
        }
      }
    }
  }
</style>
