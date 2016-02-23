import { createReducer } from '../utils';
import { Section } from 'models';

import {
  SECTION_LIST,
  SECTION_ADD,
  SECTION_DELETE
} from 'constants/section';

import mapHelpers from 'utils/mapHelpers';

function getRandomId() {
  return Math.random().toString().substring(2);
}

const initialState = new Map();

export default createReducer(initialState, {
  [SECTION_LIST]: (state, payload) => {
    const keys = payload ? Object.keys(payload) : [];
    const items = [];

    keys.splice(keys.indexOf('$__path'), 1);

    keys.forEach((key) => {
      items.push(new Section(payload[key]));
    });

    return mapHelpers.addMultipleItems(state, items, 'id');
  },

  [SECTION_ADD]: (state, payload) => {
    payload.id = payload.id || getRandomId();
    return mapHelpers.addItem(state, payload.id, new Section(payload));
  },

  [SECTION_DELETE]: (state, payload) => {
    return mapHelpers.removeItem(state, payload);
  }
});
