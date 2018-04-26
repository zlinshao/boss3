/**
 * Created by Administrator on 2017/12/13 0013.
 */
const onlineExam = {
  state: {
    test_paper : {},
    myself_test_paper : {},

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
  },
  actions: {
    testPaper({commit},view){
      commit('TEST_PAPER',view);
    },
    myselfTestPaper({commit},view){
      commit('MYSELF_TEST_PAPER',view);
    },

  }
};

export default onlineExam
