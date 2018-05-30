<template>
  <div id="dataMove">
    <div class="filter clearFix">
      <div style="font-size: 22px;margin-left: 20px;">
        {{formList.detailed_address}}<br>
        <el-form :inline="true" size="mini" onsubmit="return false" label-width="100px" class="moneySearch" style="width: 100%;">
          <el-form-item label="财务地址搜索区">
            <el-input placeholder="请输入房屋地址" v-model="searchCon" size="mini" clearable
                      @keyup.native.enter="details(searchCon)">
              <el-button slot="append" icon="el-icon-search" @click.native="details(searchCon)"></el-button>
            </el-input>
          </el-form-item>

          <div style="float: right;">
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
          </div>

        </el-form>
      </div>

    </div>
    <div class="houses" v-if="!formList.combined">
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

                <div class="houseType">收房</div>
                <div class="flexDiv" v-for="(key,index) in formListFc">
                  <el-checkbox-group v-model="leftListCollect" @change="contractOn('leftCollect', key)">
                    <el-checkbox :label="key.id"
                                 :disabled="(leftListCollect.indexOf(key.id) < 0 && checkMax === leftNumber) || leftListCollect.indexOf(key.id) > -1 "></el-checkbox>
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
                      <p>{{key.named_type}}</p>
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

                <div class="houseType rent">租房</div>
                <div class="flexDiv" v-for="(key,index) in formListFr">
                  <el-checkbox-group v-model="leftListRent" @change="contractOn('leftRent', key)">
                    <el-checkbox :label="key.id"
                                 :disabled="(leftListRent.indexOf(key.id) < 0 && checkMax === leftNumber) || leftListRent.indexOf(key.id) > -1 ">

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
                      <p>{{key.named_type}}</p>
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

                <div class="houseType">收房</div>
                <div class="flexDiv" v-for="(key,index) in contractListChc">
                  <el-checkbox-group :max="formListFc.length" v-model="rightListCollect"
                                     @change="contractOn('rightCollect', key)">
                    <el-checkbox :label="key.id"
                                 :disabled="(rightListCollect.indexOf(key.id) < 0 && (checkMax === rightNumber || types === 'leftRent')) || rightListCollect.indexOf(key.id) > -1"></el-checkbox>
                  </el-checkbox-group>
                  <div class="blocks">
                    <div>
                      <p>房屋地址</p>
                      <p class="cursorColor" @click="search(key.detailed_address)">{{key.detailed_address}}</p>
                    </div>
                    <div>
                      <p>客户姓名</p>
                      <p class="cursorColor" @click="search(key.name)">{{key.name}}</p>
                    </div>
                    <div>
                      <p>联系方式</p>
                      <p class="cursorColor" @click="search(key.mobile)" v-if="Array.isArray(key.mobile)">
                        {{key.mobile[0]}}</p>
                      <p class="cursorColor" @click="search(key.mobile)" v-else>{{key.mobile}}</p>
                    </div>
                    <div>
                      <p>合同性质</p>
                      <p>收房</p>
                    </div>
                    <div>
                      <p>月单价</p>
                      <p v-if="key.checkin !== null">{{key.checkin.price[0]}}</p>
                      <p v-else>——</p>
                    </div>
                    <div>
                      <p>付款方式</p>
                      <p v-if="key.checkin !== null">押1付{{key.checkin.pay_type[0]}}</p>
                      <p v-else>——</p>
                    </div>
                  </div>
                </div>
                <div v-if="contractListChc.length === 0" class="notAvailable">
                  暂无相关数据...
                </div>

                <div class="houseType rent">租房</div>
                <div class="flexDiv" v-for="(key,index) in contractListRhc">
                  <el-checkbox-group :max="formListFr.length" v-model="rightListRent"
                                     @change="contractOn('rightRent', key)">
                    <el-checkbox :label="key.id"
                                 :disabled="(rightListRent.indexOf(key.id) < 0 && (checkMax === rightNumber || types === 'leftCollect')) || rightListRent.indexOf(key.id) > -1"></el-checkbox>
                  </el-checkbox-group>
                  <div class="blocks">
                    <div>
                      <p>房屋地址</p>
                      <p class="cursorColor" @click="search(key.detailed_address)">{{key.detailed_address}}</p>
                    </div>
                    <div>
                      <p>客户姓名</p>
                      <p class="cursorColor" @click="search(key.name)">{{key.name}}</p>
                    </div>
                    <div>
                      <p>联系方式</p>
                      <p class="cursorColor" @click="search(key.mobile)" v-if="Array.isArray(key.mobile)">
                        {{key.mobile[0]}}</p>
                      <p class="cursorColor" @click="search(key.mobile)" v-else>{{key.mobile}}</p>
                    </div>
                    <div>
                      <p>合同性质</p>
                      <p>租房</p>
                    </div>
                    <div>
                      <p>月单价</p>
                      <p v-if="key.checkin !== null">{{key.checkin.price[0]}}</p>
                      <p v-else>——</p>
                    </div>
                    <div>
                      <p>付款方式</p>
                      <p v-if="key.checkin !== null">押1付{{key.checkin.pay[0]}}</p>
                      <p v-else>——</p>
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
      <el-row v-for="(key,index) in showDetail" :key="index" class="foot">
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

    <el-dialog title="门牌号补全" :visible.sync="dialogVisible" width="30%" :close-on-click-modal="false">
      <el-form :model="forms" :inline="true" size="mini" label-width="108px">
        <el-row>
          <el-col :span="8">
            <el-form-item label="栋" style="display: flex;display: -webkit-flex;">
              <el-input v-model="forms.building"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="单元" style="display: flex;display: -webkit-flex;">
              <el-input v-model="forms.unit"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="门牌号" style="display: flex;display: -webkit-flex;">
              <el-input v-model="forms.house_number"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <div style="text-align: center;color: red;">以上为建议数据，可手动修改，请确认无误后，再进行提交！</div>
      <span slot="footer" class="dialog-footer">
    <el-button size="small" @click="dialogVisible = false">取 消</el-button>
    <el-button size="small" type="primary" @click="houseNum">提 交</el-button>
  </span>
    </el-dialog>


  </div>
