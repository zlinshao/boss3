<template>
<!-- 表格卡片 -->
  <div ref="chartId" id="chartTable">
    <el-table
      @click.native ="detaildialogVisible=true"
      class="comTable"
      :data="tableData"
      height="200"
      size='mini'
      border
      :highlight-current-row='true'
      :cellStyle='colstyle'
      :header-cell-style='headerrowstyle'
      style="width: 90%">
      <el-table-column
        prop="area"
        label="片区">
      </el-table-column>
      <el-table-column
        prop="manager"
        label="片区经理">
      </el-table-column>
      <el-table-column
        prop="address"
        label="房屋地址">
      </el-table-column>
      <el-table-column
        prop="price"
        label="让价金额">
      </el-table-column>
    </el-table>
    <!-- 分页 -->
    <el-pagination
    class="paging"
    layout="prev, pager, next"
    :total="100">
    </el-pagination>
    <!-- 弹出框 -->
    <el-dialog
      custom-class="detailDia"
      :show-close="false"
      :visible.sync="detaildialogVisible"
      :modal="false"
      width="65%">
      <div>
        <div class="detailMsgHead">
          <i class="el-icon-arrow-left" @click="detaildialogVisible=false"></i>
          <span>{{theme}}</span>
          <toprightControl></toprightControl>
        </div>
        <div class="detailcontent">
          <div class="contentTop">
            <!-- 城市 -->
            <div class="detailSelect">
              <el-select v-model="value" placeholder="城市" size="small">
                <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </div>
            <!-- 区域 -->
            <div class="detailSelect">
              <el-select v-model="value" placeholder="区域" size="small">
                <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </div>
            <!-- 片区 -->
            <div class="detailSelect">
              <el-select v-model="value" placeholder="片区" size="small">
                <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </div>
            <!-- 开始日期 -->
            <div class="detailSelect" >
              <el-date-picker
                size="small"
                v-model="value7"
                type="daterange"
                align="right"
                unlink-panels
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
                :picker-options="pickerOptions2">
              </el-date-picker>
            </div>
            <div class="detailSelect">
              <el-button type="primary" size="small">查询</el-button>
            </div>
          </div>
          <div class="content">
            <el-table
              @click="detaildialogVisible=true"
              class="comTable"
              :data="chartData"
              
              size='mini'
              border
              :highlight-current-row='true'
              :cellStyle='colstyle'
              :header-cell-style='headerrowstyle'
              style="width: 90%">
              <el-table-column
                prop="area"
                label="片区">
              </el-table-column>
              <el-table-column
                prop="manager"
                label="片区经理">
              </el-table-column>
              <el-table-column
                prop="address"
                label="房屋地址">
              </el-table-column>
              <el-table-column
                prop="price"
                label="让价金额">
              </el-table-column>
            </el-table>
            <el-pagination
            class="paging"
            layout="prev, pager, next"
            :total="100">
            </el-pagination>
          </div>
        </div>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import toprightControl from "../../components/toprightControl"
  export default {
    components:{toprightControl},
    props:['theme','chartData'],
    data(){
      return {
        gaodu:300,
        detaildialogVisible:false,
        options: [{
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
        value: '',
        pickerOptions2: {
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
        value7: '',
        tableData: [{
            area: '南京油坊桥组',
            manager: '王小虎',
            address: '上海市普陀区金沙江路 1518 弄',
            price:'200'
          }, {
            area: '南京油坊桥组',
            manager: '王小虎',
            address: '上海市普陀区金沙江路 1518 弄',
            price:'200'
          },{
            area: '南京油坊桥组',
            manager: '王小虎',
            address: '上海市普陀区金沙江路 1518 弄',
            price:'200'
          }],
        monidata:{
            code:200,
            msg:'请求成功',
            result:{
              title:"异常单列表",
              chartType:"table", 
              tag:['业务'],
              detailMsg:"图表说明信息......",
              totalPage:100,
              data:[{
                area: '南京油坊桥组',
                manager: '王小虎',
                address: '上海市普陀区金沙江路 1518 弄',
                price:'200'
              }, {
                area: '南京油坊桥组',
                manager: '小红',
                address: '上海市普陀区金沙江路 1518 弄',
                price:'200'
              },{
                area: '南京油坊桥组',
                manager: '小明',
                address: '上海市普陀区金沙江路 1518 弄',
                price:'200'
              },{
                area: '南京油坊桥组',
                manager: '小明',
                address: '上海市普陀区金沙江路 1518 弄',
                price:'200'
              },{
                area: '南京油坊桥组',
                manager: '小明',
                address: '上海市普陀区金沙江路 1518 弄',
                price:'200'
              },{
                area: '南京油坊桥组',
                manager: '小明',
                address: '上海市普陀区金沙江路 1518 弄',
                price:'200'
              },{
                area: '南京油坊桥组',
                manager: '小明',
                address: '上海市普陀区金沙江路 1518 弄',
                price:'200'
              },{
                area: '南京油坊桥组',
                manager: '小明',
                address: '上海市普陀区金沙江路 1518 弄',
                price:'200'
              }]
            }
          }
      }
    },
    methods:{
      colstyle({row, column, rowIndex, columnIndex}){
        if(columnIndex%2==0){
          return 'background:#6EAAD7;color:#fff;'
        }else {
          return 'background:#fff;color:#6EAAD7;'
        }
      },
      headerrowstyle({row, column, rowIndex, columnIndex}){
        if(columnIndex%2==0){
          return 'background:#6EAAD7!important;color:#fff;'
        }else {
          return 'background:#fff!important;color:#6EAAD7;'
        }
      }
    },
    mounted () {
    },
    watch:{
      chartData(val){
        this.tableData=val
      }
    }

  }
</script>
<style scoped lang="scss">
#chartTable{
  .comTable{
    margin:0 auto;
    >>>th{
      .cell{
        font-size: 16px;
      }
    }
  }
  .paging{
    text-align: center;
    margin-top:10px;
  }
}

// 弹出框
.detailDia {
  .detailMsgHead{
     font-size: 25px;
    i {
     color:#2496FF;
     padding-right:25px;
    }
  }
  .contentTop{
    margin-top: 20px;
    text-align: center;
    .detailSelect{
      display:inline-block;
      width: 15%;
      margin-left: 20px;
      &:nth-of-type(4){
        width: 20%;
      }
      &:last-of-type{
        margin-left:0;
      }
    }
  }
  .content {
    margin-top:30px;
  }
   
}
</style>
<style>

</style>
