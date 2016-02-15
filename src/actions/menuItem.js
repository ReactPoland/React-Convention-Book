import {
  MENUITEM_LIST
} from 'constants/menuItem';

export default {
  menuItemList(menuItems) {
    return {
      type: MENUITEM_LIST,
      payload: menuItems
    };
  }
}
