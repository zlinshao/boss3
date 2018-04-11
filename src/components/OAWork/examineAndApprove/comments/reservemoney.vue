<template>
  <div class="modalFrame">
    <el-dialog :close-on-click-modal="false"
      title="备用金申领"
      :visible.sync="reserveVisible"
      width="50%">
      <div class="scroll_bar">
        <el-form :model="form" size="mini" label-width="100px">
          <el-row>
            <el-col :span="12">
              <el-form-item label="部门" required="">
                <el-input v-model="department_name" readonly="" @focus="selectDepart" placeholder="请选择部门">
                </el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="费用日期">
                <el-date-picker
                  v-model="form.reserve_money_date"
                  type="date"
                  placeholder="请选择日期">
                </el-date-picker>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="金额" required="">
                <el-input v-model="reserve_money_amount" type="number" placeholder="请输入(必填)"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="大写">
                <el-input v-model="chineseNumeral" readonly=""></el-input>
              </el-form-item>
            </el-col>
          </el-row>


          <el-form-item label="申请备用金原因">
            <el-input v-model="form.remark" type="textarea" :autosize="{minRows: 2, maxRows: 4}" placeholder="请输入(必填)"></el-input>
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
    <Organization :organizationDialog="organizationDialog" @close="closeOrganization" :length="length" :type="type"
                  @selectMember="selectMember"></Organization>
  </div>
</template>

<script>
  import Organization from '../../../common/organization.vue'
  export default {
    name: "reserve",
    props: ['module'],
    components:{Organization},
    data () {
      return {
        reserveVisible: false,           //备用金申请
        organizationDialog:false,
        form: {
          reserve_money_date: '',
          department_id: '',
          reserve_money_amount: '',
          remark: ''
        },
        chineseNumeral:'',                //大写数字
        reserve_money_amount:'',
        department_name:'',
        type:'',
        length:'',
      }
    },
    mounted(){

    },
    watch:{
      module(val){
        this.reserveVisible = val;
      },
      reserveVisible(val){
        if(!val){
          this.$emit('close');
        }
      },
      reserve_money_amount(val){
        this.form.reserve_money_amount = val;
        this.chineseNumeral = this.convertCurrency(Number(val));
      }
    },
    methods: {
      convertCurrency(money) {
        //汉字的数字
        let cnNums = ['零', '壹', '贰', '叁', '肆', '伍', '陆', '柒', '捌', '玖'];
        //基本单位
        let cnIntRadice = ['', '拾', '佰', '仟'];
        //对应整数部分扩展单位
        let cnIntUnits = ['', '万', '亿', '兆'];
        //对应小数部分单位
        let cnDecUnits = ['角', '分', '毫', '厘'];
        //整数金额时后面跟的字符
        let cnInteger = '整';
        //整型完以后的单位
        let cnIntLast = '元';
        //最大处理的数字
        let maxNum = 999999999999999.9999;
        //金额整数部分
        let integerNum;
        //金额小数部分
        let decimalNum;
        //输出的中文金额字符串
        let chineseStr = '';
        //分离金额后用的数组，预定义
        let parts;
        if (money == '') { return ''; }
        money = parseFloat(money);
        if (money >= maxNum) {
          //超出最大处理数字
          return '';
        }
        if (Number(money) === 0) {
          chineseStr = cnNums[0] + cnIntLast + cnInteger;
          return chineseStr;
        }
        //转换为字符串
        money = money.toString();
        if (money.indexOf('.') < 0) {
          integerNum = money;
          decimalNum = '';
        } else {
          parts = money.split('.');
          integerNum = parts[0];
          decimalNum = parts[1].substr(0, 4);
        }
        //获取整型部分转换
        if (parseInt(integerNum, 10) > 0) {
          let zeroCount = 0;
          let IntLen = integerNum.length;
          for (let i = 0; i < IntLen; i++) {
            let n = integerNum.substr(i, 1);
            let p = IntLen - i - 1;
            let q = p / 4;
            let m = p % 4;
            if (Number(n) === 0) {
              zeroCount++;
            } else {
              if (zeroCount > 0) {
                chineseStr += cnNums[0];
              }
              //归零
              zeroCount = 0;
              chineseStr += cnNums[parseInt(n)] + cnIntRadice[m];
            }
            if (Number(m) === 0 && zeroCount < 4) {
              chineseStr += cnIntUnits[q];
            }
          }
          chineseStr += cnIntLast;
        }
        //小数部分
        if (decimalNum !== '') {
          let decLen = decimalNum.length;
          for (let i = 0; i < decLen; i++) {
            let n = decimalNum.substr(i, 1);
            if (Number(n) !== 0) {
              chineseStr += cnNums[Number(n)] + cnDecUnits[i];
            }
          }
        }
        if (chineseStr === '') {
          chineseStr += cnNums[0] + cnIntLast + cnInteger;
        } else if (decimalNum === '') {
          chineseStr += cnInteger;
        }
        return chineseStr;
      },

      selectDepart(){
        this.organizationDialog = true;
        this.type = 'depart';
        this.length = 1;
      },
      //关闭选人框回调
      closeOrganization(){
        this.organizationDialog = false;
      },
      selectMember(val){
        this.form.department_id = val[0].id;
        this.department_name = val[0].name;
        this.organizationDialog = false;
      },
      //确认提交
      confirmSubmit(){
        this.$http.post(globalConfig.server+'oa/reserveMoney',this.form).then((res) => {
          if(res.data.code === '150010'){
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
          reserve_money_date: '',
          department_id: '',
          reserve_money_amount: '',
          remark: ''
        };
        this.chineseNumeral = '';                //大写数字
        this.reserve_money_amount = '';
        this.department_name = '';
        this.type = '';
        this.length = '';
        this.reserveVisible = false;
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
    font-size: 13px;
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
