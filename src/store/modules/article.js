/**
 * Created by Administrator on 2017/12/13 0013.
 */
const article = {
  state: {
    article_id :'',
    module_type: '',
    article_detail: {},
    page: '',
  },
  mutations: {
    ARTICLE_ID:(state,view) => {
      state.article_id = view;
    },
    DELETE_ARTICLE_ID:(state)=>{
      state.article_id = '';
    },
    // 文章类型模块
    MODULE_TYPE:(state,view)=>{
      state.module_type = view;
    },
    ARTICLE_DETAIL: (state, view) => {
      state.article_detail= view;
    },
    PAGE:(state,view) => {
      state.page = view;
    },
  },
  actions: {
    articleId({commit},view){
      commit('ARTICLE_ID',view);
    },
    deleteArticleId({commit}){
      commit('DELETE_ARTICLE_ID');
    },
    moduleType({commit},view){
      commit('MODULE_TYPE',view);
    },
    // 文章详情
    articleDetail:({commit},view)=>{
      commit('ARTICLE_DETAIL', view);
    },
    page({commit},view){
      commit('PAGE',view);
    },
  }
};

export default article
