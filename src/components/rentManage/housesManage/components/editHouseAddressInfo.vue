<template>
  <div>
    <el-dialog :close-on-click-modal="false" title="地址变更" :visible.sync="editHouseDialogVisible" width="40%">
      <div>
        <!--<div class="form_border">-->
        <el-form size="mini" :model="params" label-width="80px">
          <el-row>
            <el-col :span="6">
              <el-form-item label="小区名称" required>
                <el-input placeholder="请输入内容" v-model="community_name" @focus="openVillageModal"
                          readonly=""></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="小区地址" required>
                <el-input placeholder="请输入内容" v-model="community_address" disabled=""></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="门牌地址" required>
                <el-col :span="8" style="padding-right: 10px">
                  <el-input placeholder="座/栋" v-model="params.building"></el-input>
                </el-col>
                <el-col :span="8" style="padding-right: 10px">
                  <el-input placeholder="单元" v-model="params.unit"></el-input>
                </el-col>
                <el-col :span="8">
                  <el-input placeholder="门牌号" v-model="params.doorplate"></el-input>
                </el-col>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="房型" required="">
                <el-col :span="8" style="padding-right: 10px">
                  <el-select clearable v-model="params.house_type[0]" placeholder="室" value="">
                    <el-option label="一室" value="1"></el-option>
                    <el-option label="二室" value="2"></el-option>
                    <el-option label="三室" value="3"></el-option>
                    <el-option label="四室" value="4"></el-option>
                    <el-option label="五室" value="5"></el-option>
                    <el-option label="六室" value="6"></el-option>
                    <el-option label="七室" value="7"></el-option>
                    <el-option label="八室" value="8"></el-option>
                  </el-select>
                </el-col>
                <el-col :span="8" style="padding-right: 10px">
                  <el-select clearable v-model="params.house_type[1]" placeholder="厅" value="">
                    <el-option label="无" value=""></el-option>
                    <el-option label="一厅" value="1"></el-option>
                    <el-option label="二厅" value="2"></el-option>
                    <el-option label="三厅" value="3"></el-option>
                    <el-option label="四厅" value="4"></el-option>
                    <el-option label="五厅" value="5"></el-option>
                  </el-select>
                </el-col>
                <el-col :span="8">
                  <el-select clearable v-model="params.house_type[2]" placeholder="卫" value="">
                    <el-option label="无" value=""></el-option>
                    <el-option label="一卫" value="1"></el-option>
                    <el-option label="二卫" value="2"></el-option>
                    <el-option label="三卫" value="3"></el-option>
                    <el-option label="四卫" value="4"></el-option>
                    <el-option label="五卫" value="5"></el-option>
                  </el-select>
                </el-col>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="6">
              <el-form-item label="建筑面积" required>
                <el-input placeholder="请输入内容" v-model="params.area"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="装修" required="">
                <el-select clearable v-model="params.decorate" placeholder="请选择装修类型" value="">
                  <el-option v-for="item in decorate_dic" :label="item.dictionary_name" :value="item.id"
                             :key="item.id"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row>
            <el-col :span="6">
              <el-form-item label="楼层" required>
                <el-col :span="10">
                  <el-input placeholder="楼层" v-model="params.floor"></el-input>
                </el-col>
                <el-col :span="4" style="text-align: center">
                  /
                </el-col>
                <el-col :span="10">
                  <el-input placeholder="总楼层" v-model="params.floors"></el-input>
                </el-col>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="房屋类型" required="">
                <el-select clearable v-model="params.property_type" placeholder="请选择房屋类型" value="">
                  <el-option v-for="item in property_type_dic" :label="item.dictionary_name" :value="item.id"
                             :key="item.id"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
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
        params:{
          house_grade:0,
          decoration:'',
          house_feature:'',
          suggest_price:'',
        },
        FormVisible: false,
        property_type_dic: [],   //房屋类型
        decorate_dic: [],        //装修
        direction: ['东', '南', '西', '北', '东南', '东北', '西南', '西北', '南北'],
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
          this.params.house_grade = val.house_grade? val.house_grade:0;
          this.params.decoration = val.decoration? val.decoration:'';
          this.params.house_feature = val.house_feature? val.house_feature:'';
          this.params.suggest_price = val.suggest_price? val.suggest_price:'';
        }
      }
    },
    methods:{
      getDictionary(){
        this.dictionary(410, 1).then((res) => {
          this.property_type_dic = res.data;
          this.isDictionary = true
        });
        this.dictionary(404,1).then((res) => {this.decorate_dic = res.data;this.isDictionary = true});
      },

      confirmAdd(){
        this.$http.put(globalConfig.server+'house/house/info/'+this.houseId,this.params).then((res) => {
          if(res.data.code === '30080'){
            this.editHouseDialogVisible = false;
            this.$emit('close','success');
            this.params = {
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
