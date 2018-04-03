<template>
    <div id="Payroll"  @click="show=false" @contextmenu="closeMenu">
      <div class="highRanking">
        <div class="tabsSearch">
          <el-form :inline="true" size="mini">
            <el-form-item>
              <el-input placeholder="请输入内容" v-model="form.selects" class="input-with-select">
                <el-select v-model="form.keyWords" slot="prepend" placeholder="请选择" clearable>
                  <el-option label="收房" value="1"></el-option>
                  <el-option label="租房" value="2"></el-option>
                </el-select>
                <el-button slot="append" icon="el-icon-search"></el-button>
              </el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" size="mini" @click="highGrade">高级</el-button>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" size="mini" @click="importData">导入</el-button>
              <input type="file" id="import" style="display:none;">
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
                    <div class="el_col_label">日期</div>
                  </el-col>
                  <el-col :span="16" class="el_col_option">
                    <el-form-item>
                      <div class="block">
                        <el-date-picker
                          v-model="form.date"
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
      <div class="main">
        <div style="margin: 0 0 10px;height: 28px;"></div>
        <el-table
          :data="tableData"
          ref="multipleTable"
          tooltip-effect="dark"
          style="width: 100%"
          @selection-change="handleSelectionChange"
          @row-contextmenu="detailMenu"
          @row-dblclick="salaryDetail">
          <el-table-column
            v-if="batch"
            type="selection"
            width="55">
          </el-table-column>
          <el-table-column
            label="收/租状态"
            prop="id">
          </el-table-column>
          <el-table-column
            label="房屋地址"
            prop="id">
          </el-table-column>
          <el-table-column
            label="合同"
            prop="describe">
            <template slot-scope="scope">
              <div :class="{'bgColor':scope.row.describe == '3213gg2'}">
                {{scope.row.describe}}
              </div>
            </template>
          </el-table-column>
          <el-table-column
            label="资料"
            prop="module">
          </el-table-column>
          <el-table-column
            label="交接"
            prop="module">
          </el-table-column>
          <el-table-column
            label="客诉"
            prop="module">
          </el-table-column>
          <el-table-column
            label="尾款"
            prop="module">
          </el-table-column>
          <el-table-column
            label="开单人"
            prop="module">
          </el-table-column>
          <el-table-column
            label="负责人"
            prop="module">
          </el-table-column>
          <el-table-column
            label="所属部门"
            prop="module">
          </el-table-column>
        </el-table>
      </div>
      <div class="block pages">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="form.page"
          :page-size="6"
          layout="total, prev, pager, next, jumper"
          :total="totalNum">
        </el-pagination>
      </div>
    </div>
</template>

<script>
  export default {
    name: "payroll",
    data() {
      return {
        isHigh: false,
        tableData:  [],
        totalNum: 0,
        buttonVal: ['业务员','管理层'],
        active: 0,
        form: {
          category: 1,
          keyWords: '',
          date: '',
          page: 1,
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
        importFile: {},
        header: [],
        multipleSelection: [],
        batch: false,
      }
    },
    mounted() {
      this.getTableData();

    },
    activated() {
      this.getTableData();
    },
    methods:{
      // 按钮切换
      tagClick(val) {
        this.active = val;
        switch(val) {
          case 0:  //业务员
            this.form.category = 1;
            this.getTableData();
            break;
          case 1:  //管理层
            this.form.category = 2;
            this.getTableData();
            break;
        }
      },
      getTableData(){

      },
      handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
      },
      handleCurrentChange(val) {
        console.log(`当前页: ${val}`);
        this.form.page = val;
        this.getTableData();
      },
      // 重置
      resetting() {
      },
      // 高级筛选
      highGrade() {
        this.isHigh = !this.isHigh;
      },
      importData(){
        $('#import').click();
        var self = this;
        $('#import').on('change',function(){
          self.importFile = this.files;
          let data = {};
          data = this.files;
          let formData = new FormData();
          formData.append('file', data);
          if(self.importFile){
            let config = {
              headers:{'Content-Type':'multipart/form-data'}
            };
            console.log(data)
            self.$http.post(globalConfig.server+ 'salary/dashboard/import/'+ self.form.category, formData, config).then((res) => {

            });
          }
        });


      },
      exportData() {
        this.$http.get(globalConfig.server+'salary/achv/export', { responseType: 'arraybuffer'}).then((res) => { // 处理返回的文件流
          if (!res.data) {
            return;
          }
          console.log(res);
          let url = window.URL.createObjectURL(new Blob([res.data]));
          let link = document.createElement('a');
          link.style.display = 'a';
          link.href = url;
          link.setAttribute('download', 'excel.xlsx');
          document.body.appendChild(link);
          link.click();
        });
      },
      // 冻结工资
      openFreeze() {
      },
      closeFreeze() {
      },
      // 标记
      openBadge() {
      },
      handleSelectionChange(val) {
        this.multipleSelection = val;
      },
      // 双击
      salaryDetail(row) {
        console.log(row)
      },
      // 右键 个人工资
      personalMenu(row, event) {
        this.lists = [
          {clickIndex: 'remark', headIcon: 'el-icon-edit', label: '备注',},
        ];
        this.contextMenuParam(event);
      },
      // 右键 历史未结/本月工资明细
      detailMenu(row, event) {
        this.lists = [
          {
            clickIndex: 'revise', tailIcon: 'el-icon-arrow-right', headIcon: 'el-icon-edit-outline', label: '未发标记',
            children: [
              {clickIndex: 'one', label: '单条',},
              {clickIndex: 'more', label: '批量',}
            ]
          },
          {clickIndex: 'remark', headIcon: 'el-icon-edit', label: '备注',},
        ];
        this.contextMenuParam(event);
      },
      // 右键回调
      clickEvent(val) {
        if (val === 'one') {
          this.openBadge();
        }
        if (val === 'more') {
          this.batch = true;
        }
        if (val === 'remark') {
          this.remarkVisible = true;
        }
      },
      // 关闭备注
      closeRemark() {
        this.remarkVisible = false;
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

    },
  }
</script>

<style scoped>
  .primary {
    background: #409EFF;
    border-color: #409EFF;
    color: #ffffff;
  }
  .roll_table table{
    width: 100%;
    /*border-collapse:collapse;*/
  }
  .roll_table table thead th{
    background: #ebeef5;

  }
  .roll_table table tbody td{
    background: #fafafa;
  }
</style>
