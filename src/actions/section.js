import {
  SECTION_LIST
} from 'constants/section';

export default {
  sectionList(sections) {
    return {
      type: SECTION_LIST,
      payload: sections
    };
  }
}
