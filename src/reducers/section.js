import { createReducer } from '../utils';
import { Section } from 'models';

import {
  SECTION_LIST,
  SECTION_ADD,
  SECTION_DELETE
} from 'constants/section';

import mapHelpers from 'utils/mapHelpers';

const initialState = new Map();

export default createReducer(initialState, {
  [SECTION_LIST]: (state, payload) => {
    const items = payload.map((item) => {
      return new Section(item);
    });
    return mapHelpers.addMultipleItems(state, items);
  },

  [SECTION_ADD]: (state, payload) => {
    payload.id = payload.id || getRandomId();
    return mapHelpers.addItem(state, payload.id, new Section(payload));
  },

  [SECTION_DELETE]: (state, payload) => {
    return mapHelpers.removeItem(state, payload);
  }
});
