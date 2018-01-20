<template>
  <div id="rentVacation">
    <el-dialog title="租客退房" :visible.sync="rentVacationDialogVisible" width="60%">
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
              <el-col :span="8">
                <el-form-item label="退房时间" required>
                  <el-date-picker type="date" placeholder="选择日期" style="width: 100%;"></el-date-picker>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="退房性质" required>
                  <el-input :disabled="true">换房</el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="所在区域" required>
                  <el-input :readonly="true" placeholder="请输入内容"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="房屋地址" required>
                  <el-input :readonly="true" placeholder="请输入内容"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="开单人" required>
                  <el-input :readonly="true" placeholder="请输入内容"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="负责人" required>
                  <el-input :readonly="true" placeholder="请输入内容"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </div>
        <el-row :gutter="20">
          <el-col :span="12">
            <div class="title">换房原因</div>
            <div class="describe_border"></div>
          </el-col>
          <el-col :span="12">
            <div class="title">维修赔偿详情</div>
            <div class="describe_border"></div>
          </el-col>
        </el-row>
        <div class="title">换房水电气底数</div>
        <div></div>
        <div class="title">应退还</div>
        <div class="form_border">
          <el-form size="mini" :model="formInline" label-width="100px">
            <el-row >
              <el-col :span="6">
                <el-form-item label="退还押金">
                  <el-input >换房</el-input>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="剩余房租">
                  <el-input >换房</el-input>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="收视费">
                  <el-input placeholder="请输入内容"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="预存物管费">
                  <el-input placeholder="请输入内容"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="预存水费">
                  <el-input placeholder="请输入内容"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="预存电费">
                  <el-input placeholder="请输入内容"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="预存气费">
                  <el-input placeholder="请输入内容"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="应退还">
                  <el-input :disabled="true" placeholder="请输入内容"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </div>

        <div class="title">应扣除源能费</div>
        <div class="form_border">
          <el-form size="mini" :model="formInline" label-width="80px">
            <el-row>
              <el-col :span="2" style="text-align: right">
                <el-form-item label="水费：" label-width="100px">
                </el-form-item>
              </el-col>
              <el-col :span="4">
                <el-form-item label="上次底数">
                  <el-input  placeholder="请输入内容"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="4">
                <el-form-item label="本次底数">
                  <el-input  placeholder="请输入内容"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="4">
                <el-form-item label="单价">
                  <el-input  placeholder="请输入内容"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="4">
                <el-form-item label="滞纳金">
                  <el-input  placeholder="请输入内容"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="4">
                <el-form-item label="合计">
                  <el-input  placeholder="请输入内容"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="2" style="text-align: right">
                <el-button size="mini" type="primary">计 算</el-button>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="2" style="text-align: right">
                <el-form-item label="电费（峰）：" label-width="100px">
                </el-form-item>
              </el-col>
              <el-col :span="4">
                <el-form-item label="上次底数">
                  <el-input  placeholder="请输入内容"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="4">
                <el-form-item label="本次底数">
                  <el-input  placeholder="请输入内容"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="4">
                <el-form-item label="单价">
                  <el-input  placeholder="请输入内容"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="4">
                <el-form-item label="滞纳金">
                  <el-input  placeholder="请输入内容"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="4">
                <el-form-item label="合计">
                  <el-input  placeholder="请输入内容"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="2" style="text-align: right">
                <el-button size="mini" type="primary">计 算</el-button>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="2" style="text-align: right">
                <el-form-item label="电费（谷）：" label-width="100px">
                </el-form-item>
              </el-col>
              <el-col :span="4">
                <el-form-item label="上次底数">
                  <el-input  placeholder="请输入内容"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="4">
                <el-form-item label="本次底数">
                  <el-input  placeholder="请输入内容"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="4">
                <el-form-item label="单价">
                  <el-input  placeholder="请输入内容"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="4">
                <el-form-item label="滞纳金">
                  <el-input  placeholder="请输入内容"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="4">
                <el-form-item label="合计">
                  <el-input  placeholder="请输入内容"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="2" style="text-align: right">
                <el-button size="mini" type="primary">计 算</el-button>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="2" style="text-align: right">
                <el-form-item label="电费（总）：" label-width="100px">
                </el-form-item>
              </el-col>
              <el-col :span="4">
                <el-form-item label="上次底数">
                  <el-input  placeholder="请输入内容"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="4">
                <el-form-item label="本次底数">
                  <el-input  placeholder="请输入内容"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="4">
                <el-form-item label="单价">
                  <el-input  placeholder="请输入内容"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="4">
                <el-form-item label="滞纳金">
                  <el-input  placeholder="请输入内容"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="4">
                <el-form-item label="合计">
                  <el-input  placeholder="请输入内容"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="2" style="text-align: right">
                <el-button size="mini" type="primary">计 算</el-button>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="2" style="text-align: right">
                <el-form-item label="燃气费：" label-width="100px">
                </el-form-item>
              </el-col>
              <el-col :span="4">
                <el-form-item label="上次底数">
                  <el-input  placeholder="请输入内容"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="4">
                <el-form-item label="本次底数">
                  <el-input  placeholder="请输入内容"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="4">
                <el-form-item label="单价">
                  <el-input  placeholder="请输入内容"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="4">
                <el-form-item label="滞纳金">
                  <el-input  placeholder="请输入内容"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="4">
                <el-form-item label="合计">
                  <el-input  placeholder="请输入内容"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="2" style="text-align: right">
                <el-button size="mini" type="primary">计 算</el-button>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="2" style="text-align: right">
                <el-form-item label="物管费：" label-width="100px">
                </el-form-item>
              </el-col>
              <el-col :span="4">
                <el-form-item label="上次交到">
                  <el-input  placeholder="请输入内容"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="合计欠费">
                  <el-row :gutter="20">
                    <el-col :span="10">
                      <el-input  placeholder="月"></el-input>
                    </el-col>
                    <el-col :span="10">
                      <el-input  placeholder="天"></el-input>
                    </el-col>
                  </el-row>
                </el-form-item>
              </el-col>
              <el-col :span="4">
                <el-form-item label="单价">
                  <el-input  placeholder="请输入内容"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="4">
                <el-form-item label="合计">
                  <el-input  placeholder="请输入内容"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="2" style="text-align: right">
                <el-button size="mini" type="primary">计 算</el-button>
              </el-col>
            </el-row>
          </el-form>
          <div class="total">合计应扣除能源费</div>
        </div>

        <div class="title">应扣其他费用</div>
        <div class="form_border">
          <el-form size="mini" :model="formInline" label-width="80px">
            <el-row >
              <el-col :span="6">
                <el-form-item label="违约金">
                  <el-input  placeholder="请输入内容"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="垃圾费">
                  <el-input  placeholder="请输入内容"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="清洁费">
                  <el-input  placeholder="请输入内容"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="维修赔偿">
                  <el-input  placeholder="请输入内容"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="其他费用">
                  <el-input  placeholder="请输入内容"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="超期房时">
                  <el-input  placeholder="请输入内容"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="超期房费">
                  <el-input  placeholder="请输入内容"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
          <div class="total">合计应扣除能源费</div>
        </div>


        <div class="title">合计应退还</div>
        <div class="describe_border">
          合计应退还：
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button size="small" @click="rentVacationDialogVisible = false">取 消</el-button>
        <el-button size="small" type="primary" @click="rentVacationDialogVisible = false">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
  export default {
    props:['rentVacationDialog'],
    data() {
      return {
        rentVacationDialogVisible:false,
        formInline: {region:''},
        tableData:[],
        value1:'',
      };
    },
    watch:{
      rentVacationDialog(val){
        this.rentVacationDialogVisible = val
      },
      rentVacationDialogVisible(val){
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
  #rentVacation{
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
