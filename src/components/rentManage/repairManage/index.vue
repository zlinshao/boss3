<template>
  <div @click="show=false" @contextmenu="closeMenu">
    <div id="clientContainer">
      <div class="highRanking">
        <div class="tabsSearch">
          <el-form :inline="true" size="mini">
            <el-form-item>
              <el-input placeholder="地址/下次跟进人/电话" v-model="form.keyword" size="mini" clearable
                        @keyup.enter.native="search">
                <el-button slot="append" icon="el-icon-search" @click="search"></el-button>
              </el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" size="mini" @click="highGrade">高级</el-button>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" size="mini" @click="exportData">导出</el-button>
            </el-form-item>
          </el-form>
        </div>
        <div class="filter high_grade" :class="isHigh? 'highHide':''">
          <el-form :inline="true" :model="form" size="mini" label-width="100px">
            <div class="filterTitle">
              <i class="el-icons-fa-bars"></i>&nbsp;&nbsp;高级搜索
            </div>
            <el-row class="el_row_border">
              <el-col :span="12">
                <el-row>
                  <el-col :span="8">
                    <div class="el_col_label">创建时间</div>
                  </el-col>
                  <el-col :span="16" class="el_col_option">
                    <el-form-item>
                      <el-date-picker
                        v-model="form.time"
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
                    <div class="el_col_label">维修状态</div>
                  </el-col>
                  <el-col :span="16" class="el_col_option">
                    <el-form-item>
                      <el-select clearable v-model="form.status" placeholder="请选择维修状态" value="">
                        <el-option v-for="item in serviceStatus" :label="item.dictionary_name" :value="item.id"
                                   :key="item.id"></el-option>
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
                    <div class="el_col_label">城市</div>
                  </el-col>
                  <el-col :span="16" class="el_col_option">
                    <el-form-item>
                      <el-select clearable v-model="form.city" placeholder="请选择城市" value="">
                        <el-option v-for="item in cityCategory" :label="item.dictionary_name" :value="item.id"
                                   :key="item.id"></el-option>
                      </el-select>
                    </el-form-item>
                  </el-col>
                </el-row>
              </el-col>
              <el-col :span="12">
                <el-row>
                  <el-col :span="8">
                    <div class="el_col_label">创建人</div>
                  </el-col>
                  <el-col :span="16" class="el_col_option">
                    <el-form-item>
                      <el-input v-model="operator_name" @focus="chooseStaff" placeholder="请选择创建人"
                                readonly>
                        <template slot="append">
                          <div style="cursor: pointer;" @click="closeStaff">清空</div>
                        </template>
                      </el-input>
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
        <el-tabs v-model="activeName">
          <el-tab-pane label="收房维修记录" name="first">
            <el-table
              :data="collectTableData"
              :empty-text='collectStatus'
              v-loading="collectLoading"
              element-loading-text="拼命加载中"
              element-loading-spinner="el-icon-loading"
              element-loading-background="rgba(255, 255, 255, 0)"
              @row-dblclick="dblClickTable"
              @row-contextmenu='houseMenu'
              style="width: 100%">
              <el-table-column
                prop="emergency"
                label="紧急程度">
                <template slot-scope="scope">
                  <span v-if="scope.row.emergency === 1 && scope.row.status !== 600"
                        :class="scope.row.overdueTime > currentTime ? 'orange' : 'blue'">一般</span>
                  <span v-if="scope.row.emergency === 2 && scope.row.status !== 600" style="color:red">紧急</span>
                  <span v-if="!scope.row.emergency"></span>
                </template>
              </el-table-column>
              <el-table-column
                prop="contract_type"
                label="创建时间">
                <template slot-scope="scope">
                  <span v-if="scope.row.create_time">{{scope.row.create_time}}</span>
                  <span v-if="!scope.row.create_time">暂无</span>
                </template>
              </el-table-column>
              <el-table-column
                prop="contract"
                label="房屋地址">
                <template slot-scope="scope">
                  <span v-if="scope.row.contract && scope.row.contract.house">{{scope.row.contract.house.name}}</span>
                  <span v-if="!scope.row.contract && scope.row.contract.house">暂无</span>
                </template>
              </el-table-column>
              <el-table-column
                prop="customer_name"
                label="客户姓名">
                <template slot-scope="scope">
                  <span v-if="scope.row.customer_name">{{scope.row.customer_name}}</span>
                  <span v-if="!scope.row.customer_name">暂无</span>
                </template>
              </el-table-column>
              <el-table-column
                prop="customer_mobile"
                label="回复电话">
                <template slot-scope="scope">
                  <span v-if="scope.row.customer_mobile">{{scope.row.customer_mobile}}</span>
                  <span v-if="!scope.row.customer_mobile">暂无</span>
                </template>
              </el-table-column>
              <el-table-column
                prop="content"
                label="维修内容">
                <template slot-scope="scope">
                  <span v-if="scope.row.content">{{scope.row.content}}</span>
                  <span v-if="!scope.row.content">暂无</span>
                </template>
              </el-table-column>
              <el-table-column
                prop="follow"
                label="维修时间">
                <template slot-scope="scope">
                  <span v-if="scope.row.follow.length > 0">
                    <span v-if="scope.row.follow[0].repair_time">{{scope.row.follow[0].repair_time}}</span>
                    <span v-else>暂无</span>
                  </span>
                  <span v-else>暂无</span>
                </template>
              </el-table-column>
              <el-table-column
                prop="follow"
                label="维修师傅">
                <template slot-scope="scope">
                  <span v-if="scope.row.follow.length > 0">
                    <span v-if="scope.row.follow[0].repair_master">{{scope.row.follow[0].repair_master}}</span>
                    <span v-else>暂无</span>
                  </span>
                  <span v-else>暂无</span>
                </template>
              </el-table-column>
              <el-table-column
                prop="repair_result"
                label="下次跟进时间">
                <template slot-scope="scope">
                  <span v-if="scope.row.estimated_time">{{scope.row.estimated_time}}</span>
                  <span v-if="!scope.row.estimated_time">暂无</span>
                </template>
              </el-table-column>
              <el-table-column
                prop="repair_money"
                label="下次跟进人">
                <template slot-scope="scope">
                  <span v-if="scope.row.followor">{{scope.row.followor.name}}</span>
                  <span v-if="!scope.row.followor">暂无</span>
                </template>
              </el-table-column>
              <el-table-column
                prop="status"
                label="维修状态">
                <template slot-scope="scope">
                  <el-button class="width" v-if="scope.row.status === 600" type="success" size="mini">
                    {{scope.row.statu}}
                  </el-button>
                  <el-button class="width" v-if="scope.row.status === 596 && scope.row.status"
                             type="primary" size="mini"> {{scope.row.statu}}
                  </el-button>
                  <el-button class="width" v-if="scope.row.status === 598 && scope.row.status"
                             type="warning" size="mini"> {{scope.row.statu}}
                  </el-button>
                  <el-button class="width" v-if="scope.row.status === 599 && scope.row.status"
                             type="danger" size="mini"> {{scope.row.statu}}
                  </el-button>
                  <el-button class="width" v-if="scope.row.status === 601 && scope.row.status"
                             type="info" size="mini"> {{scope.row.statu}}
                  </el-button>
                  <span v-if="!scope.row.status">暂无</span>
                </template>
              </el-table-column>
            </el-table>
          </el-tab-pane>
          <el-tab-pane label="租房维修记录" name="second">
            <el-table
              :data="rentTableData"
              :empty-text='rentStatus'
              v-loading="rentLoading"
              element-loading-text="拼命加载中"
              element-loading-spinner="el-icon-loading"
              element-loading-background="rgba(255, 255, 255, 0)"
              @row-dblclick="dblClickTable"
              @row-contextmenu='houseMenu'
              style="width: 100%">
              <el-table-column
                prop="emergency"
                label="紧急程度">
                <template slot-scope="scope">
                  <span v-if="scope.row.emergency === 1"
                        :class="scope.row.overdueTime > currentTime ? 'orange' : 'blue'">一般</span>
                  <span v-if="scope.row.emergency === 2" style="color:red">紧急</span>
                  <span v-if="!scope.row.emergency">暂无</span>
                </template>
              </el-table-column>
              <el-table-column
                prop="contract_type"
                label="创建时间">
                <template slot-scope="scope">
                  <span v-if="scope.row.create_time">{{scope.row.create_time}}</span>
                  <span v-if="!scope.row.create_time">暂无</span>
                </template>
              </el-table-column>
              <el-table-column
                prop="contract"
                label="房屋地址">
                <template slot-scope="scope">
                  <span v-if="scope.row.contract && scope.row.contract.house">{{scope.row.contract.house.name}}</span>
                  <span v-if="!scope.row.contract && scope.row.contract.house">暂无</span>
                </template>
              </el-table-column>
              <el-table-column
                prop="customer_name"
                label="客户姓名">
                <template slot-scope="scope">
                  <span v-if="scope.row.customer_name">{{scope.row.customer_name}}</span>
                  <span v-if="!scope.row.customer_name">暂无</span>
                </template>
              </el-table-column>
              <el-table-column
                prop="customer_mobile"
                label="客户电话">
                <template slot-scope="scope">
                  <span v-if="scope.row.customer_mobile">{{scope.row.customer_mobile}}</span>
                  <span v-if="!scope.row.customer_mobile">暂无</span>
                </template>
              </el-table-column>
              <el-table-column
                prop="content"
                label="维修内容">
                <template slot-scope="scope">
                  <span v-if="scope.row.content">{{scope.row.content}}</span>
                  <span v-if="!scope.row.content">暂无</span>
                </template>
              </el-table-column>
              <el-table-column
                prop="follow"
                label="维修时间">
                <template slot-scope="scope">
                  <span v-if="scope.row.follow.length > 0">
                    <span v-if="scope.row.follow[0].repair_time">{{scope.row.follow[0].repair_time}}</span>
                    <span v-else>暂无</span>
                  </span>
                  <span v-else>暂无</span>
                </template>
              </el-table-column>
              <el-table-column
                prop="follow"
                label="维修师傅">
                <template slot-scope="scope">
                  <span v-if="scope.row.follow.length > 0">
                    <span v-if="scope.row.follow[0].repair_master">{{scope.row.follow[0].repair_master}}</span>
                    <span v-else>暂无</span>
                  </span>
                  <span v-else>暂无</span>
                </template>
              </el-table-column>
              <el-table-column
                prop="repair_result"
                label="下次跟进时间">
                <template slot-scope="scope">
                  <span v-if="scope.row.estimated_time">{{scope.row.estimated_time}}</span>
                  <span v-if="!scope.row.estimated_time">暂无</span>
                </template>
              </el-table-column>
              <el-table-column
                prop="repair_money"
                label="下次跟进人">
                <template slot-scope="scope">
                  <span v-if="scope.row.followor">{{scope.row.followor.name}}</span>
                  <span v-if="!scope.row.followor">暂无</span>
                </template>
              </el-table-column>
              <el-table-column
                prop="status"
                label="维修状态">
                <template slot-scope="scope">
                  <el-button class="width" v-if="scope.row.status === 600" type="success" size="mini">
                    {{scope.row.statu}}
                  </el-button>
                  <el-button class="width" v-if="scope.row.status === 596 && scope.row.status"
                             type="primary" size="mini">{{scope.row.statu}}
                  </el-button>
                  <el-button class="width" v-if="scope.row.status === 598 && scope.row.status"
                             type="warning" size="mini">{{scope.row.statu}}
                  </el-button>
                  <el-button class="width" v-if="scope.row.status === 599 && scope.row.status"
                             type="danger" size="mini">{{scope.row.statu}}
                  </el-button>
                  <el-button class="width" v-if="scope.row.status === 601 && scope.row.status"
                             type="info" size="mini">{{scope.row.statu}}
                  </el-button>
                  <span v-if="!scope.row.status">暂无</span>
                </template>
              </el-table-column>
            </el-table>
          </el-tab-pane>
        </el-tabs>
        <div class="block pages">
          <el-pagination
            @current-change="handleCurrentChange"
            :current-page="form.page"
            :page-size="12"
            layout="total, prev, pager, next, jumper"
            :total="totalNum">
          </el-pagination>
        </div>
      </div>
    </div>
    <RightMenu :startX="rightMenuX+'px'" :startY="rightMenuY+'px'" :list="lists" :show="show"
               @clickOperateMore="clickEvent"></RightMenu>

    <organization :organizationDialog="organizeVisible" :type="organizeType" @close="closeModal"
                  @selectMember="selectMember"></organization>
    <!--增加收房维修单-->
    <!--<AddCollectRepair :addCollectRepairDialog="addCollectRepairDialog" :contract="houseData" @close="closeModal"></AddCollectRepair>-->
    <!--增加租房维修单-->
    <!--<AddRentRepair :addRentRepairDialog="addRentRepairDialog" :rentRepairId="rentRepairId" @close="closeModal"></AddRentRepair>-->
    <!--维修单详情-->
    <RepairDetail :module="repairDetailDialog" :houseData="houseData" @close="closeRepair"></RepairDetail>
  </div>
