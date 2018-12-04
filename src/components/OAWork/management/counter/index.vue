<template>
  <div id="counter">
    <div class="term">
      <div class="termTitle">计算条件</div>
      <div class="termTable">
        <el-form label-width="100px" size="mini">
          <el-row>
            <el-col :span="12">
              <div class="setTitle">
                <span class="chooseTitle">房屋地址</span>
              </div>
            </el-col>
            <el-col :span="12">
              <div class="setTitle" style="margin-left: 10px">
                <span class="chooseTitle">出租类别</span>
                <span style="color: #fb529f">*</span>
              </div>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <div class="mealChoose">
                <el-row>

                    <el-col :span="12">
                      <div class="signDate" style="margin-top: 18px">
                        <el-form-item label="房屋地址">
                          <el-input 
                           placeholder="请输入房屋地址" 
                           size="mini"
                           v-model="house_name"
                           style="width:330px;dispaly:inline-block;margin-left:20px;"
                           clearable
                           @keyup.enter.native.prevent="gerContractData">
                            <el-button slot="append" icon="el-icon-search" @click="gerContractData" ></el-button>
                          </el-input>
                        </el-form-item>
                      </div>
                    </el-col>


                </el-row>
              </div>
            </el-col>
            <el-col :span="12">
              <div class="mealChoose confiscate">
                <el-form-item>
                  <el-radio-group v-model="rent_type" style="margin-top:24px;">
                    <el-radio :label="1">新收新租</el-radio>
                    <el-radio :label="2">二次出租</el-radio>
                  </el-radio-group>
                </el-form-item>
              </div>
            </el-col>
          </el-row>

          <el-row>
            <el-col :span="12">
              <div class="setTitle condition">
                <span class="chooseTitle">收房条件</span>
                <span style="color: #fb529f">*</span>
              </div>
            </el-col>
            <el-col :span="12">
              <div class="setTitle condition" style="margin-left: 10px">
                <span class="chooseTitle">租房条件</span>
                <span style="color: #fb529f">*</span>
              </div>
            </el-col>
          </el-row>


          <el-row>
            <el-col :span="12">
              <div class="mealChoose" style="margin-left: 10px;height: 159px;">
                <el-row>
                  <div style="margin-top: 40px">
                    <el-col :span="8">
                      <div class="monthPrice">
                        <el-form-item label="收房价格">
                          <el-input v-model="form.lord_month_price" placeholder="请输入收房价格" size="mini"></el-input>
                        </el-form-item>
                      </div>
                    </el-col>
                    <el-col :span="8">
                      <div class="signTime">
                        <el-form-item label="收房年限">
                          <el-input v-model="form.lord_duration"  placeholder="请输入收房年限" size="mini"></el-input>
                        </el-form-item>
                      </div>
                    </el-col>
                    <el-col :span="8" v-show="is_display">
                        <div class="monthPrice">
                          <el-form-item label="中介费">
                            <el-input v-model="form.lord_agency_count" placeholder="请输入中介费" size="mini"></el-input>
                          </el-form-item>
                        </div>
                      </el-col>
                  </div>

                </el-row>
                <!--2-->
                <el-row>
                    <el-col :span="8" v-show="is_display">
                      <div class="signTime">
                        <el-form-item label="空置期">
                          <el-input v-model="form.lord_vacancy_date" placeholder="请输入空置期" size="mini"></el-input>
                        </el-form-item>
                      </div>
                    </el-col>
                    <el-col :span="8" v-show="is_display">
                      <div class="signDate">
                        <el-form-item label="付款方式">
                          <el-select v-model="form.lord_pay_way" placeholder="请选择" size="mini">
                            <el-option
                              v-for="item in pay_way"
                              :key="item.value"
                              :label="item.label"
                              :value="item.value">
                            </el-option>
                          </el-select>
                        </el-form-item>
                      </div>
                    </el-col>
                    <el-col :span="8" v-show="is_display">
                      <div class="signTime">
                        <el-form-item label="包物业费月单价">
                          <el-input v-model="form.lord_property_fee" placeholder="请输入内容" size="mini"></el-input>
                        </el-form-item>
                      </div>
                    </el-col>
                </el-row>
              </div>
            </el-col>

            <el-col :span="12">
              <div class="mealChoose" style="margin-left: 10px;height: 159px">
                <el-row>
                  <div style="margin-top: 40px">
                    <el-col :span="8">
                      <div class="signTime">
                        <el-form-item label="租房价格">
                          <el-input v-model="form.rent_month_price" placeholder="请输入租房价格" size="mini"></el-input>
                        </el-form-item>
                      </div>
                    </el-col>

                    <el-col :span="8">
                      <div class="monthPrice">
                        <el-form-item label="付款方式">
                          <el-input v-model="form.rent_pay_way" placeholder="请输入付款方式" size="mini"></el-input>
                        </el-form-item>
                      </div>
                    </el-col>
                    <el-col :span="8">
                      <div class="monthPrice">
                        <el-form-item label="消耗空置期">
                          <el-input v-model="form.rent_vacancy_date" placeholder="请输入消耗空置期" size="mini"></el-input>
                        </el-form-item>
                      </div>
                    </el-col>
                  </div>

                </el-row>
                <!--2-->
                <el-row>
                  
                  <el-col :span="8">
                    <div class="signDate">
                      <el-form-item label="中介费">
                        <el-input v-model="form.rent_agency_count" placeholder="请输入中介费" size="mini"></el-input>
                      </el-form-item>
                    </div>
                  </el-col>

                  <el-col :span="8" v-show="is_display">
                    <div class="signTime">
                      <el-form-item label="签约时长">
                        <el-input v-model="form.rent_sign_month" placeholder="请输入签约时长" size="mini"></el-input>
                      </el-form-item>
                    </div>
                  </el-col>
                </el-row>
              </div>
            </el-col>
          </el-row>
        </el-form>
