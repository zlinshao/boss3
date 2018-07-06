/**
 * Created by Administrator on 2017/12/13 0013.
 */
const autoForm = {
  state: {
    form:{
      formName : '',
      inline: false, // 是否使用inline排版
      labelWidth: '80px', // 标签宽度
      size: 'small', // 尺寸
      formItemList: []
    },
    itemIndex: '', // 当前选中的item
    activeName_right : 'first',
  },
  mutations: {
    UPDATE_FORM(state, view) {
      Object.assign(state.form, view)
    },
    SELECT_ITEM(state, view){
      state.itemIndex = view;
      state.activeName_right = 'first'
    },
    CHANGE_ACTIVE(state, view){
      state.activeName_right = view;
    },
  },
  actions: {
    updateForm({commit},view){
      commit('UPDATE_FORM',view)
    },
    selectItem({commit},view){
      commit('SELECT_ITEM',view)
    },
    changeActive({commit},view){
      commit('CHANGE_ACTIVE',view)
    }
  }
};

export default autoForm
