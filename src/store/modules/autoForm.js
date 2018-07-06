/**
 * Created by Administrator on 2017/12/13 0013.
 */
const autoForm = {
  state: {
    form:{
      inline: false, // 是否使用inline排版
      labelPosition: 'right', // 标签对齐方式
      labelWidth: '80px', // 标签宽度
      size: 'small', // 尺寸
      statusIcon: true, // 显示验证图标
      formItemList: []
    },
    itemKey: '', // 当前选中的item
  },
  mutations: {
    UPDATE_FORM(state, view) {
      Object.assign(state.form, view)
    },
    SELECT_ITEM(state, view){
      state.itemKey = view;
    }
  },
  actions: {
    updateForm({commit},view){
      commit('UPDATE_FORM',view)
    },
    selectItem({commit},view){
      commit('SELECT_ITEM',view)
    }
  }
};

export default autoForm
