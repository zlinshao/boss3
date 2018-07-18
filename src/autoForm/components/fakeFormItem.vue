<template>
  <div>
    <el-form-item :label="item.label" :required="item.required">
      <!--文本-->
      <el-input
        v-if="item.type==='input'"
        :disabled="true"
        :type="item.subtype||'textarea'"
        :placeholder="item.placeholder"
        :autosize="item.autosize"
        :value="item.value">
      </el-input>
      <!--数字-->
      <el-input
        v-else-if="item.type==='number'"
        :disabled="true"
        :value="item.value">
      </el-input>
      <!--开关-->
      <el-checkbox
        v-else-if="item.type==='switch' && item.appearance==='checkbox'"
        :value="item.value"
        :disabled="true">
      </el-checkbox>
      <el-switch
        v-else-if="item.type==='switch'"
        :value="item.value"
        :disabled="true">
      </el-switch>

      <!--//- 单选-->
      <el-radio-group v-else-if="item.type==='radio' && item.optionsUrl" :value="item.value">
        <component
          :is="item.button?'el-radio-button':'el-radio'"
          v-for="o in item.options"
          :key='o.id'
          :label="o.id"
          :border="item.border"
          disabled>
          {{o.dictionary_name}}
        </component>
      </el-radio-group>
      <el-radio-group v-else-if="item.type==='radio' && !item.optionsUrl" :value="item.value">
        <component
          :is="item.button?'el-radio-button':'el-radio'"
          v-for="o in item.options"
          :key='o.value'
          :label="o.value"
          :border="item.border"
          disabled>
          {{o.label}}
        </component>
      </el-radio-group>

      <!--//- 多选-->
      <el-checkbox-group v-else-if="item.type==='checkbox' && item.optionsUrl" :value="item.value">
        <component
          :is="item.button?'el-checkbox-button':'el-checkbox'"
          v-for="o in item.options"
          :key='o.id'
          :label="o.id"
          :border="item.border"
          disabled>
          {{o.dictionary_name}}
        </component>
      </el-checkbox-group>

      <el-checkbox-group v-else-if="item.type==='checkbox' && !item.optionsUrl" :value="item.value">
        <component
          :is="item.button?'el-checkbox-button':'el-checkbox'"
          v-for="o in item.options"
          :key='o.value'
          :label="o.value"
          :border="item.border"
          disabled>
          {{o.label}}
        </component>
      </el-checkbox-group>

      <!--//- 下拉-->
      <el-select
        v-else-if="item.type==='select'"
        :value="item.value"
        :multiple="item.multiple"
        disabled>
        <el-option
          v-for="o in item.options"
          :key="o.value"
          :label="o.label"
          :value="o.value">
        </el-option>
      </el-select>

      <!--//- 日期-->
      <el-date-picker
        v-else-if="item.type==='date'"
        :disabled="true"
        :type="item.subtype"
        :value-format="item.valueFormat"
        range-separator="至"
        start-placeholder="开始时间"
        end-placeholder="结束时间"
        :placeholder="item.placeholder"
        :value="item.value">

      </el-date-picker>


      <el-cascader
        v-else-if="item.type==='cascader'"
        :disabled="true"
        :options="item.options||require('element-china-area-data')[item.areaShortcut]||[]"
        :placeholder="item.placeholder"
        :value="item.value">
      </el-cascader>

      <div class="pickfiles"  v-else-if="item.type==='upload'">
        <div class="upButton">
          <span class="el-icon-plus"></span>
        </div>
      </div>

      <el-rate
        v-else-if="item.type==='rate'"
        :value="item.value"
        disabled
        :show-text="item.showText">
      </el-rate>

      <!--选人-->
      <el-input
        v-else-if="item.type==='staff' || item.type==='depart'"
        disabled
        placeholder="请点击选择"
      >
      </el-input>
      <!--变化-->
    </el-form-item>

  </div>
</template>

<script>
  import UpLoad from '../../components/common/UPLOAD'
  import Staff from '../../components/common/organization'
  export default {
    props: {
      item: {
        type: Object,
        required: true
      }
    },
    components:{UpLoad,Staff},
    data() {
      return {
        ajaxOptions: [{
          value: '0',
          label: '动态获取'
        }]
      }
    }
  }
</script>

<style scoped lang="scss">
  .el-input, .el-select, .el-date-editor {
    width: 100%;
  }
  .pickfiles {
    display: flex;
    display: -webkit-flex; /* Safari */
    flex-wrap: wrap;
    z-index: 0;
    > div {
      margin-right: 15px;
      margin-top: 15px;
      &:first-child {
        margin-left: 0;
      }
    }
    .upButton {
      background-color: #fbfdff;
      border: 1px dashed #c0ccda;
      border-radius: 6px;
      box-sizing: border-box;
      width: 120px;
      height: 120px;
      cursor: pointer;
      line-height: 120px;
      vertical-align: top;
      display: inline-block;
      text-align: center;
    }
    .el-icon-plus {
      font-size: 28px;
      color: #8c939d;
    }
  }
</style>
