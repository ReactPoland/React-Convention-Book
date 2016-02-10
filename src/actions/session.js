import {
  LOGIN,
  LOGOUT,
  REGISTRATION,
  LOGIN_FAILED,
  LOGGED_BUT_REFRESHED_PAGE,
  UPDATE_USER_SETTINGS,
  CHANGE_PASSWORD
} from '../constants/session';


const endpoints = {
  register: '/api/registrationEndpoint',
  login: '/api/loginEndpoint'
};

export default {
  registration: (response) => {
    return {
      type: REGISTRATION,
      payload: { response: response }
    }
  },

  login: (response) => {
    return {
      type: LOGIN,
      payload: { response: response }
    }
  },

  refreshSessionToken: (response) => {
    return {
      type: LOGGED_BUT_REFRESHED_PAGE,
      payload: { response: response }
    }
  },

  loginFailed: (err) => {
    return {
      type: LOGIN_FAILED,
      payload: { err: err }
    }
  },

  logout: () => {
    return {
      type: LOGOUT
    }
  },

  updateUserSettings: (userSettings) => {
    return {
      type: UPDATE_USER_SETTINGS,
      payload: { userSettings: userSettings }
    }
  },

  changePassword: (passwords) => {
    return {
      type: CHANGE_PASSWORD,
      payload: { passwords: passwords }
    }
  }
}
