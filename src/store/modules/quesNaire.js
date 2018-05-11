/**
 * Created by Administrator on 2017/12/13 0013.
 */
const quesNaire = {
  state: {
    naire_paper : {}, //批量导入
    naire_myself_paper : {}, //自己录入
    edit_naire_paper_id: '', //编辑试卷id
    preview_naire_paper_id: '', //预览试卷id
    naire_answer_exam_id: '', //答题试卷id
    naire_stastic_id: '',   //调查统计id
    naire_answer_all: {},
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
    PREVIEW_NAIRE_PAPER_ID:(state,view) => {
      if(view){
        state.preview_naire_paper_id = view;
      }
    },
    NAIRE_ANSWER_EXAM_ID:(state,view) => {
      if(view){
        state.naire_answer_exam_id = view;
      }
    },
    NAIRE_STASTIC_ID:(state,view) => {
      if(view){
        state.naire_stastic_id = view;
      }
    },
    NAIRE_ANSWER_ALL:(state,view) => {
      if(view){
        state.naire_answer_all = view;
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
    previewNairePaperId({commit},view){
      commit('PREVIEW_NAIRE_PAPER_ID',view);
    },
    naireAnswerExamId({commit},view){
      commit('NAIRE_ANSWER_EXAM_ID',view);
    },
    naireStasticId({commit},view){
      commit('NAIRE_STASTIC_ID',view);
    },
    naireAnswerAll({commit},view){
      commit('NAIRE_ANSWER_ALL',view);
    },
  }
};

export default quesNaire
