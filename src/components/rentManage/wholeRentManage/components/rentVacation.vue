<template>
  <div id="rentVacation">
    <el-dialog title="编辑租客退房/换房" :visible.sync="rentVacationDialogVisible" width="60%">
      <div class="scroll_bar">
        <div class="title">房东信息</div>
        <div class="houseTable" >
          <el-table
            :data="tableData"
            stripe
            style="width: 100%">
            <el-table-column
              prop="date"
              label="姓名">
            </el-table-column>
            <el-table-column
              prop="name"
              label="电话">
            </el-table-column>
            <el-table-column
              prop="address"
              label="身份号码">
            </el-table-column>
            <el-table-column
              prop="address"
              label="付款方式">
            </el-table-column>
            <el-table-column
              prop="address"
              label="合同性质">
            </el-table-column>
            <el-table-column
              prop="address"
              label="录入时间">
            </el-table-column>
            <el-table-column
              prop="address"
              label="合同期限">
            </el-table-column>
            <el-table-column
              prop="address"
              label="缴纳租金">
            </el-table-column>
            <el-table-column
              prop="address"
              label="缴纳押金">
            </el-table-column>
            <el-table-column
              prop="address"
              label="租赁时间">
            </el-table-column>
            <el-table-column
              prop="address"
              label="到期时间">
            </el-table-column>
            <el-table-column
              prop="address"
              label="金融机构">
            </el-table-column>
            <el-table-column
              prop="address"
              label="合作方式">
            </el-table-column>
          </el-table>
          <div style="padding: 5px">备注信息：</div>
        </div>
        <div class="title">换房信息</div>
        <div class="vacationInfo">
          <el-table
            :data="tableData"
            stripe
            style="width: 100%">
            <el-table-column
              prop="date"
              label="退房时间">
            </el-table-column>
            <el-table-column
              prop="name"
              label="退房性质">
            </el-table-column>
            <el-table-column
              prop="address"
              label="所在区域">
            </el-table-column>
            <el-table-column
              prop="address"
              label="物业地址">
            </el-table-column>
            <el-table-column
              prop="address"
              label="门牌号">
            </el-table-column>
          </el-table>
        </div>
        <el-row :gutter="20">
          <el-col :span="12">
            <div class="title">换房原因</div>
            <div class="remarks"></div>
          </el-col>
          <el-col :span="12">
            <div class="title">维修赔偿详情</div>
            <div class="remarks"></div>
          </el-col>
        </el-row>

        <div class="title">应退还</div>
        <div class="vacationInfo">
          <el-table
            :data="tableData"
            stripe
            style="width: 100%">
            <el-table-column
              prop="date"
              label="退还押金">
            </el-table-column>
            <el-table-column
              prop="name"
              label="剩余房租">
            </el-table-column>
            <el-table-column
              prop="address"
              label="收视费">
            </el-table-column>
            <el-table-column
              prop="address"
              label="预存物管费">
            </el-table-column>
            <el-table-column
              prop="address"
              label="预存水费">
            </el-table-column>
            <el-table-column
              prop="address"
              label="预存电费">
            </el-table-column>
            <el-table-column
              prop="address"
              label="预存气费">
            </el-table-column>
            <el-table-column
              prop="address"
              label="应还款">
            </el-table-column>
          </el-table>
        </div>

        <div class="title">应扣除源能费</div>
        <div class="formList">
          <el-form :inline="true" size="mini" :model="formInline" class="demo-form-inline">
            <el-row >
              <el-col :span="6">
                <el-form-item label="水费" label-width="80px">
                  <el-input  placeholder="请输入内容"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="水费" label-width="80px">
                  <el-input  placeholder="请输入内容"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="水费" label-width="80px">
                  <el-input  placeholder="请输入内容"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="水费" label-width="80px">
                  <el-input  placeholder="请输入内容"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="水费" label-width="80px">
                  <el-input  placeholder="请输入内容"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="水费" label-width="80px">
                  <el-input  placeholder="请输入内容"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="水费" label-width="80px">
                  <el-input  placeholder="请输入内容"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="水费" label-width="80px">
                  <el-input  placeholder="请输入内容"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="水费" label-width="80px">
                  <el-input  placeholder="请输入内容"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="水费" label-width="80px">
                  <el-input  placeholder="请输入内容"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="水费" label-width="80px">
                  <el-input  placeholder="请输入内容"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="水费" label-width="80px">
                  <el-input  placeholder="请输入内容"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
          <div class="total">合计应扣除能源费</div>
        </div>

        <div class="title">应扣其他费用</div>
        <div class="formList">
          <el-form :inline="true" size="mini" :model="formInline" class="demo-form-inline">
            <el-row >
              <el-col :span="6">
                <el-form-item label="违约金" label-width="80px">
                  <el-input  placeholder="请输入内容"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="垃圾费" label-width="80px">
                  <el-input  placeholder="请输入内容"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="清洁费" label-width="80px">
                  <el-input  placeholder="请输入内容"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="维修赔偿" label-width="80px">
                  <el-input  placeholder="请输入内容"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="其他费用" label-width="80px">
                  <el-input  placeholder="请输入内容"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="超期房时" label-width="80px">
                  <el-input  placeholder="请输入内容"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="超期房费" label-width="80px">
                  <el-input  placeholder="请输入内容"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </div>

        <el-row :gutter="20">
          <el-col :span="12">
            <div class="title">合计应退换</div>
            <div class="remarks">
              <el-form :inline="true" size="mini" :model="formInline" class="demo-form-inline">
                    <el-form-item label="合计退还" label-width="80px">
                      <el-input  placeholder="请输入内容"></el-input>
                    </el-form-item>
              </el-form>
            </div>
          </el-col>
          <el-col :span="12">
            <div class="title">入驻时水电底数</div>
            <div class="remarks"></div>
          </el-col>
        </el-row>
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
        .el-dialog__header{
          border-bottom: 1px solid #eee;
          .el-dialog__title{
            color: #409EFF;
            line-height: 0;
            font-size: 16px;
          }
        }
        .el-dialog__body{
          padding: 15px;
          >div{
            padding-right: 10px;
            max-height: 520px;
            overflow-x: auto;
          }
          .title{
            color: #409EFF;
            opacity: .7;
          }
          .demo-input.demo-zh-CN .el-input {
            width: 160px;
          }
          div{
            .el-table{
              th{
                background-color: #dfe6fb;
              }
            }
          }
          .houseTable,.vacationInfo{
            margin-bottom: 15px;
            border: 1px solid rgba(64,158,255,.12);
            box-shadow: 0 2px 4px 0 rgba(64,158,255,.12), 0 0 6px 0 rgba(64,158,255,.04);
          }
          .vacationInfo{

          }
          .formList{
            padding: 18px 10px 0 10px;
            margin-bottom: 15px;
            border: 1px solid #dfe6fb;
            border-radius: 5px;
            .el-form--inline {
              .el-form-item{
                /*margin-right: 0;*/
                .el-date-editor.el-input, .el-date-editor.el-input__inner {
                  width: 193px;
                }
              }
            }
            .total{
              border-top: 1px solid #dfe6fb;
              padding: 5px;
              text-align: right;
            }
          }
          .remarks{
            padding: 15px 10px;
            border: 1px solid #dfe6fb;
            border-radius: 5px;
            margin-bottom: 15px;
            .el-form-item{
              margin-bottom: 0;
            }
          }
        }
      }
    }
  }

</style>
