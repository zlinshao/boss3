<template>
  <div class="modalFrame">
    <el-dialog :close-on-click-modal="false"
      title="水电燃报销（官网）"
      :visible.sync="miscellaneousExpensesOfficialVisible"
      width="60%">
      <div class="scroll_bar">
        <el-form size="mini" label-width="100px">
          <div v-for="item in number">
            <el-form-item :label="'报销明细('+item+')'">
              <el-button v-if="item>1" type="text" size="mini" style="float: right" @click="deleteNumber(item-1)">删除</el-button>
            </el-form-item>
            <el-row>
              <el-col :span="8">
                <el-form-item label="姓名" required="">
                  <el-input v-model="miscellaneous_expenses_official_name[item-1]"  placeholder="请输入"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="电话" required="">
                  <el-input v-model="miscellaneous_expenses_official_mobile[item-1]"  placeholder="请输入"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="客户身份">
                  <el-input v-model="miscellaneous_expenses_official_identity[item-1]"  placeholder="请输入"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="8">
                <el-form-item label="房屋地址" required="">
                  <el-input v-model="miscellaneous_expenses_official_address[item-1]"  placeholder="请输入"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="合同编号" required="">
                  <el-input v-model="miscellaneous_expenses_official_contract_num[item-1]"  placeholder="请输入"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="银行卡账号" required="">
                  <el-input v-model="miscellaneous_expenses_official_bank_num[item-1]"  placeholder="请输入"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="8">
                <el-form-item label="开户行" required="">
                  <el-input v-model="miscellaneous_expenses_official_bank[item-1]"  placeholder="请输入"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="收款人姓名" required="">
                  <el-input v-model="miscellaneous_expenses_official_payee_name[item-1]"  placeholder="请输入"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="报销类别" required="">
                  <el-input v-model="miscellaneous_expenses_official_type[item-1]"  placeholder="请输入"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
          </div>

          <el-form-item>
            <el-button @click="addNumber">
              <i class="el-icon-plus"></i>增加报销明细
            </el-button>
          </el-form-item>

          <el-form-item label="备注">
            <el-input v-model="form.remark" type="textarea" :autosize="{minRows: 2, maxRows: 4}" ></el-input>
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

  export default {
    props: ['module'],
    data () {
      return {
        miscellaneousExpensesOfficialVisible: false,           //请假审批
        form: {
          content:[],
          remark:'',
        },
        miscellaneous_expenses_official_name : [],
        miscellaneous_expenses_official_mobile : [],
        miscellaneous_expenses_official_identity : [],
        miscellaneous_expenses_official_address : [],
        miscellaneous_expenses_official_contract_num : [],
        miscellaneous_expenses_official_bank_num : [],
        miscellaneous_expenses_official_bank : [],
        miscellaneous_expenses_official_payee_name : [],
        miscellaneous_expenses_official_type : [],
        number:1,
      }
    },
    watch:{
      module(val){
        this.miscellaneousExpensesOfficialVisible = val;
      },
      miscellaneousExpensesOfficialVisible(val){
        if(!val){
          this.$emit('close');
        }
      }
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
        this.miscellaneous_expenses_official_name.splice(index,1);
        this.miscellaneous_expenses_official_mobile.splice(index,1);
        this.miscellaneous_expenses_official_identity.splice(index,1);
        this.miscellaneous_expenses_official_address.splice(index,1);
        this.miscellaneous_expenses_official_contract_num.splice(index,1);
        this.miscellaneous_expenses_official_bank_num.splice(index,1);
        this.miscellaneous_expenses_official_bank.splice(index,1);
        this.miscellaneous_expenses_official_payee_name.splice(index,1);
        this.miscellaneous_expenses_official_type.splice(index,1);
      },
      //确认提交
      confirmSubmit(){

        let contentItem = {};
        this.form.content=[];
        for(let i=0;i<this.number;i++){
          contentItem = {};
          contentItem.miscellaneous_expenses_official_name = this.miscellaneous_expenses_official_name[i]?this.miscellaneous_expenses_official_name[i]:'';
          contentItem.miscellaneous_expenses_official_mobile = this.miscellaneous_expenses_official_mobile[i]?this.miscellaneous_expenses_official_mobile[i]:'';
          contentItem.miscellaneous_expenses_official_identity = this.miscellaneous_expenses_official_identity[i]?this.miscellaneous_expenses_official_identity[i]:'';
          contentItem.miscellaneous_expenses_official_address = this.miscellaneous_expenses_official_address[i]?this.miscellaneous_expenses_official_address[i]:'';
          contentItem.miscellaneous_expenses_official_contract_num = this.miscellaneous_expenses_official_contract_num[i]?this.miscellaneous_expenses_official_contract_num[i]:'';
          contentItem.miscellaneous_expenses_official_bank_num = this.miscellaneous_expenses_official_bank_num[i]?this.miscellaneous_expenses_official_bank_num[i]:'';
          contentItem.miscellaneous_expenses_official_bank = this.miscellaneous_expenses_official_bank[i]?this.miscellaneous_expenses_official_bank[i]:'';
          contentItem.miscellaneous_expenses_official_payee_name = this.miscellaneous_expenses_official_payee_name[i]?this.miscellaneous_expenses_official_payee_name[i]:'';
          contentItem.miscellaneous_expenses_official_type = this.miscellaneous_expenses_official_type[i]?this.miscellaneous_expenses_official_type[i]:'';
          this.form.content.push(contentItem);
        }

        this.$http.post(globalConfig.server+'oa/problemReport',this.form).then((res) => {
          if(res.data.code === '220010'){
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
        };
        this.miscellaneous_expenses_official_name = [];
        this.miscellaneous_expenses_official_mobile = [];
        this.miscellaneous_expenses_official_identity = [];
        this.miscellaneous_expenses_official_address = [];
        this.miscellaneous_expenses_official_contract_num = [];
        this.miscellaneous_expenses_official_bank_num = [];
        this.miscellaneous_expenses_official_bank = [];
        this.miscellaneous_expenses_official_payee_name = [];
        this.miscellaneous_expenses_official_type = [];
        this.number = 1;
        this.miscellaneousExpensesOfficialVisible = false;
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
  .statistics {
    background: #409EFF;
    color: #FFFFFF;
    @include border_radius(6px);
    padding: 10px;
    .first {
      font-size: 14px;
    }
    .second {
      font-size: 20px;
    }
  }
</style>
