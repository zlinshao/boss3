<template>
    <div id="addEmploy">
      <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="基本信息" name="first">
        <el-form ref="form" :model="basicForm" label-width="80px" size="mini" :label-position="labelPosition">
          <el-row>
            <el-col :span="10">
              <el-form-item label="真实姓名">
                <el-input v-model="basicForm.name"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="4">
              <el-form-item label="性别">
                <el-radio-group v-model="basicForm.radio">
                <el-radio :label="1">男</el-radio>
                <el-radio :label="2">女</el-radio>
              </el-radio-group>
              </el-form-item>
            </el-col>
            <el-col :span="10">
              <el-form-item label="手机号码">
                <el-input v-model="basicForm.tel"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </el-tab-pane>
      <el-tab-pane label="辅助信息" name="second">
        bbbbbbbbbbbbbbbb
      </el-tab-pane>
  </el-tabs>
    </div>
</template>

<script>
export default {
  data() {
    return {
      labelPosition: 'right',
      activeName: 'first',
      basicForm: {
        name: "",
        radio: 1,
        tel: "",
      }
    }
  },
  methods: {
    handleClick(tab, event) {
      console.log(tab, event);
    }
  }
}
</script>

<style lang="scss">
  #addEmploy {

  }
</style>
