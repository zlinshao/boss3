<template>
  <div id="visitRecord">
    <el-dialog :close-on-click-modal="false" title="宿舍记录" :visible.sync="dormDetailDialogVisible">
      <div class="scroll_bar">
        <div>
          <el-form size="mini" label-width="100px">
            <el-row>
              <el-col :span="8">
                <el-form-item label="房屋地址">
                  <div class="content">{{houseArray.name}}</div>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="小区地址">
                  <div class="content">{{houseArray.village_name}}</div>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="房型">
                  <div class="content">{{houseArray.house_feature}}</div>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="8">
                <el-form-item label="片区经理">
                  <div class="content"><span v-if="leader.length>0">{{leader[0].leader_name}}</span></div>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="部门">
                  <div class="content"><span v-if="leader.length>0">{{leader[0].leader_depart_name}}</span></div>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </div>
        <div>
          <div class="operateItem" v-for="(item,index) in operateArray">
            <div class="itemTitle">
              <div>{{item.operate_time}}</div>
              <div>{{item.operator_name}}</div>
            </div>
            <div class="itemLIne">
              <div class="line"></div>
              <div class="circle" :class="{ 'circle_green': item.operate_type==1, 'circle_yellow': item.operate_type==2,
                                            'circle_orange': item.operate_type==3, 'circle_blue': item.operate_type==4}"></div>
              <div class="stretchLine"></div>
            </div>
            <div class="itemContent">
              <div v-if="item.operate_type==1">
                <span><b>开始时间：</b>{{item.operate_time}}；</span>
                <span>{{item.operate_content.content}}；</span>
                <span v-if="item.remarks"><b>备注：</b>{{item.remarks}}</span>
              </div>
              <div v-if="item.operate_type==4">
                <span><b>结束时间：</b>{{item.operate_time}}；</span>
                <span>{{item.operate_content.content}}；</span>
                <span v-if="item.remarks"><b>备注：</b>{{item.remarks}}</span>
              </div>
              <div v-if="item.operate_type==5">
                <span><b>开始时间：</b>{{item.operate_time}}；</span>
                <span>{{item.operate_content.content}}；</span>
                <span v-if="item.remarks"><b>备注：</b>{{item.remarks}}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <!--<el-button size="small" @click="dormDetailDialogVisible = false">取 消</el-button>-->
        <!--<el-button size="small" type="primary">确 定</el-button>-->
      </span>
    </el-dialog>
  </div>
</template>

<script>

  export default {
    props: ['dormDetailDialog','house_id'],
    data() {
      return {
        dormDetailDialogVisible: false,
        operateArray : [],
        houseArray : {},
        guest : {},
        leader : [],
        live_num : '',
        last_bed : '',
      }
    },
    watch: {
      dormDetailDialog(val) {
        this.dormDetailDialogVisible = val;
      },
      dormDetailDialogVisible(val) {
        if (!val) {
          this.$emit('close');
        }else {
          this.getData();
        }
      },

    },
    methods: {
      getData(){
        this.$http.get(globalConfig.server+'api/v1/house-detail?house_id='+this.house_id).then(res => {
          if(res.data.code === '60014'){
            this.live_num = res.data.info.live_num;
            this.last_bed = res.data.info.last_bed;
            this.operateArray = res.data.info.operator;
            this.houseArray = res.data.info.house;
            this.guest = res.data.info.guest;
            this.leader = res.data.info.leader;
          }
        })
      },

      initData(){

      },
    },
  }
</script>

<style scoped lang="scss">
  .content{
    height: 28px;
    line-height: 28px;
    background-color: #f5f7fa;
    color: #7c7f84;
    border-radius: 4px;
    border: 1px solid #dcdfe6;
    padding: 0 15px;
  }
  .operateItem{
    display: flex;
    min-height: 70px;
    color: #333;

    .itemTitle{
      min-width: 150px;
      text-align: center;
      padding: 10px 0;
    }
    .itemLIne {
      width: 10px;
      display: flex;
      flex-direction: column;
      align-items: center;

      .line {
        height: 10px;
        border-right: 1px solid #d6d6d6;
      }
      .circle {
        width: 15px;
        height: 15px;
        border-radius: 50%;
      }
      .stretchLine{
        border-right: 1px solid #d6d6d6;
        flex-grow:1;
      }
    }
    .itemContent{
      flex-grow: 1;
      padding: 10px 20px;
    }

    .circle_green{
      background: #5cff6f;
    }
    .circle_blue{
      background: #6a8dfb;
    }
    .circle_yellow{
      background: #fbf378;
    }
    .circle_orange{
      background: #fba547;
    }
  }
</style>
