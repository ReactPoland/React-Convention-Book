import { createReducer } from '../utils';
import { Menu } from 'models';

import {
  MENU_LIST
} from 'constants/menu';

const initialState = new Map();

export default createReducer(initialState, {
  [MENU_LIST]: (state, payload) => {
    const menus = new Map();
    (payload || []).forEach((menu) => {
      menus.set(menu.id , new Menu(menu));
    });
    return menus;
  }
});
