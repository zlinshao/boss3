<template>
  <div id="mapSearchId">
    <el-dialog :close-on-click-modal="false" title="房屋地址选择" :visible.sync="addressDialogVisible" width="40%" :before-close="closeDialog">
      <div class="content">
        <div class="filter-container">
          <el-form :inline="true" onsubmit="return false" size="mini" class="demo-form-inline">

            <el-form-item>
              <el-input v-model="params.q" placeholder="请输入内容" class="input-with-select"  @keyup.enter.native="search" clearable>
                <el-button slot="append" icon="el-icon-search" @click="search"></el-button>
              </el-input>
            </el-form-item>
          </el-form>
        </div>
        <div class="tableList scroll_bar">
          <el-table :data="tableData" @row-click="rowClick" style="width: 100%">
            <el-table-column width="65">
              <template slot-scope="scope">
                <el-radio v-model="radio" :label="scope.row.contract_id">
                  <span style="display: none">1</span>
                </el-radio>
              </template>

            </el-table-column>

            <el-table-column
              prop="address"
              label="房屋地址">
            </el-table-column>
            <el-table-column
              prop="type"
              label="房屋性质">
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
    props:['addressDialog'],
    data () {
      return {
        addressDialogVisible: false,
        tableData :[],
        radio:'',
        selectedItem : [],
        params: {
          pages: 1,
          q: '',
          limit: 500
        },
      }
    },

    mounted(){

    },
    watch:{
      addressDialog(val){
        this.addressDialogVisible = val
      },
      addressDialogVisible(val) {
        if (!val) {
          this.$emit('close');
        }else {
          this.search();
        }
      }
    },
    methods:{
      search(){ //关键词 搜索线上高德数据
        this.$http.get(globalConfig.server + 'lease/collect', {params: this.params}).then((res) => {
          if (res.data.code === '61010') {
            this.tableData = res.data.data;
          }
        })
      },
      closeDialog(done){    //关闭模态框回调
        if(done === 'yes'){
           if(this.selectedItem.contract_id){
             this.$emit('close',this.selectedItem);
             this.addressDialogVisible = false;
             this.selectedItem = [];
             this.radio = '';
           } else {
             this.$notify.warning({
               title:'警告',
               message : '您尚未选择房屋地址'
             })
           }
        }else {
          this.addressDialogVisible = false;
        }
      },

      rowClick(row, event, column){
        this.radio = row.contract_id;
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
