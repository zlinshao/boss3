/**
 * Created by Administrator on 2017/12/13 0013.
 */
const datum = {
  state: {
    active_name: '',
    work_order_filter: {},
    incomplete_record_active: '', //收房/租房的补齐记录
  },
  mutations: {
    ACTIVE_NAME: (state, view) => {
      state.active_name = view;
    },
    WORK_ORDER_FILTER: (state, view) => {
      state.work_order_filter = view;
    },
    INCOMPLETE_RECORD_ACTIVE: (state, view) => {
      state.incomplete_record_active = view;
    },
  },
  actions: {
    activeName({commit}, view) {
      commit('ACTIVE_NAME', view)
    },
    workOrderFilter({commit}, view) {
      commit('WORK_ORDER_FILTER', view)
    },
    incompleteRecordActive({commit}, view) {
      commit('INCOMPLETE_RECORD_ACTIVE', view)
    },

  }
};

export default datum
