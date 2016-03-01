import { createReducer } from '../utils';
import { MenuItem } from 'models';
import mapHelpers from 'utils/mapHelpers';

import {
  MENUITEM_LIST,
  MENUITEM_ADD,
  MENUITEM_DELETE,
  MENUITEM_UPDATE
} from 'constants/menuItem';

const initialState = new Map();

export default createReducer(initialState, {
  [MENUITEM_LIST]: (state, payload) => {
    const newItems = payload.map((menuItem) => {
      return new MenuItem(menuItem);
    });

    return mapHelpers.addMultipleItems(state, newItems);
  },

  [MENUITEM_UPDATE]: (state, payload) => {

    // alert("MENUITEM_UPDATE");
    console.info("MENUITEM_UPDATE", payload);

    let newMenuItem = new MenuItem(payload);
    return mapHelpers.addItem(state, payload.id, newMenuItem);
  },

  [MENUITEM_ADD]: (state, payload) => {
    let newMenuItem = new MenuItem(payload);
    return mapHelpers.addItem(state, payload.id, newMenuItem);
  },

  [MENUITEM_DELETE]: (state, payload) => {
    let newState = mapHelpers.removeItem(state, payload);
    return mapHelpers.removeItem(state, payload);
  },
});
