import { createConstants } from '../utils';

const constants = createConstants(
  'LOGIN',
  'LOGOUT',
  'LOGIN_FAILED',
  'REGISTRATION',
  'LOGGED_BUT_REFRESHED_PAGE',
  'UPDATE_USER_SETTINGS',
  'CHANGE_PASSWORD'
);

export default constants;
