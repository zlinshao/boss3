<template>
  <div>
    <el-form  label-width="80px" size="mini">
      <el-form-item label="标签名">
        <el-input v-model="formItem.label"></el-input>
      </el-form-item>
      <el-form-item label="键名">
        <el-input v-model="formItem.key" clearable></el-input>
      </el-form-item>
      <el-form-item label="默认值">
        <el-input v-model="formItem.value"></el-input>
      </el-form-item>
      <el-form-item label="最小值">
        <el-input v-model="formItem.min"></el-input>
      </el-form-item>
      <el-form-item label="最大值">
        <el-input v-model="formItem.max"></el-input>
      </el-form-item>
      <el-form-item label="禁用">
        <el-switch v-model="formItem.disable"></el-switch>
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
export default {
  props: {
    formItem: {
      type: Object,
      required: true,
    }
  },
  methods: {
    handleDecimal(boo) {
      this.formItem.decimal1 = boo ? 0 : null
      // this.formItem.decimal1 = boo ? 0 : NaN // wtf?
    }
  }
}
</script>
