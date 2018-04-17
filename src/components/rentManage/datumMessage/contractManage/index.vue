<template>
  <div @click="show=false" @contextmenu="closeMenu">
    <div id="clientContainer">

      <div class="highRanking">
        <div class="tabsSearch">
          <el-form :inline="true" onsubmit="return false" size="mini">
            <el-form-item>
              <el-input v-model="params.q" placeholder="搜索" readOnly @focus="openAddressDialog">
                <el-button @click="search()" slot="append" type="primary" icon="el-icon-search"></el-button>
              </el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" size="mini" @click="highGrade">高级</el-button>
            </el-form-item>
            <el-form-item style="float: right">
              <el-button type="success" @click="viewIncompleteRecord">查看补齐记录</el-button>
            </el-form-item>
          </el-form>
        </div>

        <div class="filter high_grade" :class="isHigh? 'highHide':''">
          <el-form :inline="true" onsubmit="return false" :model="formInline" size="mini" label-width="100px">
            <div class="filterTitle">
              <i class="el-icons-fa-bars"></i>&nbsp;&nbsp;高级搜索
            </div>
            <el-row class="el_row_border">
              <el-col :span="12">
                <el-row>
                  <el-col :span="8">
                    <div class="el_col_label">发布时间</div>
                  </el-col>
                  <el-col :span="16" class="el_col_option">
                    <el-form-item>
                      <el-date-picker
                        v-model="params.publish_time"
                        type="daterange"
                        align="right"
                        unlink-panels
                        range-separator="至"
                        start-placeholder="开始日期"
                        end-placeholder="结束日期"
                        value-format="yyyy-MM-dd"
                        :picker-options="pickerOptions">
                      </el-date-picker>
                    </el-form-item>
                  </el-col>
                </el-row>
              </el-col>
              <el-col :span="12">
                <el-row>
                  <el-col :span="8">
                    <div class="el_col_label">部门</div>
                  </el-col>
                  <el-col :span="16" class="el_col_option">
                    <el-form-item>
                      <el-input v-model="formInline.name" @focus="selectDep" readonly placeholder="选择部门">
                        <el-button slot="append" type="primary">清空</el-button>
                      </el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
              </el-col>

            </el-row>
            <el-row class="el_row_border">
              <el-col :span="12" v-if="activeName == 'first' ">
                <el-row>
                  <el-col :span="8">
                    <div class="el_col_label">合同开始时间</div>
                  </el-col>
                  <el-col :span="16" class="el_col_option">
                    <el-form-item>
                      <el-date-picker
                        v-model="params.lord_start_time"
                        type="daterange"
                        align="right"
                        unlink-panels
                        range-separator="至"
                        start-placeholder="开始日期"
                        end-placeholder="结束日期"
                        value-format="yyyy-MM-dd"
                        :picker-options="pickerOptions">
                      </el-date-picker>
                    </el-form-item>
                  </el-col>
                </el-row>
              </el-col>
              <el-col :span="12" v-if="activeName == 'first' ">
              <el-row>
                <el-col :span="8">
                  <div class="el_col_label">合同结束时间</div>
                </el-col>
                <el-col :span="16" class="el_col_option">
                  <el-form-item>
                    <el-date-picker
                      v-model="params.lord_end_time"
                      type="daterange"
                      align="right"
                      unlink-panels
                      range-separator="至"
                      start-placeholder="开始日期"
                      end-placeholder="结束日期"
                      value-format="yyyy-MM-dd"
                      :picker-options="pickerOptions">
                    </el-date-picker>
                  </el-form-item>
                </el-col>
              </el-row>
            </el-col>
              <el-col :span="12" v-if="activeName == 'second' ">
                <el-row>
                  <el-col :span="8">
                    <div class="el_col_label">合同开始时间</div>
                  </el-col>
                  <el-col :span="16" class="el_col_option">
                    <el-form-item>
                      <el-date-picker
                        v-model="params.renter_start_time"
                        type="daterange"
                        align="right"
                        unlink-panels
                        range-separator="至"
                        start-placeholder="开始日期"
                        end-placeholder="结束日期"
                        value-format="yyyy-MM-dd"
                        :picker-options="pickerOptions">
                      </el-date-picker>
                    </el-form-item>
                  </el-col>
                </el-row>
              </el-col>
              <el-col :span="12" v-if="activeName == 'second' ">
                <el-row>
                  <el-col :span="8">
                    <div class="el_col_label">合同结束时间</div>
                  </el-col>
                  <el-col :span="16" class="el_col_option">
                    <el-form-item>
                      <el-date-picker
                        v-model="params.renter_end_time"
                        type="daterange"
                        align="right"
                        unlink-panels
                        range-separator="至"
                        start-placeholder="开始日期"
                        end-placeholder="结束日期"
                        value-format="yyyy-MM-dd"
                        :picker-options="pickerOptions">
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
                    <div class="el_col_label">签约日期</div>
                  </el-col>
                  <el-col :span="16" class="el_col_option">
                    <el-form-item>
                      <el-date-picker
                        v-model="params.sign_time"
                        type="daterange"
                        align="right"
                        unlink-panels
                        range-separator="至"
                        start-placeholder="开始日期"
                        end-placeholder="结束日期"
                        value-format="yyyy-MM-dd"
                        :picker-options="pickerOptions">
                      </el-date-picker>
                    </el-form-item>
                  </el-col>
                </el-row>
              </el-col>
              <el-col :span="12">
                <el-row>
                  <el-col :span="8">
                    <div class="el_col_label">房屋状态</div>
                  </el-col>
                  <el-col :span="16" class="el_col_option">
                    <el-form-item>
                      <el-select v-model="params.status" size="mini">
                        <el-option key="1" label="未签约" value="1">未签约</el-option>
                        <el-option key="2" label="已签约" value="2">已签约</el-option>
                        <el-option key="3" label="快到期（60天内）" value="3">快到期（60天内）</el-option>
                        <el-option key="4" label="已结束" value="4">已结束</el-option>
                        <el-option key="5" label="已过期" value="5">已过期</el-option>
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
                    <div class="el_col_label">是否上传合同</div>
                  </el-col>
                  <el-col :span="16" class="el_col_option">
                    <el-select v-model="params.un_upload" size="mini">
                      <el-option key="0" label="否" value="0">否</el-option>
                      <el-option key="1" label="是" value="1">是</el-option>
                    </el-select>
                  </el-col>
                </el-row>
              </el-col>
            </el-row>
            <div class="btnOperate">
              <el-button size="mini" type="primary" @click="highSearch()">搜索</el-button>
              <el-button size="mini" type="primary" @click="resetting">重置</el-button>
              <el-button size="mini" type="primary" @click="highGrade">取消</el-button>
            </div>
          </el-form>
        </div>
      </div>
      <div class="main">
        <div>
          <el-tabs v-model="activeName" @tab-click="handleClick">
            <el-tab-pane label="收房合同" name="first">
              <div class="myTable" @contextmenu="houseHeadMenu($event)">
                <el-table
                  :data="collectData"
                  :empty-text='rentStatus'
                  v-loading="rentLoading"
                  element-loading-text="拼命加载中"
                  element-loading-spinner="el-icon-loading"
                  element-loading-background="rgba(255, 255, 255, 0)"
                  @row-click="clickTable"
                  @row-contextmenu='houseMenu'
                  style="width: 100%">
                  <el-table-column
                    prop="contract_number"
                    label="合同编号">
                  </el-table-column>
                  <el-table-column
                    prop="bulletin_time"
                    label="上传时间">
                  </el-table-column>
                  <el-table-column
                    prop="customer_name"
                    label="业主姓名">
                  </el-table-column>
                  <el-table-column
                    prop="address"
                    label="地址">
                    <!--<template slot-scope="scope">-->
                    <!--<div v-popover:popover1 style="display:block;word-break:keep-all;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;">-->
                    <!--{{scope.row.address}}-->
                    <!--<el-popover-->
                    <!--ref="popover1"-->
                    <!--placement="top-start"-->
                    <!--width="200"-->
                    <!--trigger="hover">-->
                    <!--{{scope.row.address}}-->
                    <!--</el-popover>-->
                    <!--</div>-->
                    <!--</template>-->
                  </el-table-column>
                  <el-table-column
                    prop="phone"
                    label="手机号码">
                  </el-table-column>
                  <el-table-column
                    prop="end_date"
                    width="136px"
                    label="合同到期时间">
                  </el-table-column>
                  <el-table-column
                    prop="complete_date"
                    label="资料补齐时间">
                  </el-table-column>
                  <el-table-column
                    prop="return_visit"
                    label="回访情况">
                  </el-table-column>
                  <el-table-column
                    prop="staff_name"
                    width="80px;"
                    label="开单人">
                  </el-table-column>
                  <el-table-column
                    prop="leader_name"
                    label="负责人">
                  </el-table-column>
                  <el-table-column
                    prop="department_name"
                    label="部门">
                  </el-table-column>
                  <el-table-column
                    prop="approval_status"
                    label="审核状态">
                    <template slot-scope="scope">
                      <el-button class="btnStatus" type="primary" size="mini">{{scope.row.approval_status}}</el-button>
                    </template>
                  </el-table-column>
                </el-table>
              </div>
            </el-tab-pane>
            <el-tab-pane label="租房合同" name="second">
              <div class="myTable" @contextmenu="houseHeadMenu($event)">
                <el-table
                  :data="rentData"
                  :empty-text='rentStatus'
                  v-loading="rentLoading"
                  element-loading-text="拼命加载中"
                  element-loading-spinner="el-icon-loading"
                  element-loading-background="rgba(255, 255, 255, 0)"
                  @row-click="clickTable"
                  @row-contextmenu='houseMenu'
                  style="width: 100%">
                  <el-table-column
                    prop="contract_number"
                    label="合同编号">
                  </el-table-column>
                  <el-table-column
                    prop="bulletin_time"
                    label="上传时间">
                  </el-table-column>
                  <el-table-column
                    prop="customer_name"
                    label="业主姓名">
                  </el-table-column>
                  <el-table-column
                    prop="address"
                    label="地址">
                    <!--<template slot-scope="scope">-->
                    <!--<div v-popover:popover1 style="display:block;word-break:keep-all;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;">-->
                    <!--{{scope.row.address}}-->
                    <!--<el-popover-->
                    <!--ref="popover1"-->
                    <!--placement="top-start"-->
                    <!--width="200"-->
                    <!--trigger="hover">-->
                    <!--{{scope.row.address}}-->
                    <!--</el-popover>-->
                    <!--</div>-->
                    <!--</template>-->
                  </el-table-column>
                  <el-table-column
                    prop="phone"
                    label="手机号码">
                  </el-table-column>
                  <el-table-column
                    prop="end_date"
                    width="136px"
                    label="合同到期时间">
                  </el-table-column>
                  <el-table-column
                    prop="complete_date"
                    label="资料补齐时间">
                  </el-table-column>
                  <el-table-column
                    prop="return_visit"
                    label="回访情况">
                  </el-table-column>
                  <el-table-column
                    prop="staff_name"
                    width="80px"
                    label="开单人">
                  </el-table-column>
                  <el-table-column
                    prop="leader_name"
                    label="负责人">
                  </el-table-column>
                  <el-table-column
                    prop="department_name"
                    label="部门">
                  </el-table-column>
                  <el-table-column
                    prop="approval_status"
                    label="审核状态">
                    <template slot-scope="scope">
                      <el-button class="btnStatus" type="primary" size="mini">{{scope.row.approval_status}}</el-button>
                    </template>
                  </el-table-column>
                </el-table>
              </div>
            </el-tab-pane>
          </el-tabs>
          <div class="tableBottom">
            <div class="left">
              <el-pagination
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page="params.page"
                :page-size="12"
                layout="total, prev, pager, next, jumper"
                :total="totalNumbers">
              </el-pagination>
            </div>
          </div>
        </div>
      </div>

      <div>
        <el-dialog :close-on-click-modal="false"
                   title="新建维修"
                   :visible.sync="maintenanceDialog"
                   width="40%">
          <el-form size="mini" label-width="100px">
            <el-row>
              <el-col :span="12">
                <el-form-item label="合同编号">
                  <el-input v-model="input" placeholder="请输入内容"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="报修人姓名">
                  <el-input v-model="input" placeholder="请输入内容"></el-input>
                </el-form-item>
              </el-col>
            </el-row>

            <el-row>
              <el-col :span="12">
                <el-form-item label="联系电话">
                  <el-input v-model="input" placeholder="请输入内容"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="报修人性别">
                  <el-radio v-model="radio" label="1">先生</el-radio>
                  <el-radio v-model="radio" label="2">女士</el-radio>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <el-form-item label="房屋地址">
                  <el-input v-model="input" placeholder="请输入内容"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="约定维修时间">
                  <el-date-picker
                    v-model="value1"
                    type="datetime"
                    placeholder="选择日期时间"
                    size="mini">
                  </el-date-picker>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <el-form-item label="维修内容">
                  <el-input v-model="input" placeholder="请输入内容"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="维修师傅">
                  <el-input v-model="input" placeholder="请输入内容"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <el-form-item label="维修结果">
                  <el-input v-model="input" placeholder="请输入内容"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="维修金额">
                  <el-input v-model="input" placeholder="请输入内容"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <el-form-item label="维修状态">
                  <el-select v-model="value" placeholder="请选择" size="mini">
                    <el-option
                      v-for="item in options"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value">
                    </el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="认责人">
                  <el-select v-model="value" placeholder="请选择" size="mini">
                    <el-option
                      v-for="item in options"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value">
                    </el-option>
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <el-form-item label="备注">
                  <el-input v-model="input" placeholder="请输入内容"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="操作人">
                  <el-input v-model="input" placeholder="请输入内容"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <el-form-item label="签约人">
                  <el-input v-model="input" placeholder="请输入内容"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="负责人">
                  <el-input v-model="input" placeholder="请输入内容"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <el-form-item label="所属部门">
                  <el-input v-model="input" placeholder="请输入内容"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>

          <div slot="footer" class="dialog-footer">
            <el-button size="small" @click="maintenanceDialog = false">取&nbsp;消</el-button>
            <el-button size="small" type="primary" @click="maintenanceDialog = false">确&nbsp;定</el-button>
          </div>

        </el-dialog>
      </div>
      <div>
        <el-dialog :close-on-click-modal="false" title="合同备忘" :visible.sync="memoDialog" width="50%">
          <div>
            <el-table
              :data="memoTableData"
              :empty-text='incompleteStatus'
              v-loading="incompleteLoading"
              element-loading-text="拼命加载中"
              element-loading-spinner="el-icon-loading"
              element-loading-background="rgba(255, 255, 255, 0)"
              style="width: 100%">
              <el-table-column
                prop="create_time"
                label="创建时间">
              </el-table-column>
              <el-table-column
                prop="contract_number"
                label="合同编号">
              </el-table-column>
              <el-table-column
                prop="house_name"
                label="房屋地址">
              </el-table-column>
              <el-table-column
                prop="update_time"
                label="资料补齐时间">
              </el-table-column>
              <el-table-column
                prop="content"
                label="备忘内容">
              </el-table-column>
              <el-table-column
                prop="receivers"
                label="接收人">
              </el-table-column>
              <el-table-column
                prop="sender"
                label="发送人">
              </el-table-column>
              <el-table-column
                prop="is_send"
                label="操作类型">
                <template slot-scope="scope">
                  <span v-if="scope.row.is_send===0">保存</span>
                  <span v-if="scope.row.is_send===1">发送</span>
                  <span v-if="scope.row.is_send===null">暂无</span>
                </template>
              </el-table-column>
            </el-table>
          </div>
          <div slot="footer" class="dialog-footer">
            <el-button size="small" type="primary" @click="memoDialog = false">确&nbsp;定</el-button>
          </div>
        </el-dialog>
      </div>

    </div>
    <RightMenu :startX="rightMenuX+'px'" :startY="rightMenuY+'px'" :list="lists" :show="show"
               @clickOperateMore="clickEvent"></RightMenu>
    <Organization :organizationDialog="organizationDialog" @close="closeOrganization"></Organization>
    <AddressSearch :addressDialog = "addressDialog" @close="closeAddressDialog"></AddressSearch>
  </div>
