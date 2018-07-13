<template>
  <div>
    <el-form  label-width="80px" size="mini">
      <el-form-item label="标签名">
        <el-input v-model="formItem.label"></el-input>
      </el-form-item>
      <el-form-item label="占位文本">
        <el-input v-model="formItem.placeholder"></el-input>
      </el-form-item>
      <el-form-item label="键名">
        <el-input v-model="formItem.key" clearable></el-input>
      </el-form-item>
      <el-form-item label="默认值">
        <el-input v-model="formItem.value" :type="formItem.subtype"></el-input>
      </el-form-item>
      <el-form-item label="禁用">
        <el-switch v-model="formItem.disabled"></el-switch>
      </el-form-item>
      <el-form-item label="只读">
        <el-switch v-model="formItem.readonly"></el-switch>
      </el-form-item>
      <el-form-item label="必填">
        <el-switch v-model="formItem.required"></el-switch>
      </el-form-item>
    </el-form>
  </div>

</template>

<script>
// todo maxlength?
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
