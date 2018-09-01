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
                <el-form-item label="当前入住人数">
                  <div class="content">{{live_num}}</div>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="剩余床位">
                  <div class="content">{{last_bed}}</div>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="片区经理">
                  <div class="content">{{leader.leader_name}}</div>
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
                                            'circle_orange': item.operate_type==3, 'circle_blue': item.operate_type==4,
                                            'circle_red': item.operate_type==5}"></div>
              <div class="stretchLine"></div>
            </div>
            <div class="itemContent">
              <div v-if="item.operate_type==1">
                <span><b>开始时间：</b>{{item.operate_content.start_time}}；</span>
                <span>{{item.operate_content.content}}；</span>
                <span v-if="item.remarks"><b>备注：</b>{{item.remarks}}</span>
              </div>
              <div v-else-if="item.operate_type==2">
                <span><b>入住时间</b>：{{item.operate_content.guests&&item.operate_content.guests[0].live_time}}；</span>
                <span>
                  <span>入住{{item.operate_content.total}}人，入住人员是</span>
                  <span v-for="number in item.operate_content.guests">
                    <b>{{number.guest_depart_name}}</b>: <b style="color: #409EFF">{{number.guest_name}}</b>，
                  </span>
                </span>
                <span v-if="item.remarks"><b>备注：</b>{{item.remarks}}</span>
              </div>
              <div v-else-if="item.operate_type==3">
                <span><b>离宿时间</b>：{{item.operate_content.guests&&item.operate_content.guests[0].out_time}}；</span>
                <span>
                  <span>离宿{{item.operate_content.total}}人，离宿人员是</span>
                  <span v-for="number in item.operate_content.guests">
                    <b>{{number.guest_depart_name}}</b>: <b style="color: #409EFF">{{number.guest_name}}</b>，
                  </span>
                </span>
                <span v-if="item.remarks"><b>备注：</b>{{item.remarks}}</span>
              </div>
              <div v-if="item.operate_type==4">
                <span><b>结束时间：</b>{{item.operate_content.end_at}}；</span>
                <span>{{item.operate_content.content}}；</span>
                <span v-if="item.remarks"><b>备注：</b>{{item.remarks}}</span>
              </div>
              <div v-if="item.operate_type==5">
                <span><b>更新时间：</b>{{item.operate_time}}；</span>
                <span>{{item.operate_content.content}}；</span>
                <span v-if="item.remarks"><b>备注：</b>{{item.remarks}}</span>
              </div>
            </div>
            <div class="itemOperate">
              <i class="el-icon-edit-outline" @click="editItem(item)"></i>
            </div>
          </div>
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <!--<el-button size="small" @click="dormDetailDialogVisible = false">取 消</el-button>-->
        <!--<el-button size="small" type="primary">确 定</el-button>-->
      </span>
    </el-dialog>
    <UpdateRecord :updateRecordDialog="updateRecordDialog" :currentRow="currentRow" @close="closeModal"></UpdateRecord>
  </div>
</template>

<script>
  import UpdateRecord from './updateRecord'

  export default {
    props: ['dormDetailDialog', 'house_id'],
    components: {UpdateRecord},
    data() {
      return {
        dormDetailDialogVisible: false,
        operateArray: [],
        houseArray: {},
        guest: {},
        leader: {},
        live_num: '',
        last_bed: '',
        updateRecordDialog: false,
        currentRow: {},
      }
    },
    watch: {
      dormDetailDialog(val) {
        this.dormDetailDialogVisible = val;
      },
      dormDetailDialogVisible(val) {
        if (!val) {
          this.$emit('close');
          this.operateArray = [];
          this.houseArray = {};
          this.guest = {};
          this.leader = {};
          this.live_num = '';
          this.last_bed = '';
        } else {
          this.getData();
        }
      },

    },
    methods: {
      getData() {
        this.$http.get(globalConfig.server + 'api/v1/house-detail?house_id=' + this.house_id).then(res => {
          if (res.data.code === '60014') {
            this.live_num = res.data.info.live_num;
            this.last_bed = res.data.info.last_bed;
            this.operateArray = res.data.info.operator;
            this.houseArray = res.data.info.house;
            this.guest = res.data.info.guest;
            this.leader = res.data.info.leader;
          }
        })
      },

      editItem(data) {
        this.currentRow = data;
        this.currentRow.house_type = 2;
        this.updateRecordDialog = true
      },
      closeModal(val) {
        this.updateRecordDialog = false;
        if (val === 'success') {
          this.getData();
        }
      },
    },
  }
</script>

<style scoped lang="scss">
  .content {
    height: 28px;
    line-height: 28px;
    background-color: #f5f7fa;
    color: #7c7f84;
    border-radius: 4px;
    border: 1px solid #dcdfe6;
    padding: 0 15px;
  }

  .operateItem {
    display: flex;
    min-height: 70px;
    color: #333;

    .itemTitle {
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
      .stretchLine {
        border-right: 1px solid #d6d6d6;
        flex-grow: 1;
      }
    }
    .itemContent {
      flex-grow: 1;
      padding: 10px 20px;
    }
    .itemOperate {
      min-width: 50px;
      line-height: 50px;
      font-size: 16px;
      text-align: center;
      cursor: pointer;
    }
    .circle_green {
      background: #5cff6f;
    }
    .circle_blue {
      background: #6a8dfb;
    }
    .circle_yellow {
      background: #fbf378;
    }
    .circle_orange {
      background: #fba547;
    }
    .circle_red {
      background: #fb5247;
    }
  }
</style>
