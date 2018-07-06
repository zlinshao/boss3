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
        <el-select v-model="formItem.value" :multiple="true" clearable>
          <el-option v-for="o in formItem.options" :key="o.value" :label="o.label" :value="o.value"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="数据URL" v-else>
        <el-input v-model="formItem.optionsUrl"></el-input>
      </el-form-item>
    </el-form>
    <editor-options v-if="formItem.optionsUrl===undefined" :itemOptions="formItem.options"></editor-options>
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
}
</script>
