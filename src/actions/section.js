import {
  SECTION_LIST,
  SECTION_ADD,
  SECTION_DELETE
} from 'constants/section';

export default {
  sectionList(sections) {
    return {
      type: SECTION_LIST,
      payload: sections
    };
  },

  add(section) {
    return {
      type: SECTION_ADD,
      payload: section
    };
  },

  delete(sectionId) {
    return {
      type: SECTION_DELETE,
      payload: sectionId
    };
  }
}
