<template>
  <div @click="show=false" @contextmenu="closeMenu">
    <div class="highRanking">
      <div class="highSearch">
        <el-form :model="form" :inline="true" size="mini">
          <el-form-item>
            <el-input placeholder="请输入内容" v-model="form.keyWords" size="mini" clearable>
              <el-button slot="append" icon="el-icon-search"></el-button>
              <!--<el-button slot="append" icon="el-icons-fa-bars"></el-button>-->
            </el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" size="mini" @click="highGrade">高级</el-button>
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
                  <div class="el_col_label">报销类别</div>
                </el-col>
                <el-col :span="16" class="el_col_option">
                  <el-form-item>
                    <el-select v-model="form.selects">
                      <el-option label="ffffff" value="1"></el-option>
                      <el-option label="dddddd" value="2"></el-option>
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
      @row-contextmenu="collectMenu">
      <el-table-column
        label="姓名"
        prop="name">
      </el-table-column>
      <el-table-column
        label="联系电话"
        prop="mobile">
      </el-table-column>
      <el-table-column
        label="房屋所在城市"
        prop="city">
      </el-table-column>
      <el-table-column
        label="小区名称"
        prop="community">
      </el-table-column>
      <el-table-column
        label="其他情况"
        prop="others">
      </el-table-column>
      <el-table-column
        label="是否回访"
        prop="status">
      </el-table-column>
      <el-table-column
        label="备注"
        prop="module">
      </el-table-column>
    </el-table>

    <div class="block pages">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-size="20"
        layout="total, prev, pager, next, jumper"
        :total="totalNumber">
      </el-pagination>
    </div>
    <!--右键-->
    <RightMenu :startX="rightMenuX+'px'" :startY="rightMenuY+'px'" :list="lists" :show="show"
               @clickOperate="clickEvent"></RightMenu>

    <Remarks :module="remarkVisible" @close="closeRemark"></Remarks>
  </div>
</template>

<script>
  import Remarks from '../../common/remarks'
  import RightMenu from '../../common/rightMenu.vue'    //右键
  export default {
    name: "index",
    components: {RightMenu, Remarks},
    data() {
      return {
        rightMenuX: 0,
        rightMenuY: 0,
        show: false,
        lists: [],

        currentPage: 1,
        remarkVisible: false,
        isHigh: false,
        form: {
          keyWords: '',
          selects: '',
          dates: '',
        },

        tableData: [],
        params:{
          limit:12,
          page:1
        },
        pages: 1,
        totalNumber : 0,
        isLoading : true,
      }
    },
    mounted() {
        this.getTableData();
    },
    watch: {},
    methods: {
      getTableData(){
        this.$http.get(globalConfig.server+'/wechat/collect',{params:this.params}).then((res) => {
          if(res.data.code === '10010'){
            this.tableData = res.data.data;
            this.pages = res.data.pages;
            this.totalNumber = res.data.number;
            this.isLoading = false;
          }
        })
      },

      // 重置
      resetting() {
        this.form.keywords = '';
      },
      // 高级筛选
      highGrade() {
        this.isHigh = !this.isHigh;
      },
      // 右键
      collectMenu(row, event) {
        this.lists = [
          {clickIndex: 'remark', headIcon: 'el-icon-edit', label: '备注',},
        ];
        this.contextMenuParam(event);
      },
      // 右键回调
      clickEvent(val) {
        if (val === 'remark') {
          this.remarkVisible = true;
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
      // 备注
      closeRemark() {
        this.remarkVisible = false;
      },
      handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
      },
      handleCurrentChange(val) {
        this.currentPage = val;
        this.params.page = val;
        this.getTableData();
      },
    },
  }
</script>

<style lang="scss">

</style>
