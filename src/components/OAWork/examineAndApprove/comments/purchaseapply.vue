<template>
  <div class="modalFrame">
    <el-dialog
      title="采购申请"
      :visible.sync="purchaseVisible"
      width="50%">
      <div class="scroll_bar">
        <el-form :model="form" size="mini" label-width="88px">
          <el-row>
            <el-col :span="8">
              <el-form-item label="采购人">
                <el-input v-model="staff_name" placeholder="请输入(必填)"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="所属部门">
                <el-input v-model="department_name" placeholder="请输入(必填)"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="采购日期">
                <el-date-picker
                  v-model="form.purchase_date"
                  type="date"
                  value-format="yyyy-MM-dd"
                  placeholder="请选择日期">
                </el-date-picker>
              </el-form-item>
            </el-col>

          </el-row>

          <div v-for="item in number">
            <el-form-item :label="'明细('+item+')'">
              <el-button v-if="item>1" type="text" size="mini" style="float: right" @click="deleteNumber(item-1)">删除</el-button>
            </el-form-item>
            <el-row>
              <el-col :span="8">
                <el-form-item label="名称">
                  <el-input v-model="purchase_name[item-1]" placeholder="请输入(必填)">
                  </el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="数量">
                  <el-input v-model="purchase_number[item-1]" type="number" placeholder="请输入(必填)">
                  </el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="总价">
                  <el-input v-model="purchase_total[item-1]" type="number" placeholder="请输入(必填)">
                  </el-input>
                </el-form-item>
              </el-col>
            </el-row>
          </div>



          <el-form-item>
            <el-button @click="addNumber">
              <i class="el-icon-plus"></i>增加明细
            </el-button>
          </el-form-item>

          <el-form-item label="总数量">
            <div>{{totalNumber}}</div>
          </el-form-item>
          <el-form-item label="总价">
            <div>{{totalMoney}}元</div>
          </el-form-item>

          <el-form-item label="费用明细">
            <el-input v-model="form.textarea" type="textarea" :autosize="{minRows: 2, maxRows: 4}" placeholder="请输入"></el-input>
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
</template>m

<script>
  export default {
    name: "purchase",
    props: ['module'],
    data () {
      return {
        purchaseVisible: false,           //采购申请
        form: {
          content: [],
          department_id: '',
          purchase_date: '',
          remark: '',
          staff_id:'',
        },
        number:1,
        purchase_name: [],
        purchase_number: [],
        purchase_total: [],
        totalMoney:0,
        totalNumber:0,
        department_name:'',
        staff_name:'',
      }
    },
    watch:{
      module(val){
        this.purchaseVisible = val;
      },
      purchaseVisible(val){
        if(!val){
          this.$emit('close');
        }
      },
      purchase_number(val){
        if(val){
          this.totalNumber=0;
          val.forEach((x) => {
            this.totalNumber+=Number(x) ;
          })
        }else {
          this.totalNumber=0;
        }
      },
      purchase_total(val){
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
        console.log(file, fileList);
      },
      handlePictureCardPreview(file) {
        this.form.dialogImageUrl = file.url;
        this.dialogVisible = true;
      },

      //增加报销明细
      addNumber(){
        this.number++;
      },
      //删除报销明细
      deleteNumber(index){
        this.number--;
        this.purchase_name.splice(index,1);
        this.purchase_number.splice(index,1);
        this.purchase_total.splice(index,1);
      },

      //确认提交
      confirmSubmit(){
        let contentItem = {};
        this.form.content=[];
        for(let i=0;i<this.number;i++){
          contentItem = {};
          contentItem.purchase_name = this.purchase_name[i]?this.purchase_name[i]:'';
          contentItem.purchase_number = this.purchase_number[i]?this.purchase_number[i]:'';
          contentItem.purchase_total = this.purchase_total[i]?this.purchase_total[i]:'';
          this.form.content.push(contentItem);
        }
        this.$http.post(globalConfig.server+'oa/purchase',this.form).then((res) => {
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
          content: [],
          department_id: '',
          purchase_date: '',
          remark: '',
          staff_id:'',
        };
        this.purchase_name = [];
        this.purchase_number = [];
        this.purchase_total = [];
        this.number = 1;
        this.totalMoney=0;
        this.totalNumber=0;
        this.department_name='';
        this.staff_name='';

        this.purchaseVisible = false;
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
