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
      <el-form-item label="数据URL" v-else>
        <el-input v-model="formItem.optionsUrl"></el-input>
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
    </el-form>

    <EditorOptions :itemOptions="formItem.options"></EditorOptions>
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
