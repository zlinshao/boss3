<template>
  <el-form  label-width="80px" size="mini">
    <el-form-item label="标签名">
      <el-input v-model="formItem.label"></el-input>
    </el-form-item>

    <el-form-item label="键名">
      <el-input v-model="formItem.key" ></el-input>
    </el-form-item>

    <el-form-item label="禁用">
      <el-switch v-model="formItem.disable"></el-switch>
    </el-form-item>

    <el-form-item label="必填">
      <el-switch v-model="formItem.required"></el-switch>
    </el-form-item>
  </el-form>
  <!--div-->
    <!--el-form(v-on="$listeners" v-bind="$attrs")-->
      <!--el-form-item(label="标签名")-->
        <!--el-input(v-model="formItem.label")-->
      <!--el-form-item(label="键名")-->
        <!--el-input(:value="formItem.key" readonly)-->
      <!--el-form-item(label="默认值")-->
        <!--el-checkbox(v-if="formItem.appearance==='checkbox'" v-model="formItem.value")-->
        <!--el-switch(v-else v-model="formItem.value")-->
      <!--el-form-item(label="形状")-->
        <!--el-radio-group(v-model="formItem.appearance")-->
          <!--el-radio-button(label="checkbox") 复选框-->
          <!--el-radio-button(label="switch") 开关-->
      <!--el-form-item(label="禁用")-->
        <!--el-checkbox(v-model="formItem.disabled")-->

    <!--pre {{formItem}}-->
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
