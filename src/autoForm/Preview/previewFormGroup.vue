<template>
  <div>
    <el-form-item :label="item.formItemList[colIndex].label" :required="item.formItemList[colIndex].required">
      <!--文本-->
      <el-input
        v-if="item.formItemList[colIndex].type==='input'||item.formItemList[colIndex].type==='richtext'"
        :type="item.formItemList[colIndex].subtype||'textarea'"
        :placeholder="item.formItemList[colIndex].placeholder"
        :autosize="item.formItemList[colIndex].autosize"
        v-model="item.value[rowIndex][colIndex]"
        :value="item.value[rowIndex][colIndex]"
        :disabled="item.formItemList[colIndex].disabled">
      </el-input>
      <!--数字-->
      <el-input
        v-else-if="item.formItemList[colIndex].type==='number'"
        v-model="item.value[rowIndex][colIndex]"
        type="number"
        placeholder="请输入数字"
        :value="item.value[rowIndex][colIndex]"
        :disabled="item.formItemList[colIndex].disabled">
      </el-input>
      <!--开关-->
      <el-checkbox
        v-else-if="item.formItemList[colIndex].type==='switch' && item.formItemList[colIndex].appearance==='checkbox'"
        :disabled="item.formItemList[colIndex].disabled"
        :value="item.value[rowIndex][colIndex]"
        v-model="item.value[rowIndex][colIndex]">
      </el-checkbox>
      <el-switch
        v-else-if="item.formItemList[colIndex].type==='switch'"
        :value="item.value[rowIndex][colIndex]"
        :disabled="item.formItemList[colIndex].disabled"
        v-model="item.value[rowIndex][colIndex]"
        >
      </el-switch>

      <!--//- 单选-->
      <el-radio-group v-else-if="item.formItemList[colIndex].type==='radio' && item.formItemList[colIndex].optionsUrl"
                      :value="item.value[rowIndex][colIndex]" v-model="item.value[rowIndex][colIndex]">
        <component
          :is="item.formItemList[colIndex].button?'el-radio-button':'el-radio'"
          v-for="o in item.formItemList[colIndex].options"
          :key='o.id'
          :label="o.id"
          :border="item.formItemList[colIndex].border"
          :disabled="item.formItemList[colIndex].disabled">
          {{o.dictionary_name}}
        </component>
      </el-radio-group>

      <el-radio-group v-else-if="item.formItemList[colIndex].type==='radio' && !item.formItemList[colIndex].optionsUrl"
                      :value="item.value[rowIndex][colIndex]" v-model="item.value[rowIndex][colIndex]">
        <component
          :is="item.formItemList[colIndex].button?'el-radio-button':'el-radio'"
          v-for="o in item.formItemList[colIndex].options"
          :key='o.value'
          :label="o.value"
          :border="item.formItemList[colIndex].border"
          :disabled="item.formItemList[colIndex].disabled">
          {{o.label}}
        </component>
      </el-radio-group>

      <!--//- 多选-->
      <el-checkbox-group v-else-if="item.formItemList[colIndex].type==='checkbox' && item.formItemList[colIndex].optionsUrl"
                         :value="item.value[rowIndex][colIndex]" v-model="item.value[rowIndex][colIndex]">
        <component
          :is="item.formItemList[colIndex].button?'el-checkbox-button':'el-checkbox'"
          v-for="o in item.formItemList[colIndex].options"
          :key='o.id'
          :label="o.id"
          :border="item.formItemList[colIndex].border"
          :disabled="item.formItemList[colIndex].disabled">
          {{o.dictionary_name}}
        </component>
      </el-checkbox-group>

      <el-checkbox-group v-else-if="item.formItemList[colIndex].type==='checkbox' && !item.formItemList[colIndex].optionsUrl"
                         :value="item.value[rowIndex][colIndex]" v-model="item.value[rowIndex][colIndex]">
        <component
          :is="item.formItemList[colIndex].button?'el-checkbox-button':'el-checkbox'"
          v-for="o in item.formItemList[colIndex].options"
          :key='o.value'
          :label="o.value"
          :border="item.formItemList[colIndex].border"
          :disabled="item.formItemList[colIndex].disabled">
          {{o.label}}
        </component>
      </el-checkbox-group>

      <!--//- 下拉-->
      <el-select
        v-else-if="item.formItemList[colIndex].type==='select' && item.formItemList[colIndex].optionsUrl"
        :value="item.value[rowIndex][colIndex]" :disabled="item.disabled"
        :multiple="item.formItemList[colIndex].multiple"
        v-model="item.value[rowIndex][colIndex]">
        <el-option
          v-for="o in item.formItemList[colIndex].options"
          :key="o.id"
          :label="o.dictionary_name"
          :value="o.id">
        </el-option>
      </el-select>

      <el-select
        v-else-if="item.formItemList[colIndex].type==='select' && !item.formItemList[colIndex].optionsUrl"
        :value="item.value[rowIndex][colIndex]" :disabled="item.disabled"
        :multiple="item.formItemList[colIndex].multiple"
        v-model="item.value[rowIndex][colIndex]">
        <el-option
          v-for="o in item.formItemList[colIndex].options"
          :key="o.value"
          :label="o.label"
          :value="o.value">
        </el-option>
      </el-select>


      <!--//- 日期-->
      <el-date-picker
        v-else-if="item.formItemList[colIndex].type==='date'"
        :type="item.formItemList[colIndex].subtype"
        :value-format="item.formItemList[colIndex].valueFormat"
        range-separator="至"
        start-placeholder="开始时间"
        end-placeholder="结束时间"
        v-model="item.value[rowIndex][colIndex]"
        :placeholder="item.formItemList[colIndex].placeholder"
        :value="item.value[rowIndex][colIndex]"
        :disabled="item.formItemList[colIndex].disabled">

      </el-date-picker>


      <el-cascader
        v-else-if="item.formItemList[colIndex].type==='cascader'"
        :options="item.formItemList[colIndex].options||require('element-china-area-data')[item.formItemList[colIndex].areaShortcut]||[]"
        :placeholder="item.formItemList[colIndex].placeholder"
        v-model="item.value[rowIndex][colIndex]"
        :value="item.value[rowIndex][colIndex]"
        :disabled="item.formItemList[colIndex].disabled">
      </el-cascader>

      <UpLoad
        v-else-if="item.formItemList[colIndex].type==='upload'"
        :ID="item.formItemList[colIndex].domId"
        @getImg="getImg">
      </UpLoad>

      <el-rate
        v-else-if="item.formItemList[colIndex].type==='rate'"
        :value="item.value[rowIndex][colIndex]"
        :disabled="item.formItemList[colIndex].disabled"
        v-model="item.value[rowIndex][colIndex]"
        :show-text="item.formItemList[colIndex].showText">
      </el-rate>

      <!--选人-->
      <el-input
        v-else-if="item.formItemList[colIndex].type==='staff' || item.formItemList[colIndex].type==='depart'"
        @focus="openModal(item.formItemList[colIndex].type)"
        v-model="valueName"
        :disabled="item.formItemList[colIndex].disabled"
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
      },
      rowIndex: {
        type: Number,
        required: true,
      },
      colIndex: {
        type: Number,
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
        valueName : '',
      }
    },

    methods:{
      openModal(type){
        this.type = type;
        this.length = this.item.formItemList[this.colIndex].length;
        this.organizationDialog = true;
      },
      selectMember(val){
        this.item.value[this.rowIndex][this.colIndex] = val;
        this.valueName = '';
        val.forEach((item) =>{
          this.valueName += item.name + ' ';
        })
      },
      closeModal(){
        this.organizationDialog = false;
      },
      getImg(val){
        this.item.value[this.rowIndex][this.colIndex] = val[1];
      }

    }
  }
</script>

<style scoped lang="scss">
  .el-input, .el-select, .el-date-editor {
    width: 100%;
  }
</style>
