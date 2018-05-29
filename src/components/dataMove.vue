<template>
  <div id="dataMove">
    <div class="filter clearFix">
      <div style="float: left; font-size: 22px;margin-left: 20px;">
        {{formList.detailed_address}}
      </div>
      <el-form :model="params" :inline="true" size="mini" onsubmit="return false" label-width="66px">

        <el-form-item>
          <el-input placeholder="请输入房屋地址" v-model="params.keywords" size="mini" clearable
                    @keyup.native.enter="search(params.keywords)">
            <el-button slot="append" icon="el-icon-search" @click.native="search(params.keywords)"></el-button>
          </el-input>
        </el-form-item>

        <el-form-item>
          <el-dropdown trigger="click" @command="moveSure">
            <el-button type="primary">
              迁移状态<i class="el-icon-arrow-down el-icon--right"></i>
            </el-button>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item command="a">迁移</el-dropdown-item>
              <el-dropdown-item command="b">暂不处理</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </el-form-item>
      </el-form>
    </div>
    <div class="houses" v-if="formList.combined">
      <el-button type="text" v-for="(key,index) in contractHouse" :key="index" @click="houseOn(key.id)">
        {{key.address}}
      </el-button>
    </div>
    <div class="subField">
      <el-row>
        <el-col :span="12" class="subFieldCol left">
          <el-row>
            <el-col :span="24" class="row_col">
              <div class="title">财务数据</div>
              <div class="marginTop scroll_bar">

                <div class="houseType">收房{{leftListCollect}}</div>
                <div class="flexDiv" v-for="(key,index) in formListFc">
                  <el-checkbox-group v-model="leftListCollect" @change="contractOn('leftCollect', key)">
                    <el-checkbox :label="key.id"
                                 :disabled="leftListCollect.indexOf(key.id) < 0 && checkMax === leftNumber"></el-checkbox>
                  </el-checkbox-group>
                  <div class="blocks">
                    <div>
                      <p>房屋地址</p>
                      <p class="cursorColor" @click="search(formList.detailed_address)">
                        {{formList.detailed_address}}</p>
                    </div>
                    <div>
                      <p>客户姓名</p>
                      <p class="cursorColor" @click="search(key.customer_name)">{{key.customer_name}}</p>
                    </div>
                    <div>
                      <p>联系方式</p>
                      <p class="cursorColor" @click="search(key.contact)">{{key.contact}}</p>
                    </div>
                    <div>
                      <p>合同性质</p>
                      <p>新收</p>
                    </div>
                    <div>
                      <p>月单价</p>
                      <p>{{key.prices[0]}}</p>
                    </div>
                    <div>
                      <p>付款方式</p>
                      <p>押1付{{key.pay_types[0]}}</p>
                    </div>
                  </div>
                </div>
                <div v-if="formListFc.length === 0" class="notAvailable">
                  暂无相关数据...
                </div>

                <div class="houseType rent">租房{{leftListRent}}</div>
                <div class="flexDiv" v-for="(key,index) in formListFr">
                  <el-checkbox-group v-model="leftListRent" @change="contractOn('leftRent', key)">
                    <el-checkbox :label="key.id"
                                 :disabled="leftListRent.indexOf(key.id) < 0 && checkMax === leftNumber">

                    </el-checkbox>
                  </el-checkbox-group>
                  <div class="blocks">
                    <div>
                      <p>房屋地址</p>
                      <p class="cursorColor" @click="search(formList.detailed_address)">
                        {{formList.detailed_address}}</p>
                    </div>
                    <div>
                      <p>客户姓名</p>
                      <p class="cursorColor" @click="search(key.customer_name)">{{key.customer_name}}</p>
                    </div>
                    <div>
                      <p>联系方式</p>
                      <p class="cursorColor" @click="search(key.contact)">{{key.contact}}</p>
                    </div>
                    <div>
                      <p>合同性质</p>
                      <p>新收</p>
                    </div>
                    <div>
                      <p>月单价</p>
                      <p>{{key.prices[0]}}</p>
                    </div>
                    <div>
                      <p>付款方式</p>
                      <p>押{{key.bet}}付{{key.pay[0]}}</p>
                    </div>
                  </div>
                </div>
                <div v-if="formListFr.length === 0" class="notAvailable">
                  暂无相关数据...
                </div>
              </div>
            </el-col>
          </el-row>
        </el-col>

        <el-col :span="12" class="subFieldCol right">
          <el-row>
            <el-col :span="24" class="row_col">
              <div class="title">合同数据</div>
              <div class="marginTop scroll_bar">

                <div class="houseType">收房{{rightListCollect}}</div>
                <div class="flexDiv" v-for="(key,index) in contractListChc">
                  <el-checkbox-group :max="formListFc.length" v-model="rightListCollect"
                                     @change="contractOn('rightCollect', key)">
                    <el-checkbox :label="key.id"
                                 :disabled="(rightListCollect.indexOf(key.id) < 0 && checkMax === rightNumber) || showDetail[checkMax - 1].type === 'leftRent'"></el-checkbox>
                  </el-checkbox-group>
                  <div class="blocks">
                    <div>
                      <p>房屋地址</p>
                      <p>{{key.detailed_address}}</p>
                    </div>
                    <div>
                      <p>客户姓名</p>
                      <p>{{key.name}}</p>
                    </div>
                    <div>
                      <p>联系方式</p>
                      <p v-if="Array.isArray(key.mobile)">{{key.mobile[0]}}</p>
                      <p v-else>{{key.mobile}}</p>
                    </div>
                    <div>
                      <p>合同性质</p>
                      <p>新收</p>
                    </div>
                    <div>
                      <p>月单价</p>
                      <p>{{key.checkin.price[0]}}</p>
                    </div>
                    <div>
                      <p>付款方式</p>
                      <p>押1付{{key.checkin.pay_type[0]}}</p>
                    </div>
                  </div>
                </div>
                <div v-if="contractListChc.length === 0" class="notAvailable">
                  暂无相关数据...
                </div>

                <div class="houseType rent">租房{{rightListRent}}</div>
                <div class="flexDiv" v-for="(key,index) in contractListRhc">
                  <el-checkbox-group :max="formListFr.length" v-model="rightListRent"
                                     @change="contractOn('rightRent', key)">
                    <el-checkbox :label="key.id"
                                 :disabled="(rightListRent.indexOf(key.id) < 0 && checkMax === rightNumber) || showDetail[checkMax - 1].type === 'leftCollect'"></el-checkbox>
                  </el-checkbox-group>
                  <div class="blocks">
                    <div>
                      <p>房屋地址</p>
                      <p>{{key.detailed_address}}</p>
                    </div>
                    <div>
                      <p>客户姓名</p>
                      <p>{{key.name}}</p>
                    </div>
                    <div>
                      <p>联系方式</p>
                      <p v-if="Array.isArray(key.mobile)">{{key.mobile[0]}}</p>
                      <p v-else>{{key.mobile}}</p>
                    </div>
                    <div>
                      <p>合同性质</p>
                      <p>新收</p>
                    </div>
                    <div>
                      <p>月单价</p>
                      <p>押1付{{key.checkin.pay[0]}}</p>
                    </div>
                    <div>
                      <p>付款方式</p>
                      <p>押1付{{key.checkin.price[0]}}</p>
                    </div>
                  </div>
                </div>
                <div v-if="contractListRhc.length === 0" class="notAvailable">
                  暂无相关数据...
                </div>
              </div>
            </el-col>
          </el-row>
        </el-col>
      </el-row>
    </div>

    <div class="subField footer">
      <el-row v-for="(key,index) in showDetail" :key="index">
        <el-col :span="11" class="subFieldCol">
          <div>
            <div class="blocks bottom0">
              <div>
                <p>房屋地址</p>
                <p>{{key.moneyAddress}}</p>
              </div>
              <div>
                <p>客户姓名</p>
                <p>{{key.customer_name}}</p>
              </div>
              <div>
                <p>联系方式</p>
                <p v-if="Array.isArray(key.contact)">{{key.contact[0]}}</p>
                <p v-else>{{key.contact}}</p>
              </div>
            </div>
          </div>
        </el-col>
        <el-col :span="11" class="subFieldCol">
          <div>
            <div class="blocks bottom0">
              <div>
                <p>房屋地址</p>
                <p>{{key.ContractAddress}} </p>
              </div>
              <div>
                <p>客户姓名</p>
                <p>{{key.name}}</p>
              </div>
              <div>
                <p>联系方式</p>
                <p v-if="Array.isArray(key.mobile)">{{key.mobile[0]}}</p>
                <p v-else>{{key.mobile}}</p>
              </div>
            </div>
          </div>
        </el-col>
        <el-col :span="1" class="subFieldCol">
          <div class="addRemove">
            <span @click="addRemoveCol(1, index)" class="iconfont icon-cuowu1"></span>
            <span @click="addRemoveCol(2, index)" class="iconfont icon-cuowu-guanbi"></span>
          </div>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
  export default {
    name: "data-move",
    data() {
      return {
        urls: globalConfig.server,
        types: '',
        checkMax: 1,

        showDetail: [{
          type: '',
          moneyAddress: '',
          customer_name: '',
          contact: '',
          leftCcId: '',
          leftRcId: '',

          ContractAddress: '',
          name: '',
          mobile: '',
          rightCcId: '',
          rightRcId: '',
        }],

        leftListCollect: [],      //财务收checkbox
        leftListRent: [],         //财务租checkbox
        rightListCollect: [],     //合同收checkbox
        rightListRent: [],        //合同租checkbox

        formList: {},             //财务数据
        formListFc: [],           //财务数据收
        formListFr: [],           //财务数据租

        contractListChc: [],      //合同数据收
        contractListRhc: [],      //合同数据租

        contractHouse: [],        //头部房屋信息
        params: {
          keywords: '',
        },
        form: {
          house_id: '',
          contract: [],
        },
        formHouse: {
          type: 'house',
          fa_id: '',
          co_id: '',
        },
      }
    },
    mounted() {
      this.detail();
    },
    watch: {},
    computed: {
      leftNumber() {
        return this.leftListCollect.length + this.leftListRent.length;
      },
      rightNumber() {
        return this.rightListCollect.length + this.rightListRent.length;
      }
    },
    methods: {
      detail() {
        this.$http.get(this.urls + 'financial/migration').then((res) => {
          if (res.data.code === '30000') {
            this.formList = res.data.data;
            this.form.house_id = res.data.data.id;
            this.formHouse.fa_id = res.data.data.id;
            this.formListFc = res.data.data.fcc;
            this.formListFr = res.data.data.fcr;
            this.search(res.data.data.detailed_address);
          }
        });
      },
      search(val) {
        this.params.keywords = val;
        this.$http.get(this.urls + 'financial/migration/search?q=' + val).then((res) => {
          if (res.data.code === '30000') {
            this.contractListChc = res.data.data.chc;
            this.contractListRhc = res.data.data.rhc;
            this.contractHouse = res.data.data.houses;
          }
        })
      },
      addRemoveCol(val, index) {
        if (val === 1) {
          this.checkMax++;
          this.showDetail.push({
            type: '',
            moneyAddress: '',
            customer_name: '',
            contact: '',
            leftCcId: '',
            leftRcId: '',
            ContractAddress: '',
            name: '',
            mobile: '',
            rightCcId: '',
            rightRcId: '',
          });
        } else {
          if (this.checkMax > 1) {
            let fcc = this.leftListCollect;     //左收
            let chc = this.leftListRent;        //左租
            let frc = this.rightListCollect;    //右收
            let rhc = this.rightListRent;       //右租
            let detail = this.showDetail;
            if (detail[index].type === 'leftCollect' || detail[index].type === 'rightCollect') {
              for (let i = 0; i < detail.length; i++) {
                for (let j = 0; j < fcc.length; j++) {
                  if (fcc[j] === detail[i].leftCcId) {
                    this.leftListCollect.splice(j, 1);
                  }
                }
                for (let j = 0; j < frc.length; j++) {
                  if (frc[j] === detail[i].rightCcId) {
                    this.rightListCollect.splice(j, 1);
                  }
                }
              }
            } else {
              for (let i = 0; i < detail.length; i++) {
                for (let j = 0; j < fcc.length; j++) {
                  if (chc[j] === detail[i].leftRcId) {
                    this.leftListRent.splice(j, 1);
                  }
                }
                for (let j = 0; j < frc.length; j++) {
                  if (rhc[j] === detail[i].rightRcId) {
                    this.rightListRent.splice(j, 1);
                  }
                }
              }
            }
            this.checkMax--;
            this.showDetail.splice(index, 1);
          } else {
            this.leftListCollect = [];
            this.leftListRent = [];
            this.rightListCollect = [];
            this.rightListRent = [];
            this.showDetail = [
              {
                type: '',
                moneyAddress: '',
                customer_name: '',
                contact: '',
                leftCcId: '',
                leftRcId: '',
                ContractAddress: '',
                name: '',
                mobile: '',
                rightCcId: '',
                rightRcId: '',
              }
            ];
          }
        }
      },
      // 合同ID
      contractOn(type, key) {
        let max = this.checkMax - 1;
        this.showDetail[max].type = type;
        if (type === 'leftCollect' || type === 'leftRent') {
          this.showDetail[max].moneyAddress = this.formList.detailed_address;
          this.showDetail[max].customer_name = key.customer_name;
          this.showDetail[max].contact = key.contact;
          if (type === 'leftCollect') {
            this.showDetail[max].leftCcId = key.id;
            if (this.leftListCollect.indexOf(key.id) < 0) {
              for (let i = 0; i < this.showDetail.length; i++) {
                if(this.showDetail[i].leftCcId === key.id) {
                  this.showDetail[i].moneyAddress = '';
                  this.showDetail[i].customer_name = '';
                  this.showDetail[i].contact = '';
                  this.showDetail[i].leftCcId = '';
                }
              }
            }
          } else {
            this.showDetail[max].leftRcId = key.id;
            if (this.leftListRent.indexOf(key.id) < 0) {
              for (let i = 0; i < this.showDetail.length; i++) {
                if(this.showDetail[i].leftRcId === key.id) {
                  this.showDetail[i].moneyAddress = '';
                  this.showDetail[i].customer_name = '';
                  this.showDetail[i].contact = '';
                  this.showDetail[i].leftRcId = '';
                }
              }
            }
          }
        } else {
          this.showDetail[max].ContractAddress = key.detailed_address;
          this.showDetail[max].name = key.name;
          this.showDetail[max].mobile = key.mobile;
          if (type === 'rightCollect') {
            this.showDetail[max].rightCcId = key.id;
            if (this.rightListCollect.indexOf(key.id) < 0) {
              for (let i = 0; i < this.showDetail.length; i++) {
                if(this.showDetail[i].rightCcId === key.id) {
                  this.showDetail[i].ContractAddress = '';
                  this.showDetail[i].name = '';
                  this.showDetail[i].mobile = '';
                  this.showDetail[i].rightCcId = '';
                }
              }
            }
          } else {
            this.showDetail[max].rightRcId = key.id;
            if (this.rightListRent.indexOf(key.id) < 0) {
              for (let i = 0; i < this.showDetail.length; i++) {
                if(this.showDetail[i].rightRcId === key.id) {
                  this.showDetail[i].ContractAddress = '';
                  this.showDetail[i].name = '';
                  this.showDetail[i].mobile = '';
                  this.showDetail[i].rightRcId = '';
                }
              }
            }
          }
        }
      },
      // 房屋合并
      houseOn(val) {
        this.open(val);
      },
      // 合同合并
      moveSure() {
        let data = this.showDetail;
        for (let i = 0; i < data.length; i++) {
          let listF = {};
          let listC = {};
          if (data[i].leftCcId !== '' && data[i].rightCcId !== '') {
            listF.fcc_id = data[i].leftCcId;
            listF.chc_id = data[i].rightCcId;
            this.form.contract.push(listF);
          }
          if (data[i].leftRcId !== '' && data[i].rightRcId !== '') {
            listC.fcr_id = data[i].leftRcId;
            listC.rhc_id = data[i].rightRcId;
            this.form.contract.push(listC);
          }
        }
        this.$http.post(this.urls + 'financial/migration/commit', this.form).then((res) => {

        })
      },
      close_() {
        this.params.keywords = '';
      },
      open(val) {
        this.$confirm('此操作将合并房屋，不可逆转操错, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.formHouse.co_id = val;
          this.$http.post(this.urls + 'financial/migration/combine', this.formHouse).then((res) => {
            if (res.data.code === '30000') {
              this.$notify.success({
                title: '成功',
                message: res.data.msg,
              })
            } else {
              this.$notify.warning({
                title: '警告',
                message: res.data.msg,
              })
            }
          });
        }).catch(() => {

        });
      }
    },
  }
