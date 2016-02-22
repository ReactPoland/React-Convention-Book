import { createReducer } from '../utils';
import { Section } from 'models';

import {
  SECTION_LIST,
  SECTION_ADD,
  SECTION_DELETE
} from 'constants/section';

import mapHelpers from 'utils/map-immutability-helpers';

function getRandomId() {
  return Math.random().toString().substring(2);
}

const initialState = new Map();

export default createReducer(initialState, {
  [SECTION_LIST]: (state, payload) => {
    const sections = new Map();
    (payload || []).forEach((section) => {
      sections.set(section.id, new Section(section));
    });
    return sections;
  },

  [SECTION_ADD]: (state, payload) => {
    payload.id = payload.id || getRandomId();
    return mapHelpers.addItem(state, payload.id, new Section(payload));
  },

  [SECTION_DELETE]: (state, payload) => {
    return mapHelpers.removeItem(state, payload);
  }
});
