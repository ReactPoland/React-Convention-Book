import { createReducer } from '../utils';
import { Section } from 'models';

import {
  SECTION_LIST
} from 'constants/section';

const initialState = new Map();

export default createReducer(initialState, {
  [SECTION_LIST]: (state, payload) => {
    const sections = new Map();
    (payload || []).forEach((section) => {
      sections.set(section.id, new Section(section));
    });
    return sections;
  }
});
