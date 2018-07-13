<template>
  <div>
    <el-form  label-width="80px" size="mini">
      <el-form-item label="标签名">
        <el-input v-model="formItem.label"></el-input>
      </el-form-item>
      <el-form-item label="键名">
        <el-input v-model="formItem.key" clearable></el-input>
      </el-form-item>
      <el-form-item label="默认值" v-if="formItem.optionsUrl===undefined">
        <el-select v-model="formItem.value" clearable>
          <el-option v-for="o in formItem.options" :key="o.value" :label="o.label" :value="o.value"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="默认值" v-if="formItem.optionsUrl!==undefined">
        <el-select v-model="formItem.value" clearable :multiple="formItem.multiple">
          <el-option v-for="o in formItem.options" :key="o.id" :label="o.dictionary_name" :value="o.id"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="数据URL" v-if="formItem.optionsUrl!==undefined">
        <el-input v-model="formItem.optionsUrl" @blur="getDictionary"></el-input>
      </el-form-item>
      <el-form-item label="显示边框">
        <el-switch v-model="formItem.border"></el-switch>
      </el-form-item>
      <el-form-item label="按钮形状">
        <el-switch v-model="formItem.button"></el-switch>
      </el-form-item>
      <el-form-item label="必填">
        <el-switch v-model="formItem.required"></el-switch>
      </el-form-item>
      <el-form-item label="禁用">
        <el-switch v-model="formItem.disabled"></el-switch>
      </el-form-item>
    </el-form>

    <EditorOptions v-if="formItem.optionsUrl===undefined" :itemOptions="formItem.options"></EditorOptions>
  </div>

</template>

<script>
// import EditorRules from '../editor-rules'
import EditorOptions from '../editorOptions'
export default {
  components: { EditorOptions },
  props: {
    formItem: {
      type: Object,
      required: true,
    }
  },
  methods:{
    getDictionary(){
      this.dictionary(this.formItem.optionsUrl, 1).then((res) => {
        this.formItem.options = res.data;
      });
    }
  }
}
</script>
