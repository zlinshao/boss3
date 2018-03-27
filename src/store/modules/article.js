/**
 * Created by Administrator on 2017/12/13 0013.
 */
const article = {
  state: {
    article_id :'',
    module_type: '',
    article_detail: {},
    lejia_page: 1,
    company_page: 1,
    staff_page: 1,
    system_page: 1,
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
    LEJIA_PAGE:(state,view) => {
      state.lejia_page = view;
    },
    COMPANY_PAGE:(state,view) => {
      state.company_page = view;
    },
    STAFF_PAGE:(state,view) => {
      state.staff_page = view;
    },
    SYSTEM_PAGE:(state,view) => {
      state.system_page = view;
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
    lejiaPage({commit},view){
      commit('LEJIA_PAGE',view);
    },
    companyPage({commit},view){
      commit('COMPANY_PAGE',view);
    },
    staffPage({commit},view){
      commit('STAFF_PAGE',view);
    },
    systemPage({commit},view){
      commit('SYSTEM_PAGE',view);
    },
  }
};

export default article
