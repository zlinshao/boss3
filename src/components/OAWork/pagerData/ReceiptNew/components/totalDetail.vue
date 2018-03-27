<template>
  <div>
    <el-dialog title="收据汇总详情" :visible.sync="totalDialogVisible">
      <div class="scroll_bar">
        <div class="title">收据信息</div>
        <div class="table_border">
          <el-table
            :data="collectArray"
            stripe
            style="width: 100%">
            <el-table-column
              prop="report_time"
              label="历史领取日期">
            </el-table-column>
            <el-table-column
              label="剩余未缴收房收据（LJSF）">
              <template slot-scope="scope">
                <el-popover
                  ref="popover2"
                  width="400"
                  trigger="click">
                  <div style="text-align: center;" v-if="scope.row.collect.concat(scope.row.collect_allocated).length<1">暂无数据</div>
                  <span v-if="scope.row.collect.concat(scope.row.collect_allocated).length>0"
                        v-for="item in scope.row.collect.concat(scope.row.collect_allocated)">
                    {{item}} &nbsp;&nbsp;
                  </span>
                </el-popover>
                <el-button size="mini" type="text" v-popover:popover2>
                  详情
                  ({{scope.row.collect.concat(scope.row.collect_allocated).length}}份)
                </el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>

        <div class="title">操作记录</div>
        <div class="describe_border">
          <div v-for="item in operateArray">
            <span style="color: #409EFF">{{item.full_text}}:</span>
            <span v-if="item.trace.length>0" v-for="(trace,index) in item.trace">
              {{trace.time}}&nbsp;{{trace.oldStaff}} 分配给
              {{trace.newStaff}}<span v-if="index<item.trace.length-1">；</span><span v-else="">。</span>&nbsp;&nbsp;
            </span>
          </div>
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button size="small" @click="totalDialogVisible = false">取 消</el-button>
        <el-button size="small" type="primary" @click="totalDialogVisible = false">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
  export default {
    props:['totalDialog','totalId_detail'],
    data() {
      return {
        totalDialogVisible:false,
        tableData:[],
        collectArray:[],
        operateArray:[],
      };
    },
    watch:{
      totalDialog(val){
        this.totalDialogVisible = val
      },
      totalDialogVisible(val){
        if(!val){
          this.$emit('close')
        }
      },
      totalId_detail(val){
        this.getDetail();
      },
    },
    methods:{
      getDetail(){
        this.$http.get(globalConfig.server + 'contract/mission/' + this.totalId_detail).then((res) => {
          if (res.data.code === '20000') {
            this.collectArray = res.data.data.data;
            this.operateArray = res.data.data.extra;
          }else {
            this.collectArray = [];
            this.operateArray = [];
          }
        });
      }
    }
  };
</script>
<style lang="scss" scoped="">

</style>
