<template>
  <div @click="show=false" @contextmenu="closeMenu">
    <div>
    <div class="highRanking">    
      <div class="highSearch" style="width:315px">
        <el-form :inline="true" size="medium" >
          <el-form-item>
            <el-input placeholder="标题/发布人/内容关键字" v-model="form.pename" @keyup.enter.native="myData(1)" size="mini"
                      clearable>
              <el-button slot="append" icon="el-icon-search" @click="myData(1)"></el-button>
              <!--<el-button slot="append" icon="el-icons-fa-bars"></el-button>-->
            </el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" size="mini" @click="highGrade">高级</el-button>
          </el-form-item>
        </el-form>
        <el-button @click="openModalDialogx('noticeDialog')" class="sendnotice" size="mini" type="primary">发布公告</el-button>
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
                  <div class="el_col_label">部门搜索</div>
                </el-col>
                <el-col :span="16" class="el_col_option">
                <el-form-item >
                   <el-input readonly="" v-model="this.departname" @click.native="openOrganizationModal()" placeholder="点击选择"></el-input>
                </el-form-item>
                </el-col>
              </el-row>
            </el-col>
            <el-col :span="12">
              <el-row>
                <el-col :span="8">
                  <div class="el_col_label">时间</div>
                </el-col>
                <el-col :span="16" class="el_col_option">
                  <el-date-picker
                    size="mini"
                    v-model="value4"
                    type="datetimerange"
                    :picker-options="pickerOptions2"
                    value-format="yyyy-MM-dd"
                    format="yyyy-MM-dd"
                    range-separator="至"
                    start-placeholder="开始日期"
                    end-placeholder="结束日期"
                    align="right">
                  </el-date-picker>
                </el-col>
              </el-row>
            </el-col>
          </el-row>
          <div class="btnOperate">

            <el-button size="mini" type="primary" @click="search()">搜索</el-button>
            <el-button size="mini" type="primary" @click="resetting">重置</el-button>
            <el-button size="mini" type="primary" @click="highGrade">取消</el-button>
          </div>
        </el-form>
      </div>
    </div>
      <div class="main">
        <div class="myHouse">
          <div class="blueTable">
            <el-table
              :data="tableData"
              @row-contextmenu='noticeMenu'
              style="width: 100%">
              <el-table-column
                prop="name"
                label="公告主题">
              </el-table-column>
              <el-table-column
                prop="dname"
                label="发布时间">
              </el-table-column>
              <el-table-column
                prop="last_date"
                label="发布人">
              </el-table-column>
              <el-table-column
                prop="last_on"
                label="标题">
              </el-table-column>
              <el-table-column
                prop="last_off"
                label="主要内容">
              </el-table-column>
              <el-table-column
                prop="time_result"
                label="已阅读人数">
              </el-table-column>
              <el-table-column
                prop="attend"
                label="未读人数">
              </el-table-column>
              <el-table-column
                prop="late"
                label="状态">
              </el-table-column>
            </el-table>
          </div>
          <div class="tableBottom">
            <div class="left">
              <el-pagination
                @size-change="handleSizeChange"
                @current-change="myData"
                :current-page="nowPage"
                :page-size="12"
                layout="total, prev, pager, next, jumper"
                :total="total">
              </el-pagination>
            </div>
          </div>
        </div>
      </div>
    </div>
    <RightMenu :startX="rightMenuX+'px'" :startY="rightMenuY+'px'" :list="lists" :show="show" @clickOperate="clickEvent"></RightMenu>
    <NoticeResources :noticeDialog="noticeDialog" @close="closeNoticeResources"></NoticeResources> 
  </div>
</template>

<script>

  import RightMenu from '../../../common/rightMenu.vue'    //右键
  import NoticeResources from './components/NoticeResources.vue' //增加物品页面
  export default {
    components:{
      RightMenu,
      NoticeResources
    },
    data () {
      return {
        /***********/
        urls:globalConfig.server,    
        departname:'', 
        pename:'', 
        value4:'',
        tableData: [],
        organizationDialog: false,
        noticeDialog:false,
        len:0,
        depart:'',
        orgtype:'',
        form:{
          page:1,
          limit:12,
          time:'',
          pename:'',
          year_month:'2018-03',  //TODO
          department_id:''
          },
        isHigh: false,
        nowPage: 1,   //当前页
        total:0,      //总条数
        show: false,
        rightMenuX: 0,
        rightMenuY: 0,
        lists:[],
        //模态框
        instructionDialog: false,
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
        value4: ''
      }
    },

    methods: {
      handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
      },
      openModalDialogx(){       
        this.noticeDialog=true;
      },
      closeNoticeResources(){
        this.noticeDialog=false;
      },
      //右键回调时间
      clickEvent (index) {
        this.openModalDialog(index);
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
      //公告右键
      noticeMenu(row, event){
        this.lists = [
          {clickIndex: '', headIcon: 'el-icons-fa-edit', label: '编辑',},
          {clickIndex: '', headIcon: 'el-icons-fa-trash-o', label: '删除',},
          {clickIndex: '', headIcon: 'el-icons-fa-newspaper-o', label: '发布',},
        ];
        this.contextMenuParam(event);
      },
      myData(val) {
        this.tableData = [];
        this.form.page = val;
        this.form.time=this.value4;
       
        this.$http.get(this.urls+'attendance/summary/', {
          params: this.form,
        }).then((res) => {
            console.log(res);
            if (res.data.code === '20010') {
                this.tableData=res.data.data;
                this.nowPage=val;
                this.total=res.data.num;
            }
            else{
              this.total=0;
            }
      
         })
      },
      clickTable(row, event, column){
        console.log(row, event, column)
      },
      search() {
        this.myData(1);
        this.isHigh = false;
      },
      // 重置
      resetting() {
          this.form={
          page:1,
          limit:12,
          time:'',
          pename:'',
          department_id:''
          },
          this.departname='',
          this.value4='',
          this.myData(1);
      },
      // 高级筛选
      highGrade() {
        this.isHigh = !this.isHigh;
      },
    },
    mounted() {
    this.myData(1);
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped="">
  .filter {
    /*padding: 10px 0;*/
  }
  .sendnotice{ position: absolute;
    right:0;
    top:8px;
  }
  .main{margin-top:10px;}
  .tableBottom {
    padding: 8px;
    display: flex;
    justify-content: flex-end;
  }
  .el-table .cell{
    text-align: center;
  }
</style>
