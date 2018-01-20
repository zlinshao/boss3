<template>
  <div id="ownerDelay">
    <el-dialog title="房东延期" :visible.sync="ownerDelayDialogVisible">
      <div>
        <div class="title">房东信息</div>
        <div class="table_border">
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
        <div class="form_border">
          <el-form size="mini" :model="formInline" label-width="80px">
            <el-row>
              <el-col :span="8">
                <el-form-item label="延期时间">
                  <el-date-picker
                    v-model="value1"
                    type="date"
                    placeholder="选择日期">
                  </el-date-picker>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="合同期限">
                  <el-date-picker
                    v-model="value1"
                    type="date"
                    placeholder="选择日期">
                  </el-date-picker>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="到期时间">
                  <el-date-picker
                    v-model="value1"
                    type="date"
                    placeholder="选择日期">
                  </el-date-picker>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="收房价格">
                  <el-select v-model="formInline.region"  placeholder="收房价格">
                    <el-option label="区域一" value="shanghai"></el-option>
                    <el-option label="区域二" value="beijing"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="缴费方式">
                  <el-select v-model="formInline.region"  placeholder="收房价格">
                    <el-option label="区域一" value="shanghai"></el-option>
                    <el-option label="区域二" value="beijing"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="到期付租">
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
        <div class="describe_border">
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

</style>
