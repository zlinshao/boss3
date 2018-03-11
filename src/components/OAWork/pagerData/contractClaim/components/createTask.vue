<template>
  <div>
    <el-dialog title="创建任务" :visible.sync="createTaskDialogVisible">
      <div>
        <div class="title">基本信息</div>
        <div class="form_border">
          <el-form size="mini" :model="formInline" label-width="120px">
            <el-row>
              <el-col :span="8">
                <el-form-item label="任务类型">
                  <el-select clearable v-model="formInline.type" placeholder="请选择任务类型">
                    <el-option label="领用" value="1"></el-option>
                    <el-option label="作废" value="2"></el-option>
                    <el-option label="上缴" value="3"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="城市">
                  <el-select clearable v-model="formInline.region" placeholder="请选择城市">
                    <el-option label="领用" value="1"></el-option>
                    <el-option label="作废" value="2"></el-option>
                    <el-option label="上缴" value="3"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="领用日期">
                  <el-date-picker type="date" placeholder="选择日期" v-model="formInline.date1"></el-date-picker>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="领用人">
                  <el-input readonly="" value="陆宣羽"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="所属部门">
                  <el-input disabled="" value="百万一组"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </div>

        <div class="title">操作信息</div>
        <div class="form_border">
          <el-form v-if="formInline.type!=2 && formInline.type!=3" size="mini" :model="formInline" label-width="120px">
            <el-row>
              <el-col :span="8">
                <el-form-item label="领取合同数（收）">
                  <el-input></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="合同编号">
                  <el-input></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="到">
                  <el-input disabled=""></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="领取合同数（租）">
                  <el-input></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="合同编号">
                  <el-input></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="到">
                  <el-input disabled=""></el-input>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
          <el-form v-if="formInline.type==2" size="mini" :model="formInline" label-width="120px">
            <el-row>
              <el-col :span="8">
                <el-form-item label="作废合同数（收）">
                  <el-input></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="合同编号">
                  <el-input></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="到">
                  <el-input disabled=""></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="作废合同数（租）">
                  <el-input></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="合同编号">
                  <el-input></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="到">
                  <el-input disabled=""></el-input>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
          <el-form v-if="formInline.type==3" size="mini" :model="formInline" label-width="120px">
            <el-row>
              <el-col :span="8">
                <el-form-item label="上缴合同数（收）">
                  <el-input></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="合同编号">
                  <el-input></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="到">
                  <el-input disabled=""></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="上缴合同数（租）">
                  <el-input></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="合同编号">
                  <el-input></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="到">
                  <el-input disabled=""></el-input>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </div>

        <div class="title">剩余合同</div>
        <div class="form_border">
          <el-form size="mini" :model="formInline" label-width="120px">
            <el-row>
              <el-col :span="8">
                <el-form-item label="剩余合同数（收）">
                  <el-input disabled="" value="16"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="剩余合同数（租）">
                  <el-input disabled="" value="18"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="截图">
                  <el-input readonly="" value=""></el-input>
                </el-form-item>
              </el-col>

              <el-col :span="16">
                <el-form-item label="备注">
                  <el-input readonly="" type="textarea" value=""></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="操作人  ">
                  <el-input disabled="" value="陆宣羽"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button size="small" @click="createTaskDialogVisible = false">取 消</el-button>
        <el-button size="small" type="primary" @click="createTaskDialogVisible = false">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
  export default {
    props:['createTaskDialog'],
    data() {
      return {
        createTaskDialogVisible:false,
        formInline: {region:''},
        tableData:[],
        value1:'',
      };
    },
    watch:{
      createTaskDialog(val){
        this.createTaskDialogVisible = val
      },
      createTaskDialogVisible(val){
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
