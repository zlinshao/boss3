<template>
  <div @click="show=false" @contextmenu="closeMenu" id="roomCharge">
    <div class="filter">
      <el-form :inline="true" :model="form" size="mini" label-width="80px">
        <el-form-item>
          <el-select v-model="form.status" clearable size="mini">
            <el-option label="款项状态" value=""></el-option>
            <el-option v-for="(key,index) in values" :label="key" :value="index + 1" :key="index"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <div class="block">
            <el-date-picker
              v-model="form.dates"
              type="daterange"
              align="right"
              unlink-panels
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              :picker-options="pickerOptions">
            </el-date-picker>
          </div>
        </el-form-item>
        <el-form-item>
          <el-input v-model="form.organize" @focus="openOrganize" placeholder="请选择部门/员工"
                    readonly>
            <template slot="append">
              <div style="cursor: pointer;" @click="close_">清空</div>
            </template>
          </el-input>
        </el-form-item>
        <el-form-item>
          <el-input v-model="form.subject" placeholder="请选择科目" readonly>
            <template slot="append">
              <div style="cursor: pointer;" @click="close_">清空</div>
            </template>
          </el-input>
        </el-form-item>
        <el-form-item>
          <el-autocomplete
            class="inline-input"
            v-model="state" clearable
            :fetch-suggestions="querySearch"
            placeholder="请输入内容"
            :trigger-on-focus="false"
            @select="handleSelect">
            <el-button slot="append" icon="el-icon-search"></el-button>
          </el-autocomplete>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" size="mini">导出</el-button>
        </el-form-item>
        <el-form-item>
          <el-button type="primary"><i class="el-icon-refresh"></i></el-button>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" size="mini"><i class="el-icon-plus"></i>&nbsp;新增应付款项</el-button>
        </el-form-item>
      </el-form>
    </div>
    <el-table
      :data="tableData"
      width="100%"
      @row-contextmenu="houseMenu">
      <el-table-column
        label="第一次付款时间"
        prop="date">
      </el-table-column>
      <el-table-column
        label="第一次付款时间"
        prop="date">
      </el-table-column>
      <el-table-column
        label="合同时间周期"
        prop="date">
      </el-table-column>
      <el-table-column
        label="付款时间"
        prop="date">
      </el-table-column>
      <el-table-column
        label="付款时间"
        prop="date">
      </el-table-column>
      <el-table-column
        label="付款时间"
        prop="date">
      </el-table-column>
      <el-table-column
        label="付款时间"
        prop="date">
      </el-table-column>
      <el-table-column
        label="付款时间"
        prop="date">
      </el-table-column>
      <el-table-column
        label="付款时间"
        prop="date">
      </el-table-column>
      <el-table-column
        label="客户姓名"
        prop="name">
      </el-table-column>
      <el-table-column
        label="手机号"
        prop="mobile"
        width="100px">
      </el-table-column>
      <el-table-column
        label="支出科目"
        prop="subject">
      </el-table-column>
      <el-table-column
        label="应付金额"
        prop="payMoney">
      </el-table-column>
      <el-table-column
        label="实付金额"
        prop="payableMoney">
      </el-table-column>
      <el-table-column
        label="剩余款项"
        prop="remainder">
      </el-table-column>
      <el-table-column
        label="补齐时间"
        prop="polishing">
      </el-table-column>
      <el-table-column
        label="状态"
        prop="status">
        <template slot-scope="scope">
          <el-button v-if="scope.row.status == 1" class="btn btn1" size="mini">待入账</el-button>
          <el-button v-if="scope.row.status == 2" class="btn btn2" size="mini">待结清</el-button>
          <el-button v-if="scope.row.status == 3" class="btn btn3" size="mini">已结清</el-button>
          <el-button v-if="scope.row.status == 4" class="btn btn4" size="mini">已超额</el-button>
        </template>
      </el-table-column>
      <el-table-column
        label="备注"
        prop="remark">
      </el-table-column>
    </el-table>

    <div class="block pages collect">
      <div>
        <span>
          应收金额(元)：<span style="color: #78cd51;">4630988.50</span>
        </span>&nbsp;&nbsp;&nbsp;&nbsp;
        <span>
          实收金额(元)：<span style="color: #f66;">129773.64</span>
        </span>&nbsp;&nbsp;&nbsp;&nbsp;
        <span>
          剩余款项(元)：<span style="color: #ff9a02;">4501414.86</span>
        </span>
      </div>
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="[20, 100, 200, 300, 400]"
        :page-size="20"
        layout="total, sizes, prev, pager, next, jumper"
        :total="400">
      </el-pagination>
    </div>

    <el-table
      :data="tableData"
      width="100%"
      @row-contextmenu="houseMenu">
      <el-table-column
        label="第一次付款时间"
        prop="date">
      </el-table-column>
      <el-table-column
        label="第一次付款时间"
        prop="date">
      </el-table-column>
      <el-table-column
        label="合同时间周期"
        prop="date">
      </el-table-column>
      <el-table-column
        label="付款时间"
        prop="date">
      </el-table-column>
      <el-table-column
        label="付款时间"
        prop="date">
      </el-table-column>
      <el-table-column
        label="付款时间"
        prop="date">
      </el-table-column>
      <el-table-column
        label="付款时间"
        prop="date">
      </el-table-column>
      <el-table-column
        label="付款时间"
        prop="date">
      </el-table-column>
      <el-table-column
        label="付款时间"
        prop="date">
      </el-table-column>
      <el-table-column
        label="客户姓名"
        prop="name">
      </el-table-column>
      <el-table-column
        label="手机号"
        prop="mobile"
        width="100px">
      </el-table-column>
      <el-table-column
        label="支出科目"
        prop="subject">
      </el-table-column>
      <el-table-column
        label="应付金额"
        prop="payMoney">
      </el-table-column>
      <el-table-column
        label="实付金额"
        prop="payableMoney">
      </el-table-column>
      <el-table-column
        label="剩余款项"
        prop="remainder">
      </el-table-column>
      <el-table-column
        label="补齐时间"
        prop="polishing">
      </el-table-column>
      <el-table-column
        label="状态"
        prop="status">
        <template slot-scope="scope">
          <el-button v-if="scope.row.status == 1" class="btn btn1" size="mini">待入账</el-button>
          <el-button v-if="scope.row.status == 2" class="btn btn2" size="mini">待结清</el-button>
          <el-button v-if="scope.row.status == 3" class="btn btn3" size="mini">已结清</el-button>
          <el-button v-if="scope.row.status == 4" class="btn btn4" size="mini">已超额</el-button>
        </template>
      </el-table-column>
      <el-table-column
        label="备注"
        prop="remark">
      </el-table-column>
    </el-table>

    <div class="block pages pay">
      <div>
          <span>
          应付金额(元)：<span style="color: #78cd51;">16038533.20</span>
        </span>&nbsp;&nbsp;&nbsp;&nbsp;
        <span>
          实付金额(元)：<span style="color: #f66;">14615.62</span>
        </span>&nbsp;&nbsp;&nbsp;&nbsp;
        <span>
          剩余款项(元)：<span style="color: #ff9a02;">16034710.58</span>
        </span>
      </div>
      <el-pagination
        @size-change="handleSizeChange"
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

    <!--组织架构-->
    <organization :organizationDialog="organizeVisible" @close="closeOrganize"></organization>
  </div>
