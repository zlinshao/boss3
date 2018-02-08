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
                  <div class="el_col_label">问题类型</div>
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
            <el-col :span="12">
              <el-row>
                <el-col :span="8">
                  <div class="el_col_label">日期</div>
                </el-col>
                <el-col :span="16" class="el_col_option">
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
        label="名称"
        prop="id">
      </el-table-column>
      <el-table-column
        label="收房(套)"
        prop="describe">
      </el-table-column>
      <el-table-column
        label="租房(套)"
        prop="module">
      </el-table-column>
      <el-table-column
        label="实际业绩"
        prop="module">
      </el-table-column>
      <el-table-column
        label="溢出业绩"
        prop="module">
      </el-table-column>
      <el-table-column
        label="所属部门"
        prop="module">
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
        :page-sizes="[20, 100, 200, 300, 400]"
        :page-size="20"
        layout="total, sizes, prev, pager, next, jumper"
        :total="400">
      </el-pagination>
    </div>

    <el-dialog title="投诉处理" :visible.sync="reversionVisible" width="30%">
        <el-form :model="form" size="mini" label-width="80px">
          <el-form-item label="回复：">
            <el-input type="textarea" v-model="form.contents" :autosize="{minRows: 2,maxRows: 4}"></el-input>
          </el-form-item>
        </el-form>

        <div slot="footer" class="dialog-footer">
          <el-button size="small" @click="reversionVisible = false">取&nbsp;消</el-button>
          <el-button size="small" type="primary" @click="reversionVisible = false">确&nbsp;定</el-button>
        </div>
    </el-dialog>

    <!--右键-->
    <RightMenu :startX="rightMenuX+'px'" :startY="rightMenuY+'px'" :list="lists" :show="show"
               @clickOperate="clickEvent"></RightMenu>
  </div>
</template>

<script>
  import RightMenu from '../../common/rightMenu.vue'    //右键
  export default {
    name: "index",
    components: {RightMenu},
    data() {
      return {
        rightMenuX: 0,
        rightMenuY: 0,
        show: false,
        lists: [],

        currentPage: 1,
        reversionVisible: false,
        isHigh: false,
        form: {
          keyWords: '',
          selects: '',
          dates: '',
          contents: '',  //回复
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
            id: 1,
            describe: '1发发的挥到',
            module: '1Manger',
          }, {
            id: 2,
            describe: '2放大范德萨',
            module: '1Mange333r',
          },
          {
            id: 1,
            describe: '1发发的挥到',
            module: '1Mangejjr',
          }, {
            id: 2,
            describe: '2放大范德萨',
            module: '1Manger',
          }, {
            id: 2,
            describe: '2放大范德萨',
            module: '1Manger',
          }, {
            id: 2,
            describe: '2放大范德萨',
            module: '1Manger',
          }, {
            id: 1,
            describe: '1发发的挥到',
            module: '1Mangejjr',
          }, {
            id: 2,
            describe: '2放大范德萨',
            module: '1Manger',
          }, {
            id: 2,
            describe: '2放大范德萨',
            module: '1Manger',
          },
        ],
      }
    },
    mounted() {
    },
    watch: {},
    methods: {
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
          {clickIndex: 'reversion', headIcon: 'el-icon-edit', label: '回复',},
        ];
        this.contextMenuParam(event);
      },
      // 右键回调
      clickEvent(val) {
        this.reversionVisible = true;
      },
      // 关闭回复
      closeReversion() {
        this.reversionVisible = false;
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
        console.log(`当前页: ${val}`);
      },
    },
  }
</script>

<style lang="scss">

</style>
