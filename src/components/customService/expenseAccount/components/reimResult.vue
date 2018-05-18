<template>
  <div id="reimResult">
    <el-dialog :close-on-click-modal="false" :title="resultTitle" :visible.sync="reimResultDialogVisible"
               width="50%">
      <div class="scroll_bar">
        <el-form size="mini" :model="form" label-width="80px">
          <div class="title">水费</div>
          <div class="describe_border">
            <el-row :gutter="20">
              <el-col :span="10">
                <el-form-item label="水费">
                  <el-date-picker type="daterange" v-model="form.water_fee.time"
                                  range-separator="至"
                                  start-placeholder="开始日期"
                                  end-placeholder="结束日期"
                                  value-format="yyyy-MM-dd"></el-date-picker>
                </el-form-item>
              </el-col>
              <el-col :span="10">
                <el-form-item label="总金额">
                  <el-input v-model="form.water_fee.total" clearable></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="4">
                <span style="color: #409EFF;vertical-align: -webkit-baseline-middle;cursor: pointer;"
                      @click="showAccCom('water')"> +添加认责组成</span>
              </el-col>
            </el-row>
            <div v-if="waterAccCom" v-for="(item,key) in waterAccComLength" :key="key">
              <el-row :gutter="20">
                <el-col :span="8">
                  <el-form-item label="水费">
                    <el-date-picker type="daterange" v-model="form.water_data[key].time"
                                    range-separator="至"
                                    start-placeholder="开始日期"
                                    end-placeholder="结束日期"
                                    value-format="yyyy-MM-dd"></el-date-picker>
                  </el-form-item>
                </el-col>
                <el-col :span="6">
                  <el-form-item label="认责人">
                    <el-select v-model="form.water_data[key].accuser" placeholder="请选择认责归属" clearable>
                      <el-option v-for="item in responsiblePersonCategory" :label="item.dictionary_name" :key="item.id"
                                 :value="item.id">{{item.dictionary_name}}
                      </el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :span="7" v-show="form.water_data[key].accuser === 658">
                  <el-form-item label="认责人姓名">
                    <el-input v-model="form.water_data[key].accuser_id_name" readonly @focus="chooseStaff('water',key)"
                              placeholder="请选择">
                      <template slot="append">
                        <div style="cursor: pointer;" @click="emptyStaff('water',key)">清空</div>
                      </template>
                    </el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="3">
                  <i class="el-icon-circle-plus-outline  add_com" @click="addAccCom('water')"></i>
                  <i class="el-icon-remove-outline  sub_com" @click="subAccCom('water',key)"></i>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="4">
                  <el-form-item label="上次底数">
                    <el-input v-model="form.water_data[key].last" clearable></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="4">
                  <el-form-item label="本次底数">
                    <el-input v-model="form.water_data[key].now" clearable></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="4">
                  <el-form-item label="单价">
                    <el-input v-model="form.water_data[key].unit_price" clearable></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="4">
                  <el-form-item label="滞纳金">
                    <el-input v-model="form.water_data[key].late_payment" clearable></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="4">
                  <el-form-item label="其他">
                    <el-input v-model="form.water_data[key].other" clearable></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="4">
                  <el-form-item label="合计">
                    <el-input v-model="form.water_data[key].total" clearable></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
            </div>
          </div>
          <div class="title">电费</div>
          <div class="describe_border">
            <el-row :gutter="20">
              <el-col :span="10">
                <el-form-item label="电费">
                  <el-date-picker type="daterange" v-model="form.electricity_fee.time"
                                  range-separator="至"
                                  start-placeholder="开始日期"
                                  end-placeholder="结束日期"
                                  value-format="yyyy-MM-dd"></el-date-picker>
                </el-form-item>
              </el-col>
              <el-col :span="10">
                <el-form-item label="总金额">
                  <el-input v-model="form.electricity_fee.total"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="4">
                <span style="color: #409EFF;vertical-align: -webkit-baseline-middle;cursor: pointer;"
                      @click="showAccCom('electricity')"> +添加认责组成</span>
              </el-col>
            </el-row>
            <div v-if="elecAccCom" v-for="(item,key) in elecAccComLength" :key="key">
              <el-row :gutter="20">
                <el-col :span="8">
                  <el-form-item label="电费">
                    <el-date-picker type="daterange" v-model="form.electricity_data[key].time"
                                    range-separator="至"
                                    start-placeholder="开始日期"
                                    end-placeholder="结束日期"
                                    value-format="yyyy-MM-dd"></el-date-picker>
                  </el-form-item>
                </el-col>
                <el-col :span="6">
                  <el-form-item label="认责人">
                    <el-select v-model="form.electricity_data[key].accuser" placeholder="请选择认责归属" clearable>
                      <el-option v-for="item in responsiblePersonCategory" :label="item.dictionary_name" :key="item.id"
                                 :value="item.id">{{item.dictionary_name}}
                      </el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :span="7">
                  <el-form-item label="认责人姓名" v-show="form.electricity_data[key].accuser === 658">
                    <el-input v-model="form.electricity_data[key].accuser_id_name" readonly
                              @focus="chooseStaff('electricity',key)"
                              placeholder="请选择">
                      <template slot="append">
                        <div style="cursor: pointer;" @click="emptyStaff('electricity',key)">清空</div>
                      </template>
                    </el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="3">
                  <i class="el-icon-circle-plus-outline  add_com" @click="addAccCom('electricity')"></i>
                  <i class="el-icon-remove-outline  sub_com" @click="subAccCom('electricity',key)"></i>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="4">
                  <el-form-item label="(峰)上次底数">
                    <el-input v-model="form.electricity_data[key].peak_last" clearable></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="4">
                  <el-form-item label="本次底数">
                    <el-input v-model="form.electricity_data[key].peak_now" clearable></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="4">
                  <el-form-item label="单价">
                    <el-input v-model="form.electricity_data[key].peak_unit_price" clearable></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="4">
                  <el-form-item label="滞纳金">
                    <el-input v-model="form.electricity_data[key].peak_late_payment" clearable></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="4">
                  <el-form-item label="其他">
                    <el-input v-model="form.electricity_data[key].peak_other" clearable></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="4">
                  <el-form-item label="合计">
                    <el-input v-model="form.electricity_data[key].peak_total" clearable></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="4">
                  <el-form-item label="(谷)上次底数">
                    <el-input v-model="form.electricity_data[key].valley_last" clearable></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="4">
                  <el-form-item label="本次底数">
                    <el-input v-model="form.electricity_data[key].valley_now" clearable></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="4">
                  <el-form-item label="单价">
                    <el-input v-model="form.electricity_data[key].valley_unit_price" clearable></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="4">
                  <el-form-item label="滞纳金">
                    <el-input v-model="form.electricity_data[key].valley_late_payment" clearable></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="4">
                  <el-form-item label="其他">
                    <el-input v-model="form.electricity_data[key].valley_other" clearable></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="4">
                  <el-form-item label="合计">
                    <el-input v-model="form.electricity_data[key].valley_total" clearable></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
            </div>
          </div>
          <div class="title">燃气费</div>
          <div class="describe_border">
            <el-row :gutter="20">
              <el-col :span="10">
                <el-form-item label="燃气费">
                  <el-date-picker type="daterange" v-model="form.gas_fee.time"
                                  range-separator="至"
                                  start-placeholder="开始日期"
                                  end-placeholder="结束日期"
                                  value-format="yyyy-MM-dd"></el-date-picker>
                </el-form-item>
              </el-col>
              <el-col :span="10">
                <el-form-item label="总金额">
                  <el-input v-model="form.gas_fee.total"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="4">
                <span style="color: #409EFF;vertical-align: -webkit-baseline-middle;cursor: pointer;"
                      @click="showAccCom('gas')"> +添加认责组成</span>
              </el-col>
            </el-row>
            <div v-if="gasAccCom" v-for="(item,key) in gasAccComLength" :key="key">
              <el-row :gutter="20">
                <el-col :span="8">
                  <el-form-item label="燃气费">
                    <el-date-picker type="daterange" v-model="form.gas_data[key].time"
                                    range-separator="至"
                                    start-placeholder="开始日期"
                                    end-placeholder="结束日期"
                                    value-format="yyyy-MM-dd"></el-date-picker>
                  </el-form-item>
                </el-col>
                <el-col :span="6">
                  <el-form-item label="认责人">
                    <el-select v-model="form.gas_data[key].accuser" placeholder="请选择认责归属" clearable>
                      <el-option v-for="item in responsiblePersonCategory" :label="item.dictionary_name" :key="item.id"
                                 :value="item.id">{{item.dictionary_name}}
                      </el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :span="7">
                  <el-form-item label="认责人姓名" v-show="form.gas_data[key].accuser === 658">
                    <el-input v-model="form.gas_data[key].accuser_id_name" readonly @focus="chooseStaff('gas',key)"
                              placeholder="请选择">
                      <template slot="append">
                        <div style="cursor: pointer;" @click="emptyStaff('gas',key)">清空</div>
                      </template>
                    </el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="3">
                  <i class="el-icon-circle-plus-outline  add_com" @click="addAccCom('gas')"></i>
                  <i class="el-icon-remove-outline  sub_com" @click="subAccCom('gas',key)"></i>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="4">
                  <el-form-item label="上次底数">
                    <el-input v-model="form.gas_data[key].last" clearable></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="4">
                  <el-form-item label="本次底数">
                    <el-input v-model="form.gas_data[key].now" clearable></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="4">
                  <el-form-item label="单价">
                    <el-input v-model="form.gas_data[key].unit_price" clearable></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="4">
                  <el-form-item label="滞纳金">
                    <el-input v-model="form.gas_data[key].late_payment" clearable></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="4">
                  <el-form-item label="其他">
                    <el-input v-model="form.gas_data[key].other" clearable></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="4">
                  <el-form-item label="合计">
                    <el-input v-model="form.gas_data[key].total" clearable></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
            </div>
          </div>
          <div class="title">物管费</div>
          <div class="describe_border">
            <el-row :gutter="20">
              <el-col :span="10">
                <el-form-item label="物管费">
                  <el-date-picker type="daterange" v-model="form.property_management_fee.time"
                                  range-separator="至"
                                  start-placeholder="开始日期"
                                  end-placeholder="结束日期"
                                  value-format="yyyy-MM-dd"></el-date-picker>
                </el-form-item>
              </el-col>
              <el-col :span="10">
                <el-form-item label="总金额">
                  <el-input v-model="form.property_management_fee.total"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="4">
                <span style="color: #409EFF;vertical-align: -webkit-baseline-middle;cursor: pointer;"
                      @click="showAccCom('prop')"> +添加认责组成</span>
              </el-col>
            </el-row>
            <div v-if="propAccCom" v-for="(item,key) in propAccComLength" :key="key">
              <el-row :gutter="20">
                <el-col :span="8">
                  <el-form-item label="物管费">
                    <el-date-picker type="daterange" v-model="form.property_management_data[key].time"
                                    range-separator="至"
                                    start-placeholder="开始日期"
                                    end-placeholder="结束日期"
                                    value-format="yyyy-MM-dd"></el-date-picker>
                  </el-form-item>
                </el-col>
                <el-col :span="6">
                  <el-form-item label="认责人">
                    <el-select v-model="form.property_management_data[key].accuser" placeholder="请选择认责归属" clearable>
                      <el-option v-for="item in responsiblePersonCategory" :label="item.dictionary_name" :key="item.id"
                                 :value="item.id">{{item.dictionary_name}}
                      </el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :span="7">
                  <el-form-item label="认责人姓名" v-show="form.property_management_data[key].accuser === 658">
                    <el-input v-model="form.property_management_data[key].accuser_id_name" readonly
                              @focus="chooseStaff('prop',key)"
                              placeholder="请选择">
                      <template slot="append">
                        <div style="cursor: pointer;" @click="emptyStaff('prop',key)">清空</div>
                      </template>
                    </el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="3">
                  <i class="el-icon-circle-plus-outline  add_com" @click="addAccCom('prop')"></i>
                  <i class="el-icon-remove-outline  sub_com" @click="subAccCom('prop',key)"></i>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="10">
                  <el-form-item label="上次时间">
                    <el-date-picker type="date" value-format="yyyy-MM-dd"
                                    v-model="form.property_management_data[key].last"
                                    placeholder="请选择日期"></el-date-picker>
                  </el-form-item>
                </el-col>
                <el-col :span="10">
                  <el-form-item label="本次时间">
                    <el-date-picker type="date" value-format="yyyy-MM-dd"
                                    v-model="form.property_management_data[key].now"
                                    placeholder="请选择日期"></el-date-picker>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="5">
                  <el-form-item label="公摊水费">
                    <el-input v-model="form.property_management_data[key].water" clearable></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="5">
                  <el-form-item label="公摊电费">
                    <el-input v-model="form.property_management_data[key].electricity" clearable></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="5">
                  <el-form-item label="物业费">
                    <el-input v-model="form.property_management_data[key].fees" clearable></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="5">
                  <el-form-item label="其他">
                    <el-input v-model="form.property_management_data[key].other" clearable></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="4">
                  <el-form-item label="合计">
                    <el-input v-model="form.property_management_data[key].total" clearable></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
            </div>
          </div>
          <el-row>
            <el-col :span="24">
              <el-form-item label="截图">
                <Upload :ID="'result'" @getImg="getResultImage" :editImage="picResultImg" :isClear="isClear"></Upload>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="16">
              <el-form-item label="备注">
                <el-input type="textarea" v-model="form.remark"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button size="small" @click="reimResultDialogVisible = false;">取 消</el-button>
        <el-button size="small" type="primary" @click="confirmAdd(1)">保 存</el-button>
        <el-button size="small" type="primary" @click="confirmAdd(2)">保存并提交</el-button>
      </span>
    </el-dialog>
    <Organization :organizationDialog="organizationDialog" :type="organizeType" @close="closeOrganization"
                  @selectMember="selectMember"></Organization>
  </div>
