import mapHelpers from '../utils/mapHelpers';

const article = (state = {}, action) => {
  switch (action.type) {
    case 'ARTICLES_LIST_ADD':
      let articlesList = action.payload.response;
      return mapHelpers.addMultipleItems(state, articlesList);
    case 'PUSH_NEW_ARTICLE':
      let newArticleObject = action.payload.response;
      return mapHelpers.addItem(state, newArticleObject['_id'], newArticleObject);
    default:
      return state;
  }
}

export default article