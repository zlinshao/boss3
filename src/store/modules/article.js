/**
 * Created by Administrator on 2017/12/13 0013.
 */
const article = {
  state: {
    article_id :'',
    module_type: '',
  },
  mutations: {
    // ADD_VISITED_VIEWS: (state, view) => {
    //   if (state.visitedViews.some(v => v.path === view.path)) return;
    //   state.visitedViews.push({
    //     name: view.name,
    //     path: view.path,
    //   })
    // },
    //
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
  }
};

export default article