</template>

<script>
  import RightMenu from '../../../common/rightMenu.vue';
  import Organization from '../../../common/organization.vue';
  import AddressSearch from '../../../common/addressSearch';
  export default {
    name: 'hello',
    components: {RightMenu, Organization, AddressSearch},
    data() {
      return {
        rightMenuX: 0,
        rightMenuY: 0,
        show: false,
        lists: [],
        /***********/
        selectFlag: 1,
        pickerOptions: {
          shortcuts: [{
            text: '最近一周',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit('pick', [start, end]);
            }
          }, {
            text: '最近一个月',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              picker.$emit('pick', [start, end]);
            }
          }, {
            text: '最近三个月',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
              picker.$emit('pick', [start, end]);
            }
          }]
        },
        statisticDate: '',
        collectData: [],   //收房合同
        rentData: [],      //租房合同
        formInline: {
          name: '',
          house: '',
        },
        totalNumbers: 0,   //总数
        params: {
          page: 1,
          per_page_number: '12',
          q: '',      //模糊搜索
          publish_time: [],     //发布时间
          lord_start_time: [],  //收房合同开始时间
          lord_end_time: [],   //收房合同结束时间
          renter_start_time: [], // 租房合同开始时间
          renter_end_time: [], //租房合同结束时间
          sign_time: [],   // 签约日期
          un_upload: '',   // 是否上传合同
          org_id: [],  // 部门
          status: '',   // 房屋状态1:未签约， 2：已签约， 3：快到期（60天内）， 4：已结束， 5：已过期
        },
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
        //模态框
        organizationDialog: false,
        activeName: 'first',
        isHigh: false,
        maintenanceDialog: false,     //维修模态框
        input: '',
        radio: '1',
        value: '',
        value1: '',
        rentStatus: ' ',
        rentLoading: false,
        memoDialog: false, //备忘模态框
        memoTableData: [],
        incompleteStatus: ' ',
        incompleteLoading: false,
        is_rent: 0,
        selectContractId: '',
        addressDialog: false,
      }
    },
    mounted() {
      this.collectDatafunc();
    },
    watch: {
      memoDialog(val) {
        if (val) {
          this.incompleteStatus = " ";
          this.incompleteLoading = true;
          this.$http.get(globalConfig.server + 'lease/note/index?limit=500&is_rent=' + this.is_rent + '&contract_id=' + this.selectContractId).then((res) => {
            this.incompleteLoading = false;
            if (res.data.code === '60510') {
              this.memoTableData = res.data.data;
              if (res.data.data.length < 1) {
                this.incompleteStatus = "暂无数据";
                this.tableData = [];
                this.totalNum = 0;
              }
            } else {
              this.incompleteStatus = "暂无数据";
              this.memoTableData = [];
            }
          });
        }
      },
      activeName(val) {
        if (val === 'first') {
          this.is_rent = 0;
        } else {
          this.is_rent = 1;
        }
      },
    },
    methods: {
      openAddressDialog() {
        this.addressDialog = true;
      },
      closeAddressDialog(val) {
        this.addressDialog = false;
        if(val){
          this.params.q = val.address;
        }
      },
      //查看补齐记录，跳转页面
      viewIncompleteRecord() {
        this.$router.push({path: '/incompleteRecord', query: {active: this.activeName}});
      },
      search() {
        if (this.activeName == "first") {
          this.params.page = 1;
          this.collectDatafunc();
        } else if (this.activeName == "second") {
          this.params.page = 1;
          this.rentDatafunc();
        }
      },
      highSearch() {
        this.isHigh = !this.isHigh;
        if (this.activeName == "first") {
          this.params.page = 1;
          this.collectDatafunc();
        } else if (this.activeName == "second") {
          this.params.page = 1;
          this.rentDatafunc();
        }
      },
      collectDatafunc() {
        this.collectData = [];
        this.rentStatus = " ";
        this.rentLoading = true;
        this.$http.get(globalConfig.server + 'lease/collect', {params: this.params}).then((res) => {
          this.rentLoading = false;
          if (res.data.code === '61010') {
            this.collectData = res.data.data;
            this.totalNumbers = res.data.meta.total;
          } else {
            this.collectData = [];
            this.rentStatus = '暂无数据';
            this.totalNumbers = 0;
          }
        })
      },
      rentDatafunc() {
        this.rentData = [];
        this.rentStatus = " ";
        this.rentLoading = true;
        this.$http.get(globalConfig.server + 'lease/rent', {params: this.params}).then((res) => {
          this.rentLoading = false;
          if (res.data.code === '61010') {
            this.rentData = res.data.data;
            this.totalNumbers = res.data.meta.total;
          } else {
            this.rentData = [];
            this.rentStatus = '暂无数据';
            this.totalNumbers = 0;
          }
        })
      },
      handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
      },
      handleCurrentChange(val) {
        console.log(`当前页: ${val}`);
        this.params.page = val;
        if (this.activeName == "first") {
          this.collectDatafunc();
        }
        else if (this.activeName == "second") {
          this.rentDatafunc();
        }
      },
      clickTable(row, event, column) {
        console.log(row, event, column)
      },
      //房屋右键
      houseMenu(row, event) {
        this.lists = [
          {clickIndex: 'stick', headIcon: 'el-icons-fa-arrow-up', label: '置顶',},
          {clickIndex: 'cancel', headIcon: 'el-icons-fa-scissors', label: '作废',},
          {clickIndex: '', headIcon: 'el-icons-fa-eye', label: '查看回访记录',},
          {clickIndex: 'maintenanceDialog', headIcon: 'el-icons-fa-briefcase', label: '创建维修单',},
          {clickIndex: 'lookMemorandum', headIcon: 'el-icon-edit', label: '查看合同备忘', contract_id: row.contract_id},
        ];
        this.contextMenuParam(event);
      },
      //合同表头右键
      houseHeadMenu(e) {
        this.lists = [
          {clickIndex: 1, headIcon: 'el-icons-fa-home', label: '选择列选项',},
        ];
        this.contextMenuParam(event);
      },
      //右键回调事件
      clickEvent(val) {
        switch (val.clickIndex) {
          case 'stick' :
            this.$confirm('您确定将其置顶吗', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
            }).then(() => {
              this.$message({
                type: 'success',
                message: '置顶成功!'
              });
            }).catch(() => {
              this.$message({
                type: 'info',
                message: '已取消置顶'
              });
            });
            break;
          case 'cancel':
            this.$confirm('您确定将其作废吗', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
            }).then(() => {
              this.$message({
                type: 'success',
                message: '作废成功!'
              });
            }).catch(() => {
              this.$message({
                type: 'info',
                message: '已取消作废'
              });
            });
            break;
          case 'maintenanceDialog':
            this.maintenanceDialog = true;
            break;
          case 'lookMemorandum':
            this.memoDialog = true;
            this.selectContractId = val.contract_id;
            break;
        }
      },
      //关闭右键菜单
      closeMenu() {
        this.show = false;
      },
      //右键参数
      contextMenuParam(event) {
        //param: user right param
        let e = event || window.event;	//support firefox contextmenu
        this.show = false;
        this.rightMenuX = e.clientX + document.documentElement.scrollLeft - document.documentElement.clientLeft;
        this.rightMenuY = e.clientY + document.documentElement.scrollTop - document.documentElement.clientTop;
        event.preventDefault();
        event.stopPropagation();
        this.$nextTick(() => {
          this.show = true
        })
      },
      selectDep() {
        console.log(1)
        this.organizationDialog = true
      },
      closeOrganization() {
        this.organizationDialog = false
      },
      selectStatus(flag) {
        this.selectFlag = flag;
      },
      // tabs标签页
      handleClick(tab, event) {
        if (this.activeName == "first") {
          this.collectDatafunc();
        }
        else if (this.activeName == "second") {
          this.rentDatafunc();
        }
      },
      highGrade() {
        this.isHigh = !this.isHigh;
      },
      resetting() {
        this.params = {
          page: 1,
          per_page_number: '',
          q: '',      //模糊搜索
          publish_time: '',     //发布时间
          lord_time: '',  //收房合同时间
          renter_time: '',//租房合同时间
          sign_time: '',   //签约日期
          un_upload: '',   //未上传合同
          org_id: '',  //部门合同
          status: ''   //房屋状态： status（1：正在出租， 2：快结束，3：已结束，4：签约中）
        }
      }
    },
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped="">
  #clientContainer {
    min-height: 400px;
    .selectButton {
      color: #fff;
      background: #66b1ff;
    }
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
          &:first-child {
            /*border-right: 1px solid #ccc;*/
          }
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
      > div {
        .tableBottom {
          padding: 8px;
          display: flex;
          justify-content: flex-end;
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
    }
  }
</style>
