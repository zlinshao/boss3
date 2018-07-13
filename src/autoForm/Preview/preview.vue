<template>
  <div id="preview" style="width: 920px;margin: 0 auto">
    <H3 class="formTitle">{{formConfig.formName}}</H3>
    <el-form class="dynamic-form fake-form" :inline="formConfig.inline" :size='formConfig.size'
             :label-position="formConfig.labelPosition" :label-width="formConfig.labelWidth">
      <div v-for="(item,i) in formConfig.formItemList">
        <el-row v-if="item.type === 'column'">
          <el-col v-for="(column,index) in item.length" :span="24/item.length" :key="column">
            <FakeFormItem :item="item.formItemList[index]"></FakeFormItem>
          </el-col>
        </el-row>
        <div v-else>
          <FakeFormItem :item="item"></FakeFormItem>
        </div>
      </div>
    </el-form>
  </div>
</template>

<script>
  import FakeFormItem from './previewFormList'
  export default {
    name: "preview",
    components:{FakeFormItem},
    computed:{
      formConfig(){
        return this.$store.state.autoForm.form;
      }
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
    }
  }
</script>

<style scoped>

</style>
