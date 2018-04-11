<template>
  <div id="ownerRenew">
    <el-dialog :close-on-click-modal="false" title="房东续约" :visible.sync="ownerRenewDialogVisible">
      <div>
        <el-form size="mini" :model="formInline" label-width="80px">
          <el-row>
            <el-col :span="8">
              <el-form-item label="录入时间">
                <el-date-picker type="date" placeholder="选择日期" v-model="formInline.date1"></el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="合同期限">
                <el-row :gutter="3">
                  <el-col :span="8">
                    <el-select  clearable  v-model="formInline.year" placeholder="年">
                      <el-option label="item" value="item"></el-option>
                    </el-select>
                  </el-col>
                  <el-col :span="8">
                    <el-select  clearable  v-model="formInline.month" placeholder="月">
                      <el-option label="item" value="item"></el-option>
                    </el-select>
                  </el-col>
                  <el-col :span="7">
                    <el-select  clearable  v-model="formInline.day" placeholder="日">
                      <el-option label="item" value="item"></el-option>
                    </el-select>
                  </el-col>
                </el-row>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="收房价格">
                <el-input v-model="formInline.user" placeholder="收房价格（元/月）"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="开始时间">
                <el-date-picker type="date" placeholder="选择日期" v-model="formInline.date1"></el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="结束时间">
                <el-date-picker type="date" placeholder="选择日期" v-model="formInline.date1"></el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="空置期">
                <el-input v-model="formInline.user" placeholder="收房价格（元/月）"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="缴费方式">
                <el-select clearable v-model="formInline.region" placeholder="缴费方式">
                  <el-option label="区域一" value="shanghai"></el-option>
                  <el-option label="区域二" value="beijing"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="合同性质">
                <el-select clearable v-model="formInline.region" placeholder="合同性质">
                  <el-option label="区域一" value="shanghai"></el-option>
                  <el-option label="区域二" value="beijing"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="提前">
                <el-input v-model="formInline.user" placeholder="提前"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="递增约定">
                <el-select clearable v-model="formInline.region" placeholder="递增约定">
                  <el-option label="区域一" value="shanghai"></el-option>
                  <el-option label="区域二" value="beijing"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="业务员">
                <el-input :readonly="true" @click.native="selectStaff"
                          v-model="formInline.user" placeholder="业务员"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24">
              <el-form-item label="备注" prop="desc">
                <el-input type="textarea" v-model="formInline.remarks"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button size="small" @click="ownerRenewDialogVisible = false">取 消</el-button>
        <el-button size="small" type="primary" @click="ownerRenewDialogVisible = false">确 定</el-button>
      </span>
    </el-dialog>
    <StaffSelect :FormVisible="FormVisible" @close="closeStaff"></StaffSelect>
  </div>
</template>

<script>
  import StaffSelect from '../../common/organization.vue'
  export default {
    name:'ownerRenew',
    props:['ownerRenewDialog'],
    components:{StaffSelect},
    data() {
      return {
        ownerRenewDialogVisible:false,
        formInline:{},
        FormVisible: false,
      };
    },
    watch:{
      ownerRenewDialog(val){
        this.ownerRenewDialogVisible = val
      },
      ownerRenewDialogVisible(val){
        if(!val){
          this.$emit('close')
        }
      }
    },
    methods:{
      selectStaff(){
          this.FormVisible = true;
      },
      closeStaff(){
        this.FormVisible = false;
      }
    }
  };
</script>
<style lang="scss" scoped="">
</style>
