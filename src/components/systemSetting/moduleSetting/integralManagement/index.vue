<template>
  <div @click="show=false" @contextmenu="show=false">

    <div class="highRanking">
      <div style="float:left">
        <el-form :inline="true" size="mini">
          <el-select size="mini" v-model="type"  @change="integral" clearable="" placeholder="请选择积分项">
            <el-option label="得分项目" value="0"></el-option>
            <el-option label="失分项目" value="1"></el-option>
          </el-select>
        </el-form>
      </div>
      <div class="highSearch">
        <el-form :inline="true" size="mini">
          <el-button size="mini" @click="newList" type="primary">新增项目</el-button>
        </el-form>
      </div>
    </div>
    <div class="main">
      <div class="blueTable">
        <el-table
          :data="integralList"
          @row-contextmenu='openContextMenu'
          style="width: 100%">
          <el-table-column
            prop="item"
            label="所属类型">
          </el-table-column>
          <el-table-column
            prop="name"
            label="项目名称">
          </el-table-column>
          <el-table-column
            prop="amount_str"
            label="积分分数">
          </el-table-column>
          <el-table-column
            prop="update_time"
            label="操作时间">
          </el-table-column>
          <el-table-column
            label="备注">
 <template slot-scope="scope">
<div v-popover:popover1 style="display:block;word-break:keep-all;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;">
{{scope.row.remark}}
<el-popover ref="popover1" placement="top-start" width="400" trigger="hover">
{{scope.row.remark}}
</el-popover>
</div>
</template>           
          </el-table-column>
        </el-table>
      </div>
      <div class="tableBottom">
        <div class="left">
          <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="params.page"
            :page-size="15"
            layout="total, prev, pager, next, jumper"
            :total="totalNumber">
          </el-pagination>
        </div>
      </div>
    </div>
    <RightMenu :startX="rightMenuX+'px'" :startY="rightMenuY+'px'" :list="lists" :show="show"
               @clickOperate="clickEvent"></RightMenu>
    <NewAdd :newAddDialog="newAddDialog" :newAdd="newAdd" :formDetail="formDetail" @newAddBack="newAddBack" @close="newAddDialog = false"></NewAdd>
    <AddNote :addNoteDialog="addNoteDialog"  :formDetail="formDetail" @addNoteBack="addNoteBack" @close="addNoteDialog = false"></AddNote>

  </div>
</template>

<script>
  import RightMenu from '../../../common/rightMenu.vue'    //右键
  import NewAdd from "./newAdd.vue";
  import AddNote from "./addNote.vue";
  export default {
    components: {RightMenu,NewAdd,AddNote},
    data() {
      return {
        rightMenuX: 0,
        rightMenuY: 0,
        show: false,
        lists: [],
        formDetail:{},
        newAdd: "",
        newAddDialog: false,
        addNoteDialog:false,
        /***********/
        integralList: [],
        currentPage: 1,
        totalNumber: 0,
        type:'',
        params: {
          status: '',
          department_id: '',
          staff_id: '',
          keywords: '',
          page: 1,
          limit:15
        },
        current:1
      }
    },

    mounted() {
      this.itemAll()
    },
    methods: {
     newAddBack(val) {
      if (val == "新增") {
        this.params.page = 1;
        this.itemAll()
      } else {
        this.itemAll();
      }
    }, 
    addNoteBack(){
this.itemAll();
    },
    // 新增
    newList() {
      this.newAdd = "新增";
      this.newAddDialog = true;
    },  
      handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
      },
      handleCurrentChange(val) {
        console.log(`当前页: ${val}`);
        this.params.page=val;
        this.itemAll();
      },
      clickTable(row, event, column) {
        console.log(row, event, column)
      },
      openContextMenu(row, event) {
        this.formDetail=row
        this.lists = [
          {clickIndex: 'newAddDialog', headIcon: 'el-icon-edit', label: '修改项目',},
          {clickIndex: 'deleteInfo', headIcon: 'el-icons-fa-hdd-o', label: '删除项目',},
          {clickIndex: 'addNoteDialog', headIcon: 'el-icons-fa-mail-reply', label: '增加备注',},

        ];
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
      //右键回调时间
      clickEvent(index) {
        this.openModalDialog(index);
      },
      openOrganizationModal() {
        this.organizationDialog = true
      },
      deleteInfo() {
        this.$confirm('删除后不可恢复, 是否继续?', '提示', {
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
    integral(val) {
      let typeGet = [];

      if(val){
      if (val == "0") {
        typeGet = "credit/manage/item/gain";
      } else if(val=="1") {
        typeGet = "credit/manage/item/lose";
      }

      this.params.limit=15;
      this.totalNumber=0;
      this.integralList = [];
      this.$http
        .get(globalConfig.server + typeGet, {
          params: this.params
        })
        .then(res => {
          if (res.data.code === "30210") {
            this.integralList = res.data.data;
            this.totalNumber = res.data.num;
            for(let i=0;i<res.data.data.length;i++){       
               if(res.data.data[i].amount_str[0]=='+'){
                 this.integralList[i].item="得分项目"
               }
               else{
                 this.integralList[i].item="失分项目"
               }
        if(res.data.data[i].remarks){

            if(res.data.data[i].remarks[0])
            if(res.data.data[i].remarks[0].content){
              this.integralList[i].remark=""
                for(let i=0;i<res.data.data[i].remarks.length;i++){
                this.integralList[i].remark +=res.data.data[i].remarks[i].content +";"
                }
            }
             }
            }   
         
          }
        });
      }
      else{
        this.itemAll();
      }
      },

      itemAll(){
        this.integralList = [];
        this.params.limit=15;

        this.$http.get(globalConfig.server + '/credit/manage/item', {
          params: this.params
        }).then(res => {
          if (res.data.code === "30210") {
            this.integralList = res.data.data;
            this.totalNumber = res.data.num;
            for(let i=0;i<res.data.data.length;i++){       
               if(res.data.data[i].amount_str[0]=='+'){
                 this.integralList[i].item="得分项目"
               }
               else{
                 this.integralList[i].item="失分项目"
               }
        if(res.data.data[i].remarks){

            if(res.data.data[i].remarks[0])
            if(res.data.data[i].remarks[0].content){
               this.integralList[i].remark=""
                for(let k=0;k<res.data.data[i].remarks.length;k++){
                this.integralList[i].remark +=res.data.data[i].remarks[k].content +";"
                }
            }
             }
            }
          }
        });
      },
    openModalDialog(index) {
      //右键修改
      if (index == "newAddDialog") {
        this.newAddDialog = true;
        this.newAdd = "修改";        
      }
      if(index == "deleteInfo"){
        this.$http.delete(globalConfig.server + 'credit/manage/item/'+ this.formDetail.id
        ).then(res => {
          if (res.data.code === "30210") {
            this.$notify.success({
              title: "成功",
              message: res.data.msg
            });
            this.itemAll();
          } else{
                 this.$notify.warning({
                  title: "警告",
                  message: res.data.msg
                });             
            }
        });        
      }
      if(index == "addNoteDialog"){
        this.addNoteDialog=true;
      }

    }
    }

  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .tableBottom {
    padding: 8px;
    display: flex;
    justify-content: flex-end;

  }
</style>
