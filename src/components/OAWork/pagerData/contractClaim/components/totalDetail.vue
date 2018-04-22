<template>
  <div>
    <el-dialog :close-on-click-modal="false" title="合同汇总详情" :visible.sync="totalDialogVisible" width="60%">
      <div class="scroll_bar">
        <el-tabs v-model="activeName">
          <el-tab-pane label="分类" name="first">
            <div class="title">合同信息</div>
            <div class="table_border">
              <el-table
                :data="collectArray"
                stripe
                :row-key="getRowKeys"
                :expand-row-keys="expands"
                @row-click="handlerClick"
                style="width: 100%">
                <el-table-column type="expand" >
                  <template slot-scope="scope">
                    <el-form class="demo-table-expand">
                      <div class="title">剩余未缴收房合同（LJSF）</div>
                      <div class="describe_border">
                        <div style="text-align: center;" v-if="scope.row.collect.concat(scope.row.collect_allocated).length<1">暂无数据</div>
                        <el-row>
                          <el-col :span="3" v-if="scope.row.collect.concat(scope.row.collect_allocated).length>0"
                                  v-for="item in scope.row.collect.concat(scope.row.collect_allocated)" :key="item">
                            {{item}}
                          </el-col>
                        </el-row>
                      </div>
                      <div class="title">剩余未缴租房合同（LJZF）</div>
                      <div class="describe_border">
                        <div style="text-align: center;" v-if="scope.row.rent.concat(scope.row.rent_allocated).length<1">暂无数据</div>
                        <el-row>
                          <el-col :span="3"  v-if="scope.row.rent.concat(scope.row.rent_allocated).length>0"
                                  v-for="item in scope.row.rent.concat(scope.row.rent_allocated)" :key="item">
                            {{item}}
                          </el-col>
                        </el-row>
                      </div>
                    </el-form>
                  </template>
                </el-table-column>
                <el-table-column
                  prop="report_time"
                  label="历史领取日期">
                </el-table-column>
                <el-table-column
                  label="剩余未缴收房合同（LJSF）">
                  <template slot-scope="scope">
                <span v-if="scope.row.collect.concat(scope.row.collect_allocated).length>0">
                  {{scope.row.collect.concat(scope.row.collect_allocated).length}}份
                </span>
                    <span v-else="">/</span>
                  </template>
                </el-table-column>
                <el-table-column
                  label="剩余未缴租房合同（LJZF)">
                  <template slot-scope="scope">
                <span v-if="scope.row.rent.concat(scope.row.rent_allocated).length>0">
                  {{scope.row.rent.concat(scope.row.rent_allocated).length}}份
                </span>
                    <span v-else="">/</span>
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
          </el-tab-pane>
          <el-tab-pane label="全部" name="second">
            <div class="title">剩余未缴收房合同（LJSF）</div>
            <div class="describe_border">
              <el-row>
                <el-col :span="3" v-for="(item,index) in totalCollectArray" :key="index">
                  {{item}}
                </el-col>
              </el-row>
            </div>
            <div class="title">剩余未缴租房合同（LJZF）</div>
            <div class="describe_border">
              <el-row>
                <el-col :span="3" v-for="(item,index) in totalRentArray" :key="index">
                  {{item}}
                </el-col>
              </el-row>
            </div>
          </el-tab-pane>
        </el-tabs>
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
        // 要展开的行，数值的元素是row的key值
        expands: [],
        activeName:'first',
        totalCollectArray:[],
        totalRentArray:[],
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
        this.collectArray = [];
        this.operateArray = [];
        this.totalCollectArray = [];
        this.totalRentArray = [];
      },
    },
    methods:{
      getDetail(){
        this.$http.get(globalConfig.server + 'contract/mission/' + this.totalId_detail).then((res) => {
          if (res.data.code === '20000') {
            this.collectArray = res.data.data.data;
            this.operateArray = res.data.data.extra;
            this.collectArray.forEach((item)=>{
              this.totalCollectArray = this.totalCollectArray.concat(item.collect,item.collect_allocated);
              this.totalRentArray = this.totalRentArray.concat(item.rent,item.rent_allocated);
            })
          }else {
            this.collectArray = [];
            this.operateArray = [];
          }
        });
      },
      // 获取row的key值
      getRowKeys(row) {
        return row.id;
      },
      handlerClick(row, event, column){
        if(this.expands.length<1){
          this.expands.push(row.id);
        }else {
          if(this.expands[0] != row.id){
            this.expands = [];
            this.expands.push(row.id);
          }else {
            this.expands = [];
          }
        }
      },
    }
  };
</script>
<style lang="scss" scoped="">
  .demo-table-expand{
    text-align: left !important;
  }
  .scroll_bar{
    padding: 0;
  }
</style>
