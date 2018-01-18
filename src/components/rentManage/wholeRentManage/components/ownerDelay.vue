<template>
  <div id="ownerDelay">
    <el-dialog title="房东延期" :visible.sync="ownerDelayDialogVisible">
      <div>
        <div class="title">房东信息</div>
        <div class="houseTable">
          <el-table
            :data="tableData"
            stripe
            style="width: 100%">
            <el-table-column
              prop="date"
              label="开始时间"
              width="180">
            </el-table-column>
            <el-table-column
              prop="name"
              label="到期时间"
              width="180">
            </el-table-column>
            <el-table-column
              prop="address"
              label="合同期限">
            </el-table-column>
            <el-table-column
              prop="address"
              label="收房期限">
            </el-table-column>
            <el-table-column
              prop="address"
              label="付款方式">
            </el-table-column>
            <el-table-column
              prop="address"
              label="提前天数">
            </el-table-column>
          </el-table>
        </div>
        <div class="title">房东延期</div>
        <div class="formList">
          <el-form :inline="true" size="mini" :model="formInline" class="demo-form-inline">
            <el-row>
              <el-col :span="8">
                <el-form-item label="延期时间" label-width="80px">
                  <el-date-picker
                    v-model="value1"
                    type="date"
                    placeholder="选择日期">
                  </el-date-picker>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="合同期限" label-width="80px">
                  <el-date-picker
                    v-model="value1"
                    type="date"
                    placeholder="选择日期">
                  </el-date-picker>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="到期时间" label-width="80px">
                  <el-date-picker
                    v-model="value1"
                    type="date"
                    placeholder="选择日期">
                  </el-date-picker>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="收房价格" label-width="80px">
                  <el-select v-model="formInline.region"  placeholder="收房价格">
                    <el-option label="区域一" value="shanghai"></el-option>
                    <el-option label="区域二" value="beijing"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="缴费方式" label-width="80px">
                  <el-select v-model="formInline.region"  placeholder="收房价格">
                    <el-option label="区域一" value="shanghai"></el-option>
                    <el-option label="区域二" value="beijing"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="到期付租" label-width="80px">
                  <el-select v-model="formInline.region"  placeholder="收房价格">
                    <el-option label="区域一" value="shanghai"></el-option>
                    <el-option label="区域二" value="beijing"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </div>
        <div class="title">备注信息</div>
        <div class="remarks">
            <ul>
              <li>1.租客张小姐交租6000元【2017-12-04至2018-12-04】，还款100.00元</li>
              <li>2.其他费用2700元</li>
            </ul>
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button size="small" @click="ownerDelayDialogVisible = false">取 消</el-button>
        <el-button size="small" type="primary" @click="ownerDelayDialogVisible = false">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
  export default {
    props:['ownerDelayDialog'],
    data() {
      return {
        ownerDelayDialogVisible:false,
        formInline: {region:''},
        tableData:[],
        value1:'',
      };
    },
    watch:{
      ownerDelayDialog(val){
        this.ownerDelayDialogVisible = val
      },
      ownerDelayDialogVisible(val){
        if(!val){
          this.$emit('close')
        }
      }
    },
    methods:{

    }
  };
</script>
<style lang="scss" scoped="">
  #ownerDelay{
    .el-dialog__wrapper{
      .el-dialog{
        .el-dialog__body{
          padding: 15px;
          .title{
            color: #409EFF;
            opacity: .7;
          }
          .houseTable{
            margin-bottom: 15px;
            border: 1px solid rgba(64,158,255,.12);
            box-shadow: 0 2px 4px 0 rgba(64,158,255,.12), 0 0 6px 0 rgba(64,158,255,.04);
            .el-table{
              th{
                background-color: #dfe6fb;
              }
            }
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
          }
          .remarks{
            padding: 15px 10px;
            border: 1px solid #dfe6fb;
            border-radius: 5px;
          }
        }
      }
    }
  }

</style>
