<template>
    <div>
      <div id="container">
        <div class="tool">
          <div class="tool_left">
            <el-button type="primary" size="mini">
              <i class="el-icon-document"></i>&nbsp;登记房源
            </el-button>
            <el-button type="success" size="mini">
              <i class="el-icon-tickets"></i>&nbsp;功能说明
            </el-button>
            <el-button type="info" size="mini">
              <i class="el-icon-tickets"></i>&nbsp;查看备份
            </el-button>
          </div>

          <div class="tool_right">
            <div><i class="el-icon-date"></i>&nbsp;使用说明</div>
            <div><i class="el-icon-setting"></i>&nbsp;设置</div>
          </div>
        </div>
        <div class="filter">
          <el-form :inline="true" :model="formInline" size="mini" class="demo-form-inline">
            <el-form-item label="店面">
              <el-select v-model="formInline.house" clearable placeholder="请选择">
                <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="户型">
              <el-select v-model="formInline.house" clearable placeholder="请选择">
                <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="状态">
              <el-select v-model="formInline.house" clearable placeholder="请选择">
                <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item>
              <el-input v-model="formInline.name" placeholder="搜索">
                <el-button slot="append" type="primary" icon="el-icon-search"></el-button>
              </el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="text">高级</el-button>
            </el-form-item>
            <el-form-item style="float: right">
              <el-button type="success">导出房源</el-button>
            </el-form-item>
          </el-form>
        </div>
        <div class="main">
          <div class="myHouse">
            <div class="myTable">
              <el-table
                :data="tableData"
                @row-click="clickTable"
                @row-contextmenu = 'menuClick'
                style="width: 100%">
                <el-table-column
                  prop="date"
                  label="日期">
                </el-table-column>
                <el-table-column
                  prop="name"
                  label="姓名">
                </el-table-column>
                <el-table-column
                  prop="province"
                  label="省份">
                </el-table-column>
                <el-table-column
                  prop="city"
                  label="市区">
                </el-table-column>
                <el-table-column
                  prop="address"
                  label="地址">
                </el-table-column>
                <el-table-column
                  prop="zip"
                  label="邮编">
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
          <div class="myAddress">
            <div class="myTable">
              <el-table
                :data="tableData1"
                style="width: 100%">
                <el-table-column
                  prop="date"
                  label="日期">
                </el-table-column>
                <el-table-column
                  prop="name"
                  label="姓名">
                </el-table-column>
                <el-table-column
                  prop="province"
                  label="省份">
                </el-table-column>
                <el-table-column
                  prop="city"
                  label="市区">
                </el-table-column>
                <el-table-column
                  prop="address"
                  label="地址">
                </el-table-column>
                <el-table-column
                  prop="zip"
                  label="邮编">
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
          <div class="myDetail" >
            <el-tabs type="border-card">
              <el-tab-pane label="房东信息">
                <div class="content"></div>
                <div class="remarks">备注：</div>
              </el-tab-pane>
              <el-tab-pane label="租客信息">租客信息</el-tab-pane>
              <el-tab-pane label="财务信息">财务信息</el-tab-pane>
              <el-tab-pane label="欠费信息">财务信息</el-tab-pane>
              <el-tab-pane label="物品增减">财务信息</el-tab-pane>
              <el-tab-pane label="退/换房记录">财务信息</el-tab-pane>
              <el-tab-pane label="续约记录">财务信息</el-tab-pane>
              <el-tab-pane label="转租记录">财务信息</el-tab-pane>
              <el-tab-pane label="跟进记录">财务信息</el-tab-pane>
              <el-tab-pane label="应付房租">财务信息</el-tab-pane>
              <el-tab-pane label="应收房租">财务信息</el-tab-pane>
              <el-tab-pane label="其他收支计划">财务信息</el-tab-pane>
              <el-tab-pane label="代缴记录">财务信息</el-tab-pane>
              <el-tab-pane label="电子合同">财务信息</el-tab-pane>
              <el-tab-pane label="装修流程">财务信息</el-tab-pane>
              <el-tab-pane label="其他记录">财务信息</el-tab-pane>
            </el-tabs>
          </div>
        </div>
      </div>
    </div>
</template>

