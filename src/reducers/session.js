import { createReducer } from '../utils';

import {
  LOGIN,
  LOGOUT,
  REGISTRATION,
  LOGIN_FAILED,
  LOGGED_BUT_REFRESHED_PAGE,
  UPDATE_USER_SETTINGS,
  CHANGE_PASSWORD
} from '../constants/session';

const initialState = {
  loggedIn: false,
  user: {}
};

export default createReducer(initialState, {
  [REGISTRATION]: (state, payload) => {
    return state;
  },
  [LOGIN]: (state, payload) => {
    return {
      loggedIn: true,
      user: payload.response
    };
  },
  [LOGGED_BUT_REFRESHED_PAGE]: (state, payload) => {
    /*
     * this happens when a user is logged but refresh the app,
     * then we populate the store from the localStorage in Header.js
     */
    return {
      loggedIn: true,
      user: payload.response.user
    };
  },
  [LOGIN_FAILED]: (state, payload) => {
    //Log the error message
    alert('Login failed - ' + payload.err.status + ' ' + payload.err.data);
    return state;
  },
  [LOGOUT]: (state, payload) => {
    return {...initialState};
  },
  [UPDATE_USER_SETTINGS]: (state, payload) => {
    //Update user settings
    return {
      ...state,
      user: {
        ...state.user,
        ...payload.userSettings
      }
    };
  },
  [CHANGE_PASSWORD]: (state, payload) => {
    console.log('CHANGE_PASSWORD payload', payload.passwords);
    return state;
  }
});
