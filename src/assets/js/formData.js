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

// 花名册 form
rosterAddStaff = {
  id: '',
  name: '',               //姓名
  gender: '',             //性别
  phone: '',              //手机号
  archive_number: '',     //档案编号
  birthday: '',           //出生日期
  fertility_status: '',   //生育状况
  job_number: '',         //工号
  marital_status: '',     //婚姻状况
  id_num: '',             //身份证
  home_addr: '',          //家庭住址
  political_status: '',   //政治面貌
  org_id: '',             //部门
  duty_id: [],            //职位
  position_id: [],        //岗位
  recommender: '',        //推荐人
  enroll: '',             //入职日期
  try_out_time: '',       //试用期
  expected_formal: '',    //预计转正日期
  formal: '',             //实际转正日期
  forward_time: '',       //实际转正日期
  formal_status: '',      //转正类型
  position_status: '',    //当前在职状态
  job_type: '',           //员工类型
  job_status: '',         //员工状态
  bank_num: '',           //银行卡号
  account_bank: '',       //开户行
  branch_bank_code: '',   //支行行号
  account_name: '',       //开户名
  branch_bank: '',        //支行
  city: '',               //城市
  area: '',               //区域
  education: '',          //学历
  email: '',              //个人邮箱
  salary: '',             //薪资
  level: '',              //级别
  entry_way: '',          //入职途径
};

// 辅助信息 form
rosterAddAssist = {
  origin_addr: '',                //籍贯
  emergency_call: '',             //紧急联系电话+与该员工关系
  school: '',                     //毕业学校
  major: '',                      //所学专业
  graduation_time: '',            //毕业时间
  agreement_first_time: '',       //第一次签合同时间
  agreement_first_end_time: '',   //第一次合同到期时间
  agreement_second_time: '',      //第二次签合同时间
  image_info: {},                 //第二次签合同时间
};

// 调岗信息 form
rosterTransfer = {
  id: '',
  new_org_id: [],
  new_position_id: [],
  new_duty_id: [],
  org_id: [],
  position_id: [],
  duty_id: [],
  transfer_type: '',
  remark_transfer: '',
  transfer_time: '',
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
  {id: 1, name: '无异动'},
  {id: 2, name: '待调岗'},
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
entry_ways = [
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
// 调岗类型
transfer_type = [
  {id: 1, name: '平行调岗'},
  {id: 2, name: '升职调岗'},
  {id: 3, name: '降至调岗'},
];
// 离职类型
resignation_type = [
  {id: 1, name: '主动离职'},
  {id: 2, name: '旷工离职'},
  {id: 3, name: '劝退'},
  {id: 4, name: '开除'},
];
