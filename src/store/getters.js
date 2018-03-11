/**
 * Created by Administrator on 2017/12/13 0013.
 */
const getters = {
  visitedViews: state => state.app.visitedViews,
  menuStatus: state => state.app.menuStatus,
  isLoading: state => state.app.isLoading,
}
export default getters
