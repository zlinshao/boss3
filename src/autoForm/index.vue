<template>
  <div id="autoForm">
    <div style="height: 100%">
      <div style="height: 5%;text-align: right">
        <el-button type="primary" size="mini" @click="previewForm">预 览</el-button>
        <el-button type="primary" size="mini">确 定</el-button>
      </div>
      <el-row style="height: 95%">
        <el-col :span="6"  style="height: 100%;background: #eef1f6;padding: 10px">
          <el-tabs v-model="activeName">
            <el-tab-pane label="布局控件" name="first">
              <Layout @addLay="addLayout"></Layout>
            </el-tab-pane>
            <el-tab-pane label="添加组件" name="second">
              <ItemsList @add="addItem"></ItemsList>
            </el-tab-pane>
          </el-tabs>
        </el-col>
        <el-col :span="12" style="height: 100%;background: #fdfdfd;padding: 10px;border: 1px dashed #40a0ff;">
          <div style="overflow-y: auto;height: 100%" class="scroll_bar">
            <FakeForm :formConfig="formConfig" @update="updateData"></FakeForm>
          </div>
        </el-col>
        <el-col :span="6" style="height: 100%;background: #eef1f6;padding: 10px">
          <el-tabs v-model="activeName_">
            <el-tab-pane label="组件配置" name="first">
              <div v-if="selectedItem && selectedItem.type">
                <component :is="`editor-${selectedItem.type}`" :formItem="selectedItem"></component>
              </div>
              <div v-else style="text-align: center">
                请先选择一个组件
              </div>
            </el-tab-pane>
            <el-tab-pane label="全局配置" name="second">
              <GlobalConfigure :formConfig="formConfig"></GlobalConfigure>
            </el-tab-pane>
            <!--<el-tab-pane label="查看JSON" name="fourth">-->
              <!--<pre>{{formConfig}}</pre>-->
            <!--</el-tab-pane>-->
          </el-tabs>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
  import guid from './js/guid'

  import ItemsList from './components/itemList'
  import FakeForm from './components/fakeForm'
  import GlobalConfigure from './components/globalConfigure'
  import Layout from './components/layout'

  import EditorInput from './components/editorsItem/input'
  import EditorNumber from './components/editorsItem/number'
  import EditorSwitch from './components/editorsItem/switch'
  import EditorRadio from './components/editorsItem/radio'
  import EditorCheckbox from './components/editorsItem/checkbox'
  import EditorSelect from './components/editorsItem/select'
  import EditorDate from './components/editorsItem/date'
  import EditorCascader from './components/editorsItem/cascader'
  import EditorRichtext from './components/editorsItem/richtext'
  import EditorUpload from './components/editorsItem/upload'
  import EditorRate from './components/editorsItem/rate'
  import EditorStaff from './components/editorsItem/staff'
  import EditorDepart from './components/editorsItem/depart'
  export default {
    name: "index",
    components:{
      ItemsList,
      FakeForm,
      Layout,
      GlobalConfigure,
      EditorInput,
      EditorNumber,
      EditorSwitch,
      EditorRadio,
      EditorCheckbox,
      EditorSelect,
      EditorDate,
      EditorCascader,
      EditorRichtext,
      EditorUpload,
      EditorRate,
      EditorStaff,
      EditorDepart
    },
    data(){
      return{
        activeName : 'first',
        formItem : {},
        columnIndex : 0
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
      selectedItem() {
        return JSON.stringify(this.formConfig.formItemList).indexOf(this.$store.state.autoForm.currentItem.index)>-1
          && this.$store.state.autoForm.currentItem;
      },
      activeName_ : {
        get() {
          return this.$store.state.autoForm.activeName_right;
        },
        set(newV) {
          this.$store.dispatch('changeActive', newV)
        }
      }
    },
    methods:{
      setHeight(){
        let height_ = $(window).height() - 141;
        $('#autoForm').height(height_);
      },
      addItem(val){
        console.log(val);
        this.formConfig.formItemList.push(val);
        this.$store.dispatch('selectItem', val);
      },
      addLayout(val){
        this.columnIndex ++ ;
        const newItem = {
          type : 'column',
          length : val,
          index : guid(),
          formItemList : [],
        };
        this.formConfig.formItemList.push(newItem);
      },
      updateData(data){
        this.formConfig.formItemList.forEach((item)=>{
          if(item.index === data.item.index){
            this.$set(item.formItemList,data.column,data.data)
          }
        });
        this.$store.dispatch('selectItem', data.data);
      },
      previewForm(){
        this.$router.push('/preview')
      }
    },
  }
</script>

<style scoped lang="scss">
  #autoForm{

  }
</style>
