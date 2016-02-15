import { createReducer } from '../utils';
import { MenuItem } from 'models';

import {
  MENUITEM_LIST
} from 'constants/menuItem';

const initialState = new Map();

export default createReducer(initialState, {
  [MENUITEM_LIST]: (state, payload) => {
    const menuItems = new Map();
    (payload || []).forEach((item) => {
      menuItems.set(item.id, new MenuItem(item));
    });
    return menuItems;
  }
});
