<template>
  <div>
     <el-dialog :close-on-click-modal="false" title="总合同领取上限" :visible.sync="maxContractInfoDialogVisible" width="60%" style="min-width:1110px;">
      <div>

    <div class="highRanking">
      <div class="highSearch">
          <el-form :inline="true" onsubmit="return false" size="mini">
            <el-form-item>
              <el-button type="primary" size="mini" @click="highGrade">高级搜索</el-button>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" size="mini" @click="openModalDialog()">增加</el-button>
            </el-form-item>
          </el-form>
      </div>
        <div class="filter high_grade" :class="isHigh? 'highHide':''">
          <el-form :inline="true" onsubmit="return false" size="mini" label-width="100px">
            <div class="filterTitle">
              <i class="el-icons-fa-bars"></i>&nbsp;&nbsp;高级搜索
            </div>
            <el-row class="el_row_border">
              <el-col :span="12">
                <el-row>
                  <el-col :span="8">
                    <div class="el_col_label">领取上限范围</div>
                  </el-col>
                  <el-col :span="16" class="el_col_option">
                    <el-form-item>
                      <el-col style="padding:0 " :span="8" class="el_col_option">
                      <el-input  v-model="form.from" placeholder="请输入最小上限">
                      </el-input>
                      </el-col>
                      <el-col style="padding:0; margin-left:30px;"  :span="8" class="el_col_option">
                      <el-input  v-model="form.to" placeholder="请输入最大上限">
                      </el-input>
                      </el-col>
                    </el-form-item>
                  </el-col>
                </el-row>
              </el-col>
              <el-col :span="12">
                <el-row>
                  <el-col :span="8">
                    <div class="el_col_label">操作对象</div>
                  </el-col>
                  <el-col :span="16" class="el_col_option">
                    <el-form-item>
                      <el-input v-model="follow_name" placeholder="选择操作对象"  readonly="" @focus="openOrganizeModal"></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
              </el-col>
            </el-row>
            <div class="btnOperate">
              <el-button size="mini" type="primary" @click="search">搜索</el-button>
              <el-button size="mini" type="primary" @click="resetting">重置</el-button>
              <el-button size="mini" type="primary" @click="highGrade">取消</el-button>
            </div>
          </el-form>
        </div>
    </div>
    <div class="main" >
      <div class="blueTable">
        <el-table
          :data="contractionList"
          style="width: 100%"
          :empty-text = 'rentStatus'
          v-loading="rentLoading"
          element-loading-text="拼命加载中"
          element-loading-spinner="el-icon-loading"
          element-loading-background="rgba(255, 255, 255, 0)">
          <el-table-column label="操作对象" prop="simple_staff.real_name">
          </el-table-column>
          <el-table-column label="领取上限(收/租)" prop="max_count">
          </el-table-column>
          <el-table-column label="操作人" prop="operator.real_name">
          </el-table-column>
          <el-table-column label="操作时间" prop="operate_time">
          </el-table-column>
        </el-table>
      </div>
      <div class="tableBottom">
        <div class="left">
          <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="form.page"
            :page-size="12"
            layout="total, prev, pager, next, jumper"
            :total="parseInt(totalNumber)">
          </el-pagination>
        </div>
      </div>
    </div>
      </div>

    </el-dialog>
 <AddMaxContract :addMaxContracDialog="addMaxContracDialog" @configflag="configflag"  @close="addMaxContracDialog = false"></AddMaxContract>
     <Organization :organizationDialog="organizationDialog" :length="length" :type="type"
                  @close='closeModal' @selectMember="selectMember"></Organization>
  </div>
</template>

<script>
  import AddMaxContract from "./AddMaxContract.vue";
  import Organization from '../../../common/organization.vue'
export default {
  props: ["newAdd", "maxContractInfoDialog","ToCityList"],
  components: {AddMaxContract,Organization},
  data() {
    return {
      maxContractInfoDialogVisible: false,
      addMaxContracDialog:false,
      organizationDialog: false,
      urls: globalConfig.server,
      contractionList:[],
      isHigh:false,
      length:0,
      totalNumber:0,
      type:'',
      follow_name:'',
      form:{
        page:1,
        limit:12,
        from:'',
        to:'',
        follow_id:''
      },
      rentStatus:' ',
      rentLoading:false,
    };
  },
  watch: {
    maxContractInfoDialog(val) {
      this.maxContractInfoDialogVisible = val;
    },
    maxContractInfoDialogVisible(val) {
      if (!val) {
        this.$emit("close");
      }
    }
  },
  mounted() {
    this.getInfo()
  },
   methods: {
      getInfo(){
        this.rentStatus = " ";
        this.rentLoading = true;
        this.$http.get(this.urls + 'contract/policy',{params:this.form} ).then((res) => {
          this.rentLoading = false;
          if(res.data.code=="20000"){
            this.contractionList = res.data.data.data;
            this.totalNumber = res.data.data.count;
          }
          else{
            this.totalNumber=0;
            this.form.page=1;
            this.rentStatus = '暂无数据';
          }
        })
      },
      handleCurrentChange(val) {
        console.log(`当前页: ${val}`);
        this.form.page=val;
        this.getInfo();
      },
      handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
      },

      configflag(){
        this.getInfo()
      },
      openModalDialog(){
        this.isHigh = false;
        this.addMaxContracDialog =true;
      },
      closeModal(val){
        this.organizationDialog = false;
      },
      //调出选人组件
      openOrganizeModal(){
        this.organizationDialog = true;
        this.type = 'staff';
        this.length = 1;
      },
      selectMember(val){
        console.log(val)
        this.type = '';
        this.length = '';
        this.form.follow_id = val[0].id;
        this.follow_name = val[0].name;

      },
      highGrade(){
        this.isHigh = !this.isHigh;
      },
      search(){
        this.form.page=1;
        this.getInfo();
        this.isHigh=false
      },
      resetting(){
      this.form={
        page:1,
        limit:12,
        from:'',
        to:'',
        follow_id:''
      }
      this.follow_name ='';
      this.search();
      }
    }
};
</script>
<style lang="scss" scoped="">
  .addMore{
    display: flex;
    font-size: 18px;
    justify-content: flex-end;
    .el-icon-circle-plus{
      font-size: 14px;
    }
  }
  .main{
    margin-top:10px;
  }
  .blueTable{
    height:400px;
    overflow:auto;
  }
  .tableBottom {
    padding: 8px;
    display: flex;
    justify-content: flex-end;
    padding-right: 40px;
  }
</style>