<!--计算按钮-->
        <el-row>
          <el-col :span="24" v-show="is_calculate">
            <div class="countButton">
              <el-button type="primary" size="medium" @click="getData">计算业绩</el-button>
            </div>
          </el-col>
        </el-row>
      </div>
    </div>

    <div class="fruit term">
      <div class="chooseTitle">计算结果</div>
      <div class="termTable" v-if="is_show">
          <table   width="100%">
            <tr class="tab-font">
            <td></td>
            <td>收房人</td>
            <td>租房人</td>
            <td>合计</td>
            </tr>
             <tr>
            <td class="tab-bold">基本业绩</td>
            <td>{{result.lord_basic_achievement}}</td>
            <td>{{result.rent_basic_achievement}}</td>
            <td>{{result.all_basic_achievement}}</td>
            </tr>
            <tr>
            <td class="tab-bold">溢出业绩</td>
            <td>{{result.lord_overflow}}</td>
            <td>{{result.rent_overflow}}</td>
            <td>{{result.all_overflow}}</td>
            </tr>
            <tr>
            <td class="tab-bold">绩效金额</td>
            <td>{{result.lord_push_money}}</td>
            <td>{{result.rent_push_money}}</td>
            <td>{{result.all_push_money}}</td>
            </tr>
             <tr>
            <td class="tab-bold">净得金额</td>
            <td>{{result.lord_real_money}}</td>
            <td>{{result.rent_real_money}}</td>
            <td>{{result.all_real_money}}</td>
            </tr>
             <tr class="tab-font">
            <td></td>
            <td>片区经理工资</td>
            <td>区长工资</td>
            <td></td>
            </tr>
            <tr>
              <td class="tab-bold">绩效</td>
              <td>{{result.manager_ach}}</td>
              <td>{{result.warden_ach}}</td>
              <td></td>
            </tr>
            <tr>
              <td class="tab-bold">认责</td>
              <td>{{result.manager_duty}}</td>
              <td>{{result.warden_duty}}</td>
              <td></td>
            </tr>
          </table>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "index",
    data() {
      return {
        pay_way:[{
          value: 1,
          label: '月付'
        }, {
          value: 2,
          label: '双月付'
        }, {
          value: 3,
          label: '季付'
        }],
        form:{
          lord_duration:'',
          lord_month_price:'',
          lord_agency_count:'',
          lord_vacancy_date:'',
          lord_property_fee:'',
          lord_pay_way:'',
          rent_month_price:'',
          rent_pay_way:'',
          rent_agency_count:'',
          rent_vacancy_date:'',
          rent_sign_month:'',
          rent_return_day:0,
          rent_return_money:0
        },
        result:{
          lord_basic_achievement:0,
          lord_overflow:0,
          lord_push_money:0,
          lord_real_money:0,
          rent_basic_achievement:0,
          rent_overflow:0,
          rent_push_money:0,
          rent_real_money:0,
          all_basic_achievement:0,
          all_overflow:0,
          all_push_money:0,
          all_real_money:0,
          manager_ach:0,
          manager_duty:0,
          warden_ach:0,
          warden_duty:0
        },
        rent_type: 1,
        is_show:false,
        is_display:true,
        is_disabled:false,
        house_name:'',
        is_calculate:false,
      }
    },
    mounted(){
        this.getSettings();
    },
    watch:{
      rent_type(val){
        if(val==2){
          this.is_display=false;
          this.form.rent_sign_month=12;
          this.form.lord_duration=4;
          this.is_disabled=true;
        }else{
          this.is_display=true;
          this.form.rent_sign_month='';
          this.form.lord_duration='';
          this.is_disabled=false;
        }
      }
    },
    methods:{
      getSettings(){
        this.$http.get(globalConfig.server + 'salary/overflowrate/getSettings').then((res)=>{
          if (Number(res.data.code) %10=== 0) {
              this.is_calculate=true;
          }else{
            this.is_calculate=false;
            this.prompt('warning', res.data.msg);
          }

        });
      },
      getData(){
        let address;
        console.log(this.rent_type);
        if(this.rent_type==1){
           address='salary/achievement_counter/getCounter';
        }else if(this.rent_type==2){
           address='salary/achievement_counter/getSecondRent'; 
        }
        
        
        this.$http.post(globalConfig.server + address, this.form).then((res) => {
          if (Number(res.data.code) %10=== 0) {
            this.is_show=true;
            let data=res.data.data;
            this.result.lord_basic_achievement=data.lord.basic_achievement;
            this.result.lord_overflow=data.lord.overflow;
            this.result.lord_push_money=data.lord.push_money;
            this.result.lord_real_money=data.lord.real_money;
            this.result.rent_basic_achievement=data.rent.basic_achievement;
            this.result.rent_overflow=data.rent.overflow;
            this.result.rent_push_money=data.rent.push_money;
            this.result.rent_real_money=data.rent.real_money;
            this.result.all_basic_achievement=data.all.basic_achievement;
            this.result.all_overflow=data.all.overflow;
            this.result.all_push_money=data.all.push_money;
            this.result.all_real_money=data.all.real_money;
            this.result.manager_ach=data.manager.ach;
            this.result.manager_duty=data.manager.duty;
            this.result.warden_ach=data.warden.ach;
            this.result.warden_duty=data.warden.duty;
          } else {
            this.prompt('warning', res.data.msg);
          }
        });
      },
      gerContractData(){

        this.$http.get(globalConfig.server + 'salary/achv/getContract/?house_name='+this.house_name).then((res) => {
          if (Number(res.data.code) %10=== 0) {
            let data=res.data.data;
            if  (data.rent_type=='new'){
              this.rent_type=1;
              this.form.lord_duration=data.lord.lord_duration;
              this.form.lord_month_price=data.lord.lord_month_price;
              this.form.lord_agency_count=data.lord.lord_agency_count ? data.lord.lord_agency_count : 0;
              this.form.lord_vacancy_date=data.lord.lord_vacancy_date;
              this.form.lord_property_fee=data.lord.lord_property_fee;
              this.form.lord_pay_way=data.lord.lord_pay_way;
              this.form.rent_month_price=data.rent.rent_month_price;
              this.form.rent_pay_way=data.rent.rent_pay_way;
              this.form.rent_agency_count=data.rent.rent_agency_count;
              this.form.rent_vacancy_date=data.rent.rent_vacancy_date;
              this.form.rent_sign_month=data.rent.rent_sign_month;
            }else if(data.rent_type=='second'){
              this.rent_type=2;
              this.form.lord_month_price=data.lord.lord_month_price;
              this.form.rent_month_price=data.rent.rent_month_price;
              this.form.rent_pay_way=data.rent.rent_pay_way;
              this.form.rent_agency_count=data.rent.rent_agency_count;
              this.form.rent_vacancy_date=data.rent.rent_vacancy_date;
            }
            
          }else{
            this.prompt('warning', res.data.msg);
          }
        });
      }
    }
  }
