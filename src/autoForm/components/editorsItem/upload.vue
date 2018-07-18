<template>
  <div>
    <el-form  label-width="80px" size="mini">
      <el-form-item label="标签名">
        <el-input v-model="formItem.label"></el-input>
      </el-form-item>
      <el-form-item label="键名">
        <el-input v-model="formItem.key" clearable></el-input>
      </el-form-item>
      <el-form-item label="DOM_ID">
        <el-input v-model="formItem.domId"></el-input>
        <div style="color: #e4303c">注意：DOM_ID必须唯一，请区分上传组件DOM_ID！</div>
      </el-form-item>
      <el-form-item label="必填">
        <el-switch v-model="formItem.required"></el-switch>
      </el-form-item>

    </el-form>
  </div>
</template>

<script>
export default {
  props: {
    formItem: {
      type: Object,
      required: true,
    }
  },
}
</script>