</template>

<script>
  import organization from '../../common/organization.vue'
  import RightMenu from '../../common/contextMenu/rightMenu.vue'    //右键
  export default {
    name: "index",
    components: {organization, RightMenu},
    data() {
      return {
        rightMenuX: 0,
        rightMenuY: 0,
        show: false,
        lists: [],

        currentPage: 1,
        organizeVisible: false,
        values: ['待入账', '待结清', '已结清', '已超额',],
        form: {
          status: '',
          organize: '',
          dates: '',
          subject: '',
          keywords: '',
          leadingOut: '',
        },
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
        tableData: [
          {
            date: '1990-01-01',
            name: '废话肯定是1-1-1-11-1',
            mobile: '15251830468',
            subject: '押金',
            payMoney: '11111',
            payableMoney: '22222',
            remainder: '44555',
            polishing: '2018-01-01',
            status: 1,
            details: '刘梦/2017-03-15~2022-03-15/第1年月付3100,第2年月付3100,第3年月付3300,第4年月付3400,第5年月付3500/顾庆伟',
            remark: '放大开始JFK撒粉卡',
          }, {
            date: '1990-01-01',
            name: '废话肯定是1-1-1-11-1',
            mobile: '15251830468',
            subject: '押金',
            payMoney: '11111',
            payableMoney: '22222',
            remainder: '44555',
            polishing: '2018-01-01',
            status: 2,
            details: '刘梦/2017-03-15~2022-03-15/第1年月付3100,第2年月付3100,第3年月付3300,第4年月付3400,第5年月付3500/顾庆伟',
            remark: '放大开始JFK撒粉卡',
          }, {
            date: '1990-01-01',
            name: '废话肯定是1-1-1-11-1',
            mobile: '15251830468',
            subject: '押金',
            payMoney: '11111',
            payableMoney: '22222',
            remainder: '44555',
            polishing: '2018-01-01',
            status: 3,
            details: '刘梦/2017-03-15~2022-03-15/第1年月付3100,第2年月付3100,第3年月付3300,第4年月付3400,第5年月付3500/顾庆伟',
            remark: '放大开始JFK撒粉卡',
          }, {
            date: '1990-01-01',
            name: '废话肯定是1-1-1-11-1',
            mobile: '15251830468',
            subject: '押金',
            payMoney: '11111',
            payableMoney: '22222',
            remainder: '44555',
            polishing: '2018-01-01',
            status: 4,
            details: '刘梦/2017-03-15~2022-03-15/第1年月付3100,第2年月付3100,第3年月付3300,第4年月付3400,第5年月付3500/顾庆伟',
            remark: '放大开始JFK撒粉卡',
          }, {
            date: '1990-01-01',
            name: '废话肯定是1-1-1-11-1',
            mobile: '15251830468',
            subject: '押金',
            payMoney: '11111',
            payableMoney: '22222',
            remainder: '44555',
            polishing: '2018-01-01',
            status: 4,
            details: '刘梦/2017-03-15~2022-03-15/第1年月付3100,第2年月付3100,第3年月付3300,第4年月付3400,第5年月付3500/顾庆伟',
            remark: '放大开始JFK撒粉卡',
          },
        ],

        restaurants: [],
        state: ''
      }
    },
    mounted() {
      this.restaurants = this.loadAll();
    },
    watch: {},
    methods: {
      querySearch(queryString, cb) {
        let restaurants = this.restaurants;
        let results = queryString ? restaurants.filter(this.createFilter(queryString)) : restaurants;
        // 调用 callback 返回建议列表的数据
        cb(results);
      },
      createFilter(queryString) {
        return (restaurant) => {
          return (restaurant.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0);
        };
      },
      handleSelect(item) {
        console.log(item);
      },
      loadAll() {
        return [
          { "value": "三全鲜食（北新泾店）", "address": "长宁区新渔路144号" },
          { "value": "Hot honey 首尔炸鸡（仙霞路）", "address": "上海市长宁区淞虹路661号" },
          { "value": "新旺角茶餐厅", "address": "上海市普陀区真北路988号创邑金沙谷6号楼113" },
          { "value": "泷千家(天山西路店)", "address": "天山西路438号" },
          { "value": "胖仙女纸杯蛋糕（上海凌空店）", "address": "上海市长宁区金钟路968号1幢18号楼一层商铺18-101" },
          { "value": "贡茶", "address": "上海市长宁区金钟路633号" },
          { "value": "豪大大香鸡排超级奶爸", "address": "上海市嘉定区曹安公路曹安路1685号" },
          { "value": "茶芝兰（奶茶，手抓饼）", "address": "上海市普陀区同普路1435号" },
          { "value": "十二泷町", "address": "上海市北翟路1444弄81号B幢-107" },
          { "value": "星移浓缩咖啡", "address": "上海市嘉定区新郁路817号" },
          { "value": "阿姨奶茶/豪大大", "address": "嘉定区曹安路1611号" },
          { "value": "新麦甜四季甜品炸鸡", "address": "嘉定区曹安公路2383弄55号" },
          { "value": "Monica摩托主题咖啡店", "address": "嘉定区江桥镇曹安公路2409号1F，2383弄62号1F" },
          { "value": "浮生若茶（凌空soho店）", "address": "上海长宁区金钟路968号9号楼地下一层" },
          { "value": "NONO JUICE  鲜榨果汁", "address": "上海市长宁区天山西路119号" },
          { "value": "CoCo都可(北新泾店）", "address": "上海市长宁区仙霞西路" },
          { "value": "快乐柠檬（神州智慧店）", "address": "上海市长宁区天山西路567号1层R117号店铺" },
          { "value": "Merci Paul cafe", "address": "上海市普陀区光复西路丹巴路28弄6号楼819" },
          { "value": "猫山王（西郊百联店）", "address": "上海市长宁区仙霞西路88号第一层G05-F01-1-306" },
          { "value": "枪会山", "address": "上海市普陀区棕榈路" },
          { "value": "纵食", "address": "元丰天山花园(东门) 双流路267号" },
          { "value": "钱记", "address": "上海市长宁区天山西路" },
          { "value": "壹杯加", "address": "上海市长宁区通协路" },
          { "value": "唦哇嘀咖", "address": "上海市长宁区新泾镇金钟路999号2幢（B幢）第01层第1-02A单元" },
          { "value": "爱茜茜里(西郊百联)", "address": "长宁区仙霞西路88号1305室" },
          { "value": "爱茜茜里(近铁广场)", "address": "上海市普陀区真北路818号近铁城市广场北区地下二楼N-B2-O2-C商铺" },
          { "value": "鲜果榨汁（金沙江路和美广店）", "address": "普陀区金沙江路2239号金沙和美广场B1-10-6" },
          { "value": "开心丽果（缤谷店）", "address": "上海市长宁区威宁路天山路341号" },
          { "value": "超级鸡车（丰庄路店）", "address": "上海市嘉定区丰庄路240号" },
          { "value": "妙生活果园（北新泾店）", "address": "长宁区新渔路144号" },
          { "value": "香宜度麻辣香锅", "address": "长宁区淞虹路148号" },
          { "value": "凡仔汉堡（老真北路店）", "address": "上海市普陀区老真北路160号" },
          { "value": "港式小铺", "address": "上海市长宁区金钟路968号15楼15-105室" },
          { "value": "蜀香源麻辣香锅（剑河路店）", "address": "剑河路443-1" },
          { "value": "北京饺子馆", "address": "长宁区北新泾街道天山西路490-1号" },
          { "value": "饭典*新简餐（凌空SOHO店）", "address": "上海市长宁区金钟路968号9号楼地下一层9-83室" },
          { "value": "焦耳·川式快餐（金钟路店）", "address": "上海市金钟路633号地下一层甲部" },
          { "value": "动力鸡车", "address": "长宁区仙霞西路299弄3号101B" },
          { "value": "浏阳蒸菜", "address": "天山西路430号" },
          { "value": "四海游龙（天山西路店）", "address": "上海市长宁区天山西路" },
          { "value": "樱花食堂（凌空店）", "address": "上海市长宁区金钟路968号15楼15-105室" },
          { "value": "壹分米客家传统调制米粉(天山店)", "address": "天山西路428号" },
          { "value": "福荣祥烧腊（平溪路店）", "address": "上海市长宁区协和路福泉路255弄57-73号" },
          { "value": "速记黄焖鸡米饭", "address": "上海市长宁区北新泾街道金钟路180号1层01号摊位" },
          { "value": "红辣椒麻辣烫", "address": "上海市长宁区天山西路492号" },
          { "value": "(小杨生煎)西郊百联餐厅", "address": "长宁区仙霞西路88号百联2楼" },
          { "value": "阳阳麻辣烫", "address": "天山西路389号" },
          { "value": "南拳妈妈龙虾盖浇饭", "address": "普陀区金沙江路1699号鑫乐惠美食广场A13" }
        ];
      },

      // 部门员工筛选
      openOrganize() {
        this.organizeVisible = true
      },
      // 部门员工筛选
      closeOrganize() {
        this.organizeVisible = false
      },
      close_() {
        console.log(1);
      },
      // 右键
      houseMenu(row, event) {
        this.lists = [
          {clickIndex: 'payWay', headIcon: 'el-icon-edit-outline', label: '应付入账',},
          {clickIndex: 'delete', headIcon: 'el-icon-circle-close-outline', label: '删除',},
        ];
        this.contextMenuParam(event);
      },
      // 右键回调
      clickEvent(val) {
        if (val === 'delete') {
          console.log(val);
          this.openDelete();
        } else {
          this.openVillage();
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
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });
      },
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
  #roomCharge {
    .btn {
      float: left;
      border: 0;
      color: #FFFFFF;
      cursor: default;
    }

    .btn1 {
      background-color: #fc0;
    }

    .btn2 {
      background-color: #f99;
    }

    .btn3 {
      background-color: #78cd51;
    }

    .btn4 {
      background-color: #F04D3D;
    }

    .block.pages.collect {
      margin-bottom: 24px;
    }

    .block.pages.collect, .block.pages.pay {
      display: -webkit-flex;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
  }
</style>
