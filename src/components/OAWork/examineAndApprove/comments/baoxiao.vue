<template>
  <div class="modalFrame ">
    <el-dialog :close-on-click-modal="false" title="报销流程" :visible.sync="reimbursement" width="50%">
      <div class="scroll_bar">
        <el-form :model="form" size="mini" label-width="100px">
          <div v-for="item in number">
            <el-form-item :label="'报销明细('+item+')'">
              <el-button v-if="item>1" type="text" size="mini" style="float: right" @click="deleteNumber(item-1)">删除</el-button>
            </el-form-item>
            <el-row>
              <el-col :span="12">
                <el-form-item label="报销金额(元)" required="">
                  <el-input type="number" v-model="reimbursement_amount[item-1]" placeholder="请输入数字(必填)">
                  </el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="报销类别" required="">
                  <el-input v-model="reimbursement_type[item-1]" placeholder="如:采购经费、活动经费(必填)">
                  </el-input>
                </el-form-item>
              </el-col>
            </el-row>

            <el-form-item label="费用明细">
              <el-input v-model="reimbursement_cost_details[item-1]" type="textarea"
                        :autosize="{minRows: 2, maxRows: 4}" placeholder="请输入费用明细描述"></el-input>
            </el-form-item>
          </div>


          <el-form-item>
            <el-button @click="addNumber">
              <i class="el-icon-plus"></i>增加报销明细
            </el-button>
          </el-form-item>

          <el-form-item label="总报销金额(元):">
            <span>{{totalMoney}}元</span>
          </el-form-item>

          <el-form-item label="图片">
            <div class="upLoad">
              <el-upload
                action="https://jsonplaceholder.typicode.com/posts/"
                list-type="picture-card"
                :on-preview="handlePictureCardPreview"
                :on-remove="handleRemove">
                <i class="el-icon-plus"></i>
              </el-upload>
            </div>
          </el-form-item>

          <el-form-item label=附件>
            <div class="upLoad">
              <el-upload
                action="https://jsonplaceholder.typicode.com/posts/"
                list-type="picture-card"
                :on-preview="handlePictureCardPreview"
                :on-remove="handleRemove">
                <i class="el-icon-plus"></i>
              </el-upload>
            </div>
          </el-form-item>

          <el-form-item label="审批人">
            <div class="upLoad">
              <el-row>
                <el-col>
                  <div class="remind">审批人已由管理员预置,并将自动去重</div>
                </el-col>
              </el-row>

              <el-row>
                <el-col :span="2">
                  <div class="conservator">
                    <div class="conservatorInfo">
                      <img src="../../../../assets/images/情人节.png" alt="">
                      <div class="conservatorName">张琳琳</div>
                    </div>
                  </div>
                </el-col>
                <el-col :span="1">
                  <div class="picSign">
                    <i class="el-icon-arrow-right"></i>
                  </div>
                </el-col>

                <el-col :span="2">
                  <div class="conservator">
                    <div class="conservatorInfo">
                      <img src="../../../../assets/images/情人节.png" alt="">
                      <div class="conservatorName">张琳琳</div>
                    </div>
                    <div class="grade">第1级主管</div>
                  </div>
                </el-col>
              </el-row>
            </div>
          </el-form-item>

          <el-form-item label="抄送人">
            <div class="upLoad ">
              <el-row>
                <el-col>
                  <div class="remind">审批通过后，通知抄送人</div>
                </el-col>
              </el-row>
              <div class="examine">
                <div class="conservator">
                  <div class="conservatorInfo">
                    <img src="../../../../assets/images/情人节.png" alt="">
                    <div class="conservatorName">张琳琳</div>
                  </div>
                </div>

                <div class="conservator">
                  <div class="conservatorInfo">
                    <img src="../../../../assets/images/情人节.png" alt="">
                    <div class="conservatorName">张琳琳</div>
                  </div>
                </div>

                <div class="conservator">
                  <div class="conservatorInfo">
                    <img src="../../../../assets/images/情人节.png" alt="">
                    <div class="conservatorName">张琳琳</div>
                  </div>
                </div>

                <div class="conservator">
                  <div class="conservatorInfo">
                    <img src="../../../../assets/images/情人节.png" alt="">
                    <div class="conservatorName">张琳琳</div>
                  </div>
                </div>
                <div class="conservator">
                  <div class="conservatorInfo">
                    <img src="../../../../assets/images/情人节.png" alt="">
                    <div class="conservatorName">张琳琳</div>
                  </div>
                </div>

                <div class="conservator">
                  <div class="conservatorInfo">
                    <img src="../../../../assets/images/情人节.png" alt="">
                    <div class="conservatorName">张琳琳</div>
                  </div>
                </div>

                <div class="conservator">
                  <div class="conservatorInfo">
                    <img src="../../../../assets/images/情人节.png" alt="">
                    <div class="conservatorName">张琳琳</div>
                  </div>
                </div>

                <div class="conservator">
                  <div class="conservatorInfo">
                    <img src="../../../../assets/images/情人节.png" alt="">
                    <div class="conservatorName">张琳琳</div>
                  </div>
                </div>
                <div class="conservator">
                  <div class="conservatorInfo">
                    <img src="../../../../assets/images/情人节.png" alt="">
                    <div class="conservatorName">张琳琳</div>
                  </div>
                </div>

                <div class="conservator">
                  <div class="conservatorInfo">
                    <img src="../../../../assets/images/情人节.png" alt="">
                    <div class="conservatorName">张琳琳</div>
                  </div>
                </div>

                <div class="conservator">
                  <div class="conservatorInfo">
                    <img src="../../../../assets/images/情人节.png" alt="">
                    <div class="conservatorName">张琳琳</div>
                  </div>
                </div>

                <div class="conservator">
                  <div class="conservatorInfo">
                    <img src="../../../../assets/images/情人节.png" alt="">
                    <div class="conservatorName">张琳琳</div>
                  </div>
                </div>
                <div class="conservator">
                  <div class="conservatorInfo">
                    <img src="../../../../assets/images/情人节.png" alt="">
                    <div class="conservatorName">张琳琳</div>
                  </div>
                </div>

                <div class="conservator">
                  <div class="conservatorInfo">
                    <img src="../../../../assets/images/情人节.png" alt="">
                    <div class="conservatorName">张琳琳</div>
                  </div>
                </div>

                <div class="conservator">
                  <div class="conservatorInfo">
                    <img src="../../../../assets/images/情人节.png" alt="">
                    <div class="conservatorName">张琳琳</div>
                  </div>
                </div>

                <div class="conservator">
                  <div class="conservatorInfo">
                    <img src="../../../../assets/images/情人节.png" alt="">
                    <div class="conservatorName">张琳琳</div>
                  </div>
                </div>

                <div>
                  <el-button type="text">添加抄送人</el-button>
                </div>
              </div>

            </div>
          </el-form-item>
        </el-form>



      </div>
      <span slot="footer">
            <el-button type="primary" size="small" @click="confirmSubmit">提交</el-button>
        </span>
    </el-dialog>
  </div>
