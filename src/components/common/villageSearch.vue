<template>
  <div id="mapSearchId">
    <el-dialog :close-on-click-modal="false" title="小区选择" :visible.sync="villageDialogVisible" width="40%" :before-close="closeDialog">
      <div class="content">
        <div class="filter-container">
          <el-form :inline="true" onsubmit="return false" size="mini" class="demo-form-inline">
            <el-form-item label="城市">
              <el-select clearable v-model="params.city" placeholder="请选择城市" value="">
                <el-option v-if="cityDictionary.length>0" v-for="item in cityDictionary" :label="item.dictionary_name"
                           :value="item.variable.city_id" :key="item.id"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item>
              <el-input v-model="params.keywords" placeholder="请输入内容" class="input-with-select" @keyup.enter.native="search">
                <el-button slot="append" icon="el-icon-search" @click="search"></el-button>
              </el-input>
            </el-form-item>
          </el-form>
        </div>
        <div class="tableList scroll_bar">
          <el-table :data="tableData" @row-click="rowClick" style="width: 100%">

            <el-table-column width="65">
              <template slot-scope="scope">
                <el-radio v-model="radio" :label="scope.row.id">
                  <span style="display: none">1</span>
                </el-radio>
              </template>
            </el-table-column>
            <el-table-column label="小区名称">
              <template slot-scope="scope">{{ scope.row.village_name}}</template>
            </el-table-column>
            <el-table-column
              prop="address"
              label="小区地址">
            </el-table-column>
            <el-table-column
              label="省份">
              <template slot-scope="scope">
                <span v-if="scope.row.province">{{scope.row.province.province_name}}</span>
                <span v-else="">/</span>
              </template>
            </el-table-column>
            <el-table-column
              label="城市">
              <template slot-scope="scope">
                <span v-if="scope.row.city">{{scope.row.city.city_name}}</span>
                <span v-else="">/</span>
              </template>
            </el-table-column>

          </el-table>
        </div>

      </div>

      <div slot="footer" class="dialog-footer">
        <el-button size="small" @click="closeDialog">取 消</el-button>
        <el-button size="small" type="primary" @click="closeDialog('yes')">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>

  export default {
    props:['villageDialog'],
    data () {
      return {
        villageDialogVisible: false,
        tableData :[],

        radio:'',
        selectedItem : [],
        params: {
          pages: 1,
          keywords: '',
          city: '',
        },
        cityDictionary : [],
        isDictionary : false,
      }
    },

    mounted(){

    },
    watch:{
      villageDialog(val){
        this.villageDialogVisible = val
      },
      villageDialogVisible(val) {
        if (!val) {
          this.$emit('close');
        }else {
          if(!this.isDictionary){
            this.getDictionary();
          }
        }
      },
      selectMember(val){
        this.buttonStatus = !val.length;
      }
    },
    methods:{
       //获取字典
      getDictionary(){
        this.dictionary(306,1).then((res) => {this.cityDictionary = res.data;this.isDictionary = true});
      },
      search(){ //关键词 搜索线上高德数据
        this.$http.get(globalConfig.server + 'setting/community/', {params: this.params}).then((res) => {
          if (res.data.code === '10000') {
            this.tableData = res.data.data.list;
          } else {

          }
        })
      },
      closeDialog(done){    //关闭模态框回调
        if(done === 'yes'){
           if(this.selectedItem.id){
             this.$emit('close',this.selectedItem);
             this.villageDialogVisible = false;
             this.selectedItem = [];
             this.radio = '';
           } else {
             this.$notify.warning({
               title:'警告',
               message : '您尚未选择小区'
             })
           }
        }else {
          this.villageDialogVisible = false;
        }
      },

      rowClick(row, event, column){
        this.radio = row.id;
        this.selectedItem = row;
      },
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped="">
  #mapSearchId{
    .el-dialog__wrapper{
      .el-dialog{
        .el-dialog__body{
          .content{
            .filter-container{
              padding: 16px 0 0 16px;
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
