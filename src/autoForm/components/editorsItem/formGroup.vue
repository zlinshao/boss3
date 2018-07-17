<template>
  <div>
    <el-form label-width="80px" size="mini">
      <el-form-item label="标签名">
        <el-input v-model="formItem.label"></el-input>
      </el-form-item>
      <el-form-item label="键名">
        <el-input v-model="formItem.key" clearable></el-input>
      </el-form-item>
      <el-form-item label="操作名">
        <el-input v-model="formItem.operateName"></el-input>
      </el-form-item>
      <!--<el-form-item label="表单数量">-->
        <!--<el-input-number v-model="formItem.number" :min="1" :max="99"></el-input-number>-->
      <!--</el-form-item>-->
      <el-form-item label="每行数量">
        <el-input-number v-model="formItem.layout" :min="1" :max="99"></el-input-number>
      </el-form-item>
    </el-form>
    <FormGroupItem :formItemArray="formItem.formItemList"></FormGroupItem>
  </div>

</template>

<script>
  import FormGroupItem from '../formGroupItem'

  export default {
    components: {FormGroupItem},
    props: {
      formItem: {
        type: Object,
        required: true,
      }
    },

    methods: {
      getDictionary() {
        this.dictionary(this.formItem.optionsUrl, 1).then((res) => {
          this.formItem.options = res.data;
        });
      }
    }
  }
</script>
