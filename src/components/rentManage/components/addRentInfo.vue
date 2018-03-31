<template>
  <div id="addRentInfo">
    <el-dialog title="登记/修改租客信息" :visible.sync="addRentInfoDialogVisible" width="60%">

      <el-tabs v-model="activeName">
        <el-tab-pane label="基本信息" name="first">
          <div class="form_border" >
            <el-form size="mini" :model="formInline" label-width="100px">
              <el-row >
                <el-col :span="8">
                  <el-form-item label="合同编号" required>
                    <el-input>换房</el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="房屋地址" required>
                    <el-input placeholder="请输入内容"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="户型" required>
                    <el-input placeholder="请输入内容"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="收房价格" required>
                    <el-input placeholder="请输入内容"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="押金" required>
                    <el-input placeholder="请输入内容"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="录入时间" required>
                    <el-input placeholder="请输入内容"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
            </el-form>
          </div>
        </el-tab-pane>
        <el-tab-pane label="租客信息" name="second">
          <div class="form_border">
            <el-form size="mini" :model="formInline" label-width="100px">
              <el-row >
                <el-col :span="6">
                  <el-form-item label="租客姓名" required>
                    <el-input>换房</el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="6">
                  <el-form-item label="电话" required>
                    <el-input placeholder="请输入内容"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="6">
                  <el-form-item label="证件类型">
                    <el-select v-model="formInline.region" placeholder="请选择证件类型">
                      <el-option label="区域一" value="shanghai"></el-option>
                      <el-option label="区域二" value="beijing"></el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :span="6">
                  <el-form-item label="证件号码">
                    <el-input placeholder="请输入内容"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
            </el-form>
          </div>
        </el-tab-pane>
        <el-tab-pane label="租赁信息" name="third">
          <div class="form_border">
            <el-form size="mini" :model="formInline" label-width="100px">
              <el-row >
                <el-col :span="6">
                  <el-form-item label="合同开始时间">
                    <el-date-picker type="date" placeholder="选择日期" style="width: 100%;"></el-date-picker>
                  </el-form-item>
                </el-col>
                <el-col :span="6">
                  <el-form-item label="合同结束时间">
                    <el-date-picker type="date" placeholder="选择日期" style="width: 100%;"></el-date-picker>
                  </el-form-item>
                </el-col>
                <el-col :span="6">
                  <el-form-item label="录入时间">
                    <el-date-picker type="date" placeholder="选择日期" style="width: 100%;"></el-date-picker>
                  </el-form-item>
                </el-col>
                <el-col :span="6">
                  <el-form-item label="合同性质">
                    <el-select v-model="formInline.region" placeholder="请选择证件类型">
                      <el-option label="区域一" value="shanghai"></el-option>
                      <el-option label="区域二" value="beijing"></el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row >
                <el-col :span="6">
                  <el-form-item label="付款方式">
                    <el-select v-model="formInline.region" placeholder="请选择付款方式">
                      <el-option label="区域一" value="shanghai"></el-option>
                      <el-option label="区域二" value="beijing"></el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :span="6">
                  <el-form-item label="押金">
                    <el-input placeholder="请输入内容"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="6">
                  <el-form-item label="月单价">
                    <el-input placeholder="请输入内容"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="6">
                  <el-form-item label="签约时间">
                    <el-date-picker type="date" placeholder="选择日期" style="width: 100%;"></el-date-picker>
                  </el-form-item>
                </el-col>
              </el-row>

              <el-row >
                <el-col :span="6">
                  <el-form-item label="钥匙">
                    <el-input placeholder="请输入内容"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="6">
                  <el-form-item label="门卡数">
                    <el-input placeholder="请输入内容"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="6">
                  <el-form-item label="卫生情况">
                    <el-select v-model="formInline.region" placeholder="请选择卫生情况">
                      <el-option label="区域一" value="shanghai"></el-option>
                      <el-option label="区域二" value="beijing"></el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :span="6">
                  <el-form-item label="开单人">
                    <el-input placeholder="请输入内容"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>

              <el-row >
                <el-col :span="6">
                  <el-form-item label="水表底数">
                    <el-input placeholder="请输入内容"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="6">
                  <el-form-item label="气表底数">
                    <el-input placeholder="请输入内容"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="电表底数">
                    <el-row>
                      <el-col :span="8">
                        <el-form-item label="峰" label-width="40px" style="margin-bottom: 0;">
                          <el-input placeholder="请输入内容"></el-input>
                        </el-form-item>
                      </el-col>
                      <el-col :span="8">
                        <el-form-item label="谷" label-width="40px" style="margin-bottom: 0;">
                          <el-input placeholder="请输入内容"></el-input>
                        </el-form-item>
                      </el-col>
                      <el-col :span="8">
                        <el-form-item label="总" label-width="40px" style="margin-bottom: 0;">
                          <el-input placeholder="请输入内容"></el-input>
                        </el-form-item>
                      </el-col>
                    </el-row>
                  </el-form-item>
                </el-col>
              </el-row>

              <el-row >
                <el-col :span="6">
                  <el-form-item label="负责人">
                    <el-input placeholder="请输入内容"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="6">
                  <el-form-item label="所属部门">
                    <el-input placeholder="请输入内容"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="6">
                  <el-form-item label="操作人">
                    <el-input placeholder="请输入内容"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="6">
                  <el-form-item label="历史租客">
                    <el-input placeholder="请输入内容"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>

              <el-form-item label="备注">
                <el-input type="textarea" v-model="formInline.desc"></el-input>
              </el-form-item>
            </el-form>
          </div>
        </el-tab-pane>
        <el-tab-pane label="合同照片" name="fourth">
          <div class="scroll_bar">
            <!--<div class="title">房源信息</div>-->
            <!--<div class="title">房东信息</div>-->
            <!--<div class="title">合同信息</div>-->
            <el-form label-width="100px">
              <el-form-item label="证件照片" required="">
                <UpLoad :ID="'addRent_id_card'" :isClear="isClear" @getImg="getImg"></UpLoad>
              </el-form-item>
              <el-form-item label="银行卡照片" required="">
                <UpLoad :ID="'addRent_bank_card'" :isClear="isClear" @getImg="getImg"></UpLoad>
              </el-form-item>
              <el-form-item label="合同照片" required="">
                <UpLoad :ID="'addRent_contract_card'" :isClear="isClear" @getImg="getImg"></UpLoad>
              </el-form-item>
              <el-form-item label="水表照片">
                <UpLoad :ID="'addRent_water_card'" :isClear="isClear" @getImg="getImg"></UpLoad>
              </el-form-item>
              <el-form-item label="电表照片">
                <UpLoad :ID="'addRent_ele_card'" :isClear="isClear" @getImg="getImg"></UpLoad>
              </el-form-item>
              <el-form-item label="燃气表照片">
                <UpLoad :ID="'addRent_gas_card'" :isClear="isClear" @getImg="getImg"></UpLoad>
              </el-form-item>
              <el-form-item label="交接单照片">
                <UpLoad :ID="'addRent_hand_over_card'" :isClear="isClear" @getImg="getImg"></UpLoad>
              </el-form-item>
              <el-form-item label="委托书">
                <UpLoad :ID="'addRent_proxy_card'" :isClear="isClear" @getImg="getImg"></UpLoad>
              </el-form-item>
              <el-form-item label="押金收条">
                <UpLoad :ID="'addRent_deposit_card'" :isClear="isClear" @getImg="getImg"></UpLoad>
              </el-form-item>
              <el-form-item label="承诺书">
                <UpLoad :ID="'addRent_commitment_card'" :isClear="isClear" @getImg="getImg"></UpLoad>
              </el-form-item>
              <el-form-item label="补充照片">
                <UpLoad :ID="'addRent_other_card'" :isClear="isClear" @getImg="getImg"></UpLoad>
              </el-form-item>
            </el-form>
          </div>
        </el-tab-pane>
      </el-tabs>
      <span slot="footer" class="dialog-footer">
        <el-button size="small" @click="addRentInfoDialogVisible = false">取 消</el-button>
        <el-button size="small" type="primary" @click="addRentInfoDialogVisible = false">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
  import UpLoad from '../../common/UPLOAD.vue'
  export default {
    components: {UpLoad},
    props:['addRentInfoDialog'],
    data() {
      return {
        addRentInfoDialogVisible:false,
        formInline: {region:''},
        activeName : 'first',
        isClear:false,
      };
    },
    watch:{
      addRentInfoDialog(val){
        this.addRentInfoDialogVisible = val
      },
      addRentInfoDialogVisible(val){
        if(!val){
          this.$emit('close')
        }else {
          this.isClear = false;
        }
      }
    },
    methods:{
      getImg(val){}
    }
  };
</script>
<style lang="scss">
  #addRentInfo{
    .el-dialog__wrapper{
      .el-dialog{
        .el-dialog__body{
          >div{
            padding-right: 10px;
            max-height: 550px;
            /*overflow-x: auto;*/
          }
          .scroll_bar{
            max-height: 450px;
            overflow-x: auto;
          }
          .form_border{
            .total{
              border-top: 1px solid #dfe6fb;
              padding: 5px;
              text-align: right;
            }
          }

        }
      }
    }
  }

</style>
