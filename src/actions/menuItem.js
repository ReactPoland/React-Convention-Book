import {
  MENUITEM_LIST,
  MENUITEM_ADD,
  MENUITEM_DELETE
} from 'constants/menuItem';

export default {
  menuItemList(menuItems) {
    return {
      type: MENUITEM_LIST,
      payload: menuItems
    };
  },

  add(menuItem) {
    return {
      type: MENUITEM_ADD,
      payload: menuItem
    };
  },

  delete(menuItem) {
    return {
      type: MENUITEM_DELETE,
      payload: menuItem
    };
  }
}