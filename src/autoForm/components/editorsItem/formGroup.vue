<template>
  <div>
    <el-form  label-width="80px" size="mini">
      <el-form-item label="标签名">
        <el-input v-model="formItem.label"></el-input>
      </el-form-item>
      <el-form-item label="键名">
        <el-input v-model="formItem.key" clearable></el-input>
      </el-form-item>
      <el-form-item label="操作名">
        <el-input v-model="formItem.operateName"></el-input>
      </el-form-item>
      <el-form-item label="必填">
        <el-switch v-model="formItem.required"></el-switch>
      </el-form-item>
      <el-form-item label="禁用">
        <el-switch v-model="formItem.disabled"></el-switch>
      </el-form-item>
      <el-form-item label="表单数量">
        <el-switch v-model="formItem.number"></el-switch>
      </el-form-item>
      <el-form-item label="表单布局">
        <el-switch v-model="formItem.number"></el-switch>
      </el-form-item>
    </el-form>

    <div>
      <div v-for="item in formItem.number">
        <template>
          <el-input size="mini" placeholder="类型"></el-input>
          <el-input size="mini" placeholder="label"></el-input>
          <el-input size="mini" placeholder="必填"></el-input>
          <el-input size="mini" placeholder="禁用"></el-input>
          <el-input size="mini" placeholder="默认值"></el-input>
        </template>
      </div>
    </div>

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
