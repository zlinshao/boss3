<template>
  <div id="complainList">
    <el-dialog  :close-on-click-modal="false" :visible.sync="complainListVisible" center width="75%">
        <el-table :data="tableData" style="width: 100%" max-height="450" align="center">
            <el-table-column
                prop="create_time"
                label="投诉时间"
                width="180">
            </el-table-column>
            <el-table-column
                prop="matters"
                label="投诉内容"
                width="180">
            </el-table-column>
            <el-table-column
                prop="follow_status"
                label="状态">
                <template slot-scope="scope">
                      <span v-if="scope.row.follow_status">{{scope.row.follow_status}}</span>
                      <span v-if="!scope.row.follow_status">/</span>
                </template>
            </el-table-column>
            <el-table-column
                prop="content"
                label="处理结果">
                <template slot-scope="scope">
                      <span v-if="scope.row.content">{{scope.row.content}}</span>
                      <span v-if="!scope.row.content">/</span>
                </template>
            </el-table-column>
            <el-table-column
                prop="accountability_info"
                label="认责结果">
                <template slot-scope="scope">
                    <span v-if="scope.row.accountability_info" v-html="joinStr(scope.row.accountability_info.dutyInfo)">
                          <!-- {{joinStr(scope.row.accountability_info.dutyInfo)}} -->
                    </span>
                      <div v-if="scope.row.accountability_info">认责结果 : {{scope.row.accountability_info.dutyRes}}</div>
                      <span v-if="!scope.row.accountability_info">/</span>
                </template>
            </el-table-column>
        </el-table>
        <el-dialog width="80%"  title="投诉详情" :visible.sync="complainInfoDialog" append-to-body>

        </el-dialog>
        <div slot="footer" class="dialog-footer">
        <el-button @click="complainListVisible = false">关闭</el-button>
        </div>
    </el-dialog>
  </div>
</template>

<script>
  export default {
    props:['complainListDialog', 'complainData'],
    data() {
      return {
        complainListVisible: false,
        complainInfoDialog: false,
        tableData: [],
        dutyList:[],
      };
    },
    watch:{
        complainListDialog(val){
            this.complainListVisible = val
        },
        complainListVisible(val){
            if(!val){
                this.$emit('close')
            }
        },
        complainData(val){
            this.tableData = val.data.reverse();
            console.log(val.data)
        }
    },
    methods:{
        showComplainInfo(row, event, column){
            this.complainInfoDialog = true;
        },
        joinStr(list){
            let str = '';
            list.forEach(item => {
                item.dutyUserName = item.dutyUserName == undefined ? '' : item.dutyUserName;
                str += item.dutyUserName + item.dutyName + '认责金额: ' + item.dutyMoney  + '</br>'
            });
            return str
        }
    }
  }
</script>
<style lang="scss">
  .el-dialog__header{
      border-bottom: none !important;
  }

</style>