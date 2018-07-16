<template>
  <div>
    <el-form-item :label="item.label" :required="item.required">
      <!--文本-->
      <el-input
        v-if="item.type==='input'||item.type==='richtext'"
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

      <UpLoad
        v-else-if="item.type==='upload'"
        :ID="item.domId"
        disabled="true">
      </UpLoad>

      <el-rate
        v-else-if="item.type==='rate'"
        :value="item.value"
        disabled
        :show-text="item.showText">
      </el-rate>

      <!--选人-->
      <el-input
        v-else-if="item.type==='staff' || 'depart'"
        disabled
        placeholder="请点击选择"
      >
      </el-input>
      <!--变化-->
    </el-form-item>

    <!--<div v-if="item.type==='change'">-->
      <!--<div class="title">付款方式</div>-->
      <!--<div class="form_border">-->
        <!--<div v-for="item in payWayChangeAmount">-->
          <!--<el-row>-->
            <!--<el-col :span="6">-->
              <!--<el-form-item label="付款方式" required="">-->
                <!--<el-select clearable v-model="payWayArray[item-1]" placeholder="请选择付款方式" value="">-->
                  <!--<el-option v-for="item in pay_way_dic" :label="item.dictionary_name" :value="item.id"-->
                             <!--:key="item.id"></el-option>-->
                <!--</el-select>-->
              <!--</el-form-item>-->
            <!--</el-col>-->
            <!--<el-col :span="6">-->
              <!--<el-form-item label="变化周期(月)" required="">-->
                <!--<el-input placeholder="请输入内容" :disabled="payWayChangeAmount<2"-->
                          <!--v-model="payPeriodArray[item-1]"></el-input>-->
              <!--</el-form-item>-->
            <!--</el-col>-->
            <!--<el-col :span="6" v-if="item>1">-->
              <!--<div class="deleteNumber">-->
                <!--<span @click="deletePayWayChange(item-1)">删除</span>-->
              <!--</div>-->
            <!--</el-col>-->
          <!--</el-row>-->
        <!--</div>-->
        <!--<div style="text-align: center">-->
          <!--<el-button type="text" :disabled="!params.month" @click="addMorePayWayChange">-->
            <!--<i class="el-icon-circle-plus"></i>添加付款方式变化条目-->
          <!--</el-button>-->
        <!--</div>-->
      <!--</div>-->
    <!--</div>-->
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
</style>
