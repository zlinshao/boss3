 <template>
  <div @click="show=false" @contextmenu="closeMenu">
    <div id="houseContainer">

      <div class="highRanking">
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
              <el-button type="primary" @click="openOrganizationModal('dispatch')">分配</el-button>
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
                    <div class="el_col_label">房屋状态</div>
                  </el-col>
                  <el-col :span="16" class="el_col_option">
                    <el-form-item>
                      <el-select v-model="formInline.house" clearable placeholder="请选择" value="">
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
                    <div class="el_col_label">认领状态</div>
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
            <el-row class="el_row_border">
              <el-col :span="12">
                <el-row>
                  <el-col :span="8">
                    <div class="el_col_label">按部门搜索</div>
                  </el-col>
                  <el-col :span="16" class="el_col_option">
                    <el-form-item>
                      <el-input readonly="" @focus="openOrganizationModal" v-model="formInline.ss" placeholder="点击选择部门">
                        <el-button slot="append" type="primary">清空</el-button>
                      </el-input>
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
        <div class="tableBox">
          <div class="myTable">
            <el-table
              :data="tableData"
              @row-click="clickTable"
              style="width: 100%">
              <el-table-column
                type="selection"
                width="30">
              </el-table-column>
              <el-table-column
                prop="name"
                label="地址">
              </el-table-column>
              <el-table-column
                prop="date"
                label="房型">
              </el-table-column>
              <el-table-column
                prop="name"
                label="装修">
              </el-table-column>
              <el-table-column
                prop="province"
                label="出租性质">
              </el-table-column>
              <el-table-column
                prop="province"
                label="房屋评分">
              </el-table-column>
              <el-table-column
                prop="date"
                label="房屋特色">
              </el-table-column>
              <el-table-column
                prop="province"
                label="参考价格">
              </el-table-column>
              <el-table-column
                prop="name"
                label="空置时长">
              </el-table-column>
              <el-table-column
                prop="date"
                label="预警状态">
              </el-table-column>
              <el-table-column
                prop="date"
                label="负责人">
              </el-table-column>
              <el-table-column
                prop="name"
                label="所属部门">
              </el-table-column>
              <el-table-column
                prop="province"
                label="备注">
              </el-table-column>
            </el-table>
          </div>
          <div class="tableBottom">

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
        <div class="myDetail">
          <el-tabs type="border-card">
            <el-tab-pane label="房源信息">
              <div class="content">
                <table class="houseList">
                  <tr>
                    <td>房源</td>
                    <td></td>
                    <td>房源</td>
                    <td></td>
                    <td>房源</td>
                    <td></td>
                    <td>
                      <span>跟进人：</span>
                    </td>
                  </tr>
                  <tr>
                    <td>房源</td>
                    <td></td>
                    <td>房源</td>
                    <td></td>
                    <td>房源</td>
                    <td></td>
                    <td>
                      <span>跟进时间：</span>
                    </td>
                  </tr>
                  <tr>
                    <td>房源</td>
                    <td></td>
                    <td>房源</td>
                    <td></td>
                    <td>房源</td>
                    <td></td>
                    <td rowspan="4">
                      <span>跟进记录：</span>
                    </td>
                  </tr>
                  <tr>
                    <td>房源</td>
                    <td></td>
                    <td>房源</td>
                    <td colspan="3">

                    </td>
                  </tr>
                  <tr>
                    <td>房源</td>
                    <td></td>
                    <td>房源</td>
                    <td></td>
                    <td>房源</td>
                    <td></td>
                  </tr>
                  <tr>
                    <td>房源</td>
                    <td></td>
                    <td>房源</td>
                    <td></td>
                    <td>房源</td>
                    <td></td>
                  </tr>
                </table>
              </div>
            </el-tab-pane>
            <el-tab-pane label="跟进记录">
              <div>
                <el-table
                  :data="tableData"
                  @row-click="clickTable">
                  <el-table-column
                    prop="name"
                    label="跟进人">
                  </el-table-column>
                  <el-table-column
                    prop="date"
                    label="跟进时间">
                  </el-table-column>
                  <el-table-column
                    prop="province"
                    label="跟进记录">
                  </el-table-column>
                </el-table>
              </div>

            </el-tab-pane>
          </el-tabs>
        </div>
      </div>
    </div>
    <RightMenu :startX="rightMenuX+'px'" :startY="rightMenuY+'px'" :list="lists" :show="show"
               @clickOperate="clickEvent"></RightMenu>
    <Organization :organizationDialog="organizationDialog" @close="closeOrganization"></Organization>
  </div>
