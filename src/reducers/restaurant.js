import { createReducer } from '../utils';

import {
   RESTAURANTS_LIST
} from '../constants/restaurant';

import { Restaurant } from 'models';

const initialState = {};

export default createReducer(initialState, {
  [RESTAURANTS_LIST]: (state, payload) => {
    return new Restaurant(payload);
  }
});
