<template>
  <div id="preview" style="width: 920px;margin: 0 auto;background: #faffff;border: 1px dashed #41a4dd;padding: 10px">
    <H3 class="formTitle">{{formConfig.formName}}</H3>
    <el-form class="dynamic-form fake-form" :inline="formConfig.inline" :size='formConfig.size'
             :label-position="formConfig.labelPosition" :label-width="formConfig.labelWidth">
      <div v-for="(item,i) in formConfig.formItemList">
        <el-row v-if="item.type === 'column'">
          <el-col v-if="item.formItemList.length>0" v-for="(column,index) in item.length" :span="24/item.length" :key="column">
            <FakeFormItem :item="item.formItemList[index]"></FakeFormItem>
          </el-col>
        </el-row>
        <div v-else-if="item.type === 'formGroup'">
          <div class="form_border">
            <el-row v-for="(rowItem,rowIndex) in item.length" :key="rowIndex">
              <div class="title" style="padding: 5px 0">
                <span>{{item.label}}({{rowIndex}})</span>
                <span v-if="item.length>1" style="float: right;cursor: pointer" @click="deleteFormGroupItem(item,rowIndex)">删除</span>
              </div>
              <el-col :span="24/Number(item.layout)" v-for="(colItem,colIndex) in item.formItemList" :key="colIndex">
                <div>
                  <FormGroup :item="item" :colIndex="colIndex" :rowIndex="rowIndex"></FormGroup>
                </div>
              </el-col>
            </el-row>
            <div style="text-align: center">
              <el-button type="text" @click="addFormGropItem(item)">
                + {{item.operateName}}
              </el-button>
            </div>
          </div>
        </div>
        <div v-else>
          <FakeFormItem :item="item"></FakeFormItem>
        </div>
      </div>
    </el-form>
  </div>
</template>

<script>
  import FakeFormItem from './previewFormList'
  import FormGroup from './previewFormGroup'
  export default {
    name: "preview",
    components:{FakeFormItem , FormGroup},
    computed:{
      formConfig: {
        get() {
          return this.$store.state.autoForm.form;
        },
        set(newV) {
          this.$store.dispatch('updateForm', newV)
        }
      },
    },
    mounted(){
      this.setHeight();
      $(window).resize(()=>{
        this.setHeight();
      });
    },
    methods:{
      setHeight(){
        let height_ = $(window).height() - 141;
        $('#preview').height(height_);
      },
      addFormGropItem(item){
        item.length ++;
        item.value.push([])
      },
      deleteFormGroupItem(item,rowIndex){
        item.length --;
        item.value.splice(rowIndex,1)
      },
    }
  }
</script>

<style scoped lang="scss">
  .title {
    color: #409EFF;
    opacity: .7;
  &:before {
     border-radius: 2px;
     margin-right: 5px;
     background: #409EFF;
     border-left: 1px solid #409EFF;
     content: '|';
   }
  }

  .form_border {
    padding: 18px 10px 0 10px;
    margin-bottom: 15px;
    border: 1px solid #dfe6fb;
    border-radius: 5px;
  }
</style>
