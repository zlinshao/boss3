<template>
  <div>
    <el-dialog title="合同详情" :visible.sync="contractDialogVisible">
      <div>
        <div class="title">基本信息</div>
        <div class="form_border">
          <el-form size="mini" :model="formInline" label-width="80px">
            <el-row>
              <el-col :span="8">
                <el-form-item label="领用人">
                  <el-input disabled="" value="陆宣羽"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="部门">
                  <el-input disabled="" value="百万一组"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </div>

        <div class="title">合同信息</div>
        <div class="table_border">
          <el-table
            :data="tableData"
            stripe
            style="width: 100%">
            <el-table-column
              prop="date"
              label="历史领取日期">
            </el-table-column>
            <el-table-column
              prop="name"
              label="剩余未缴收房合同（LJSF）">
            </el-table-column>
            <el-table-column
              prop="address"
              label="剩余未缴租房合同（LJZF)">
            </el-table-column>
            <el-table-column
              prop="address"
              label="备注">
            </el-table-column>
          </el-table>
        </div>

        <div class="title">操作记录</div>
        <div class="describe_border">
          操作记录：2018-01-02 18：20:15  由南京一区二组李根 转移至 南京百万一组程全宇 收房合同15份 ;LJSF010000254  LJSF010000245  LJSF010000254  LJSF010000245   LJSF010000254  LJSF010000245  LJSF010000254  LJSF010000245  LJSF010000254  LJSF010000245

          租房合同5份：LJZF010000452  LJZF010000789  LJZF010000789  LJZF010000452  LJZF010000789

          详情页展示分配合同操作明细。

        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button size="small" @click="contractDialogVisible = false">取 消</el-button>
        <el-button size="small" type="primary" @click="contractDialogVisible = false">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
  import ElInput from "../../../../../node_modules/element-ui/packages/input/src/input";
  export default {
    components: {ElInput},
    props:['contractDialog'],
    data() {
      return {
        contractDialogVisible:false,
        formInline: {region:''},
        tableData:[],
        value1:'',
      };
    },
    watch:{
      contractDialog(val){
        this.contractDialogVisible = val
      },
      contractDialogVisible(val){
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

</style>
