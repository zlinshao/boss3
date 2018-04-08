<template>
  <div id="addFollowUp">
    <el-dialog title="客户详情" :visible.sync="orderDetailDialogVisible" width="60%">
      <div class="scroll_bar">
        <div class="title">基本信息</div>
        <div  class="describe_border">
          <el-form size="small" label-width="80px">
            <el-row>
              <el-col :span="6">
                <el-form-item label="姓名">
                  <div class="content">{{customerDetail.name}}</div>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="性别">
                  <div class="content" v-if="customerDetail.sex == 2">女</div>
                  <div class="content" v-if="customerDetail.sex == 1">男</div>
                </el-form-item>
              </el-col>              
              <el-col :span="6">
                <el-form-item label="联系方式">
                  <div class="content">{{customerDetail.phone}}</div>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="身份证件号">
                  <div class="content">{{customerDetail.idcard}}</div>
                </el-form-item>
              </el-col>            
            </el-row>

          </el-form>
        </div>
        <div class="title">操作人信息</div>
        <div  class="describe_border">
          <el-form size="small" label-width="80px">
            <el-row>
              <el-col :span="6">
                <el-form-item label="姓名">
                  <div class="content" v-if="customerDetail.user">{{customerDetail.user.name}}</div>
                  <div class="content" v-else>暂时数据</div>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="联系方式">
                  <div class="content" v-if="customerDetail.user">{{customerDetail.user.phone}}</div>
                  <div class="content" v-else>暂时数据</div>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </div>
        <div class="title">负责人信息</div>
        <div  class="describe_border">
          <el-form size="small" label-width="80px">
            <el-row>
              <el-col :span="6">
                <el-form-item label="姓名">
                  <div class="content" v-if="customerDetail.detail">{{customerDetail.detail.name}}</div>
                  <div class="content" v-else>暂时数据</div>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="联系方式">
                  <div class="content" v-if="customerDetail.detail">{{customerDetail.detail.mobile}}</div>
                  <div class="content" v-else>暂时数据</div>  
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <!--<el-button size="small" @click="orderDetailDialogVisible = false">取 消</el-button>-->
        <!--<el-button size="small" type="primary" @click="confirmAdd">确 定</el-button>-->
      </span>
    </el-dialog>

  </div>
</template>

<script>


  export default {
    name:'addFollowUp',
    props:['customerDetailDialog','activeId'],

    data() {
      return {
        orderDetailDialogVisible:false,
        customerDetail:{},
        customerId:'',
      };
    },
    watch:{
      customerDetailDialog(val){
        this.orderDetailDialogVisible = val
      },
      orderDetailDialogVisible(val){
        if(!val){
          this.$emit('close');
        }
      },
      activeId(val){
        this.customerId=val;
        this.getDetail();
      }
    },
    mounted(){

    },
    methods:{
      getDetail(){
        this.$http.get(globalConfig.server+'core/customer/'+this.customerId).then((res) => {
          if(res.data.code === "10020"){
            this.customerDetail = res.data.data;
          }
        });
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
  }

</style>
