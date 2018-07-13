<template>
 <div>
   <el-form  label-width="80px" size="mini">
     <el-form-item label="表单名称">
       <el-input v-model="formConfig.formName"></el-input>
     </el-form-item>
     <el-form-item label="内联模式">
       <el-switch v-model="formConfig.inline"></el-switch>
     </el-form-item>
     <el-form-item label="标签宽度">
       <el-input v-model="formConfig.labelWidth"></el-input>
     </el-form-item>
     <el-form-item label="尺寸">
       <el-select v-model="formConfig.size" clearable>
         <el-option label="默认" value=""></el-option>
         <el-option label="中" value="medium"></el-option>
         <el-option label="小" value="small"></el-option>
         <el-option label="迷你" value="mini"></el-option>
       </el-select>
     </el-form-item>
   </el-form>
 </div>
</template>

<script>

export default {
  props: {
    formConfig: {
      type: Object,
      required: true,
    }
  },

}
</script>

<style lang="scss" scoped>

</style>
