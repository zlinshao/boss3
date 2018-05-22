/**
 * Created by Administrator on 2017/12/13 0013.
 */
const onlineExam = {
  state: {
    test_paper: {}, //批量导入
    myself_test_paper: {}, //自己录入
    edit_paper_id: '', //编辑试卷id
    answer_exam_id: '', //答题试卷id
    preview_paper_id: '', //预览试卷id
    examiner_read_id: '', //批阅试卷id
    look_exam_id: '', //查看试卷id
    examiner_each: {}, //批阅试卷result_id, exam_id
    look_exam: {}, //考生查看试卷
    before_exam: {}, //开考之前
  },
  mutations: {
    TEST_PAPER: (state, view) => {
      if (view) {
        state.test_paper = view;
      }
    },
    MYSELF_TEST_PAPER: (state, view) => {
      if (view) {
        state.myself_test_paper = view;
      }
    },
    EDIT_PAPER_ID: (state, view) => {
      if (view) {
        state.edit_paper_id = view;
      }
    },
    ANSWER_EXAM_ID: (state, view) => {
      if (view) {
        state.answer_exam_id = view;
      }
    },
    PREVIEW_PAPER_ID: (state, view) => {
      if (view) {
        state.preview_paper_id = view;
      }
    },
    EXAMINER_READ_ID: (state, view) => {
      if (view) {
        state.examiner_read_id = view;
      }
    },
    LOOK_EXAM_ID: (state, view) => {
      if (view) {
        state.look_exam_id = view;
      }
    },
    EXAMINER_EACH: (state, view) => {
      if (view) {
        state.examiner_each = view;
      }
    },
    LOOK_EXAM: (state, view) => {
      if (view) {
        state.look_exam = view;
      }
    },
    BEFORE_EXAM: (state, view) => {
      if (view) {
        state.before_exam = view;
      }
    },
  },
  actions: {
    testPaper({commit}, view) {
      commit('TEST_PAPER', view);
    },
    myselfTestPaper({commit}, view) {
      commit('MYSELF_TEST_PAPER', view);
    },
    editPaperId({commit}, view) {
      commit('EDIT_PAPER_ID', view);
    },
    answerExamId({commit}, view) {
      commit('ANSWER_EXAM_ID', view);
    },
    previewPaperId({commit}, view) {
      commit('PREVIEW_PAPER_ID', view);
    },
    examinerReadId({commit}, view) {
      commit('EXAMINER_READ_ID', view);
    },
    lookExamId({commit}, view) {
      commit('LOOK_EXAM_ID', view);
    },
    examinerEach({commit}, view) {
      commit('EXAMINER_EACH', view);
    },
    lookExam({commit}, view) {
      commit('LOOK_EXAM', view);
    },
    beforeExam({commit}, view) {
      commit('BEFORE_EXAM', view);
    },
  }
};

export default onlineExam
