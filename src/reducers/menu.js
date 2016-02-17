import { createReducer } from '../utils';
import { Menu } from 'models';

import mapHelpers from 'utils/map-immutability-helpers';

import {
  MENU_LIST,
  MENU_ADD,
  MENU_UPDATE,
  MENU_DELETE,
  MENU_REORDER
} from 'constants/menu';

const initialState = new Map();

function getRandomId() {
  return Math.random().toString().substring(2);
}

export default createReducer(initialState, {
  [MENU_LIST]: (state, payload) => {
    const menus = new Map();
    (payload || []).forEach((menu) => {
      menus.set(menu.id , new Menu(menu));
    });
    return menus;
  },

  [MENU_ADD]: (state, payload) => {
    // remove it after implementing api
    // otherwise you'll get wrong ids
    payload.id = getRandomId();

    return mapHelpers.addItem(state, payload.id, new Menu(payload));
  },

  [MENU_UPDATE]: (state, payload) => {
    return mapHelpers.addItem(state, payload.id, new Menu(payload))
  },

  [MENU_DELETE]: (state, payload) => {
    return mapHelpers.removeItem(state, payload);
  },

  [MENU_REORDER]: (state, payload) => {
    const sortArray = payload.slice();
    const newMap = new Map();

    sortArray.forEach((sortArrayItem) => {
      newMap.set(sortArrayItem, state.get(sortArrayItem));
    });

    return newMap;
  }
});
