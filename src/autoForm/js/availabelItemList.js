/* eslint-disable */
export default {
  "input": {
    "type": 'input', // 必要, String
    "label": '文本', // 必要, String
    "disable": false, //禁用, Boolean
    "readonly": false, //只读, Boolean
    "value": '', // 默认值
    "placeholder": '请输入内容',
  },
  "number": {
    "type": 'number', // number 类型目前采用的是"输入前"限制, 使用rules验证会出现bug
    "label": '数字',
    "value": '',
    "min": 0,
    "max": 99998,
  },
  "switch": {
    "type": 'switch',
    "label": '开关',
    "appearance": "switch", // 外观, 'switch'开关(默认) / checkbox勾选
    "value": true
  },
  "radio": {
    "type": 'radio',
    "label": '单选',
    "value": '',
    "button": false, // 按钮形状, inline模式下推荐开启, 多选框checkbox同样有效
    "border": false, // (非按钮形式)显示边框, inline模式下推荐开启, 多选框checkbox同样有效
    "options" :[],
  },
  "checkbox": {
    "type": 'checkbox',
    "label": '多选',
    "value": [],
    "border": false,
    "button": false,
    "options" :[],

  },
  "select": {
    "type": 'select',
    "label": '下拉',
    "value": '',
    "disabled": false,
    "multiple": false,
    "options": [],
    "placeholder": '请选择',
  },
  "date": {
    "type": 'date',
    "value": null,
    "disabled": false,
    "placeholder": '请选择'
  },
  "cascader": {
    "type": 'cascader',
    "label": '级联选择',
    "disabled": false,
    "filterable": false,
    "value": [],
    "placeholder": '请选择',
  },
  "richtext": {
    "type": "richtext",
    "label": "内容",
    "value": '',
  },
  "upload":{
    "type": "upload",
    "label": "上传文件",
    "domId": 'DOM_ID',
  },
  "rate":{
    "type": "rate",
    "label": "评分",
    "value": null,
    "showText": false,
  },
  "staff":{
    "type": "staff",
    "label": "选择员工",
    "placeholder": '请选择员工',
    "value": '',
    "valueName" : '',
    "length" : 1,
  },
  "depart":{
    "type": "depart",
    "label": "选择部门",
    "placeholder": '请选择部门',
    "value": '',
    "valueName" : '',
    "length" : 1,
  },
  "change":{
    "type": "change",
    "label": "多级下拉",
    "value": [],
  },
  "formGroup":{
    "type": "formGroup",
    "label": "明细",
    "operateName": "添加更多",
    "layout": 3,
    "length" : 1,
    "formItemList":[],
    "value" : [[]],
  }
}
