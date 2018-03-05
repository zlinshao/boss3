<template>
  <div @click="show=false" @contextmenu="closeMenu">
    <div id="wholeRentContainer">
      <div class="tool">
        <div class="tool_left">
          <el-button type="primary" size="mini" @click="openModalDialog('addHouseResourcesDialog')">
            <i class="el-icon-document"></i>&nbsp;登记房源
          </el-button>
          <el-button type="success" size="mini" @click="openModalDialog('instructionDialog')">
            <i class="el-icon-tickets"></i>&nbsp;功能说明
          </el-button>
          <el-button type="info" size="mini" @click="openModalDialog('backUpDialog')">
            <i class="el-icon-tickets"></i>&nbsp;查看备份
          </el-button>
        </div>

        <div class="tool_right"  @click="openModalDialog('settingDialog')">
          <div><i class="el-icon-setting"></i>&nbsp;设置</div>
        </div>
      </div>
      <div class="highRanking" style="margin-top: 10px">
        <div class="highSearch">
          <el-form :inline="true" size="mini">
            <el-form-item>
              <el-input placeholder="请输入内容" v-model="formInline.keyWords" size="mini" clearable>
                <el-button slot="append" icon="el-icon-search"></el-button>
              </el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" size="mini" @click="highGrade">高级</el-button>
            </el-form-item>
            <el-form-item>
              <el-button type="success">导出房源</el-button>
            </el-form-item>
          </el-form>
        </div>

        <div class="filter high_grade" :class="isHigh? 'highHide':''">
          <el-form :inline="true" :model="formInline" size="mini" label-width="100px">
            <div class="filterTitle">
              <i class="el-icons-fa-bars"></i>&nbsp;&nbsp;高级搜索
            </div>
            <el-row class="el_row_border">
              <el-col :span="12">
                <el-row>
                  <el-col :span="8">
                    <div class="el_col_label">店面</div>
                  </el-col>
                  <el-col :span="16" class="el_col_option">
                    <el-form-item>
                      <el-select v-model="formInline.house" clearable placeholder="请选择">
                        <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
                        </el-option>
                      </el-select>
                    </el-form-item>
                  </el-col>
                </el-row>
              </el-col>
              <el-col :span="12">
                <el-row>
                  <el-col :span="8">
                    <div class="el_col_label">户型</div>
                  </el-col>
                  <el-col :span="16" class="el_col_option">
                    <el-form-item>
                      <el-select v-model="formInline.a" clearable placeholder="请选择">
                        <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
                        </el-option>
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
                    <div class="el_col_label">状态</div>
                  </el-col>
                  <el-col :span="16" class="el_col_option">
                    <el-form-item>
                      <el-select v-model="formInline.house" clearable placeholder="请选择">
                        <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
                        </el-option>
                      </el-select>
                    </el-form-item>
                  </el-col>
                </el-row>
              </el-col>
            </el-row>
            <div class="btnOperate">
              <el-button size="mini" type="primary">搜索</el-button>
              <el-button size="mini" type="primary" @click="resetting">重置</el-button>
              <el-button size="mini" type="primary" @click="highGrade">取消</el-button>
            </div>
          </el-form>
        </div>

      </div>
      <div class="main">
        <div class="myHouse">
          <div class="blueTable" @contextmenu="houseHeadMenu($event)">
            <el-table
              :data="collectData"
              @row-dblclick="dblClickTable"
              @row-contextmenu='houseMenu'
              style="width: 100%">
              <el-table-column
                prop="contract_num"
                label="合同编号">
              </el-table-column>
              <el-table-column
                prop="address"
                label="房屋地址">
              </el-table-column>
              <el-table-column
                prop="house_type"
                label="房屋类型">
              </el-table-column>
              <el-table-column
                prop="deposit"
                label="收房押金">
              </el-table-column>
              <el-table-column
                prop="price"
                label="收房价格">
              </el-table-column>
              <el-table-column
                prop="pay_type"
                label="付款方式">
              </el-table-column>
              <el-table-column
                prop="vacancy"
                label="空置期">
              </el-table-column>
              <el-table-column
                prop="contract_year"
                label="签约时长">
              </el-table-column>
              <el-table-column
                prop="start_time"
                label="开始日期">
              </el-table-column>
              <el-table-column
                prop="end_time"
                label="结束日期">
              </el-table-column>
              <el-table-column
                prop="medium_price"
                label="中介费">
              </el-table-column>
              <el-table-column
                prop="department"
                label="所属部门">
              </el-table-column>
              <el-table-column
                prop="staff_name"
                label="签约人">
              </el-table-column>
              <el-table-column
                prop="charge_name"
                label="负责人">
              </el-table-column>
              <el-table-column
                prop="phone"
                label="电话">
              </el-table-column>
            </el-table>
          </div>
          <div class="tableBottom">
            <div class="right">
              <div>未租房源 <span>5&nbsp;套</span></div>
              <div>已定 <span>0&nbsp;套</span></div>
            </div>

            <div class="left">
              <el-pagination
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page="currentPage"
                :page-sizes="[10, 20, 30, 40]"
                :page-size="10"
                layout="total, sizes, prev, pager, next, jumper"
                :total="400">
              </el-pagination>
            </div>
          </div>
        </div>
        <div class="myClient">
          <div class="greenTable" @contextmenu="houseHeadMenu($event)">
            <el-table
              :data="rentingData"
              @row-click="clickTable"
              @row-contextmenu='clientMenu'
              style="width: 100%">
              <el-table-column
                prop="contract_num"
                label="合同编号">
              </el-table-column>
              <el-table-column
                prop="address"
                label="房屋地址">
              </el-table-column>
              <el-table-column
                prop="house_type"
                label="房屋类型">
              </el-table-column>
              <el-table-column
                prop="deposit"
                label="价格差">
              </el-table-column>
              <el-table-column
                prop="price"
                label="出租价格">
              </el-table-column>
              <el-table-column
                prop="pay_type"
                label="付款方式">
              </el-table-column>
              <el-table-column
                prop="vacancy"
                label="空置期">
              </el-table-column>
              <el-table-column
                prop="contract_year"
                label="签约时长">
              </el-table-column>
              <el-table-column
                prop="start_time"
                label="开始日期">
              </el-table-column>
              <el-table-column
                prop="end_time"
                label="结束日期">
              </el-table-column>
              <el-table-column
                prop="medium_price"
                label="中介费">
              </el-table-column>
              <el-table-column
                prop="department"
                label="所属部门">
              </el-table-column>
              <el-table-column
                prop="staff_name"
                label="签约人">
              </el-table-column>
              <el-table-column
                prop="charge_name"
                label="负责人">
              </el-table-column>
            </el-table>
          </div>
          <div class="tableBottom">
            <div class="right">
              <div>本套相差 <span>0&nbsp;元</span></div>
              <div>押金差 <span>0&nbsp;元</span></div>
            </div>

            <div class="left">
              <el-pagination
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page="currentPage"
                :page-sizes="[10, 20, 30, 40]"
                :page-size="10"
                layout="total, sizes, prev, pager, next, jumper"
                :total="0">
              </el-pagination>
            </div>
          </div>
        </div>
        <div class="myDetail" @contextmenu="detailMenu($event)">
          <el-tabs type="border-card">
            <el-tab-pane label="房东信息">
              <div class="content">
                <table class="tableDetail">
                  <tr>
                    <td>房东姓名</td>
                    <td></td>
                    <td>联系电话</td>
                    <td></td>
                    <td>合同开始时间</td>
                    <td></td>
                    <td>空置期开始时间</td>
                    <td></td>
                    <td>月单价</td>
                    <td></td>
                  </tr>
                  <tr>
                    <td>卫生情况</td>
                    <td></td>
                    <td>付款方式</td>
                    <td></td>
                    <td>证件类型</td>
                    <td></td>
                    <td>合同结束时间</td>
                    <td></td>
                    <td>空置期结束时间</td>
                    <td></td>
                  </tr>
                  <tr>
                    <td>签约时长</td>
                    <td></td>
                    <td>门卡数量</td>
                    <td></td>
                    <td>押金</td>
                    <td></td>
                    <td>证件号码</td>
                    <td></td>
                    <td>钥匙数</td>
                    <td></td>
                  </tr>
                  <tr>
                    <td>空置时长</td>
                    <td></td>
                    <td>合同性质</td>
                    <td></td>
                    <td>录入时间</td>
                    <td></td>
                    <td>水电底数</td>
                    <td colspan="3"></td>
                  </tr>
                  <tr>
                    <td>所属部门</td>
                    <td></td>
                    <td>开单人</td>
                    <td></td>
                    <td>负责人</td>
                    <td></td>
                    <td>操作人</td>
                    <td colspan="3"></td>
                  </tr>
                </table>
              </div>
              <div class="remarks">备注：</div>
            </el-tab-pane>
            <el-tab-pane label="租客信息">
              <div class="content">
                <table class="tableDetail">
                  <tr>
                    <td>合同编号</td>
                    <td></td>
                    <td>地址</td>
                    <td></td>
                    <td>户型</td>
                    <td></td>
                    <td>姓名</td>
                    <td></td>
                    <td>电话</td>
                    <td></td>
                  </tr>
                  <tr>
                    <td>身份证</td>
                    <td></td>
                    <td>建筑面积</td>
                    <td></td>
                    <td>押金</td>
                    <td></td>
                    <td>月单价</td>
                    <td></td>
                    <td>合同期限</td>
                    <td></td>
                  </tr>
                  <tr>
                    <td>合同开始时间</td>
                    <td></td>
                    <td>合同结束时间</td>
                    <td></td>
                    <td>门禁卡</td>
                    <td></td>
                    <td>钥匙数</td>
                    <td colspan="3"></td>
                    <!--<td>证件号码</td>-->
                    <!--<td></td>-->
                  </tr>
                  <tr>
                    <td>水表底数</td>
                    <td></td>
                    <td>燃气表底数</td>
                    <td></td>
                    <td>电表底数</td>
                    <td colspan="5"></td>
                  </tr>
                </table>
              </div>
              <div class="remarks">备注：</div>
            </el-tab-pane>
            <el-tab-pane label="欠费信息">
              <el-table
                :data="rentingData"
                @row-click="clickTable"
                style="width: 100%">
                <el-table-column
                  prop="contract_num"
                  label="欠款时间">
                </el-table-column>
                <el-table-column
                  prop="address"
                  label="欠款类型">
                </el-table-column>
                <el-table-column
                  prop="house_type"
                  label="身份">
                </el-table-column>
                <el-table-column
                  prop="deposit"
                  label="姓名">
                </el-table-column>
                <el-table-column
                  prop="price"
                  label="金额">
                </el-table-column>
                <el-table-column
                  prop="pay_type"
                  label="还款期限">
                </el-table-column>
                <el-table-column
                  prop="vacancy"
                  label="欠款说明">
                </el-table-column>
                <el-table-column
                  prop="contract_year"
                  label="录入人">
                </el-table-column>
                <el-table-column
                  label="欠款状态">
                  <template slot-scope="scope">
                    <el-button @click="openModalDialog('repaymentDialog')" size="mini" type="text">{{scope.row.vacancy}}</el-button>
                  </template>
                </el-table-column>
                <el-table-column
                  prop="start_time"
                  label="操作时间">
                </el-table-column>
                <el-table-column
                  prop="start_time"
                  label="备注">
                </el-table-column>
              </el-table>
            </el-tab-pane>
            <el-tab-pane label="物品增减">
              <el-table
                :data="rentingData"
                @row-click="clickTable"

                style="width: 100%">
                <el-table-column
                  prop="contract_num"
                  label="类型">
                </el-table-column>
                <el-table-column
                  prop="address"
                  label="操作时间">
                </el-table-column>
                <el-table-column
                  prop="house_type"
                  label="物品种类">
                </el-table-column>
                <el-table-column
                  prop="deposit"
                  label="物品名称">
                </el-table-column>
                <el-table-column
                  prop="price"
                  label="物品数量">
                </el-table-column>
                <el-table-column
                  prop="pay_type"
                  label="单价/总计（元）">
                </el-table-column>
                <el-table-column
                  prop="vacancy"
                  label="物品来源/去向">
                </el-table-column>
                <el-table-column
                  prop="contract_year"
                  label="搬出/搬入地址">
                </el-table-column>
                <el-table-column
                  prop="start_time"
                  label="原物品去向">
                </el-table-column>
              </el-table>
            </el-tab-pane>
            <el-tab-pane label="退/换房记录">
              <el-table
                :data="rentingData"
                @row-click="clickTable"

                style="width: 100%">
                <el-table-column
                  prop="contract_num"
                  label="退房时间">
                </el-table-column>
                <el-table-column
                  prop="address"
                  label="退房状态">
                </el-table-column>
                <el-table-column
                  prop="house_type"
                  label="退房方">
                </el-table-column>
                <el-table-column
                  prop="deposit"
                  label="合同开始时间">
                </el-table-column>
                <el-table-column
                  prop="price"
                  label="合同结束时间">
                </el-table-column>
                <el-table-column
                  prop="pay_type"
                  label="结算详情">
                </el-table-column>
                <el-table-column
                  prop="vacancy"
                  label="应退费用">
                </el-table-column>
                <el-table-column
                  prop="contract_year"
                  label="扣款金额">
                </el-table-column>
                <el-table-column
                  prop="start_time"
                  label="实际退款">
                </el-table-column>
                <el-table-column
                  prop="start_time"
                  label="退组状态">
                </el-table-column>
                <el-table-column
                  prop="start_time"
                  label="结算人">
                </el-table-column>
                <el-table-column
                  prop="start_time"
                  label="操作人">
                </el-table-column>
              </el-table>
            </el-tab-pane>
            <el-tab-pane label="续约/延期">
              <el-table
                :data="rentingData"
                @row-click="clickTable"

                style="width: 100%">
                <el-table-column
                  prop="contract_num"
                  label="录入时间">
                </el-table-column>
                <el-table-column
                  prop="address"
                  label="操作类型">
                </el-table-column>
                <el-table-column
                  prop="house_type"
                  label="对象">
                </el-table-column>
                <el-table-column
                  prop="deposit"
                  label="续约前合同周期">
                </el-table-column>
                <el-table-column
                  prop="price"
                  label="续约后合同周期">
                </el-table-column>
                <el-table-column
                  prop="pay_type"
                  label="签约时长">
                </el-table-column>
                <el-table-column
                  prop="vacancy"
                  label="月单价">
                </el-table-column>
                <el-table-column
                  prop="contract_year"
                  label="付款方式">
                </el-table-column>
                <el-table-column
                  prop="start_time"
                  label="开单人">
                </el-table-column>
                <el-table-column
                  prop="start_time"
                  label="负责人">
                </el-table-column>
                <el-table-column
                  prop="start_time"
                  label="部门">
                </el-table-column>
                <el-table-column
                  prop="start_time"
                  label="操作人">
                </el-table-column>
              </el-table>
            </el-tab-pane>
            <el-tab-pane label="转租记录">
              <el-table
                :data="rentingData"
                @row-click="clickTable"

                style="width: 100%">
                <el-table-column
                  prop="contract_num"
                  label="转租时间">
                </el-table-column>
                <el-table-column
                  prop="address"
                  label="转租类型">
                </el-table-column>
                <el-table-column
                  prop="house_type"
                  label="前租客姓名">
                </el-table-column>
                <el-table-column
                  prop="deposit"
                  label="前租客手机号">
                </el-table-column>
                <el-table-column
                  prop="price"
                  label="前租金">
                </el-table-column>
                <el-table-column
                  prop="pay_type"
                  label="手续费">
                </el-table-column>
                <el-table-column
                  prop="vacancy"
                  label="备注">
                </el-table-column>
                <el-table-column
                  prop="contract_year"
                  label="查看应收款项">
                </el-table-column>
              </el-table>
            </el-tab-pane>
            <el-tab-pane label="应收款项">
              <el-table
                :data="rentingData"
                @row-click="clickTable"

                style="width: 100%">
                <el-table-column
                  prop="contract_num"
                  label="现租客的所有应收款项">
                </el-table-column>
                <el-table-column
                  prop="address"
                  label="收款时间">
                </el-table-column>
                <el-table-column
                  prop="house_type"
                  label="合同有效期">
                </el-table-column>
                <el-table-column
                  prop="deposit"
                  label="应收金额">
                </el-table-column>
                <el-table-column
                  prop="deposit"
                  label="已收金额">
                </el-table-column>
                <el-table-column
                  prop="price"
                  label="款项状态">
                </el-table-column>
                <el-table-column
                  prop="pay_type"
                  label="备注">
                </el-table-column>
              </el-table>
            </el-tab-pane>
            <el-tab-pane label="应付款项">
              <el-table
                :data="rentingData"
                @row-click="clickTable"

                style="width: 100%">
                <el-table-column
                  prop="contract_num"
                  label="现租客的所有应付款项">
                </el-table-column>
                <el-table-column
                  prop="address"
                  label="付款时间">
                </el-table-column>
                <el-table-column
                  prop="house_type"
                  label="合同有效期">
                </el-table-column>
                <el-table-column
                  prop="deposit"
                  label="应付金额">
                </el-table-column>
                <el-table-column
                  prop="deposit"
                  label="已付金额">
                </el-table-column>
                <el-table-column
                  prop="price"
                  label="款项状态">
                </el-table-column>
                <el-table-column
                  prop="pay_type"
                  label="备注">
                </el-table-column>
              </el-table>
            </el-tab-pane>
            <el-tab-pane label="资料备忘">
              <el-table
                :data="rentingData"
                @row-click="clickTable"

                style="width: 100%">
                <el-table-column
                  prop="contract_num"
                  label="录入/更新时间">
                </el-table-column>
                <el-table-column
                  prop="address"
                  label="填写人">
                </el-table-column>
                <el-table-column
                  prop="house_type"
                  label="内容">
                </el-table-column>
                <el-table-column
                  prop="deposit"
                  label="开单人">
                </el-table-column>
                <el-table-column
                  prop="deposit"
                  label="负责人">
                </el-table-column>
                <el-table-column
                  prop="price"
                  label="部门">
                </el-table-column>
              </el-table>
            </el-tab-pane>
            <el-tab-pane label="回访记录">
              <el-table
                :data="rentingData"
                @row-click="clickTable"
                style="width: 100%">
                <el-table-column
                  prop="contract_num"
                  label="服务态度">
                </el-table-column>
                <el-table-column
                  prop="address"
                  label="回访人">
                </el-table-column>
                <el-table-column
                  prop="house_type"
                  label="回访时间">
                </el-table-column>
                <el-table-column
                  prop="deposit"
                  label="回访状态">
                </el-table-column>
              </el-table>
            </el-tab-pane>
            <el-tab-pane label="跟进记录">
              <el-table
                :data="rentingData"
                @row-click="clickTable"
                style="width: 100%">
                <el-table-column
                  prop="contract_num"
                  label="跟进时间">
                </el-table-column>
                <el-table-column
                  prop="address"
                  label="录入时间">
                </el-table-column>
                <el-table-column
                  prop="house_type"
                  label="跟进方式">
                </el-table-column>
                <el-table-column
                  prop="deposit"
                  label="身份">
                </el-table-column>
                <el-table-column
                  prop="contract_num"
                  label="事件类型">
                </el-table-column>
                <el-table-column
                  prop="address"
                  label="时间等级">
                </el-table-column>
                <el-table-column
                  prop="house_type"
                  label="具体时间">
                </el-table-column>
                <el-table-column
                  prop="deposit"
                  label="预计完成时间">
                </el-table-column>
                <el-table-column
                  prop="contract_num"
                  label="跟进结果">
                </el-table-column>
                <el-table-column
                  prop="address"
                  label="认责人">
                </el-table-column>
                <el-table-column
                  prop="house_type"
                  label="时间转交">
                </el-table-column>
                <el-table-column
                  prop="deposit"
                  label="上传图片">
                </el-table-column>
                <el-table-column
                  prop="house_type"
                  label="上传录音">
                </el-table-column>
                <el-table-column
                  prop="deposit"
                  label="录入人">
                </el-table-column>
              </el-table>
            </el-tab-pane>
            <el-tab-pane label="维修">
              <el-table
                :data="rentingData"
                @row-click="clickTable"

                style="width: 100%">
                <el-table-column
                  prop="contract_num"
                  label="保修时间">
                </el-table-column>
                <el-table-column
                  prop="address"
                  label="保修人">
                </el-table-column>
                <el-table-column
                  prop="house_type"
                  label="登记人">
                </el-table-column>
                <el-table-column
                  prop="deposit"
                  label="负责人">
                </el-table-column>
                <el-table-column
                  prop="deposit"
                  label="保修内容">
                </el-table-column>
                <el-table-column
                  prop="price"
                  label="维修金额">
                </el-table-column>
                <el-table-column
                  prop="pay_type"
                  label="约定时间">
                </el-table-column>
                <el-table-column
                  prop="deposit"
                  label="开单人">
                </el-table-column>
                <el-table-column
                  prop="price"
                  label="部门">
                </el-table-column>
                <el-table-column
                  label="维修结果">
                  <template slot-scope="scope">
                    <a href="javacript:;" style="color: #409EFF" @click="openModalDialog('returnVisitDialog')">查看</a>
                  </template>
                </el-table-column>
              </el-table>
            </el-tab-pane>
          </el-tabs>
        </div>
      </div>
    </div>
    <RightMenu :startX="rightMenuX+'px'" :startY="rightMenuY+'px'" :list="lists" :show="show"
               @clickOperate="clickEvent"></RightMenu>
    <Instruction :instructionDialog="instructionDialog" @close="closeInstruction"></Instruction>
    <BackUp :backUpDialog="backUpDialog" @close="closeBackUp"></BackUp>
    <Advanced :advancedDialog="advancedDialog" @close="closeAdvanced"></Advanced>
    <OwnerDelay :ownerDelayDialog="ownerDelayDialog" @close="closeOwnerDelay"></OwnerDelay>
    <RentVacation :rentVacationDialog="rentVacationDialog" @close="closeRentVacation"></RentVacation>
    <IncreaseGoods :increaseGoodsDialog="increaseGoodsDialog" @close="closeIncreaseGoods"></IncreaseGoods>
    <DecreaseGoods :decreaseGoodsDialog="decreaseGoodsDialog" @close="closeDecreaseGoods"></DecreaseGoods>
    <OwnerArrears :ownerArrearsDialog="ownerArrearsDialog" @close="closeOwnerArrears"></OwnerArrears>
    <OwnerRenew :ownerRenewDialog="ownerRenewDialog" @close="closeOwnerRenew"></OwnerRenew>
    <AddFollowUp :addFollowUpDialog="addFollowUpDialog" @close="closeFollowUp"></AddFollowUp>
    <CollectVacation :collectVacationDialog="collectVacationDialog" @close="closeCollectVacation"></CollectVacation>
    <AddCollectRepair :addCollectRepairDialog="addCollectRepairDialog" @close="closeAddCollectRepair"></AddCollectRepair>
    <AddRentRepair :addRentRepairDialog="addRentRepairDialog" @close="closeAddRentRepair"></AddRentRepair>
    <RentChangeRoom :rentChangeRoomDialog="rentChangeRoomDialog" @close="closeRentChangeRoom"></RentChangeRoom>
    <Sublease :subleaseDialog="subleaseDialog" @close="closeSublease"></Sublease>
    <RentRenew :rentRenewDialog="rentRenewDialog" @close="closeRentRenew"></RentRenew>
    <AddRentInfo :addRentInfoDialog="addRentInfoDialog" @close="closeAddRentInfo"></AddRentInfo>
    <SendMessage :sendMessageDialog="sendMessageDialog" @close="closeSendMessage"></SendMessage>
    <AddHouseResources :addHouseResourcesDialog="addHouseResourcesDialog" @close="closeAddHouseResources"></AddHouseResources>
    <Repayment :repaymentDialog="repaymentDialog" @close="closeRepayment"></Repayment>
    <ReturnVisit :returnVisitDialog="returnVisitDialog" @close="closeReturnVisit"></ReturnVisit>
    <TopForm :topFormSetDialog="topFormSetDialog" @close="closeTopForm"></TopForm>
    <Setting :settingDialog="settingDialog" @close="closeSetting"></Setting>
  </div>
