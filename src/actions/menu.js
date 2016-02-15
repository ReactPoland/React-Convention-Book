import {
  MENU_LIST
} from 'constants/menu';

export default {
  menuList(menus) {
    return {
      type: MENU_LIST,
      payload: menus
    };
  }
}
