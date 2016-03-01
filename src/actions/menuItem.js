import {
  MENUITEM_LIST,
  MENUITEM_ADD,
  MENUITEM_DELETE,
  MENUITEM_UPDATE
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

  update(menuItem) {
    return {
      type: MENUITEM_UPDATE,
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