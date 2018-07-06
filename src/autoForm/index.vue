<template>
  <div id="autoForm">
    <el-row style="height: 100%">
      <el-col :span="6"  style="height: 100%;background: #eef1f6;padding: 10px">
        <el-tabs v-model="activeName">
          <el-tab-pane label="添加组件" name="first">
            <ItemsList @add="addItem"></ItemsList>
          </el-tab-pane>
        </el-tabs>
      </el-col>
      <el-col :span="12" style="height: 100%;background: #fdfdfd;padding: 10px">
        <FakeForm :formConfig="formConfig"></FakeForm>
      </el-col>
      <el-col :span="6" style="height: 100%;background: #eef1f6;padding: 10px">
        <el-tabs v-model="activeName_">
          <el-tab-pane label="组件配置" name="first">
            <div v-if="selectedItem.type">
              <component :is="`editor-${selectedItem.type}`" :formItem="selectedItem"></component>
            </div>
          </el-tab-pane>
          <el-tab-pane label="全局配置" name="second">
          </el-tab-pane>
          <el-tab-pane label="查看JSON" name="third">
            <pre>{{formConfig}}</pre>
          </el-tab-pane>
        </el-tabs>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  import ItemsList from './components/itemList'
  import FakeForm from './components/fake-form'

  import EditorInput from './components/editorsItem/input'
  import EditorNumber from './components/editorsItem/number'
  import EditorSwitch from './components/editorsItem/switch'
  import EditorRadio from './components/editorsItem/radio'
  import EditorCheckbox from './components/editorsItem/checkbox'
  import EditorSelect from './components/editorsItem/select'
  import EditorDate from './components/editorsItem/date'
  import EditorCascader from './components/editorsItem/cascader'
  import EditorRichtext from './components/editorsItem/richtext'
  export default {
    name: "index",
    components:{
      ItemsList,
      FakeForm,
      EditorInput,
      EditorNumber,
      EditorSwitch,
      EditorRadio,
      EditorCheckbox,
      EditorSelect,
      EditorDate,
      EditorCascader,
      EditorRichtext,

    },
    data(){
      return{
        activeName : 'first',
        activeName_ : 'first',
        formItem : {},
        selectedItem : {},
      }
    },
    mounted(){
      this.setHeight();
      $(window).resize(()=>{
        this.setHeight();
      });
    },
    computed : {
      formConfig: {
        get() {
          return this.$store.state.autoForm.form;
        },
        set(newV) {
          this.$store.dispatch('updateForm', newV)
        }
      },
      currentForm() {
        return this.$store.state.autoForm.itemKey;
      }
    },
    methods:{
      setHeight(){
        let height_ = $(window).height() - 141;
        $('#autoForm').height(height_);
      },
      addItem(val){
        console.log(val)
        this.formConfig.formItemList.push(val)
        this.selectedItem = val;
      }
    },
  }
</script>

<style scoped lang="scss">
  #autoForm{

  }
</style>
