import { createReducer } from '../utils';
import { MenuItem } from 'models';
import mapHelpers from 'utils/mapHelpers';

import {
  MENUITEM_LIST
} from 'constants/menuItem';

const initialState = new Map();

export default createReducer(initialState, {
  [MENUITEM_LIST]: (state, payload) => {
    const newItems = payload.map((menuItem) => {
      return new MenuItem(menuItem);
    });

    return mapHelpers.addMultipleItems(state, newItems);
  }
});
