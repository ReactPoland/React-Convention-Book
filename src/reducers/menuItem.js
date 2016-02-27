import { createReducer } from '../utils';
import { MenuItem } from 'models';
import mapHelpers from 'utils/mapHelpers';

import {
  MENUITEM_LIST,
  MENUITEM_ADD,
  MENUITEM_DELETE
} from 'constants/menuItem';

const initialState = new Map();

export default createReducer(initialState, {
  [MENUITEM_LIST]: (state, payload) => {
    const newItems = payload.map((menuItem) => {
      return new MenuItem(menuItem);
    });

    return mapHelpers.addMultipleItems(state, newItems);
  },

  [MENUITEM_ADD]: (state, payload) => {
    let newMenuItem = new MenuItem(payload);
    return mapHelpers.addItem(state, payload.id, newMenuItem);
  },

  [MENUITEM_DELETE]: (state, payload) => {
    // alert("MENUITEM_DELETE"+JSON.stringify(payload));
    let newState = mapHelpers.removeItem(state, payload);
    console.log("state", state);
    console.log("newState", newState);
    return mapHelpers.removeItem(state, payload);
  },
});
