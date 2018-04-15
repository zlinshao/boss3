<template>
  <div>
    <el-dialog :close-on-click-modal="false" title="编辑房屋信息" :visible.sync="editHouseDialogVisible" width="30%">
      <div>
        <!--<div class="form_border">-->
        <el-form size="mini" :model="formInline" label-width="80px">
          <el-row>
            <el-col :span="12">
              <el-form-item label="房屋评分">
                <el-rate v-model="formInline.house_grade" style="line-height: 37px"></el-rate>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="装修">
                <el-select clearable placeholder="请选择装修类型" v-model="formInline.decoration" value="">
                  <el-option v-for="item in decorate_dic" :label="item.dictionary_name" :value="item.id" :key="item.id"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="房屋特色">
                <el-select clearable placeholder="请选择房屋特色" v-model="formInline.house_feature" value="">
                  <el-option v-for="item in house_feature_dic" :label="item.dictionary_name" :value="item.id" :key="item.id"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="建议价格">
                <el-input placeholder="请输入内容" v-model="formInline.suggest_price"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
        <!--</div>-->
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button size="small" @click="editHouseDialogVisible = false">取 消</el-button>
        <el-button size="small" type="primary" @click="confirmAdd">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
  export default {
    props:['editHouseDialog','houseId','houseDetail'],
    data() {
      return {
        editHouseDialogVisible:false,
        formInline:{
          house_grade:0,
          decoration:'',
          house_feature:'',
          suggest_price:'',
        },
        FormVisible: false,
        house_feature_dic : [],
        decorate_dic : [],
      };
    },
    watch:{
      editHouseDialog(val){
        this.editHouseDialogVisible = val
      },
      editHouseDialogVisible(val){
        if(!val){
          this.$emit('close')
        }else {
          if(!this.isDictionary){
            this.getDictionary();
          }
        }
      },
      houseDetail(val){
        if(val){
          this.formInline.house_grade = val.house_grade? val.house_grade:0;
          this.formInline.decoration = val.decoration? val.decoration:'';
          this.formInline.house_feature = val.house_feature? val.house_feature:'';
          this.formInline.suggest_price = val.suggest_price? val.suggest_price:'';
        }
      }
    },
    methods:{
      getDictionary(){
        this.dictionary(425,1).then((res) => {this.house_feature_dic = res.data;this.isDictionary = true});
        this.dictionary(404,1).then((res) => {this.decorate_dic = res.data;this.isDictionary = true});
      },

      confirmAdd(){
        this.$http.put(globalConfig.server+'house/house/info/'+this.houseId,this.formInline).then((res) => {
          if(res.data.code === '30080'){
            this.editHouseDialogVisible = false;
            this.$emit('close','success');
            this.formInline = {
              house_grade:0,
              decoration:'',
              house_feature:'',
              suggest_price:'',
            };
            this.$notify.success({
              title:'成功',
              message:res.data.msg,
            })
          }else {
            this.$notify.warning({
              title:'警告',
              message:res.data.msg,
            })
          }
        })
      },
    }
  };
</script>
<style lang="scss" scoped="">
</style>