</script>

<style scoped="" lang="scss">
  #counter {
    @mixin flex {
      display: -webkit-flex;
      display: flex;
    }

    @mixin border_radius($n) {
      -webkit-border-radius: $n;
      -moz-border-radius: $n;
      border-radius: $n;
    }

    .chooseTitle {
      color: #409EFF;
    }
    .term {
      .termTitle {
        color: #409EFF;
      }
      .termTable {
        border: 1px solid #dfe6fb;
        @include border_radius(4px);
        padding: 10px;
        margin-top: 10px;
        .mealChoose {
          border: 1px solid #dfe6fb;
          @include border_radius(4px);
          margin-top: 10px;
          .signDate, .signTime, .monthPrice {
            @include flex;
            justify-content: right;
            margin-right: 20px;
          }
        }
        .confiscate {
          margin-left: 10px;
          height: 63px;
        }
        .condition {
          margin-top: 8px;
        }
        .tab-bold{
          font-weight: bold;
          font-size: 15px;
        }
        .tab-font{
          font-weight: bold;
          font-size: 18px;
        }
        table tr td{
          border-bottom: 1px solid #eee;
          padding:3px 0 3px 0;
        }
      }
      .countButton {
        @include flex;
        justify-content: center;
        margin-top: 10px;
      }
    }
    .fruit {
      margin-top: 20px;
      .termTable {
        .hint{
          color: #fb529f;
        }
      }
    }

  }
</style>
