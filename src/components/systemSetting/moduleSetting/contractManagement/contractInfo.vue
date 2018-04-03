<template>
  <div >
     <el-dialog title="总合同数" :visible.sync="contractInfoDialogVisible" width="60%" >
      <div >
 
    <div class="highRanking">
      <div style="float:left">
            <el-form :inline="true" size="mini">
              <el-select size="mini" v-model="cityCode" @change="integral"  placeholder="请选择">
               <el-option v-for="val in cityList" :label="val.dictionary_name" :value="val.variable.city_code" :key="val.id"></el-option>
              </el-select>
            </el-form>
      </div>
      <div class="highSearch">
        <el-form :inline="true" size="mini">
          <el-button type="primary" size="small" @click="openModalDialog()">增加</el-button>
        </el-form>
      </div>
    </div>    
    <div class="main" >
      <div class="blueTable">
        <el-table :data="consractList"  style="width: 100%">
          <el-table-column label="入库时间" prop="operate_time">
          </el-table-column>
          <el-table-column label="城市" prop="city_name">
          </el-table-column>
          <el-table-column label="数量(收)" prop="collect_amount">
          </el-table-column>
          <el-table-column label="数量(租)" prop="rent_amount">
          </el-table-column>
          <el-table-column label="操作人" prop="operator.real_name">
          </el-table-column>
          <el-table-column label="现剩余(收)" prop="collect_remain">
          </el-table-column>
          <el-table-column label="现剩余(租)" prop="rent_remain">
          </el-table-column>
           <el-table-column
            label="操作"
            width="150px">
            <template slot-scope="scope">
              <el-button class="buttonself"
                size="mini"
                type="text"
                @click="handleEdit(scope.$index, scope.row)">编辑
              </el-button>
            </template>
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
 <AddContrac :addContracDialog="addContracDialog" :newOrChange="newOrChange" :formDetail="formDetail"  @cityCodeflag="cityCodeflag" :cityList="cityList" @close="addContracDialog = false"></AddContrac>
  </div>
</template>

<script>
  import AddContrac from "./AddContrac.vue";
export default {
  props: ["newAdd", "contractInfoDialog","ToCityList"],
  components: {AddContrac},
  data() {
    return {
      rightMenuX: 0,
      rightMenuY: 0,
      show: false,
      lists: [],     
      contractInfoDialogVisible: false,
      addContracDialog:false,
      cityList:[],
      inputflag:'',
      cityCode:'01',
      newOrChange:'',
      formDetail:[],
      contratcadd:true,
      firstcode:'01',
      consractList:[],
      totalNumber:0,
      form:{
        limit:12,
        page:1,
      },
    };
  },
  watch: {
    ToCityList(val){
      this.cityList=val;
    },
    contractInfoDialog(val) {
      this.contractInfoDialogVisible = val;
    },
    contractInfoDialogVisible(val) {
      if (!val) {
        this.$emit("close");
        this.$emit('contratcadd',this.contratcadd)
      }
    }
  },
  mounted() {
    this.integral(this.firstcode);
  },
   methods: {
      openModalDialog(){
        this.addContracDialog =true;
        this.newOrChange="新增";
      },
      handleCurrentChange(val) {
        console.log(`当前页: ${val}`);
        this.form.page=val;
        this.detail();
      },
      handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
      },
      handleEdit(index,row){
        this.formDetail=row;
        this.addContracDialog =true;
        this.newOrChange="修改";
      },

      integral(val) {
        this.cityCode=val;
        this.detail()
      },
      detail(val) {
        this.consractList=[];
        this.$http
        .get(globalConfig.server + "contract/reserve/detail/" + this.cityCode, { params: this.form })
        .then(res => {
          if (res.data.code === "20000") {
              this.consractList=res.data.data.data;
              this.totalNumber = res.data.data.count;
               for(let i=0;i<this.cityList.length;i++){
                for(let j=0;j<res.data.data.data.length;j++){
                  if(res.data.data.data[j].city_code == this.cityList[i].variable.city_code)
                  {
                    this.consractList[j].city_name=this.cityList[i].dictionary_name
                  }

                }
              }             
          }
          else{
            this.form.page=1;
            this.totalNumber=0;
          }
          
        }); 
      }, 
    //新增完以后的回调
    cityCodeflag(val){
      if(val){
        this.integral(val);
        
      }
    },       
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
    margin-top:20px;
  }
  .blueTable{
    height:400px;
    overflow:auto;
  }
  .tableBottom {
    padding: 8px;
    display: flex;
    justify-content: flex-end;
    padding-right:40px;
  }
  .buttonself {display: none;}
  tbody tr:first-child .buttonself {
    display: block !important;
    padding-left: 50px;
  }
</style>