<script>
    export default {
        name: 'hello',
        data () {
            return {
              formInline:{
                name:'',
                house:''
              },
              tableData: [
                  {
                date: '2016-05-03',
                name: '王小虎',
                province: '上海',
                city: '普陀区',
                address: '上海市普陀区金沙江路 1518 弄',
                zip: 200333
              }, {
                date: '2016-05-02',
                name: '王小虎',
                province: '上海',
                city: '普陀区',
                address: '上海市普陀区金沙江路 1518 弄',
                zip: 200333
              }, {
                date: '2016-05-04',
                name: '王小虎',
                province: '上海',
                city: '普陀区',
                address: '上海市普陀区金沙江路 1518 弄',
                zip: 200333
              }, {
                date: '2016-05-01',
                name: '王小虎',
                province: '上海',
                city: '普陀区',
                address: '上海市普陀区金沙江路 1518 弄',
                zip: 200333
              }, {
                date: '2016-05-08',
                name: '王小虎',
                province: '上海',
                city: '普陀区',
                address: '上海市普陀区金沙江路 1518 弄',
                zip: 200333
              }, {
                date: '2016-05-06',
                name: '王小虎',
                province: '上海',
                city: '普陀区',
                address: '上海市普陀区金沙江路 1518 弄',
                zip: 200333
              }, {
                date: '2016-05-07',
                name: '王小虎',
                province: '上海',
                city: '普陀区',
                address: '上海市普陀区金沙江路 1518 弄',
                zip: 200333
              }],
              tableData1: [
                {
                  date: '2016-05-03',
                  name: '王小虎',
                  province: '上海',
                  city: '普陀区',
                  address: '上海市普陀区金沙江路 1518 弄',
                  zip: 200333
                }],
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

        methods:{
          handleSizeChange(val) {
            console.log(`每页 ${val} 条`);
          },
          handleCurrentChange(val) {
            console.log(`当前页: ${val}`);
          },
          clickTable(row, event, column){
              console.log(row, event, column)
          },
          menuClick(row, event){
              console.log(row,  event)
          }
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
  #container{
    background: #fff;
    .tool{
      border-bottom: 1px solid #eee;
      display: flex;
      justify-content : space-between;
      .tool_right{
        display: flex;
        align-items: center;
        div{
          width: 100px;
          text-align: center;
          cursor: pointer;
          &:first-child{
            border-right: 1px solid #ccc;
          }
          i{
            color: #409EFF;
          }
        }
      }
    }
    .filter{
      padding-top: 10px;
    }
    .main{
      font-size: 12px;
      .myHouse{
        border: 1px solid #dfe6fb;
        margin-bottom: 20px;
        box-shadow: 0 2px 4px 0 rgba(0,0,0,.12), 0 0 6px 0 rgba(0,0,0,.04);
        .myTable{
          .el-table{
            th{
              background-color: #dfe6fb;
            }
          }
        }
        .tableBottom{
          padding: 8px;
          display: flex;
          justify-content: space-between;
          .right{
            display: flex;
            align-items: center;
            div{
              width: 100px;
              text-align: center;
              span{
                color: #fb529f;
              }
              &:first-child{
                border-right: 1px solid #ccc;
              }
            }
          }
        }
      }
      .myAddress{
        border: 1px solid #d4f0de;
        margin-bottom: 20px;
        box-shadow: 0 2px 4px 0 rgba(0,0,0,.12), 0 0 6px 0 rgba(0,0,0,.04);
        .myTable{
          .el-table{
            th{
              background-color: #d4f0de;
            }
          }
        }
        .tableBottom{
          padding: 8px;
          display: flex;
          justify-content: space-between;
          .right{
            display: flex;
            align-items: center;
            div{
              width: 100px;
              text-align: center;
              span{
                color: #fb529f;
              }
              &:first-child{
                border-right: 1px solid #ccc;
              }
            }
          }
        }
      }
      .myDetail{
        margin-bottom: 15px;
        .el-tabs{
          border: 1px solid #d4f0de;
          .el-tabs__header{
            background-color: #d4f0de;
          }
          .el-tabs__content{
            padding: 0;
            .el-tab-pane{
              .content{
                min-height: 100px;
              }
              .remarks{
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