</template>

<script>
  import RightMenu from '../../common/rightMenu.vue'    //右键
  import Instruction from './components/instruction.vue'            //使用说明
  import BackUp from '../components/back-up.vue'                    //备份
  import Advanced from '../components/advancedSearch.vue'           //高级搜索
  import OwnerDelay from '../components/ownerDelay.vue'              //房东延期
  import OwnerRenew from '../components/ownerRenew.vue'              //房东续约
  import RentVacation from '../components/rentVacation.vue'          //租客续约
  import IncreaseGoods from '../components/increaseGoods.vue' //物品增加
  import DecreaseGoods from '../components/decreaseGoods.vue' //物品减少
  import OwnerArrears from '../components/OwnerArrears.vue'   //房东欠款
  import AddFollowUp from '../components/addFollowUp.vue'     //增加跟进记录
  import CollectVacation from '../components/collectVacation.vue' //房东退房
  import AddCollectRepair from '../components/addCollectRepair.vue' //添加房东维修
  import AddRentRepair from '../components/addRentRepair.vue'//添加租客维修
  import RentChangeRoom from '../components/rentChangeRoom.vue'   //租客换房
  import Sublease from '../components/sublease.vue'     //转租
  import RentRenew from '../components/rentRenew.vue'     //租客续约
  import AddRentInfo from '../components/addRentInfo.vue' //登记租客
  import SendMessage from '../../common/sendMessage.vue'  //发送短信
  import AddHouseResources from '../components/addHouseResources.vue' //登记房源
  import Repayment from '../components/rentRepayment.vue'
  import ReturnVisit from '../components/returnVisit.vue'   //查看回访
  import TopForm from '../components/topFormSet.vue'    //表头列表
  import Setting from './components/setting.vue'

  export default {
    name: 'hello',
    components: {
      RightMenu,
      Instruction,
      BackUp,
      Advanced,
      OwnerRenew,
      OwnerDelay,
      RentVacation,
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
      SendMessage,
      AddHouseResources,
      Repayment,
      ReturnVisit,
      TopForm,
      Setting
    },
    data () {
      return {
        rightMenuX: 0,
        rightMenuY: 0,
        show: false,
        lists: [],
        /***********/
        //模态框
        instructionDialog: false,//使用说明
        backUpDialog: false, //备份
        advancedDialog: false,//高级搜索
        ownerRenewDialog: false,//房东续约
        ownerDelayDialog: false,//房东延期
        rentVacationDialog: false, //租客退房
        decreaseGoodsDialog: false,  //物品搬出
        increaseGoodsDialog: false,  //物品增加
        ownerArrearsDialog: false,   //房东欠款
        addFollowUpDialog :false,     //添加跟进
        collectVacationDialog:false,     //房东退房
        addCollectRepairDialog:false,    //房东添加维修
        addRentRepairDialog:false,       //租客添加维修
        rentChangeRoomDialog:false,      //租客换房
        subleaseDialog:false,           //转租
        rentRenewDialog:false,          //租客续约
        addRentInfoDialog:false,      //登记租客信息
        sendMessageDialog:false,      //发送短信
        addHouseResourcesDialog:false,  //登记房源
        repaymentDialog:false,        //还款
        returnVisitDialog:false,      //查看回访
        topFormSetDialog:false,       //选择列
        settingDialog : false,        //设置

        isHigh: false,

        formInline: {
          name: '',
          house: ''
        },
        collectData: [
          {
            id: '1',
            contract_num: 'LJSF0000001',
            address: '天华硅谷',
            house_type: '三室一厅',
            deposit: '8888',
            price: '3500',
            pay_type: '月付',
            vacancy: '30',
            contract_year: '3年',
            start_time: '2018-1-1',
            end_time: '2021-1-1',
            medium_price: '2000',
            department: '市场部',
            staff_name: '陆宣羽',
            charge_name: '陆宣羽',
            phone: '15800008888',
          },
          {
            id: '1',
            contract_num: 'LJSF0000001',
            address: '天华硅谷',
            house_type: '三室一厅',
            deposit: '8888',
            price: '3500',
            pay_type: '月付',
            vacancy: '30',
            contract_year: '3年',
            start_time: '2018-1-1',
            end_time: '2021-1-1',
            medium_price: '2000',
            department: '市场部',
            staff_name: '陆宣羽',
            charge_name: '陆宣羽',
            phone: '15800008888',
          },
          {
            id: '1',
            contract_num: 'LJSF0000001',
            address: '天华硅谷',
            house_type: '三室一厅',
            deposit: '8888',
            price: '3500',
            pay_type: '月付',
            vacancy: '30',
            contract_year: '3年',
            start_time: '2018-1-1',
            end_time: '2021-1-1',
            medium_price: '2000',
            department: '市场部',
            staff_name: '陆宣羽',
            charge_name: '陆宣羽',
            phone: '15800008888',
          },
          {
            id: '1',
            contract_num: 'LJSF0000001',
            address: '天华硅谷',
            house_type: '三室一厅',
            deposit: '8888',
            price: '3500',
            pay_type: '月付',
            vacancy: '30',
            contract_year: '3年',
            start_time: '2018-1-1',
            end_time: '2021-1-1',
            medium_price: '2000',
            department: '市场部',
            staff_name: '陆宣羽',
            charge_name: '陆宣羽',
            phone: '15800008888',
          },
          {
            id: '1',
            contract_num: 'LJSF0000001',
            address: '天华硅谷',
            house_type: '三室一厅',
            deposit: '8888',
            price: '3500',
            pay_type: '月付',
            vacancy: '30',
            contract_year: '3年',
            start_time: '2018-1-1',
            end_time: '2021-1-1',
            medium_price: '2000',
            department: '市场部',
            staff_name: '陆宣羽',
            charge_name: '陆宣羽',
            phone: '15800008888',
          },
        ],
        rentingData: [
          {
            id: '1',
            contract_num: 'LJSF0000001',
            address: '天华硅谷',
            house_type: '三室一厅',
            deposit: '8888',
            price: '3500',
            pay_type: '月付',
            vacancy: '30',
            contract_year: '3年',
            start_time: '2018-1-1',
            end_time: '2021-1-1',
            medium_price: '2000',
            department: '市场部',
            staff_name: '陆宣羽',
            charge_name: '陆宣羽',
            phone: '15800008888',
          },
          {
            id: '1',
            contract_num: 'LJSF0000001',
            address: '天华硅谷',
            house_type: '三室一厅',
            deposit: '8888',
            price: '3500',
            pay_type: '月付',
            vacancy: '30',
            contract_year: '3年',
            start_time: '2018-1-1',
            end_time: '2021-1-1',
            medium_price: '2000',
            department: '市场部',
            staff_name: '陆宣羽',
            charge_name: '陆宣羽',
            phone: '15800008888',
          },
          {
            id: '1',
            contract_num: 'LJSF0000001',
            address: '天华硅谷',
            house_type: '三室一厅',
            deposit: '8888',
            price: '3500',
            pay_type: '月付',
            vacancy: '30',
            contract_year: '3年',
            start_time: '2018-1-1',
            end_time: '2021-1-1',
            medium_price: '2000',
            department: '市场部',
            staff_name: '陆宣羽',
            charge_name: '陆宣羽',
            phone: '15800008888',
          }
        ],
        currentPage: 1,
        options: [
          {
            value: '选项1',
            label: '黄金糕'
          }, {
            value: '选项2',
            label: '双皮奶'
          }, {
            value: '选项3',
            label: '蚵仔煎'
          }, {
            value: '选项4',
            label: '龙须面'
          }, {
            value: '选项5',
            label: '北京烤鸭'
          }],
      }
    },

    methods: {
      handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
      },
      handleCurrentChange(val) {
        console.log(`当前页: ${val}`);
      },
      clickTable(row, event, column){
        console.log(row, event, column)
      },
      //房屋右键
      houseMenu(row, event){
        this.lists = [
          {clickIndex: 'addHouseResourcesDialog', headIcon: 'el-icons-fa-home', label: '修改房源',},
          {
            clickIndex: '', headIcon: 'el-icons-fa-pencil-square-o', tailIcon: 'el-icon-arrow-right', label: '房东续约/延期',
            children: [
              {clickIndex: 'ownerRenewDialog', label: '续约',},
              {clickIndex: 'ownerDelayDialog', label: '延期',}
            ]
          },
          {clickIndex: 'collectVacationDialog', headIcon: 'el-icons-fa-reply', label: '房东退房',},
//              {clickIndex: 1, headIcon: 'el-icon-document', label: '房东合同',},
          {
            clickIndex: '', headIcon: 'el-icons-fa-folder-o', tailIcon: 'el-icon-arrow-right', label: '其他',
            children: [
              {clickIndex: 'switchToJoint', label: '转到合租',},
              {clickIndex: 'addFollowUpDialog', label: '添加跟进',}
            ]
          },
          {clickIndex: 'ownerArrearsDialog', headIcon: 'el-icons-fa-cny', label: '房东欠款',},
          {
            clickIndex: '', headIcon: 'el-icons-fa-inbox', tailIcon: 'el-icon-arrow-right', label: '物品增减',
            children: [
              {clickIndex: 'decreaseGoodsDialog', label: '物品搬出',},
              {clickIndex: 'increaseGoodsDialog', label: '物品增进',}
            ]
          },
          {clickIndex: 'addCollectRepairDialog', headIcon: 'el-icons-fa-gear', label: '维修',},
//              {clickIndex: 1, headIcon: 'el-icons-fa-user', label: '黑名单',},
          {clickIndex: 'sendMessageDialog', headIcon: 'el-icons-fa-envelope-o', label: '发送短信',},
//          {clickIndex: '', headIcon: 'el-icons-fa-plus-circle', label: '对比',},
        ];
        this.contextMenuParam(event);
      },
      //合同表头右键
      houseHeadMenu(e){
        this.lists = [
          {clickIndex: 'topFormSetDialog', headIcon: 'el-icons-fa-home', label: '选择列选项',},
        ];
        this.contextMenuParam(event);
      },

      //详情表头右键
      detailMenu(e){
          console.log(e.target.className)
        if (e.target.className.indexOf('el-tabs__item') > -1 || e.target.className.indexOf('el-tabs__nav-scroll') > -1) {
          this.lists = [
            {clickIndex: 1, headIcon: 'el-icons-fa-home', label: '选择列选项',},
          ];
          this.contextMenuParam(event);
        }
      },
      dblClickTable(row, event){   //双击
        const {href} = this.$router.resolve({path: '/rentingDetail',query:{id:'1'}});
        window.open(href,'_blank','width=1920,height=1080');
      },
      //右键回调时间
      clickEvent (index) {
        this.openModalDialog(index);
      },
      //关闭右键菜单
      closeMenu(){
        this.show = false;
      },
      //租客右键
      clientMenu(row, event){
        console.log(row)
        this.lists = [
          {
            clickIndex: '', headIcon: 'el-icons-fa-user', tailIcon: 'el-icon-arrow-right', label: '租客管理',
            children: [
              {clickIndex: 'addRentInfoDialog', label: '登记租客信息',},
              {clickIndex: 'addRentInfoDialog', label: '修改租客信息',},
            ]
          },
          {clickIndex: 'rentRenewDialog', headIcon: 'el-icons-fa-pencil-square-o', label: '租客续约',},
          {
            clickIndex: '', headIcon: 'el-icons-fa-home', tailIcon: 'el-icon-arrow-right', label: '退房/调房',
            children: [
              {clickIndex: 'rentVacationDialog', label: '租客退房',},
              {clickIndex: 'rentChangeRoomDialog', label: '租客调房',}
            ]
          },
//              {clickIndex: 1, headIcon: 'el-icon-document', label: '房东合同',},
          {clickIndex: 'subleaseDialog', headIcon: 'el-icons-fa-refresh', label: '转租',},
          {clickIndex: 'ownerArrearsDialog', headIcon: 'el-icons-fa-cny', label: '租客欠款',},
          {clickIndex: 'addRentRepairDialog', headIcon: 'el-icons-fa-gear', label: '报修',},
//              {clickIndex: 1, headIcon: 'el-icons-fa-user', label: '黑名单',},
          {clickIndex: 'sendMessageDialog', headIcon: 'el-icons-fa-envelope-o', label: '发送短信',},
//          {clickIndex: 1, headIcon: 'el-icons-fa-plus-circle', label: '对比',},
          {clickIndex: 'addFollowUpDialog', headIcon: 'el-icons-fa-plus', label: '添加跟进',},
        ];
        this.contextMenuParam(event);
      },

      //右键参数
      contextMenuParam(event){
        //param: user right param
        let e = event || window.event;	//support firefox contextmenu
        this.show = false;
        this.rightMenuX = e.clientX + document.documentElement.scrollLeft - document.documentElement.clientLeft;
        this.rightMenuY = e.clientY + document.documentElement.scrollTop - document.documentElement.clientTop;


//        console.log(this.rightMenuX,this.rightMenuY)
        event.preventDefault();
        event.stopPropagation();
        this.$nextTick(() => {
          this.show = true
        })
      },
      /*****************************模态框打开******************************/
      openModalDialog(type){
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
          case 'rentVacationDialog':        //租客退房
            this.rentVacationDialog = true;
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
          case 'collectVacationDialog':     //房东退房
            this.collectVacationDialog = true;
            break;
          case 'addCollectRepairDialog':     //房东报修
            this.addCollectRepairDialog = true;
            break;
          case 'addRentRepairDialog':     //租客保修
            this.addRentRepairDialog = true;
            break;
          case 'rentChangeRoomDialog':     //租客换房
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
          case 'sendMessageDialog':     //登记租客信息
            this.sendMessageDialog = true;
            break;
          case 'addHouseResourcesDialog':     //登记房源
            this.addHouseResourcesDialog = true;
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
        }

      },
      switchToJoint(){
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
      closeInstruction(){
        this.instructionDialog = false
      },
      closeBackUp(){
        this.backUpDialog = false;
      },
      closeAdvanced(){
        this.advancedDialog = false;
      },
      closeOwnerDelay(){
        this.ownerDelayDialog = false;
      },
      closeRentVacation(){
        this.rentVacationDialog = false;
      },
      closeIncreaseGoods(){
        this.increaseGoodsDialog = false;
      },
      closeDecreaseGoods(){
        this.decreaseGoodsDialog = false;
      },
      closeOwnerArrears(){
        this.ownerArrearsDialog = false;
      },
      closeOwnerRenew(){
        this.ownerRenewDialog = false;
      },
      closeFollowUp(){
        this.addFollowUpDialog = false;
      },
      closeCollectVacation(){
        this.collectVacationDialog = false;
      },
      closeAddCollectRepair(){
          this.addCollectRepairDialog = false;
      },
      closeAddRentRepair(){
        this.addRentRepairDialog = false;
      },
      closeRentChangeRoom(){
        this.rentChangeRoomDialog = false;
      },
      closeSublease(){
        this.subleaseDialog = false;
      },
      closeRentRenew(){
        this.rentRenewDialog = false;
      },
      closeAddRentInfo(){
        this.addRentInfoDialog = false;
      },
      closeSendMessage(){
        this.sendMessageDialog = false;
      },
      closeAddHouseResources(){
        this.addHouseResourcesDialog = false;
      },
      closeRepayment(){
        this.repaymentDialog = false;
      },
      closeReturnVisit(){
        this.returnVisitDialog = false;
      },
      closeTopForm(){
        this.topFormSetDialog = false;
      },
      closeSetting(){
          this.settingDialog = false;
      },
      highGrade(){
        this.isHigh = !this.isHigh;
      },
      resetting(){

      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped="">
  #wholeRentContainer {
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
      .myHouse {
        border: 1px solid #dfe6fb;
        margin-bottom: 20px;
        box-shadow: 0 2px 4px 0 rgba(0, 0, 0, .12), 0 0 6px 0 rgba(0, 0, 0, .04);
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
      }
      .myClient {
        border: 1px solid #d4f0de;
        margin-bottom: 20px;
        box-shadow: 0 2px 4px 0 rgba(0, 0, 0, .12), 0 0 6px 0 rgba(0, 0, 0, .04);
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
      }
      .myDetail {
        margin-bottom: 15px;
        .el-tabs {
          border: 1px solid #d4f0de;
          .el-tabs__content {
            min-height: 100px;
            .el-tab-pane {
              .content {
                min-height: 100px;
                .tableDetail {
                  width: 100%;
                  border-collapse: collapse;
                  tr {
                    td {
                      border: 1px solid #ebeef5;
                      padding: 8px 0;
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
              .remarks {
                padding: 8px;
                border-top: 1px solid #efefef;
              }
            }
          }
        }
      }
    }
  }
</style>
