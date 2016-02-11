import { createReducer } from '../utils';

import {
  // SET_DATE,
  // RESET_DATE
} from '../constants/dashboard';

const initialState = {
  date: new Date(), //Current date
};

export default createReducer(initialState, {
  // [SET_DATE]: (state, payload) => {
  //   return {
  //     ...state,
  //     date: payload.date
  //   };
  // },
  // [RESET_DATE]: (state) => {
  //   return {
  //     ...state,
  //     date: new Date()
  //   };
  // },
});

