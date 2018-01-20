<template>
  <div id="addRentInfo">
    <el-dialog title="登记/修改租客信息" :visible.sync="addRentInfoDialogVisible" width="60%">
      <div class="scroll_bar">
        <div class="title">基本信息</div>
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
        <div class="title">租客信息</div>
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

        <div class="title">租赁信息</div>
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

      </div>
      <span slot="footer" class="dialog-footer">
        <el-button size="small" @click="addRentInfoDialogVisible = false">取 消</el-button>
        <el-button size="small" type="primary" @click="addRentInfoDialogVisible = false">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
  import ElCol from "element-ui/packages/col/src/col";
  export default {
    components: {ElCol},
    props:['addRentInfoDialog'],
    data() {
      return {
        addRentInfoDialogVisible:false,
        formInline: {region:''},
        tableData:[],
        value1:'',
      };
    },
    watch:{
      addRentInfoDialog(val){
        this.addRentInfoDialogVisible = val
      },
      addRentInfoDialogVisible(val){
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
  #addRentInfo{
    .el-dialog__wrapper{
      .el-dialog{
        .el-dialog__body{
          >div{
            padding-right: 10px;
            /*max-height: 520px;*/
            /*overflow-x: auto;*/
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
