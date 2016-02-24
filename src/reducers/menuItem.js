import { createReducer } from '../utils';
import { MenuItem } from 'models';
import mapHelpers from 'utils/mapHelpers';

import {
  MENUITEM_LIST
} from 'constants/menuItem';

const initialState = new Map();

export default createReducer(initialState, {
  [MENUITEM_LIST]: (state, payload) => {
    const keys = Object.keys(payload);
    const pathIndex = keys.indexOf('$__path');

    if(pathIndex !== -1) {
      keys.splice(pathIndex, 1);
    }

    const newItems = keys.map((key) => {
      return new MenuItem(payload[key]);
    });

    return mapHelpers.addMultipleItems(state, newItems);
  }
});
