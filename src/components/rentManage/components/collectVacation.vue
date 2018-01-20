<template>
  <div id="collectVacation">
    <el-dialog title="房东退房" :visible.sync="collectVacationDialogVisible" width="60%">
      <div class="scroll_bar">
        <div class="title">收房信息</div>
        <div class="table_border" >
          <table class="tableDetail">
            <tr>
              <td>房东姓名</td>
              <td></td>
              <td>联系电话</td>
              <td></td>
              <td>合同开始时间</td>
              <td></td>
              <td>空置期开始时间</td>
              <td></td>
              <td>月单价</td>
              <td></td>
            </tr>
            <tr>
              <td>卫生情况</td>
              <td></td>
              <td>付款方式</td>
              <td></td>
              <td>证件类型</td>
              <td></td>
              <td>合同结束时间</td>
              <td></td>
              <td>空置期结束时间</td>
              <td></td>
            </tr>
            <tr>
              <td>签约时长</td>
              <td></td>
              <td>门卡数量</td>
              <td></td>
              <td>押金</td>
              <td></td>
              <td>证件号码</td>
              <td></td>
              <td>钥匙数</td>
              <td></td>
            </tr>
            <tr>
              <td>空置时长</td>
              <td></td>
              <td>合同性质</td>
              <td></td>
              <td>录入时间</td>
              <td></td>
              <td>水电底数</td>
              <td colspan="3"></td>
            </tr>
            <tr>
              <td>所属部门</td>
              <td></td>
              <td>开单人</td>
              <td></td>
              <td>负责人</td>
              <td></td>
              <td>操作人</td>
              <td colspan="3"></td>
            </tr>
            <tr>
              <td>备注</td>
              <td colspan="9"></td>
            </tr>
          </table>
        </div>

        <div class="title">扣除金额详情</div>
        <div class="form_border">
          <el-form size="mini" :model="formInline" label-width="100px">
            <el-row >
              <el-col :span="6">
                <el-form-item label="水费">
                  <el-input  placeholder="请输入内容"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="电费">
                  <el-input  placeholder="请输入内容"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="燃气费">
                  <el-input  placeholder="请输入内容"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="物业费">
                  <el-input  placeholder="请输入内容"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="公摊费">
                  <el-input  placeholder="请输入内容"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="有线电视费">
                  <el-input  placeholder="请输入内容"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="保洁费">
                  <el-input  placeholder="请输入内容"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="违约金">
                  <el-input  placeholder="请输入内容"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="刷卡费">
                  <el-input  placeholder="请输入内容"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="网络费">
                  <el-input  placeholder="请输入内容"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="转租费">
                  <el-input  placeholder="请输入内容"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="管理费">
                  <el-input  placeholder="请输入内容"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </div>

        <div class="title">退房信息</div>
        <div class="form_border">
          <el-form size="mini" :model="formInline" label-width="100px">
            <el-row >
              <el-col :span="6">
                <el-form-item label="退房时间">
                  <el-date-picker type="date" placeholder="选择日期" style="width: 100%;"></el-date-picker>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="退房性质">
                  <el-select v-model="formInline.region" placeholder="请选择活动区域">
                    <el-option label="区域一" value="shanghai"></el-option>
                    <el-option label="区域二" value="beijing"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="退款账号">
                  <el-input  placeholder="请输入内容"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="退款姓名">
                  <el-input  placeholder="请输入内容"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="开户行">
                  <el-input  placeholder="请输入内容"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="卡号">
                  <el-input  placeholder="请输入内容"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="应退金额">
                  <el-input  placeholder="请输入内容"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="扣除金额">
                  <el-input  placeholder="请输入内容"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="扣除金额">
                  <el-input  placeholder="请输入内容"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="水止数">
                  <el-input  placeholder="请输入内容"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="电止数">
                  <el-input  placeholder="请输入内容"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="燃气止数">
                  <el-input  placeholder="请输入内容"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="物管费">
                  <el-input  placeholder="请输入内容"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="归还钥匙">
                  <el-input  placeholder="请输入内容"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="归还门卡">
                  <el-input  placeholder="请输入内容" style="width: 39%"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="24">
                <el-form-item label="备注">
                  <el-input type="textarea" style="width: 45%"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button size="small" @click="collectVacationDialogVisible = false">取 消</el-button>
        <el-button size="small" type="primary" @click="collectVacationDialogVisible = false">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
  export default {
    props:['collectVacationDialog'],
    data() {
      return {
        collectVacationDialogVisible:false,
        formInline: {region:''},
        tableData:[],
        value1:'',
      };
    },
    watch:{
      collectVacationDialog(val){
        this.collectVacationDialogVisible = val
      },
      collectVacationDialogVisible(val){
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
  #collectVacation{
    .el-dialog__wrapper{
      .el-dialog{
        .el-dialog__body{
          >div{
            padding-right: 10px;
            max-height: 520px;
            overflow-x: auto;
          }
          .table_border{
            font-size: 12px;
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

        }
      }
    }
  }

</style>
