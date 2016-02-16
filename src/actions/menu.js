import {
  MENU_LIST,
  MENU_ADD,
  MENU_UPDATE,
  MENU_DELETE
} from 'constants/menu';

export default {
  menuList(menus) {
    return {
      type: MENU_LIST,
      payload: menus
    };
  },

  add(menu) {
    return {
      type: MENU_ADD,
      payload: menu
    };
  },

  update(menu) {
    return {
      type: MENU_UPDATE,
      payload: menu
    };
  },

  delete(id) {
    return {
      type: MENU_DELETE,
      payload: id
    };
  }
}
