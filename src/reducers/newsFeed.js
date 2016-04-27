import { createReducer } from '../utils';

import {
  NEWSFEED_LIST,
  NEWSFEED_ADD,
  NEWSFEED_DELETE,
  NEWSFEED_EDIT
} from 'constants/newsFeed';

const mock = [
  {
    id: 1,
    title: 'A Message',
    author: 'Author',
    date: 'Month 7, 2016',
    excerpt: 'Preview of the content/text goes here...'
  },
  {
    id: 2,
    title: 'Another message',
    author: 'Another Author',
    date: 'Month 4, 2016',
    excerpt: 'Preview of the content/text goes here...'
  },
  {
    id: 3,
    title: 'Yet another message',
    author: 'Yet Another Author',
    date: 'Month 3, 2016',
    excerpt: 'Preview of the content/text goes here...'
  }
];

const initialState = [];

export default createReducer(initialState, {
  [NEWSFEED_LIST]: (state, payload) => {
    return state.concat(state, mock);
  },

  [NEWSFEED_ADD]: (state, payload) => {
    let newState = state.slice(0);
    newState.push(payload);
    return newState;
  },

  [NEWSFEED_DELETE]: (state, payload) => {
    state.filter((obj) => {
      if(obj.id !== payload) {
        return obj;
      }
    });
  },

  [NEWSFEED_EDIT]: (state, payload) => {
    //need to be done yet
  }
});
