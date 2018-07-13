<template>
  <div>
    <!-- 文本 -->
    <el-popover ref="popinput" v-model="popInput">
      <div style="margin : 5px">选择一个类型：</div>
      <el-button-group>
        <el-button size="mini" type="primary" plain
                   @click="addItem('input', {subtype:'text'})"
        >普通文本</el-button>
        <el-button size="mini" type="primary" plain
                   @click="addItem('input', {subtype:'password'})"
        >密码</el-button>
        <el-button size="mini" type="primary" plain
                   @click="addItem('input', {subtype:'textarea'})"
        >文本域</el-button>
      </el-button-group>
    </el-popover>
    <el-button class="item" v-popover:popinput>

      <span>文本</span>
    </el-button>

    <!-- 数字 -->
    <el-button class="item" @click.native="addItem('number')">

      <span>数字</span>
    </el-button>
    <!-- 开关 -->
    <el-button class="item" @click.native="addItem('switch')">

      <span>开关</span>
    </el-button>
    <!-- 单选 -->
    <el-popover ref="popradio" v-model="popRadio">
      <div style="margin : 5px">选择数据来源：</div>
      <el-button-group>
        <el-button size="mini" type="primary" plain
                   @click="addItem('radio', {optionsUrl:''})">从服务器获取</el-button>
        <el-button size="mini" type="primary" plain
                   @click="addItem('radio', {options:[]})">自定义</el-button>
      </el-button-group>
    </el-popover>
    <el-button class="item" v-popover:popradio>

      <span>单选</span>
    </el-button>
    <!-- 多选 -->
    <el-popover ref="popcheckbox" v-model="popCheckbox">
      <div style="margin : 5px">选择数据来源：</div>
      <el-button-group>
        <el-button size="mini" type="primary" plain
                   @click="addItem('checkbox', {optionsUrl:''})"
        >从服务器获取</el-button>
        <el-button size="mini" type="primary" plain
                   @click="addItem('checkbox',{options:[]})"
        >自定义</el-button>
      </el-button-group>
    </el-popover>
    <el-button class="item" v-popover:popcheckbox>

      <span>多选</span>
    </el-button>
    <!-- 下拉 -->
    <el-popover ref="popselect" v-model="popSelect">
      <div style="margin : 5px">选择模式：</div>
      <el-radio-group v-model="preConfigDataSelect.mode" size="mini">
        <el-radio-button label="single">单选</el-radio-button>
        <el-radio-button label="multiple">多选</el-radio-button>
      </el-radio-group>
      <div style="margin : 5px">数据来源：</div>
      <el-radio-group v-model="preConfigDataSelect.source" size="mini">
        <el-radio-button label="ajax">从服务器获取</el-radio-button>
        <el-radio-button label="custom">自定义</el-radio-button>
      </el-radio-group>
      <div style="margin-top: 5px">
        <el-button size="mini" plain round type="primary"
                   style="float: right" @click="preAddSelect">确定</el-button>
      </div>
    </el-popover>
    <el-button class="item" v-popover:popselect>
      <span>下拉</span>
    </el-button>
    <!-- 日期 -->
    <!-- http://element-cn.eleme.io/#/zh-CN/component/date-picker -->
    <el-popover ref="popdate" v-model="popDate">
      <div style="margin : 5px">选择模式：</div>
      <el-button-group>
        <el-button size="mini" type="primary" plain
                   @click="addItem('date', {subtype:'year',label:'年份',valueFormat:'yyyy'}),popDate = false"
        >年份</el-button>
        <el-button size="mini" type="primary" plain
                   @click="addItem('date', {subtype:'month',label:'月份',valueFormat:'yyyy-MM'}),popDate = false"
        >月份</el-button>
        <el-button size="mini" type="primary" plain
                   @click="addItem('date', {subtype:'date',label:'日期',valueFormat:'yyyy-MM-dd'}),popDate = false"
        >日期</el-button>
        <el-button size="mini" type="primary" plain
                   @click="addItem('date', {subtype:'datetime',label:'日期时间',valueFormat:'yyyy-MM-dd HH:mm:ss'}),popDate = false"
        >日期时间</el-button>
      </el-button-group>
      <div style="margin : 5px">范围：</div>
      <el-button-group>
        <el-button size="mini" type="primary" plain
                   @click="addItem('date', {subtype:'daterange',label:'日期范围',valueFormat:'yyyy-MM-dd'}),popDate = false"
        >日期范围</el-button>
        <el-button size="mini" type="primary" plain
                   @click="addItem('date', {subtype:'datetimerange',label:'日期时间范围',valueFormat:'yyyy-MM-dd hh:mm:ss a'}),popDate = false"
        >日期时间范围</el-button>
      </el-button-group>
    </el-popover>
    <el-button class="item" v-popover:popdate>

      <span>日期</span>
    </el-button>
    <!-- 级联 -->
    <!-- https://github.com/Plortinus/element-china-area-data -->
    <el-popover ref="popcascader" v-model="popCascader">
      <div style="margin : 5px">常用：</div>
      <el-button-group>
        <el-button size="mini" type="primary" plain
                   @click="addItem('cascader', {areaShortcut:'provinceAndCityData'}),popCascader = false"
        >省/市</el-button>
        <el-button size="mini" type="primary" plain
                   @click="addItem('cascader', {areaShortcut:'regionData'}),popCascader = false"
        >省/市/区</el-button>
      </el-button-group>
      <div style="margin : 5px">其他：</div>
      <el-button size="mini" type="primary" plain
                 @click="addItem('cascader',{optionsUrl:''})"
      >从服务器获取</el-button>
      <!--<el-button-group>-->

        <!--<el-button size="mini" type="primary" plain-->
                   <!--@click="$message('暂不支持')"-->
        <!--&gt;自定义</el-button>-->
      <!--</el-button-group>-->
    </el-popover>
    <el-button class="item" v-popover:popcascader>
      <span>级联</span>
    </el-button>

    <!--上传-->
    <el-button class="item" @click.native="addItem('upload')">

      <span>上传</span>
    </el-button>

    <!--评分-->
    <el-button class="item" @click.native="addItem('rate')">

      <span>评分</span>
    </el-button>
    <!--员工-->
    <el-button class="item" @click.native="addItem('staff')">

      <span>员工</span>
    </el-button>
    <!--部门-->
    <el-button class="item" @click.native="addItem('depart')">
      <span>部门</span>
    </el-button>

    <!--<el-button class="item" @click.native="addItem('change')">-->
      <!--<span>多级下拉</span>-->
    <!--</el-button>-->
    <!-- 富文本 -->
    <!--<el-button class="item" @click.native="addItem('richtext')">-->
      <!---->
      <!--<span>富文本</span>-->
    <!--</el-button>-->
  </div>
</template>

<script>
  import guid from '../js/guid'
  import AVAILABEL_FORM_ITEM_LIST from '../js/availabelItemList'
  export default {
    data() {
      return {
        popInput: false,
        popRadio: false,
        popCheckbox: false,
        popSelect: false,
        popDate: false,
        popCascader: false,
        preConfigDataSelect: {
          mode: 'single',
          source: 'ajax',
        },
      }
    },
    methods: {
      addItem(type, option) {
        const key = '';
        let index = guid();
        const newItem = {...JSON.parse(JSON.stringify(AVAILABEL_FORM_ITEM_LIST[type])), key,index,...option};
        this.$emit('add', newItem);

        this.popInput = false;
        this.popRadio = false;
        this.popCheckbox = false;
        this.popSelect = false;
        this.popDate = false;
        this.popCascader = false;
      },
      preAddSelect() {
        const { mode, source } = this.preConfigDataSelect;
        const OPT = {
          multiple: mode === 'multiple'
        };
        if (source === 'ajax') {
          OPT.optionsUrl = '';
          OPT.options = []
        } else {
          OPT.options = []
        }
        this.addItem('select', OPT)
      }
    }
  }
</script>

<style scoped lang="scss">
  .item{
    margin: 5px;
  }
</style>
