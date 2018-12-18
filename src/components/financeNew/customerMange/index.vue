<template>
  <div @click="show=false" @contextmenu="closeMenu">
    <div class="highRanking" style=" position: absolute; top: 122px; right: 20px;">
      <div class="highSearch">
        <el-form :model="form" :inline="true" size="mini">
          <el-form-item>
            <el-input placeholder="请输入内容" v-model="form.keyWords" size="mini" clearable>
              <el-button slot="append" icon="el-icon-search"></el-button>
            </el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" size="mini" @click="highGrade">高级</el-button>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="openAccount">
              <i class="el-icon-plus"></i>&nbsp;新增客户
            </el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
    <div class="highRanking">
      <div class="filter high_grade" :class="isHigh? 'highHide':''" style=" margin-top: -40px;">
        <el-form :inline="true" onsubmit="return false" :model="form" size="mini" label-width="100px">
          <div class="filterTitle">
            <i class="el-icons-fa-bars"></i>&nbsp;&nbsp;高级搜索
          </div>
          <el-row class="el_row_border">
            <el-col :span="12">
              <el-row>
                <el-col :span="8">
                  <div class="el_col_label">支付方式</div>
                </el-col>
                <el-col :span="16" class="el_col_option">
                  <el-form-item>
                    <el-select v-model="form.payWay" clearable>
                      <el-option label="请选择" value=""></el-option>
                      <el-option label="银行卡" value="1"></el-option>
                      <el-option label="支付宝" value="2"></el-option>
                      <el-option label="微信" value="3"></el-option>
                      <el-option label="现金" value="4"></el-option>
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

    <el-table
      :data="tableData"
      width="100%"
      @row-dblclick="dblClickTable"
      @row-contextmenu="customerMenu">
      <el-table-column
        label="生成时间"
        prop="create_time">
      </el-table-column>
      <el-table-column
        label="房屋地址"
        prop="address">
      </el-table-column>
      <el-table-column
        label="客户姓名"
        prop="customer_name">
      </el-table-column>
      <el-table-column
        label="手机号"
        prop="contact">
      </el-table-column>
      <el-table-column
        label="收房月数"
        prop="months">
      </el-table-column>
      <el-table-column
        label="付款方式"
        prop="pay_types">
      </el-table-column>
      <el-table-column
        label="月单价"
        prop="prices">
      </el-table-column>
      <el-table-column
        label="待签约日期"
        prop="deal_date">
      </el-table-column>
      <el-table-column
        label="第一次打房租日期"
        prop="first_pay_date">
      </el-table-column>
      <el-table-column
        label="客户付款方式"
        prop="account_type">
      </el-table-column>
      <el-table-column
        label="账号"
        prop="account_num">
      </el-table-column>
      <el-table-column
        label="签约人"
        prop="real_name">
      </el-table-column>
      <el-table-column
        label="状态"
        prop="status">
      </el-table-column>
    </el-table>
    <div class="block pages">
      <el-pagination
        @siz-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="[20, 100, 200, 300, 400]"
        :page-size="20"
        layout="total, sizes, prev, pager, next, jumper"
        :total="400">
      </el-pagination>
    </div>

    <!--右键-->
    <RightMenu :startX="rightMenuX+'px'" :startY="rightMenuY+'px'" :list="lists" :show="show"
               @clickOperate="clickEvent"></RightMenu>

    <LandLord :module="lordVisible" @close="lordVisible = false"></LandLord>

    <LandLordDetail :module="detailVisible" @close="detailVisible = false"></LandLordDetail>
  </div>
</template>

<script>
  import RightMenu from '../../common/rightMenu.vue'               //右键
  import LandLord from './landLord.vue'                    //房东
  import LandLordDetail from './landLordDetail.vue'        //房东详情
  export default {
    name: "index",
    components: {RightMenu, LandLord, LandLordDetail},
    data() {
      return {
        rightMenuX: 0,
        rightMenuY: 0,
        show: false,
        lists: [],

        lordVisible: false,
        detailVisible: false,

        currentPage: 1,
        isHigh: false,
        form: {},

        tableData: [
          {
            create_time: '2018-08-02 16:26:04',
            address: '时光澔韵11-11-1111 ',
            customer_name: '第三方是',
            contact: '15298556588',
            months: '12',
            pay_types: '双月付',
            prices: '100000',
            deal_date: '2018-07-31',
            first_pay_date: '2018-07-31',
            account_type: '银行卡',
            account_num: '6217002710000684874',
            real_name: '王照国',
            status: 1,
          },
        ],
      }
    },
    mounted() {
    },
    activated() {
    },
    watch: {},
    methods: {
      // 新增客户
      openAccount() {
        this.lordVisible = true;
      },
      highGrade() {
        this.isHigh = !this.isHigh;
      },
      resetting() {

      },
      // 双击
      dblClickTable() {
        this.detailVisible = true;
      },
      // 右键
      customerMenu(row, event) {
        this.lists = [
          {clickIndex: 'revise', headIcon: 'el-icon-edit-outline', label: '编辑',},
          {clickIndex: 'delete', headIcon: 'el-icon-circle-close-outline', label: '删除',},
          {clickIndex: 'pendTenant', headIcon: 'iconfont icon-fangdongtuifang', label: '转为待处理项',},
        ];
        this.contextMenuParam(event);
      },
      // 右键回调
      clickEvent(val) {
        if (val === 'delete') {
          this.openDelete();
        }
        if (val === 'revise') {
          this.openAccount();
        }
        if (val === 'pendTenant') {
          this.pendTenant();
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
        this.rightMenuX = e.clientX + document.documentElement.scrollLeft - document.documentElement.clientLeft;
        this.rightMenuY = e.clientY + document.documentElement.scrollTop - document.documentElement.clientTop;
        event.preventDefault();
        event.stopPropagation();
        this.$nextTick(() => {
          this.show = true
        })
      },
      // 删除
      openDelete() {
        this.$confirm('此操作将删除该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$message({
            type: 'success',
            message: '删除成功!'
          });
        }).catch(() => {

        });
      },
      // 转为待处理项
      pendTenant(){
        this.$confirm('此操作将转为待处理项, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$message({
            type: 'success',
            message: '操作成功!'
          });
        }).catch(() => {

        });
      },
      // 分页
      handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
      },
      handleCurrentChange(val) {
        console.log(`当前页: ${val}`);
      },
    },
  }
</script>

<style lang="scss">

</style>
