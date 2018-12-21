const platform = {
    state:{
        id: '',
        platform_obj: '',
        position_obj: {
            department_id: '',
            department_name: '',
            position_id: '',
            duty_id: '',
        }
    },
    mutations: {
        EDIT_PLATFORM: (state, view) => {
            state.id = view.id;
            state.platform_obj = view.platform
        },
        SAVE_POSITION_INFO(state, view){
            state.position_obj.department_id = view.org_id;
            state.position_obj.position_id = view.position_id;
            state.position_obj.duty_id = view.role.duty_id;
            state.position_obj.department_name = view.org.name;
        }
    },
    actions: {
        toEdit({commit}, view){
            commit('EDIT_PLATFORM', view)
        },
        savePositionInfo({commit}, view){
            commit('SAVE_POSITION_INFO', view)
        }
    }
}
export default platform