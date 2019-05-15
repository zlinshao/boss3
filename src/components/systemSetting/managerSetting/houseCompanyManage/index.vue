<template>
    <div id="houseCompany">
        <div class="highRanking" style=" position: absolute; top: 122px; right: 20px;">
            <div class="highSearch">
                <el-form :model="params" :inline="true" size="mini">
                    <el-form-item>
                        <el-input placeholder="请输入内容" v-model="params.keywords" size="mini" @keyup.enter.native="search">
                            <el-button slot="append" icon="el-icon-search" @click="search"></el-button>
                        </el-input>
                    </el-form-item>
                </el-form>
            </div>
        </div>
        <el-table
            :data="tableList"
            :empty-text="emptyText"
            @row-contextmenu='houseMenu'
            v-loading="Loading"
            element-loading-text="拼命加载中"
            element-loading-spinner="el-icon-loading"
            element-loading-background="rgba(255, 255, 255, 0)"
        >
            <el-table-column label="房屋名称" prop="name">

            </el-table-column>
            <el-table-column label="所属公司" prop="corp_name">

            </el-table-column>
            <el-table-column label="开始时间" prop="create_time">
            
            </el-table-column>
        </el-table>
        <div style="text-align: right;margin-top: 15px;">
            <el-pagination
            @current-change="handleCurrentChange"
            :page-size="params.limit"
            :current-page.sync="params.page"
            layout="total, prev, pager, next, jumper"
            :total="count">
            </el-pagination>
        </div>
        <RightMenu :startX="rightMenuX+'px'" :startY="rightMenuY+'px'" :list="lists" :show='show' @clickOperateMore="clickEvent"></RightMenu>
        <AssignCompany :assignCompanyDialog='assignCompanyDialog' @close='closeModal' :houseInfo='houseInfo'></AssignCompany>
    </div>
</template>

<script>
    import AssignCompany from './components/assignCompany.vue'
    import RightMenu from '../../../common/rightMenu.vue'
    export default {
      components: {AssignCompany, RightMenu},
      data() {
        return {
            tableList: [],
            count: 0,
            emptyText: "",
            Loading: true,
            params: {
                page: 1,
                limit: 12,
                keywords:''
            },
            rightMenuX: 0,
            rightMenuY: 0,
            lists:[],
            show:false,
            assignCompanyDialog: false,
            houseInfo:{}
        }
      },
      props: ['activeName'],
      watch: {
          activeName(val){
            if(val === 'ninth'){
                this.getTableData();
            }
          }
      },
      mounted() {
          let _this = this;
          document.addEventListener('click',function(){
              _this.show = false
          }, false)
      },
      methods: {
        handleCurrentChange(page) {
          this.params.page = page;
          this.getTableData();
        },
        //搜索
        search(){
            this.params.page = 1;
            this.getTableData();
        },
        getTableData() {
            this.Loading = true;
            this.emptyText = " ";
            this.$http.get(globalConfig.server + "/organization/other/house-corp-list",{
              params: this.params
            }).then(res => {
              if(res.data.code === '70000'){
                this.Loading = false;
                this.tableList = res.data.data.data;
                this.count = res.data.data.count;
              }else{
                this.Loading = false;
                this.tableList = [];
                this.count = 0;
                this.emptyText = "暂无数据";
              }
            }).catch(err => {
              console.log(err);
            })
        },
        contextParams() {
            let e = event || window.event;let event = window.event;
            this.show = false;
            this.rightMenuX = e.clientX + document.documentElement.scrollLeft - document.documentElement.clientLeft;
            this.rightMenuY = e.clientY + document.documentElement.scrollTop - document.documentElement.clientTop;
            event.preventDefault();
            event.stopPropagation();
            this.$nextTick(() => {
                this.show = true
            })
        },
        clickEvent(val){
            switch (val.clickIndex){
                case 'assignCompanyDialog':
                    this.assignCompanyDialog = true;
                    break;
            }
            this.show = false;
        },
        houseMenu(row, event){
            this.houseInfo = row;
            this.lists = [
                {clickIndex: 'assignCompanyDialog', headIcon: 'el-icon-edit', label: '重新分配公司',},
            ];
            this.contextParams();
        },
        closeModal(){
            this.assignCompanyDialog = false;
            this.getTableData();
        }
      }
    }
</script>

<style scoped>

</style>
