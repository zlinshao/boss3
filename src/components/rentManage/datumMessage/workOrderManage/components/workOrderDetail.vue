<template>
  <div id="addFollowUp">
    <el-dialog title="工单详情" :visible.sync="orderDetailDialogVisible" width="60%">
      <div class="scroll_bar">
        <div class="title">基本信息</div>
        <div>
          <el-form size="small" label-width="100px">
            <el-row>
              <el-col :span="8">
                <el-form-item label="创建时间">
                  <div class="content">{{workOrderDetail.create_time}}</div>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="创建人">
                  <div class="content">
                    <span v-if="workOrderDetail.creators">{{workOrderDetail.creators[0].name}}</span>
                  </div>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </div>
        <div class="title">事项详情</div>
        <div class="detailItem">
          <el-form size="small" label-width="100px">
            <el-row>
              <el-col :span="8">
                <el-form-item label="工单类型">
                  <div class="content">{{workOrderDetail.types}}</div>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="跟进人">
                  <div class="content">
                    <span v-if="workOrderDetail.follows">{{workOrderDetail.follows[0].name}}</span>
                  </div>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="跟进事项">
                  <div class="content">{{workOrderDetail.matters}}</div>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="8">
                <el-form-item label="跟进状态">
                  <div class="content">{{workOrderDetail.follow_statuss}}</div>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="跟进时间">
                  <div class="content">{{workOrderDetail.follow_time}}</div>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="期待完成时间">
                  <div class="content">{{workOrderDetail.expected_finish_time}}</div>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="24" v-if="workOrderDetail.album">
                <el-form-item label="截图">
                  <img v-if="workOrderDetail.album.image_pic!=[]" data-magnify
                       v-for="(val,key) in workOrderDetail.album.image_pic" :data-src="val[0].uri" :src="val[0].uri" alt="">
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="16">
                <el-form-item label="跟进内容">
                  <div class="content">{{workOrderDetail.follow_content}}</div>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="更新时间">
                  <div class="content">{{workOrderDetail.follow_time}}</div>
                </el-form-item>
              </el-col>
            </el-row>

          </el-form>
        </div>

      </div>
      <span slot="footer" class="dialog-footer">
        <el-button size="small" @click="orderDetailDialogVisible = false">取 消</el-button>
        <el-button size="small" type="primary" @click="confirmAdd">确 定</el-button>
      </span>
    </el-dialog>


  </div>
</template>

<script>
  export default {
    name:'addFollowUp',
    props:['orderDetailDialog','activeId','startDetail'],
    data() {
      return {
        orderDetailDialogVisible:false,
        workOrderDetail:{},
      };
    },
    watch:{
      orderDetailDialog(val){
        this.orderDetailDialogVisible = val
      },
      orderDetailDialogVisible(val){
        if(!val){
          this.$emit('close');
        }else {
          this.isClear = false
        }
      },
      startDetail(val){
        if(val){
          this.getDetail();
        }
      }
    },
    mounted(){

    },
    methods:{
      getDetail(){
        this.$http.get(globalConfig.server+'customer/work_order/'+this.activeId).then((res) => {
          if(res.data.code === "10020"){
            this.workOrderDetail = res.data.data;
          }
        });
      },
      confirmAdd(){

      },
    }
  };
</script>
<style lang="scss" scoped="">
  #addFollowUp{
    .content {
      padding: 0 10px;
      min-height: 32px;
      background: #eef3fc;
      border-radius: 4px;
      font-size: 12px;
      color: #727479;
    }
    img{
      width: 80px;
      height: 80px;
      border-radius: 6px;
      margin: 0 10px 10px 0;
    }
    .detailItem{
      border-bottom: 1px solid #eeeeee;
      /*padding: 40px 0;*/
    }
  }

</style>