</template>

<script>
  import RightMenu from "../../common/rightMenu.vue";
  import AddCollectRepair from "../components/addCollectRepair";
  import AddRentRepair from "../components/addRentRepair";
  import RepairDetail from "./repairDetail";
  import Organization from "../../common/organization.vue";

  export default {
    name: "repair-manage",
    components: {
      RightMenu,
      AddCollectRepair,
      AddRentRepair,
      RepairDetail,
      Organization
    },
    data() {
      return {
        rightMenuX: 0,
        rightMenuY: 0,
        show: false,
        lists: [],
        form: {
          page: 1,
          limit: 12,
          keyword: '',
          time: '',
          status: '',
          city: '',
          operator_id: '',
          contract_type: '1',
        },
        collectTableData: [],
        collectStatus: " ",
        collectLoading: false,
        rentTableData: [],
        rentStatus: " ",
        rentLoading: false,
        totalNum: 0,
        isHigh: false,
        activeName: "first",
        currentTime: 48,

        organizeVisible: false,
        organizeType: "",
        operator_name: "",

        serviceStatus: [],//维修状态
        cityCategory: [],//城市

        repairDetailDialog: false,//详情
        houseData: {},

        // addCollectRepairDialog: false,
        // addRentRepairDialog: false,
        // rentRepairId: "",

        repairId: "",
        deleteId: "",
      };
    },
    mounted() {
      this.getCollectTableData();
      this.getDictionary();
    },
    watch: {
      activeName(val) {
        if (val === "first") {
          this.getCollectTableData();
        } else {
          this.getRentTableData();
        }
      }
    },
    methods: {
      handClick() {
        if (this.activeName === "first") {
          this.getCollectTableData();
        } else {
          this.getRentTableData();
        }
      },
      // 计算时间
      getTime(val) {
        let data = [];
        val === 1 ? (data = this.collectTableData) : (data = this.rentTableData);
        for (let i = 0; i < data.length; i++) {
          let foundTime = parseInt(Date.parse(data[i].create_time) / 1000 / 3600); //创建时间 的小时
          let currentTime = parseInt(Date.parse(new Date()) / 1000 / 3600); //现在的时间 的小时
          //  判断 创建时间  到当前的时间 有没有 超过 48小时
          data[i].overdueTime = currentTime - foundTime; //得到  创建的时间  距离现在 有多少小时
        }
      },
      // 字典
      getDictionary() {
        // 城市
        this.dictionary(306, 1).then((res) => {
          this.cityCategory = res.data;
        });
        // 维修状态
        this.dictionary(595, 1).then((res) => {
          this.serviceStatus = res.data;
        });
      },
      // 收房
      getCollectTableData() {
        this.collectStatus = " ";
        this.collectLoading = true;
        this.form.contract_type = '1';
        this.$http.get(globalConfig.server + "repaire/list", {
          params: this.form
        }).then(res => {
          this.isHigh = false;
          this.collectLoading = false;
          if (res.data.code === "600200") {
            this.collectTableData = res.data.data.data;
            this.getTime(1);
            this.totalNum = res.data.data.count;
          } else {
            this.collectTableData = [];
            this.totalNum = 0;
            this.collectStatus = "暂无数据";
            this.prompt(2, res.data.msg);
          }
        });
      },
      // 租房
      getRentTableData() {
        this.rentStatus = " ";
        this.rentLoading = true;
        this.form.contract_type = '2';
        this.$http.get(globalConfig.server + "repaire/list", {
          params: this.form
        }).then(res => {
          this.isHigh = false;
          this.rentLoading = false;
          if (res.data.code === "600200") {
            this.rentTableData = res.data.data.data;
            this.getTime(2);
            this.totalNum = res.data.data.count;
          } else {
            this.rentTableData = [];
            this.totalNum = 0;
            this.rentStatus = "暂无数据";
            this.prompt(2, res.data.msg);
          }
        });
      },
      // 提示
      prompt(val, msg) {
        if (val === 1) {
          this.$notify.success({
            title: "成功",
            message: res.data.msg
          });
        } else {
          this.$notify.warning({
            title: "警告",
            message: msg,
          });
        }
      },
      // 员工筛选
      chooseStaff() {
        this.organizeVisible = true;
        this.organizeType = "staff";
      },
      // 清空员工
      closeStaff() {
        this.form.operator_id = [];
        this.operator_name = "";
      },
      // 选择员工
      selectMember(val) {
        if (this.organizeType === "staff") {
          this.form.operator_id = val[0].id;
          this.operator_name = val[0].name;
        }
      },
      // 关闭模态框
      closeModal() {
        // this.addCollectRepairDialog = false;
        // this.addRentRepairDialog = false;
        // this.rentRepairId = "";
        this.organizeVisible = false;
      },
      closeRepair() {
        this.repairDetailDialog = false;
        this.handClick();
      },
      // 搜索
      search() {
        this.form.page = 1;
        this.handClick();
      },
      // 高级
      highGrade() {
        this.isHigh = !this.isHigh;
      },
      // 重置
      resetting() {
        this.form.time = "";
        this.form.status = "";
        this.form.city = "";
        this.closeStaff();
      },
      // 分页
      handleCurrentChange(val) {
        this.form.page = val;
        this.handClick();
      },
      // 详情
      dblClickTable(row) {
        this.houseData = row;
        if (row.contract.house) {
          this.houseData.house_name = row.contract.house.name;
        } else {
          this.houseData.house_name = '';
        }
        this.houseData.activeName = this.activeName;
        this.repairDetailDialog = true;
      },
      //右键
      houseMenu(row, event) {
        this.deleteId = row.id;
        this.lists = [
          {clickIndex: "delete_repair", headIcon: "el-icon-delete", label: "删除"}
        ];
        this.contextMenuParam(event);
      },
      //右键回调
      clickEvent(val) {
        switch (val.clickIndex) {
          case "delete_repair":
            this.deleteRepair();
            break;
        }
      },
      //关闭右键菜单
      closeMenu() {
        this.show = false;
      },
      //右键参数
      contextMenuParam(event) {
        let e = event || window.event;
        this.show = false;
        this.rightMenuX =
          e.clientX +
          document.documentElement.scrollLeft -
          document.documentElement.clientLeft;
        this.rightMenuY = e.clientY +
          document.documentElement.scrollTop -
          document.documentElement.clientTop;
        event.preventDefault();
        event.stopPropagation();
        this.$nextTick(() => {
          this.show = true;
        });
      },
      // 删除
      deleteRepair() {
        this.$confirm("此操作将删除维修单，您确定删除吗？", "删除维修单", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }).then(() => {
          this.$http.get(globalConfig.server + "repaire/del/" + this.deleteId).then(res => {
            if (res.data.code === "600200") {
              this.handClick();
              this.prompt(1, res.data.msg);
            } else {
              this.prompt(2, res.data.msg);
            }
          });
        });
      },
      // 导出
      exportData() {
        if (this.activeName === "first") {
          this.form.module = 1;
        } else {
          this.form.module = 2;
        }
        let exportForm = {
          keyword: this.form.keyword,
          time: this.form.time,
          status: this.form.status,
          city: this.form.city,
          operator_id: this.form.operator_id,
          module: this.form.module
        };
        this.$http.get(globalConfig.server + "repaire/download", {params: exportForm}).then(res => {
          if (res.data.code === "600201") {
            this.prompt(2, res.data.msg);
            return;
          } else {
            this.$http.get(globalConfig.server + "repaire/export", {
              responseType: "arraybuffer",
              params: exportForm,
            }).then(res => {
              // 处理返回的文件流
              if (!res.data) {
                return;
              }
              let url = window.URL.createObjectURL(new Blob([res.data]));
              let link = document.createElement("a");
              link.style.display = "a";
              link.href = url;
              link.setAttribute("download", "excel.xls");
              document.body.appendChild(link);
              link.click();
            });
          }
        });
      }
    }
  };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
  #clientContainer {
    .flex-end {
      display: flex;
      display: -webkit-flex;
      justify-content: flex-end;
    }
    .content {
      padding: 0 10px;
      min-height: 32px;
      background: #eef3fc;
      border-radius: 4px;
      font-size: 12px;
      color: #727479;
      word-break: break-all;
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
    .addWorkOrder {
      margin-bottom: 15px;
      padding-bottom: 15px;
      border-bottom: 1px solid rgb(238, 243, 252);
    }
    .blue {
      color: blue;
    }
    .orange {
      color: orange;
    }
    .width {
      width: 90px;
    }
  }
</style>
