/**
 * Created by Administrator on 2017/12/13 0013.
 */
const quesNaire = {
  state: {
    naire_paper : {}, //批量导入
    naire_myself_paper : {}, //自己录入
    edit_naire_paper_id: '', //编辑试卷id

    answer_exam_id: '', //答题试卷id
    preview_paper_id: '', //预览试卷id
    examiner_read_id: '', //批阅试卷id
    look_exam_id: '', //查看试卷id
    examiner_each: {}, //批阅试卷result_id, exam_id
    look_exam: {}, //考生查看试卷
  },
  mutations: {
    NAIRE_PAPER:(state,view) => {
      if(view){
        state.naire_paper = view;
      }
    },
    NAIRE_MYSELF_PAPER:(state,view) => {
      if(view){
        state.naire_myself_paper = view;
      }
    },
    EDIT_NAIRE_PAPER_ID:(state,view) => {
      if(view){
        state.edit_naire_paper_id = view;
      }
    },

    ANSWER_EXAM_ID:(state,view) => {
      if(view){
        state.answer_exam_id = view;
      }
    },
    PREVIEW_PAPER_ID:(state,view) => {
      if(view){
        state.preview_paper_id = view;
      }
    },
    EXAMINER_READ_ID:(state,view) => {
      if(view){
        state.examiner_read_id = view;
      }
    },
    LOOK_EXAM_ID:(state,view) => {
      if(view){
        state.look_exam_id = view;
      }
    },
    EXAMINER_EACH:(state,view) => {
      if(view){
        state.examiner_each= view;
      }
    },
    LOOK_EXAM:(state,view) => {
      if(view){
        state.look_exam= view;
      }
    },
  },
  actions: {
    nairePaper({commit},view){
      commit('NAIRE_PAPER',view);
    },
    naireMyselfPaper({commit},view){
      commit('NAIRE_MYSELF_PAPER',view);
    },
    editNairePaperId({commit},view){
      commit('EDIT_NAIRE_PAPER_ID',view);
    },

    answerExamId({commit},view){
      commit('ANSWER_EXAM_ID',view);
    },
    previewPaperId({commit},view){
      commit('PREVIEW_PAPER_ID',view);
    },
    examinerReadId({commit},view){
      commit('EXAMINER_READ_ID',view);
    },
    lookExamId({commit},view){
      commit('LOOK_EXAM_ID',view);
    },
    examinerEach({commit},view){
      commit('EXAMINER_EACH',view);
    },
    lookExam({commit},view){
      commit('LOOK_EXAM',view);
    },
  }
};

export default quesNaire
