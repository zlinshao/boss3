<template>
  <div id="addHouseResources">
    <el-dialog title="登记房源" :visible.sync="addHouseResourcesDialogVisible" width="60%">
      <div class="scroll_bar">
        <div class="title">房源信息</div>
        <div class="form_border">
          <el-form size="mini" :model="formInline" label-width="100px">
            <el-row >
              <el-col :span="6">
                <el-form-item label="小区名称" required>
                  <el-input placeholder="请输入内容">换房</el-input>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="小区地址" required>
                  <el-input placeholder="请输入内容"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="门牌地址" required>
                  <el-input placeholder="请输入内容"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="房型">
                  <el-select clearable v-model="formInline.region" placeholder="请选择房型">
                    <el-option label="一室一厅" value="shanghai"></el-option>
                    <el-option label="二室一厅" value="beijing"></el-option>
                    <el-option label="三室一厅" value="bei"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row >
              <el-col :span="6">
                <el-form-item label="建筑面积" required>
                  <el-input placeholder="请输入内容">换房</el-input>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="装修">
                  <el-select clearable v-model="formInline.region" placeholder="请选择装修类型">
                    <el-option label="精装修" value="shanghai"></el-option>
                    <el-option label="毛坯房" value="beijing"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="楼层" required>
                  <el-input placeholder="请输入内容"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="房屋类型">
                  <el-select clearable v-model="formInline.region" placeholder="请选择房屋类型">
                    <el-option label="一般出租" value="shanghai"></el-option>
                    <el-option label="毛坯房" value="beijing"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>

            <el-row >
              <el-col :span="6">
                <el-form-item label="房屋特色">
                  <el-select clearable v-model="formInline.region" placeholder="请选择房屋特色">
                    <el-option label="精装修" value="shanghai"></el-option>
                    <el-option label="毛坯房" value="beijing"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="建筑楼层" required>
                  <el-input placeholder="请输入内容">换房</el-input>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="钥匙数" required>
                  <el-input placeholder="请输入内容"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="门卡数" required>
                  <el-input placeholder="请输入内容"></el-input>
                </el-form-item>
              </el-col>
            </el-row>

            <el-row >
              <el-col :span="6">
                <el-form-item label="水表卡号" required>
                  <el-input placeholder="请输入内容">换房</el-input>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="燃气表卡号" required>
                  <el-input placeholder="请输入内容">换房</el-input>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="电表卡号" required>
                  <el-input placeholder="请输入内容"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="卫生情况">
                  <el-select clearable v-model="formInline.region" placeholder="请选择卫生情况">
                    <el-option label="一般" value="shanghai"></el-option>
                    <el-option label="良好" value="beijing"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row >
              <el-col :span="6">
                <el-form-item label="水表底数" required>
                  <el-input placeholder="请输入内容">换房</el-input>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="燃气表底数" required>
                  <el-input placeholder="请输入内容">换房</el-input>
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
            <el-row>
              <el-col :span="12">
                <el-form-item label="配套设施">
                  <el-input type="textarea"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="备注">
                  <el-input type="textarea"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </div>
        <div class="title">房东信息</div>
        <div class="form_border">
          <el-form size="mini" :model="formInline" label-width="100px">
            <el-row >
              <el-col :span="6">
                <el-form-item label="房东姓名" required>
                  <el-input placeholder="请输入内容"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="尊称" required>
                  <el-radio-group v-model="formInline.resource">
                    <el-radio label="先生"></el-radio>
                    <el-radio label="女士"></el-radio>
                  </el-radio-group>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="附属房东" required>
                  <el-input placeholder="请输入内容"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="联系电话" required>
                  <el-input placeholder="请输入内容"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row >
              <el-col :span="6">
                <el-form-item label="证件类型">
                  <el-select clearable v-model="formInline.region" placeholder="请选择装修类型">
                    <el-option label="身份证" value="shanghai"></el-option>
                    <el-option label="护照" value="beijing"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="证件号码" required>
                  <el-input placeholder="请输入内容"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="国籍">
                  <el-select clearable v-model="formInline.region" placeholder="请选择房屋类型">
                    <el-option label="一般出租" value="shanghai"></el-option>
                    <el-option label="毛坯房" value="beijing"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <el-form-item label="备注">
                  <el-input type="textarea"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </div>

        <div class="title">合同信息</div>
        <div class="form_border">
          <el-form size="mini" :model="formInline" label-width="100px">
            <el-row >
              <el-col :span="6">
                <el-form-item label="合同编号" required>
                  <el-input placeholder="请输入内容"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="合同性质">
                  <el-select clearable v-model="formInline.region" placeholder="请选择合同性质">
                    <el-option label="收房合同" value="shanghai"></el-option>
                    <el-option label="租房合同" value="beijing"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="付款方式">
                  <el-select clearable v-model="formInline.region" placeholder="请选择合同性质">
                    <el-option label="支付宝" value="shanghai"></el-option>
                    <el-option label="微信" value="beijing"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="签约时长" required>
                  <el-input placeholder="请输入内容"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row >
              <el-col :span="6">
                <el-form-item label="合同开始时间">
                  <el-date-picker type="date" placeholder="选择日期" v-model="formInline.date1"></el-date-picker>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="合同结束时间">
                  <el-date-picker type="date" placeholder="选择日期" v-model="formInline.date1"></el-date-picker>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="签约时长" required>
                  <el-input placeholder="请输入内容"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="空置开始时间">
                  <el-date-picker type="date" placeholder="选择日期" v-model="formInline.date1"></el-date-picker>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="6">
                <el-form-item label="空置结束时间">
                  <el-date-picker type="date" placeholder="选择日期" v-model="formInline.date1"></el-date-picker>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="中介/个人">
                  <el-select clearable v-model="formInline.region" placeholder="请选择合同性质">
                    <el-option label="中介" value="shanghai"></el-option>
                    <el-option label="个人" value="beijing"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="中介费" required>
                  <el-input placeholder="请输入内容"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="资料补齐时间">
                  <el-date-picker type="date" placeholder="选择日期" v-model="formInline.date1"></el-date-picker>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="6">
                <el-form-item label="月单价">
                  <el-input placeholder="请输入内容"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="押金">
                  <el-input placeholder="请输入内容"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="打房租日期">
                  <el-input>
                    <template slot="prepend">每期</template>
                    <template slot="append">号</template>
                  </el-input>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="第一次打房租">
                  <el-date-picker type="date" placeholder="选择日期" v-model="formInline.date1"></el-date-picker>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="6">
                <el-form-item label="第二次打房租">
                  <el-date-picker type="date" placeholder="选择日期" v-model="formInline.date1"></el-date-picker>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="尾款补齐时间">
                  <el-date-picker type="date" placeholder="选择日期" v-model="formInline.date1"></el-date-picker>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="待签约日期">
                  <el-date-picker type="date" placeholder="选择日期" v-model="formInline.date1"></el-date-picker>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="开单人">
                  <el-input placeholder="请输入内容"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="6">
                <el-form-item label="审核人">
                  <el-input placeholder="请输入内容"></el-input>
                </el-form-item>
              </el-col>

              <el-col :span="6">
                <el-form-item label="汇款方式">
                  <el-select clearable v-model="formInline.region" placeholder="请选择合同性质">
                    <el-option label="中介" value="shanghai"></el-option>
                    <el-option label="个人" value="beijing"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="收款姓名">
                  <el-input placeholder="请输入内容"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="开户行">
                  <el-select clearable v-model="formInline.region" placeholder="请选择合同性质">
                    <el-option label="中介" value="shanghai"></el-option>
                    <el-option label="个人" value="beijing"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="6">
                <el-form-item label="支行">
                  <el-input placeholder="请输入内容"></el-input>
                </el-form-item>
              </el-col>

              <el-col :span="6">
                <el-form-item label="账号">
                  <el-input placeholder="请输入内容"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <el-form-item label="备注">
                  <el-input type="textarea"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button size="small" @click="addHouseResourcesDialogVisible = false">取 消</el-button>
        <el-button size="small" type="primary" @click="addHouseResourcesDialogVisible = false">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
  import ElCol from "element-ui/packages/col/src/col";
  import DropZone from '../../common/dropzone.vue'
  export default {
    components: {ElCol,DropZone},
    props:['addHouseResourcesDialog'],
    data() {
      return {
        addHouseResourcesDialogVisible:false,
        formInline: {region:''},
        tableData:[],
        value1:'',
      };
    },
    watch:{
      addHouseResourcesDialog(val){
        this.addHouseResourcesDialogVisible = val
      },
      addHouseResourcesDialogVisible(val){
        if(!val){
          this.$emit('close')
        }
      }
    },
    methods:{

    }
  };
</script>
<style lang="scss">
  #addHouseResources{
    .el-dialog__wrapper{
      .el-dialog{
        .el-dialog__body{
          padding: 15px;
          >div{
            padding-right: 10px;
            max-height: 520px;
            overflow-x: auto;
          }
          .table_border{
            .tableDetail {
              width: 100%;
              border-collapse: collapse;
              tr {
                td {
                  border: 1px solid #ebeef5;
                  padding: 2px 0;
                  color: #606266;
                  text-align: center;
                  &:nth-child(odd) {
                    width: 8%;
                  }
                  &:nth-child(even) {
                    width: 12%;
                  }
                }
              }
            }
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
