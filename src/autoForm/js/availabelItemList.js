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
    // "options": [],
    "placeholder": '请选择',
    "rules": [],
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
  }
  // {
  //   "type": 'rate',
  //   "label": '评分',
  //   "key": 'rate1',
  //   "value": 5,
  // },
  // {
  //   "type": 'color',
  //   "label": '颜色',
  //   "key": 'color1',
  //   // 选择透明度
  //   "showAlpha": true,
  //   // 颜色格式, String, hsl / hsv / hex / rgb, 默认值为 hex(showAlpha=false) / rgb(showAlpha=true)
  //   // "format": 'rgb',
  //   // "value": 'rgba(19, 206, 102, 0.8)',
  // },
  // {
  //   "type": 'slider', // 可以限制范围, 也可以选择数字范围
  //   "label": '滑块',
  //   "key": 'slider1',
  //   "value": 10,
  //   // "block": true,
  // },
  // {
  //   "type": 'slider',
  //   "label": '自定义范围',
  //   "key": 'slider2',
  //   "value": 70,
  //   "block": true,
  //   "showStops": true, // 显示间断点
  //   "step": 5, // 默认为1
  //   "min": 60,
  //   "max": 90,
  // },
  // {
  //   "type": 'slider',
  //   "isRange": true, // 选择范围
  //   "label": '选择范围',
  //   "key": 'slider3',
  //   // "value": null, // 默认值为[min, max]
  //   "block": true,
  //   "min": 0,
  //   "max": 100,
  // },
  // {
  //   "type": 'time',
  //   "label": '时间',
  //   "key": 'time1',
  //   "valueFormat": 'HH:mm:ss A',
  //   "placeholder": '选择时间',
  //   "rules": [{ "required": true, "message": '请选择一个时间' }]
  // },
  // {
  //   "type": 'time',
  //   "isRange": true, // 选择时间范围
  //   "label": '时间范围',
  //   "key": 'timeRange1',
  //   "valueFormat": 'HH:mm:ss',
  //   "viewFormat": 'HH:mm:ss',
  //   // "value": null, // 返回格式: ['00:00', '00:00']
  //   "rules": [{ "type": "array", "required": true, "message": '请选择一个时间范围' }]
  // },
}
