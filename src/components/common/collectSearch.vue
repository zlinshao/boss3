<template>
  <div id="mapSearchId">
    <el-dialog :close-on-click-modal="false" title="房屋选择" :visible.sync="collectDialogVisible" width="50%" :before-close="closeDialog">
      <div class="content">
        <div class="filter-container">
          <el-form :inline="true" onsubmit="return false" size="mini" class="demo-form-inline">

            <el-form-item>
              <el-input v-model="params.search" placeholder="请输入内容" class="input-with-select"  @keyup.enter.native="search" clearable>
                <el-button slot="append" icon="el-icon-search" @click="search"></el-button>
              </el-input>
            </el-form-item>
          </el-form>
        </div>
        <div class="tableList scroll_bar">
          <el-table :data="tableData" @row-click="rowClick" style="width: 100%"
                    :empty-text='tableStatus'
                    v-loading="tableLoading"
                    element-loading-text="拼命加载中"
                    element-loading-spinner="el-icon-loading"
                    element-loading-background="rgba(255, 255, 255, 0)">
            <el-table-column width="65">
              <template slot-scope="scope">
                <el-radio v-model="radio" :label="scope.row.contract_id">
                  <span style="display: none">1</span>
                </el-radio>
              </template>
            </el-table-column>
            <el-table-column
              width="136px"
              label="合同上传时间">
              <template slot-scope="scope">
                <span v-if="scope.row.contract_create_time">{{scope.row.contract_create_time}}</span>
                <span v-if="!scope.row.contract_create_time">暂无</span>
              </template>
            </el-table-column>
            <el-table-column
              prop="contract_number"
              label="合同编号">
              <template slot-scope="scope">
                <span v-if="scope.row.contract_number">{{scope.row.contract_number}}</span>
                <span v-if="!scope.row.contract_number">暂无</span>
              </template>
            </el-table-column>
            <el-table-column
              label="房屋地址">
              <template slot-scope="scope">
                <span v-if="scope.row.address">{{scope.row.address}}</span>
                <span v-else="">/</span>
              </template>
            </el-table-column>
            <el-table-column
              label="业主姓名">
              <template slot-scope="scope">
                <span v-if="scope.row.customer_name">{{scope.row.customer_name}}</span>
                <span v-else="">/</span>
              </template>
            </el-table-column>
            <el-table-column
              prop="staff_name"
              width="80px;"
              label="开单人">
              <template slot-scope="scope">
                <span v-if="scope.row.staff_name">{{scope.row.staff_name}}</span>
                <span v-if="!scope.row.staff_name">暂无</span>
              </template>
            </el-table-column>

            <el-table-column
              label="负责人">
              <template slot-scope="scope">
                <span v-if="scope.row.leader_name">{{scope.row.leader_name}}</span>
                <span v-else="">/</span>
              </template>
            </el-table-column>
            <el-table-column
              prop="department_name"
              label="部门">
              <template slot-scope="scope">
                <span v-if="scope.row.department && scope.row.department.name">{{scope.row.department.name}}</span>
                <span v-else>暂无</span>
              </template>
            </el-table-column>
            <el-table-column
              label="合同状态">
              <template slot-scope="scope">
                <span v-if="scope.row.type">{{scope.row.type}}</span>
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
    props:['collectDialog'],
    data () {
      return {
        collectDialogVisible: false,
        tableData :[],
        radio:'',
        selectedItem : [],
        params: {
          page: 1,
          limit: 12,
          search: '',      //模糊搜索
        },
        tableStatus: '暂无数据',
        tableLoading: false,
      }
    },

    mounted(){

    },
    watch:{
      collectDialog(val){
        this.collectDialogVisible = val
      },
      collectDialogVisible(val) {
        if (!val) {
          this.$emit('close');
        }
      }
    },
    methods:{
      search(){ //关键词 搜索
        this.tableStatus = " ";
        this.tableLoading = true;
        this.$http.get(globalConfig.server + 'lease/collect', {params: this.params}).then((res) => {
          this.tableLoading = false;
          if (res.data.code === '61010') {
            this.tableData = res.data.data;
            if (res.data.data.length < 1) {
              this.tableData = [];
              this.tableStatus = '暂无数据';
            }
          } else {
            this.tableData = [];
            this.rentStatus = '暂无数据';
          }
        })
      },
      closeDialog(done){    //关闭模态框回调
        if(done === 'yes'){
           if(this.selectedItem.contract_id){
             this.$emit('close',this.selectedItem);
             this.collectDialogVisible = false;
             this.selectedItem = [];
             this.radio = '';
           } else {
             this.$notify.warning({
               title:'警告',
               message : '您尚未选择房屋地址'
             })
           }
        }else {
          this.collectDialogVisible = false;
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
