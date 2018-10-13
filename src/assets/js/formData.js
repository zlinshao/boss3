// HRM 花名册高级搜索
rosterParams = {
  page: 1,
  limit: 15,
  user_name: '',
  org_names: '',            //部门
  job_type: '',             //员工类型 0-全部，1-全职，2-兼职，3-实习
  job_status: '',           //员工状态 0-全部，1-在职，2-离职，3-停薪留职，4-二次入职
  position_status: '',      //当前在职状态，1-待调岗，2-无异动，3-待转正，4-待离职
  enroll_min: '',           //入职时间最小值
  enroll_max: '',           //入职时间最大值
  dismiss_time_min: '',     //离职时间最小值
  dismiss_time_max: '',     //离职时间最大值
  position_names: '',       //职位
};
// 花名册 图片上传
rosterImgInfo = [
  {
    formKey: 'resume',
    formTitle: '面试表',
  },
  {
    formKey: 'education',
    formTitle: '学历复印件',
  },
  {
    formKey: 'resignation',
    formTitle: '上家公司离职证明',
  },
  {
    formKey: 'doc_photo',
    formTitle: '证件照',
  },
  {
    formKey: 'con_agree',
    formTitle: '保密协议',
  },
  {
    formKey: 'labor_contract',
    formTitle: '劳动合同',
  },
  {
    formKey: 'commitment',
    formTitle: '承诺书',
  },
];
// 当前在职状态
position_status = [
  {id: 1, name: '待调岗'},
  {id: 2, name: '无异动'},
  {id: 3, name: '待转正'},
  {id: 4, name: '待离职'},
];
// 转正类型
formal_status = [
  {id: 1, name: '提前转正'},
  {id: 2, name: '正常转正'},
  {id: 3, name: '延期转正'},
];
// 员工类型
job_type = [
  {id: 1, name: '全职'},
  {id: 2, name: '兼职'},
  {id: 3, name: '实习'},
];
// 员工状态
job_status = [
  {id: 1, name: '在职'},
  {id: 2, name: '离职'},
  {id: 3, name: '停薪留职'},
  {id: 4, name: '二次入职'},
];
// 入职途径
entry_way = [
  {id: 1, name: '智联招聘'},
  {id: 2, name: '前程无忧'},
  {id: 3, name: '58同城'},
  {id: 4, name: 'BOSS直聘'},
  {id: 5, name: '猎聘网'},
  {id: 6, name: '首席信才'},
  {id: 7, name: '德胜人才'},
  {id: 8, name: '校园招聘会'},
  {id: 9, name: '社会招聘会'},
  {id: 10, name: '推荐'},
  {id: 11, name: '其他'},
];
// 奖惩记录
typeCategory = [
  {id: 1, name: '表扬'},
  {id: 2, name: '批评'},
  {id: 3, name: '疑惑'},
  {id: 4, name: '其他'},
];
