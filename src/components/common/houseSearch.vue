<template>
  <div id="mapSearchId">
    <el-dialog :close-on-click-modal="false" title="房屋选择" :visible.sync="houseDialogVisible" width="40%" :before-close="closeDialog">
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
                <el-radio v-model="radio" :label="scope.row.id">
                  <span style="display: none">1</span>
                </el-radio>
              </template>
            </el-table-column>

            <el-table-column
              label="房屋地址">
              <template slot-scope="scope">
                <span v-if="scope.row.name">{{scope.row.name}}</span>
                <span v-else="">/</span>
              </template>
            </el-table-column>
            <el-table-column
              label="签约人">
              <template slot-scope="scope">
                <span v-if="scope.row.user">{{scope.row.user.name}}</span>
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
    props:['houseDialog'],
    data () {
      return {
        houseDialogVisible: false,
        tableData :[],
        radio:'',
        selectedItem : [],
        params: {
          q: '',
          per_page_number: 50,
          page: 1,
          status : '',
          is_nrcy : 0,
          is_lord : 1,
        },
      }
    },

    mounted(){

    },
    watch:{
      houseDialog(val){
        this.houseDialogVisible = val
      },
      houseDialogVisible(val) {
        if (!val) {
          this.$emit('close');
        }
      }
    },
    methods:{
      search(){ //关键词 搜索
        this.$http.get(globalConfig.server_user + 'houses', {params: this.params}).then((res) => {
          if (res.data.status === 'success') {
            if (res.data.data.length > 0) {
              this.tableData = res.data.data;
            } else {
              this.tableData = [];
            }
          } else {
            this.tableData = [];
          }
        })
      },
      closeDialog(done){    //关闭模态框回调
        if(done === 'yes'){
           if(this.selectedItem.id){
             this.$emit('close',this.selectedItem);
             this.houseDialogVisible = false;
             this.selectedItem = [];
             this.radio = '';
           } else {
             this.$notify.warning({
               title:'警告',
               message : '您尚未选择房屋地址'
             })
           }
        }else {
          this.houseDialogVisible = false;
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
