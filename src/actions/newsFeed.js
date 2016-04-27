import {
  NEWSFEED_LIST,
  NEWSFEED_ADD,
  NEWSFEED_DELETE,
  NEWSFEED_EDIT
} from '../constants/newsFeed';

export default {
  newsFeedList: (posts) => {
    return {
      type: NEWSFEED_LIST,
      payload: posts
    }
  },

  newsFeedAdd: (post) => {
    return {
      type: NEWSFEED_ADD,
      payload: post
    };
  },

  newsFeedDelete: (post) => {
    return {
      type: NEWSFEED_DELETE,
      payload: post
    };
  },

  newsFeedEdit: (post) => {
    return {
      type: NEWSFEED_EDIT,
      payload: post
    };
  }
}
