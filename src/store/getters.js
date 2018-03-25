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
  articleDetailId: state => state.article.articleDetailId,
}
export default getters