</template>

<script>
  import Organization from '../../../common/organization';
  import Upload from '../../../common/UPLOAD.vue';

  export default {
    props: ['reimResultDialog', 'reimbursementId', 'type', 'resultId'],
    components: {Organization, Upload},
    data() {
      return {
        reimResultDialogVisible: false,
        organizationDialog: false,
        organizeType: '',
        isClear: false,
        uploadStatus: false,
        form: {
          reimbursement_id: '', //维修单id
          //水费
          water_fee: {
            time: [],
            total: '',
          },
          water_data: [],
          //电费
          electricity_fee: {
            time: [],
            total: '',
          },
          electricity_data: [],
          //燃气费
          gas_fee: {
            time: [],
            total: '',
          },
          gas_data: [],
          //物管费
          property_management_fee: {
            time: [],
            total: '',
          },
          property_management_data: [],
          image_pic: '',  //截图
          remark: '',  //备注
        },
        picResultImg: {},
        reimbursementTypeCategory: [],  //报销类型
        reimbursementSourceCategory: [],  //报销来源
        finishedStatusCategory: [],  //完成情况
        responsiblePersonCategory: [],  //认责人

        resultTitle: this.type == 'add' ? '新增报销结果' : '编辑报销结果',
        waterAccCom: false,  //水费认责组成
        waterAccComLength: 1,  //水费认责组成的长度
        waterKey: '',  //当前选中的水费认责组成
        elecKey: '',
        gasKey: '',
        propKey: '',

        elecAccCom: false,
        elecAccComLength: 1,

        gasAccCom: false,
        gasAccComLength: 1,

        propAccCom: false,
        propAccComLength: 1,
        currentOrganize: '',  //当前选人组件被谁打开  water/elec/gas/prop
      };
    },
    watch: {
      reimResultDialog(val) {
        this.reimResultDialogVisible = val;
      },
      reimResultDialogVisible(val) {
        if (!val) {
          this.$emit('close');
          this.initial();
        } else {
          if (this.type == 'add') {
            this.resultTitle = '新增报销结果';
          } else if (this.type == 'edit') {
            this.resultTitle = '编辑报销结果';
            if (this.reimbursementId) {
              this.getReimResultDetail();
            }
          }
          this.isClear = false;
          this.form.reimbursement_id = this.reimbursementId;

        }
      },
      'form.water_data': {
        deep: true,
        handler(val, oldVal) {
          if (val.length > 0) {
            for (var i = 0; i < val.length; i++) {
              let now = Number(val[i].now);
              let last = Number(val[i].last);
              let unit_price = Number(val[i].unit_price);
              let late_payment = Number(val[i].late_payment);
              let other = Number(val[i].other);
              val[i].total = (now - last) * unit_price + late_payment + other;
            }
          }
        }
      },
      'form.electricity_data': {
        deep: true,
        handler(val, oldVal) {
          if (val.length > 0) {
            for (var i = 0; i < val.length; i++) {
              let now = Number(val[i].peak_now);
              let last = Number(val[i].peak_last);
              let unit_price = Number(val[i].peak_unit_price);
              let late_payment = Number(val[i].peak_late_payment);
              let other = Number(val[i].peak_other);
              val[i].peak_total = (now - last) * unit_price + late_payment + other;

              let valley_now = Number(val[i].valley_now);
              let valley_last = Number(val[i].valley_last);
              let valley_unit_price = Number(val[i].valley_unit_price);
              let valley_late_payment = Number(val[i].valley_late_payment);
              let valley_other = Number(val[i].valley_other);
              val[i].valley_total = (valley_now - valley_last) * valley_unit_price + valley_late_payment + valley_other;
            }
          }
        }
      },
      'form.gas_data': {
        deep: true,
        handler(val, oldVal) {
          if (val.length > 0) {
            for (var i = 0; i < val.length; i++) {
              let now = Number(val[i].now);
              let last = Number(val[i].last);
              let unit_price = Number(val[i].unit_price);
              let late_payment = Number(val[i].late_payment);
              let other = Number(val[i].other);
              val[i].total = (now - last) * unit_price + late_payment + other;
            }
          }
        }
      },
      'form.property_management_data': {
        deep: true,
        handler(val, oldVal) {
          if (val.length > 0) {
            for (var i = 0; i < val.length; i++) {
              let water = Number(val[i].water);
              let electricity = Number(val[i].electricity);
              let fees = Number(val[i].fees);
              let other = Number(val[i].other);
              val[i].total = water + electricity + fees + other;
            }
          }
        }
      },

    },
    mounted() {
      this.getDictionary();
    },
    methods: {
      showAccCom(val) {
        let data = {
          time: [],
          accuser: '',  //认责人下拉框
          accuser_id: '',  // 认责人id
          accuser_id_name: '',   //认责人姓名
          last: '',  //上次底数
          now: '',  //本次底数
          unit_price: '',  //单价
          late_payment: '',  //滞纳金
          other: '',   //其他
          total: '',  //合计
        };
        switch (val) {
          case 'water':
            this.waterAccCom = true;
            this.waterAccComLength = 1;
            this.form.water_data = [];
            this.form.water_data.push(data);
            break;
          case 'electricity':
            this.elecAccCom = true;
            this.elecAccComLength = 1;
            this.form.electricity_data = [];
            let elecData = {
              time: [],
              accuser: '',
              accuser_id: '',  // 认责人id
              accuser_id_name: '',   //认责人姓名
              peak_last: '',
              peak_now: '',
              peak_unit_price: '',
              peak_late_payment: '',
              peak_other: '',
              peak_total: '',
              valley_last: '',
              valley_now: '',
              valley_unit_price: '',
              valley_late_payment: '',
              valley_other: '',
              valley_total: '',
            };
            this.form.electricity_data.push(elecData);
            break;
          case 'gas':
            this.gasAccCom = true;
            this.gasAccComLength = 1;
            this.form.gas_data = [];
            this.form.gas_data.push(data);
            break;
          case 'prop':
            this.propAccCom = true;
            this.propAccComLength = 1;
            this.form.property_management_data = [];
            let propData = {
              time: [],
              accuser: '',
              accuser_id: '',  // 认责人id
              accuser_id_name: '',   //认责人姓名
              last: '',
              now: '',
              water: '',
              electricity: '',
              fees: '',
              other: '',
              total: '',
            };
            this.form.property_management_data.push(propData);
            break;
        }

      },
      addAccCom(val) {
        let data = {
          time: [],
          accuser: '',  //认责人下拉框
          accuser_id: '',  // 认责人id
          accuser_id_name: '',   //认责人姓名
          last: '',  //上次底数
          now: '',  //本次底数
          unit_price: '',  //单价
          late_payment: '',  //滞纳金
          other: '',   //其他
          total: '',  //合计
        };
        switch (val) {
          case 'water':
            this.waterAccComLength++;
            this.form.water_data.push(data);
            break;
          case 'electricity':
            this.elecAccComLength++;
            let elecData = {
              time: [],
              accuser: '',
              accuser_id: '',  // 认责人id
              accuser_id_name: '',   //认责人姓名
              peak_last: '',
              peak_now: '',
              peak_unit_price: '',
              peak_late_payment: '',
              peak_other: '',
              peak_total: '',
              valley_last: '',
              valley_now: '',
              valley_unit_price: '',
              valley_late_payment: '',
              valley_other: '',
              valley_total: '',
            };
            this.form.electricity_data.push(elecData);
            break;
          case 'gas':
            this.gasAccComLength++;
            this.form.gas_data.push(data);
            break;
          case 'prop':
            this.propAccComLength++;
            let propData = {
              time: [],
              accuser: '',
              accuser_id: '',  // 认责人id
              accuser_id_name: '',   //认责人姓名
              last: '',
              now: '',
              water: '',
              electricity: '',
              fees: '',
              other: '',
              total: '',
            };
            this.form.property_management_data.push(propData);
            break;
        }
      },
      subAccCom(val, key) {
        switch (val) {
          case 'water':
            this.waterAccComLength--;
            this.form.water_data.splice(key, 1);
            break;
          case 'electricity':
            this.elecAccComLength--;
            this.form.electricity_data.splice(key, 1);
            break;
          case 'gas':
            this.gasAccComLength--;
            this.form.gas_data.splice(key, 1);
            break;
          case 'prop':
            this.propAccComLength--;
            this.form.property_management_data.splice(key, 1);
            break;
        }
      },
      getDictionary() {
        this.dictionary(640).then((res) => {  //报销类型
          this.reimbursementTypeCategory = res.data;
        });
        this.dictionary(641).then((res) => {  //报销来源
          this.reimbursementSourceCategory = res.data;
        });
        this.dictionary(642).then((res) => {  //完成情况
          this.finishedStatusCategory = res.data;
        });
        this.dictionary(643, 1).then((res) => {  //认责人
          this.responsiblePersonCategory = res.data;
        });
      },
      getResultImage(val) {
        this.form.image_pic = val[1]; //选择的图片数组ids
        this.uploadStatus = val[2];
      },
      //获取报销单编号
      getNumber() {
        this.$http.get(globalConfig.server + 'customer/reimbursement/last').then((res) => {
          if (res.data.code === '30050') {
            this.form.reimbursement_number = res.data.data;
          }
        });
      },
      //获取报销单详情
      getReimResultDetail() {
        this.$http.get(globalConfig.server + 'customer/reimbursement_result/' + this.reimbursementId).then((res) => {
          if (res.data.code === '40020') {
            let detail = res.data.data;
            if (detail) {
              this.form.water_fee = detail.water_fee;
              this.form.water_data = detail.water_data;
              this.waterAccComLength = detail.water_data.length;
              this.waterAccCom = detail.water_data.length > 0 ? true : false;

              this.form.electricity_fee = detail.electricity_fee;
              this.form.electricity_data = detail.electricity_data;
              this.elecAccComLength = detail.electricity_data.length;
              this.elecAccCom = detail.electricity_data.length > 0 ? true : false;

              this.form.gas_fee = detail.gas_fee;
              this.form.gas_data = detail.gas_data;
              this.gasAccComLength = detail.gas_data.length;
              this.gasAccCom = detail.gas_data.length > 0 ? true : false;

              this.form.property_management_fee = detail.property_management_fee;
              this.form.property_management_data = detail.property_management_data;
              this.propAccComLength = detail.property_management_data.length;
              this.propAccCom = detail.property_management_data.length > 0 ? true : false;

              this.form.remark = detail.remark;
              let pic = detail.album.image_pic;
              this.form.image_pic = [];
              let picObject = {};
              pic.forEach((item) => {
                this.form.image_pic.push(item.id);
                picObject[item.id] = item.uri;
              });
              this.picResultImg = picObject;
            }

          }
        });
      },
      confirmAdd(val) {
        this.form.status = val;
        if (this.type === 'edit') {
          //编辑
          this.$http.put(globalConfig.server + 'customer/reimbursement_result/' + this.reimbursementId, this.form).then((res) => {
            if (res.data.code === '40030') {
              this.$notify.success({
                title: '成功',
                message: res.data.msg
              });
              this.reimResultDialogVisible = false;
            } else {
              this.$notify.warning({
                title: '警告',
                message: res.data.msg
              });
            }
          });
        } else if (this.type === 'add') {
          //新增
          this.$http.post(globalConfig.server + 'customer/reimbursement_result', this.form).then((res) => {
            if (res.data.code === '40010') {
              this.$notify.success({
                title: '成功',
                message: res.data.msg
              });
              this.reimResultDialogVisible = false;
            } else {
              this.$notify.warning({
                title: '警告',
                message: res.data.msg
              });
            }
          });
        }


      },
      initial() {
        this.form = {
          reimbursement_id: '',
          water_fee: {
            time: [],
            total: '',
          },
          water_data: [],
          electricity_fee: {
            time: [],
            total: '',
          },
          electricity_data: [],
          gas_fee: {
            time: [],
            total: '',
          },
          gas_data: [],
          property_management_fee: {
            time: [],
            total: '',
          },
          property_management_data: [],
          image_pic: '',
          remark: '',
        };
        this.waterAccCom = false;
        this.waterAccComLength = 1;
        this.elecAccCom = false;
        this.elecAccComLength = 1;
        this.gasAccCom = false;
        this.gasAccComLength = 1;
        this.propAccCom = false;
        this.propAccComLength = 1;
        this.isClear = true;
        this.picResultImg = {};

      },
      closeOrganization() {
        this.organizeType = '';
        this.organizationDialog = false;
      },
      selectMember(val) {
        switch(this.currentOrganize){
          case 'water':
            this.form.water_data[this.waterKey].accuser_id_name = val[0].name;
            this.form.water_data[this.waterKey].accuser_id = val[0].id;
            break;
          case 'electricity':
            this.form.electricity_data[this.elecKey].accuser_id_name = val[0].name;
            this.form.electricity_data[this.elecKey].accuser_id = val[0].id;
            break;
          case 'gas':
            this.form.gas_data[this.gasKey].accuser_id_name = val[0].name;
            this.form.gas_data[this.gasKey].accuser_id = val[0].id;
            break;
          case 'prop':
            this.form.property_management_data[this.propKey].accuser_id_name = val[0].name;
            this.form.property_management_data[this.propKey].accuser_id = val[0].id;
            break;
        }

      },
      chooseStaff(val, key) {
        this.organizationDialog = true;
        this.organizeType = 'staff';
        if (val == 'water') {
          this.currentOrganize = 'water';
          this.waterKey = key;
        } else if (val === 'electricity') {
          this.currentOrganize = 'electricity';
          this.elecKey = key;
        } else if (val === 'gas') {
          this.currentOrganize = 'gas';
          this.gasKey = key;
        } else if (val === 'prop') {
          this.currentOrganize = 'prop';
          this.propKey = key;
        }
      },
      //清空认责人
      emptyStaff(val, key) {
        if (val === 'water') {
          this.form.water_data[key].accuser_id_name = '';
          this.form.water_data[key].accuser_id = '';
        } else if (val === 'electricity') {
          this.form.electricity_data[key].accuser_id_name = '';
          this.form.electricity_data[key].accuser_id = '';
        } else if (val === 'gas') {
          this.form.gas_data[key].accuser_id_name = '';
          this.form.gas_data[key].accuser_id = '';
        } else if (val === 'prop') {
          this.form.property_management_data[key].accuser_id_name = '';
          this.form.property_management_data[key].accuser_id = '';
        }
      }
    },
  };
</script>
<style lang="scss" scoped="">
  .add_com {
    color: #409eff;
    font-size: 18px;
    vertical-align: middle;
    cursor: pointer;
  }

  .sub_com {
    color: #409eff;
    font-size: 18px;
    vertical-align: middle;
    margin-left: 10px;
    cursor: pointer;
  }

</style>
