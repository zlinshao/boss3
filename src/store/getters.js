/**
 * Created by Administrator on 2017/12/13 0013.
 */
const getters = {
  visitedViews: state => state.app.visitedViews,
  menuStatus: state => state.app.menuStatus,
  isLoading: state => state.app.isLoading,
  albumId: state => state.picture.albumId,
  articleId: state => state.article.articleId,
  moduleType: state => state.article.moduleType,
  articleDetail: state => state.article.articleDetail,
  secondFlag: state => state.secondPassword.secondFlag,
  badgeFlag: state => state.badge.badgeFlag,
  newversion: state => state.article.newversion,
}
export default getters
