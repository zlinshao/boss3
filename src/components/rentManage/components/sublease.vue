<template>
  <div id="sublease">
    <el-dialog title="转租" :visible.sync="subleaseDialogVisible" width="60%">
      <div class="scroll_bar">
        <div class="title">房东信息</div>
        <div class="table_border" >
          <table class="tableDetail">
            <tr>
              <td>合同编号</td>
              <td></td>
              <td>地址</td>
              <td></td>
              <td>户型</td>
              <td></td>
              <td>姓名</td>
              <td></td>
              <td>电话</td>
              <td></td>
            </tr>
            <tr>
              <td>身份证</td>
              <td></td>
              <td>建筑面积</td>
              <td></td>
              <td>押金</td>
              <td></td>
              <td>月单价</td>
              <td></td>
              <td>合同期限</td>
              <td></td>
            </tr>
            <tr>
              <td>合同开始时间</td>
              <td></td>
              <td>合同结束时间</td>
              <td></td>
              <td>门禁卡</td>
              <td></td>
              <td>钥匙数</td>
              <td colspan="3"></td>
              <!--<td>证件号码</td>-->
              <!--<td></td>-->
            </tr>
            <tr>
              <td>水表底数</td>
              <td></td>
              <td>燃气表底数</td>
              <td></td>
              <td>电表底数</td>
              <td colspan="5"></td>
            </tr>
            <tr>
              <td>备注</td>
              <td colspan="9"></td>
            </tr>
          </table>
        </div>
        <div class="title">换房信息</div>
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
                <el-form-item label="身份证号" required>
                  <el-input placeholder="请输入内容"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="合同性质">
                  <el-input :disabled="true">转租合同</el-input>
                </el-form-item>
              </el-col>
              <el-col :span="24">
                <el-form-item label="备注">
                  <div class="describe_border">
                    原租客XXX与浸提将本房屋转与现乙方，双方自行交接清楚房间里所有家具电器以及其他设施。水电气、物管费等能源使用费用的结算，如有任何差错，甲方概不负责。
                  </div>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </div>

        <div class="title">转租信息</div>
        <div class="form_border">
          <el-form size="mini" :model="formInline" label-width="100px">
            <el-row >
              <el-col :span="6">
                <el-form-item label="转租时间" required>
                  <el-date-picker type="date" placeholder="选择日期" style="width: 100%;"></el-date-picker>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="性质" required>
                  <el-input  placeholder="请输入内容"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="手续费" required>
                  <el-input  placeholder="请输入内容"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="经办人">
                  <el-input  placeholder="请输入内容"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </div>

      </div>
      <span slot="footer" class="dialog-footer">
        <el-button size="small" @click="subleaseDialogVisible = false">取 消</el-button>
        <el-button size="small" type="primary" @click="subleaseDialogVisible = false">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
  import ElCol from "element-ui/packages/col/src/col";
  export default {
    components: {ElCol},
    props:['subleaseDialog'],
    data() {
      return {
        subleaseDialogVisible:false,
        formInline: {region:''},
        tableData:[],
        value1:'',
      };
    },
    watch:{
      subleaseDialog(val){
        this.subleaseDialogVisible = val
      },
      subleaseDialogVisible(val){
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
  #sublease{
    .el-dialog__wrapper{
      .el-dialog{
        .el-dialog__body{
          padding: 15px;
          >div{
            padding-right: 10px;
            /*max-height: 520px;*/
            /*overflow-x: auto;*/
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
