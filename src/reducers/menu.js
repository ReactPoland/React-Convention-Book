import { createReducer } from '../utils';
import { Menu } from 'models';

import mapHelpers from 'utils/mapHelpers';

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
    const items = payload.map((menu) => {
      return new Menu(menu);
    });

    return mapHelpers.addMultipleItems(state, items);
  },

  [MENU_ADD]: (state, payload) => {
    return mapHelpers.addItem(state, payload.id, new Menu(payload));
  },

  [MENU_UPDATE]: (state, payload) => {
    let newState = mapHelpers.addItem(state, payload.id, new Menu(payload))
    return newState;


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