</template>

<script>
  import Dropzone from '../../../common/dropzone.vue'
  export default {
    props: ['module'],
    components:{Dropzone},
    data () {
      return {
        reimbursement: false,           //报销申请
        form: {
          content:[],
          remark:'',
          image_pic:[],
          attachment_file:[],
        },
        reimbursement_amount:[],
        reimbursement_type:[],
        reimbursement_cost_details:[],
        number:1,
        totalMoney:0
      }
    },
    watch:{
      module(val){
        this.reimbursement = val;
      },
      reimbursement(val){
        if(!val){
          this.$emit('close');
        }
      },
      reimbursement_amount(val){
          if(val){
            this.totalMoney=0;
            val.forEach((x) => {
                this.totalMoney+=Number(x) ;
            })
          }else {
            this.totalMoney=0;
          }
      },
    },
    methods: {
      handleRemove(file, fileList) {

      },
      handlePictureCardPreview(file) {
        this.dialogImageUrl = file.url;
        this.dialogVisible = true;
      },
      //增加报销明细
      addNumber(){
          this.number++;
      },
      //删除报销明细
      deleteNumber(index){
        this.number--;
        this.reimbursement_amount.splice(index,1);
        this.reimbursement_type.splice(index,1);
        this.reimbursement_cost_details.splice(index,1);
      },
      //确认提交
      confirmSubmit(){
        let contentItem = {};
        this.form.content=[];
        for(let i=0;i<this.number;i++){
          contentItem = {};
          contentItem.reimbursement_amount = this.reimbursement_amount[i]?this.reimbursement_amount[i]:'';
          contentItem.reimbursement_type = this.reimbursement_type[i]?this.reimbursement_type[i]:'';
          contentItem.reimbursement_cost_details = this.reimbursement_cost_details[i]?this.reimbursement_cost_details[i]:'';
          this.form.content.push(contentItem);
        }
        this.$http.post(globalConfig.server+'oa/reimbursement',this.form).then((res) => {
          if(res.data.code === '140010'){
            this.$notify.success({
              title: '成功',
              message: res.data.msg,
            });
            this.closeModal();
          }else {
            this.$notify.warning({
              title: '警告',
              message: res.data.msg,
            });
          }
        })
      },
      closeModal(){
        this.form = {
          content:[],
          remark:'',
          image_pic:[],
          attachment_file:[],
        };
        this.reimbursement_amount = [];
        this.reimbursement_type = [];
        this.reimbursement_cost_details = [];
        this.number = 1;
        this.totalMoney=0;
        this.reimbursement = false;
      }
    }
  }
</script>

<style scoped lang="scss">
  @mixin flex {
    display: -webkit-flex;
    display: flex;
  }

  @mixin border_radius($n) {
    -webkit-border-radius: $n;
    -moz-border-radius: $n;
    border-radius: $n;
  }

  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }

  .upLoad {
    @include border_radius(4px);
    border: 1px solid #dfe6fb;
    padding: 10px;
    .examine {
      @include flex;
      flex-wrap: wrap;
    }
  }
  .remind {
    font-size: 12px;
  }
  .conservator {
    @include border_radius(50%);
    .conservatorInfo{
      /*border: 1px solid red;*/
      width: 70px;
      height: 66px;
      img {
        width: 35px;
        height: 35px;
        @include border_radius(50%);
        margin-left: 21px;
      }
      .conservatorName {
        font-size: 13px;
        text-align: center;
        width: 80px;
        height: 20px;
      }
    }
    .grade {
      border: 1px solid #dfe6fb;
      @include border_radius(4px);
      width: 75px;
      height: 20px;
      line-height: 20px;
      font-size: 13px;
      color: #409EFF;
      text-align: center;
      margin: 0 0 10px 3px;
    }
  }
  .picSign {
    font-size: 16px;
    text-align: center;
    margin-top: 16px;
  }
</style>
