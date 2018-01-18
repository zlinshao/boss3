<template>
  <div id="mapSearchId">
    <el-dialog title="地图" :visible.sync="mapFormVisible" width="785px" :before-close="closeDialog">
      <div class="content">
        <div class="filter-container">
          <el-form :inline="true" class="demo-form-inline">
            <el-form-item>
              <el-select v-model="chooseCity" placeholder="请选择城市">
                <el-option label="南京市" value="南京市"></el-option>
                <el-option label="苏州市" value="苏州市"></el-option>
                <el-option label="杭州市" value="杭州市"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item>
              <el-input v-model="searchInfo" placeholder="请输入内容" class="input-with-select" @keyup.enter.native="search">
                <el-button slot="append" icon="el-icon-search" @click="search"></el-button>
              </el-input>
            </el-form-item>
          </el-form>
        </div>

        <div class="tableList scroll_bar">
          <el-table :data="tableData" style="width: 100%">
            <el-table-column width="65">
              <template slot-scope="scope">
                <el-radio @change="selectInfo(scope.row)" v-model="radio" :label="scope.row.id">
                  <span style="display: none">1</span>
                </el-radio>
              </template>
            </el-table-column>

            <el-table-column label="小区名称">
              <template slot-scope="scope">{{ scope.row.name }}</template>
            </el-table-column>
            <el-table-column
              prop="district"
              label="行政地区">
            </el-table-column>
            <el-table-column
              prop="address"
              label="小区地址">
            </el-table-column>
          </el-table>
        </div>

      </div>

      <div slot="footer" class="dialog-footer">
        <el-button @click="closeDialog">取 消</el-button>
        <el-button type="primary" @click="closeDialog('yes')">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>

  let addr="//restapi.amap.com/v3/assistant/inputtips?key=2cafb0027aa13d1c6b13542462b3c94f&datatype=poi&types=120300";
  export default {
    props:['FormVisible'],
    data () {
      return {
        mapFormVisible: false,
        tableData :[],
        chooseCity:'',
        searchInfo : '',
        radio:'1',
        selectDate:[],
        selectedItem : [],
      }
    },

    mounted(){

    },
    watch:{
      FormVisible(val){
        this.mapFormVisible = val
      },
      mapFormVisible(val){
        if(!val){
          this.$emit('close')
        }
      },
      selectMember(val){
        if(val.length){
          this.buttonStatus = false
        }else {
          this.buttonStatus = true
        }
      }
    },
    methods:{
      search(){ //关键词 搜索线上高德数据
        this.$http.defaults.withCredentials = false;
        this.$http.defaults.headers = {};
        this.$http.get(addr+'&keywords='+this.searchInfo+'&city='+this.chooseCity).then((res) => {
            if(res.data.tips.length>0){
              this.$message({message:'这是一条成功提示',type:'success'});

              //过滤掉没有地址的数据
              this.tableData = res.data.tips.filter((x) =>{
                  return typeof x.address === 'string'
              })

            }else {
              this.$message({message:'这是一条失败提示',type:'error'});
            }
        });
        this.$http.defaults.withCredentials = true;
      },
      closeDialog(done){    //关闭模态框回调
          this.mapFormVisible = false;
        if(done === 'yes' && this.selectedItem !== []){
          this.tableData =[];
          this.chooseCity='';
          this.searchInfo = '';
          console.log(this.selectedItem)
        }
      },
      selectInfo(data){ //单选框选中数据
        this.selectedItem = [];
        this.selectedItem = data;
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped="">
  #mapSearchId{
    .el-dialog__wrapper{
      .el-dialog{
        /*.el-dialog__header{*/
          /*.el-dialog__title{*/
            /*font-size: 16px;*/
          /*}*/
        /*}*/
        .el-dialog__body{
          .content{
            .filter-container{

            }
            .tableList{
              height: 400px;
              overflow: auto;
            }
          }
        }
      }
    }
  }

</style>
