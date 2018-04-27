/**
 * Created by Administrator on 2017/12/13 0013.
 */
const onlineExam = {
  state: {
    test_paper : {}, //批量导入
    myself_test_paper : {}, //自己录入
    edit_paper_id: '', //编辑试卷id
  },
  mutations: {
    TEST_PAPER:(state,view) => {
      if(view){
        state.test_paper = view;
      }
    },
    MYSELF_TEST_PAPER:(state,view) => {
      if(view){
        state.myself_test_paper = view;
      }
    },
    EDIT_PAPER_ID:(state,view) => {
      if(view){
        state.edit_paper_id = view;
      }
    },
  },
  actions: {
    testPaper({commit},view){
      commit('TEST_PAPER',view);
    },
    myselfTestPaper({commit},view){
      commit('MYSELF_TEST_PAPER',view);
    },
    editPaperId({commit},view){
      commit('EDIT_PAPER_ID',view);
    },

  }
};

export default onlineExam
