<template>
  <div>
    <el-form-item :label="item.label" :required="item.required">
      <!--文本-->
      <el-input
        v-if="item.type==='input'||item.type==='richtext'"
        :type="item.subtype||'textarea'"
        :placeholder="item.placeholder"
        :autosize="item.autosize"
        v-model="item.value"
        :value="item.value" :disabled="item.disabled">
      </el-input>
      <!--数字-->
      <el-input
        v-else-if="item.type==='number'"
        v-model="item.value"
        type="number"
        placeholder="请输入数字"
        :value="item.value" :disabled="item.disabled">
      </el-input>
      <!--开关-->
      <el-checkbox
        v-else-if="item.type==='switch' && item.appearance==='checkbox'"
        :value="item.value" :disabled="item.disabled"
        v-model="item.value">
      </el-checkbox>
      <el-switch
        v-else-if="item.type==='switch'"
        :value="item.value" :disabled="item.disabled"
        v-model="item.value"
        >
      </el-switch>

      <!--//- 单选-->
      <el-radio-group v-else-if="item.type==='radio' && item.optionsUrl" :value="item.value" v-model="item.value">
        <component
          :is="item.button?'el-radio-button':'el-radio'"
          v-for="o in item.options"
          :key='o.id'
          :label="o.id"
          :border="item.border"
          :disabled="item.disabled">
          {{o.dictionary_name}}
        </component>
      </el-radio-group>

      <el-radio-group v-else-if="item.type==='radio' && !item.optionsUrl" :value="item.value" v-model="item.value">
        <component
          :is="item.button?'el-radio-button':'el-radio'"
          v-for="o in item.options"
          :key='o.value'
          :label="o.value"
          :border="item.border"
          :disabled="item.disabled">
          {{o.label}}
        </component>
      </el-radio-group>

      <!--//- 多选-->
      <el-checkbox-group v-else-if="item.type==='checkbox' && item.optionsUrl" :value="item.value" v-model="item.value">
        <component
          :is="item.button?'el-checkbox-button':'el-checkbox'"
          v-for="o in item.options"
          :key='o.id'
          :label="o.id"
          :border="item.border"
          :disabled="item.disabled">
          {{o.dictionary_name}}
        </component>
      </el-checkbox-group>

      <el-checkbox-group v-else-if="item.type==='checkbox' && !item.optionsUrl" :value="item.value" v-model="item.value">
        <component
          :is="item.button?'el-checkbox-button':'el-checkbox'"
          v-for="o in item.options"
          :key='o.value'
          :label="o.value"
          :border="item.border"
          :disabled="item.disabled">
          {{o.label}}
        </component>
      </el-checkbox-group>

      <!--//- 下拉-->
      <el-select
        v-else-if="item.type==='select' && item.optionsUrl"
        :value="item.value" :disabled="item.disabled"
        :multiple="item.multiple"
        v-model="item.value">
        <el-option
          v-for="o in item.options"
          :key="o.id"
          :label="o.dictionary_name"
          :value="o.id">
        </el-option>
      </el-select>

      <el-select
        v-else-if="item.type==='select' && !item.optionsUrl"
        :value="item.value" :disabled="item.disabled"
        :multiple="item.multiple"
        v-model="item.value">
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
        :type="item.subtype"
        :value-format="item.valueFormat"
        range-separator="至"
        start-placeholder="开始时间"
        end-placeholder="结束时间"
        :placeholder="item.placeholder"
        v-model="item.value"
        :value="item.value" :disabled="item.disabled">
      </el-date-picker>


      <el-cascader
        v-else-if="item.type==='cascader'"
        :options="item.options||require('element-china-area-data')[item.areaShortcut]||[]"
        :placeholder="item.placeholder"
        v-model="item.value"
        :value="item.value" :disabled="item.disabled">
      </el-cascader>

      <UpLoad
        v-else-if="item.type==='upload'"
        :ID="item.domId"
        @getImg="getImg">
      </UpLoad>

      <el-rate
        v-else-if="item.type==='rate'"
        :value="item.value" :disabled="item.disabled"
        v-model="item.value"
        :show-text="item.showText">
      </el-rate>

      <!--选人-->
      <el-input
        v-else-if="item.type==='staff' || 'depart'"
        @focus="openModal(item.type)"
        v-model="item.valueName"
        :disabled="item.disabled"
        placeholder="请点击选择">
      </el-input>
    </el-form-item>
    <Organization :organizationDialog="organizationDialog" :type='type' :length='length'
                  @selectMember="selectMember" @close="closeModal"></Organization>
  </div>
</template>

<script>
  import UpLoad from '../../components/common/UPLOAD'
  import Organization from '../../components/common/organization'
  export default {
    props: {
      item: {
        type: Object,
        required: true,
      }
    },
    components:{UpLoad , Organization},
    data() {
      return {
        ajaxOptions: [],
        organizationDialog : false,
        type : '',
        length : '',
      }
    },

    methods:{
      openModal(type){
        this.type = type;
        this.length = this.item.length;
        this.organizationDialog = true;
      },
      selectMember(val){
        this.item.value = val[0].id;
        this.item.valueName = val[0].name;
      },
      closeModal(){
        this.organizationDialog = false;
      },
      getImg(val){
        this.item.value = val[1];
      }
    }
  }
</script>

<style scoped lang="scss">
  .el-input, .el-select, .el-date-editor {
    width: 100%;
  }
</style>