</template>

<script>
  export default {
    name: "data-move",
    data() {
      return {
        urls: globalConfig.server,
        dialogVisible: false,

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
        searchCon: '',          //草屋房屋地址
        form: {
          house_id: '',
          contract: [],
        },
        formHouse: {
          type: 'house',
          fa_id: '',
          co_id: '',
        },
        forms: {
          house_id: '',
          building: '',         //栋
          unit: '',             //单元
          house_number: '',     //门牌号
        },
      }
    },
    mounted() {
      this.details('');
    },
    computed: {
      leftNumber() {
        return this.leftListCollect.length + this.leftListRent.length;
      },
      rightNumber() {
        return this.rightListCollect.length + this.rightListRent.length;
      }
    },
    methods: {
      // 确认门牌号
      houseNum() {
        this.$http.post(this.urls + 'financial/migration/fill', this.forms).then((res) => {
          if (res.data.code === '30000') {
            this.forms.building = '';
            this.forms.unit = '';
            this.forms.house_number = '';
            this.dialogVisible = false;
            this.houseMerge();
          } else {
            this.$notify.warning({
              title: '警告',
              message: res.data.msg,
            })
          }
        })
      },
      // 合并房屋
      houseMerge() {
        this.$http.post(this.urls + 'financial/migration/combine', this.formHouse).then((res) => {
          if (res.data.code === '30010') {
            this.formHouse = {type: 'house', fa_id: '', co_id: ''};
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
        })
      },

      details(val) {
        this.close_('other');
        this.close_('ids');
        this.close_('search');
        this.close_('resetting');
        this.form = {house_id: '', contract: []};
        this.$http.get(this.urls + 'financial/migration?search=' + val).then((res) => {
          if (res.data.code === '30000') {
            let id = res.data.data.id;
            this.formList = res.data.data;
            this.form.house_id = id;
            this.forms.house_id = id;
            this.formHouse.fa_id = id;
            this.formListFc = res.data.data.fcc;
            this.formListFr = res.data.data.fcr;
            this.search(res.data.data.detailed_address);
          } else {
            this.formList = {};
            this.forms.house_id = '';
            this.formHouse.fa_id = '';
            this.formListFc = [];
            this.formListFr = [];
          }
        });
      },
      search(val) {
        let data = this.showDetail;
        let listLeft = [];
        let listRight = [];
        for (let i = 0; i < data.length; i++) {
          if (data[i].leftCcId !== '' && data[i].rightCcId !== '') {
            for (let j = 0; j < this.contractListChc.length; j++) {
              if (data[i].rightCcId === this.contractListChc[j].id) {
                listLeft.push(this.contractListChc[j]);
              }
            }
          }
          if (data[i].leftRcId !== '' && data[i].rightRcId !== '') {
            for (let j = 0; j < this.contractListRhc.length; j++) {
              if (data[i].rightRcId === this.contractListRhc[j].id) {
                listRight.push(this.contractListRhc[j]);
              }
            }
          }
        }
        this.params.keywords = val;
        this.$http.get(this.urls + 'financial/migration/search?q=' + val).then((res) => {
          if (res.data.code === '30000') {
            this.contractListChc = res.data.data.chc;   //合同数据收
            this.contractListRhc = res.data.data.rhc;   //合同数据租
            this.contractHouse = res.data.data.houses;  //头部房屋信息
            if (listLeft.length > 0) {
              for (let i = 0; i < listLeft.length; i++) {
                if (this.contractListChc.length > 0) {
                  console.log(this.contractListChc);
                  for (let j = 0; j < this.contractListChc.length; j++) {
                    if (listLeft[i].id !== this.contractListChc[j].id) {
                      this.contractListChc.push(listLeft[i]);
                    }
                  }
                } else {
                  this.contractListChc.push(listLeft[i]);
                }
              }
            }
            if (listRight.length > 0) {
              for (let i = 0; i < listRight.length; i++) {
                if (this.contractListRhc.length > 0) {
                  for (let j = 0; j < this.contractListRhc.length; j++) {
                    if (listRight[i].id !== this.contractListRhc[j].id) {
                      this.contractListRhc.push(listRight[i]);
                    }
                  }
                } else {
                  this.contractListRhc.push(listRight[i]);
                }
              }
            }
          } else {
            this.close_('search');
            if (listLeft.length > 0) {
              for (let i = 0; i < listLeft.length; i++) {
                this.contractListChc.push(listLeft[i]);
              }
            }
            if (listRight.length > 0) {
              for (let i = 0; i < listRight.length; i++) {
                this.contractListRhc.push(listRight[i]);
              }
            }
          }
        })
      },
      addRemoveCol(val, index) {
        if (val === 1) {
          let len = this.formListFc.length + this.formListFr.length;
          for (let i = 0; i < this.showDetail.length; i++) {
            if (this.showDetail[i].moneyAddress === '' || this.showDetail[i].ContractAddress === '') {
              return;
            }
          }
          if (this.checkMax < len) {
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
          }
        } else {
          if (this.checkMax > 1) {
            let fcc = this.leftListCollect;     //左收
            let frc = this.leftListRent;        //左租
            let chc = this.rightListCollect;    //右收
            let rhc = this.rightListRent;       //右租
            let detail = this.showDetail[index];

            if (detail.type === 'leftCollect' || detail.type === 'rightCollect') {
              for (let j = 0; j < fcc.length; j++) {
                if (fcc[j] === detail.leftCcId) {
                  this.leftListCollect.splice(j, 1);
                }
              }
              for (let j = 0; j < chc.length; j++) {
                if (chc[j] === detail.rightCcId) {
                  this.rightListCollect.splice(j, 1);
                }
              }
            } else {
              for (let j = 0; j < frc.length; j++) {
                if (frc[j] === detail.leftRcId) {
                  this.leftListRent.splice(j, 1);
                }
              }
              for (let j = 0; j < rhc.length; j++) {
                if (rhc[j] === detail.rightRcId) {
                  this.rightListRent.splice(j, 1);
                }
              }
            }

            this.showDetail.splice(index, 1);
            this.checkMax--;
          } else {
            this.form.contract = [];
            this.types = '';
            this.close_('ids');
            this.close_('resetting');
          }
        }
      },
      // 合同ID
      contractOn(type, key) {
        let max = this.checkMax - 1;
        this.showDetail[max].type = type;
        this.assignment(max, key, type);
        this.types = type;
      },
      // 赋值
      assignment(max, key, type) {
        switch (type) {
          case 'leftCollect':
            this.showDetail[max].moneyAddress = this.formList.detailed_address;
            this.showDetail[max].customer_name = key.customer_name;
            this.showDetail[max].contact = key.contact;
            this.showDetail[max].leftCcId = key.id;
            break;
          case 'leftRent':
            this.showDetail[max].moneyAddress = this.formList.detailed_address;
            this.showDetail[max].customer_name = key.customer_name;
            this.showDetail[max].contact = key.contact;
            this.showDetail[max].leftRcId = key.id;
            break;
          case 'rightCollect':
            this.showDetail[max].ContractAddress = key.detailed_address;
            this.showDetail[max].name = key.name;
            this.showDetail[max].mobile = key.mobile;
            this.showDetail[max].rightCcId = key.id;
            break;
          case 'rightRent':
            this.showDetail[max].ContractAddress = key.detailed_address;
            this.showDetail[max].name = key.name;
            this.showDetail[max].mobile = key.mobile;
            this.showDetail[max].rightRcId = key.id;
            break;
        }

      },
      // 清除
      close_(val, i) {
        switch (val) {
          case 'leftCollect':
            this.showDetail[i].moneyAddress = '';
            this.showDetail[i].customer_name = '';
            this.showDetail[i].contact = '';
            this.showDetail[i].leftCcId = '';
            break;
          case 'leftRent':
            this.showDetail[i].moneyAddress = '';
            this.showDetail[i].customer_name = '';
            this.showDetail[i].contact = '';
            this.showDetail[i].leftRcId = '';
            break;
          case 'rightCollect':
            this.showDetail[i].ContractAddress = '';
            this.showDetail[i].name = '';
            this.showDetail[i].mobile = '';
            this.showDetail[i].rightCcId = '';
            break;
          case 'rightRent':
            this.showDetail[i].ContractAddress = '';
            this.showDetail[i].name = '';
            this.showDetail[i].mobile = '';
            this.showDetail[i].rightRcId = '';
            break;
          case 'resetting':
            this.showDetail = [{
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
            }];
            break;
          case 'ids':
            this.leftListCollect = [];
            this.leftListRent = [];
            this.rightListCollect = [];
            this.rightListRent = [];
            break;
          case 'search':
            this.contractListChc = [];  //合同数据收
            this.contractListRhc = [];  //合同数据租
            this.contractHouse = [];    //头部房屋信息
            break;
          case'other':
            this.checkMax = 1;
            this.types = '';
            break;
        }
      },
      // 房屋合并
      houseOn(val) {
        this.open(val, 1);
      },
      // 合同合并
      moveSure(val) {
        if (val === 'b') {
          this.$confirm('此操作将忽略此房屋，是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            this.$http.post(this.urls + 'financial/migration/bypass', {
              house_id: this.form.house_id
            }).then((res) => {
              if (res.data.code === '30000') {
                this.details();
                this.$notify.success({
                  title: '成功',
                  message: '操作成功！',
                })
              }
            });
          }).catch(() => {
          });
        } else {
          let data = this.showDetail;
          for (let i = 0; i < data.length; i++) {
            let listF = {};
            let listC = {};
            if (data[i].type === 'leftCollect' || data[i].type === 'rightCollect') {
              if (data[i].leftCcId !== '' && data[i].rightCcId !== '') {
                listF.fcc_id = data[i].leftCcId;
                listF.chc_id = data[i].rightCcId;
                this.form.contract.push(listF);
              }
            } else {
              if (data[i].leftRcId !== '' && data[i].rightRcId !== '') {
                listC.fcr_id = data[i].leftRcId;
                listC.rhc_id = data[i].rightRcId;
                this.form.contract.push(listC);
              }
            }
          }
          let con = this.form.contract;
          if (con.length > 1) {
            for (let i = 0; i < con.length; i++) {
              for (let j = i + 1; j < con.length; j++) {
                if (con[i].fcc_id) {
                  if (con[i].fcc_id === con[j].fcc_id) {
                    this.form.contract.splice(i, 1);
                  }
                }
                if (con[i].fcr_id) {
                  if (con[i].fcr_id === con[j].fcr_id) {
                    this.form.contract.splice(i, 1);
                  }
                }
              }
            }
          }
          this.open('', 2);
        }
      },
      weight(array) {
        return Array.from(new Set(array));
      },
      open(val, num) {
        let con, address, list;
        let allNum = this.formListFc.length + this.formListFr.length;
        let remNum = this.form.contract.length;
        if (num === 1) {
          con = '此操作将合并房屋，不可逆转, 是否继续?';
          address = this.urls + 'financial/migration/combine';
          list = this.formHouse;
        } else {
          con = '此页共有(' + allNum + ')条财务数据,' + '您当前选中了(' + remNum + ')条,是否继续?';
          address = this.urls + 'financial/migration/commit';
          list = this.form;
        }
        this.$confirm(con, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.formHouse.co_id = val;
          this.$http.post(address, list).then((res) => {
            if (res.data.code === '30010') {
              if (num === 1) {
                this.formList.combined = true;
                this.formHouse = {type: 'house', fa_id: '', co_id: ''};
              } else {
                this.details();
              }
              this.$notify.success({
                title: '成功',
                message: res.data.msg,
              })
            } else {
              if (num === 2 && res.data.code === '30011') {
                this.details();
              } else {
                this.$notify.warning({
                  title: '警告',
                  message: res.data.msg,
                })
              }
              if (num === 1 && res.data.code === '30002') {
                this.$http.get(this.urls + 'financial/migration/suggest?house_id=' + this.forms.house_id).then((res) => {
                  this.dialogVisible = true;
                  if (res.data.code === '30000') {
                    this.forms.building = res.data.data[0];
                    this.forms.unit = res.data.data[1];
                    this.forms.house_number = res.data.data[2];
                  } else {
                    this.$notify.warning({
                      title: '警告',
                      message: res.data.msg,
                    })
                  }
                })
              } else {
                this.$notify.warning({
                  title: '警告',
                  message: res.data.msg,
                })
              }
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
    .moneySearch {
      margin-top: 12px;
      label {
        color: #000DFF;
        text-align: left;
      }
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
          border-bottom: 1px solid #DDDDDD;
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
          border-bottom: 0;
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
      .foot + .foot {
        border-top: 1px solid #DDDDDD;
      }
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