</template>

<script>
  import RightMenu from '../../common/rightMenu.vue'
  import Organization from '../../common/organization.vue'
  export default {
    name: 'hello',
    components: {RightMenu,Organization},
    data () {
      return {
        rightMenuX: 0,
        rightMenuY: 0,
        show: false,
        lists: [],
        /***********/
        formInline: {
          name: '',
          house: ''
        },
        tableData: [
          {
            date: '2016-05-03',
            name: '王小虎',
            province: '上海',
            city: '普陀区',
            address: '上海市普陀区金沙江路 1518 弄',
            zip: 200333
          },
          {
            date: '2016-05-02',
            name: '王小虎',
            province: '上海',
            city: '普陀区',
            address: '上海市普陀区金沙江路 1518 弄',
            zip: 200333
          },
          {
            date: '2016-05-04',
            name: '王小虎',
            province: '上海',
            city: '普陀区',
            address: '上海市普陀区金沙江路 1518 弄',
            zip: 200333
          },
          {
            date: '2016-05-01',
            name: '王小虎',
            province: '上海',
            city: '普陀区',
            address: '上海市普陀区金沙江路 1518 弄',
            zip: 200333
          },
          {
            date: '2016-05-01',
            name: '王小虎',
            province: '上海',
            city: '普陀区',
            address: '上海市普陀区金沙江路 1518 弄',
            zip: 200333
          }
        ],
        currentPage: 1,
        options: [],

        //模态框
        organizationDialog: false,
        isHigh :false,
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
          {clickIndex: 'stick', headIcon: 'el-icons-fa-arrow-up', label: '置顶',},
          {clickIndex: 'dispatch', headIcon: 'el-icon-menu', label: '分配',},
        ];
        this.contextMenuParam(event);
      },
      //合同表头右键
      houseHeadMenu(e){
        this.lists = [
          {clickIndex: 1, headIcon: 'el-icons-fa-home', label: '选择列选项',},
        ];
        this.contextMenuParam(event);
      },

      //右键回调时间
      clickEvent (index) {
        switch (index){
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
        }
      },
      //关闭右键菜单
      closeMenu(){
        this.show = false;
      },

      //右键参数
      contextMenuParam(event){
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

      openOrganizationModal(val){
        if(val === 'dispatch'){
        }
        this.organizationDialog = true;
      },
      closeOrganization(){
        this.organizationDialog = false;
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
  #houseContainer {
    .main {
      font-size: 12px;
      .tableBox {
        border: 1px solid #dfe6fb;
        margin-bottom: 20px;
        box-shadow: 0 2px 4px 0 rgba(0, 0, 0, .12), 0 0 6px 0 rgba(0, 0, 0, .04);
        .myTable {
          .el-table {
            th {
              background-color: #dfe6fb;
            }
          }
        }
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

      .myDetail {
        margin-bottom: 15px;
        .el-tabs {
          border: 1px solid #d4f0de;
          .el-tabs__content {
            .el-tab-pane {
              .content {
                min-height: 100px;
                .houseList {
                  width: 100%;
                  border-collapse: collapse;
                  tr {
                    td {
                      border: 1px solid #ebeef5;
                      padding: 8px 0;
                      color: #606266;
                      text-align: center;
                      &:nth-child(1) {
                        width: 8%;
                      }
                      &:nth-child(2) {
                        width: 12%;
                      }
                      &:nth-child(3) {
                        width: 8%;
                      }
                      &:nth-child(4) {
                        width: 12%;
                      }
                      &:nth-child(5) {
                        width: 8%;
                      }
                      &:nth-child(6) {
                        width: 12%;
                      }
                      &:nth-child(7) {
                        width: 40%;
                        text-align: left;
                        vertical-align: top;
                        padding-left: 8px
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }
</style>
