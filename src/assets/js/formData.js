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
