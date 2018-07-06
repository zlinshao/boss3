<template>
  <el-form label-width="80px" size="mini">
    <el-form-item label="标签名">
      <el-input v-model="formItem.label"></el-input>
    </el-form-item>
    <el-form-item label="键名">
      <el-input v-model="formItem.key" clearable></el-input>
    </el-form-item>
    <el-form-item label="占位文本">
      <el-input v-model="formItem.placeholder"></el-input>
    </el-form-item>
    <el-form-item label="默认值" v-if="formItem.optionsUrl===undefined">
      <el-cascader v-model="formItem.value" :clearable="true"
                   :options="formItem.options||require('element-china-area-data')[formItem.areaShortcut]" ></el-cascader>
    </el-form-item>

    <el-form-item label="数据URL" v-else>
      <el-input v-model="formItem.optionsUrl"></el-input>
    </el-form-item>
    <el-form-item label="禁用">
      <el-input v-model="formItem.filterable"></el-input>
    </el-form-item>
  </el-form>
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