</script>

<style lang="scss">
  #dataMove {
    @mixin flex {
      display: flex;
      display: -webkit-flex;
    }
    @mixin border_($n) {
      -webkit-border-radius: $n;
      -moz-border-radius: $n;
      border-radius: $n;
    }
    .clearFix:after {
      content: '';
      display: block;
      clear: both;
    }
    span.el-checkbox__label {
      display: none;
    }
    .filter {
      padding-top: 15px;
      .el-form {
        float: right;
      }
    }
    p {
      margin: 6px 0;
    }
    .houseType {
      background-color: #dfe6fb;
      font-size: 16px;
      padding: 10px;
    }
    .rent {
      background-color: #d4f0de;
    }
    .houses {
      border: 1px solid #DDDDDD;
      @include border_(6px);
      padding: 0 20px;
      margin: 0 6px 12px;
    }
    .subField {
      .subFieldCol {
        padding: 0 6px;
        .row_col {
          border: 1px solid #DDDDDD;
          padding: 0 6px;
          @include border_(6px);
          .flexDiv {
            display: flex;
            display: -webkit-flex;
            align-items: center;
          }
          .marginTop {
            height: 500px;
            overflow: auto;
          }
          .notAvailable {
            text-align: center;
            font-size: 20px;
            padding: 12px 0;
            color: #DDDDDD;
          }
        }
        .title {
          top: 0;
          left: 0;
          right: 0;
          text-align: center;
          font-size: 20px;
          color: #409EFF;
          padding: 18px 0;
          border-bottom: 1px solid #DDDDDD;
        }
        .blocks {
          @include flex;
          flex-wrap: wrap;
          padding: 6px 0;
          margin-bottom: 10px;
          .cursorColor {
            cursor: pointer;
            color: #409EFF;
          }
          div {
            @include flex;
            align-items: center;
            margin-right: 1%;
            width: 31%;
            p:first-of-type {
              min-width: 80px;
              margin-right: 12px;
              text-align: right;
            }
            p:last-of-type {
              width: 100%;
              min-height: 28px;
              line-height: 28px;
              padding: 0 20px;
              background-color: #eef3fc;
              @include border_(6px);
            }
          }
        }
        .bottom0 {
          margin: 0;
        }
        .addRemove {
          height: 52px;
          @include flex;
          align-items: center;
          span {
            cursor: pointer;
            font-size: 20px;
            padding: 0 6px;
          }
        }
      }
    }
    .footer {
      margin: 20px 0 100px;
      border: 1px solid #DDDDDD;
      @include border_(6px);
      @include flex;
      align-items: center;
      flex-wrap: wrap;
      .el-row {
        width: 100%;
        @include flex;
        align-items: center;
        justify-content: space-between;
      }
      .blocks {
        margin: 0;
      }
    }
  }
</style>
