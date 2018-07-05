<template>
  <el-form>
    <el-form-item label="标签名">
      <el-input v-model="formItem.label"></el-input>
    </el-form-item>
    <el-form-item label="键名">
      <el-input v-model="formItem.key" readonly></el-input>
    </el-form-item>
    <el-form-item label="占位文本">
      <el-input v-model="formItem.placeholder"></el-input>
    </el-form-item>
    <el-form-item label="数据URL">
      <el-input v-model="formItem.optionsUrl"></el-input>
    </el-form-item>
    <el-form-item label="禁用">
      <el-input v-model="formItem.filterable"></el-input>
    </el-form-item>
  </el-form>

    <!--editor-rules(:item-rules="formItem.rules" @update:item-rules="n => formItem.rules = n" :item-type="formItem.type" types="required")-->

    <!--pre {{formItem}}-->
</template>

<script>
// import EditorRules from '../editor-rules'
export default {
  // components: { EditorRules },
  props: {
    formItem: {
      type: Object,
      required: true,
    }
  },
}
</script>
